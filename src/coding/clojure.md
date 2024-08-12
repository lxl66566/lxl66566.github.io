---
date: 2024-08-12
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# Clojure

因为工作需要（写 jepsen test），不得不学习这门语言。这是一门 lisp 系纯函数式的语言。我还没忘记第一次读 SICP 时 lisp 给我带来的伤害，看起来 Clojure 也是括号满地，但是事到如今也只能硬着头皮上了。

## 学习

1. [learnxinyminutes](https://learnxinyminutes.com/docs/zh-cn/clojure-cn/)：学语言首选，并且它下面也推荐了几个其他网址，方便快速入门，我觉得挺好的。

## 开发环境

vscode 安装 _Calva Spritz_ 即可。

`Ctrl + Shift + P`，_create a mini clojure project_。然后点击下方的 REPL，打开即可。（一个可以实时查看执行结果的东西）

用法只需要掌握：在当前代码行上，按 `Alt + Enter` 执行单句。如果有调用前面的函数，按 `Ctrl + Shift + c, Enter`。（什么邪恶快捷键）

更多可以看[The Top 10 Calva Commands](https://calva.io/commands-top10/)。

## basic

零散知识点。

- conj + list 是加到前面：`(conj '(2 3 4) 1)`，+ vec 是加到后面：`(conj [1 2] 3 4)`
