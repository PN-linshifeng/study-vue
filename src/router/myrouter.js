/* eslint-disable */
import RouterMatch from '@/views/router/RouterMatch';
import RouterNested from '@/views/router/RouterNested';
import RouterNestedChild from '@/views/router/RouterNestedChild';
import RouterNestedChildPush from '@/views/router/RouterNestedChildPush';
import RouterNestedChildReplace from '@/views/router/RouterNestedChildReplace';
import RouterNav from '@/views/router/RouterNav';
import RouterName from '@/views/router/RouterName';
import RouterViews from '@/views/router/RouterView';
import RouterRedirect from '@/views/router/RouterRedirect';
import RouterRedirectF from '@/views/router/RouterRedirectF';
import RouterRedirectAlias from '@/views/router/RouterRedirectAlias';
import RouterProps from '@/views/router/RouterProps';
import RouterHistory from '@/views/router/RouterHistory';
import RouterGuards from '@/views/router/RouterGuards';
import MyInfo from '@/views/router/MyInfo';
import RouterMeta from '@/views/router/RouterMeta';
import RouterTransition from '@/views/router/RouterTransition';
import RouterTransitionPage1 from '@/views/router/RouterTransitionPage1';
import RouterTransitionPage2 from '@/views/router/RouterTransitionPage2';
import Login from '@/views/Login';

const RouterLazy = () => import(/* webpackChunkName: "group-lazy" */ '@/views/router/RouterLazy'); // eslint-disable-line

const routers = [
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
          default: RouterNestedChild, // 默认命名
          viewUpFile: RouterNestedChildPush, // 设置命名
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
        redirect: 'b', // string a链接重定向到b链接
      },
      {
        path: 'c',
        redirect: {
          name: 'redirectObject', // object c链接重定向到命名为redirectObject的路由
        },
      },
      {
        path: 'd',
        name: 'redirectObject',
      },
      {
        path: 'e/:name?',
        redirect: to => {
          // function e链接设置重定向
          const { hash, query, params } = to;

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
              hash,
            };
          }
          return undefined;
        },
      },
      {
        path: 'f/:name?',
        component: RouterRedirectF,
      },
      {
        path: 'alias',
        alias: '/a-a', // 别名 可设置根路由
        components: {
          alias: RouterRedirectAlias,
        },
      },
      {
        path: 'alias2',
        alias: 'a-b', // 别名 可设置子路由
        components: {
          alias: RouterRedirectAlias,
        },
      },
      {
        path: 'alias3',
        alias: ['a-c'], // 别名 可设置数组路由
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
    // 如果是多视图
    // components:{default:centent,aside:Aside}
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

export default routers;
