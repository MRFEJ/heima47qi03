import aixos from "axios"

export function login(data) {
    return aixos({
        url: process.env.VUE_APP_URL+'/login',
        method:'post',
        data,
        withCredentials:true
    })
}