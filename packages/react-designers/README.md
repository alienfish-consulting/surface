# `@enterprise-ui/react-designers`

Visual authoring surfaces for the same versioned design-document contract used by the declarative renderer. The package includes shared designer shells, property and binding editors, history helpers, review panels, and form, dashboard, workflow, query, and schema specialists.

This package is private and version `0.0.0`; React 19 is a peer dependency.

## Usage

```tsx
import '@enterprise-ui/tokens/theme.css';
import '@enterprise-ui/react-core/styles.css';
import '@enterprise-ui/react-data/styles.css';
import '@enterprise-ui/react-designers/styles.css';
import {PropertyInspector} from '@enterprise-ui/react-designers';

<PropertyInspector
  document={document}
  onPropose={proposal => openReview(proposal)}
/>
```

Designers create revision-guarded proposals; they do not mutate the authoritative document or bypass host approval. There is no designer-specific persistence format.

## Development

```bash
corepack pnpm --filter @enterprise-ui/react-designers typecheck
corepack pnpm exec vitest run tests/designer-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```

See the [declarative UI guide](../../docs/agents/declarative-ui.md) before changing document, proposal, binding, or action behavior.
