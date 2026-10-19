# M4 advanced data and analytics gate report

## Outcome

M4 implements and verifies all 33 accepted `react-data` catalog units across tables, data visualization, calendars/scheduling, and safe data inspectors. The catalog moves from 85 to 118 verified units, with 80 later-milestone units still scaffolded.

The active declarative registry is now 1.3.0. It adds schemas and renderer adapters for 30 M4 units while preserving the immutable 1.2.0, 1.1.0, and 1.0.0 registry fixtures. `GridColumn`, `ChartLegend`, and `ChartTooltip` are documented JSX-only compositional exceptions; no executable functions enter serialized documents.

## Files and packages changed

- `packages/react-data/`: styled typed implementations, package build configuration, responsive styles, and three grouped Storybook catalogs.
- `packages/contracts/`: 28 new generated schemas, registry 1.3.0, generated TypeScript props, four-version validation, and the three reviewed declarative exceptions. Existing DataGrid and KpiCard schemas are retained and promoted into the implemented M4 boundary.
- `packages/react-renderer/`: 30 data adapters, including named host intentions for editing, selection, filtering, scheduling, and inspector navigation.
- `apps/design-lab/`: direct `react-data` consumption and an interactive sortable/filterable DataGrid specimen.
- `apps/storybook/`: data-package styles, dependency wiring, and discovery of real M4 stories.
- `catalog/` and generated status outputs: all M4 units marked verified with implementation evidence in `react-data`.
- `tests/`: focused contract, renderer, large-data window, accessible visualization, safe-text inspector, and browser interaction coverage.
- `docs/architecture/ADR-0002-data-engines.md`: records the bounded dependency-free v1 decision and explicit reevaluation thresholds for grid, chart, and drag/drop engines.

## Material decisions and exceptions

- DataGrid uses semantic table output and a bounded initial row window (default 200). Host pagination or a deliberately larger window owns datasets beyond that bound; full bidirectional virtualization is deferred until measured product requirements justify an engine.
- Charts use accessible SVG with textual alternatives. Calendar, scheduler, timeline, Gantt, pivot, and heatmap implementations cover the accepted v1 contracts without claiming a full analytical engine.
- Inspector content is rendered as text; no HTML injection or arbitrary code execution is supported.
- KpiCard now has its accepted `react-data` implementation and renderer adapter. The old `react-core` export remains temporarily available for source compatibility, but new stories and the design lab use `react-data`.
- `ActivityFeed` remains the only legacy schema-only compatibility unit and continues to fail closed at the renderer boundary.

## Verification results

- `pnpm check:generated` — PASS; generated contracts and tokens are current.
- `pnpm check:catalog` — PASS; all 795 catalog/scaffold artifacts match.
- `pnpm --filter @enterprise-ui/contracts typecheck` — PASS.
- `pnpm --filter @enterprise-ui/react-data typecheck` — PASS.
- `pnpm --filter @enterprise-ui/react-renderer typecheck` — PASS.
- `pnpm --filter @enterprise-ui/design-lab typecheck` — PASS.
- `pnpm --filter @enterprise-ui/storybook typecheck` — PASS.
- `pnpm exec vitest run tests/contracts.test.ts tests/renderer.test.tsx tests/data-components.test.tsx` — PASS; 3 files and 16 tests.
- `pnpm build:storybook` — PASS. Vite reported only its existing large-chunk advisory.
- `pnpm test:e2e:smoke` — PASS; 1 Chromium scenario, including grid sorting and filtering. The first sandboxed attempt could not bind port 5173; the authorized local-server rerun passed.

## Incomplete or deferred

- No remote, publish, package identity, license, or cloud action was created.
- No full grid/chart/drag-drop engine was added. ADR-0002 defines the trigger for reevaluation.
- Manual assistive-technology certification, cross-browser expansion, and release-wide performance budgets remain later release work.
- The 80 M5–M7 units remain scaffolds and are not exported, registered, or represented by placeholder stories.

## Gate disposition

The user provided standing approval to continue implementation, scoped testing, and local commits through the handoff unless a new explicit-approval issue arises. No such product or dependency decision arose in M4. The approved M4 verification set passed, so this report records the gate before the local milestone commit and continuation to M5.
