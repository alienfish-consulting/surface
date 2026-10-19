# `@enterprise-ui/react-core`

Foundational React components for application layout, display, forms, navigation, feedback, and overlays. Specialized component families build on this package.

This package is private and version `0.0.0`; React 19 is a peer dependency.

## Usage

```tsx
import '@enterprise-ui/tokens/theme.css';
import '@enterprise-ui/react-core/styles.css';
import {Button, Panel, Stack, TextField} from '@enterprise-ui/react-core';

export function AccountPanel() {
  return (
    <Panel title="Account">
      <Stack>
        <TextField label="Display name" />
        <Button label="Save" onPress={() => requestSave()} />
      </Stack>
    </Panel>
  );
}
```

Callbacks report UI intentions. The consuming application owns authorization, persistence, navigation, networking, and other effects.

## Component areas

- Application and workspace layout
- Typography, badges, status, icons, and data display
- Form controls and grouped inputs
- Dialogs, drawers, menus, notifications, tabs, trees, and progress feedback

Browse the grouped core stories in `src/stories/` for supported states and compositions.

## Development

```bash
corepack pnpm --filter @enterprise-ui/react-core typecheck
corepack pnpm exec vitest run tests/renderer.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
