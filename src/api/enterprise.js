import requery from "@/utils/requery.js"
//   获取企业列表
export function enterpriseList(params) {
  return requery({
    url: '/enterprise/list',
    params
  })
}

//   删除企业列表
export function enterpriseRemove(data) {
  return requery({
    url: '/enterprise/remove',
    method: "post",
    data
  })
}

//   修改状态
export function enterpriseStatus(data) {
  return requery({
    url: '/enterprise/status',
    method: "post",
    data
  })
}

//   新增企业
export function enterpriseAdd(data) {
  return requery({
    url: '/enterprise/add',
    method: "post",
    data
  })
}

//   编辑企业
export function enterpriseEdit(data) {
  return requery({
    url: '/enterprise/edit',
    method: "post",
    data
  })
}