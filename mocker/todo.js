// import mockjs, { Random } from 'mockjs';
const Mock = require('mockjs');
const delay = require('mocker-api/utils/delay');

const { Random } = Mock;
const todoList = [];
init();

/**初始化办事项 */
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

/**添加办事项 */
function addData(req, res) {
  let data;
  try {
    const { title } = req.body;
    data = Mock.mock({
      title,
      name: Random.cname(),
      done: false,
    });
    todoList.unshift(data);
  } catch (error) {
    data = error;
  }

  return res.status(200).json(data);
}

/**处理办事项 */
function done(req, res) {
  const { index } = req.body;
  todoList[index].done = !todoList[index].done;
  return res.json(todoList[index]);
}

module.exports = delay(
  {
    'GET /api/todo-querys': todoList,
    'POST /api/todo-add': addData,
    'PUT /api/todo-done': done,
  },
  500
);
