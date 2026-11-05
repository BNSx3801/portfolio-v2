"use client";

import { useEffect, useRef, type ReactNode } from "react";

const PULL = 0.14; // how far the pill follows the cursor
const LABEL_PULL = 0.06; // the label follows less, so it appears to shift inside the pill
const EASE = 0.14; // per-frame lerp
const HALO = 24; // px beyond the pill's edge where the pull is active

export function MagneticButton({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    const label = el?.querySelector<HTMLElement>("[data-label]");
    if (!el || !label) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const step = () => {
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      el.style.translate = `${current.x.toFixed(2)}px ${current.y.toFixed(2)}px`;
      const k = LABEL_PULL / PULL;
      label.style.translate = `${(current.x * k).toFixed(2)}px ${(current.y * k).toFixed(2)}px`;
      const settled = Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const near = Math.abs(dx) < r.width / 2 + HALO && Math.abs(dy) < r.height / 2 + HALO;
      target.x = near ? PULL * dx : 0;
      target.y = near ? PULL * dy : 0;
      if (!frame) frame = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={`button-ink ${className}`}>
      <span data-label="" className="inline-flex items-center">
        {children}
      </span>
    </a>
  );
}
