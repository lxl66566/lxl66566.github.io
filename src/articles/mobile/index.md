---
date: 2023-11-08
icon: mobile
category:
  - 导航
  - 经历
  - 主张
tag:
  - 移动端
---

# 关于手机

::: tip

此处有且仅有 Android 内容。

:::

Android 虽说 AOSP 开源，但一直都不自由并且有进一步不自由的趋势[^2][^4]。

[^2]: Google 要剥离原生 Android 的电话功能；三星有熔断锁；国内通过法律逐步收紧 root 限制，各大厂“自研”系统……
[^4]: 20240108-09，[LSPosed](https://github.com/lsposed/lsposed) & [KernelSU](https://github.com/tiann/KernelSU) Public Archived

我是重度电脑使用者，手机没有游戏，这玩意只是我生活中可缺的一部分。但是我仍然愿意折腾。

## [手机配置](./settings.md)

## [刷机 & root](./root.md)

## [模块与软件推荐](./module_and_app.md)

## [遇到的问题](./problem.md)

## 其他文章

- [ADB 教程](./adb.md)
- [Android 查看指令集](./Android_ISA.md)

## 选购

1. 自由。需要 root。
   - 随着最近小米开始搞 HyperOS 并且正在逐步收紧 root 限制[^1]，正转向一加（一加具有极为舒适的 root 环境）。
2. 价格。能用就行的手机，不能太贵。
3. 能效。能效优秀的手机可以降低充电次数，提高寿命。参考能效[曲线](http://socpk.com/cpucurve/)

[^1]: HyperOS 解 BL 锁要求：社区等级达到 5 级，然而某 [12 年资深开发者](https://t.me/wtdnwbzda/1490) 3 级，雷军本人 4 级。

## OS 评价

> 前情提要：[MIUI 有多难用](../../gossip/fuckxxx.md#miui-有多难用)

从 MIUI 换到 ColorOS 的一些感受：

好：

1. 进行敏感系统设置后不用再等待万恶的 10s
2. ColorOS 一些不错的 idea：
   - 双击空白处锁屏
3. _手机管家_ 可以冻结
4. 可以[更换应用图标与名字](./settings.md#after-root)

坏:

1. 不能一键关闭所有通知的振动权限，搞得我手机收个消息就震一下。
2. 首次进系统默认勾选的“推荐”设置也太多了，点取消点得我手疼[^3]。
3. [若冻结 `应用包安装程序`](./problem.md#一加无限重启)，无提示，**直接变砖**。
4. 省电模式下无法锁定应用。

[^3]: 由于[一个测试](./problem.md#一加无限重启)，我重置系统近 10 次，每次都需要走一遍流程

## external

1. [各 Android 手机厂商 Bootloader 解锁 / 内核开源 / 解锁后保修情况](https://github.com/KHwang9883/MobileModels/blob/master/misc/bootloader-kernel-source.md)
