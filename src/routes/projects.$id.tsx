import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play, ExternalLink, Github, Cpu, Sparkles } from "lucide-react";
import { Nav } from "@/components/portfolio/nav";
import { Footer } from "@/components/portfolio/sections";
import { useViewerRole } from "@/hooks/use-viewer-role";
import { portfolio, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = portfolio.projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — ${p.category} | Abikarthick G` : "Project | Abikarthick G";
    const desc = p?.description ?? "Project case study.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">Project not found.</div>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [role] = useViewerRole();

  return (
    <div className="min-h-screen">
      <Nav role={role} />
      <main className="mx-auto mt-28 max-w-5xl px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-3 w-3" /> Back to portfolio
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-display text-xs uppercase tracking-[0.3em] text-primary">
              {project.category}
            </div>
            <h1 className="mt-1 font-display text-4xl font-bold sm:text-5xl">
              <span className="text-gradient">{project.title}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.links.itch ? (
              <a
                href={project.links.itch}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
              >
                <Play className="h-4 w-4" /> Play on itch.io
              </a>
            ) : null}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            ) : null}
          </div>
        </div>

        {/* Project Impact */}
        <section className="mt-8 glass-strong rounded-2xl p-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3 w-3" /> Project Impact
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Block label="Problem" text={project.projectImpact.problem} />
            <Block label="Solution" text={project.projectImpact.solution} />
          </div>
        </section>

        {/* Metrics */}
        <section className="mt-6 glass rounded-2xl p-5">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <Cpu className="h-3 w-3" /> Metrics
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Object.entries(project.metrics).map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/8 bg-white/5 p-3">
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold">{String(v)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Tech & Features */}
        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-2xl p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Tech Stack</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Features</div>
            <ul className="mt-3 grid gap-1 text-sm">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Challenges */}
        <section className="mt-6 glass rounded-2xl p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">
            Technical Challenges
          </div>
          <div className="mt-3 grid gap-3">
            {project.challenges.map((c, i) => (
              <div key={i} className="grid gap-2 rounded-xl border border-white/8 bg-white/5 p-3 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-accent">Challenge</div>
                  <div className="mt-1 text-sm">{c.challenge}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-primary">Solution</div>
                  <div className="mt-1 text-sm">{c.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learnings */}
        <section className="mt-6 glass rounded-2xl p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-primary">Key Learnings</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.learnings.map((l) => (
              <span
                key={l}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-foreground/90"
              >
                {l}
              </span>
            ))}
          </div>
        </section>

        {project.links.itchEmbedUrl ? (
          <section className="mt-6 glass rounded-2xl overflow-hidden">
            <div className="border-b border-white/10 p-3 text-xs uppercase tracking-[0.25em] text-primary">
              Play Embedded
            </div>
            <iframe
              src={project.links.itchEmbedUrl}
              title={project.title}
              className="aspect-video w-full"
              allow="autoplay; fullscreen; gamepad"
            />
          </section>
        ) : (
          <section className="mt-6 glass rounded-2xl p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Embed</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Add an itch.io embed URL to <code>links.itchEmbedUrl</code> in{" "}
              <code>portfolio.ts</code> to play it inline here.
            </p>
            {project.links.itch ? (
              <a
                href={project.links.itch}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                Open on itch.io <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/5 p-3">
      <div className="text-[10px] uppercase tracking-widest text-primary">{label}</div>
      <div className="mt-1 text-sm text-foreground/90">{text}</div>
    </div>
  );
}
