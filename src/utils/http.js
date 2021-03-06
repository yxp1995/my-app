import axios from "axios";
import { getToken } from './localstorage/token.js';


// 创建axios对象,配置baseurl
let http = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 40000
});


// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 筛选需要添加headers的接口添加上headers
    const { url } = config
    if (
        url.startsWith('/user') &&
        !url.startsWith('/user/login') &&
        !url.startsWith('/user/registered')
    ) {
        // 添加请求头
        config.headers.Authorization = JSON.parse(getToken())
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http;