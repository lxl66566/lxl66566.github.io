---
date: 2023-11-08
icon: layer-group
category:
  - 教程
  - 经历
tag:
  - 移动端
---

# 模块与软件

::: tip

非 root 软件推荐请前往[软件汇总](../../farraginous/recommend_packages.md#android)。

:::

root 手机的最大目的就是装模块、使用需要 root 权限的软件，获取更加舒适的使用体验。

## 随便说两句

我是一个相当原教旨的人。现在 B 站很多安装模块或软件的工具箱/脚本泛滥，我不喜欢这些，我还是选择纯手动安装能够信任的模块，降低风险。并且我认为，这些东西企图一键帮你做完所有事情本身就是不对的，对于未知事物不仅要知其然，还要知其所以然，在折腾中学习进步才是最好的方式。

## 通用模块

指 magisk 和 KernelSU 通用的模块。

- [神仙自动救砖](https://wwkh.lanzout.com/iWtRC1e7q9wf) | [bak](https://drive.google.com/file/d/14yctRZDZRrN-PaNsnnRn6d9uzbnMYglo/view?usp=sharing)（**闭源！**）：多次重启失败自动禁用模块，恢复冻结的应用。资源不好找，做了个私链备份。
  - 虽然现在一些 root 方式自带了救砖功能，不过刷一个这个模块也没啥问题。
- [TrickyStore](https://github.com/5ec1cff/TrickyStore)：用于隐藏 BL 和绕过 TEE (Trusted Execution Environment) 检测。[相关文章](https://www.reddit.com/r/Magisk/comments/1gegtr4/tutorial_using_trickystore_with_zygisk_next_for/)
  - [Tricky Addon - Update Target List](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)：TrickyStore 的 WebUI，可以快捷添加排除应用。
- [PlayIntegrityFork](https://github.com/osm0sis/PlayIntegrityFork)：修复 Google 服务的模块。Android 13- 必装，其他可选。
- [LSPosed](https://github.com/LSPosed/LSPosed/releases/latest)：必装，一般安装 Zygisk 版。
  - 由于 LSPosed 已经停止更新，对于较新的手机（>= Android 15），也可以看看以下活跃 fork：
    - [JingMatrix/LSPosed](https://github.com/JingMatrix/LSPosed)
  - 当前也有很多人在用 [LSPosed IT (Internal Test)](https://bot.lsposed.org/)。但是我看到这个测试人员条款的时候就有点绷不住了，closedPosed 闹麻了。

## Magisk

安装后可以先隐藏自身，装一下推荐的 _Systemless Hosts_ 模块。

- [AndroidZram](https://github.com/lxl66566/AndroidZram)：我写（改）的模块，为系统提供 zram 内存压缩，使可用内存增大。注意，只能在 Magisk 上用，KernelSU LKM 不能用。
- [BuiltIn-BusyBox](https://github.com/Magisk-Modules-Alt-Repo/BuiltIn-BusyBox)：你也不想进了 root shell 后发现什么都干不了吧。
- [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)：隐藏 root。Shamiko 模块不能在 SukiSU 上安装。
- [uperf](https://github.com/yc9559/uperf)：性能调度。设为 powersave 模式。
  - 在 `perapp_powermode.txt` 中添加音游等游戏性能调度为 `fast`，**然后需要在 `cur_powermode.txt` 中设为 `auto` 才会启用**。
  - 可能会对音游造成影响。不要安装其推荐的两个模块；需要在 `/sdcard/Android/yc/uperf/uperf.json` 中设置 `sfanalysis` 为 `"enable": false`
- ~~阿尔法面具一键隐藏模块：[张力丰哒](https://space.bilibili.com/286681435) 的**闭源**模块。安装该模块会自动安装 Shamiko, Tricky Store, Tricky Store Assistant, Tricky_store 自动更新包名列表, Zygisk Next, Zygisk Maphide 等其他模块。~~ 本人不用这个模块。

## KernelSU

KernelSU 模块界面的左上角有一个模块商店，在这里可以找到一些名气大的常用模块。（当然，本质上还是 Github 下载，需要代理。如果你本来就是需要下载代理模块 (NetProxy)，就不太好从这里搞了）

- [ZygiskNext](https://github.com/Dr-TSNG/ZygiskNext)：KernelSU 没有自带 Zygisk，因此需要使用第三方的注入器。
  - 自带 WebUI，安装完后记得去 WebUI 修改设置：_排除列表策略_ 选择 _仅还原挂载_（注意还需要关闭 KernelSU 的内核 umount，在 SukiSU 上是关闭 _内核处理卸载模块_）；开启 _使用匿名内存_ 和 _使用 Zygisk Next 链接器（实验性）_。第一条是通过 root 检测的关键。
  - 排除列表就是超级用户页面显示 UMOUNT（默认值）的列表。可以查看[这里](https://github.com/Dr-TSNG/ZygiskNext/wiki/基础知识和常见问题)了解更多 ZygiskNext 相关知识。

至于 meta 模块要不要装，我觉得没啥必要。magic mount 没意义，SUSFS 又不能通过模块来实现。

## LSPosed

LSPosed 模块挺多闭源的，这里就懒得标注了。

- ~~微X模块~~ 微信模块检测比较严格，尽量不用
- ~~QQ~~ QQ 在 2024-2025 实施了更加严格的模块检测，使用这些模块有被强制登出甚至封号风险。
  - [QAuxiliary](https://github.com/cinit/QAuxiliary)：强大的 QQ 自定义模块，比 QXposed 好用，必装
  - ~~QXposed~~ 新版 QQ 不能用，久不更新，算是死了，
  - [QQ 瘦身](https://github.com/KitsunePie/QQCleaner)
- ~~TSBattery~~ 同理，如果 QQ 微信都不用模块，那就不用这个了。
- [核心破解](https://github.com/LSPosed/CorePatch/releases)
- 哔哩漫游
- Telegram
  - [TMoe](https://github.com/cinit/TMoe)：Telegram 自定义模块
  - ~~[Telegram UserID Viewer](https://github.com/Xposed-Modules-Repo/com.alex193a.tguseridviewer)~~ TMoe 现在内置支持查看 ID 功能。
  - ~~Killergram~~
  - ~~TeleSpeed~~ 被 _Bili 调速_ 上位替代
- [Bili 调速](https://github.com/Xposed-Modules-Repo/com.veo.hook.bili.speed)：支持为 _哔哩哔哩_, _twitter_, _Telegram_ 设置默认速度
- ~~[DarQ](https://github.com/KieronQuinn/DarQ)：强制暗黑模式。需要在启用模块中选中所有需要强制黑夜的应用。~~ 已经停更了。而且硬上暗黑模式，兼容性可能不好。
- [LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool)：一加的 ColorOS 必装。有了 LuckyTool，生活会轻松很多。
  - 更换不同版本的设备时，建议不要导入旧的配置，请重新手动配置！！！否则可能出现闪屏等问题。
- [拒绝强制亮度](https://github.com/Xposed-Modules-Repo/com.fankes.refusebrightness)
- [AdClose](https://github.com/zjyzip/AdClose) + [秋风规则](https://awavenue.top/Sub.html#更多格式的规则)。具体有没有用还有待商榷。
- [Hide-My-Applist](https://github.com/Dr-TSNG/Hide-My-Applist)：隐藏应用列表，防 root 检测

## App

play 商店本体：使用电脑下载 [apk mirror](https://www.apkmirror.com/apk/google-inc/google-play-store/) 的，选择一个合适的 apk 安装（注意要 apk 标记而不是 bundle）。

通过 play 商店安装：

- [雹](https://github.com/aistra0528/Hail)：冻结应用，详情参考[禁用软件](./settings.md#禁用软件)章节。（拒绝使用同功能闭源商业化的 _冰箱_）
- App ops（**闭源！**）：权限管理。闭源功能有限，可使用 _App Manager_ 代替。（但是没有批量终究不方便）
- 咖啡因：禁止手机自动息屏。如果是没有 root 的 ColorOS 的话可以用这个。

通过 Github 安装：

- [shizuku](https://github.com/RikkaApps/Shizuku)
- [App Manager](https://github.com/MuntashirAkon/AppManager)：开源的 root 软件管理，可以查看运行中服务，可以冻结应用，控制权限。
- [Neo Backup](https://github.com/NeoApplications/Neo-Backup)：备份软件以及数据，root 设备基本是无缝迁移，好用。
- [HyperCeiler](https://github.com/ReChronoRain/HyperCeiler)：Make **HyperOS/MIUI** Great Again!
- [一些去广告应用](../../farraginous/recommend_packages.md#去广告)
- [代理应用](../proxy/proxy_software.md#sing-box-系)

通过其他来源安装：

- ~~Scene5（**闭源！**）：注意，scene5 ROOT 后的功能为试用，到期需**付费**，正在寻找开源免费替代品。~~
  - ~~目前依赖其任务管理，控制性能与冻结应用。~~
  - Scene5 功能均可替代，因此弃用之。
- [Battery Guru(Premium Unlocked)](https://modyolo.com/battery-guru-battery-saver.html)（**闭源！**）：电池管理，省电。
- ~~[奇妙应用](​https://wwwh.lanzoul.co​m/s/MagicalApp)~~：某个三方应用市场，没啥用，又不是破解论坛，该找不到还是找不到。。
- [雪豹闭嘴](https://t.me/microblock_pub/310)：彻底静音扬声器

## external

1. [一加 ACE 竞速版——优化](https://bananazone.cc/一加ace-竞速版-优化/)
