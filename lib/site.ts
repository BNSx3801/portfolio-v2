export type Greeting = { word: string; lang: string };

export const greetings: Greeting[] = [
  { word: "Hello,", lang: "English" },
  { word: "नमस्ते,", lang: "Hindi" },
  { word: "Hallo,", lang: "German" },
  { word: "Bonjour,", lang: "French" },
  { word: "Hola,", lang: "Español" },
  { word: "ನಮಸ್ಕಾರ,", lang: "Kannada" },
  { word: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ,", lang: "Punjabi" },
  { word: "নমস্কার,", lang: "Bengali" },
  { word: "નમસ્તે,", lang: "Gujarati" },
];

export type Photo = { src: string; alt: string };

// The stack shows the first entry on top and cycles through the rest. Add more here.
export const photos: Photo[] = [
  { src: "/photos/bns-headshot.jpg", alt: "Bal Narayan Singh, portrait" },
  { src: "/photos/bns-speaking.png", alt: "Bal Narayan Singh speaking on stage" },
  { src: "/photos/bns-waterfall.jpg", alt: "Bal Narayan Singh on a staircase in front of a waterfall, helmet in hand" },
];

export type ProjectMedia = { type: "image" | "video"; src: string; alt?: string };

export type Project = {
  title: string;
  subtitle: string;
  // Optional, rendered after the subtitle as "subtitle · roles" in italic.
  roles?: string;
  // Optional id so nav links can anchor to a specific card.
  anchor?: string;
  href: string;
  // One entry renders a still; several crossfade as a slideshow. Empty renders the maroon placeholder.
  media?: ProjectMedia[];
};

export const examSeriesUrl = "https://ca.examseries.co.in/";

export const projects: Project[] = [
  {
    title: "Venture-01",
    subtitle: "ExamSeries",
    roles: "User Research, Prototyping, and Ops",
    href: examSeriesUrl,
    media: [
      { type: "image", src: "/assets/ES-Regen-01.png", alt: "Students writing a CA mock exam" },
      { type: "image", src: "/assets/ES-Regen-02.png", alt: "ExamSeries app home screen on a phone" },
      { type: "image", src: "/assets/ES-Regen-03.png", alt: "ExamSeries, screen three" },
      { type: "image", src: "/assets/ES-Regen-04.png", alt: "ExamSeries, screen four" },
    ],
  },
  {
    title: "GTM & Product Ops",
    subtitle: "GTM Engineering, Funnel Optimisation, Data & Decisions.",
    href: "#",
    media: [{ type: "image", src: "/assets/Card-02.png", alt: "Career impact at NodeOps, Airtribe, Reef and Deon" }],
  },
  {
    title: "Research & Writings",
    anchor: "writings",
    subtitle: "Mixed-Method Research, Protocol/Architecture Analysis, Investment Memos.",
    href: "#",
    media: [{ type: "image", src: "/assets/Research-Card.png", alt: "Research and writing samples" }],
  },
  {
    title: "Builds",
    subtitle: "FOSS, Arbitrage & Hedging Projects, etc.",
    href: "#",
    media: [{ type: "image", src: "/assets/Build-Card.png", alt: "Open-source, arbitrage and hedging projects" }],
  },
];

export const bio = [
  'I’m BNS, and while I like to call myself a "true generalist", my expertise leans towards Product Ops and GTM (more of a PMM actually). I enjoy connecting the dots b/w product, tech & business, and turning ideas into things people actually use. Currently building ExamSeries. Listing some of my fav work below.',
  "Over the past few years, I’ve worked across Developer Relations, Product and Business Development, navigating the Web3 and AI ecosystems. From building communities and forging partnerships to researching markets and shaping product experiences.",
  "These days, I’m usually building something, exploring new technology or falling down an unexpected rabbit hole. When I’m not at my desk, you’ll probably find me out on my motorcycle, experimenting with my camera or discovering something new.",
];

export type Company = { name: string; logo: string; href?: string };

// Alpha-mask PNGs in /public/logos (generated from the supplied artwork); tinted with the ink token.
export const companies: Company[] = [
  { name: "Reef", logo: "/logos/reef.png" },
  { name: "Funnel", logo: "/logos/funnel.png" },
  { name: "Deon Labs", logo: "/logos/deon.png" },
  { name: "NodeOps", logo: "/logos/nodeops.png" },
  { name: "Airtribe", logo: "/logos/airtribe.png" },
  { name: "DoraHacks", logo: "/logos/dorahacks.png" },
  { name: "Atrium", logo: "/logos/atrium.png" },
];

export type CareerStop = {
  role: string;
  org: string;
  dates: string;
};

// Ordered by start date. The career map draws these top to bottom; the first stop gets the pin.
export const career: CareerStop[] = [
  { role: "B.Tech (ECE)", org: "LNMIIT, Jaipur", dates: "Oct 2022 – Jun 2026" },
  { role: "Developer Relations", org: "Reef Chain", dates: "Oct 2023 – Jan 2024" },
  { role: "Head of Partnerships / Lead Organiser", org: "LNMHacks 7.0", dates: "Feb 2024 – Mar 2025" },
  { role: "Growth Analyst", org: "Deon Labs", dates: "Apr 2024 – Dec 2024" },
  { role: "Researcher", org: "PYOR Inc.", dates: "May 2024 · Contract" },
  { role: "BD & Partnerships", org: "NodeOps", dates: "Feb 2026 – May 2026" },
  { role: "Business Development", org: "Airtribe", dates: "May 2026 – Aug 2026" },
  { role: "Co-Founder & CEO", org: "ExamSeries", dates: "Aug 2026 – Present" },
];

export type Note = {
  firstName: string;
  author: string;
  role: string;
  quote: string;
  avatar: string;
};

export const notes: Note[] = [
  {
    firstName: "Alex",
    author: "Alex Albano",
    role: "Ex-CMO, NodeOps",
    quote:
      "“Bal Narayan joined in as intern for three months at NodeOps, and he was operating at a level most people reach several years into their career.”",
    avatar: "/assets/avatar-alex.png",
  },
  {
    firstName: "Dhaval",
    author: "Dhaval Trivedi",
    role: "CEO, Airtribe",
    quote:
      "“Appreciation to Bal Narayan Singh for being a team player, getting 11 realised & 15 projected conversions in a month.”",
    avatar: "/assets/avatar-dhaval.jpg",
  },
];

export const contact = {
  name: "Bal Narayan Singh (BNS)",
  email: "work.bnsingh@gmail.com",
  callHref: "https://cal.com/work-bnsingh/30min",
  linkedin: "https://linkedin.com/in/BNSx3801",
  x: "https://x.com/BNSx3801",
  telegram: "https://t.me/BNSx3801",
  lastUpdated: "Nov 5, 2026",
};
