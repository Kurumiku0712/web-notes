const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

// GET /items - 获取所有数据
router.get('/', itemController.getAllItems);

// GET /items/:id - 根据 id 获取数据
router.get('/:id', itemController.getItemById);

// POST /items - 新增数据
router.post('/', itemController.createItem);

// PUT /items/:id - 更新数据
router.put('/:id', itemController.updateItem);

// DELETE /items/:id - 删除数据
router.delete('/:id', itemController.deleteItem);

module.exports = router;
