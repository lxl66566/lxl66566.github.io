---
date: 2025-01-04
icon: arrow-up-right-dots
category:
  - 编程
tag:
  - 框架
  - 前端
---

# [SolidJS](https://www.solidjs.com/)

SolidJS 是一个高性能轻量前端框架，其以 JSX 为核心，为 React 做了许多减法，少了很多难记的 Hooks，所以上手非常快。不过本文假设读者已经熟悉了 JSX 与 React 基础。

SolidJS 的哲学是 small and simple，优势就是打包体积小和性能好，不过很多地方需要自己手操低级逻辑。如果你深入理解了 SolidJS（因为内容不太多所以不难），也不容易被各种隐含逻辑坑到。

SolidJS 的一个缺点是生态比较差，包数量和可用性都要比 React 差上许多 ([ref](https://t.me/withabsolutex/2343))。

## props 与响应性

在 React 中，有一个核心理念：`UI = f(state)`。这意味着整个组件的输出（UI）被看作是其当前 state 和 props 的一个函数。当 state 或 props 改变时，React 的做法不是去找到是哪个具体的值变了，而是重新执行整个组件函数，生成一个新的 Virtual DOM，然后通过比对新旧 VDOM，最后只把差异部分更新到真实的 DOM 上。

然而，**SolidJS 的组件函数本身永远只运行一次**。要让子组件随父组件的 signal 改变而重新渲染，需要传入 `Accessor<T>` 保持响应性。但是在任何一层子组件使用 `const { ... } = props` 解构，都会丢失 props 的响应性，导致子组件无法正确重新渲染。

要在保证响应性的同时解构 props，需要使用 SolidJS 提供的 `splitProps`。举个例子：

```tsx
interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element;
  variant?: "primary" | "secondary" | "square" | "operator";
}
const Button: Component<ButtonProps> = (props) => {
  // 'local' 对象会包含这些 props，并且它们仍然是响应式的
  // 'rest' 对象会包含所有剩余的 props
  const [local, rest] = splitProps(props, ["children", "variant"]);
  ...
}
```

如果你在调试 SolidJS 项目时发现子组件没有正确渲染，请优先检查响应性。

## Hooks

### createSignal

就是 useState，最基本的响应式组成部分。

- 每一次调用 `setState` 都会触发重新渲染。如果需要像 React 那样在值变化时才渲染，需要配合 `createMemo`。

### [createMemo](https://docs.solidjs.com/reference/basic-reactivity/create-memo)

跟其他语言一样，createMemo 是一个 input -> output 的缓存。组件监听 createMemo 的 output，如果 input 变了但是 output 不变，就不会触发重新渲染，节省性能。

### [createStore](https://docs.solidjs.com/reference/store-utilities/create-store)

创建一个深层响应式对象，实现细粒度响应性（修改深层属性只会影响依赖了这个属性的节点）。一般用来存一些生命周期比较长、贯穿多个页面的东西，例如全局配置。

- 由于该对象任何部分也都是响应式的，实际使用数据本身时要去掉这层 proxy，需要使用 `unwrap` 函数。

### [createContext](https://docs.solidjs.com/reference/component-apis/create-context)

用来跨组件传输数据，不需要通过 props。只要在 provider 内都能拿到 context。

- 一般可以配合 createStore 实现全局状态管理：createStore 负责响应式，createContext 负责让其他组件能拿到数据。
  - 一般的 i18n，theme 都是这样实现的。

### [createResource](https://docs.solidjs.com/reference/basic-reactivity/create-resource)

一个 async 执行器的简单包装，可以跟踪执行状态。当然直接用 signal + 回调也是没有任何问题的。好像现在更多还是直接 signal，并没有太麻烦，还能减少学习成本。就是代码乱一些。

createResource 可以跟 Suspence 组件[配合使用](https://docs.solidjs.com/reference/components/suspense)。其实就是包装了一下 `res.loading` 的判断而已。

### onMount

因为每个组件函数只会执行一次，你可以直接将相关逻辑放在组件里；当然 SolidJS 也提供了 onMount hook 用于分离逻辑。

- 其实还是有一些细微区别的，如果你要访问浏览器 API/DOM 信息，就得写在 onMount 里。

## 杂

- SolidJS 的组件导出必须使用大写字母开头，否则 tsx 不会将其识别为组件。
- SolidJS 的 createEffect、onCleanup 等必须在同步的组件构建阶段或父级 Effect 中执行，才能正确绑定。不允许在 async 函数中执行。

## components

SolidJS 也提供了一些内置组件，让写 Vue 的人倍感熟悉。

<!-- dprint-ignore-start -->

- `<Show when={...} fallback={...}></Show>`，v-if + v-else
- `<For each={...}></For>`，v-for
- `<ErrorBoundary fallback={(err, reset) => <div></div>}></ErrorBoundary>`，内层如果抛出错误，可以用这个组件显示另一些错误信息。
- Switch：就类似 js 或其他语言的 switch，从上到下顺序执行判断。
  ```jsx
  <Switch fallback={<NotFound />}>
    <Match when={status() === 'loading'}><Loading /></Match>
    <Match when={status() === 'success'}><Data /></Match>
    <Match when={status() === 'error'}><Error /></Match>
  </Switch>
  ```

<!-- dprint-ignore-end -->

## functions

SolidJS 还提供一些实用函数。

### splitProps & mergeProps

ts/js 辅助函数。splitProps 从对象里分离出某些字段，mergeProps 用于合并对象字段（从左到右合并，右侧优先）。

splitProps / mergeProps 存在的意义在于保持子对象的响应性，在[开头](#props-与响应性)说过了。

### reconcile

性能拯救者，相当魔法的一个函数。

reconcile 解决了细粒度的响应式更新问题，把整个对象销毁 + 创建变成每个子对象与深层对象的比对与替换。基本上只要你用了 `createStore`，然后有任何后端响应/前端重新构造对象，需要整体替换这个 store 的场景，直接套一个 reconcile 即可。

reconcile 如果用于数组细粒度更新，则最好指定 key，否则可能退化回原先的全量构造。

## 深入 SolidJS

React 的 FC (JSX 概念，FunctionComponent) 既是 Setup，也是 Render。状态每次改变，整个函数都会重新执行一遍，生成新的 Virtual DOM，然后进行 Diff。

SolidJS 的 FC 仅仅是 Setup 函数，且只执行一次。生成代码的示例如下：

```js
// 对于这样的基本代码
function Counter() {
  const [count, setCount] = createSignal(0);
  return <div>Count: {count()}</div>;
}

// SolidJS 编译器会生成这样的代码
function Counter() {
  const [count, setCount] = createSignal(0);

  // 1. 创建真实 DOM
  const _el = document.createElement("div");

  // 2. 建立细粒度响应式联系 (Effect)
  // 只要 count() 变化，只更新这个 textContent，不重新执行 Counter 函数
  createEffect(() => {
    _el.textContent = `Count: ${count()}`;
  });

  return _el;
}
```

因为只执行一次，所以 FC 不允许 early return。如果 FC 进行了 early return，则 return 之后的 DOM 可能根本不会被创建，也就无从渲染与更新。也同时因为只执行一次，UI 的插入、移动和销毁必须通过直接操作真实 DOM 来完成，所以 SolidJS 才会提供一堆内置的 [components](#components)，用来管理响应式依赖的生命周期（变化监听、条件计算、清理等）。

比如下面的代码：

```jsx
<Show when={isLoggedIn()} fallback={<Login />}>
  <Dashboard />
</Show>;
```

Dashboard 内可能有一些副作用，所以需要用 Show 在挂载/卸载组件的时候也顺便处理这些副作用。

## 配套设施

SolidJS 虽然相对小众，但仍有着完善的生态系统。

- 组件库：[SolidUI](https://github.com/stefan-karger/solid-ui)，虽然我不太喜欢这个组件库的风格。
- Router：[solid-router](https://github.com/solidjs/solid-router)
- 图标库：[Solid Icons](https://solid-icons.vercel.app/)
- toast：[solid-toast](https://github.com/ardeora/solid-toast)
- Markdown 渲染：[solid-markdown](https://github.com/andi23rosca/solid-markdown)

这些基本都是事实标准，意味着如果你发现需要啥东西，不需要纠结用哪家的实现，用就完了。

但是很可惜，solid 用的人较少，导致很多库的 bug 都[没人修](https://t.me/withabsolutex/2343)。
