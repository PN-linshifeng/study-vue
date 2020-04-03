import { query, addUser, deleteUser, updateUser } from '@/servise/user';
import { Message } from 'element-ui';

export default {
  namespaced: true,
  state: {
    dataList: { data: [] },
    dataListLoading: false,
    addUserLoading: false,
  },
  actions: {
    async dataList({ commit }, { params, callback } = {}) {
      commit('loading', { loading: 'dataListLoading' });
      const responent = await query(params);
      commit('loading', { loading: 'dataListLoading' });
      if (responent) {
        commit('dataList', responent);
      }
      if (callback) callback();
    },
    async addUser({ commit }, { data, callback }) {
      commit('loading', { loading: 'addUserLoading' });
      const resp = await addUser(data);
      commit('loading', { loading: 'addUserLoading' });
      if (resp) {
        commit('addUser', resp);
      }
      if (callback) callback();
    },
    async deleteUser({ commit }, payload) {
      const { data } = payload;
      commit('itemLoading', { id: data.id, loading: 'loading' });
      const s = await deleteUser(data);
      if (s !== undefined) {
        Message.success('删除成功');
        commit('deleteUser', data);
      }
    },
    async updateUser({ commit }, payload) {
      const { id } = payload.data;
      const { data, callback } = payload;
      commit('itemLoading', { id, loading: 'editLoading' });

      commit('loading', { loading: 'addUserLoading' });
      const resp = await updateUser(data);
      commit('itemLoading', { id, loading: 'editLoading' });
      commit('loading', { loading: 'addUserLoading' });
      if (resp !== undefined) {
        Message.success('更新成功！');
        commit('updateUser', resp);
      }
      if (callback) {
        callback(resp);
      }
    },
  },
  mutations: {
    loading(state, payload) {
      const { loading } = payload;
      state[loading] = !state[loading];
    },
    dataList(state, payload) {
      state.dataList = payload;
    },
    addUser(state, payload) {
      const data = { ...state.dataList };
      data.data.pop();
      data.data.unshift(payload);
      state.dataList = data;
    },
    itemLoading(state, { id, loading }) {
      const newsDataList = state.dataList.data.map(k => {
        if (k.id !== id) return k;
        return { ...k, [loading]: true };
      });
      state.dataList = { ...state.dataList, data: newsDataList };
    },
    deleteUser(state, { id }) {
      const newsDataList = state.dataList.data.filter(k => k.id !== id);
      state.dataList = { ...state.dataList, data: newsDataList };
    },
    updateUser(state, payload) {
      state.dataList = payload;
    },
  },
};
