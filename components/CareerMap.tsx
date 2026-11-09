"use client";

import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { career, type CareerStop } from "@/lib/site";
import { useTrail } from "./useTrail";

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

  useTrail(mapRef, dashRef, revealRef);

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
export function FlagIcon() {
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
export function PinIcon() {
  return (
    <svg className="career-pin" viewBox="0 0 24 34" width="27" height="38">
      <path d="M12 34C12 34 2 21.5 2 12a10 10 0 1 1 20 0c0 9.5-10 22-10 22z" />
      <circle className="career-pin-hole" cx="12" cy="12" r="4" />
    </svg>
  );
}
