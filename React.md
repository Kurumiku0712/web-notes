# React

A JS libaray for building user interfaces. (e.g.Nexflix)

跟着Udemy视频(B站看)结合以前的笔记和GPT来系统学习React

# SetUp

最常用(如果不需要上NextJS框架)

```
npm create vite@latest  

-> select js (no swc)

npm install

npm run dev
```

已经不推荐

npm create-react-app  

官方推荐，也可指定版本号

```
npx create-next-app@latest  
```

```
npx create-next-app@14.2.4  
```



# 从 Counter 组件学习知识点

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default Counter;
```

## **{ } curly braces 作用**

在react中有时候是  **JSX插值表达式** 比如用到变量、函数的时候，有时候是 **解构(destructuring)** 比如父组件传参数，子组件解构 props 类似 { name, age } 以及导入一些不是以默认方式导出的函数时



## **用箭头函数写函数式组件**

每个组件就是一个函数，只不过混合了 html 和 js 形成 jsx ，return 比较特别，关于导出如果只是 export Counter 那么在其它组件导入该组件需要解构 import { Counter } from ... ，而加了 default 就可以省略 { }

关于箭头函数，js 的特殊之处就在于经常把函数看作一个值传入参数各种回调，实现很多可读性强的便捷写法，比如

```js
let arr = [1,2,3,4,5]

arr.forEach((e, i, arr) => { console.log(`index: ${i} value: ${e} from ${arr}`)})
let arr2 = arr.map(e => e * 2)
let arr3 = arr.filter(e => e >= 2)
```

写函数的时候常用的写法就是 (写好一个函数的运行规则肯定不希望它擅自变动，所以用 const 很合理)

```js
const 函数名 = (参数1, 参数2, ...) => 返回值
```

## **箭头函数有一个大坑要时刻注意**

比如写一个相加的函数:

```js
const add = (a, b) => { a + b }
```

这乍一看没问题 (debug 的时候很可能看不出来)，其实不然，这会返回 undefined ，因为在 js 中用 { } 包裹的代码块必须有 return 返回值，要么不写大括号自动返回，要么写大括号手动返回，以下两种才是正确的写法:

```js
const add = (a, b) => a + b
```

```js
const add = (a, b) => { return a + b }
```

他们都等价于这种传统写法

```js
function add(a, b){
    return a + b;
}
```



## **为什么用 setCount 时还要写一个回调函数**

```jsx
setCount((prev) => prev + 1);
```

而不是直接写

```jsx
setCount(count + 1);
```

我们可以尝试做一下下面这个题，感受一下 useState 的 Async 和 batch, 分析每个按钮每次增加几

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const handleClick2 = () => {
    setCount2(count2 + 1);
  };

  const handleClick3 = () => {
    setCount3(count3 + 1);
    setCount3(count3 + 2);
    setCount3(count3 + 3);
  };

  const handleClick4 = () => {
    setCount4((prev) => prev + 1);
    setCount4((prev) => prev + 2);
    setCount4((prev) => prev + 3);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
      <h1>{count2}</h1>
      <button onClick={handleClick2}>Increment</button>
      <h1>{count3}</h1>
      <button onClick={handleClick3}>Increment</button>
      <h1>{count4}</h1>
      <button onClick={handleClick4}>Increment</button>
    </div>
  );
};

export default Counter;
```

答案是: 1, 1, 3, 6

非函数式的写法会导致三条都读到 count=0 , 然后 react 会批处理最后一条 setCount 会覆盖掉前面的，而函数式的写法每条读到的都是更新的值，不会发生覆盖



# Vanilla JavaScript vs ReactJS

React 相比纯 JS (Vanilla就是像香草冰淇淋一样没有额外的东西) 到底有什么好处？

下面是一个例子，实现计时器方法对比

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <h1 id="count">0</h1>
    <button id="btn">+1</button>

    <script>
      let count = 0;
      const countEl = document.getElementById("count");
      const btn = document.getElementById("btn");

      btn.addEventListener("click", () => {
        count += 1;
        countEl.textContent = count;
      });
    </script>
  </body>
</html>
```

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default Counter;
```









## What is Vanilla JavaScript and how does it compare to using frameworks like React?

三个点：DOM，构建复杂页面时的可维护性，声明式编程和命令式编程

JavaScript is good for small projects, we need to manipulate **DOM** (Document Object Model) manually using something like **document.getElementById**. React is **comopent-based** and uses **virtual DOM**, it is more suitable for complex web applications and easier to maintain compared to JavaScript.

## What is the difference between declarative and imperative programming, especially in the context of React?