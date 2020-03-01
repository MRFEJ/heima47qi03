import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import "./style/base.css"

// 导入全局过滤器
import "@/filter/filter.js"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
