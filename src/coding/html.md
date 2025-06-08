---
date: 2023-10-20
icon: brands fa-html5
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
- 快速部署（静态托管）或客户一键打开，无需依赖

缺点：

- [跨域访问限制](./nodejs.md#cors-policy)
- 性能差，浏览器里跑单线程比本机 python 代码慢多了。
- 比起框架，单 html 会比较麻烦。

## 杂

随便写点 html 相关的东西。

- `<script>` 要放末尾：因为 script 会阻断 html 的 parse 流程，影响性能和响应时间。

## 工具

现在我基本上都是引一个 vue.js/[solidjs](https://www.solidjs.com/guides/getting-started#buildless-options)（JSX 在纯 html 下还是麻烦一些），这些东西已经基本不再使用了。

作为 `<script>` 引入的 js 库。十年前引 js 基本上全是 jquery，不过现在谁还用这玩意啊。

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

## external

1. [you might not need jquery](https://youmightnotneedjquery.com/)
