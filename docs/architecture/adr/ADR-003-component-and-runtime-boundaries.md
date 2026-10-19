# ADR-003 — Component packages, renderer and host boundaries
**Status:** Accepted and implemented · **Date:** 2026-10-18

## Decision
Split the architecture into independent `tokens`, framework-neutral `contracts`, `react-core`, specialized React packages, a thin pluggable `react-renderer`, `react-designers`, and optional `electron-bridge`. A registry descriptor identifies a component, but code comes from a **host-supplied allowlisted registration**, never imported by a JSON document. Use adapter injection for data-source, action-intent, localization, theme and runtime-state resolution.

Avoid a single all-inclusive React package with unavoidable advanced-grid, diagram, chart, designer or Electron dependencies. An optional convenience preset may compose all registered packages.

## Alternatives
- One big library: faster initial imports, risks heavy bundles and coupling.
- Separate designer persistence model: easier designer implementation but violates shared canonical versioned schema.

## Verification
`react-core` builds with no Electron/AI/server dependency; bare browser bundle does not include Electron or designer dependencies. UI emits intent and displays host-confirmed results, and cannot call privileged actions itself.
