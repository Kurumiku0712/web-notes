// Map
// Set

let map = new Map();
map.set("a", 1);
map.set("b", 2);
map.has("b") ? console.log("has b") : console.log("b does not exist");
map.delete("b");
for (let key of map.keys()) {
  console.log(key, map.get(key));
}

{
  console.log("-----------------");
  let set = new Set();
  set.add(1);
  set.add(2);
  set.has(3) ? console.log("has 3") : console.log("3 does not exist");
  set.delete(3);
  for (let e of set) {
    console.log(e);
  }
}
