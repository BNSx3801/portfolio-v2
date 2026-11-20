import Image from "next/image";
import { proofItemHref, proofSection, type ProofItem } from "@/lib/site";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

function Tile({ item, href }: { item: ProofItem; href?: string }) {
  const media = item.media?.type === "video" ? (
    // Muted and inline so browsers allow autoplay; loops as a silent preview.
    <video
      src={item.media.src}
      aria-label={item.media.alt ?? `${item.title} preview`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
      style={item.media.position ? { objectPosition: item.media.position } : undefined}
    />
  ) : item.media && (
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

const WATERMARK_ROWS = 120;
const WATERMARK_WORDS_PER_ROW = 24; // long enough to reach the corners of a tall page once tilted

// The section's name, tiled in tilted rows behind the page. "Case Studies / Research Reports" becomes
// Case-Studies and Research-Reports; each row starts one word further along so the columns don't line up.
function Watermark({ text }: { text: string }) {
  const words = text.split("/").map((w) => w.trim().replace(/\s+/g, "-"));
  const repeats = Math.ceil(WATERMARK_WORDS_PER_ROW / words.length);
  return (
    <div className="pow-watermark" aria-hidden="true">
      <div className="pow-watermark-sheet">
        {Array.from({ length: WATERMARK_ROWS }, (_, row) => {
          const shift = row % words.length;
          const line = [...words.slice(shift), ...words.slice(0, shift)];
          return <p key={row}>{Array.from({ length: repeats }, () => line).flat().join("\u2003\u2003")}</p>;
        })}
      </div>
    </div>
  );
}

// The whole page for one section; each route under app/proof-of-work renders this with its slug.
export function ProofOfWorkPage({ slug }: { slug: string }) {
  const section = proofSection(slug);
  return (
    <main id="top" className="relative isolate">
      <Nav current={slug} />
      <Watermark text={section.heading ?? section.label} />
      {/* 707px column, centred: the tiles swing between its edges. */}
      <section className="mx-auto w-full max-w-[739px] px-4 pt-[76px] sm:pt-[112px]">
        {/* The watermark carries the name visually; the heading stays for screen readers and search. */}
        <h1 className="sr-only">
          {section.heading ?? section.label}
        </h1>
        {section.items.length === 0 ? (
          <p className="mt-12 text-center text-ink-muted sm:mt-[70px]">Coming Soon</p>
        ) : (
          <ol className="mt-12 flex flex-col gap-16 sm:mt-[70px] sm:gap-[104px]">
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
        )}
      </section>
      <Footer />
    </main>
  );
}
