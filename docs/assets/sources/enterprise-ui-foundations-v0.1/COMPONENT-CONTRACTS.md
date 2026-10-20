# Core component contracts v0.1

**Status:** Proposed component-level acceptance targets, intended to inform mockup refinement. This is a design catalog, not production API typings.

## Universal component invariants

All interactive components must:

1. Use shared semantic theme, density and motion tokens; avoid hardcoded colors in implementation styles.
2. Provide documented, typed React callbacks; controlled/uncontrolled modes where meaningful.
3. Support `className`, refs as appropriate, and composable children/slots; expose stable CSS customization hooks.
4. Render actual keyboard/touch behavior and meaningful accessible roles/names, not just ARIA markup.
5. Display appropriate disabled, readonly, busy, error, focused, selected and loading states.
6. Behave correctly in desktop, tablet, and phone contexts, including container-limited panes.
7. Declare registry metadata (supported properties, constraints, events, slots, bindings and examples) for schema-driven and agentic use when the component is schema-compatible.
8. Leave business operations, data authorization, network transport and persistence to host applications.

## Foundation and core families

| Component | API & composition | States/behavior | Responsive/a11y acceptance |
|---|---|---|---|
| `Text`, `Heading` | semantic element, visual scale, truncation and inline styling hooks | typographic variants | semantic headings, wrapping and 200–400% zoom |
| `Icon` | icon registry name, size, `aria-label` only when meaningful | currentColor, muted/active/status | decorative SVG hidden from accessibility tree, no raster dependency |
| `Button`, `IconButton` | `variant`, `size`, `disabled`, `busy`, `onPress` or standard click callback; icon slots | hover, pressed, focus, disabled, busy | keyboard activation and focus; icon buttons need accessible names |
| `TextField`, `TextArea` | value/defaultValue, onChange, label, description, error | editing, invalid, readonly, disabled, async validation | label/error association, autofill, composition input |
| `Select`, `Combobox` | value/defaultValue, options/children, filtering and groups | open, highlighted, selected, pending | arrow/typeahead navigation and mobile touch behavior |
| `Checkbox`, `Switch`, `RadioGroup` | checked/selected, indeterminate where appropriate | focus, selected, disabled | pointer and keyboard parity; group semantics |
| `Dialog`, `Drawer` | controlled open, close callbacks, header/footer slots | open/closing, busy, destructive confirmation | focus trap/return, Escape, portal/theme inheritance |
| `Popover`, `Menu`, `Tooltip` | anchor, trigger, content, placement | open, focus, close | pointer-independent activation, collision detection, hover/focus affordance |
| `Tabs`, `NavigationItem` | selected key and key changes; slot labels/icons | selected, focus, disabled | roving focus, scrollable overflow, accessible navigation |
| `Panel`, `Card`, `Surface` | semantic wrapper, header/actions/content slots | empty, loading, errors via composition | no mandatory nesting/shadow; respect container constraints |
| `SplitView`, `DockingWorkspace` | panes with IDs, size constraints, persistence adapter contract | drag, collapse, resize, restore | keyboard resizing, mobile stacked fallback, no host storage requirement |
| `DataGrid` | typed row IDs, column definitions, cell slots, controlled models | sorting, selection, resizing, filtering, virtualization, editing, loading/stale/error | row/column announcements, keyboard grid behavior, phone record-list presentation |
| `StatusBadge`, `StatusIndicator` | semantic status type, label, optional icon | success/warning/danger/info/neutral | no color-only meaning, accessible status text |
| `Toast`, `NotificationCenter` | message, severity, duration/priority, actions | queued, dismissed, persistent | noncritical vs critical distinctions, nonintrusive live regions |
| `KPI`, `Chart` | metric, trend, thresholds, series plus legend | no data, stale, loading, selection | responsive SVG, meaningful summaries/table alternatives |
| `ActivityFeed`, `EventTimeline` | typed events, timestamps, group actions | streaming, stale, disconnected, retry | preserve scroll position and announce meaningful updates |
| `ChatPanel`, `ChatComposer` | message definitions, content slots, typed submit intents | streaming, tool calls, retry, failed, approval, interrupted | keyboard message navigation, readable code blocks, mobile composer |

## Schema and agentic compatibility

Schema-driven components declare a stable registry ID, version, supported property schema, permitted children/slots, named action events, and data-binding slots. A component's React props may be richer than its serializable schema surface: closures and render functions are valid in JSX but never serialized as executable code in JSON.

Validation must reject unknown/unregistered component kinds, unrecognized event bindings, incompatible child nesting, unknown schema versions, and unauthorized action resolution by the host. JSON Patch transactions should include version/revision checks and produce reviewable changes; full undo may require inverse patches or snapshots retained by the host.

## Items requiring dedicated design sheets

- Stateful input and validation matrix
- Dense data grid / editing / pivot / tree / mobile record list
- Complex overlays and stacking within nested panels
- Drag/drop and accessible alternative controls
- AI streaming, partial messages, tool results and human approval
- Visual design canvas, component palette and property inspector
- Deployment pipeline and log/event viewer disconnected-state behavior
- Accessible mobile navigation, bottom sheets and touch shortcuts
