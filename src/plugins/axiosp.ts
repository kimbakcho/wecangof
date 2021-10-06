
import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// Add a request interceptor
axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    // config.withCredentials = true;
    return config;
}, function (error: any) {
    // Do something with request error
    return Promise.reject(error);
});

export default axios;
