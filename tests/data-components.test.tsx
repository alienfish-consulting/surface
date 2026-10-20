import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect,test} from 'vitest';
import {Calendar,Chart,CodeViewer,DataGrid,DataInspector,DiffViewer,FileTree,Heatmap,JsonViewer} from '@alienfishconsulting/surface-react-data';

const columns=[{key:'name',label:'Name',sortable:true},{key:'score',label:'Score',align:'end' as const}];

test('data grid renders semantic headers and bounds its initial large-data window',()=>{
 const rows=Array.from({length:10_000},(_,index)=>({id:String(index),name:`Account ${index}`,score:index}));
 const html=renderToStaticMarkup(<DataGrid title="Accounts" columns={columns} rows={rows} windowSize={125}/>);
 expect(html).toContain('<caption>Accounts</caption>');
 expect(html).toContain('aria-sort="none"');
 expect(html).toContain('Account 124');
 expect(html).not.toContain('Account 125</td>');
 expect(html).toContain('Showing 125 of 10,000 records');
});

test('data visualizations include accessible text alternatives',()=>{
 const chart=renderToStaticMarkup(<Chart title="Requests" data={[{x:'Jan',y:12},{x:'Feb',y:18}]} type="line"/>);
 const heatmap=renderToStaticMarkup(<Heatmap label="Risk" rows={['Low']} columns={['Open']} cells={[{row:'Low',column:'Open',value:4}]}/>);
 expect(chart).toContain('aria-label="Requests. Jan: 12, Feb: 18"');
 expect(heatmap).toContain('<caption>Risk</caption>');
 expect(heatmap).toContain('>4</span>');
});

test('calendar grid cells are grouped in accessible rows',()=>{
 const html=renderToStaticMarkup(<Calendar month="2026-10" events={[]}/>);
 expect(html).toContain('role="grid"');
 expect(html).toContain('role="row"><div role="gridcell"');
});

test('inspectors render untrusted values as escaped text',()=>{
 const attack='<img src=x onerror=alert(1)>';
 const html=renderToStaticMarkup(<><DataInspector value={{attack}}/><JsonViewer value={{attack}}/><CodeViewer label="Source" code={attack}/><DiffViewer before={attack} after={`${attack}!`}/><FileTree nodes={[{id:'1',name:attack,kind:'file'}]}/></>);
 expect(html).not.toContain('<img');
 expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
});
