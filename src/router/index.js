import Vue from "vue"

import login from "../view/login/login.vue"
import index from "@/view/index/index.vue"


// 导入子路由
import route from "./route.js"
// 导入验证用户信息
import { info } from "@/api/index.js"
// 导入进度条
import nprogress from "nprogress"
// 导入进度条的样式
import "nprogress/nprogress.css"

// 导入vuex数据仓库
import store from "@/store/vuex.js"

// 导入token工具
import { removeToken } from "@/utils/token.js"

// 导入单独使用message
import { Message } from 'element-ui';

// 导入 vue-router
import VueRouter from 'vue-router'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/login',
      component: login,  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: { title: "登录" }
    },
    {
      path: "/index",
      component: index,
      meta: { title: "首页", role: ['超级管理员', '管理员', '老师', '学生'] },
      children: route
    },
    {
      path: '/',  //路由重定向
      redirect: 'login', //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    }
  ]
})

// 白名单  无需验证token 普通用户可以观看的页面
let whileArr = ["/login", "/news"]
// 导入导航守卫  当路由改变前
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // 开启进度条
  nprogress.start()
  if (whileArr.includes(to.path)) {
    next();
  } else {
    info().then(res => {
      if (res.data.code == 200) {
        if (res.data.data.status==1) {
          if (from.path == "/login") {
            Message.success("登录成功!");
          }
          store.commit('changeName', res.data.data.username);
          store.commit('changeAvatar', process.env.VUE_APP_URL + "/" + res.data.data.avatar);
          store.commit('changeRole', res.data.data.role);
          if (to.meta.role.includes(res.data.data.role)) {
            next();
          } else {
            Message.warning("对不起,该身份无权访问!请与管理员联系!")
            next(from.path)
          }
        } else {
          Message.warning("对不起,该账号无权访问!请与管理员联系!")
          next("/login")
        }
      } else if (res.data.code == 206) {
        Message.error("登录异常,请重新登录")
        // 删除token
        removeToken();
        // 关闭进度条
        nprogress.done();
        // 出口为登录页
        next('/login');

      }
    })
  }
})
// 当路由改变后
router.afterEach((to) => {
  // 给页面的标题命名
  document.title = to.meta.title;
  // 关闭进度条
  nprogress.done();
  // to and from are both route objects.
})
export default router