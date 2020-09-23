import Layout from '@/views/order/layout';
import Hook from '@/views/jiqiao/hook/index';
import Key from '@/views/jiqiao/key/index';
import PropsAttr from '@/views/jiqiao/$props-$attr/index';

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
        name: 'PropsAttr',
        component: PropsAttr,
      },
      {
        path: '/jiqiao/key',
        name: 'key',
        component: Key,
      },
    ],
  },
];
