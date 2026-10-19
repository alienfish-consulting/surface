# Open/deferred decisions

These items are not silently approved by this packet.

## Needs confirmation before repository bootstrapping

1. **Core choice:** accept schema-first Draft 2020-12 authoring and generation as canonical for the serialized subset; React props may be richer. If rejected, revisit ADR-002 first.
2. **Workspace choice:** pnpm + minimal Nx, Node 24 LTS tooling, React 19 first major, Storybook/Vite/Vitest/Playwright (ADR-001/006).
3. **Project location/identity:** new repository or existing repository, final npm scope/package prefix, license and branch strategy. Not enough information in the snapshot to assign these.

## Validate with first slice (do not block kickoff)

- Actual schema-to-TypeScript generation tool, especially Draft 2020-12 keyword fidelity; API ergonomics and package sizes.
- Default serialized `slots` model and migration strategy from the existing basic `children` array; exact registry compatibility rules.
- High-contrast palette and forced-color behavior; font loading/distribution, right-to-left and portal theme transfer.
- Exact React component prop spellings (especially `onPress`/`onClick`), data-binding target typing, host-intent typed payloads.
- React 18 support, if required; current proposal targets React 19 first.

## Validate just ahead of relevant component families

- TanStack Table/Virtual sufficiency for enterprise DataGrid/TreeGrid/Pivot and WAI-ARIA APG keyboard behavior.
- Layout engine for topology, chart engine, dockable workspace engine, Gantt scheduling, accessible drag/drop, code editors.
- Actual telemetry/event-source adapters, visual editor collaboration, and Electron preload/IPC host implementations (these are app-owned or optional adapter concerns).
- Performance budgets expressed as repeatable thresholds per component category.

## Preserve release constraints

No premature npm publication; full agreed v1 scope. The advanced ERP collage is exploratory, but not a blocker to implementing the established visual direction. No new raster mockups are required to begin. Separate consumer repo install testing is release policy only, not a CI dependency.
