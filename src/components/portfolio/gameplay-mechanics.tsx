import { useRef } from "react";
import * as Icons from "lucide-react";
import { portfolio, type GameplayMechanic } from "@/data/portfolio";
import { asset } from "@/lib/asset";
import { SectionHead } from "./projects";

export function GameplayMechanics() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  const mechanics = portfolio.gameplayMechanics;
  if (!mechanics?.length) return null;

  return (
    <section
      id="mechanics"
      className="relative isolate mx-auto mt-20 max-w-7xl overflow-hidden px-4 sm:px-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.07] blur-2xl"
        style={{
          backgroundImage: `url(${asset(portfolio.backgrounds.mechanics)})`,
        }}
      />
      <div className="mb-5 flex items-end justify-between">
        <SectionHead
          eyebrow="Systems"
          title="Gameplay Mechanics"
          sub="Reusable gameplay systems and technical mechanics implemented across projects."
        />
        <div className="hidden gap-1.5 sm:flex">
          <button
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="grid h-9 w-9 place-items-center rounded-sm border border-white/8 bg-[#1B2838] text-muted-foreground hover:text-primary"
          >
            <Icons.ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="grid h-9 w-9 place-items-center rounded-sm border border-white/8 bg-[#1B2838] text-muted-foreground hover:text-primary"
          >
            <Icons.ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="scroll-row -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6"
      >
        {mechanics.map((m) => (
          <MechanicCard key={m.id} mechanic={m} />
        ))}
      </div>
    </section>
  );
}

function MechanicCard({ mechanic: m }: { mechanic: GameplayMechanic }) {
  const previewImg = m.media?.preview ?? m.media?.gif;
  const previewVideo = m.media?.video;
  const hasLinks = m.links?.github || m.links?.demo;
  const hasExtras =
    m.difficulty || m.engineVersion || m.category || m.docsUrl || m.articleUrl || m.sourceUrl;

  return (
    <article className="card-lift cover-zoom group relative flex h-[320px] w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-white/8 bg-[#1B2838]">
      {/* Cover */}
      <div className="relative h-[160px] overflow-hidden border-b border-white/5">
        <div className="cover-img absolute inset-0 bg-gradient-to-br from-[#2A475E] via-[#1B2838] to-[#0E141B]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        {previewVideo ? (
          <video
            src={asset(previewVideo)}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : previewImg ? (
          <img
            src={asset(previewImg)}
            alt={m.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icons.Gamepad2 className="h-10 w-10 text-foreground/20" />
          </div>
        )}
        <div className="absolute right-2 top-2">
          <span className="rounded-sm border border-primary/30 bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur">
            {m.engine}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-sm font-bold leading-tight text-foreground">
          {m.title}
        </h3>
        {hasExtras ? (
          <div className="mt-1 flex flex-wrap gap-1">
            {m.category ? <MiniChip>{m.category}</MiniChip> : null}
            {m.difficulty ? <MiniChip>{m.difficulty}</MiniChip> : null}
            {m.engineVersion ? <MiniChip>{m.engineVersion}</MiniChip> : null}
          </div>
        ) : null}
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
          {m.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
          {m.links?.demo ? (
            <a
              href={m.links.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-steam inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            >
              <Icons.Play className="h-3 w-3" /> Demo
            </a>
          ) : null}
          {m.links?.github ? (
            <a
              href={m.links.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-steam inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            >
              <Icons.Github className="h-3 w-3" /> Code
            </a>
          ) : null}
          {m.sourceUrl ? (
            <a
              href={m.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-steam inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            >
              <Icons.Code2 className="h-3 w-3" /> Source
            </a>
          ) : null}
          {m.docsUrl ? (
            <a
              href={m.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-steam inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            >
              <Icons.BookOpen className="h-3 w-3" /> Docs
            </a>
          ) : null}
          {m.articleUrl ? (
            <a
              href={m.articleUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-steam inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            >
              <Icons.FileText className="h-3 w-3" /> Article
            </a>
          ) : null}
          {!hasLinks && !m.sourceUrl && !m.docsUrl && !m.articleUrl ? (
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Coming soon
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-white/8 bg-[#2A475E]/50 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-foreground/85">
      {children}
    </span>
  );
}
