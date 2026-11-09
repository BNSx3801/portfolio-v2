"use client";

import { useEffect, useState } from "react";

export type ContentsEntry = { id: string; heading: string };
export type ContentsSection = ContentsEntry & { children: ContentsEntry[] };

// A heading counts as being read once its top passes this line under the fixed nav.
const READ_LINE = 120;

function passed(id: string) {
  const el = document.getElementById(id);
  return !!el && el.getBoundingClientRect().top <= READ_LINE;
}

// Sticky contents list. The section being read is in full ink and opens to show its
// sub-sections; the rest stay muted and closed so the list fits the screen.
export function ArticleContents({ sections }: { sections: ContentsSection[] }) {
  const [active, setActive] = useState<{ section?: string; sub?: string }>({ section: sections[0]?.id });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let section = sections[0]?.id;
      let sub: string | undefined;
      for (const s of sections) {
        if (!passed(s.id)) break;
        section = s.id;
        sub = undefined;
        for (const c of s.children) {
          if (!passed(c.id)) break;
          sub = c.id;
        }
      }
      // At the very bottom the last short sections never reach the line; hand it to the last one.
      const last = sections.at(-1);
      if (last && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        section = last.id;
        sub = last.children.at(-1)?.id;
      }
      setActive((prev) => (prev.section === section && prev.sub === sub ? prev : { section, sub }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav aria-label="Contents" className="sticky top-[104px]">
      <p className="text-[11px] leading-[16px] tracking-[0.08em] text-ink-muted uppercase">Contents</p>
      <ul className="mt-2 flex flex-col gap-1">
        {sections.map(({ id, heading, children }) => {
          const open = id === active.section;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`link-underline ${open ? "text-ink" : "text-ink-muted"}`}
                aria-current={open && !active.sub ? "location" : undefined}
              >
                {heading}
              </a>
              {open && children.length > 0 && (
                <ul className="my-1 flex flex-col gap-0.5 border-l border-ink-faint pl-3 text-[13px] leading-[20px]">
                  {children.map((c) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className={`link-underline ${c.id === active.sub ? "text-ink" : "text-ink-muted"}`}
                        aria-current={c.id === active.sub ? "location" : undefined}
                      >
                        {c.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
