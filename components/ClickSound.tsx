"use client";

import { useEffect } from "react";
import { isSoundOn } from "@/lib/sound";

const SRC = "/assets/new-click-sound.mp3";

// Plays a short click on every primary pointer press anywhere on the page, when sound is on.
// Renders nothing. Browsers allow play() here because a pointer press is a user gesture.
export function ClickSound() {
  useEffect(() => {
    const audio = new Audio(SRC);
    audio.preload = "auto";

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || !isSoundOn()) return;
      audio.currentTime = 0;
      audio.play().catch(() => {
        /* autoplay policy or decode error: stay silent */
      });
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      audio.pause();
    };
  }, []);

  return null;
}
