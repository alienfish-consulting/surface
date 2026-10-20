# Validation Results — Offline Specimen

Run `python tools/validate_examples.py` from any directory with Python package `jsonschema` available.

- All 8 schema files pass Draft 2020-12 meta-schema validation.
- Registry and dashboard document: **PASS**.
- Registered UI instances traversed: **5**.
- JSON Patch proposal syntactically validated: **PASS**.
- Optimistic revision and node-ID guard tests: **PASS**.
- Safe dry-run change `selectable: true → false`: **PASS**; source unchanged.
- Negative validation specimens rejected: **12/12**.

| Negative specimen | Result | Reason (abridged) |
|---|---|---|
| unknown component | REJECTED | `unknown component ui.Unknown` |
| duplicate stable IDs | REJECTED | `duplicate node ID customer-total` |
| unsupported CSS injection prop | REJECTED | `customer-grid props: Additional properties are not allowed ('style' was unexpected)` |
| invalid child containment | REJECTED | `leaf component cannot accept children` |
| undeclared action | REJECTED | `undeclared action admin.deleteAll` |
| undeclared data source | REJECTED | `undeclared data source secretCustomers` |
| unrecognized binding path syntax | REJECTED | `document shape: 'not/a/pointer' does not match '^(?:/(?:[^~/]/~[01])*)*$'` |
| unsupported registry version | REJECTED | `incompatible registry version` |
| stale revision | REJECTED | `stale base revision` |
| unauthorized global capability mutation | REJECTED | `protected or unsupported mutation path` |
| unsupported JSON Patch move | REJECTED | `operation not enabled in v0.1 demonstrator` |
| failed component identity guard | REJECTED | `guard test failed` |

## Scope and limits

This is **not** a production validator or a full JSON Patch implementation. It has no host permissions, real application binding resolution, schema migration, runtime TypeScript components, Electron IPC, arbitrary registry loading, keyboard verification, DOM rendering, or security enforcement. It deliberately allows only nested component `props` mutations in the patch demonstrator.

Release-grade code must establish resource limits, JSON Schema output/reporting, type-aware bindings, comprehensive RFC 6902 behavior or explicitly restricted operation subset, stable identity semantics for node insertion, audit and authorization, migration policy, schema provenance, and accessible previews.
