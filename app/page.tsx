import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ProjectRail } from "@/components/ProjectRail";

export default function Home() {
  return (
    <main>
      {/* Nav + hero share one 1440-wide frame so hero elements can sit at their design coordinates. */}
      <div className="relative mx-auto w-full max-w-[1440px] xl:h-[966px] xl:overflow-clip">
        <Nav />
        <Hero />
      </div>
      <ProjectRail />
    </main>
  );
}
