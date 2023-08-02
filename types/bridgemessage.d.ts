declare class BridgeMessage {
    private handlerName;
    constructor(handlerName: string);
    sendMessage(method: any, params: any): Promise<any>;
    private addCallback;
}
export default BridgeMessage;
