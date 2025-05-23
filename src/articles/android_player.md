---
date: 2025-02-07
icon: play
category:
  - 推荐
tag:
  - 移动端
  - 横评
  - 音频
---

# Android 音乐播放器横评

播放器这个赛道虽然已经卷得要死，但各种产品看起来总是大同小异，并且总有些我不满意的地方。

1. 许多 material 风格，许多产品只注重外观，而不注重用户交互体验。
2. 每个播放器都会扫描全局音频，然后在播放器首页把我的音乐和录音和其他奇奇怪怪的音频全部混在一起。
3. 因此，听音乐需要划定一个范围，一般使用文件夹模式。然而有的播放器进入文件夹模式需要的点击数太多了，我打开软件后还需要多次点击才能听音乐。
4. Android 设备上进行快速导航的最佳实践就是侧边滑动首字母。这个在任何 OS 的联系人软件里都能看到的、让 Niagara Launcher 成功的核心设计，却很难在音乐播放器里见到。

## 一表流

<!-- prettier-ignore -->
| 名称 | 开源? | 随机播放? | 播放点击数 | 内存占用 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 椒盐音乐 | ❌ | ✅ | 2 | 114M | 致命缺陷 |
| APlayer | ✅ | ✅ | 4 | 60M |
| Gramophone | ✅ | ✅ | 4 | 89M |
| Phocid | ✅ | ✅ | 2 | 77M |
| Oto Music | ❌ | ✅ | 4 | 153M |
| Phonograph Plus | ✅ | ✅ | 2 | 135M |
| Powerramp | ❌ | ✅ | 3 | 327M |

字段解释：

- 播放点击数定义：从 APP 首页，到文件夹，到我播放一首指定歌曲（假设无需寻找）所花费的点击数
- 内存占用：同一设备播放同一首歌的内存占用

## 详细评价

一般播放点击数 \<=2 的软件，是通过“记住我上一次退出时所在区域”减小点击数的，这是不错的设计。

椒盐音乐比起其他播放器，还多了侧边滑动首字母，选歌方便，我确实喜欢。它用的 UI 是自己做的而不是直接 material，内存占用稍高也可以原谅。但是它有一个致命缺陷让我不得不抛弃之：文件夹列表被缓存，无法更新。也就是说我向文件夹里添加新歌后，它并不能检测到，并添加到播放列表。

APlayer 在 Github 上很火，并且有一个叫 “随机播放全部” 的按钮比较好用。

Gramophone 和 Phocid 这俩都是 Material，非常相似，甚至播放进度条的样式都是一模一样的，使用手感也差不多。根据上表，我更倾向于 Phocid。

Oto Music 也是 Material 的，优点是自带均衡器。[这里](https://t.me/xyxyspace/1746)有破解了高级版的。

Phonograph Plus 有出现文件夹点不开的 bug。

Powerramp 是付费软件，可以下载限时试用；在[这里](https://modyolo.com/download/poweramp-506)可以下载到破解版。整体的 UI 设计真的是**非常惊艳**，比千篇一律的 material 好看/有个性多了。并且也有均衡器支持和侧边首字母选歌。它是列表中唯一一个不会自动扫盘找歌曲的软件，我可以自己选择让它读取的文件夹，从而避免录音等被放到播放列表中。因此列表中的 _播放点击数_ 就不再重要了。
