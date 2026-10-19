# v1 release scope and constraints

All of these are included in the **first coordinated npm release**. These are milestone groupings, not shipping order commitments.

| Milestone | Capability groups |
|---|---|
| M1 Foundations & core | Tokens/themes, typography, icons, controls/forms, navigation, layout, panels, dialogs, feedback, split/docking workspaces |
| M2 Data & analytics | Advanced DataGrid, TreeGrid, pivot tables, editing/grouping/virtualization, filtering/query building, charts/KPI, calendar, timeline, Gantt |
| M3 Workflows & operations | Kanban, approvals, activity/audit, deploy monitors, logs/events, infrastructure topology, status/incident interfaces |
| M4 AI & conversations | Chat, streaming, multi-agent coordination, tool inspection, artifacts, approvals, context views |
| M5 Visual designers | Forms, dashboards, workflows, queries, schema/property inspectors, drag/drop canvas and preview |
| M6 Schema & agent tooling | Component registry, versioned JSON schemas, validation, migrations, named bindings/actions, diffs, reviewable agent edits |
| M7 Electron integration | Optional typed safe desktop integration for menus, file dialogs, notifications, shortcuts, windows, IPC |
| M8 Docs & release | Documentation, accessibility, visual/interaction/performance validation, coordinated publication |

**Ship rule:** no incremental package release before all accepted v1 capabilities are complete. **External-consumer testing:** policy and manual release checklist, not hardwired repo or CI requirement.
