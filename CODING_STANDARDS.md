# Surface coding standards

These standards apply to source code, schemas, tests, stories, tools, examples,
and documentation in this repository. Existing local patterns take precedence
when they are more specific and do not conflict with the rules below.

## Core principles

- Make the smallest coherent change that solves the accepted problem.
- Prefer readable, explicit code over clever abstractions.
- Keep public behavior, types, schemas, adapters, stories, tests, and
  documentation synchronized.
- Preserve compatibility unless a breaking change and migration are explicitly
  approved.
- Treat accessibility, security, privacy, and failure behavior as part of the
  API—not as follow-up work.
- Do not introduce provider-specific application logic into framework packages.

## TypeScript and React

- Use TypeScript in strict mode. Do not use `any`, non-null assertions, or type
  casts to conceal an unresolved type or validation problem.
- Prefer named types for exported contracts and inferred types for obvious
  local values. Export only deliberate public API.
- Use ESM, narrow package imports, and side-effect-free modules. React remains a
  peer dependency of library packages.
- Keep components focused and composable. Preserve standard DOM attributes,
  refs where supported, controlled and uncontrolled behavior, and consumer
  `className` composition.
- Use semantic HTML before ARIA. Every control needs an accessible name, full
  keyboard operation, visible focus, and predictable focus entry, exit, and
  restoration.
- Model loading, empty, error, stale, disabled, and permission-denied states
  explicitly when they are possible.
- Avoid premature memoization. Add performance machinery only for a measured or
  structurally clear need, and test the behavior it protects.

## Contracts, data, and trust boundaries

- Persist one versioned JSON design contract. Do not create a competing
  persisted format for applications, designers, or automated tools.
- Persist JSON-safe data, named bindings, and named action intentions only.
  Never persist executable code, React nodes, arbitrary HTML, credentials,
  Electron channels, filesystem paths, or host permissions.
- Treat documents, proposal patches, binding data, URLs, and desktop request
  payloads as untrusted. Validate type, size, depth, version, revision, and
  allowlists at every boundary.
- Components emit intentions. The consuming host independently authorizes and
  performs side effects using current application and user state.
- Renderer registration is explicit. Unknown or incompatible component types
  must fail closed with useful diagnostics.
- Contract changes require compatibility analysis, negative tests, fixtures,
  migration notes, and synchronized schema, registry, and adapter versions.

## Browser and Electron boundaries

- Browser-capable packages must not import Electron or Node runtime APIs.
- Electron renderers receive a narrow typed preload capability, never raw
  `ipcRenderer`, arbitrary channel access, shell execution, or unrestricted
  filesystem access.
- Validate and authorize desktop requests in both preload-facing code and the
  main process. The main process owns native effects.
- Keep browser fallbacks explicit and safe; lack of a desktop capability should
  produce a controlled unavailable result.

## Styling and visual behavior

- Import token CSS before component-family CSS. Reuse semantic tokens and the
  existing `ui-*` conventions instead of adding a parallel styling system.
- Scope theme, density, and authored contrast through the documented data
  attributes, including detached portal roots.
- Support responsive containment, zoom, text reflow, reduced motion, and
  operating-system forced colors where the component can be affected.
- Avoid unexplained literal colors, spacing, typography, and stacking values.
  Add or reuse a semantic token when a value represents a reusable decision.
- A visible change needs representative Storybook states and visual evidence in
  its pull request.

## Packages, dependencies, and APIs

- Place behavior in its owning package and follow the documented dependency
  direction. Do not introduce circular family dependencies.
- Import the narrowest package that supplies the API. Do not rely on private
  source paths or generated internals.
- Avoid new dependencies when platform primitives or current packages are
  sufficient. Evaluate maintenance, security, license, accessibility, bundle,
  browser, Electron, and lock-in costs before adding one.
- Treat exported symbols, prop behavior, CSS entry points, schema shapes,
  registry IDs, serialized intentions, and error behavior as public contracts.
- Keep packages private and marked `UNLICENSED` until a separately authorized
  publication and commercial licensing decision is made.

## Generated files and scaffolds

- Edit canonical source inputs and run the owning generator. Never hand-edit a
  generated file or suppress a drift check to manufacture a passing result.
- Inspect generated diffs for deterministic ordering and unintended scope.
- Treat `scaffolds/` as planning and acceptance metadata only. A scaffold is not
  a runtime export, renderer registration, or implementation-complete signal.
- Production code lives under `packages/`; catalog lifecycle state is owned by
  `catalog/components.v1.json`.

## Tests and stories

- Test observable behavior and contracts rather than implementation details.
- Add regression coverage for a bug before or with its fix. Include negative
  and boundary cases for validation and security-sensitive behavior.
- Keep tests deterministic: control time, randomness, network access, and
  environment assumptions.
- Use component tests for logic and interaction, Storybook for representative
  states, and Playwright for behavior requiring a real browser or integration
  boundary.
- Accessibility checks must cover semantics and keyboard behavior; automated
  scans alone do not establish conformance.
- Run focused checks first and the broader gate required by the change's risk.

## Naming, comments, and documentation

- Use `PascalCase` for React components and exported types, `camelCase` for
  values and functions, and existing repository conventions for filenames and
  stable `ui.*` catalog IDs.
- Name booleans as assertions or capabilities (`isOpen`, `hasError`,
  `canSubmit`). Name event props for the intention they report.
- Comments should explain why a constraint or tradeoff exists. Remove comments
  that merely restate the code.
- Use inclusive, precise language and examples that do not contain real secrets
  or personal data.
- Update README files and current guides alongside behavioral, API, command, or
  boundary changes. Preserve historical records as historical evidence.

## Change hygiene

- Do not commit credentials, local environment files, dependency directories,
  build artifacts, browser reports, or unrelated changes.
- Do not disable a check, weaken validation, broaden a permission, or ignore an
  error without an explicit rationale and reviewable replacement control.
- Keep commits cohesive and use an imperative summary that describes the
  outcome. Pull requests must list verification actually performed and any
  remaining risk or unverified work.
