import * as React from 'react';
import {test,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {assertDesignDocument,registryVersion} from '@enterprise-ui/contracts';
import type {DesignDocument} from '@enterprise-ui/contracts';
import {DesignRenderer} from '@enterprise-ui/react-renderer';
import {Button} from '@enterprise-ui/react-core';
import fixture from '../packages/contracts/fixtures/vertical-slice.design.json';
test('renders same versioned fixture from registry',()=>{
 const html=renderToStaticMarkup(<DesignRenderer doc={assertDesignDocument(fixture)} host={{data:{metrics:{activeCustomers:1240,revenue:90000},form:{query:''}},requestAction:()=>{}}}/>);
 expect(html).toContain('Active customers');expect(html).toContain('1,240');expect(html).toContain('Customer search');
});
test('supports direct JSX on same components',()=>{
 expect(renderToStaticMarkup(<Button label="Direct JSX"/>)).toContain('Direct JSX');
});
test('fails closed for the remaining schema-only compatibility entry',()=>{
 const schemaOnly=structuredClone(assertDesignDocument(fixture));
 const node=schemaOnly.root.children![0]!.children![0]!;
 node.type='ui.ActivityFeed';
 node.props={title:'Activity'};
 delete node.bindings;
 expect(()=>renderToStaticMarkup(<DesignRenderer doc={schemaOnly} host={{data:{},requestAction:()=>{}}}/>))
  .toThrow('Cataloged but not implemented: ui.ActivityFeed');
});
test('renders the serialized data subset with semantic table output',()=>{
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'data-render',revision:0,kind:'dashboard',themeId:'default',density:'comfortable',dataSources:['accounts'],actionIds:['grid.activate'],root:{id:'grid',type:'ui.DataGrid',props:{title:'Customers',columns:[{key:'name',label:'Name'}]},bindings:{rows:{sourceId:'accounts',pointer:''}},intents:{onRowActivate:{actionId:'grid.activate'}}}};
 const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{accounts:[{id:'1',name:'Acme'}]},requestAction:()=>{}}}/>);
 expect(html).toContain('<table>');expect(html).toContain('<caption>Customers</caption>');expect(html).toContain('Acme');
});
test('renders the foundational serialized subset and emits only named host intentions',()=>{
 const requests:unknown[]=[];
 const document:DesignDocument={schemaVersion:'1.0.0',registryVersion,id:'core-render',revision:0,kind:'form',themeId:'default',density:'comfortable',dataSources:[],actionIds:['form.change'],root:{id:'page',type:'ui.PageLayout',props:{},children:[{id:'field',type:'ui.Select',props:{label:'Environment',options:[{value:'prod',label:'Production'}]},intents:{onChange:{actionId:'form.change'}}}]}};
 const html=renderToStaticMarkup(<DesignRenderer doc={document} host={{data:{},requestAction:request=>{requests.push(request)}}}/>);
 expect(html).toContain('Environment');expect(html).toContain('Production');expect(requests).toEqual([]);
});
