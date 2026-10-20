# Enterprise UI design system — Foundations v0.1

A **design-only, pre-implementation** handoff bundle for the planned modular React/TypeScript/npm library supporting ERP/back-office, SaaS control-plane, AI/agent workspaces and Electron/browser hosts.

## Files

- `FOUNDATIONS.md` — accepted principles, candidate design tokens, accessibility and responsive design contract.
- `COMPONENT-CONTRACTS.md` — initial core component specification/acceptance matrix.
- `design-tokens.json` — initial **DTCG 2025.10-style** authoring tokens; values are provisional.
- `ui-tokens.css` — illustrative CSS variable export and a specimen component class (not production styling).
- `references/erp-workspace.png` — the first approved ERP desktop/tablet/phone mockup.
- `references/control-plane-ai-workspaces.png` — the approved control-plane and AI workspace mockup composite.

## Current status

The direction and broad architecture have been approved. Exact design measurements, light/dark component renderings, high-contrast theme and component behavior are **not yet approved as final**. Do not assume the generated image's sample text, figures, logo or details are functional requirements.

**Do not publish to npm yet.** Full initial library completion and coordinated release were explicitly required. External consumer-repository validation is a **human release policy**, not a CI-repository dependency.

## Source of truth

The design-token JSON is the **authoring-time token source**. The namespaced CSS custom properties are the **consumer runtime styling contract**. An eventual build process should generate CSS from source tokens; this snapshot shows the intended shape without implementing the build infrastructure.

## Proposed next design action

Create a light/dark foundation sheet at desktop and phone sizes with side-by-side states for buttons, fields, tabs, menus, panels, statuses, and DataGrid headers; confirm density and color against the approved application references before coding components.
