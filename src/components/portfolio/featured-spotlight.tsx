import { motion } from "motion/react";
import { Sparkles, Play, ArrowRight, ExternalLink } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { ViewerRole } from "@/data/portfolio";

export function FeaturedSpotlight({ role }: { role: ViewerRole }) {
  const id = role.featuredProjectId ?? portfolio.featuredProjectId;
  const project = portfolio.projects.find((p) => p.id === id) ?? portfolio.projects[0]!;

  return (
    <section className="mx-auto mt-4 max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />

        <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-3 w-3" /> Current Featured Project
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              <span className="text-gradient">{project.title}</span>
            </h2>
            <p className="mt-1 font-display text-base text-foreground/80">{project.category}</p>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {project.description}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <ImpactRow label="Problem" text={project.projectImpact.problem} />
              <ImpactRow label="Solution" text={project.projectImpact.solution} />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.links.itch ? (
                <a
                  href={project.links.itch}
                  target="_blank"
                  rel="noreferrer"
                  className="animate-pulse-glow inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  <Play className="h-4 w-4" /> Play Now
                </a>
              ) : null}
              <a
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground hover:bg-white/10"
              >
                View Project <ArrowRight className="h-4 w-4" />
              </a>
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" /> GitHub
                </a>
              ) : null}
            </div>
          </div>

          <div className="glass relative aspect-video overflow-hidden rounded-2xl border-white/10">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-2 grid h-16 w-16 animate-float place-items-center rounded-2xl bg-primary/20 neon-border">
                  <Play className="h-7 w-7 text-primary" />
                </div>
                <div className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {project.metrics.engine} • {project.metrics.devTime}
                </div>
                <div className="font-display text-lg font-semibold">{project.metrics.type}</div>
              </div>
            </div>
            <div className="scanlines" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ImpactRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
      <div className="text-[10px] uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-1 text-sm text-foreground/90">{text}</div>
    </div>
  );
}
