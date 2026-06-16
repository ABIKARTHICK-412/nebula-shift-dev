import { motion } from "motion/react";
import {
  Gamepad2,
  Trophy,
  Zap,
  Construction,
  Play,
  Download,
  Mail,
  MapPin,
  Cpu,
  Briefcase,
  Code2,
  ArrowDown,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";
import type { ViewerRole } from "@/data/portfolio";

const ICONS: Record<string, typeof Gamepad2> = {
  Gamepad2,
  Trophy,
  Zap,
  Construction,
};

export function Hero({ role }: { role: ViewerRole }) {
  const resume = portfolio.resumes[role.resumeKey];

  return (
    <section className="relative mx-auto mt-8 max-w-6xl px-4 pb-10 pt-6">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-[80%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {portfolio.profile.availability}
        </div>
        <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-gradient">{role.headline}</span>
        </h1>
        <p className="mt-4 font-display text-base tracking-wide text-foreground/80 sm:text-lg">
          {role.subheadline}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          {portfolio.hero.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              role.ctaEmphasis === "play"
                ? "animate-pulse-glow bg-primary text-primary-foreground"
                : "border border-white/15 bg-white/5 text-foreground hover:bg-white/10"
            }`}
          >
            <Play className="h-4 w-4" /> Play My Games
          </a>
          <a
            href={resume}
            download
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              role.ctaEmphasis === "resume"
                ? "animate-pulse-glow bg-primary text-primary-foreground"
                : "border border-white/15 bg-white/5 text-foreground hover:bg-white/10"
            }`}
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              role.ctaEmphasis === "contact"
                ? "animate-pulse-glow bg-primary text-primary-foreground"
                : "border border-white/15 bg-white/5 text-foreground hover:bg-white/10"
            }`}
          >
            <Mail className="h-4 w-4" /> Contact
          </a>
        </div>
      </motion.div>

      {/* Highlights strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {portfolio.highlights.map((h) => {
          const Icon = ICONS[h.icon] ?? Gamepad2;
          return (
            <div
              key={h.label}
              className="glass flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs sm:text-sm"
            >
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground/90">{h.label}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Quick View */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="glass-strong mx-auto mt-6 max-w-5xl rounded-2xl p-4 sm:p-5"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xs uppercase tracking-[0.25em] text-primary">
            Recruiter Quick View
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            30-second scan
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <QV icon={<Briefcase className="h-4 w-4" />} label="Experience" value={portfolio.quickView.experience} />
          <QV icon={<Gamepad2 className="h-4 w-4" />} label="Projects" value={portfolio.quickView.projects} />
          <QV icon={<Cpu className="h-4 w-4" />} label="Primary Engine" value={portfolio.quickView.primaryEngine} />
          <QV
            icon={<Code2 className="h-4 w-4" />}
            label="Languages"
            value={portfolio.quickView.languages.join(", ")}
          />
          <QV icon={<MapPin className="h-4 w-4" />} label="Location" value={portfolio.quickView.location} />
          <QV
            icon={<Trophy className="h-4 w-4" />}
            label="Game Jams"
            value={portfolio.quickView.gameJams}
          />
        </div>
      </motion.div>

      <div className="mt-10 flex justify-center text-muted-foreground">
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

function QV({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/5 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className="mt-1 font-display text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
