import { Nav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { FeaturedSpotlight } from "@/components/portfolio/featured-spotlight";
import { Projects } from "@/components/portfolio/projects";
import { GameplayMechanics } from "@/components/portfolio/gameplay-mechanics";
import {
  About,
  Skills,
  GithubBlock,
  Contact,
  Footer,
  LoadingScreen,
  RecentlyDeveloped,
} from "@/components/portfolio/sections";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import { useDocumentMeta } from "@/lib/use-document-meta";

export default function Home() {
  useDocumentMeta({
    title: "Abikarthick G — Gameplay Programmer (Unity & Unreal Engine)",
    description:
      "Portfolio of Abikarthick G — Gameplay Programmer building games with Unity and Unreal Engine. Play projects, read case studies, and download resume.",
    canonical: siteConfig.siteUrl + "/",
    og: {
      title: "Abikarthick G — Gameplay Programmer",
      description:
        "Gameplay programming portfolio: Unity, Unreal Engine, C# and C++. Playable itch.io builds, project case studies, and live GitHub activity.",
      type: "website",
      url: siteConfig.siteUrl + "/",
    },
    twitter: { card: "summary_large_image" },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: portfolio.profile.name,
      jobTitle: "Gameplay Programmer",
      email: portfolio.profile.email,
      url: portfolio.profile.linkedin,
      sameAs: [portfolio.profile.github, portfolio.profile.linkedin],
      address: {
        "@type": "PostalAddress",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
  });

  return (
    <div className="relative min-h-screen">
      <LoadingScreen />
      <Nav />
      <main>
        <Hero />
        <FeaturedSpotlight />
        <RecentlyDeveloped />
        <GameplayMechanics />
        <Projects />
        <Skills />
        <About />
        <GithubBlock />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
