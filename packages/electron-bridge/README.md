# `@alienfishconsulting/surface-electron-bridge`

A transport-neutral, allowlisted boundary between browser-capable React code and an Electron host. The package defines request/result types, validates renderer requests, exposes a safe browser fallback, and adapts UI intentions to host callbacks without importing Electron.

This public package is proprietary and version `1.0.0`.

## Usage

```ts
import {
  createBrowserBridge,
  createDesktopBridge,
} from '@alienfishconsulting/surface-electron-bridge';

const desktop = window.applicationDesktop
  ? createDesktopBridge({
      allowedCapabilities: ['file-dialog', 'notification'],
      invoke: request => window.applicationDesktop.request(request),
    })
  : createBrowserBridge();
```

## Security boundary

- The consuming Electron application owns context isolation, preload exposure, IPC routing, payload validation, authorization, and native effects.
- Renderer code receives one narrow typed function, never raw `ipcRenderer` or arbitrary channel access.
- Capabilities are allowlisted, request shape and payload size are bounded, and browser use fails safely as unavailable.
- The main process must validate and authorize every request again.

## Development

```bash
corepack pnpm --filter @alienfishconsulting/surface-electron-bridge typecheck
corepack pnpm exec vitest run tests/electron-bridge.test.ts
```

See the [Electron integration guide](../../docs/guides/electron-integration.md) for the preload and main-process pattern.
