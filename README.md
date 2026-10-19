# Enterprise UI · Schema-first local workspace

**Status:** Private local implementation workspace. M1 setup is under review; it is not production-ready, not an npm release, and has no GitHub remote.

This is the first implementation slice of the approved AI-first React enterprise design-system direction. It preserves the October 18, 2026 design snapshot and ADRs, not a new visual design exercise.

## What works in this proof

- Original Draft 2020-12 design schema and 1.0.0 registry snapshot are preserved. Additive 1.1.0 registry supplies `ui.Button` and `ui.TextField`; legacy 1.0.0 fixtures remain valid against their archived registry (the 1.1.0 runtime deliberately rejects unmigrated 1.0.0 documents).
- **One canonical document** used by the renderer and inspector; direct JSX consumes the same React components.
- Generated TypeScript serializable prop types from canonical schemas, with drift checking. Unsupported schema shapes fail generation rather than becoming `any`.
- Lightweight `AppShell`, `Panel`, `Button`, `TextField`, and `KpiCard` components. Theme and density controls use snapshot CSS variables.
- Validator rejects unknown components, illegal parent-child combinations, invalid props, unknown data sources/actions, dangerous binding keys, duplicates, excessive node count and version mismatch.
- Property inspector proposes guarded JSON Patch (`test`, `add`, `replace`, `remove`), creates a non-authoritative preview, then hands host authorization/commit to the consumer.
- A browser-only design lab simulates allowed/denied actions, approval/denial of document edits, changes revision only after simulated host accept; no real network, auth or privileged operations.

## Local commands

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

Open http://localhost:5173. The root `check` command is intentionally broad and must not be run automatically at early milestone gates.

Storybook is a private workspace app documenting only implemented components:

```bash
corepack pnpm storybook
corepack pnpm build:storybook
```

The opt-in browser smoke remains separate from root `check`:

```bash
corepack pnpm test:e2e:smoke
```

Playwright browser installation is a separate resource action and is not performed by dependency installation.

The workspace is pinned to Node 24 and pnpm 10.18.0. The M1 lockfile records the resolved local toolchain. Typechecking, builds, tests, and browser rendering remain milestone-gated and must not be inferred from installation alone.

## Structure

- `packages/tokens` — source DTCG JSON and baseline generated CSS theme snapshot.
- `packages/contracts` — original Draft 2020-12 schemas, registry, fixtures, TS generation and validation/patch APIs.
- `packages/react-core` — direct JSX components and styles.
- `packages/react-renderer` — explicit allowlisted adapters resolving named data sources and action intents.
- `packages/react-designers` — same document property inspector, no parallel persisted model.
- `apps/design-lab` — functional React/Vite host fixture and reviewer UI.
- `apps/storybook` — private React/Vite Storybook for the five implemented POC components.
- `tests/e2e/smoke` — one opt-in Chromium design-lab smoke path.
- `docs/architecture`, `docs/design-baseline` — copied source-of-truth decisions and release scope.

## Explicit limitations and next steps

- The original snapshot contains schemas for DataGrid and ActivityFeed; neither is implemented in this proof. The renderer rejects attempts to instantiate them until adapters are registered.
- The original mockup colors/dimensions remain provisional pending real accessibility/contrast checks.
- Only property-level JSON Patch is implemented. Structural edits and migrations are explicitly deferred, not silently accepted.
- Host authorization is simulated; the demo is **not** an authorization or persistence security boundary.
- Original design-token CSS is retained as the source artifact, not yet regenerated semantically from the JSON token graph; a full DTCG transpiler is outstanding.
- Storybook, browser E2E/Playwright, Electron consumer checks, advanced accessibility tests and responsive screenshots belong to the next engineering increment.
- The independent project name, npm scope, public license and remote GitHub repository remain undecided. The temporary `@enterprise-ui/*` scope is not an asserted ownership claim.
- No packages may be published until the complete v1 catalog and release gates specified in `docs/design-baseline/RELEASE-SCOPE.md` are satisfied.

## Repo/bootstrap caution

The root package uses `nx.includedScripts: []` so Nx does not treat the root orchestration scripts as recursive project targets. This is an offline-reviewed safeguard; confirm `pnpm check` in the intended Node 24 environment.
