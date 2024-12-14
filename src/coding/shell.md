---
date: 2024-07-24
icon: fish
category:
  - 编程
tag:
  - 编程语言
---

# shell script

说到 shell script，bash 绝对是 shell 界的王，几乎所有 linux 系统都使用 bash 作为默认 shell。因此其拥有最高的兼容性。

当然，bash 毕竟也是老编程语言，随着时代变化，其设计缺陷与难用部分也开始显现。至少我是非常不愿意[^1]使用 bash 编写程序的。有许多脚本语言可以用来替代 bash，例如我已经用 [python](./python.md) 写脚本很久了。还有许多与 bash 竞争的 shell 本身也自带了一门脚本语言，例如 fish，nu 等，甚至 just 也能算一个 bash 的竞争者。这些脚本需要专门的解释器运行，我也会放在后面介绍。

[^1]: 尝试写个大脚本，[未果，几欲去世](https://t.me/withabsolutex/1374)。数组做输入值和返回值各种妖魔鬼怪乱飞 (`"${arr[@]}"`)。我的评价是还是**写点阳间语言**吧，就算是 fish 都比 bash 好看多了。python 也很泛用的，而且比起 lua 更好写。

除此之外，还有人既想写出人类可读的代码，又想借用 bash 超高的兼容性，因此便开发了能够编译为 bash 的高阶语言，例如 [pnut](https://pnut.sh/)，[amber](https://github.com/amber-lang/amber)。

## [Shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>)

放在脚本开头，以指示此脚本使用的解释器。因此如果写了 `#!/bin/bash`，则表示脚本是一个 bash 脚本，可以直接 `./filename` 执行。

不过为了最佳的兼容性（NixOS 太怪胎了），可以写成 `#!/usr/bin/env bash`。

## bash

bash 的兼容性有多强呢？你可以在几乎所有 linux，手机，各种终端设备，windows（win10 开始内置 bash），macos（默认 zsh，兼容） 上执行 bash 脚本。基本上这个时代没有几个设备是不用 bash 的。

此处不会涉及 bash 系统教学，只会零碎记一些知识点。系统学习可以看[external 1.](#external)。

- bash 的要义是一切皆字符串。
- 启动 bash 时会自动执行 `~/.bashrc`，这也是一个 bash 脚本。
- bash 按 tab 也能补全，不过默认不显示候选项。
- `xx1 && xx2` 在 xx1 成功后执行 xx2，`xx1 || xx2` 在 xx1 失败后执行 xx2
- 传参：
  - `$1` 代表第一个参数，类似的…
  - `$@` 代表把所有参数原封不动传入（多个参数的地方），而 `$*` 代表把所有参数合并当成一个字符串传入。
- `${}` 不仅用于插值，还用于更多处理。
  - `${var:-default}`，如果为空则使用默认值
  - `${#var}` 是取 len
  - `${var:1:3}` 是取 slice，两边都是闭区间，index 从 0 开始
  - `${var/pat/after}` 是字符串替换

## fish

一般来说三大 shell 指的是 bash, fish, zsh. 而 fish 不兼容 bash，在里面算是比较特立独行的。fish 语法自成一系，不过在一众 shell 里算是比较好学的，缺点是文档写的挺垃圾。fish 使用 rust 重写过一次，~~搭上了语言原神的顺风车~~，性能与安全性无需担忧。fish 是不兼容 windows 的，而在 msys2 里用 fish 又总感觉挺不爽的，我只好在 windows 上用其他 shell。

fish 的语法在我看来算是对传统 shell 的反叛，但是没有叛彻底，还保留了很大一部分 bash 特点，导致 fish 写脚本也十分难写。

吸引我使用 fish 的最大原因是补全太好用了，爆杀一切其他 shell。fishshell 甚至会自动从 man 生成补全 ([ref](https://t.me/archlinuxcn_group/2974806))。我一般开启 `bind \t forward-word`，配置文件只此一行足矣（加载其他软件的命令不算）。

- set fish as default
  ::: code-tabs
  @tab 侵入式

  ```bash
  # 侵入式就是直接设置默认 shell，包括启动时 (?)
  chsh -s fish
  ```

  @tab 温和式

  ```sh
  # 温和式是先启动 bash，再将 shell 作为 bash 子进程启动
  # edit ~/.bashrc
  if [[ $(ps --no-header --pid=$PPID --format=cmd) != "fish" ]]
  then
      exec fish
  fi
  ```

  :::

- 语法：有个叫 [bass](https://github.com/edc/bass) 的可以在 fish 里用 bash 语法。不过我觉得不如快速查下鱼文档。
- 环境变量：[`set`](https://fishshell.com/docs/2.6/commands.html#set)，注意作用域与是否 export 的问题。
- 函数：fish 大把的指令（包括 alias）都是函数。
  - 使用 function 新增函数后，可以使用 `funcsave <function>` 保存到配置文件夹下以便修改与备份，修改后需要重新 source：`. ~/.config/fish/config.fish`
  - 当然，官方推荐的修改是使用 `funced <function>`，最好设置 `$EDITOR` 环境变量，可以在喜欢的编辑器里修改。
  - 删除函数 / 变量：`-e` == `--erase`
- 插件：一般使用 [fisher](https://github.com/jorgebucaran/fisher) 安装插件。不过我一个都没装，只能说看不上。

## zsh

zsh 是 bash 统治下的顺从者，其几乎全兼容 bash。zsh 是 macos 的 default shell，因此用户也非常多。

我曾经尝鲜过一段时间 zsh（入坑作：[external 2.](#external)），但是[补全实在是太垃圾](https://t.me/withabsolutex/1214)，立刻扔掉了。

用 zsh 基本离不开 [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)，但是这玩意有严重的性能问题([ref](https://luoxu.archlinuxcn.org/#g=1031857103&q=omz&sender=313927976))，已经在群里问过 N 次了。

- 安装 zsh 时会问 set default shell

## nushell

nushell 可以说是彻底的反叛者，它自己搓了一套偏函数式的 nu 语言，并重载了许多 posix 指令（以便更好地展示执行结果）。nushell 也使用 rust 实现，性能与安全性无需担忧。nushell 是跨平台的，因此成为我在 windows 上的一个选择。可惜 nushell 补全只能从历史中补，手感还是挺差的。

自己搓语言的基本上都有很高的学习成本，nushell 也不例外。nu 语言有对 rust 的借鉴和[反叛](https://t.me/withabsolutex/1698)。

不过 nushell 最劝退我的还是 [rust 的一个 bug](https://t.me/withabsolutex/1700)，导致其无法在我的 RAMDisk 上工作。

## xonsh

我一看到 xonsh 就把它加到了我的 👍 list 里。它不自创脚本语言，而是使用 python 作为其解释器。在 python 爆火的当下，xonsh 可能是一个不错的选择，它完全避开了高昂的学习成本和 bash 脚本的难用，还能借 python 优秀的跨平台能力为所欲为。

虽然我还没开始用 xonsh，不过将来我一定会去试一试的。

## amber

amber 是总论提到的编译到 bash 语言的一个高阶语言；它使用 rust 实现，并且有较为完善的文档和 tutorial。我也为这个项目发过 PR，不过是依赖相关，跟代码逻辑没什么关系。

这个项目的代码我只能说真是一坨屎山。在用几乎最新的 rust 和 cargo 情况下，没有修 clippy issue 也就算了，连 rustfmt 都没过就有点过分了吧。。。屎山也就算了，我跑 `cargo test` 也跑不了，正常使用也用不了，这什么垃圾玩意。。

## 杂

- [Y/n 选择器](https://stackoverflow.com/questions/226703/how-do-i-prompt-for-yes-no-cancel-input-in-a-linux-shell-script/27875395#27875395)
  ::: code-tabs
  @tab bash

  ```sh
  read -n 1 -p "Are you sure to clean git and push force? (y/N) " answer
  case ${answer:0:1} in
      y|Y )
          echo "Y"
      ;;
      * )
          echo "do nothing"
      ;;
  esac
  ```

  @tab fish

  ```sh
  # fish 的语法有些许差别。。例如 `-P` 大写
  read -n 1 -P 'Use tldr instead of man? (Y/n) ' answer
  switch $answer
      case n N
          /usr/sbin/man "$argv"
      case '*'
          tldr "$argv"
  end
  ```

  :::

## external

1. [bash 脚本教程](https://wangdoc.com/bash/)
2. [Linux Zsh 使用 oh-my-zsh 打造高效便捷的 shell 环境](https://sysin.org/blog/linux-zsh/)
