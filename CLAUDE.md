# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`codesampa.io` — Gabriel Sampaio's personal software-engineering portfolio, built on Next.js 16 (App Router) + React 19, used as a testbed for RC/beta versions of the React ecosystem. Bilingual (EN/PT) via `next-intl`, with an MDX blog powered by Velite pulled from a separate content repo.

## Commands

```bash
yarn dev              # Dev server at http://localhost:3000 (also runs Velite in watch mode via next.config.ts)
yarn build             # Production build: runs `velite` then `next build`
yarn start             # Serve the production build
yarn lint              # ESLint
yarn blog              # `npx velite --watch` — rebuild MDX content only, without the Next dev server
yarn content:update    # git submodule update --remote --merge — pull latest blog content from the content submodule
```

There is no test runner configured in this repo.

Package manager is **yarn** (yarn.lock is the source of truth); npm also works per the README but prefer yarn for lockfile consistency.

## Architecture

### Content pipeline (Velite)

Blog posts are **not** stored in this repo — `content/` is a git submodule pointing at `codesampa.io-content`. Velite (`velite.config.ts`) reads `content/blog/**/*.mdx`, validates frontmatter with a Zod-like schema, and emits typed JSON + processed MDX into `.velite/` (gitignored, generated). Import generated content via the `.velite` path alias (see `tsconfig.json`).

Key facts about the `posts` collection:
- Slug format is `blog/<locale>/<...path>`; the schema transform derives `locale` and `slugAsParams` from it — so post file paths encode the locale segment.
- MDX pipeline applies `rehype-slug`, `rehype-autolink-headings`, and `rehype-pretty-code` (github-dark theme, background stripped so it inherits the page background).
- Velite runs automatically in `next.config.ts` on `dev`/`build` (guarded by a `VELITE_STARTED` env flag so it only starts once) — you normally don't need to run it manually except via `yarn blog` when iterating on content only.

### Internationalization

Routing is locale-prefixed via `src/app/[locale]/...` using `next-intl`. Supported locales live in `src/utils/constants/languages.ts` (`EN_US`, `PT_BR`); `EN_US` is the default. `src/middleware.ts` wraps `next-intl`'s middleware using the config in `src/lib/i18n/routing.ts`; the matcher excludes `api`, `_next`, `_vercel`, and files with extensions. Translation strings live in `src/lib/i18n/messages/{en-US,pt-BR}.json`; the Next.js plugin config is loaded from `src/lib/i18n/request.ts`.

When adding user-facing text, add keys to **both** message JSON files and read them with `next-intl`'s `getTranslations`/`useTranslations`, not hardcoded strings.

### App Router layout

- `src/app/[locale]/layout.tsx` is the root layout: sets up fonts, `NextIntlClientProvider`, `ThemeProvider` (dark by default), global `Header`/`Footer`, and `Toaster` (sonner).
- Route groups: `(home)` for `/`, plus `blog`, `blog/[slug]`, `contact`, `projects`, `schedule-success`.
- Server Actions live in `src/app/actions/` (e.g. `newsletter.ts` — validates with Zod, then talks to Resend for both audience-list signup and transactional email; requires `RESEND_API_KEY`/`RESEND_AUDIENCE_ID` env vars).

### Component organization

- `src/components/pages/<page>/` — page-specific sections, one subfolder per page section (e.g. `home/hero`, `home/pipeline`, `home/shape-shifter`). Each section is generally `index.tsx` plus co-located helper files (`components.tsx`, `*-visuals.tsx`, etc.) in the same folder — keep that pattern when adding new sections rather than pulling files out to a shared location prematurely.
- `src/components/layout/` — global chrome (`header`, `footer`).
- `src/components/ui/` — shadcn/ui-style primitives (`new-york` style, no Tailwind prefix, base color `neutral`; see `components.json`). Icons come from `lucide-react`.
- `src/components/providers/` — context providers (theme, etc).
- Heavier 3D/animated pieces (e.g. `shape-shifter`) use `three` / `@react-three/fiber` / `@react-three/rapier` / `framer-motion` — check for existing patterns in that folder before adding new 3D primitives.

### Utils

- `src/utils/constants/` — static data (project list, code snippets/symbols, languages, host URL).
- `src/utils/functions/` — small pure helpers (e.g. `tw-merge.ts` for the `cn()`-style class merger, reading-time estimation).
- `src/utils/hooks/` — shared hooks (`use-mobile`, `use-change-language`).
- `src/utils/stores/` — Zustand stores (e.g. `home-store.ts`).
- `src/utils/styles/globals.css` — Tailwind v4 entry point (no separate `tailwind.config`; Tailwind v4 is configured via CSS/`@tailwindcss/postcss`).

### Path aliases (tsconfig.json)

- `@/*` → `src/*`
- `content/*` → `content/*` (submodule)
- `.velite` → generated Velite output

`components.json` also defines shadcn aliases (`@/components`, `@/lib`, `@/hooks`, `@/utils`, `@/assets`, `@/app/actions`) — use these when scaffolding via shadcn CLI.

## Conventions

- Prettier: single quotes, semicolons, no trailing commas (`.prettierrc`).
- Import order is enforced by `eslint-plugin-import-helpers` (see `eslint.config.mjs`): (1) react/next/external modules, (2) internal aliases (`@app`, `@/components`, `@/lib`, `@/utils`, `@/assets`), (3) relative imports — alphabetized within each group, blank line between groups.
- `@typescript-eslint/no-explicit-any` is a warning, not an error — existing code (e.g. server action `prevState` args) uses `any` where React's typing forces it; don't treat every instance as a bug to fix.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
