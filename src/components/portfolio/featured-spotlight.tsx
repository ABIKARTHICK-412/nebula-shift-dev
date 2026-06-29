import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Play, Github, ArrowRight, Trophy } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { ViewerRole } from "@/data/portfolio";

export function FeaturedSpotlight({ role }: { role: ViewerRole }) {
  const id = role.featuredProjectId ?? portfolio.featuredProjectId;
  const project =
    portfolio.projects.find((p) => p.id === id) ?? portfolio.projects[0]!;
  const isGameJam = project.tags.includes("game-jam");

  return (
    <section id="featured" className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
      <div className="mb-5">
        <div className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
          Featured Game
        </div>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
          Now Playing
        </h2>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="card-lift overflow-hidden rounded-sm border border-white/8 bg-[#1B2838] shadow-lg shadow-black/40"
      >
        <div className="grid lg:grid-cols-[7fr_3fr]">
          {/* Cover */}
          <div className="group relative aspect-[16/9] overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">
            <div className="cover-img absolute inset-0 bg-gradient-to-br from-[#2A475E] via-[#1B2838] to-[#0E141B]" />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/20 backdrop-blur transition group-hover:scale-110">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground/80 sm:text-4xl">
                  {project.title}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {project.metrics.engine} · {project.metrics.platform}
                </div>
              </div>
            </div>
            {isGameJam ? (
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-sm border border-amber-400/40 bg-amber-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-200">
                <Trophy className="h-3 w-3" /> Game Jam
              </div>
            ) : null}
          </div>

          {/* Info */}
          <div className="flex flex-col p-5 sm:p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {project.category}
            </div>
            <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <dl className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
              <KV k="Engine" v={project.metrics.engine} />
              <KV k="Platform" v={project.metrics.platform} />
              <KV k="Language" v={project.metrics.language} />
              <KV k="Dev Time" v={project.metrics.devTime} />
              <KV k="Status" v={project.metrics.status} />
              <KV k="Team" v={project.metrics.teamSize} />
            </dl>

            <div className="mt-auto pt-5">
              <div className="flex flex-wrap gap-2">
                {project.links.itch ? (
                  <a
                    href={project.links.itch}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-steam inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                  >
                    <Play className="h-3.5 w-3.5" /> Play Now
                  </a>
                ) : null}
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost-steam inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                ) : null}
                <Link
                  to={`/projects/${project.id}`}
                  className="btn-ghost-steam inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                >
                  Case Study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-sm border border-white/5 bg-[#2A475E]/40 px-2.5 py-1.5">
      <dt className="text-[9px] uppercase tracking-widest text-muted-foreground">
        {k}
      </dt>
      <dd className="mt-0.5 font-display text-xs font-semibold text-foreground">
        {v}
      </dd>
    </div>
  );
}
