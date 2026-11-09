"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/site";
import { ProjectCard } from "./ProjectCard";

const SPEED = 40; // px per second of auto-scroll
const DRAG_THRESHOLD = 6; // px of movement before a pointer-down counts as a drag, not a click
const FRICTION = 0.94; // per-frame decay of fling velocity
const RESUME_DELAY = 1800; // ms after the user lets go before auto-scroll eases back in

export function ProjectRail() {
  const railRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Track position, in px. The second set is a clone, so offsets wrap at one set's width.
    let x = 0;
    let setWidth = 0;
    let velocity = 0; // px/s from a fling
    let auto = reduceMotion ? 0 : 1; // 0..1 blend of auto-scroll speed
    let hovering = false;
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastT = 0;
    let resumeAt = 0;
    let last = performance.now();
    let frame = 0;

    const measure = () => {
      setWidth = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = () => {
      if (!setWidth) return;
      x = ((x % setWidth) + setWidth) % setWidth;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!dragging) {
        if (Math.abs(velocity) > 2) {
          x += velocity * dt;
          velocity *= Math.pow(FRICTION, dt * 60);
        } else {
          velocity = 0;
        }
        const wantAuto = !reduceMotion && !hovering && now >= resumeAt ? 1 : 0;
        auto += (wantAuto - auto) * Math.min(1, dt * 3);
        x += SPEED * auto * dt;
      }
      wrap();
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      velocity = 0;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dtMs = e.timeStamp - lastT;
      if (!moved && Math.abs(dx) < DRAG_THRESHOLD) return;
      if (!moved) {
        moved = true;
        rail.classList.add("is-dragging");
        // Capture only once it is a drag: capturing on press would retarget the click to the
        // rail and a plain click on a card would never reach its link.
        rail.setPointerCapture(e.pointerId);
      }
      x -= dx;
      if (dtMs > 0) velocity = (-dx / dtMs) * 1000;
      lastX = e.clientX;
      lastT = e.timeStamp;
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
      // If the pointer sat still before release, don't fling.
      if (e.timeStamp - lastT > 80) velocity = 0;
      resumeAt = e.timeStamp + RESUME_DELAY;
      // Keep the class until the click event (which fires after pointerup) has been swallowed.
      requestAnimationFrame(() => rail.classList.remove("is-dragging"));
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    // Sideways trackpad swipes (and shift + wheel) scroll the rail; vertical ones are left to the page.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      // Keeps the swipe from also nudging the page or triggering the browser's back gesture.
      if (e.cancelable) e.preventDefault();
      x += e.deltaX * (e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1);
      velocity = 0;
      resumeAt = e.timeStamp + RESUME_DELAY;
    };
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);

    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointermove", onPointerMove);
    rail.addEventListener("pointerup", endDrag);
    rail.addEventListener("pointercancel", endDrag);
    rail.addEventListener("click", onClick, true);
    rail.addEventListener("wheel", onWheel, { passive: false });
    rail.addEventListener("pointerenter", onEnter);
    rail.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointermove", onPointerMove);
      rail.removeEventListener("pointerup", endDrag);
      rail.removeEventListener("pointercancel", endDrag);
      rail.removeEventListener("click", onClick, true);
      rail.removeEventListener("wheel", onWheel);
      rail.removeEventListener("pointerenter", onEnter);
      rail.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="work" aria-label="Selected work" className="rail" ref={railRef}>
      <div className="rail-track" ref={trackRef}>
        <div className="rail-set">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
        {/* Duplicate set so the loop wraps seamlessly. */}
        <div className="rail-set" aria-hidden="true">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} tabIndex={-1} />
          ))}
        </div>
      </div>
    </section>
  );
}
