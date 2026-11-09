"use client";

import { useEffect, useState } from "react";

// A section counts as being read once its top passes this line under the fixed nav.
const READ_LINE = 120;

// Sticky contents list; the section being read is in full ink, the rest muted.
export function ArticleContents({ sections }: { sections: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0]?.id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= READ_LINE) current = id;
      }
      // At the very bottom the last short sections never reach the line; hand it to the last one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id ?? current;
      }
      setActive(current);
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
        {sections.map(({ id, heading }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`link-underline ${id === active ? "text-ink" : "text-ink-muted"}`}
              aria-current={id === active ? "location" : undefined}
            >
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
