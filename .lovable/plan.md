# Steam-Inspired Portfolio Redesign

A full UI/UX rebuild — not a recolor. Components are restructured to mirror a premium game storefront. All data, routing, integrations, and business logic stay exactly as they are today.

## Scope guardrails

**Untouched:** `src/data/portfolio.ts`, `src/lib/*`, `src/hooks/*`, `src/config/*`, `src/main.tsx`, `src/App.tsx`, `src/pages/NotFound.tsx`, EmailJS wiring, React Router setup, GitHub Actions workflow, vite config, SEO helpers, asset helper, resume switcher logic.

**Rewritten (presentation only):** `src/styles.css`, `src/components/portfolio/nav.tsx`, `src/components/portfolio/hero.tsx`, `src/components/portfolio/featured-spotlight.tsx`, `src/components/portfolio/projects.tsx`, `src/components/portfolio/sections.tsx` (Skills, About, GithubBlock, Contact, Footer, plus a new Recently Developed row), `src/components/portfolio/role-switcher.tsx`, `src/pages/ProjectDetail.tsx`, `src/pages/Home.tsx` (section order + new section names only).

## Design system (`src/styles.css`)

Replace the current dark-sci-fi tokens with the Steam palette.

| Token | Value | Use |
|---|---|---|
| `--background` | `#171A21` | page bg |
| `--surface` | `#1B2838` | panels, nav, footer |
| `--surface-2` | `#2A475E` | cards |
| `--card-hover` | `#335A7F` | card hover state |
| `--primary` | `#66C0F4` | Steam blue, CTAs and accents |
| `--primary-foreground` | `#0E141B` | text on blue |
| `--accent` | `#A4D7F5` | secondary highlights |
| `--foreground` | `#FFFFFF` | primary text |
| `--muted-foreground` | `#C7D5E0` | secondary text |
| `--border` | `rgba(255,255,255,0.06)` | thin separators |

- Replace `.glass` / `.glass-strong` with matte `bg-surface-2` panels, 1px border, soft drop shadow only.
- Strip `.scanlines`, `.neon-border`, `.neon-text`, `.text-gradient` rainbow, animated grid mask, halo blurs — keep selectors as harmless no-ops so existing markup compiles.
- Fonts: keep Inter (body), switch display to **Motiva Sans** alternative → **Manrope** via Google Fonts (Steam-like geometric sans). No Orbitron, no Space Grotesk display swap.
- New utility: `.card-lift` → translateY(-2px) + shadow on hover, 200ms ease.
- New utility: `.cover-zoom img` → scale 1.05 on group-hover, 400ms ease.

## Home page order (`src/pages/Home.tsx`)

```text
1. Nav (sticky, Steam top bar)
2. Hero (full-width cinematic banner)
3. Featured Game (large horizontal showcase)
4. Recently Developed (horizontal scroll row) ← NEW
5. Continue Playing (was: Projects — Steam-style card grid)
6. Development Toolkit (was: Skills — badge cards)
7. About (Steam developer profile layout)
8. Development Activity (was: GitHub — dashboard cards)
9. Developer Support (was: Contact — launcher support form)
10. Footer (minimal)
```

Role Switcher stays but is restyled as a slim segmented control under the nav, not a glass panel.

`CurrentlyBuilding`, `Showcase`, `Learning`, `Process`, `CareerInterests` from the existing layout are folded into other sections or dropped from Home to keep the storefront focus. Their exports remain in `sections.tsx` (no logic removed) — they're just not rendered on `/`.

## Component rebuilds

### Nav — Steam top bar
- Sticky, full-width, `bg-surface` with 1px bottom border.
- Left: logo mark + `ABIKARTHICK.DEV` wordmark.
- Center: STORE-style menu — Featured, Library, Toolkit, About, Activity, Support.
- Right: Resume button (Steam blue), GitHub icon link.
- Mobile: same hamburger drawer, restyled matte.

### Hero — cinematic banner
- 100vh on desktop, min-h-[640px] on mobile.
- Background: full-bleed placeholder cover (gradient + grid placeholder for now, swappable via `portfolio.hero.backgroundImage` — new optional field, defaults to current placeholder), with a left-to-right `from-[#171A21] via-[#171A21]/80 to-transparent` overlay so text is readable.
- Bottom-left content stack (Steam featured banner pattern):
  - Eyebrow: `AVAILABLE NOW`
  - H1: name
  - Role line: `Gameplay Programmer · Unity Developer · Unreal Engine Developer`
  - One-liner copy
  - Button row: **Play Featured Game** (primary), **View Projects**, **Download Resume**, **GitHub** (ghost).
- Right side: rotating thumbnail stack of 4 projects (static for now, no carousel logic) showing they're "in library".

### Featured Game — storefront showcase
- One large horizontal card, 70/30 split desktop, stacks on mobile.
- Left 70%: large screenshot area (`aspect-[16/9]`) with hover image-zoom, play overlay on hover.
- Right 30%: title, category, short desc, key-value rows (Engine, Platform, Language, Dev Time, Status), Game Jam badge when `tags` includes `game-jam`, three buttons (Play Now / GitHub / Case Study → `/projects/:id`).
- Surface: `bg-surface-2`, 1px border, soft shadow, no glow.

### Recently Developed — horizontal scroll row (new)
- `SectionHead` + horizontal `overflow-x-auto snap-x` flex row.
- Each item: landscape cover card (`w-[320px] aspect-[16/9]`), title overlay at bottom, hover image zoom + caption fade-in.
- Source: `portfolio.projects` (Charge Collector, Flappy Bird, Pong, StarStuff already present).
- Scroll hint chevrons on desktop; native scroll on touch.

### Continue Playing — Steam card grid
- Replaces current `Projects` grid. Same data, new card.
- Card shape:
  - Top: large cover (`aspect-[460/215]` Steam capsule ratio), `.cover-zoom`.
  - Body (matte): title (large bold), category line, platform + engine chips, 2-line description.
  - Footer: Play / GitHub / Details buttons.
- Hover: `.card-lift`, border lightens, shadow deepens.
- Filter bar kept (same `portfolio.projectFilters`), restyled as Steam tag pills.

### Development Toolkit — badge panels
- Replaces `Skills`. Reads from `portfolio.skillGroups` unchanged.
- Each group = a matte panel with icon + title and a wrap of clean software-badge chips (no progress bars, no percentages, larger touch targets).

### About — Steam developer profile
- Two-column desktop: left = circular avatar from `portfolio.profile.photo`, name, location, availability chip, social row. Right = info cards: Bio, Education, Experience, Current Focus, Recent Activity (sourced from existing `about.bio`, `about.education`, `currentlyBuilding`, `timeline`).

### Development Activity — dashboard widgets
- Reuses existing `useQuery` + `getGithubStats` call (no change to data or caching).
- Layout: 4 stat tiles (Public Repos, Followers, Total Stars, Recent), then a "Recent Projects" grid identical to current but restyled as matte cards; add a placeholder "Languages" panel using `q.data.recent[].language` rolled up client-side from existing response (no new API calls).

### Developer Support — launcher support form
- Same `react-hook-form` + zod schema + EmailJS submit handler. Zero functional changes.
- New visual chrome: left = matte form panel titled `Submit a request`, right = info card with email / LinkedIn / GitHub / location and the existing resume-variants block.

### Footer — minimal
- One line: `© YEAR Abikarthick G` + GitHub / LinkedIn / Email icon row. Drop the "Built with…" line.

### ProjectDetail — match storefront chrome
- Reskin only. Same routing, same `useParams`, same Helmet SEO, same data reads.
- Header becomes a Steam-style sub-banner; body sections (Impact, Metrics, Tech, Features, Challenges, Learnings, Embed) become matte cards consistent with the new system.

## Acceptance checks

- `npm run build` exits 0; `dist/` still contains `index.html`, `404.html`, `.nojekyll`, `assets/`, `site.webmanifest`, `robots.txt`, `sitemap.xml`.
- No imports added beyond what's already in `package.json` (Google Fonts loaded via `<link>` in `index.html`).
- EmailJS submission path untouched (same `emailjs.send` call, same env-driven config, same mailto fallback).
- React Router routes, `BrowserRouter`, base path, GitHub Actions workflow unchanged.
- Role switcher still reorders projects and changes resume download; resume buttons still resolve through `asset()`.
- No console errors on `/` and `/projects/charge-collector`.

## Out of scope

- New images/screenshots — placeholders stay until you drop real assets into `public/`.
- Data model changes — `portfolio.ts` only gains one optional `hero.backgroundImage?: string` field with a default fallback so nothing breaks.
- Performance refactors (code-splitting, lazy routes) beyond what already exists.
