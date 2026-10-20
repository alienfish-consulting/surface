import * as React from 'react';
import {test,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {assertDesignDocument,registryVersion} from '@alienfishconsulting/surface-contracts';
import type {DesignDocument} from '@alienfishconsulting/surface-contracts';
import {DesignRenderer,defaultAdapters} from '@alienfishconsulting/surface-react-renderer';
import {Button,ButtonGroup,VirtualList} from '@alienfishconsulting/surface-react-core';
import fixture from '../packages/contracts/fixtures/vertical-slice.design.json';
test('renders same versioned fixture from registry',()=>{
 const html=renderToStaticMarkup(<DesignRenderer doc={assertDesignDocument(fixture)} host={{data:{metrics:{activeCustomers:1240,revenue:90000},form:{query:''}},requestAction:()=>{}}}/>);
 expect(html).toContain('Active customers');expect(html).toContain('1,240');expect(html).toContain('Customer search');
});
test('supports direct JSX on same components',()=>{
 expect(renderToStaticMarkup(<Button label="Direct JSX"/>)).toContain('Direct JSX');
});
test('renders grouped and virtualized controls with valid accessibility semantics',()=>{
 const group=renderToStaticMarkup(<ButtonGroup label="History" orientation="vertical"><Button label="Undo"/></ButtonGroup>);
 const list=renderToStaticMarkup(<VirtualList label="Results" items={['One']} height={100} rowHeight={32} renderItem={item=>item}/>);
 expect(group).toContain('role="group"');expect(group).not.toContain('aria-orientation');
 expect(list).toContain('role="list"');expect(list).toContain('tabindex="0"');
});
test('fails closed when a host supplies no adapter for a registered implementation',()=>{
 const schemaOnly=structuredClone(assertDesignDocument(fixture));
 const node=schemaOnly.root.children![0]!.children![0]!;
 node.type='ui.ActivityFeed';
 node.props={title:'Activity'};
 delete node.bindings;
 const adapters=new Map([...defaultAdapters].filter(([type])=>type!=='ui.ActivityFeed'));
 expect(()=>renderToStaticMarkup(<DesignRenderer doc={schemaOnly} host={{data:{},requestAction:()=>{}}} adapters={adapters}/>))
  .toThrow('Registered but not implemented in this slice: ui.ActivityFeed');
});
test('renders the serialized data subset with semantic table output',()=>{
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'data-render',revision:0,kind:'dashboard',themeId:'default',density:'comfortable',dataSources:['accounts'],actionIds:['grid.activate'],root:{id:'grid',type:'ui.DataGrid',props:{title:'Customers',columns:[{key:'name',label:'Name'}]},bindings:{rows:{sourceId:'accounts',pointer:''}},intents:{onRowActivate:{actionId:'grid.activate'}}}};
 const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{accounts:[{id:'1',name:'Acme'}]},requestAction:()=>{}}}/>);
 expect(html).toContain('<table>');expect(html).toContain('<caption>Customers</caption>');expect(html).toContain('Acme');
});
test('renders serialized operations state without executing host work',()=>{
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'status-render',revision:0,kind:'dashboard',themeId:'default',density:'comfortable',dataSources:[],actionIds:[],root:{id:'status',type:'ui.StatusPagePanel',props:{title:'Platform status',status:'degraded',message:'Queue latency'}}};
 const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{},requestAction:()=>{throw Error('unexpected host action')}}}/>);
 expect(html).toContain('Platform status');expect(html).toContain('degraded');expect(html).toContain('Queue latency');
});
test('renders provider-neutral serialized AI state',()=>{
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'ai-render',revision:0,kind:'workspace',themeId:'default',density:'comfortable',dataSources:[],actionIds:[],root:{id:'run',type:'ui.RunStatusPanel',props:{title:'Agent run',status:'degraded',message:'Waiting for human review'}}};
 const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{},requestAction:()=>{throw Error('unexpected execution')}}}/>);expect(html).toContain('Agent run');expect(html).toContain('Waiting for human review');
});
test('renders serialized designer validation state',()=>{const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'designer-render',revision:0,kind:'workspace',themeId:'default',density:'comfortable',dataSources:[],actionIds:[],root:{id:'validation',type:'ui.DesignerValidationPanel',props:{errors:['Unsupported component'],warnings:[]}}};const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{},requestAction:()=>{}}}/>);expect(html).toContain('Invalid');expect(html).toContain('Unsupported component')});
test('renders the foundational serialized subset and emits only named host intentions',()=>{
 const requests:unknown[]=[];
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'core-render',revision:0,kind:'form',themeId:'default',density:'comfortable',dataSources:[],actionIds:['form.change'],root:{id:'page',type:'ui.PageLayout',props:{},children:[{id:'field',type:'ui.Select',props:{label:'Environment',options:[{value:'prod',label:'Production'}]},intents:{onChange:{actionId:'form.change'}}}]}};
 const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{},requestAction:request=>{requests.push(request)}}}/>);
 expect(html).toContain('Environment');expect(html).toContain('Production');expect(requests).toEqual([]);
});
