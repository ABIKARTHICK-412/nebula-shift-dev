import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, ExternalLink, ArrowRight, Filter, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolio, type Project } from "@/data/portfolio";
import { asset } from "@/lib/asset";

export function Projects() {
  const [filter, setFilter] = useState("all");

  const all = portfolio.projects;
  const featuredId = portfolio.featuredProjectId;

  const filtered = useMemo(
    () => (filter === "all" ? all : all.filter((p) => p.tags.includes(filter))),
    [all, filter],
  );

  const unityGrouped = useMemo(
    () =>
      all.filter((p) => p.tags.includes("unity") && p.id !== featuredId),
    [all, featuredId],
  );
  const unrealGrouped = useMemo(
    () => all.filter((p) => p.tags.includes("unreal") && p.id !== featuredId),
    [all, featuredId],
  );

  const isFiltered = filter !== "all";

  return (
    <section
      id="library"
      className="relative isolate mx-auto mt-20 max-w-7xl overflow-hidden px-4 sm:px-6"
    >
      <div
        className="section-bg"
        style={{ ['--section-bg-image' as never]: `url(${asset('bg/projects.jpg')})` }}
      />
      <SectionHead
        eyebrow="Projects"
        title="Projects"
        sub="Every title is playable, scoped, and shipped. Filter by engine or status."
      />


      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/8 bg-[#32353D]/40 px-2.5 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
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

      {isFiltered ? (
        <motion.div
          layout
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-8 space-y-12">
          <ProjectGroup title="Unity Projects" projects={unityGrouped} />
          <ProjectGroup
            title="Unreal Engine Projects"
            projects={unrealGrouped}
            emptyState={
              <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-primary/15 text-primary">
                    <Rocket className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-display text-base font-bold text-foreground">
                      Currently building Unreal Engine gameplay projects.
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Expanding into Unreal Engine 5 C++ while applying the same
                      gameplay programming principles developed through Unity
                      projects.
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )}
    </section>
  );
}

function ProjectGroup({
  title,
  projects,
  emptyState,
}: {
  title: string;
  projects: Project[];
  emptyState?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      <div className="mt-4">
        {projects.length === 0 ? (
          emptyState
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
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
      className="card-lift group flex flex-col overflow-hidden rounded-sm border border-white/8 bg-[#2B2E35]"
    >
      {/* Steam capsule cover */}
      <div className="cover-zoom relative aspect-[460/215] overflow-hidden border-b border-white/5">
        <div className="cover-img absolute inset-0 bg-gradient-to-br from-[#32353D] via-[#2B2E35] to-[#1B1B1F]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        {project.media?.banner ? (
          <img
            src={asset(project.media.banner)}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display text-2xl font-extrabold tracking-tight text-foreground/30">
              {project.title}
            </div>
          </div>
        )}
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
          <Chip>{project.metrics.language}</Chip>
          <Chip>{project.metrics.platform}</Chip>
          <Chip>{project.metrics.status}</Chip>
          <Chip>{project.category}</Chip>
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
    <span className="rounded-sm border border-white/8 bg-[#32353D]/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/85">
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
