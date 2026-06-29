import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ExternalLink, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolio, type Project, type ViewerRole } from "@/data/portfolio";

export function Projects({ role }: { role: ViewerRole }) {
  const [filter, setFilter] = useState("all");

  const ordered = useMemo(() => {
    const order = role.projectOrder;
    return [...portfolio.projects].sort(
      (a, b) => (order.indexOf(a.id) === -1 ? 99 : order.indexOf(a.id)) -
        (order.indexOf(b.id) === -1 ? 99 : order.indexOf(b.id)),
    );
  }, [role]);

  const visible = useMemo(
    () => (filter === "all" ? ordered : ordered.filter((p) => p.tags.includes(filter))),
    [ordered, filter],
  );

  return (
    <section id="projects" className="mx-auto mt-24 max-w-6xl px-4">
      <SectionHead
        eyebrow="Featured Games"
        title="Projects, Not Promises"
        sub="Every project is playable, scoped, and shipped. Filter by stack or type."
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
          <Filter className="h-3.5 w-3.5" /> Filter
        </span>
        {portfolio.projectFilters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-primary shadow-lg shadow-primary/40"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : null}
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-[#171B22]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-2xl font-semibold tracking-wide text-foreground/25">
            {project.title}
          </div>
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] uppercase tracking-widest text-foreground/80 backdrop-blur"
            >
              {t.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <div className="text-xs text-muted-foreground">{project.category}</div>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/80">{project.description}</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Impact label="Problem" text={project.projectImpact.problem} />
          <Impact label="Solution" text={project.projectImpact.solution} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          <M k="Type" v={project.metrics.type} />
          <M k="Engine" v={project.metrics.engine} />
          <M k="Language" v={project.metrics.language} />
          <M k="Team" v={project.metrics.teamSize} />
          <M k="Dev Time" v={project.metrics.devTime} />
          <M k="Status" v={project.metrics.status} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.itch ? (
            <a
              href={project.links.itch}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30"
            >
              <Play className="h-3.5 w-3.5" /> Play
            </a>
          ) : null}
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/10"
            >
              <ExternalLink className="h-3.5 w-3.5" /> GitHub
            </a>
          ) : null}
          <Link
            to={`/projects/${project.id}`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/10"
          >
            Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function Impact({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/5 p-2">
      <div className="text-[9px] uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-0.5 line-clamp-2 text-[11px] text-foreground/85">{text}</div>
    </div>
  );
}
function M({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2 border-b border-white/5 py-0.5">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right font-medium text-foreground/90">{v}</span>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="font-display text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{sub}</p> : null}
    </div>
  );
}
