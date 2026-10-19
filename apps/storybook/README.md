# Enterprise UI Storybook

Private component-development application for the implemented Enterprise UI catalog.

Stories document the implemented 198-unit v1 catalog through focused individual and grouped family scenarios. Grouped stories cover related subcomponents without pretending each internal or parent-owned unit is an independent product surface.

The toolbar exposes light, dark, high-contrast inspection, compact density, and comfortable density. Viewport controls exercise responsive layouts. High contrast is an implementation inspection mode, not WCAG or assistive-technology certification; final forced-colors, keyboard and screen-reader spot checks belong to the M9 acceptance matrix.

From the repository root, the intended commands are:

```sh
corepack pnpm storybook
corepack pnpm build:storybook
```

Both commands generate the local token CSS first. Neither command is part of install or the root `check` script.
