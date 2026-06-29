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
      (a, b) =>
        (order.indexOf(a.id) === -1 ? 99 : order.indexOf(a.id)) -
        (order.indexOf(b.id) === -1 ? 99 : order.indexOf(b.id)),
    );
  }, [role]);

  const visible = useMemo(
    () =>
      filter === "all" ? ordered : ordered.filter((p) => p.tags.includes(filter)),
    [ordered, filter],
  );

  return (
    <section id="library" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <SectionHead
        eyebrow="Continue Playing"
        title="Your Library"
        sub="Every title is playable, scoped, and shipped. Filter by stack or type."
      />

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/8 bg-[#2A475E]/40 px-2.5 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
          <Filter className="h-3.5 w-3.5" /> Tags
        </span>
        {portfolio.projectFilters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${
                active
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-white/8 bg-white/5 text-muted-foreground hover:border-white/15 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
      className="card-lift group flex flex-col overflow-hidden rounded-sm border border-white/8 bg-[#1B2838]"
    >
      {/* Steam capsule cover */}
      <div className="cover-zoom relative aspect-[460/215] overflow-hidden border-b border-white/5">
        <div className="cover-img absolute inset-0 bg-gradient-to-br from-[#2A475E] via-[#1B2838] to-[#0E141B]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-2xl font-extrabold tracking-tight text-foreground/30">
            {project.title}
          </div>
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-sm border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] uppercase tracking-widest text-foreground/85 backdrop-blur"
            >
              {t.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight">
          {project.title}
        </h3>
        <div className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
          {project.category}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <Chip>{project.metrics.engine}</Chip>
          <Chip>{project.metrics.platform}</Chip>
          <Chip>{project.metrics.language}</Chip>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 pt-3">
          {project.links.itch ? (
            <a
              href={project.links.itch}
              target="_blank"
              rel="noreferrer"
              className="btn-steam inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider"
            >
              <Play className="h-3.5 w-3.5" /> Play
            </a>
          ) : null}
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-steam inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider"
            >
              <ExternalLink className="h-3.5 w-3.5" /> GitHub
            </a>
          ) : null}
          <Link
            to={`/projects/${project.id}`}
            className="btn-ghost-steam ml-auto inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider"
          >
            Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-white/8 bg-[#2A475E]/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/85">
      {children}
    </span>
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
      <div className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
        {title}
      </h2>
      {sub ? (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{sub}</p>
      ) : null}
    </div>
  );
}
