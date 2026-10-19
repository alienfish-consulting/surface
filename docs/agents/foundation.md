# Foundation

## What this repository is

This is a schema-first enterprise React design framework. It supports direct React composition, validated JSON-defined interfaces, visual designers that edit the same JSON contract, guarded change proposals, browser hosts, and optional Electron hosts.

The central rule is: **one versioned serialized design contract, multiple authoring and rendering interfaces**. JSX may expose richer callbacks, slots, and React nodes, but no alternate persisted UI model may compete with the JSON Schema contract.

## Package model

| Package | Responsibility |
| --- | --- |
| `@enterprise-ui/tokens` | Semantic theme, density, contrast, and layout tokens |
| `@enterprise-ui/contracts` | Schemas, registry, validation, bindings, named intentions, and guarded proposals |
| `@enterprise-ui/react-core` | Foundational layout, display, form, and overlay components |
| `@enterprise-ui/react-data` | Tables, grids, visualizations, schedules, and inspectors |
| `@enterprise-ui/react-operations` | Workflow, deployment, event, topology, and incident interfaces |
| `@enterprise-ui/react-ai` | Conversation, agent, tool, approval, artifact, and run-state interfaces |
| `@enterprise-ui/react-designers` | Shared-schema designer shells and specialist editors |
| `@enterprise-ui/react-renderer` | Explicit adapters from validated documents to React |
| `@enterprise-ui/electron-bridge` | Transport-neutral, allowlisted desktop request boundary and browser fallback |

`apps/design-lab` is the integrated development consumer. `apps/storybook` discovers the package stories.

## Dependency direction

- `contracts` is independent of React, the DOM, Electron, and service SDKs.
- `tokens` owns the CSS variable contract.
- `react-core` is foundational and does not depend on specialized families.
- Specialized React families may build on core; avoid circular family dependencies.
- `react-renderer` composes explicit family adapters and fails closed on unknown types.
- `react-designers` uses the contracts and renderer rather than inventing designer persistence.
- `electron-bridge` defines a contract only. Electron remains in the consuming application.

## Security and ownership boundaries

- Treat design documents, binding data, proposal patches, and desktop request payloads as untrusted input.
- Validate at every trust boundary and apply size, depth, type, revision, and allowlist checks.
- UI code emits a named action intention. The host maps that intention to an authorized operation.
- Never infer authorization from visibility, a component prop, a document action ID, or an Electron renderer request.
- Never evaluate code from JSON or use a document value as a module name, IPC channel, command, path, or URL without host validation.
- Agent-generated changes are proposals until the application previews, authorizes, and persists them against the expected revision.

## Experience invariants

Every interface must remain usable with keyboard-only input and meaningful semantics. Preserve focus entry/exit, focus return for overlays, visible focus, accessible names and errors, reduced-motion preferences, responsive containment, and useful empty/loading/error/stale/disabled states.

Visual modes are scoped by `data-ui-theme="light|dark"`, `data-ui-density="comfortable|compact"`, and optional `data-ui-contrast="high"`. Detached portal roots must receive the same attributes. Operating-system forced colors are an additional mode, not a substitute for authored high contrast.

## Working method

Before changing behavior:

1. Identify the owning package and whether the API is direct React, declarative, or both.
2. Inspect its public export, related implementation, grouped story, focused test, catalog entry, and registry/schema entry where applicable.
3. State which boundary owns data, authorization, side effects, and persistence.
4. Make the narrowest coherent change across implementation, styles, contract, adapter, story, and test.
5. Regenerate derived files through the repository tools; never edit them to manufacture a passing drift check.
6. Run the smallest checks that prove the change, then broaden in proportion to impact.
