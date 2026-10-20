# Optional Electron integration

`@alienfishconsulting/surface-electron-bridge` is a transport-neutral contract. It never imports Electron, opens IPC channels or grants a capability. The consuming application owns context isolation, preload exposure, channel validation, authorization and native API calls.

In a browser, use the fail-closed fallback:

```ts
import {createBrowserBridge} from '@alienfishconsulting/surface-electron-bridge';
const desktop = createBrowserBridge();
await desktop.request({capability:'notification', action:'show'}); // unavailable result
```

An Electron renderer should receive one narrow function from its secure preload and explicitly allow only required capability groups:

```ts
const desktop = createDesktopBridge({
  allowedCapabilities: ['file-dialog', 'notification'],
  invoke: request => window.applicationDesktop.request(request),
});
```

The preload/main process must validate the request again, map actions to fixed handlers and return structured results. Do not pass arbitrary channel names, filesystem paths, shell commands, JavaScript or Electron objects through the bridge. Keep `nodeIntegration` disabled and context isolation enabled in the consuming app. Those host settings are integration requirements, not behavior this design-system package can enforce.

`createRendererHost` adapts application-owned data and an action callback to the renderer `Host` contract. It forwards intentions only and performs no authorization.
