export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;
export const BASE_URL = import.meta.env.BASE_URL;
// 是否开启加密
export const isEncrypt = window.ENCRYPT;

export const isTLS = location.protocol === 'https:';
export const baseIP = '10.17.196.46';
export const baseWS = isTLS ? 'wss:' : 'ws:';
export const basePort = isTLS ? 8443 : 8000;
// 环境判断
export const isWujie = window.__POWERED_BY_WUJIE__;
export const isQinkun = window.__POWERED_BY_QIANKUN__;
export const isNested = window.top !== window.self && !isWujie && !isQinkun;
// 基础资源路径
export const baseUrl = isDev ? '/baseUrl' : location.origin;
// 微前端子应用
export const microUrl = isDev ? `https://${baseIP}:8443` : '';
// 静态资源路径
export const assetUrl = isDev ? `${baseUrl}/assets` : `${baseUrl}/assets`;
// 巡视资源路径
export const patrolUrl = isDev ? `${baseUrl}/patrol` : `${baseUrl}/patrol`;
// 三维巡视地址
export const threedUrl = isDev ? `${microUrl}/threed/` : `${baseUrl}/threed/`;
// 消息推送地址
export const socketUrl = isDev ? `wss://${baseIP}:8443/ws` : `${baseWS}//${location.host}/ws`;
// 流媒体配置
export const mediaConfig = {
  url: 'ws://localhost:12001',
  ip: isDev ? baseIP : location.hostname,
  port: '15600',
};
