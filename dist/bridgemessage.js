"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeMessage = void 0;
const jshost_1 = require("./jshost");
const callbacks_1 = require("./callbacks");
const IdGenerator_1 = require("./IdGenerator");
class BridgeMessage {
    constructor(handlerName) {
        this.handlerName = handlerName;
        this.addCallback();
    }
    sendMessage(method, params) {
        return new Promise((resolve, reject) => {
            let messageId = IdGenerator_1.default.text();
            console.log("Request->", method, messageId, params ? params : {});
            var input = {
                Method: method,
                Params: params,
                MessageId: messageId
            };
            callbacks_1.callbacks[messageId] = { reject, resolve };
            if (jshost_1.default.ios) {
                window["webkit"].messageHandlers[this.handlerName].postMessage(JSON.stringify(input));
            }
            else if (jshost_1.default.android) {
                window[this.handlerName].postMessage(JSON.stringify(input));
            }
            else {
                window[this.handlerName + "Callback"](messageId, "Invalid host");
            }
        });
    }
    addCallback() {
        const methodObject = { [this.handlerName + "Callback"]: callbacks_1.callback };
        Object.assign(window, methodObject);
    }
}
exports.BridgeMessage = BridgeMessage;
