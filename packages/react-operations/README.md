# `@alienfishconsulting/surface-react-operations`

React components for operational workflows and control-plane interfaces, including tasks, approvals, deployments, logs, event streams, infrastructure topology, service health, alerts, incidents, and runbooks.

This public package is proprietary and version `1.0.0`; React `^18.2.0 || ^19.0.0` is a peer dependency.

## Usage

```tsx
import '@alienfishconsulting/surface-tokens/theme.css';
import '@alienfishconsulting/surface-react-core/styles.css';
import '@alienfishconsulting/surface-react-data/styles.css';
import '@alienfishconsulting/surface-react-operations/styles.css';
import {ApprovalCard} from '@alienfishconsulting/surface-react-operations';

<ApprovalCard
  approval={approval}
  onDecision={(id, decision, revision) =>
    requestAuthorizedDecision({id, decision, revision})
  }
/>
```

Components expose operational state and emit intentions; they do not deploy software, acknowledge alerts, mutate infrastructure, or approve work by themselves. Hosts must authorize actions against current identity and revision state.

`reduceStream` provides deterministic ordering and deduplication for event-stream state without opening a network connection.

## Development

```bash
corepack pnpm --filter @alienfishconsulting/surface-react-operations typecheck
corepack pnpm exec vitest run tests/operations-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
