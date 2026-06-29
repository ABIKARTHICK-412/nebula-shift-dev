# Portfolio Layout Refinement — Content Refactor

Scope: content + IA only. No theme, color, typography, routing, build, EmailJS, GitHub API, or animation changes. All new content driven from `src/data/portfolio.ts`.

## 1. Remove "In Library" — `src/components/portfolio/hero.tsx`

- Delete the local `library` array.
- Delete the right-column `motion.div` ("In Library" panel) entirely.
- Replace the `grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]` wrapper with a single-column layout (drop the grid so Hero becomes one column on all breakpoints).
- Hero retains: availability pill, H1, tagline, description, 4 CTA buttons.

## 2. Rename "New Releases" → "Released Games" — `src/components/portfolio/sections.tsx` (`RecentlyDeveloped`)

- `SectionHead` eyebrow: `Released Games`, title: `Released Games`.
- Filter source to `portfolio.projects.filter(p => p.metrics.status === "Completed")`.
- Keep horizontal scroll, snap, arrow buttons, card markup, and animations exactly as-is.

## 3. New section — `src/components/portfolio/gameplay-mechanics.tsx`

Export `GameplayMechanics`. Reuse the `RecentlyDeveloped` horizontal-scroll pattern (same card size `h-[200px] w-[320px]`, same snap-x row, same arrow buttons, same Steam classes).

- Section head: eyebrow `Systems`, title `Gameplay Mechanics`, sub `Reusable gameplay systems and technical mechanics implemented across projects.`
- Card content per mechanic:
  - Cover area: if `media.preview` / `media.gif` / `media.video` present, render as background image (or `<video autoplay muted loop>` for `.mp4`). Otherwise existing gradient + grid-bg + centered `Gamepad2` icon fallback (same as Released Games cards).
  - Bottom overlay: mechanic title + engine badge pill (`Unity` / `Unreal Engine`).
  - Below cover (inside card or on hover overlay, matching the Released Games card style): short description (line-clamp-2).
  - Optional buttons row: GitHub (`btn-ghost-steam`) and Demo (`btn-steam`), each rendered only when `links.github` / `links.demo` present.
- Component is fully data-driven: maps over `portfolio.gameplayMechanics` with no fixed count assumption. Optional future fields (`difficulty`, `engineVersion`, `category`, `docsUrl`, `articleUrl`, `sourceUrl`) render only when present via `&&` guards — added to the `GameplayMechanic` type as optional now so adding them later is non-breaking.

## 4. Data layer — `src/data/portfolio.ts`

Add the types and arrays:

```ts
export interface GameplayMechanic {
  id: string;
  title: string;
  engine: "Unity" | "Unreal Engine";
  description: string;
  media: { preview?: string; gif?: string; video?: string };
  links?: { github?: string; demo?: string };
  // Optional, future-proof fields — rendered only when present:
  difficulty?: string;
  engineVersion?: string;
  category?: string;
  docsUrl?: string;
  articleUrl?: string;
  sourceUrl?: string;
}

export interface BackgroundImages {
  hero: string;
  projects: string;
  mechanics: string;
  skills: string;
  about: string;
  activity: string;
  contact: string;
}
```

Add to `PortfolioConfig` and `portfolio`:

- `gameplayMechanics: GameplayMechanic[]` seeded with 13 placeholders (Wall Jump, Third Person Shooting, Enemy AI, Dialogue System, Inventory System, Camera Controller, Object Pooling, Save System, State Machine, Turn Based Grid System, Procedural Generation, Input System, Animation Controller). Each has `engine` assigned sensibly (mix of Unity / Unreal Engine), a short description, empty `media: {}`, and a `// TODO: add media/links` comment.
- `backgrounds: { hero: "/bg/hero.jpg", projects: "/bg/projects.jpg", mechanics: "/bg/mechanics.jpg", skills: "/bg/skills.jpg", about: "/bg/about.jpg", activity: "/bg/activity.jpg", contact: "/bg/contact.jpg" }`.
- Extend `Project` with optional `media?: { banner?: string; screenshot?: string; gif?: string; video?: string; engineIcon?: string }`. Existing projects unchanged (field is optional).

## 5. Homepage structure — `src/pages/Home.tsx`

`<main>` order:

```
Hero → FeaturedSpotlight → RecentlyDeveloped (Released Games)
→ GameplayMechanics → Projects → Skills → About → GithubBlock → Contact
```

Import `GameplayMechanics` from the new file. No other changes.

## 6. Background images

For each affected section root, add `relative` + `overflow-hidden` if missing, then insert as the first child:

```tsx
<div
  aria-hidden
  className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.07] blur-2xl"
  style={{ backgroundImage: `url(${asset(portfolio.backgrounds.<key>)})` }}
/>
```

- Targets and keys: Hero → `hero`, Projects (`#library`) → `projects`, GameplayMechanics → `mechanics`, Skills (`#toolkit`) → `skills`, About (`#about`) → `about`, GithubBlock (`#activity`) → `activity`, Contact → `contact`.
- Released Games unchanged.
- Hero already has its own background stack — append the overlay div inside the existing `-z-10` background block (above the radial/gradient layers) so it composites without breaking the existing look. Opacity stays in the 5–10% range.
- No `<img>` elements. Missing files render as empty (no broken image icons).

## 7. Future-proof project media — `src/components/portfolio/projects.tsx`

In `ProjectCard`, inside the cover `<div>`:

- If `project.media?.banner` is set, render `<img src={asset(project.media.banner)} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />` above the gradient.
- Otherwise keep current gradient + grid-bg + faint-title fallback. Zero visual diff today (no project sets `media.banner` yet).

No other changes to project cards.

## 8. Preservation

Untouched: `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/components/theme-provider.tsx`, `src/components/portfolio/theme-switcher.tsx`, `src/components/portfolio/nav.tsx`, `src/components/portfolio/featured-spotlight.tsx`, `src/lib/github.ts`, `src/config/email.ts`, `src/pages/ProjectDetail.tsx`, EmailJS form, GitHub API queries, React Router, `.github/workflows/deploy.yml`, `scripts/generate-static.mjs`, `vite.config.ts`, `public/*`.

## 9. Verification

- `npm run build` clean (no TS / ESLint / Vite warnings introduced).
- Grep confirms no UI string `In Library` remains.
- Visual: Hero is single-column with no library panel; Released Games shows only Completed projects; Gameplay Mechanics row renders 13 placeholder cards with the same look as Released Games; section order matches spec; subtle blurred overlays visible in target sections; project cards look identical.
- Theme switcher, EmailJS, GitHub API queries, router, and GitHub Pages deploy untouched.

## Files touched

- `src/data/portfolio.ts` — add `GameplayMechanic`, `gameplayMechanics`, `backgrounds`, optional `Project.media`.
- `src/components/portfolio/hero.tsx` — remove In Library + go single-column.
- `src/components/portfolio/sections.tsx` — rename + Completed filter in `RecentlyDeveloped`; add bg overlays to Skills/About/GithubBlock/Contact.
- `src/components/portfolio/projects.tsx` — optional banner image + bg overlay.
- `src/components/portfolio/gameplay-mechanics.tsx` — new component.
- `src/pages/Home.tsx` — insert `<GameplayMechanics />` between Released Games and Projects.
