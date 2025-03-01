// 有一个大小为 10 的数组，里面装了 4 个元素，现在想在末尾追加一个元素
{
  let arr = new Array(10);

  for (let i = 0; i < 4; i++) {
    arr[i] = i;
  }

  arr[4] = 444;
  console.log(arr);
}

// 有一个大小为 10 的数组 arr，前 4 个索引装了元素，现在想在第 3 个位置（索引 2 arr[2]）插入一个新元素
{
  let arr = new Array(10);

  for (let i = 0; i < 4; i++) {
    arr[i] = i;
  }

  for (let i = 3; i >= 2; i--) {
    arr[i + 1] = arr[i];
  }

  arr[2] = 666;
  console.log(arr);
}

// 一个大小为 10 的数组，里面装了 5 个元素，现在想删除第 2 个元素（arr[1]）
{
  let arr = new Array(10);

  for (let i = 0; i < 5; i++) {
    arr[i] = i;
  }

  for (let i = 2; i < 5; i++) {
    arr[i - 1] = arr[i];
  }
  arr[4] = -1;
  console.log(arr);
}

// 动态数组常用方法
arr.push(i); // 在数组末尾添加一个元素
arr.pop(); // 删除数组末尾的元素

arr.shift(); // 删除数组第一个元素
arr.unshift(i); // 在数组第一个位置添加一个元素

arr.splice(index, 0, i); // 在 index 位置插入一个元素
arr.splice(index, 1); // 删除 index 位置的元素

