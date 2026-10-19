# M7 shared-schema visual designers gate report

## Outcome

M7 implements and verifies all 28 accepted `react-designers` units. Registry 1.6.0 adds the 26 serializable designer surfaces; `SelectionOutline` and `ResizeHandles` remain documented direct-React exceptions because their geometry is transient canvas state. The accepted v1 catalog now has 198 verified units and no scaffolded or merely implemented entries.

## Completed work

- Shared designer shell, palette, canvas, selection, resize, property/schema inspection, layers/outline, undo/redo, responsive preview, breakpoint/mode controls, binding and action editors.
- Form, dashboard, workflow, query and schema specialists plus history, conflict, patch-review and validation surfaces.
- Canonical RFC 6902 proposal creation, guarded preview, deterministic history helpers and host-owned approval boundaries.
- Registry 1.6.0 schemas and renderer adapters without introducing a second persisted designer schema or a renderer/designer dependency cycle.
- Grouped Storybook coverage and a local Design Lab flow that rejects, detects a stale revision, discards it and commits a fresh approved proposal.

## Decisions and limitations

- `DesignCanvas` receives an optional rendered preview; it does not import the renderer. The renderer may depend on designers, but designers remain renderer-independent.
- `SelectionOutline` and `ResizeHandles` are direct-React geometry overlays, not serialized document nodes.
- Designer components emit proposals and intentions only. Applications retain permissions, persistence, collaboration, networking and host execution.
- Undo and redo operate over immutable canonical `DesignDocument` snapshots; they do not create a competing history format.

## Verification

- Affected contracts, designers, renderer, Design Lab and Storybook typechecks — PASS.
- `pnpm exec vitest run tests/contracts.test.ts tests/renderer.test.tsx tests/designer-components.test.tsx` — PASS; 3 files, 20 tests.
- `pnpm --filter @enterprise-ui/storybook build-storybook` — PASS; designer catalog discovered. Existing Vite large-chunk advisory only.
- `pnpm exec playwright test tests/e2e/smoke/design-lab.spec.ts --project=chromium` — PASS; 2 Chromium flows including reject, stale and approved proposal outcomes.
- The first browser run exposed an incorrect heading-role assertion after a successful commit; the accessible snapshot showed the AppShell title is banner text. The selector was corrected and the same bounded test file passed.

## Deferred

- No live collaboration backend, persistence service, privileged host execution, Electron IPC, remote actions, publishing or cloud resources.
- Cross-browser and full acceptance sweeps remain M9 work.

## Gate disposition

Standing authorization covers the scoped tests and local commit. All M7 checks passed; this report records the gate before commit and continuation to M8.
