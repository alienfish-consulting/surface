# `@alienfishconsulting/surface-react-ai`

Provider-neutral React components for conversations, messages, agents, tool activity, approvals, artifacts, prompts, model selection, token usage, and run-state inspection.

This public package is proprietary and version `1.0.0`; React `^18.2.0 || ^19.0.0` is a peer dependency.

## Usage

```tsx
import '@alienfishconsulting/surface-tokens/theme.css';
import '@alienfishconsulting/surface-react-core/styles.css';
import '@alienfishconsulting/surface-react-data/styles.css';
import '@alienfishconsulting/surface-react-operations/styles.css';
import '@alienfishconsulting/surface-react-ai/styles.css';
import {ApprovalReview} from '@alienfishconsulting/surface-react-ai';

<ApprovalReview
  title="Apply proposed change"
  summary="Review the bounded proposal before authorizing it."
  onApprove={() => requestHostApproval()}
  onDeny={() => rejectProposal()}
/>
```

The package does not call model providers, execute tools, grant permissions, or apply proposals. Components display state and emit intentions to an application-owned host boundary.

## Component areas

- Conversation lists, threads, messages, composers, attachments, and citations
- Agent rosters, activity, tasks, multi-agent timelines, and run steps
- Tool calls/results, approvals, artifacts, context, prompts, models, and usage

## Development

```bash
corepack pnpm --filter @alienfishconsulting/surface-react-ai typecheck
corepack pnpm exec vitest run tests/ai-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
