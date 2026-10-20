import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect,test} from 'vitest';
import {ApprovalReview,ChatMessage,StreamingText,ToolCallCard,ToolResultViewer} from '@alienfishconsulting/surface-react-ai';
test('streaming and interrupted messages expose explicit state without executing work',()=>{const html=renderToStaticMarkup(<><StreamingText text="Partial" status="cancelled"/><ChatMessage message={{id:'1',role:'assistant',content:'Stopped',status:'cancelled'}}/></>);expect(html).toContain('cancelled');expect(html).toContain('Partial');expect(html).toContain('Stopped')});
test('tool inputs and results render unsafe values as text',()=>{const html=renderToStaticMarkup(<><ToolCallCard name="inspect" status="complete" input={{value:'<script>bad</script>'}}/><ToolResultViewer value={{result:'<img onerror=bad>'}}/></>);expect(html).not.toContain('<script>');expect(html).not.toContain('<img');expect(html).toContain('&lt;script&gt;')});
test('approval review exposes intentions but no authorization side effect during render',()=>{let calls=0;const html=renderToStaticMarkup(<ApprovalReview title="Review" summary="Host decides" onApprove={()=>calls++} onDeny={()=>calls++}/>);expect(html).toContain('Approve');expect(html).toContain('Deny');expect(calls).toBe(0)});
