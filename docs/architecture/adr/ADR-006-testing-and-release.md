# ADR-006 — Verification and coordinated publication
**Status:** Accepted and implemented · **Date:** 2026-10-18

## Decision
Use Storybook with React/Vite for rendered stories, Vitest for units/interactions, axe-assisted a11y testing plus manual WCAG checks, and Playwright for browser responsive/keyboard/e2e smoke. Validate Electron host integration using a separate smoke fixture, without requiring Electron inside the main library build.

Use fixed-group semantic versioning for all publishable packages. The v1 family uses the public, proprietary `@alienfishconsulting/surface-*` namespace and version `1.0.0`; the root workspace and applications remain private.

Packed artifacts are installed into isolated React 18.2 and React 19 consumer fixtures in the release workflow. A separate application repository remains an optional pre-release integration check for production browser or Electron bundling.

## Verification
Storybook demonstrates documented states; CI fails schema drift, type/build/test/a11y failures. Publishing requires explicit human approval and successful full-catalog acceptance. A pushed version tag runs the protected release workflow, uses npm trusted publishing with provenance, and creates a GitHub release from the verified tarballs.
