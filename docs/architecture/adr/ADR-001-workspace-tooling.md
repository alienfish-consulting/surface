# ADR-001 — Workspace and build orchestration
**Status:** Accepted and implemented · **Date:** 2026-10-18

## Decision
Adopt a **pnpm workspace** for package linking/catalog versions plus **Nx (minimal)** for task DAG, affected builds, caching and eventual fixed-group releases. Build publishable packages with a library build pipeline compatible with ESM, generated `.d.ts` files and explicit package exports. Use the current Node LTS line (**Node 24 as of 2026-10-18**) for repo tooling; upgrade as new releases reach LTS and dependencies qualify. Pin reproducible package-manager and tool versions when bootstrapping.

## Why
The approved v1 has many cross-dependent React and non-React packages that must eventually be released as a coordinated set. Nx provides project graph and repeatable tasks, while pnpm catalog references avoid version drift. Avoid Nx-specific feature complexity beyond task orchestration initially; no requirement for Nx Cloud.

## Alternatives
- Bare pnpm: simpler, but project-graph build ordering, affected builds, and release controls would need separate coordination.
- Turborepo: viable but not obviously better given planned Nx release groups and schema-codegen task graph.

## Verification
`pnpm install --frozen-lockfile`; run `nx graph`; root remains private/non-publishable; independent package builds and `exports` resolve from an isolated consumer fixture. CI doesn't publish anything.
