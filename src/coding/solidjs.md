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

SolidJS 的哲学就是 small and simple。所以用起来可能没有那么方便舒服，有的地方需要自己手操逻辑。

## Hooks

### createSignal

就是 useState。

### createContext

可以用来跨组件传输数据，不需要通过 props。

### createResource

可以用来执行 async 函数。SolidJS 对 async 支持算不上好，这可能是唯一的 async 执行器。

createResource 可以跟 Suspence 组件[配合使用](https://docs.solidjs.com/reference/components/suspense)。其实就是包装了一下 `res.loading` 的判断而已。

## components

SolidJS 也提供了一些内置组件，让写 Vue 的人倍感熟悉。

- `<Show when={...}></Show>`，v-if
- `<For each={...}></For>`，v-for

## Router

使用 [solid-router](https://github.com/solidjs/solid-router)，很简单。

## Icons

SolidJS [自带了一个图标库](https://solid-icons.vercel.app/)，图标非常全，使用也方便。
