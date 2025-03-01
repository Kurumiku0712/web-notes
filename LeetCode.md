# LeetCode

## 时间和空间复杂度

数据结构和算法解决的是 “如何让计算机更快、更省空间” 的问题，因此需从执行时间和占用空间两个维度来评估数据结构和算法的性能

掌握复杂度分析，将能编写出性能更优的代码，有利于降低系统开发和维护成本

### 时间复杂度

如果要仔细分析一段代码执行了几次运算

```js
function bFun(n) {
    for(let i = 0; i < n; i++) {         // 需要执行 1 + (n + 1) + n 次
        console.log("Hello, World!");      // 需要执行 n 次
    }
    return 0;       // 需要执行 1 次
}		// 共 3n + 3 次
```

但是老这么仔细分析太花时间没有必要，我们可以 **抓住主要矛盾** 地去快速分析:

```js
// O(1)
function aFun() {
    console.log("Hello, World!");      
    return 0;       
}

// O(n)
function bFun(n) {
    for(let i = 0; i < n; i++) {        
        console.log("Hello, World!");      
    }
    return 0;       
}

// O(n²)
function cal(n) {
   let sum = 0; 
   let i = 1; 
   let j = 1; 
   for (; i <= n; ++i) {  
     j = 1;  
     for (; j <= n; ++j) {  
       sum = sum +  i * j;  
     }
   }
 }

// O(n²)
function cal(n) {
   let ret = 0; 
   let i = 1;
   for (; i < n; ++i) {
     ret = ret + f(i); 
   } 
 } 
function f(n) {
  let sum = 0;
  let i = 1;
  for (; i < n; ++i) {
    sum = sum + i;
  } 
  return sum;
 }
```

**简单概括就是有几层循环就是n的几次方，有嵌套就相乘**

常见时间复杂度: O(1) < O(logn) < (n) < O(nlogn) < O(n²) < O(n³) < O(2ⁿ) < O(n!) < O(nⁿ)

```js
// O(logn)
let i=1;
while (i <= n)  {
   i = i * 2;
}		

// O(nlogn)
function aFun(n){
  let i = 1;
  while (i <= n)  {
     i = i * 2;
  }
  return i
}

function cal(n) { 
   let sum = 0;
   for (let i = 1; i <= n; ++i) {
     sum = sum + aFun(n);
   }
   return sum;
 }
```

不同的情况下，这段代码的时间复杂度是不一样的

```
// n 表示数组 array 的长度
function find(array, n, x) {
  let i = 0;
  let pos = -1;
  for (; i < n; ++i) {
    if (array[i] == x) {
      pos = i; 
      break;
    }
  }
  return pos;
}
```

最好情况时间复杂度 O(1)，最坏情况时间复杂度 O(n)，平均时间复杂度 O(n)



### 空间复杂度

```js
// O(n)
function print(n) {
 const newArr = []; 
 newArr.length = n; 
  for (let i = 0; i <n; ++i) {
    newArr[i] = i * i;
  }

  for (let j = n-1; j >= 0; --j) {
    console.log(newArr[i])
  }
}
```



平时我们在写代码时，是用 空间换时间 还是 时间换空间，可以根据算法的时间复杂度和空间复杂度来衡量



参考文章：

https://time.geekbang.org/column/article/40036

https://github.com/biaochenxuying/blog/issues/29



# 算法

## 数组

**「静态数组」就是一块连续的内存空间，我们可以通过索引来访问这块内存空间中的元素，这才是数组的原始形态**。

而「动态数组」是编程语言为了方便我们使用，在静态数组的基础上帮我们添加了一些常用的 API，比如 `push, insert, remove` 等等方法，这些 API 可以让我们更方便地操作数组元素，不用自己去写代码实现这些操作。

静态数组的用法比较原始，实际软件开发中很少用到，写算法题也没必要用，我们一般直接用动态数组。但为了理解原理，在这里还是要讲解一下。

静态数组本质上就是一块**连续的**内存空间，`int arr[10]` 这个语句我们可以得知：

1、我们知道这块内存空间的首地址（数组名 `arr` 就指向这块内存空间的首地址）。

2、我们知道了每个元素的类型（比如 int），也就是知道了每个元素占用的内存空间大小（比如一个 int 占 4 字节，32 bit）。

3、这块内存空间是连续的，其大小为 `10 * sizeof(int)` 即 40 字节。

**所以，我们获得了数组的超能力「随机访问」：只要给定任何一个数组索引，我可以在 O(1)\*O\*(1) 的时间内直接获取到对应元素的值**。

因为我可以通过首地址和索引直接计算出目标元素的内存地址。计算机的内存寻址时间可以认为是 O(1)*O*(1)，所以数组的随机访问时间复杂度是 O(1)*O*(1)。

但是，一个人最大的优势往往也是他的最大劣势。数组连续内存的特性给了他随机访问的超能力，但它也因此吃了不少苦，下面介绍。

**数据结构的职责就是增删查改**



要在数组中间增或删，就需要 **数据搬移** 并且注意遍历顺避免覆盖

所以在数组中增或删时间复杂度是O(n)



**动态数组底层还是静态数组，只是自动帮我们进行数组空间的扩缩容，并把增删查改操作进行了封装，让我们使用起来更方便而已**。

### 动态数组常用方法

```js
// 创建动态数组
// 不用显式指定数组大小，它会根据实际存储的元素数量自动扩缩容
var arr = [];

arr.push(i); // 在数组末尾添加一个元素
arr.pop(); // 删除数组末尾的元素

arr.shift(); // 删除数组第一个元素
arr.unshift(i); // 在数组第一个位置添加一个元素

arr.splice(index, 0, i); // 在 index 位置插入一个元素
arr.splice(index, 1); // 删除 index 位置的元素

var index = arr.indexOf(666); // 根据元素值查找索引，时间复杂度 O(N)
```

