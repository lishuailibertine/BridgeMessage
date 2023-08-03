"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * js 宿主里面的相关方法
 */
// 浏览器判断
const u = navigator.userAgent.toLowerCase();
const jshost = {
    trident: u.indexOf('trident') > -1,
    presto: u.indexOf('presto') > -1,
    webKit: u.indexOf('appleWebKit') > -1,
    gecko: u.indexOf('gecko') > -1 && u.indexOf('KHTML') === -1,
    mobile: !!u.match(/appleWebKit.*mobile.*/),
    ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
    android: u.indexOf('android') > -1 || u.indexOf('linux') > -1,
    iPhone: u.indexOf('iphone') > -1 || u.indexOf('mac') > -1,
    iPad: u.indexOf('ipad') > -1,
    iPod: u.indexOf('ipod') > -1,
    webApp: u.indexOf('safari') === -1,
    wx: u.indexOf('micromessenger') > -1,
    nokia: u.indexOf('nokia') > -1,
    pcwx: u.indexOf('windowswechat') > -1,
    pc: !/Android|iPhone|SymbianOS|Windows\s+Phone|iPad|iPod/i.test(u),
    // ie: u.indexOf('msie') > -1,
    ie: (u.indexOf('msie') > -1 || u.indexOf('edge') > -1 || u.indexOf('trident') > -1) && u.indexOf('opera') === -1,
    x5: u.indexOf('mqqbrowser') > -1,
    weibo: u.indexOf('weibo') > -1 || u.indexOf('Weibo') > -1,
    iphoneX: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) && screen.height >= 812,
    iphone5: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) && screen.height === 568 // ios终端
};
exports.default = jshost;
