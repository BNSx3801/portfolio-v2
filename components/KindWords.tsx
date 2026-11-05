"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { notes } from "@/lib/site";

const LEAVE_MS = 460;
const pad = (n: number) => String(n).padStart(2, "0");

export function KindWords() {
  // order[0] is the note on top.
  const [order, setOrder] = useState(() => notes.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  const busy = useRef(false);

  const advance = useCallback(() => {
    if (busy.current || notes.length < 2) return;
    busy.current = true;
    setLeaving(order[0]);
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
      busy.current = false;
    }, LEAVE_MS);
  }, [order]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      advance();
    }
  };

  return (
    <section id="kind-words" className="mx-auto w-full max-w-[696px] px-4 pt-[148px]">
      <div className="flex items-start justify-between">
        <h2 className="ml-[23px] font-[590]">Kind Words</h2>
        <p className="mt-6 mr-[19px] text-[12px] leading-[16px] text-ink-muted tabular-nums" aria-live="polite">
          {pad(order[0] + 1)} / {pad(notes.length)}
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={advance}
        onKeyDown={onKey}
        aria-label="Show next note"
        className="note-stack mt-[28px]"
      >
        {notes.map((note, i) => {
          const place = order.indexOf(i);
          const isLeaving = leaving === i;
          return (
            <article
              key={note.author}
              className="kind-note"
              data-place={place}
              data-leaving={isLeaving ? "" : undefined}
              style={{ zIndex: isLeaving ? notes.length + 1 : notes.length - place }}
              aria-hidden={place !== 0}
            >
              <p className="text-[12px] leading-[16px] text-ink-muted uppercase">A note from {note.firstName}</p>
              <p className="mt-[19px] max-w-[600px]">{note.quote}</p>
              <p className="kind-signature mt-[13px] ml-[6px] font-script text-[22px] leading-[28px]">{note.author}</p>
              <p className="mt-[-7px] text-[10px] leading-[14px] text-ink-muted">{note.role}</p>
              <span className="kind-avatar">
                <Image src={note.avatar} alt="" fill sizes="97px" className="object-cover" />
              </span>
            </article>
          );
        })}
      </div>

      <button type="button" onClick={advance} className="link-underline mt-[48px] ml-[23px] cursor-pointer text-[12px] leading-[16px] text-ink-muted">
        Next Note
      </button>
    </section>
  );
}
