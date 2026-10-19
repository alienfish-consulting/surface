# ui.KpiCard — contract tracking plan (IMPLEMENTED POC; PRODUCTION VERIFICATION PENDING)

- Catalog ID: `ui.KpiCard`
- Target package: `react-data`; family: `data-viz`
- Classification: `public-component`
- Export policy: `named-export-after-implementation`
- Lifecycle status: `implemented`
- Implementation milestone: `M4`
- Complexity: `medium`
- Declarative requirement: `required`
- Current evidence: POC source, M1 Storybook story, and M1 scoped verification
- Current implementation package: `react-core (temporary POC location; catalog target remains react-data)`
- Baseline design references: `assets/approved-design-snapshot/mockups/04-advanced-erp-showcase-light-dark.png`, `assets/approved-design-snapshot/mockups/01-erp-responsive-baseline.png`
- Candidate dependencies: `ui.Panel`
- Acceptance focus: Useful accessible textual alternatives, time-zone semantics, data refresh and presentation states.
- Direct JSX API: **proposal; define typed props, callbacks, and slots during the owning implementation milestone**
- Declarative JSON subset: **proposal; use the canonical versioned schema, named actions/bindings, and no executable JSON**
- State dimensions: **identify applicable data, interaction, connectivity, freshness, editing, and approval states before implementation**
- Keyboard/ARIA/focus: **define roles, keyboard model, focus ownership, and alternatives to pointer interactions before implementation**
- Themes/density/responsive: light, dark, high contrast, compact, comfortable, and documented narrow-container behavior
- Proposed Storybook scenarios: `default`, `empty`, `narrow-or-dense`
- Risk-targeted tests: propose only when real behavior exists; do not generate placeholder tests
- Release blockers: API review, implementation evidence, scoped verification, and release approval

**Existing POC implementation only. This scaffold does not broaden its API, package exports, or production-readiness claim.**
