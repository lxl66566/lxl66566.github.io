---
date: 2025-01-04
icon: brands fa-react
category:
  - 编程
tag:
  - 框架
  - 前端
---

# React

初学，包含的东西较少。等到我真正用 React 开发一个项目的时候，这一页的东西才会变多起来。

## JSX 基础

JSX 是 React 的核心，JSX 将一个 html 标签也视为一个 js object。

- 多行 JSX 需要用括号包围；每个 JSX 只能是单标签，如果多标签则需要用 `<></>` 空标签包围。
- JSX 内插值（插表达式）使用单大括号。
- JSX 里的 class 要改为 className。
- JSX 里可以写内联 style，接受一个类似 CSS 的对象。
- JSX 里可以直接用 `<div {...object} />` 进行 props 传入的解构，非常方便。

JSX 能够非常灵活地组织组件，比 Vue 灵活太多了。

## 组件

一般来说只需要使用基于函数的 API。现在所有现代前端都在使用基于函数的 API，例如 Kotlin Compose UI，因为组合优于继承，灵活性非常强。

- React 每一个返回 JSX 对象的函数都是一个组件。
- 函数的第一个入参是 props。
- 如果要传递 JSX 给组件，默认传到 `props.children`。
- 组件间传值：
  - 父向子，props，没问题。
  - 子向父，回调函数。

## [React Hooks](https://zh-hans.react.dev/reference/react/hooks)

Hooks 是响应式的基础。React 内置了许多 Hooks，但是平常最常用的也就 useState，useRef，useEffect。

### useState

React 里最常用的响应式就是 useState 了。其返回两个值，`content` 是内容的引用 (getter)，`setContent` 是一个函数，用于改变内容 (setter)。这样可以比较明确地控制如何渲染 DOM 树。

```js
const [content, setContent] = useState("default content");
```

### useContext

用于跨任意层组件向子组件方向传数据。随便看一个 [usage](https://zh-hans.react.dev/reference/react/useContext#usage) 就会了。

React 19 后，可以用简化写法 `<Context>` 替代 `<Context.Provider>`。

### useRef

跟 Vue 的 ref 有很大区别，useRef 这里的 ref 是不会触发渲染的。

有一点跟 Vue 一样的就是 Vue 的 ref 需要 `.value` 获取内部值，而 useRef 需要 `.current` 获取。

### useCallback

包装函数，让组件重新渲染时，该函数不会重新创建，也就是保持同一个对象。可以用于 `memo`。

### useReducer

useReducer 和 useState 很像，只不过可以把状态更新逻辑从事件处理函数中移动到组件外部。[src](https://zh-hans.react.dev/reference/react/useReducer#adding-a-reducer-to-a-component)

## external

- [2023 再看 React 状态管理库](https://juejin.cn/post/7195513281228898363)
