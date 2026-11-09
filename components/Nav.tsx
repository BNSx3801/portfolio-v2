import Link from "next/link";
import { contact } from "@/lib/site";
import { Clock } from "./Clock";
import { ProofOfWorkMenu } from "./ProofOfWorkMenu";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";

// `current` marks the open Proof-of-Work section; the home page leaves it out.
export function Nav({ current }: { current?: string }) {
  // On the home page these stay plain anchors so the jump scrolls smoothly; elsewhere they route back.
  const home = current === undefined;
  const homeLink = (id: string, label: string) =>
    home ? (
      <a href={`#${id}`} className="link-underline">
        {label}
      </a>
    ) : (
      <Link href={`/#${id}`} className="link-underline">
        {label}
      </Link>
    );

  return (
    // Pinned to the viewport. The inner frame mirrors the hero's 1440px frame so the xl
    // absolute coordinates still line up with the design. The surface is a pseudo-element: a
    // backdrop-filter on the header itself would stop the dropdown's own blur reaching the page.
    <header className="fixed inset-x-0 top-0 z-50 before:absolute before:inset-0 before:-z-10 before:bg-paper/85 before:backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 py-3 pr-7 pl-5 xl:block xl:h-[64px] xl:px-0 xl:py-0">
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
          {homeLink("work", "Work")}
          <ProofOfWorkMenu current={current} />
          {homeLink("about", "About")}
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
          </span>
          <SoundToggle />
          <ThemeToggle />
          <span className="hidden xl:contents">
            <Clock />
          </span>
        </div>
      </div>
    </header>
  );
}
