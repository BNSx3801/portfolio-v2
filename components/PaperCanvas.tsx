"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { PaperCanvas as Canvas } from "@/lib/site";

type View = { x: number; y: number; k: number };

const PAD = 40; // px kept clear around the page when it's fitted
const CAPTION = 24; // px above each artboard for its name
const MAX_ZOOM = 2; // the artboards are exported at 2x
const STEP = 1.25; // one press of + or −

const clamp = (k: number, fit: number) => Math.min(MAX_ZOOM, Math.max(fit / 2, k));

// A stand-in for the embed Paper doesn't have: one page of the file at a time, each artboard an
// exported image at its canvas position. Drag or scroll to pan; pinch or ⌘/Ctrl-scroll to zoom.
export function PaperCanvas({ canvas, title }: { canvas: Canvas; title: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [view, setView] = useState<View | null>(null);
  const fitK = useRef(1);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const [dragging, setDragging] = useState(false);
  const artboards = canvas.pages[page].artboards;

  const fit = useCallback(() => {
    const el = frame.current;
    if (!el) return;
    const minX = Math.min(...artboards.map((a) => a.x));
    const minY = Math.min(...artboards.map((a) => a.y));
    const w = Math.max(...artboards.map((a) => a.x + a.w)) - minX;
    const h = Math.max(...artboards.map((a) => a.y + a.h)) - minY;
    const k = Math.min((el.clientWidth - PAD * 2) / w, (el.clientHeight - PAD * 2 - CAPTION) / h, MAX_ZOOM);
    fitK.current = k;
    setView({
      k,
      x: (el.clientWidth - w * k) / 2 - minX * k,
      y: (el.clientHeight - CAPTION - h * k) / 2 + CAPTION - minY * k,
    });
  }, [artboards]);

  // Fit on load, on a page switch, and when the frame changes size.
  useLayoutEffect(() => {
    fit();
    const observer = new ResizeObserver(fit);
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, [fit]);

  // Zoom by `f` about a point in frame coordinates.
  const zoomAt = useCallback((f: number, px: number, py: number) => {
    setView((v) => {
      if (!v) return v;
      const k = clamp(v.k * f, fitK.current);
      return { k, x: px - ((px - v.x) * k) / v.k, y: py - ((py - v.y) * k) / v.k };
    });
  }, []);

  const zoomCentre = (f: number) => {
    const el = frame.current;
    if (el) zoomAt(f, el.clientWidth / 2, el.clientHeight / 2);
  };

  // React's wheel listener is passive, so the page would scroll too; this one can preventDefault.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Trackpad pinch arrives as ctrl + wheel.
        const r = el.getBoundingClientRect();
        zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
      } else {
        setView((v) => v && { ...v, x: v.x - e.deltaX, y: v.y - e.deltaY });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setDragging(true);
  };

  // One pointer pans; two pinch, zooming about their midpoint and panning as it moves.
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const all = pointers.current;
    const prev = all.get(e.pointerId);
    if (!prev) return;
    const [a, b] = [...all.values()];
    if (all.size === 1) {
      setView((v) => v && { ...v, x: v.x + e.clientX - prev.x, y: v.y + e.clientY - prev.y });
    } else if (all.size === 2) {
      const other = a === prev ? b : a;
      const before = Math.hypot(prev.x - other.x, prev.y - other.y);
      const after = Math.hypot(e.clientX - other.x, e.clientY - other.y);
      const r = e.currentTarget.getBoundingClientRect();
      const midX = (e.clientX + other.x) / 2 - r.left;
      const midY = (e.clientY + other.y) / 2 - r.top;
      setView((v) => v && { ...v, x: v.x + (e.clientX - prev.x) / 2, y: v.y + (e.clientY - prev.y) / 2 });
      if (before > 0) zoomAt(after / before, midX, midY);
    }
    all.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) setDragging(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "0" || e.key === "f" || e.key === "F") fit();
    else if (e.key === "+" || e.key === "=") zoomCentre(STEP);
    else if (e.key === "-" || e.key === "_") zoomCentre(1 / STEP);
    else return;
    e.preventDefault();
  };

  return (
    <div className="canvas-embed mt-[40px]">
      <div
        ref={frame}
        className={`paper-canvas ${dragging ? "is-dragging" : ""}`}
        tabIndex={0}
        role="application"
        aria-label={`${title}: Paper file, ${canvas.pages[page].name} page`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {view && (
          <>
            <div
              className="paper-canvas-world"
              style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})` }}
            >
              {artboards.map((a) => (
                <Image
                  key={a.src}
                  src={a.src}
                  alt={a.name}
                  width={a.w}
                  height={a.h}
                  unoptimized
                  draggable={false}
                  style={{ left: a.x, top: a.y, width: a.w, height: a.h }}
                />
              ))}
            </div>
            {/* Names stay a readable size at any zoom, so they sit outside the scaled layer. */}
            {artboards.map((a) => (
              <span
                key={a.src}
                className="paper-canvas-caption"
                style={{ left: view.x + a.x * view.k, top: view.y + a.y * view.k - 20, maxWidth: a.w * view.k }}
              >
                {a.name}
              </span>
            ))}
          </>
        )}
      </div>

      {/* Like Paper's page list: one page of the file on the canvas at a time. */}
      <div className="paper-canvas-chrome top-3 left-3" role="tablist" aria-label="Pages">
        {canvas.pages.map((p, i) => (
          <button
            key={p.name}
            type="button"
            role="tab"
            aria-selected={i === page}
            onClick={() => setPage(i)}
            className={i === page ? "bg-pill-bg text-pill-fg" : "text-ink-muted hover:text-ink"}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="paper-canvas-chrome right-3 bottom-3">
        <button type="button" aria-label="Zoom out" onClick={() => zoomCentre(1 / STEP)}>
          −
        </button>
        <button type="button" aria-label="Zoom in" onClick={() => zoomCentre(STEP)}>
          +
        </button>
        <button type="button" onClick={fit}>
          Fit
        </button>
      </div>
    </div>
  );
}
