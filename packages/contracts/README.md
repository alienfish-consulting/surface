# `@alienfishconsulting/surface-contracts`

The versioned, non-React contract for declarative Surface documents. It provides JSON Schema-backed validation, component registries, bindings, named action intentions, safe JSON-pointer reads, and guarded RFC 6902 proposals.

This public package is proprietary and version `1.0.0`.

## Usage

Validate untrusted data before rendering or editing it:

```ts
import {assertDesignDocument, previewProposal} from '@alienfishconsulting/surface-contracts';

const document = assertDesignDocument(input);
const preview = previewProposal(document, proposedChange);
```

`assertDesignDocument` validates the document shape, exact registry version, component props, child relationships, bindings, actions, depth, size, and node limits. `previewProposal` returns a validated candidate; it does not persist or authorize the change.

## Boundary

- Documents contain JSON-safe data, bindings, and named intentions only.
- Documents never contain executable JavaScript, React nodes, host permissions, Electron channels, or credentials.
- Applications authorize and perform every side effect.
- Generated schemas, registries, and serialized prop types are derived artifacts; edit their source inputs instead.

## Development

```bash
corepack pnpm check:generated
corepack pnpm validate
corepack pnpm exec vitest run tests/contracts.test.ts
corepack pnpm --filter @alienfishconsulting/surface-contracts typecheck
```

See [declarative UI guidance](../../docs/agents/declarative-ui.md) and the [architecture documentation](../../docs/architecture/README.md).
