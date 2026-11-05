import Link from "next/link";
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
    <header className="relative z-10 flex flex-wrap items-center gap-x-8 gap-y-2 px-4 pt-2 xl:block xl:px-0 xl:pt-0">
      <Link
        href="/"
        aria-label="Bal Narayan Singh, home"
        className="sig-link xl:absolute xl:top-[12px] xl:left-4"
      >
        <span aria-hidden="true" className="signature block font-signature text-[32px] leading-[40px] whitespace-nowrap">
          Bal Narayan Singh
        </span>
      </Link>

      <nav
        aria-label="Primary"
        className="flex gap-6 xl:absolute xl:top-[22px] xl:left-[212px] xl:gap-[40px]"
      >
        {links.map((l) => (
          <a key={l.label} href={l.href} className="link-underline">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 xl:absolute xl:top-[22px] xl:right-10 xl:flex-nowrap">
        {/* TODO: replace with the real cal.com booking link */}
        <a href="#" className="link-underline">
          Book a Call
        </a>
        <SoundToggle />
        <ThemeToggle />
        <Clock />
      </div>
    </header>
  );
}
