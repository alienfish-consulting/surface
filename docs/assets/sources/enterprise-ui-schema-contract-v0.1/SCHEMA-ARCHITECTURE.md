# Schema & Registry Architecture — Proposed Contract

## Data flow

`React JSX` and `Visual Designers` and `Agent-generated proposals` → **shared registry + versioned JSON Schema validation** → safe UI renderer → typed user intentions → **host application policy/authorization/execution**.

- **Visual designers** edit the same versioned document format that runtime renderers consume. They must not persist an alternate proprietary visual-only format.
- **Agents** discover registered component capabilities and propose deterministic, reviewable transactions. No model, inference endpoint or agent SDK is required by the component library.
- **Runtime rendering** maps registered component types to React components. No dynamic arbitrary-code loading from design documents.
- **Data bindings** use declared `sourceId` plus an RFC 6901 JSON Pointer path, resolved by a host-controlled source adapter and constrained by host permissions.
- **Action intents** use declared `actionId` strings, resolved and authorized by the host. The registry event label (e.g., `onRowActivate`) identifies a typed UI event but does not grant the host action permission.
- **Transient app state** (loading, connectivity, freshness, execution, approval, unsaved edits) is separate from persisted design configuration. It is passed as runtime data and cannot be spoofed by a design document.
- **Design tokens** remain runtime CSS custom properties. Schemas should use sanctioned variants and layout constraints, not permit arbitrary CSS/JS or raster assets.

## Validation stages

1. Parse JSON with depth/size/resource constraints.
2. Validate against the Draft 2020-12 document schema and exact supported `schemaVersion`.
3. Pin a compatible registry snapshot and confirm `registryVersion`.
4. Walk nodes: uniqueness of IDs, registered type, component property JSON Schema, allowed descendants/slots, events, bindings, required data sources and named action references.
5. Perform semantic analysis (responsive feasibility, binding types, URL/render sanitization and safe component capabilities). This stage requires stronger definitions than the five illustrative entries.
6. Preview deterministically in a renderer with safe test fixtures and accessibility checks.
7. For mutations: check base revision, guarded JSON Patch and protected paths; revalidate after patch and before any authorized save.

**Important:** Passing these stages never grants access to customer data nor authorization to execute an operation. Renderers should fail safely for unsupported schema versions or unknown components.

## Registry metadata

Each registry entry declares stable `type`, `version`, `package`, purpose, `propsSchema`, permitted child component types, supported binding slots and event intent names, relevant state dimensions and responsive strategy. Full implementation will add robust accessibility, localization, slot, keyboard and examples metadata, including richer field typing; v0.1 deliberately does not claim those features are complete.

## Responsiveness

The `ui.DataGrid` example uses `presentation: auto` and a `record-list` registry strategy. The **component implementation** determines layout based on its container/touch constraints and preserves stable row identity, selection and semantic actions. It does not require a separate phone document or distinct business operations. Tablet portrait/landscape and phone are validated as separate visual reference fixtures.

## Browser / Electron

The same UI documents remain browser-compatible. Electron-native operations are introduced only through optional, typed host adapters and secure preload/IPC boundaries; no application-specific privilege or transport leaks into schemas or the React core package.
