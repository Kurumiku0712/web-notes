# JavaScript

# 基本语法

var, let, const

(arrow ) function

```js
const a = 1;
// 报错
a = 2;

let str = "hello world";
str = "world"
// 输出 world
console.log(str);

if (true) {
    // 这里的 str 和外面的 str 是两个不同的变量
    let str = "hello";
    // 输出 hello
    console.log(str);
}

function add(a, b) {
    return a + b;
}
// 输出 3
console.log(add(1, 2));

// 把 let 换成 var 也是一样的效果
let add2 = function(a, b) {
    return a + b;
}
// 输出 3
console.log(add2(1, 2));

// 用 ES6 的箭头函数声明
let add3 = (a, b) => {
    return a + b;
}
// 输出 3
console.log(add3(1, 2));
```

用 `function` 关键词声明的函数和用 `() => {}` 这种方式声明的箭头函数有一些关键差别，主要是函数体内使用 `this` 指针的行为不同，但是在算法题中基本不会用到这个特性，所以你可以认为这两种方式是一样的。



## 循环控制

**for, for...of, while**

```js
// 遍历数组
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
// 输出 1 2 3 4 5
```

```js
// 遍历数组
let arr = [1, 2, 3, 4, 5];
for (let item of arr) {
    console.log(item);
}
// 输出 1 2 3 4 5
```

```js
let arr = [1, 2, 3, 4, 5];
let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}
// 输出 1 2 3 4 5
```



## 基本数据结构

### 字符串

字符串分割  str.split(" ")  // 按空格分割

字符串拼接  + 加号即可

获取子串  str.substring(0, 5)  或 str.slice(0, 5)

```js
let str = "hello world";
// 输出 11
console.log(str.length);
// 输出 h
console.log(str[0]);
// 输出 true
console.log(str === "hello world");

// 字符串分割
let arr = str.split(" ");
// 输出 ["hello", "world"]
console.log(arr);

// 获取子串，多种方式都可以
// 输出 hello
console.log(str.substring(0, 5));
// 输出 hello
console.log(str.slice(0, 5));
// 输出 hello
console.log(str.substring(0, 5));

// 字符串拼接
let str2 = "world";
// 输出 hello world world
console.log(str + " " + str2);
```



### 数组

```js
let arr1 = [1, 2, 3, 4, 5];
let arr2 = new Array(1, 2, 3, 4, 5);

// 创建一个长度为 5 的数组，每个元素都是 undefined
let arr3 = new Array(5);

// 创建一个长度为 5 的数组，每个元素都是 0
let arr4 = new Array(5).fill(0);
```

```js
let arr = [1, 2, 3, 4, 5];

// 获取数组长度
// 输出 5
console.log(arr.length);

// 获取数组元素
// 输出 1
console.log(arr[0]);

// 修改数组元素
arr[0] = 100;

// 复制数组的所有元素到一个新数组
let arr2 = arr.slice();
// 这也是一种复制数组的方法
let arr3 = [...arr];

// 在数组末尾添加一个元素
arr.push(6);

// 删除数组尾部的元素
arr.pop();

// 在数组开头添加一个元素 888
// 不常用，因为算法中都尽量避免在数组的非末尾位置增删元素
arr.unshift(888);

// 删除数组开头的元素
// 不常用，因为算法中都尽量避免在数组的非末尾位置增删元素
arr.shift();
```

### 哈希表 (ES6 Map)

通俗来讲，JavaScript 中的对象就可以理解为是哈希表，因为 JavaScript 对象就是若干键值对。不过 ES6 中引入了 `Map` 类型，所以我们就规范一些，用 `Map` 类型来创建哈希表。

```js
let map = new Map();

// 添加键值对
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);

// 获取键值对
// 输出 1
console.log(map.get("a"));

// 删除键值对
map.delete("a");

// 判断是否存在某个键
// 输出 false
console.log(map.has("a"));
// 输出 true
console.log(map.has("b"));

// 遍历键值对
for (let key of map.keys()) {
    console.log(key, map.get(key));
}
// 输出 b 2 和 c 3
```

### 哈希集合 (ES6 Set)

它用来存储 **不重复的元素**

```js
let set = new Set();

// 添加元素
set.add(1);
set.add(2);
set.add(3);

// 删除元素
set.delete(1);

// 判断是否存在某个元素
// 输出 false
console.log(set.has(1));
// 输出 true
console.log(set.has(2));

// 遍历元素
for (let item of set) {
    console.log(item);
}
// 输出 2 和 3
```

