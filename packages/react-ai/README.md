# `@enterprise-ui/react-ai`

Provider-neutral React components for conversations, messages, agents, tool activity, approvals, artifacts, prompts, model selection, token usage, and run-state inspection.

This package is private and version `0.0.0`; React 19 is a peer dependency.

## Usage

```tsx
import '@enterprise-ui/tokens/theme.css';
import '@enterprise-ui/react-core/styles.css';
import '@enterprise-ui/react-data/styles.css';
import '@enterprise-ui/react-operations/styles.css';
import '@enterprise-ui/react-ai/styles.css';
import {ApprovalReview} from '@enterprise-ui/react-ai';

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
corepack pnpm --filter @enterprise-ui/react-ai typecheck
corepack pnpm exec vitest run tests/ai-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
