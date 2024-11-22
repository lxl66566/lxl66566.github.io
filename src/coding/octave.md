---
date: 2023-11-14
icon: brands fa-octopus-deploy
category:
  - 教程
---

# Matlab/Octave

::: caution

我真的很讨厌 Matlab。本文所有内容基本上都是为了逃离 Matlab 所作出的努力。

:::

做工科的大学生避不开 matlab，但是我显然不可能去用它。

1. **太大了**
2. 早期语言，语法比较怪异
3. 商业化，不自由
4. matlab 的 IDE 显然也是不够格的。

GNU Octave 是一个开源科学计算语言，拥有与 matlab 极其相似的语法，号称拥有 95% 兼容性。我尝试使用 octave 作为 matlab 的替代。

1. 小，本体安装后只有 64.07 MiB。（version 8.4.0）
2. 模块化，例如抽离了信号处理的 signal 包。

不过，octave 写代码还行，跑别人的代码就有可能出现兼容性问题了。而且其本身的问题也挺多的。

用 octave 也是学校要求上交 matlab 代码的妥协。如果不限语言，那全部 python 起手就完事了。

## 开发环境/工具

### 安装

::: tabs

@tab Octave

在 archlinux 上安装。

```sh
pacman -S octave
```

为了与 matlab 函数更好的兼容性，需要使用包管理器[^1]安装一些包：

[^1]: 若手动（在 octave 内）安装 signal 包，会出现无解的编译失败。

```sh
# from AUR
paru -S octave-signal octave-statistics
```

使用前需要在 octave 命令行 load：`pkg load signal statistics`。

:::

### IDE

不论 Octave 还是 matlab，自带的代码编辑器都是**一坨大便**。

- 双方的编辑器都无法自动补全括号。
- 黑夜模式：
  - octave 在深色模式下的代码编辑器中，各种符号颜色还是黑色的。
  - matlab 可调黑色，但只有编辑区域黑色。太丑了。
- linter：
  - octave 编辑代码没有 linter。
  - matlab 的 linter 虽然丑，但是能用。

因此用 [vscode](./vscode.md) 就好了。~~（vscode 宇宙编辑器！）~~ 安装插件：`Octave`、`Octave Formatter`，如果提示没有权限执行 Formatter 脚本就自己 `chmod +x` 一下。

需要注意的是，这些插件只能提供高亮和 formatter，没有内嵌 linter（除非把 matlab 插件薅来用（

如果需要 runner，可以安装 `Octave Language` 插件，但是使用 runner，画出的 figure 会闪退。因此我还是选择使用 Octave 本体运行代码，麻烦自己的右手动下鼠标。

### formatter

上述 IDE 部分提到了 _Octave Formatter_，在其 README 里提到：_This is a fork of [matlab-formatter-vscode](https://github.com/affenwiesel/matlab-formatter-vscode) by affenwiesel, adapted to support Octave._ 它们是使用 python 脚本 + 正则匹配的简单 formatter。至于用，我只能说凑合能用。

我想要一个更加牛逼的 formatter，因此也上网找了点其他东西，例如 [miss_hit](https://github.com/florianschanda/miss_hit/)。这玩意也不好用，跑起来慢，而且有莫名其妙的 lint，例如在注释中使用中文都会触发 encoding warning。

### 转为 python

由于 matlab 的玩意基本都能用 python 代替，那么将 matlab 代码转为 python 代码也是很自然的一个想法。

有人已经尝试实现这个想法：[smop](https://github.com/victorlei/smop)。不过非常可惜，这个库早就停止维护了。

### 退化至 matlab

很遗憾，octave 并不能完全替代 matlab：可能你需要使用 Simulink；或者你的代码使用了不兼容的语法，并会被放到 matlab 中进行检验。这时候可以使用 [matlab online](https://matlab.mathworks.com/) / Simulink online。[^2]

[^2]: 一个小插曲，某天我上 matlab 选修课时，同学们因为 license 服务器问题没法跑 matlab，我在旁边用 matlab online 写得正欢，被老师发现了，于是被拜托分享给同学们，也算是传道了。([src](https://t.me/withabsolutex/132))

使用学生邮箱注册即可使用（至少我校的学生邮箱是有效的）。访问比较慢，甚至可能被墙，建议科学上网。

matlab online 的使用体验肯定是很差的，非必要的话尽量不用。

1. 浏览器本身性能不足，matlab 网页优化也差。
2. 联网计算延迟极高，**特别是在处理 figure 的时候**。
3. 云盘垃圾。matlab 云盘甚至不记 cookie，每次进页面都需要登录。

## 语言基础

快速入门首选 [learnxinyminutes](https://learnxinyminutes.com/docs/zh-cn/matlab-cn/).

- 逻辑非：`~`
- 向量的下标索引从 1 开始。`x(2:3)` 切片是 both inclusive。
- 老式写法 function 结尾不需要 `end`；虽然也能跑，但是推荐写 `end`。同时函数内还可以 `return` 提前返回。
