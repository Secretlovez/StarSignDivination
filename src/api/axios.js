import qs from 'qs';
import axios from 'axios';
import { baseUrl } from '@/config';

const request = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  withCredentials: false,
  paramsSerializer: (params) => qs.stringify(params),
});

request.interceptors.request.use(
  (config) => {
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
