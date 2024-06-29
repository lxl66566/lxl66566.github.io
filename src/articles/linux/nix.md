---
date: 2024-06-28
icon: linux
category:
  - 教程
tag:
  - Linux
  - 桌面端
---

# 安装与配置（NixOS 篇）

早在去年我便说过我的下一个输入法很有可能是 NixOS。202405 的操作系统课需要做 PPT 汇报，我的选题是包管理器杂谈，又吹了一波 nix 把我自己心吹得痒痒的。

在考试期间由于压抑的氛围和不情愿的学习，平常想做的事的欲望会被放大许多。但是我预料到 NixOS 的安装肯定会非常折磨（好预测！），所以只在 WSL 里尝尝鲜。而 WSL 终究无法发挥出 Nix 的特色。于是熬到了考完试当晚，我就开始安装 NixOS 了。

## NixOS 安装

安装我看的是[NixOS 中文](https://nixos-cn.org/tutorials/installation/Subsystem.html)。

NixOS 的安装比我想象的要折磨得多。原以为装过 Arch 的我已经无惧困难，结果输得非常彻底。。一大原因是因为没有 Archlinux 那样的顶级文档，而另一个则是群友人数确实更少，解答问题的也更少。不过这些都是后话了。

我是在还没有学习 nix 语言和特性的情况下装的系统，踩了不少坑。

首先，我[缩了 ArchLinux 的分区大小](./basic.md#调整大小)，踩了一次 [cfdisk 的坑](./problem.md#cfdisk-操作分区)。而后下载了 NixOS 的图形化安装程序，用 ventoy 引导启动，一切正常。然而在安装引导的分区时我发现，图形化界面没有提供 btrfs 分区，只提供 ext4。于是我停止使用图形化界面，改用里面的 konsole 终端。结果 channel update 时无法正常重启某些服务（`xe-daemon.service: NewCachedXenstore error: Cannot locate xenbus dev path...`）。我猜测这是图形界面导致的问题，于是我重新打开 arch，下载了 minimal iso，这里面还有一个[好玩的小插曲](./problem.md#你的复制是真正的复制)。

果然进了 minimal ~~有一种回家的感觉~~，并且确实没有重启服务失败的问题了。一番鼓捣，总结出一些重要规律：

- 碰到 `HTTP error 200 (curl error: Stream error in the HTTP/2 framing layer)` 不要管，后台会重试。（说到底，code 200 还报 error 是我没想到的）
- 如果 `denpendency fail to build`，换个源重新试。
  - 如果换源后碰到同样的问题，把源换回去再试。
- 安装过程中遇到 `core dumped`。。。emmm，这有点脑残了，不过换了个源又好了，可能是因为没拉到缓存，构建时 core dump？

就这样，两个源交替查缺补漏，总算是 install success 了。“最终退后三步朝电脑跪拜祈求它能正常开机，至此基本安装教程完毕。”——才怪，sddm 进去后，root 和我都无法登录（保证密码正确）。于是类似 Arch 那样重走挂载流程，`nixos-enter` 进去修。

这进去一 rebuild 我就感觉不对劲，此处把报错贴出：

```
sudo: PAM account management error: Authentication service cannot retrieve authentication info
sudo: a password is required
```

求助群友，群友说 `nixos-install` 与 `nixos-rebuild` 效果基本是一样的，让我去外面用 install 试。效果确实差不多，不过每次在 livecd install 都相当于重装，无法用内部的缓存，全部重新下载，还是有点耗时的。install success 后再次 `nixos-enter` 试，还是一样的报错，只要用到 sudo 就会炸。鼓捣了大半天，reinstall 了好几次都无法解决，另一个管理发话了：在 `nixos-enter` 中这是**正常现象，内核的表现是不一致的**。我一直把 `nixos-enter` 当 `arch-chroot` 用，没想到这玩意这么捞。

这回重启就正常了，也不知道是其中的哪次 install 尝试起了作用。于是我成功进入系统开始激情编辑配置。

### 后记

第二天学校有实践课加上 cs2 出新图，没怎么折腾系统，尝试给电脑[装了个 nvidia 驱动]()和其他玩意就去睡觉了。

第三天起床一开机，直接 dmesg 卡死无法切 tty。兄弟我还有课啊！于是带着去教室不听课，校园网认证还过不了，只好用手机开热点修。这次知道不能 `nixos-enter` 了，但是只能用小手机查资料，每次挂载输入一大串，用镜像输一大串，重新 install 等好久，试错成本偏高。加上我昨天配置改了很多，二分查找需要的次数也不可估量，因此还是非常慢的。（不能简单地放弃 NVIDIA 驱动，因为有 NixOS gaming 需求）

二分查错过程中我发现每次 install 并不会重新写入 EFI 分区（配置里注释了启动项，但是 grub 菜单并没有消失），因此向群友提问。群友答日常 build 和 install 是不会擦除 EFI 的，只有 gc 时会。但是我并不在系统里，`nixos-enter` 如上文所述，并不能执行 gc 指令。

后来终于发现原因了，我换了 zen 内核，按理需要用 dkms 的 NVIDIA 驱动，然而实际用的是 NVIDIA 闭源驱动。。nixos 没有任何提示，于是导致了此惨剧。然后换回原内核又发生了 [EFI 空间不足](./problem.md#efi-空间不足)的惨剧，又折腾许久。等我成功开机，都过了午饭时间了。然后一开机我就去定制了一个 iso，太折磨了。

下午折腾中文拼音输入法。

[一个配置文件就能在各个电脑装一模一样的系统和软件？ — 保姆级教你轻松掌握 NixOS](https://medium.com/@realLanta/一个配置文件就能在各个电脑装一模一样的系统和软件-保姆级教你轻松掌握nixos-7f026b539242)

## 学习

如何学习 nix 呢？nix 没有强大的 wiki，遇到问题只能到处 google。但是也有一些好的资源。

- [NixOS 中文](https://nixos-cn.org/tutorials/installation/Subsystem.html)：安装教程与初步使用
- [NixOS 与 Flakes - thiscute](https://nixos-and-flakes.thiscute.world/zh/preface)：进阶好书
- [中文 discourse](https://discourse.nixos.org/c/learn/chinese/55) & [telegram group](https://t.me/nixos_zhcn)：可能可以来问问题

一个要点是理清 nix 的 一些事实标准，例如 flake， home manager，他们是什么，有什么用。好在那本 thiscute 的书完美解决了此问题。

还有一个学习方法是多看别人的 configuration，~~并且大量摘抄~~。我的配置在[下面](#配置)，还有一些：[1](https://github.com/TsubakiDev/nixos-config) [2](https://github.com/ryan4yin/nix-config)

## 配置

[我的配置仓库](https://github.com/lxl66566/nixos-config)

### linter / formatter

nix 是一门图灵完备的函数式语言，写 nixos config 就是编程的过程。说到编程那肯定少不了 linter 和 formatter。而我是 all in vscode 人，我使用的插件如下：

- _Nix IDE - Noortheen_：lsp，需要手动安装 pkgs.`nil`
- _nixfmt - brettm12345_：formatter，需要手动安装 pkgs.`nixfmt-rfc-style`

### 显卡驱动

官方给出了比较详细的 NixOS 显卡驱动教程([NixOS Manual - Nvidia](https://nixos.wiki/wiki/Nvidia))，看就完了。我认为还存在一些缺点：

1. 有些复杂，例如双显卡需要手动查总线并写入 hardware-configuration.
2. prime 功能有点残缺，官方给出的 example 里只有在启动时选择不同的启动项以应对外带和接电源两种情况，而不能动态调整性能模式：正常情况下应该是在游戏启动时启用显卡而在未游戏时关闭。

还有，[别改内核](#后记)。。。

### 拼音输入法

用英文有点习惯，要不是我打开博客想写论文我都想不到中文输入法没装。

我先尝试 arch 上用习惯的 fcitx5：

```nix
i18n.defaultLocale = "zh_CN.UTF-8";
i18n.inputMethod = {
  enabled = "fcitx5";
  fcitx5.addons = with pkgs; [
    fcitx5-chinese-addons
    fcitx5-mozc
    fcitx5-gtk
    fcitx5-rime
    fcitx5-configtool
  ];
};
```

然而这并不能使用，在输入法里切到了中文键盘，打出的一直都是英文。

然后我尝试用了一下 ibus：

```nix
i18n.defaultLocale = "zh_CN.UTF-8";
i18n.inputMethod = {
  enabled = "ibus";
  ibus.engines = with pkgs.ibus-engines; [
    rime
    libpinyin
  ];
};
```

用倒是能用了，但是我并不清楚 ibus 如何支持双拼。而且其自定义程度也不太行，切换输入法居然不能 `Ctrl + Shift` 而需要给实际键位，因此我还是折腾 fcitx。

跑了一次 `fcitx5-diagnose`，发现 locale 里显示的不太对，怎么全都是 `en_US.UTF-8`？明明已经设了 `i18n.defaultLocale`...后续设成这样：

```nix
defaultLocale = "zh_CN.UTF-8";
extraLocaleSettings = {
  LANG = "en_SG.UTF-8";
  LC_ALL = defaultLocale;
};
```

莫名奇妙就好了，在输入法设置里可以找到双拼键盘，开起来就行。

### home manager

我本来是不想用 home manager 的，全写在 `configuration.nix` 里也不麻烦。但是后来还是用了：

1. 假设滚挂了，方便 reinstall（把 import 注释掉即可；否则一个 `configuration.nix` 不好拆，我也不想一个 install 下载几十 GB）
2. 有些配置文件确实不方便统一管，例如 KDE 的某些设置等。

转移到 home manager 也不麻烦，[thiscute](#学习) 有很好的教程。

### Gaming

[Gaming on nixos : r/NixOS](https://www.reddit.com/r/NixOS/comments/1c7csct/gaming_on_nixos/)
