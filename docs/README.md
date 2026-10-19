# Documentation

The documentation is organized by purpose so current guidance is not confused with bootstrap evidence.

| Area | Use it for |
| --- | --- |
| [`design-language/`](design-language/README.md) | Visual, interaction, composition, state, and responsive rules for Surface applications |
| [`agents/`](agents/README.md) | Progressive instructions for coding agents building applications or changing this repository |
| [`guides/`](guides/consumer-guide.md) | Human-facing web and Electron consumption guides |
| [`architecture/`](architecture/README.md) | Current system boundaries, dependency direction, and decision records |
| [`release/`](release/README.md) | Current verification, acceptance, and remaining release decisions |
| [`history/`](history/README.md) | Completed milestone reports and bootstrap source material; evidence, not current instructions |
| [`catalog-status.md`](catalog-status.md) | Generated inventory status; its path is part of the generator contract |

Repository-wide policies live at the root: [contribution workflow](../CONTRIBUTING.md),
[coding standards](../CODING_STANDARDS.md), and [proprietary license](../LICENSE.md).

For the actual component API, prefer exported TypeScript types and colocated Storybook stories over narrative documentation. For the declarative surface, prefer the current registry and schemas under `packages/contracts`.
