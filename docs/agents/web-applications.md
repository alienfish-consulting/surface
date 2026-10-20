# Building web applications

## Choose the composition model

Use direct React when the interface is authored in code and benefits from callbacks, React nodes, or application-specific composition. Use `DesignRenderer` when layouts must be stored, exchanged, visually edited, or proposed by an agent. A mixed application is valid: use direct React for the shell and declarative rendering for governed regions.

Do not convert ordinary application state into a design document merely to use the framework. Design documents describe interface structure and registered bindings/intentions; the application still owns domain state and effects.

## Install and style

Use only the packages the application needs. Load tokens first, then each family stylesheet:

```tsx
import '@alienfishconsulting/surface-tokens/theme.css';
import '@alienfishconsulting/surface-react-core/styles.css';
import '@alienfishconsulting/surface-react-data/styles.css';
```

Scope the selected modes on the application root:

```tsx
<div data-ui-theme="light" data-ui-density="comfortable">
  <Application />
</div>
```

Avoid reaching into package internals or depending on `ui-*` DOM structure. Public guarantees are package exports, prop types, named CSS entry points, semantic tokens, and documented host contracts.

## Direct React workflow

1. Find the smallest owning family in [`component-selection.md`](component-selection.md).
2. Confirm the export in the package `src/index*` and read the component prop type.
3. Inspect the matching story for supported states and composition.
4. Keep fetching, mutations, routing, authorization, and notifications in application code.
5. Pass event callbacks that translate component intentions into application commands.
6. Provide stable IDs/keys, localized labels, bounded data, and explicit loading, empty, error, stale, and permission-denied states.

## Declarative workflow

Validate external data before render and provide application-owned binding data and an action handler:

```tsx
import {assertDesignDocument} from '@alienfishconsulting/surface-contracts';
import {DesignRenderer} from '@alienfishconsulting/surface-react-renderer';

const document = assertDesignDocument(untrustedInput);

export function GovernedRegion() {
  return (
    <DesignRenderer
      doc={document}
      host={{
        data: applicationData,
        requestAction: request => authorizeAndDispatch(request),
      }}
    />
  );
}
```

The handler must authorize the named action using current application state. A valid document proves shape, not user permission.

## Application acceptance

Verify the actual application at narrow and wide widths, all supported themes/densities, keyboard-only operation, zoom, and relevant loading/error states. Framework tests do not prove that a consuming application used headings, labels, permissions, routing, portals, or live-region announcements correctly.
