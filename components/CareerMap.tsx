"use client";

import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { career, type CareerStop } from "@/lib/site";

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

const CLOSE_DELAY = 140;

export function CareerMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<SVGPathElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);
  const closeTimer = useRef(0);
  // Focus opens a card before the click lands, so remember what was open when the press began.
  const openAtPress = useRef<number | null>(null);

  const show = useCallback((i: number) => {
    window.clearTimeout(closeTimer.current);
    setOpen(i);
  }, []);
  const hideSoon = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  }, []);

  // Pointer leaving the whole stop (label, marker or card) closes it; keyboard and taps toggle.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const onDown = (e: Event) => {
      if (!(e.target as Element).closest(".career-stop.is-open")) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

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
  }, []);

  return (
    <section id="career" className="mx-auto w-full max-w-[696px] px-4 pt-[128px]">
      <h2 className="ml-[23px] text-[20px] leading-[26px] font-[590] tracking-[-0.01em]">Career Journey</h2>
      <div ref={mapRef} className="career-map mt-[26px]">
        <svg className="career-trail" aria-hidden="true">
          <defs>
            <mask id={`${baseId}m`} maskUnits="userSpaceOnUse" x="-5%" y="-5%" width="110%" height="110%">
              <path ref={revealRef} className="career-reveal" />
            </mask>
          </defs>
          <path ref={dashRef} className="career-dash" mask={`url(#${baseId}m)`} />
        </svg>
        <ol className="career-stops" aria-label="Career so far, earliest first">
          {career.map((stop, i) => {
            const cardId = stop.details ? `${baseId}c${i}` : undefined;
            const isOpen = open === i;
            const hover = stop.details
              ? {
                  onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && show(i),
                  onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && hideSoon(),
                }
              : {};
            return (
              <li
                key={`${stop.org}-${stop.dates}`}
                className={`career-stop${isOpen ? " is-open" : ""}`}
                data-side={i % 2 ? "right" : "left"}
                data-flip={i < career.length / 2 ? "down" : "up"}
                onBlur={(e: FocusEvent) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen((o) => (o === i ? null : o));
                }}
              >
                <span className="career-anchor" aria-hidden="true" {...hover}>
                  <Marker stop={stop} />
                </span>
                {stop.details ? (
                  <button
                    type="button"
                    className="career-label"
                    aria-expanded={isOpen}
                    aria-controls={cardId}
                    onPointerDown={() => (openAtPress.current = open)}
                    onClick={() => (openAtPress.current === i ? setOpen(null) : show(i))}
                    onFocus={() => show(i)}
                    {...hover}
                  >
                    <Label stop={stop} />
                  </button>
                ) : (
                  <div className="career-label">
                    <Label stop={stop} />
                  </div>
                )}
                {stop.details && (
                  <div id={cardId} className="career-card" role="group" aria-label={`${stop.org}: details`} {...hover}>
                    {stop.details.logo ? (
                      <span
                        className="career-logo"
                        role="img"
                        aria-label={stop.org}
                        style={{ maskImage: `url(${stop.details.logo})`, WebkitMaskImage: `url(${stop.details.logo})` }}
                      />
                    ) : (
                      <p className="career-wordmark">{stop.org}</p>
                    )}
                    {stop.details.sections.map((sec) => (
                      <div key={sec.title} className="career-card-section">
                        <p className="career-card-title">{sec.title}</p>
                        {sec.items.length === 1 ? (
                          <p>{sec.items[0]}</p>
                        ) : (
                          <ul>
                            {sec.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
          <li className="career-stop career-end" data-anchor="center" aria-hidden="true">
            <span className="career-anchor career-dot" />
          </li>
        </ol>
      </div>
    </section>
  );
}

function Label({ stop }: { stop: CareerStop }) {
  return (
    <>
      <span className="career-role">{stop.role}</span>
      <span className="career-org">{stop.org}</span>
      <span className="career-dates">{stop.dates}</span>
    </>
  );
}

function Marker({ stop }: { stop: CareerStop }) {
  if (stop.marker === "pin") return <PinIcon />;
  if (stop.marker === "grad") return <GradIcon />;
  return <FlagIcon />;
}

// Pennant flag on a pedestal, after the supplied sample. The base's centre is the ground point.
function FlagIcon() {
  return (
    <svg className="career-flag" viewBox="0 0 26 44" width="26" height="44">
      <rect x="11" y="0" width="4" height="41" rx="2" />
      <path d="M4 44v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3z" />
      <path d="M15 3l11 7.5L15 18z" />
    </svg>
  );
}

// Mortarboard for graduation; the bottom of the cap is the ground point.
function GradIcon() {
  return (
    <svg className="career-grad" viewBox="0 0 32 26" width="32" height="26">
      <path d="M16 1L31 8.5 16 16 1 8.5z" />
      <path d="M8 12.5v6c0 2.5 3.6 4.5 8 4.5s8-2 8-4.5v-6l-8 4z" />
      <path d="M29 9.5v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="29" cy="19" r="1.6" />
    </svg>
  );
}

// Map pin; the tip is the ground point.
function PinIcon() {
  return (
    <svg className="career-pin" viewBox="0 0 24 34" width="27" height="38">
      <path d="M12 34C12 34 2 21.5 2 12a10 10 0 1 1 20 0c0 9.5-10 22-10 22z" />
      <circle className="career-pin-hole" cx="12" cy="12" r="4" />
    </svg>
  );
}
