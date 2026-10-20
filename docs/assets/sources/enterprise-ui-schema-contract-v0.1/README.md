# Enterprise UI · Declarative Schema & Component Registry Contract v0.1

**Status:** Proposed contract / design sample, **not** an npm package or a React implementation. Date: 2026-10-18.

This package advances the approved, professional React/Electron enterprise design system. It provides executable JSON Schema Draft 2020-12 examples for a small, intentionally representative slice: application shell, panel, KPI, grid, and activity feed. The complete v1 component catalog remains in scope; these five registry entries are **contract specimens**, not a reduction of scope.

## Contents
- `SCHEMA-ARCHITECTURE.md` — separation of design, registry, runtime state, agents and application authority.
- `DESIGN-TRANSACTIONS.md` — agent-proposed JSON Patch workflow, revision guards, conflict handling, reversibility.
- `schemas/` — design document, component registry, patch proposal and five per-component prop schemas.
- `examples/` — registry, ERP dashboard design, and proposed agent change.
- `tools/validate_examples.py` — **offline demonstration verifier** (Python jsonschema), not code for the published React library.
- `VALIDATION-RESULTS.md` — generated local checks and limitations.

Run with `python tools/validate_examples.py` (requires Python package `jsonschema`). The sample URLs with `.invalid` are **non-resolving identifiers**, never remote dependencies.

## Explicit guardrails
1. Designs contain references to named host data/action capabilities; not JavaScript expressions, raw HTML, URLs, credentials, or executable callbacks.
2. JSON Schema validates shape; registry checks validate component capabilities and containment; the consuming application enforces permissions, data scope, and real-world effects.
3. A proposal and diff can be previewed without applying it. An approval click expresses **intent**, not authorization or completion.
4. External consumer-repository tests are documented release policy, **not** imposed by CI/configuration here.
5. All planned packages remain in the coordinated initial release, only after full v1 acceptance. No npm publishing in this milestone.

## Open decisions
- Registry cross-version compatibility and migration algorithm; domain-specific action payload signatures.
- Canonical persisted layout units and complex container-responsive schemas.
- Signed component/provider registry namespaces and third-party plugin registration controls.
- Renderer slot composition beyond basic child containment and typed data binding projection.
- Production TypeScript source-of-truth strategy vs generated JSON Schemas.
