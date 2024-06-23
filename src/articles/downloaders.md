---
date: 2024-06-11
icon: download
category:
  - 推荐
  - 评价
tag:
  - 横评
  - 工具
  - 桌面端
  - Windows
---

# 下载器横评

下载器能够多线程下载网络资源，使带宽最大化。

这理应是所有浏览器必需内置的功能。在写此文时查了一下，主流的浏览器都自带多线程下载功能，可以在 flags 里启用；但本人实测其下载速度仍要比下载器慢很多，因此下载器还是有必要的。

测试：（[测试链接](https://gh.con.sh/https://github.com/AaronFeng753/Waifu2x-Extension-GUI/releases/download/v2.21.12/Waifu2x-Extension-GUI-v2.21.12-Portable.7z)；关闭代理）

需要注意的是，这样的测试方法的波动还是相当大的，毕竟我校的网络就是一坨屎。

|         方式          | 下载速度（MB/s） |
| :-------------------: | :--------------: |
|      浏览器内置       |       5.9        |
| Neat Download Manager |       10.0       |

## 开启内置功能

可以去[这里](https://www.91mobiles.com/hub/parallel-downloading-how-to-enable-faster-download-speeds/)查询如何开启多线程下载。

- edge: `edge://flags/#enable-parallel-downloading`
- chrome: `chrome://flags/#enable-parallel-downloading`

浏览器默认是不开启的。你可以下载一个大文件，如果在下载完毕后需要等待一阵子，并且等待时间与文件大小成正比，那就意味着已开启多线程下载，因为其下载完各块后需要一个合并过程。（注意，要关掉 Windows Defender 等一切杀毒软件。否则等待时间不一定用于合并块。）

## IDM

想必大家都听过 IDM 的大名。我在小初时接触的第一款下载器就是 IDM，当然，是破解版。

IDM 是一个付费软件，但是在中国的环境下大家用的都是盗版。具体的可以在 bilibili 找到，理论上选播放量大的视频给出的下载链接不容易下载到带病毒的版本。如果是其他地方下载的，有病毒的风险相对更高。

## [XDM](https://github.com/subhra74/xdm)

我的第二个下载器是 XDM。XDM 是一个 Github 开源的下载器，其界面还算好看。后面弃用的原因是：

- 部分汉化缺失。
- 20230614: 闪退 bug，重置无效。（直接原因）
- 需要特定文件后缀才会激活 XDM，无法使其接管所有文件的下载。
- 手感比 IDM 差。

## [Neat Download Manager](https://www.neatdownloadmanager.com/index.php/en/)

功能和逻辑都和 idm 差不多。

- 界面比较古老，但是至少是完整的 darkmode，我不要求太高。
- 有崩溃记录，但是不经常。

## [httpdownloader](https://github.com/erickutcher/httpdownloader)

尝试的另一个开源 downloader。

- 下载麻烦：
  - 没有 README
  - 软件本体分别叫 `HTTP_Downloader_64.zip`，`HTTP_Downloader_DM_64.zip`，`HTTP_Downloader_LS_64.zip`，我都下了以后发现 DM 是 darkmode 的意思，而 LS 就不知道了。
  - 浏览器插件需要下载仓库源码，然后把 `HTTP_Downloader_Chrome_Extension` 文件夹单独给浏览器加载。
- 当然，最重要的问题是根本不可用。我用的是 darkmode 版的，安装了扩展，配置好了下载器，发现其根本不会接管浏览器的下载请求。

## [Motrix](https://github.com/agalwood/Motrix)

Github 高赞的仓库，支持 torrent 下载。界面做得很好看，但是也很重量级。已经[很久没有维护](https://github.com/agalwood/Motrix/issues/1379)了，作者 Github 也没有其他动态，疑似作者跑路或出事。

用起来比浏览器开多线程下载稍快，可以算作误差。
