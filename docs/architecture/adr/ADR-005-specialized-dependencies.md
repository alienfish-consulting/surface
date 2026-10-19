# ADR-005 — Specialized UI engines behind package boundaries
**Status:** Proposed · **Date:** 2026-10-18

## Decision
Adopt TanStack Table + TanStack Virtual as the **initial candidate engines** for advanced grid row/column models and virtualization, with our own styled renderers, keyboard grid/focus/edit behavior, responsive transformations and stable row IDs. TanStack Table does not itself include virtualization; TanStack Virtual handles viewport indices/measurements. Do not mistake either for a complete accessible enterprise DataGrid.

Isolate any charting, topology layout, drag/drop, code editing and docking engines inside specialized packages. Keep libraries such as Recharts, layout engines and DnD frameworks **provisional** until their corresponding vertical slice proves accessibility, bundle constraints and capability coverage. No required LLM SDK or host transport.

## Verification
Grid performance fixtures for small/large data, dynamic row heights, keyboard navigation, container-constrained responsive list fallback. Ensure chart and diagram dependencies do not appear in core browser bundles. Pick engines only after documented capability/size/accessibility tests.
