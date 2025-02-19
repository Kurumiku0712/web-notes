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
