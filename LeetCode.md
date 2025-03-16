# LeetCode

## 1. Two Sum

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
};
```

## 49. Group Anagrams

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for (let str of strs) {
        let array = Array.from(str);
        array.sort();
        let key = array.toString();
        let list = map.get(key) ? map.get(key) : new Array();
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
};
```

## 128. Longest Consecutive Sequence

```js
var longestConsecutive = function(nums) {
    // sort
    // 1234 100 200
    // for
    // nums[i]+1==nums[i+1]
    // count++
    // Math.max(count)
    let set = new Set(nums)
    let ans=0
    for(let item of set){
        if(!set.has(item-1)){
            let cur=item;
            let count=1;
            while(set.has(cur+1)){
                count++
                cur=cur+1
            }
            ans=Math.max(count,ans)
        }
    }
    return ans;
};
```

## 283. Move Zeroes

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
        //获取数组长度
        let len = nums.length;
        //循环遍历数组
        for(let i =0;i<len;i++){
            //当数组哪个位置是0 ，就删除这个这个位置的元素，然后在末尾补 0
            //从而就达到了 把所有0移动到数组末尾的要求且保持的非零元素的相对顺序
            if(nums[i]==0){
                nums.splice(i,1)
                nums.push(0)
            //当为0的元素删除后，下一个元素就会前进一位占据该位置，所以要从该位置在进行判断
                i--
            //当移动到末尾的元素，就不用再一次进行遍历了，所以遍历的长度要减去1位
                len--
            }
        }
        return nums
}
```

## 11. Container With Most Water

```js
var maxArea = function(height) {
    let ans = 0, left = 0, right = height.length - 1;
    while (left < right) {
        const area = (right - left) * Math.min(height[left], height[right]);
        ans = Math.max(ans, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return ans;
};
```

## 15. 3Sum

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};
```

## 3. Longest Substring Without Repeating Characters

```js
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```

## 483. Find All Anagrams in a String

```js
var findAnagrams = function(s, p) {
    const sLen = s.length, pLen = p.length;

    if (sLen < pLen) {
        return [];
    }

    const ans = [];
    const sCount = new Array(26).fill(0);
    const pCount = new Array(26).fill(0);
    for (let i = 0; i < pLen; ++i) {
        ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
    }

    if (sCount.toString() === pCount.toString()) {
        ans.push(0);
    }

    for (let i = 0; i < sLen - pLen; ++i) {
        --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

        if (sCount.toString() === pCount.toString()) {
            ans.push(i + 1);
        }
    }

    return ans;
};
```

## 560. Subarray Sum Equals K

```js
var subarraySum = function(nums, k) {
    const mp = new Map();
    mp.set(0, 1);
    let count = 0, pre = 0;
    for (const x of nums) {
        pre += x;
        if (mp.has(pre - k)) {
            count += mp.get(pre - k);
        }
        if (mp.has(pre)) {
            mp.set(pre, mp.get(pre) + 1);
        } else {
            mp.set(pre, 1);
        }
    }
    return count;
};
```

## 53. Maximum Subarray

```js
var maxSubArray = function(nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
```

## 56. Merge Intervals

```js
var merge = function(intervals) {
    intervals.sort((p, q) => p[0] - q[0]); // 按照左端点从小到大排序
    const ans = [];
    for (const p of intervals) {
        const m = ans.length;
        if (m && p[0] <= ans[m - 1][1]) { // 可以合并
            ans[m - 1][1] = Math.max(ans[m - 1][1], p[1]); // 更新右端点最大值
        } else { // 不相交，无法合并
            ans.push(p); // 新的合并区间
        }
    }
    return ans;
};
```

## 189. Rotate Array

```js
var rotate = function(nums, k) {
    const n = nums.length;
    const newArr = new Array(n);
    for (let i = 0; i < n; ++i) {
        newArr[(i + k) % n] = nums[i];
    }
    for (let i = 0; i < n; ++i) {
        nums[i] = newArr[i];
    }
};
```

## 238. Product of Array Except Self

```js
var productExceptSelf = function(nums) {
    const n = nums.length;
    const pre = Array(n);
    pre[0] = 1;
    for (let i = 1; i < n; i++) {
        pre[i] = pre[i - 1] * nums[i - 1];
    }

    const suf = Array(n);
    suf[n - 1] = 1;
    for (let i = n - 2; i >= 0; i--) {
        suf[i] = suf[i + 1] * nums[i + 1];
    }

    const ans = Array(n);
    for (let i = 0; i < n; i++) {
        ans[i] = pre[i] * suf[i];
    }
    return ans;
};
```



























































## 20. 有效的括号 Valid Parentheses

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let valid = true;
  const stack = [];
  const mapper = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  for (let i in s) {
    const v = s[i];
    if (["(", "[", "{"].indexOf(v) > -1) {
      stack.push(v);
    } else {
      const peak = stack.pop();
      if (v !== mapper[peak]) {
        return false;
      }
    }
  }

  if (stack.length > 0) return false;

  return valid;
};
```

## 21. 合并两个有序链表 Merge Two Sorted Lists

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```

## 26. 删除排序数组中的重复项 Remove Duplicates from Sorted Array

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const size = nums.length;
  if (size == 0) return 0;
  let slowP = 0;
  for (let fastP = 0; fastP < size; fastP++) {
    if (nums[fastP] !== nums[slowP]) {
      slowP++;
      nums[slowP] = nums[fastP];
    }
  }
  return slowP + 1;
};
```

## 53. 最大子序和 Maximum Subarray

```js
function LSS(list) {
  const len = list.length;
  let max = list[0];
  let min = 0;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += list[i];
    if (sum - min > max) max = sum - min;
    if (sum < min) {
      min = sum;
    }
  }

  return max;
}
```

## 66. 加一 Plus One

```js
var plusOne = function (digits) {
  var carry = 1; // 我们将初始的 +1 也当做是一个在个位的 carry
  for (var i = digits.length - 1; i > -1; i--) {
    if (carry) {
      var sum = carry + digits[i];
      digits[i] = sum % 10;
      carry = sum > 9 ? 1 : 0; // 每次计算都会更新下一步需要用到的 carry
    }
  }
  if (carry === 1) {
    digits.unshift(1); // 如果carry最后停留在1，说明有需要额外的一个长度 所以我们就在首位增添一个 1
  }
  return digits;
};
```



# 基础

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

**数据结构本质上只有两种，一种叫数组，一种叫链表**

**算法本质就是穷举**

# 数组

**「静态数组」就是一块连续的内存空间，我们可以通过索引来访问这块内存空间中的元素，这才是数组的原始形态**。

而「动态数组」是编程语言为了方便我们使用，在静态数组的基础上帮我们添加了一些常用的 API，比如 `push, insert, remove` 等等方法，这些 API 可以让我们更方便地操作数组元素，不用自己去写代码实现这些操作。

**数组的超能力「随机访问」：只要给定任何一个数组索引，我可以在 O\(1) 的时间内直接获取到对应元素的值**。

要在数组中间增或删，就需要 **数据搬移** 并且注意遍历顺避免覆盖所以在数组中增或删时间复杂度是O(n)



**动态数组底层还是静态数组，只是自动帮我们进行数组空间的扩缩容，并把增删查改操作进行了封装，让我们使用起来更方便而已**。

## 动态数组常用方法

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

`splice()` 语法  array.splice(start, deleteCount, item1, item2, ...)



# 链表(链式存储)

数组（顺序存储）的底层原理，说白了就是一块连续的内存空间，有了这块内存空间的首地址，就能直接通过索引计算出任意位置的元素地址。

链表不一样，一条链表并不需要一整块连续的内存空间存储元素。链表的元素可以分散在内存空间的天涯海角，通过每个节点上的 `next, prev` 指针，将零散的内存块串联起来形成一个链式结构。可以提高内存的利用效率.

数组最大的优势是支持通过索引快速访问元素，而链表就不支持。

工具函数

```js
var ListNode = function(x) {
    this.val = x;
    this.next = null;
};

// 输入一个数组，转换为一条单链表
var createLinkedList = function(arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }
    var head = new ListNode(arr[0]);
    var cur = head;
    for (var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}
```

```js
// 创建一条单链表
let head = createLinkedList([1, 2, 3, 4, 5]);

// 遍历单链表
for (let p = head; p != null; p = p.next) {
    console.log(p.val);
}
```

```js
// 创建一条单链表
var head = createLinkedList([1, 2, 3, 4, 5]);

// 在单链表尾部插入一个新节点 6
var p = head;
// 先走到链表的最后一个节点
while (p.next !== null) {
    p = p.next;
}
// 现在 p 就是链表的最后一个节点
// 在 p 后面插入新节点
p.next = new ListNode(6);

// 现在链表变成了 1 -> 2 -> 3 -> 4 -> 5 -> 6
```

