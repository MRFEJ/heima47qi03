import requery from "@/utils/requery.js"
//   获取用户列表
export function userList(params) {
  return requery({
    url: '/user/list',
    params
  })
}

//   删除用户列表
export function userRemove(data) {
  return requery({
    url: '/user/remove',
    method: "post",
    data
  })
}

//   修改状态
export function userStatus(data) {
  return requery({
    url: '/user/status',
    method: "post",
    data
  })
}

//   新增用户
export function userAdd(data) {
  return requery({
    url: '/user/add',
    method: "post",
    data
  })
}

//   编辑用户
export function userEdit(data) {
  return requery({
    url: '/user/edit',
    method: "post",
    data
  })
}