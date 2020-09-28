import Layout from '@/views/order/layout';
import Hook from '@/views/jiqiao/hook/index';
import Key from '@/views/jiqiao/key/index';
import Communication from '@/views/jiqiao/communication/index';
import VModel from '@/views/jiqiao/v-model/index';
// import Parentchildren from '@/views/jiqiao/parent-children/index';

export default [
  {
    name: '技巧',
    path: '/jiqiao',
    component: Layout,
    redirect: { name: 'Hook' },
    children: [
      {
        path: '/jiqiao/index',
        name: 'Hook',
        component: Hook,
      },
      {
        path: '/jiqiao/$props-$attr',
        name: '组件通讯',
        component: Communication,
      },
      {
        path: '/jiqiao/key',
        name: 'key',
        component: Key,
      },
      {
        path: '/jiqiao/v-model',
        name: 'v-model',
        component: VModel,
      },
      // {
      //   path: '/jiqiao/parent-children',
      //   name: '$parent $children',
      //   component: Parentchildren,
      // },
    ],
  },
];
