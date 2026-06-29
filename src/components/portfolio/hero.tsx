import { motion } from "motion/react";
import { Play, Download, Github, ArrowRight, Gamepad2 } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { ViewerRole } from "@/data/portfolio";
import { asset } from "@/lib/asset";

export function Hero({ role }: { role: ViewerRole }) {
  const resume = asset(portfolio.resumes[role.resumeKey]);
  const featuredId = role.featuredProjectId ?? portfolio.featuredProjectId;
  const featured =
    portfolio.projects.find((p) => p.id === featuredId) ?? portfolio.projects[0]!;
  const library = portfolio.projects.slice(0, 4);

  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Background placeholder image — swap by setting hero.backgroundImage on the data layer */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #2A475E 0%, #1B2838 60%, #171A21 100%)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171A21] via-[#171A21]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#171A21] to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-32 sm:px-6 lg:min-h-[92vh] lg:pb-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: title + CTAs */}
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
              {portfolio.profile.name}
            </h1>

            <p className="mt-3 font-display text-base font-semibold uppercase tracking-[0.18em] text-primary sm:text-lg">
              Gameplay Programmer · Unity Developer · Unreal Engine Developer
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Building polished gameplay systems and interactive experiences.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              {featured.links.itch ? (
                <a
                  href={featured.links.itch}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-steam inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold uppercase tracking-wider"
                >
                  <Play className="h-4 w-4" /> Play Featured Game
                </a>
              ) : (
                <a
                  href="#library"
                  className="btn-steam inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold uppercase tracking-wider"
                >
                  <Gamepad2 className="h-4 w-4" /> Browse Library
                </a>
              )}
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
                <Download className="h-4 w-4" /> Resume
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

          {/* Right: in-library stack */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="rounded-sm border border-white/8 bg-[#1B2838]/80 p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  In Library
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {library.length} titles
                </div>
              </div>
              <div className="space-y-2">
                {library.map((p) => (
                  <a
                    key={p.id}
                    href={`#library`}
                    className="card-lift group flex items-center gap-3 rounded-sm border border-white/5 bg-[#2A475E]/60 p-2 hover:border-primary/30"
                  >
                    <div className="grid h-12 w-20 shrink-0 place-items-center rounded-sm bg-gradient-to-br from-[#2A475E] to-[#1B2838] text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {p.metrics.engine}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-display text-sm font-semibold text-foreground group-hover:text-primary">
                        {p.title}
                      </div>
                      <div className="truncate text-[11px] text-muted-foreground">
                        {p.category}
                      </div>
                    </div>
                    <Play className="h-3.5 w-3.5 text-primary opacity-0 transition group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
