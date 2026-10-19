# ui.ApprovalCard — contract tracking plan (NOT IMPLEMENTED)

- Catalog ID: `ui.ApprovalCard`
- Target package: `react-operations`; family: `workflows`
- Classification: `public-component`
- Export policy: `named-export-after-implementation`
- Lifecycle status: `scaffolded`
- Implementation milestone: `M5`
- Complexity: `medium`
- Declarative requirement: `required`
- Current evidence: none
- Current implementation package: None
- Baseline design references: `assets/approved-design-snapshot/mockups/11-operations-control-plane-showcase.png`
- Candidate dependencies: `ui.Panel`, `ui.StatusIndicator`
- Acceptance focus: Typed intentions, keyboard interactions, host-owned persistence and reviewable state transitions.
- Direct JSX API: **proposal; define typed props, callbacks, and slots during the owning implementation milestone**
- Declarative JSON subset: **proposal; use the canonical versioned schema, named actions/bindings, and no executable JSON**
- State dimensions: **identify applicable data, interaction, connectivity, freshness, editing, and approval states before implementation**
- Keyboard/ARIA/focus: **define roles, keyboard model, focus ownership, and alternatives to pointer interactions before implementation**
- Themes/density/responsive: light, dark, high contrast, compact, comfortable, and documented narrow-container behavior
- Proposed Storybook scenarios: `default`, `pending`, `rejected-or-disabled`
- Risk-targeted tests: propose only when real behavior exists; do not generate placeholder tests
- Release blockers: API review, implementation evidence, scoped verification, and release approval

**NOT a functional component. Do not export, register, or publish it until implementation and gate approval.**
