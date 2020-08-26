import BasicsIndex from '@/views/basics/index';
import BasicsInstance from '@/views/basics/Instance';
import Syntax from '@/views/basics/Syntax';
import computed from '@/views/basics/computed';
import Style from '@/views/basics/style';
import ifShow from '@/views/basics/ifShow';
import vFor from '@/views/basics/vFor';
import event from '@/views/basics/event';
import form from '@/views/basics/form';
import component from '@/views/basics/component';
import props from '@/views/basics/props';

const basicsRoutes = [
  {
    path: '/basics',
    name: '基础',
    component: BasicsIndex,
    redirect: { name: 'Vue 实例' },
    children: [
      {
        path: '/instance',
        name: 'Vue 实例',
        component: BasicsInstance,
      },
      {
        path: '/syntax',
        name: '语法模板',
        component: Syntax,
        children: [
          { path: '#插值', name: '插值' },
          {
            path: '#原生HTML',
            name: '原生HTML',
          },
        ],
      },
      {
        path: '/computed',
        name: '计算属性',
        component: computed,
      },
      {
        path: '/style',
        name: 'style class',
        component: Style,
      },
      {
        path: '/if-show',
        name: '条件渲染',
        component: ifShow,
        children: [
          {
            path: '#if',
            name: 'v-if',
          },
          {
            path: '#show',
            name: 'v-show',
          },
          {
            path: '#if-show',
            name: '比较',
          },
        ],
      },
      {
        path: '/v-for',
        name: '列表渲染',
        component: vFor,
        children: [
          {
            path: '#v-for',
            name: 'v-for',
          },
          {
            path: '#数组和对象更新注意',
            name: '数组和对象更新注意',
          },
          {
            path: '#v-for和v-if',
            name: 'v-for和v-if',
          },
        ],
      },
      {
        path: '/event',
        name: '事件处理',
        component: event,
        children: [
          {
            path: '#event',
            name: '事件绑定或者监听',
          },
          {
            path: '#事件修饰符',
            name: '修饰符',
          },
          {
            path: '#事件按键修饰符',
            name: '按键修饰符',
          },
        ],
      },
      {
        path: '/form',
        component: form,
        name: '表单',
        children: [
          {
            path: '#form',
            name: 'form',
          },
          {
            path: '#表单修饰符',
            name: '表单修饰符',
          },
          {
            path: '#表单按键修饰符',
            name: '表单按键修饰符',
          },
        ],
      },
      {
        path: '/component',
        name: '组件',
        component,
        children: [
          {
            path: '#基本组件',
            name: '基本组件',
          },
          {
            path: '#修饰符',
            name: '组件修饰符',
          },
          {
            path: '#v',
            name: '组件按键修饰符',
          },
        ],
      },
      {
        path: '/props',
        name: 'props',
        component: props,
      },
      {
        path: 'component',
        name: 'component',
        component: component,
      },
      {
        path: 'props',
        name: 'props',
        component: props,
      },
    ],
  },
];
export default basicsRoutes;
