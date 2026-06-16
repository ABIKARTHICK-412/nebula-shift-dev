import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/nav";
import { RoleSwitcher } from "@/components/portfolio/role-switcher";
import { Hero } from "@/components/portfolio/hero";
import { FeaturedSpotlight } from "@/components/portfolio/featured-spotlight";
import { Projects } from "@/components/portfolio/projects";
import {
  About,
  CurrentlyBuilding,
  Showcase,
  Skills,
  Learning,
  Process,
  GithubBlock,
  CareerInterests,
  Contact,
  Footer,
  LoadingScreen,
} from "@/components/portfolio/sections";
import { useViewerRole } from "@/hooks/use-viewer-role";
import { portfolio } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abikarthick G — Unity Game Developer & Gameplay Programmer" },
      {
        name: "description",
        content:
          "Portfolio of Abikarthick G — Unity game developer, gameplay programmer, and game designer. Play my games, view projects, and download resume.",
      },
      { property: "og:title", content: "Abikarthick G — Unity Game Developer" },
      {
        property: "og:description",
        content:
          "Unity, C#, and gameplay programming portfolio. Playable itch.io builds, project case studies, and live GitHub activity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: portfolio.profile.name,
          jobTitle: "Unity Game Developer",
          email: portfolio.profile.email,
          url: portfolio.profile.linkedin,
          sameAs: [portfolio.profile.github, portfolio.profile.linkedin],
          address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [role, setRole] = useViewerRole();
  return (
    <div className="relative min-h-screen">
      <LoadingScreen />
      <Nav role={role} />
      <main>
        <RoleSwitcher active={role} onChange={setRole} />
        <Hero role={role} />
        <FeaturedSpotlight role={role} />
        <About />
        <CurrentlyBuilding />
        <Projects role={role} />
        <Showcase />
        <Skills role={role} />
        <Learning />
        <Process />
        <GithubBlock />
        <CareerInterests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
