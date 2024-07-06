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

早在去年我便说过我的下一个操作系统很有可能是 NixOS。202405 的 OS 课需要做 PPT 汇报，我的选题是包管理器杂谈，又吹了一波 nix，把我自己心吹得痒痒的。

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

第二天学校有实践课加上 cs2 出新图，没怎么折腾系统，尝试给电脑[装了个 nvidia 驱动](#显卡驱动)和其他玩意就去睡觉了。

第三天起床一开机，直接 dmesg 卡死无法切 tty。兄弟我还有课啊！于是带着去教室不听课，校园网认证还过不了，只好用手机开热点修。这次知道不能 `nixos-enter` 了，但是只能用小手机查资料，每次挂载输入一大串，用镜像输一大串，重新 install 等好久，试错成本偏高。加上我昨天配置改了很多，二分查找需要的次数也不可估量，因此还是非常慢的。（不能简单地放弃 NVIDIA 驱动，因为有 NixOS gaming 需求）

二分查错过程中我发现每次 install 并不会重新写入 EFI 分区（配置里注释了启动项，但是 grub 菜单并没有消失），因此向群友提问。群友答日常 build 和 install 是不会擦除 EFI 的，只有 gc 时会。但是我并不在系统里，`nixos-enter` 如上文所述，并不能执行 gc 指令。

后来怀疑是内核原因：我换了 zen 内核，按理需要用 dkms 的 NVIDIA 驱动，然而实际用的是 NVIDIA 闭源驱动。。换回原内核又发生了 [EFI 空间不足](./problem.md#efi-空间不足)的惨剧，又折腾许久。等我禁用了 NVIDIA 成功开机，都过了午饭时间了。然后一开机我就去定制了一个 iso，太折磨了。

下午折腾中文双拼输入法，详见[输入法](#拼音输入法)。

又过了一天，我想起来 NVIDIA 驱动一直没开，而此时我已经做好了万全的准备，btrfs 打了快照，grub 加了禁用 nvidia 的启动项，自制了启动盘，是时候挑战 NVIDIA 驱动了！于是我开启了显卡驱动，果然又卡 dmesg 了。从 grub 切换启动项进入系统，心情郁闷，难道我注定无法在 NixOS 上 Gaming 了吗？此时我<heimu>突然听见了神的声音，神说让我</heimu>把 `hardware.nvidia.open = false;` 改成 `true`，我改了，rebuild 重启发现活了！原来问题出在闭源驱动上！

正当我高兴，一天后的 rebuild 又让我吸了口凉气，问题并没有解决。于是我重新思考了这些问题的“解决”，发现第一次重启可能会卡 dmesg，而第二次重启不会。

## 学习

如何学习 nix 呢？nix 没有强大的 wiki，遇到问题只能到处 google。但是也有一些好的资源。

- [NixOS 中文](https://nixos-cn.org/tutorials/installation/Subsystem.html)：安装教程与初步使用
- [NixOS 与 Flakes - thiscute](https://nixos-and-flakes.thiscute.world/zh/preface)：进阶好书
- [Lan Tian @ Blog](https://lantian.pub/article/modify-website/nixos-why.lantian/)：打包与高级用法
- [中文 discourse](https://discourse.nixos.org/c/learn/chinese/55) & [telegram group](https://t.me/nixos_zhcn)：可能可以来问问题
<!-- - 还有些其他的：
  ::: details 课外阅读

  ::: -->

一个要点是理清 nix 的 一些事实标准，例如 flake， home manager，他们是什么，有什么用。好在那本 thiscute 的书完美解决了此问题。

还有一个学习方法是多看别人的 configuration，~~并且大量摘抄~~。我的配置在[下面](#配置)，还有一些：[1](https://github.com/TsubakiDev/nixos-config) [2](https://github.com/ryan4yin/nix-config) [3](https://codeberg.org/shitpostalotl/nixos) [4](https://github.com/wimpysworld/nix-config) [5](https://github.com/jackdbd/nix-config)

### 搜索

安装与配置中很重要的一环是学会搜索。即使 nixos 的文档比较内个，也有一些非常好用的网站用来查询所需信息。

- <https://search.nixos.org/packages>：查找包。
  - 主要也就看 Homepage 和 Source，分别对应项目 README 和 打包 nix 源码
- <https://search.nixos.org/options>：查找设置项
- <https://home-manager-options.extranix.com/>：查找 home-manager 中的设置项。人家做的多好，~~爆杀你们 manual~~
- <https://nur.nix-community.org/>：NUR 包

### 其他资源

- [x to nix](https://xtonix.tei.su/)：将 json，xml，yaml 配置转为 nix 配置。

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

还有我自己[折腾](#后记)后想说的注意事项：使用 `hardware.nvidia.open = true;`，使用官方内核。

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
  LANG = "zh_CN.UTF-8";
  LC_ALL = defaultLocale;
};
```

莫名奇妙就好了，在输入法设置里可以找到双拼键盘，开起来就行。

### 代理

我最开始使用 [v2rayA](../proxy/proxy_software.md#v2raya) 过渡，然后就跑到 [dae](../proxy/proxy_software.md#dae) 了。

### 备份

nix 的配置显然用 git 备份的话非常舒适。起初我以为 `/etc/nixos` 不能放 `.git` 仓库。后来发现是不允许放未提交（dirty）的仓库。再后来我知道有配置可以强制 nixos 使用 dirty 仓库：

```nix
nix.settings.warn-dirty = false;
```

这下终于可以不用 copy 到其他地方备份了。但是有一点需要注意：在 rebuild 前一定记得把新增的文件 `git add` 到暂存区！！否则会报 _No such file or directory_。

至于备份加密，由于我的隐私文件并不算非常隐私，所以用的是我自己写的 [git-simple-encrypt](https://github.com/lxl66566/git-simple-encrypt)，仅需一个密码即可解锁。如果你有更高的安全需求可以看看 sops-nix 或 agenix。

### home manager

我本来是不想用 home manager 的，全写在 `configuration.nix` 里也不麻烦。但是后来还是用了：

1. 假设滚挂了，方便 reinstall（把 import 注释掉即可；否则一个 `configuration.nix` 不好拆，我也不想一个 install 下载几十 GB）
2. 有些配置文件确实不方便统一管，例如 KDE 的某些设置等。

从 `configuration.nix` 转移到 home manager 也不麻烦，[thiscute](#学习) 有很好的教程，并且它们的条目基本是兼容的。

但是进一步定制各种配置文件就没那么简单了，因为 [home-manager 的 manual](https://nix-community.github.io/home-manager/index.xhtml) 就是一坨屎！建议直接用[第三方的 options 搜索](#搜索)。

### [plasma manager](https://github.com/nix-community/plasma-manager)

在 nixos 下，很多 kde plasma6 的设置都不能在 conf 或 home manager 中定义。例如我尝试在 `home.nix` 中使用 `services.random-background` 更换壁纸，结果开机会显示 0.5s 壁纸然后被换回 kde 默认壁纸；还有包括[锁屏时间设置](https://discourse.nixos.org/t/stop-screen-locking-in-plasma/15303/3)的问题等等等等。

顾名思义，plasma manager 就是为了应对此情况出现的。它能保存的 kde 配置不算多，毕竟 kde 世界配置文件无穷无尽。但在一定程度上还是有用的。

### Gaming

- [Gaming on nixos : r/NixOS](https://www.reddit.com/r/NixOS/comments/1c7csct/gaming_on_nixos/)
- [github:fufexan/nix-gaming](https://github.com/fufexan/nix-gaming)：主要是 OSU 相关

Linux 上游戏还是不太行。。。cs2 fps windows 140+，在 nix 上只有 50 左右。不过平常玩点轻量级游戏问题不大，galgame，启动！你的下一台电脑又何必是游戏本！扯远了。

steam 游戏都能够点击即玩，proton 还是牛逼的。一些小作坊汉化 galgame 有兼容性问题，无法在 wine 下正常运行，此时就需要安装虚拟机了。

### 虚拟机

参考我的配置中的 [`others/vm.nix`](https://github.com/lxl66566/nixos-config/blob/main/others/vm.nix) 安装 qemu kvm 及其运行库。

至于镜像我在 win10 和 win11，ltsc 和 tiny 里纠结了一下，选择了 tiny 11 23H3。可以看看[教程](https://www.iplaysoft.com/tiny11.html)，里面还有中文字体包，反正我来者不拒。下载从 web archive 或教程给的地址任选，反正我用了前者。

安装后，打开 `Virtual Machine Manager`，创建新虚拟机，选择下载的 iso 镜像。需要注意，如果 auto detect os 检测不到，需要在下面取消勾选 auto detect os 后自行输入 win11。反正这个 UI 逻辑是挺傻逼的。至于传文件，打开 USB 直通，我的移动硬盘可以分别在两端挂载，这样也不需要考虑太多。

### 快照

NixOS 官方的图形界面安装镜像并没有提供 btrfs 的选项，合理猜测大部分人安装都是用的 ext4 分区，因此 btrfs 的资料应该不多。况且 NixOS 本身就是一个强可复现系统，按理来说并不需要快照作为保护系统的手段。然而可复现是一回事，可复现的难易度又是一回事。`nixos-enter` 的缺陷、 minimal 镜像的折磨、外加 NVIDIA 驱动频繁崩溃，促使我用快照保护系统的安全。

在 nixos 上倒没有频繁打快照的必要，因为只要我有一个正常的快照，恢复后就可以从最新的配置文件 rebuild 回去（快照在这里起到的作用可能是 nixos-enter 的补充，使我能够使用盘里的缓存进行 rebuild），因此我选择不使用自动快照软件例如 snapper，而是手打。

nix 的根目录下都是符号链接，理论上有价值的快照理应是 nix 子卷快照而不是 root 快照。当然都打也可以。

```sh
sudo mkdir /nix/.snapshot
sudo btrfs subvolume snapshot /nix /nix/.snapshot/nix_20240629
```

但是我还没有尝试过快照的恢复，等用到再更新吧。

### root on tmpfs

由于大部分内容都是软链接，nixos 上能玩一个很骚的操作：把 root 挂载成 tmpfs。好处是每次重启所有东西都会被清，可以随便运行一些喜欢到处拉屎的软件。

我看的教程是[Lan Tian @ Blog NixOS 系列（四）：“无状态”操作系统](https://lantian.pub/article/modify-computer/nixos-impermanence.lantian/)，结果还是踩了点坑。

1. 犯了[官方文档中置顶标红](https://nixos.wiki/wiki/Impermanence)的大忌：**没有设 user 密码**。（之前的 defaultPassword 删掉了）于是进不去系统。快照打的是 `/nix`，但是密码在 `/etc/shadow` 并不归 `/nix` 管；也没法直接改挂载选项把原先的 `/` 挂上，因为 `nixos-enter` 进去[无法 rebuild](#nixos-安装)，`--bootloader` 也是 `nixos-rebuild` 的，`nixos-install` 并没有。
   - 最后还是改挂载选项重新 `nixos-install` 了，得益于使用 home-manager 把我的一大堆个人软件分开，本次 install 并没有花费太多时间。install 完至少能先进系统，再修配置，重启就结束了。
2. 然后发现我的 `/etc/nixos` 配置本身没有被 impermanence。。。遂从原先的 `/` 里拷贝之，加入 impermanence，rebuild 即可。

教程中把 `/var` 加入 impermanence，而我更喜欢用 btrfs 子卷管理。由于直接在 `/var` 创建子卷，子卷的 parent 会指向 `/`，所以我进了一次 live cd 创建子卷，保持 `var` 子卷与 `root`、`home` 等同级，然后把东西移过去，重启后写 `hardware-configuration.nix` 然后 rebuild 就行。

## 劝退

最后来说说劝退。NixOS 自身的问题还是不小的：

- 文档稀烂，缺乏条目
  - google 比文档多，学习靠社区解答
- 社区不合，drama 不断
- 报错模糊

我在使用过程中也有一些想吐槽的（其实上面就有很多）：

- `/etc/nixos` 不允许建 `.git` 目录
- 图形化安装界面垃圾
- minimal 镜像缺功能
- home manager 捞爆了

我的资历尚浅，只能够发出如此感叹。如果你希望看到更多对 nixos 的评价，可以看看 [external 2.](#external)。

## external

1. [Why you don't need flake-utils](https://ayats.org/blog/no-flake-utils/)
2. [OS as Code - 我的 NixOS 使用体会 - thiscute](https://thiscute.world/posts/my-experience-of-nixos/)
