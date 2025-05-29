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

SolidJS 是一个轻量级前端框架，其以 JSX 为核心，为 React 做了许多减法，少了很多难记的 Hooks，所以学起来非常快（不论有无 React 基础）。不过本文假设读者已经熟悉了 React 基础。

SolidJS 的哲学就是 small and simple。所以 React 高手用起来肯定没有那么方便舒服，很多地方需要自己手操低级逻辑。但是对新手来说是一件好事，SolidJS 的隐含条件少，不容易被框架坑。要说它的唯一缺点可能就是生态了，SolidJS 的包数量和可用性都要比 React 差上许多 ([ref](https://t.me/withabsolutex/2343))。

## Hooks

### createSignal

就是 useState，最基本的响应式组成部分。

每一次调用 `setState` 都会触发重新渲染。如果需要像 React 那样在值变化时才渲染，需要配合 `createMemo`。

### createContext

可以用来跨组件传输数据，不需要通过 props。

### createResource

可以用来执行 async 函数。SolidJS 对 async 支持算不上好，这可能是唯一的 async 执行器。

createResource 可以跟 Suspence 组件[配合使用](https://docs.solidjs.com/reference/components/suspense)。其实就是包装了一下 `res.loading` 的判断而已。

## 杂

- SolidJS 的组件导出必须使用大写字母开头，否则 tsx 不会将其识别为组件。

## components

SolidJS 也提供了一些内置组件，让写 Vue 的人倍感熟悉。

- `<Show when={...} fallback={...}></Show>`，v-if + v-else
- `<For each={...}></For>`，v-for

## 配套设施

SolidJS 虽然相对小众，但仍有着完善的生态系统。

- 组件库：[SolidUI](https://github.com/stefan-karger/solid-ui)
- Router：[solid-router](https://github.com/solidjs/solid-router)
- 图标库：[Solid Icons](https://solid-icons.vercel.app/)
- Markdown 渲染：[solid-markdown](https://github.com/andi23rosca/solid-markdown)

但是很可惜，solid 用的人较少，导致很多库的 bug 都[没人修](https://t.me/withabsolutex/2343)。
