import qs from 'qs';
import axios from 'axios';

const request = axios.create({
  timeout: 60000,
  withCredentials: false,
  paramsSerializer: (params) => qs.stringify(params),
});

request.interceptors.request.use(
  (config) => {
    // 秒级时间戳,10位
    const timestamp = Date.parse(new Date()) / 1000;
    config.headers['X-Ca-Timestamp'] = timestamp;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
