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

