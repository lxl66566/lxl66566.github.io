---
date: 2023-04-09
icon: code
category:
  - 编程
tag:
  - 编程语言
  - 前端
---

# TypeScript

> 关于工具与包管理请[前往 node.js](./nodejs.md)

JavaScript 是符合 ECMAscript 标准规范的，一门弱类型的 GC 语言，又称 ECMAScript. 浏览器的默认语言。

TypeScript 是在 JavaScript 基础上建立的一门语言，新增了类型控制，可以被编译为 JavaScript。我是激进派，因此本文主要讲 TypeScript；JS 版本 >= ES6。

为什么你应该使用 TypeScript：

- 没有类型提示编程是真的难受啊，面对着无数的 _any_ 翻文档。。有的十年老库还基本没有文档。
- 只要写过一点 js 就知道 F12 面对莫名其妙报错的茫然，还有 `console.log` 打出 Undefined 的绝望。
- 我的主业是后端语言，Rust/C++/Java/Python 居多（Python 强制开启类型审查），因此我**深知编译期类型检查的重要性**。
- 想必大家看过的 js meme 图应该也不少了。至少 95% 的常见问题都是类型问题。![我们的 js 实在是太棒辣](/images/coding/tsjs/meme.jpg)

使用 TypeScript 初期肯定是会降低开发效率的，这是一个不得不跨越的坎。我之前是摸索过来的，在此有一个建议：去系统学习一下 TypeScript，系统学习后效率能提升，然后每次写前端都会优先用 TypeScript，最终才可以进入正向循环。平常使用 JS 的人需要有走出舒适圈的勇气。

## 开发环境

首先装一个 [js 运行时](./nodejs.md)是必不可少的。

### 运行 JavaScript

`node xxx.js`

### 运行 TypeScript

::: tabs

@tab 原生直接运行

[Since V22.6.0, Node.js has experimental support for some TypeScript syntax.](https://nodejs.org/en/learn/typescript/run-natively)

```shell
node --experimental-strip-types example.ts
```

@tab 使用其他运行时

越激进的运行时，对 ts 的支持越好。毕竟 ts 本来就是激进的人去使用的。

- deno：deno 自带了对 ts 的支持。
  ```shell
  deno xxx.ts
  ```

@tab 编译后运行

```shell
npm i tsc -g
tsc xxx.ts      # 生成同名 .js 文件
node xxx.js
```

@tab node-ts 直接运行

```shell
npm i node-ts -g
node-ts xxx.ts
```

:::

### 在框架中使用 ts

更常见的是框架已经帮忙做好了 ts 的编译与集成，例如 vite。只需要写 `tsconfig.json` 即可开启易用的集成模式。当然，例如 Vue 框架在创建时就可以选择使用 ts 或 js，我们甚至连 `tsconfig.json` 都不需要自己手写。

具体的，在 Vue 组件中只需要 `<script lang="ts">` 加一行 lang 就可以选择语言，非常方便。

### Formatter

JS/TS 句末分号可加可不加，但是一个好的 formatter 都会帮你加。

业界常用的有 Prettier, ESLint, [Biome](https://github.com/biomejs/biome/blob/main/packages/@biomejs/biome/README.zh-CN.md)（原 Rome）等。ESLint 支持复杂的自定义化，而其他两个都是较为统一的风格。我目前使用 Biome，因为它 written in Rust。

这些 formatter 可以被安装到项目中作为一个 dev dependency，也可以只当成 vscode 插件使用。前者的好处是可以统一整个项目的代码风格，而后者就适合跨项目的个人应用。由于我基本没有与人协作开发经历，我使用 vscode biome 插件。

## 语言基础

我把某些 TS 语言特性也写在此处了。

JS 大部分语法跟其他语言挺像的。

### 判断

- 重点是 `==` 和 `===` 的区别，后者会判断类型。尽可能用后者。
  - 几乎是约定俗成的规矩。现在的 linter 如果不用后者就会爆 warning。
  - 不等号：`!=`,`!==`
- 空数组转为 bool 是 true。判断数组是否为空，可以 `if (arr?.length)`。

### 变量声明

> [菜鸟教程的类型声明](https://www.runoob.com/typescript/ts-variables.html)全是 var，难绷，你都 ts 了怎么还不端上 ES6 啊（恼

一句话：不许用 var。全部使用 `let` | `const`。[区别](https://www.tutorialsteacher.com/typescript/typescript-variable)

const 指的是指针不变（不能 reassign），但指向的值可以变。不过如果指向基本类型（例如 `const num = 2`）的话也是不能变的。

- 为什么不许用 var 呢：
  - 由于 var 是全局的，因此在执行 js 脚本时有一个预处理过程，需要对 var 进行变量提升，物理性将所有 var 变量放到脚本开头执行。这个预处理可能对浏览器性能造成一定影响。
  - 全局作用域经常导致变量名冲突。这在我调用一些第三方老库 script 的时候特别明显，例如我被 opencv.js 坑过。
  - 不需要先声明变量就可以使用的语言貌似只有 ECMAScript 吧。。。太 tm 抽象了。

#### 可变性

写过 Rust/C++ 的小可爱都会额外关注变量的可变性。刚才说到 const 可以让基础变量不可变，对象不可 reassign，但是如果我需要让对象内部值也不可变呢？

```js
const a = {
  a: "asd",
  b: "123",
};
Object.freeze(a); // 冻结，此时 a.a, a.b 均不可变，a 也无法新增其他属性。
```

如果我要其中某个值可变，某个值不可变呢？

```js
const a: T = {};
Object.defineProperty(a, "a", {
  value: "asd",
  writable: true, // 允许修改
  configurable: true, // 允许重新定义属性
  enumerable: true,
});
Object.defineProperty(a, "b", {
  value: "123",
  writable: false, // 不允许修改
  configurable: false, // 不允许重新定义属性
  enumerable: true,
});
```

当然，这些都是 JS 的用法，即使程序中修改了属性，也只会在运行时报错。TS 中有更强大的 Readonly 类型和 readonly 关键字，可以在编译时就抛出错误：

```ts
const a: { readonly a: string; readonly b: string } = {
  a: "asd",
  b: "123",
};

// 或者更方便的：
const a: Readonly<{ a: string; b: string }> = {
  a: "asd",
  b: "123",
};
```

### 遍历

- 注意 `for (... in ...)` 和 `for (... of ...)` 的区别；前者遍历 key，后者遍历 value。
- 当然，对于 Array 也可以使用 `forEach` 写成函数式调用。

### 函数

两种定义函数的方法：`function xxx() {}` 和 `const xxx = () => {}`。前者是正常写法，后者是把 lambda 绑定到变量上的写法。至于用哪个，我认为都可以，没有孰优孰劣。

js 的 lambda 函数是完全体，比 python 的傻逼单行 lambda 强多了。

### Promise

异步，链式调用，异常处理，强大的语法。

### 语法糖

- `a ?? b`: `if(a) { return a; } else { return b; }`
- `&&`, `&&=`, `||=`, `?.`

### 面向对象

ES5 的时候[有一些 hack 方法](https://github.com/yygmind/blog/issues/7)实现继承，有点过于底层了所以这里不考虑。

ES6 正式支持了面向对象，给了一系列面向对象接口，跟 Java 实在是太像了。

- 构造函数是 `constructor (...) {}`，调用父类构造函数是 `super()`；由于是 GC 语言，所以不支持析构函数。
- 支持单继承和抽象类，不支持多继承；类继承和实现接口都用 `extends`。
- 可以方便地写 setter/getter，就是把 `function` 关键字换成 `set`/`get` 即可。调用时无需添加函数的括号，就类似 python `@property` 装饰。

## TS 类型基础

TS 的类型系统是**图灵完备**的。因此网上有一大堆 TS 类型体操天书，已经见怪不怪了。相比之下 Rust 的类型系统简直就是个弟弟，连 trait 相减和取补都做不到。

类型遵循集合论。

```ts
type A = number | null; // 并集
type A = { a: number } & { b: number }; // 交集

// Omit 用于排除属性
type Person = {
  name: string;
  age: number;
  address: string;
};
type WithoutAddress = Omit<Person, "address">; // 结果: { name: string; age: number; }

// Exclude 用于排除类型
type SomeTypes = string | number | boolean;
type OnlyNumberOrBoolean = Exclude<SomeTypes, string>; // 结果: number | boolean

// Pick 用于仅包含类型
type OnlyNameAndAge = Pick<Person, "name" | "age">;
```

### 数据类型

这是 TS 基础中的基础。基础类型就不说了，容器有数组（Array），元组；TS 比起 JS 还多了 enum。

### Interface VS Type

具体可以看 [I Cannot Believe TypeScript Recommends You Do This!](https://www.youtube.com/watch?v=oiFo2z8ILNo)及其评论区。我个人是认为，只要是 Object，有继承组合就用 Interface，其他就用 type。

## 数据结构

原生 JS 里有 Array, Object, Map, Set 等数据结构。但是没有 Queue。

Object 是无序的，（ES6 的）Map 和 Set 是有序的（插入顺序）。

### Array

- 初始化：`Array(x)` 指定大小，但是没有元素。初始化元素需要 `fill`。
  ```ts
  // 获取一个 range 数组
  cosnt arr = Array.from({ length: 10000 }, (_, i) => i);
  // 3x3 二维数组
  const arr: number[][] = Array(3)
    .fill(null)
    .map(() => Array(3).fill(0));
  // OR
  const arr = Array.from({ length: 3 }, () => Array(3).fill(0));
  ```
- Array 可以使用 shift/unshift 模拟 Queue，这两个操作是把所有元素向前/后移动，`O(n)` 复杂度，不能当真正的 queue 用。

### Generator

ES6 可以使用 `function*` 定义一个生成器，在函数内可以使用 `yield` 生成一个值。

## Benchmark

前端代码也注重性能，特别是像我这种纯静态博客，有很多数据是要放到浏览器加载时处理的。

很多时候由于对语言核心的不了解，我对代码性能有一些误判。此时就需要通过 benchmark 找到更好的解法，正所谓 bb is cheap, show me the benchmark。

我使用 [Tinybench](https://github.com/tinylibs/tinybench)，这玩意确实好用。只需要 `pnpm add -D tinybench`，然后再把 README 里的示例一粘贴，诶，数据就出来了。

这里还有一个 example，是我做的 [TypeScript partition array into two by condition](https://gist.github.com/lxl66566/4dbc102a72efcd64ecfb7df9d5a62970) 的 benchmark。

## external

1. [The Concise TypeScript Book](https://github.com/gibbok/typescript-book)
2. [木易杨 的博客](https://github.com/yygmind/blog)，但是很久没更新了。
