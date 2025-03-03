# 字节一面

**自我介绍**

我叫杨广宇，本科华南理工大学，现在在墨尔本大学读软件工程硕士，目前在实习做全栈开发，作为一个小团队的leader，负责带领前后端成员进行开发、合并代码和上线测试。我有很强的团队协作、解决问题和快速上手新技术的能力，并且还富有创意，能适应快速迭代的敏捷开发环境。主要技术栈是前端React，同时对各种后端和部署技术有一些实践经验。



**为什么选择前端?**

前端更有意思，让我更有学习和开发的热情，我挺享受创作的过程（像剪视频、做游戏和做网站），而前端的即时反馈更能给我动力去一直做一个产品



**实习过程中最难上手的或者最大的难点是什么？**

很多问题在本地环境显现不出来，上线后几个issue同时存在, 首页加载慢差不多10s, 有的地方报CORS错误, 有的地方不报, 测试排查问题和debug耗时, 因为每次改动都得重新部署花不少时间



## **📌 1️⃣ 前端性能优化（结合 React 性能优化、SEO、无限滚动）**

### **核心知识点**

- **如何优化 React 性能？（React.memo, useMemo, useCallback）**

首先性能优化的本质是**减少不必要的渲染**和**避免重复计算**。React 提供了 **`memo`、`useMemo`、`useCallback`** 来帮助优化渲染性能

1️⃣ **`React.memo`（缓存组件，避免子组件不必要渲染）**

- **适用场景：** 当 **父组件渲染时**，如果**子组件的 props 没有变化**，可以使用 `React.memo` **缓存子组件**，避免不必要的重新渲染。
- **示例：** 一个展示用户信息的 `UserCard` 组件，只有当 `user` 发生变化时才需要重新渲染。

```jsx
const UserCard = React.memo(({ user }) => {
  console.log("UserCard render");
  return <div>{user.name}</div>;
});
```

2️⃣ **`useMemo`（缓存计算结果，避免重复计算）**

- **适用场景：** 当某些计算**开销很大**，但 **依赖的数据没有变**时，可以用 `useMemo` **缓存计算结果**，避免重复执行计算。
- **示例：** 计算一个**大数组的过滤结果**，如果 `searchQuery` 没变，就不需要重新计算。

```jsx
const filteredUsers = useMemo(() => {
  return users.filter(user => user.name.includes(searchQuery));
}, [users, searchQuery]);
```

3️⃣ **`useCallback`（缓存函数，避免子组件不必要的 re-render）**

- **适用场景：** 当一个函数**被传递给子组件**，而**子组件用了 `React.memo`**，可以用 `useCallback` **缓存这个函数**，避免它在每次渲染时都生成新的引用，导致子组件重新渲染。
- **示例：** 避免 `handleClick` 每次渲染都重新创建。

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);
```

📌 **总结：**

| **优化手段**      | **作用**                               | **适用场景**                 |
| ----------------- | -------------------------------------- | ---------------------------- |
| **`React.memo`**  | 缓存**组件**，避免子组件不必要渲染     | **子组件的 props 不变时**    |
| **`useMemo`**     | 缓存**计算结果**，避免重复计算         | **依赖数据不变，但计算量大** |
| **`useCallback`** | 缓存**函数引用**，防止不必要 re-render | **函数作为 `props` 传递时**  |

🚀 **最佳实践：**

- **避免过度使用**，如果优化成本 > 渲染成本，优化反而会降低性能。
- **配合 `useMemo` 和 `useCallback`**，确保 `React.memo` 不因 props 变化导致缓存失效。
- **优先优化“瓶颈”部分**，先分析哪些组件或计算最耗时，针对性优化。

**示例场景：**
如果一个页面有一个 **列表渲染** + **搜索筛选**，可以：

- 用 **`React.memo`** 避免 `ListItem` 组件重复渲染。
- 用 **`useMemo`** 缓存 `filteredUsers`，提高筛选效率。
- 用 **`useCallback`** 确保 `handleClick` 传递给 `ListItem` 时不会触发不必要的 re-render。

这样整体性能 **提升明显**，避免了 React 不必要的渲染开销！ 🚀



- **如何衡量前端性能？Lighthouse（LCP、CLS、FID）**F12 Performance API

**LCP（Largest Contentful Paint）**：衡量页面的**主要内容**（如图片或大块文本）渲染所需时间，反映**加载速度**。理想值 **< 2.5s**。

**CLS（Cumulative Layout Shift）**：衡量页面**视觉稳定性**，即布局是否发生**意外跳动**。理想值 **< 0.1**。

**FID（First Input Delay）**：衡量**首次交互响应时间**，即用户点击或输入后，页面多久开始响应。理想值 **< 100ms**。

LCP（加载速度）、CLS（稳定性）、FID（交互延迟）



- **如何监控这些性能指标？**

Lighthouse（静态分析）、Performance API（实时监控）、Web Vitals（生产环境）



- **如何减少首页加载时间？（Lazy Loading、代码拆分、Tree Shaking）**

优化首页加载速度的核心目标是减少**首屏渲染时间**和**减少不必要的资源加载**，常见方法包括：

- **Lazy Loading（懒加载）**：延迟加载**非关键资源**（如图片、组件、第三方库），避免一次性加载过多内容。
- **代码拆分（Code Splitting）**：使用 Webpack 或 Vite 进行**按需加载**，只在需要时加载对应的 JavaScript 代码。
- **Tree Shaking（去除未使用代码）**：通过静态分析**移除未使用的代码**，减少打包体积，提高加载速度。
- **使用 CDN**：加速静态资源的加载，减少服务器响应时间。
- **减少关键渲染路径**：优化 CSS 和 JS 加载顺序，确保**首屏内容**尽快可见。



- **React 如何进行批量更新？**

React 通过 **虚拟 DOM** 机制和 **批量更新策略** 来优化渲染性能，主要方式有：

- **虚拟 DOM（Virtual DOM）**：React 不会直接更新真实 DOM，而是先在**内存中计算差异**，然后一次性更新需要变化的部分，减少不必要的渲染开销。
- **批量更新（Batching）**：React 在相同事件循环内的**多个 `setState` 操作**会被合并，避免多次重复渲染，提高性能。
- **Concurrent Mode（并发模式）**：React 18 之后，启用了**并发渲染**，可以在后台渲染 UI，而不会阻塞主线程，提高页面的响应速度。



- **如何实现无限滚动？（Intersection Observer, 分页加载）**

**分页加载（Pagination）**：后端提供**分页 API**，前端每次请求**下一页数据**并追加到列表中。

**Intersection Observer**：使用浏览器 API 监听**列表的最后一项**，当它进入视口时，触发新数据的加载。

**虚拟滚动（Virtual Scrolling）**：对于超大数据列表，使用 **窗口化（Windowing）** 技术，只渲染可见部分，提高渲染性能。



- **SSR vs CSR，SEO 优势？**

SSR（服务器端渲染）将页面**在服务器上渲染成 HTML** 并直接返回给浏览器，而 CSR（客户端渲染）则是**先加载 JS 再动态生成 HTML**。**SSR 更有利于 SEO**，因为搜索引擎可以直接爬取**完整的 HTML 页面**，而 CSR 依赖于 JS 运行后才能生成内容，可能会被搜索引擎忽略或爬取延迟。



- **为什么要做 SEO 优化？对性能有什么帮助？**

SEO 优化能提高网页**在搜索引擎中的排名**，增加自然流量，同时提升用户体验。从性能角度来看，优化**首屏渲染时间**（如使用 SSR 或预渲染）能减少 FCP（First Contentful Paint）时间，使页面更快显示主要内容，从而降低跳出率，提高转化率。



- **预渲染预先渲染的是什么内容？**

预渲染（Prerendering）会**提前在构建阶段生成 HTML 页面**，通常用于**静态页面或 SEO 关键页面**。它生成的是**完整的 HTML 结构**，但交互部分仍由 JS 运行后激活，适用于无需频繁更新的数据，如博客文章或营销页面。



- **如何衡量 SSR 转换后的性能优化？**

可以通过**Lighthouse 和 Web Vitals 指标**来评估，例如 LCP（Largest Contentful Paint）测量首屏内容的渲染时间，TTI（Time to Interactive）衡量页面可交互的时间，TBT（Total Blocking Time）检查 JS 运行对主线程的影响。相比 CSR，SSR 通常能**降低 LCP 和 TTI，提高页面加载速度**。



- **在 SSR 里，哪一个生命周期可以操作 localStorage？**

在 SSR 过程中，代码**首先在服务器运行**，此时**没有浏览器环境**，因此无法直接访问 `localStorage`。需要在 `useEffect` 或 `componentDidMount` 这些**仅在客户端执行**的生命周期内访问 `localStorage`，确保代码不会在服务器端执行时报错。



- **SSR 的卡点，如何判断哪些代码需要 Polyfill？**

SSR 可能遇到的卡点包括**服务器端缺少浏览器 API**（如 `window`, `document`, `localStorage`）或**ES6+ 语法不兼容**。可以通过**检查运行时报错**（如 `ReferenceError: window is not defined`）或使用 `typeof window !== "undefined"` 进行环境判断，同时使用 `core-js` 等 Polyfill 兼容低版本浏览器的 JS 特性。

------

## **📌 2️⃣ Web 安全 & 认证（结合 JWT、axios 拦截器、Token 管理）**

### **核心知识点**

- **JWT 认证流程**
- **Token 存储方式（LocalStorage vs Cookie vs Session）**
- **如何在前后端分离架构下管理身份认证？**
- **CORS 跨域处理**
- **axios 拦截器的作用**
- **OAuth2 认证机制**

### **相关面试问题**

- **JWT 认证的原理？**

**JSON Web Token (JWT)** 是一种无状态的身份认证机制，服务端签发 Token 给客户端，客户端每次请求时携带该 Token，服务端验证后返回资源，无需存储会话状态。



- **如何安全地在前端存储 Token？**

**短期 Token（如访问令牌）**：`Memory (内存)`（安全，页面刷新丢失）

**长期 Token（如刷新令牌）**：`HttpOnly Cookie + Secure`（安全，防止 XSS）

**避免 `localStorage` 存 Token**，因其容易被 XSS 攻击窃取



- **Cookie、SessionStorage、LocalStorage 区别？**

| 特性           | Cookie                    | LocalStorage             | SessionStorage                 |
| -------------- | ------------------------- | ------------------------ | ------------------------------ |
| **生命周期**   | 设定时间，默认 Session 级 | **永久存储**（手动清除） | **Session 级**（关闭页面清除） |
| **大小限制**   | 4KB                       | 5MB                      | 5MB                            |
| **作用域**     | **自动随请求发送**        | 仅在本域存取             | 仅在当前 Tab 存取              |
| **是否跨页面** | ✅ 跨页面可用              | ✅ 跨页面可用             | ❌ 仅限当前页面                 |
| **适用场景**   | **存 Token、身份验证**    | 长期存储配置数据         | **短期数据（如临时表单）**     |

✅ **存 Token 时，推荐 `HttpOnly Cookie`，防止 XSS 窃取**



- **如何在前端请求中传递 Cookie？**

✅ **在 `fetch` 或 `axios` 请求中添加 `credentials` 选项**：

```js
fetch(url, { credentials: "include" })  // 允许跨域携带 Cookie
axios.get(url, { withCredentials: true }) // 同理
```

**默认情况下，跨域请求不会携带 Cookie**，需服务端 **允许 `Access-Control-Allow-Credentials: true`**



- **axios 有拦截器吗？它的作用是什么？**

**请求拦截** (`request` interceptor)：在请求发送前 **添加 Token** 或 **修改请求头**

**响应拦截** (`response` interceptor)：在响应返回前 **统一处理错误** 或 **自动刷新 Token**



- **如何解决 CORS 问题？**

CORS（跨域资源共享）**由服务端决定是否允许跨域请求**，前端无法直接解决。

**服务端添加 CORS 头**（推荐）：

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

**前端代理**（适用于开发环境）：

- Webpack/Vite 配置 `proxy`
- Nginx 代理请求到同源 API



- **如何防止 CSRF 攻击？**

**最佳实践**：

1. **使用 `SameSite=Strict` 或 `SameSite=Lax` 的 Cookie**
2. Token 机制
   - **在请求头中携带 `CSRF-Token`**
   - **双重 Cookie 机制**（前端从 Cookie 读取 Token，放入 `headers`）
3. **限制 `Referer` 和 `Origin`**
4. **验证码（reCAPTCHA）**（适用于关键操作）



- **Cookie 的应用场景？**

✅ **主要用于**：

- **用户身份认证**（存放 `Session ID` 或 `JWT`）
- **网站偏好设置**（如 `语言、主题`）
- **跨页面数据存储**（如购物车信息）

📌 **最佳实践**：

- **敏感数据存 `HttpOnly` Cookie**
- **设置 `Secure` 防止非 HTTPS 传输**
- **设置 `SameSite` 保护 CSRF**



- **前端如何检查用户的登录状态？**

✅ **常见方式**：

1. Token 方式（JWT）
   - 登录后返回 `JWT`
   - 前端存储（Cookie / LocalStorage）
   - 每次请求带 `Authorization: Bearer Token`
2. Session 方式
   - 登录后 `Set-Cookie: session_id=xxx`
   - 访问受保护资源时，检查 `session_id`
3. 调用 `/auth/check` API
   - 每次页面加载时，前端请求 `/auth/check`
   - 后端返回 `200`（已登录）或 `401`（未登录）



- **跨域问题有哪些解决方案？**

✅ **常见方案**：

1. **CORS（推荐）**：后端配置 `Access-Control-Allow-Origin`
2. **JSONP**（仅支持 `GET`）
3. **反向代理**（Nginx、Webpack `devServer.proxy`）
4. **NGINX + 同源策略**（配置 `proxy_pass`）





------

## **📌 3️⃣ Web 部署 & DevOps（结合 Docker, Nginx, CI/CD）**

### **核心知识点**

- **为什么要使用 Docker？**
- **前后端分别容器化 vs 统一容器化**
- **Nginx 反向代理的作用**
- **CI/CD 自动化部署**
- **Git rebase vs merge**

### **相关面试问题**

- **前端如何使用 Docker 进行部署？**

**使用 `Dockerfile` 构建前端应用**（如 React、Vue）并运行 Nginx 提供静态文件。

**主要步骤**：`npm build → COPY dist → Nginx 运行`。

**优势**：一致的环境、易于 CI/CD 自动化部署。



- **前后端容器化的区别？**

**前端容器化**：通常只需 **Nginx + 静态资源**（HTML, CSS, JS）。

**后端容器化**：需要 **运行环境（Node.js, Java, Python）+ 依赖安装**，通常包含 **数据库、缓存（Redis）等服务**。

**后端通常涉及多容器编排（Docker Compose / Kubernetes）**。



- **Nginx 反向代理如何配置？**

**反向代理作用**：前端请求转发到后端，解决 **跨域问题**。

```nginx
location /api/ {
    proxy_pass http://backend:8080;
}
```

**可以做负载均衡、缓存优化、静态资源托管**。



- **如何利用 CI/CD 实现前端自动化部署？**

**Git push 触发 CI/CD Pipeline** → **构建前端代码** → **打包 Docker 镜像** → **推送到服务器** → **自动部署**。

**常用工具**：GitHub Actions, GitLab CI/CD, Jenkins。

**自动化减少人为错误，提高部署效率**。



- **Git rebase 和 merge 的区别？**

**`merge`**：保留完整历史，合并后有**额外的 merge commit**，适合多人协作。

**`rebase`**：将当前分支的提交 **“重新应用”** 到目标分支，不产生额外 commit，适用于 **保持 commit 记录整洁**。

**`rebase` 更干净，`merge` 更安全**。



- **如何用 Docker 实现本地开发环境与生产环境的一致性？**

**使用 `Docker Compose`** 管理多个服务（前端、后端、数据库）。

**相同 `Dockerfile` 适配**不同 `环境变量（dev/prod）`，保持环境一致。

**解决“本地能跑，服务器出错”的问题**。



- **如何让 Docker 容器间进行通信？**

**使用 `Docker Network`** 创建一个**私有网络**，让容器间可以通过 `container_name` 互相访问。

**Docker Compose 默认创建 bridge 网络**，服务可直接用 **`service_name`** 通信（如 `backend:8080`）。

**避免使用 `localhost`，因为每个容器有独立网络环境**。



- **如何优化 Docker 镜像体积？**

**选择轻量级基础镜像**（如 `alpine` 代替 `ubuntu`）。

**减少 `RUN` 层数，合并多个命令**，减少无用层。

**使用 `.dockerignore` 排除 `node_modules`、`logs` 等不必要文件**。



------

## **📌 4️⃣ JavaScript 语言核心**

### **核心知识点**

- **Promise 机制**
- **事件循环（宏任务 & 微任务）**
- **this 指向问题**
- **闭包的概念**
- **作用域链**
- **深拷贝 & 浅拷贝**
- **手写 Promise.all**
- **手写节流 & 防抖**
- **V8 引擎解析机制**

### **相关面试问题**

- **Promise 机制是什么？**
- **如何判断一个对象是不是 Promise 实例？**
- **介绍 Promise.all、Promise.race**
- **手写 Promise.all**
- **手写异步并行控制**
- **介绍 JS 事件循环机制（宏任务 & 微任务）**
- **做题判断输出（事件循环考察）**
- **this 在不同场景的指向？**
- **如何手写数组扁平化？**
- **手写节流 & 防抖函数**
- **V8 引擎的解析流程？**
- **如何实现 Object 深拷贝？**

浅拷贝问题

```js
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 };  // 仅拷贝第一层

obj2.b.c = 100;  // 修改 obj2 影响 obj1
console.log(obj1.b.c); // 100 （仍然引用同一个对象）

```

深拷贝

创建一个新的对象，所有嵌套对象都被复制，互不影响





- **ES6 的解构赋值和扩展运算符的作用？**

------

## **📌 5️⃣ React 进阶**

### **核心知识点**

- **React Fiber 架构**
- **React.memo, useMemo, useCallback 的区别**
- **为什么 hooks 不能在条件分支和循环中使用？**
- **props 传递数据的底层原理**
- **React 为什么不用数据劫持？（对比 Vue）**
- **React 组件更新的触发机制**

### **相关面试问题**

- **React Fiber 架构的核心优化点是什么？**

> **React Fiber 是 React 16 引入的核心重构，提高 UI 渲染性能**

✅ **核心优化点：**

1. **可中断的渲染（Interruptible Rendering）**
   - 传统的 React 递归渲染是 **同步** 的，Fiber 允许将渲染拆分为 **多个小任务**，可以暂停并恢复。
2. **优先级调度（Time Slicing）**
   - **关键 UI 任务优先执行**（如输入响应），低优先级任务（如动画、列表渲染）可推迟执行。
3. **异步渲染（Concurrent Mode）**
   - 允许 React 处理 **多任务并发**，如 `useTransition()` 控制渲染优先级。

📌 **总结**：React Fiber 让 UI 渲染 **更流畅、不卡顿、可控优先级** 🚀



- **为什么 hooks 不能在条件分支和循环中使用？**

> **React 需要保证 hooks 的调用顺序一致，否则会导致状态错乱**

✅ **核心原因：**

1. **Hooks 调用顺序必须稳定**
   - React **依赖调用顺序** 来匹配 `useState` / `useEffect` 等 hooks 的状态。
   - 如果 hooks 在 **条件语句/循环** 里执行，调用顺序就可能改变，导致状态错误。
2. **React 通过链表存 hooks 状态**
   - **内部维护一个 hooks 数组**，如果跳过某个 hooks，索引会错位，状态将绑定错误的变量。

✅ **正确用法：**

- **Hooks 必须放在组件的顶层**，不在条件/循环中：

```js
if (someCondition) { 
  useState(0); // ❌ 错误，可能导致 hooks 顺序错乱 
}
```

📌 **总结**：**Hooks 规则** = **调用顺序不可变**，否则 React 无法正确管理状态 💡



- **props 的底层实现原理？**

> **props 是组件的 “输入”，用于从父组件向子组件传递数据**

✅ **核心原理：**

1. **React 组件是函数，props 是其参数**

   - React 组件本质上是一个 **纯函数**，`props` 作为 **参数** 传入组件：

   ```
   function Button(props) {
     return <button>{props.text}</button>;
   }
   ```

2. **React 通过 `VDOM` 计算 `props` 变化**

   - 当父组件 `render`，React **比较新旧 `props`**，判断子组件是否需要更新。
   - `React.memo` 通过浅比较 `props` 进行 **性能优化**，避免不必要的重渲染。

3. **`props` 传递是 **单向数据流

   - React 遵循 **自上而下的单向数据流**，保证组件间的状态管理可预测。

📌 **总结**：props 是 **React 组件的参数**，**通过 VDOM 计算变化**，**单向传递** 确保数据流可控 🚀



- **React 为什么采用虚拟 DOM？**
- **React.memo、useMemo、useCallback 的区别是什么？**
- **如何在 React 中实现组件通信？**
- **React 和 Vue 在状态管理上的区别？**

------

## **📌 6️⃣ CSS & 前端布局**

### **核心知识点**

- **Flex 布局**
- **CSS 响应式设计**
- **Grid vs Flex 的区别**
- **CSS 变量**
- **CSS 选择器 & 优先级**
- **如何使用 Web Component 进行组件化开发？**

### **相关面试问题**

- **Flex:1 和 width:100% 的区别？**

**`flex:1`** 让元素 **占满剩余空间**，同时可 **弹性收缩**。

**`width:100%`** 让元素 **占满父容器的宽度**，但不会自动收缩。



- **用 Flex 实现两栏布局**

```css
.container { display: flex; }
.left { width: 200px; }
.right { flex: 1; }
```



- **如何实现响应式布局？**

**使用 `media queries`（媒体查询）**，根据屏幕宽度调整样式

```css
@media (max-width: 768px) { .container { flex-direction: column; } }
```



- **CSS 变量的作用？**

CSS 变量 (`--var`) 允许全局定义 & 复用样式，便于主题切换和动态修改

```css
:root { --primary-color: blue; }
button { background-color: var(--primary-color); }
```



- **CSS 选择器优先级如何计算？**

**优先级规则：** `!important > 内联样式 > ID 选择器 > 类/伪类 > 元素选择器(标签div, p)`



- **相邻节点选择器 `+`、`~` 的作用？**

```
h1 + p { color: red; }  /* 仅影响紧跟的 <p> */
h1 ~ p { color: blue; } /* 影响所有后续 <p> */
```



- **如何用 CSS 实现五子棋的斜线布局？**

------

## **📌 7️⃣ 计算机网络 & 浏览器**

### **核心知识点**

- **HTTP vs HTTPS**
- **HTTP1.1、HTTP2、HTTP3 的区别**
- **TCP 和 UDP 的区别**
- **跨域（CORS, JSONP）**
- **浏览器缓存策略（强缓存 & 协商缓存）**
- **DNS 解析过程**
- **输入 URL 后发生了什么？**

### **相关面试问题**

- **HTTP 和 HTTPS 的区别？**

**HTTP** 是 **明文传输**，不安全，容易被窃听和篡改。

**HTTPS** 通过 **SSL/TLS 加密**，保证数据传输的 **安全性、完整性**，但略增加性能开销。



- **跨域问题如何解决？**

**CORS（推荐）**：服务端返回 `Access-Control-Allow-Origin` 允许跨域请求。

**JSONP**（仅支持 `GET`）通过 `<script>` 远程执行回调函数。

**反向代理**（Nginx, Webpack `proxy`）让请求看起来同源。



- **TCP 粘包如何处理？**

**TCP 传输时可能多个小包被合并（粘包）或大包被拆分（拆包）**。

**解决方案**：

- **定长协议**：每个包固定大小。
- **特殊分隔符**（如 `\n`）标识包结束。
- **包头 + 包体长度**，解析时先读包头获取长度，再读取完整数据。



- **如何优化 DNS 解析速度？**

**启用 DNS 预解析** (`<link rel="dns-prefetch" href="//example.com">`)。

**使用 CDN** 让 DNS 解析更接近用户，提高命中率。

**减少外部资源域名**，避免额外的 DNS 查询开销。

**浏览器缓存 DNS 记录**，避免重复查询。



- **浏览器的缓存策略是什么？**

**强缓存（本地缓存）**：

- `Cache-Control: max-age=3600`（指定多久后失效）。
- `Expires: Wed, 21 Oct 2025 07:28:00 GMT`（过期时间）。

**协商缓存（向服务器验证）**：

- `ETag`（文件版本标识符），若一致则返回 `304 Not Modified`。
- `Last-Modified`（文件最后修改时间）。



- **如何衡量网站的网络性能？**

**LCP**（最大内容渲染时间）：< 2.5s

**CLS**（布局偏移稳定性）：< 0.1

**TTFB**（首字节到达时间）：< 500ms

**FID**（首次交互延迟）：< 100ms



- **输入 URL 之后发生了什么？**

**DNS 解析** → 获取服务器 IP 地址。

**TCP 三次握手** → 建立连接。

**发送 HTTP/HTTPS 请求**。

**服务器处理请求**，返回 HTML/CSS/JS 资源。

**浏览器解析 & 渲染**，执行 JS，加载资源。

**页面渲染完成**，触发 `DOMContentLoaded` 和 `onload` 事件。



1️⃣ **客户端 → 服务器（SYN）**

- **客户端** 发送 `SYN`（同步请求）数据包，表示请求建立连接。
- **标志位**：`SYN=1, SEQ=x`（随机初始序列号）。

2️⃣ **服务器 → 客户端（SYN-ACK）**

- **服务器** 收到 `SYN` 后，返回 `SYN-ACK` 确认请求。
- **标志位**：`SYN=1, ACK=1, SEQ=y, ACK=x+1`。

3️⃣ **客户端 → 服务器（ACK）**

- **客户端** 再次发送 `ACK` 确认连接建立。
- **标志位**：`ACK=1, SEQ=x+1, ACK=y+1`。



## 代码题

### var，const，let的代码输出题

三个方面，作用域，变量提升情况，可变性

| 特性           | `var`                    | `let`                        | `const`               |
| -------------- | ------------------------ | ---------------------------- | --------------------- |
| **作用域**     | 函数作用域               | 块级作用域                   | 块级作用域            |
| **变量提升**   | 提升（默认 `undefined`） | 提升但不初始化（暂时性死区） | 提升但不初始化（TDZ） |
| **是否可修改** | ✅ 可以修改               | ✅ 可以修改                   | ❌ 不能重新赋值        |

**🚀 重点：**

- `var` 有变量提升，声明提前，**但默认 `undefined`**。`let` 和 `const` 也会提升，**但访问时若未初始化会报 "暂时性死区" 错误**。
-  **`let` 和 `const` 具有块级作用域，出了 `{}` 就访问不到**。 **`var` 是函数作用域，在块 `{}` 内声明的变量仍然在全局可访问**。
- `const` 变量不能重新赋值，但如果是对象或数组，**其属性是可以修改的**。

```js
function test() {
    console.log(a); // ?
    console.log(b); // ?
    console.log(c); // ?

    var a = 1;
    let b = 2;
    const c = 3;
}

test();

```

undefined
ReferenceError: Cannot access 'b' before initialization
ReferenceError: Cannot access 'c' before initialization



### promise, 如何判断一个对象是不是promise实例, 手写promise.all，promise.race

`Promise` 是 JavaScript 中用于 **处理异步操作** 的对象，它提供了一种更优雅的方式来避免 **回调地狱（Callback Hell）**，并提供了 `then/catch/finally` 方法来管理异步流程。

在 JavaScript 早期，我们使用 **回调函数（callback）** 处理异步任务，比如：

```js
setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
        }, 1000);
    }, 1000);
}, 1000);
```

这段代码形成了 **回调地狱**（嵌套过深，难以维护）。

使用 `Promise`，我们可以改写成：

```js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

delay(1000)
    .then(() => {
        console.log("Step 1");
        return delay(1000);
    })
    .then(() => {
        console.log("Step 2");
        return delay(1000);
    })
    .then(() => {
        console.log("Step 3");
    });
```

这样代码变得 **扁平（flat）**，更清晰，易于管理。



在 JavaScript 中，可以用以下方式判断：

```js
function isPromise(obj) {
    return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

// 测试
console.log(isPromise(new Promise(() => {}))); // true
console.log(isPromise({ then: function() {} })); // true (伪 Promise)
console.log(isPromise(123)); // false
console.log(isPromise(null)); // false
console.log(isPromise({})); // false
```

- **Promise 必须是对象或函数**
- **必须包含 `then` 方法**
- 但仅仅有 `then` 可能只是一个 **thenable 对象**，未必是真正的 Promise



实现 `promiseAll(promises)`，接收一个 promise 数组，返回一个新的 promise，只有当 **所有** promise 都成功解析时才会 resolve，任意一个失败则立即 reject。

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
      
    if (promises.length === 0) resolve(results);
      
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(error => reject(error));
    });
  });
}

```

#### **解题思路**

- **遍历 `promises`**：对每个 promise 绑定 `.then` 和 `.catch`。
- **使用计数器** 记录已完成的 promise，所有都 resolve 后返回结果数组。
- **任何 promise reject 立即终止**，防止继续执行。

"`Promise.all` 并发执行多个异步任务，所有成功才 resolve，有一个失败就 reject。我通过计数器追踪已完成的 Promise，当计数等于输入数组长度时，返回所有结果。"

```js
function promiseAll(promises){
    return new Promise((resolve, reject)=>{
        const results = [];
        let count = 0;
        
        if(promises.length===0){
            resolve(results);
        }
        
        promises.forEach((p, index)=>{
            Promise.resolve(p)
            .then((value)=>{
                results[index]=value;
                count++;
                if(count===promises.length){
                    resolve(results);
                }
            })
            .catch((error)=>{reject(error)})
        })
    })
}
```



Promise.race

**只返回最早完成的 Promise 结果**

**如果最先完成的是 `reject`，则直接 `reject`**

```js
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        for (let p of promises) {
            Promise.resolve(p).then(resolve, reject);
        }
    });
}
```

promiseAllSettled(promises)

```js
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    let results = [];
    let count = 0;
    let total = promises.length;

    if (total === 0) {
      resolve([]);
      return;
    }

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = { status: "fulfilled", value };
        })
        .catch(reason => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          count++;
          if (count === total) resolve(results); // 全部完成后返回
        });
    });
  });
}

```

手写异步并行控制

```js
function asyncParallelLimit(tasks, limit) {
  return new Promise((resolve, reject) => {
    let results = new Array(tasks.length);
    let running = 0;
    let index = 0;

    function runNext() {
      if (index >= tasks.length) return;
      const currentIndex = index;
      const task = tasks[currentIndex];
      index++;
      running++;

      Promise.resolve(task())
        .then(res => results[currentIndex] = res)
        .catch(err => results[currentIndex] = err)
        .finally(() => {
          running--;
          if (results.length === tasks.length && running === 0) {
            resolve(results);
          } else {
            runNext();
          }
        });
    }

    for (let i = 0; i < Math.min(limit, tasks.length); i++) {
      runNext();
    }
  });
}

```



以下代码的输出是什么？如何修正？

```js
var result = [];
for (var i = 0; i < 3; i++) {
  result[i] = function() {
    console.log(i);
  };
}
result[0](); result[1](); result[2]();
```

3, 3, 3

`var` 是函数作用域，循环完成后 `i=3`，闭包共享 `i` 导致错误。用 `let`，它是块级作用域，每轮循环创建新 `i`，正确绑定当前值



1. **闭包 = 函数 + 它能访问的变量**
2. **函数执行完了，但闭包仍然记住创建时的变量**
3. **可以用来模拟私有变量、保持状态、避免变量污染**
4. **`var` 的循环问题可以用闭包解决**

💡 **闭包本质：让变量活得比作用域长**！🎯



### **实现防抖（Debounce）**

考察点：高频输入优化、`setTimeout` 控制执行

实现 `debounce(func, delay)`，保证 `func` 只有在 **停止调用 `delay` 时间后** 才执行。

```js
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
```



生成有效括号

最长子数组和

手写虚拟 DOM

手写订阅发布模式

JSONP 的具体实现

lodash.get

数组扁平化

手写节流器

大数相加 

字符串匹配，大概是给一个str，再给一个exp，判断str能否被exp匹配（如"sss"可以被".*"匹配），应该是lc原题的感觉



手写异步并行控制

介绍js事件循环机制（微任务宏任务）

先同步，再异步（先微任务比如Promise.then，再宏任务比如setTimeout）



做题判断输出（还是考事件循环）

JSONP 的具体实现



手写虚拟dom的结构

document.querySelector用的什么算法？

除了深度优先，遍历一个树还有什么算法？

算法题：lodash.get

代码输出题，然后基于这道题问了基本类型和引用类型各自包含哪些以及区别

看代码说输出：this 指向问题

手撕：数组扁平化

手写节流器

无限滚动如何实现

回调地狱的解法



用数组模拟一个栈，每次获取栈内最小元素的时间复杂度为o(1) 

实现Promise.allSettled() 

并发限制Promise.all() 

2维数组斜45度输出 

设计通用输入搜索组件，能够以列表展示返回结果，主要就防抖与请求竞态处理 

实现订阅发布模式 

基于XHR封装fetch 

大数相加 

字符串匹配，大概是给一个str，再给一个exp，判断str能否被exp匹配（如"sss"可以被".*"匹配），应该是lc原题的感觉









axios有过拦截器吗

session 和 cookie

interface 和 type 的区别

对一个组件同时修改文字和背景，会不会出现其中一个修改成功，另一个修改失败被中断的情况

为什么 hooks 不能在条件分支和循环中使用

map 和对象的区别



fiber 架构



如何理解Web Component，如何学习的？

什么是服务端渲染

SSR，对比CSR有什么优缺点

第三方库在服务端渲染时还有哪些兼容性问题

在SSR中进行数据处理有什么不同吗？比如正则或者symbol

性能优化一般用什么样的方式去衡量？（只粗略地说了LCP，CLS，FID）

怎样去监控这些性能指标呢？（没深入了解过，说了lighthouse）

有用过浏览器的Performance吗？（没听过）

项目中会用一些什么样的手段进行性能优化呢？（聊了官网SEO优化）

为什么要做SEO优化，是基于什么问题呢？对性能有什么帮助呢？

预渲染的话预先渲染的是什么东西？

回到SSR的问题，你将项目从CSR转为SSR后，如何衡量这是一次性能优化而不是性能劣化呢？

在SSR的项目里面哪一个生命周期里面可以操作localStorage？

SSR的卡点，SSR怎么去判断哪些代码要去做polyfill

手写力扣原题旋转数组

迁移打包工具遇到了哪些问题，怎么解决的





用flex实现二栏布局

flex：1和width：100％区别，样式表现是什么？

响应式布局如何实现？有哪些相对单位？

用过CSS变量吗？了解多少？

CSS里面有什么选择器？优先级说一下

相邻节点如何选择？还有哪些操作符？



前端登录的整个过程，包括token、状态等

登录状态的校验是怎么实现的？

cookie的应用场景

想传cookie到后端如何实现

React与Vue的对比
React和Vue都会拆出很多相关依赖，好处

然后就是一些项目开发整个流程里，具体的一些配置和部署
Eslint是怎么检查出代码中不规范的地方
为什么使用虚拟dom
React和Vue的虚拟dom的不同
React为什么不用数据劫持
props实现的原理

手撕new
promise代码输出
手写节流器

无限滚动如何实现

回调地狱的解法

windows.onload()

css: 用flex写一个五子斜方向连线的场景

http和https的区别...



主要用哪些Git版本管理操作，对git Rebase了解多少？

undefined和null有什么区别，怎么检测它们？

对JS事件循环是如何理解的？

Flex布局和Grid布局有什么区别？

实现判断两个object是否相同，阐述一下思路（要求尝试用递归方法）？这里是深拷贝



跨域问题

http的请求头相关的标识和用途

虚拟DOM对比真实DOM有什么优势吗？

操作虚拟DOM更快呢还是操作真实DOM更快？（对于虚拟DOM的理解还是不够透彻，没理解其本质和意义，面试官表示需要再学习一下批量更新）

手写虚拟dom的结构

手写promise.all



### V8引擎

1. 解析：代码→Token→AST（注意词法分析和语法分析两步）
2. 解释执行：Ignition解释代码为字节码，并收集热点代码
3. 编译器：TurboFan将热点代码优化转为机器码，并且在热点代码类型转变的时候反优化，这时候还涉及到隐藏类和内联缓存这两个知识，隐藏类就是相同结构的对象可以通过偏移量共享同一个隐藏类，内联缓存可以理解为隐藏类的加速器。
4. 堆和内存：进行内存管理和垃圾回收，垃圾回收分为新生代和老生代，新生代通过from - to算法把存活一次以上的移动到老生代，老生代通过标记清除配合并行回收和增量回收提升性能。
5. 栈：栈负责函数的上下文和参数帧分配。

### JS异步

再讲JS的异步。简单一点的会考一些代码输出题，难一点的会让你讲原理，手写实现。比如Promise。Promise的手写是一定要会的，就算不会全部手写也一定要会写all, allSettled, any, race。再比如async await，它们是怎样让代码看起来像同步一样的？再比如setTimeout, setInterval。那就不得不提到JS的事件循环了，从Node.js 11+后Node.js的事件循环就向浏览器的事件循环对齐了，所以这里只讲浏览器的事件循环。分为微任务和宏任务，在script标签执行完以后，先执行微任务再执行宏任务。宏任务有script标签(JS整体代码)、setTimeout、setInterval、setImmediate、I/O、UI交互。微任务有Promise、process.nextTick(Node.js)、MutaionObserver。

### 闭包

还有闭包。闭包重要的是词法作用域，作用域链这两个概念，以及会牵扯到箭头函数，这个时候就引出了this指向代码输出题，进一步引出call, apply, bind，以及闭包的应用：函数柯里化，防抖节流。有趣的是腾讯云面试官复试时候问的最后一个问题就是假设我在跟产品经理介绍闭包，产品经理不懂任何技术。我说的答案是我买了一些牙刷，平常我自己知道这些牙刷我还想不想用，随时可以丢，但是有一个朋友来到我家里玩，用了一次牙刷后，我不确定我的朋友还会不会再来用牙刷，我就暂时会把牙刷留下来，直到朋友告诉我可以把牙刷丢了。现在想想如果我说的是家里的爸妈留着孩子的东西怕孩子回来还要用，可能会更感人哈哈。(可能两个故事对齐闭包都是错的，轻喷)

### ES

再就是ES的各个版本了。ES5的严格模式、数组的reduce, map, filter方法、Json.stringify和Json.parse两个方法。ES6比较重要的默认参数、模版字符串、箭头函数、Promise、模块化、解构赋值，块级作用域、symbol等等。后面的ES版本就用年份来记录了，比较重要的是ES2017的async await和ES2020的可选链和空值合并。

### TS

我也没用过，面试的时候都是说理解借鉴了Kotlin和Java，强类型，引入了枚举和接口等等，在底层编译还是会转为JS，主要是为了保证团队开发的代码结构以及规范性、严谨性。

重点写了打包就会聊Webpack和Vite。这个时候就回到说项目时候给的建议了，不懂的千万别写！

简单聊下Vite，Vite分为开发环境和生产环境。开发环境下使用esbuild预构建依赖 + 基于ESM的按需编译，而Webpack需打包整个Bundle。生产环境下Vite用Rollup打包，和Webpack一样支持Tree Shaking，但配置更简洁。这里的Tree Shaking稍微展开讲讲，是在运行过程中静态分析模块之间的导入导出，删除未被其他模块使用的导出值。

## **计算机网络**

计算机网络可以分七层网络模型或五层网络模型。就五层网络模型来讲，前端接触最多的肯定就是应用层和网络层。所以我们就只聊这两个的知识。

### 网络层

网络层就是TCP和UDP协议。首先要知道TCP和UDP的区别，一个面向连接注重可靠性，一个无连接注重性能。

#### TCP

就TCP的面向连接可靠性来切入，如何实现它的可靠性，是整个网络层最常考到的点。TCP的可靠性通过保证连接，保证包的顺序，保证不丢包这三个点来切入。第一个保证连接就是通过三次握手四次挥手实现，第二个保证包的顺序通过包体编号来实现，第三个不丢包通过重传机制来实现。理解了这个，WebSocket为什么要用TCP直接答因为其可靠性，HTTP3的QUIC如何实现UDP的可靠性的时候，照样从这TCP可靠性三个点切入就可以了。

#### UDP

主要是实现可靠性，看上一句话就行。

#### TCP粘包问题处理

三种方法，第一种特殊符号划分，比如1234%nsisdn%n通过%n划分，第二种固定长度发包，第三种包头存储包体长度。各自的局限性可以自己去深入了解一下。

### 应用层

应用层就是HTTP和HTTPS。

#### HTTP

主要有get、post、put、delete、options等。有时问到get和post区别，设计上来讲get要实现幂等性，post不提倡实现幂等性。options通常用于跨域请求作预检。重要的是HTTP1.0、1.1、2.0、3.0这四个版本，一定要讲清楚，讲出自己的理解。不知道有没有看过十日终焉的小伙伴，齐夏从燕知春那里学到可以通过记名词来轻松背下整个知识，背八股的时候很实用。比如HTTP1.0短连接，HTTP1.1长连接、缓存控制、断点重传，HTTP2.0头部压缩、二进制分帧、多路复用、服务器推送，HTTP3.0    QUIC解决多路复用。当你一个个去看完了这些名词对应的含义后，你通过背名词的方式就可以回忆整个知识了。

#### HTTPS

HTTPS和HTTP的区别可不是复数（bushi），HTTPS是HTTP经过SSL或TLS四次握手生产对称密钥进行加密通信，四次握手的过程可以去b站看下小白debug主页，短视频的方式，讲的很有趣且生动。

### 其他

#### 拥塞控制和流量控制

拥塞控制是对整个外部网络环境进行判断，避免发送到网络中的数据过多，通过四个算法：慢启动，拥塞避免，快恢复，快重传实现。流量控制是点对点，避免设备之间发送和接收能力不对等，通过滑动窗口来对齐设备之间的接收能力。

#### 常见的状态码

2开代表成功，3开代表重定向或者缓存控制，4开代表客户端错误，5开代表服务端错误，常见的是200、301、302、304、400、401、403、404、500。



## 浏览器

浏览器的知识主要分为渲染和缓存控制以及跨域处理：

### 渲染

渲染就是问的比较多的输入一个url到显示有什么流程。考这个的目的是针对整个浏览器渲染的流程可以做很多事，比如针对网络层面，HTTP做优化，针对渲染的重绘重排做优化等等。还需要注意的是DNS解析可以说的细一点，会提升一点好感度，比如经过根域名服务器、顶级域名服务器、权威域名服务器这三层DNS域名服务器，获取到IP地址。

### 缓存控制

缓存控制就是协商缓存和强缓存，请求头的优先级是cache-control>expires>If-none-match>if-since-modified，前两个请求头来自强缓存，后两个来自协商缓存，所以优先使用强缓存，强缓存失效使用协商缓存并且if-none-match对应响应头e-Tag，if-since-modified对应响应头last-modified，last-modified优先级较低的原因是时间作为标识的话容易对一些同时更新的缓存造成误判。而e-Tag作为唯一标识优先级自然就要高。总体流程就是访问强缓存，成功返回200状态码，缓存过期则协商缓存，协商缓存没过期则返回200状态码，过期了则返回新缓存并返回状态码304。

### 跨域

跨域一般就是后端配置就好了，get请求可以通过JSONP实现，当然也可以自己弄个服务器作转发，想理解的更深自己解决一下就知道了。







# 工作经历







# 后端

## **1️⃣ Express.js (Node.js)**

### **📌 开发流程**

1. **初始化 Express 项目**（创建服务器、配置中间件）。
2. 选择数据库 ORM
   - **Mongoose**（适用于 MongoDB）：Schema-based，文档型数据库，直接操作 JSON 数据。
   - **Prisma**（适用于 MySQL/PostgreSQL/MongoDB）：类型安全的 ORM，更现代化，支持数据库迁移（类似 Django）。
3. 连接数据库
   - Mongoose 直接在应用中连接 MongoDB 并定义 Schema。
   - Prisma 需要先定义 Schema，然后运行 `migrate` 创建数据库表。
4. **创建路由和控制器**，处理 CRUD 请求（`GET`、`POST`、`PUT`、`DELETE`）。
5. 通过 Model 进行数据库操作
   - Mongoose 通过 `.save()` / `.find()` 方法查询和修改数据。
   - Prisma 通过 `prisma.user.findMany()` 进行查询，基于 SQL 语法操作数据库。

### **Mongoose vs Prisma**

| **对比项**      | **Mongoose (MongoDB)**       | **Prisma (SQL/MongoDB)**              |
| --------------- | ---------------------------- | ------------------------------------- |
| **数据库类型**  | 适用于 NoSQL (MongoDB)       | 适用于 SQL & MongoDB                  |
| **Schema 方式** | Schema-based                 | 强类型 Schema                         |
| **查询方式**    | 类似 MongoDB 语法 (`find()`) | 更贴近 SQL (`prisma.user.findMany()`) |
| **数据库迁移**  | 直接修改 Schema              | `prisma migrate` 生成迁移文件         |
| **适用场景**    | 适合 JSON 数据存储           | 适合结构化数据                        |

## **2️⃣ Spring Boot (Java)**

### **📌 开发流程**

1. **创建 Spring Boot 项目**，配置 `application.properties` 连接数据库。
2. 使用 Spring Data JPA 进行数据库操作
   - JPA 是 Java 的 ORM 规范，Spring Boot 默认用 Hibernate 实现。
3. **定义 `Entity`（数据库模型）**，用 `@Entity` 标注。
4. 创建 `Repository` 访问数据库
   - Spring Data JPA 提供 `JpaRepository`，自动实现 `findAll()`、`save()` 等操作。
5. **创建 `Service` 层** 处理业务逻辑，调用 `Repository`。
6. **在 `Controller` 层暴露 REST API**，处理 HTTP 请求。
7. **使用 DTO（数据传输对象）** 在 `Controller` 和 `Service` 之间传递数据。

### **📌 DTO 在 Spring Boot 中的作用**

- DTO（Data Transfer Object）

   主要用于：

  - 防止直接暴露数据库 `Entity`（安全性）。
  - 进行数据格式转换（例如 `UserDTO` 只返回 `id` 和 `name`，不返回 `password`）。
  - 降低 `Controller` 层和 `Service` 层的耦合度。

### **📌 DTO 机制**

- 转换位置

  ：通常在 

  Service 层

   进行 

  ```
  Entity → DTO
  ```

   转换：

  - `Controller` 只负责接收 `DTO`，然后调用 `Service` 进行处理。
  - `Service` 处理完业务逻辑后，将 `Entity` 转换为 `DTO` 再返回。

- 转换方式

  - 手动转换（使用构造函数）。
  - 使用 **MapStruct** 自动转换（更高效）。

✅ **Spring Boot 采用分层架构，DTO 主要用于 `Controller → Service` 之间的数据传输，避免直接暴露数据库模型。**

------

## **3️⃣ Django (Python)**

### **📌 开发流程**

1. **创建 Django 项目**，配置 `settings.py` 连接数据库（支持 MySQL/PostgreSQL/SQLite）。
2. 使用 Django ORM 定义 `Model`（数据库表）
   - Django ORM 直接映射数据库表，不需要手写 SQL。
3. **运行 `migrate` 命令，创建数据库表**（类似 Prisma）。
4. 创建 `View` 处理 HTTP 请求
   - Django **基于 MTV 结构**（Model-Template-View），View 负责接收请求、调用 Model 处理数据、返回 Response。
5. 创建 `Serializer`（序列化器）
   - Django REST Framework (DRF) 需要 `Serializer` 进行 `Model → JSON` 转换。
6. **使用 `ViewSet` + `Router` 自动生成 REST API**，支持 CRUD 操作。

### **📌 Django ORM 迁移**

- Django 通过 

  ```
  migrate
  ```

   自动生成数据库表：

  - 定义 `Model` 后，运行 `python manage.py makemigrations`。
  - 运行 `python manage.py migrate` 执行迁移，创建数据库表。

✅ **Django 的 `migrate` 过程和 Prisma 类似，定义 Schema 后自动生成数据库结构，而 Spring Boot 依赖 Hibernate 自动管理表结构。**

------

## **4️⃣ Express vs Spring Boot vs Django 对比**

| **对比项**     | **Express (Node.js)**      | **Spring Boot (Java)**               | **Django (Python)**         |
| -------------- | -------------------------- | ------------------------------------ | --------------------------- |
| **适用数据库** | MongoDB, MySQL, PostgreSQL | MySQL, PostgreSQL                    | MySQL, PostgreSQL, SQLite   |
| **ORM 方式**   | Mongoose / Prisma          | Hibernate (JPA)                      | Django ORM                  |
| **数据库迁移** | Mongoose：手动变更         | Hibernate 自动更新                   | `migrate` 自动创建          |
| **分层架构**   | 灵活                       | MVC（Controller-Service-Repository） | MTV（Model-Template-View）  |
| **DTO 使用**   | ❌ 通常不使用               | ✅ `Service` 层转换 `Entity → DTO`    | ✅ `Serializer` 处理数据转换 |
| **适用场景**   | 轻量级 API，快速开发       | 大型企业级应用，强业务逻辑           | 快速开发数据驱动应用        |
| **开发成本**   | 低（JavaScript 简单）      | 高（Java 学习成本高）                | 适中（Python 易学）         |
| **性能**       | 高（异步处理）             | 高（强大生态）                       | 适中（Django 自带封装）     |

------

## **5️⃣ 哪种技术适合什么场景？**

| **场景**                                        | **推荐技术**                 | **理由**                                             |
| ----------------------------------------------- | ---------------------------- | ---------------------------------------------------- |
| **实时应用（WebSocket, Chat, Live Streaming）** | **Express + MongoDB**        | Express + Node.js **异步处理能力强**，适合高并发应用 |
| **企业级应用（金融、电商、ERP）**               | **Spring Boot + PostgreSQL** | Spring Boot **分层架构清晰，性能高，支持事务**       |
| **数据驱动应用（CMS、博客、新闻）**             | **Django + PostgreSQL**      | Django ORM **简单易用，适合后台管理系统**            |
| **需要 SQL 数据查询优化**                       | **Prisma / Hibernate**       | Prisma **类型安全**，Hibernate **支持复杂关系映射**  |
| **快速开发 MVP**                                | **Express / Django**         | 适合小型项目，Django **自带 Admin，开发快**          |



# 前端面试题

# React

## **1.What is React?** (SPA, SSR)

An **open-source front-end JavaScript library** developed by **Facebook**. It facilitates building **reusable UI components** for complex and interactive web and mobile interfaces. **SPA**



**React 本身默认不支持 SSR**，但可以使用 **Next.js 实现 SSR/SSG**。

**React Router 仍然属于 SPA 解决方案**，因为它不会让浏览器请求新的 HTML 页面。

**React 只有在服务器端渲染或多 HTML 页面结构时，不再是严格的 SPA**。

**Next.js 是一个更强大的解决方案，适用于 SEO 友好和更快加载的需求**。



## **2.What are the main features of React?**

The major features of React are:

- Uses **JSX** syntax, a syntax extension of JS that allows developers to write HTML in their JS code.
- It uses **Virtual DOM** instead of Real DOM considering that Real DOM manipulations are expensive.
- Supports **server-side rendering** which is useful for Search Engine Optimizations(SEO).
- Follows **Unidirectional or one-way** data flow or data binding.
- Uses **reusable/composable** UI components to develop the view.



## 3.What is the difference between DOM and Virtual DOM?

Virtual DOM is an in-memory representation of real DOM. When there are some updates, react calculates differences and updating only the necessary parts of the actual DOM.



**Virtual DOM（虚拟 DOM）** 是 React 用来优化页面更新的技术。它的核心思想是：

1️⃣ **创建副本**：React 在内存中创建一个 **虚拟的 DOM 结构**，就像是现实 DOM 的影子。
2️⃣ **找不同**：当状态（state）或数据（props）发生变化时，React 会比较 **新的 Virtual DOM 和 旧的 Virtual DOM**，找出变化的地方。
3️⃣ **最小更新**：React 只修改 **真正变了的部分**，不会重新渲染整个页面，从而提升性能。

**🔍 举个例子：**

- **传统 DOM**：像修改 Word 文档，每次都重新保存整个文件。
- **Virtual DOM**：像修改 Google Docs 里的文字，只改动必要的部分，其他地方不变。



## 4.What are props and state?

State is an **object** that **holds dynamic data** specific to a **component**. Unlike props, state is mutable(可变) and managed within the component, allowing for interactive and dynamic user interfaces.  **useState hook** onClick to trigger setState and re-render the component.

React 采用 **单向数据流（Unidirectional Data Flow）**，即数据的流动方向始终是 **自上而下**：

- **父组件 → 子组件**：通过 `props` 传递数据，子组件**不能修改 props**。
- **组件内部**：使用 `state` 维护自己的数据。
- **子组件 → 父组件**：不能直接修改父组件的 `state`，需要**回调函数**（callback）。

**在 JSX 中，`{}` 叫**：**Curly Braces**（大括号）

`{}`**可以表示**：

- **对象（Object）**：如 `{ name: "Percy", age: 25 }`
- **解构赋值（Destructuring）**：如 `const { name } = person;`
- **JSX 表达式（JSX Expression）**：如 `<h1>{title}</h1>`

父组件 → 子组件

```jsx
function Child({ message }) { // 通过 props 读取数据
    return <h2>{message}</h2>;
}

function Parent() {
    return <Child message="Hello from Parent" />; // 通过 props 传递
}
```

子组件 → 父组件  callback function

```jsx
function Child({ updateMessage }) {
    return <button onClick={() => updateMessage("Updated from Child")}>Click Me</button>;
}

function Parent() {
    const [message, setMessage] = useState("Initial Message");

    return (
        <div>
            <h2>{message}</h2>
            <Child updateMessage={setMessage} /> {/* 传递更新方法 */}
        </div>
    );
}
```



## 5.What are the advantages of JSX?

JSX stands for JavaScript XML. It's a syntax extension for JavaScript that **allows writing HTML-like code within JavaScript files**, making the code **more readable** and **easier to write**.



## 6.Can browser read a JSX File? What is Babel?

No, browsers cannot directly read JSX because it is not standard JavaScript. JSX needs to be **transpiled** by Babel **into JavaScript** before execution. **Babel is a JavaScript compiler** that converts JSX into React’s `createElement()` function calls.



**浏览器不能直接读取 JSX**，因为 JSX 不是标准的 JavaScript，而是 React 提供的语法扩展。

**Babel 是一个 JavaScript 编译器**，它能将 JSX **转换为标准的 JavaScript**，使浏览器可以理解。

```jsx
const element = <h1>Hello, World!</h1>;
```

Babel =>

```js
const element = React.createElement("h1", null, "Hello, World!");
```



## 7.How do you iterate over a list in JSX? 

JSX uses the `map()` method to iterate over lists and render multiple components. The `map()` method applies a function to each array element and returns a new array. When rendering lists, React requires **a unique `key` prop** for each element to optimize re-rendering.





## 8.What are spread operator?

The spread operator (`...`) is used in JavaScript and JSX to **copy, merge, or pass properties** efficiently. It allows objects or arrays to be expanded into individual elements. In React, it is commonly used for passing props dynamically to components.

The spread operator is like decoding the copied object and merge it into a new one.

扩展运算符（Spread Operator）... 这三个点用于展开数组、对象或函数参数



## 9.What are the types conditional rendering in JSX?

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

```jsx
{notifications.length > 0 && <p>You have notifications!</p>}
```

Ternary operator && if-else, switch-case



## 10.What are React Components?

React components are **reusable, independent UI building blocks** that define structure, logic, and styles.
They are of two types:

- **Functional Components**: Simple functions returning JSX.
- **Class Components**: Extend `React.Component` and include state and lifecycle methods.

Functional components are preferred in modern React due to hooks and better performance.



## 11.What are higher-order components (HOCs) in React?

HOCs are functions that **take a component and return a new component** with added functionality. Example:

```jsx
function withLogger(WrappedComponent) {
    return function(props) {
        console.log("Rendering", WrappedComponent.name);
        return <WrappedComponent {...props} />;
    };
}
```



## 12.What are the advantages and disadvantages of React?

✅ **Advantages of React:**

1. **Component-Based Architecture** – Encourages reusability and maintainability.
2. **Virtual DOM Optimization** – Improves rendering performance by minimizing real DOM updates.
3. **Unidirectional Data Flow** – Ensures predictable state management.
4. **Strong Ecosystem** – Includes Redux, React Router, and Next.js for various use cases.
5. **React Hooks** – Enhances functional components with state and side-effects.
6. **Supports Server-Side Rendering (SSR)** – Improves SEO and initial page load speed.
7. **Cross-Platform Development** – React Native enables mobile app development with shared logic.

❌ **Disadvantages of React:**

1. **Steep Learning Curve** – Requires understanding JSX, Hooks, Redux, and Context API.
2. **Focuses Only on UI** – Needs additional libraries for state management and routing.
3. **Frequent Updates** – New features and API changes can make maintenance difficult.
4. **SEO Challenges** – Requires Next.js or pre-rendering for better SEO.
5. **JSX Can Be Confusing** – Mixing HTML with JavaScript may be difficult for beginners.



#### **✅ React 的优点**

1️⃣ **组件化（Component-Based）**：React 采用组件化开发，提高代码的可复用性和可维护性。
2️⃣ **虚拟 DOM（Virtual DOM）优化性能**：减少真实 DOM 操作，提高渲染效率。
3️⃣ **单向数据流（Unidirectional Data Flow）**：数据从父组件流向子组件，有助于管理状态，减少 bug。
4️⃣ **强大的生态系统**：拥有 Redux、React Router、Next.js 等工具，适用于各种应用场景。
5️⃣ **React Hooks**：提供 `useState`、`useEffect` 等钩子，使函数组件可以管理状态和副作用，提高开发效率。
6️⃣ **支持 SSR（服务器端渲染）**：通过 **Next.js** 可以实现 SEO 友好的 SSR，提高页面加载速度。
7️⃣ **跨平台（React Native）**：可以用相同的代码逻辑开发移动端应用，节省开发成本。

#### **❌ React 的缺点**

1️⃣ **学习曲线陡峭**：需要掌握 JSX、Hooks、Redux、Context API 等概念，新手上手有一定难度。
2️⃣ **只关注 UI**：不像 Angular 是完整的框架，React 只负责视图层，需要额外使用 Redux、MobX 等工具管理状态。
3️⃣ **频繁更新**：React 生态发展快，API 变化频繁，可能导致旧项目难以维护。
4️⃣ **SEO 需要额外优化**：React 本身是 SPA，SEO 不太友好，需要 SSR（如 Next.js）来优化。
5️⃣ **JSX 可能让初学者困惑**：不像 HTML 结构清晰，JSX 将 HTML 和 JavaScript 结合，可能会让前端开发者感到不适应。



## 13.What is the difference between React, Angular and Vue?

**Key Differences Between React, Angular, and Vue:**

| **Feature**        | **React** (Library)                | **Angular** (Framework)              | **Vue.js** (Progressive)                     |
| ------------------ | ---------------------------------- | ------------------------------------ | -------------------------------------------- |
| **Developed by**   | Facebook                           | Google                               | Evan You (Independent)                       |
| **Type**           | UI Library (View Layer)            | Full MVC Framework                   | Progressive Framework                        |
| **Core Concepts**  | Components, Hooks, Virtual DOM     | Modules, Two-Way Binding, DI         | Components, Directives, Two-Way Binding      |
| **Data Flow**      | **Unidirectional**                 | **Two-Way Binding**                  | **Two-Way by default**                       |
| **Performance**    | Virtual DOM (Efficient)            | Real DOM (Slower)                    | Virtual DOM (Fast)                           |
| **Learning Curve** | **Medium** (JSX + Hooks)           | **High** (TypeScript + Complex)      | **Easy** (HTML + Vue Syntax)                 |
| **Ecosystem**      | Redux, Next.js, React Router       | Built-in tools (Complete)            | Vuex, Vue Router                             |
| **Best for**       | **Large web apps, cross-platform** | **Enterprise apps, complex systems** | **Small/medium projects, quick development** |

🚀 **Summary:**

- **React** is flexible and ideal for large-scale applications.
- **Angular** is a full-featured framework, suitable for enterprise applications.
- **Vue** is easy to learn and great for smaller projects with fast development needs.



## 14.Lifecycle of React

React components go through **three lifecycle phases**: **Mounting, Updating, and Unmounting**.

1️⃣ **Mounting (When the component is created and inserted into the DOM)**

- `constructor()`: Initializes state.
- `render()`: Returns JSX.
- `componentDidMount()`: Used for API calls and event listeners.

2️⃣ **Updating (When state or props change)**

- `shouldComponentUpdate()`: Controls re-rendering.
- `render()`: Re-renders UI.
- `componentDidUpdate()`: Used for side effects like fetching data.

3️⃣ **Unmounting (When the component is removed from the DOM)**

- `componentWillUnmount()`: Cleans up event listeners, timers, etc.



## **15.What is the significance of keys in React lists?**

Keys help React identify which items have changed, been added, or removed. They improve performance by enabling efficient re-rendering of lists. Keys should be unique and stable, such as using item IDs.



## 16.**What is the Context API in React?**

The Context API allows data sharing between components without **prop drilling**. It provides a **global state**:

```jsx
const ThemeContext = React.createContext();
<ThemeContext.Provider value="dark">
    <Component />
</ThemeContext.Provider>
```

It is useful for sharing **themes, user authentication, and language preferences** across deeply nested components.



## 17.How to setup react project?

```
npm create-react-app
```

Slower build times, not optimized for production.

```
npm create vite@latest
```

**Faster Hot Module Replacement (HMR).**

**Optimized for modern ESModules.**

```
npx create-next-app@latest 
```

Supports **SSR, SSG, and API routes**.

Better **performance and SEO**.

```
Manual setup (For advanced users)
```

Install Webpack, Babel, and configure `webpack.config.js`



## 18.CommonJS vs ESModule

**CommonJS (CJS)** is the default module system in Node.js. It uses `require()` and `module.exports`.

**ESModule (ESM)** is the modern JavaScript standard, using `import` and `export`. It is used in **both browsers and modern Node.js projects**.



✅ **CommonJS vs ESModule 对比**

| **对比项**       | **CommonJS (CJS)** | **ESModule (ESM)** |
| ---------------- | ------------------ | ------------------ |
| **使用环境**     | Node.js            | Node.js & 浏览器   |
| **引入方式**     | `require()`        | `import`           |
| **导出方式**     | `module.exports`   | `export`           |
| **是否支持异步** | ❌ 仅同步加载       | ✅ 支持异步加载     |

📌 **什么时候用 ESM？**

- **前端 React/Next.js/Vite 项目**
- **现代 Node.js 项目（Node 14+ 支持 `import`）**

📌 **什么时候用 CJS？**

- **老的 Node.js 项目**
- **npm 库默认使用 CJS**



## 19.What is npm? What is the role of node_modules folder?

npm (Node Package Manager) is the default package manager for Node.js. It helps install, update, and manage JavaScript dependencies.

**What is the role of the `node_modules` folder?**

- Stores all installed dependencies and their sub-dependencies.
- Essential for running the project, but can be deleted and restored using `npm install`.



## 20.How React App load and display the components in browser?

1️⃣ **HTML loads JavaScript**

- The `index.html` file contains `<div id="root"></div>`, where React renders components.

2️⃣ **React renders components**

- `index.js` mounts `<App />` inside `#root`.
- `App.js` renders child components.

3️⃣ **Virtual DOM updates efficiently**

- React compares the new Virtual DOM with the previous one and updates only the necessary parts.



**加载过程总结**

1. `index.html` 加载 JavaScript 代码。
2. `index.js` 挂载 React 组件到 `#root`。
3. `App.js` 组件渲染并调用子组件。
4. **当 `state` 或 `props` 变化时，React 更新 Virtual DOM 并同步真实 DOM。**



## 21.What is fragment in React?

**What are fragments in React?**
Fragments let you group elements without adding extra nodes to the DOM:

```jsx
<>
    <h1>Title</h1>
    <p>Description</p>
</>
```



## 22.Prettier and ESLint

✅ **What is Prettier?** Prettier is an **automatic code formatter** that ensures consistent code style. It does not check for syntax errors, only formatting.

✅ **What is ESLint?** ESLint is a **linting tool** that checks for syntax errors and enforces coding standards. It helps maintain code quality and can be configured with rules.

📌 **Key Differences:**

- **Prettier** focuses on formatting.
- **ESLint** detects errors and enforces rules.

🚀 **They can be used together for best coding practices.**



✅ **Prettier（代码格式化工具）**

- **自动格式化代码**，确保风格统一（比如 2/4 空格、单双引号）。
- **不检查语法错误，只管代码风格**。
- 适用于 **React、Vue、Node.js** 等各种项目。

✅ **ESLint（代码规范检查工具）**

- **检查 JavaScript 代码中的错误**（如未定义变量）。
- **支持代码风格规则（如 Airbnb、Standard 规则）**。
- **可以和 Prettier 结合使用**，确保格式和语法规范。



## **23.What is React Router, and why is it used?**

React Router enables navigation in React apps without full-page reloads:

```jsx
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
</BrowserRouter>
```



## 24.**How do you optimize performance in a React application?**

- Use **React.memo** to prevent unnecessary renders.
- Optimize expensive calculations with `useMemo()`.
- Use `useCallback()` to memoize functions.
- Implement **lazy loading** for components.



**1️⃣ 使用 `React.memo` 避免不必要的重新渲染**

**📌 解释**

默认情况下，React 组件在 **父组件更新** 时，子组件 **也会重新渲染**，即使 `props` 没有变化。
✅ **`React.memo` 让组件只在 `props` 发生变化时才重新渲染**，从而提高性能。

```jsx
import React, { useState, memo } from "react";

// 普通组件（不使用 memo）
const NormalComponent = ({ count }) => {
    console.log("NormalComponent rendered");
    return <h2>Count: {count}</h2>;
};

// 使用 React.memo 进行优化
const MemoizedComponent = memo(({ count }) => {
    console.log("MemoizedComponent rendered");
    return <h2>Count: {count}</h2>;
});

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increase Count</button>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something" />

            <NormalComponent count={count} />
            <MemoizedComponent count={count} />
        </div>
    );
}

export default App;
```

每次输入框 `onChange` 触发，`NormalComponent` 和 `MemoizedComponent` **都会重新渲染**。

`React.memo` 优化了 `MemoizedComponent`，如果 `count` 没变，组件 **不会重新渲染**，提高性能。



**2️⃣ 使用 `useMemo()` 进行计算优化**

**📌 解释**

`useMemo()` **缓存计算结果**，防止每次组件渲染时重复执行 **耗时的计算**。

```jsx
import React, { useState, useMemo } from "react";

// 模拟一个计算密集型函数
const expensiveCalculation = (num) => {
    console.log("Calculating...");
    return num * 2;
};

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    // 只有 count 变化时，expensiveCalculation 才会执行
    const calculatedValue = useMemo(() => expensiveCalculation(count), [count]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increase Count</button>
            <p>Calculated Value: {calculatedValue}</p>

            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something" />
        </div>
    );
}

export default App;
```

**不使用 `useMemo()`**，每次 `text` 发生变化，`expensiveCalculation(count)` 都会重新执行（浪费计算资源）。

**使用 `useMemo()`**，只有 `count` 变化时，才重新计算，提高性能。



**3️⃣ 使用 `useCallback()` 记忆化函数**

**📌 解释**

- 在 React 组件中，**每次重新渲染都会创建新的函数实例**。
- 如果函数被 **传递给子组件**，子组件会误以为 `props` 发生了变化，导致不必要的渲染。
- `useCallback()` **缓存函数**，确保在依赖项不变时，函数不会重新创建。

```jsx
import React, { useState, useCallback } from "react";

// 子组件
const ChildComponent = ({ onClick }) => {
    console.log("ChildComponent rendered");
    return <button onClick={onClick}>Click me</button>;
};

function App() {
    const [count, setCount] = useState(0);

    // 普通函数，每次组件更新都会创建新函数
    const normalFunction = () => {
        console.log("Button clicked");
    };

    // 使用 useCallback，确保函数地址不变
    const memoizedFunction = useCallback(() => {
        console.log("Button clicked");
    }, []);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increase Count</button>
            <ChildComponent onClick={normalFunction} /> {/* 总是重新渲染 */}
            <ChildComponent onClick={memoizedFunction} /> {/* 只有依赖变化时才渲染 */}
        </div>
    );
}

export default App;
```

**不使用 `useCallback()`**，每次 `App` 组件重新渲染，`ChildComponent` **都会重新渲染**（因为 `onClick` 是新函数）。

**使用 `useCallback()`**，`ChildComponent` **不会重新渲染**，提高性能。



4️⃣ 使用 `React.lazy()` 进行懒加载

**📌 解释**

- **默认情况下，React 会一次性加载所有组件**，导致**首屏加载时间变长**。
- **`React.lazy()` 实现按需加载组件**，**仅在需要时才加载**。

```jsx
import React, { Suspense, lazy } from "react";

// 使用 React.lazy() 进行懒加载
const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
    return (
        <div>
            <h1>Welcome</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <LazyComponent />
            </Suspense>
        </div>
    );
}

export default App;
```

运行应用后，`LazyComponent.js` **不会立即加载**。

只有当 `LazyComponent` 需要渲染时，才会 **动态加载**，减少首屏加载时间，提高性能。



## 25.What is the difference between `memo` and `useMemo`?

- `memo` **prevents unnecessary re-renders** by caching a component when props don’t change.
- `useMemo` **caches expensive computations** to avoid recalculating values on every render.



虽然 **`memo` 和 `useMemo` 都是 React 的性能优化工具**，但它们的用途不同：

| **对比项**   | **`memo`**                                          | **`useMemo`**                          |
| ------------ | --------------------------------------------------- | -------------------------------------- |
| **作用**     | **缓存组件**，防止组件因**相同 `props`** 而重新渲染 | **缓存计算结果**，防止**重复执行计算** |
| **适用于**   | **子组件优化**（如果 `props` 没变，则不重新渲染）   | **计算优化**（如列表过滤、复杂计算）   |
| **触发更新** | 只有当 `props` 发生变化时                           | 只有当 **依赖项** 变化时               |
| **返回值**   | **返回一个优化后的组件**                            | **返回计算后的值**                     |

✅ **Is `useCallback([])` only executed once?**
Yes. When `useCallback` has an empty dependency array `[]`, it **only creates the function once during the initial render** and never re-creates it unless the component unmounts.

✅ **How is `useCallback` similar to `useMemo`?**
Both **cache values based on dependencies**, but:

- `useCallback` **caches functions** to prevent unnecessary re-renders.
- `useMemo` **caches computed values** to avoid redundant calculations.

✅ **When to use them?**

- Use **`useCallback`** when passing functions to memoized child components.
- Use **`useMemo`** when performing expensive computations.



✅ **Does `memo`, `useMemo`, and `useCallback` cache the component, function return value, and function itself?**
Yes! Each of them optimizes performance differently:

- **`memo` caches the component**, preventing unnecessary re-renders when **props** don’t change.
- **`useMemo` caches the return value of an expensive computation**, avoiding **redundant calculations**.
- **`useCallback` caches the function itself**, ensuring that its reference remains the same unless dependencies change.

📌 **Key Use Cases:**

- Use **`memo`** when a **child component should not re-render** unless props change.
- Use **`useMemo`** when **an expensive computation needs to be optimized**.
- Use **`useCallback`** when **passing functions to memoized components** to prevent re-renders.





## 26.**When does a React component re-render?**

1️⃣ **When `state` changes**
2️⃣ **When `props` change**
3️⃣ **When the parent component re-renders**
4️⃣ **When `useContext()` dependencies update**
5️⃣ **When forced manually using state updates**



**React 组件什么时候会重新渲染？**

**✅ 组件重新渲染的情况**

1️⃣ **`state` 变化**

- `useState()` 更新数据后，React **重新渲染组件**。

```jsx
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Increase</button> 
```

📌 **每次 `setCount(count + 1)`，组件都会重新渲染**。

2️⃣ **`props` 变化**

- 父组件传递 `props` 发生变化，子组件会重新渲染。

```jsx
<ChildComponent value={count} /> 
```

📌 **如果 `count` 变化，`ChildComponent` 也会重新渲染**。

3️⃣ **父组件重新渲染**

- **即使 `props` 没变**，但如果父组件重新渲染，子组件默认也会重新渲染。

```jsx
const Parent = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <ChildComponent />  {/* 每次 Parent 重新渲染，Child 也会渲染 */}
        </div>
    );
};
```

📌 **用 `memo()` 避免不必要的子组件渲染**。

4️⃣ **`useContext()` 依赖的值发生变化**

```jsx
const ThemeContext = createContext("light");
const theme = useContext(ThemeContext);
```

📌 **如果 `ThemeContext.Provider` 提供的值变化，所有 `useContext(ThemeContext)` 的组件都会重新渲染**。





## 27.**What is Code Splitting in React?**

Code Splitting is a technique in React that **reduces the initial bundle size by loading JavaScript only when needed**. This helps improve performance by splitting large JavaScript files into smaller, on-demand chunks.

✅ **How do you implement Code Splitting in React?**

**Component-Level Splitting** using `React.lazy()` + `Suspense`:

```jsx
const MyComponent = lazy(() => import("./MyComponent"));
<Suspense fallback={<p>Loading...</p>}>
    <MyComponent />
</Suspense>
```

**Route-Level Splitting** using `React Router`:

```jsx
const Home = lazy(() => import("./Home"));
<Routes>
    <Route path="/" element={<Home />} />
</Routes>
```

**Dynamic Import on Button Click**:

```jsx
const HeavyComponent = lazy(() => import("./HeavyComponent"));
<button onClick={() => setShow(true)}>Load</button>
{show && <HeavyComponent />}
```

🚀 **Code Splitting optimizes performance, reduces load time, and improves user experience.**



## 28.**How do you handle forms in React?**

Forms in React are controlled components where state manages input values:

```jsx
const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />
```



## 29.**How does server-side rendering (SSR) work in React?**

✅ **How does Server-Side Rendering (SSR) work in React?**
Server-Side Rendering (SSR) renders React components **on the server** and sends the fully generated HTML to the browser. This improves **SEO and performance** by reducing the amount of JavaScript that needs to be executed on the client.

✅ **Why does Next.js improve SEO and performance?**
1️⃣ **Better SEO**:

- Traditional Client-Side Rendering (CSR) loads an empty HTML page and renders content with JavaScript, which search engines may not index properly.
- **Next.js SSR sends a fully rendered HTML page** to the client, allowing search engines to read content immediately.

2️⃣ **Faster Performance**:

- In CSR, the browser **downloads and executes all JavaScript** before rendering the page.
- **Next.js SSR reduces time-to-first-render by sending HTML directly**, making the page visible immediately.



**Next.js 如何优化 SEO 和性能？**

**✅ 1. SEO（搜索引擎优化）**

**问题：CSR（客户端渲染）对 SEO 不友好**

- 在传统的 CSR（如 

  ```
  create-react-app
  ```

  ）中，React 应用的 HTML 结构在首次加载时是：

  ```html
  <div id="root"></div>
  <script src="/bundle.js"></script>
  ```

- 由于**内容是通过 JavaScript 动态渲染的**，**搜索引擎爬虫**可能无法正确抓取页面内容，导致 SEO 较差。

**Next.js 解决方案**

- 使用 SSR，服务器端返回完整的 HTML

  ，爬虫可以直接读取完整的页面内容，提高 SEO 评分：

  ```html
  <div id="root">
    <h1>Welcome to My Website</h1>
    <p>This is an article about React.</p>
  </div>
  ```

✅ **`getServerSideProps()` 在服务器端执行，返回 HTML 给搜索引擎，提升 SEO！**



**✅ 2. 性能优化**

**问题：CSR 需要下载大量 JS 才能渲染页面**

- 传统 CSR 需要：
  - 下载 JavaScript → 执行 JavaScript (受用户设备性能影响)  → 生成 HTML → 插入 DOM
  - **加载时间长，首屏渲染慢**

**Next.js 解决方案**

- **SSR 直接返回 HTML**，首屏加载更快。
- **Code Splitting**（代码拆分）优化性能，仅加载访问的页面代码。
- **Automatic Static Optimization**（自动静态优化），如果 `getServerSideProps` 不存在，Next.js 自动生成静态 HTML，提高速度。

✅ **`getStaticProps()` 在构建时运行，生成静态 HTML，进一步提高加载速度！**



## 30.What are Hooks in React?

Hooks **are functions that allow functional components to use state and lifecycle features** without writing class components. Introduced in **React 16.8**, Hooks provide a more concise and reusable way to manage component logic.

**1. Why were Hooks introduced?**

Before Hooks, React used **class components** for managing state and lifecycle methods. However, class components had some issues:

- **Complexity**: Managing state and lifecycle in classes made code harder to read and maintain.
- **Reusability**: Sharing logic between components required **higher-order components (HOC)** or **render props**, which led to unnecessary nesting.
- **Performance**: Class components could cause unnecessary re-renders due to improper binding.

✅ **Hooks solve these problems** by allowing functional components to use state and lifecycle features, making React development easier and more efficient.



**2. Commonly Used Hooks**

React provides several built-in hooks, categorized into **state hooks, effect hooks, performance hooks, and context hooks**.

| **Hook**      | **Purpose**                                       |
| ------------- | ------------------------------------------------- |
| `useState`    | Manage component state                            |
| `useEffect`   | Handle side effects (API calls, subscriptions)    |
| `useContext`  | Access context values without prop drilling       |
| `useReducer`  | Manage complex state logic                        |
| `useCallback` | Cache functions to prevent unnecessary re-renders |
| `useMemo`     | Cache computed values to optimize performance     |

✅ **Does Redux replace `useContext` and `useReducer`?**
Yes, in large-scale applications, **Redux replaces `useContext` and `useReducer`** for global state management. Redux provides:

- **Better state structure** with multiple slices.
- **More efficient updates** using `useSelector()`.
- **Asynchronous support** (Redux Thunk/Saga).
- **Built-in debugging with Redux DevTools**.

🚀 **For small apps, `useContext` and `useReducer` are enough. For large apps, Redux is the better choice!**



useReducer is just like the reducer in redux

```jsx
import React, { useReducer } from "react";

// 1️⃣ 定义 reducer 函数
function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        </div>
    );
}

export default Counter;
```

适用于 **局部复杂状态管理**，但**不适合全局状态**。

**适用于管理多个 `state` 之间有逻辑关系的情况**（如表单、多状态交互）。





## 31.LocalStorage, sessionStorage, Cookie

**All store data in the browser**, but they differ in **scope, size, and behavior**.

### **When to use each?**

| **Use Case**                                  | **Best Storage Option** |
| --------------------------------------------- | ----------------------- |
| **Saving user preferences (theme, language)** | `localStorage`          |
| **Storing temporary form/cart data**          | `sessionStorage`        |
| **Authentication tokens (JWT, session data)** | `HttpOnly Cookie`       |

🚀 **For security-sensitive data, always use `HttpOnly` Cookies instead of `localStorage`!**



| **特性**           | **LocalStorage**                         | **SessionStorage**                     | **Cookie**                               |
| ------------------ | ---------------------------------------- | -------------------------------------- | ---------------------------------------- |
| **生命周期**       | **永久存储**（除非手动删除）             | **当前会话**（页面关闭后清除）         | **默认会话级别，可设置 `expires`**       |
| **存储大小**       | ~5MB                                     | ~5MB                                   | **~4KB（受限制）**                       |
| **是否随请求发送** | ❌ 否                                     | ❌ 否                                   | ✅ **自动随 HTTP 请求发送**               |
| **适用场景**       | **长期存储用户数据**（如主题、偏好设置） | **短期存储数据**（如表单数据、购物车） | **会话管理（如 JWT Token、认证信息）**   |
| **访问方式**       | `localStorage.getItem()`                 | `sessionStorage.getItem()`             | `document.cookie`                        |
| **安全性**         | ❌ **容易被 XSS 攻击**（不随请求发送）    | ❌ **容易被 XSS 攻击**                  | ✅ **可设置 `HttpOnly` 保护**（防止 XSS） |









# **编程中常见符号的英文表达**

| **符号** | **英文表达**                                  | **示例**                                    |
| -------- | --------------------------------------------- | ------------------------------------------- |
| `.`      | **dot** / **period**                          | `console.log()` (dot notation)              |
| `,`      | **comma**                                     | `const arr = [1, 2, 3];`                    |
| `:`      | **colon**                                     | `const obj = { key: "value" };`             |
| `;`      | **semicolon**                                 | `let x = 5;`                                |
| `' '`    | **single quotes**                             | `'Hello'`                                   |
| `" "`    | **double quotes**                             | `"Hello"`                                   |
| `` ```   | **backticks**                                 | ``Hello ${name}`` (template literal)        |
| `()`     | **parentheses** / **round brackets**          | `function call()`                           |
| `{}`     | **curly braces** / **curly brackets**         | `{ key: "value" }` (object)                 |
| `[]`     | **square brackets**                           | `array[0]`                                  |
| `<>`     | **angle brackets**                            | `<div></div>` (HTML, JSX)                   |
| `/`      | **slash** / **forward slash**                 | `const path = "/home";`                     |
| `\`      | **backslash**                                 | `"C:\\Program Files\\"`                     |
| `*`      | **asterisk** / **star**                       | `const result = a * b;`                     |
| `**`     | **double asterisk / exponentiation operator** | `2 ** 3 === 8`                              |
| `+`      | **plus**                                      | `a + b`                                     |
| `-`      | **minus** / **dash**                          | `a - b`                                     |
| `_`      | **underscore**                                | `const my_variable = 10;`                   |
| `~`      | **tilde**                                     | `~5` (bitwise NOT)                          |
| `&`      | **ampersand**                                 | `a & b` (bitwise AND)                       |
| `&&`     | **logical AND**                               | `if (a && b) {...}`                         |
| `        | `                                             | **pipe**                                    |
| `        |                                               | `                                           |
| `^`      | **caret / XOR (exclusive OR)**                | `a ^ b`                                     |
| `%`      | **modulus / remainder operator**              | `10 % 3 === 1`                              |
| `=`      | **equals / assignment operator**              | `let x = 10;`                               |
| `==`     | **double equals / loose equality**            | `5 == "5"` (true)                           |
| `===`    | **triple equals / strict equality**           | `5 === "5"` (false)                         |
| `!`      | **exclamation mark / NOT operator**           | `!true === false`                           |
| `!=`     | **not equals**                                | `a != b`                                    |
| `!==`    | **strict not equals**                         | `a !== b`                                   |
| `?`      | **question mark / ternary operator**          | `const result = a > b ? "yes" : "no";`      |
| `=>`     | **arrow function operator**                   | `const add = (a, b) => a + b;`              |
| `...`    | **spread / rest operator**                    | `const arr2 = [...arr1];`                   |
| `@`      | **at symbol**                                 | `@decorator` (used in decorators)           |
| `#`      | **hash / pound sign**                         | `#privateField` (private class field in JS) |
| `$`      | **dollar sign**                               | `${value}` (template literals in JS)        |



# AIBUILD Info

“I appreciate AIBUILD’s focus on innovation and collaboration, especially in **AI-driven web solutions**. I enjoy working in fast-growing, research-driven teams where I can continuously learn and contribute to scalable, intelligent web applications.”



“I found the Otaro project particularly interesting, as it showcases how AI and AR/VR can enhance education. I’m excited about the opportunity to contribute to such AI-driven web solutions and help build engaging, intelligent interfaces.”



“I saw that AIBUILD was recently **recognized by Google Cloud as a Scale Tier AI startup**. It’s exciting to see the company’s commitment to AI innovation being recognized on a global scale. I’d love to be part of a team driving this innovation forward.”



Team collabration. typical workflow. 

**关于技术方向**：

- “How does AIBUILD approach the integration of AI models with web applications?”
- “What technologies are primarily used in your AR/VR web development projects?”

**关于团队和工作模式**：

- “How does the web development team collaborate with the AI and AR/VR teams?”
- “What’s the typical workflow for developing and deploying AI-powered web applications at AIBUILD?”

**关于成长和学习**：

- “**What technical challenges have been most rewarding for web developers in AIBUILD?**”
- “Are there opportunities to contribute to AIBUILD’s AI/AR/VR research projects as a web developer?”





# Coding Test (AIBUILD)

Thanks for applying our position. In this coding test, you will work on the questions below, push your code to GitHub and send the link back to us. Before you get started, please remember:

1. Feel free to google potential approaches or ask questions if needed.
2. We are using `Javascript/Typescript` (ES6) as our primary programming language and we would like to see your proficiency in JS. 
3. Your coding efficiency will be evaluated, but we would consider more about your code quality rather than your speed.
4. Leave necessary comments in your code to explain your idea of solving the problem.
5. We are sure that you will try your best, but if any of these problems are too challenging for you, don't worry, just show us your progress or idea.  



## Question 1

We may want to check the internect connection conditions in our App. For example, if the app can get response from the a given host within half a second, we would say the connection condition is `good`, but if the response cannot be returned from the host after 5 seconds, the verdict could be `terrible` and we won't want to wait anymore. 

### What you need to do

Implement a function that checks the internect connection condition. This function will try to get response from a given URI, (let's say, `https://www.google.com`, or any URI you like), and check how long it takes to get the response. 

- If you receive response within half a second, your function returns a string `good`.
- If you receive response in more than half a second but less than five seconds, your function returns a string `fine`.
- If you receive nothing after 5 seconds waiting or the URI is not reachable, don't wait anymore and your function returns a string `terrible`. 

### What you need to know

1. It is possible to implement this function without importing any packages, just use built-in functions of `Node.js`.

### How would we test & review

1. We would check your code and understand the logic of your function.
2. We will try different URIs to see if this function works as expected. 



#### 1 注释是否规范？`@returns {Promise<"good" | "fine" | "terrible">}` 这返回Promise是啥意思？

因为你的函数是用 `async function` 定义的，它**本质上返回一个 Promise**。

换句话说：调用 `checkConnection(uri)` 时，得到的是一个 Promise 对象。而这个 Promise 会最终（resolve）返回一个字符串，取值只能是 `"good"`、`"fine"` 或 `"terrible"`。



#### 2 为什么要用 `AbortController`？如果希望用 fetch 并保持代码简洁的话，用这个是必要的吗？

AbortController 的作用

- **核心功能**：让你能够**主动中止**一个正在进行中的 `fetch` 请求。
- 当你在代码里调用 `setTimeout(() => ac.abort(), TIMEOUT_MS)` 时，如果请求到达了这个时间还没完成，就会抛出一个 `AbortError`，从而**停止等待**。

假设你没有 `AbortController`：

- `fetch` 在一些极端网络状况下（如服务器一直不返回、TCP 连接卡住、网络不通等）可能会**持续等待**很久，直到系统默认的超时（可能是几十秒或更长）。
- 但题目明确要求：**如果超过 5 秒没响应就算 `terrible`**，也不需要再等了。

因此，为了严格实现**5 秒之内拿不到响应就返回 “terrible”**，你需要一种**中断请求**的方式，这就是 `AbortController`。

`ac.abort()` 是触发中断的操作。

`ac.signal` 是一个特殊对象，当你把它传给 `fetch(uri, { signal: ac.signal })`，`fetch` 就会**监听**这个信号。如果信号被触发中断，`fetch` 会抛出 `AbortError` 并停止网络交互。

在你的代码中，`setTimeout(() => ac.abort(), 5000)` 就是说：**5 秒后自动执行中止**，从而实现了超时功能。



#### 3 `performance.now()` 和 `Date.now()` 相比，是否有性能差距？在这个场景下用哪个更合适？

在 Node.js 或现代浏览器里，两者的**调用开销都很小**，几乎可以忽略不计。

真实应用里，网络请求本身的延迟远远大于这点调用成本。

通常建议在**测量时长/间隔**时使用 `performance.now()`，因为它受系统时钟影响更小、精度更高。

`Date.now()` 在这里也能正常工作，不会有明显问题。

所以，你可以理解为：`performance.now()` 更适合做精确测量，但对于这个场景来说，两者都完全够用，不会有显著差异。



#### 4 `const timeoutId` 这个变量名、为什么要在 finally 调用 `clearTimeout()`？另外，try 里面没有直接处理 `>5000ms` 的情况，而是在 catch 里？什么机制？

当你调用 `setTimeout()` 时，在 Node.js 中它会返回一个 “Timeout Object”（或者被通俗地称为一个“定时器 ID”）。

你用 `const timeoutId = setTimeout(...)` 把它存进变量，就是为了**后面可以对这个定时器做操作**，比如取消它。

命名上可以改成 `abortTimer` 或 `timerId` 等，都可以，更具体更语义化。

`try/finally` 结构会保证**无论 try 块是否成功完成，还是抛出了异常，最后都会执行 `finally`**。

我们想要避免出现这种情况：**请求成功完成**后，定时器还在那儿等 5 秒，到点后又去执行 `ac.abort()`，导致错误的中断。

因此，在请求一旦完成（或发生错误）后，就**不需要**这个超时定时器了，所以在 `finally` 里执行 `clearTimeout(timeoutId)` 把它清理掉，防止后续错误地触发。这样做可以避免**不必要的回调执行**以及节省一点点内存/资源（在极端情况下，如果有非常多的定时器而不清理，可能会带来额外负担）。为了避免“定时器到点后又去执行 `abort()`，从而打断本已完成的请求或引发多余异常”，就要在请求结束时清除这个定时器。

- 5 秒到了，`setTimeout(() => ac.abort(), 5000)` 就执行 `ac.abort()`，这会让 `fetch` 抛出 `AbortError`。
- 抛出后会被 `catch (error)` 捕获，并返回 `"terrible"`.
- **也就是说**，如果网络请求超过 5 秒还没响应，我们会**主动触发**中断，让请求抛错进入 `catch`。
- 这正好实现了**“超过 5 秒就返回 ‘terrible’”**。
- 因此，你在 `try` 块内不会看到显式 “if (duration > 5000) { … }”，因为**5 秒超时已经在另一条“自动中断”路径生效**。





#### 6 `test` 部分 `(async () => {})();` 这个结构是啥意思？

这是一个**立即执行的异步自执行函数**（IIFE: Immediately Invoked Function Expression）的写法，它的作用是：

1. **定义一个匿名的 async 函数** `async () => { ... }`
2. **立刻调用它** `(...)();`
3. 这样就能在一个**独立的作用域**里使用 `await`，而不必写一个单独的 `.then()` 回调，或者在顶层使用 `await`（在较新版本的 Node 里是可以使用顶层 `await` 的，但历史上很多地方还不支持）。











## Question 2

Suppose we are developing a e-commerce app, and the backend database stores all product categories. At the frontend, the App needs to get all categories in a **tree** structure, for example:

```javascript
{
  categoryId: "root",
  name: "Root Category",
  parent: null,
  children: [
    {
      categoryId: "category1",
      name: "Category One",
      parent: "root",
      children: [
        {
      		categoryId: "category1-1",
      		name: "Category One - One",
          parent: "category1"
      		children: [...]
    		}
      ]
    },
    {
      categoryId: "category2",
      name: "Category Two",
      parent: "root",
      children: []
    },
    ...
  ]
}
```

As you can see, each category has an `id` field called `categoryId` which is unique amoung all categories(could be an `uuid`), a `name`, a `parent` field which is the parent category id, and could have children categories. But in the server, after querying the database, categories are returned as an `array`, for example:

```javascript
[
  {
    categoryId: "category1",
    parent: "root",
    name: "Category One"
  },
  {
    categoryId: "category2",
    parent: "root",
    name: "Category Two"
  },
  {
    categoryId: "category1-1",
    parent: "category1",
    name: "Category One One"
  },
  ...
]
```

and root category is not stored in the database. 

### What you need to do

1. Implement and run a simple RESTFul server that only has one endpoint, which replies the **category tree** based on given categories data (please refer to the `categories.json` file in the folder). You don't need to implement a database, just write a function that converts the category array (loaded from the `json` file) to the category tree and reply it to the frontend. 
2. Implement a frontend function that sends request to the endpoint you just created, fetch the **category tree** and print it in the console. 

### What you need to know

1. All categories in the `json` file can be included in one tree.
2. This category tree has unlimited levels (maybe not possible in the real world, but in this question, suppose each category could have children, no matter which level it is in).
3. Converting an array to a tree has many approaches, we would like to see that your approach has a low time complexity. 
4. Please write your code in seperate files (for example, your server program could be in a file called `server.js`, and your font end function will be in a file called `fetchCategories.js`).

### How would we test & review

1. We would run your server at `localhost:8080`, and use `Postman` to call the endpoint, checking if the category data is returned as expected.
2. We would run your frontend function file in terminal, and check the output.
3. We would go through the converter function and check your code logic.



#### 1 为什么前端需要树结构的 Categories？

1. 前端展示需求

   - 在电商/商品管理界面中，分类常常要以

     分层的形式

     展现给用户，例如：

     - 「根分类」 → 「子分类1」 → 「子分类1-1」 → 「子分类1-2」…
     - **这有助于前端组件 (如下拉菜单、树形菜单、左侧导航栏) 清晰呈现多级分类**。

2. 快速展开/折叠

   - 如果分类有多层级，前端通过**树结构**可以更方便地实现**展开/折叠**，或者像 Vue/React 里通过递归组件来显示子分类列表。

3. 数据关联清晰

   - 若数据里只有「parentId」但没有「children」，在前端渲染时需要**频繁查找**「谁是我孩子？」。
   - 转换成树结构后，“child” 的信息直接在 `children` 数组里，**查询/操作**变得更简单。

因此，**将分类组织成树**可以在 UI 层**快速展示**、**容易操作**，这是常见的前端做法。

------

#### 2 为什么想到用 `Map`？（解决什么问题）

2.1 常见的低效思路

- 初学者常会用

  双重循环

  ：

  ```js
  // 伪码：O(n^2)
  for (const category of categories) {
    for (const maybeChild of categories) {
      if (maybeChild.parent === category.categoryId) {
        category.children.push(maybeChild);
      }
    }
  }
  ```

  - 这种做法**时间复杂度**是 **O(n^2)**，当数据量很大时效率会很差。

2.2 利用 `Map` 优化到 O(n)

- 如果我们能在**一次遍历**后，就能**快速找到**某个分类的对象，那么就不需要内层循环。
- 例如，通过 `categoryMap.set(categoryId, categoryObject)`，我们可以在 O(1) 时间取出对应的对象。
- 这样，就能实现：
  1. **第一次遍历**：把所有分类存到 `Map` 里，形如 `map.set(categoryId, { ...category, children: [] })`。
  2. **第二次遍历**：对每个分类，看看它的 `parent`，然后直接 `map.get(parent)` 取得父分类对象，把自己 push 到父分类的 `children` 里。
- 这样，**找父分类**是 O(1)，整个过程只需要 O(n) 就能构造好所有的父子关系。

原理图示

```js
categories array                 Map / Hash Table
[                                 categoryId  ->  {categoryId, name, parent, children:[]}
  { categoryId: 'c1', parent: 'root', ... },          'c1'  -> { ... }  
  { categoryId: 'c2', parent: 'root', ... },          'c2'  -> { ... }
  { categoryId: 'c1-1', parent: 'c1', ... },          'c1-1'-> { ... }
]

1) 创建 map
for c in categories: map.set(c.categoryId, { ...c, children: [] })

2) 父子关联
for c in categories:
   let childObj = map.get(c.categoryId)
   if c.parent != 'root':
       let parentObj = map.get(c.parent) 
       parentObj.children.push(childObj)
   else
       // belongs to root
```

------

3. 如何从数组转换成树？

3.1 步骤详解（O(n) 解法）

1. **创建一个空的 `Map`**：`categoryMap = new Map()`.

2. 遍历数组

   （categories），将每个分类初始化为：

   ```js
   // pseudo
   for category in categories:
     categoryMap.set(category.categoryId, {
       categoryId: category.categoryId,
       name: category.name,
       parent: category.parent,
       children: []
     })
   ```

   - 这样 `Map` 里就有了**所有分类对象**，并且为每个对象加了一个空 `children` 数组。

3. 再次遍历数组

   ，对每个分类：

   - 如果 `category.parent === 'root'`，说明它是根层分类，需另行处理(可能放到一个 `rootChildren` 数组里)。

   - 如果 

     ```
     category.parent !== 'root'
     ```

     ，说明有父分类：

     1. `parentObj = categoryMap.get(category.parent)`
     2. `parentObj.children.push( categoryMap.get(category.categoryId) )`

   - 这样就把子分类**挂到父分类的 `children`** 里。

4. **(可选) 建立一个虚拟的“Root Category”**，把所有 `rootChildren` 挂到这个虚拟 root 的 `children` 下，以便返回一个统一的树。

3.2 优点

- 只需要两次**线性遍历**(O(n))，每次对 `Map` 的操作是 O(1)。
- 可轻松处理多级嵌套：只要有 `parentId` 就能**无限往下**。



所以push到categoryMap相当于加载到了父节点的children属性里面(层层递归)，而所有顶层父节点数据都被push到了rootCategories, 所以rootCategories就包含了所有节点



## Question 3

In React, `Redux` is used to store cross-component data. Suppose we are fetching the categories data described in Question 2 and store it into redux in a react app, and use the data in a `TreeSelect` component to allow the user select one of these categories. The `TreeSelect` component is a dropdown selector like below:

![image-20210322115849727](D:\Notes\web-notes\assets\TreeSelect.png)

### What you need to do

Please implement a simple React app that allows the user to select **ONE** category through this `TreeSelect` component, and the data is fetched from the API you implemented in Question 2 and stored in `Redux`. Once a categroy is selected, the page will popup an `alert` to show the `id` of the selected category.

We'd like to see two ways of implementing asynchronous calls. Put two buttons in the page:

1. Button 1: Click this button will fetch categories data through `redux saga` , and then store it into `Redux`.
2. Button 2: Click this button will fetch categories data and store it into `Redux` through a custom `hook` implemented by yourself.

### What you need to know

1. We recommend to use `TreeSelect` component of `Ant Design` , but you are also free to use any other package or component, or even implement this component by yourself. You don't need to implement any fancy effects of this component, just ensure mouse clicks trigger dropdown and select actions.

2. The categories data may have multiple levels, so hardcoding the data passed into `TreeSelect` component is not the way we'd like to see, but you can assume that the data structure of category node is fixed: 

   ```typescript
   interface CategoryNode {
     categoryId: string
     name: string
     parent: string
     children: Array<CategoryNode>
   }
   ```

3. You can implement one of them if you are not familiar with `redux saga` or `hook`, but function component is the prefered way for us in both approaches. 

4. Put this React App in a public repository of your personal GitHub page, commit your progress regularly, and let us know the link of this repo.

### How would we test & review

1. We would check your coding style of implementing this React App.
2. We would check your way of generating the selection options of `TreeSelect` based on multi-level, uncertain category data. 
3. We would run your React App locally (`localhost:3000`) and use `Redux DevTools` to check the action flows of your app.



# Redux Toolkit

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



# Redux Toolkit (Thunk as default) vs Redux Saga

Redux Toolkit 和 Redux Saga **核心区别** 不仅仅是 Saga 多了 `watcher`，它们在**异步管理方式**上有本质不同：

| **对比项**       | **Redux Toolkit (Thunk)**     | **Redux Saga**                           |
| ---------------- | ----------------------------- | ---------------------------------------- |
| **默认集成**     | ✅ 默认集成 Thunk              | ❌ 需要手动安装                           |
| **异步处理方式** | `dispatch(action)` 直接触发   | `yield` 监听 `dispatch(action)`          |
| **写法**         | `createAsyncThunk()` 处理异步 | `function* watcherSaga()` 监听异步       |
| **副作用控制**   | 依赖 `Promise`，不能暂停      | `yield` 可以暂停、等待                   |
| **支持并发控制** | ❌ 不支持并发控制              | ✅ 支持 `takeLatest` / `takeEvery`        |
| **适用场景**     | ✅ 适合大部分应用              | ✅ 适合复杂的异步流程（轮询、取消请求等） |
| **学习曲线**     | ✅ 简单易学                    | ❌ 语法较复杂                             |

**监听所有 action**（Saga 的 `takeEvery` / `takeLatest` 可以）。

**控制异步流**（Saga 可以 `yield` 暂停和恢复）。

**取消任务**（Saga 可以 `cancel` 请求）。

📌 **Redux Saga 适用于以下场景：** 

1️⃣ **顺序执行多个 API 请求**（如登录后获取用户数据 → 获取消息）。
2️⃣ **取消 API 请求**（如搜索时取消上一个未完成的请求）。
3️⃣ **管理 WebSocket 连接**（如监听新消息）。
4️⃣ **节流 / 防抖 API 调用**（如防止短时间内多次点击按钮）。
5️⃣ **监听多个 Redux Action 触发相同的逻辑**（如购物车更新）。



## **1️⃣ 处理多个异步 API 请求的顺序执行**

### **场景：某些 API 请求必须按顺序执行**

假设一个用户登录流程：

1. 用户提交 `LOGIN_REQUEST`
2. 请求登录 API (`fetchLogin`)
3. **登录成功后**，获取用户信息 (`fetchUserData`)
4. **用户数据获取完成后**，获取用户的消息 (`fetchUserMessages`)

📌 **Saga 实现按顺序执行**

```jsx
import { takeLatest, call, put } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "./authSlice";

// 1️⃣ API 调用函数
const fetchLogin = async (credentials) => {
    const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
    return response.json();
};

const fetchUserData = async (userId) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
};

const fetchUserMessages = async (userId) => {
    const response = await fetch(`/api/messages/${userId}`);
    return response.json();
};

// 2️⃣ Saga 处理异步流程
function* loginSaga(action) {
    try {
        const user = yield call(fetchLogin, action.payload);
        yield put(loginSuccess(user));

        const userData = yield call(fetchUserData, user.id);
        console.log("User Data:", userData);

        const messages = yield call(fetchUserMessages, user.id);
        console.log("User Messages:", messages);
    } catch (error) {
        yield put(loginFailure(error.message));
    }
}

// 3️⃣ 监听 LOGIN_REQUEST action
export function* watchLogin() {
    yield takeLatest("LOGIN_REQUEST", loginSaga);
}
```

✅ **优势**

- **保证按顺序执行 API 请求**，先登录 → 获取用户数据 → 获取消息。
- **避免嵌套回调 (`then()` Hell)**，代码结构清晰。

❌ **用 `useCallback` 或 `useEffect` 可能需要多个 `useEffect` 组合，代码容易混乱**。

------

## **2️⃣ 取消 API 请求**

### **场景：用户离开页面时取消正在进行的 API 请求**

假设：

- 用户在**搜索框**输入时触发 `searchRequest` API 请求。
- **如果用户很快输入新的关键字，应该取消上一个请求，避免浪费资源。**

📌 **Saga 解决方案**

```jsx
import { takeLatest, call, put, cancelled } from "redux-saga/effects";

const fetchSearchResults = async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
};

// Saga 任务
function* searchSaga(action) {
    const abortController = new AbortController();
    try {
        const data = yield call(fetchSearchResults, action.payload, { signal: abortController.signal });
        yield put({ type: "SEARCH_SUCCESS", payload: data });
    } catch (error) {
        if (yield cancelled()) {
            abortController.abort(); // 取消请求
        } else {
            yield put({ type: "SEARCH_FAILURE", payload: error.message });
        }
    }
}

// 监听并自动取消上一次请求
export function* watchSearch() {
    yield takeLatest("SEARCH_REQUEST", searchSaga);
}
```

✅ **优势**

- **自动取消之前的 API 请求，减少不必要的请求**
- **防止竞态条件，确保只有最新的请求生效**

------

## **3️⃣ 处理 WebSocket 连接**

### **场景：在 WebSocket 连接时监听新消息，并自动重新连接**

📌 **Saga 实现 WebSocket 监听**

```jsx
import { eventChannel } from "redux-saga";
import { take, call, put, fork, cancel } from "redux-saga/effects";

// 创建 WebSocket 事件监听
const createWebSocketChannel = (socket) => {
    return eventChannel((emit) => {
        socket.onmessage = (event) => {
            emit({ type: "NEW_MESSAGE", payload: JSON.parse(event.data) });
        };
        socket.onerror = (error) => {
            emit({ type: "WEBSOCKET_ERROR", payload: error });
        };
        return () => {
            socket.close();
        };
    });
};

// 监听 WebSocket 消息
function* watchWebSocketMessages(socket) {
    const channel = yield call(createWebSocketChannel, socket);
    try {
        while (true) {
            const action = yield take(channel);
            yield put(action);
        }
    } finally {
        channel.close();
    }
}

// WebSocket 连接管理
function* connectWebSocket() {
    const socket = new WebSocket("wss://example.com/socket");
    const task = yield fork(watchWebSocketMessages, socket);
    yield take("DISCONNECT_WEBSOCKET");
    yield cancel(task); // 关闭 WebSocket
}

// 监听 WebSocket 连接
export function* watchWebSocket() {
    yield take("CONNECT_WEBSOCKET", connectWebSocket);
}
```

✅ **优势**

- **WebSocket 监听器不会影响主线程**
- **可以手动断开连接（`DISCONNECT_WEBSOCKET`）**
- **Saga 的 `take()` 让代码更易读**

❌ **用 `useEffect` + WebSocket 可能需要 `useRef`，代码容易混乱**。

------

## **4️⃣ 处理 API 请求节流（Throttle）**

### **场景：用户频繁点击按钮时，API 只应该在一定时间间隔内触发**

假设：

- 用户快速点击 **“加载更多”** 按钮，应该只执行**最新的一次请求**，并忽略短时间内的重复请求。

📌 **Saga 解决方案**

```jsx
import { throttle, call, put } from "redux-saga/effects";

const fetchMoreData = async () => {
    const response = await fetch("/api/more-data");
    return response.json();
};

function* loadMoreSaga() {
    try {
        const data = yield call(fetchMoreData);
        yield put({ type: "LOAD_MORE_SUCCESS", payload: data });
    } catch (error) {
        yield put({ type: "LOAD_MORE_FAILURE", payload: error.message });
    }
}

// 监听 `LOAD_MORE_REQUEST`，但 **限制 2 秒内只能触发一次**
export function* watchLoadMore() {
    yield throttle(2000, "LOAD_MORE_REQUEST", loadMoreSaga);
}
```

✅ **优势**

- **防止用户短时间内多次点击导致 API 过载**
- **相比 `debounce()`，Throttle 确保每隔一定时间执行一次**

------

## **5️⃣ 监听多个 Action 统一管理**

### **场景：多个 Action 触发同一个 API**

假设：

- `ADD_TO_CART`、`REMOVE_FROM_CART` 和 `UPDATE_CART` 都应该触发 `fetchCart()` 获取最新购物车信息。

📌 **Saga 监听多个 action**

```jsx
import { takeEvery, call, put } from "redux-saga/effects";

const fetchCart = async () => {
    const response = await fetch("/api/cart");
    return response.json();
};

function* fetchCartSaga() {
    try {
        const cart = yield call(fetchCart);
        yield put({ type: "FETCH_CART_SUCCESS", payload: cart });
    } catch (error) {
        yield put({ type: "FETCH_CART_FAILURE", payload: error.message });
    }
}

// 监听多个 action
export function* watchCartUpdates() {
    yield takeEvery(["ADD_TO_CART", "REMOVE_FROM_CART", "UPDATE_CART"], fetchCartSaga);
}
```

✅ **优势**

- **简化多个 Action 触发同一逻辑的代码**
- **避免在 `useEffect()` 中写多次 `dispatch(fetchCart())`**



toolkit 常用 RTK Query 来处理api call, saga则是在saga里面yield

```
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 1️⃣ 创建 API Slice
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (id) => `users/${id}`,
        }),
    }),
});

// 2️⃣ 自动生成 `useGetUserByIdQuery` hook
export const { useGetUserByIdQuery } = userApi;

// 3️⃣ 配置 Store
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
    reducer: { [userApi.reducerPath]: userApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});
```



# Redux Saga

a redux middleware that allows you to handle a lot of api calls or async operations in a very clean way of writing it

make **api calls** and handle all of the logic in a redux saga



Redux 本身是**同步的**，但是应用中经常需要处理异步操作比如：

- **API 请求**（`fetch`、`axios`）
- 数据库交互
- WebSocket 连接
- 本地存储（localStorage/sessionStorage）

Redux 不能直接处理这些副作用（side effects），因此 `redux-saga` 充当了一个 **异步操作管理工具**，帮助 Redux 以更清晰的方式处理这些异步任务

**解耦 业务逻辑 和 视图组件**

- 通常，组件只关心 `dispatch(action)`，而不会关心具体的异步逻辑。
- `redux-saga` 可以把 API 请求、复杂的异步逻辑、并发控制、取消任务等操作放到 `saga.js` 文件中，使 Redux 的 Reducer 依然保持为**纯函数**，从而提高代码的可维护性。

 **Redux 要求 Reducer 不能有副作用 **Reducer 只根据输入 `state` 和 `action` 计算新 `state`，不做其他事情。



在大多数情况下，**如果 API 只是用来拉取数据然后渲染 UI**，你完全可以用 `useEffect` 直接 `fetch` 或 `axios` 获取数据

什么时候 `useEffect + axios` 不够用了？

（1）多个 API 调用需要按顺序执行

**场景**：用户登录后，需要先获取 `userId`，然后再用 `userId` 拉取 `userProfile` 数据。

可能会用.then嵌套，可能在别的地方setLocalStorage然后取出来再调用getById, 如果后续还要**根据 profile 里的数据再请求其他 API**，代码会越来越难维护，且不能在 Redux 里统一管理状态

Saga 方式（更清晰）

```js
function* fetchUserProfile(action) {
  const loginResponse = yield call(axios.post, "/api/login", action.payload);
  const userProfile = yield call(axios.get, `/api/profile/${loginResponse.data.userId}`);
  yield put({ type: "SET_USER_PROFILE", payload: userProfile.data });
}
```

Saga 让逻辑清晰可读，就像同步代码一样 **"先执行 A，然后执行 B"**，不会陷入 `then` 的嵌套地狱。



（2）需要任务取消（搜索防抖 / 中断请求）

**场景**：搜索框输入时，每次输入一个字符都会触发 API 请求，你希望**只保留最新的请求，取消掉之前的请求**，否则会导致 API 过载。

用 `useEffect` 很难优雅地取消旧请求，容易出 Bug, 如果多个 API 调用有依赖关系，维护难度高

Saga 方式（takeLatest 自动取消旧请求）

```js
function* fetchSearchResults(action) {
  const response = yield call(axios.get, `/api/search?q=${action.payload}`);
  yield put({ type: "SET_SEARCH_RESULTS", payload: response.data });
}

function* watchSearch() {
  yield takeLatest("SEARCH_QUERY", fetchSearchResults); // 只保留最后一个请求，自动取消前一个
}
```

Saga `takeLatest` **自动取消上一次请求，避免 API 过载**。



（3）多个组件共享相同数据，避免重复请求

**场景**：多个组件都需要访问 `userProfile`，但是每次 `useEffect` 都会重复请求 API。

`useEffect` 方式: 组件每次挂载都会重新请求 API，造成重复请求。需要手动做缓存管理，状态不集中。

Saga 方式（数据放到 Redux，全局共享）

```js
function* fetchUserProfile(action) {
  const response = yield call(axios.get, `/api/profile/${action.payload}`);
  yield put({ type: "SET_USER_PROFILE", payload: response.data });
}

function* watchUserProfile() {
  yield takeEvery("FETCH_USER_PROFILE", fetchUserProfile);
}
```

所有组件可以直接 `useSelector(state => state.userProfile)` 获取数据，Saga 只会拉取一次，避免重复请求。



Suppose we have a UI to fetch some user data from a remote server when a button is clicked.

The component dispatches a plain object action to the store. We'll create a Saga that watches for all `USER_FETCH_REQUESTED` actions and triggers an API call to fetch the user data.

```js
class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
  ...
}
```

```js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
```

这里的 `function*` 定义了一个 **Generator 函数**，`redux-saga` 依赖 `Generator` 让异步代码写得像同步代码一样清晰。

`Generator` 是 JavaScript 提供的一种特殊函数，支持 `yield` 关键字，可以 **暂停和恢复执行**。类似于 `await`，但比 `await` 更灵活：

- **暂停函数执行，返回 `yield` 右侧的值**
- **下次 `next()` 被调用时，继续执行**

`redux-saga` **不会阻塞 JavaScript 线程**，而是：

1. 执行 `call(Api.fetchUser, action.payload.userId)`，暂停函数等待 API 返回
2. API 结果返回后，Saga **恢复执行** 并将结果赋值给 `user`
3. 执行 `yield put({type: "USER_FETCH_SUCCEEDED", user: user})`，派发 Redux action

Saga 的 `put` 就是 Redux 里的 `dispatch`，用于触发 Redux action，更新 `store` 状态。

`takeEvery` 是 `redux-saga` 里的**监听器**，用于监听指定的 Redux Action，并调用对应的 Saga 处理逻辑。



**Redux-Saga 工作流程：**

1. **组件 `dispatch(action)`**
2. **`takeEvery` 监听 `action.type`**
3. **Saga 启动 `fetchUser`**
4. **执行 API 请求（`call(Api.fetchUser, userId)`）**
5. **请求成功后 `put({type: "USER_FETCH_SUCCEEDED"})`**
6. **Redux 更新 `store`**



目前给我一种感觉，就是有些业务，比如说posting，我需要搜索餐厅或dish的名字那么就需要先确保用户login了有token验证才能call相关api， 然后搜索的时候要不停地call 多种search api比如餐厅，dish还有tag，途中可能还想要创建新的这些东西，而最后post的时候还得从某处（比如说本地storage）获取userId作为authId传到save a post的数据里面， 因为数据库里面很多时候关联起来的都是id而不是name，所以往往需要多一步骤getById才能获取到最后的数据，而最后的数据里面也可能有类似restaurantId这种东西，需要再转化为name的api才能让呈现的页面有意义。以前我都是一步步处理，现在看来用中间件的话这些复杂逻辑可以更统一地管理？而不是分散在各个组件？我的理解对吗

你的业务逻辑涉及多个 API 请求，并且它们之间有**依赖关系**，比如：

- **用户必须登录后，才能进行搜索** → `token` 需要检查、可能需要刷新
- **搜索时调用多个 API（餐厅 / dish / tag）**
- **如果搜索不到，可能要创建新的餐厅、dish 或 tag**
- **发帖时，需要先获取 `userId` 作为 `authId`**
- **发帖数据里有 `restaurantId`，但前端需要 `restaurantName`，所以还要 `getById`**
- **所有这些 API 请求都需要在正确的顺序下执行**

🚨 **如果在 `useEffect` 里手动一步步执行，代码会变得非常混乱：**

- **所有逻辑都分散在各个组件里**
- **每个组件可能都要写 `fetch` 或 `axios`，导致代码重复**
- **多个 API 之间的依赖很难管理**
- **很难复用和测试**

 **用 `redux-saga` 处理后，代码就变成一个清晰的“同步风格”业务流程，而不是分散在多个组件里**



## redux-saga-demo

npm create vite@latest

cd redux-saga-demo

npm install

npm install redux react-redux redux-saga



在 main.jsx 配置好样板代码把 reducer, store, saga 联系起来

我们需要自己写 myFirstReducer 处理器用来根据 action type 更新 state， 

自己写 mySaga 用来监听 dispatch 派发的 action type , call api, put 派发 success 或 fail 的action (type and data) 

 

当组件用 dispatch 方法时, 传入 action type, 被 **saga** 监听到并触发 api call 把相应信息和结果的 action type 派发, **reducer** 会根据 action type 处理 state 的变化



```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import myFirstReducer from "./reducer";
import mySaga from "./sagas";

// Create the saga middleware 
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  myFirstReducer,
});
// Mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// Run the saga
sagaMiddleware.run(mySaga);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

```



## toolkit-saga-demo

npm install @reduxjs/toolkit react-redux redux-saga





# Research Question

Task Description Description: 

Consider you are going to implement and design a school recommendation system for students in Australia. 

Requirements 

- Write a web scraper to parse the information from schools 
- Search the school that fits a student best according to multiple criteria, including but not limited to, the geolocation of the school and student, the student’s gender, the score of the student

Your task: 

Task 1 

Develop a web scraper that can navigate to Goodschools.com and collect data on secondary schools in Victoria. 

● The information you need to collect should at least include the school **name**, **postcode**, **geolocation**, **sector** and **academic results**. 

● Format and present this data in a CSV file containing information for at least **50 schools**. (Not required to collect all schools in the list)

● **Write a document** to briefly describe how you did this task, what tools and libraries you would use, and any potential challenges you foresee.

● Link: https://www.goodschools.com.au/compare-schools/search/in-victoria



Task 2 

With provided CSV datasets of secondary schools in Western Australia: 

● Analyze the datasets to **determine criteria** that could help match students with the best-fit school based on various factors, including geolocation. 

● Develop a **proof-of-concept prototype** that employs these criteria to suggest schools to students, based on some general attributes from a student. 

● **Discuss** your approach to researching and selecting these criteria, the methods and technologies you would use for the prototype, and how you would validate the effectiveness of your recommender system. 

● Link to CSV file: https://drive.google.com/file/d/1NJrSBY37OwqSQ50d1gR3cTwwh6SanjJI/view?usp=drive_link 

source: Kaggle (https://www.kaggle.com/datasets/syuzai/schools-in-western-australia/data)











# JavaScript

**异步任务确实要等同步任务执行完毕后才执行。**

**JavaScript 事件循环优先执行微任务（Promise）**，然后执行**宏任务（setTimeout 等）**。

**`setTimeout` 不能严格控制执行顺序**，它的时间只是“最小等待时间”，可能因事件循环和主线程任务的执行情况而有所延迟。

**多个 `setTimeout` 任务的顺序取决于定时器设定的时间和主线程的任务状态**。



### **`==` 和 `===` 的区别**

- `==`（**宽松相等**）：在比较时，会先尝试进行 **类型转换**，然后再进行值比较。
- `===`（**严格相等**）：**不进行类型转换**，只有当 **类型相同且值相等** 时，才返回 `true`。

true == 1	**true 转换为 1**	true
false == 0	**false 转换为 0**	true
"1" == 1	**"1" 转换为 1（字符串转数字**）	true
"" == 0	**"" 转换为 0（空字符串转数字）**	true
"0" == false	**"0" 转换为 0，false 也转换为 0**	true
" \t\n" == 0	**只包含空格的字符串转换为 0**	true



### {} 和 [] 的 valueOf 和 toString 的结果是什么？

{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"

[] 的 valueOf 结果为 [] ，toString 的结果为 ""



### 什么是假值对象？

浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来值，这些就是“假值对象”。假值对象看起来和
普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 最常见的例子是 document.all，它
是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供给 JavaScript 程序使用。



### 解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字，它们之间的区别是什么？

解析允许字符串（如 parseInt() ）中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换（如 Nu
mber ()）不允许出现非数字字符，否则会失败并返回 NaN。



### 如何将字符串转化为数字，例如 '12.3b'?

（1）使用 Number() 方法，前提是所包含的字符串不包含不合法字符。

（2）使用 parseInt() 方法，parseInt() 函数可解析一个字符串，并返回一个整数。还可以设置要解析的数字的基数。当基数的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

（3）使用 parseFloat() 方法，该函数解析一个字符串参数并返回一个浮点数。

（4）使用 + 操作符的隐式转换，前提是所包含的字符串不包含不合法字符。



### || 和 && 操作符的返回值？

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行 ToBoolean 强制类型转换，然后再执行条件
判断。

对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。

&& 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

**|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果**



### 如何将浮点数点左边的数每三位添加一个逗号，如 12000000.11 转化为『12,000,000.11』?

```js
// 方法一
function format(number) {
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}
// 方法二
function format1(number) {
  return Intl.NumberFormat().format(number)
}
// 方法三
function format2(number) {
  return number.toLocaleString('en')
}
```



###  常用正则表达式

```js
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g;

// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g;

// （5）用户名正则，4到16位（字母，数字，下划线，减号）
var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/;

// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
var pPattern = /^.*(?=.{6,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
```





## 1. 介绍 js 的基本数据类型

在 JavaScript 中，**基本数据类型（Primitive Data Types）** 共有 5 种：`Undefined`、`Null`、`Boolean`、`Number`、`String`。此外，`Symbol`（ES6 引入）和 `BigInt`（ES11 引入）也被视为基本数据类型。

### Undefined

`Undefined` 表示**变量已声明但未赋值**，或者**访问对象不存在的属性**时返回的值。

`undefined` 不是 `null`，两者类型不同

```js
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"

let obj = {};
console.log(obj.prop); // undefined

```

#### null VS. undefined 

一般变量声明了但还没有定义的时候会返回 undefined，**null主要用于赋值给一些可能会返回对象的变量，作为初始化**。

undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它
会影响我们对 undefined 值的判断。

但是我们可以通过一些方法获得**安全的 undefined 值**，比如说 **void 0** （表达式 void ___ 没有返回值，因此返回结果是 undefined。void 并不改变表达式的结果，只是让表达式不返回值。按惯例我们用 void 0 来获得 undefined）

当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。当我们使用双等
号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。

**`undefined == null` 和 `undefined === null` 的区别？**

T 和 F，前者是因为特殊规定，后者是因为类型不同。

且`null` 只等于 `undefined`，与其他值都不相等，`undefined` 只等于 `null`，与其他值都不相等



#### undefined VS. undeclared 

已在作用域中**声明但还没有赋值**的变量，是 **undefined** 的。相反，还**没有在作用域中声明过**的变量，是 **undeclared** 的。

对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。但是我们可以使用 typ
eof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。



### Null

`Null` 代表 **“空值”**，通常表示**手动赋值为空**或**对象不存在**。



### Boolean

`Boolean` 只有两个值：`true` 和 `false`，用于逻辑判断。

**常见的“假值”（Falsy 值）**：

- `false`
- `0`、`-0`
- `""`（空字符串）
- `null`
- `undefined`
- `NaN`

**除上述外，所有值都是“真值”（Truthy 值）**。



### Number

`Number` 类型表示**整数和浮点数**



#### NaN

typeof NaN 返回 "number"

`NaN == NaN` 返回什么？

```js
console.log(NaN == NaN); // false
console.log(Number.isNaN(NaN)); // true
```

`NaN`（Not a Number）不等于自身，需要用 `Number.isNaN()` 进行判断。



#### toFixed(2)

如何解决 `0.1 + 0.2 !== 0.3`？

```js
console.log((0.1 + 0.2).toFixed(2) === "0.30"); // true
```

使用 `toFixed(2)` 处理**精度问题**。



####  js 中整数的安全范围是多少？

2^53 - 1

在 ES6 中被定义为 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次
计算返回了正或负的 Infinity 值，那么该值将无法参与下一次的计算。判断一个数是不是有穷的，可以使用 isFinite 函数
来判断。



### String

`String` 代表文本数据，是**不可变**的（即**修改字符串实际上会创建新字符串**）。



### Symbol

Symbol	ES6 引入，创建唯一值，不可自动转换为字符串

Symbol 代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。

**`Symbol` 适用于**：创建**唯一标识符**，防止命名冲突，保护私有属性，定义不可修改的枚举值。个人认为补救出类似java的private作用

Symbol 值不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换为布尔值（显式和隐式结果
都是 true ）。



### BigInt

ES11（ES2020）引入，用于表示超过 `Number.MAX_SAFE_INTEGER` 的大整数。

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

**`BigInt` 适用于**：超大整数计算，如金融、加密、区块链和科学计算。



## 2. 什么是堆？什么是栈？它们之间有什么区别和联系？

堆和栈的概念存在于数据结构中和操作系统内存中。

在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全
二叉树是堆的一种实现方式。

在操作系统中，内存被分为栈区和堆区。

栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。



## 3. JavaScript 数据类型内存图？

- 栈：基本数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）或复杂数据类型 Object、Array、Date等

两种类型的区别是：存储位置不同。
原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；**引用数据类型在**
**栈中存储了指针**，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实
体。

![img](https://i-blog.csdnimg.cn/blog_migrate/f80f2541d42ba0114ac1f4831125159e.png) 

![img](https://i-blog.csdnimg.cn/blog_migrate/a3c215f114f8f19f68090a10d70ba231.png) 

## 4. 介绍 js 有哪些内置对象？

js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些**全局值属性、函数和用来实例化其他对象的构造函**
**数对象**。一般我们经常用到的如全局变量值 **NaN**、**undefined**，全局函数如 **parseInt()**、**parseFloat()** 用来实例化对象的构
造函数如 **Date**、**Object** 等，还有提供数学计算的单体内置对象如 **Math** 对象。



全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在
全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类

（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。

例如 Infinity、NaN、undefined、null 字面量

（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

例如 eval()、parseFloat()、parseInt() 等

（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

例如 **Object**、**Function**、**Boolean**、**Symbol**、**Error** 等

（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。

例如 **Number**、**Math**、**Date**

（5）字符串，用来表示和操作字符串的对象。

例如 **String**、RegExp

（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 **Array**

（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

例如 **Map**、**Set**、WeakMap、WeakSet

（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

例如 SIMD 等

（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

例如 JSON 等

（10）控制抽象对象

例如 **Promise**、Generator 等

（11）反射

例如 Reflect、Proxy

（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。

例如 Intl、Intl.Collator 等

（13）WebAssembly

（14）其他

例如 arguments



## 5. 说几条 JavaScript 基本规范？

在平常项目开发中，我们遵守一些这样的基本规范，比如说：

（1）一个函数作用域中所有的变量声明应该尽量提到函数首部，用一个 var 声明，不允许出现两个连续的 var 声明，声明时
    如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够一目了然的知道变量对应的类型值。

（2）代码中出现地址、时间等字符串时需要使用常量代替。

（3）在进行**比较**的时候吧，尽量**使用'===', '!=='**代替'==', '!='。

（4）不要在内置对象的原型上添加方法，如 Array, Date。

（5）**switch 语句必须带有 default 分支**。

（6）for 循环必须使用大括号。

（7）if 语句必须使用大括号。



## 6. JavaScript 原型，原型链？ 有什么特点？

js中函数也是对象

在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对
象的指针，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当我们使用构造函数新建一个对象后，在这个对象的内部
将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说我们
是不应该能够获取到这个值的，但是现在浏览器中都实现了 __proto__ 属性来让我们访问这个属性，但是我们最好不要使用这
个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对
象的原型。

**当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又**
**会有自己的原型，于是就这样一直找下去，也就是原型链的概念**。

**原型链的尽头一般来说都是 Object.prototype 所以这就是我们新建的对象为什么能够使用 toString() 等方法的原因**。

特点：

JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与
之相关的对象也会继承这一改变。



总结了原型和原型链的知识后，感觉对 JavaScript 语言的理解更加深刻了，也为后面**理解对象的创建和继承**打下了基础。其实理解原型链，对于 JavaScript 中一些**预定义类型的行为和实现**就很好理解了。

### **什么是原型？（Prototype）**

**现实类比：蓝图和工厂**

想象你是一家车厂的老板，你想生产一批汽车：

- 你有一个**汽车蓝图**（Prototype）。
- 每辆汽车（对象）都是根据这个蓝图生产的。
- 但是每辆车可以有自己的**独特属性**（如颜色、车牌号）。

在 JavaScript 里：

- **原型（Prototype）** 就像是“蓝图”。
- **对象（Object）** 就是按照原型创建的“汽车”。
- **方法和属性** 可以共享（比如所有汽车都有“行驶”功能）。
- 如果每辆车都需要自己的方法，内存占用会很大，所以它们**共享同一个原型**来节省空间。

```js
function Car(model) {
    this.model = model; // 每个对象都有自己的 model
}

// 给 Car 的原型添加方法
Car.prototype.drive = function() {
    console.log(this.model + " is driving!");
};

let car1 = new Car("Tesla");
let car2 = new Car("BMW");

car1.drive(); // Tesla is driving!
car2.drive(); // BMW is driving!
```

`Car.prototype` 是**原型对象**，所有 `Car` 实例都会共享它的方法。

`car1` 和 `car2` 虽然是不同的对象，但它们都可以调用 `drive()`，因为它们的**原型指向同一个 `Car.prototype`**。



#### 函数对象的 prototype 属性

```js
function Person(){

}

// 为原型对象添加方法
Person.prototype.sayName = function(){
    alert(this.name);
}
```

**我们创建的每一个函数都有一个 prototype 属性，这个属性是一个指针，指向一个对象**。在默认情况下，这个原型对象将会获得一个 constructor 属性，这个属性是一个指针，指向 prototype 所在的函数对象。这个对象的用途是**包含**可以由特定类型的所有**实例共享的属性和方法**，简单来说，该函数实例化的所有对象的__proto__的属性指向这个对象，它是该函数所有实例化对象的原型。

![配图18-3](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/peitu18-3.png)

#### 对象的 ____proto____ 属性 

```js
var student = new Person();

console.log(student.__proto__ === Person.prototype); // true

// 虽然我们在脚本中没有办法访问到[[Prototype]]属性，但是我们可以通过 isPrototypeOf 方法来确定对象之间是否存在这种关系
// isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上
console.log(Person.prototype.isPrototypeOf(student)); // true
console.log(Object.getPrototypeOf(student) === Person.prototype); // true
```

![配图18-5](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/peitu18-5.png) 



### 什么是原型链？（Prototype Chain）

ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法. 

基本思想是利用的一个引用类型继承另一个引用类型的属性和方法

原型链的主要实现方法是让构造函数的 prototype 对象等于另一个类型的实例，此时的 prototype 对象因为是实例，因此将包含一个指向另一个原型的指针，相应地另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与类型的链条。这就是原型链的基本概念

**现实类比：祖传技艺**

假设你家是木匠世家，你学会了父亲的木工技术，你的父亲又从祖父那里学来的。

- **你会做桌子**（你的能力）。
- **如果你不会做椅子，你会问你的父亲**（向上一层找）。
- **如果你的父亲也不会，他会问祖父**（继续往上找）。

在 JavaScript 里：

- **如果对象本身没有某个方法，它会去它的原型（`__proto__`）里找**。
- **如果原型也找不到，就继续沿着原型链往上找，直到 `null`（顶层）**。

```js
function Super(){

};


function Middle(){

};

function Sub(){

};

Middle.prototype = new Super();

Sub.prototype = new Middle();

var suber = new Sub();
```

![配图18-8](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/peitu18-8.png) 

## 7. 生成随机数的各种方法？

Math.random()

```js
// 生成 0 到 1 之间的随机小数
console.log(Math.random()); // 例如：0.56782340912

// 生成 0 到 N 之间的随机整数
function getRandomInt(N) {
    return Math.floor(Math.random() * N);
}
console.log(getRandomInt(10)); // 生成 0~9 之间的随机整数

// 生成 [min, max] 范围的随机整数
function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomIntInRange(5, 15)); // 生成 5~15 之间的随机整数

```



## 8. 如何实现数组的随机排序？





# Node.js (Express.js)



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

![image-20250221210117082](D:\Notes\web-notes\assets\image-20250221210117082.png)

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

create through guthub

![image-20250221210249013](D:\Notes\web-notes\assets\image-20250221210249013.png)

**Environment variables**

NEXT_PUBLIC_API_BASE_URL

the value based on ipv4 address: http://ipv4

https://main.d1zvv01v2vt4p6.amplifyapp.com/

console:

![image-20250221210954122](D:\Notes\web-notes\assets\image-20250221210954122.png)

result:

![image-20250221210107578](D:\Notes\web-notes\assets\image-20250221210107578.png)

## Step5: API Gateway

![image-20250221211252931](D:\Notes\web-notes\assets\image-20250221211252931.png)

**API name**: api-nextjs-dashboard

![image-20250221211406787](D:\Notes\web-notes\assets\image-20250221211406787.png)

![image-20250221211439672](D:\Notes\web-notes\assets\image-20250221211439672.png)



![image-20250221211504967](D:\Notes\web-notes\assets\image-20250221211504967.png)

invoke url

https://zvmu9dnhfh.execute-api.ap-southeast-2.amazonaws.com/prod

![image-20250221211625730](D:\Notes\web-notes\assets\image-20250221211625730.png)

redeploy





result:

![image-20250221211826125](D:\Notes\web-notes\assets\image-20250221211826125.png)

## Step6: S3

create bucket: s3-nextjs-dashboard

![image-20250221212335587](D:\Notes\web-notes\assets\image-20250221212335587.png)

permission -> policy

```
{
    "Version": "2012-10-17",
    "Statement":[
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3-nextjs-dashboard/*"
        }
    ]
}
```

upload images

go to client -> next.config.mjs

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-nextjs-dashboard.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

