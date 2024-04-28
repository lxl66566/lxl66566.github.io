---
date: 2023-01-22
icon: android
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

## 刷机工具

- adb/fastboot 套，这个不多说，100% 必备。最方便的安装是 [scoop](../../farraginous/recommend_packages.md#scoop)：`scoop install adb`。
- MIUI 刷机工具：小米官方提供的刷机工具。能用就是好的，至少小米一般不用太担心变砖，只要能进 fastboot 就能活。
  - 使用 MIUI 刷机工具时，千万不要在右下角选择 lock（我选择直接删线刷包里的 _\*lock.sh/bat_）；最好把 Configuration 中的 CheckPoint 删了。
  - 想想一加甚至没有刷全量包的工具。。开始羡慕起小米来了。
- ~~MIUI 解锁工具~~ 时代结束了，现在的澎湃 OS 解锁要答题（
- [FastbootEnhance](https://github.com/libxzr/FastbootEnhance)，提供一个 GUI 界面，解 `payload.bin` 很好用。但是对于刷入则不太行了，至少我 Oneplus 不行，启到 fastbootd 也卡在半中间。
- ~~[payload-dumper-go](https://github.com/ssut/payload-dumper-go)：解 `payload.bin` 的另一个 CLI 工具~~，被 FastbootEnhance 上位替代了。payload-dumper 要解只能解全部，太傻了，不过至少能用。

## Redmi Note 10 pro

> 题外话：~~高考结束后买的手机，当时还是一个普通人，自然不知道刷机解 bl root 这些东西，等我想解的时候已经太迟了，数据已经太多了。下一部手机必 root。~~ 然而等到了一个能够使我无视数据的契机。  
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

## mipad 5

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

## Oneplus Ace Racing edition

这里是 _一加 Ace 竞速版_ 的 root 过程。

一加的教程基本都是 _daxiaamu_ 的一键工具箱，让人 root 了以后却不知其所以然。这样是不好的。

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

</dtls>

得到了 `boot.img`，剩下的就是用 magisk 修补，刷入了。跟[用小米时](#redmi-note-10-pro)一样，不再赘述。

## 关于 KernelSU

在[浪费了两个小时](https://t.me/withabsolutex/1601)后，我想说：**如果你不是开发者，别碰 KernelSU**。
