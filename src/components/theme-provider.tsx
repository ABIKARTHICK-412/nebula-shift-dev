import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "studio" | "steam" | "forest";

export const THEMES: { id: ThemeId; label: string; swatch: string[] }[] = [
  { id: "studio", label: "Studio Dark", swatch: ["#1B1B1F", "#2B2E35", "#4CD18C"] },
  { id: "steam", label: "Steam Dark", swatch: ["#1B2838", "#2A475E", "#66C0F4"] },
  { id: "forest", label: "Forest", swatch: ["#0F1A14", "#1F3328", "#6EE7A8"] },
];

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME: ThemeId = "studio";
const VALID_IDS = new Set<ThemeId>(THEMES.map((t) => t.id));

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeCtx = createContext<Ctx>({ theme: DEFAULT_THEME, setTheme: () => {} });

function readInitial(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  if (stored && VALID_IDS.has(stored)) return stored;
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.add("dark");
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
