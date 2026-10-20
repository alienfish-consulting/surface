import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect,test} from 'vitest';
import {ActivityFeed,ApprovalCard,InfrastructureTopology,reduceStream} from '@alienfishconsulting/surface-react-operations';

test('stream reducer orders bursts, deduplicates retransmission, and preserves orthogonal connection state',()=>{
 const initial={connection:'loading' as const,items:[],lastSequence:0};
 const snapshot=reduceStream(initial,{type:'snapshot',items:[{id:'2',sequence:2,timestamp:'10:02',message:'second'},{id:'1',sequence:1,timestamp:'10:01',message:'first'}]});
 expect(snapshot.items.map(item=>item.id)).toEqual(['1','2']);
 const duplicate=reduceStream(snapshot,{type:'event',item:{id:'2',sequence:2,timestamp:'10:02',message:'second'}});
 expect(duplicate.items).toHaveLength(2);
 expect(reduceStream(duplicate,{type:'disconnected'}).connection).toBe('reconnecting');
 expect(reduceStream(duplicate,{type:'failed',error:'offline'})).toMatchObject({connection:'failed',error:'offline',lastSequence:2});
});

test('workflow states render as text and approvals remain host intentions',()=>{
 const html=renderToStaticMarkup(<><ActivityFeed connection="stale" items={[{id:'1',sequence:1,timestamp:'10:01',message:'<unsafe>'}]}/><ApprovalCard approval={{id:'a',title:'Deploy',status:'pending',revision:7}} onDecision={()=>{}}/></>);
 expect(html).toContain('&lt;unsafe&gt;');expect(html).toContain('stale');expect(html).toContain('Approve');expect(html).toContain('Deny');
});

test('topology provides keyboard buttons while edges remain presentational',()=>{
 const html=renderToStaticMarkup(<InfrastructureTopology nodes={[{id:'a',label:'API',x:20,y:50},{id:'b',label:'DB',x:80,y:50}]} edges={[{id:'e',from:'a',to:'b'}]}/>);
 expect(html.match(/<button/g)).toHaveLength(2);expect(html).toContain('<line');expect(html).toContain('aria-hidden="true"');
});
