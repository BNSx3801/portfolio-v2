"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export function Clock() {
  // Server renders the placeholder; the browser fills in IST once mounted.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    // Align the first interval to the next second boundary so the display never skips.
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 1000);
    }, 1000 - (Date.now() % 1000));
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <p className="flex gap-[7px] whitespace-nowrap">
      <span>GMT +5:30 -</span>
      <time className="tabular-nums" aria-live="off" suppressHydrationWarning>
        {time ?? "--:--:--"}
      </time>
    </p>
  );
}
