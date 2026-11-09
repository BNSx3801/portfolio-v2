"use client";

import Link from "next/link";
import { useId, useRef } from "react";
import type { SeriesPart } from "@/lib/site";
import { FlagIcon, PinIcon } from "./CareerMap";
import { useTrail } from "./useTrail";

// The parts of a case-study series on the same dashed trail as the Career Journey,
// reading order top to bottom; each stop opens its part.
export function SeriesMap({ parts, base }: { parts: SeriesPart[]; base: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<SVGPathElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const baseId = useId();
  useTrail(mapRef, dashRef, revealRef);

  return (
    <div ref={mapRef} className="career-map series-map">
      <svg className="career-trail" aria-hidden="true">
        <defs>
          <mask id={`${baseId}m`} maskUnits="userSpaceOnUse" x="-5%" y="-5%" width="110%" height="110%">
            <path ref={revealRef} className="career-reveal" />
          </mask>
        </defs>
        <path ref={dashRef} className="career-dash" mask={`url(#${baseId}m)`} />
      </svg>
      <ol className="career-stops" aria-label="The series, in reading order">
        {parts.map((part, i) => (
          <li key={part.slug} className="career-stop" data-side={i % 2 ? "right" : "left"}>
            <span className="career-anchor" aria-hidden="true">
              {i === 0 ? <PinIcon /> : <FlagIcon />}
            </span>
            <Link href={`${base}/${part.slug}`} className="career-label">
              <span className="career-dates">Part {String(i + 1).padStart(2, "0")}</span>
              <span className="career-role">{part.title}</span>
              <span className="career-dates">{part.date}</span>
            </Link>
          </li>
        ))}
        <li className="career-stop career-end" data-anchor="center" aria-hidden="true">
          <span className="career-anchor career-dot" />
        </li>
      </ol>
    </div>
  );
}
