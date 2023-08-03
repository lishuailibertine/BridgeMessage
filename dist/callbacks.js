"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = exports.callbacks = void 0;
exports.callbacks = new Array();
function callback(messageId, error, result) {
    console.log("response->", messageId, error ? error : result);
    for (var key in exports.callbacks) {
        if (key == messageId) {
            error ? exports.callbacks[key].reject(new Error(error)) : exports.callbacks[key].resolve(result);
            delete exports.callbacks[key];
            break;
        }
    }
}
exports.callback = callback;
;
