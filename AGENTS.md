# Enterprise UI — mandatory IDE agent operating instructions

**Read `HANDOFF.md` first, then `docs/01-baseline-and-decisions.md`, `docs/02-target-repository.md`, `docs/03-execution-milestones.md`, `docs/06-approval-and-test-protocol.md`, and the component catalog.** These rules govern all agents and subagents working on this project, including coding, planning, terminal and review agents. Copy this file to the local project root before any implementation work and retain it in the resulting repository.

## Scope and starting conditions

- Greenfield **local** React design-system repository; **no GitHub remote exists**. Do not invent a remote, org, project name, npm scope, domain or license.
- `seed/enterprise-ui-poc/` is the demonstrated local proof of concept. **Use and evolve its source**, not a rewrite from zero. It is a reference seed, not proof of production quality.
- `assets/approved-design-snapshot/` is authoritative for product requirements and visual references. `reference/architecture-v0.1/` contains implementation recommendations, some provisional.
- `catalog/components.v1.proposed.json` enumerates **198 proposed implementation units** extrapolated from approved capability groups. This catalog is a **proposal**; user approval at M0 determines its exact contents. Many entries are subcomponents rather than public exports.

## Stop-and-ask authority rule (absolute)

**At each milestone, STOP and give the human an explicit gate report.** It must specify files changed, completed/incomplete work, material architectural decisions, exceptions, and the **exact test commands proposed**, including affected packages and what each test demonstrates. Do not execute a new milestone's tests unless the human explicitly approves the specific test plan. If already approved, run only that plan; no opportunistic extra sweeps. Show actual results, failures and unverified items. **Never commit until the human explicitly approves the commit after seeing test results or explicitly waives tests.** Approval to implement, approval to test and approval to commit are **three separate permissions**. An approval does not carry to later milestones.

- Never run `git commit`, amend, rebase, reset --hard, force-push, push, publish or create a remote unless explicitly instructed. No automated commits, release hooks, or git-writing automation.
- Do not make cloud resources, GitHub repository, npm packages, licensing or publishing decisions for the user.
- No automatic `pnpm check`/all-suite at early stages; no tests hidden in scaffolding generators, postinstall, precommit or build hooks. Show scripts before running them if they transitively invoke tests.
- If changes need an exceptional irreversible or significant dependency action, pause and seek approval.
- Keep edits only within the local workspace. No remote or user external-account actions are authorized.

## Implementation policy

- Build **styled** accessible React components with browser/Electron parity. React, TypeScript, pnpm, Nx, Vite, Storybook React/Vite, Playwright Test are the selected baseline, not a mandate to pull a large testing stack immediately.
- Canonical serialized UI documents use JSON Schema 2020-12, registered named actions/bindings, guarded RFC 6902 JSON Patch, deterministic validation and versioning. JSX may offer richer nonserializable APIs, but cannot introduce competing persisted designer schemas.
- React components emit intentions; **applications own permissions, persistence, host execution, networking and Electron privilege**. No arbitrary JavaScript execution from JSON.
- Preserve light/dark/high-contrast, compact/comfortable and responsive visual direction. Images are design references, not raster assets to bundle into runtime components.
- Do not generate new mockups unless the human asks. Do not substitute screenshot-perfect raster renderings for real components.
- A scaffold is **not an implemented component**. Never label TODOs as done, register unfinished implementations, publish them through public package exports, or create tests that merely assert a placeholder renders.
- Build per-component contracts, typed states, story coverage and relevant tests **as implemented**, not 198 premature behavioral suites.
- Favor dependencies with known maintenance and accessible behavior; record a narrow decision for expensive engines (grid, chart, topology, drag/drop, code editor). Avoid speculative complexity.
- Keep third-party major versions compatible; lock dependencies when the setup is approved and installations are performed.
- The first npm release is **coordinated and complete** across accepted v1 scope; no partial npm release.

## Required gate message

Follow `docs/06-approval-and-test-protocol.md`. End every milestone report with:

> **STOP — awaiting approval.** Proposed test commands: `...`. Please approve, edit, or waive this exact test plan. After tests, I will show results and request separate permission to commit. I will not proceed to the next milestone or commit without your direction.

When approved tests finish, again STOP and ask for separate **commit authorization**. If user declines, leave working tree uncommitted, provide clear status and await next instruction.
