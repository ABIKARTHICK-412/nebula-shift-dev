import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Download, Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import type { ViewerRole } from "@/data/portfolio";
import { asset } from "@/lib/asset";
import { ThemeSwitcher } from "@/components/portfolio/theme-switcher";

const NAV = [
  { label: "Featured", href: "#featured" },
  { label: "Library", href: "#library" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "About", href: "#about" },
  { label: "Activity", href: "#activity" },
  { label: "Support", href: "#support" },
];

export function Nav({ role }: { role: ViewerRole }) {
  const [open, setOpen] = useState(false);
  const resume = asset(portfolio.resumes[role.resumeKey]);

  return (
    <header className="bg-nav fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-primary/20 font-display text-xs font-bold text-primary">
            AG
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.12em] text-foreground sm:inline">
            Abikarthick<span className="text-primary">.</span>dev
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-sm px-3 py-1.5 text-[13px] font-medium uppercase tracking-wider text-muted-foreground transition hover:bg-white/5 hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href={portfolio.profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-surface text-foreground/80 hover:text-primary sm:grid"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={resume}
            download
            className="btn-steam hidden items-center gap-2 rounded-sm px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" />
            {role.label.includes("Unity")
              ? "Unity Resume"
              : role.label.includes("Unreal")
                ? "Unreal Resume"
                : role.label.includes("Gameplay")
                  ? "Gameplay Resume"
                  : "Software Resume"}
          </a>
          <button
            className="grid h-9 w-9 place-items-center rounded-sm border border-white/8 bg-white/5 text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--hairline)] bg-surface md:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-3 py-2.5 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-primary"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={resume}
                download
                className="btn-steam mt-2 inline-flex items-center justify-center gap-2 rounded-sm px-3 py-2.5 text-sm font-semibold uppercase tracking-wider"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
