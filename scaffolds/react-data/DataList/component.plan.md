# ui.DataList — contract tracking plan (NOT IMPLEMENTED)

- Catalog ID: `ui.DataList`
- Target package: `react-data`; family: `tables`
- Classification: `public-component`
- Export policy: `named-export-after-implementation`
- Lifecycle status: `scaffolded`
- Implementation milestone: `M4`
- Complexity: `medium`
- Declarative requirement: `required`
- Current evidence: none
- Current implementation package: None
- Baseline design references: `assets/approved-design-snapshot/mockups/01-erp-responsive-baseline.png`, `assets/approved-design-snapshot/mockups/04-advanced-erp-showcase-light-dark.png`
- Candidate dependencies: `ui.Panel`
- Acceptance focus: Accessible data semantics, keyboard navigation, sorting/filtering/editing and large datasets where relevant.
- Direct JSX API: **proposal; define typed props, callbacks, and slots during the owning implementation milestone**
- Declarative JSON subset: **proposal; use the canonical versioned schema, named actions/bindings, and no executable JSON**
- State dimensions: **identify applicable data, interaction, connectivity, freshness, editing, and approval states before implementation**
- Keyboard/ARIA/focus: **define roles, keyboard model, focus ownership, and alternatives to pointer interactions before implementation**
- Themes/density/responsive: light, dark, high contrast, compact, comfortable, and documented narrow-container behavior
- Proposed Storybook scenarios: `default`, `empty`, `loading`, `keyboard-or-editing`
- Risk-targeted tests: propose only when real behavior exists; do not generate placeholder tests
- Release blockers: API review, implementation evidence, scoped verification, and release approval

**NOT a functional component. Do not export, register, or publish it until implementation and gate approval.**
