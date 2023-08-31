---
sidebar: heading
icon: install
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
一些好用软件的推荐。
* 关于 magisk & LSPosed，请移步[设置手机](../articles/mobile_setting.md#magisk)
* 关于 linux，请移步 [linux](../articles/linux.md#外部包)
* 猜你喜欢：[设置电脑](../articles/computer_setting.md)

:::tip 阅读此页前请注意
若你还不知道如何使用Github下载文件，请参考[此教程](../coding/github.md)。

使用 Google Play 下载需要[科学上网](../articles/vpn.md)。若未注明应用来源，不妨试试在 Play 商店里找找。
:::
## Android
请注意，私有下载地址不是最新版安装包。若私有链接/安装包失效请[联系作者](../gossip/author.md#社交)。
### ZArchiver
Android 端压缩/解压缩软件。（注：官方也有 PC 端软件）
::: warning 警告
不要在国内应用商店下载该软件，均鉴定为盗版。
:::
[官网下载地址](https://www.zarchiver.me/zarchiver-apk/)  [私有下载地址](https://wwp.lanzout.com/i82ku049jz6j)
### 浏览器
#### [Kiwi Browser](https://kiwibrowser.com/)
**重量级** chromium 系浏览器，你可以像使用电脑浏览器那样使用它。
* 支持所有 chromium 插件，重度插件依赖者请务必安装。
* 拥有控制台。
#### [m浏览器](http://mbrowser.nr19.cn/)
**轻量级**浏览器,（[私链](https://wwp.lanzout.com/iP7FA0eaqk8j)）
* 拥有审查元素，查看网页源码，嗅探网页资源的功能。
* 支持安装脚本，自定义拦截广告，可调长按倍速的视频播放器。
* 安装包仅 9 M。
### MT管理器
MT 管理器是一款强大的文件管理工具和 APK 逆向修改神器。（[source](https://www.coolapk.com/apk/bin.mt.plus)）此处主要推荐文件管理功能，爆杀手机自带的文件管理。可搭配 ROOT 食用。
* 简易教程：滑动进入多选；多选状态下滑动可以选中之间的所有项；多选状态下点击为选中点击项。
* 此软件不开源，为商业化应用；不过免费功能已经够用了。

[官网下载地址](https://bbs.binmt.cc/forum-2-1.html) | [酷安下载地址](https://www.coolapk.com/apk/bin.mt.plus) | [私链](https://wwp.lanzout.com/i9frh06qke0h) | 可在国内应用商店下载
### Fake Location
虚拟定位软件，免 ROOT，大学模拟跑步神器
::: warning
请不要从 Google Play 安装。其对中国地区不可用。
:::
[官方项目地址](https://github.com/Lerist/FakeLocation) | [私有下载地址](https://wwp.lanzout.com/i4x8E03de5ab)
### Picacg
~~年幼的目光.jpg~~ <span class="heimu" title="你知道的太多了">（绅士们，我发誓我已经很久没有点开这个软件了！）</span>

[官方地址?](https://picacg2022.com/) | [私有下载地址](https://wwp.lanzout.com/iqB7803de12j)
### [bitwarden](https://vault.bitwarden.com/#/login)
多端密码管理服务，支持生物识别和自动填充。数据存在美国（或欧盟），自动同步。如果你不信任密码托管方，请使用 [KeePass 系列](#keepass-系列)。
### Adobe Scan
扫描文档并转为pdf。免费版就够用了。

与[扫描全能王](https://w103.camscanner.com/)相比有如下优点：小（安装后，扫描全能王 591MB，Adobe Scan 114MB）；无水印。

[谷歌商店下载](https://play.google.com/store/apps/details?id=com.adobe.scan.android&hl=zh&gl=US)
### [Scene5](https://www.coolapk.com/apk/com.omarea.vtools)
强大的数据监视/性能修改应用。建议配合 ADB & root 食用。但是呢，该应用是商业化的闭源软件，不充值是无法使用 root 后的功能的。我现在只用充耗电统计功能了，其他的还是算了。
### [raindrop.io](https://github.com/raindropio)
第三方书签管理工具。云端存储，多设备访问，免费使用，支持书签分享。

> 我曾经用过 [xbrowsersync](https://github.com/xbrowsersync/app) 书签同步器，但是很久没维护了，而且由于 manifest v2 不再受支持的原因，每隔一段时间就会被浏览器杀掉扩展。因此找到了这个替代品。

电脑端请直接使用[网页版](https://app.raindrop.io/)，手机端可以选择 google play 下载 apk。
### [歌词适配](https://wwp.lanzouy.com/iH13D13tnaif)
能够直接下载歌曲 / 下载网易云歌单。没有官网，主要靠相互分享传播。~~说不定哪天就寄了~~
### 多设备互传
[localsend](https://github.com/localsend/localsend) 和 [LANDrop](https://github.com/LANDrop/LANDrop) 都是优秀的开源局域网多设备互传软件，体积都不大。

我都用过了，更推荐 localsend，因为维护比较频繁。（LANDrop 最后一次 commit 还在 2021 年。。）
### [开源阅读](https://github.com/gedoor/legado)
开源的阅读器，支持导入书源，支持 txt **与 epub 格式**。

[书源推荐](https://legado.aoaostar.com/)，也可去 Telegram 官方群寻找其他书源。
## Windows
### [scoop](https://scoop.sh/)
说到 windows 包管理器就不得不推荐著名的 scoop。<span class="heimu" title="你知道的太多了">实际上我最早用的 chocolatey，说实话都挺好用的</span> 你可以很方便地使用一条命令安装许多优秀软件与运行环境，而不必担心环境变量等问题。
:::warning
请使用[代理](../articles/vpn.md)以获得更好的 scoop 使用体验：`scoop config proxy 127.0.0.1:<port>`
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
### [Parsec](https://parsec.app/downloads)
**极低延迟**的远程控制软件。P2P连接。支持手机控制电脑。

与向日葵相比：
* 优点：
    * 低延迟
    * 性能占用极低
* 缺点：
    * 全英文
    * 需要自己解决驱动兼容性问题（如果有的话）
    * 手机端控制电脑不够友好（无法右击；无法像向日葵一样调出鼠标），建议自带轻便键鼠
### [Tai](https://github.com/Planshit/Tai)
记录软件使用时长  ~~推gal神器~~，掌控自己的时间消耗
### [蓝奏云](https://wwa.lanzoui.com/)
比较推荐的云盘。虽然是个网页，放进 *应用汇总* 里面不太合适。*（本页私链下载文件大多保存于蓝奏云）*

优点：
* 无限存储空间
* 无限制的下载速度
* 优秀的文件分享机制

缺点：
* 单文件限制大小100M（且不能通过分包压缩改后缀规避限制；~~*猜测是会读取分包的连接信息并判断*~~）
* 文件目录管理功能垃圾

> 若并非主要面向国内下载，也可以使用 Google drive & onedrive
### [SpaceSniffer](https://spacesniffer.en.softonic.com/)
可视化磁盘空间占用，方便清理
### [Everything](https://www.voidtools.com/zh-cn/downloads/)
快速搜索，几乎不花时间。推荐配合 [EverythingToolbar](https://github.com/srwi/EverythingToolbar) 使用。
### [geek](https://geekuninstaller.com/download)
轻量级软件卸载工具，仅 4M，**可清理文件与注册表残留**。<span class="heimu" title="你知道的太多了">[私链](https://wwp.lanzout.com/icAdmharg2h)</span>
### [Bandizip](http://www.bandisoft.com/)
闭源压缩与解压软件，较轻量，界面优秀，支持格式丰富。当然，若对开源有追求，请移步 [7zip](https://www.7-zip.org/) | [NanaZip](https://github.com/M2Team/NanaZip)。

初次使用前请按照如下教程设置（踩过坑了）：
1. *设置 - 解压*，打开 *一次性解压 TGZ...* 下的 *即使是大体积的 TGZ...* 选项
2. 如果你使用 [RAM Disk](../articles/ramdisk.md)，可以在 *设置 - 高级* 中，将临时文件夹设为 RAM Disk 路径
<!-- ### [Potplayer](https://potplayer.daum.net/?lang=zh_CN)
视频播放器。轻量无广告，功能多，支持格式丰富，支持任意倍速，功能多样，自定义程度高。

[关于 Potplayer 设置](../articles/potplayer_setting.md) -->
### [mpv](https://mpv.io/)
轻量级多端开源视频播放器，高度自定义化。我在尝试了 potplayer，VLC 后仍选择了 mpv。以下是[我的 mpv 配置文件](https://github.com/lxl66566/my-key-data/blob/main/config/mpv/input.conf)：
```
# C:\Users\<user name>\scoop\persist\mpv\portable_config\input.conf
d add speed .1
a add speed -.1
s set speed 1.0
WHEEL_UP seek -10
WHEEL_DOWN seek 10
UP add volume 1
DOWN add volume -1
e screenshot
```
### [f.lux](https://justgetflux.com/)
护眼软件，可以让屏幕变黄，减少蓝光（熬夜神器）。<span class="heimu" title="你知道的太多了">[私链](https://wwp.lanzout.com/iqmkq06s0wtg)</span>
* 可以在全屏游戏时护眼
* 可以突破显示器的亮度下限（快捷键：`Alt + Page Up/Down`）
### RAM Disk
RAM Disk 系列软件可以将内存映射为硬盘，养成将临时文件存放在 RAM 中的好习惯，保护固态盘的寿命。

详情请见 [文章 - RAM Disk 横评](../articles/ramdisk.md)。
### [图吧工具箱](http://www.tbtool.cn/)
集成了电脑及其外接设备测试所需的多数软件集硬件测试，跑分，信息查询为一体。不过也比较大。
### ADB
电脑调试 Android 手机的必备工具，包括查询信息，备份，安装等常用功能。
* [简易教程](../articles/adb.md)

[官网](https://developer.android.com/studio/command-line/adb) | [从谷歌直接下载](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
### [ContextMenuManager](https://github.com/BluePointLilac/ContextMenuManager)
开源的右键菜单管理器。高度自定义化。
### [Anki](https://apps.ankiweb.net/)
多平台开源记忆软件。拥有多端同步，遵循记忆曲线，高自由度制卡等特色。

附有[使用技巧](https://github.com/lxl66566/wordsreciter/issues/1)与[我的卡组](https://ankiweb.net/shared/info/772249450)。
### [sandboxie](https://sandboxie-plus.com/downloads/)
开源沙盒，隔离运行程序，有时候用得到。
### [Winaero Tweaker](https://winaero.com/)
挺不错的windows小工具，集成一些高级功能（特别对我这种被迫设置win11的人有点帮助）
### [flameshot](https://flameshot.org/)
基于 Qt 的强大的截屏软件，开源，跨平台，轻量级。（有一定延迟）

*建议在设置中开启开机自启。*
### [Ditto](https://github.com/sabrogden/Ditto)
是一个开源轻量级的剪贴板管理工具。使用 C 语言编写，具有低内存占用和高性能，同时拥有一些其他特色：
* 支持暗黑模式
* 支持对复制粘贴行为的脚本处理，例如我使用以下脚本去除 bilibili 视频分享链接的跟踪器与其他无用内容：
    ```
    clip.AsciiTextReplaceRegex(".*https://www.bilibili", "https://www.bilibili");
    clip.AsciiTextReplaceRegex("share_source=copy_web&?", "");
    clip.AsciiTextReplaceRegex("vd_source=[0-9a-zA-Z]+&?", "");
    return false
    ```
* 超星学习通自动转为下载链接：
    ```
    clip.AsciiTextReplaceRegex("^https://mooc.s.ecust.edu.cn/coursedata.*objectId=(.*)&?.*","http://cs.e.ecust.edu.cn/download/$1");
    return false
    ```
* 复制网址保留汉字时自动补全：
    ```
    clip.AsciiTextReplaceRegex("^t?(tps?://.*)","ht$1");
    return false
    ```
### [yt-dlp](https://github.com/yt-dlp/yt-dlp)
视频下载**命令行**工具。主要用于 bilibili, youtube 视频的下载。若不想用命令行请移步 [CoCoCut](#cococut)。

简易教程（Windows）：
1. 去 release 下载 `yt-dlp.exe` 并扔到 `C:\Windows\System32` 下[^2]。
2. 默认下载为音视频分离。若需音视频合成，还需下载大名鼎鼎的 ffmpeg：使用 [scoop](#scoop) 一行完事：`scoop install ffmpeg`
3. `yt-dlp <url>` 快速下载视频。
4. 下载指定清晰度或仅音频：`yt-dlp -F <url>` 选择清晰度或音频资源；将选项 ID 填入 `yt-dlp -f <ID> <url>` 进行下载。

[^2]: 可能需要提权。一个普通人更熟悉的方法是将 `yt-dlp.exe` 存放目录添加到环境变量（但是更麻烦）。
## 浏览器插件
> *注：点击[绿色](#浏览器插件)标题即可添加插件至浏览器。*
### 视频速度控制
控制视频播放速度，0.07x - 16.00x。主要适合需要高倍速观看视频的人群 *（对我来说用处真的很大）*，也可用来快速刷课，练习听力等。

* 使用方法：`A` 和 `D` 可 +-0.1x倍速，`S` 用来回到 1.00x 或上一倍速。当然也可用鼠标操作。插件倍速会覆盖视频本身的倍速。
> 如需更改热键请在`扩展-扩展选项`中进行操作。
* 缺点：全局锁死热键，需要用此键原本功能时要临时禁用。

[官方项目地址](https://github.com/polywock/globalSpeed) | [edge商店](https://microsoftedge.microsoft.com/addons/detail/global-speed-%E8%A7%86%E9%A2%91%E9%80%9F%E5%BA%A6%E6%8E%A7%E5%88%B6/mjhlabbcmjflkpjknnicihkfnmbdfced) | [私链](https://wwp.lanzout.com/i9LKF05ht3ni)
### [AdGuard](https://chrome.google.com/webstore/detail/adguard-adblocker/bgnkhhnnamicmpeenaelnjfhikgbkllg)
极为强大的广告拦截。支持选中元素，自定义规则。
* 推荐搭配[秋风广告规则](https://github.com/TG-Twilight/AWAvenue-Adblock-Rule)食用：复制订阅规则 URL（根据情况选择是否反代），粘贴到 *Adguard - 设置 - 过滤器 - 自定义 - 添加自定义过滤器* 中。
### [xdm](https://github.com/subhra74/xdm)
开源免费的多线程高速下载器，[idm](#idm) 替代品。截至 20230605，部分汉化缺失。

20230614: 闪退 bug，重置无效。
### [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd)
运行脚本。
### [SuperCopy](https://chrome.google.com/webstore/detail/supercopy-enable-copy/onepmapfbjohnegdmfhndpefjkppbjkm)
强大的`禁止复制`破解插件。比脚本好用。
### [DARK READER](https://darkreader.org/)
浏览器强制夜间模式，效果不错。
### [为什么你们就是不能加个空格呢？](https://chrome.google.com/webstore/detail/paphcfdffjnbcgkokihcdjliihicmbpd)
可以自动在网页的字母，符号，数字与汉字间加空格，改善观感。~~很有个性的名字，不是吗？~~

[前往 Github](https://github.com/vinta/pangu.js)
> 也可以使用 Tampermonkey + 脚本方式，以便在 firefox 等非 chromium 系浏览器上使用。
### [沉浸式翻译](https://microsoftedge.microsoft.com/addons/detail/amkbmndfnliijdhojkpoglbnaaahippg)
爆杀 edge 翻译：支持双语对照；支持为翻译添加样式；可选择引擎。

前往[项目地址](https://github.com/immersive-translate/immersive-translate)
### [CoCoCut](https://microsoftedge.microsoft.com/addons/detail/视频下载扩展cococutvideo-down/npdhgjfiikhgncaacnnodpfchmelnchm)
在遇到 [yt-dlp](#yt-dlp) 不支持的网站时，另一个可用的视频下载工具就显得尤为重要。CoCoCut 在支持抓取媒体的基础上，还能够下载 m3u8 流视频，甚至能通过录制方式下载。
## 浏览器脚本
::: tip 提示
请确保已经安装插件[Tampermonkey](#tampermonkey)。
:::
### [Google Hit Hider](https://greasyfork.org/scripts/1682)
过滤 Google & 百度 搜索结果，不要让垃圾网站污染眼睛。需要手动维护自己的 blocklist[^3]。
[^3]: 也可以用用[我的](https://github.com/lxl66566/my-key-data/blob/main/Browser/blocklist(Google%20Hit%20Hider%20by%20Domain).txt)；但是很抱歉，目前仓库是 private
### [哔哩哔哩自动连播](https://greasyfork.org/zh-CN/scripts/408516-%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E8%87%AA%E5%8A%A8%E8%BF%9E%E6%92%AD)
跳过bilibili视频末尾的充电鸣谢 *（对B站重度使用者还是很推荐的）*
### [三相之力指示器](https://greasyfork.org/zh-CN/scripts/451150-新-三相之力指示器)
三相之力！B 站评论区自动标注三相玩家。
### [全平台自动答题脚本](https://greasyfork.org/zh-CN/scripts/451356-万能-全平台自动答题脚本)
大学生的学习通答题神器。
## 一些过时的推荐
::: warning
此处推荐多为我年轻时的推荐，现已放弃使用，仅供参考。
:::
### 永久阅读器
**推荐使用 [开源阅读](../hobbies/books.md#工具) 代替。**

内置书源的小说阅读器。阅读界面无广告，开屏有广告。（注：相当一部分日轻无可用书源）[私有下载地址](https://wwp.lanzout.com/iLG4D03de8fe)
### Go安装器
一键安装 Google 框架。不过现在就算国行系统，一般也自带 Google 框架就是了，这个第三方闭源安装器显得有些没必要。
* 注意，安装框架后还需自行安装 Google Play 等。

[酷安下载地址](https://www.coolapk.com/apk/com.goplaycn.googleinstall) | [私链](https://wwp.lanzout.com/iYyA10686e7c)
### [NekoX](https://github.com/NekoX-Dev/NekoX)
Telegram 第三方开源客户端，自带很不稳定的低速公共代理，但至少能用；~~在tg第三方内名声挺差~~。更新滞后较大，若有科学上网方法还是建议使用官方端。
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
::: details 详细信息
基于 Electron 的插件化一站式工具。我是其快捷启动功能重度使用者，此功能可添加 `.exe` 文件并快捷启动。此外也常用剪贴板，ocr 等功能。

但其本质上是一个商业化产品，有些功能还免费转收费了，Electron 也高占用低性能。因此对开源有需求可以看看 [PowerToys](https://github.com/microsoft/PowerToys) 和 [rubick](https://github.com/rubickCenter/rubick)，但二者都无法满足我的需求：两者都不支持自添加 `.exe` 文件启动。
:::
### [steam++](https://steampp.net/)
加速器，主要加速 steam 商店与 github。当然更好的选择是科学上网。
### [EnergyStar](https://github.com/imbushuo/EnergyStar)
为你的 windows 笔记本提升续航。
> 小提示，双击exe文件后，EnergyStar将自动在后台运行，不会跳出提示与弹窗。

我之前用了下，它会锁游戏帧率，而且没法通过应用管理器结束程序来放开限制。于是就不用了。
### ~~IDM~~
use [xdm](#xdm) instead.

高速多线程下载器。需要浏览器插件配合软件使用。官方仅有30天试用。若想下载破解版可在B站搜索教程。

[官网](https://www.internetdownloadmanager.com/) | [破解](https://www.lanzouw.com/iYFgSw4lede)
### [秒传链接提取](https://greasyfork.org/zh-CN/scripts/424574-%E7%A7%92%E4%BC%A0%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96)
秒传链接，百度网盘分享的一种优秀模式。
> 20230xxx: 脚本下架，作者被抓，有需求可以看[其他版本](https://greasyfork.org/zh-CN/scripts/427628-百度网盘秒传链接提取-最新可维护版本)
### Keepass 系列
开源多端密码管理器。其中Keepass2Android是Android端的软件，而KeePassXC则是PC端的。

[Keepass2Android项目地址](https://github.com/PhilippC/keepass2android) | [KeePassXC项目地址](https://github.com/keepassxreboot/keepassxc)
> 为了方便，可以考虑使用 bitwarden 的服务，其支持多端同步密码。但是若你对云端存储感到不安全，还是使用无需联网的 Keepass 吧。
### [扩展管理器](https://microsoftedge.microsoft.com/addons/detail/bhahgfgngfghgjhnpplmemebhenieijb)
快速启用禁用扩展。
> 比较鸡肋，还吃我资源，因此弃用。
## external
1. [自由软件与专有软件之战——写在 MatLab 不再授权给实体请单上的中国高校之后](https://billchen.bid/jekyll/update/2020/06/10/free-software-vs-proprietary-software/)