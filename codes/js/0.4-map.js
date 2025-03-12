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