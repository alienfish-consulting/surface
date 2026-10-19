# `@enterprise-ui/react-renderer`

The fail-closed React runtime for validated Surface design documents. It maps registered `ui.*` component types to explicit adapters and connects bindings and named action intentions to an application-owned host.

This package is private and version `0.0.0`; React 19 is a peer dependency.

## Usage

```tsx
import {assertDesignDocument} from '@enterprise-ui/contracts';
import {DesignRenderer} from '@enterprise-ui/react-renderer';

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
corepack pnpm --filter @enterprise-ui/react-renderer typecheck
corepack pnpm exec vitest run tests/renderer.test.tsx tests/contracts.test.ts
corepack pnpm check:generated
corepack pnpm validate
```
