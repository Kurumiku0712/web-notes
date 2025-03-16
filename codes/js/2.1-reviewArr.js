// 创建数组有四种写法
// 数组常见操作API,复制数组的两种写法
// slice, splice 三种写法获取到[2,3,4]

let arr1 = [1, 2, 3, 4, 5];
let arr2 = new Array(1, 2, 3, 4, 5);
let arr3 = new Array(5);
let arr4 = new Array(5).fill(0);
console.log(`arr1: ${arr1}\narr2: ${arr2}\narr3: ${arr3}\narr4: ${arr4}`);

let arr = [1, 2, 3, 4, 5];
arr.push(666);
arr.pop();
arr.unshift(888);
arr.shift();
console.log(arr);

let newArr1 = arr.slice();
let newArr2 = [...arr];
console.log(`newArr1: ${newArr1}\nnewArr2: ${newArr2}`);

{
    let arr = [1, 2, 3, 4, 5];
    // slice(start, end) start包含，end不包含
    // splice(start, deleteCount, item1, item2...)
    let newArr1 = arr.slice(1,4);
    let newArr2 = arr.slice(-4,-1);
    console.log(`newArr1: ${newArr1}\nnewArr2: ${newArr2}`);

    let newArr3 = arr.splice(1,3);
    console.log(`newArr3: ${newArr3}\narr: ${arr}`);

}