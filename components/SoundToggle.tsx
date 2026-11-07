"use client";

import { useSyncExternalStore } from "react";
import { isSoundOn, setSound, soundServerSnapshot, subscribeSound } from "@/lib/sound";

export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, isSoundOn, soundServerSnapshot);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setSound(!on)}
      className="link-underline cursor-pointer text-ink-muted"
    >
      {on ? "Sound On" : "Sound Off"}
    </button>
  );
}
