---
date: 2023-11-04
icon: format
category:
  - 学习
  - 推荐
  - 教程
---

# typst

> [Typst](https://github.com/typst/typst) is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use.

我不是很喜欢 latex，所以尝试使用 typst 作为我的论文排版工具。

优点：

- typst 使用 rust 语言编写，编译极快，几乎秒出
- 语法是类 rust 的语法，看着非常亲切

缺点：

- 新兴工具，bug 较多
- 社区不够完善，网上模版/教程不多

## 安装与配置

基础用法是 CLI 使用，但我配合 [VSCode](../../coding/vscode.md) 使用。

1. 进 release 下载，解压后把 `typst.exe` 直接丢进 `C:\Windows\System32` 就行。
   - 或者也可以 `scoop install typst` 一行搞定。
2. vscode 安装两个扩展，无需配置：
   - _Typst LSP_，Linter + watch
   - _vscode-pdf_ (optional)，viewer
   - 或：什么也不装，只要 `typst watch example.typ` 即可。

然后就可以愉快地敲论文了。每次保存时会自动生成 pdf，拖到侧边就能看了。

## 使用

[这里](https://typst-doc-cn.github.io/docs/chinese/#resources)有许多大学的毕业论文模版，~~多抄抄就会用了~~

简单来说，`[]` 内是正文，`{}` 内是代码，`()` 是数组或列表，正文调用函数要加 `#`，代码里可以直接调。

关键字也就 `set` 和 `show` 常用，`set` 设置全局属性，`show` 设置某个组件的（外观）属性。

剩下的 `let`，`if` 什么的都是 rust 的东西，这里不说（

## bug

这东西 bug 其实还真不少。。

### 参考文献

[issue](https://github.com/typst/typst/issues/2548)

从 `.bib` 引入参考文献时，如果文献类型是 `thesis`，本该在适当位置加 `[D]` 的，然而它不会加。。

感觉是 _hayagriva_ 的锅，但是我翻了下源码发现看不懂。爆了！

> 看了一下 issue 时间，_3 days ago_。。那我这次课程论文寄了，唉，扣点分不重要

其他大学模版的解法是用 python 写了个处理脚本，通过 CSL 解析，半自动加参考文献。

### 缩进

[issue](https://github.com/typst/typst/issues/311)

中文等语言需要在每行开头缩进两个宽字符。typst 提供了 `par()` 控制缩进行为，但是在标题下面一行的文字却不会被缩进。。

所以下面有人提供了[一个解法](https://github.com/typst/typst/issues/311#issuecomment-1678940781)：

```
show heading: it =>  {
  it
  par()[#text(size:0.5em)[#h(0.0em)]]
}
```

> 我最早在知乎看到一个解法，但是有副作用。。

### 代码

代码不要直接写 `typ` 文件里。最好从外部引用，解耦，还方便扔 formatter。

#### 好看的边框

从 [#1494](https://github.com/typst/typst/issues/1494#issuecomment-1591847881) 摸了个好看的代码块样式来，然后自己改改，就是下面的了。

```typ
#let frame(title: none, body) = {
  let stroke = black + 1pt
  let radius = 5pt
  let font = (font: "Fira Code", size: 10pt)
  let name = block(
               breakable: false,
               fill: color.linear-rgb(0, 0, 0, 10),
               stroke: stroke,
               inset: 0.5em,
               below: -1.5em,
               radius: (top-right: radius, bottom-left: radius),
               title,
             )
  set text(..font)
  show raw: set text(..font)
  box(stroke: stroke, radius: radius)[
    #if title != none {
      align(top + right, name)
    }
    #block(
      width: 100%,
      inset: (rest: 0.5em),
      body,
    )
  ]
}

#let include_code_file(file_path, name, lang) = {
  frame(title: name)[
    #raw(read(file_path), lang: lang)
  ]
}
```

这样用 box 包的代码块有一个致命缺陷：若 box 高度大于剩余页面高度，则会自动换页；若 box 高度大于整个页面的高度，则超出部分不会显示。因此只适合用来引用小块代码，否则就别想要边框了。

我去其他地方寻找解法，[BUAA 的](https://github.com/cherichy/BUAA-typst/blob/ab9bef8ecbdc55d4d0629c63ad96ffd5484b4f7c/functions/codeblock.typ)用 figure 包的也会有这个问题，暂时无解。
