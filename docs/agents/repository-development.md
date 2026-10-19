# Developing the framework repository

Follow the repository-wide [`CONTRIBUTING.md`](../../CONTRIBUTING.md) and
[`CODING_STANDARDS.md`](../../CODING_STANDARDS.md). All packages remain private
and `UNLICENSED` under the proprietary [`LICENSE.md`](../../LICENSE.md).

## Locate ownership before editing

Map the request to a package and surface: direct React API, serialized contract, renderer adapter, designer, desktop boundary, tokens, or tooling. Search for the public symbol and catalog ID, then inspect adjacent stories and focused tests. Follow existing local conventions unless the task explicitly changes them.

## Change patterns

### React behavior or styling

- Change the owning source module and semantic family CSS.
- Preserve pass-through attributes, refs where already supported, class-name composition, controlled/uncontrolled expectations, and accessible semantics.
- Add meaningful states to the owning grouped story.
- Update the focused family test. Add a browser test only for behavior that requires a real browser, such as focus, layout, forced colors, or responsive overflow.
- If the serialized surface changes, also update the contract source and adapter.

### Tokens

- Edit `packages/tokens/source/design-tokens.json` or the relevant authoring source, not generated output.
- Prefer semantic tokens over component-specific literals.
- Regenerate and inspect both light and dark results, plus high contrast/forced colors where affected.

### Contracts and renderer

- Preserve JSON Schema 2020-12, exact registry versions, stable IDs, deterministic generation, bounded validation, and fail-closed adapter lookup.
- Update fixtures for compatibility and negative cases, not only the happy path.
- Keep host effects outside adapters and components.
- Follow [`declarative-ui.md`](declarative-ui.md).

### Catalog and scaffolds

- `catalog/components.v1.json` owns lifecycle and tracking metadata.
- `catalog/catalog-status.json`, `docs/catalog-status.md`, and `packages/contracts/src/generated/catalog-status.ts` are generated views.
- `scaffolds/` is planning metadata, not production source.
- Preview scaffold generation before write mode; never promote a draft through generation alone.

### Documentation

- Put current application guidance in `docs/guides/`, current architectural truth in `docs/architecture/`, and agent workflows in `docs/agents/`.
- Put completed one-time delivery evidence in `docs/history/`.
- Keep `docs/catalog-status.md` at its generated canonical path.
- Update indexes and relative links when moving documents.

## Generated files

Run `corepack pnpm generate` after changing generator inputs and `corepack pnpm check:generated` to prove no drift. Run `corepack pnpm scaffold:components -- --write` only when intentionally updating catalog-derived artifacts; use `corepack pnpm check:catalog` for drift verification.

Inspect generated diffs. Do not hide a generator defect by directly patching its output.

## Dependency and API discipline

Avoid adding a dependency when platform primitives or current packages meet the requirement. For a specialized engine, record bundle, accessibility, maintenance, licensing, browser/Electron, and API-lock-in implications. Keep it behind a package boundary.

Treat exported names, prop behavior, CSS entry points, schemas, registry entries, and serialized identifiers as public contracts. Breaking changes require explicit scope, migration notes, and broad verification.

## Completion report

Report changed behavior and boundaries, files or areas changed, generated artifacts, checks actually run with outcomes, and checks not run. Never claim accessibility, cross-browser support, packaging, or release readiness beyond the evidence produced.
