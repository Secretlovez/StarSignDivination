export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;
export const BASE_URL = import.meta.env.BASE_URL;

export const isTLS = location.protocol === 'https:';
export const baseIP = '10.17.196.46';
export const baseWS = isTLS ? 'wss:' : 'ws:';
export const basePort = isTLS ? 8443 : 8000;

export const baseUrl = isDev ? '/baseUrl' : location.origin;
export const baiduUrl = isDev ? '/baiduUrl' : 'https://aip.baidubce.com/';
export const juheUrl = isDev ? '/juheUrl' : 'https://apis.tianapi.com/';
