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

SolidJS 是一个高性能轻量前端框架，其以 JSX 为核心，为 React 做了许多减法，少了很多难记的 Hooks，所以学起来非常快（不论有无 React 基础）。不过本文假设读者已经熟悉了 React 基础。

SolidJS 的哲学就是 small and simple。所以 React 高手用起来肯定没有那么方便舒服，很多地方需要自己手操低级逻辑。但是对新手来说是一件好事，SolidJS 的隐含条件少，不容易被框架坑。要说它的唯一缺点可能就是生态了，SolidJS 的包数量和可用性都要比 React 差上许多 ([ref](https://t.me/withabsolutex/2343))。

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

- `<Show when={...} fallback={...}></Show>`，v-if + v-else
- `<For each={...}></For>`，v-for

## 配套设施

SolidJS 虽然相对小众，但仍有着完善的生态系统。

- 组件库：[SolidUI](https://github.com/stefan-karger/solid-ui)，虽然我不太喜欢这个组件库的风格。
- Router：[solid-router](https://github.com/solidjs/solid-router)
- 图标库：[Solid Icons](https://solid-icons.vercel.app/)
- toast：[solid-toast](https://github.com/ardeora/solid-toast)
- Markdown 渲染：[solid-markdown](https://github.com/andi23rosca/solid-markdown)

这些基本都是事实标准，意味着如果你发现需要啥东西，不需要纠结用哪家的实现，用就完了。

但是很可惜，solid 用的人较少，导致很多库的 bug 都[没人修](https://t.me/withabsolutex/2343)。
