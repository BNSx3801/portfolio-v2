import type { Project } from "@/lib/site";

export function ProjectCard({ project, tabIndex }: { project: Project; tabIndex?: number }) {
  return (
    <article>
      <a href={project.href} className="card" tabIndex={tabIndex}>
        {/* Media slot: swap this div for an ImageKit <Image> / <Video> later. */}
        <div className="card-media" role="img" aria-label={`${project.title} preview`} />
      </a>
      <div className="mt-[9px] ml-[90px]">
        <p className="font-[590]">{project.title}</p>
        <p className="mt-1">{project.subtitle}</p>
      </div>
    </article>
  );
}
