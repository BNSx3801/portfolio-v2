import { companies } from "@/lib/site";

const CELLS = 12; // 4 x 3, as in the design

export function CompaniesGrid() {
  const cells = Array.from({ length: CELLS }, (_, i) => companies[i] ?? null);
  return (
    <section id="companies" className="mx-auto w-full max-w-[696px] px-4 pt-[128px]">
      <h2 className="ml-[23px] font-[590]">Companies &amp; Products I&apos;ve worked w/:</h2>
      <ul className="logo-grid mt-[22px]" aria-label="Companies and products">
        {cells.map((c, i) => (
          <li key={c ? c.name : `empty-${i}`} className="logo-cell">
            {c && (
              <a
                href={c.href ?? "#"}
                className="logo"
                aria-label={c.name}
                title={c.name}
                style={{ maskImage: `url(${c.logo})`, WebkitMaskImage: `url(${c.logo})` }}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
