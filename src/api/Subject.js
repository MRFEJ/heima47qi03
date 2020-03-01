import axios from "axios"

import { getToken } from "@/utils/token.js"

const SubjectRequery = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
})

SubjectRequery.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.token = getToken()
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//   获取学科列表
export function SubjectList(params) {
  return SubjectRequery({
    url: '/subject/list',
    params
  })
}

//   删除学科列表
export function SubjectRemove(data) {
  return SubjectRequery({
    url: '/subject/remove',
    method: "post",
    data
  })
}

//   修改状态
export function SubjectStatus(data) {
  return SubjectRequery({
    url: '/subject/status',
    method: "post",
    data
  })
}

//   新增学科
export function SubjectAdd(data) {
  return SubjectRequery({
    url: '/subject/add',
    method: "post",
    data
  })
}

//   编辑学科
export function SubjectEdit(data) {
  return SubjectRequery({
    url: '/subject/edit',
    method: "post",
    data
  })
}