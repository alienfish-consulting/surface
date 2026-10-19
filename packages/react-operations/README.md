# `@enterprise-ui/react-operations`

React components for operational workflows and control-plane interfaces, including tasks, approvals, deployments, logs, event streams, infrastructure topology, service health, alerts, incidents, and runbooks.

This package is private and version `0.0.0`; React 19 is a peer dependency.

## Usage

```tsx
import '@enterprise-ui/tokens/theme.css';
import '@enterprise-ui/react-core/styles.css';
import '@enterprise-ui/react-data/styles.css';
import '@enterprise-ui/react-operations/styles.css';
import {ApprovalCard} from '@enterprise-ui/react-operations';

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
corepack pnpm --filter @enterprise-ui/react-operations typecheck
corepack pnpm exec vitest run tests/operations-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
