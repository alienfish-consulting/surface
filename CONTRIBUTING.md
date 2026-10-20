# Contributing to Surface

Surface is proprietary even though its source and npm packages are publicly
available. Contributions are accepted only under the terms below. Public
visibility does not grant permission to use, modify, or redistribute the
project. Read [`LICENSE.md`](LICENSE.md) before using or contributing.

## Before starting

1. Search existing issues and pull requests.
2. Use the appropriate issue template for bugs, features, components, contract
   changes, or documentation.
3. Confirm that the issue is refined and marked `status:ready`. Do not begin
   work on an issue carrying `agent:hold`.
4. Keep security-sensitive reports, credentials, customer data, and private
   designs out of public issue and pull-request text. Contact a maintainer for a
   private reporting path.
5. Read [`CODING_STANDARDS.md`](CODING_STANDARDS.md) and the guidance for the
   affected package or application.

Small documentation corrections may be opened directly as a focused pull
request. Material API, schema, dependency, architecture, security, or release
changes should have an accepted issue first.

## Development setup

The workspace requires Node.js 24 and uses the Corepack-managed pnpm version
pinned in `package.json`.

```bash
corepack enable
corepack pnpm install --frozen-lockfile
```

Useful development commands are documented in the [root README](README.md).

## Make a focused change

- Work in the package or application that owns the behavior.
- Preserve package boundaries and existing public APIs unless the accepted
  scope explicitly authorizes a breaking change.
- Update implementation, types, styles, schema/registry entries, renderer
  adapters, stories, and tests together when they describe one behavior.
- Edit generator inputs and regenerate derived files; never hand-edit generated
  output to bypass drift checks.
- Do not include credentials, build output, unrelated formatting, or unrelated
  working-tree changes.
- Update the root README and every affected package or application README when
  commands, setup, public APIs, boundaries, or behavior change. If no README
  edit is required, confirm that the current guidance remains accurate.

## Verification

Run the smallest checks that prove the change, then broaden them in proportion
to impact. Documentation-only changes require link, spelling, and rendered
Markdown review rather than application test suites. Code and contract changes
should follow [`docs/agents/verification.md`](docs/agents/verification.md).

The full repository gate is:

```bash
corepack pnpm check
corepack pnpm build:storybook
corepack pnpm test:e2e
```

Record the exact commands and outcomes in the pull request. Do not claim checks
that were not run.

## Pull requests

Open pull requests against `main` and complete the repository template. A pull
request should:

- explain the problem and observable outcome;
- link its issue when one exists;
- identify API, contract, security, accessibility, Electron, and compatibility
  implications;
- include tests and Storybook states for changed behavior where applicable;
- include screenshots or recordings for visible changes;
- describe migration steps for authorized breaking changes;
- list documentation updates and verification evidence; and
- remain small enough to review as one coherent change.

At least one authorized maintainer must review and approve a contribution.
Passing automation does not imply acceptance, permission to merge, permission
to publish, or a release decision.

## Contribution rights

By submitting a contribution, you represent that you have the right to submit
it and that it does not knowingly include confidential information, trade
secrets, or material that violates another party's rights. You grant AlienFish
Consulting a perpetual, worldwide, irrevocable, royalty-free, transferable, and
sublicensable license to use, reproduce, modify, create derivative works from,
distribute, publicly perform, publicly display, commercialize, and otherwise
exploit the contribution for any purpose. You retain ownership of copyright you
hold in the contribution. Submission does not change the repository's
proprietary license or grant other users rights to the project.

AlienFish Consulting may require a separate written contributor or employment
agreement before accepting a contribution. Maintainers may close or decline any
submission at their discretion.

## Conduct

Be direct, respectful, and specific. Review the work rather than the person,
make decisions from reproducible evidence, and treat accessibility, security,
privacy, and compatibility concerns as product requirements.
