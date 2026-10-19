# ADR-002 — Schema-first serialized contract and generated types
**Status:** Proposed · **Date:** 2026-10-18

## Decision
The **canonical persisted UI format is JSON Schema Draft 2020-12**, supported by declarative registry descriptors. Hand-authored schema files and registry metadata are the contract sources. Generate TypeScript types, typed adapter signatures, and registry data/docs from those canonical sources, and fail CI on drift. Pick and validate a compatible TypeScript codegen tool during the first vertical slice; do not assume any generator handles all Draft 2020-12 features unmodified.

JSX props can be **strict supersets** of the serializable schema subset (React nodes, functions and render props belong to JSX only). Each declarative renderer adapter must accept a generated serializable type and explicitly bridge it into the component API. No parallel runtime/designer-only persisted document model.

## Why
AI agents and visual designers need inspectable, data-only, versioned rules. Human-readable TS-first APIs alone cannot completely describe a safely serializable subset without significant bespoke extraction rules. Schema-first makes validation of untrusted designs and external composition more explicit.

## Alternatives
- TypeScript-first introspection: compelling developer experience but lossy around serializability, semantic slots, named intents and 2020-12 validation keywords.
- Duplicated TS and JSON schemas: easy initially; creates the three-implementation drift risk this project is designed to avoid.

## Migration and identity
- Stable namespace IDs (`ui.Button`, etc.) never inferred from JavaScript variable names.
- Persist `schemaVersion`, `registryVersion`, stable node IDs and revision; support explicit migration adapters for accepted source versions.
- Use `slots` with declared semantics; `children` may remain the canonical default slot for existing examples; migration from the sample shape must be deterministic.
- Agents submit JSON Patch proposals against a base revision and prohibited/capability paths are guarded.
- No arbitrary JS, callbacks, HTML or host permissions inside schemas; runtime states are host-supplied and separate from persisted design.

## Verification
Build a representative Button/Panel/KpiCard registry, generate types and compile adapters. The *same JSON document* must load, edit, preview, validate and render without format translation or a designer-specific serialization.
