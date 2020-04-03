import Start from '@/views/vuex/form';
import Getter from '@/views/vuex/getter-mutation-action-module';

export default [
  {
    path: '/vuex/start',
    name: 'Start',
    login: true,
    component: Start,
  },
  {
    path: '/vuex/getter',
    name: 'Getter',
    login: true,
    component: Getter,
  },
];
