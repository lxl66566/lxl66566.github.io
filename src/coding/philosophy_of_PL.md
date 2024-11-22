---
date: 2023-12-17
icon: question
category:
  - 编程
  - 主张
tag:
  - 编程语言
  - 哲学
---

# 编程语言~~哲学~~胡言乱语

> 在编程领域我只是一个 beginner，读书不够多，此处是一点**不成熟的拙见**，甚至**漏洞百出**，请读者阅读时**抱有质疑**，同时欢迎批评指正。

在接触了各种编程语言后，我常常思考如何构建自己的编程语言，这也是我了解、尝试各种语言的动力之一。

编程语言是建立在抽象上的。从机器码到指令集，从汇编到高阶语言，从编译型到解释型，语言在抽象的同时也带来了巨大的开销。

解耦是编程语言中重要的一环。后文有着更深入的描述。

从编程语言哲学衍生出的抽象与解耦的概念，也是形成[我的价值观](../gossip/va_view.md)的重要因素之一。我将抽象与解耦的 _现实举例_ 放在了价值观页面，有兴趣可以跳转查看。

## （狭义）抽象

我们将每一条指令、一个数据看作一个点。

### 函数

我愿意说函数是最早的抽象。_函数_ 这个概念比 _编程_ 出现还早得多，因此说底层也不足怪。现代处理器的指令集本身就可以看成是电路操作的函数。

很容易把函数想象成 pipe，一边输入，一边输出，因此函数是线级抽象。（真的吗？）

- Question: 假设 RISC 是 CISC 的解耦，那么 CISC 指令集是否还是函数层级抽象？

### 结构

我原先认为结构是比函数高一阶的抽象（并且也这么写了），但事实上，如果说函数是指令的集合，结构是数据的集合，那么它们的阶数理应是相同的。如果函数与 OOP 的阶数差为 2，那么后文中的一些地方很难解释得通。因此先暂且（不严谨地）认为，结构和函数是同一级抽象。

C 的 struct & union 可以组合任意数据类型。由于 `void*` 的存在，什么 function pointer 啦都可以往 struct 里塞。

等等，这对吗？组合内可以有函数，函数的参数可以是组合，这其中的维度关系相当混乱。现在暂且把它当成抽象大厦上的一朵乌云~

### OOP

最后才是 OOP 的天下。OOP 是比组合高阶的抽象（面级），优化了函数的组合语法，加了权限控制，继承关系等。其中的**继承关系**是关键，是抽象进阶的根源。

所有类（包括抽象类）如果是单继承的，那么继承关系构成一颗（许多棵）树。

#### interface & trait

至于 interface 和 trait 就更复杂了，我一开始还不太清楚它们的抽象层级。它们看起来花里胡哨，把自己叫成 implement[^1] 而不是 inherit，实际上也可以直接看成多继承特性，交织的继承关系不再是树而是 DAG，但仍然没有维度上的突破。

[^1]: implement 有一种在《三体》"蓝色空间"号上通过四维空间碎片（高阶抽象）支配三维空间（低阶抽象）的感觉。

相比之下，trait 要比 interface 灵活一点。

- interface 不提供方法实现，充其量只能算是多继承 dlc 而已。trait 则是拿着不同具体实现往 struct/dyn trait 上贴，
- java 说 `(a class) implementing an interface`，是以 class 为主导的。而 rust 说 `impl(ement) trait for a struct`，以 trait 为主导。这种差异也导致我写 java 会先脑测好 interface，再用 class 去 implement，而写 rust 就刷刷刷，突然有想法就一拍脑袋拍出一个 trait 用。

很难想象 interface 和 trait 是同一个抽象层次的东西，但它们确实是。

### 指针

指针是构成现代计算机的基础。由于指针没有权限控制，很容易写出不安全的代码，也徒增了许多心智负担。因此现代的语言都试图弱化指针在编程语言中的地位，将其抽象成什么别的东西。

C++ 的引用原先是指针的语法糖，后来添加了右值引用，事实上就是所有权的控制。

Java, JS, Python 等语言直接将指针的概念剥离了出去，使用较为简单粗暴的方式：基本类型都是传值，对象类型（包括其他复杂类型）都是传引用（指针）。

Rust 用引用的概念来代替指针，不过也保留了 unsafe 中的指针操作。要注意的是 C++ 的引用概念应该相当于 Rust 的 Box，而不是引用（ans：引用的引用？）。

### monad

monad 是在函数式中的一个概念，可以理解成一种“包装”。Rust 中的 Option, Result 都是 monad。

有一些语言不喜欢 monad 的抽象。最容易看出来的就是用函数接受 default 参数的语言：

- python 的 getattr：
  ```py
  def getattr(
      o: object,
      name: str,
      default: None,
      /
  ) -> (Any | None): ...
  ```
- typst
  ```typst
  #let values = (1, 7, 4, -3, 2,)
  #values.at(6, default: values.at(-1))
  ```

这样就会出现诸如[求值顺序](https://github.com/typst/typst/issues/3052)，多层嵌套难看等各种问题。而一个好的解法是将返回值抽象为 monad，例如 rust：

```rust
fn xxx() -> Option<T> {}
```

`Option` 是一个 monad 抽象，其代表了“可能有值”。然后，再从 monad 中取出内部值：

```rust
let a = xxx().unwrap_or_else(|| 1);
```

取值部分，可以设 default，可以立刻求值，可以懒求值，可以方便地嵌套，具有非常高的灵活性。

## 组合

常有人说，组合优于继承。一个现实的例子是，rust struct 无法继承，只能组合。

组合究竟是不是抽象的一个子类，我还没有搞清楚，这里先写着。

- Question: 网上有一些说法认为 [interface & trait](#interface--trait) 属于组合。这种说法有没有道理？

### FP

现在还有很多函数式（_Functional Programming_）语言流行并活跃，比如 Ocaml, Haskell, Lisp, 还有新的 koka。FP 通过组合，得到高阶函数，完成复用。

FP 的基础是 lambda 演算，组合子[^2]等。我自己也没有系统地学习过 FP，这里就不献丑了。

[^2]: 有一篇可以拿来当组合子快速入门的文章在 [rust external 2.](./Rust.md#external)。

## 错误处理

目前编程语言的错误处理主要有两类，throw/catch 模型和 Result 模型。老牌语言更多使用前者，新兴语言更多使用后者。

throw/catch 看着非常像硬件中断。硬件中断会起一个错误处理线程来解决中断，并在解决后恢复（可恢复中断）。而 throw 的过程可以比作开启线程，catch 就是线程可执行部分。

理论上 throw/catch 应该算是普通的抽象。

Result 不是新兴语言的专利，C 语言的状态码也是 Result。非常明显，Result 是组合的那一类。

- 共同点：都有“是否可能抛出异常”的区别。

## 并发

目前大多数语言的并发基本都被 async/await 模型统一了。剩下 go 这种有栈协程还在支持。

async/await 模型是接近 FP 的体现，相当于把程序在 await 点切割，由一个/多个调度器控制程序调度。

## 解耦

（相关条目：[杂论 - 解耦论](../gossip/va_view.md#解耦论)）

已经有部分语言开始自发地（或被迫地）解耦。

- [external 3.](#external) 介绍了 JavaScript 普通函数和异步函数的解耦。
- [external 4.](#external) 构想了数据类型和模块的解耦。

- Question: Trait 剥离了 OOP 的 inheritance，算不算一种解耦？

### module

模块化是很好的解耦实例。模块化把抽象出的结构包成黑箱，只留下外部 API 接口，能够方便代码复用，减轻程序员心智负担。

模块化的另一个关键是组合（FP 不请自来）。将小模块组合成大模块，提供更高层次的抽象。

例如 OOP 很好地实现了模块化的思想（权限控制）。

#### 语言实现

- C 这种底层语言没有模块化。可以理解。
- C++ 的模块化做的稀烂，`#include` 只是简单地复制代码。之前一般用 `inline` 内联，C++ 20 以后才有了 module，但直到现在各方编译器的实现还不完善。
- python 的模块[粒度不够细](../gossip/fuckxxx.md#python-有多难用)，无法实现交叉引用，本质只是复制代码（加强版）而已(?)。

## 特化

特化（specialization）是在面对多个泛型匹配项时，编译器根据内置优先级规则进行选择的行为。C++ 模板以复杂的特化闻名，甚至 Rust 也[走上了特化的道路](https://github.com/rust-lang/rust/issues/31844)（min_specialization）。

但是我非常不喜欢特化，它极大增加了语言的复杂性，给人脑造成了不小的记忆负担。我倾向于类型集合论，如果类型系统是集合论完备的，并且规定同一个对象的所有泛型不允许交叉，那就不会出现特化的问题，匹配项可以由程序员决定。

## 细分

优先级，未完待续

## 梦中情语

on [github (WIP)](https://github.com/lxl66566/DreamScript)

## external

1. [Lies we tell ourselves to keep using Golang](https://fasterthanli.me/articles/lies-we-tell-ourselves-to-keep-using-golang)
2. [A decade of developing a programming language](https://yorickpeterse.com/articles/a-decade-of-developing-a-programming-language/)
3. [What Color is Your Function?](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/)
4. [Object-Oriented Programming is Good\*](https://www.youtube.com/watch?v=0iyB0_qPvWk)
