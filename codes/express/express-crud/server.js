const express = require('express');
// 如果你用了 body-parser，就需要引入： const bodyParser = require('body-parser');
const app = express();

const itemRoutes = require('./routes/itemRoutes');

// 使用内置中间件解析 JSON 请求体 (Express 4.16+ 以上版本)
app.use(express.json());

// 如果想使用 body-parser，则：
// app.use(bodyParser.json());

// 使用路由
app.use('/items', itemRoutes);

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
