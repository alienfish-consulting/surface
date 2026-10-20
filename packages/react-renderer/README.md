# `@alienfishconsulting/surface-react-renderer`

The fail-closed React runtime for validated Surface design documents. It maps registered `ui.*` component types to explicit adapters and connects bindings and named action intentions to an application-owned host.

This public package is proprietary and version `1.0.0`; React `^18.2.0 || ^19.0.0` is a peer dependency.

## Usage

```tsx
import {assertDesignDocument} from '@alienfishconsulting/surface-contracts';
import {DesignRenderer} from '@alienfishconsulting/surface-react-renderer';

const document = assertDesignDocument(input);

<DesignRenderer
  doc={document}
  host={{
    data: applicationData,
    requestAction: request => authorizeAndDispatch(request),
  }}
/>
```

Consumers must load token CSS followed by the stylesheets for every component family used by the active registry.

## Boundary

- Validate untrusted documents before rendering.
- Adapter registration is explicit; unknown or unimplemented types fail closed.
- Bindings read host-provided data through declared sources and pointers.
- Named intentions never grant authority. The host validates identity, permissions, payloads, and current application state before performing effects.

## Development

```bash
corepack pnpm --filter @alienfishconsulting/surface-react-renderer typecheck
corepack pnpm exec vitest run tests/renderer.test.tsx tests/contracts.test.ts
corepack pnpm check:generated
corepack pnpm validate
```
