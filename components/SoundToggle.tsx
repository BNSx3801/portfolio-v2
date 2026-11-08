"use client";

import { useSyncExternalStore } from "react";
import { isSoundOn, setSound, soundServerSnapshot, subscribeSound } from "@/lib/sound";

// Text label at desktop widths, speaker icon below. Always reachable so sounds can be silenced.
export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, isSoundOn, soundServerSnapshot);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      onClick={() => setSound(!on)}
      className="link-underline inline-flex cursor-pointer items-center text-ink-muted"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon xl:hidden">
        <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4Z" />
        {on ? (
          <path d="M15.5 9.2a4 4 0 0 1 0 5.6M18 6.8a7.5 7.5 0 0 1 0 10.4" />
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
      <span className="hidden xl:inline">{on ? "Sound On" : "Sound Off"}</span>
    </button>
  );
}
