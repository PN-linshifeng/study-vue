import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    todoList: [
      { title: '早上8:30分钟打开上班', done: true },
      { title: '上午9:60公司全体开始', done: false },
    ],
  },
  mutations: {
    increment: function(state) {
      state.count++;
    },
    less: state => {
      state.count--;
    },
    done: (state, payload) => {
      const { index } = payload;
      state.todoList[index].done = !state.todoList[index].done;
    },
    addTodo: (state, payload) => {
      const { value } = payload;
      state.todoList.push({
        title: value,
        done: false,
      });
    },
  },
  getters: {
    doneTodoList: function(state) {
      return state.todoList.filter(k => k.done);
    },
  },
  actions: {
    increment(context) {
      context.commit('mutations');
    },
    less({ commit }) {
      commit('less');
    },
    done({ commit }, payload) {
      commit('done', payload);
    },
    addTodo({ commit }, payload) {
      commit('addTodo', payload);
    },
  },
});
