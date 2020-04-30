import request from '@/utils/request';

export const queryList = function(params) {
  return request({
    method: 'get',
    url: '/api/order/queryList',
    params,
  });
};

export const getInfo = function(params) {
  return request({
    method: 'get',
    url: `/api/order/getInfo/${params.id}`,
  });
};

export const logistics = function(data) {
  return request({
    url: '/api/order/logistics',
    method: 'put',
    data,
  });
};

export async function returnOrder(data) {
  return request({
    url: '/api/order/returnOrder',
    method: 'put',
    data,
  });
}
