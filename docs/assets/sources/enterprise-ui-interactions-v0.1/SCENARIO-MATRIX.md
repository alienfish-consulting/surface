# Component interaction scenarios — QA draft

| ID | Given | When | Required visible and accessible result |
|---|---|---|---|
| S-01 | Empty customer data grid, first load | API request begins | Grid region retains layout; loading status is accessible; no fabricated zero results. |
| S-02 | Grid is displaying results | Background refresh begins | Existing rows remain, refresh cue is visible, focus and selected row retained. |
| S-03 | Editable row contains dirty data | Other editor updates same row | Show conflict with compare/keep/reload controls; do not silently overwrite draft. |
| S-04 | Live events were updating | User scrolls into history | Stop auto-follow; show count of new events and Resume Live; scroll position remains. |
| S-05 | Deployment is running and connected | Connection drops | Show running (last observed) + disconnected/stale; not success or failed; preserve timeline. |
| S-06 | Stream reconnects with overlapping data | Host provides deduplicated list | UI preserves focus and current scroll; doesn't replay hundreds of alerts. |
| S-07 | AI response streams text | User reads an earlier section | Keep position; don't announce every token to screen reader. |
| S-08 | Tool inspector displays inputs | Sensitive material redacted by host | Show redacted placeholder, never render secret in summary/copy. |
| S-09 | Approval is pending revision 5 | User presses Approve | Emit intent including request ID + expected revision; show submitting, NOT applied/success. |
| S-10 | Approval is being reviewed | Host reports expired or revised | Disable stale decision actions, explain reason and permit refresh/new review. |
| S-11 | Agent proposes JSON Patch | Patch validation fails | Present diagnostics; cannot submit apply intent; preserve original schema. |
| S-12 | Agent patch was validated | User inspects before/after and approves | Host checks revision and policy; UI shows applied only after authoritative response. |
| S-13 | Form input invalid | User tabs to next field | Error text associated to field and announced appropriately without stealing focus. |
| S-14 | Modal dialog opens | User navigates by keyboard, then dismisses | Focus stays inside while open and returns to logical trigger afterwards. |
| S-15 | Desktop UI changes to mobile layout | Dirty form/dataset selection exists | Selection and unsaved edits retained through reflow; critical warnings still visible. |
| S-16 | User has reduced motion enabled | Menu/dialog opens or progress updates | No unnecessary animation; control remains immediately operable. |
| S-17 | Touch input and compact density | User accesses row actions | Available touch target meets design ergonomics or compliant equivalent; no hover dependence. |
| S-18 | High contrast/forced colors | Keyboard focus enters primary action | Focus remains perceivable, state remains distinguishable without relying solely on fill color. |

## Testing tool boundaries

- **Vitest + React Testing Library:** state-to-render mapping, callbacks, editable-state preservation, form semantics.
- **Playwright:** keyboard, visual regression (light/dark/density/responsive), dialog focus, grid navigation, screenshot diffs.
- **axe-core + manual assistive-technology checks:** accessible names, contrast, landmarks, live regions, keyboard traps.
- **Host test adapters:** replay events, connection loss, stale state, revision conflict, authorization denial (without live backend services).
- **Performance stress tests:** high-rate logs, thousands of rows, long chat transcripts and drag/resize interactions.

All v1 packages require local validation; **a separate consumer repository remains release policy, not enforced by this repository or CI.**
