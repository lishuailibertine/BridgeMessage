/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/IdGenerator.ts":
/*!****************************!*\
  !*** ./src/IdGenerator.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass IdGenerator {\n    static rand() {\n        const arr = new Uint32Array(1);\n        window.crypto.getRandomValues(arr);\n        return arr[0] / (0xffffffff + 1);\n    }\n    /***\n     * Generates a random string of specified size\n     * @param size - The length of the string to generate\n     * @returns {string} - The generated random string\n     */\n    static text(size = 32) {\n        let text = \"\";\n        const possible = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\";\n        for (let i = 0; i < size; i++)\n            text += possible.charAt(Math.floor(IdGenerator.rand() * possible.length));\n        return text;\n    }\n}\nexports[\"default\"] = IdGenerator;\n\n\n//# sourceURL=webpack://bridgemessage/./src/IdGenerator.ts?");

/***/ }),

/***/ "./src/bridgemessage.ts":
/*!******************************!*\
  !*** ./src/bridgemessage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BridgeMessage = void 0;\nconst jshost_1 = __webpack_require__(/*! ./jshost */ \"./src/jshost.ts\");\nconst callbacks_1 = __webpack_require__(/*! ./callbacks */ \"./src/callbacks.ts\");\nconst IdGenerator_1 = __webpack_require__(/*! ./IdGenerator */ \"./src/IdGenerator.ts\");\nclass BridgeMessage {\n    constructor(handlerName) {\n        this.handlerName = handlerName;\n        this.addCallback();\n    }\n    sendMessage(method, params) {\n        return new Promise((resolve, reject) => {\n            let messageId = IdGenerator_1.default.text();\n            console.log(\"Request->\", method, messageId, params ? params : {});\n            var input = {\n                Method: method,\n                Params: params,\n                MessageId: messageId\n            };\n            callbacks_1.callbacks[messageId] = { reject, resolve };\n            if (jshost_1.default.ios) {\n                window[\"webkit\"].messageHandlers[this.handlerName].postMessage(JSON.stringify(input));\n            }\n            else if (jshost_1.default.android) {\n                window[this.handlerName].postMessage(JSON.stringify(input));\n            }\n            else {\n                window[this.handlerName + \"Callback\"](messageId, \"Invalid host\");\n            }\n        });\n    }\n    addCallback() {\n        const methodObject = { [this.handlerName + \"Callback\"]: callbacks_1.callback };\n        Object.assign(window, methodObject);\n    }\n}\nexports.BridgeMessage = BridgeMessage;\n\n\n//# sourceURL=webpack://bridgemessage/./src/bridgemessage.ts?");

/***/ }),

/***/ "./src/callbacks.ts":
/*!**************************!*\
  !*** ./src/callbacks.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.callback = exports.callbacks = void 0;\nexports.callbacks = new Array();\nfunction callback(messageId, error, result) {\n    console.log(\"response->\", messageId, error ? error : result);\n    for (var key in exports.callbacks) {\n        if (key == messageId) {\n            error ? exports.callbacks[key].reject(new Error(error)) : exports.callbacks[key].resolve(result);\n            delete exports.callbacks[key];\n            break;\n        }\n    }\n}\nexports.callback = callback;\n;\n\n\n//# sourceURL=webpack://bridgemessage/./src/callbacks.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__exportStar(__webpack_require__(/*! ./bridgemessage */ \"./src/bridgemessage.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./IdGenerator */ \"./src/IdGenerator.ts\"), exports);\n__exportStar(__webpack_require__(/*! ./jshost */ \"./src/jshost.ts\"), exports);\n\n\n//# sourceURL=webpack://bridgemessage/./src/index.ts?");

/***/ }),

/***/ "./src/jshost.ts":
/*!***********************!*\
  !*** ./src/jshost.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/**\n * js 宿主里面的相关方法\n */\n// 浏览器判断\nconst u = navigator.userAgent.toLowerCase();\nconst jshost = {\n    trident: u.indexOf('trident') > -1,\n    presto: u.indexOf('presto') > -1,\n    webKit: u.indexOf('appleWebKit') > -1,\n    gecko: u.indexOf('gecko') > -1 && u.indexOf('KHTML') === -1,\n    mobile: !!u.match(/appleWebKit.*mobile.*/),\n    ios: !!u.match(/\\(i[^;]+;( u;)? cpu.+mac os x/),\n    android: u.indexOf('android') > -1 || u.indexOf('linux') > -1,\n    iPhone: u.indexOf('iphone') > -1 || u.indexOf('mac') > -1,\n    iPad: u.indexOf('ipad') > -1,\n    iPod: u.indexOf('ipod') > -1,\n    webApp: u.indexOf('safari') === -1,\n    wx: u.indexOf('micromessenger') > -1,\n    nokia: u.indexOf('nokia') > -1,\n    pcwx: u.indexOf('windowswechat') > -1,\n    pc: !/Android|iPhone|SymbianOS|Windows\\s+Phone|iPad|iPod/i.test(u),\n    // ie: u.indexOf('msie') > -1,\n    ie: (u.indexOf('msie') > -1 || u.indexOf('edge') > -1 || u.indexOf('trident') > -1) && u.indexOf('opera') === -1,\n    x5: u.indexOf('mqqbrowser') > -1,\n    weibo: u.indexOf('weibo') > -1 || u.indexOf('Weibo') > -1,\n    iphoneX: !!u.match(/\\(i[^;]+;( u;)? cpu.+mac os x/) && screen.height >= 812,\n    iphone5: !!u.match(/\\(i[^;]+;( u;)? cpu.+mac os x/) && screen.height === 568 // ios终端\n};\nexports[\"default\"] = jshost;\n\n\n//# sourceURL=webpack://bridgemessage/./src/jshost.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;