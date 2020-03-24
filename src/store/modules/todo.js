import { query, add, done } from '@/servise/todo';

export default {
  namespaced: true,
  state: {
    count: 0,
    addLoading: false,
    todoList: [
      // { title: '早上8:30分钟打开上班', done: true },
      // { title: '上午9:60公司全体开始', done: false },
    ],
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    less(state) {
      state.count--;
    },
    doneLoading(state, payload) {
      const { index } = payload;
      const newDate = [...state.todoList];
      newDate[index] = { ...newDate[index], loading: true };
      state.todoList = [...newDate];
    },
    done: (state, payload) => {
      const { index, response } = payload;
      const newDate = [...state.todoList];
      newDate[index] = response;
      state.todoList = [...newDate];
      // state.todoList[index] = { ...state.todoList[index], ...response };  不能实现渲染
    },
    addTodo: (state, payload) => {
      state.addLoading = false;
      state.todoList.unshift(payload);
    },
    query: (state, payload) => {
      state.todoList = payload;
    },
    loading: (state, payload) => {
      const { type } = payload;
      state[type] = !state[type];
    },
  },
  getters: {
    doneTodoList(state) {
      return state.todoList.filter(k => k.done);
    },
  },
  actions: {
    async query({ commit }, payload) {
      const response = await query(payload);
      if (response) {
        commit('query', response);
      }
    },
    increment(context) {
      context.commit('mutations');
    },

    less({ commit }) {
      commit('less');
    },

    /** 完成todo */
    // done({ commit }, payload) {
    //   commit('done', payload);
    // },

    /** 添加todo */
    async addTodo({ commit }, payload) {
      const { callback } = payload;
      commit('loading', { type: 'addLoading' });
      const response = await add(payload);
      console.log(response);
      commit('loading', { type: 'addLoading' });
      if (response && callback) {
        commit('addTodo', response);
        callback(JSON.parse(JSON.stringify(response)));
      }
    },

    /** 设置办事是否完成 */
    async done({ commit }, payload) {
      const { index } = payload;
      commit('doneLoading', { index });
      const response = await done(payload);
      if (response) {
        commit('done', { index, response });
      }
    },
  },
};
