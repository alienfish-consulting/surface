# Release preparation

No publication is authorized. Before a coordinated first release:

1. Review the completed [`ACCEPTANCE-MATRIX.md`](ACCEPTANCE-MATRIX.md) and [`VERIFICATION.md`](VERIFICATION.md).
2. Complete the manual assistive-technology checks and the separate-repository packed-package install.
3. Decide final package names/scope, commercial distribution terms and coordinated version; see [`NEXT.md`](NEXT.md). The source remains proprietary unless a separately authorized written license replaces [`LICENSE.md`](../../LICENSE.md).
4. Confirm package contents, exports, declarations, CSS assets, dependency notices and consumer bundle behavior from packed artifacts.
5. Verify browser and optional Electron consumption in the intended release environments.
6. Create provenance, changelog and publication commands for human review.
7. Obtain separate authorization for any remote creation, push and npm publication.

All accepted v1 packages should be versioned and published together. Partial publication is out of scope.
