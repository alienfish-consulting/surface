# Decision record — approved project direction

## Purpose and product

- A reusable **professional enterprise** React design system / component library, for ERP and back-office SaaS applications, customer-facing portals, SaaS infrastructure control planes and extensive AI/chat/agent interfaces.
- Initial desktop host is a **real-time, event-driven Electron application**, but ordinary web-browser use must not require Electron.
- Final output is a **coordinated, complete v1 release to npm**. All foundational and specialized packages are included in v1; milestones organize work but do not permit partial npm publication.
- Build visual foundations, agree on mockups and state/behavior specifications, and then implement the library. Mockups are design references, not executable component code.

## Appearance and visual system

- Visual identity: restrained **professional enterprise**, not futuristic as the default.
- **Light-first** visual design, with dark mode equally supported functionally and independently tuned. High-contrast support is a requirement.
- Primary UI typeface **Inter**; technical typeface **IBM Plex Mono**. Illustrative size baseline: 14px body, 13px compact tables, 12–13px supplemental, 16–18px section headings and 24px page headings. Sizes subject to mockup/accessibility validation.
- Color baseline: neutral slate with restrained **blue** accent. Illustrative light colors: canvas `#F8FAFC`, surface `#FFFFFF`, border `#E2E8F0`, text `#0F172A`, primary `#2563EB`; dark: canvas `#0B1220`, surface `#111827`, border `#334155`, text `#F1F5F9`, accent `#60A5FA`. Semantic statuses separate from branding.
- Native CSS custom properties are the runtime authority, including scoped themes and global overrides; foundation/semantic/component token hierarchy.
- Spacing follows a 4px baseline: 4/8/12/16/24/32px representative values. Modest radius baseline 4/6/8/12px.
- **Compact** and **comfortable** densities; provisional dimension examples: control 28/36px, toolbar 40/48px, table row 32/44px, nav 32/40px, tabs 32/40px, page gutters 16/24px.
- Flat-first, border-driven surfaces; restrained shadows, functional elevation and centralized overlay layering. Dark surfaces distinguish depth primarily through tonal contrast.
- No mandatory raster graphics in the component library: prefer SVG-native icons, illustrations and diagrams. Application-owned customer imagery is not prohibited.

## Interactions and adaptive design

- Accessible, keyboard-first interactions, visible focus and predictable native interaction conventions.
- Subtle functional animation and `prefers-reduced-motion` support; motion timing values remain provisional.
- Distinct data, interaction, connectivity, freshness, execution, editing, validation and approval state dimensions. Reconnection is not operation failure; preserve context during refresh, streaming and reconciliation.
- Distinguish inline errors, state/status feedback, toasts, persistent notifications and consequential confirmations.
- Deliver and validate **desktop, tablet and phone** designs; responsive adaptation is purposeful, not simply scale-down. Include touch input, portrait/landscape as relevant, container queries and adaptive navigation/workflow layouts.
- The application retains responsibility for reconciliation, persistence, execution, security and authorization; the library displays typed state and emits intentions.

## React and packaging

- Styled, composable components with accessibility underneath; do not force consumers to style headless primitives themselves.
- PascalCase components, camelCase props, strict TypeScript contracts, typed callbacks, controlled/uncontrolled patterns where appropriate, refs, accessible defaults and explicit slots/compound components. Composition over excessive configuration.
- Modular monorepo with foundation/tokens, shared schema/tooling, React core, data/analytics, AI/conversations, operations/control plane and optional Electron integration. Visual designers are v1 requirements, with packaging to be determined as needed.
- Avoid mandatory application-specific networking, state-management, LLM, model or orchestration dependencies.
- Separate-repository consumer validation is **documented release policy only**; the codebase and CI will not depend on an external repo.
- Formal acceptance requires documentation, typing, unit/integration/interaction/visual tests, accessibility validation, responsive checks and appropriate performance testing.

## Declarative and agentic design

- Both direct React/JSX and serializable **declarative designs** are first-class.
- Visual editors, runtime renderers and agent design tools share the **same versioned schemas and component registry**.
- **JSON Schema Draft 2020-12** is the adopted schema format; design documents carry explicit versions and migration contracts.
- **JSON Patch RFC 6902** is the approved change representation, with revision-checked, validated, reviewable and reversible proposals.
- A machine-readable component registry describes accepted component types, properties, slots, actions, bindings, accessibility rules and examples.
- Schemas reference named actions and declared data sources, not embedded arbitrary executable JavaScript.
- Agent changes require validation, revision-aware diffs and previews, and **explicit human acceptance before applying**.
- Approval UI is not authorization or execution. The consuming application independently enforces permissions and performs the action.

## Visual baselines and scope

- ERP/back-office workspace, control-plane platform overview and AI workspace reference designs across desktop/tablet/phone were accepted as initial directions.
- Shared component showcase (light/dark), visual designer direction (light/dark/responsive), AI and agent execution direction and operations/control-plane direction were approved as baselines.
- Advanced ERP component collage was created but did **not** receive an explicit standalone signoff before moving forward. Treat it as exploratory until reviewed.
- Baseline approval is approval of the **direction**, not proof of pixel-perfect tokens, complete state or accessibility treatment.

## Open or provisional decisions (not approved as frozen)

- Exact detailed tokens, font loading/distribution implementation, all theme tonal ramps and validated contrast pairs.
- Final third-party dependency choices (React Aria, Lucide, TanStack, Recharts, etc. have been recommended but are not immutable contracts).
- Exact breakpoints, touch target sizes, gesture behavior and all accessible interactions.
- Individual component API details, schema component coverage and migration/registry completeness.
- Packaging boundary and dependency strategy for visual designers, charts and heavy editors.
- Formal validation of responsive layouts, state matrix, actual React package APIs, and npm publication readiness.
