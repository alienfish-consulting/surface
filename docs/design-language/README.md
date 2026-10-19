# Surface design language

**Status:** Current design specification · **Updated:** 2026-10-19

This document defines the visual, interaction, and composition language of
Surface. It translates the approved design handoff, the implemented token
system, the component families, and the Design Lab into one durable reference
for designing browser and Electron applications.

## Status and authority

The principles and rules in this document are normative unless a section is
marked **recommended composition**. Recommended composition is inferred from
the approved mockups and the integrated Design Lab; it is guidance for making
applications feel like Surface, not a new component API or serialized contract.

When sources disagree, use this order:

1. [`packages/tokens/source/design-tokens.json`](../../packages/tokens/source/design-tokens.json)
   and the generated [`theme.css`](../../packages/tokens/dist/theme.css) for
   exact visual values and runtime custom-property names.
2. Public component types, implemented family styles, stories, and focused
   tests for component behavior.
3. This specification for visual intent, composition, and cross-family rules.
4. The Design Lab for a realistic application example.
5. Historical handoff files and generated mockups for provenance only.

Do not copy values out of this document into component CSS. Consume the
semantic `--ui-*` properties. Change an authored token and regenerate its
outputs when the system itself needs to change.

## Character

Surface is a restrained professional enterprise language for software in which
people inspect data, make decisions, supervise processes, and authorize
consequential work. It should feel calm, precise, trustworthy, and capable—not
futuristic, decorative, or consumer-playful by default.

The visual signature is:

- a quiet slate canvas with clear white or tonal working surfaces;
- restrained blue reserved primarily for action, selection, and focus;
- compact, legible typography with a separate voice for technical material;
- border-led structure and shallow elevation;
- dense information arranged into strong, repeatable hierarchy;
- explicit state, provenance, and consequence near the affected work;
- the same visual and behavioral model in browsers and Electron.

An interface can carry a product brand around Surface, but brand styling must
not replace semantic action, status, focus, or accessibility roles.

## Principles

### Clarity before decoration

Every visual treatment should help identify hierarchy, state, grouping, or an
available action. Remove ornament that competes with the work. Prefer whitespace,
borders, alignment, and typography over gradients, large shadows, and oversized
illustration.

### Density without crowding

Surface is designed for substantial operational information. Compactness comes
from a consistent 4px rhythm, controlled type scale, and adaptable density—not
from reducing legibility or hiding necessary context.

### State is part of the information

Loading, refreshing, empty, stale, disconnected, conflicting, awaiting approval,
and failed are different conditions. Show them deliberately. Never collapse a
multidimensional situation into a single misleading badge.

### Consequence stays visible

Place validation, risk, diffs, approval scope, and destructive consequences near
the decision. A button press reports an intention; it does not visually claim
that a host-authorized operation succeeded.

### Composition over novelty

Build new experiences by composing shared surfaces, layout primitives, controls,
and domain components. Introduce a new visual pattern only when it represents
reusable behavior or meaning.

### Adaptation preserves the task

Responsive design changes choreography, not truth. A mobile route, drawer, or
record list must preserve identity, selection, warnings, pending edits, and
authoritative state from the larger layout.

### Accessibility is visible design

Keyboard operation, focus, semantic structure, reflow, contrast, target size,
reduced motion, and understandable status are design inputs. They are not a
separate compliance layer.

## Foundations

### Color

Use semantic color roles rather than palette values. The principal theme roles
are shown here for recognition; the token files remain authoritative.

| Role | Light | Dark | Purpose |
| --- | --- | --- | --- |
| Canvas | `#F8FAFC` | `#0B1220` | Application background and breathing room |
| Surface | `#FFFFFF` | `#111827` | Primary working surface |
| Raised surface | `#FFFFFF` | `#1E293B` | Floating or visually raised content |
| Inset | `#F1F5F9` | `#0B1220` | Recessed controls, code, grouped detail |
| Primary text | `#0F172A` | `#F1F5F9` | Headings and essential content |
| Secondary text | `#475569` | `#CBD5E1` | Supporting content |
| Tertiary text | `#64748B` | `#94A3B8` | Metadata and low-emphasis labels |
| Default border | `#E2E8F0` | `#334155` | Structural separation |
| Primary action | `#2563EB` | `#60A5FA` | Primary actions and active emphasis |
| Focus ring | `#2563EB` | `#93C5FD` | Keyboard focus |

Success, warning, danger, and information each have background, border, and text
roles. Use all three where the component needs a contained status treatment.
Never use color as the only status signal; add a label, icon, shape, or adjacent
explanation.

Blue is not a general decoration color. Use it for actions, links, selected
state, focus, and the primary analytical series. Reserve green, amber, red, and
sky for their semantic status roles. Neutral state should remain neutral.

### Theme and contrast

Light is the default visual expression. Dark is independently tuned rather than
mechanically inverted. Apply modes to an application root or subtree:

```html
<div
  data-ui-theme="light"
  data-ui-density="comfortable"
  data-ui-contrast="high"
>
  <!-- application content -->
</div>
```

Supported themes are `light` and `dark`; supported densities are `comfortable`
and `compact`. `data-ui-contrast="high"` selects the authored high-contrast
palette. Operating-system forced colors are a separate environment that
components must also support. Detached portal roots must receive the same mode
attributes as their originating application.

### Typography

Inter is the interface family and IBM Plex Mono is the technical family. Hosts
may supply compatible fonts, but the roles remain distinct.

| Role | Size | Typical use |
| --- | ---: | --- |
| Supporting | 12px | Hints, timestamps, compact metadata |
| Dense | 13px | Tables, labels, compact controls |
| Body | 14px | Default application content |
| Medium | 16px | Subsections and emphasized content |
| Large | 18px | Card or panel headings |
| Extra large | 20px | Major local heading |
| Page heading | 24px | Primary page title |

Use weights 400, 500, 600, and 700. Default to 400 for prose, 500–600 for labels
and actions, and 600–700 for headings or important values. Use line heights 1.35
for dense text, 1.5 for body text, and 1.25 for headings.

Use the mono family for code, identifiers, revisions, command output, keyboard
shortcuts, and machine-oriented values—not as a decorative accent. Numeric
columns and changing metrics should use tabular numerals. Preserve locale-aware
number, date, and time formatting.

Write in sentence case. Prefer concise verb-led actions such as “Review change,”
“Retry deployment,” and “Resume live.” Labels should describe the actual intent;
do not label a request “Applied,” “Authorized,” or “Complete” before the host has
reported that outcome.

### Spacing and shape

The base unit is 4px. The authored scale is `0, 4, 8, 12, 16, 20, 24, 32, 40,
48, 64px`. Prefer adjacent steps and create hierarchy through consistent
grouping rather than isolated custom gaps.

Radii are modest: `0, 4, 6, 8, 12px`. Use 6px for ordinary controls, 8px for
panels and cards, and 12px only for larger contained surfaces. Fully rounded
shapes are appropriate for compact badges, pills, avatars, and small status
markers. Avoid mixing several radius styles in one region.

### Density and target size

| Element | Comfortable | Compact |
| --- | ---: | ---: |
| Control | 36px | 28px |
| Toolbar | 48px | 40px |
| Table row | 44px | 32px |
| Navigation item | 40px | 32px |
| Tab | 40px | 32px |
| Page gutter | 24px | 16px |

Density is an information preference, not an input-modality detector. On coarse
pointers, interactive targets expand toward 44px and table rows toward 48px even
when compact density is selected. Visual geometry can remain compact inside a
larger hit area.

### Borders, elevation, and layers

Default surfaces are flat and border-driven. Use the raised shadow for cards or
panels that need light separation and the overlay shadow for transient floating
content. Dark themes express depth primarily through surface tone, not heavier
shadow.

The standard layer sequence is dropdown 100, popover 200, dialog 300, and toast
400. Use the provided properties and the overlay architecture; do not resolve a
layering problem by inventing an arbitrary large `z-index`.

### Motion

The duration scale is 120ms, 180ms, and 240ms. Motion should explain state change,
reveal spatial relationship, or preserve orientation. It should not delay work
or add ambient spectacle. Honor `prefers-reduced-motion`; the token layer reduces
the standard durations to zero and component-specific animation must also stop.

### Icons and imagery

Use SVG-native icons that inherit `currentColor`. A decorative icon is hidden
from the accessibility tree; an icon that carries meaning needs an accessible
name or adjacent text. Keep common control icons near 16–20px and align them to
the text or control grid.

Surface components do not require raster imagery, icon fonts, or branded
illustration. Application-owned photography and product artwork may be used when
the product context calls for them, but they should not compete with operational
content.

## Visual hierarchy

Use four levels of surface deliberately:

1. **Canvas** establishes the application boundary.
2. **Structural surface** holds navigation, headers, and principal work regions.
3. **Contained surface** groups a task, dataset, metric, or related controls.
4. **Overlay** temporarily moves a focused decision above the application.

Do not nest cards simply to create padding. Use a panel or card when it provides
a meaningful boundary, heading, action group, scrolling region, or state. Use
spacing and dividers for subdivisions inside the same conceptual task.

Establish hierarchy in this order: page title and task context, primary state or
risk, principal work surface, secondary detail, then metadata. Avoid giving every
region a border, heading, shadow, and colored badge at once.

## Recommended application composition

This section describes the composition demonstrated by the approved references
and Design Lab. It is guidance, not a fixed shell contract.

### Desktop application shell

- Use persistent side navigation when an application has several stable work
  areas. A width around 240–280px is a useful starting range.
- Keep workspace identity and primary navigation together. Place account,
  environment, plan, or connection context near the navigation when it applies
  globally.
- Use a restrained top bar for global search, environment controls, help, and
  notifications. Page-specific actions belong with the page heading.
- Give the main workspace a clear title, short context line, and one dominant
  task. Group secondary actions rather than distributing them throughout the
  chrome.
- Constrain very wide dashboards for scanability, but allow grids, timelines,
  designers, and docked workspaces to use available space where the task needs it.

### Dashboards

- Begin with current scope and status, then summary metrics, trends, recent
  activity, and actionable detail.
- Keep KPI cards comparable in geometry and label/value order. Show timeframe,
  unit, and freshness when ambiguity is possible.
- Use charts to expose shape and change; pair them with a written summary,
  legend, and accessible data alternative.
- Prefer a small number of meaningful modules over a wall of equally prominent
  cards. Every module should answer a recognizable question or support an action.

### Data-heavy work

- Put search, filters, view controls, and dataset actions immediately above the
  data they affect.
- Align numeric columns and use tabular numerals. Keep identifiers and technical
  values scannable with mono type only where it aids recognition.
- Distinguish row selection from activation and editing. Preserve stable row
  identity, focus, selection, and scroll during refresh or virtualization.
- Retain last-good data during refresh and mark its freshness. Initial loading,
  empty results, filtered-empty results, stale data, and retrieval error each
  need different presentation and recovery.
- On narrow screens, a record list and dedicated detail route or sheet is often
  better than compressing a full grid. Preserve sorting, filters, selection, and
  completeness semantics during the transformation.

### Operations and live systems

- Present connectivity, freshness, and execution as separate dimensions. A
  valid combined label is “Running · Data may be stale.” Reconnection alone does
  not mean a deployment failed.
- Preserve the previous event timeline during reconnect and reconciliation.
  Report gaps or uncertainty when the host supplies that information.
- Do not force-scroll a feed after the user leaves its live tail. Offer a pending
  count and a “Resume live” action.
- Use persistent inline treatment for failures and conflicts that require work;
  use toasts for noncritical transient confirmation. Routine updates must not
  steal focus.

### AI, agent, and approval work

- Keep AI surfaces operational and inspectable. Messages, tool activity,
  artifacts, approvals, and execution state should remain visually distinct.
- Preserve partial streamed content. Coalesce announcements and avoid moving the
  viewport while the user reads earlier output.
- A tool call should expose its name, status, timing, safe input/output summary,
  and expandable detail, with sensitive fields redacted by the host.
- Approval views should identify who or what requested the action, affected
  resource, impact, risk, expiry, and proposed diff when applicable.
- “Approve” and “Reject” emit decision intentions tied to an ID and revision.
  Show submission, host authorization, execution, and outcome as separate steps.
- Agent-proposed interface changes remain proposals until a validated preview is
  explicitly authorized and persisted against the expected revision.

### Designers and workbenches

- Separate canvas, palette, layers, properties, history, and validation into
  stable regions. Use resizable panes on larger screens and task-focused routes
  or sheets on smaller screens.
- Keep the currently selected node and its validation state visible across
  panels. A visual selection must map to a stable document identity.
- Provide keyboard and command alternatives for drag, resize, reorder, and
  docking interactions.
- Show proposal history, before/after, and revision conflicts without implying
  that previewed work has been persisted.

### Electron hosts

Electron uses the same React components, CSS, themes, density, state language,
and responsive rules as the browser. Native window chrome may frame Surface,
but should not produce a separate desktop skin. Account for resizable windows,
zoom, platform font rendering, safe drag regions, focus restoration between
native and web surfaces, and portal theme propagation.

Native capability availability and authorization are application states, not
visual theme variants. Show an unavailable or denied capability clearly and
keep browser fallbacks safe and explicit.

## Responsive behavior

Prefer container-aware components. Viewport breakpoints are appropriate for
application-shell choreography, but Surface does not define one global set of
product breakpoints. Thresholds in package CSS and the Design Lab are local
implementation decisions, not universal design tokens.

The intended transformations are:

- persistent side navigation becomes an accessible drawer or focused navigation;
- multi-column dashboards reduce hierarchy before reducing legibility;
- inspector panes become sheets, tabs, or dedicated routes;
- grids become scrollable regions or record lists according to the task;
- secondary controls group into menus while critical state and actions remain
  visible;
- touch targets expand independently of visual density.

Test narrow containers as well as representative phone, tablet, and desktop
viewports. Reflow must not discard dirty input, selection, position, or status.

## State language

Model state along independent dimensions rather than as one flat enumeration.

| Dimension | Vocabulary |
| --- | --- |
| Interaction | `rest`, `hover`, `pressed`, `focusVisible`, `selected`, `disabled`, `readOnly` |
| Data | `idle`, `loading`, `ready`, `empty`, `refreshing`, `error` |
| Connectivity | `connecting`, `connected`, `reconnecting`, `disconnected` |
| Freshness | `current`, `stale`, `unknown` |
| Execution | `queued`, `running`, `paused`, `succeeded`, `failed`, `cancelled` |
| Approval | `pending`, `approved`, `rejected`, `expired`, `revoked` |
| Validation | `unvalidated`, `validating`, `valid`, `warning`, `invalid` |
| Editing | `clean`, `dirty`, `saving`, `conflict` |

Present simultaneous conditions in separate, intelligible channels. Priority is:

1. visible focus and deterministic keyboard operation;
2. safety, blocking validation, and edit conflicts near the affected action;
3. actionable business state such as approval or execution failure;
4. connectivity and freshness with last verified time when available;
5. noncritical success and background status.

Disabled and read-only are not interchangeable. Disabled controls do not emit
activation and should explain why when useful. Read-only content can remain
focusable or selectable. Do not use opacity alone to convey either condition.

## Feedback and interruption

- Use inline validation beside the field or action that can resolve it.
- Use a banner for persistent page- or workspace-level context.
- Use a toast for short, noncritical confirmation or background completion.
- Use a notification center for durable items the user may revisit.
- Use a dialog only when a focused decision must interrupt the current task.
- Use destructive confirmation for consequential, hard-to-reverse actions, not
  as routine friction.

Initial loading may use skeletons or indeterminate progress but must not invent a
percentage. Refreshing should retain last-good content and pending input. Empty
states explain whether there is no data, no matching data, or no permission, and
offer an action only when the application actually supports it.

## Accessibility requirements

Surface targets WCAG 2.2 AA. Every applicable experience must provide:

- semantic HTML first and ARIA only where the pattern requires it;
- an accessible name for every control and meaningful image;
- complete keyboard operation using the established pattern for the widget;
- a visible `:focus-visible` treatment in every theme and contrast mode;
- logical focus entry, containment where modal, and restoration on close;
- text, icons, or context in addition to color for status and selection;
- useful reflow and containment at 200–400% zoom;
- a non-drag path for reorder, resize, and other drag interactions;
- reduced-motion behavior and restraint in live-region announcements;
- chart summaries and an accessible data alternative;
- testing in authored high contrast and operating-system forced colors.

The usability target for primary touch actions is approximately 44 CSS pixels
where practical. This is an ergonomic target and is not a substitute for
evaluating the WCAG target-size criterion and its exceptions.

## Do and avoid

| Do | Avoid |
| --- | --- |
| Use semantic token roles | Copy palette hex values into component styles |
| Use borders and tone to establish structure | Stack shadows and nested cards |
| Keep one clear primary action in a task region | Make several actions equally dominant |
| Display compound state honestly | Replace business state with a connection badge |
| Retain context during refresh and reflow | Blank content or discard edits during transitions |
| Use sentence-case, consequence-aware labels | Use vague labels such as “Go,” “OK,” or premature “Done” |
| Adapt data structures to the available space | Shrink a desktop grid until it is unreadable |
| Pair status color with text or an icon | Encode meaning through color alone |
| Use functional, short motion | Add ambient or decorative animation |
| Keep host authority and capability boundaries visible | Make the UI imply authorization or execution |

## Review checklist

Before accepting a new composition or component treatment, verify:

- The hierarchy remains clear without relying on shadow or color.
- All reusable values come from semantic tokens.
- Light, dark, compact, comfortable, high-contrast, and forced-color modes have
  been considered where applicable.
- Initial load, refresh, empty, error, stale, disabled, permission-denied, and
  conflict states are represented when the workflow can produce them.
- Keyboard order, focus visibility, overlay focus return, and touch targets are
  intentional.
- Narrow-container and small-screen transformations preserve state and task.
- Status is not conveyed by color alone and live updates do not overwhelm
  assistive technology.
- Charts, grids, code, streamed content, and diffs have an accessible reading
  path.
- The UI emits intentions and does not visually claim host authorization or
  completion prematurely.
- Representative Storybook states and application-level evidence exist for a
  visible framework change.

## Related references

- [Token package](../../packages/tokens/README.md)
- [Consumer guide](../guides/consumer-guide.md)
- [Styling and accessibility decision](../architecture/adr/ADR-004-styling-and-accessibility.md)
- [Design Lab](../../apps/design-lab/README.md)
- [Catalog status](../catalog-status.md)
- [Historical design decisions](../history/bootstrap/design-baseline/DECISIONS.md)

The historical snapshot and mockups explain where the language came from. This
document, the current token contract, and implemented component behavior define
where it is now.
