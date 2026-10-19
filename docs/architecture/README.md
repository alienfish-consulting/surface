# Enterprise UI — Implementation architecture v0.1

**Created:** 2026-10-18  
**Status:** Proposed architecture for explicit review. This is not a finalized approval, repository commit, or implemented npm package.

## Relationship to the design snapshot

This packet is a focused implementation-architecture companion to `enterprise-ui-design-system-snapshot-2026-10-18.zip`. The earlier snapshot's approved decisions and complete v1 scope remain authoritative. In case of conflict, the previously approved constraint wins until explicitly changed.

- `ARCHITECTURE.md` — architecture and workspace structure.
- `adr/` — six proposed architecture decisions, each with context, choice, tradeoffs, and verification.
- `FIRST-VERTICAL-SLICE.md` — executable acceptance plan for the first proof.
- `OPEN-DECISIONS.md` — decisions consciously deferred rather than invented.

**Important:** No npm publication until the full M1–M8 v1 scope passes acceptance. No extra image/mockup rounds required to commence.

## Validated starting point

Ran the snapshot's `sources/enterprise-ui-schema-contract-v0.1/tools/validate_examples.py` against the included fixtures: `PASS: 5 registered nodes; 12 negative specimens rejected; safe proposal preview validated`. This is a Python demonstration validator, not a production TypeScript implementation.

## Official technology references reviewed on 2026-10-18

- React releases: https://react.dev/versions
- Node.js releases: https://nodejs.org/en/about/previous-releases
- pnpm workspace catalogs: https://pnpm.io/catalogs
- Nx release groups: https://nx.dev/docs/guides/nx-release/release-groups
- React Aria Components: https://react-spectrum.adobe.com/react-aria/
- Ajv JSON Schema 2020-12: https://ajv.js.org/json-schema.html
- TanStack Table virtualization: https://tanstack.com/table/latest/docs/framework/react/guide/virtualization
- Storybook React/Vite: https://storybook.js.org/docs/get-started/frameworks/react-vite/
- Storybook accessibility: https://storybook.js.org/docs/writing-tests/accessibility-testing
