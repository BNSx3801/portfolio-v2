import Image from "next/image";
import { examSeriesUrl } from "@/lib/site";

export function CurrentlyBuilding({ className = "" }: { className?: string }) {
  return (
    <div className={`note relative h-[124px] w-[373px] ${className}`}>
      <Image
        src="/assets/note-paper.png"
        alt=""
        fill
        sizes="373px"
        className="note-paper object-cover"
      />
      <p
        className="absolute top-[39px] left-[122px] origin-top-left text-ink-muted"
        style={{ rotate: "-2.59deg" }}
      >
        Currently Building
      </p>
      <a
        href={examSeriesUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute top-[62px] left-[141px] flex origin-top-left items-center gap-1 font-[510]"
        style={{ rotate: "-2.46deg" }}
      >
        <Image
          src="/assets/fv-logo.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 rounded-[2px]"
        />
        <span>ExamSeries</span>
      </a>
    </div>
  );
}
