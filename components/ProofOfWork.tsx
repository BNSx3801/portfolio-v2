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

// The whole page for one section; each route under app/proof-of-work renders this with its slug.
export function ProofOfWorkPage({ slug }: { slug: string }) {
  const section = proofSection(slug);
  return (
    <main id="top">
      <Nav current={slug} />
      {/* 707px column, centred: the tiles swing between its edges. */}
      <section className="mx-auto w-full max-w-[739px] px-4 pt-[76px] sm:pt-[112px]">
        <h1 className="text-center text-[18px] leading-[34px] font-[510] text-balance underline decoration-1 underline-offset-[10px] sm:text-[22px] sm:leading-[28px]">
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
