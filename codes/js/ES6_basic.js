// 1. 变量和常量
/* {} 形成块级作用域。
let 和 const 不会提升（Hoisting）到全局作用域，只在 {} 内部有效。
作用域外无法访问 count 和 BASE_URL。
使用 const 定义不可变值，使用 UPPER_CASE 命名 */
{
  let count = 0;
  count++;
  const BASE_URL = "http://www.google.com";
}
// console.log(count); // ❌ ReferenceError: count is not defined

// 2. 模板字符串
/* 避免使用过多加号，这里用反引号、$符号加{}来进行字符串的拼接 */
const str1 = "abc" + "efg";
const str2 = `efg${str1}
这也是字符串的内容`;
// console.log(str2);

// 3. 解构赋值
// const arr = [1, 2, 3];
// const v1 = arr[0];
// const v2 = arr[1];
const [a, b, c] = [1, 2, 3];
// console.log(a, b, c);

const obj = {
  username: "zhangsan",
  age: 18,
  gender: "male",
};
const {
  username,
  age: userAge,
  ...otherInfo
} = {
  username: "zhangsan",
  age: 18,
  gender: "male",
  category: "user",
};
// console.log(username, userAge, otherInfo);

// 4. 数组和对象的扩展
// 4.1 扩展运算符
// ...表示将元素展开并填充, 有点像是解包的意思
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [100, ...arr1, ...arr2, 10, 20];
// console.log(arr3);

const obj1 = {
  a: 1,
};
const obj2 = {
  b: 2,
};
const obj3 = {
  name: "zhangsan",
  ...obj1,
  ...obj2,
};
// console.log(obj3);

// 4.2 数组方法 Array.from()
/* arguments 是函数的一个内置对象，用于存储函数的所有参数，但它不是一个真正的数组，而是一个“类数组对象”（array-like object. 没有数组方法（如 map、forEach、filter）.
Array.from() 将类数组对象或可迭代对象转换为真正的数组。*/
function fn() {
  Array.from(arguments).forEach((item) => {
    // console.log(item);
  });
}
fn(1, 2, 3, 4);

// 4.3 对象的方法 Object.assign() 对象的浅拷贝
/* objA和objB是两个不同的引用 
合并的话如果有相同属性，后面的覆盖前面的*/
const objA = {
  name: "Percy",
  age: 18,
};
const objB = Object.assign({}, objA);
objB.name = "a";
// console.log(objA, objB);
const objC = {
  gender: "male",
};
const objD = Object.assign({}, objA, objC);
// console.log(objD);

// 5. Class
class A {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
  }
}

const a1 = new A("Percy", 18);
// console.log(a1);
// a1.introduce();

class B extends A {
  constructor(name, age, gender) {
    super(name, age);
    this.gender = gender;
  }

  sayHello() {
    // console.log(
    //   `Hello, I'm ${this.name}, I'm a ${this.gender} and I'm ${this.age} years old.`
    // );
  }
}
const b1 = new B("Jackson", 22, "half-god");
// console.log(b1);
// b1.sayHello();
// b1.introduce();

// 6. 箭头函数
const getSum1 = (n) => n + 3;
const getSum2 = (n1, n2) => n1 + n2;
// const getSum3 = (n1, n2, ...other) => console.log(n1, n2, other);
// console.log(getSum1(10));
// console.log(getSum2(10, 20));
// console.log(getSum3(10, 20, 100, 200, 300));
const getResult = (arr) => {
  let sum = 0;
  arr.forEach((item) => (sum += item));
  return sum;
};
console.log(getResult([1, 2, 3, 4, 5]));
