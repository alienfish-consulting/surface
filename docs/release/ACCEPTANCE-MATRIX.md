# V1 acceptance matrix

This is the release-readiness ledger, not publication authorization.

| Area | Evidence | Status before final run |
| --- | --- | --- |
| Accepted inventory | `catalog/components.v1.json`; 198 unique verified units | ready |
| Serializable coverage | registry 1.6.0; 190 schemas and renderer adapters | ready |
| JSX-only exceptions | 8 named exceptions in the generated contract bundle | ready |
| Component behavior | focused Vitest suites for contracts, core renderer, data, operations, AI, designers and desktop boundary | ready |
| Component states/docs | 16 Storybook files covering core, data, operations, AI and designer families | ready |
| Themes/density | Storybook globals plus automated light/comfortable and dark/compact axe scans | ready |
| High contrast/forced colors | authored high-contrast axe scan in three engines; Chromium forced-colors focus smoke | ready |
| Responsive behavior | 390 × 844 overflow/focus smoke in Chromium, Firefox and WebKit | ready |
| Keyboard/focus | foundational combo, dialog focus return, dock toggles and narrow-layout focus tests | ready |
| Large data/events | bounded 10,000-row grid render and ordered/deduplicated stream reducer tests | ready |
| Browser consumability | Vite Design Lab build and Playwright shards in Chromium, Firefox and WebKit | ready |
| Desktop boundary | no Electron runtime dependency; allowlisted typed bridge and browser fallback tests | ready |
| Package exports | nine ESM/type export manifests and full workspace package builds | ready |
| Schema drift | generated artifact and catalog checks | ready |
| Dependency licenses | production: MIT and BSD-3-Clause; full development tree enumerated by pnpm | reviewed |
| Manual screen reader | documented spot-check plan; not represented as automated certification | manual release step |
| Separate-repository install | retained as manual release policy after final package identity/version decisions | manual release step |

## Story and contract ownership

| Family | Catalog units | Story groups | Contract/runtime evidence |
| --- | ---: | --- | --- |
| Core | 85 | layout, display, forms, overlays and focused POC stories | schemas, core adapters, renderer/core tests |
| Data | 33 | tables, visualizations and inspectors | schemas, data adapters, bounded-grid/visualization tests |
| Operations | 25 | workflow and control-plane catalogs | schemas, operations adapters, stream/approval/topology tests |
| AI | 27 | conversation and agent catalogs | schemas, AI adapters, approval/safe-output tests |
| Designers | 28 | shared-shell and specialist catalog | 26 schemas/adapters, 2 JSX exceptions, proposal/history tests |

Grouped stories intentionally demonstrate coherent parent/subcomponent behavior. They are not inflated into 198 near-identical placeholder stories.

## Manual assistive-technology plan

Before a public release, a human should spot-check VoiceOver/Safari and one Windows screen reader/browser pairing: landmarks and headings, form names/descriptions/errors, dialog announcement and focus return, data-grid headers and sort state, live event updates, approval status, and designer selection/validation. Record product/version and findings in the release record. Automated axe and accessibility-tree checks do not replace this step.

## Dependency license review

`pnpm licenses list --prod` reports production dependencies under MIT and BSD-3-Clause. The development tree also contains Apache-2.0, BSD-2-Clause, Python-2.0, MPL-2.0 (`axe-core`), CC-BY-4.0 (`caniuse-lite` data), ISC, BlueOak-1.0.0 and 0BSD. No project license is inferred from dependency licenses. Generate final third-party notices only after the user chooses the project license and package contents.
