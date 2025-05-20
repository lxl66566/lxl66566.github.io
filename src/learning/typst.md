---
date: 2023-11-04
icon: font
category:
  - 学习
  - 推荐
  - 教程
---

# typst

> [Typst](https://github.com/typst/typst) is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use.  
> [非官方中文指南](https://typst-doc-cn.github.io/docs/chinese/)，我一般拿来快速找第三方包  
> typst 并没有一个给开发者的清晰的文档。。[examples book](https://sitandr.github.io/typst-examples-book/book/about.html)可以抄点东西。

我不是很喜欢 latex，所以尝试使用 typst 作为我的论文排版工具。

优点：

- typst 使用 rust 语言编写，编译极快，几乎秒出
  - 据群聊天记录所传，latex 编译 30min 的 typst 只要 46s
- 小，二进制也就数十 MB；第三方包只有源码，约等于不占空间

缺点：

- 新兴工具，[bug](#bug) 较多
- 社区不够完善，网上模版/教程不多，文档很烂
  - 面向 user 的文档还行，但是面向 developer 的…一点没有。
- 自创的 DSL 比较折磨（这是一个连标准输出都没有的弱类型语言([src](https://github.com/typst/typst/issues/1669))，debug 很容易红温）
  - 要我说，还不如直接用 rust（但是这样二进制大小也压不下来）
  - 网上资料很少，在 2025 年还是很难用 AI 生成正确的代码。

## 安装与配置

基础用法是 CLI 使用，但配合 [VSCode](../coding/vscode.md) 使用效果更佳。

1. CLI：进 release 下载，解压后把 `typst.exe` 直接丢进 `C:\Windows\System32` 就行。
   - 或者也可以使用 [scoop](../farraginous/recommend_packages.md#scoop) `scoop install typst` 一行搞定。
   - 然后就可以 `typst watch xxx.typ`，自动生成 pdf。可能要用 `--root xxx` 指定根目录。
2. CLI 没有 vscode 扩展好用。使用 vscode 扩展不需要安装 CLI，只需要：

   1. 安装 LSP
      ::: tabs
      @tab 新起之秀

      1. 安装 _Tinymist Typst - Myriad Dreamin_
      2. `ctrl + ,` 进入设置： 1. _Tinymist: ExportPdf_ 改为 _onSave_ 2. _Tinymist: FormatterMode_ 改为 _typstyle_（也是一个新起之秀的 formatter）

      @tab 传统
      官方插件：Typst LSP

      - 缺点：慢，没有 formatter
      - 优点：0 配置，懒人福音

      :::

   2. （Optional）安装 _vscode-pdf_ 用于 pdf 查看。
      - 我不推荐 _Typst Preview_：
        1. 曾经遇到过无法生成的 bug；
        2. 很慢，10 页的 pdf 就会卡了。

然后就可以愉快地敲论文了。每次保存时会自动生成 pdf，拖到侧边就能看了。

## 资源

- 学习
  - [蓝书](https://github.com/typst-doc-cn/tutorial/releases)
- 模板
  - [nku 模板](https://github.com/Starlight0798/typst-nku-lab-template)
  - [我的模板](https://github.com/lxl66566/my-college-files/blob/main/信息科学与工程学院/template.typ)

## 编译导出

```sh
typst compile xxx.typ # 基础编译指令
typst compile --root .. xxx.typ   # 如果需要 include 父级目录的文件，则需要指定 root
typst compile --format svg xxx.typ '{n}.svg'  # 导出为 svg 格式
```

## 基础

[这里](https://typst-doc-cn.github.io/docs/chinese/#resources)有许多大学的毕业论文模版，~~多抄抄就会用了~~

简单来说，`[]` 内是正文（`content`），`{}` 内是代码，`()` 是数组（`array`），正文调用函数要加 `#`，代码里可以直接调。

关键字也就 `set` 和 `show` 常用，`set` 设置作用域内的属性，`show` 相当于每次使用都调用某个函数。

剩下的 `let`，`if` 什么的都是 rust 的东西，这里不说（

### [数组](https://typst.app/docs/reference/foundations/array/)

typst 数组是 `array`，没有 `list` 类型。

`("12")` 这样其实还是 string 类型，如果要数组类型需要 `("12",)`。（之前被坑过一次，现在 `("12")` 会被 Tinymist 格式化成原始 `"12"`，还是很不错的）

### 字符串

字符串的 slice，len 方法全部是 unicode 意义下的。如果需要处理字符意义下的长度与切片（Rust: `.chars()`），需要用 `.codepoints()` 将其转为字符数组。

## 字体字号

我一般用：

```typst
#let 字号 = (
  初号: 42pt,
  小初: 36pt,
  一号: 26pt,
  小一: 24pt,
  二号: 22pt,
  小二: 18pt,
  三号: 16pt,
  小三: 15pt,
  四号: 14pt,
  中四: 13pt,
  小四: 12pt,
  五号: 10.5pt,
  小五: 9pt,
  六号: 7.5pt,
  小六: 6.5pt,
  七号: 5.5pt,
  小七: 5pt,
)

#let 字体 = (
  仿宋: ("Times New Roman", "FangSong"),
  宋体: ("Times New Roman", "Songti SC", "Songti TC", "SimSun"),
  黑体: ("Times New Roman", "SimHei"),
  楷体: ("Times New Roman", "KaiTi"),
  代码: ("Consolas", "SimSun"),
)

#let 中文数字(num) = {
  ("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十").at(int(num))
}
```

## 数学

- [数学符号速查表](https://github.com/brynne8/typst-undergradmath-zh/blob/main/undergradmath.pdf)
- [Detypify](https://detypify.quarticcat.com/) 可以让你手写数学符号并识别结果。

基本上够用了。

## 表格

- [tablem](https://github.com/typst/packages/tree/main/packages/preview/tablem/0.1.0)，类 markdown 语法的表格，简单快速，功能不强。
  - 无法通过 `\|` 转义打出 `|` 字符
  - 超出列数报错（与 markdown 行为不同；在 markdown 中会直接忽略）
- [tablex](https://github.com/PgBiel/typst-tablex)，更麻烦但更强大的表格。
  - 如果表格中含有粗体斜体，批量处理就比较麻烦。([ex](https://github.com/PgBiel/typst-tablex/issues/18)) [我的解法，甚至还发现了个 bug?](https://gist.github.com/lxl66566/30e309e696169829524ee04503b526db)
    - 这个预计算是很难改的（源码访问 `at` 时的 `default` 已经是 `Option<Value>` 了）。说到底，根本问题还是 typst 选择自创的这个 DSL 的问题，你像 rust 那样 Option 套 `or_else` 哪有这么多事。
- [excel 表格转为 typst 表格](https://gist.github.com/lxl66566/cf29d98741a78a164d5ad2cfb4aa92a7)，支持合并的单元格，很好用。可惜 windows only。

## heading

heading 算是 typst 里比较重要的一个东西，平常用的真不少。

### numbering

默认的 numbering 会显示全路径，例如

```typst
= h1  // 1
== h2  // 1.1
=== h3  // 1.1.1
```

但是在中文语境下我们很可能不需要它显示全路径。这时可以使用这样的 pattern（抄来自己修改的）：

```typst
set heading(numbering: "1.1.1.1")
show heading: it => locate(loc => {
  set text(font: 字体.黑体)
  set par(first-line-indent: 0pt)
  let levels = counter(heading).at(loc)
  let deepest = if levels != () {
    levels.last()
  } else {
    1
  }
  if it.level == 1 {
    set text(字号.四号)
    if it.numbering != none {
      numbering("一、", deepest)
    }
    it.body
  } else if it.level == 2 {
    set text(size: 字号.小四)
    if it.numbering != none {
      numbering("1.1 ", ..levels.slice(1))
      h(3pt, weak: true)
    }
    it.body
  } else if it.level == 3 {
    set text(size: 字号.五号)
    if it.numbering != none {
      numbering("1.1.1 ", ..levels.slice(1))
      h(3pt, weak: true)
    }
    it.body
  }
})
```

效果：

```typst
= h1  // 一、
== h2  // 1
=== h3  // 1.1
```

### 居中

有时候我们需要换页，并将某个标题居中。我以前喜欢改 heading level == 1 的 show rules 来完成这件事，现在发现还是自己写一个 title 函数比较好。

```typst
#let title(title) = {
  pagebreak(weak: true)
  align(center)[#text(size: 字号.二号, font: 字体.黑体, title)]
}
```

## 代码

大段代码不要直接写 `typ` 文件里，最好从外部引用，解耦，还方便扔 formatter。小段就无所谓了。放个我的带边框代码块：

```typst
// 带边框代码块
#let frame(title: none, body) = {
  let stroke = black + 1pt
  let radius = 5pt
  let txt = (font: 字体.代码)
  set text(..txt)
  let name = block(
                breakable: false,
                fill: color.linear-rgb(0, 0, 0, 10),
                stroke: stroke,
                inset: 0.5em,
                below: -1.5em,
                radius: (top-right: radius, bottom-left: radius),
                title,
              )
  block(
    stroke: stroke,
    width: 100%,
    inset: (rest: 0.5em),
    radius: radius,
  )[
    #if title != none {
      place(top + right, dx: radius + stroke.thickness, dy: -(radius + stroke.thickness), name)
    }
    #body
  ]
}

// 引入外部代码块
#let include_code(file_path) = {
  let name = file_path.split("/").at(-1)
  let lang = name.split(".").at(-1)
  frame(title: name)[
    #raw(read(file_path), lang: lang)
  ]
}
```

::: details 我的折腾历程

从 [#1494](https://github.com/typst/typst/issues/1494#issuecomment-1591847881) 摸了个好看的代码块样式来，然后自己改改，就是下面的了。

```typst
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

这样用 box 包的代码块有一个致命缺陷：若 box 高度大于剩余页面高度，则会自动换页；若 box 高度大于整个页面的高度，则超出部分不会显示。因此只适合用来引用小块代码，否则就别想要边框了。我去其他地方寻找解法，[BUAA 的](https://github.com/cherichy/BUAA-typst/blob/ab9bef8ecbdc55d4d0629c63ad96ffd5484b4f7c/functions/codeblock.typ)用 figure 包的也会有这个问题。

然后偷窥交流群发现，如果不需要 `name` 参数的话，简单用 `block` 包一下就能实现自动切割。抄来的代码用的是 `box`，因此才会自动换页。

````typst
#let 字体 = (代码: ("Fira Code", "Times New Roman", "SimSun"))
#let frame(body) = {
  set text(font: 字体.代码)
  block(
    stroke: black + 1pt,
    width: 100%,
    inset: (rest: 0.5em),
    radius: 7pt,
    body,
  )
}

// 使用方法：
#frame[
```js
console.log("1")
```
]

````

:::

### 伪代码

用过[algorithmic](https://github.com/typst/packages/tree/main/packages/preview/algorithmic/0.1.0)，并且修了个 bug。然而一年了，作者不合 pr，没办法。

所以更推荐用[lovelace](https://github.com/typst/packages/tree/main/packages/preview/lovelace/0.1.0)，更泛用一点。

### 目录

众所周知，中文报告一般会要求页码遵循 `第 x 页，共 x 页` 的格式。这没问题，在 `set page(numbering: (..nums) => ...)` 即可。

然而 typst 的目录（`outline`）默认使用页面的页码格式，也就是说，会出现这样的情况：

![鬼畜页码](/images/learning/typst/outline_err.svg)

我尝试问群友，没人理 <heimu>几个月后才又聊到这个话题</heimu>；尝试看源码，发现写死了；最后在 repo 里乱搜，居然被我搜到了一个究极自定义方案，改一改就是[解法](https://typst.app/project/rdlQEoafiBzjiaF_mDBurK)。

## box

如果你想要好看的框（box），不需要自己写。

- [showybox](https://typst.app/universe/package/showybox)：好看，强大
- [typst-boxes](https://github.com/lkoehl/typst-boxes)：简易
- [gentle-clues](https://typst.app/universe/package/gentle-clues/)：常用框

## bug

这东西 bug 其实还真不少。。

### 中文粗体斜体

广为诟病的一条了，typst 不支持伪粗体伪斜体。不过据说是会修。

### 参考文献

[issue](https://github.com/typst/typst/issues/2548)

从 `.bib` 引入参考文献时，如果文献类型是 `thesis`，本该在适当位置加 `[D]` 的，然而它不会加。。

感觉是 _hayagriva_ 的锅，但是我翻了下源码发现看不懂。爆了！

> 看了一下 issue 时间，_3 days ago_。。那我这次课程论文寄了，唉，扣点分不重要

其他大学模版的解法是用 python 写了个处理脚本，通过 CSL 解析，半自动加参考文献。

后续：修了，0.10.0 正常。

### 缩进

[issue](https://github.com/typst/typst/issues/311)

中文等语言需要在每行开头缩进两个宽字符。typst 提供了 `par()` 控制缩进行为，但是在标题下面一行的文字却不会被缩进。。

所以下面有人提供了[一个解法](https://github.com/typst/typst/issues/311#issuecomment-1678940781)：

```typst
show heading: it => {
  it
  par()[#text(size:0.5em)[#h(0.0em)]]
}
```

这个方法在上一行是 figure 啊，raw 啊什么的时候还是无法缩进，又得手动改 show rules。
