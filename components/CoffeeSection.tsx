"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact } from "@/lib/site";
import { isSoundOn } from "@/lib/sound";

const TYPING_MS = 900;
// Pause after a bubble lands before the next typing indicator; long enough for the tune (~0.46s) to finish.
const GAP_MS = 650;
const LINES = 3;
const TUNE_SRC = "/assets/iMessage-tune.mp3";

export function CoffeeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0); // how many lines are revealed
  const [typing, setTyping] = useState(false);
  const [composeVisible, setComposeVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const tuneRef = useRef<HTMLAudioElement | null>(null);

  // Plays the iMessage tune when a bubble lands, if sound is on. Browsers may refuse until the
  // visitor has interacted with the page once; in that case it just stays quiet.
  const ping = () => {
    if (!isSoundOn()) return;
    const tune = tuneRef.current;
    if (!tune) return;
    tune.currentTime = 0;
    tune.play().catch(() => {});
  };

  // Play the thread once the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const tune = new Audio(TUNE_SRC);
    tune.preload = "auto";
    tuneRef.current = tune;
    let timers: number[] = [];
    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShown(LINES);
        setComposeVisible(true);
        return;
      }
      let t = 0;
      for (let i = 0; i < LINES; i++) {
        timers.push(window.setTimeout(() => setTyping(true), t));
        t += TYPING_MS;
        timers.push(
          window.setTimeout(() => {
            setTyping(false);
            setShown(i + 1);
            ping();
          }, t),
        );
        t += GAP_MS;
      }
      timers.push(window.setTimeout(() => setComposeVisible(true), t));
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      timers = [];
      tune.pause();
      tuneRef.current = null;
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ note: data.get("note"), from: data.get("from"), website: data.get("website") }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Couldn't deliver the note. Please try again.");
      }
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't deliver the note. Please try again.");
    }
  }

  const typingAt = typing ? shown : -1; // which slot shows the dots

  return (
    <section id="contact" ref={sectionRef} className="mx-auto w-full max-w-[696px] px-4 pt-[187px]">
      <h2 className="relative z-10 ml-[23px] font-[590]">Let&apos;s have coffee?</h2>

      <div className="relative mt-[-34px] ml-[-3px] h-[587px] w-[671px] max-w-[calc(100%+6px)]">
        <Image
          src="/assets/coffee-paper.png"
          alt=""
          fill
          sizes="671px"
          className="coffee-paper object-contain"
        />

        <ol className="absolute top-[131px] left-[72px] flex w-[470px] flex-col gap-[10px]" aria-live="polite">
          {/* line 1 */}
          <li className="contact-line pl-[50px]">
            {typingAt === 0 && <Typing />}
            {shown > 0 && (
              <p className="contact-bubble flex h-[60px] w-[403px] items-center px-[9px]">
                Hey Stranger! Building/researching something cool? I&apos;d love to hear about it.
              </p>
            )}
          </li>
          {/* line 2 */}
          <li className="contact-line pl-[50px]">
            {typingAt === 1 && <Typing />}
            {shown > 1 && (
              <div className="flex items-center gap-[9px]">
                <p className="contact-bubble flex h-[37px] w-[308px] items-center px-[9px] whitespace-nowrap">
                  Email me at&nbsp;
                  <a href={`mailto:${contact.email}`} className="font-bold underline underline-offset-2">
                    {contact.email}
                  </a>
                </p>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Copied" : "Copy email address"}
                  className="contact-bubble grid h-[37px] w-[37px] cursor-pointer place-items-center rounded-full"
                >
                  {copied ? (
                    <span className="text-[12px]">✓</span>
                  ) : (
                    <Image src="/assets/copy-icon.png" alt="" width={18} height={20} className="copy-icon" />
                  )}
                </button>
              </div>
            )}
          </li>
          {/* line 3, with the avatar */}
          <li className="contact-line flex items-center gap-[13px]">
            {(typingAt === 2 || shown > 2) && (
              <span className="relative h-[37px] w-[37px] shrink-0 overflow-hidden rounded-full">
                <Image src="/assets/avatar-bns.png" alt="" fill sizes="37px" className="object-cover" />
              </span>
            )}
            {typingAt === 2 && <Typing />}
            {shown > 2 && (
              <p className="contact-bubble flex h-[37px] w-[368px] items-center px-[9px] whitespace-nowrap">
                Or, leave me a note right here. I read everything!
              </p>
            )}
          </li>
        </ol>

        {composeVisible && (
          <form onSubmit={onSubmit} className="contact-compose absolute top-[356px] left-[286px]">
            <div className="compose-sheet">
              <label className="block font-hand text-[16px] leading-[20px] text-ink-muted" htmlFor="note">
                Dear Bal Narayan,
              </label>
              <textarea
                id="note"
                name="note"
                rows={1}
                required
                placeholder="your note"
                className="compose-field mt-[4px] h-[26px] w-full resize-none"
              />
              <div className="mt-[6px] flex items-center gap-[12px] text-[12px] leading-[16px]">
                <label htmlFor="from" className="text-ink-muted">
                  From:
                </label>
                <input
                  id="from"
                  name="from"
                  type="email"
                  required
                  placeholder="yourname@example.com"
                  className="compose-field w-full"
                />
              </div>
              {/* Honeypot for bots; hidden from people and assistive tech. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="button-ink absolute top-[133px] left-[186px] inline-flex h-[53px] w-[152px] items-center justify-center rounded-full bg-pill-bg font-bold text-pill-fg disabled:opacity-70"
            >
              {status === "sending" ? "Folding…" : status === "sent" ? "Folded ✓" : status === "error" ? "Try again" : "Fold & Send"}
            </button>
            <p
              role="status"
              aria-live="polite"
              className="absolute top-[192px] left-[160px] w-[204px] text-center text-[11px] leading-[14px] text-ink-muted"
            >
              {status === "sent" ? "Thanks, it's on its way to me." : status === "error" ? error : ""}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Typing() {
  return (
    <span className="contact-bubble contact-typing" aria-label="typing">
      <span />
      <span />
      <span />
    </span>
  );
}
