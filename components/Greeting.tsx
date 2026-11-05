"use client";

import { useEffect, useState } from "react";
import { greetings } from "@/lib/site";

const INTERVAL_MS = 3000;
const FLIP_MS = 550;

export function Greeting() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let clear: number | undefined;
    const id = window.setInterval(() => {
      setIndex((i) => {
        setPrevious(i);
        return (i + 1) % greetings.length;
      });
      clear = window.setTimeout(() => setPrevious(null), FLIP_MS);
    }, INTERVAL_MS);
    return () => {
      window.clearInterval(id);
      if (clear) window.clearTimeout(clear);
    };
  }, []);

  const current = greetings[index];
  const prev = previous === null ? null : greetings[previous];

  return (
    <p className="flex items-end gap-[5px]">
      <span className="hello text-[20px] leading-[24px] font-bold" aria-live="polite">
        {prev && (
          <span key={`out-${previous}`} className="hello-out" aria-hidden="true">
            {prev.word}
          </span>
        )}
        <span key={`in-${index}`} className={prev ? "hello-in" : undefined}>
          {current.word}
        </span>
      </span>
      <span className="hello text-ink-muted" style={{ height: 28 }}>
        {prev && (
          <span key={`out-${previous}`} className="fade-out" aria-hidden="true">
            {prev.lang}
          </span>
        )}
        <span key={`in-${index}`} className={prev ? "fade-in" : undefined}>
          {current.lang}
        </span>
      </span>
    </p>
  );
}
