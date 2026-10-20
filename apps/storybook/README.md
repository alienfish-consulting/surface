# Surface Storybook

The private, non-publishable component explorer for the Surface package family. It collects grouped stories from the React packages and is the browser-test target for catalog coverage, interaction, accessibility, theme, density, responsive, and forced-colors checks.

## Run locally

From the repository root:

```bash
corepack pnpm storybook
```

Storybook is available at `http://localhost:6006` by default. Build the static integration artifact with:

```bash
corepack pnpm build:storybook
```

## Verification

```bash
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```

Stories are development and acceptance assets. They are excluded from public package tarballs.
