// Promise Async
/* 同步和异步: 同步是按顺序一个个执行，但是有些执行时间较长的任务比如setTimeout如果还是同步就会阻塞。 常见的异步: 定时器 Ajax 
异步任务会进入一个特殊的任务队列，按照一定机制进行调度
异步任务会在当前同步任务执行完后再执行 */
// console.log("任务1： ...同步");
// console.log("任务2： ...同步");
// setTimeout(() => {
//   console.log("任务3： ...异步");
//   console.log("任务4： ...同步");
//   setTimeout(() => {
//     console.log("任务5： ...异步");
//     console.log("任务6： ...同步");
//   }, 0);
// }, 0);
// 多个异步任务依赖前面任务执行的结果, 会导致大量的嵌套层数, Promise就是为了解决这个代码复杂导致可读性差的问题

// const p1 = new Promise((resolve, reject) => {
//   resolve("任务1:成功得到的数据");
//   //   reject("任务2:失败的信息");
// });
// // console.log(p1); // Promise { <pending> }
// p1.then(
//   (data) => {
//     console.log(data);
//     return new Promise((resolve, reject) => {
//       resolve("任务2:成功得到的数据");
//       // reject("任务2:失败的信息");
//     });
//   },
//   (err) => {
//     console.log("任务1:失败了");
//     throw new Error("任务1失败");
//   }
// )
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// p1.then().then().then().then().catch();

// Async: 基于Promise的异步操作简化 await
// 步骤1:准备一个返回Promise对象的函数
function asyncTask() {
  return new Promise((resolve, reject) => {
    // 假装有一些关键代码..
    const isSuccess = true;
    if (isSuccess) {
      resolve("任务2成功");
    } else {
      reject("任务2失败");
    }
  });
}

// 步骤2: 为使用await函数添加async关键字
async function main() {
  console.log("任务1");
  const data = await asyncTask();
  console.log(data);
  console.log("任务3");
}
main();
