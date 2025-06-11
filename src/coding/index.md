---
date: 2023-04-09
icon: code
category:
  - 编程
  - 导航
tag:
  - 编程语言
---

# 编程

## 写在前面

<!-- ::: details 过激言论，谨慎查看
你国计算机教育就是一坨屎（我是说绝大多数的大学校）。思政课先不说，为什么要学大学物理，大物实验，数字电路？编程语言为什么还在用上古版本？
::: -->

编程领域，本人比较喜欢 ToC 软件开发[^2]，实用至上，自由主义，热爱开源。因为喜欢尝试 + 独立开发者，学的东西很多很杂。

[^2]: 深层原因可能是：[我太喜欢找茬辣！](../gossip/fuckxxx.md)

## 我的思考

1. [胡言乱语——编程语言哲学构想](./philosophy_of_PL.md)
2. [包管理器灵感](./package_manager.md)

## 语言有关

我的编程语言学习属于多而不精的类型。多语言学习者能在短时间内掌握一门新的语言，但这也意味着基础不够扎实，缺乏经验等。因此需要多做项目以降低劣势。

多语言只是手段，目的是为了开拓视野，总结出不同语言中的共性[^1]。编程学习不能仅仅“见树”，而需要“见森林”。希望我不会绕到语言学习的圈子里。

[^1]: 写 typst 有感：多语言学习者在面对未知的 DSL 时可以更加从容（）

### 学习阶段

1. [Rust](./Rust.md)
2. [C++](./Cpp.md)
3. [Python](./python.md)
4. [general shell script](./shell.md)
5. [Java](./java.md)
6. [TypeScript & JavaScript](./tsjs.md)

### ~~预~~放弃学习阶段

6. [C#](./csharp.md)
7. [kotlin](./kotlin.md)
8. [Clojure](./clojure.md)

### 新生语言

我并未系统学习以下新生语言，只是想了解其设计理念，并获取一些语言设计的灵感。

<dtls>

- [V language](https://github.com/vlang/v)：基于 C 的注重性能的静态类型编译语言。语法比较像 go?
- [Mun](https://github.com/mun-lang/mun)：基于 Rust 的静态类型语言，注重热重载 (hot reloading)。
- [Mojo](https://docs.modular.com/mojo/)：python 的超集，注重性能，类型，兼容性，目标是 AI 领域。
- [koka](https://koka-lang.github.io)：以 effect 为核心的函数式语言。有 [full UFCS](https://koka-lang.github.io/koka/doc/book.html#sec-dot) 特性。给一堆东西分类的感觉我比较喜欢。
- [moonbit](https://www.moonbitlang.cn/)：国人开发，面向 WebAssembly，从 rust 中学了很多的语言
  - 貌似很火很有潜力，也有 Telegram 认识的 PL 大佬在里面工作过
- [odin](https://odin-lang.org/docs/overview/)：追求简单的、像 Go 的语言
- [C3](https://c3-lang.org/)：C 的改进，解决 C 痛点
- [flix](https://flix.dev/)：JVM 上的、拥有许多函数式风格的语言。
- [borgo](https://borgo-lang.github.io/)：点进去就知道了
- [dada](https://dada-lang.org/)：类 rust 的实验性语言，观点比较模糊（至少我没看出有哪些 feature）
- [Vale](https://github.com/ValeLang/Vale)：类 rust 的语言（所有权和泛型），但是更简单，限制更多（可变结构只能有一个引用）。开发者对内存回收，内存安全~~和玛雅文化~~有[独特的理解](https://verdagon.dev/home)。
- [gleam](https://gleam.run/)：基于 rust 的，一股 rua 味的语言，BEAM 系竞争者
- [cangjie](https://developer.huawei.com/consumer/cn/cangjie/)([download](https://cangjie-lang.cn/download))：华为官方出品的编程语言，看起来挺像 ts 的，据说缝了挺多东西。我挺期待它的性能报告的。
- [vala](https://docs.vala.dev/about.html)：语法与 java/C# 类似，但是无 runtime 而是用 C 原生实现。据称在 GTK 等 GUI 编程方面强悍。
- [rune](https://github.com/rune-rs/rune)：模仿 rust 的动态类型嵌入语言。看起来还行，解决了一些 rust 的痛点，不过没有静态类型检查也属实烦人。但是说是嵌入，zip 还有 41MB，不算小。

</dtls>

### 不计划学习

<dtls alt="我不会自发学习这些语言">

因为它们的设计确实烂。

- go
- lua

</dtls>

## 工具

1. [Github](./github.md)：从基础到进阶
2. [Git](./Git.md)：现代唯一指定版本控制系统
3. ~~[Vim](./vim.md)：文件编辑器~~
4. [VSCode / Cursor](./vscode.md)：IDE
5. [数据库](./sql.md)
6. [容器](./container.md)

## 前端

::: details 前言

我之前是靠着博客摸索和课设积累了一点微不足道的前端经验。后来舍友成为专业前端后，聊着聊着也种下了学习前端的种子。再后来，因为博客、网站、GUI 的需求，开始学习前端。

~~我从未觉得写前端开心过~~。AI 时代大家都在生成代码，后端代码可以通过各种测试确保正确性，但是前端样式不对就是不对；2025 年 vLLM 还不太行，LLM 没法真正解决样式的问题，除了摇人和硬试好像没啥好的解决方法。包括 animation 因为语料少，生成正确率很低，也是一个不容忽视的问题。

:::

1. [JS 运行时](./nodejs.md)
2. [TypeScript & JavaScript 语言](./tsjs.md)
3. [CSS](./css.md)
4. [html](./html.md)
5. 框架/组件库
   1. [Vue](./vue.md)
   2. [React](./react.md)
   3. [SolidJS](./solidjs.md)
6. 其他
   - [配色方案](../farraginous/recommend_websites.md#资源)
   - [clipboard (external)](https://zhul.in/2025/04/21/how-we-copy-text-to-clipboard-with-js-in-2025/)

## [Android 开发](./android.md)

## 其他

1. [算法](./algorithm.md)
2. [搭建 bot](./bot.md)
3. [SICP learning](https://github.com/lxl66566/sicp-learning)
4. [FUCK MATLAB](./octave.md)

## 杂项

### 网站

一些值得学习的地方，语言无关。

- [计算机教育中缺失的一课](https://missing-semester-cn.github.io/)
- [learnxinyminutes](https://learnxinyminutes.com/)
- [CS 自学指南](https://csdiy.wiki/) & [计算机专业学习路线 - hackway](https://hackway.org/docs/cs/intro)：英文好的话可以看看。
- [Regular Expressions Cheat Sheet](https://cheatography.com/davechild/cheat-sheets/regular-expressions/)

### 字体

- 我以前是不在意字体的。
- 后来看到都在用 Fira Code，就用了两年，感觉还不错。Fira Code 最大的问题就是中文:英文不是 2:1。
- 我后来又尝试了 [Maple Mono](https://font.subf.dev/zh-cn/)，它的中文:英文是 2:1。但是在 vscode 里的支持很差，写个 markdown，每个自动换行的长度都不一样，不管我的 `editor.wordWrap` 设成啥，效果都不行。不如 Fira Code。

## external

1. [计算机教育中缺失的一课](https://missing-semester-cn.github.io/)
2. [经典技术书籍 PDF 文件](https://awesome-programming-books.github.io/)
   - [Modern Compiler Implementation in ( Java | ML | C )](https://www.cs.princeton.edu/~appel/modern/)
3. [The yaml document from hell](https://ruudvanasseldonk.com/2023/01/11/the-yaml-document-from-hell)
4. [图解 Functor、Applicative、Monad](https://sxyz.blog/functors-applicatives-and-monads-in-pictures/)
5. [Parse, don’t validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)
6. [top-programming-fonts](https://github.com/hbin/top-programming-fonts/)
