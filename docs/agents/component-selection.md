# Component and package selection

Start with intent, not visual resemblance.

| Need | Package |
| --- | --- |
| Shells, panels, navigation, display, controls, forms, feedback, overlays | `react-core` |
| Tables, grids, charts, calendars, timelines, query views, object/data inspectors | `react-data` |
| Workflows, deployments, logs, events, topology, service health, incidents | `react-operations` |
| Messages, prompts, agents, tools, approvals, artifacts, run state | `react-ai` |
| Editable canvases, property/layer/history panels, form/dashboard/workflow/query/schema design | `react-designers` |
| Validated JSON rendering | `react-renderer` plus `contracts` |
| Optional desktop capability calls | `electron-bridge` |

## Discover the current API

Use repository evidence rather than guessing a component name:

```bash
rg "export (function|const|class)|export \*" packages/*/src
rg "title:|export default" packages/*/src/stories
rg '"id": "ui\.' catalog/components.v1.json
```

Then inspect, in order:

1. The package public `src/index*` export.
2. The prop/interface declaration in the implementation module.
3. The owning grouped Storybook story.
4. The focused test in `tests/`.
5. For serializable use, the registry entry and component schema in `packages/contracts`.

`catalog/components.v1.json` tracks all accepted units, including subcomponents and JSX-only exceptions. A catalog unit is not automatically a top-level public export. `docs/catalog-status.md` is a generated overview, not an API definition. Files under `scaffolds/` are planning artifacts and must never be imported by applications.

Prefer composition of existing public components. Add a new component only when it owns reusable behavior, semantics, state, or a stable design contract—not solely to name a one-off arrangement.
