// GENERATED from catalog/components.v1.json. DO NOT EDIT.
export const implementedComponentTypes = ["ui.AppShell","ui.Panel","ui.Button","ui.TextField","ui.KpiCard"] as const;
export type ImplementedComponentType = typeof implementedComponentTypes[number];
const implementedComponentTypeSet: ReadonlySet<string> = new Set(implementedComponentTypes);
export const isImplementedComponentType = (value: string): value is ImplementedComponentType => implementedComponentTypeSet.has(value);
