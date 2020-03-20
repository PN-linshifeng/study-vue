// import Mock, { Random } from 'mockjs';
// const todoList = [];
// setData();

// function setData() {
//   for (let i = 0; i < 5; i += 1) {
//     todoList.push(
//       Mock.mock({
//         title: Random.cparagraph(1),
//         name: Random.cname(),
//         done: Random.boolean(),
//       })
//     );
//   }
// }

// function addData(body) {
//   const { title } = JSON.parse(body);
//   const item = Mock.mock({
//     title,
//     name: Random.cname(),
//     done: false,
//   });
//   todoList.push(item);
//   return item;
// }

// Mock.setup({
//   timeout: '200-500',
// });
// Mock.mock(/^\/api\/todo-querys(?:\?.+)?$/, 'get', function() {
//   return todoList;
// });

// Mock.mock(/^\/api\/todo-add$/, 'post', function({ body }) {
//   return addData(body);
// });
