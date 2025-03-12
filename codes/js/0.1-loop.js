// 三种常见循环: for, for...of, while

{
  // 遍历数组
  let arr = [1, 2, 3, 4, 5];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  // 输出 1 2 3 4 5
}

{
  // 遍历数组
  let arr = [1, 2, 3, 4, 5];
  for (let item of arr) {
    console.log(item);
  }
  // 输出 1 2 3 4 5
}

{
  let arr = [1, 2, 3, 4, 5];
  let i = 0;
  while (i < arr.length) {
    console.log(arr[i]);
    i++;
  }
  // 输出 1 2 3 4 5
}
