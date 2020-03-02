import requery from "@/utils/requery.js"
//   获取学科列表
export function SubjectList(params) {
  return requery({
    url: '/subject/list',
    params
  })
}

//   删除学科列表
export function SubjectRemove(data) {
  return requery({
    url: '/subject/remove',
    method: "post",
    data
  })
}

//   修改状态
export function SubjectStatus(data) {
  return requery({
    url: '/subject/status',
    method: "post",
    data
  })
}

//   新增学科
export function SubjectAdd(data) {
  return requery({
    url: '/subject/add',
    method: "post",
    data
  })
}

//   编辑学科
export function SubjectEdit(data) {
  return requery({
    url: '/subject/edit',
    method: "post",
    data
  })
}