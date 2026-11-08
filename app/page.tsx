import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { ProjectRail } from "@/components/ProjectRail";
import { CareerMap } from "@/components/CareerMap";
import { KindWords } from "@/components/KindWords";
import { CoffeeSection } from "@/components/CoffeeSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      {/* 1440-wide frame so hero elements can sit at their design coordinates. */}
      <div className="relative mx-auto w-full max-w-[1440px] xl:h-[966px] xl:overflow-clip">
        <Hero />
      </div>
      <ProjectRail />
      <CareerMap />
      <KindWords />
      <CoffeeSection />
      <Footer />
    </main>
  );
}
