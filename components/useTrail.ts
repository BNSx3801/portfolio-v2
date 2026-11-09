import { useEffect, type RefObject } from "react";

type Pt = { x: number; y: number };

// A stop's heading is the direction the trail travels while passing under it: the start heads
// toward the next stop, every later stop is reached travelling outward (toward its own side).
// Segments are cubics with horizontal tangents, so the trail runs flat under each marker and
// loops around on the outer side before diving to the next one.
function trailPath(pts: Pt[], reach: number) {
  if (pts.length < 2) return "";
  const heading = pts.map((p, i) => (i === 0 ? Math.sign(pts[1].x - p.x) || 1 : Math.sign(p.x - pts[i - 1].x) || 1));
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    d += ` C${a.x + heading[i] * reach} ${a.y} ${b.x - heading[i + 1] * reach} ${b.y} ${b.x} ${b.y}`;
  }
  return d;
}

// Fraction of the trail's length at which it passes closest to each point.
function marksAlong(path: SVGPathElement, length: number, pts: Pt[]) {
  const n = 400;
  const samples = Array.from({ length: n + 1 }, (_, i) => path.getPointAtLength((length * i) / n));
  return pts.map((p) => {
    let best = 0;
    let bestD = Infinity;
    samples.forEach((s, i) => {
      const d = (s.x - p.x) ** 2 + (s.y - p.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best / n;
  });
}

// Draws the dashed trail through each .career-stop's .career-anchor inside the map, revealing it
// with scroll and marking stops as [data-reached] once the trail gets to them. Shared by the
// Career Journey map and the case-study series map.
export function useTrail(
  mapRef: RefObject<HTMLDivElement | null>,
  dashRef: RefObject<SVGPathElement | null>,
  revealRef: RefObject<SVGPathElement | null>,
) {
  useEffect(() => {
    const map = mapRef.current;
    const dash = dashRef.current;
    const reveal = revealRef.current;
    if (!map || !dash || !reveal) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stops = Array.from(map.querySelectorAll<HTMLElement>(".career-stop"));
    let length = 0;
    let marks: number[] = [];
    let frame = 0;

    const paint = () => {
      frame = 0;
      const rect = map.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts drawing when the map's top is 85% down the viewport, finishes when its bottom passes 60%.
      const p = reduce ? 1 : Math.min(1, Math.max(0, (0.85 * vh - rect.top) / (0.25 * vh + rect.height)));
      reveal.style.strokeDashoffset = `${length * (1 - p)}`;
      // Data attributes, not classes: React owns className and would wipe these on re-render.
      stops.forEach((s, i) => s.toggleAttribute("data-reached", p >= marks[i] - 0.005));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const layout = () => {
      const box = map.getBoundingClientRect();
      const pts = stops.map((s) => {
        const a = s.querySelector<HTMLElement>(".career-anchor")!.getBoundingClientRect();
        const y = s.dataset.anchor === "center" ? a.top + a.height / 2 : a.bottom;
        return { x: a.left + a.width / 2 - box.left, y: y - box.top };
      });
      const swing = Math.abs(pts[1].x - pts[0].x);
      const d = trailPath(pts, Math.max(24, Math.min(140, swing * 0.4)));
      dash.setAttribute("d", d);
      reveal.setAttribute("d", d);
      length = reveal.getTotalLength();
      reveal.style.strokeDasharray = `${length}`;
      marks = marksAlong(reveal, length, pts);
      paint();
    };

    layout();
    map.setAttribute("data-live", "");
    const ro = new ResizeObserver(layout);
    ro.observe(map);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [mapRef, dashRef, revealRef]);
}
