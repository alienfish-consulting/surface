# ADR-006 — Verification and coordinated publication
**Status:** Proposed · **Date:** 2026-10-18

## Decision
Use Storybook with React/Vite for rendered stories, Vitest for units/interactions, axe-assisted a11y testing plus manual WCAG checks, and Playwright for browser responsive/keyboard/e2e smoke. Validate Electron host integration using a separate smoke fixture, without requiring Electron inside the main library build.

Use Nx release **fixed-group versioning** for *publishable* packages in the eventual coordinated v1 release. Until all accepted M1–M8 capabilities are done, CI may build artifacts/test private local packages but must not publish npm packages or create a public partial release.

External consumer repository validation remains a documented pre-release policy and manual checklist—never a hardwired dependency in repo CI. The documentation, demos and schema examples are internal development assets until the release gate is met.

## Verification
Storybook can demonstrate documented states; CI fails schema drift, type/build/test/a11y failures. Publishing requires explicit human approval and successful full-catalog acceptance. No automated publish secrets or npm workflow needed in the first thin slice.
