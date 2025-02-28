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



