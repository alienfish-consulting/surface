# First end-to-end vertical slice — implementation acceptance plan

## Goal
Prove the architectural claim before scaling the catalog: **one canonical document, the same component registry and types, multiple render/author paths, safe patch review and host-owned execution**.

## Scoped component set

- `ui.AppShell` and `ui.Panel` — stable composition/slot semantics and styles.
- `ui.Button` — typed action intent, focus/disabled/busy and light/dark styling.
- `ui.TextField` — typed controlled/uncontrolled editing and accessible error/help text.
- `ui.KpiCard` — declarative binding to host fixture data plus presentation state.

**Explicit non-goals in the first proof:** full DataGrid, pixel-perfect advanced ERP, workflows, Electron privilege implementation, production collaborative persistence, backend authentication, visual canvas with generalized drag-and-drop, LLM orchestration, npm publication.

## Build sequence

1. Bootstrap private pnpm+Nx workspace with pinned engines/lockfile, packages `tokens`, `contracts`, `react-core`, `react-renderer`, `react-designers` (minimal property inspector only), apps `storybook`, `design-lab`.
2. Import and reconcile existing snapshot tokens/JSON schemas, preserving the accepted design language; mark proposed numeric values as provisional.
3. Define registry descriptors and generation: create generated serializable TS types, built registry JSON, validation API and drift-check command; run the existing 5-node sample through compatibility/migration checks.
4. Implement styled React primitives and stories with light/dark, comfortable/compact, high-contrast and responsiveness.
5. Render a complete versioned design JSON fixture through the allowlisted renderer. Make the same primitives directly usable via JSX.
6. Add a minimal designer property inspector editing that exact persisted JSON through validated RFC 6902 proposals, with base revision `test`, protected paths, before/after diff and review request. No automatic authoritative persistence.
7. Inject fake host adapter binding (`kpi.value`) and action handler (`customer.open`) to demonstrate intents vs authorization. Simulate authorized accept, denied action, stale revision, error and reconnect states. Neither UI nor agent infers success.
8. Use Vitest/Playwright/Storybook to validate output, keyboard behaviors, accessibility assertions, CSS variables, package exports and browser isolation.

## Pass/fail gate

- Same fixture loads without format conversion in runtime and inspector; a committed JSON change reflects in both.
- Generated TS types derive from schema, compile in registry adapters, and fail when schema/adapter capabilities diverge.
- Unknown component/prop/action references, unsupported schemaVersion and invalid patches fail closed with useful errors.
- Human review != host authorization; denied and stale responses do not mutate persisted document.
- No mandatory Electron, model or network imports in core package; no real backend/LLM required.
- Tests run locally/CI with reproducible versions. No npm publish during proof.

## First PR shape

A small private workspace with real package exports, token generation, schema validation and three-to-five working representative React components is preferred to scaffolding empty stubs for all v1 families. Add remaining packages as work begins, keeping the full v1 scope invariant.
