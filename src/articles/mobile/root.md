---
date: 2023-01-22
icon: brands fa-usb
category:
  - 教程
  - 经历
tag:
  - 移动端
---

# 刷机

刷机圈一直是一个排外的圈子。当 Android 的封闭碰上了刷机圈的封闭……

刷机圈一直岌岌可危。君不见 LSPosed Archived...

> Android 的封闭社区内充满了悖论：如果你需要 `dd ... of=/sdcard/boot.img`，你需要 root；因为需要 root 所以需要 `boot.img`。。

## 工具

- adb/fastboot 套，这个不多说，100% 必备。最方便的安装是 [scoop](../../farraginous/recommend_packages.md#scoop)：`scoop install adb`。
- 用来从 `payload.bin` 提取分区的。（按照推荐顺序排序）
  - [5ec1cff/payload-dumper](https://github.com/5ec1cff/payload-dumper)：群友激情制作，可以从 URL 里提取部分分区，大幅减少了下载需求。
  - [FastbootEnhance](https://github.com/libxzr/FastbootEnhance)，提供一个 GUI 界面，解 `payload.bin` 很好用。但是对于刷入则不太行了，至少我 Oneplus 不行，启到 fastbootd 也卡在半中间。
  - ~~[payload-dumper-go](https://github.com/ssut/payload-dumper-go)：解 `payload.bin` 的另一个 CLI 工具~~，被 FastbootEnhance 上位替代了。payload-dumper 要解就只能解全部，太傻了，不过至少能用。
- 小米/红米：
  - MIUI 刷机工具：小米官方提供的刷机工具。能用就是好的，至少小米一般不用太担心变砖，只要能进 fastboot 就能活。
    - 千万不要在右下角选择 lock（我选择直接删线刷包里的 _\*lock.sh/bat_）
    - 最好把 Configuration 中的 CheckPoint 删了。
    - 想想一加甚至没有刷全量包的工具。。开始羡慕起小米来了。
  - ~~MIUI 解锁工具~~ 时代结束了，现在的澎湃 OS 解锁要答题（

## root 方式

目前常见的 root 方式有 Magisk、KernelSU、APatch 三种。其他的基本是这三种的衍生。

::: tabs

@tab Magisk

基于 Magic (Bind) Mount 的 Root 方式。最老牌的 Root 方法，网上教程最多。

除了原版 Magisk 外，还有 Magisk Alpha（实验性功能）、Magisk Delta（专注隐藏 root）等分支。

- Magisk 默认所有应用都能申请 root，如果有不想给 root 的应用需要添加到排除列表（黑名单机制）。
- Magisk 运行在用户态，不好隐藏，Shamiko 也不太容易搞。
- Magisk 自带 Zygisk。

@tab KernelSU

> [几年前用过 KernelSU](https://t.me/withabsolutex/1601)，当时因为软件不够成熟、文档垃圾等问题，没有继续使用。

新起之秀，基于 OverlayFS (meta-overlayfs) 或者其他的 meta 模块进行 mount。KernelSU 工作在内核态，隐蔽性更强。

KernelSU 下又细分两种工作模式，LKM (Loadable Kernel Module) 和 GKI (Generic Kernel Image)，前者作为内核模块挂载，变更较小，可以随时卸载，但是隐藏效果更差；后者是直接更换内核，属于破坏性变更，系统调度都会被破坏，但是支持 SUSFS，隐藏效果更好。一般我倾向于 LKM，少点折腾。

### MKSU

[MKSU](https://t.me/mksu_ci) 是 magic mount based 的 KernelSU fork，目前由 5ec1cff 大佬在维护。

### SukiSU-Ultra

[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra) 是一个 KernelSU 的 fork，原生集成了 SUSFS (Superuser Stealth FileSystem) mount 和 APatch 的 KPM（Kernel Patch Module）机制。

- 当然 SukiSU 还是有一些令人诟病的点，具体可以看[四周目(总结): SukiSU Ultra 的种种问题](https://oom.mintlify.app/blog/go4-sukisu-ultra-4)与该作者的其他文章。
- SukiSU [自带了一个救砖机制](https://github.com/SukiSU-Ultra/SukiSU-Ultra/blob/35659f6b821253a0bb6a3115f083bce5fc56c367/kernel/ksud.c#L436-L481)：启动时按三下 _音量-_ 即可进入安全模式。不过安全模式只是不加载模块，并不会解冻应用，因此建议不要乱冻结应用([教训 1](./problem.md#乱冻结) [教训 2](./problem.md#一加无限重启))，因为现在乱冻结的风险比乱刷模块还高。

### ReSukiSU

由于 SukiSU-Ultra 的上述问题，有人做了 SukiSU 的 fork：[ReSukiSU](https://github.com/ReSukiSU/ReSukiSU)，提高稳定性。

跟 SukiSU 在使用上的区别有：ReSukiSU 模块本身不自带挂载，需要使用 meta 模块。

@tab APatch

APatch 是在内核空间运行 KPM (Kernel Patch Module) 的 root 方案。

:::

## 教程

此处只说明基本的线刷教程（不含 Recovery 刷入等）。

### 1. 解 BL 锁

不同机型对 BL 锁的限制不同，目前（2025 年）国内的手机厂商只有一加能够比较方便地解 BL 锁。

- 一加：ColorOS 15 及以前可以任意解锁。ColorOS 16 需要申请深度测试，等待 1-2 天审核通过后才可解锁。目前无需答题。
- 小米：对于旧的 MIUI 设备，需要登录小米帐号满 7 天后才可解锁；对于新的 HyperOS 设备，需要进行小米社区签到答题等才能解锁，限制比较严格。
- 华为：不能解。

### 2. 刷分区

对于 Magisk based 和 KernelSU based 的 root 方式，刷入分区操作是一致的。

1. 下载 Magisk / KernelSU APP 到手机。
2. 下载官方 ROM 到电脑（在手机设置里看版本号，选择完全一致的 ROM）。下载地址需要自己去网上找，例如一加的基本是 daxiaamu 网站上下载。
3. 使用 [payload_dumper](#工具) 从 ROM 里提取出 `boot.img` 或 `init_boot.img` 镜像，传文件到手机上。对于 2022 年以前、Android \<= 14 的手机一般是 `boot.img`，之后的手机一般是 `init_boot.img`。具体刷哪个可以去网上搜一下。
4. 打开 Magisk / KernelSU APP，选择修补镜像，将修补以后的镜像拷贝到电脑上。
5. 进开发者模式打开 USB 调试，用数据线连接手机电脑；电脑上安装 ADB 工具，在终端下执行 `adb devices` 应该能看到你的设备。
6. `adb reboot bootloader` 重启到 fastboot 模式。
7. `fastboot flash boot xxx.img` 或者 `fastboot flash init_boot xxx.img` 刷入修补后的镜像。`xxx.img` 是你修补后的镜像名，并且终端的路径需要在镜像的同文件夹下。
8. `fastboot reboot` 重启手机，听天命。

## 我的刷机记录

::: tabs

@tab Redmi Note 10 pro

> 题外话：~~高考结束后买的手机，当时还是一个普通人，自然不知道刷机解 bl root 这些东西，等我想解的时候已经太迟了，数据已经太多了。下一部手机必 root。~~ 然而等到了一个能够使我无视数据的契机。\
> <span class="heimu" title="你知道的太多了">忘了备份应用时间了，妈的；后来发现这东西没法备份。</span>

20230614 记一次失败的刷机（redmi note 10 pro, sweet）。

1. 解 BL 锁，等了 7days。
2. 刷入 twrp [失败](./problem.md#刷入-twrp-失败)。

没有第三方 recovery 就无法卡刷，而一些类原生例如 Havoc OS | Evolution OS 只提供了卡刷包，无法线刷。寄。~~（据说有 python 脚本能把卡刷包转成线刷包，没试过，有生之年）~~

退而求其次，想刷 EU 版 MIUI，[失败 again](./problem.md#线刷-global-失败)，寄。

再退，用国行 MIUI (chopin)，不使用 twrp 刷入 magisk。（kernelSU 不支持：非 GKI 设备内核）

1. 安装 [magisk](https://github.com/topjohnwu/Magisk/releases/latest)。
2. 从原生线刷包把 `boot.img` 拷到手机上。
3. 在 magisk 中，选择安装 magisk（修补一个文件），选择 `boot.img` 修补。
4. 再将修补后的 `magiskxxx.img` 拷回电脑，`fastboot flash boot magiskxxx.img && fastboot reboot` 刷新 boot。
5. 好了，之后就是[另一个板块](./module_and_app.md#magisk)了。

@tab mipad 5

20230715，尝试刷我的小米平板 5（nabu）。

折腾了一下 twrp，在 Github 下载了一个[不明来源的 twrp](https://github.com/bm0x/twrp_device_xiaomi_nabu/releases) 刷入，又寄了，表现为闪屏无法启动。算了，这年头 VAB 分区的我再也不想再折腾 twrp 了。好在有了第一次的刷机经验，没有手忙脚乱，能进 fastboot 就能救。

退而求其次，刷 EU。在[这里](https://xiaomirom.com/download/xiaomi-pad-5-nabu-stable-V14.0.4.0.TKXMIXM/#global-fastboot)找了个欧版 ROM，这次倒是没出什么岔子，10min 后顺利刷入。那接下来的 root & magisk 也是水到渠成了，这里按下不表。

但是等我开始搞机，渐渐发现事情没我想象得那么简单。

1. EU 的 Google 全家桶也是无法卸载（即使有些边角如 YT Music 能卸载，Play store 也会再悄悄给你下回来），近 20 个 Google 密密麻麻排着嘲笑我，数量甚至比国行还多；
2. 后台运行着好多叫不出名字的奇怪服务，有些我 Google 半天也搜不到是什么（例如 `com.qti.qcc`）；
3. 也间接导致了[之后的系统崩溃](./problem.md#乱冻结)。（我承认主要责任在我）

然后使用 miflash 刷回国行；刷入失败。一重启就自动进 fastboot。由于[此 ROM 下载地址](https://xiaomirom.com/rom/mi-pad-5-nabu-china-fastboot-recovery-rom/)没有 MD5，于是[换了一个](https://xiaomifirmwareupdater.com/archive/miui/nabu/)重下，校验 MD5，没有任何问题。刷机工具 Configuration 设置 EraseAll，再刷，还是不行。然后刷欧版，就行了。。由于每次刷机都需要 10min 以上，我连着刷了 5 6 次，等待的时间确实紧张难熬。

所以刷欧版是一件非常冒险的事：在只使用初级工具前提下[^1]，这一步没有后悔药，没法再刷回其他系统[^2]。

[^1]: 指 miflash + adb。我有考虑过使用[磁盘模式工具](https://web.vip.miui.com/page/info/mio/mio/detail?postId=1655550)甚至更底层的方法，但是尚未有收入的我还是无法承担飙升的刷砖风险。

[^2]: 暂不清楚是只是 _无法刷回国行_ 还是 _无法刷成其他任一系统_。推测是刷 EU 的分区(?)更改比国行的多，导致刷回国行时未对额外分区进行更改。

@tab 一加 Ace 竞速

这里是 _一加 Ace 竞速版_ 的 root 过程。

一加的教程基本都是 _daxiaamu_ 的一键工具箱，让人 root 了以后却不知其所以然。这样是不好的。再说了，这个工具箱也无法刷全量包。

找了半天没找到这个机型如何刷 Oxygen OS，也没有提供线刷 ROM <span class="heimu" title="你知道的太多了">daxiaamu 自称官方</span>，怕出问题，还是将就用着并不喜欢的 ColorOS 吧。

解 BL 的过程中，无法通过音量键选择 unlock。。甚至也无法长按开机键重启。用 `fastboot reboot` 试了一下，第二次还是一样。具体地：

- 在 _fastboot_ 界面，电脑执行 `fastboot flashing unlock`，手机出现文字且立刻 timeout，无法选择，无法解锁。
- `... failed to record unlock state`
- 长按 _音量+_ 键输入解锁指令，可成功解锁。
- 或者长按 _音量-_ 键输入解锁指令，此时不会弹出 timeout，再按 _音量+_ 即可。

莫名其妙。我测过音量键，并无问题。总之最终是解锁了。root 的折腾过程中也遇到了很多问题：

下载 rom 包，解出一个 `payload.bin`；目的：从中提取出 `boot.img`。然后有：

<dtls alt="一些血泪史">

1. 用不知哪下的 `payload_dumper.exe`（一眼 python 打包），发现不能自定义输入输出路径。勉为其难地把 rom 拷进同目录，运行闪退。
2. 去找 payload_dumper 的[源码](https://github.com/vm03/payload_dumper)，搞环境<span class="heimu" title="你知道的太多了">由于前几天迁移 python 导致 [pipx 及其安装的软件路径坏了](../../coding/python.md#为什么不该使用-pipx)，</span>又搞了好久。运行，报错 `_lzma.LZMAError: Input format not supported by decoder`...
3. 我甚至还重新解压到 RAMDisk 然后 checksum 了一下，不出所料，并没有什么问题。
4. 在 [issue](https://github.com/vm03/payload_dumper/issues/47#issuecomment-1311973400) 中找到另一个 go 版本，亲测可用，速度还快。
5. 最后发现 FastbootEnhance 可以选择某些 img 解包。。
6. 后来又发现一个 fork 版本可以仅下载某分区。

</dtls>

得到了 `boot.img`，剩下的就是用 magisk 修补，刷入了。跟[用小米时](#redmi-note-10-pro)一样，不再赘述。

@tab 一加 Ace 5 竞速

- 太久没玩过移动设备了，想进个 fastboot 不小心直接输了 `adb reboot fastboot`，结果进的是 fastbootd。
- 进了 fastboot 但是 windows 连不上，需要[安装 Android 驱动](#fastboot-devices-无法列出设备)。
- 这个解锁页面简直不是给人看的，一下就超时一下就超时。然后解锁成功以后的提示也看不清，直接又回到 fastboot mode 了。
- 第一次刷错了，刷成了 `boot.img`，没想到现在新的手机是需要刷 `init_boot.img` 而不是 `boot.img`。于是重新搞。不过刷成 `boot.img` 也能正常开机，还算是万幸。

:::

## 常见问题

### fastboot devices 无法列出设备

首先检查手机有没有进入 fastboot 模式，数据线有没有连接好。

然后检查 Windows 系统上有没有安装 Android 驱动：

1. 进入 [官方 Google USB 驱动程序](https://developer.android.com/studio/run/win-usb?hl=zh-cn) 下载页，下载后右击 `.inf` 安装驱动。
2. 在 windows 设备管理器中，_其他设备 - Android - 更新驱动程序 - 浏览我的电脑以查找驱动程序 - 让我从计算机上的可用驱动程序列表中选取_，选择 _Android Device - Android Bootloader Interface_ 进行安装。
3. 然后再执行 `fastboot devices` 即可。

## external

- [一加 Ace 5 Pro 的 root 及其自定义玩法 - gledos](https://gledos.science/oneplus-ace-5-pro-superuser.html)
