let str = "hello world";
console.log(str.length);
console.log(str[0]);
console.log(str === "hello world");

let arr = str.split(" ");
console.log(arr);

// 获取子串，多种方式都可以
console.log(str.substring(0, 5));
console.log(str.slice(0, 5));

// 字符串拼接
let str2 = "world";
console.log(str + " " + str2);