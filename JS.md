# JavaScript

# JavaScript 八股

### **`==` 和 `===` 的区别**

- `==`（**宽松相等**）：在比较时，会先尝试进行 **类型转换**，然后再进行值比较。
- `===`（**严格相等**）：**不进行类型转换**，只有当 **类型相同且值相等** 时，才返回 `true`。

true == 1	**true 转换为 1**	true
false == 0	**false 转换为 0**	true
"1" == 1	**"1" 转换为 1（字符串转数字**）	true
"" == 0	**"" 转换为 0（空字符串转数字）**	true
"0" == false	**"0" 转换为 0，false 也转换为 0**	true
" \t\n" == 0	**只包含空格的字符串转换为 0**	true



### {} 和 [] 的 valueOf 和 toString 的结果是什么？

{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"

[] 的 valueOf 结果为 [] ，toString 的结果为 ""



### 什么是假值对象？

浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来值，这些就是“假值对象”。假值对象看起来和
普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 最常见的例子是 document.all，它
是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供给 JavaScript 程序使用。



### 解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字，它们之间的区别是什么？

解析允许字符串（如 parseInt() ）中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换（如 Nu
mber ()）不允许出现非数字字符，否则会失败并返回 NaN。



### 如何将字符串转化为数字，例如 '12.3b'?

（1）使用 Number() 方法，前提是所包含的字符串不包含不合法字符。

（2）使用 parseInt() 方法，parseInt() 函数可解析一个字符串，并返回一个整数。还可以设置要解析的数字的基数。当基数的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

（3）使用 parseFloat() 方法，该函数解析一个字符串参数并返回一个浮点数。

（4）使用 + 操作符的隐式转换，前提是所包含的字符串不包含不合法字符。



### || 和 && 操作符的返回值？

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行 ToBoolean 强制类型转换，然后再执行条件
判断。

对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。

&& 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

**|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果**



### 如何将浮点数点左边的数每三位添加一个逗号，如 12000000.11 转化为『12,000,000.11』?

```js
// 方法一
function format(number) {
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}
// 方法二
function format1(number) {
  return Intl.NumberFormat().format(number)
}
// 方法三
function format2(number) {
  return number.toLocaleString('en')
}
```



###  常用正则表达式

```js
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g;

// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g;

// （5）用户名正则，4到16位（字母，数字，下划线，减号）
var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/;

// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern = /^.*(?=.{6,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
```





## 1. 介绍 js 的基本数据类型

在 JavaScript 中，**基本数据类型（Primitive Data Types）** 共有 5 种：`Undefined`、`Null`、`Boolean`、`Number`、`String`。此外，`Symbol`（ES6 引入）和 `BigInt`（ES11 引入）也被视为基本数据类型。

### Undefined

`Undefined` 表示**变量已声明但未赋值**，或者**访问对象不存在的属性**时返回的值。

`undefined` 不是 `null`，两者类型不同

```js
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"

let obj = {};
console.log(obj.prop); // undefined

```

#### null VS. undefined 

一般变量声明了但还没有定义的时候会返回 undefined，**null主要用于赋值给一些可能会返回对象的变量，作为初始化**。

undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它
会影响我们对 undefined 值的判断。

但是我们可以通过一些方法获得**安全的 undefined 值**，比如说 **void 0** （表达式 void ___ 没有返回值，因此返回结果是 undefined。void 并不改变表达式的结果，只是让表达式不返回值。按惯例我们用 void 0 来获得 undefined）

当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。当我们使用双等
号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

**`undefined == null` 和 `undefined === null` 的区别？**

T 和 F，前者是因为特殊规定，后者是因为类型不同。

且`null` 只等于 `undefined`，与其他值都不相等，`undefined` 只等于 `null`，与其他值都不相等



#### undefined VS. undeclared 

已在作用域中**声明但还没有赋值**的变量，是 **undefined** 的。相反，还**没有在作用域中声明过**的变量，是 **undeclared** 的。

对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。但是我们可以使用 typ
eof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。



### Null

`Null` 代表 **“空值”**，通常表示**手动赋值为空**或**对象不存在**。



### Boolean

`Boolean` 只有两个值：`true` 和 `false`，用于逻辑判断。

**常见的“假值”（Falsy 值）**：

- `false`
- `0`、`-0`
- `""`（空字符串）
- `null`
- `undefined`
- `NaN`

**除上述外，所有值都是“真值”（Truthy 值）**。



### Number

`Number` 类型表示**整数和浮点数**



#### NaN

typeof NaN 返回 "number"

`NaN == NaN` 返回什么？

```js
console.log(NaN == NaN); // false
console.log(Number.isNaN(NaN)); // true
```

`NaN`（Not a Number）不等于自身，需要用 `Number.isNaN()` 进行判断。



#### toFixed(2)

如何解决 `0.1 + 0.2 !== 0.3`？

```js
console.log((0.1 + 0.2).toFixed(2) === "0.30"); // true
```

使用 `toFixed(2)` 处理**精度问题**。



####  js 中整数的安全范围是多少？

2^53 - 1

在 ES6 中被定义为 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次
计算返回了正或负的 Infinity 值，那么该值将无法参与下一次的计算。判断一个数是不是有穷的，可以使用 isFinite 函数
来判断。



### String

`String` 代表文本数据，是**不可变**的（即**修改字符串实际上会创建新字符串**）。



### Symbol

Symbol	ES6 引入，创建唯一值，不可自动转换为字符串

Symbol 代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。

**`Symbol` 适用于**：创建**唯一标识符**，防止命名冲突，保护私有属性，定义不可修改的枚举值。个人认为补救出类似java的private作用

Symbol 值不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换为布尔值（显式和隐式结果
都是 true ）。



### BigInt

ES11（ES2020）引入，用于表示超过 `Number.MAX_SAFE_INTEGER` 的大整数。

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

**`BigInt` 适用于**：超大整数计算，如金融、加密、区块链和科学计算。



## 2. 什么是堆？什么是栈？它们之间有什么区别和联系？

堆和栈的概念存在于数据结构中和操作系统内存中。

在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全
二叉树是堆的一种实现方式。

在操作系统中，内存被分为栈区和堆区。

栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。



## 3. JavaScript 数据类型内存图？

- 栈：基本数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）或复杂数据类型 Object、Array、Date等

两种类型的区别是：存储位置不同。
原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；**引用数据类型在**
**栈中存储了指针**，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实
体。

![img](https://i-blog.csdnimg.cn/blog_migrate/f80f2541d42ba0114ac1f4831125159e.png) 

![img](https://i-blog.csdnimg.cn/blog_migrate/a3c215f114f8f19f68090a10d70ba231.png) 

## 4. 介绍 js 有哪些内置对象？

js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些**全局值属性、函数和用来实例化其他对象的构造函**
**数对象**。一般我们经常用到的如全局变量值 **NaN**、**undefined**，全局函数如 **parseInt()**、**parseFloat()** 用来实例化对象的构
造函数如 **Date**、**Object** 等，还有提供数学计算的单体内置对象如 **Math** 对象。



全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在
全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类

（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。

例如 Infinity、NaN、undefined、null 字面量

（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

例如 eval()、parseFloat()、parseInt() 等

（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

例如 **Object**、**Function**、**Boolean**、**Symbol**、**Error** 等

（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。

例如 **Number**、**Math**、**Date**

（5）字符串，用来表示和操作字符串的对象。

例如 **String**、RegExp

（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 **Array**

（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

例如 **Map**、**Set**、WeakMap、WeakSet

（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

例如 SIMD 等

（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

例如 JSON 等

（10）控制抽象对象

例如 **Promise**、Generator 等

（11）反射

例如 Reflect、Proxy

（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。

例如 Intl、Intl.Collator 等

（13）WebAssembly

（14）其他

例如 arguments



## 5. 说几条 JavaScript 基本规范？

在平常项目开发中，我们遵守一些这样的基本规范，比如说：

（1）一个函数作用域中所有的变量声明应该尽量提到函数首部，用一个 var 声明，不允许出现两个连续的 var 声明，声明时
    如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够一目了然的知道变量对应的类型值。

（2）代码中出现地址、时间等字符串时需要使用常量代替。

（3）在进行**比较**的时候吧，尽量**使用'===', '!=='**代替'==', '!='。

（4）不要在内置对象的原型上添加方法，如 Array, Date。

（5）**switch 语句必须带有 default 分支**。

（6）for 循环必须使用大括号。

（7）if 语句必须使用大括号。



## 6. JavaScript 原型，原型链？ 有什么特点？

js中函数也是对象

在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对
象的指针，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当我们使用构造函数新建一个对象后，在这个对象的内部
将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说我们
是不应该能够获取到这个值的，但是现在浏览器中都实现了 __proto__ 属性来让我们访问这个属性，但是我们最好不要使用这
个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对
象的原型。

**当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又**
**会有自己的原型，于是就这样一直找下去，也就是原型链的概念**。

**原型链的尽头一般来说都是 Object.prototype 所以这就是我们新建的对象为什么能够使用 toString() 等方法的原因**。

特点：

JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与
之相关的对象也会继承这一改变。



总结了原型和原型链的知识后，感觉对 JavaScript 语言的理解更加深刻了，也为后面**理解对象的创建和继承**打下了基础。其实理解原型链，对于 JavaScript 中一些**预定义类型的行为和实现**就很好理解了。

### **什么是原型？（Prototype）**

**现实类比：蓝图和工厂**

想象你是一家车厂的老板，你想生产一批汽车：

- 你有一个**汽车蓝图**（Prototype）。
- 每辆汽车（对象）都是根据这个蓝图生产的。
- 但是每辆车可以有自己的**独特属性**（如颜色、车牌号）。

在 JavaScript 里：

- **原型（Prototype）** 就像是“蓝图”。
- **对象（Object）** 就是按照原型创建的“汽车”。
- **方法和属性** 可以共享（比如所有汽车都有“行驶”功能）。
- 如果每辆车都需要自己的方法，内存占用会很大，所以它们**共享同一个原型**来节省空间。

```js
function Car(model) {
    this.model = model; // 每个对象都有自己的 model
}

// 给 Car 的原型添加方法
Car.prototype.drive = function() {
    console.log(this.model + " is driving!");
};

let car1 = new Car("Tesla");
let car2 = new Car("BMW");

car1.drive(); // Tesla is driving!
car2.drive(); // BMW is driving!
```

`Car.prototype` 是**原型对象**，所有 `Car` 实例都会共享它的方法。

`car1` 和 `car2` 虽然是不同的对象，但它们都可以调用 `drive()`，因为它们的**原型指向同一个 `Car.prototype`**。



#### 函数对象的 prototype 属性

```js
function Person(){

}

// 为原型对象添加方法
Person.prototype.sayName = function(){
    alert(this.name);
}
```

**我们创建的每一个函数都有一个 prototype 属性，这个属性是一个指针，指向一个对象**。在默认情况下，这个原型对象将会获得一个 constructor 属性，这个属性是一个指针，指向 prototype 所在的函数对象。这个对象的用途是**包含**可以由特定类型的所有**实例共享的属性和方法**，简单来说，该函数实例化的所有对象的__proto__的属性指向这个对象，它是该函数所有实例化对象的原型。

![配图18-3](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/peitu18-3.png)

#### 对象的 ____proto____ 属性 

```js
var student = new Person();

console.log(student.__proto__ === Person.prototype); // true

// 虽然我们在脚本中没有办法访问到[[Prototype]]属性，但是我们可以通过 isPrototypeOf 方法来确定对象之间是否存在这种关系
// isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上
console.log(Person.prototype.isPrototypeOf(student)); // true
console.log(Object.getPrototypeOf(student) === Person.prototype); // true
```

![配图18-5](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/peitu18-5.png) 



### 什么是原型链？（Prototype Chain）

ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法. 

基本思想是利用的一个引用类型继承另一个引用类型的属性和方法

原型链的主要实现方法是让构造函数的 prototype 对象等于另一个类型的实例，此时的 prototype 对象因为是实例，因此将包含一个指向另一个原型的指针，相应地另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与类型的链条。这就是原型链的基本概念

**现实类比：祖传技艺**

假设你家是木匠世家，你学会了父亲的木工技术，你的父亲又从祖父那里学来的。

- **你会做桌子**（你的能力）。
- **如果你不会做椅子，你会问你的父亲**（向上一层找）。
- **如果你的父亲也不会，他会问祖父**（继续往上找）。

在 JavaScript 里：

- **如果对象本身没有某个方法，它会去它的原型（`__proto__`）里找**。
- **如果原型也找不到，就继续沿着原型链往上找，直到 `null`（顶层）**。

```js
function Super(){

};


function Middle(){

};

function Sub(){

};

Middle.prototype = new Super();

Sub.prototype = new Middle();

var suber = new Sub();
```

![配图18-8](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/peitu18-8.png) 

## 7. 生成随机数的各种方法？

Math.random()

```js
// 生成 0 到 1 之间的随机小数
console.log(Math.random()); // 例如：0.56782340912

// 生成 0 到 N 之间的随机整数
function getRandomInt(N) {
    return Math.floor(Math.random() * N);
}
console.log(getRandomInt(10)); // 生成 0~9 之间的随机整数

// 生成 [min, max] 范围的随机整数
function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomIntInRange(5, 15)); // 生成 5~15 之间的随机整数

```



## 8. 如何实现数组的随机排序？



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

