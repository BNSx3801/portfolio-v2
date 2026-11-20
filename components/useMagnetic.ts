import { useEffect, type RefObject } from "react";

const EASE = 0.14; // per-frame lerp, same as MagneticButton

// Every element under `root` matching `selector` leans toward the cursor while it is within `halo`
// px of the element's edge. Moves via `transform`, so a CSS `translate` on the same element still applies.
export function useMagnetic(root: RefObject<HTMLElement | null>, selector: string, pull: number, halo: number) {
  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>(selector) ?? []);
    if (!els.length) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const items = els.map((el) => ({ el, target: { x: 0, y: 0 }, current: { x: 0, y: 0 } }));
    let frame = 0;

    const step = () => {
      let settled = true;
      for (const { el, target, current } of items) {
        current.x += (target.x - current.x) * EASE;
        current.y += (target.y - current.y) * EASE;
        el.style.transform = `translate(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px)`;
        if (Math.abs(target.x - current.x) >= 0.05 || Math.abs(target.y - current.y) >= 0.05) settled = false;
      }
      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      for (const { el, target, current } of items) {
        // Measure the resting box, not the one already pulled toward the cursor.
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left - current.x + r.width / 2);
        const dy = e.clientY - (r.top - current.y + r.height / 2);
        const near = Math.abs(dx) < r.width / 2 + halo && Math.abs(dy) < r.height / 2 + halo;
        target.x = near ? pull * dx : 0;
        target.y = near ? pull * dy : 0;
      }
      if (!frame) frame = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      for (const { el } of items) el.style.transform = "";
    };
  }, [root, selector, pull, halo]);
}
