---
date: 2023-04-09
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# TypeScript

> 关于工具与包管理请[前往 node.js](./nodejs.md)

TypeScript 是在 JavaScript 基础上建立的一门语言，新增了类型控制，可以被编译为 JavaScript. 我是激进派，因此本文主要讲 TypeScript；JS 版本 >= ES6. ~~没有类型提示编程是真的难受啊，面对着无数的 _any_ 翻文档。。有的十年老库还基本没有文档。~~

> JavaScript 是符合 ECMAscript 标准规范的，一门弱类型的 GC 语言，又称 ECMAScript. 浏览器的默认语言。

## 环境

假设已经安装了 node.js。

```shell:no-line-numbers
npm i node-ts -g
```

然后便可使用 `node-ts xxx.ts` 运行了。

或者也可以用 `tsc` 转成 js 再运行[^1]。

[^1]: `tsc xxx.ts && node xxx.js`

## 语言基础

大部分语法跟其他语言挺像的。

### 判断

- 重点是 `==` 和 `===` 的区别。
  - 不等号：`!=`,`!==`

### 变量声明

> [菜鸟教程的类型声明](https://www.runoob.com/typescript/ts-variables.html)全是 var，难绷

不许用 var（暴论）。全部使用 `let` | `const`。[区别](https://www.tutorialsteacher.com/typescript/typescript-variable)

const 指的是指针不变，指向的值可以变。

### 遍历

注意 `for ... in ...` 和 `for ... of ...` 的区别；前者遍历 key，后者遍历 value

### Promise

异步，链式调用，异常处理，强大的语法。

### 语法糖

- `a ?? b`: `if(a) { return a; } else { return b; }`
- `&&`, `&&=`, `||=`, `?.`

## external

1. [The Concise TypeScript Book](https://github.com/gibbok/typescript-book)
