# `@alienfishconsulting/surface-react-data`

React components for data-heavy application surfaces: tables and grids, query and sort builders, charts and metrics, schedules and timelines, and structured-data inspectors.

This public package is proprietary and version `1.0.0`; React `^18.2.0 || ^19.0.0` is a peer dependency.

## Usage

```tsx
import '@alienfishconsulting/surface-tokens/theme.css';
import '@alienfishconsulting/surface-react-core/styles.css';
import '@alienfishconsulting/surface-react-data/styles.css';
import {DataGrid} from '@alienfishconsulting/surface-react-data';

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
corepack pnpm --filter @alienfishconsulting/surface-react-data typecheck
corepack pnpm exec vitest run tests/data-components.test.tsx
corepack pnpm check:stories
corepack pnpm test:e2e:storybook
```
