import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "steam" | "light" | "midnight" | "synthwave" | "forest";

export const THEMES: { id: ThemeId; label: string; swatch: string[] }[] = [
  { id: "steam", label: "Studio Dark", swatch: ["#1B1B1F", "#2B2E35", "#4CD18C"] },
  { id: "light", label: "Daylight", swatch: ["#F2F4F8", "#FFFFFF", "#1A6FB5"] },
  { id: "midnight", label: "Midnight", swatch: ["#0B0B1A", "#1F1F3D", "#A78BFA"] },
  { id: "synthwave", label: "Synthwave", swatch: ["#1A0B2E", "#34195C", "#FF2A8A"] },
  { id: "forest", label: "Forest", swatch: ["#0F1A14", "#1F3328", "#6EE7A8"] },
];

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME: ThemeId = "steam";

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeCtx = createContext<Ctx>({ theme: DEFAULT_THEME, setTheme: () => {} });

function readInitial(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  if (stored && THEMES.some((t) => t.id === stored)) return stored;
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    // Keep legacy `.dark` class roughly in sync for any consumer that still reads it.
    root.classList.toggle("dark", theme !== "light");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setThemeState }}>{children}</ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}
