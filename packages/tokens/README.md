# `@alienfishconsulting/surface-tokens`

Semantic design tokens shared by every Surface package. The package owns theme, density, contrast, spacing, typography, color, elevation, motion, and layout variables; it does not contain React components.

This public package is proprietary and version `1.0.0`.

## Usage

Load the generated token stylesheet before any component-family stylesheet:

```ts
import '@alienfishconsulting/surface-tokens/theme.css';
import '@alienfishconsulting/surface-react-core/styles.css';
```

Scope supported visual modes on an application or portal root:

```html
<div data-ui-theme="dark" data-ui-density="compact" data-ui-contrast="high">
  <!-- application content -->
</div>
```

- Theme: `light` or `dark`
- Density: `comfortable` or `compact`
- Authored contrast: optional `high`

Detached portal roots must receive the same attributes. Operating-system forced colors are handled separately by component styles.

## Source and generation

Edit `source/design-tokens.json` or the relevant authoring source. `dist/theme.css` is generated and must not be edited directly. It is the only tracked file under `dist/` so a clean clone can verify generated drift before running a build; all other build output remains ignored.

```bash
corepack pnpm generate
corepack pnpm check:generated
corepack pnpm --filter @alienfishconsulting/surface-tokens typecheck
```

See the [consumer guide](../../docs/guides/consumer-guide.md) for stylesheet order and integration guidance.
