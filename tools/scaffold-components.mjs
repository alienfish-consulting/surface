import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = resolve(repositoryRoot, 'catalog/components.v1.json');
const runtimeRegistryPath = resolve(repositoryRoot, 'packages/contracts/fixtures/component-registry.v1.6.0.json');
const planningRegistryPath = resolve(repositoryRoot, 'packages/contracts/fixtures/component-registry.json');
const legacyRegistryPath = resolve(repositoryRoot, 'packages/contracts/fixtures/component-registry.v1.0.0.json');

const args = process.argv.slice(2).filter((argument) => argument !== '--');
const hasFlag = (flag) => args.includes(flag);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
};

const writeMode = hasFlag('--write');
const checkMode = hasFlag('--check');
const syncTrackingMode = hasFlag('--sync-tracking');
if ([writeMode,checkMode,syncTrackingMode].filter(Boolean).length>1) throw new Error('Choose one of --write, --check, or --sync-tracking');
const componentArgument = valueAfter('--component');
const outputArgument = valueAfter('--output');
const outputRoot = outputArgument
  ? resolve(process.cwd(), outputArgument)
  : repositoryRoot;

const knownFlags = new Set(['--write', '--check', '--sync-tracking', '--component', '--output']);
for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (!knownFlags.has(argument)) throw new Error(`Unknown argument: ${argument}`);
  if (argument === '--component' || argument === '--output') index += 1;
}

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const catalog = readJson(catalogPath);
const runtimeRegistry = readJson(runtimeRegistryPath);
const planningRegistry = readJson(planningRegistryPath);
const legacyRegistry = readJson(legacyRegistryPath);

const classifications = new Set([
  'public-component',
  'feature/workstream',
  'compositional-subcomponent',
  'internal-primitive',
]);
const lifecycleStates = new Set(['planned', 'scaffolded', 'implemented', 'verified', 'released']);
const packageOrder = new Map([
  ['react-core', 0],
  ['react-data', 1],
  ['react-operations', 1],
  ['react-ai', 1],
  ['react-designers', 2],
]);
const allowedPackageDependencies = new Map([
  ['react-core', new Set(['react-core'])],
  ['react-data', new Set(['react-core', 'react-data'])],
  ['react-operations', new Set(['react-core', 'react-operations'])],
  ['react-ai', new Set(['react-core', 'react-ai'])],
  ['react-designers', new Set(['react-core', 'react-data', 'react-operations', 'react-ai', 'react-designers'])],
]);

if (catalog.schemaVersion !== '1.0.0' || catalog.catalogStatus !== 'accepted-v1-tracking-inventory') {
  throw new Error('Unsupported or unapproved component catalog');
}
if (catalog.components.length !== 198) throw new Error(`Expected 198 catalog units; found ${catalog.components.length}`);
if (runtimeRegistry.registryVersion !== '1.6.0') throw new Error('The active designer registry must be 1.6.0');
if (legacyRegistry.registryVersion !== '1.0.0') throw new Error('The preserved legacy registry must remain at 1.0.0');

const componentsById = new Map();
const names = new Set();
for (const component of catalog.components) {
  if (!/^ui\.[A-Z][A-Za-z0-9]*$/.test(component.id)) throw new Error(`Invalid stable ID: ${component.id}`);
  if (componentsById.has(component.id)) throw new Error(`Duplicate component ID: ${component.id}`);
  if (names.has(component.name)) throw new Error(`Duplicate component name: ${component.name}`);
  if (!packageOrder.has(component.package)) throw new Error(`Unsupported package for ${component.id}: ${component.package}`);
  if (!classifications.has(component.classification)) throw new Error(`Invalid classification for ${component.id}`);
  if (!lifecycleStates.has(component.lifecycleState)) throw new Error(`Invalid lifecycle state for ${component.id}`);
  componentsById.set(component.id, component);
  names.add(component.name);
}

for (const component of catalog.components) {
  for (const dependencyId of component.candidateDependencies) {
    const dependency = componentsById.get(dependencyId);
    if (!dependency) throw new Error(`Unknown dependency: ${component.id} -> ${dependencyId}`);
    if (!allowedPackageDependencies.get(component.package).has(dependency.package)) {
      throw new Error(`Disallowed package dependency: ${component.id} -> ${dependencyId}`);
    }
  }
}

const visiting = new Set();
const visited = new Set();
const visit = (componentId, path = []) => {
  if (visiting.has(componentId)) throw new Error(`Circular component dependency: ${[...path, componentId].join(' -> ')}`);
  if (visited.has(componentId)) return;
  visiting.add(componentId);
  const component = componentsById.get(componentId);
  for (const dependency of component.candidateDependencies) visit(dependency, [...path, componentId]);
  visiting.delete(componentId);
  visited.add(componentId);
};
for (const component of catalog.components) visit(component.id);

const runtimeTypes = new Set(runtimeRegistry.components.map((entry) => entry.type));
const planningTypes = new Set(planningRegistry.components.map((entry) => entry.type));
const legacyTypes = new Set(legacyRegistry.components.map((entry) => entry.type));
const runtimeStatuses = new Set(['implemented','verified','released']);
const implementedIds = catalog.components
  .filter((component) => runtimeStatuses.has(component.lifecycleState))
  .map((component) => component.id);
const renderableIds=implementedIds.filter(type=>runtimeTypes.has(type));
for (const type of [...runtimeTypes, ...legacyTypes]) {
  if (!componentsById.has(type)) throw new Error(`Registry type is absent from accepted catalog: ${type}`);
}
for (const type of implementedIds) {
  const component=componentsById.get(type);
  if (!runtimeTypes.has(type)&&component.declarativeRequirement!=='required-or-documented-exception')
    throw new Error(`Implemented component is absent from active registry without a documented exception: ${type}`);
}

const selectedComponents = componentArgument
  ? [componentsById.get(componentArgument.startsWith('ui.') ? componentArgument : `ui.${componentArgument}`)]
  : catalog.components;
if (selectedComponents.some((component) => !component)) throw new Error(`Unknown component: ${componentArgument}`);
if(syncTrackingMode&&(componentArgument||outputArgument))throw new Error('--sync-tracking updates only repository tracking outputs and cannot be combined with --component or --output');

const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const list = (values) => values.length ? values.map((value) => `\`${value}\``).join(', ') : 'None';
const scaffoldSnapshotState = (component) => component.sourceState === 'poc-implemented-unverified-production' ? 'implemented' : 'scaffolded';
const scaffoldSnapshotEvidence=(component)=>scaffoldSnapshotState(component)==='implemented'
  ? 'POC source, M1 Storybook story, and M1 scoped verification'
  : component.sourceState==='schema-only-unimplemented'?'schema-only compatibility fixture; no runtime adapter':'none';
const scaffoldSnapshotPackage=(component)=>scaffoldSnapshotState(component)==='implemented'?(component.id==='ui.KpiCard'?'react-core (temporary POC location; catalog target remains react-data)':'react-core'):null;
const statusLabel = (component) => scaffoldSnapshotState(component) === 'implemented'
  ? 'IMPLEMENTED POC; PRODUCTION VERIFICATION PENDING'
  : 'NOT IMPLEMENTED';

const componentPlan = (component) => `# ${component.id} — contract tracking plan (${statusLabel(component)})

- Catalog ID: \`${component.id}\`
- Target package: \`${component.package}\`; family: \`${component.family}\`
- Classification: \`${component.classification}\`
- Export policy: \`${component.exportPolicy}\`
- Lifecycle status: \`${scaffoldSnapshotState(component)}\`
- Implementation milestone: \`${component.implementationMilestone}\`
- Complexity: \`${component.complexity}\`
- Declarative requirement: \`${component.declarativeRequirement}\`
- Current evidence: ${scaffoldSnapshotEvidence(component)}
- Current implementation package: ${scaffoldSnapshotPackage(component) ? `\`${scaffoldSnapshotPackage(component)}\`` : 'None'}
- Baseline design references: ${list(component.visualReferenceFiles)}
- Candidate dependencies: ${list(component.candidateDependencies)}
- Acceptance focus: ${component.acceptanceFocus}
- Direct JSX API: **proposal; define typed props, callbacks, and slots during the owning implementation milestone**
- Declarative JSON subset: **proposal; use the canonical versioned schema, named actions/bindings, and no executable JSON**
- State dimensions: **identify applicable data, interaction, connectivity, freshness, editing, and approval states before implementation**
- Keyboard/ARIA/focus: **define roles, keyboard model, focus ownership, and alternatives to pointer interactions before implementation**
- Themes/density/responsive: light, dark, high contrast, compact, comfortable, and documented narrow-container behavior
- Proposed Storybook scenarios: ${list(component.suggestedStoryScenarios)}
- Risk-targeted tests: propose only when real behavior exists; do not generate placeholder tests
- Release blockers: API review, implementation evidence, scoped verification, and release approval

${scaffoldSnapshotState(component) === 'implemented'
  ? '**Existing POC implementation only. This scaffold does not broaden its API, package exports, or production-readiness claim.**'
  : '**NOT a functional component. Do not export, register, or publish it until implementation and gate approval.**'}
`;

const schemaPlan = (component) => json({
  schemaPlanVersion: '1.0.0',
  componentId: component.id,
  status: planningTypes.has(component.id)
    ? scaffoldSnapshotState(component) === 'implemented' ? 'runtime-schema-with-implemented-adapter' : 'compatibility-schema-only-unimplemented'
    : 'proposal-only',
  serializable: component.declarativeRequirement === 'required' ? 'required-pending-contract' : 'required-or-documented-exception',
  canonicalDocumentSchemaVersion: '1.0.0',
  activeRegistryVersion: scaffoldSnapshotState(component) === 'implemented' ? '1.1.0' : '1.1.0',
  preservedRegistryVersion: '1.0.0',
  props: {},
  slots: [],
  actions: [],
  bindings: [],
  accessibilityRules: [],
  note: planningTypes.has(component.id)
    ? 'Existing registry compatibility is preserved. Do not expand or migrate it from this planning artifact.'
    : 'Not a runtime schema. Do not add it to the registry until reviewed, implemented, versioned, and validated.',
});

const storiesPlan = (component) => json({
  componentId: component.id,
  status: scaffoldSnapshotState(component) === 'implemented' ? 'implemented-story-present' : 'proposal-only',
  scenarios: component.suggestedStoryScenarios,
  themes: ['light', 'dark', 'high-contrast'],
  densities: ['comfortable', 'compact'],
  note: scaffoldSnapshotState(component) === 'implemented'
    ? 'Track the existing real story; do not infer production verification.'
    : 'Do not generate a fake rendering story. Add stories only when working component source exists.',
});

const testPlan = (component) => `# ${component.id} — test plan (PROPOSED, NOT AUTHORIZED)

| ID | Target | Exact command | Assertions | Scope/browser/fixture | Why necessary | Status |
|---|---|---|---|---|---|---|
| Proposed only | Relevant unit, interaction, or E2E behavior | Supply a runnable command at the owning milestone gate | Define behavior-specific assertions | Name exact component, browser/viewport, and fixture | Tie to an identified risk | pending approval |

Do not create bulk placeholder tests. Do not run tests without milestone test approval. After results, request separate commit approval.
`;

const focusedTypeDraft = (component) => `/**
 * CONTRACT DRAFT ONLY for ${component.id}.
 * This file is outside production source and is not exported or compiled.
 */
export interface ${component.name}PropsDraft {
  /** Replace with reviewed properties during ${component.implementationMilestone}. */
  readonly __contractDraft?: never;
}
`;

const focusedSchemaDraft = (component) => json({
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: `urn:enterprise-ui:draft:${component.id}`,
  title: `${component.name} props contract draft`,
  type: 'object',
  additionalProperties: false,
  properties: {},
  'x-status': 'draft-not-runtime',
  'x-component-id': component.id,
  note: 'Focused scaffold only. Review and implement before moving into packages/contracts/schemas or the runtime registry.',
});

const focusedStoryDraft = (component) => `/** Story contract draft only; not discovered by Storybook. */
export const storyPlan = ${JSON.stringify({
  title: `${component.package}/${component.name}`,
  componentId: component.id,
  scenarios: component.suggestedStoryScenarios,
  status: 'draft-not-runnable',
}, null, 2)} as const;
`;

const expectedFiles = new Map();
for (const component of selectedComponents) {
  const base = `scaffolds/${component.package}/${component.name}`;
  expectedFiles.set(`${base}/component.plan.md`, componentPlan(component));
  expectedFiles.set(`${base}/schema.plan.json`, schemaPlan(component));
  expectedFiles.set(`${base}/stories.plan.json`, storiesPlan(component));
  expectedFiles.set(`${base}/test.plan.md`, testPlan(component));
  if (componentArgument) {
    expectedFiles.set(`${base}/implementation-draft/${component.name}.types.draft.ts`, focusedTypeDraft(component));
    expectedFiles.set(`${base}/implementation-draft/${component.name}.schema.draft.json`, focusedSchemaDraft(component));
    expectedFiles.set(`${base}/implementation-draft/${component.name}.stories.draft.tsx`, focusedStoryDraft(component));
  }
}

const counts = Object.fromEntries([...lifecycleStates].map((state) => [state, catalog.components.filter((item) => item.lifecycleState === state).length]));
const classificationCounts = Object.fromEntries([...classifications].map((classification) => [classification, catalog.components.filter((item) => item.classification === classification).length]));
if (!componentArgument) {
  const statusDocument = {
    schemaVersion: '1.0.0',
    catalogVersion: catalog.schemaVersion,
    catalogSourceSha256: catalog.sourceCatalogSha256,
    summary: { total: catalog.components.length, byStatus: counts, byClassification: classificationCounts },
    registryCompatibility: {
      preserved: { version: legacyRegistry.registryVersion, componentIds: [...legacyTypes] },
      active: { version: runtimeRegistry.registryVersion, componentIds: [...runtimeTypes] },
      implementedAdapterIds: renderableIds,
      note: 'Schema-only registry entries remain compatibility fixtures and have no renderer adapter.',
    },
    components: catalog.components.map((component) => ({
      id: component.id,
      name: component.name,
      package: component.package,
      classification: component.classification,
      exportPolicy: component.exportPolicy,
      status: component.lifecycleState,
      dependencies: component.candidateDependencies,
      artifacts: Object.fromEntries(component.scaffoldArtifacts.map((artifact) => [artifact, `scaffolds/${component.package}/${component.name}/${artifact}`])),
      implementationEvidence: component.implementationEvidence,
      implementationPackage: component.implementationPackage,
    })),
  };
  expectedFiles.set('catalog/catalog-status.json', json(statusDocument));

  const implementationStatus = `// GENERATED from catalog/components.v1.json. DO NOT EDIT.\n` +
    `export const implementedComponentTypes = ${JSON.stringify(implementedIds)} as const;\n` +
    `export type ImplementedComponentType = typeof implementedComponentTypes[number];\n` +
    `const implementedComponentTypeSet: ReadonlySet<string> = new Set(implementedComponentTypes);\n` +
    `export const isImplementedComponentType = (value: string): value is ImplementedComponentType => implementedComponentTypeSet.has(value);\n`;
  expectedFiles.set('packages/contracts/src/generated/catalog-status.ts', implementationStatus);

  const packageRows = [...packageOrder.keys()].map((packageName) => {
    const members = catalog.components.filter((item) => item.package === packageName);
    return `| \`${packageName}\` | ${members.length} | ${members.filter((item) => item.lifecycleState === 'scaffolded').length} | ${members.filter((item) => item.lifecycleState === 'implemented').length} |`;
  }).join('\n');
  const dashboard = `# Component catalog status

Generated from \`catalog/components.v1.json\`. Do not edit this dashboard directly.

## Lifecycle summary

| Status | Count |
|---|---:|
${[...lifecycleStates].map((state) => `| ${state} | ${counts[state]} |`).join('\n')}
| **Total** | **${catalog.components.length}** |

## Classification summary

| Classification | Count |
|---|---:|
${[...classifications].map((classification) => `| ${classification} | ${classificationCounts[classification]} |`).join('\n')}

## Package summary

| Target package | Units | Scaffolded | Implemented |
|---|---:|---:|---:|
${packageRows}

## Runtime and compatibility boundary

- Registry \`1.0.0\` remains preserved with ${legacyTypes.size} entries.
- Active foundational registry \`${runtimeRegistry.registryVersion}\` contains ${runtimeTypes.size} schema entries; prior registry fixtures remain preserved.
- Renderer adapters exist for the registered lifecycle-implemented or verified units: ${list(renderableIds)}.
- The legacy \`ui.ActivityFeed\` schema is now backed by the M5 \`react-operations\` implementation; registered types without a supplied runtime adapter still fail closed.
- The accepted M4 data and M5 operations serialized subsets are implemented by their target packages; documented JSX-only exceptions remain outside the registry.

No scaffold is a public export, a runtime registration, a Storybook story, or evidence of implementation.
`;
  expectedFiles.set('docs/catalog-status.md', dashboard);
}

const conflicts = [];
const missing = [];
const unchanged = [];
const trackingPaths=new Set(['catalog/catalog-status.json','packages/contracts/src/generated/catalog-status.ts','docs/catalog-status.md']);
for (const [path, content] of expectedFiles) {
  const destination = resolve(outputRoot, path);
  if (!destination.startsWith(`${outputRoot}/`) && destination !== outputRoot) throw new Error(`Unsafe output path: ${destination}`);
  if (!existsSync(destination)) missing.push(path);
  else if (readFileSync(destination, 'utf8') === content) unchanged.push(path);
  else conflicts.push(path);
}

if(syncTrackingMode){
  for(const path of trackingPaths){
    const destination=resolve(repositoryRoot,path);
    mkdirSync(dirname(destination),{recursive:true});
    writeFileSync(destination,expectedFiles.get(path));
  }
  console.log(`Tracking sync complete: ${trackingPaths.size} generated files updated; scaffold plans untouched`);
} else if (conflicts.length) {
  console.error(`Refusing to overwrite ${conflicts.length} differing file(s):`);
  for (const path of conflicts) console.error(`  ${path}`);
  process.exitCode = 1;
} else if (checkMode && missing.length) {
  console.error(`Catalog scaffold drift: ${missing.length} expected file(s) missing`);
  for (const path of missing) console.error(`  ${path}`);
  process.exitCode = 1;
} else if (writeMode) {
  for (const path of missing) {
    const destination = resolve(outputRoot, path);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, expectedFiles.get(path));
  }
  console.log(`Scaffold complete: ${missing.length} created, ${unchanged.length} unchanged, 0 overwritten`);
} else if (checkMode) {
  console.log(`Catalog scaffold check passed: ${unchanged.length} files match`);
} else {
  console.log(`Dry run: ${missing.length} would be created, ${unchanged.length} unchanged, 0 overwritten`);
}

console.log(`Catalog: ${catalog.components.length} units; ${counts.scaffolded} scaffolded; ${counts.implemented} implemented; ${counts.verified} verified; ${counts.released} released`);
console.log(`Output root: ${isAbsolute(outputRoot) ? outputRoot : resolve(outputRoot)} (${relative(repositoryRoot, outputRoot) || '.'})`);

