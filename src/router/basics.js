import BasicsIndex from '@/views/basics/index';
import BasicsInstance from '@/views/basics/Instance';
import Syntax from '@/views/basics/Syntax';
import computed from '@/views/basics/computed';
import Style from '@/views/basics/style';
import ifShow from '@/views/basics/ifShow';
import vFor from '@/views/basics/vFor';
import event from '@/views/basics/event';
import form from '@/views/basics/form';

let basicsRoutes = [
  {
    path: '/basics',
    name: 'BasicsIndex',
    component: BasicsIndex,
    children: [
      {
        path: 'instance',
        component: BasicsInstance,
      },
      {
        path: 'syntax',
        name: 'BasicsSyntax',
        component: Syntax,
      },
      {
        path: 'computed',
        name: 'computed',
        component: computed,
      },
      {
        path: 'style',
        name: 'style',
        component: Style,
      },
      {
        path: 'if-show',
        name: 'ifShow',
        component: ifShow,
      },
      {
        path: 'v-for',
        name: 'vFor',
        component: vFor,
      },
      {
        path: 'event',
        name: 'event',
        component: event,
      },
      {
        path: 'form',
        name: 'form',
        component: form,
      },
    ],
  },
];
export default basicsRoutes;
