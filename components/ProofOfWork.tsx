import Image from "next/image";
import { proofItemHref, proofSection, type ProofItem } from "@/lib/site";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

function Tile({ item, href }: { item: ProofItem; href?: string }) {
  const media = item.media && (
    <Image
      src={item.media.src}
      alt={item.media.alt ?? `${item.title} preview`}
      fill
      sizes="(max-width: 507px) 100vw, 475px"
      className="object-cover"
      style={item.media.position ? { objectPosition: item.media.position } : undefined}
    />
  );
  return href ? (
    <a href={href} className="pow-tile" aria-label={`${item.title}: ${item.subtitle}`}>
      {media}
    </a>
  ) : (
    <div className="pow-tile">{media}</div>
  );
}

// The whole page for one section; each route under app/proof-of-work renders this with its slug.
export function ProofOfWorkPage({ slug }: { slug: string }) {
  const section = proofSection(slug);
  return (
    <main id="top">
      <Nav current={slug} />
      {/* 707px column, centred: the note sits in the middle and the tiles swing between its edges. */}
      <section className="mx-auto w-full max-w-[739px] px-4 pt-[76px] sm:pt-[100px]">
        {section.note ? (
          <div className="pow-note">
            <Image src="/assets/pow-paper.png" alt="" fill priority sizes="(max-width: 689px) 100vw, 657px" className="note-paper object-cover" />
            <div className="pow-note-text">
              <h1>{section.heading}</h1>
              <h2>{section.note.title}</h2>
              {section.note.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="pow-heading">{section.heading}</h1>
        )}

        <ol className="mt-16 flex flex-col gap-16 sm:mt-[109px] sm:gap-[104px]">
          {section.items.map((item, i) => (
            <li key={i} className="pow-item">
              <Tile item={item} href={proofItemHref(slug, item)} />
              <div className="mt-[13px] sm:ml-[39px]">
                <p className="font-[590]">{item.title}</p>
                <p className="mt-0.5 text-ink-muted">{item.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Footer />
    </main>
  );
}
