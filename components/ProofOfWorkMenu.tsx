"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { proofOfWork } from "@/lib/site";

const CLOSE_DELAY = 140;

// `current` is the slug of the section page being viewed, if any.
export function ProofOfWorkMenu({ current }: { current?: string }) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(0);
  // Focus opens the menu before the click lands, so remember whether it was open when the press began.
  const openAtPress = useRef(false);
  // Escape hands focus back to the trigger, which must not reopen the menu.
  const skipFocus = useRef(false);

  const show = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);
  const hideSoon = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, []);

  // Pointer leaving the trigger and the bar closes it; keyboard and taps toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (rootRef.current?.contains(document.activeElement) && document.activeElement !== triggerRef.current) {
        skipFocus.current = true;
        triggerRef.current?.focus();
      }
      setOpen(false);
    };
    const onDown = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hover = {
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && show(),
    onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && hideSoon(),
  };

  return (
    <div
      ref={rootRef}
      onBlur={(e: FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="link-underline pow-trigger whitespace-nowrap"
        aria-expanded={open}
        aria-controls={menuId}
        onPointerDown={() => (openAtPress.current = open)}
        onClick={() => (openAtPress.current ? setOpen(false) : show())}
        onFocus={() => {
          if (skipFocus.current) skipFocus.current = false;
          else show();
        }}
        {...hover}
      >
        Proof-of-Work
      </button>
      {/* Sits right after the trigger so Tab walks into it; fixed, so it still spans the viewport. */}
      <div id={menuId} className={`bg-paper/85 backdrop-blur-md pow-menu${open ? " is-open" : ""}`} {...hover}>
        <ul className="mx-auto flex h-full max-w-[1440px] items-center gap-4 overflow-x-auto pr-7 pl-5 whitespace-nowrap md:justify-center xl:justify-start xl:gap-[40px] xl:px-0 xl:pl-[212px]">
          {proofOfWork.map((section) => (
            <li key={section.slug}>
              <Link
                href={`/proof-of-work/${section.slug}`}
                className="link-underline"
                aria-current={section.slug === current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
