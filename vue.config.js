const path = require('path');
// const apiMocker = require('webpack-api-mocker');
const apiMocker = require('mocker-api');

module.exports = {
  runtimeCompiler: true,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: null, // string | Object
    before(app) {
      app.get('/user/login', function (req, res, next) {
        console.log(next);
        const s = new Error('dddd');
        next(s);
        // res.json({ success: true });
      });
      app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({ s: 'Something broke!' });
      });

      apiMocker(app, path.resolve('./mocker/index2.js'), {
        // proxy: {
        //   '/repos/(.*)': 'https://api.github.com/',
        // },
        // changeHost: true,
      });

      // process.env.MOCK === 'yes' &&
      //   apiMocker(app, path.resolve('./mocker/index.js'), {
      //     proxy: {
      //       '/repos/*': 'https://api.github.com/',
      //       '/:owner/:repo/raw/:ref/*': 'http://127.0.0.1:2018',
      //     },
      //     changeHost: true,
      //   });
    },
  },
};
