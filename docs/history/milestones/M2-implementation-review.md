# M2 implementation review

**Date:** 2026-10-18

**Status:** M2 implementation and the approved verification plan are complete. No M2 commit has been created.

## Work completed

- Added `catalog/components.v1.json` as the accepted, self-contained 198-unit tracking catalog derived from the M0-approved inventory.
- Encoded the M0 classification and export policy on every stable ID: 159 `public-component`, 21 `feature/workstream`, 13 `compositional-subcomponent`, and 5 `internal-primitive`.
- Added lifecycle and evidence tracking without promoting planning artifacts: 193 `scaffolded`, 5 `implemented`, 0 `planned`, 0 `verified`, and 0 `released`.
- Added `tools/scaffold-components.mjs` and root scripts. `pnpm scaffold:components` is dry-run by default; `--write` creates only missing files; matching files remain untouched; differing files cause a hard failure before any write.
- Materialized four planning files for every accepted unit under `scaffolds/<package>/<Component>/`: `component.plan.md`, `schema.plan.json`, `stories.plan.json`, and `test.plan.md`. These 792 files contain no React implementation, runnable Storybook story, placeholder behavioral test, export, or registration.
- Added `scaffolds/README.md` with safe usage and lifecycle rules.
- Added focused `--component` mode. It can generate one component's type, Draft 2020-12 schema, and non-discovered story drafts under `implementation-draft/`; no focused draft was materialized into the repository during M2.
- Generated `catalog/catalog-status.json`, `docs/catalog-status.md`, and `packages/contracts/src/generated/catalog-status.ts` from the accepted catalog.
- Added catalog validation for stable IDs, unique names, approved packages, classification/status values, resolved dependencies, component-level cycles, package-direction violations, registry membership, and registry versions `1.0.0`/`1.1.0`.
- Exported the generated five-type implementation guard from `@enterprise-ui/contracts` and applied it at the renderer boundary before adapter lookup.
- Added one focused renderer assertion for the existing schema-only `ui.DataGrid` entry. It proves that successful document validation does not imply a runtime implementation and expects the renderer to fail closed.
- Added ADR-007 and updated the repository README for the catalog/scaffold workflow.

## Architecture and compatibility decisions

- The accepted catalog is status authority; the status JSON, Markdown dashboard, scaffolds, and TypeScript implementation guard are deterministic generated views.
- Catalog classification is separate from lifecycle. A public-component candidate remains only `scaffolded` until actual implementation, review, and later verification.
- Dependency direction is enforced without creating empty packages: core is foundational; data, operations, and AI may depend on core and their own family; designers may consume earlier families. Component dependency cycles are rejected.
- Registry fixtures were not rewritten. Version `1.0.0` remains the preserved five-entry fixture; `1.1.0` remains the seven-entry active POC fixture.
- `ui.DataGrid` and `ui.ActivityFeed` retain schema-only compatibility entries but remain absent from implemented types and renderer adapters.
- The five POC units are `implemented`, not `verified`: `ui.AppShell`, `ui.Panel`, `ui.Button`, `ui.TextField`, and `ui.KpiCard`.
- `ui.KpiCard` remains physically exported from `react-core` for POC compatibility while its accepted target package stays `react-data`. M2 records the mismatch and defers migration rather than moving it silently.
- No generated scaffold is included in package compilation, Storybook discovery, public exports, or runtime registration.

## Implementation-time generator activity

`corepack pnpm scaffold:components -- --write` was used only to materialize the reviewed M2 deliverables. Its first invocation rejected pnpm's forwarded `--` delimiter and wrote nothing. Argument parsing was corrected to ignore that delimiter. The successful materialization created 794 files (792 component plans plus the status JSON and dashboard); a second implementation run created the generated TypeScript implementation guard and reported the other 794 files unchanged.

These write operations were implementation steps, not the approved M2 verification recorded below.

## Files changed

- Root: `README.md`, `package.json`
- Catalog: `catalog/components.v1.json`, `catalog/catalog-status.json`
- Generator: `tools/scaffold-components.mjs`
- Generated plans: `scaffolds/README.md` and 792 files under `scaffolds/react-core`, `scaffolds/react-data`, `scaffolds/react-operations`, `scaffolds/react-ai`, and `scaffolds/react-designers`
- Contract/runtime boundary: `packages/contracts/src/index.ts`, `packages/contracts/src/generated/catalog-status.ts`, `packages/react-renderer/src/index.tsx`
- Focused regression assertion: `tests/renderer.test.tsx`
- Documentation: `docs/catalog-status.md`, `docs/architecture/adr/ADR-007-catalog-scaffolding.md`, this report

## Known limitations and deferred work

- No new React component or specialized family package was implemented in M2.
- Focused type/schema/story output is deliberately a draft outside production source; it still requires human API review before any later move into a package.
- The generator does not infer lifecycle advancement from files or tests. Status changes remain explicit reviewed catalog edits.
- M2 does not resolve naming overlaps or the twelve weak extrapolation candidates recorded at M0; those remain family-design decisions.
- M2 does not migrate `KpiCard`, generalize named slots, add schema migrations, broaden structural patching, or change runtime registry contents.
- No browser code, Storybook configuration, visual styling, or Playwright scenario changed, so the M1 browser smoke is intentionally omitted from the M2 proposal.
- No remote, CI, publication, license, final package scope, Electron package, or specialized dependency was added.

## Approved test results

T01: `corepack pnpm scaffold:components`: **PASS**.

- Purpose: exercise the required default dry-run against the repository.
- Expected result: 0 files would be created, 795 generated files unchanged, 0 overwritten; summary remains 198 total / 193 scaffolded / 5 implemented.
- Scope: accepted catalog, dependency graph, both registry fixtures, scaffolds, ledger, dashboard, and generated implementation guard.
- Writes: none.
- Actual result: 0 files would be created, 795 unchanged, 0 overwritten; 198 total / 193 scaffolded / 5 implemented.

T02: `corepack pnpm scaffold:components -- --component ui.AppHeader`: **PASS**.

- Purpose: exercise focused component mode without writing.
- Expected result: four standard AppHeader plans unchanged and three implementation drafts reported as creatable; no production source/export/registry change.
- Scope: `ui.AppHeader` only.
- Writes: none.
- Actual result: three focused drafts would be created, four standard AppHeader plans were unchanged, and nothing was written.

T03: **PASS**.

```bash
/bin/zsh -lc 'set -euo pipefail
m2_temp="$(mktemp -d /private/tmp/enterprise-ui-m2.XXXXXX)"
trap '\''rm -rf -- "$m2_temp"'\'' EXIT
corepack pnpm scaffold:components -- --write --output "$m2_temp"
corepack pnpm scaffold:components -- --write --output "$m2_temp"
corepack pnpm scaffold:components -- --check --output "$m2_temp"'
```

- Purpose: prove creation, byte-level idempotency, and check mode in a disposable directory.
- Expected result: first run creates 795 files; second creates 0 and reports all 795 unchanged; check mode passes; the exact `mktemp` directory is removed by the trap.
- Scope: generated artifacts only; no repository files are written.
- Resource impact: low local disk and CPU; no network.
- Actual result: first run created 795 files; second created 0 and found all 795 unchanged; check mode matched all 795 files. The temporary directory was removed by the approved trap.

T04: `corepack pnpm check:catalog`: **PASS**.

- Purpose: verify catalog, scaffolds, lifecycle dashboard, registry compatibility metadata, dependency direction/cycles, and generated implementation guard have no drift.
- Scope: M2 catalog-generation boundary only.
- Writes: none.
- Actual result: all 795 generated files matched the accepted catalog.

T05: `corepack pnpm check:generated`: **PASS**.

- Purpose: confirm the pre-existing schema/registry/type and DTCG token outputs remain unchanged by M2.
- Scope: contract schema bundle, serialized props, and token CSS.
- Writes: none in check mode.

T06: `corepack pnpm exec nx run-many -t typecheck --projects=@enterprise-ui/contracts,@enterprise-ui/react-renderer`: **PASS**.

- Purpose: typecheck only the two affected production packages and their inferred prerequisites.
- Scope: contracts and renderer; Nx may write ignored cache data.
- Browser/viewport: not applicable.
- Actual result: both requested projects and three inferred prerequisites succeeded. Nx reused one cached task and repeated its historical flaky label for `@enterprise-ui/tokens:build`; no task failed.

T07: `corepack pnpm exec nx run-many -t build --projects=@enterprise-ui/contracts,@enterprise-ui/react-renderer`: **PASS**.

- Purpose: verify the generated implementation-status export and renderer guard emit through the affected package builds.
- Scope: contracts and renderer; writes ignored `dist/` and Nx cache artifacts.
- Browser/viewport: not applicable.
- Actual result: both requested builds and two prerequisites succeeded; three of four tasks were served from the local Nx cache. The same historical token-build flaky label was reported without a failure.

T08: `corepack pnpm exec vitest run tests/renderer.test.tsx`: **PASS** — one file, three tests, 50 ms test time.

- Purpose: verify the existing five-component vertical slice still renders and the schema-only `ui.DataGrid` path fails closed with the explicit unimplemented message.
- Scope: one named test file using React server rendering and local fixtures; no browser or external service.

No source correction or additional test was required after the approved plan began.

Deliberately not proposed: root `pnpm check`; 198 placeholder tests; Storybook build; Playwright/browser smoke; screenshots; accessibility sweep; performance testing; Firefox/WebKit; package publication; remote or CI actions.

