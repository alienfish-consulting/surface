# Enterprise UI · local schema-first design system

**Status:** Private local v1 implementation workspace. All 198 accepted catalog units are implemented and verified through their owning component milestones. Release acceptance is still pending; this repository has no remote and nothing has been published.

The workspace evolves the supplied proof of concept into styled React components that share one JSON Schema 2020-12 document model across runtime rendering, visual designers and guarded agent proposals. Applications—not UI components—own authorization, persistence, networking, model/tool execution and privileged desktop behavior.

## Workspace

- `packages/tokens` — DTCG source tokens and generated theme CSS.
- `packages/contracts` — versioned schemas, registry snapshots, generated serialized types, validation and guarded RFC 6902 proposals.
- `packages/react-core` — layouts, display, controls, forms and overlays.
- `packages/react-data` — tables, grids, charts, schedules and inspectors.
- `packages/react-operations` — workflows, deployments, events, topology and incident operations.
- `packages/react-ai` — conversations, agents, tools, approvals, artifacts and run states.
- `packages/react-designers` — shared-schema form, dashboard, workflow, query and schema designers.
- `packages/react-renderer` — explicit allowlisted adapters from validated documents to React.
- `packages/electron-bridge` — optional typed desktop boundary with a browser fallback; it does not import Electron.
- `apps/design-lab` and `apps/storybook` — private local development consumers.

## Local development

The repository is pinned to Node 24 and pnpm 10.18.0.

```bash
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:5173`. To inspect component states:

```bash
corepack pnpm storybook
corepack pnpm build:storybook
```

The root `pnpm check` is the broad acceptance command. Follow milestone test gates before running it. Playwright browser installation remains a separate resource action.

## Consumer example

Import only the packages and CSS used by the application. React remains a peer dependency of React packages.

```tsx
import '@enterprise-ui/tokens/theme.css';
import '@enterprise-ui/react-core/styles.css';
import {Button, Panel} from '@enterprise-ui/react-core';

export function Example() {
  return <Panel title="Account"><Button label="Save" onPress={() => {/* host intent */}} /></Panel>;
}
```

Declarative consumers validate a pinned design document and provide a host that resolves data and handles named action intentions:

```tsx
import {assertDesignDocument} from '@enterprise-ui/contracts';
import {DesignRenderer} from '@enterprise-ui/react-renderer';

const document = assertDesignDocument(input);
<DesignRenderer doc={document} host={{data, requestAction: request => application.review(request)}} />;
```

See [consumer guide](docs/guides/consumer-guide.md), [desktop integration](docs/guides/electron-integration.md), and [release preparation](docs/release/README.md).

## Themes and accessibility

Set `data-ui-theme="light|dark"`, optional `data-ui-contrast="high"`, and `data-ui-density="comfortable|compact"` on a containing element. Component CSS uses semantic custom properties and includes forced-colors handling. Storybook exposes these modes for inspection; final assistive-technology and cross-browser acceptance belongs to M9.

## Boundaries

- Serialized documents contain registered data bindings and action IDs, never executable JavaScript.
- Designer edits are previewed proposals and remain non-authoritative until the host verifies the base revision and commits.
- The optional desktop package accepts an application-supplied invoke function and capability allowlist. Consumers implement secure preload/IPC and authorization.
- The temporary `@enterprise-ui/*` scope, repository name, license and final release version are not ownership or publication decisions.
- Do not create a remote, push, publish, or introduce cloud resources without explicit user direction.
