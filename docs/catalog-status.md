# Component catalog status

Generated from `catalog/components.v1.json`. Do not edit this dashboard directly.

## Lifecycle summary

| Status | Count |
|---|---:|
| planned | 0 |
| scaffolded | 193 |
| implemented | 5 |
| verified | 0 |
| released | 0 |
| **Total** | **198** |

## Classification summary

| Classification | Count |
|---|---:|
| public-component | 159 |
| feature/workstream | 21 |
| compositional-subcomponent | 13 |
| internal-primitive | 5 |

## Package summary

| Target package | Units | Scaffolded | Implemented |
|---|---:|---:|---:|
| `react-core` | 85 | 81 | 4 |
| `react-data` | 33 | 32 | 1 |
| `react-operations` | 25 | 25 | 0 |
| `react-ai` | 27 | 27 | 0 |
| `react-designers` | 28 | 28 | 0 |

## Runtime and compatibility boundary

- Registry `1.0.0` remains preserved with 5 entries.
- Active POC registry `1.1.0` remains preserved with 7 schema entries.
- Renderer adapters remain limited to the five implemented POC units: `ui.AppShell`, `ui.Panel`, `ui.Button`, `ui.TextField`, `ui.KpiCard`.
- `ui.DataGrid` and `ui.ActivityFeed` remain schema-only compatibility entries and fail closed at the renderer boundary.
- `ui.KpiCard` remains temporarily implemented in `react-core`; its accepted target boundary is `react-data`. M2 does not move it.

No scaffold is a public export, a runtime registration, a Storybook story, or evidence of implementation.
