import type { PaperCanvas } from "@/lib/site";

// Paper file "Portfolio v2", exported artboard by artboard at 2x (Paper has no embed).
// Positions and sizes are Paper canvas units; re-export through the Paper MCP after design edits.
const dir = "/assets/paper/portfolio-v2";

export const portfolioV2: PaperCanvas = {
  // Swap in the file's public share link to show "Open in Paper ↗".
  url: undefined,
  pages: [
    {
      name: "Brief",
      artboards: [
        { name: "Brief — Overview", src: `${dir}/brief-overview.webp`, x: 0, y: 0, w: 1440, h: 1443 },
        { name: "Brief — Sitemap", src: `${dir}/brief-sitemap.webp`, x: 1520, y: 0, w: 1440, h: 901.5 },
        { name: "Brief — User flows", src: `${dir}/brief-user-flows.webp`, x: 3040, y: 0, w: 1440, h: 1022 },
      ],
    },
    {
      name: "Kit",
      artboards: [
        { name: "Kit — Foundations", src: `${dir}/kit-foundations.webp`, x: 0, y: 0, w: 1440, h: 1236.5 },
        { name: "Kit — Components", src: `${dir}/kit-components.webp`, x: 1520, y: 0, w: 1440, h: 1811 },
      ],
    },
    {
      name: "Wireframes",
      artboards: [
        { name: "W01 — Home (desktop)", src: `${dir}/w01-home-desktop.webp`, x: 0, y: 0, w: 1440, h: 4543 },
        { name: "W02 — Case Studies (desktop)", src: `${dir}/w02-case-studies-desktop.webp`, x: 1520, y: 0, w: 1440, h: 1889 },
        { name: "W03 — Case Study article (desktop)", src: `${dir}/w03-case-study-article-desktop.webp`, x: 3040, y: 0, w: 1440, h: 2560 },
        { name: "M01 — Home (mobile 390)", src: `${dir}/m01-home-mobile.webp`, x: 4560, y: 0, w: 800, h: 4291 },
        { name: "M02 — Case Studies (mobile 390)", src: `${dir}/m02-case-studies-mobile.webp`, x: 5440, y: 0, w: 800, h: 1742 },
        { name: "M03 — Case Study article (mobile 390)", src: `${dir}/m03-case-study-article-mobile.webp`, x: 6320, y: 0, w: 800, h: 3031 },
      ],
    },
    {
      name: "Page 1",
      artboards: [
        { name: "Frame 02", src: `${dir}/frame-02.webp`, x: 1430, y: 54, w: 1440, h: 3461 },
        { name: "Frame 03", src: `${dir}/frame-03.webp`, x: 2890, y: 54, w: 1440, h: 1711 },
        { name: "Frame 04", src: `${dir}/frame-04.webp`, x: 4350, y: 54, w: 1440, h: 1540 },
        { name: "Frame 05 — Agents row", src: `${dir}/frame-05-agents-row.webp`, x: 5870, y: 54, w: 1440, h: 1756 },
      ],
    },
  ],
};
