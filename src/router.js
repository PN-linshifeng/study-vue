import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import RouterMatch from './views/RouterMatch.vue';
import RouterNested from './views/RouterNested.vue';
import RouterNestedChild from './views/RouterNestedChild.vue';
// import RouterNestedChildGo from "./views/RouterNestedChildGo.vue";
import RouterNestedChildPush from './views/RouterNestedChildPush.vue';
import RouterNestedChildReplace from './views/RouterNestedChildReplace.vue';
import RouterNav from './views/RouterNav.vue';
import RouterName from './views/RouterName.vue';
import RouterViews from './views/RouterView.vue';
import RouterRedirect from './views/RouterRedirect.vue';
import RouterRedirectF from './views/RouterRedirectF.vue';
import RouterRedirectAlias from './views/RouterRedirectAlias.vue';
import RouterProps from './views/RouterProps.vue';
import RouterHistory from './views/RouterHistory.vue';
import RouterGuards from './views/RouterGuards.vue';
import MyInfo from './views/MyInfo.vue';
import Login from './views/Login.vue';
// import iframe from "./views/iframe.vue"
import RouterMeta from './views/RouterMeta';
import RouterTransition from './views/RouterTransition';
import RouterTransitionPage1 from './views/RouterTransitionPage1';
import RouterTransitionPage2 from './views/RouterTransitionPage2';

const RouterLazy = () => import(/* webpackChunkName: "group-lazy" */ './views/RouterLazy');

Vue.use(Router);

//路由url
var routers = [
  {
    path: '/router-match/:id?/:sort?',
    name: 'routerMatch',
    component: RouterMatch,
  },
  {
    path: '/router-nested',
    name: 'routerNested',
    component: RouterNested,
    children: [
      {
        path: 'child',
        component: RouterNestedChild,
      },
    ],
  },
  {
    path: '/router-nav',
    name: 'RouterNav',
    component: RouterNav,
    children: [
      {
        path: 'push/:userId?',
        name: 'push',
        component: RouterNestedChildPush,
      },
      {
        path: 'replace',
        name: 'replace',
        component: RouterNestedChildReplace,
      },
    ],
  },
  {
    path: '/router-name',
    name: 'RouterName',
    component: RouterName,
  },
  {
    path: '/router-view',
    name: 'RouterView',
    component: RouterViews,
    children: [
      {
        path: 'open-router-view',
        components: {
          default: RouterNestedChild, //默认命名
          viewUpFile: RouterNestedChildPush, //设置命名
        },
      },
    ],
  },
  {
    path: '/router-redirect/:id?',
    name: 'RouterRedirect',
    component: RouterRedirect,
    children: [
      {
        path: 'a',
        redirect: 'b', //string a链接重定向到b链接
      },
      {
        path: 'c',
        redirect: {
          name: 'redirectObject', //object c链接重定向到命名为redirectObject的路由
        },
      },
      {
        path: 'd',
        name: 'redirectObject',
      },
      {
        path: 'e/:name?',
        redirect: to => {
          //function e链接设置重定向
          var { hash, query, params } = to;

          if (query.to) {
            return {
              path: query.to,
              query: {
                name: query.name,
              },
            };
          }
          if (params.name) {
            return {
              path: `f/${params.name}`,
            };
          }
          if (hash) {
            return {
              path: `f`,
              hash: hash,
            };
          }
        },
      },
      {
        path: 'f/:name?',
        component: RouterRedirectF,
      },
      {
        path: 'alias',
        alias: '/a-a', //别名 可设置根路由
        components: {
          alias: RouterRedirectAlias,
        },
      },
      {
        path: 'alias2',
        alias: 'a-b', //别名 可设置子路由
        components: {
          alias: RouterRedirectAlias,
        },
      },
      {
        path: 'alias3',
        alias: ['a-c'], //别名 可设置数组路由
        components: {
          alias: RouterRedirectAlias,
        },
      },
    ],
  },
  {
    path: '/router-props/:id?',
    name: 'RouterProps',
    component: RouterProps,
    props: true,
    //如果是多视图
    //components:{default:centent,aside:Aside}
    // props:{default:true,aside:false},
    children: [
      {
        path: 'yanglili/:age?',
      },
    ],
  },
  {
    path: '/router-history',
    name: 'RouterHistory',
    component: RouterHistory,
  },
  {
    path: '/router-guards',
    name: 'RouterGuards',
    component: RouterGuards,
    children: [
      {
        path: 'my-info',
        name: 'MyInfo',
        component: MyInfo,
      },
      {
        path: 'login',
        name: 'ViewLogin',
        component: Login,
      },
    ],
  },
  {
    path: '/router-meta',
    name: 'RouterMeta',
    component: RouterMeta,
    meta: {
      isLogin: false,
    },
    children: [
      {
        path: 'my-info',
        name: 'MyInfo-2',
        meta: {
          isLogin: true,
        },
        component: MyInfo,
      },
      {
        path: 'login',
        name: 'ViewLogin-2',
        component: Login,
      },
    ],
  },
  {
    path: '/router-transition',
    name: 'RouterTransition',
    component: RouterTransition,
    children: [
      {
        path: 'page-1',
        components: {
          default: RouterTransitionPage1,
        },
      },
      {
        path: 'page-2',
        components: {
          default: RouterTransitionPage2,
        },
      },
      {
        path: 'page-3',
        components: {
          view: RouterTransitionPage1,
        },
      },
      {
        path: 'page-4',
        components: {
          view: RouterTransitionPage2,
        },
      },
    ],
  },
  {
    path: '/router-lazy',
    name: 'RouterLazy',
    component: RouterLazy,
  },
];

//基础

console.log([...basicsRoutes]);
var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
    ...routers,
    ...basicsRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/router-guards/my-info') >= 0) {
    if (localStorage.getItem('isLogin') == null) {
      next({
        path: '/router-guards/login',
        query: {
          from: to.path,
        },
      });
      return;
    }
  }
  next();
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.isLogin)) {
    if (!localStorage.getItem('isLogin')) {
      next({
        path: '/router-meta/login',
        query: {
          from: to.path,
        },
      });
    }
  }
  next();
});

//路由器过渡 使用localStorage记录状态  也可以用状态管理
let historyRouter = (function() {
  let state = {
    event: 'enter', //记录enter或者leave。默认进入
    style: {
      enter: 'view-left', //进入的样式
      leave: 'view-right', //退出的样式
    },
    history: [], //history url 集合
  };
  //设置localStorage
  localStorage.setItem('routerTransiton', state.style[state.event]);
  return {
    state,
    pushPath(path) {
      //前进添加新的url
      state.history.push(path);
      state.event = 'enter';
      localStorage.setItem('routerTransiton', state.style[state.event]);
    },
    popPath() {
      //后退删除url
      state.history.pop();
      state.event = 'leave';
      localStorage.setItem('routerTransiton', state.style[state.event]);
    },
  };
})();

//全局前置守卫
router.beforeEach((to, from, next) => {
  var len = historyRouter.state.history.length; //获取history 的长度
  if (historyRouter.state.history[len - 2] && historyRouter.state.history[len - 2] === to.path) {
    //to.path 是否存在history倒数第二个，如果存在就是后退。
    historyRouter.popPath(); //后退
  } else {
    historyRouter.pushPath(to.path); //前进
  }
  next();
});

export default router;
// http: //192.168.2.38:8000/#/router-guards/my-info
