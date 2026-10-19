# ADR-007: Catalog scaffolding and implementation status

**Status:** Proposed for M2 approval  
**Date:** 2026-10-18

## Context

M0 accepted 198 stable tracking IDs but classified only 159 as ordinary public-component candidates. M2 must make every accepted unit traceable without presenting planning files as working React components.

The POC also has a deliberate compatibility wrinkle: registry `1.0.0` contains five schema entries, registry `1.1.0` contains seven, but only five types have React renderer adapters. `ui.DataGrid` and `ui.ActivityFeed` are schema-only. `ui.KpiCard` is temporarily implemented in `react-core` although its accepted target family is `react-data`.

## Decision

- `catalog/components.v1.json` is the accepted tracking source. It records stable ID, target package, M0 classification, export policy, lifecycle status, dependencies, design references, and acceptance focus.
- Lifecycle states are `planned`, `scaffolded`, `implemented`, `verified`, and `released`. They are monotonic only after milestone approval; generated files do not advance a unit automatically.
- `catalog/catalog-status.json`, `docs/catalog-status.md`, component scaffold directories, and the implemented-type guard are deterministic generated views.
- Planning artifacts live under `scaffolds/`, outside package source and Storybook discovery. They cannot become exports or registry entries by generation.
- Default generation is read-only. Write mode creates missing files, treats byte-identical output as unchanged, and refuses to overwrite differing content.
- Focused generation creates draft type/schema/story files only beneath one component's scaffold directory. Moving reviewed drafts into production remains an explicit implementation task.
- Component dependencies must resolve, remain acyclic, and follow package direction: core is foundational; data, operations, and AI may depend on core and themselves; designers may depend on any earlier family. No empty specialized package is created in M2.
- Registry fixtures `1.0.0` and `1.1.0` remain unchanged. The renderer additionally checks generated implementation status before adapter lookup, so schema-only compatibility entries fail closed.
- `ui.KpiCard` remains in its POC location during M2. Moving it to `react-data` requires a later package-boundary migration with consumer and registry review.

## Consequences

- All 198 units are reviewable and dependency-traceable without 193 fake components or stories.
- Catalog and scaffold drift can be checked separately from schema/token code generation.
- Editing generated scaffold files directly creates a visible conflict rather than being overwritten.
- Production implementation still requires component-specific API, accessibility, story, schema, test, export, and registration approval.

