# Agent guide

This directory uses progressive disclosure: load the small common foundation, then only the guide relevant to the task.

## Required for every task

Read [`foundation.md`](foundation.md). It defines the system model, source-of-truth order, package boundaries, and invariants.

## Route by task

| Task | Read next | Add when needed |
| --- | --- | --- |
| Build or modify a browser application with the framework | [`web-applications.md`](web-applications.md) | [Design language](../design-language/README.md), [`component-selection.md`](component-selection.md), [`declarative-ui.md`](declarative-ui.md) |
| Build or modify an Electron application | [`electron-applications.md`](electron-applications.md) | [Design language](../design-language/README.md), [`web-applications.md`](web-applications.md), [`declarative-ui.md`](declarative-ui.md) |
| Change packages, components, schemas, tools, or docs in this repository | [`repository-development.md`](repository-development.md) | [Design language](../design-language/README.md) for visible changes, [`component-selection.md`](component-selection.md), [`declarative-ui.md`](declarative-ui.md), [`verification.md`](verification.md) |
| Choose a package/component or locate examples | [`component-selection.md`](component-selection.md) | Owning stories and exported source types |
| Work with JSON documents, the renderer, designers, bindings, or proposals | [`declarative-ui.md`](declarative-ui.md) | `packages/contracts/schemas/` and focused tests |
| Plan or run checks | [`verification.md`](verification.md) | Root package scripts and test configuration |
| Refine or implement work from a GitHub issue | [`issues.md`](issues.md) | Owning package guide and [`verification.md`](verification.md) |

Repository changes also require the root [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
and [`CODING_STANDARDS.md`](../../CODING_STANDARDS.md). The proprietary terms in
[`LICENSE.md`](../../LICENSE.md) apply to all tasks.

## Context-loading rule

Do not read every document by default. Start from the task, inspect the closest source and tests, and expand only when a boundary or contract is involved. Historical files under `docs/history/` are evidence and should be consulted only for provenance.

## Source-of-truth precedence

When documentation and implementation disagree, use this order:

1. Validated schemas, registry sources, package manifests, and executable configuration.
2. Public TypeScript exports and focused tests.
3. Current architecture and guides.
4. Generated status documents.
5. Historical milestone and bootstrap records.

Do not silently normalize a mismatch. Fix stale current documentation as part of the task, or report the discrepancy if it is outside scope.
