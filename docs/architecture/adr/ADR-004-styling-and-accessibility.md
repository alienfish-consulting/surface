# ADR-004 — Styling and accessibility implementation
**Status:** Partially superseded by the v1 implementation · **Date:** 2026-10-18

The plain-CSS, token, accessibility, and browser/Electron parity decisions were implemented. The v1 packages use bounded native/platform semantics rather than taking a React Aria runtime dependency.

## Decision
Use plain CSS with scoped tokens and cascade layers, styled enterprise components, Inter/IBM Plex Mono with consumer-configurable loading, and accessible React Aria Components/hooks for appropriate primitive behaviors. React Aria provides unstyled accessible behaviors, not the public design-system visual identity; we supply styles and tested APIs. Keep a small stable public CSS customization surface via variables, parts/classes, and state attributes. Browser and Electron share the same visual implementation.

Do **not** introduce mandatory Tailwind, CSS-in-JS, proprietary icon fonts, or raster component imagery.

## Alternatives
Radix and fully bespoke accessible primitives are possible; React Aria's broad internationalization and keyboard/input modality coverage is a strong initial basis. Do not force complex DataGrid/TreeGrid into React Aria if it cannot meet the required behaviors—evaluate fit at implementation.

## Verification
Render across theme/density/forced-colors/RTL/zoom with keyboard and screen reader testing. Validate component overlay portals inherit scoped theming and focus management. WCAG 2.2 AA is the target, but automation does not prove full compliance.
