import Vue from 'vue';
import Vuex from 'vuex';
import todo from './modules/todo';
import login from './modules/login';
import user from './modules/user';
import order from './modules/order';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo,
    login,
    user,
    order,
  },
});
