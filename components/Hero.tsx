import Image from "next/image";
import { bio, contact } from "@/lib/site";
import { CurrentlyBuilding } from "./CurrentlyBuilding";
import { Greeting } from "./Greeting";
import { MagneticButton } from "./MagneticButton";
import { PhotoStack } from "./PhotoStack";
import { ScrollInk } from "./ScrollInk";

export function Hero() {
  return (
    <section
      id="about"
      className="mx-auto flex max-w-[739px] flex-col items-start px-5 pt-[120px] pb-16 xl:static xl:max-w-none xl:px-0 xl:pt-0 xl:pb-0"
    >
      <div className="flex w-full items-end justify-between gap-4 xl:contents">
        <Image
          src="/assets/illustration.png"
          alt="Coffee, a cigarette and a stack of attention papers"
          width={290}
          height={191}
          priority
          className="illustration h-auto w-[150px] xl:absolute xl:top-[241px] xl:left-[309px] xl:h-[191px] xl:w-[290px]"
        />
        <PhotoStack className="xl:absolute xl:top-[86px] xl:left-[900px]" />
      </div>

      <div className="mt-10 flex w-full max-w-[707px] flex-col gap-[30px] xl:absolute xl:top-[462px] xl:left-[366.75px] xl:mt-0">
        <Greeting />
        <ScrollInk className="flex flex-col gap-[30px]">
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>
              {paragraph.split(" ").map((word, i) => (
                <span key={i} className="hero-word">
                  {word}{" "}
                </span>
              ))}
            </p>
          ))}
        </ScrollInk>
        <MagneticButton
          href={contact.callHref}
          external
          className="inline-flex h-[39px] w-[192px] items-center justify-center rounded-full bg-pill-bg font-[590] text-pill-fg"
        >
          Let&apos;s Work Together?
        </MagneticButton>
      </div>

      <CurrentlyBuilding className="mt-10 xl:absolute xl:top-[792px] xl:left-[732px] xl:mt-0" />
    </section>
  );
}
