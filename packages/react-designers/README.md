# `@alienfishconsulting/surface-react-designers`

Visual authoring surfaces for the same versioned design-document contract used by the declarative renderer. The package includes shared designer shells, property and binding editors, history helpers, review panels, and form, dashboard, workflow, query, and schema specialists.

This public package is proprietary and version `1.0.0`; React `^18.2.0 || ^19.0.0` is a peer dependency.

## Usage

```tsx
import '@alienfishconsulting/surface-tokens/theme.css';
import '@alienfishconsulting/surface-react-core/styles.css';
import '@alienfishconsulting/surface-react-data/styles.css';
import '@alienfishconsulting/surface-react-designers/styles.css';
import {PropertyInspector} from '@alienfishconsulting/surface-react-designers';

<PropertyInspector
  document={document}
  onPropose={proposal => openReview(proposal)}
/>
```

Designers create revision-guarded proposals; they do not mutate the authoritative document or bypass host approval. There is no designer-specific persistence format.

## Development

```bash
corepack pnpm --filter @alienfishconsulting/surface-react-designers typecheck
corepack pnpm exec vitest run tests/designer-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```

See the [declarative UI guide](../../docs/agents/declarative-ui.md) before changing document, proposal, binding, or action behavior.
