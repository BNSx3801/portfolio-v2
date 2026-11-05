import { projects } from "@/lib/site";
import { ProjectCard } from "./ProjectCard";

export function ProjectRail() {
  return (
    <section id="work" aria-label="Selected work" className="rail">
      <div className="rail-track">
        <div className="rail-set">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
        {/* Duplicate set so the marquee loops seamlessly. */}
        <div className="rail-set" aria-hidden="true">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} tabIndex={-1} />
          ))}
        </div>
      </div>
    </section>
  );
}
