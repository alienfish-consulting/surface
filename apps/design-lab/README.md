# Surface Design Lab

The Design Lab is the integrated browser application for Surface. It presents
the framework as a realistic single-page operations dashboard while retaining
the contract, renderer, designer, authorization, accessibility, and interaction
scenarios used during repository development.

## What it demonstrates

- A responsive application shell with persistent desktop side navigation and a
  compact mobile navigation drawer
- Business metrics, a revenue trend, recent activity, customer filtering and
  sorting, service health, deployment state, and explicit approvals
- Light and dark themes plus comfortable and compact density
- Direct React composition and validated JSON rendering in one application
- Application-owned action authorization and an inert browser fallback for
  optional desktop capabilities
- Guarded design proposals with rejection, stale-revision detection, preview,
  and host-authorized commit
- Keyboard behavior, responsive containment, forced-colors handling, and
  automated accessibility coverage

All data is local fixture data. Dashboard controls demonstrate intentions and
state transitions; they do not call a backend, deploy software, modify customer
records, or invoke native desktop capabilities.

## Run locally

From the repository root:

```bash
corepack pnpm dev
```

Open `http://localhost:5173`.

The application can also be started directly:

```bash
corepack pnpm --filter @alienfishconsulting/surface-design-lab dev
```

## Implementation map

- `src/app.tsx` owns the single-page dashboard composition and local state.
- `src/styles.css` owns the application-specific responsive layout and visual
  treatment; reusable component styling remains in the framework packages.
- `packages/contracts/fixtures/vertical-slice.design.json` supplies the
  validated declarative region.
- `tests/e2e/smoke/design-lab.spec.ts` covers dashboard behavior and guarded
  proposals.
- `tests/e2e/accessibility-and-responsive.spec.ts` covers accessibility,
  responsive containment, mobile navigation, and forced colors.
- `tests/e2e/foundational-core.spec.ts` covers keyboard interaction, dialog
  focus, and dock-panel behavior.

## Boundaries

The direct dashboard shell is application code. Persisted UI continues to use
the versioned design contract, and the host still owns authorization and side
effects. Browser-capable code does not import Electron or Node runtime APIs.
