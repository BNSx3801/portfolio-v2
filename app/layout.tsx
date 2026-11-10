import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Cedarville_Cursive, Inter, Mrs_Saint_Delafield, Qwitcher_Grypen } from "next/font/google";
import "./globals.css";
import { ClickSound } from "@/components/ClickSound";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  // Italic face is needed for the project captions; font-synthesis is off globally.
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

const script = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const hand = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const signature = Qwitcher_Grypen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bal Narayan Singh (BNS)",
  description:
    "Product Ops and GTM generalist. Currently building ExamSeries.",
  // Points AI agents at the Markdown version of the site.
  alternates: { types: { "text/markdown": "/llms-full.txt" } },
};

// Runs during HTML parsing so the saved theme is applied before first paint.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${script.variable} ${hand.variable} ${signature.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full">
        <ClickSound />
        {children}
        {/* Vercel Web Analytics: cookieless page views, production only. */}
        <Analytics />
        {/* Vercel Speed Insights: real-user Core Web Vitals, production only. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
