"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProjectMedia } from "@/lib/site";

const HOLD_MS = 3200;

// Crossfades through a project's images. Pauses when the tab is hidden; reduced-motion users
// only ever see the first frame.
export function CardSlideshow({ media }: { media: ProjectMedia[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: number | undefined;
    const start = () => {
      stop();
      id = window.setInterval(() => setIndex((i) => (i + 1) % media.length), HOLD_MS);
    };
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [media.length]);

  return (
    <div className="card-media">
      {media.map((m, i) => (
        <Image
          key={m.src}
          src={m.src}
          alt={m.alt ?? ""}
          fill
          sizes="(max-width: 767px) 82vw, 840px"
          priority={i === 0}
          className={`card-slide object-cover${i === index ? " is-active" : ""}`}
          draggable={false}
        />
      ))}
    </div>
  );
}
