import axios from "axios"

// 导入token工具
import { getToken } from "@/utils/token"

let indexRequery = axios.create({
    baseURL: process.env.VUE_APP_URL
})

// 导入请求拦截  原因:在index页面发送请求的时候拦截下来 给请求内容加上token  谁发送的aioxs请求就拦截谁 这里是indexRequery发送的

indexRequery.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 获取用户信息
export function info() {
    return indexRequery({
        url: '/info',
        method: 'get'
    })
}

// 退出
export function logout() {
    return indexRequery({
        url: '/logout',
        method: 'get'
    })
}
