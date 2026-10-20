# Consumer guide

## Installation model

Surface packages use the public `@alienfishconsulting/surface-*` namespace and coordinated semantic versions. They are publicly downloadable but proprietary; access does not grant permission to use, modify, or redistribute them. Review [`LICENSE.md`](../../LICENSE.md) before installation.

After publication, install a supported React runtime and only the Surface families the application needs:

```bash
npm install react@^19 react-dom@^19 \
  @alienfishconsulting/surface-tokens \
  @alienfishconsulting/surface-react-core
```

React 18.2 is also supported.

Use narrow imports. Each React family exports JavaScript/types at its package root and CSS at `./styles.css`; tokens export `./theme.css`. `react-renderer` is the complete registered runtime preset and therefore intentionally references every implemented family. Applications needing a smaller direct-React bundle should import a family package instead.

## Styling

Load tokens before component-family CSS. Scope visual modes on an application or portal root:

```html
<div data-ui-theme="dark" data-ui-density="compact">…</div>
```

Supported inspection dimensions are light, dark, high contrast (`data-ui-contrast="high"`), compact, comfortable, responsive containers and operating-system forced colors. Consumers must propagate the attributes to detached portal roots.

Use the [Surface design language](../design-language/README.md) for application
hierarchy, composition, state presentation, responsive behavior, and content
guidance. The token stylesheet remains authoritative for exact runtime values.

## Direct React and serialized rendering

Direct React APIs may accept callbacks, slots and React nodes. Persisted documents use only the registered serializable subset in `@alienfishconsulting/surface-contracts`. Validate documents before rendering and treat component callbacks as intentions; application code independently authorizes all side effects.

Registry 1.6.0 is the current snapshot. Older registry fixtures are retained for explicit compatibility checks, not silently upgraded. Persist `schemaVersion`, `registryVersion`, stable node IDs and document revision.

## Package exports

| Package | Runtime purpose | CSS export |
| --- | --- | --- |
| `tokens` | semantic tokens | `./theme.css` |
| `contracts` | schemas, registry, validation, proposal APIs and host intent types | none |
| `react-core` | foundational UI | `./styles.css` |
| `react-data` | data and analytics | `./styles.css` |
| `react-operations` | operations and workflows | `./styles.css` |
| `react-ai` | AI and agent interfaces | `./styles.css` |
| `react-designers` | shared-schema designers | `./styles.css` |
| `react-renderer` | complete declarative adapter preset | none |
| `electron-bridge` | optional typed desktop boundary and browser fallback | none |

Packages are unbundled ESM with declarations, declaration maps, and source maps. React packages declare `^18.2.0 || ^19.0.0` as a peer and do not bundle React or React DOM. CSS files are explicit side effects; JavaScript modules remain side-effect free and tree-shakeable.
