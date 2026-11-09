import { readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Markdown from "react-markdown";
import { proofArticle } from "@/lib/site";
import { ArticleContents, type ContentsSection } from "./ArticleContents";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

// Heading text becomes the anchor the contents list jumps to.
function anchor(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

// One case study or write-up; app/proof-of-work/<section>/[slug] renders this.
export function ProofArticlePage({ section, slug }: { section: string; slug: string }) {
  const item = proofArticle(section, slug);
  if (!item?.article) notFound();
  const hero = item.article.hero ?? item.media;
  const body = readFileSync(path.join(process.cwd(), "content", section, `${slug}.md`), "utf8");
  // "#" headings are the sections of the contents list and "##" their sub-sections; deeper ones stay out.
  const sections: ContentsSection[] = [];
  for (const [, level, heading] of body.matchAll(/^(#{1,2}) (.+)$/gm)) {
    const entry = { id: anchor(heading), heading };
    if (level === "#") sections.push({ ...entry, children: [] });
    else sections.at(-1)?.children.push(entry);
  }

  return (
    <main id="top">
      <Nav current={section} />
      {/* 1440 frame: the contents list sits at the design's x=99, level with the cover; the article is a centred 683px column. */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Wide enough to reach the article's left edge less a gap: 248px at 1440, narrower down to 1280. */}
        <aside className="absolute top-[239px] bottom-0 left-[99px] hidden w-[min(248px,calc(50vw-472px))] xl:block">
          <ArticleContents sections={sections} />
        </aside>

        <article className="mx-auto w-full max-w-[715px] px-4 pt-[96px] pb-[60px] text-[16px] leading-[26px] sm:pt-[117px]">
          {/* Title carries the page; the subtitle is a quiet line of disciplines under it. */}
          <h1 className="text-[34px] leading-[40px] font-bold tracking-[-0.02em] sm:text-[42px] sm:leading-[48px]">
            {item.title}
          </h1>
          <p className="mt-2 text-[18px] leading-[26px] text-ink-muted">{item.subtitle}</p>

          {/* Same 16:9 frame as the section tiles, so the card's thumbnail doubles as the cover. */}
          <div className="pow-tile mt-[40px]">
            {hero && (
              <Image
                src={hero.src}
                alt={hero.alt ?? `${item.title} cover`}
                fill
                priority
                sizes="(max-width: 715px) 100vw, 683px"
                className="object-cover"
              />
            )}
          </div>

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
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {body}
            </Markdown>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
