# Consumer guide

## Installation model

This workspace is private, proprietary, and unpublished. The examples use temporary workspace package names only; final package identity, commercial distribution terms, and version remain undecided. Access to the source does not grant permission to use or distribute it; see [`LICENSE.md`](../../LICENSE.md). A future authorized release should use coordinated versions across the accepted v1 scope.

Use narrow imports. Each React family exports JavaScript/types at its package root and CSS at `./styles.css`; tokens export `./theme.css`. `react-renderer` is the complete registered runtime preset and therefore intentionally references every implemented family. Applications needing a smaller direct-React bundle should import a family package instead.

## Styling

Load tokens before component-family CSS. Scope visual modes on an application or portal root:

```html
<div data-ui-theme="dark" data-ui-density="compact">…</div>
```

Supported inspection dimensions are light, dark, high contrast (`data-ui-contrast="high"`), compact, comfortable, responsive containers and operating-system forced colors. Consumers must propagate the attributes to detached portal roots.

## Direct React and serialized rendering

Direct React APIs may accept callbacks, slots and React nodes. Persisted documents use only the registered serializable subset in `@enterprise-ui/contracts`. Validate documents before rendering and treat component callbacks as intentions; application code independently authorizes all side effects.

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

Packages are ESM with declarations. React packages declare React 19 as a peer. CSS files are explicit side effects; JavaScript modules should remain side-effect free and tree-shakeable, subject to final consumer-bundle verification in M9.
