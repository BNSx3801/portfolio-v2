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

export type CareerSection = { title: string; items: string[] };

export type CareerStop = {
  role: string;
  org: string;
  dates: string;
  // pin marks where the road starts, grad the graduation; everything else gets a flag.
  marker?: "pin" | "grad";
  // Hover card. Stops without one are plain markers.
  details?: {
    // Alpha-mask PNG in /public/logos, tinted with the ink token. Falls back to the org name.
    logo?: string;
    sections: CareerSection[];
  };
};

// Ordered by date. The trail itself stands for the college years, bookended by the pin and the cap.
export const career: CareerStop[] = [
  { role: "Started B.Tech (ECE)", org: "LNMIIT, Jaipur", dates: "Oct 2022", marker: "pin" },
  {
    role: "Developer Relations",
    org: "Reef Chain",
    dates: "Oct 2023 – Jan 2024",
    details: {
      logo: "/logos/reef.png",
      sections: [
        { title: "Mandate", items: ["Scale Reef Developers Club (a vetted pool of devs) across the APAC region."] },
        {
          title: "Actions",
          items: [
            "Closed partnerships with 14+ web3 communities across India & Singapore.",
            "Designed & ran 3 campaigns to build a pipeline for contributors & devs.",
            "Conducted dev interviews for campaign improvement and marketing initiatives.",
          ],
        },
        {
          title: "Impact",
          items: [
            "Scaled the vetted pool from 0 to 320+ w/ a team of 2.",
            "Partnerships across India, Thailand and Singapore w/ Tier-1 institutions and dev communities.",
            "72 builders attending the offline campaign closing events.",
          ],
        },
      ],
    },
  },
  {
    role: "Head of Partnerships / Lead Organiser",
    org: "LNMHacks 7.0",
    dates: "Feb 2024 – Mar 2025",
    details: {
      logo: "/logos/lnmhacks.png",
      sections: [
        { title: "Mandate", items: ["Closing monetary, in-kind & community partnerships."] },
        {
          title: "Actions",
          items: [
            "Led a team of 60 organisers across 5 teams.",
            "Designed the sponsorship brochure, finalising the sponsorship tiers.",
            "Handled expense planning & partner onboarding.",
          ],
        },
        { title: "Impact", items: ["$7,000+ secured in sponsorship.", "5 monetary, 2 in-kind and 9 community collaborations closed."] },
      ],
    },
  },
  {
    role: "Growth Analyst",
    org: "Deon Labs",
    dates: "Apr 2024 – Dec 2024",
    details: {
      logo: "/logos/deon.png",
      sections: [
        { title: "Mandate", items: ["Growth analytics partner for 3 L1 ecosystems."] },
        {
          title: "Actions",
          items: [
            "Building & deciding across a 21+ KPI dashboard.",
            "15+ dev interviews for onboarding to grant programs.",
            "Building attribution models for hackathons & grant programs.",
          ],
        },
        { title: "Impact", items: ["Reduced dev & project acquisition cost by 21%.", "A qualified & smoother funnel for the grants program."] },
      ],
    },
  },
  {
    role: "Researcher",
    org: "PYOR Inc.",
    dates: "May 2024 · Contract",
    details: {
      logo: "/logos/funnel.png",
      sections: [
        { title: "Mandate", items: ["Finalising an 11-part explainer series on EigenLayer."] },
        { title: "Actions", items: ["Research across restaking and AVSs.", "Breaking down the shared security model & off-chain execution framework."] },
        { title: "Impact", items: ["Authored w/ references to the physical world, making it easier to understand.", "Finished the 14-day contract within 4 days."] },
      ],
    },
  },
  { role: "Research Analyst", org: "Consulting / Freelance", dates: "Oct 2025 – Jan 2026 · Contract" },
  {
    role: "BD & Partnerships",
    org: "NodeOps",
    dates: "Feb 2026 – May 2026",
    details: {
      logo: "/logos/nodeops.png",
      sections: [
        { title: "Mandate", items: ["Own outbound, partnerships and account execution."] },
        { title: "Actions", items: ["22+ automated outbound pipelines touching 35k+ touchpoints.", "Building a BD-focused, user-behaviour-customised notification pipeline."] },
        { title: "Impact", items: ["Sourcing & closing a channel partnership.", "Executing across 21+ accounts & 4 channel partnerships across legal, product & ops."] },
      ],
    },
  },
  {
    role: "Business Development",
    org: "Airtribe",
    dates: "May 2026 – Aug 2026",
    details: {
      logo: "/logos/airtribe.png",
      sections: [
        { title: "Mandate", items: ["Driving revenue through consultative sales."] },
        { title: "Actions", items: ["MEDDIC for lead qualification.", "Handling pitch to onboarding, and hand-off to the program team.", "Feeding sales insight to the product team."] },
        { title: "Impact", items: ["Revenue of INR 14L against a target of INR 4L.", "Closing 4 to 5 deals as a weekly average."] },
      ],
    },
  },
  { role: "Graduated, B.Tech (ECE)", org: "LNMIIT, Jaipur", dates: "Jun 2026", marker: "grad" },
  {
    role: "Co-Founder & CEO",
    org: "ExamSeries",
    dates: "Aug 2026 – Present",
    details: {
      logo: "/logos/examseries.png",
      sections: [
        { title: "Problem Statement", items: ["Solving for fast-paced handwritten answer-script checking and mock test papers."] },
        { title: "Actions", items: ["30+ user interviews.", "Benchmarking across 5 competitors on pricing & speed.", "Wireframing and prototyping.", "Sourcing faculty and signing MOUs."] },
        { title: "Impact", items: ["An average turnaround time of 6–7 hours, against 3–7 days for competitors.", "3,000+ users since October 2nd."] },
      ],
    },
  },
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
