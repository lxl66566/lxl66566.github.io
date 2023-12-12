---
date: 2023-10-20
icon: html
category:
  - 编程
tag:
  - 编程语言
---

# html

单 html 的优点：

- 对于比较简易的小玩意，写一个 html 单文件要比 GUI 应用简单很多。
- 小
- 跨平台
- 快速部署（静态托管）

缺点：

- [跨域访问限制](./nodejs.md#cors-policy)

## 工具

作为 `<script>` 引入的 js 库，好用。

- 界面构建，简化语法：
  - [vanjs](https://vanjs.org/)：reactive UI framework，不含 JSX。
    - 使用前建议看看 [about](https://vanjs.org/about)。vanjs 简化了创建 DOM 元素流程，并使用 js 对象存储并选择 DOM 元素，而不是靠选择器。
- 强化，但具有高复杂度：
  - [solidjs](https://www.solidjs.com/)
- markdown 解析
  - [marked.js](https://marked.js.org/)

## 我做的

一些方便单网页实现的小玩意。

- [Google 翻译 x 次](https://github.com/lxl66566/Google-translate-x-times)
- [table-sampling](https://github.com/lxl66566/table-sampling)：markdown 表格抽查器
