# Foundations v0.1 — Design-to-implementation specification

**Status:** Proposed technical measurements; established design principles are approved.  
**Scope:** Enterprise ERP/back-office, SaaS operations/control plane, AI/agent UI, Electron-hosted and browser-hosted consumers.  
**Release status:** Internal design artifact only; **not a published library**.

## 1. Decisions already approved

- Light-first professional enterprise visual language with equally supported dark theme.
- Inter UI typography and IBM Plex Mono for technical content.
- Slate neutrals and restrained blue accent, globally themeable semantic colors.
- Base 4px spacing scale, 4/6/8/12px radii, compact and comfortable density.
- Flat-first, subtle borders, disciplined elevation and overlay stacking.
- Keyboard-first interaction, accessible semantics, status-aware data, useful subdued motion.
- SVG-native library-owned graphics; no required raster assets.
- Direct React composition **and** versioned declarative JSON schema rendering.
- Machine-readable registry, validation and agent-editable JSON Patch transactions.
- Desktop, tablet and phone mockup coverage; optimized touch and container-based responsive behavior.
- All modular packages are part of the initial coordinated release; no npm publication until v1 complete.
- Testing with a separate consuming repository is a documented *release policy*, not a codebase/CI-enforced prerequisite.

## 2. Decisions proposed for quantitative validation

The generated mockups are **visual direction references**, not pixel-accurate source files. The hex values and dimensions below are explicit initial design hypotheses and must be verified against real rendered components, WCAG checks, and light/dark variants before final approval.

### 2.1 Theme colors

| Role | Light | Dark | CSS contract |
|---|---|---|---|
| Application canvas | `#F8FAFC` | `#0B1220` | `--ui-color-bg-canvas` |
| Main surface | `#FFFFFF` | `#111827` | `--ui-color-bg-surface` |
| Raised surface | `#FFFFFF` | `#1E293B` | `--ui-color-bg-raised` |
| Inset | `#F1F5F9` | `#0B1220` | `--ui-color-bg-inset` |
| Primary text | `#0F172A` | `#F1F5F9` | `--ui-color-text-primary` |
| Secondary text | `#475569` | `#CBD5E1` | `--ui-color-text-secondary` |
| Tertiary text | `#64748B` | `#94A3B8` | `--ui-color-text-tertiary` |
| Border | `#E2E8F0` | `#334155` | `--ui-color-border-default` |
| Primary action | `#2563EB` | `#60A5FA` | `--ui-color-action-primary` |
| On primary | `#FFFFFF` | `#0B1220` | `--ui-color-action-on-primary` |
| Focus ring | `#2563EB` | `#93C5FD` | `--ui-color-focus-ring` |

Semantic status groups are separate from brand accents: `success`, `warning`, `danger`, and `info` each expose `bg`, `border`, and `text` tokens. Never convey meaning through color alone; include icon, label or context.

### 2.2 Typography

| Role | Token | Proposed value |
|---|---|---|
| UI family | `--ui-font-body` | Inter + system fallback |
| Code / identifier family | `--ui-font-mono` | IBM Plex Mono + system fallback |
| Standard body | `--ui-font-size-body` | 14px |
| Dense data | `--ui-font-size-sm` | 13px |
| Supporting text | `--ui-font-size-xs` | 12px |
| Subsection | `--ui-font-size-md` / `lg` | 16 / 18px |
| Page heading | `--ui-font-size-heading` | 24px |
| Weight | CSS numeric | 400 / 500 / 600 / 700 |
| Line height | `--ui-line-height-*` | 1.35 dense / 1.5 body / 1.25 headings |

Use tabular lining numerals for columns of numeric financial or operational data. Locale-aware formatting belongs to consuming applications or utilities, not hardcoded UI text. Fonts must be customizable; this package does not include font binaries.

### 2.3 Dimensions

| Control | Comfortable | Compact |
|---|---:|---:|
| Control | 36px | 28px |
| Toolbar | 48px | 40px |
| Table row | 44px | 32px |
| Navigation item | 40px | 32px |
| Tab | 40px | 32px |
| Page gutter | 24px | 16px |

Use the 4px spacing scale, extending by multiples as necessary (0,4,8,12,16,20,24,32,40,48,64px). Touch presentation targets at least 44px action areas where practical; this is a product usability target distinct from WCAG 2.2 AA's 24px minimum and exceptions.

### 2.4 Elevation, motion, and stacking

- Flat structural surfaces normally use borders. Floating menus and dialogs receive controlled shadows.
- Stack contexts are managed by an overlay manager. Elevation is not synonymous with `z-index`.
- Motion tokens: fast 120ms, normal 180ms, slow 240ms; state transitions should avoid needless animation.
- Reduced-motion preferences must be honored and transient overlays must remain operable while transitioning.

## 3. Token architecture

**Authoring format:** `design-tokens.json` follows the Design Tokens Community Group (DTCG) Format Module 2025.10 conventions using `$type`, `$value`, and aliases. The 2025.10 format is a W3C Community Group final report, **not** a W3C Recommendation.

**Runtime contract:** CSS custom properties beginning with `--ui-`; generated CSS is the consumer-facing interface. React components use semantic tokens rather than palette values. Foundation → semantic light/dark → component aliases is the lookup hierarchy. A future generation step must keep the CSS and JSON synchronized; the included CSS is a design-time specimen, not an implemented build pipeline.

**Scoping:** Use `data-ui-theme="light|dark"` and `data-ui-density="comfortable|compact"` on an application root or subtree. The host owns preference persistence. Themes may be client-scoped without modifying package internals. High-contrast and forced-colors modes remain mandatory for v1, but their detailed palettes are **not yet finalized**.

**Cascade:** CSS Modules for component styles, plus explicit cascade layers (`ui.tokens`, `ui.components`, `ui.utilities`) and intentional app overrides. Avoid inline hex codes, CSS-in-JS runtimes and globally scattered fixed dimensions. Consider host CSS conflicts and portal placement during implementation.

## 4. Accessibility guardrails

- WCAG 2.2 AA target. Normal text >=4.5:1, large text >=3:1, and non-text interface information >=3:1 where applicable.
- Keyboard semantics are verified by interaction, not merely rendered ARIA attributes; focus must remain visible.
- Drag-and-drop interactions need an operable non-drag path wherever required by WCAG 2.2.
- Standard input behavior must support text scaling, browser zoom and high-contrast/forced-color environments.
- Touch sizing recommendation is >=44 CSS px for primary actionable targets when layout permits; testing also checks applicable 24px WCAG exceptions.
- Statuses always provide text or icon context. Charts need summaries and accessible data alternatives.

### Checked **examples**, not certification

| Pair | Contrast calculated |
|---|---:|
| Light primary text on canvas | 17.06:1 |
| Light secondary text on white surface | 7.58:1 |
| White on light primary action blue | 5.17:1 |
| Light tertiary text on canvas | 4.55:1 |
| Dark primary text on dark surface | 16.19:1 |
| Dark secondary text on dark surface | 11.95:1 |
| Dark primary action label on blue | 7.36:1 |

These ratios use the WCAG relative-luminance formula for the particular opaque color pairs. They do not certify the entire library; borders, hover, transparency, focus, SVG icons and combined backgrounds still require testing.

## 5. Responsive and event-aware rendering

- Test reference sizes: desktop 1440x900 and 1600x1000; tablet 768x1024 and 1024x768; phone 390x844 and 430x932. These are **QA fixtures**, not forced CSS breakpoints.
- Prefer container queries for panel-local adaptations. Use broader viewport breakpoints only for app-shell choreography.
- Desktop: persistent navigation, data grid, inspector and multi-panel workflow.
- Tablet: collapsible navigation, contextual detail pane, touch-first controls, list/grid trade-offs.
- Phone: focused record list, progressive disclosure, route/sheet-based details, bottom navigation where appropriate.
- Event-aware components distinguish loading, streaming, stale, disconnected, reconnecting, failure, conflict and completed states; never silently discard pending user edits.
- Transport protocols, authorization, data fetching and event ordering remain host application responsibilities. Components render passed state and emit typed intents.

## 6. Visual reference caveats

The approved generated mockups are included under `references/`. Their typography and tiny text may include image-generation artifacts. Product names, data amounts, exact pixel measurements and component behavior depicted there are illustrative, **not requirements**. Implementation should use the documented tokens and independently verified content/behavior instead of tracing pixels mechanically.

## 7. Pending reviews

1. Render foundation components under the proposed light and dark themes to validate perceived hierarchy and geometry.
2. Define high-contrast palette and forced-colors behavior.
3. Resolve portal/nested-theme strategies for overlays.
4. Confirm responsive transformation contracts for full data grids, inspectors and AI chat.
5. Implement automated token contrast checks and visually test controls against real browser rendering.
6. Finalize source-token generation pipeline, CSS API compatibility rules, and component-level token naming.
