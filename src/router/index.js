import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/setting'
  },
  // 页面配置
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting/setting.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
