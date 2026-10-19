# M9 full v1 acceptance and release-readiness gate report

## Outcome

The local v1 implementation is technically release-ready subject to the documented human release steps and identity decisions. All 198 accepted catalog units are verified: registry 1.6.0 contains 190 serialized schemas with runtime adapters, and 8 direct-React exceptions are named and justified. No remote, publication, license or cloud action was taken.

## Completed work

- Froze the accepted inventory and added release-ledger assertions for count, uniqueness, lifecycle, adapters and exceptions.
- Added three-engine automated accessibility scans for light/comfortable, dark/compact and authored high-contrast modes.
- Added three-engine narrow responsive/focus checks and Chromium forced-colors coverage.
- Added Firefox and WebKit Playwright projects and installed their local test runtimes.
- Reviewed grouped Storybook ownership, package exports, browser/desktop boundaries, large-grid/event-stream evidence and dependency licenses.
- Replaced bootstrap-era verification/next-step notes with current acceptance and explicit user-decision documents.

## Accessibility fixes discovered during acceptance

- Removed an incomplete explicit `combobox` role from the native datalist input; native semantics no longer require fabricated `aria-expanded` or `aria-controls` state.
- Raised the revision badge foreground contrast.
- Replaced platform highlight keywords in the authored high-contrast palette with stable high-contrast colors. Operating-system forced colors remain covered separately.
- Initial axe runs consistently exposed these issues across engines. Focused reruns passed after the fixes, followed by the complete matrix.

## Final verification

- `pnpm check` — PASS:
  - generated drift and Draft 2020-12 fixture validation;
  - typecheck for 11 workspace projects and their dependency builds;
  - 9 Vitest files, 45 tests;
  - production builds for 10 projects, including the browser Design Lab.
- `pnpm build:storybook` — PASS; all 16 story files discovered. Existing Vite large-chunk advisories only.
- `pnpm exec playwright test` — PASS; 16 executed tests across Chromium, Firefox and WebKit. Two forced-colors cases were intentionally skipped outside Chromium; authored high-contrast axe scans ran and passed in all three engines.
- `pnpm check:catalog` — PASS; 795 tracking artifacts, 198 verified, 0 scaffolded, 0 merely implemented and 0 released.
- Dependency review — production dependencies are MIT/BSD-3-Clause; development-only licenses and notice implications are recorded in the acceptance matrix.

## Advisories and manual release steps

- The complete renderer/Design Lab and Storybook bundles produce Vite chunks above 500 kB. This is documented, not a functional failure; direct family imports remain the intended narrow-consumer path. A consumer bundle budget should be set after final packaging decisions.
- Nx reported cached token tasks as potentially flaky even though all invocations passed. No Nx Cloud or remote cache was enabled.
- Manual VoiceOver plus one Windows screen-reader spot check remains required before public release.
- A separate-repository packed-package install remains a manual release step after names, versions and package contents are decided.
- Final repository identity, npm scope/package names, project license and coordinated version require user decisions.

## Gate disposition

Standing authorization covers the final bounded tests and local commit. The implementation handoff is complete after this report is committed. Release acceptance, remote creation/push and npm publication remain separate user decisions; nothing is released by this milestone.
