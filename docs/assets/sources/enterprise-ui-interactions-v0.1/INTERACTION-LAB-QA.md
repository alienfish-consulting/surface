# Interaction Lab — Review and QA evidence

**Artifact:** `interaction-lab.html`  
**Theme architecture:** the standalone page embeds a frozen snapshot of `ui-tokens.css` from the Foundations v0.1 artifact; color, size and density aliases reference those same `--ui-*` CSS custom properties.  
**Status:** design-review specimen; **not** React implementation, production-certified component, or accessible widget library.

## Reproducible manual walkthrough

1. **Data & editing:** select `Edit conflict`; confirm the selected row and the unsaved customer note remain present while a conflict warning explains review is needed. Select `Refreshing`, then `Error`; previously rendered data remains.
2. **Live operations:** select `Reconnecting`; verify `Execution: running`, `Connection: reconnecting`, `Freshness: stale`, and previous timeline data coexist. Select `Failed` only to view an explicitly host-reported terminal outcome. Select `Pause tail` and use the `Resume live` control.
3. **AI streaming:** use `Show next chunk`, then choose `Interrupted`; partial text remains present, with a distinct transport and execution state. Inspect how `Failed` differs from `Completed`.
4. **Human approval:** choose `Revision conflict` or `Expired`; decision buttons become disabled, with an explanatory warning. Return to `Pending` and click `Approve request`; observe **Submitting**, not **Applied** or **Authorized**.
5. Toggle **Dark theme** and **Compact density** while moving among scenarios; narrow the window to mobile width. Use Tab to move between scenario controls and arrow keys to change accessible review tabs.

## Automated browser checks performed on the specimen

- Chromium rendered desktop light and dark states and a 390px mobile layout.
- JavaScript page-error listener reported **0 errors**.
- Scenario toggles verified for data conflict, running+reconnecting, interrupted stream, revision conflict and nonexecuting approval intent.
- Mobile document width did not overflow the 390px viewport; wide tables are scrollable within their own region.
- Four screenshot fixtures are included for visual inspection.

These checks validate this **static specimen only**. They do **not** demonstrate production accessibility compliance, APG DataGrid semantics, Electron compatibility, real transport recovery, network permission enforcement, or high-rate streaming performance.

## Must validate during React implementation

- Controlled/uncontrolled state behavior, viewport and container queries, stable row IDs and virtualized focus.
- WAI-ARIA APG keyboard navigation in real `DataGrid`, dialog and composite widgets.
- Assistive-technology coalescing of live status announcements with tested performance thresholds.
- High-contrast and forced-color palette behavior; 200% and 400% zoom.
- Event sequence gaps, deduplication, stale snapshots and host reconciliation in test adapters.
- Approval request expiry, revocation, optimistic revision checks and explicit authorization denials.
- Theme inheritance through portals and resizable Electron panels.
- WCAG 2.2 AA checks across interaction, visual, semantic and responsive states.

External consumer-repository npm validation remains **documented release policy**, not a CI prerequisite in the component library repository.
