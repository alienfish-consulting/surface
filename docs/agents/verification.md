# Verification strategy

Choose checks by risk. Start focused for fast feedback; broaden when a change crosses packages, contracts, tooling, generated output, or public APIs.

## Focused checks

```bash
# One package typecheck
corepack pnpm --filter @enterprise-ui/react-core typecheck

# One or more Vitest files
corepack pnpm exec vitest run tests/contracts.test.ts tests/renderer.test.tsx

# Generator drift, catalog integrity, and Storybook coverage
corepack pnpm check:generated
corepack pnpm check:catalog
corepack pnpm check:stories

# Browser smoke (starts the Design Lab through Playwright configuration)
corepack pnpm test:e2e:smoke

# Complete Storybook catalog mount/a11y scan and focused three-engine interactions
corepack pnpm test:e2e:storybook

# A selected browser/spec
corepack pnpm exec playwright test tests/e2e/foundational-core.spec.ts --project=chromium
```

Select the actual owning package and tests. Do not use a passing typecheck as evidence for keyboard, focus, layout, or runtime behavior.

## Broad checks

```bash
# Generated/catalog/story drift, schema validation, all typechecks, Vitest, and workspace builds
corepack pnpm check

# Static Storybook integration
corepack pnpm build:storybook

# Complete Design Lab and Storybook suites in Chromium, Firefox, and WebKit
corepack pnpm test:e2e
```

The full browser suite requires installed Playwright browsers. Installing browsers changes the local tool cache and may download large binaries; do it only when it is in task scope.

## Evidence mapping

| Change | Minimum useful evidence |
| --- | --- |
| Documentation only | Link/path scan and manual content review |
| Component props/logic | Owning typecheck, focused Vitest, and Storybook coverage check |
| Component CSS | Owning build/typecheck, story review, relevant browser check |
| Focus, keyboard, responsive, forced-colors behavior | Relevant Playwright spec in affected engines |
| Schema, registry, bindings, proposals | Generation drift, validation, contracts and renderer tests |
| Public export or package manifest | Package build plus package-export tests |
| Tokens or shared cross-package contract | Generation checks and affected/full workspace checks |
| Electron bridge | Bridge tests, package typecheck, browser fallback and denied-path evidence |
| Release-wide change | `pnpm check`, Storybook build, full Playwright suite, release ledger review |

Automated accessibility checks find important classes of defects but do not establish WCAG conformance. Release claims still require the manual assistive-technology checks documented in the acceptance matrix.
