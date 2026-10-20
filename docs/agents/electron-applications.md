# Building Electron applications

An Electron renderer is a web application with an additional trust boundary. Follow [`web-applications.md`](web-applications.md) for UI composition, then add desktop capabilities through `@alienfishconsulting/surface-electron-bridge`.

## Required process boundary

```text
React component
  -> named UI intention
  -> renderer application policy
  -> typed preload API
  -> fixed IPC handler
  -> main-process authorization and validation
  -> native operation
```

Never import Electron from a framework package or pass arbitrary IPC channel names through a component/document. Keep `contextIsolation` enabled, `nodeIntegration` disabled, and expose the smallest possible preload API. Validate again in the main process because renderer validation is not a security boundary.

## Renderer integration

Create a browser fallback so the same UI fails safely outside Electron:

```ts
import {
  createBrowserBridge,
  createDesktopBridge,
  type DesktopBridge,
} from '@alienfishconsulting/surface-electron-bridge';

export const desktop: DesktopBridge = window.applicationDesktop
  ? createDesktopBridge({
      allowedCapabilities: ['file-dialog', 'notification'],
      invoke: request => window.applicationDesktop.request(request),
    })
  : createBrowserBridge();
```

Feature code must handle `available: false` and structured failures without exposing a dead control. Declare only capabilities required by the current application.

## Preload and main-process rules

- Expose one typed request function or a few fixed-purpose functions, not raw `ipcRenderer`.
- Map request capability/action pairs to fixed handlers. Reject unknown actions and extra/oversized payloads.
- Normalize and constrain filesystem paths in the main process; prefer native dialogs and handles over arbitrary renderer-supplied paths.
- Never forward shell commands, module names, code, or unrestricted URLs.
- Re-check window identity, user/session permissions, and current application state before the native effect.
- Return serializable, structured results and sanitized error messages.
- Apply Electron navigation, new-window, permission, session, CSP, and external-link policies in the host application.

## Desktop acceptance

Test the browser fallback, denied capability, malformed request, host exception, user cancellation, and successful path. Verify that the renderer bundle has no Node/Electron dependency and that a compromised renderer cannot choose a channel or broaden its allowlist.
