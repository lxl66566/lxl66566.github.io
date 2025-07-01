---
icon: cube
date: 2022-05-04
category:
  - 推荐
  - 教程
tag:
  - 桌面端
  - 移动端
  - 工具
---

# 软件汇总

一些好用软件的推荐，包含 Windows，Linux，Android，浏览器插件和脚本。

::: tip

- 若您还不知道如何使用 Github 下载文件，请参考[此教程](../coding/github.md)。
- 使用 Google Play 下载需要[科学上网](../articles/proxy/index.md)。未注明应用来源的 Android 软件，不妨试试在 Play 商店里找找。
- 请注意，私有下载地址**不是**最新版安装包。若失效，可以[跟我反馈](../gossip/author.md#社交)。

:::

## 跨平台

### [raindrop.io](https://github.com/raindropio)

第三方书签管理工具。云端存储，多设备访问，免费使用，支持书签分享。

> 我曾经用过 [xbrowsersync](https://github.com/xbrowsersync/app) 书签同步器，但是很久没维护了，而且由于 manifest v2 不再受支持的原因，每隔一段时间就会[被浏览器杀掉扩展](../articles/browser/assess.md#edge)。因此找到了这个替代品。

电脑端请直接使用[网页版](https://app.raindrop.io/)，手机端可以选择 google play 下载 apk。

### [bitwarden](https://vault.bitwarden.com/#/login)

多端密码管理服务，支持生物识别和自动填充。数据存在美国（或欧盟），自动同步。如果你不信任密码托管方，请使用 [KeePass 系列](#keepass-系列)。

### 跨设备传输

[localsend](https://github.com/localsend/localsend) 和 [LANDrop](https://github.com/LANDrop/LANDrop) 都是优秀的开源局域网多设备互传软件，体积都不大。

我都用过了，更推荐 localsend，因为维护比较频繁（LANDrop 最后一次 commit 还在 2021 年），并且好看（flutter）。

> 如果 localsend 在 Android 传输结束时报错，请试试打开 _所有文件访问权限_

### [Anki](https://apps.ankiweb.net/)

多平台开源记忆软件。拥有多端同步，遵循记忆曲线，高自由度制卡等特色。anki 当前版本默认集成 fsrs 间隔重复算法。

一些使用技巧：

- 如何找卡组，可以去我的[语言学习](../learning/README.md)界面找。附有[我做的卡组](https://ankiweb.net/shared/info/772249450)（虽然质量不高）。
- 桌面端可以用数字键盘快捷键，刷卡简直飞快。移动端也可以接入蓝牙键盘，可以调整键绑定。
  - 1234 是程度，直接 enter 默认是 3 的级别。
- 如果有的卡片非常熟练，不要删除，不要搁置，请使用 _暂停_（快捷键 `@`）。
  - 如果删除卡片，当卡组有更新时就无法更新，否则会把卡片重新下载回来。
  - 搁置是放到第二天再学习。

#### 插件推荐

- [AnkiConnect](https://foosoft.net/projects/anki-connect/)：用于第三方软件向 anki 添加卡片，必装
- [FSRS Helper](https://ankiweb.net/shared/info/759844606)：在电脑上使用，可以把 AnkiDroid 上复习的卡按 FSRS 重排。
- [Review Heatmap](https://ankiweb.net/shared/info/1771074083)
- [Custom Shortcuts for Anki](https://github.com/Liresol/anki-custom-shortcuts)：自定义快捷键。要重启生效。
- [Remove Duplicate Cards（移除重复卡片）](https://ankiweb.net/shared/info/95590040)
- [Autosync 2.1](https://ankiweb.net/shared/info/1726633659)：自动同步

### [使用时间记录](../articles/time_record.md)

### [远程控制方案](../articles/control.md)

### [mpv](https://mpv.io/)

::: info 我的尝试
在 _potplayer_, _VLC_, _mpv_ 中我选择 _mpv_。
:::

**轻量级**跨平台开源视频播放器，高度自定义化。手写配置对新人可能不友好，但我就喜欢这种高度自定义的感觉。

这里是[我的 mpv 配置文件](https://github.com/lxl66566/dotfile/tree/archlinux/home/absolutex/.config/mpv)。

- 首先建议装一个 [uosc](https://github.com/tomasklaen/uosc)，除了好看之外还提供了许多其他功能。
- ~~随机播放：[autoload](https://github.com/mpv-player/mpv/blob/master/TOOLS/lua/autoload.lua)读取当前文件夹所有文件为 playlist，然后[手动 shuffle](https://www.reddit.com/r/mpv/comments/blrpwa)~~ uosc 内部有自带

不得不提，这玩意的文档是**垃圾**的水平。我想实现的 [globalspeed](#global-speed) 里提供的功能，直接用 conf 是写不出来的，写 user script 又没有文档查。。。

### RAM Disk

RAM Disk 系列软件可以将内存映射为硬盘，养成将临时文件存放在 RAM 中的好习惯，保护固态盘的寿命。

详情请见 [文章 - RAM Disk 横评](../articles/ramdisk.md)。

### ADB

电脑调试 Android 手机的必备工具，包括查询信息，备份，安装等常用功能。

- [简易教程与下载](../articles/mobile/adb.md)

### [yt-dlp](https://github.com/yt-dlp/yt-dlp)

视频下载**命令行**工具。移步[教程页面](../articles/yt-dlp.md)查看详情。

### torrent 下载器

很多 PT 站会限制只允许使用一些 torrent 下载器，其中一般会有 qBittorrent。而我目前使用 [qBittorrent-Enhanced-Edition](https://github.com/c0re100/qBittorrent-Enhanced-Edition)，比起原版新增了 tracker 订阅功能。

对于普通 BT 站下载，需要添加 tracker，我使用 [XIU2/TrackersListCollection](https://github.com/XIU2/TrackersListCollection)。

## Android

::: tip

- 此处应用推荐均为免 ROOT 应用。若需要模块/ROOT 应用推荐，请移步[模块与软件](../articles/mobile/module_and_app.md)

:::

### 包管理器

Google Play 是最广泛使用的包管理器。但是这玩意太商业化了，并且收录的软件不算多。所以也有一些其他选择：

- F-Droid：最知名的开源软件仓库。
- [Obtainium](https://github.com/ImranR98/Obtainium)：可以从 Github release 里安装 apk 的包管理器。和我的 [bin-package-manager](https://github.com/lxl66566/bpm) 有异曲同工之妙，不过它做得更好看实用。

### 去广告

去广告软件很重要的一点就是规则持续更新，毕竟厂商的广告和应用也在不断更新。然而所有去广告规则开发者只要肉身在国内，项目就就活不长，说到底还是大厂后台太硬了。

- [gkd](https://github.com/gkd-kit/gkd)：开源去广告，规则订阅制度，Material UI。看着不错，但是两个排名最前面的规则集在 20250210 archived 了，不再更新。
- [李跳跳](https://t.me/apkrxwy/927) | [bak](https://wwkh.lanzout.com/iokl61e21oha)（**闭源！**）：跳广告，比 AdAway 好用。软件离线使用，不再更新。~~腾讯封杀，必属精品~~
- [AdAway](https://github.com/AdAway/AdAway)：纯纯垃圾。

### ZArchiver

Android 端压缩/解压缩软件。（注：官方也有 PC 端软件）
::: warning 警告
不要在国内应用商店下载该软件，均鉴定为盗版。
:::
[官网下载地址](https://www.zarchiver.me/zarchiver-apk/) [私有下载地址](https://wwp.lanzout.com/i82ku049jz6j)

### 浏览器

参见[浏览器横评](../articles/browser/assess.md)

### MT 管理器

MT 管理器是一款文件管理工具，爆杀手机自带的文件管理（双列排布是好文明）。搭配 ROOT 食用更佳。虽然其为闭源商业化软件，不过免费功能够用。

- 简易教程：滑动进入多选；多选状态下滑动可以选中之间的所有项；多选状态下点击为选中点击项。

[官网下载地址](https://bbs.binmt.cc/forum-2-1.html) | [酷安下载地址](https://www.coolapk.com/apk/bin.mt.plus) | [私链](https://wwp.lanzout.com/i9frh06qke0h) | 可在国内应用商店下载

### Fake Location

虚拟定位软件，免 ROOT，大学模拟跑步神器
::: warning
请不要从 Google Play 安装。其对中国地区不可用。
:::
[官方项目地址](https://github.com/Lerist/FakeLocation) | [私有下载地址](https://wwp.lanzout.com/i4x8E03de5ab)

### Adobe Scan

扫描文档并转为 pdf。免费版就够用了。

与[扫描全能王](https://w103.camscanner.com/)相比有如下优点：小（安装后，扫描全能王 591MB，Adobe Scan 114MB）；无水印。

[谷歌商店下载](https://play.google.com/store/apps/details?id=com.adobe.scan.android&hl=zh&gl=US)

### [开源阅读](https://github.com/gedoor/legado)

开源的阅读器，支持：

- 导入书源
  - 这里是[书源推荐](https://legado.aoaostar.com/)，也可去 Telegram 官方群寻找其他书源。
- txt, **pdf 与 epub 格式**的书籍
  - pdf 格式有一些小 bug，需要在阅读界面 _右上角 -> 图片样式_ 选择 `DEFAULT`，然后翻页动画设为 `滚动`。
- 阅读时长统计
- WebDAV 同步阅读进度
  - 将平板和手机的设备名称设为同一个，可以在多个设备间自动同步进度
- 虽然没有 PC 版本，但可以开启 web 端口，只要手机和电脑在局域网下，就可以在电脑网页上读书。

### [Anything](https://www.xitmi.com/11378.html)

类似 windows everything，在 Android 手机上建立索引，快速搜文件。~~资源不好找，只能找到一个看起来很不安全的网站做下载站~~

[bak v1.3.22](https://wwkh.lanzout.com/iSZ7J1ecswha)

### [termux](https://github.com/termux/termux-app)

跑在 Android 上的命令行。用来远程连服务器，搞点轻度开发，或者干脆跑点 cli/tui 程序。我还会装 [TermuxArch](../articles/linux/install_and_config.md#termuxarch)。

- **不要在 Google Play 下载！** 请去 Github 或 F-Droid 下载。
- 国内用户可以尝试一下 [ZeroTermux](https://github.com/hanxinhao000/ZeroTermux)，一个改版，多了挺多方便的功能。
- 提权不要用 `su`，要用 `tsu` ([ref](https://www.reddit.com/r/termux/comments/126gjvr/))

### 音乐播放器

我听歌都是离线下载到手机里听，因此只需要离线播放器即可。APlayer, Gramophone, Salt Player 我用着都还行，体验也差不多，前两者开源后者闭源，随便选吧。

## Windows

### [scoop](https://scoop.sh/)

::: right
——scoop 比起 linux 上的包管理器还差的远呢[^6][^7]。
:::

[^6]: scoop 的宗旨是每个软件都携带其所有运行库([ref](https://github.com/ScoopInstaller/Scoop/wiki/Dependencies))。这样的做法在 windows 上极为普遍，然而包管理器的基本要求就是减少重复依赖。
[^7]: 我提的[恶性 bug](https://github.com/ScoopInstaller/Scoop/issues/5808)

说到 windows 包管理器就不得不推荐著名的 scoop。<span class="heimu" title="你知道的太多了">实际上我最早用的 chocolatey，都还行，scoop 更泛用一点而已</span> 你可以很方便地使用一条命令安装许多优秀软件与运行环境，而不必担心环境变量等问题。

:::warning
请使用[代理](../articles/proxy/index.md)以获得更好的 scoop 使用体验：`scoop config proxy 127.0.0.1:<port>`

scoop 将其与所有软件默认安装在 C 盘，可以通过设置 `SCOOP` 环境变量以更改安装位置。若已安装，可以考虑[迁移](https://github.com/ScoopInstaller/Scoop/issues/3852#issuecomment-1417160249)。
:::

基本指令 | 查看[进阶指南](https://www.thisfaner.com/p/scoop/)

```sh
scoop bucket add extras # 建议安装后先运行，extras 包含了更多包
scoop search <name>     # 搜索包
scoop install <name>    # 安装包
scoop update <name>     # 更新包，* 表示全部
```

其他指令：

```sh
scoop config cache_path <other_path>    # 将缓存文件夹设为其他位置，配合 RAM Disk
```

### 可视化磁盘空间

- [WizTree](https://diskanalyzer.com/)：扫描快速，号称 fastest
- [SpaceSniffer](https://spacesniffer.en.softonic.com/)：较慢，但是可视化更好

### 截图软件

- [flameshot](https://flameshot.org/)：基于 Qt 的开源跨平台截屏软件。
- [PixPin](https://pixpinapp.com/)：国产闭源截图软件

相同点：编辑截图，固定截图，软件都是 Qt 写的，大小都差不多

不同点：

- flameshot
  - 支持上传到图床，获取分享 url
  - windows 下有一定延迟
  - 在 wayland 分数缩放下工作较差（请使用 [kde spectacle](https://apps.kde.org/zh-cn/spectacle/)）
- PixPin
  - 支持**离线 OCR**，我非常喜欢
  - 无法设置 _PrintSc_ 和两键以上的快捷键

### [Everything](https://www.voidtools.com/zh-cn/downloads/)

快速搜索，几乎不花时间。推荐配合 [EverythingToolbar](https://github.com/srwi/EverythingToolbar) 使用。

### [geek](https://geekuninstaller.com/download)

轻量级软件卸载工具，仅 4M，**可清理文件与注册表残留**。<span class="heimu" title="你知道的太多了">[私链](https://wwp.lanzout.com/icAdmharg2h)</span>

### 压缩软件

选择一个即可。

- [7-Zip](https://www.7-zip.org/)：正统老牌轻量压缩工具。
- [NanaZip](https://github.com/M2Team/NanaZip)：开源，UI 有 windows 风格，支持黑色主题。缺点：
  - msxi 打包，不好在老系统上用。
  - 支持的格式没有 7-Zip 多。

举一个比较小众的例子，dwarfs 格式在 7-Zip 上可以打开但是文件夹会识别为文件；在 Bandizip 和 NanaZip 上无法打开。

### [图吧工具箱](http://www.tbtool.cn/)

集成了电脑及其外接设备测试所需的多数软件，集硬件测试，跑分，信息查询为一体。不过体积比较大。

### [ContextMenuManager](https://github.com/BluePointLilac/ContextMenuManager)

开源的右键菜单管理器。高度自定义化。

### [sandboxie](https://sandboxie-plus.com/downloads/)

开源沙盒，隔离运行程序，有时候用得到。请务必使用沙盒运行未知来源的程序。

### [Winaero Tweaker](https://winaero.com/winaero-tweaker/#download)

windows 设置小工具，集成了一些高级功能（特别对我这种被迫设置 win11 的人有点帮助）

### [Ditto](https://github.com/sabrogden/Ditto)

是一个开源轻量级的剪贴板管理工具。使用 C 语言编写，具有低内存占用和高性能，同时拥有一些其他特色：

- 支持暗黑模式
- 支持对复制粘贴行为的脚本处理，例如我使用以下脚本去除 bilibili 视频分享链接的跟踪器与其他无用内容：
  ```
  clip.AsciiTextReplaceRegex(".*https://www.bilibili", "https://www.bilibili");
  clip.AsciiTextReplaceRegex("share_source=copy_web&?", "");
  clip.AsciiTextReplaceRegex("vd_source=[0-9a-zA-Z]+&?", "");
  return false
  ```
- 超星学习通自动转为下载链接：
  ```
  clip.AsciiTextReplaceRegex("^https://mooc.s.ecust.edu.cn/coursedata.*objectId=(.*)&?.*","http://cs.e.ecust.edu.cn/download/$1");
  return false
  ```
- 复制网址保留汉字时自动补全[^5]：
  ```
  clip.AsciiTextReplaceRegex("^t?(tps?://.*)","ht$1");
  return false
  ```

[^5]:
    浏览器复制汉字时会自动转义为 `%..` 格式，而不全复制（例如不复制第一个 `h`，只从 `ttp` 开始复制）可以保护这些汉字不被转义。
    另外，我有一个工具（[urldecoder](https://github.com/lxl66566/urldecoder)）可以应对转义问题，从此我再也不需要复制网址时少复制一个 `h` 了。

### [EnergyStarX](https://github.com/JasonWei512/EnergyStarX)

[EnergyStar](#energystar) 有人接手，这个做的还不错，有 GUI，并且能自动在不插电时启用。

### [TrafficMonitor](https://github.com/zhongyang219/TrafficMonitor)

[教程](https://www.bilibili.com/video/BV1RkXmYPE8s/)

可以在任务栏显示流量、CPU/GPU/内存/硬盘的实时占用和温度。我以前在 kde 的时候就很喜欢它的任务栏显示实时占用的小组件，现在 windows 上也可以得到相似的体验。

### [Flow Launcher](https://www.flowlauncher.com/)

如果你在用 [utools](#utools) 或 powertoys 类似物，你一定要尝试一下 Flow Launcher。

Flow Launcher 也是一个 Alt + Space 的快捷窗口，可以运行程序、搜索资料、有插件系统等等。不过跟垃圾 utools 不同，它是免费开源的。

- 有 everything 集成，可以方便搜文件。
- 缺点是内存占用偏大。C# 的 web 渲染还不如 electron 呢。

## Linux

前往 [Linux - 包管理与使用](../articles/linux/package.md#包使用)

## 浏览器插件

现在的谷歌、微软插件商店都对安装客户端限制非常严重，因此可以考虑第三方扩展商店（特别是在 kiwi browser 上安装扩展时）：[crxsoso](https://www.crxsoso.com/)。

> _注：点击[绿色](#浏览器插件)标题即可添加插件至浏览器。_

### Global Speed

控制视频播放速度，0.07x - 16.00x。主要适合需要高倍速观看视频的人群 _（对我来说用处真的很大）_，也可用来快速刷课，练习听力等。

- 使用方法：`A` 和 `D` 可 +-0.1x 倍速，`S` 用来回到 1.00x 或上一倍速。插件倍速会覆盖视频本身的倍速。
  - `z`, `x` 可以快进 / 快退。建议开启 _移动时间轴_ 的 _相对于速度_。
  - 热键可以自定义。
  - 可以强制全屏（建议把全屏改为 `f` 键）。
- 全局锁死热键，可以在扩展窗口点类似 _关机_ 的按键临时关闭。
- 建议开启 _幽灵模式_，强制加速例如学习通的视频。

[官方项目地址](https://github.com/polywock/globalSpeed) | [edge 商店](https://microsoftedge.microsoft.com/addons/detail/global-speed-视频速度控制/mjhlabbcmjflkpjknnicihkfnmbdfced) | [私链](https://wwp.lanzout.com/i9LKF05ht3ni)

### [AdGuard](https://chrome.google.com/webstore/detail/adguard-adblocker/bgnkhhnnamicmpeenaelnjfhikgbkllg)

极为强大的广告拦截。支持选中元素，自定义规则。

- 推荐搭配[秋风广告规则](https://github.com/TG-Twilight/AWAvenue-Adblock-Rule)食用：复制订阅规则 URL（根据情况选择是否反代），粘贴到 _Adguard - 设置 - 过滤器 - 自定义 - 添加自定义过滤器_ 中。

### [B 站空降助手](https://github.com/hanydd/BilibiliSponsorBlock)

跳过 B 站视频的广告片段！这个插件的构思非常好，让用户自行标记广告片段，一旦标记以后，其他人看视频都可以跳过广告。和手机骚扰来电标记有异曲同工之妙。

### 下载器

参考 [下载器横评](../articles/downloaders.md)。

### [简约翻译](https://github.com/fishjar/kiss-translator)

从[沉浸式翻译](#沉浸式翻译)过来的，这个还带了划词翻译功能，速度也快，非常好用。缺点是暂时没法自定义快捷键。

### [SuperCopy](https://chrome.google.com/webstore/detail/supercopy-enable-copy/onepmapfbjohnegdmfhndpefjkppbjkm)

强大的`禁止复制`破解插件。比脚本好用。

### [DARK READER](https://darkreader.org/)

浏览器强制夜间模式，效果不错。

### [为什么你们就是不能加个空格呢？](https://chrome.google.com/webstore/detail/paphcfdffjnbcgkokihcdjliihicmbpd)

可以自动在网页的字母，符号，数字与汉字间加空格，改善观感。~~很有个性的名字，不是吗？~~

[前往 Github](https://github.com/vinta/pangu.js)

> 也可以使用脚本，以便在 firefox 等非 chromium 系浏览器上使用。

### [CoCoCut](https://microsoftedge.microsoft.com/addons/detail/视频下载扩展cococutvideo-down/npdhgjfiikhgncaacnnodpfchmelnchm)

在遇到 [yt-dlp](#yt-dlp) 不支持的网站时，另一个可用的视频下载工具就显得尤为重要。CoCoCut 在支持抓取媒体的基础上，还能够下载 m3u8 流视频，甚至能通过录制方式下载。

### [MergeEase](https://mergease.com/)

diff 增强插件，为 github 使用。

### History Trends Unlimited

无限制记录浏览历史，可以搜索、备份。缺点是无法导入，更换浏览器后数据无法转移。

## 浏览器脚本

::: tip 提示

请确保已经安装插件 [Violentmonkey](https://violentmonkey.github.io/) 或 [Tampermonkey](#tampermonkey)。（前者是开源无广告，后者是老牌）

:::

### [Google Hit Hider](https://greasyfork.org/scripts/1682)

过滤 Google & 百度 搜索结果，不要让垃圾网站污染眼睛。需要手动维护自己的 blocklist[^3]。

[^3]: 也可以用用[我的](<https://github.com/lxl66566/my-key-data/blob/main/Browser/blocklist(Google%20Hit%20Hider%20by%20Domain).txt>)

### 论坛绿化

- [CSDNGreener](https://greasyfork.org/zh-CN/scripts/378351)：专杀 CSDN
- [知乎增强](https://greasyfork.org/zh-CN/scripts/419081)
- [Open the F\*\*king URL Right Now](https://greasyfork.org/zh-CN/scripts/412612)：自动跳转某些网站不希望用户直达的外链
- [跳过知乎强制登录](http://pc-dos.scp-eq.org/skip-zhihu-forced-login)：202406 知乎的傻逼操作，但是没写死。

### 刷网课

- [OCS](https://docs.ocsjs.com/)
- [全平台自动答题脚本](https://greasyfork.org/zh-CN/scripts/451356-万能-全平台自动答题脚本)：最好把匹配改下，不然在各种地方都会执行。。。

### B 站相关

- [Bilibili AntiBV](https://greasyfork.org/zh-CN/scripts/398499-bilibili-antibv)：BV 自动转 AV
- [三相之力指示器](https://greasyfork.org/zh-CN/scripts/451150-新-三相之力指示器)：三相之力！B 站评论区自动标注三相玩家。
- [哔哩哔哩自动连播](https://greasyfork.org/zh-CN/scripts/408516-哔哩哔哩自动连播)：跳过 bilibili 视频末尾的充电鸣谢
- [Bilibili live enhance](https://greasyfork.org/zh-CN/scripts/474523-bilibili-live-enhance)：夹带私货，本人写的直播增强，主要是移除了礼物栏等。
- [bilbili 界面美化](https://greasyfork.org/zh-CN/scripts/476704-bilbili界面美化)：自动网页全屏，移除弹幕栏，非常对我的胃口
- [一些改善未登录下观看体验的脚本](https://greasyfork.org/zh-CN/users/675901-dd1969)

## 其他软件插件

### [better-qqnt](https://t.me/aa1078bb870c41c6b675624cd784)

闭源的 QQNT 插件系统，使用更简单。

### [LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT)

一个开源的 QQNT 插件系统。我很早就知道了，然而当时在 QQNT 最新版本上会炸，因此没有使用。20240529 因为一些契机再次尝试发现可用，于是写入此处。

我安装的插件：

- [轻量工具箱](https://github.com/xiyuesaves/LiteLoaderQQNT-lite_tools/tree/v4)，包含了防撤回
- [Pangu](https://github.com/MisaLiu/LiteLoaderQQNT-Pangu)
- [pURLfy](https://github.com/PRO-2684/LiteLoaderQQNT-pURLfy)
- [media-local-view](https://github.com/xh321/LiteLoaderQQNT-Media-Local-View)
- [Kill-Update](https://github.com/xh321/LiteLoaderQQNT-Kill-Update)
- [Plugin-Brevity-btn](https://github.com/hacker-frok/LiteLoaderQQNT-Plugin-Brevity-btn)
- [Markdown](https://github.com/d0j1a1701/LiteLoaderQQNT-Markdown)，但是只有本机能看
- [Directly-Jump](https://github.com/xh321/LiteLoaderQQNT-Directly-Jump)

关于插件安装：对于有 git 和 pnpm 的我来说，直接在 `QQNT/LiteLoaderQQNTx.x.x/plugins` 里执行 `git clone` + `pnpm i` 即可，简单省空间，还方便更新。

## 一些过时的推荐

::: warning
此处推荐多为我年轻时的推荐，现已放弃使用，仅供参考。
:::

### 永久阅读器

**推荐使用 [开源阅读](../hobbies/books.md#工具) 代替。**

内置书源的小说阅读器。阅读界面无广告，开屏有广告。（注：相当一部分日轻无可用书源）[私有下载地址](https://wwp.lanzout.com/iLG4D03de8fe)

### Go 安装器

一键安装 Google 框架。不过现在就算国行系统，一般也自带 Google 框架就是了，这个第三方闭源安装器显得有些没必要。

- 注意，安装框架后还需自行安装 Google Play 等。

[酷安下载地址](https://www.coolapk.com/apk/com.goplaycn.googleinstall) | [私链](https://wwp.lanzout.com/iYyA10686e7c)

### [NekoX](https://github.com/NekoX-Dev/NekoX)

Telegram 第三方开源客户端，自带很不稳定的低速公共代理，但至少能用；~~在 tg 第三方内名声挺差~~。更新滞后较大，若有科学上网方法还是建议使用官方端。

### [Seal](https://github.com/JunkFood02/Seal)

开源的视频下载 app，Android 端的选择。但是它的内核就是 [yt-dlp](#yt-dlp)，为什么不用电脑的 yt-dlp 呢？[^1]
[^1]: 毕竟我是重度电脑使用者

### [HiNative](https://zh.hinative.com/)

一个可以直接问外国人~~语言~~问题的 app & 网站。

### [ffsend](https://github.com/timvisee/ffsend)

（命令行）快速上传分享你的文件 / 文件夹

使用方法（Windows x64）：

1. 下载[ffsend-v0.2.74-windows-x64.exe](https://github.com/timvisee/ffsend/releases/download/v0.2.74/ffsend-v0.2.74-windows-x64.exe)
2. 在下载目录打开**管理员**终端，执行`move .\ffsend-v0.2.74-windows-x64.exe C:\Windows\System32\ffsend.exe`（或手动复制改名
3. 使用 `ffsend upload <file>` 上传文件 / 文件夹，`ffsend download <url>`下载

### ~~uTools~~

~~小时候不懂事加进来的，~~ 现在的 utools 已经[变味了](../gossip/fuckxxx.md#utools-有多难用)，我不推荐。
::: details archived
基于 Electron 的插件化一站式工具。我是其快捷启动功能重度使用者，此功能可添加 `.exe` 文件并快捷启动。此外也常用剪贴板，ocr 等功能。

但其本质上是一个商业化产品，有些功能还免费转收费了，Electron 也高占用低性能。因此对开源有需求可以看看 [PowerToys](https://github.com/microsoft/PowerToys) 和 [rubick](https://github.com/rubickCenter/rubick)，但二者都无法满足我的需求：两者都不支持自添加 `.exe` 文件启动。
:::

### [steam++](https://steampp.net/)

加速器，主要加速 steam 商店与 github。当然更好的选择是科学上网。

### [EnergyStar](https://github.com/imbushuo/EnergyStar)

为你的 windows 笔记本提升续航。

双击 exe 文件后，EnergyStar 将自动在后台运行，不会跳出提示与弹窗。

这玩意已经没人维护了，而且没法通过应用管理器结束程序来放开限制，必需重启。还会锁游戏帧率。于是我就不用了。

有一个接手的 [EnergyStarX](#energystarx)，比本体好用多了。

### ~~IDM~~

高速多线程下载器。需要浏览器插件配合软件使用。官方仅有 30 天试用。若想下载破解版可在 B 站搜索教程。

[官网](https://www.internetdownloadmanager.com/) | [破解](https://www.lanzouw.com/iYFgSw4lede)

### [秒传链接提取](https://greasyfork.org/zh-CN/scripts/424574-秒传链接提取)

秒传链接，百度网盘分享的一种优秀模式。

> 20230xxx: 脚本下架，作者被抓（来源请求），有需求可以看[其他版本](https://greasyfork.org/zh-CN/scripts/427628-百度网盘秒传链接提取-最新可维护版本)

### Keepass 系列

开源多端密码管理器。其中 Keepass2Android 是 Android 端的软件，而 KeePassXC 则是 PC 端的。

[Keepass2Android 项目地址](https://github.com/PhilippC/keepass2android) | [KeePassXC 项目地址](https://github.com/keepassxreboot/keepassxc)

> 为了方便，可以考虑使用 [bitwarden](#bitwarden) 的服务，其支持多端同步密码。但是若你对云端存储感到不安全，还是使用无需联网的 Keepass 吧。

### [扩展管理器](https://microsoftedge.microsoft.com/addons/detail/bhahgfgngfghgjhnpplmemebhenieijb)

快速启用禁用扩展。

比较鸡肋，还吃我资源，因此弃用。

### [Scene5](https://www.coolapk.com/apk/com.omarea.vtools)

强大的数据监视/性能修改应用。建议配合 ADB & root 食用。但是呢，该应用是商业化的收费闭源软件，不充值是无法使用 root 后的功能的。目前其**全功能**均可使用其他软件替代[^4]。因此弃用。
[^4]: [log](https://t.me/withabsolutex/1260)

- 如若确实需要，可以找它的最后一个免费版本使用。

### Picacg

::: details
~~年幼的目光.jpg~~ <span class="heimu" title="你知道的太多了">（绅士们，我发誓我已经很久没有点开这个软件了！）</span>

[官方地址?](https://picacg2022.com/) | [私有下载地址](https://wwp.lanzout.com/iqB7803de12j)
:::

现在看本子都用 `nhentai.net` 了。平时也就看看 tg 推荐，没了。顺带，[这里](../hobbies/NSFW/comic.md)是我的本子推荐。

### ~~[歌词适配](https://wwp.lanzouy.com/iH13D13tnaif)~~

能够直接下载歌曲 / 下载网易云歌单。没有官网，主要靠相互分享传播。~~说不定哪天就寄了~~

ps. 已经寄了。

### [Potplayer](https://potplayer.daum.net/?lang=zh_CN)

视频播放器。无广告，支持格式丰富，功能多样，自定义程度较高。

然而我现在选择 [mpv](#mpv) 了，更加轻量，更加强大，还是跨平台。只是写配置麻烦点罢了。

- [关于 Potplayer 设置](../articles/potplayer_setting.md)

### [f.lux](https://justgetflux.com/)

护眼软件，可以让屏幕变黄，减少蓝光（熬夜神器）。<dtls>[私链](https://wwp.lanzout.com/iqmkq06s0wtg)</dtls>

- 可以在全屏游戏时护眼
- 可以突破显示器的亮度下限（快捷键：`Alt + Page Up/Down`）

但是 windows11 自带色温调节（_显示 - 夜间模式_）也能做到这些，因此该软件的适用范围大大减小了。

### [沉浸式翻译](https://github.com/immersive-translate/immersive-translate)

爆杀 edge 翻译：支持双语对照；支持为翻译添加样式；可选择引擎。

我经历了沉浸式翻译从免费到商业化再到[丑闻](https://www.v2ex.com/t/1042477)的过程，这事情做的跟之前的 [utools](#utools) 实在是太相似了。因此我换用非商业开源的 [kiss translator](#简约翻译)，还多了划词翻译功能。

### [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd)

[被 Violentmonkey 爆杀](https://t.me/withabsolutex/2163)。

### [Bandizip](http://www.bandisoft.com/)

一个闭源压缩与解压软件，支持格式丰富，还自带一些 windows 小功能（右键第一菜单即可新建文件夹）。不用的原因是从 2025 年开始会有弹出式的广告。而且它不能解压 squashfs，7-zip 可以。

初次使用前请按照如下教程设置（踩过坑了）：

1. _设置 - 解压_，打开 _一次性解压 TGZ..._ 下的 _即使是大体积的 TGZ..._ 选项
2. 如果你使用 [RAM Disk](../articles/ramdisk.md)，可以在 _设置 - 高级_ 中，将临时文件夹设为 RAM Disk 路径

### [OneCommander](https://onecommander.com/)

第三方的文件管理器，双栏，自定义化较好。虽然免费版缺失了部分功能，但是还是够用的。特别是在 win10 上强烈推荐安装，因为 win10 资源管理器没有标签页。

不过其也是有缺点的。

- 比如在单击打开文件夹的逻辑上就不够好，没法悬停选中。
- 没法在文件夹打开我的 nushell，没法快速打开一个底栏 shell，像 vscode 那样。
  - 太紧凑，我想右击空白地方时经常就点到文件上，然后就没有打开 shell 的选项了。
- 电脑上的双列反倒还用不习惯。
- 标签多了会挤在一起，不好看清。

## external

1. [自由软件与专有软件之战——写在 MatLab 不再授权给实体请单上的中国高校之后](https://billchen.bid/jekyll/update/2020/06/10/free-software-vs-proprietary-software/)
