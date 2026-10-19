# M1 implementation review

**Date:** 2026-10-18

**Status:** Implementation and the approved M1 verification plan are complete; no M1 commit has been created.

## Work completed

- Imported the supplied `seed/enterprise-ui-poc/` into the previously empty target without rewriting its schema, renderer, designer, or five React components.
- Preserved registry fixtures `1.0.0` and `1.1.0`, the seven schema definitions, five runtime adapters, guarded RFC 6902 preview, and host-owned action/authorization boundary.
- Preserved temporary private `@enterprise-ui/*` identifiers without treating them as an approved npm scope.
- Added a private `apps/storybook` React/Vite workspace using Storybook `10.6.2` and `@storybook/addon-a11y` `10.6.2` in inspection mode. Storybook commands explicitly disable telemetry.
- Added real stories for `AppShell`, `Panel`, `Button`, `TextField`, and `KpiCard`. Stories cover supported light/dark, compact/comfortable, high-contrast inspection, narrow layout, disabled, busy, validation, loading, and stale states where applicable.
- Added a deterministic DTCG-to-CSS generation path to the existing `tools/generate.mjs`; source token JSON now includes the already-used elevation and overlay-layer values.
- Ran the write-mode generator once as an implementation step to materialize ignored local token CSS; this did not run the check-mode drift test or any validation/test/build command.
- Connected core control sizing and error colors to generated semantic CSS variables.
- Added Playwright Test `1.64.1`, a Chromium-only project, and one design-lab smoke spec. The smoke remains separate from root `check`; its pinned Chromium browser is installed in the local Playwright cache.
- Added a pnpm `10.18.0` lockfile. The workspace resolved React `19.3.1`, Vite `7.3.7`, Vitest `3.2.7`, Nx `22.7.12`, TypeScript `5.9.3`, and the exact Storybook/Playwright versions above.

## Dependency installation result

`corepack pnpm install --frozen-lockfile=false` completed and created local links/lockfile. With separate approval, the workspace allowlisted and rebuilt only `esbuild` and `nx`. With separate approval, Playwright installed only its pinned Chromium, Chromium headless shell, and FFmpeg artifacts in the user Playwright cache. A Corepack `pnpm` shim was enabled after Nx child processes could not initially resolve `pnpm`.

No project lifecycle hook ran tests during installation. Root `check` remains the original broad chain (`check:generated`, schema validation, typecheck, Vitest, and build) and was not run in M1.

## Architecture decisions

- Retained Node 24 and pnpm 10 rather than adopting newly available pnpm, Nx, Vite, Vitest, or TypeScript majors during POC normalization.
- Chose the current stable Storybook 10 React/Vite packages because the official requirements support Node 20+, pnpm 9+, React 16.8+, Vite 5+, TypeScript 4.9+, and Vitest 3+.
- Kept the a11y addon in `todo`/inspection mode. No claim of automated accessibility conformance is made.
- Storybook aliases only `react-core` to source; it does not publish or register planned catalog entries. Generated autodocs were removed after manual review exposed that no docs renderer was installed; M1 retains real story canvases and controls without adding another documentation dependency.
- Generated token CSS is derived from DTCG JSON. The original `source/ui-tokens.css` remains an approved baseline specimen for comparison, not the generated authority.
- Playwright uses one worker, one desktop Chromium project, local synthetic fixture data, role/name locators, and the design-lab `webServer`. No Firefox, WebKit, mobile emulation, screenshots-as-goldens, external service, or real authorization is included.

## Known limitations and deferred work

- High-contrast Storybook mode is an inspection surface, not contrast certification or forced-colors acceptance.
- The existing five components remain POC-quality and are not marked production-ready by M1.
- The 198-unit catalog is not scaffolded or exported; that belongs to M2 after separate authorization.
- No GitHub remote, CI, npm publication, license, final package namespace, Electron package, or specialized component engine was added.
- Storybook's static build reports two chunks over Vite's default 500 kB warning threshold (`axe` and the Storybook iframe runtime). This does not affect the component packages and is deferred as explorer optimization.
- Nx reports four cached prerequisite tasks as flaky because earlier interrupted attempts produced differing task history; the final approved typecheck completed successfully.
- Storybook attempted to save optional global settings under `~/.storybook` during one sandboxed build and received `EPERM`; the build completed. The final rebuild emitted no settings-write warning.

## Approved resource actions — completed

R01: Added the following pnpm 10 allowlist to `pnpm-workspace.yaml`, then ran `corepack pnpm rebuild esbuild nx`: **PASS**.

```yaml
onlyBuiltDependencies:
  - esbuild
  - nx
```

- Purpose: permit only the two blocked dependency setup scripts required by the selected Vite/Nx toolchain.
- Scope: locally installed `esbuild` and `nx`; no application tests or remote services.
- Resource impact: low; packages are already downloaded.
- Side effects: updates pnpm dependency build state and may create ignored local package artifacts.

R02: `corepack pnpm exec playwright install chromium`: **PASS**.

- Purpose: install only Playwright's pinned Chromium binary for the approved smoke test.
- Scope: local Playwright browser cache; no Firefox/WebKit/system dependency installation.
- Resource impact: medium download and disk usage.
- Side effects: writes outside the repository to Playwright's user cache.

## Approved test results

T01: `corepack pnpm check:generated`: **PASS**.

- Purpose: generate in check mode and prove schema/type/token outputs do not drift.
- Targets: contract generated files and `packages/tokens/dist/theme.css`.
- Browser/viewport: not applicable.
- Fixtures: local schemas, registries, and DTCG token JSON.
- Resource impact: low.
- Writes: none in check mode; generated outputs were materialized during implementation.

T02: `corepack pnpm validate`: **PASS**. Validated the canonical Draft 2020-12 fixture, seven registry entries, and child relationships.

- Purpose: validate exact registry/document/proposal schemas and preserved legacy/current fixtures.
- Targets: `packages/contracts` schemas and fixtures.
- Browser/viewport: not applicable.
- Resource impact: low; no writes.

T03: `corepack pnpm typecheck`: **PASS after a narrow correction**.

- Purpose: typecheck the imported packages, design lab, Storybook configuration, and five story files through Nx project inference.
- Targets: all eight imported/created workspace projects because the complete POC was introduced in M1.
- Browser/viewport: not applicable.
- Resource impact: medium; Nx cache writes under ignored `.nx/`.
- Initial result: failed on TS2742 portability errors in the `KpiCard` and `TextField` story metadata.
- Correction: added explicit `Meta<typeof Component>` annotations to those two metadata objects.
- Final result: all seven Nx projects and their five prerequisite tasks succeeded. A later rerun after removing unsupported autodocs also passed.

T04: `corepack pnpm exec vitest run tests/contracts.test.ts tests/renderer.test.tsx`: **PASS** — two files, eight tests.

- Purpose: run only the two supplied POC contract/renderer tests, including fail-closed validation and guarded patch behavior.
- Targets: two named test files; no broad catalog suite.
- Browser/viewport: Node environment with React server rendering; no browser.
- Fixtures: local versioned registry/design/proposal fixtures.
- Resource impact: low; no external data.

T05: `corepack pnpm --filter @enterprise-ui/design-lab build`: **PASS** — Vite bundled 214 modules.

- Purpose: verify the existing Vite design-lab application bundles against the imported workspace.
- Targets: design lab and its direct workspace dependencies.
- Browser/viewport: build only.
- Resource impact: medium; writes ignored `apps/design-lab/dist/`.

T06: `corepack pnpm build:storybook`: **PASS after a narrow explorer correction**.

- Purpose: generate token CSS and verify the five real component stories and Storybook docs bundle successfully.
- Targets: `apps/storybook`, `react-core`, and `tokens`.
- Browser/viewport: static build only.
- Resource impact: medium; writes ignored Storybook output.
- Initial build passed. Manual review then exposed a broken generated documentation route because autodocs was enabled without a docs renderer.
- Correction: removed the unsupported autodocs tag and added Storybook's `--disable-telemetry` CLI flag to both dev and build commands.
- Final build passed with five component story bundles. Vite's two large-chunk warnings are recorded above.

T07: `corepack pnpm test:e2e:smoke`: **PASS** — one Chromium test in 11.2 seconds.

- Purpose: run the single design-lab smoke, asserting the existing POC renders and light/dark plus comfortable/compact controls update the root state.
- Test file: `tests/e2e/smoke/design-lab.spec.ts` only.
- Browser/viewport: pinned Chromium, 1280×720, one worker.
- Fixtures: local design-lab fixture and simulated host only.
- Resource impact: medium; may write failure-only trace/screenshot and HTML report.
- First attempt could not bind `0.0.0.0:5173` inside the restricted sandbox (`EPERM`) before any assertion ran. The exact approved command was rerun with permission to bind the local Vite test server and passed.

Manual review after T06: **PASS with the autodocs correction described above**. Reviewed all five implemented components in Storybook across light, dark, high-contrast, compact, comfortable, desktop, and 390×844 viewport samples. Confirmed responsive AppShell layout; Button variants, busy/disabled semantics, and visible keyboard focus; TextField error presentation; KpiCard loading/stale states; and readable Panel composition. The AppShell accessibility panel reported zero violations, sixteen passes, and one inconclusive result. The explorer lists only the five implemented components and no proposed catalog placeholders. The local Storybook server was stopped after review.

Deliberately not testing: root `pnpm check`; all 198 catalog entries; Firefox/WebKit; automated WCAG sweep; global screenshots; performance; Electron; external networks, models, services, or consumer repositories.
