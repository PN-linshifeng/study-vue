import { queryList, getInfo, logistics, returnOrder } from '@/servise/order';
import { Message } from 'element-ui';

export default {
  namespaced: true,
  state: {
    dataList: {
      data: [],
    },
    dataListLoading: false,
    dataInfo: { order: [], logistics: { data: [] } },
    dataInfoLoading: false,
    logisticsLoading: false,
    returnOrderLoading: false,
  },
  actions: {
    async queryList({ commit }, { params, callback }) {
      commit('loading', { id: 'dataListLoading' });
      const resp = await queryList(params);
      commit('loading', { id: 'dataListLoading' });
      if (resp) {
        commit('queryList', resp);
      }
      if (callback) {
        callback(resp);
      }
    },
    async getInfo({ commit }, { params, callback }) {
      commit('loading', { id: 'dataInfoLoading' });
      const resp = await getInfo(params);
      commit('loading', { id: 'dataInfoLoading' });
      if (resp) {
        commit('getInfo', resp);
      }
      if (callback) {
        callback(resp);
      }
    },
    async logistics({ commit }, { data, callback }) {
      commit('loading', { id: 'logisticsLoading' });

      const resp = await logistics(data);
      commit('loading', { id: 'logisticsLoading' });
      if (resp) {
        commit('logistics', data);
        Message.success('发货成功');
      } else {
        Message.errer('发货失败');
      }
      if (callback) callback(resp);
    },
    async returnOrder({ commit }, { data, callback }) {
      commit('loading', { id: 'returnOrderLoading' });
      const resp = await returnOrder(data);
      commit('returnOrder', resp);
      commit('loading', { id: 'returnOrderLoading' });
      if (callback) {
        callback(resp);
      }
    },
  },
  mutations: {
    queryList(state, payload) {
      state.dataList = payload;
    },
    getInfo(state, payload) {
      state.dataInfo = payload;
    },
    loading(state, { id }) {
      state[id] = !state[id];
    },
    logistics(state, { id, number }) {
      const items = [...state.dataList.data];
      const index = items.findIndex(k => k.id === id);
      items[index].logistics.state = true;
      items[index].logistics.number = number;
      state.dataList = { ...state.dataList, data: items };
    },
    returnOrder(state, { id, order }) {
      const { data } = state.dataList;
      const index = data.findIndex(k => k.id === id);
      data[index].order = order;
      state.dataList = { ...state.dataList, data };
    },
  },
};
