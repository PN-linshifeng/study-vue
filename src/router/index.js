import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import About from '@/views/About';
import Login from '@/views/Login';
import BaseLayout from '@/layout/base';
import BasicsRouter from './basics';
import Vuex from './store';
import routers from './rou';
import User from './user';
import Order from './order';

export const route = [
  {
    path: '/',

    name: '首页s',
    redirect: { name: 'index' }, // 如果不做重定向控制台会警告
    component: BaseLayout, // 公共页头页尾
    children: [
      {
        path: '/',
        name: 'index',
        component: Home,
      }, // 首页main部分
      ...routers,
      ...BasicsRouter,
      ...Vuex,
      ...User,
      ...Order,
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
];
Vue.use(Router);

// 路由url

const router = new Router({
  mode: 'history',
  routes: route,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else if (localStorage.getItem('token') === null) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(item => item.meta.isLogin)) {
//     if (!localStorage.getItem('isLogin')) {
//       next({
//         path: '/router-meta/login',
//         query: {
//           from: to.path,
//         },
//       });
//     }
//   }
//   next();
// });

// 路由器过渡 使用localStorage记录状态  也可以用状态管理
const historyRouter = (function() {
  const state = {
    event: 'enter', // 记录enter或者leave。默认进入
    style: {
      enter: 'view-left', // 进入的样式
      leave: 'view-right', // 退出的样式
    },
    history: [], // history url 集合
  };
  // 设置localStorage
  localStorage.setItem('routerTransiton', state.style[state.event]);
  return {
    state,
    pushPath(path) {
      // 前进添加新的url
      state.history.push(path);
      state.event = 'enter';
      localStorage.setItem('routerTransiton', state.style[state.event]);
    },
    popPath() {
      // 后退删除url
      state.history.pop();
      state.event = 'leave';
      localStorage.setItem('routerTransiton', state.style[state.event]);
    },
  };
})();

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const len = historyRouter.state.history.length; // 获取history 的长度
  if (historyRouter.state.history[len - 2] && historyRouter.state.history[len - 2] === to.path) {
    // to.path 是否存在history倒数第二个，如果存在就是后退。
    historyRouter.popPath(); // 后退
  } else {
    historyRouter.pushPath(to.path); // 前进
  }
  next();
});
export default router;
