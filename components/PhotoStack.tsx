"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos } from "@/lib/site";

const INTERVAL_MS = 3000;
const LEAVE_MS = 460;

export function PhotoStack({ className = "" }: { className?: string }) {
  // order[0] is the print on top.
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  const leavingRef = useRef(false);

  const advance = useCallback(() => {
    if (leavingRef.current || photos.length < 2) return;
    leavingRef.current = true;
    setLeaving(order[0]);
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
      leavingRef.current = false;
    }, LEAVE_MS);
  }, [order]);

  // Autoplay. Re-armed whenever the order changes, so a click restarts the 3s countdown.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(advance, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [advance]);

  return (
    <button
      type="button"
      onClick={advance}
      aria-label="Show next photo"
      className={`photo-stack block border-0 bg-transparent p-0 ${className}`}
    >
      {photos.map((photo, i) => {
        const place = order.indexOf(i);
        const isLeaving = leaving === i;
        return (
          <span
            key={photo.src + i}
            className="photo-print"
            data-place={place}
            data-leaving={isLeaving ? "" : undefined}
            style={{ zIndex: isLeaving ? photos.length + 1 : photos.length - place }}
          >
            <Image
              src={photo.src}
              alt={place === 0 ? photo.alt : ""}
              fill
              sizes="210px"
              priority={i === 0}
              className="object-cover"
            />
          </span>
        );
      })}
    </button>
  );
}
