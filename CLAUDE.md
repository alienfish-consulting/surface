# Agent instructions

These instructions are vendor agnostic. They apply to any coding agent working in this repository and to delegated work.

## Start here

1. Read [`docs/agents/README.md`](docs/agents/README.md).
2. Read [`docs/agents/foundation.md`](docs/agents/foundation.md).
3. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`CODING_STANDARDS.md`](CODING_STANDARDS.md) before changing the repository.
4. Follow only the task guide and references selected by the routing table. Do not load the historical milestone reports as operating instructions.
5. When work originates from a GitHub issue, read [`docs/agents/issues.md`](docs/agents/issues.md) before implementation. Only `status:ready` issues without `agent:hold` are eligible for autonomous execution.

## Non-negotiable boundaries

- Treat `packages/contracts` and the component registry as the authority for persisted UI. Never create a second persisted format for a web app, desktop app, visual designer, or agent.
- Persist data, named bindings, and named action intentions only. Never place executable JavaScript, React nodes, arbitrary HTML, Electron channels, credentials, or host permissions in a design document.
- Components emit intentions. The consuming application owns authorization, side effects, persistence, networking, model or tool execution, and privileged desktop behavior.
- Validate untrusted design documents before rendering. Renderer registrations are explicit and allowlisted; unknown component types fail closed.
- Keep browser-capable packages free of Electron and Node runtime imports. Desktop access crosses a narrow, validated preload boundary and is authorized again in the main process.
- Preserve accessible names, keyboard operation, focus behavior, semantic structure, responsive behavior, theme, density, authored high contrast, and forced-colors support.
- Import token CSS before family CSS. Reuse semantic tokens and existing `ui-*` conventions instead of introducing a parallel styling system.
- Do not expose scaffolds, incomplete components, or generated drafts as production exports. Do not hand-edit generated files.
- Preserve the proprietary licensing boundary. Keep packages private and marked `UNLICENSED`; do not copy, publish, sublicense, relicense, or add third-party material with incompatible terms without explicit written authorization.
- Keep public APIs compatible unless the task explicitly authorizes a breaking change. Add or update tests and stories with behavior changes.
- Do not publish, push, create remotes or cloud resources, choose a license/package identity, or perform destructive Git operations unless explicitly requested.

## Repository mechanics

- Package manager: pnpm through Corepack. Runtime baseline: Node 24; see `package.json` for the authoritative ranges and versions.
- Use narrow package imports. React is a peer dependency of library packages.
- Before editing, inspect the owning package, its public index, nearby stories, focused tests, and registry/schema entries.
- Canonical generated outputs are produced by `tools/generate.mjs` and `tools/scaffold-components.mjs`. Edit their source inputs, regenerate, and run drift checks.
- Prefer the smallest relevant verification first; use the full `pnpm check` only for broad or cross-package changes. See [`docs/agents/verification.md`](docs/agents/verification.md).
- Before every commit, update the root README and any affected package or application README so setup instructions, public APIs, commands, boundaries, and verification guidance match the change. If no README change is needed, explicitly verify that the existing documentation remains accurate.
- Treat `agent:hold` as a hard veto regardless of any other issue label. Do not implement `status:proposed` or `status:refinement` issues; refine them into explicit scope, acceptance criteria, constraints, and verification evidence first.
- Preserve unrelated working-tree changes. Report what was changed, what was verified, and what remains unverified.

## Scaffolds are plans, not production code

`scaffolds/` contains catalog-derived planning and acceptance metadata for all 198 tracked units. A component directory can contain:

- `component.plan.md` — intended API, behavior, accessibility, and implementation notes.
- `schema.plan.json` — proposed serializable contract.
- `stories.plan.json` — expected Storybook scenarios and states.
- `test.plan.md` — expected verification coverage.

Use these files as design provenance and as input when planning a new or revised implementation. Never import them from an application, add them to package exports, register them with the renderer, or treat their presence as implementation evidence. Production code lives under `packages/`; lifecycle status is owned by `catalog/components.v1.json`.

`tools/scaffold-components.mjs` manages scaffold and catalog-derived artifacts. Its default focused mode is a preview. Use `corepack pnpm check:catalog` for read-only drift verification. Use `corepack pnpm scaffold:components -- --component ui.ComponentName` to preview one unit, and add `--write` only when intentionally creating missing planning artifacts. The tool must not promote drafts into production source.

## Documentation map

- Current human documentation: [`docs/README.md`](docs/README.md)
- Contribution workflow: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Coding standards: [`CODING_STANDARDS.md`](CODING_STANDARDS.md)
- Proprietary terms: [`LICENSE.md`](LICENSE.md)
- Agent routing and workflows: [`docs/agents/README.md`](docs/agents/README.md)
- Issue lifecycle and autonomous-execution gate: [`docs/agents/issues.md`](docs/agents/issues.md)
- Current architecture: [`docs/architecture/README.md`](docs/architecture/README.md)
- Consumer integration: [`docs/guides/consumer-guide.md`](docs/guides/consumer-guide.md)
- Release state: [`docs/release/README.md`](docs/release/README.md)
- Bootstrap and milestone evidence (historical only): [`docs/history/README.md`](docs/history/README.md)
