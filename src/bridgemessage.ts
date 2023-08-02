import jsHost from "./jshost";
import { callback, callbacks } from "./callbacks";
import IdGenerator from "./IdGenerator";
export class BridgeMessage{
    private handlerName: string;
    constructor(handlerName: string){
        this.handlerName = handlerName;
        this.addCallback();
    }
    public sendMessage(method: any,params: any) : Promise<any>{
        return new Promise((resolve, reject) => {
           let messageId = method + "_" + IdGenerator.text(16);
           console.log("Request->",messageId, params ? params : {})
           var input ={
               Method :method,
               Params :params,
               MessageId: messageId
           };
           callbacks[messageId] = {reject,resolve}
           if (jsHost.ios){
               window["webkit"].messageHandlers[this.handlerName].postMessage(JSON.stringify(input))
           }else if(jsHost.android){
               window[this.handlerName].postMessage(JSON.stringify(input));
           }else{
               window[this.handlerName + "Callback"](messageId,"Invalid host")
           }
       })
    }
    private addCallback(){
        const methodObject = { [this.handlerName + "Callback"]: callback};
        Object.assign(window, methodObject);
    }
}