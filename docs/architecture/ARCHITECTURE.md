# Recommended implementation architecture

## Architectural principle

**One versioned serialized design contract; multiple authoring and rendering interfaces.** A visual designer, an agent proposal, and a direct JSON author all target the same validated design document and registry. React JSX is a richer imperative authoring interface over the same styled components, not a second persisted design-document format.

React APIs are allowed capabilities (functions, children, render props) that cannot be serialized. Only the explicitly registered **serializable subset** must conform to the canonical per-component JSON Schema. The runtime's adapter transforms validated serialized props/bindings/intent definitions into React props without evaluating arbitrary JavaScript.

## Proposed source tree

```text
apps/
  storybook/                 # Isolated component states, docs and interaction checks
  design-lab/                # Developer-only schema renderer + visual edit proof
packages/
  tokens/                    # DTCG JSON authoring -> generated, scoped CSS vars
  contracts/                 # JSON schemas, registry descriptors, generated TS types
  react-core/                # Styled accessible controls/layout/overlays
  react-data/                # DataGrid, TreeGrid, pivot, query tools, KPIs, charts
  react-operations/          # Incidents, deployments, topology, events, workflows
  react-ai/                  # Conversation, tool execution, approvals, artifacts
  react-renderer/            # Registry component adapter + safe document rendering
  react-designers/           # Forms, dashboards, workflows, schema/canvas designers
  electron-bridge/           # Optional safe typed host adapter, never required by web
  react-all/                 # Optional tree-shake-aware convenience preset
packages-internal/           # Private tooling; no npm publication
  schema-codegen/            # Schema type/registry/metadata generation + drift checks
  test-fixtures/             # Shared state, schema and accessibility specimens
docs/
  adr/
  specs/
  release/
```

`packages` contains publishable projects; `packages-internal` and `apps` are private. Names are temporary; final npm scope and repository name are deferred. Do not scaffold unused packages with fake implementations—register projects only when there is a real deliverable.

## Dependency direction

```text
 tokens -----------> react-core ---------> react-data / react-operations / react-ai
                        |                         |
                        +-------------------------+ (domain-specific composition)
                        |
 contracts -----------> react-renderer <---- explicit registered implementations
       |                     |
       +---------------------+----------> react-designers

 electron-bridge: optional host adapter, separately imported
 react-all: optional convenience preset that registers public React families
```

The diagram indicates allowed dependence, not mandatory imports. `contracts` must not import React, DOM, Electron, visual editors, AI SDKs, network clients, or app state managers. `react-core` must not import the renderer, visual designers or Electron. Domain packages should depend on `react-core`, `tokens`, and relevant *types* from `contracts` as needed; they must not depend on each other by default. `react-renderer` is a thin registry-driven host interface: resolve component implementations through explicit registrations, not an unconditional import of every package. The optional `react-all` preset assembles registrations for convenience. Visual designers consume the renderer and contracts; no designer-specific persisted schema fork.

## Execution flow

1. Agent or visual editor produces a `DesignDocument` change proposal (not executable code).
2. Parse and bounds-check; validate JSON Schema Draft 2020-12 against the exact document schema and pinned registry snapshot.
3. Check node identity, accepted component versions, props, slots, bindings, actions and host-provided capabilities; reject unsafe/unknown constructs.
4. Diff and render preview against fixtures; present user decision as an **intent**.
5. Consuming application independently authorizes, checks current revision, optionally persists, and returns an authoritative result.
6. Runtime renderer maps only registered components and binding/action IDs to host adapters; refuses unknown entries. UI cannot confer privilege.

No implicit eval, dynamic JS from JSON, transport, direct service credentials, app-owned cache, persistent records, or privileged Electron operations in the design-system runtime.

## Styling architecture

- DTCG token JSON as authoring source; generated CSS vars are public runtime contract.
- Vanilla CSS cascade layers and documented stable `.ui-*` hooks; no required Tailwind or runtime CSS-in-JS.
- `[data-ui-theme]` and `[data-ui-density]` provide scoped themes/densities; portal containers inherit or deliberately receive theme state.
- Component CSS consumes semantic tokens; consumers may override supported vars without deep selector hacks.
- Use native SVG symbols/components, tree-shaken icons and CSS (not required PNG/JPG assets).
- High-contrast and forced-color themes must be tested against actual rendered behavior, not inferred from screenshot palettes.

## APIs and boundaries

- React 19 as the initial tested peer major; library package avoids bundling React or ReactDOM.
- Strict TypeScript; named stable exports, package `exports`, ESM plus typings; tree-shakeable CSS asset exports.
- `onPress` or domain-specific UI callback normalizes presentation intents, while host action references remain named `actionId` values in schema.
- Controlled/uncontrolled props when meaningful; forwarded ref support; composition/slots; accessibility and localization as first-class requirements.
- Browser core stays free of Node/Electron dependencies. Electron bridge uses typed host adapter interfaces; consumers implement secure preload/IPC in their app.

## Quality gates

- Typecheck, lint, schema validation, schema-to-type generation drift, unit tests, component interactions, Playwright end-to-end tests and responsive checks.
- Storybook coverage for light/dark/high-contrast, compact/comfortable, loading/error/reconnecting/stale and key interactions; accessibility testing via axe plus manual keyboard/screen reader testing for high-complexity widgets.
- Reconnection and event ordering are host-adapter fixtures; UI does not fabricate terminal outcomes.
- Test Browser + Electron consumption; separate consumer-repository installation remains *manual release policy*, not CI dependency.
- Only release together when entire agreed v1 scope satisfies criteria; fixed/lockstep published package versioning recommended at v1.
