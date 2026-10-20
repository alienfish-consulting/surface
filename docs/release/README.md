# Release process

The first coordinated public, proprietary package release, version `1.0.0`, was published manually under `@alienfishconsulting/surface-*` on 2026-10-19. The `v1.0.0` repository tag and GitHub release remain separate release-record actions requiring explicit human authorization.

Before creating the `v1.0.0` tag:

1. Review the completed [`ACCEPTANCE-MATRIX.md`](ACCEPTANCE-MATRIX.md) and [`VERIFICATION.md`](VERIFICATION.md).
2. Complete the manual assistive-technology checks.
3. Confirm the published npm package metadata and access for every coordinated package.
4. Configure npm trusted publishing for future versions in `.github/workflows/release.yml` and protect the `npm-production` GitHub environment with required reviewers. The npm repository URL must exactly match this GitHub repository.
5. Run `corepack pnpm release:prepare`; inspect all nine tarballs, package contents, declarations, CSS assets, dependency notices, and consumer behavior.
6. Run an optional install from the tarballs in a separate application repository, including its browser or Electron production build.
7. Confirm [`CHANGELOG.md`](../../CHANGELOG.md) records the release date.
8. Commit and push the approved release state, then create and push the exact `v1.0.0` tag when the GitHub release record is authorized.

The release workflow verifies the full repository and browser suites, packs all packages, installs them into isolated React 18.2 and React 19 consumers, records checksums and dependency-license evidence, then uploads artifacts. A manual workflow run performs verification only. A pushed `v*` tag enters the protected `npm-production` environment, skips exact package versions already present on npm, publishes missing versions with npm provenance, and creates the GitHub release.

All accepted v1 packages are versioned and were published together. The root workspace and applications are never published.
