import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filters from './filters/filters.js'; // 过滤器管理
import { get, post } from './util/http.js'; // ajax请求封装

// Vue配置
Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$http = axios;
Vue.prototype.$get = get;
Vue.prototype.$post = post;

// axios配置
axios.defaults.withCredentials = true; // 开启接收header中的cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 设置标准编码格式

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 过滤器注册
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
