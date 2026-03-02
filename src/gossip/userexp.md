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

## [opencode](https://github.com/anomalyco/opencode)

现在 AI 时代 AI 相关的东西 100k star 真是随便拿啊。

朋友一直在推，用了一下。

- 简陋的首页，下载方式没说 scoop，没有标注出使用文档，不如 GitHub README 和真正的文档。
- 界面根本没有引导，进去就三个键盘按键，不知道做什么用的，没有 help，必须读文档才知道。
- 免费模型跟没有脑子一样，虽然本来也没啥指望。
- 你居然把 node_modules 放在 `~/.config/opencode` 里？对于洁癖的人来说，在 `~/.config` 里放这种东西是大忌。
- <https://opencode.ai/docs/zh-tw/models> 里没有说明如何使用自定义 API，即使它支持自定义 API。支持的模型很多，不够成不用说明如何支持自定义 API 的理由，因为 API 提供方永远列举不完。
- TUI 其实可以做滚动条，但是它没做。这么长 context 我也没法直接滚，只能 /export。
- 没有 chat mode，只能当 agent 用。其实我有一些需求是开一个 chat window，有时候懒得搜索让它帮我搜。这个显然没做到。
- 不同文件夹下打开 opencode，session 不共用，我还以为 session 丢了。
- opencode 文档里添加 provider 只能用 TUI 添加，没有直接写 `opencode.json` 的例子。并且 TUI 添加后的配置也不会写到配置文件里，那我怎么同步？
  - 感觉这两套思维本身也很混乱。要配置文件就 all in 配置文件，要 GUI config 就 all in GUI，同时编辑两边还不同步是什么鬼？

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
