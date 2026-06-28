## Plan: finish React Router migration + fix build

### 1. Rewrite `src/pages/ProjectDetail.tsx` for React Router
- Replace `@tanstack/react-router` imports with `react-router-dom` (`Link`, `useParams`).
- Read id via `useParams<{ id: string }>()`.
- Look up the project from `portfolio.projects`; if missing, render the existing `NotFound` page.
- Drop `createFileRoute`, `Route.useLoaderData`, `notFound`, `head`, `loader` entirely.
- Keep all JSX, classes, animations, and layout exactly as-is.

### 2. Per-route SEO with `react-helmet-async`
- Add `react-helmet-async` dependency.
- Wrap the tree in `<HelmetProvider>` inside `src/main.tsx` (outside `BrowserRouter`).
- In `ProjectDetail`, use `<Helmet>` to set `<title>`, meta description, `og:title`, `og:description`, plus canonical/`og:url` for the project's URL.
- Leave `useDocumentMeta` usage in `Home`/`NotFound` untouched (it already works).

### 3. Add `build:dev` script (fixes current build failure)
- GitHub Actions / Lovable build invokes `npm run build:dev`, which doesn't exist → exit 1.
- Add to `package.json` scripts:
  - `"build:dev": "node scripts/generate-static.mjs && vite build --mode development"`
- Keep existing `build` script unchanged.

### 4. Whole-project audit (must return zero hits outside `node_modules`/lockfiles)
- Grep and remove any remaining usages of: `@tanstack/react-router`, `@tanstack/react-start`, `createFileRoute`, `createRootRoute`, `createLazyFileRoute`, `Route.`, `loader(`, `head(`, `beforeLoad(`, `notFound(`, `redirect(`.
- Known remaining hits to address:
  - `src/pages/ProjectDetail.tsx` (covered in step 1).
  - `eslint.config.js` — remove the TanStack Start-specific `no-restricted-imports` message for `server-only`.
- Re-grep after edits to confirm zero results.

### 5. Dependency hygiene
- Confirm `package.json` has no `@tanstack/react-router` / `@tanstack/react-start` / nitro / wrangler entries (already clean — verify only).
- Keep `@tanstack/react-query`.

### 6. Validate
- Run `npm install` and `npm run build`; fix any errors that surface.
- Verify `dist/` contains: `index.html`, `404.html`, `.nojekyll`, `assets/`, `site.webmanifest`, `robots.txt`, `sitemap.xml` (all emitted by Vite + `scripts/generate-static.mjs` copying from `public/`).
- Re-run the audit grep one final time to confirm zero TanStack Router/Start references in source.