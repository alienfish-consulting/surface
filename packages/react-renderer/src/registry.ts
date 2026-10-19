import {coreAdapters} from './core-adapters.js';
import {dataAdapters} from './data-adapters.js';
import {operationsAdapters} from './operations-adapters.js';
import {aiAdapters} from './ai-adapters.js';
import {designerAdapters} from './designer-adapters.js';
import type {Adapter} from './core-adapters.js';

export {coreAdapters,dataAdapters,operationsAdapters,aiAdapters,designerAdapters};
export const defaultAdapters:ReadonlyMap<string,Adapter>=new Map([...coreAdapters,...dataAdapters,...operationsAdapters,...aiAdapters,...designerAdapters]);
