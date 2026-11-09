import Image from "next/image";
import { notFound } from "next/navigation";
import { proofArticle } from "@/lib/site";
import { ArticleContents } from "./ArticleContents";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

// Heading text becomes the anchor the contents list jumps to.
function anchor(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// One case study or write-up; app/proof-of-work/<section>/[slug] renders this.
export function ProofArticlePage({ section, slug }: { section: string; slug: string }) {
  const item = proofArticle(section, slug);
  if (!item?.article) notFound();
  const hero = item.article.hero ?? item.media;
  const sections = item.article.sections.map((s) => ({ ...s, id: anchor(s.heading) }));

  return (
    <main id="top">
      <Nav current={section} />
      {/* 1440 frame: the contents list sits at the design's x=99, level with the cover; the article is a centred 683px column. */}
      <div className="relative mx-auto w-full max-w-[1440px]">
        <aside className="absolute top-[239px] bottom-0 left-[99px] hidden xl:block">
          <ArticleContents sections={sections.map(({ id, heading }) => ({ id, heading }))} />
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

          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mt-[56px] scroll-mt-[104px]">
              <h2 className="mb-3 text-[20px] leading-[26px] font-[590] tracking-[-0.01em]">{s.heading}</h2>
              {s.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="[&+p]:mt-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
      <Footer />
    </main>
  );
}
