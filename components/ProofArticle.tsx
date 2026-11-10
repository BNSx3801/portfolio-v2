import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { readContent } from "@/lib/content";
import { proofArticle, type ProjectMedia } from "@/lib/site";
import { ArticleContents, type ContentsSection } from "./ArticleContents";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SeriesMap } from "./SeriesMap";

// Heading text becomes the anchor the contents list jumps to.
function anchor(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

// "#" headings are the sections of the contents list and "##" their sub-sections; deeper ones stay out.
function contentsOf(body: string) {
  const sections: ContentsSection[] = [];
  for (const [, level, heading] of body.matchAll(/^(#{1,2}) (.+)$/gm)) {
    const entry = { id: anchor(heading), heading };
    if (level === "#") sections.push({ ...entry, children: [] });
    else sections.at(-1)?.children.push(entry);
  }
  return sections;
}

// Page shell shared by articles, series maps and series parts. `above` sits over the title.
function Shell({
  section,
  title,
  subtitle,
  above,
  cover,
  contents,
  children,
}: {
  section: string;
  title: string;
  subtitle?: string;
  above?: ReactNode;
  cover?: ProjectMedia | false;
  contents?: ContentsSection[];
  children: ReactNode;
}) {
  return (
    <main id="top">
      <Nav current={section} />
      {/* 1440 frame: the contents list sits at the design's x=99, level with the cover; the article is a centred 683px column. */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        {contents && contents.length > 0 && (
          // Wide enough to reach the article's left edge less a gap: 248px at 1440, narrower down to 1280.
          <aside className="absolute top-[239px] bottom-0 left-[99px] hidden w-[min(248px,calc(50vw-472px))] xl:block">
            <ArticleContents sections={contents} />
          </aside>
        )}

        <article className="mx-auto w-full max-w-[715px] px-4 pt-[96px] pb-[60px] text-[16px] leading-[26px] sm:pt-[117px]">
          {above}
          {/* Title carries the page; the subtitle is a quiet line under it. */}
          <h1 className="text-[34px] leading-[40px] font-bold tracking-[-0.02em] sm:text-[42px] sm:leading-[48px]">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-[18px] leading-[26px] text-ink-muted">{subtitle}</p>}

          {cover !== false && (
            // Same 16:9 frame as the section tiles, so the card's thumbnail doubles as the cover.
            <div className="pow-tile mt-[40px]">
              {cover && (
                <Image
                  src={cover.src}
                  alt={cover.alt ?? `${title} cover`}
                  fill
                  priority
                  sizes="(max-width: 715px) 100vw, 683px"
                  className="object-cover"
                />
              )}
            </div>
          )}

          {children}
        </article>
      </div>
      <Footer />
    </main>
  );
}

function ArticleBody({ body }: { body: string }) {
  return (
    <div className="article-body">
      <Markdown
        components={{
          // "#" in the file is a section of the page, so every level steps down under the page's h1.
          h1: ({ children }) => <h2 id={anchor(textOf(children))}>{children}</h2>,
          h2: ({ children }) => <h3 id={anchor(textOf(children))}>{children}</h3>,
          h3: ({ children }) => <h4>{children}</h4>,
          img: ({ src, alt }) =>
            typeof src === "string" ? (
              <Image src={src} alt={alt ?? ""} width={0} height={0} sizes="(max-width: 715px) 100vw, 683px" />
            ) : null,
          // Links to other pages of this site stay in the tab; the rest open a new one.
          a: ({ href, children }) =>
            href?.startsWith("/") ? (
              <Link href={href}>{children}</Link>
            ) : (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            ),
        }}
      >
        {body}
      </Markdown>
    </div>
  );
}

// One case study or write-up, or the map of a series; app/proof-of-work/<section>/[slug] renders this.
export function ProofArticlePage({ section, slug }: { section: string; slug: string }) {
  const item = proofArticle(section, slug);
  if (!item?.article) notFound();
  const cover = item.article.hero ?? item.media;
  const { parts, embed } = item.article;

  if (embed) {
    return (
      <Shell section={section} title={item.title} subtitle={item.subtitle} cover={false}>
        <div className="figma-embed mt-[40px]">
          <iframe src={embed} title={`${item.title}: Figma file`} allowFullScreen />
        </div>
        <p className="mt-4 text-[13px] leading-[18px] text-ink-muted">
          Drag to pan, scroll or pinch to zoom.{" "}
          <a href={embed.replace("embed.figma.com", "www.figma.com").replace(/&embed-host=[^&]*/, "")} target="_blank" rel="noreferrer" className="link-underline">
            Open in Figma ↗
          </a>
        </p>
      </Shell>
    );
  }

  if (parts) {
    return (
      <Shell section={section} title={item.title} subtitle={item.subtitle} cover={cover}>
        <p className="mt-[72px] text-[11px] leading-[16px] tracking-[0.08em] text-ink-muted uppercase">
          A series in {parts.length} parts · start at the pin
        </p>
        <div className="mt-6">
          <SeriesMap parts={parts} base={`/proof-of-work/${section}/${slug}`} />
        </div>
      </Shell>
    );
  }

  const body = readContent(section, slug);
  return (
    <Shell section={section} title={item.title} subtitle={item.subtitle} cover={cover} contents={contentsOf(body)}>
      <ArticleBody body={body} />
    </Shell>
  );
}

// One part of a series; app/proof-of-work/<section>/[slug]/[part] renders this.
export function ProofSeriesPartPage({ section, slug, part }: { section: string; slug: string; part: string }) {
  const item = proofArticle(section, slug);
  const parts = item?.article?.parts ?? [];
  const i = parts.findIndex((p) => p.slug === part);
  if (!item || i < 0) notFound();
  const current = parts[i];
  const base = `/proof-of-work/${section}/${slug}`;
  const body = readContent(section, slug, part);
  const prev = parts[i - 1];
  const next = parts[i + 1];

  return (
    <Shell
      section={section}
      title={current.title}
      subtitle={current.subtitle}
      cover={false}
      contents={contentsOf(body)}
      above={
        <p className="mb-4 text-[13px] leading-[18px] text-ink-muted">
          <Link href={base} className="link-underline">
            ← {item.title}
          </Link>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          Part {i + 1} of {parts.length} · {current.date}
        </p>
      }
    >
      <ArticleBody body={body} />

      {/* Walk the series without going back to the map. */}
      <nav aria-label="Series" className="mt-[72px] flex justify-between gap-6 border-t border-ink-faint pt-6">
        {prev ? (
          <Link href={`${base}/${prev.slug}`} className="group max-w-[46%]">
            <span className="block text-[11px] leading-[16px] tracking-[0.08em] text-ink-muted uppercase">← Part {i}</span>
            <span className="mt-1 block font-[590] group-hover:underline">{prev.title}</span>
          </Link>
        ) : (
          <Link href={base} className="group max-w-[46%]">
            <span className="block text-[11px] leading-[16px] tracking-[0.08em] text-ink-muted uppercase">← Series</span>
            <span className="mt-1 block font-[590] group-hover:underline">{item.title}</span>
          </Link>
        )}
        {next ? (
          <Link href={`${base}/${next.slug}`} className="group ml-auto max-w-[46%] text-right">
            <span className="block text-[11px] leading-[16px] tracking-[0.08em] text-ink-muted uppercase">Part {i + 2} →</span>
            <span className="mt-1 block font-[590] group-hover:underline">{next.title}</span>
          </Link>
        ) : (
          <Link href={base} className="group ml-auto max-w-[46%] text-right">
            <span className="block text-[11px] leading-[16px] tracking-[0.08em] text-ink-muted uppercase">Series →</span>
            <span className="mt-1 block font-[590] group-hover:underline">Back to the map</span>
          </Link>
        )}
      </nav>
    </Shell>
  );
}
