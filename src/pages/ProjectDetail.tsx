import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Play,
  ExternalLink,
  Github,
  Cpu,
  Sparkles,
  ListChecks,
  Wrench,
  GraduationCap,
} from "lucide-react";
import { Nav } from "@/components/portfolio/nav";
import { Footer } from "@/components/portfolio/sections";
import { useViewerRole } from "@/hooks/use-viewer-role";
import { portfolio } from "@/data/portfolio";
import { siteConfig } from "@/config/site";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = portfolio.projects.find((p) => p.id === id);
  const [role] = useViewerRole();

  if (!project) return <NotFound />;

  const title = `${project.title} — ${project.category} | Abikarthick G`;
  const desc = project.description;
  const url = `${siteConfig.siteUrl}/projects/${project.id}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
      </Helmet>
      <Nav role={role} />

      {/* Storefront sub-banner */}
      <section className="relative isolate overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A475E] via-[#1B2838] to-[#171A21]" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pt-32">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Library
          </Link>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <div className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                {project.category}
              </div>
              <h1 className="mt-1 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.links.itch ? (
                <a
                  href={project.links.itch}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-steam inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                >
                  <Play className="h-4 w-4" /> Play on itch.io
                </a>
              ) : null}
              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-steam inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto mt-8 max-w-7xl space-y-5 px-4 pb-10 sm:px-6">
        {/* Impact */}
        <Card icon={<Sparkles className="h-4 w-4" />} title="Project Impact">
          <div className="grid gap-3 sm:grid-cols-2">
            <Block label="Problem" text={project.projectImpact.problem} />
            <Block label="Solution" text={project.projectImpact.solution} />
          </div>
        </Card>

        {/* Metrics */}
        <Card icon={<Cpu className="h-4 w-4" />} title="Metrics">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Object.entries(project.metrics).map(([k, v]) => (
              <div
                key={k}
                className="rounded-sm border border-white/5 bg-[#2A475E]/40 p-3"
              >
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-1 font-display text-sm font-semibold">
                  {String(v)}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card icon={<Wrench className="h-4 w-4" />} title="Tech Stack">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-sm border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>
          <Card icon={<ListChecks className="h-4 w-4" />} title="Features">
            <ul className="grid gap-1.5 text-sm">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{" "}
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card icon={<Cpu className="h-4 w-4" />} title="Technical Challenges">
          <div className="grid gap-3">
            {project.challenges.map((c, i) => (
              <div
                key={i}
                className="grid gap-3 rounded-sm border border-white/5 bg-[#2A475E]/40 p-3 sm:grid-cols-2"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-accent">
                    Challenge
                  </div>
                  <div className="mt-1 text-sm">{c.challenge}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-primary">
                    Solution
                  </div>
                  <div className="mt-1 text-sm">{c.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card icon={<GraduationCap className="h-4 w-4" />} title="Key Learnings">
          <div className="flex flex-wrap gap-1.5">
            {project.learnings.map((l) => (
              <span
                key={l}
                className="rounded-sm border border-white/8 bg-[#2A475E]/40 px-2.5 py-1 text-[11px] text-foreground/90"
              >
                {l}
              </span>
            ))}
          </div>
        </Card>

        {project.links.itchEmbedUrl ? (
          <div className="overflow-hidden rounded-sm border border-white/8 bg-[#1B2838]">
            <div className="border-b border-white/5 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Play Embedded
            </div>
            <iframe
              src={project.links.itchEmbedUrl}
              title={project.title}
              className="aspect-video w-full"
              allow="autoplay; fullscreen; gamepad"
            />
          </div>
        ) : (
          <Card icon={<Play className="h-4 w-4" />} title="Embed">
            <p className="text-sm text-muted-foreground">
              Add an itch.io embed URL to <code>links.itchEmbedUrl</code> in{" "}
              <code>portfolio.ts</code> to play inline here.
            </p>
            {project.links.itch ? (
              <a
                href={project.links.itch}
                target="_blank"
                rel="noreferrer"
                className="btn-steam mt-3 inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                Open on itch.io <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-sm border border-white/8 bg-[#1B2838] p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="grid h-7 w-7 place-items-center rounded-sm bg-primary/15 text-primary">
          {icon}
        </span>
        <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-sm border border-white/5 bg-[#2A475E]/40 p-3">
      <div className="text-[10px] uppercase tracking-widest text-primary">
        {label}
      </div>
      <div className="mt-1 text-sm text-foreground/90">{text}</div>
    </div>
  );
}
