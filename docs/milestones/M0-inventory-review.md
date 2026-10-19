# M0 inventory and seed reconciliation

**Date:** 2026-10-18

**Status:** Inventory and classification approved; approved M0 checks passed.

**Handoff source:** `/Users/leeallen/AlienFishConnsulting/enterprise-ui-ide-agent-handoff-2026-10-18`

**Target repository:** `/Users/leeallen/AlienFishConnsulting/react-af`

## Baseline reconciliation

- The target is an initialized local Git repository on branch `main`, with no commits, no remote, and no project files before M0.
- The demonstrated POC has not been copied into the target. M1 should import and evolve `seed/enterprise-ui-poc/` only after explicit M1 authorization.
- The handoff packet itself is not a Git repository and remains source material rather than the implementation target.
- Runtime observed during read-only inspection: Node `v24.21.0`; Corepack `0.36.0`; no `pnpm` executable was found on `PATH`.
- The seed requests Node `>=24 <27` and `pnpm@10.18.0`. It has no `pnpm-lock.yaml`, so dependency reproducibility is not yet established.
- The seed's architecture documents match `reference/architecture-v0.1/`. Its copied `DECISIONS.md`, `RELEASE-SCOPE.md`, DTCG token JSON, and token CSS match the approved snapshot.
- Relative to the original schema snapshot, the POC adds Button and TextField prop schemas, archives the original registry as `component-registry.v1.0.0.json`, advances the active registry to `1.1.0`, and adds `vertical-slice.design.json`.

## What exists in the POC

These counts are deliberately separate:

| Inventory | Count | Exact items / meaning |
|---|---:|---|
| Styled React POC implementations | 5 | `ui.AppShell`, `ui.Panel`, `ui.Button`, `ui.TextField`, `ui.KpiCard` |
| Active registry `1.1.0` definitions | 7 | The five above plus schema-only `ui.DataGrid` and `ui.ActivityFeed` |
| Archived registry `1.0.0` definitions | 5 | `ui.AppShell`, `ui.Panel`, `ui.KpiCard`, `ui.DataGrid`, `ui.ActivityFeed` |
| Renderer adapters | 5 | The five implemented React POC components; registered-but-unimplemented types fail closed |
| Proposed v1 implementation units | 198 | Planning inventory across five React packages; not 198 approved exports |

The POC also has the canonical document validator, explicit version selection, guarded property-level RFC 6902 proposal preview, named actions and bindings, a host-authorization simulation, a property inspector, and a browser-only design lab. These are working-source claims from inspection, not new verification results.

Known POC limitations to preserve honestly: production quality is unverified; Storybook and Playwright do not exist; no lockfile exists; token CSS is copied rather than generated from DTCG source; only property-level patches are supported; high contrast, responsive behavior, keyboard behavior, browser build, package typing, and accessibility remain unverified.

## Catalog reconciliation

The source catalog is `catalog/components.v1.proposed.json`, schema version `1.0.0`, SHA-256 `e5a099f281b7858c2a812af4ec652e44d7b556f748a193fc3a92a879314d79ee`.

| Package | Units | Execution milestone |
|---|---:|---|
| `react-core` | 85 | M3 |
| `react-data` | 33 | M4 |
| `react-operations` | 25 | M5 |
| `react-ai` | 27 | M6 |
| `react-designers` | 28 | M7 |
| **Total** | **198** | |

Complexity metadata is 77 low, 86 medium, and 35 high. Declarative coverage is marked required for 190 units and required-or-documented-exception for 8. Those labels are proposals, not evidence of implemented schemas.

The 198 units cover the approved visual component capability groups. Nonvisual requirements from release-scope groups M6–M8—contracts, registry, migrations, agent patching, optional Electron adapter, documentation, release work, and validation—remain cross-cutting work items and must not be mistaken for omissions from the five-package React component count.

### Proposed M0 classification

Accept all 198 stable IDs as v1 **tracking units**, subject to the naming and consolidation reviews below. Classification does not publish, register, scaffold, or export anything.

| Classification | Count | Export treatment |
|---|---:|---|
| `public-component` | 159 | Candidate named exports after implementation and family-level API approval |
| `feature/workstream` | 21 | Composite views tracked end-to-end; may expose a public top-level component, but are not evidence that every internal part is public |
| `compositional-subcomponent` | 13 | Child/compound contracts; prefer namespaced or parent-owned APIs instead of unconditional top-level exports |
| `internal-primitive` | 5 | Implementation detail; no public export or standalone runtime registry entry by default |
| **Total** | **198** | |

`feature/workstream` candidates (the existing `composite-feature` entries):

`ui.AppShell`, `ui.PageLayout`, `ui.DockWorkspace`, `ui.NotificationCenter`, `ui.DataGrid`, `ui.TreeGrid`, `ui.PivotTable`, `ui.GanttChart`, `ui.KanbanBoard`, `ui.DeploymentPipeline`, `ui.InfrastructureTopology`, `ui.ChatWorkspace`, `ui.MessageThread`, `ui.ToolExecutionTimeline`, `ui.DesignerShell`, `ui.DesignCanvas`, `ui.FormDesigner`, `ui.DashboardDesigner`, `ui.WorkflowDesigner`, `ui.QueryDesigner`, `ui.SchemaDesigner`.

`compositional-subcomponent` candidates:

`ui.GridColumn`, `ui.GridCellEditor`, `ui.GridToolbar`, `ui.PivotFieldWell`, `ui.ChartLegend`, `ui.GanttTaskEditor`, `ui.KanbanLane`, `ui.DeploymentStage`, `ui.TopologyNode`, `ui.AttachmentTray`, `ui.FormFieldPalette`, `ui.WorkflowNodePalette`, `ui.WorkflowEdgeEditor`.

`internal-primitive` candidates:

`ui.ToastViewport`, `ui.ChartTooltip`, `ui.TopologyEdge`, `ui.SelectionOutline`, `ui.ResizeHandles`.

The `public-component` set is exactly the remaining 159 IDs currently marked `public-component-candidate` in the source catalog. This preserves every catalog ID while making the 39 non-ordinary-public units explicit. If approved, M2 should add a first-class classification field and separate export policy rather than overloading `candidate_kind`.

### Naming and scope reviews before APIs freeze

The approved uniqueness/reference check confirmed 198 unique IDs, 198 unique names, allowed package assignments, and resolved dependency references. The following semantic overlaps should still be resolved when their family contracts are designed; they are not reasons to delete source now:

- `AppShell` / `PageLayout`; `Sidebar` / `NavigationRail`; `Panel` / `Card` / `Surface`.
- `Select` / `MultiSelect` / `ComboBox` / `Autocomplete`; `Menu` / `DropdownMenu` / `ContextMenu` / `CommandMenu`.
- Layout `Grid` versus `DataGrid`; `DataTable` versus `DataGrid`; generic `Timeline` versus domain-specific timeline views.
- `FilterBuilder` / `FacetedFilter` / `QueryBuilder` / `QueryDesigner`.
- `ActivityFeed` / `AgentActivityFeed`; operations approvals versus agent approval views.
- `TreeView` / `FileTree` / `ResourceTree` / `OutlineTree`; generic inspectors/viewers versus domain-specific viewers.

The weakest item-level extrapolations from the approved capability groups are `Autocomplete`, `ColorPicker`, `OtpField`, `HoverCard`, `CommandMenu`, `Heatmap`, `SavedViewSelector`, `PromptTemplateEditor`, `PromptVersionDiff`, `TokenUsageMeter`, `ModelSelector`, and `ReasoningSummaryPanel`. Recommendation: retain them as v1 tracking candidates now, but require a concrete use case and API consolidation check before implementation. Deferring or removing any of them requires an explicit catalog decision; the broad approved capability groups still remain mandatory.

## Architecture and dependency proposal

- Preserve the seed rather than rewrite it. Import into the empty target during M1 only after approval and inspect the exact copy manifest first.
- Keep stable registry IDs in the `ui.Name` namespace. JavaScript package names and the temporary `@enterprise-ui/*` scope remain internal placeholders, not ownership or publication decisions.
- Preserve registry `1.0.0` fixtures and the additive `1.1.0` POC. Do not silently migrate legacy documents or loosen validation.
- Retain the default package direction: tokens/contracts → core → specialized packages; contracts + allowlisted registrations → renderer; contracts + renderer → designers; optional Electron adapter depends on public contracts only.
- Do not activate `react-all`, specialized engine dependencies, `packages-internal`, or an Electron package until each has a real deliverable.
- Specialized engines for grid, charts, topology, drag/drop, docking, Gantt, and code editing remain just-in-time decisions with narrow adapters.
- Public export and runtime registration occur only for meaningful implemented units. Scaffolds and internal primitives remain absent from production exports and the registry.

## Proposed M1 scope after a separate authorization

Safely copy/evolve the seed into the target, preserve the five POC components and both registry generations, establish a reviewed lockfile/toolchain, implement the DTCG token build, add Storybook React/Vite stories for the five real components, and add an opt-in single Chromium Playwright smoke harness. Do not implement the remaining catalog or create placeholder component exports in M1.

M1 is not authorized by approval of this M0 report. Dependency installation, browser installation, M1 tests, and any M1 commit each require their own applicable approval.

## M0 approved check results

T01: `node /Users/leeallen/AlienFishConnsulting/enterprise-ui-ide-agent-handoff-2026-10-18/tools/verify-packet.mjs`

- Purpose: verify packet integrity, expected catalog count, referenced files, and packaged sanity rules.
- Scope: extracted handoff packet only; no React package build or test.
- Browser/viewport: not applicable.
- Data: local packet files only.
- Resource impact: low; no dependency or browser download expected.
- Writes/side effects: expected none.
- Result: **PASS** — 198 proposed units, unique IDs, candidate visual/dependency references checked, and SHA-256 verified for 157 packet files.

T02: `node -e "const fs=require('node:fs');const p='/Users/leeallen/AlienFishConnsulting/enterprise-ui-ide-agent-handoff-2026-10-18/catalog/components.v1.proposed.json';const c=JSON.parse(fs.readFileSync(p,'utf8')).components;const ids=c.map(x=>x.id);const names=c.map(x=>x.name);const idSet=new Set(ids);const nameSet=new Set(names);const packages=new Set(['react-core','react-data','react-operations','react-ai','react-designers']);const missing=c.flatMap(x=>(x.candidate_dependencies||[]).filter(d=>!idSet.has(d)).map(d=>x.id+' -> '+d));if(c.length!==198||idSet.size!==c.length||nameSet.size!==c.length||c.some(x=>!packages.has(x.package))||missing.length)throw Error(JSON.stringify({count:c.length,uniqueIds:idSet.size,uniqueNames:nameSet.size,missing}));console.log(JSON.stringify({count:c.length,uniqueIds:idSet.size,uniqueNames:nameSet.size,dependencies:'resolved'}))"`

- Purpose: parse the catalog and check the declared 198 count, unique stable IDs, unique names, allowed package assignments, and dependency references.
- Scope: catalog JSON only; no source generation.
- Browser/viewport: not applicable.
- Data: local catalog only.
- Resource impact: low; no installation.
- Writes/side effects: none.
- Result: **PASS** — `{"count":198,"uniqueIds":198,"uniqueNames":198,"dependencies":"resolved"}`.

Deliberately not proposed: `pnpm install`, `pnpm check`, unit tests, typecheck, Vite/Storybook builds, Playwright, browser installation, accessibility sweeps, generated-file checks, or source copying. Those belong to later approved gates.

## Decisions requested

1. Confirm `/Users/leeallen/AlienFishConnsulting/react-af` as the target repository.
2. Approve, edit, or reject the 198-unit tracking inventory and the 159 / 21 / 13 / 5 classification above.
3. Confirm that the temporary local `@enterprise-ui/*` package names may be preserved through M1 without treating them as the final npm scope.
4. M0 checks T01 and T02 were approved and passed. No other tests or setup commands were run.

No catalog source file has been changed yet; approval should determine the accepted catalog revision recorded in M2 rather than silently rewriting the handoff proposal.
