// Receives a note from the "Let's have coffee?" form and emails it via Resend.
// RESEND_API_KEY comes from the Vercel Marketplace integration. Optional overrides:
// NOTES_TO_EMAIL (defaults to the site contact email) and NOTES_FROM_EMAIL (defaults to
// Resend's shared onboarding sender, which only delivers to the Resend account owner until
// a domain is verified).

import { contact } from "@/lib/site";

const NOTE_MAX = 2000;
const EMAIL_MAX = 254;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { note?: unknown; from?: unknown; website?: unknown };

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never see this field, bots fill it in. Pretend it worked.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const note = typeof body.note === "string" ? body.note.trim() : "";
  const from = typeof body.from === "string" ? body.from.trim() : "";

  if (!note) return Response.json({ error: "Please write a note." }, { status: 400 });
  if (note.length > NOTE_MAX) {
    return Response.json({ error: `Notes are capped at ${NOTE_MAX} characters.` }, { status: 400 });
  }
  if (!from || from.length > EMAIL_MAX || !EMAIL_RE.test(from)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/note] RESEND_API_KEY is not set.");
    return Response.json({ error: "Notes aren't being delivered right now. Email me instead." }, { status: 503 });
  }
  const to = process.env.NOTES_TO_EMAIL || contact.email;
  const sender = process.env.NOTES_FROM_EMAIL || "Portfolio notes <onboarding@resend.dev>";

  const preview = note.length > 60 ? `${note.slice(0, 57)}…` : note;
  const html = `<p><strong>From:</strong> ${escapeHtml(from)}</p><p style="white-space:pre-wrap">${escapeHtml(note)}</p>`;
  const text = `From: ${from}\n\n${note}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({ from: sender, to: [to], reply_to: from, subject: `Note from the site: ${preview}`, html, text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[api/note] Resend responded ${res.status}: ${detail.slice(0, 300)}`);
      return Response.json({ error: "Couldn't deliver the note. Please try again." }, { status: 502 });
    }
  } catch (err) {
    console.error("[api/note] Resend request failed:", err);
    return Response.json({ error: "Couldn't deliver the note. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
