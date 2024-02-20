---
date: 2023-11-08
icon: config
category:
  - 经历
tag:
  - 移动端
  - 工具
---

# 遇到的问题

时间倒序。

## 一加无限重启

root 以后，安装了个 [_神仙自动救砖_](./module_and_app.md#magisk) 就大意了，折腾了许久，一个重启直接给我干砖了。。我所期望的救砖模块并没有生效。但是 fastboot 还是能进的，因此尝试救砖。

刷回官方 `boot.img`，但是还是无限重启。看样子原因并非模块，而可能是冻结了不该冻结的东西（maybe _手机管家_？）。然后进 recovery 清除了数据分区，才能进入。

后来我测试了一下，root 的裸机，冻结一堆应用然后重启，确实变砖了。然后开始测试能冻结的应用。

假如测到了变砖的应用，我需要重启 recovery 恢复，再重新开机准备选项，root 一遍，才能进行下一轮测试，时间（与<span class="heimu" title="你知道的太多了">产品</span>寿命）成本还是很高的。

第一次测试：手机管家，居然不是？

第二次测试：OPPO\* Carlink 主题\* 智能\* 智慧\*，没有问题

第三次测试：远程守护服务 游戏\* 应用?安装\* 一加互传 小游戏 小布\* 下载\*，寄了，答案就在这里！（`?` 匹配 0 或 1 个字符）

这时候开始俄罗斯轮盘赌了，舍友赌一个 `小布*`（：_我不认为一加会让你把小布卸了去装小爱同学_），我则赌 `应用?安装*`。紧张刺激的重启环节后，结果我一次赌对了，崩了。

现在目标只剩两个：`应用包安装程序` 与 `应用安装器`，不管哪个都很可疑。按道理我只需要将这俩位都加入冻结黑名单即可，但我很好奇，非常好奇！到底是哪个干崩了我的系统！

这是一个二选一的赌注，我把罪魁祸首赌在了 `应用安装器` 上，而冻结了 `应用包安装程序`。我可能潜意识觉得，反正我用第三方安装程序，如果能够安全地冻结 `应用包安装程序`，那对我来说也是一个不错的消息。然而这次赌错了。问题就是出在 `应用包安装程序` 上。用 adb 和 root 都无法绕过这个玩意，我体会到了不自由的感觉，不禁一阵恶心。

后续测试：安全\* 百变引擎 (动态)?壁纸\* 多彩引擎 儿童空间 服务治理框架 更新服务 基本互动屏保 健康\* 快应用 乐划锁屏 浏览器 默认打印服务 钱包 (全局)|(融合)搜索 设备\*连\* 升级指南 识屏\* 手势体感 速览 随身工作台 我的一加 系统升级服务 这些全部没有问题。

一个傻逼应用，坏了一部手机。

## MIUI 无法更换铃声

1. 点击 _设置 - 声音与触感 - 电话铃声 - 全部铃声_，bug 闪退
2. 下载 138M 的音乐（系统应用），“设置铃声需要开通 VIP”
3. 将铃声 push 到系统 ringtone 文件夹：`adb push xxx.mp3 /system/media/audio/ringtones/`([ref](https://oddity.oddineers.co.uk/2020/08/24/wear-os-custom-ringtones-via-adb/))，报错 `remote couldn't create file: Read-only file system`
4. `adb remount` <Badge text="root" />，报错 `/system/bin/sh: adb: inaccessible or not found`
5. `adb shell`，`su`，`mount -o rw,remount /system` <Badge text="root" />，报错 `mount: '/system' not in /proc/mounts`

没招了，非常痛苦。可能还能参考下[这篇](https://forum.xda-developers.com/t/closed-universal-systemrw-superrw-feat-makerw-ro2rw-read-only-2-read-write-super-partition-converter.4247311/)，不过希望不大且比较危险。

## 线刷 global 失败

已经注释了 `Missmatching image and device` 验证，跳过了 crclist & sparsecrclis 认证，最后还是卡在了 `error: Writing 'xbl' FAILED (remote:'This partition doesn't exist')` 上。。网上说 xbl error 是没解 bl 锁，但我这个显然是找不到分区。

下了两个 global (sweet)，都需要 `xbl` 分区，都没法用。然后放弃了。

## 刷入 twrp 失败

在 fastboot 下执行 `fastboot flash recovery twrp.img`，报错：`Writing 'recovery'   FAILED (remote: 'This partition doesn't exist')`。

网上看了一下，这个型号是 A/B 分区的，并没有 recovery 分区。执行 `fastboot boot twrp.img`（不刷入，直接启动），报错 `Booting   FAILED (Status read failed (Too many links))`。然后能试的方法都试过了，使用 USB2.0，改注册表驱动，使用最新的 platform-tools，使用舍友的电脑，把 twrp 换用 OrangeFox...都无法解决此问题。

之后的刷 mipad5 我也去网上找了带有 twrp 的 boot.img，但都是不可用的。

> 貌似 XDA 上有能用的 recovery，以后再试吧。

## 误炸 boot

> 此事件也直接导致了我屏蔽 csdn

弱智 csdn 给了一个把 twrp 镜像刷入 boot 的脑残方法（那是刷 recovery 的）。。于是 boot 损坏，手机无限重启。

解法：下载个官方 ROM 解压，找到 `boot.img` 刷入 `fastboot flash boot boot.img` 就行了。

我第一次搞，以为要刷砖了比较慌，直接用 miflash 把整个原生 ROM 都刷进去了。。（最后还刷失败了，还是无限重启，miflash 你不得好死）

> 再吐槽一下 [bandizip](../../farraginous/recommend_packages.md#bandizip)，解压 `*.tgz` 时默认一层一层解（`*.tgz` -> `*.tar` -> `*`）。。一个 10G 的包硬生生给我占了 26G 的空间。
>
> <ZoomedImg alt="你为什么不开？你为什么不开？" src="/images/articles/mobile_setting/fuckbandizip.png" scale="50%" />

## 乱冻结

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

然后就卡开机界面了。。这下没办法了，adb 已经寄了，只能重装，前面全部白折腾。刚好我对 EU 挺失望的，想直接装回原国行系统，甚至还[失败了](./root_and_setting.md#mipad-5)。

这个故事告诉我：**root 后记得先刷救砖模块。**

## ANDROID_PRODUCT_OUT not set

`fastboot flash` 刷入分区时报错：

> fastboot: error: ANDROID_PRODUCT_OUT not set

此时需要检查当前终端路径，是否包含你的 `.img` 文件。

## 找不到 LSPosed 图标

解法：`adb shell`，`su` 提权后，输入

```shell:no-line-numbers
am start "intent:#Intent;action=android.intent.action.MAIN;category=org.lsposed.manager.LAUNCH_MANAGER;package=com.android.shell;component=com.android.shell/.BugreportWarningActivity;end"
```

即可启动。（[source](https://www.bilibili.com/video/BV1UR4y1V7Ry/), my_version: 1.8.6）

## 备份恢复

由于尝试了 `App Manager` 和 `adb backup` 均无法备份应用数据，无奈使用小米的备份（`com.miui.backup`）。结果果然不出所料——出事了，EU 版系统即使装了国内的应用商店也无法下载备份[^3]。解法：

1. 从手机提取安装包，装到平板。（可用 App Manager 或 [Localsend](../../farraginous/recommend_packages.md#多设备互传)）
2. 安装完后没有快捷方式，也无法打开（App Manager 与 ADB 均无法启动，摸索了挺久）。此时需要去设置中搜索 `备份` 即可进入界面使用。<span class="heimu" title="你知道的太多了">假如刷的非小米系统就惨了，我也不懂能不能用</span>
   [^3]: [source](https://t.me/withabsolutex/1165)
