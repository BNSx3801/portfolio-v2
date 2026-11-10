// The whole site as Markdown for AI agents, served at /llms.txt (index) and /llms-full.txt
// (everything). Built from the same data and copy the pages render, so it never drifts.

import { readContent } from "./content";
import {
  bio,
  career,
  contact,
  notes,
  proofItemHref,
  proofOfWork,
  projects,
  siteUrl,
  type ProofItem,
  type ProofSection,
} from "./site";

const name = "Bal Narayan Singh (BNS)";
const summary = "Product Ops and GTM generalist. Currently building ExamSeries.";

// Root-relative hrefs become absolute so links still work once the text leaves the site.
function absolute(href: string) {
  return href.startsWith("/") ? siteUrl + href : href;
}

// Same for links and images inside the write-ups.
function absoluteLinks(md: string) {
  return md.replace(/\]\(\//g, `](${siteUrl}/`);
}

// Nests a write-up under its item heading: "#" becomes "#" × (1 + by), capped at Markdown's six.
function shiftHeadings(md: string, by: number) {
  return md.replace(/^(#{1,6}) /gm, (_, hashes: string) => "#".repeat(Math.min(6, hashes.length + by)) + " ");
}

function link(title: string, href?: string) {
  return href && href !== "#" ? `[${title}](${absolute(href)})` : title;
}

const sectionUrl = (section: ProofSection) => `${siteUrl}/proof-of-work/${section.slug}`;
const sectionHeading = (section: ProofSection) => section.heading ?? section.label;

// What a reader can't get from the text: a Figma file or a video.
function mediaNote(item: ProofItem) {
  if (item.article?.embed) return `Figma file: ${item.article.embed}`;
  if (item.media?.type === "video") return `Demo video: ${absolute(item.media.src)}`;
  return undefined;
}

function contactBlock() {
  return [
    `- Email: ${contact.email}`,
    `- Book a 30-min call: ${contact.callHref}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- X/Twitter: ${contact.x}`,
    `- Telegram: ${contact.telegram}`,
  ].join("\n");
}

function careerBlock() {
  return career
    .map((stop) => {
      const lines = [`### ${stop.role}, ${stop.org} (${stop.dates})`];
      for (const s of stop.details?.sections ?? []) {
        lines.push("", `**${s.title}**`, "", ...s.items.map((i) => `- ${i}`));
      }
      return lines.join("\n");
    })
    .join("\n\n");
}

function proofItemBlock(section: ProofSection, item: ProofItem) {
  const href = proofItemHref(section.slug, item);
  const lines = [`### ${item.title}`, "", item.subtitle];
  if (href) lines.push("", `Page: ${absolute(href)}`);
  const note = mediaNote(item);
  if (note) lines.push("", note);

  const article = item.article;
  if (article?.parts) {
    lines.push("", `A ${article.parts.length}-part series:`, "");
    article.parts.forEach((p, i) => lines.push(`${i + 1}. ${p.title} (${p.date})`));
    for (const [i, p] of article.parts.entries()) {
      const body = readContent(section.slug, article.slug, p.slug);
      lines.push(
        "",
        `### ${item.title}, part ${i + 1}: ${p.title}`,
        "",
        [p.subtitle, p.date].filter(Boolean).join(" · "),
        "",
        `Page: ${siteUrl}/proof-of-work/${section.slug}/${article.slug}/${p.slug}`,
        "",
        shiftHeadings(absoluteLinks(body.trim()), 3),
      );
    }
  } else if (article && !article.embed) {
    lines.push("", shiftHeadings(absoluteLinks(readContent(section.slug, article.slug).trim()), 3));
  }
  return lines.join("\n");
}

export function llmsFull() {
  const out = [
    `# ${name}`,
    "",
    `> ${summary}`,
    "",
    `Website: ${siteUrl}. Short index of this file: ${siteUrl}/llms.txt`,
    "",
    "## About",
    "",
    bio.join("\n\n"),
    "",
    "## Contact",
    "",
    contactBlock(),
    "",
    "## Work",
    "",
    projects
      .map((p) => `- ${link(p.title, p.href)}: ${[p.subtitle, p.roles].filter(Boolean).join(" · ")}`)
      .join("\n"),
    "",
    "## Career",
    "",
    careerBlock(),
    "",
    "## What people say",
    "",
    notes.map((n) => `> ${n.quote}\n>\n> — ${n.author}, ${n.role}`).join("\n\n"),
  ];

  for (const section of proofOfWork) {
    out.push("", `## Proof-of-Work: ${sectionHeading(section)}`, "", `Page: ${sectionUrl(section)}`);
    if (section.items.length === 0) out.push("", "Coming soon.");
    for (const item of section.items) out.push("", proofItemBlock(section, item));
  }
  return out.join("\n") + "\n";
}

// The llms.txt convention: title, one-line summary, then lists of links with short notes.
export function llmsIndex() {
  const out = [
    `# ${name}`,
    "",
    `> ${summary}`,
    "",
    bio[0],
    "",
    `The full site, every write-up included, is one file: ${siteUrl}/llms-full.txt`,
    "",
    "## Contact",
    "",
    contactBlock(),
  ];
  for (const section of proofOfWork) {
    out.push("", `## ${sectionHeading(section)}`, "");
    if (section.items.length === 0) {
      out.push(`- [${section.label}](${sectionUrl(section)}): coming soon`);
      continue;
    }
    for (const item of section.items) {
      out.push(`- ${link(item.title, proofItemHref(section.slug, item) ?? sectionUrl(section))}: ${item.subtitle}`);
    }
  }
  return out.join("\n") + "\n";
}
