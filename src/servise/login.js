import request from '@/utils/request';

export default async function query(data) {
  return request({
    method: 'post',
    url: '/api/login',
    data,
  });
}
