import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import type { ViewerRole } from "@/data/portfolio";

const NAV = [
  { label: "Projects", href: "#projects" },
  { label: "Showcase", href: "#showcase" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export function Nav({ role }: { role: ViewerRole }) {
  const [open, setOpen] = useState(false);
  const resume = portfolio.resumes[role.resumeKey];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass-strong mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/20 font-display text-sm font-bold text-primary neon-border">
            AG
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wider text-foreground sm:inline">
            ABIKARTHICK<span className="text-primary">.</span>DEV
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={resume}
            download
            className="hidden items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110 sm:inline-flex"
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
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-foreground md:hidden"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-strong mx-auto mt-2 max-w-6xl rounded-2xl p-3 md:hidden"
          >
            <div className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={resume}
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
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
