// Tiny external store for the site-wide sound setting. Persists to localStorage and is
// read by both the nav toggle and the click-sound player.

const KEY = "sound";
let enabled: boolean | null = null;
const listeners = new Set<() => void>();

export function isSoundOn(): boolean {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(KEY) !== "off";
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

export function setSound(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}

export function subscribeSound(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Server render and first client paint both assume "on"; the real value swaps in after hydration.
export const soundServerSnapshot = () => true;
