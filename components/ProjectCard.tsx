import Image from "next/image";
import type { Project } from "@/lib/site";
import { CardSlideshow } from "./CardSlideshow";

export function ProjectCard({ project, tabIndex }: { project: Project; tabIndex?: number }) {
  const media = project.media ?? [];
  return (
    <article>
      <a href={project.href} className="card" tabIndex={tabIndex} draggable={false}>
        {media.length > 1 ? (
          <CardSlideshow media={media} />
        ) : media.length === 1 ? (
          <div className="card-media">
            <Image
              src={media[0].src}
              alt={media[0].alt ?? `${project.title} preview`}
              fill
              sizes="(max-width: 767px) 82vw, 840px"
              className="object-cover"
              draggable={false}
            />
          </div>
        ) : (
          <div className="card-media" role="img" aria-label={`${project.title} preview`} />
        )}
      </a>
      <div className="mt-[9px] ml-[90px]">
        <p className="font-[590]">{project.title}</p>
        <p className="mt-0.5 text-ink-muted">
          {project.subtitle}
          {project.roles && (
            <>
              {" · "}
              <em>{project.roles}</em>
            </>
          )}
        </p>
      </div>
    </article>
  );
}
