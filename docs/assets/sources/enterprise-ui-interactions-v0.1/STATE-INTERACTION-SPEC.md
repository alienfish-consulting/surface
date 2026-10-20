# Component State & Interaction Specification v0.1

**Status:** Proposed detailed implementation specification; approved design language and component-family baselines remain authoritative.  
**Applies to:** Core React, ERP/Data, Operations, AI/Agent, Visual Designers, Browser/Electron.  
**Date:** 2026-10-18.  
**Publication:** Design artifact only. Do not publish any npm package until the entire agreed v1 catalog is completed and accepted.

## 1. Sources of truth and boundaries

- **Visual appearance:** approved light-first, slate-and-blue enterprise design language and approved mockup baselines; dark mode is first-class. The image in this package illustrates candidate states, not production-ready pixel geometry or literal application data.
- **State contract:** the state *dimensions* in this document, typed application-supplied data and typed user-intent callbacks. State is not one enormous flat enumeration.
- **Declarative rendering:** JSON Schema 2020-12, schema revisions, stable registry component IDs, named bindings/actions, validated JSON Patch transactions (RFC 6902).
- **Application authority:** transport, caching, event reconciliation, persistence, authorization, security policy, orchestration, execution and backend mutations reside in the consuming application. The UI cannot treat user approval as execution authorization.
- **Component library:** display appropriately, preserve usability, support accessible interactions, emit typed intents without performing privileged actions.

## 2. Orthogonal vocabulary

| Dimension | Values | Invariant |
|---|---|---|
| Interaction | `rest`, `hover`, `pressed`, `focusVisible`, `selected`, `disabled`, `readOnly` | These are UI conditions; focus must remain perceivable wherever appropriate. Hover cannot be the only means of disclosure. |
| Data phase | `idle`, `loading`, `ready`, `empty`, `refreshing`, `error` | `refreshing` may retain last-good content, unlike an initial `loading` state. `empty` is not a network failure. |
| Connectivity | `connecting`, `connected`, `reconnecting`, `disconnected` | Connectivity never silently overwrites operation outcome; degraded connectivity should not imply operation failed. |
| Freshness | `current`, `stale`, `unknown` | Staleness is about displayed observations, not proof that a backend operation is still or no longer running. |
| Execution | `queued`, `running`, `paused`, `succeeded`, `failed`, `cancelled` | Host provides authoritative status. Distinguish **requesting cancellation** from **cancelled**. |
| Approval | `pending`, `approved`, `rejected`, `expired`, `revoked` | `approved` records a decision; it does **not** assert successful execution. |
| Validation | `unvalidated`, `validating`, `valid`, `warning`, `invalid` | Warning is not necessarily a blocking error. Errors must be linked to a field and actionable. |
| Edit | `clean`, `dirty`, `saving`, `conflict` | A remote update must not automatically discard dirty local state. |

**Combination example:** `{ execution: "running", connection: "reconnecting", freshness: "stale" }` displays an active-but-unverified deployment; it must **not** display either `failed` or `succeeded` unless the host establishes that outcome.

### 2.1 State priority for simultaneous conditions

No global 'highest enum' rule. Present state in separate locations or channels:

1. **Accessibility / keyboard:** maintain focus visibility and deterministic navigation regardless of status.
2. **Safety / blocking validation / edit conflict:** persistent inline context near the actionable item, with review/retry/reconcile affordances.
3. **Actionable business state:** approval pending/expired, operation failed, execution running/cancelling.
4. **Connectivity and freshness:** top-level/workspace or widget-level status with last verified time when provided.
5. **Noncritical status / success:** low-interruption inline update or toast; do not steal focus.

Do not overwrite visible business state with a connection banner. Labels such as **Running · Data may be stale** are valid and clearer than a single misleading badge.

## 3. Presentation rules by dimension

### Interaction and focus
- Keyboard focus uses `:focus-visible` (with deliberate fallback as necessary); an accessible outline must remain visible on both themes and in high-contrast modes.
- Disabled controls explain why when reasonable and do not emit activation events. Read-only controls can remain keyboard-reachable and text-selectable as appropriate.
- Hover-only affordances require an accessible click, touch or keyboard counterpart.
- A waiting button does not submit multiple times; progress text and intent labels persist appropriately; do not misuse `aria-busy` as a complete accessible status announcement.
- Selection and editing are distinct: selecting a record does not mutate data; entering edit mode establishes explicit save/cancel behavior.

### Loading, refresh, emptiness and errors
- Initial loading uses layout-preserving skeletons or progress indicators. Unknown duration must not imply a fake percentage.
- Refreshing retains last-good content by default and marks it updating; preserve scroll position and user input.
- Empty states explain *why* if known (no records vs filters returned none), with relevant clearing/creation actions.
- On error, display an actionable message and retry affordance only when retry is supported by the app.
- Stale-data warning may include `lastVerifiedAt` (host-provided); timestamps are displayed in an appropriate locale and time zone.

### Real-time operation and event feeds
- Show connection status only when relevant to the user's task, not as a flashing permanent indicator.
- On reconnect, do not announce all historical events one by one. Host must deduplicate/reconcile; UI maintains a stable list and optional **N new events** affordance.
- If the user has scrolled away from the live tail, do not force-scroll. Provide **Resume live** with a pending count.
- Show sequence gaps or completeness uncertainty if reported by host; never infer guaranteed continuity from WebSocket/SSE/Electron IPC alone.
- An operation outcome must come from authoritative host data, not inferred from connection closure or a timeout.

### AI streaming and human approvals
- Keep partially streamed content readable. Avoid jumping the viewport or flooding assistive technologies with every token.
- Differentiate `streaming`, `interrupted`, `finished`, and `failed` **message presentation** from agent execution lifecycle state.
- Tool calls disclose **name, status, timing, safe input/output summary**, expandable inspection, and host-redacted sensitive fields.
- Approval requests show who/what/where, impact, risk, requested action, resource, expiry if present, and a viewable change diff. Never expose approval and authorization as the same concept.
- Clicking Approve or Reject emits a typed **decision intent** tied to request ID and revision; the app authorizes and submits. Pending decision acknowledgments and authoritative result appear separately.
- Expired/revoked or revision-mismatched approvals become non-actionable and preserve an explanatory audit view.
- Agent-generated UI edits must show before/after and validated JSON Patch, must check base revision, and require explicit review/approval before applying.

## 4. Component-family acceptance matrix

| Family | Mandatory states | Essential behavior | Small-screen adaptation |
|---|---|---|---|
| Button / Form | focus, disabled, busy, invalid, validating, readOnly | Labels/errors linked semantically; preserve typed input | touch-area expansion; single-column actions |
| DataGrid / TreeGrid / Pivot | initial/refreshing/empty/error, selection, editing, conflict, stale | Managed keyboard grid focus where interactive; virtualization preserves row identity and focus | record cards, drill-down detail, explicit available-data indicators |
| Workspace / Drawer / Dialog | collapsed, open, busy, save conflict | predictable focus entry/return; Escape where appropriate; no trapped keyboard | stacked/detail sheets; avoid inaccessible nested panels |
| Chart / KPI | loading, empty, stale, error, updated | summary and data alternative; no color-only meaning | fewer labels, scrollable legend or chart/table switch |
| Deployment / EventStream / Logs | queued/running/failed/succeeded, reconnecting, stale | stable event ordering supplied by host; pause tail / resume live | focused timeline and filterable event list |
| Chat / AgentActivity / ToolInspector | streaming, interrupted, complete, error, pending | controlled announcements, code copying, inspect tool outputs | full-width conversation with results as routes/tabs/sheets |
| Approval / DesignDiff | pending, responding, approved/rejected/expired/revoked, revision conflict | diff preview, decision intent, authoritative acknowledgment | dedicated review screen; sticky action bar if appropriate |
| Visual designers | clean, dirty, validating, conflict, saving, readOnly | schema validation, keyboard alternatives to drag operations, undo proposal history | property editing and previews as separate screens |

## 5. Interaction and keyboard rules

| Pattern | Baseline |
|---|---|
| Generic actions | Tab/Shift+Tab move through focus order; Space/Enter activate native buttons. |
| Menu, tabs, listbox | Follow the WAI-ARIA APG pattern for the specific widget. Do not invent universal arrow-key behavior. |
| Interactive grid | Arrow-key cell navigation, Home/End and modifier navigation as appropriate; F2/Enter enters editing/contained controls and Escape returns to navigation. Static tables remain ordinary semantic tables. |
| Dialog | Give accessible name, place initial focus appropriately, constrain focus for modal dialogs, restore sensible focus after close. Escape may be disabled only where genuinely unsafe and should be documented. |
| Drag-and-drop / docking | Provide keyboard or non-drag operations for reordering/resizing; treat pointer/touch as additional modes. |
| Toast and status | Routine status updates must not steal focus. Critical errors can use assertive announcements sparingly. |
| Keyboard shortcuts | Scope to active workspace; avoid overriding text editing and browser/system shortcuts; advertise shortcuts in menus/tooltips. |

**Standards references:**
- WAI-ARIA APG grid: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
- WAI-ARIA APG modal dialog: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

## 6. Accessibility announcements and attention budget

- Use native semantics first; `role="status"`/polite live region only for meaningful nonurgent changes; `role="alert"` for exceptional interruptions, not each streamed token.
- Deduplicate and coalesce high-volume event announcements. Default presentation pattern: visually update feed, provide aggregate **X new events**, announce significant transitions only. Announce exact thresholds/timing based on usability testing, not a universal fixed count.
- Avoid auto-focus after non-modal status changes; respect reduced motion and users who are reading earlier output.
- Test 200–400% zoom, forced colors, pointer/keyboard/touch and screen readers in real browser/Electron environments.
- WCAG 2.2 AA target size is generally 24×24 CSS px with exceptions; our touch ergonomics target is approximately 44px interactive region where practical. Do not confuse the ergonomics target with the standard's minimum.

## 7. Visual tokens to add (proposed)

Use semantic token roles, generated from the authoring token file; values require cross-theme visual/contrast validation.

```css
/* Illustrative aliases, not a finalized token build */
--ui-color-state-focus-ring: var(--ui-color-focus-ring);
--ui-color-state-selected-bg: var(--ui-color-action-selected-bg);
--ui-color-state-selected-fg: var(--ui-color-action-selected-text);
--ui-color-state-invalid-border: var(--ui-color-status-danger-text);
--ui-color-state-invalid-bg: var(--ui-color-status-danger-bg);
--ui-color-state-warning-bg: var(--ui-color-status-warning-bg);
--ui-color-state-success-bg: var(--ui-color-status-success-bg);
--ui-color-state-stale-fg: var(--ui-color-status-warning-text);
--ui-color-state-disconnected-fg: var(--ui-color-status-danger-text);
--ui-opacity-disabled: 0.55;
--ui-motion-state: var(--ui-motion-fast);
```

Opacity alone must never convey disabled/error/status. Prefer readable disabled tokens over blanket element opacity, especially in dark and high-contrast themes. Focus indicators remain visible regardless of validation, loading or selection state.

### State tokens versus theme tokens
`stale` is a semantic state while `dark` is a theme; never create `--ui-dark-stale...` as application code. Theme definitions supply values for semantic state aliases. Nested themes and portals must inherit the correct scoped token context.

## 8. Responsive state preservation

- When a pane becomes a mobile route/sheet, preserve its conceptual selection, pending edits and identity; never discard a dirty field during reflow.
- A live operation viewed on phone shows the same authoritative status as desktop. Do not omit critical warnings, but prioritize one primary task at a time.
- Density preference is distinct from pointer capability. Even compact mode may require expanded hit areas for touch devices.
- If a mobile record-list replaces a data grid, preserve row IDs, selection meaning, sorting/filter chips and data completeness semantics.

## 9. Design/schema compatibility

- Component metadata identifies renderable states, supported property bindings, event intents and allowable actions.
- JSON design documents store **configuration** such as appearance, layout, bound state paths and action IDs—not executable callbacks or raw network permissions.
- Runtime state snapshots are normally supplied as application data, not persisted into the UI design schema by default.
- JSON Patch must be structurally and semantically validated; optimistic editor transactions require a base revision test. Validation does not grant authorization.
- Change review shows status **Proposed → Validated → Awaiting user decision → Sent for authorized application → Applied/Rejected/Conflict**. Never label an edit 'Applied' on button press alone.

## 10. Test and release coverage

Component QA is required inside the library repository. External-consumer-repository installation tests are **release policy**, not a codebase/CI dependency.

Every applicable interactive component must be tested for:
1. Light, dark, high-contrast/forced-colors visual state and focus ring.
2. Comfortable/compact density and keyboard-only flows.
3. Desktop, tablet portrait/landscape, phone and narrow container (not simply breakpoint scaling).
4. Controlled state callbacks and double-submit protection.
5. Initial-load, refresh, empty, error and stale content semantics.
6. Reconnection with event duplicate/reordering simulated by **host test adapter**, preserving selection/scroll and not inventing completion.
7. Accessibility names, live region announcements and focus restoration.
8. Dirty edit reconciliation and server revision conflicts.
9. Approval expiration/revocation/revision mismatch, and authoritative acknowledgment.
10. Performance under high-frequency updates and long datasets/messages; visible data never silently disappears.

See `SCENARIO-MATRIX.md` for concrete acceptance scenarios. Visual examples are in `component-states-showcase-light-dark.png`.

## 11. Open design decisions (not approved by this draft)

- Exactly which states appear in universal component props vs domain-specific state models.
- Default announcement coalescing/notification thresholds; require assistive-technology usability verification.
- Full contrast-certified high-contrast semantic palettes and forced-color mapping.
- Grid keyboard/edit conventions across all advanced cell editors and nested widgets.
- Event stream 'live tail' control behavior during mixed new and historical messages.
- Revision conflict UX when an approval expires while a human is reviewing a long diff.
- Exact responsive transformation of Gantt, topology diagrams and designer canvas interactions.

**Next design checkpoint:** review/approve the representative interaction board and contracts, then produce focused state sheets for editable grids, live operations/incident timelines, and approvals/agentic design edits.

## 12. Reproducible design-review prototype (added to v0.1)

`interaction-lab.html` is a standalone, zero-network **behavioral design specimen** for four cross-cutting workflows: DataGrid, deployment monitor, AI stream, and approval panel. It supports light/dark themes, compact/comfortable density, and narrow layouts. Scenarios are selectable by a human reviewer and intentionally simulate state from local fixtures.

The prototype documents **presentation and intent behavior only**. It is not the React package, a functional accessible DataGrid, an Electron integration, or a backend authorization flow. The data grid uses a native table for this specimen, not an `aria-grid`: the eventual interactive grid must implement the WAI-ARIA APG model with managed focus, cell editing and virtualization identity rules. Likewise, mock scenario buttons simulate host-confirmed states and do not infer terminal outcomes from a live connection.

Controls labeled Approve and Reject issue **local demonstration intent**; they cannot modify state outside the specimen. A host may choose to reject the intent due to authorization, stale revision or business rule, and the final production component must render that result without misrepresenting completion.

See `INTERACTION-LAB-QA.md` for reproducible checks and known limitations. The prototype deliberately contains no required raster assets.
