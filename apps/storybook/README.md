# Enterprise UI Storybook

Private component-development application for the implemented Enterprise UI catalog.

M1 documents only the five existing POC components: `AppShell`, `Panel`, `Button`, `TextField`, and `KpiCard`. Planned catalog entries must not receive stories until they have meaningful implementations.

The toolbar exposes light, dark, high-contrast inspection, compact density, and comfortable density. The high-contrast option is an implementation inspection mode, not a WCAG certification. Forced-colors and assistive-technology verification remain later approved work.

From the repository root, the intended commands are:

```sh
corepack pnpm storybook
corepack pnpm build:storybook
```

Both commands generate the local token CSS first. Neither command is part of install or the root `check` script.
