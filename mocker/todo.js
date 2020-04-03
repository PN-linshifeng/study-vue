// import mockjs, { Random } from 'mockjs';
const Mock = require('mockjs'); // 模拟数据
const delay = require('mocker-api/utils/delay'); // 延迟请求

const { Random } = Mock;
const todoList = [];

/** 初始化办事项数据 */
function init() {
  for (let i = 0; i < 5; i += 1) {
    todoList.push(
      Mock.mock({
        title: Random.cparagraph(1),
        name: Random.cname(),
        done: Random.boolean(),
      })
    );
  }
}

/** 添加办事项 */
function addData(req, res) {
  let data;
  let status = 200;
  try {
    const { title } = req.body;
    data = Mock.mock({
      title,
      name: Random.cname(),
      done: false,
    });
    todoList.unshift(data);
  } catch (error) {
    status = 400;
    data = error;
  }

  return res.status(status).json(data);
}

/** 处理办事项 */
function done(req, res) {
  const { index } = req.body;
  todoList[index].done = !todoList[index].done;
  return res.json(todoList[index]);
}

init();
module.exports = delay(
  {
    'GET /api/todo-querys': todoList,
    'POST /api/todo-add': addData,
    'PUT /api/todo-done': done,
  },
  500
);
