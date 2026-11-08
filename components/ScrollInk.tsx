"use client";

import { useEffect, useRef, type ReactNode } from "react";

// On narrow screens the bio "inks in" word by word as the page scrolls. At laptop widths the
// whole block is visible at once, so every word stays at full opacity. Ported from davemiye.com.
export function ScrollInk({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(root.querySelectorAll<HTMLElement>(".hero-word"));
    const narrow = matchMedia("(max-width: 1279px)");
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!narrow.matches) {
        words.forEach((w) => w.style.removeProperty("opacity"));
        return;
      }
      const vh = window.innerHeight;
      const limit = Math.max(root.getBoundingClientRect().bottom + window.scrollY - 0.5 * vh, 0.35 * vh);
      const progress = Math.min(1, Math.max(0, window.scrollY / limit)) * (words.length + 4);
      words.forEach((w, i) => {
        const k = Math.min(1, Math.max(0, (progress - i) / 4));
        // Floor of 0.6 keeps un-inked words above 4.5:1 contrast on both paper colours.
        w.style.opacity = (0.6 + 0.4 * k).toFixed(3);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    narrow.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      narrow.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
