---
date: 2023-01-22
icon: mobile
category:
  - 教程
  - 生活
  - 经历
tag:
  - 移动端
---

# 设置手机

为了追求**绝对控制**与我所需要的功能。前往[MIUI 有多难用](../gossip/fuckxxx.md#miui13-有多难用)

## before root

型号：Redmi note 10 pro (sweet)

1. 开启开发者模式
   - 在 USB 调试版块，该放行放行，该关闭关闭。
   - 在最下方关闭 MIUI 优化。MIUI 优化可能会导致无法使用 adb install 安装软件。（报错 `INSTALL_FAILED_USER_RESTRICTED`）_顺带，这已经是一个持续至少 6 年的问题了。_
     - 关闭后刷新率会自动 120HZ，调回 60。
2. [使用 ADB 卸载](./adb.md)一些包
   - `com.miui.systemAdSolution`：广告
   - `com.miui.hybrid`：快应用，杂种；[为什么要卸载](#禁用快应用中心)
   - `com.sohu.inputmethod.sogou.xiaomi` & `com.iflytek.inputmethod.miui`：自带的 搜狗 讯飞 输入法，我用 gboard
   - `com.miui.newhome`：内容中心，广告，好像不能卸载只能禁用
3. 关闭 Github Mobile 的默认打开网址。Github Mobile 因 2FA 需要使用，但使用其查看项目确实非常智障。幸好 MIUI14 提供了设置应用默认打开的功能：长按应用 - 应用信息 - 默认打开，调为拒绝。

## magisk

假定已经完全 root 并安装好了 magisk（参见[刷机](#刷机)）。以下是我的配置步骤。

1. 隐藏：_首页右上角 - 设置 - App - 隐藏_
2. 安装 [LSPosed](https://github.com/LSPosed/LSPosed/releases/latest) (Zygisk)：下载 zip，复制进手机，在 _magisk - 模块_ 安装并重启，在设置中打开 Zygisk。（不再重复模块安装步骤）
3. 安装内置的屏蔽广告插件(_Systemless Hosts_)

### magisk modules

推荐一些模块与 root 应用。

- LSPosed
- [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)：隐藏 root。
- [uperf](https://github.com/yc9559/uperf)：性能调度。设为 powersave 模式。
  - 在 `perapp_powermode.txt` 中添加音游性能调度为 `fast`，**然后需要在 `cur_powermode.txt` 中设为 `auto` 才会启用**。
  - > 可能会对音游等造成影响。不要安装其推荐的两个模块；需要在 `/sdcard/Android/yc/uperf/uperf.json` 中设置 `sfanalysis` 为 `"enable": false`
- [神仙自动救砖](https://drive.google.com/file/d/14yctRZDZRrN-PaNsnnRn6d9uzbnMYglo/view?usp=sharing)（**闭源！**）：不好找，做了个私链备份（需要科学上网）
<!-- * [电池容量纠正](https://downloads.suchenqaq.club/magiskmodules/tool/%E7%94%B5%E9%87%8F%E4%BF%AE%E5%A4%8D.zip)（**闭源**） -->

### LSPosed modules

- WeXposed
- QXposed
- TSBattery
- [核心破解](https://github.com/LSPosed/CorePatch/releases)
- 哔哩漫游
- [自动记账](https://github.com/Auto-Accounting/Qianji_auto)，测试中
- [QQ 瘦身](https://github.com/KitsunePie/QQCleaner)
- Telegram UserID Viewer
- Bili 调速

### 其他

通过 play 商店安装：

- [shizuku](https://github.com/RikkaApps/Shizuku)
- [雹](https://github.com/aistra0528/Hail)：冻结应用，详情参考[禁用软件](#禁用软件)章节。（拒绝使用同功能闭源商业化的 _冰箱_）
- App ops（**闭源！**）：权限管理。闭源功能有限，可使用 _App Manager_ 代替。（但是没有批量终究不方便）

通过 Github 安装：

- [AdAway](https://github.com/AdAway/AdAway)：改 host 屏蔽广告。经常需要手动添加屏蔽项。
    <!-- * 可以在 *首选项 - 基于 root... - 安装自签名证书*，以避免 Android 系统的 WIFI 认证 -->
- [DarQ](https://github.com/KieronQuinn/DarQ)：强制暗黑模式。需要在启用模块中选中所有需要强制黑夜的应用。
- [App Manager](https://github.com/MuntashirAkon/AppManager)：开源的 root 软件管理，可以查看运行中服务，可以冻结应用，控制权限。

通过其他来源安装：

- ~~Scene5（**闭源！**）：注意，scene5 ROOT 后的功能为试用，到期需**付费**，正在寻找开源免费替代品。~~
  - ~~目前依赖其任务管理，控制性能与冻结应用。~~
  - > Scene5 功能均可替代，因此弃用之。
- [Battery Guru(Premium Unlocked)](https://modyolo.com/battery-guru-battery-saver.html)（**闭源！**）：电池管理，省电。

## 刷机

使用 MIUI 刷机工具时，千万不要在右下角选择 lock（我一般直接删 \*lock.sh/bat）；最好把 Configuration 中的 CheckPoint 删了。

### Redmi Note 10 pro

> 题外话：~~高考结束后买的手机，当时还是一个普通人，自然不知道刷机解 bl root 这些东西，等我想解的时候已经太迟了，数据已经太多了。下一部手机必 root。~~ 然而等到了一个能够使我无视数据的契机。<br/><span class="heimu" title="你知道的太多了">忘了备份应用时间了，妈的；后来发现这东西没法备份。</span>

20230614 记一次失败的刷机（redmi note 10 pro, sweet）。

1. 解 BL 锁，等了 7days。
2. 刷入 twrp [失败](#刷入-twrp-失败)。

没有第三方 recovery 就无法卡刷，而一些类原生例如 Havoc OS | Evolution OS 只提供了卡刷包，无法线刷。寄。~~（据说有 python 脚本能把卡刷包转成线刷包，没试过，有生之年）~~

退而求其次，想刷 EU 版 MIUI，[失败 again](#线刷-global-失败)，寄。

再退，用国行 MIUI (chopin)，不使用 twrp 刷入 magisk。（kernelSU 不支持：非 GKI 设备内核）

1. 安装 [magisk](https://github.com/topjohnwu/Magisk/releases/latest)。
2. 从原生线刷包把 `boot.img` 拷到手机上。
3. 在 magisk 中，选择安装 magisk（修补一个文件），选择 `boot.img` 修补。
4. 再将修补后的 `magiskxxx.img` 拷回电脑，`fastboot flash boot magiskxxx.img && fastboot reboot` 刷 新 boot。
5. 好了，之后就是[另一个板块](#magisk)了。

### mipad 5

20230715，尝试刷我的小米平板 5（nabu）。

折腾了一下 twrp，在 Github 下载了一个[不明来源的 twrp](https://github.com/bm0x/twrp_device_xiaomi_nabu/releases) 刷入，又寄了，表现为闪屏无法启动。算了，这年头 VAB 分区的我再也不想再折腾 twrp 了。好在有了第一次的刷机经验，没有手忙脚乱，能进 fastboot 就能救。

退而求其次，刷 EU。在[这里](https://xiaomirom.com/download/xiaomi-pad-5-nabu-stable-V14.0.4.0.TKXMIXM/#global-fastboot)找了个欧版 ROM，这次倒是没出什么岔子，10min 后顺利刷入。那接下来的 root & magisk 也是水到渠成了，这里按下不表。

但是等我开始搞机，渐渐发现事情没我想象得那么简单。

1. EU 的 Google 全家桶也是无法卸载（即使有些边角如 YT Music 能卸载，Play store 也会再悄悄给你下回来），近 20 个 Google 密密麻麻排着嘲笑我，数量甚至比国行还多；
2. 后台运行着好多叫不出名字的奇怪服务，有些我 Google 半天也搜不到是什么（例如 `com.qti.qcc`）；
3. 也间接导致了[之后的系统崩溃](#乱冻结)。（我承认主要责任在我）

然后使用 miflash 刷回国行；刷入失败。一重启就自动进 fastboot。由于[此 ROM 下载地址](https://xiaomirom.com/rom/mi-pad-5-nabu-china-fastboot-recovery-rom/)没有 MD5，于是[换了一个](https://xiaomifirmwareupdater.com/archive/miui/nabu/)重下，校验 MD5，没有任何问题。刷机工具 Configuration 设置 EraseAll，再刷，还是不行。然后刷欧版，就行了。。由于每次刷机都需要 10min 以上，我连着刷了 5 6 次，等待的时间确实紧张难熬。

所以刷欧版是一件非常冒险的事：在只使用初级工具前提下[^1]，这一步没有后悔药，没法再刷回其他系统[^2]。
[^1]: 指 miflash + adb。我有考虑过使用[磁盘模式工具](https://web.vip.miui.com/page/info/mio/mio/detail?postId=1655550)甚至更底层的方法，但是尚未有收入的我还是无法承担飙升的刷砖风险。
[^2]: 暂不清楚是只是 _无法刷回国行_ 还是 _无法刷成其他任一系统_。推测是刷 EU 的分区(?)更改比国行的多，导致刷回国行时未对额外分区进行更改。

## after root

机型：Redmi note 10 pro

1. 参考 [magisk](#magisk)。
2. 安装 V2rayNG，Google Play。基础。
3. 不要在 Google Play 安装 Wechat，会被冻结账号。需要绑定身份证解封 (fuck u)。<span class="heimu" title="你知道的太多了">然后我人脸验证的时候刚好熄灯了，你妈</span>
4. 不要在 Google Play 安装 QQ，无法开启深色模式 (fuck u)。
5. 见[禁用软件](#禁用软件)。

## 禁用软件

[这里](https://gist.github.com/mcxiaoke/0a4c639d04e94c45eb6c787c0f98940a)可以看 MIUI 有哪些不能禁用的东西。

我使用 [App Manager](#其他) 进行软件的冻结操作。

> _scene5/6_ 也可以，但是其为闭源商业软件，操作麻烦，不用它。<br/>_雹_ 也可以，但是主要用于禁止日常应用后台运行；无法冻结某些系统应用。

### EU MIUI

- 禁用负一屏需要冻结 Google (`com.google.android.googlequicksearchbox`)。
- Google 家的大多数都能冻
- 不要冻 _媒体存储设备_(`com.google.android.providers.media.module`) ！！！[惨痛教训](#乱冻结)

### 禁用快应用中心

> 这是一篇久远的文章，是本页面中年龄最大的一篇。<br/>
> 快应用服务框架本意是好的，大家联合起来统一为一个标准，减少不必要的重复开发。（参考 browser）

但是到了现在，快应用已经成为了手机的毒瘤，垃圾的藏匿处。无数的广告弹窗在手机厂商纵容下疯狂攻击使用者。同时快应用服务框架本身违背了自由原则，无法在设置中卸载 | 禁用，只能收回权限，最多降低版本。为了您和**家人**的身心健康，建议禁用之：

1. 查看快应用的包名：（例：MIUI 12.5）设置 - 应用设置 - 应用管理 - 找到*快应用服务框架* 进入，点击右上角感叹号，查看应用包名。
   > 或：已知关键字可使用 `adb shell pm list package [<keyword>]` 在手机内以关键字查找包名。
   > 例：在 MIUI 12.5 中，快应用服务框架包名为`com.miui.hybrid` <span class="heimu" title="你知道的太多了">杂种</span>
2. 连接手机并[开启 ADB 调试](./adb.md)。
3. 禁用包：`adb shell pm disable-user com.miui.hybrid`，也可以直接卸载，详情参考 [ADB](./adb.md)

以上教程为 MIUI 下禁用快应用中心的步骤，不保证在其他操作系统上正常运作。

## 遇到的问题

### 线刷 global 失败

已经注释了 `Missmatching image and device` 验证，跳过了 crclist & sparsecrclis 认证，最后还是卡在了 `error: Writing 'xbl' FAILED (remote:'This partition doesn't exist')` 上。。网上说 xbl error 是没解 bl 锁，但我这个显然是找不到分区。

下了两个 global (sweet)，都需要 `xbl` 分区，都没法用。然后放弃了。

### 刷入 twrp 失败

在 fastboot 下执行 `fastboot flash recovery twrp.img`，报错：`Writing 'recovery'   FAILED (remote: 'This partition doesn't exist')`。

网上看了一下，这个型号是 A/B 分区的，并没有 recovery 分区。执行 `fastboot boot twrp.img`（不刷入，直接启动），报错 `Booting   FAILED (Status read failed (Too many links))`。然后能试的方法都试过了，使用 USB2.0，改注册表驱动，使用最新的 platform-tools，使用舍友的电脑，把 twrp 换用 OrangeFox...都无法解决此问题。

之后的刷 mipad5 我也去网上找了带有 twrp 的 boot.img，但都是不可用的。

> 貌似 XDA 上有能用的 recovery，以后再试吧。

### 误炸 boot

> 此事件也直接导致了我屏蔽 csdn

弱智 csdn 给了一个把 twrp 镜像刷入 boot 的脑残方法（那是刷 recovery 的）。。于是 boot 损坏，手机无限重启。

解法：下载个官方 ROM 解压，找到 `boot.img` 刷入 `fastboot flash boot boot.img` 就行了。

我第一次搞，以为要刷砖了比较慌，直接用 miflash 把整个原生 ROM 都刷进去了。。（最后还刷失败了，还是无限重启，miflash 你不得好死）

> 再吐槽一下 [bandizip](../farraginous/recommend_packages.md#bandizip)，解压 `*.tgz` 时默认一层一层解（`*.tgz` -> `*.tar` -> `*`）。。一个 10G 的包硬生生给我占了 26G 的空间。<br/>
>
> <div class="image50" style="text-align: center; "><img alt="fun1" src="/images/articles/mobile_setting/fuckbandizip.png" /><div>你为什么不开？你为什么不开？</div></div>

### 乱冻结

在刷了 EU 版 MIUI 后，使用 App Manager 冻结了 `媒体存储设备`(`com.google.android.providers.media.module`)，导致 App Manager 闪退；无法访问 sdcard。随之发生壁纸变黑，帧率暴降，VPN 自动断连等现象。<span class="heimu" title="你知道的太多了">对于 app 来说，大概就像是末世吧。</span>

信息：

1. [freeze 实际上做了什么？](https://github.com/MuntashirAkon/AppManager/discussions/835)，是 App Manager 的官方(?)解释

尝试：

1. 先瞎尝试：`adb shell pm enable <package name>` + `adb shell am start com.google.android.providers.media.module`：
   > Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] pkg=com.google.android.providers.media.module }<br/>
   > Error: Activity not started, unable to resolve Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] flg=0x10000000 pkg=com.google.android.providers.media.module }
2. 在获取上述信息后，进入 `adb shell`，`su` 获取 root，执行：
   1. `pm unhide com.google.android.providers.media.module`
   2. `pm enable com.google.android.providers.media.module`
   3. `pm unsuspend com.google.android.providers.media.module`
   4. 三步开启权限后，退出 shell，重启，静·候·佳·音。

然后就卡开机界面了。。这下没办法了，adb 已经寄了，只能重装，前面全部白折腾。刚好我对 EU 挺失望的，想直接装回原国行系统，甚至还[失败了](#mipad-5)。

这个故事告诉我：**root 后记得先刷救砖模块。**

### ANDROID_PRODUCT_OUT not set

`fastboot flash` 刷入分区时报错：

> fastboot: error: ANDROID_PRODUCT_OUT not set

此时需要检查当前终端路径，是否包含你的 `.img` 文件。

### 找不到 LSPosed 图标

解法：`adb shell`，`su` 提权后，输入

```shell:no-line-numbers
am start "intent:#Intent;action=android.intent.action.MAIN;category=org.lsposed.manager.LAUNCH_MANAGER;package=com.android.shell;component=com.android.shell/.BugreportWarningActivity;end"
```

即可启动。（[source](https://www.bilibili.com/video/BV1UR4y1V7Ry/), my_version: 1.8.6）

### 备份恢复

由于尝试了 `App Manager` 和 `adb backup` 均无法备份应用数据，无奈使用小米的备份（`com.miui.backup`）。结果果然不出所料——出事了，EU 版系统即使装了国内的应用商店也无法下载备份[^3]。解法：

1. 从手机提取安装包，装到平板。（可用 App Manager 或 [Localsend](../farraginous/recommend_packages.md#多设备互传)）
2. 安装完后没有快捷方式，也无法打开（App Manager 与 ADB 均无法启动，摸索了挺久）。此时需要去设置中搜索 `备份` 即可进入界面使用。<span class="heimu" title="你知道的太多了">假如刷的非小米系统就惨了，我也不懂能不能用</span>
   [^3]: [source](https://t.me/withabsolutex/1165)
