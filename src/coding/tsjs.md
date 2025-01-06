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

业界常用的有 Prettier, ESLint, [Biome](https://github.com/biomejs/biome/blob/main/packages/@biomejs/biome/README.zh-CN.md)（原 Rome）等。

这些 formatter 可以被安装到项目中作为一个 dev dependency，也可以只当成 vscode 插件使用。前者的好处是可以统一整个项目的代码风格，而后者就适合跨项目的个人应用。由于我基本没有与人协作开发经历，我使用 vscode 插件。

::: tabs

@tab Prettier

老牌 formatter 了，支持非常多的格式；风格也比较统一。

@tab biome

Biome 是 Rome 重生版，使用 Biome 的一大理由是 written in Rust。但是其默认的设置有一些霸道，我其实不太喜欢，这里举一些例子：默认用 tab 而不是 2space，windows 上也用 LF 而不是 CRLF。

:::

### Linter

拥有一个可配置的 linter 是比较重要的。

::: tabs

@tab oxlint

oxlint 是一个比较新的 linter，[oxc](https://github.com/oxc-project/oxc) 的一部分。而 oxc 也是 rust 写的，据说比 biome 还快。在 vscode 使用只需要安装 oxc 插件即可。

oxc 虽然说会支持 formatter，但毕竟还在开发早期，目前尚未实装。

@tab biome

biome 本身也是 linter。

在项目根目录下放一个 `biome.json` 即可作为其配置。我习惯禁用一些 lint rules，并且设置一些东西。这里是我的配置：

```json
{
  "linter": {
    "rules": {
      "style": {
        "noNonNullAssertion": "off"
      }
    }
  }
}
```

具体的 rules 在[这里](https://biomejs.dev/linter/rules/)。

类似 Rust 的 `cargo fmt && clippy fix`，biome 也有一键对项目进行 format + fix 的指令，非常好用：`biome check --write --unsafe .`

@tab ESLint

ESLint 支持复杂的自定义化。不过我没用过。

:::

## 语言基础

我把某些 TS 语言特性也写在此处了。

JS 大部分语法跟其他语言挺像的。

### 判断

- 重点是 `==` 和 `===` 的区别，后者会判断类型。尽可能用后者。
  - 几乎是约定俗成的规矩。现在的 linter 如果不用后者就会爆 warning。
  - 不等号：`!=`,`!==`
- 空数组转为 bool 是 true。判断数组是否为空，可以 `if (arr?.length)`。
- 虽然 JS 的糖够多了，但是有一个关键的地方没有：在 if 语句中定义局部变量同时检查非空。例如我想实现这样的效果：
  ```ts
  // shift() 返回 T | undefined，因此需要判断来避免类型问题
  if (const x = current_route.shift()) {
    do_something(x);
  }
  ```

### 变量

#### 声明

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

当然，typescript 中也可以使用 `Object.freeze`：

```ts
const a = Object.freeze({
  a: "asd",
  b: "123",
});
```

但是 `Object.freeze` 只会对 object 的 shallow 值进行 readonly 处理，对于深层的嵌套 object 就不行了。这时候可以用终极法宝 `as const`：

```ts
const a = {
  a: "asd",
  b: "123",
  deep: {
    s: "asd",
  },
} as const;
```

这样所有的 deep 遍历的 object 都是不可变的。

#### 所有权

JS/TS 的变量所有权与容器所有权有点乱。主要还是没有一个官方提供的 deepcopy 实现，否则也不会出现经典的 `JSON.parse(JSON.stringify(origin))`。。

```ts
// shallow copy Array
const shallowCopy = [...original]; // 这样的 shallow copy 会丢失长度。如果要求定长数组，需要再 as 强转一下。
const shallowCopy = Object.assign([], original);
// shallow copy Object
const shallowCopy = { ...original };
const shallowCopy = Object.assign({}, original);
```

### object

- 合并两个 object：`{...obj1, ...obj2}`

### 遍历

- 注意 `for (... in ...)` 和 `for (... of ...)` 的区别；前者遍历 key，后者遍历 value。
- 当然，对于 Array 也可以使用 `forEach` 写成函数式调用。

### 排序

某个著名 meme 出自此处：

```ts
[-2, 5, -7, 1].sort(); //  result: [ -2, -7, 1, 5 ]
```

如果 sort 内不给参数，默认转为字符串排序。所以需要 `.sort((a, b) => a - b)` 才能得到正确结果。

### 函数

两种定义函数的方法：`function xxx() {}` 和 `const xxx = () => {}`。前者是正常写法，后者是把 lambda 绑定到变量上的写法。至于用哪个，我认为都可以，没有孰优孰劣。

js 的 lambda 函数是完全体，比 python 的傻逼单行 lambda 强多了。而且 ts lambda 也可以加泛型，加在入参括号的前面。

### this

this 指向的对象与声明位置无关，其总是指向调用对象；如果没有调用对象，就指向 window。

### 异步

最早的 js 全靠回调函数实现异步，但是发现很多逻辑搅在一起，深层嵌套，非常混乱。称为回调地狱。

现在使用 Promise 模型实现异步，具有链式调用与异常处理，比较方便。

async/await 是一个对 Promise 的语法糖，不是一个全新的模型。不过 async/await 的思想已经应用到了许多现代编程语言上。

#### async/await

async 函数返回一个 Promise。await 只能在 async 函数中使用，其等待这个 Promise 执行完毕并获取返回值。

如果需要捕获 async 函数中可能出现的 reject，则需要在外面套 try。我感觉这种方式还不如使用原始的 `Promise.then.catch`。

#### 同时执行

Promise 提供了一个非常便捷的方式同时执行一批异步函数：`Promise.all()`。并且直接调用一个 async function，无需 await 其就能开始执行，这也是区别于 rust 的一点。

### 语法糖

- `a ?? b`: `if(a) { return a; } else { return b; }`
- `&&`, `&&=`, `||=`, `?.`

### 面向对象

ES5 的时候[有一些 hack 方法](https://github.com/yygmind/blog/issues/7)实现继承，有点过于底层了所以这里不考虑。

ES6 正式支持了面向对象，给了一系列面向对象接口，跟 Java 实在是太像了。

- 构造函数是 `constructor (...) {}`，调用父类构造函数是 `super()`；由于是 GC 语言，所以不支持析构函数。
- 支持单继承和抽象类，不支持多继承；类继承和实现接口都用 `extends`。
- 可以方便地写 setter/getter，就是把 `function` 关键字换成 `set`/`get` 即可。调用时无需添加函数的括号，就类似 python `@property` 装饰。

#### 内置 Trait

因为 trait 就是 interface，实现我们自定义的 trait 就是 extends 一个 interface 完事。但是有一些系统内置 trait，例如 iterator，是不能通过 extends 实现的，例如 `Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.toStringTag`。这时候需要用另一种写法实现，见下面的 [迭代器](#迭代器)。

### 迭代器

JS/TS 的迭代器实在是太弱了，基本只能 `for .. of`。但是[有一个 proposal](https://github.com/tc39/proposal-iterator-helpers) 可能会解决这个问题。

为自己的 class 实现迭代器：

```ts
class Frame implements IterableIterator<number> {
  public num = 5;
  public next(): IteratorResult<number> {
    if (this.num < 10) {
      this.num++;
      return {
        done: false,
        value: this.num,
      };
    }
    return {
      done: true,
      value: undefined,
    };
  }
  [Symbol.iterator]() {
    return this;
  }
}

const f = new Frame();
console.log(f.next().value);
for (const i of f) {
  console.log(i);
}
```

（吐槽一下，这个 `IteratorResult` 的类型有点大病，`done = true` 了还强制要求给出 `value`）

## TS 类型

TS 的类型系统是**图灵完备**的。因此网上有一大堆 TS 类型体操天书，已经见怪不怪了。相比之下 Rust 的类型系统简直就是个弟弟，连 trait 相减和取补都做不到。

我非常喜欢 TS 的类型系统，因为写得非常自然流畅。

### 基础

类型遵循集合论。

```ts
type A = number | null; // 并集
type A = { a: number } & { b: number }; // 交集
type B = A & {}; // `{}` 代表不为 null 和 undefined 的其他类型

type Person = {
  name: string;
  age: number;
  address: string;
};

// Omit 用于排除属性类型
type WithoutAddress = Omit<Person, "address">; // 结果: { name: string; age: number; }
// Pick 用于包含属性类型
type OnlyNameAndAge = Pick<Person, "name" | "age">;

type SomeTypes = string | number | boolean;
// Exclude 用于排除类型（补集）
type OnlyNumberOrBoolean = Exclude<SomeTypes, string>; // 结果: number | boolean
// Extract 用于提取相同部分（交集）
type StringOrNumber = Extract<SomeTypes, string | boolean | null>; // 结果: string | boolean
```

#### 数据类型

这是 TS 基础中的基础。基础类型就不说了，容器有数组（Array），元组；TS 比起 JS 还多了 enum。

- 元组实际上只是数组的一个特例；TS 对元组的数组操作是允许的，这意味着可以改变元组内实际的元素个数。我不喜欢这样。
  ```ts
  type a = [number, string];
  const x: a = [1, "2"];
  x.push(3); // [1, "2", 3]
  x.pop();
  ```
- 函数：在 interface 中，函数的类型也可以写成两种形式，一般推荐使用箭头型。([reason](https://www.bilibili.com/video/av1850626922/))

#### Interface VS Type

具体可以看 [I Cannot Believe TypeScript Recommends You Do This!](https://www.youtube.com/watch?v=oiFo2z8ILNo)及其评论区。我个人是认为，只要是 Object，有继承组合就用 Interface，其他就用 type。

#### cast

可以使用 as 转换类型，转换的类型之间需要有一些关联（重叠）。

as 允许将具体类型转为更加非具体的类型，可能不是 expected 行为。如果要求必须是**完全相同**的类型转换，可以使用 [satisfies](https://tusharf5.com/posts/typescript-satisfies-operator/)。

### Wrappers

上面已经出现了 `Readonly`, `Omit`, `Exclude` 和 `Pick`。实际上 TS 还有其他的好用 wrappers：

- `Required<T>`：将类型 T 中的所有属性变为不可缺的。（单层，非递归）
- `Partial<T>`：将类型 T 中的所有属性变为可选的。
- `Record<K, T>`：用于创建一个对象类型，其中 K 是属性键的类型，T 是属性值的类型。
- `NonNullable<T>`：排除类型中的 null 和 undefined。

还有函数 parts 类型提取：

```ts
const fun = (a: number, b: number) => {
  return a + b;
};
type Return = ReturnType<typeof fun>; // number
type Params = Parameters<typeof fun>; // [number, number]
```

同样的还有提取构造函数类型，提取实例类型，提取 Promise parts 类型的，因为用的少，这里不说了。

### 糖

- 在数据后加 `!` 是非空断言，可以将 `T | undefined` 强转为 `T`。但是在 biome linter 里非空断言默认禁用。我个人还是希望允许非空断言的。
  - 如果不能突破 linter，那就只能在实例后面加 `as T` 了。

### 提取

TS 有 typeof 关键字用于提取一个已有结构的类型。特别的，还有 keyof 可以从 Object 类型中提取出所有可能的 key 类型，例如

```ts
const a = {
  a: 1,
  b: 2,
} as const;
type MyType = keyof typeof a; // MyType = "a" | "b"
// 于是我们甚至可以像这样用:
type ValueType = (typeof a)[keyof typeof a]; // ValueType = 1 | 2
```

### 泛型

泛型的语法很简单，这里跳过。lambda 也可以是泛型，只要在 `(..)` 前面添加 `<T>` 即可。

TS 可以执行泛型约束，而且使用方式非常简单。例如约束某泛型需要能够拿到 `.length`，我们不必去查标准库中拥有 length 的 interface 是什么。只需要：

```ts
function test<T extends { length: number }>(x: T) {
  return x.length;
}
// OK
test([1, 2, 3]);
test("123");
test({ length: 3 });

// ERR
test(123);
```

这种类型处理方式其实非常符合我之前设计编程语言的想法：只需要声明“我想要什么样的类型”，而不是“我能使用什么类型”。

### 类型魔法

- 接收一个不可为空的数组：
  ```ts
  function f<Arr extends [number, ...number[]]>(arr: Arr) {}
  f([]); // err
  f([1, 2]); // ok
  ```
- 更多字符串约束：
  ```ts
  type a = `${string}xxx`; // 表示此类型的值只能是匹配 `.*xxx` 的字符串
  const b: a = "asdxxx";
  ```

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

## 其他魔法

### declare

declare 用于声明一个编译期没有实现，但是运行期实现的对象，以消除编译错误。

特别的，declare 还可以用来给内置类型添加成员函数。

```ts
declare global {
  interface Array<T> {
    fun(): void;
  }
}
Array.prototype.fun = function () {
  console.log("xxx", this);
};
```

可惜的是不能为特定的 `Array<SomeType>` 添加函数，并且必需在 module 里才能用。

## Test

JS 的测试框架里，我比较喜欢 [Vitest](https://cn.vitest.dev/guide/)。毕竟文档不错，只看这一页基本就掌握了写单元测试的方式了。

## Benchmark

前端代码也注重性能，特别是像我这种纯静态博客，有很多数据是要放到浏览器加载时处理的。

很多时候由于对语言核心的不了解，我对代码性能有一些误判。此时就需要通过 benchmark 找到更好的解法，正所谓 bb is cheap, show me the benchmark。

我使用 [Tinybench](https://github.com/tinylibs/tinybench)，这玩意确实好用。只需要 `pnpm add -D tinybench`，然后再把 README 里的示例一粘贴，诶，数据就出来了。

这里还有一个 example，是我做的 [TypeScript partition array into two by condition](https://gist.github.com/lxl66566/4dbc102a72efcd64ecfb7df9d5a62970) 的 benchmark。

## external

1. [The Concise TypeScript Book](https://github.com/gibbok/typescript-book)
2. [木易杨 的博客](https://github.com/yygmind/blog)，但是很久没更新了。
