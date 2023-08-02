import jsHost from "./jshost";
import { callback } from "./callbacks";
class BridgeMessage{
    private handlerName: string;
    constructor(handlerName: string){
        this.handlerName = handlerName;
        this.addCallback();
    }
    public sendMessage(method: any,params: any) : Promise<any>{
        return new Promise((resolve, reject) => {
           let messageId = method + "_" + Date.now();
           console.log("Request->",messageId, params ? params : {})
           var input ={
               Method :method,
               Params :params,
               MessageId: messageId
           };
           callback[messageId] = {reject,resolve}
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
export default BridgeMessage;