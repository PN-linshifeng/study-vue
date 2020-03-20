import Start from '@/views/vuex/start';
import Getter from '@/views/vuex/getter-mutation-action-module';

export default [
  {
    path: '/vuex/start',
    name: 'Start',
    component: Start,
  },
  {
    path: '/vuex/getter',
    name: 'Getter',
    component: Getter,
  },
];
