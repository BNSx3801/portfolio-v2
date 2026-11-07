import Link from "next/link";
import { contact } from "@/lib/site";
import { Clock } from "./Clock";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Work", href: "#work" },
  { label: "Writings", href: "#writings" },
  { label: "About", href: "#about" },
];

export function Nav() {
  return (
    // Pinned to the viewport. The inner frame mirrors the hero's 1440px frame so the xl
    // absolute coordinates still line up with the design.
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/85 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 xl:block xl:h-[64px] xl:px-0 xl:py-0">
        <Link
          href="/"
          aria-label="Bal Narayan Singh, home"
          className="sig-link shrink-0 xl:absolute xl:top-[12px] xl:left-4"
        >
          <span
            aria-hidden="true"
            className="signature block font-signature text-[32px] leading-[40px] whitespace-nowrap"
          >
            Bal Narayan Singh
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex gap-4 xl:absolute xl:top-[22px] xl:left-[212px] xl:gap-[40px]"
        >
          {links.map((l) => (
            <a key={l.label} href={l.href} className="link-underline">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-x-6 xl:absolute xl:top-[22px] xl:right-10">
          <span className="hidden xl:contents">
            <a
              href={contact.callHref}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              Book a Call
            </a>
            <SoundToggle />
          </span>
          <ThemeToggle />
          <span className="hidden xl:contents">
            <Clock />
          </span>
        </div>
      </div>
    </header>
  );
}
