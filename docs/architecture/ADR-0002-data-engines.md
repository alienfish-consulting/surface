# ADR-0002: bounded data engines for v1

Status: accepted for M4 implementation

## Context

The accepted M4 catalog includes grids, pivoting, charts, scheduling, Gantt, query composition, and inspectors. A single large dependency would not cover these families uniformly, and choosing several engines now would lock public APIs, styling, accessibility behavior, and bundle costs before representative contracts exist.

The local POC requires browser/Electron parity, accessible keyboard behavior, deterministic fixtures, responsive presentation, and host-owned querying/persistence. It does not require remote services or unrestricted 100k-row client processing.

## Decision

Implement bounded, typed React components using platform table, SVG, form, and disclosure semantics. Keep engine-specific logic behind the package components and declarative adapters. Add no M4 runtime dependency.

Supported M4 ranges are intentionally explicit:

- DataGrid/DataTable: client presentation for up to 10,000 supplied records when windowing is enabled; sorting/filtering/editing remain host intentions unless local behavior is explicitly selected.
- TreeGrid/PivotTable: deterministic supplied hierarchies/aggregates; no embedded OLAP/query engine.
- Chart/Sparkline/Heatmap/Gantt: SVG presentation for bounded series; no canvas/WebGL or freeform drag engine.
- Calendar/Scheduler/Timeline: supplied events and keyboard-addressable actions; timezone conversion and recurrence expansion are host concerns.
- Code/JSON/Diff viewers: safe text rendering only; no code execution and no editor language service.

## Alternatives reviewed

- AG Grid or equivalent full grid: strongest breadth, but adds commercial-feature ambiguity, significant API surface, styling constraints, and duplicated host-query concerns.
- TanStack Table/Virtual: useful headless seams with lower lock-in, but introduces a dependency before the accepted column/action contracts are verified. It remains the preferred future table candidate if M4 performance evidence exceeds the bounded implementation.
- Recharts, Visx, or ECharts: capable chart systems, but each imposes a rendering/accessibility/API model before the chart contract is stable. A later adapter can replace the internal SVG renderer without changing serialized documents.
- dnd-kit or a scheduling/Gantt engine: appropriate only after pointer rearrangement, collision, recurrence, or dependency-path editing enters approved scope. M4 supplies keyboard/action alternatives first.

## Consequences

The initial implementation is smaller, local, auditable, and consistent with shared tokens. It does not claim parity with specialist products. Performance fixtures and user-approved requirements may trigger a follow-up ADR selecting a table, visualization, or drag engine. Persisted documents remain engine-neutral.
