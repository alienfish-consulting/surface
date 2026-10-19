# ui.PromptVersionDiff — contract tracking plan (NOT IMPLEMENTED)

- Catalog ID: `ui.PromptVersionDiff`
- Target package: `react-ai`; family: `agent-execution`
- Classification: `public-component`
- Export policy: `named-export-after-implementation`
- Lifecycle status: `scaffolded`
- Implementation milestone: `M6`
- Complexity: `medium`
- Declarative requirement: `required`
- Current evidence: none
- Current implementation package: None
- Baseline design references: `assets/approved-design-snapshot/mockups/08-ai-agent-execution-detailed.png`, `assets/approved-design-snapshot/mockups/09-ai-agent-execution-responsive.png`
- Candidate dependencies: `ui.Panel`, `ui.Button`
- Acceptance focus: Inspectability and human review separated from host authorization/execution.
- Direct JSX API: **proposal; define typed props, callbacks, and slots during the owning implementation milestone**
- Declarative JSON subset: **proposal; use the canonical versioned schema, named actions/bindings, and no executable JSON**
- State dimensions: **identify applicable data, interaction, connectivity, freshness, editing, and approval states before implementation**
- Keyboard/ARIA/focus: **define roles, keyboard model, focus ownership, and alternatives to pointer interactions before implementation**
- Themes/density/responsive: light, dark, high contrast, compact, comfortable, and documented narrow-container behavior
- Proposed Storybook scenarios: `default`, `running-or-pending`, `failure-or-denied`
- Risk-targeted tests: propose only when real behavior exists; do not generate placeholder tests
- Release blockers: API review, implementation evidence, scoped verification, and release approval

**NOT a functional component. Do not export, register, or publish it until implementation and gate approval.**
