# `@enterprise-ui/react-data`

React components for data-heavy application surfaces: tables and grids, query and sort builders, charts and metrics, schedules and timelines, and structured-data inspectors.

This package is private and version `0.0.0`; React 19 is a peer dependency.

## Usage

```tsx
import '@enterprise-ui/tokens/theme.css';
import '@enterprise-ui/react-core/styles.css';
import '@enterprise-ui/react-data/styles.css';
import {DataGrid} from '@enterprise-ui/react-data';

<DataGrid
  title="Accounts"
  columns={[{key: 'name', label: 'Name', sortable: true}]}
  rows={[{id: 'acme', name: 'Acme'}]}
/>
```

## Component areas

- Data grids, tables, lists, tree grids, pivots, filtering, sorting, and saved views
- Charts, sparklines, KPIs, statistics, heatmaps, and legends
- Calendars, schedulers, timelines, and Gantt views
- JSON, code, diff, file-tree, and general data inspection

Large collections use bounded rendering where supported. Applications remain responsible for fetching, authorization, persistence, and server-side query behavior.

## Development

```bash
corepack pnpm --filter @enterprise-ui/react-data typecheck
corepack pnpm exec vitest run tests/data-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
