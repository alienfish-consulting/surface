# Bootstrap verification — 2026-10-18

## Verified in this execution environment

- JSON parsing across source fixtures, component registry and schemas.
- Draft 2020-12 validation of original legacy 1.0.0 and new 1.1.0 component registries.
- Draft 2020-12 structural validation of both saved original and vertical-slice design fixtures.
- Draft 2020-12 meta-schema checking for all seven current component prop schemas.
- `node tools/generate.mjs --check` succeeds with no generated-file drift.
- All authored TS/TSX files parse without TypeScript syntax errors (TypeScript 5.8 parser; this is *not* a typecheck).
- Node.js `--check` passes on each authored `.mjs` tool.

## Not verified (must run on a connected Node 24 workstation)

- `pnpm install` and a reproducible `pnpm-lock.yaml`: npm registry access is unavailable here.
- Package TypeScript typechecking: dependencies including React, Ajv and fast-json-patch cannot be installed here.
- Vitest behavioral tests and browser/Vite build: not executed here.
- Browser interactive, keyboard, forced-colors, accessibility, and responsive acceptance: not executed here.
- Storybook and Playwright: deferred; packages intentionally not scaffolded as empty placeholders.

The result is a **source bootstrap**, not a tested production artifact. Run `pnpm check` after installing. Errors discovered there are POC integration tasks, not valid reasons to relax schema/host security boundaries or publish packages.

## Workspace recursion safeguard

The root package declares `"nx": {"includedScripts": []}` to prevent the root `pnpm build` and `pnpm typecheck` orchestration scripts from being inferred as Nx project targets. The individual packages/apps retain their own build and typecheck targets. This configuration still requires confirmation by running Nx after installing dependencies.
