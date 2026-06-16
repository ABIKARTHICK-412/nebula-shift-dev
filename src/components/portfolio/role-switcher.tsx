import { motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import type { ViewerRole } from "@/data/portfolio";

export function RoleSwitcher({
  active,
  onChange,
}: {
  active: ViewerRole;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mx-auto mt-24 max-w-6xl px-4">
      <div className="glass flex flex-col items-center gap-3 rounded-2xl p-3 sm:flex-row sm:justify-between">
        <span className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Viewing as
        </span>
        <div className="flex flex-wrap gap-1.5">
          {portfolio.viewerRoles.map((r) => {
            const isActive = r.id === active.id;
            return (
              <button
                key={r.id}
                onClick={() => onChange(r.id)}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-primary shadow-lg shadow-primary/40"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
                {r.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
