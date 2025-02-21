# React

# Redux

使用 Redux Toolkit 进行状态管理，以下是几个重要概念：

- **Store（存储）**：存放全局的状态数据
- **Slice（切片）**：定义状态（state）及修改状态的方法（reducers）
- **Actions（动作）**：触发状态变更的指令
- **Reducer（处理器）**：接收 `action` 并更新 `state`
- **Provider（提供者）**：让 React 组件访问 Redux `store`
- **useSelector & useDispatch（钩子）**：在组件中读取/修改 Redux `state`

**Redux Toolkit 示例**，全局管理 **浅色/深色模式（light/dark mode）**

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark" 
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
```

create **Slice**, export **Actions** and **Reducer**

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

create **Store**

`Provider store={store}` let the whole React app be able to access Redux `store`

`useSelector` can read Redux `state`, `useDispatch` triggers `setMode` change

```jsx
    const mode = useSelector((state) => state.global.mode);
```



# MERN React Admin Dashboard

Build and Deploy a MERN Stack Admin Dashboard tutorial. For frontend, we will be using **Material UI**, Material UI Data Grid, Nivo Charts, **Redux** Toolkit and Redux Toolkit Query. For backend, we will be using **Node JS**, **Express Js**, Mongoose, and **MongoDB**. We will also go through how to Data Model using Entity Relationship Diagrams as well as making aggregate calls in MongoDB.



## SetUp

**server**

npm init -y

npm i express body-parser cors dotenv helmet morgan mongoose nodemon

create the backend



**database**

create a cluster on the website

use compass to connect



**file**

**.env**

MONGO_URL=mongodb+srv://Kurumiku:[password]@cluster0.yiiuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

PORT=5001

**.gitignore**

/node_modules

.env

**package.json**

  "start": "node index.js",

  "dev": "nodemon index.js"

use nodemon liveserver so whenever we make changes to the code, it will automatically update



**client**

npm create vite@latest

select js (no swc)

npm install

npm run dev

npm i  react-redux @reduxjs/toolkit react-datepicker react-router-dom@6 @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid @nivo/core @nivo/bar @nivo/geo @nivo/pie

if fails, nvm use 20 (node version compatabilty issue)



## Frontend

### SetUp Colors (Themes)

vscode extension: Tailwind Shades

Theme.js

**基于 Redux Toolkit 的 MUI 主题切换**

1. **使用 MUI 的 `createTheme()` 生成主题**
2. **使用 Redux Toolkit 维护 `mode`（`light/dark` 模式）**
3. **使用 `useMemo()` 确保 `theme` 只在 `mode` 变化时重新创建**

为什么使用 Redux Toolkit？

希望在整个应用中 **动态切换主题**（`light` / `dark`），而 **Redux 是全局状态管理工具**，可以在 **多个组件间共享 `mode` 变量**，避免 prop drilling（逐层传递 `mode`）. 如果不用 Redux 可能需要用 `useState()` 但 `mode` 只能在单个组件中使用，其他组件无法访问，需要手动传递（不方便）



**为什么 `theme` 要用 `useMemo()`？**

```jsx
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
```

✅ **优化性能**：避免 `createTheme()` **在每次组件渲染时重新创建**

如果不用 `useMemo()`  

```jsx
const theme = createTheme(themeSettings(mode));
```

**React 重新渲染 `App` 时，每次都会创建新 `theme`**. 这可能会导致 **不必要的重新渲染**，特别是当 `App` 内部有 `useEffect()` 依赖 `theme` 时，可能触发额外计算

useMemo() 使得只有在 `mode` 变化时 **才会重新计算 `theme`**，否则会返回缓存的 `theme`



## Deploy

Render

web service: 

npm start or node index.js

For environment variables: NODE_VERSION=20

For web access, add these IPs to mongodb network access

![image-20250218150254856](D:\Notes\web-notes\assets\image-20250218150254856.png)

Check

![image-20250218150350844](D:\Notes\web-notes\assets\image-20250218150350844.png)

![image-20250218150446505](D:\Notes\web-notes\assets\image-20250218150446505.png)



For static site: ensure the right github repo, ensure .env is not in repo

ensure the environment variable spelling `VITE_BASE_UR`

ensure the backend url https://react-dashboard-server-gjun.onrender.com/ with / in the end

check

![image-20250218152902768](D:\Notes\web-notes\assets\image-20250218152902768.png)

https://react-dashboard-ztid.onrender.com/



## CI/CD

On Render, set auto-deploy to no, then get

Deploy Hook

Your private URL to trigger a deploy for this server. Remember to keep this a secret.

https://api.render.com/deploy/srv-cuq0g2ogph6c73ctdkm0?key=smprF25XbEw

GitHub > Settings > Secrets and variables > Actions

Add a new Repository secret

RENDER_FRONTEND_HOOK

create .github/workflows/deploy.yml

```yml
name: Deploy Frontend to Render

on:
  push:
    branches:
      - main  

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Install Dependencies
        run: npm install

      - name: Run Lint & Tests
        run: |
          npm run lint
          npm test

      - name: Build Project
        run: npm run build

      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_FRONTEND_HOOK }}
```

error: name: Run Lint & Tests

npm install eslint --save-dev

npx eslint --init

add  in package.json

```json
  "type": "module",

  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "test": "echo \"No test specified\" && exit 0"
  }
```

即使暂时没有测试文件，也可以用 `echo "No test specified"` 让 CI/CD 通过

npm install eslint-plugin-react-hooks --save-dev

npm install eslint-plugin-react-refresh --save-dev

adjust eslint.config.js file

rules

```js
      "no-unused-vars": "off",
      "react/prop-types": "off",

```

npx eslint src

![image-20250219103045772](D:\Notes\web-notes\assets\image-20250219103045772.png)

![image-20250219103058697](D:\Notes\web-notes\assets\image-20250219103058697.png)

## Jest

npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest

npm install --save-dev jest-environment-jsdom

npm install --save-dev @babel/preset-react @babel/preset-env babel-jest

Jest 默认不支持 ES 模块，因此需要额外的配置

在项目根目录下创建 `jest.config.js`，添加以下内容：

```js
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js", // let Jest ignore image files
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // let Jest ignore CSS files
  },
};
```

`testEnvironment: "jsdom"`：Jest 默认运行在 Node.js 环境，但 React 组件依赖浏览器，所以我们需要 `jsdom` 来模拟浏览器环境

`moduleNameMapper`：用于忽略 CSS、SCSS 这类静态资源文件，以免 Jest 解析时报错

adjust package.json

```
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "test": "jest --ci"
  }
```

create babel.config.cjs

```js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};

```

在 `src/components/__tests__/Header.test.js`

```js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

describe("Header Component", () => {
  test("renders the title and subtitle", () => {
    render(<Header title="Dashboard" subtitle="Welcome back!" />);

    // check if the title is rendered correctly 
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
  });

  test("renders with correct styles", () => {
    render(<Header title="Test Title" subtitle="Test Subtitle" />);

    const titleElement = screen.getByText("Test Title");
    const subtitleElement = screen.getByText("Test Subtitle");

    expect(titleElement).toHaveStyle("font-weight: 700");
    // ensure the rendering of subtitle 
    expect(subtitleElement).toBeInTheDocument();
  });
});

```

npm test

![image-20250219110234556](D:\Notes\web-notes\assets\image-20250219110234556.png)

success!

but fail when CI/CD

```
/home/runner/work/react-dashboard/react-dashboard/src/components/__tests__/Header.test.js
   6:1  error  'describe' is not defined  no-undef
   7:3  error  'test' is not defined      no-undef
  11:5  error  'expect' is not defined    no-undef
  12:5  error  'expect' is not defined    no-undef
  15:3  error  'test' is not defined      no-undef
  21:5  error  'expect' is not defined    no-undef
  23:5  error  'expect' is not defined    no-undef

✖ 7 problems (7 errors, 0 warnings)
```

npm install --save-dev eslint-plugin-jest

update eslint.config.js

```js
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jest from "eslint-plugin-jest";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      jest,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jest.configs.recommended.rules,

      "no-unused-vars": "off",
      "react/prop-types": "off",

      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];

```

npm test

commit, push

![image-20250219111205479](D:\Notes\web-notes\assets\image-20250219111205479.png)

![image-20250219111214237](D:\Notes\web-notes\assets\image-20250219111214237.png)



# Tailwind CSS

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

@tailwind base; 它会引入 **normalize.css** 以及一些默认的全局样式，保证不同浏览器的默认样式一致

@tailwind components; Tailwind 允许你通过 `@apply` 定义 **可复用的组件样式**，然后 `@tailwind components` 会加载它们

例子

```css
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
}

```

这样就可以用自定义的组件效果

```tsx
<button className="btn-primary">Click Me</button>
```

@tailwind utilities; 例如 `p-4`（`padding: 1rem`）、`text-gray-500`（文本颜色灰色）等



## box-sizing: border-box

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

**作用**：

- 让所有元素的 `width` **包含 padding 和 border**，不会增加额外宽度。
- **默认情况下**，CSS 计算 `width` 时不包含 `padding` 和 `border`，这样容易导致布局错乱。
- 这个设置可以确保盒子模型更易于管理。

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid red;
}
```

**默认 `content-box` 模型**：最终 `box` 的宽度是 **200px + 20px + 20px + 5px + 5px = 250px**。

**使用 `border-box`**：`width: 200px` 就是最终大小，不会超出。



## Global Settings

```css
html,
body,
#root {
  height: 100%;
  width: 100%;
  @apply text-sm;
  @apply bg-gray-500;
  @apply text-gray-900;
}
```

**作用**：

- 确保 `html`、`body` 和 `#root` 组件占据整个视口（viewport）。
- `#root` 是 React 项目的根元素，它需要充满整个页面，保证 `App` 组件能正确渲染。



## Themes

tailwind.config.ts

我们使用 `tw-colors` (`createThemes`) 生成 **亮色主题（light）** 和 **暗色主题（dark）**

**定义基础颜色**，即 `gray, red, blue` 等 Tailwind 预设颜色。

**创建颜色映射规则**，让 `gray[50]` 变成 `gray[900]`，保证亮暗模式颜色反转。

**封装 `generateThemeObject` 函数**，批量生成 `lightTheme` 和 `darkTheme`。

**定义 `themes` 变量**，分别存储亮色和暗色模式的颜色方案。

**配置 Tailwind**：

- **使用 `darkMode: "class"`** 来切换暗色模式。
- **注册 `createThemes(themes)` 插件** 让 Tailwind 识别 `light` 和 `dark` 主题



## Classes

**类的顺序** 并不影响渲染的结果，但按照一定的逻辑顺序书写可以提升代码的 **可读性** 和 **可维护性**

**尺寸**：如 `h-*`、`w-*`、`p-*`、`m-*`，用于定义大小和边距

**布局**：如 `flex`、`grid`、`block`，用于定义布局的基本结构

**对齐类**：如 `justify-*`、`items-*`、`text-*`，用于元素对齐和内容排布

**样式类最后**：如 `bg-*`、`text-*`、`border-*`，用于定义视觉样式

**`div`** 是块级元素，默认宽度会填充其父容器 `<body>`，即视口宽度, 因此不需要显式地设置宽度

```tsx
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-green-100 text-4xl font-bold text-blue-600">
      hello
    </main>
```

**`flex`** 将容器变为 Flexbox，激活子元素的主轴和交叉轴对齐能力

**主轴（Main Axis）**：默认是水平的（从左到右） **交叉轴（Cross Axis）**：默认是垂直的（从上到下）

**`justify-center`** 使主轴（水平）的子元素居中

**`items-center`** 使交叉轴（垂直）的子元素居中

p是padding即内边距



## Responsive Design

**Tailwind CSS 常用断点**

| 断点名称 | 类名前缀 | 最小宽度（px） | 适用设备                         |
| -------- | -------- | -------------- | -------------------------------- |
| `sm`     | `sm:`    | `640px`        | **小屏幕**（大部分手机）         |
| `md`     | `md:`    | `768px`        | **中等屏幕**（平板）             |
| `lg`     | `lg:`    | `1024px`       | **大屏幕**（小型笔记本、桌面端） |
| `xl`     | `xl:`    | `1280px`       | **超大屏幕**（大显示器、高清屏） |
| `2xl`    | `2xl:`   | `1536px`       | **超宽屏**（超高分辨率设备）     |



`md:pl-24` 是 **Tailwind CSS** 提供的 **响应式类**，它的作用是 **在屏幕宽度达到 `md`（medium, 768px）时，应用 `pl-24`**

**防止 Sidebar 覆盖内容**：通常 Dashboard 侧边栏 (`Sidebar`) 在大屏幕上是固定的，内容区需要一个 `padding-left` 来让出空间

**适配不同设备**：

- **在小屏幕上（< 768px）** → 没有 `pl-24`，内容 **紧贴左侧**
- **在大屏幕上（≥ 768px）** → `pl-24` 让出 `96px` 的左侧空间，避免 Sidebar 覆盖

`md:pl-24`、`lg:w-1/2` 等 Tailwind 响应式类相当于手写 `@media` 规则，因此 **这就是响应式设计**，也是一种**移动设备兼容**的方法



# NextJS

由于nextjs会按照文件结构注册url

我们用括号把不需要url的组件括起来

比如 (components)



# NextJS Dashboard

Inventory Management

## Frontend

nvm use 20

npx create-next-app@14.2.4 

inventory-management

yes except alias



创建新的tsx快捷键
tsrafce

### Navbar and Sidebar

在layout.tsx导入自定义的组件 `DashboardWrapper` 

```tsx
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
```

`children` 代表 **React 组件中的子组件**，是一个 **特殊的 props**，用于组件嵌套时 **渲染子组件的内容**

该组件

**包裹 `children`**，为 `Dashboard` 页面提供统一的结构

**可以用于全局状态管理**（比如 `Redux`）

**用于控制 Dashboard 相关的 UI 布局**（比如 `Sidebar`、`Header`）

![image-20250220215829895](D:\Notes\web-notes\assets\image-20250220215829895.png)

调整主要内容Dashboard的位置

![image-20250220220039066](D:\Notes\web-notes\assets\image-20250220220039066.png)

调整Sidebar和Navbar的位置

![image-20250220221902407](D:\Notes\web-notes\assets\image-20250220221902407.png)

Navbar看设计图，应当是用flex结构在两边各有一个子结构

所以用 justify-between

![image-20250220223716510](D:\Notes\web-notes\assets\image-20250220223716510.png)

![image-20250220224746015](D:\Notes\web-notes\assets\image-20250220224746015.png)

### Redux

npm i react-redux @reduxjs/toolkit redux-persist



## Database

旧密码





## Backend

npx prisma generate

npx prisma migrate dev --name init

```
Your database is now in sync with your schema.
```

npm run seed



# AWS

![image-20250221160004439](D:\Notes\web-notes\assets\image-20250221160004439.png)

**Virtual Private Cloud**

prevent other access

## Step1: VPC and Subnets

![image-20250221185554553](D:\Notes\web-notes\assets\image-20250221185554553.png)

**create subnets**

![image-20250221190153972](D:\Notes\web-notes\assets\image-20250221190153972.png)

![image-20250221190212214](D:\Notes\web-notes\assets\image-20250221190212214.png)

The public subnet can be accessed from the client through **VPC Internet Gateway** 

The private one can only be accessed inside VPC

**Create VPC Internet Gateway** 

name vpc-internet-gateway

the attach to VPC

result:

![image-20250221190854150](D:\Notes\web-notes\assets\image-20250221190854150.png)

**Create Route Table**

public-route-table

private-route-table

**Edit subnet associations**

![image-20250221191409692](D:\Notes\web-notes\assets\image-20250221191409692.png)

public - public

private - private



**Add route**

public-route-table

Edit routes

![image-20250221191705546](D:\Notes\web-notes\assets\image-20250221191705546.png)

result:

![image-20250221191805619](D:\Notes\web-notes\assets\image-20250221191805619.png)



## Step2: EC2

### 1. Connect to EC2 Instance

**Launch an instance**

ec2-nextjs-dashboard-backend

![image-20250221193018181](D:\Notes\web-notes\assets\image-20250221193018181.png)

![image-20250221193440010](D:\Notes\web-notes\assets\image-20250221193440010.png)

then

**connect to instance**

![image-20250221193523880](D:\Notes\web-notes\assets\image-20250221193523880.png)

we need to install nvm, node.js, git, pm2 (Production Process Manager for Node.js)



### 2. Install nvm and Node.js

- **Switch to superuser and install nvm:**

```
sudo su -
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

- **Activate nvm:**

```
. ~/.nvm/nvm.sh
```

- **Install the latest version of Node.js using nvm:**

```
nvm install node
```

- **Verify that Node.js and npm are installed:**

```
node -v
npm -v
```

![image-20250221194318159](D:\Notes\web-notes\assets\image-20250221194318159.png)

### 3. Install Git

- **Update the system and install Git:**

```
sudo yum update -y
sudo yum install git -y
```

- **Check Git version:**

```
git --version
```

![image-20250221195053922](D:\Notes\web-notes\assets\image-20250221195053922.png)

- **Clone your code repository from GitHub:**

```
git clone https://github.com/Kurumiku0712/nextjs-dashboard.git
```

- **Navigate to the directory and install packages:**

```
cd nextjs-dashboard
cd server
npm i
npm run dev
```

![image-20250221195936230](D:\Notes\web-notes\assets\image-20250221195936230.png)

- **Create Env File and Port 80:**![image-20250221200212129](D:\Notes\web-notes\assets\image-20250221200212129.png)

```
echo "PORT=80" > .env
npm run dev
```

![image-20250221200300255](D:\Notes\web-notes\assets\image-20250221200300255.png)

- copy the ipv4 from the instance details and paste it on browser

![image-20250221200554541](D:\Notes\web-notes\assets\image-20250221200554541.png)

- **Start the application:** (not executed)

```
npm start
```

### 4. Install pm2

- **Install pm2 globally:**

```
npm i pm2 -g
```

- **Create a pm2 ecosystem configuration file (inside server directory):**

```
module.exports = { apps : [{ name: 'inventory-management', script: 'npm', args: 'run dev', env: { NODE_ENV: 'development', ENV_VAR1: 'environment-variable', } }], };
```

- **Modify the ecosystem file if necessary:**

```
nano ecosystem.config.js
```

- **Set pm2 to restart automatically on system reboot:**

```
sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER)
```

![image-20250221201319425](D:\Notes\web-notes\assets\image-20250221201319425.png)

- **Start the application using the pm2 ecosystem configuration:**

```
pm2 start ecosystem.config.js
pm2 status
```

- **Useful pm2 commands:**

  - **Stop all processes:**

  ```
  pm2 stop all
  ```

  - **Delete all processes:**

  ```
  pm2 delete all
  ```

  - **Check status of processes:**

  ```
  pm2 status
  ```

  - **Monitor processes:**

  ```
  pm2 monit
  ```

![image-20250221201446210](D:\Notes\web-notes\assets\image-20250221201446210.png)

result:

![image-20250221201649195](D:\Notes\web-notes\assets\image-20250221201649195.png)

## Step3: RDS

Add one more subnet

![image-20250221202144689](D:\Notes\web-notes\assets\image-20250221202144689.png)

associate with route table

![image-20250221202229986](D:\Notes\web-notes\assets\image-20250221202229986.png)



**RDS** 

subnet groups

create DB subnet group

name: rds-subnet-group

![image-20250221202514442](D:\Notes\web-notes\assets\image-20250221202514442.png)

then

**Create database**

standard -> PostgreSQL -> Free tier

settings: rds-nextjs-dashboard

Master password: the old one

![image-20250221202936077](D:\Notes\web-notes\assets\image-20250221202936077.png)

![image-20250221203025057](D:\Notes\web-notes\assets\image-20250221203025057.png)

![image-20250221203042432](D:\Notes\web-notes\assets\image-20250221203042432.png)

![image-20250221203312948](D:\Notes\web-notes\assets\image-20250221203312948.png)

![image-20250221203839389](D:\Notes\web-notes\assets\image-20250221203839389.png)

![image-20250221203901103](D:\Notes\web-notes\assets\image-20250221203901103.png)

click the link on the Active

**Edit inbound rules**

![image-20250221204033786](D:\Notes\web-notes\assets\image-20250221204033786.png)

databases

![image-20250221204115477](D:\Notes\web-notes\assets\image-20250221204115477.png)

copy endpoint  

```
rds-nextjs-dashboard.c1s48k0ma5xt.ap-southeast-2.rds.amazonaws.com
```

remember:

DB name

nextjs_dashboard

and password



go to EC2 instances

connect, open the console

```
sudo su -
ls
cd nextjs-dashboard
cd server
nano .env
```

change 

```
DATABASE_URL="postgresql://postgres:ygy2000712.@localhost:5432/dashboard?schema=public"
```

to (be careful here, any detail error could cause fail)

```
DATABASE_URL="postgresql://postgres:ygy2000712.@rds-nextjs-dashboard.c1s48k0ma5xt.ap-southeast-2.rds.amazonaws.com/nextjs_dashboard?schema=public"
```

ctrl+o enter ctrl+x

```
pm2 status
pm2 delete all
npx prisma generate
npx prisma migrate dev --name init
npm run seed
pm2 start ecosystem.config.js
pm2 monit
```

![image-20250221205320902](D:\Notes\web-notes\assets\image-20250221205320902.png)

![image-20250221205451901](D:\Notes\web-notes\assets\image-20250221205451901.png)

ipv4/dashboard on browser

![image-20250221205729025](D:\Notes\web-notes\assets\image-20250221205729025.png)

result:

![image-20250221205854479](D:\Notes\web-notes\assets\image-20250221205854479.png)

## Step4: Amplify
