import Vue from "vue"

import login from "../view/login/login.vue"
import index from "@/view/index/index.vue"

import overview from "@/view/index/overview/overview.vue"
import users from "@/view/index/users/users.vue"
import Question from "@/view/index/Question/Question.vue"
import Companies from "@/view/index/Companies/Companies.vue"
import Subject from "@/view/index/Subject/Subject.vue"

// 导入验证用户信息
import { info } from "@/api/index.js"
// 导入进度条
import nprogress from "nprogress"
// 导入进度条的样式
import "nprogress/nprogress.css"

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
      component: login  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: "/index",
      component: index,
      children: [
        { path: 'overview', component: overview },
        { path: 'users', component: users },
        { path: 'Question', component: Question },
        { path: 'Companies', component: Companies },
        { path: 'Subject', component: Subject },
      ]
    }
    //  {
    // path: '*',  //路由重定向
    // redirect: '/', //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    //  }
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
        next();
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
router.afterEach(() => {
  // 关闭进度条
  nprogress.done();
  // to and from are both route objects.
})
export default router