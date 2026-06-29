import { motion } from "motion/react";
import { Play, Download, Github, ArrowRight, Gamepad2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { asset } from "@/lib/asset";

export function Hero() {
  const resume = asset(portfolio.resume);
  const featured =
    portfolio.projects.find((p) => p.id === portfolio.featuredProjectId) ??
    portfolio.projects[0]!;

  return (
    <section id="top" className="relative isolate w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #2A475E 0%, #1B2838 60%, #171A21 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.07] blur-2xl"
          style={{
            backgroundImage: `url(${asset(portfolio.backgrounds.hero)})`,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171A21] via-[#171A21]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#171A21] to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-32 sm:px-6 lg:min-h-[92vh] lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Available Now
          </div>

          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Gameplay Programmer
          </h1>

          <p className="mt-3 max-w-2xl font-display text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
            Building polished gameplay systems and interactive experiences using Unity and Unreal Engine.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {portfolio.hero.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <a
              href={featured.links.itch ?? "#featured"}
              target={featured.links.itch ? "_blank" : undefined}
              rel={featured.links.itch ? "noreferrer" : undefined}
              className="btn-steam inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold uppercase tracking-wider"
            >
              {featured.links.itch ? (
                <Play className="h-4 w-4" />
              ) : (
                <Gamepad2 className="h-4 w-4" />
              )}
              Featured Project
            </a>
            <a
              href="#library"
              className="btn-ghost-steam inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold uppercase tracking-wider"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={resume}
              download
              className="btn-ghost-steam inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold uppercase tracking-wider"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href={portfolio.profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-steam inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold uppercase tracking-wider"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
