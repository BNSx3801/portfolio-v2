"use client";

import { useState } from "react";

// Stub: toggles state only. Hook up audio here once the sound design is decided.
export function SoundToggle() {
  const [on, setOn] = useState(true);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className="link-underline cursor-pointer text-ink-muted"
    >
      {on ? "Sound On" : "Sound Off"}
    </button>
  );
}
