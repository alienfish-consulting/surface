# Architecture

This directory describes the implemented architecture and retains the decision records that shaped it.

- [`ARCHITECTURE.md`](ARCHITECTURE.md) is the current system view.
- [`adr/`](adr/ADR-001-workspace-tooling.md) records major decisions and their original tradeoffs.

The repository completed its M0–M9 implementation milestones. Older first-slice plans and deferred-decision lists now live under [`docs/history/bootstrap/architecture/`](../history/bootstrap/architecture/) because they are provenance, not present-tense guidance.

When an older ADR says “proposed,” read it as decision history and verify the implemented state in `ARCHITECTURE.md`, package manifests, source, and tests. In particular, ADR-008 supersedes the provisional engine preference in ADR-005: v1 uses bounded platform implementations and keeps future engines behind package boundaries.
