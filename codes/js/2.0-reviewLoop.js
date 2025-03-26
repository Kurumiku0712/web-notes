// 五种常见数据类型
// 五种常见循环方式

{
  let a = 5;
  let f = 5.2;
  let str = "hello";
  let flag = true;
  let n = null;
  let un = undefined;
}

{
  let arr = [1, 2, 3, 4, 5];
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  console.log("------------------");
}
{
  let arr = [1, 2, 3, 4, 5];
  for (let e of arr) {
    console.log(e);
  }
  console.log("------------------");
}
{
  let arr = [1, 2, 3, 4, 5];
  arr.forEach((e, i, arr) => {
    console.log(`index: ${i} value: ${e} from ${arr}`)
  });
  console.log("------------------");
}
{
  let arr = [1, 2, 3, 4, 5];
  let newArr = arr.map((e) => e * 2);
  console.log(newArr);
  console.log("------------------");
}
{
  let arr = [1, 2, 3, 4, 5];
  let newArr = arr.filter((e) => e >= 2);
  console.log(newArr);
  console.log("------------------");
}
