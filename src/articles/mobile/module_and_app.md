---
date: 2023-11-08
icon: module
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

root 手机的最大目的就是装模块与需要 root 权限的软件，获取更加舒适与安全的使用体验。这里给出一些推荐。

## Magisk

安装后可以先隐藏自身，装一下推荐的 _Systemless Hosts_ 模块。

- [LSPosed](https://github.com/LSPosed/LSPosed/releases/latest) (Zygisk)
- [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)：隐藏 root。
- [uperf](https://github.com/yc9559/uperf)：性能调度。设为 powersave 模式。
  - 在 `perapp_powermode.txt` 中添加音游等游戏性能调度为 `fast`，**然后需要在 `cur_powermode.txt` 中设为 `auto` 才会启用**。
  - 可能会对音游造成影响。不要安装其推荐的两个模块；需要在 `/sdcard/Android/yc/uperf/uperf.json` 中设置 `sfanalysis` 为 `"enable": false`
- [神仙自动救砖](https://wwkh.lanzout.com/iWtRC1e7q9wf) | [bak](https://drive.google.com/file/d/14yctRZDZRrN-PaNsnnRn6d9uzbnMYglo/view?usp=sharing)（**闭源！**）：不好找，做了私链备份

## LSPosed

LSPosed 模块挺多闭源的，这里就懒得标注了。

- WeXposed
- QQ
  - [QAuxiliary](https://github.com/cinit/QAuxiliary)：强大的 QQ 自定义模块，比 QXposed 好用，必装
  - ~~QXposed~~ 新版 QQ 不能用，久不更新，算是死了，
  - [QQ 瘦身](https://github.com/KitsunePie/QQCleaner)
- TSBattery
- [核心破解](https://github.com/LSPosed/CorePatch/releases)
- 哔哩漫游
- Telegram
  - [TMoe](https://github.com/cinit/TMoe)：Telegram 自定义模块
  - Telegram UserID Viewer
  - ~~Killergram~~
  - ~~TeleSpeed~~ 被 _Bili 调速_ 上位替代
- Bili 调速：支持为 _哔哩哔哩_, _twitter_, _Telegram_ 设置默认速度
- [DarQ](https://github.com/KieronQuinn/DarQ)：强制暗黑模式。需要在启用模块中选中所有需要强制黑夜的应用。
- [LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool)：一加的 ColorOS 必装。有了 LuckyTool，生活会轻松很多。
- [拒绝强制亮度](https://github.com/Xposed-Modules-Repo/com.fankes.refusebrightness)
- [AdClose](https://github.com/zjyzip/AdClose) + [秋风规则](https://awavenue.top/Sub.html#更多格式的规则)

## App

通过 play 商店安装：

- [shizuku](https://github.com/RikkaApps/Shizuku)
- [雹](https://github.com/aistra0528/Hail)：冻结应用，详情参考[禁用软件](./settings.md#禁用软件)章节。（拒绝使用同功能闭源商业化的 _冰箱_）
- App ops（**闭源！**）：权限管理。闭源功能有限，可使用 _App Manager_ 代替。（但是没有批量终究不方便）

通过 Github 安装：

- [AdAway](https://github.com/AdAway/AdAway)：改 host 屏蔽广告。经常需要手动添加屏蔽项。
    <!-- * 可以在 *首选项 - 基于 root... - 安装自签名证书*，以避免 Android 系统的 WIFI 认证 -->
- [App Manager](https://github.com/MuntashirAkon/AppManager)：开源的 root 软件管理，可以查看运行中服务，可以冻结应用，控制权限。
- [Neo Backup](https://github.com/NeoApplications/Neo-Backup)：批量备份，带数据，可定时

通过其他来源安装：

- ~~Scene5（**闭源！**）：注意，scene5 ROOT 后的功能为试用，到期需**付费**，正在寻找开源免费替代品。~~
  - ~~目前依赖其任务管理，控制性能与冻结应用。~~
  - > Scene5 功能均可替代，因此弃用之。
- [Battery Guru(Premium Unlocked)](https://modyolo.com/battery-guru-battery-saver.html)（**闭源！**）：电池管理，省电。
- [李跳跳](https://t.me/apkrxwy/927) | [bak](https://wwkh.lanzout.com/iokl61e21oha)（**闭源！**）：跳广告，比 AdAway 好用。软件离线使用，不再更新。~~腾讯封杀，必属精品~~
- ~~[奇妙应用](​https://wwwh.lanzoul.co​m/s/MagicalApp)~~：某个三方应用市场，没啥用，又不是破解论坛，该找不到还是找不到。。
- [雪豹闭嘴](https://t.me/microblock_pub/310)：彻底静音扬声器

## external

1. [一加 ACE 竞速版——优化](https://bananazone.cc/一加ace-竞速版-优化/)
