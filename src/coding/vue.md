---
date: 2024-10-18
icon: brands fa-vuejs
category:
  - 编程
tag:
  - 框架
  - 前端
---

# Vue.js

前端技术栈里，我最熟悉的肯定就是 vue 了，这两年折腾博客不是白折腾的。但是博客主要学习的是 SFC 组件，因此我到现在对 Vue 的核心并不是非常了解。不过姑且也开一篇文章记录技巧和踩坑吧。

## Vue 2 与 Vue 3

Vue 当前版本迭代到 Vue 3。但是如果上网问 GPT，给出的答案基本全是 Vue 2 的答案。截至 2024.10 的现在，本博客的所有组件仍然是 Vue 2 写成的。

Vue 3 基本上兼容 Vue 2 的写法。当我尝试了一下 Vue 3 语法后我感觉确实不错，比 Vue 2 要灵活多了。

### 迁移到 Vue 3

Vue 3 的所有函数和导出全部写在 `setup()` 里，也可以使用 `<script setup>` 语法糖，免去两层嵌套和手动导出。

Vue 2 使用大量的 `this.$set` 进行组件状态更新和重新渲染；Vue 3 只需要把变量声明为 ref/reactive 即可。具体用法和 android 差不多，ref 必需取 `.value`，是浅层的变更追踪；reactive 主要用于各种对象与容器，是深层变更追踪，reactive 对象本身是一个 proxy 而不是原先的类型。

## 基础

每个 `.vue` 组件由 template, script, style 三部分组成。

### template

- template 里使用 `:` (v-bind) 进行函数调用。只写函数名则只调用，不拿返回值；加了括号是拿返回值。

### style

请务必使用 `<style scoped>`！避免 css 污染其他样式。
