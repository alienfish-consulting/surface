# Implemented architecture

## System principle

The framework has one versioned, JSON Schema 2020-12 design contract and several authoring interfaces. Direct React APIs may provide richer callbacks, React nodes, and composition. Persisted documents contain only validated data, registered bindings, named action intentions, and registered child nodes.

The same document contract is used by runtime rendering, visual designers, and guarded agent proposals. There is no designer-only or desktop-only persistence model.

## Workspace

```text
apps/
  design-lab/          integrated browser consumer and E2E target
  storybook/           package story discovery and visual inspection
packages/
  tokens/              authored token sources and generated theme CSS
  contracts/           schemas, registries, validation, types, proposals
  react-core/          foundational React components
  react-data/          data and analytics components
  react-operations/    operational workflow components
  react-ai/            agent and conversation components
  react-designers/     shared-contract visual editors
  react-renderer/      explicit serialized-node adapters
  electron-bridge/     transport-neutral desktop request contract
catalog/               accepted unit inventory and generated status
scaffolds/             non-production planning artifacts
tests/                 contract, package, component, browser, and release checks
```

The workspace uses pnpm for package linking and Nx for its project task graph. Vite builds the Design Lab, Storybook uses its React/Vite integration, Vitest covers logic and rendered output, and Playwright covers browser behavior.

## Dependency direction

```text
tokens ───────────────┐
contracts ────────────┼─> React families ─> react-renderer
                      │          └─────────> react-designers
contracts ────────────└─> electron-bridge
```

- `contracts` does not import React, DOM, Electron, or a service SDK.
- `react-core` is foundational. Specialized families build on core without circular package relationships.
- `react-renderer` composes explicit adapters for implemented, allowlisted types.
- `react-designers` edits the shared contract through previewed proposals.
- `electron-bridge` contains no Electron import. The consuming desktop host owns preload, IPC, and native effects.

## Runtime trust model

External JSON is validated for schema, exact registry version, node count/depth, IDs, props, child relationships, binding declarations, and named intentions before rendering. Unknown or unimplemented component types fail closed.

Bindings resolve from application-supplied data. Component events become `HostActionRequest` values; the application independently authorizes and performs any effect. Valid syntax and a declared action ID do not imply permission.

Guarded proposals target a document ID and base revision. The current patch surface is deliberately restricted to registered component property paths. A preview creates a validated candidate; only the host can authorize and persist a new authoritative revision.

## Styling and accessibility

Token source files generate semantic CSS custom properties. Family CSS consumes those properties and supports light/dark themes, comfortable/compact density, authored high contrast, and operating-system forced colors. Browser and Electron renderers share the same React/CSS implementation.

Components prefer native semantics and bounded, auditable implementations. Accessibility is a behavioral requirement: keyboard operation, focus management, meaningful names and states, responsive containment, and assistive-technology review accompany visual styling.

## Specialized engines

V1 deliberately uses bounded platform table, SVG, form, and disclosure implementations rather than embedding large grid, chart, editor, diagram, or drag-and-drop engines. Public and serialized contracts stay engine neutral. ADR-008 records capacity boundaries and triggers for reconsidering an engine behind the existing package APIs.

## Desktop boundary

The optional bridge validates a small request envelope, enforces a renderer-side capability allowlist, and returns structured results. It is defense in depth, not the security authority. A consuming Electron application must expose a narrow context-isolated preload API, map fixed actions to fixed main-process handlers, validate again, and enforce current user/application permissions.

## Generation and compatibility

Authored token/contract/catalog sources generate CSS, registry bundles, serialized types, and tracking views. Drift checks ensure committed outputs match their inputs. Documents pin versions exactly; compatibility is explicit through retained registry fixtures or deterministic migrations, never silent schema loosening.

All accepted catalog units are tracked in `catalog/components.v1.json`. Some are subcomponents or direct-React exceptions rather than standalone public/declarative exports. `scaffolds/` remains outside production source and cannot establish implementation status.
