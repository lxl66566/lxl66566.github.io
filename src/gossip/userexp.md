---
date: 2026-01-21
icon: circle-user
category:
  - 主张
  - 评价
tag:
  - 用户反馈
  - 体验
---

# 各种尝鲜体验

相对而言，我比较喜欢尝试新事物。这里记录一些我的尝试体验。

## [weave](https://github.com/Ataraxy-Labs/weave)

一个基于 tree-sitter 代码理解的 git merge 辅助工具。

emmmm，虽然这个 claude 的大菊花排在 contributor 的靠前位置，比较渗人。但我还是想试试。

首先安装，scoop 没有，我用 bpm-rs 安装还给我测出两个 bug。

修好以后安装，我看 README 里写了可以 `weave setup --local`，但是执行并没有这个指令。然后发现这个 `--local` 是 [15 hours ago 刚添加的](https://github.com/Ataraxy-Labs/weave/pull/90)。。。一般协作场景都不允许把 `.gitattributes` 上传到远端吧。不过还好有 `core.attributesfile`，我直接加到 global gitattributes 里就完事了。

第一次 merge 的时候报错 weave-driver 找不到，然后我才发现安装这东东需要在 release 里下载两个 binary，一个是 weave-cli，一个是 weave-driver。

不过合并的实测效果还是比我想的好一些的，最终 conflict 的文件数量确实更少了几个。不过 weave 解决的也都是些简单问题，难题都留给人类了说是。

<dated date="20260520"/>

## [carapace](https://carapace-sh.github.io/carapace-bin/carapace-bin.html)

这玩意大概一年多前就想试了，但是文档说的简直不是人话。

首先，Github 上 README 基本没有，就一句 [Read](https://pixi.carapace.sh), Try and [Build](https://carapace-sh.github.io/carapace/carapace/gen.html). 然后如果你点进去 Read，就能看到这辈子见过的最抽象的文档（截取一部分目录展示😅）：

```
1. In A Nutshell
2. Porcelain Shop
3. Hulk BASH!
4. Pandoras Box
5. Overly Attached Argument
6. Lights, Camera, Action!
7. Group Therapy
8. Spec-tacular Citizen
9. Running Man
10. Greenwashing
11. Wiretap
12. Sandcastle
```

实际上对于 user 应该看的是 [carapace-bin 的文档](https://carapace-sh.github.io/carapace-bin/carapace-bin.html)。但是即使是这份文档也是一坨大便，你安装并配置后也是不知道如何使用。比如我使用 nushell，我按照文档说的进行一个配置：

```nushell
$env.CARAPACE_BRIDGES = 'zsh,fish,bash,inshellisense'
source $"($nu.cache-dir)/carapace.nu"
```

然后重启 nushell，也没法进行补全。后来和 AI 摸索着发现还需要手动把 carapace 设为 external completer，并且一定要取消掉原先的 tab keybindings：

```nushell
# 注释掉原先的 keybindings
# $env.config.keybindings ++= [
#     {
#         name: take_history_hint
#         modifier: none
#         keycode: tab
#         mode: [emacs, vi_normal]
#         event: {
#             until: [
#                 { send: historyhintwordcomplete }
#             ]
#         }
#     }
# ];
let carapace_completer = {|spans: list<string>|
    carapace $spans.0 nushell ...$spans | from json
}
$env.config.completions.external = {
    enable: true
    max_results: 100
    completer: $carapace_completer
}
```

然后按 tab 才能出现补全候选结果。

但是我其实不喜欢这种下方展示候选，我的补全都希望是 inlay hints，并且希望是最符合的结果上屏，而不是出一堆结果让我自己选。

总之经过了一大堆事以后，我对 carapace 没有任何好感。

<dated date="20260507"/>

## [ast-outline](https://github.com/aeroxy/ast-outline)

一个快速用来 parse 代码文件提取重要内容给 AI 用的工具。

首先提取本身没问题，但是只有一些签名和类型，没有注释。我比较怀疑是否真的可以给 AI 产生价值，很多时候一个函数签名的信息是远小于注释的。（当然注释也会有 example 等垃圾内容，这个价值判断标准不太好界定）

然后 `ast-outline install --all --dry-run` 只支持那些大公司出品的 AI agent，覆盖面还是太窄了。

最后，release binary 里没有其他系统的 releaes 也要扣一点分。

<dated date="20260428"/>

## [quien](https://github.com/retlehs/quien/)

一个 go 写的、TUI 的域名工具。

下载下来试用一下，随便查了一个内网解析的域名，结果：

- `quien xxx.xxx` 卡死在 TUI 首页，无法切换 tab。合着查询线程阻塞了 UI 线程是吧。
- `quien dns xxx.xxx` 返回空记录，真的是全空的。。还不如我 nsloopup，至少能查到非权威应答。
  ```
  {
    "A": null,
    "AAAA": null,
    "CNAME": null,
    ...
  ```

立刻卸载。

<dated date="20260424"/>

## http client

详见 [HTTP Client](../articles/http_client.md)。

## [jujutsu](https://github.com/jj-vcs/jj)

详见 [jujutsu](../coding/jujutsu.md)。

- 作为一个 [git exp user](../coding/Git.md)，并且拥有一批 git scripts，jujutsu 对我的开发效率的提升比较有限。
- jujutsu 和我公司工作流的相性非常差。
  - 比如我们提交前都要求用工具扫 commit 但是扫不到 jujutsu 的 `@`；比如我们不用本地创建分支而是在远端创建分支后拉下来开发；比如我们解决 conflicts 也用的另一套工作流。
- 我有一些私有 git hooks，jujutsu 没法执行。
- 要功能没功能，要生态没生态。
- jujutsu 虽然说兼容 git，但是跟 git 混用也会有一些问题。
  - 最大的问题是 jj 会一直创建 empty commit，这些 empty commit 会随着你的 git merge 被一起合到 jj 的 worktree 里。虽然在 git 里这些都是不可见的，但是在 jj log 里就是纯纯的精神污染，让人不会再想回到 jj 里了。

<dated date="20260325"/>

## [opencode](https://github.com/anomalyco/opencode)

现在 AI 时代 AI 相关的东西 100k star 真是随便拿啊。

朋友一直在推，用了一下。

- 简陋的首页，下载方式没说 scoop，没有标注出使用文档，不如 GitHub README 和真正的文档。
- 界面根本没有引导，进去就三个键盘按键，不知道做什么用的，没有 help，必须读文档才知道。
- 免费模型跟没有脑子一样，虽然本来也没啥指望。
- 你居然把 node_modules 放在 `~/.config/opencode` 里？对于洁癖的人来说，在 `~/.config` 里放这种东西是大忌。
- <https://opencode.ai/docs/zh-tw/models> 里没有说明如何使用自定义 API（provider），即使它支持自定义 API。支持的模型很多，不够成不用说明如何支持自定义 API 的理由，因为 API 提供方永远列举不完。
  - TUI 添加后的配置也不会写到配置文件里，那我怎么同步，不同步吗？
  - 感觉这两套思维本身也很混乱。要配置文件就 all in 配置文件，要 GUI config 就 all in GUI，同时编辑两边还不同步是什么鬼？
- TUI 其实可以做滚动条，但是它没做。这么长 context 我也没法直接滚，只能 /export。
  - 用键盘 Page Up/Page Down 是可以快速滚的，但是有人可能没考虑现在有的键盘已经不提供这两个按键了……
- 没有 chat mode，只能当 agent 用。其实我有一些需求是开一个 chat window，有时候懒得搜索让它帮我搜。这个显然没做到。
- 不同文件夹下打开 opencode，session 不共用，我还以为 session 丢了。
- opencode 内存占用高已经是特性了，一直都有人提，但是也没人想改。90 天后 issue 就自动关闭了。
- opencode 处理中文输入法总是有点问题，有时候切了输入法但是还是只能写英文。这个 bug 是偶发，我还没有稳定复现的案例。

总的来说，opencode 作为一个 agent，基本功能还行。但是在使用体验上仍需改进。

然后用 agent 记得一定要找个有缓存的 API 提供方。

## [UniGetUI](https://github.com/marticliment/UniGetUI)

- 为什么这玩意打开要让我下载 scoop-search 和 cargo-update，后者甚至是从源码编译。假设用户一定有 rust 工具链吗？看到源码编译我就要开始捂鼻了。
  - 然后安装完 scoop-search 和 cargo-update 以后，重启软件居然没读到，还要我再安装一次？恶性 bug 直接卸载了。

<dated date="20260202"/>

## [Files](https://github.com/files-community/Files)

不懂只提供微软商店链接，没有离线安装包/压缩包的软件是什么毛病。被微软收购了？

<dated date="20260202"/>

## [InputTip](https://github.com/abgox/InputTip)

在 b 站看到宣传，感觉这个灵感挺不错的。试用了一下，感觉我不一定需要这个。

1. 符号方案下有一些 bug，例如和光标位置有一点偏移、并且在我第二块缩放比例不同的屏幕上表现很差，坐标计算是错的。
2. 光标方案倒是简单，但是实在是有点丑，我也懒得自己定义光标样式。
3. 目标人群是那种不喜欢看右下角托盘，怕被打断注意力的。作为程序员而不是书记，我觉得偶尔看下右下角没什么负担。

<dated date="20260121"/>

## [UltraISO](https://www.ultraiso.com/)

根据[此 POST](https://galgame.dev/topic/2971/关于iso-mds-mdf镜像文件的使用教程)，结果软件本身是 winxp 风格，mds/mdf 挂载挂不上，提取还直接崩溃了，还 tm 卖钱，什么脑残玩意。

用挂载而不是解压的唯一理由就是少一次写入，但是既然这玩意这么难用，还是 7-zip 解压一把梭吧。
