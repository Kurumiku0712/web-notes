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