import requery from "@/utils/requery.js"
// 获取用户信息
export function info() {
    return requery({
        url: '/info',
        method: 'get'
    })
}

// 退出
export function logout() {
    return requery({
        url: '/logout',
        method: 'get'
    })
}
