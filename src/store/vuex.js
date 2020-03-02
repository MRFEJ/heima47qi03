
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        //数据
        // 用户名
        username: '',
        // 用户头像
        userAvatar: '',
        // 账号身份
        Role: ''
    },
    mutations: {
        //改数据的方法
        changeName(state, val) {
            state.username = val
        },
        changeAvatar(state, val) {
            state.userAvatar = val
        },
        changeRole(state, val) {
            state.Role = val
        }

    },
})
export default store