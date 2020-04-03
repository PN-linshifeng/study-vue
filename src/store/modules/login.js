import login from '@/servise/login';

export default {
  namespaced: true,
  state: {
    login: false,
    loginLoading: false,
  },
  actions: {
    async login({ commit }, payload) {
      const { callback, data } = payload;
      commit('loading', { loading: 'loginLoading' });
      const resp = await login(data);
      if (resp) {
        localStorage.setItem('token', resp.tokenID);
        localStorage.setItem('userName', resp.userName);
        localStorage.setItem('role', resp.role);
        commit('login', resp);
        commit('loading', { loading: 'loginLoading' });
      } else {
        commit('loading', { loading: 'loginLoading' });
      }
      if (callback) callback(resp);
    },
  },
  mutations: {
    login(state) {
      state.login = true;
    },
    loading(state, payload) {
      const { loading } = payload;
      state[loading] = !state[loading];
    },
  },
};
