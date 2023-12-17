---
date: 2023-12-17
icon: code
category:
  - 编程
  - 主张
tag:
  - 编程语言
  - 哲学
---

# 编程语言哲学

> 在编程领域我只能算一个 beginner，读书不够多，此处是一点**不成熟的拙见**，难免有误，欢迎批评。

在接触了各种编程语言后，我常常思考如何构建自己的编程语言，这也是我了解、尝试各种语言的动力之一。

编程语言是建立在抽象上的。从机器码到指令集，从汇编到高阶语言，从编译型到解释型，语言在抽象的同时也带来了巨大的开销。

解耦是编程语言中重要的一环。后文有着更深入的描述。

从编程语言哲学衍生出的抽象与解耦的概念，也是形成[我的价值观](../gossip/va_view.md)的重要因素之一。

## 抽象

我愿意说函数是最早的抽象。_函数_ 这个概念比 _编程_ 出现还早得多，因此说底层也不足怪。现代处理器的指令集本身就可以看成是电路操作的函数。

### 组合

组合是比函数高一阶的抽象。

组合大概可以从 CISC 指令集讲起吧，但我对指令集了解不多，这里直接跳过（）。然后到了 C struct & union，组合任意数据类型。由于 function pointer 也是数据类型，因此也可以组合函数。最后才是 OOP 的天下，加了权限控制，继承关系等。

### 打 tag

（相关条目：[杂论 - tag 论](../gossip/va_view.md#tag-论)）

打 tag 是比组合更高一阶的抽象。

例如当其他语言还在拼命继承 interface 时，Rust Trait 早已在更高阶前进了。我可以为包括基本类型在内的各种类型打上不同的 tag，为某一个 tag “附加”（impl）方法，为某一个 tag 做泛型，有一种在《三体》"蓝色空间"号上通过四位空间碎片（高阶抽象）支配三维空间（低阶抽象）的感觉。

## 解耦

（相关条目：[杂论 - 解耦论](../gossip/va_view.md#解耦论)）

已经有部分语言开始自发地（或被迫地）解耦。例如属于[打 tag](#打-tag)的 Rust Trait 实际上就剥离了 OO 的一部分功能。[external 3.](#external) 介绍了 JavaScript 普通函数和异步函数的解耦，而 [external 4.](#external) 构想了数据类型和模块的解耦。

## 梦中情语

## external

1. [Lies we tell ourselves to keep using Golang](https://fasterthanli.me/articles/lies-we-tell-ourselves-to-keep-using-golang)
2. [A decade of developing a programming language](https://yorickpeterse.com/articles/a-decade-of-developing-a-programming-language/)
3. [What Color is Your Function?](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/)
4. [Object-Oriented Programming is Good\*](https://www.youtube.com/watch?v=0iyB0_qPvWk)
