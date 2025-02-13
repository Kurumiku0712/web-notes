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
