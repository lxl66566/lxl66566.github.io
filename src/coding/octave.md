---
date: 2023-11-14
icon: calculate
category:
  - 教程
---

# Octave

做工科的大学生避不开 matlab，但是我显然不可能去用它。

1. **太大了**
2. 早期语言，语法比较怪异
3. 商业化，不自由
4. 作为一个 IDE，matlab 显然是不够格的。

GNU Octave 是一个开源科学计算语言，拥有与 matlab 极其相似的语法（本科阶段的初级使用基本全兼容）。我使用 octave 作为 matlab 的替代。

1. 小，本体安装后只有 64.07 MiB。（version 8.4.0）
2. 模块化，例如抽离了信号处理的 signal 包。

## 安装

在 archlinux 上安装。

```sh
pacman -S octave
```

如果要做信号处理相关工作，需要使用包管理器[^1]安装 signal 包(AUR)：

[^1]: 若手动（在 octave 内）安装 signal 包，会出现无解的编译失败。

```sh
paru -S octave-signal
```

使用前需要在 octave 命令行 load：`pkg load signal`。

## 开发环境

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

## 退化至 matlab

很遗憾，octave 并不能完全替代 matlab：可能你需要使用 Simulink，或者你的代码使用了不兼容的语法，并会被放到 matlab 中进行检验。这时候可以使用 [matlab online](https://matlab.mathworks.com/) / Simulink online。

使用学生邮箱注册即可使用（至少我校的学生邮箱是有效的）。访问比较慢，在敏感时期可能会被墙，建议科学上网。

matlab online 的使用体验肯定是很差的，非必要的话尽量不用。

1. 浏览器本身性能不足，matlab 网页优化也差。
2. 联网计算延迟极高，**特别是在处理 figure 的时候**。
3. 云盘垃圾。matlab 云盘甚至不记 cookie，每次进页面都需要登录。
