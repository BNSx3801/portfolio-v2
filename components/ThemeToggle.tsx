"use client";

import { useLayoutEffect, useSyncExternalStore, type MouseEvent } from "react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// The <html data-theme> attribute is the source of truth; React just mirrors it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable */
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);

  // The inline script in layout.tsx applies the saved theme before paint. React's dev-mode
  // remount clears <html> attributes, so re-apply it here (a no-op in production).
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "light" ? "dark" : "light";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (!doc.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    // Sweep out from the button: a circle that grows until it covers the farthest corner.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        {
          duration: 600,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="link-underline inline-flex cursor-pointer items-center text-ink-muted"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon xl:hidden">
        {theme === "light" ? (
          <path d="M19.5 14.6A7.7 7.7 0 0 1 9.4 4.5a7.9 7.9 0 1 0 10.1 10.1Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
      <span className="hidden xl:inline">{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
