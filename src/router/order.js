import Index from '@/views/order/index';
import Layout from '@/views/order/layout';
import Info from '@/views/order/info';

export default [
  {
    name: '订单',
    path: '/order',
    component: Layout,
    redirect: { name: '订单列表' },
    children: [
      {
        path: '/order/index',
        name: '订单列表',
        hidden: true,
        component: Index,
      },
      {
        path: '/order/:id',
        name: '订单详情',
        hidden: true,
        component: Info,
      },
    ],
  },
];
