// 声明常量保存存入硬盘的key值
let TOKENKET = "mytoken";

// 保存token
export function setToken(value) {
    return window.localStorage.setItem(TOKENKET, value)
}
// 获取token
export function getToken() {
    return window.localStorage.getItem(TOKENKET)
}
// 删除token
export function remocveToken() {
    return window.localStorage.removeItem(TOKENKET)
}
