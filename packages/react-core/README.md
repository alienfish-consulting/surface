# `@alienfishconsulting/surface-react-core`

Foundational React components for application layout, display, forms, navigation, feedback, and overlays. Specialized component families build on this package.

This public package is proprietary and version `1.0.0`; React `^18.2.0 || ^19.0.0` is a peer dependency.

## Usage

```tsx
import '@alienfishconsulting/surface-tokens/theme.css';
import '@alienfishconsulting/surface-react-core/styles.css';
import {Button, Panel, Stack, TextField} from '@alienfishconsulting/surface-react-core';

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
corepack pnpm --filter @alienfishconsulting/surface-react-core typecheck
corepack pnpm exec vitest run tests/renderer.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
