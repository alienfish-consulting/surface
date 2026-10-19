# M3 — foundational core gate report

Date: 2026-10-19

## Outcome

The accepted foundational catalog is implemented and verified: 85 `react-core` units, comprising 20 layout, 12 typography/display, 31 forms, and 22 overlays/feedback/navigation units. All are named exports with typed React APIs, token-based theme/density styles, and real grouped Storybook stories.

Registry 1.2.0 adds JSON Schema 2020-12 contracts and renderer adapters for 83 units. The preserved 1.0.0 and 1.1.0 fixtures were not rewritten. Two reviewed exceptions are explicit:

- `ui.KeyboardShortcut` is an inline semantic helper whose persisted shortcut text belongs to its owning action or menu item.
- `ui.ToastViewport` is application-owned live-region and queue infrastructure; documents persist `ui.Toast` content instead.

The catalog now reports 85 verified, 1 implemented (`ui.KpiCard`, still in its temporary POC location), and 112 scaffolded units.

## Changed areas

- `packages/react-core/src/`: layout, display, forms, overlays, public exports, and shared component CSS.
- `packages/react-core/src/stories/`: grouped working stories for all four M3 families.
- `packages/contracts/`: registry 1.2.0, 79 new generated component schemas (in addition to four existing core schemas), generated serializable types/schema bundle, three-version validation, and explicit declarative exceptions.
- `packages/react-renderer/src/`: typed adapters for all 83 serializable foundational units.
- `apps/design-lab/src/main.tsx`: local ComboBox, Dialog, and DockWorkspace interaction specimen.
- `catalog/` and `docs/catalog-status.md`: verified lifecycle and implementation evidence.
- `docs/components/foundational-core.md`: API boundary, serialization policy, controlled-state model, responsive behavior, and bounded alternatives for difficult controls.
- `tools/generate.mjs`: additive registry/schema/type generation.
- `tools/scaffold-components.mjs`: immutable M2 plan snapshots plus explicit three-file lifecycle-ledger synchronization.
- `tests/contracts.test.ts`, `tests/renderer.test.tsx`, and `tests/e2e/foundational-core.spec.ts`: focused M3 coverage.

No package dependency or version changed. No remote, publication, cloud resource, license, or package identity was created.

## Material decisions and limitations

- ComboBox/Autocomplete use native `datalist`; rich remote/listbox behavior is not claimed.
- Date/time controls use native inputs with deterministic ISO-like persisted strings.
- TreeView supports semantic expansion/selection, not multi-select or drag reparenting.
- DockWorkspace provides responsive panel visibility, not freeform drag docking or detached windows.
- SplitPane/ResizablePanel establish bounded keyboard separator behavior; pointer dragging is not claimed in M3.
- Dialog initial focus and Escape dismissal are covered; application code owns authorization and consequential actions.
- Manual screen-reader passes, multi-browser coverage, mass visual snapshots, and performance testing remain intentionally deferred to later acceptance milestones.

## Test results

T01 PASS — `pnpm check:generated && pnpm check:catalog`

- All generated schemas/types/registry outputs match their sources.
- All 795 M2 scaffold/tracking artifacts match; plans remain immutable snapshots.
- Initial drift exposed lifecycle assumptions and was corrected before the passing rerun.

T02 PASS — scoped package checks:

- `pnpm --filter @enterprise-ui/react-core typecheck`
- `pnpm --filter @enterprise-ui/contracts typecheck`
- `pnpm --filter @enterprise-ui/react-renderer typecheck`
- `pnpm --filter @enterprise-ui/storybook typecheck`
- `pnpm --filter @enterprise-ui/design-lab typecheck`
- Dependency declaration refresh: `pnpm --filter @enterprise-ui/contracts build && pnpm --filter @enterprise-ui/react-core build`

Compiler failures found malformed JSX handler closures, readonly controlled-state mismatches, fieldset attributes, stale declarations, and a missing required `CommandMenu.items` contract. Each was fixed and the affected checks passed.

T03 PASS — `pnpm exec vitest run tests/contracts.test.ts tests/renderer.test.tsx`

- 2 files, 11 tests passed.
- Covers all three registry versions, strict props, explicit exceptions, safe named intentions, renderer fail-closed behavior, and the foundational serialized path.
- An initial warning showed AJV was ignoring the date format. A local deterministic date validator was added; the clean rerun passed without warnings.

T04 PASS — `pnpm --filter @enterprise-ui/storybook build-storybook`

- Storybook 10.6.2 production build completed.
- Layout, display, form, and overlay catalog story modules were discovered and bundled.
- Vite reported its existing large-chunk advisory; it did not fail the build and no dependency split was introduced in M3.

T05 PASS — `pnpm exec playwright test tests/e2e/foundational-core.spec.ts --project=chromium --workers=1`

- 1 Chromium test passed in the local design lab.
- Verified ComboBox keyboard entry, Dialog initial focus and Escape dismissal, and DockWorkspace panel visibility/pressed state.
- The first sandboxed launch was unable to bind port 5173; the exact command passed when rerun with local-server permission.

## Commit scope

Commit all M3 files named above with message `feat: complete M3 foundational core`. This is a local commit only; no push or publication is authorized or planned.
