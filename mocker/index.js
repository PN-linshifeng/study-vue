const todo = require('./todo');
const login = require('./login');
const user = require('./user');

module.exports = {
  // _proxy: {
  //   proxy: {
  //     '/api/(.*)': 'http://192.168.2.52:8090/',
  //     '/(.*)': 'http://192.168.2.38:3000/',
  //   },
  //   pathRewrite: {
  //     '^/api/': '/',
  //   },
  // },

  ...todo,
  ...login,
  ...user,
};
