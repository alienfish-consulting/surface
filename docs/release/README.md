# Release preparation

The first coordinated release is prepared as public, proprietary version `1.0.0` under `@alienfishconsulting/surface-*`. Creating a tag or publishing packages still requires explicit human authorization.

Before creating `v1.0.0`:

1. Review the completed [`ACCEPTANCE-MATRIX.md`](ACCEPTANCE-MATRIX.md) and [`VERIFICATION.md`](VERIFICATION.md).
2. Complete the manual assistive-technology checks.
3. Create or confirm the `alienfishconsulting` npm organization and permission to publish every package name.
4. Configure npm trusted publishing for `.github/workflows/release.yml`, allow direct `npm publish`, and protect the `npm-production` GitHub environment with required reviewers. The npm repository URL must exactly match this GitHub repository.
5. Run `corepack pnpm release:prepare`; inspect all nine tarballs, package contents, declarations, CSS assets, dependency notices, and consumer behavior.
6. Run an optional install from the tarballs in a separate application repository, including its browser or Electron production build.
7. Update [`CHANGELOG.md`](../../CHANGELOG.md), replacing `Unreleased` with the release date.
8. Commit and push the approved release state, then create and push the exact `v1.0.0` tag.

The release workflow verifies the full repository and browser suites, packs all packages, installs them into isolated React 18.2 and React 19 consumers, records checksums and dependency-license evidence, then uploads artifacts. A manual workflow run performs verification only. Only a pushed `v*` tag enters the protected `npm-production` environment, publishes with npm provenance, and creates the GitHub release.

All accepted v1 packages are versioned and published together. Partial publication is out of scope. The root workspace and applications are never published.
