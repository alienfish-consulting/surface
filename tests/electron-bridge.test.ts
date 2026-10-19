import {describe,expect,test,vi} from 'vitest';
import {createBrowserBridge,createDesktopBridge,createRendererHost,isDesktopRequest} from '@enterprise-ui/electron-bridge';

describe('optional desktop bridge',()=>{
  test('browser fallback fails closed without importing Electron',async()=>{
    const bridge=createBrowserBridge();
    expect(bridge.available).toBe(false);
    await expect(bridge.request({capability:'notification',action:'show'})).resolves.toMatchObject({ok:false,code:'unavailable'});
  });
  test('allowlists capabilities and forwards only bounded requests',async()=>{
    const invoke=vi.fn(async()=>({ok:true as const,value:'accepted'}));
    const bridge=createDesktopBridge({invoke,allowedCapabilities:['notification']});
    await expect(bridge.request({capability:'window',action:'close'})).resolves.toMatchObject({ok:false,code:'not-allowed'});
    await expect(bridge.request({capability:'notification',action:'show',payload:{title:'Ready'}})).resolves.toEqual({ok:true,value:'accepted'});
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(isDesktopRequest({capability:'notification',action:'show',payload:BigInt(1)})).toBe(false);
  });
  test('creates a renderer-compatible host without authorizing actions itself',async()=>{
    const onAction=vi.fn();
    const host=createRendererHost({data:{status:'ready'},onAction});
    await host.requestAction({actionId:'document.save',nodeId:'save',event:'onPress'});
    expect(host.data).toEqual({status:'ready'});
    expect(onAction).toHaveBeenCalledWith({actionId:'document.save',nodeId:'save',event:'onPress'});
  });
});
