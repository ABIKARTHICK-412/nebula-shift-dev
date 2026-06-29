## Goal

Refactor the portfolio into a single **Gameplay Programmer** identity. Pure content / information-architecture refactor — no changes to the Steam-inspired visuals, theme tokens, animations, React Router, GitHub Pages build, GitHub Actions, EmailJS, theme switcher, GitHub API integration, or responsive layout.

Optimize for a recruiter who spends 30–60 seconds on the homepage. They should leave able to answer: *What kind of developer is this? Which engines does he know? Has he actually built games? Can I play them? Can I see the code? Does he explain his technical work clearly?*

## Section Order (Home)

`Nav → Hero → Featured Project → Recently Developed → Projects (Unity Projects / Unreal Engine Projects) → Technical Skills → About → Development → Contact → Footer`

The `RoleSwitcher` block currently rendered between Hero and Featured is removed.

## File-by-file Changes

### 1. `src/data/portfolio.ts`
- Delete `ViewerRole` interface and `viewerRoles` array.
- Replace `resumes: Record<ResumeKey, string>` with:
  - `resume: "/resume-gameplay.pdf"` — the single resume surfaced anywhere in the UI.
  - `resumeVariants: { unity, unreal, gameplay, software }` — keeps the existing PDF paths available internally for future use. **Not referenced by any component.**
- Drop `ResumeKey` type.
- `profile.tagline` → `"Gameplay Programmer · Unity · Unreal Engine"`.
- `hero.defaultHeadline` → `"Gameplay Programmer"`.
- `hero.defaultSubheadline` → `"Building polished gameplay systems and interactive experiences using Unity and Unreal Engine."`
- `hero.description` → emphasis on gameplay programming, physics, AI, game feel, systems design, technical problem solving.
- Rewrite `about.bio` to one continuous career narrative (Unity foundation → expanding into Unreal/C++), focused on gameplay architecture, physics, optimization, technical growth.
- Replace `projectFilters` with: `All`, `Unity`, `Unreal Engine`, `In Development`, `Game Jam`.
- Restructure `skillGroups` into the five required buckets, re-using existing items:
  - **Game Engines**: Unity, Unreal Engine
  - **Programming Languages**: C#, C++, Java
  - **Gameplay Programming**: Gameplay Systems, Physics, State Machines, AI Behaviors, Game Feel, 2D & 3D
  - **Tools**: Git, Diversion, UVCS, Blender, Visual Studio, Rider
  - **Problem Solving**: Algorithms, Debugging, Optimization, Systems Thinking
- Delete `careerInterests` from the type and the data (and any consumers).
- Keep `projects`, `featuredProjectId`, `currentlyBuilding`, `timeline`, `learningJourney`, `process`, `stats`, `quickView`, `highlights`, `showcase`, `github`, `about.education` unchanged.

### 2. Delete files
- `src/hooks/use-viewer-role.ts`
- `src/components/portfolio/role-switcher.tsx`

### 3. `src/components/portfolio/nav.tsx`
- Drop `role` prop; import `portfolio.resume` directly.
- Update `NAV` array to: `Home (#top)`, `Projects (#library)`, `Skills (#toolkit)`, `About (#about)`, `Development (#activity)`, `Contact (#support)`.
- Resume button label: `Download Resume` (no recruiter-conditional labels).

### 4. `src/components/portfolio/hero.tsx`
- Drop `role` prop. Use `portfolio.featuredProjectId`, `portfolio.resume`.
- Heading: `Gameplay Programmer`.
- Sub line: `Building polished gameplay systems and interactive experiences using Unity and Unreal Engine.`
- Supporting paragraph mentions Gameplay Programming · Physics · AI · Game Feel · Systems Design · Technical Problem Solving.
- CTA buttons labeled: **Featured Project**, **View Projects**, **Download Resume**, **GitHub** (existing styles unchanged).
- Keep `In Library` rotating card stack.

### 5. `src/components/portfolio/featured-spotlight.tsx`
- Drop `role` prop. Use `portfolio.featuredProjectId` directly.
- Section title: eyebrow `Featured` / heading `Featured Project` (remove the existing "Now Playing" string).

### 6. `src/components/portfolio/projects.tsx`
- Drop `role` prop and `projectOrder` sorting.
- Section heading: eyebrow `Projects` / title `Projects`.
- Render two grouped subsections **excluding** the featured project (so it never appears twice on the homepage):
  1. **Unity Projects** — all projects with `tags.includes("unity")` minus featured.
  2. **Unreal Engine Projects** — projects with `tags.includes("unreal")`. If empty, render a single placeholder card with this exact copy:

     > Currently building Unreal Engine gameplay projects.
     > Expanding into Unreal Engine 5 C++ while applying the same gameplay programming principles developed through Unity projects.

- When a filter is active, switch to a flat single grid that **includes** the featured project (so filtering still works without losing items).
- Project cards add `Status` and `Genre` badges alongside Engine / Language / Platform. `Genre` falls back to `project.category` (no new data fields needed).
- Filter pills sourced from the updated `projectFilters`.

### 7. `src/components/portfolio/sections.tsx`
- `Skills`: drop `role` prop and `skillsPriority` sort. Render `portfolio.skillGroups` in natural order. Eyebrow `Skills` / title `Technical Skills`.
- `About`: rewrite intro copy to one identity (sourced from updated `portfolio.about.bio`). Layout, profile card, education, current focus, recent activity unchanged.
- `GithubBlock`: replace the 4 widgets with: **Public Repositories** (`q.data.publicRepos`), **Currently Maintained** (count of non-archived/non-fork `recent`, fall back to `recent.length`), **Languages Used** (count of distinct languages), **Recent Development** (`recent.length`). Remove Followers / Total Stars widgets. Keep Recent Projects + Languages panels. Section eyebrow `Development Activity` / title stays `@{username}`.
- `Contact`: eyebrow `Get In Touch` / title `Let's Build Something Together`. EmailJS form, schema, env vars untouched.
- `RecentlyDeveloped`: unchanged.

### 8. `src/pages/Home.tsx`
- Remove `useViewerRole` and `RoleSwitcher` imports + render.
- Drop `role` prop from `Nav`, `Hero`, `FeaturedSpotlight`, `Projects`, `Skills`.

### 9. `src/pages/ProjectDetail.tsx`
- Remove any `useViewerRole` / role-conditional resume code; use `portfolio.resume` for any resume link.

### 10. Untouched
- `src/styles.css`, `src/main.tsx`, `src/App.tsx`, theme provider/switcher, `src/lib/github.ts`, `src/config/email.ts`, all `src/components/ui/*`, `index.html`, `public/*` (all four resume PDFs stay), GitHub Actions, `scripts/generate-static.mjs`.

## Dead-code sweep

After edits, grep the repo (excluding `node_modules`, `dist`) for and ensure zero remaining references:

- `viewerRole`, `ViewerRole`, `viewerRoles`
- `RoleSwitcher`, `useViewerRole`
- `ResumeKey`, `resumes[`
- `skillsPriority`, `projectOrder`
- `role:` / `role={` props on portfolio components
- `careerInterests`

`resumeVariants` is the only place the non-gameplay resume paths remain referenced.

## UI Philosophy

Prioritize recruiter readability over visual complexity.

Every section answers exactly one question:

```text
Who am I?
   ↓
What have I built?
   ↓
How did I build it?
   ↓
What technologies do I know?
   ↓
Why should a studio interview me?
```

Do not add new dashboard widgets, decorative sections, duplicate statistics, or additional navigation layers unless they clearly improve this flow. If two sections communicate the same information, keep the simpler one and drop the other. No new counters, badges, or panels beyond what this plan specifies.

## Acceptance

- `npm run build` exits 0 — no TypeScript or ESLint errors.
- No "Unity Recruiter / Unreal Recruiter / Gameplay Programmer / Software Engineer Recruiter" labels anywhere in the UI.
- Single `Download Resume` button in nav and hero; `resumeVariants` exists in the data layer but is not imported by any component.
- Featured project appears exactly once on the homepage.
- Unity Projects and Unreal Engine Projects render as labeled subsections; Unreal shows the new placeholder copy when empty.
- Nav reads: Home / Projects / Skills / About / Development / Contact.
- Theme switcher, EmailJS submission, GitHub API panel, React Router navigation, GitHub Pages build all continue working.
