const fs = require('fs');
const path = require('path');

// 读取 JSON 文件到内存
// 注意：实际生产环境一般不会每次都同步读取，可以改成异步或缓存机制
const jsonDataPath = path.join(__dirname, '../data/items.json');
let items = JSON.parse(fs.readFileSync(jsonDataPath, 'utf-8'));

// 获取所有 items
function getAllItems(req, res) {
  res.json(items);
}

// 根据 id 获取单个 item
function getItemById(req, res) {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
}

// 新增 item
function createItem(req, res) {
  const { name, price } = req.body;

  // 简单模拟自增 ID
  const newId = items.length ? (items[items.length - 1].id + 1) : 1;

  const newItem = {
    id: newId,
    name,
    price
  };

  items.push(newItem);
  // 201 表示新建成功
  res.status(201).json(newItem);
}

// 更新 item
function updateItem(req, res) {
  const id = parseInt(req.params.id, 10);
  const { name, price } = req.body;
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // 更新数据
  items[index].name = name;
  items[index].price = price;

  res.json(items[index]);
}

// 删除 item
function deleteItem(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
}

// 导出控制器方法
module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
