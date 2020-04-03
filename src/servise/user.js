import request from '@/utils/request';

export async function query(params) {
  return request({
    url: '/api/getUserList',
    method: 'get',
    params,
  });
}

export async function addUser(data) {
  return request({
    url: '/api/addUser',
    method: 'post',
    data,
  });
}

export async function deleteUser(data) {
  return request({
    url: '/api/deleteUser',
    method: 'delete',
    data,
  });
}

export async function updateUser(data) {
  return request({
    url: '/api/updateUser',
    method: 'put',
    data,
  });
}
