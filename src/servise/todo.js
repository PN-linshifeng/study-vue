import request from '@/utils/request';

export async function query(params) {
  return request({
    url: '/api/todo-querys',
    params,
  });
}

export async function add(data) {
  return request({
    method: 'post',
    url: '/api/todo-add',
    data,
  });
}

export async function done(data) {
  return request({
    method: 'put',
    url: '/api/todo-done',
    data,
  });
}
