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
    <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
      <div className="flex flex-col items-start gap-3 rounded-sm border border-white/8 bg-[#1B2838] px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Viewing as
        </span>
        <div className="flex flex-wrap gap-1">
          {portfolio.viewerRoles.map((r) => {
            const isActive = r.id === active.id;
            return (
              <button
                key={r.id}
                onClick={() => onChange(r.id)}
                className={`rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
