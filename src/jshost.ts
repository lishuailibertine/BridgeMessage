/**
 * js 宿主里面的相关方法
 */
// 浏览器判断
const u = navigator.userAgent.toLowerCase()
const jshost = { // 移动终端浏览器版本信息
    trident: u.indexOf('trident') > -1, // IE内核
    presto: u.indexOf('presto') > -1, // opera内核
    webKit: u.indexOf('appleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/appleWebKit.*mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), // ios终端
    android: u.indexOf('android') > -1 || u.indexOf('linux') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iphone') > -1 || u.indexOf('mac') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('ipad') > -1, // 是否iPad
    iPod: u.indexOf('ipod') > -1,
    webApp: u.indexOf('safari') === -1, // 是否web应该程序，没有头部与底部
    wx: u.indexOf('micromessenger') > -1,
    nokia: u.indexOf('nokia') > -1,
    pcwx: u.indexOf('windowswechat') > -1,
    pc: !/Android|iPhone|SymbianOS|Windows\s+Phone|iPad|iPod/i.test(u),
    // ie: u.indexOf('msie') > -1,
    ie: (u.indexOf('msie') > -1 || u.indexOf('edge') > -1 || u.indexOf('trident') > -1) && u.indexOf('opera') === -1,
    x5: u.indexOf('mqqbrowser') > -1,
    weibo: u.indexOf('weibo') > -1 || u.indexOf('Weibo') > -1,
    iphoneX: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) && screen.height >= 812, // ios终端
    iphone5: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) && screen.height === 568 // ios终端
  }
  export default jshost