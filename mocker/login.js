const delay = require('mocker-api/utils/delay'); // 延迟请求

/** 登录 */
function login(req, res) {
  const { userName, password } = req.body;
  if (userName === 'admin' && password === 'admin') {
    return res.status(200).json({
      message: '登录成功',
      tokenID: 'ajkfsjfsdfKFDSJKjk15af15',
      userName: userName,
      role: 'admin',
    });
  }
  return res.status(401).json({
    message: '用户名或者密码错误',
  });
}

module.exports = delay(
  {
    'POST /api/login': login,
  },
  500
);
