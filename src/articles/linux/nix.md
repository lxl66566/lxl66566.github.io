---
date: 2024-06-28
icon: regular fa-snowflake
category:
  - 教程
tag:
  - Linux
  - 桌面端
---

# 安装与配置（NixOS 篇）

::: details 前言

早在去年我便说过我的下一个操作系统很有可能是 NixOS。202405 的 OS 课需要做 PPT 汇报，我的选题是包管理器杂谈，又吹了一波 nix，把我自己心吹得痒痒的。

在考试期间由于压抑的氛围和不情愿的学习，平常想做的事的欲望会被放大许多。但是我预料到 NixOS 的安装肯定会非常折磨（好预测！），所以只在 WSL 里尝尝鲜。而 WSL 终究无法发挥出 Nix 的特色。于是熬到了考完试当晚，我就开始安装 NixOS 了。

之后由于换台式机，有半年没有再用过 NixOS；后来由于有在多个设备上安装 Linux 的需求，就在 7 月中下旬又捡起了 NixOS，并且大幅改了配置。

:::

::: warning

NixOS 绝对不适合 Linux 新手使用，如果你想尝试 NixOS，请务必对 Linux 的启动流程有一定了解，并具有稳定的代理/网络环境后再尝试。

:::

## NixOS 安装

::: tabs

@tab 隐藏

### 默认隐藏，请切 tab 查看

@tab 首次安装

安装我看的是[NixOS 中文](https://nixos-cn.org/tutorials/installation/Subsystem.html)。

NixOS 的安装比我想象的要折磨得多。原以为装过 Arch 的我已经无惧困难，结果输得非常彻底。。一大原因是因为没有 Archlinux 那样的顶级文档，而另一个则是群友人数确实更少，解答问题的也更少。不过这些都是后话了。

我是在还没有学习 nix 语言和特性的情况下装的系统，踩了不少坑。

首先，我[缩了 ArchLinux 的分区大小](./basic.md#调整大小)，踩了一次 [cfdisk 的坑](./problem.md#cfdisk-操作分区)。而后下载了 NixOS 的图形化安装程序，用 ventoy 引导启动，一切正常。然而在安装引导的分区时我发现，图形化界面没有提供 btrfs 分区，只提供 ext4。于是我停止使用图形化界面，改用里面的 konsole 终端。结果 channel update 时无法正常重启某些服务（`xe-daemon.service: NewCachedXenstore error: Cannot locate xenbus dev path...`）。我猜测这是图形界面导致的问题，于是我重新打开 arch，下载了 minimal iso，这里面还有一个[好玩的小插曲](./problem.md#你的复制是真正的复制)。

果然进了 minimal iso ~~有一种回家的感觉~~，并且确实没有重启服务失败的问题了。一番鼓捣，总结出一些规律：

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

求助群友，群友说 `nixos-install` 与 `nixos-rebuild` 效果基本是一样的，让我去外面用 install 试。效果确实差不多，不过每次在 livecd install 都相当于重装，无法用内部的缓存，全部重新下载，还是有点耗时的。install success 后再次 `nixos-enter` 试，还是一样的报错，只要用到 sudo 就会炸。鼓捣了大半天，reinstall 了好几次都无法解决，另一个管理说，在 `nixos-enter` 中这是正常现象，内核的表现是不一致的。我一直把 `nixos-enter` 当 `arch-chroot` 用，没想到这玩意这么捞。

- 日后刷到了[一篇博文](https://blog.lzc256.com/posts/recovering-sudo-in-nixos/)，描述了另一个人是如何解决此问题的。我感觉这更像是 nixos 的 bug 而不是内核不一致。

这回重启就正常了，也不知道是其中的哪次 install 尝试起了作用。于是我成功进入系统开始激情编辑配置。

### 后记

第二天学校有实践课加上 cs2 出新图，没怎么折腾系统，尝试给电脑[装了个 nvidia 驱动](#显卡驱动)和其他玩意就去睡觉了。

第三天起床一开机，直接 dmesg 卡死无法切 tty。兄弟我还有课啊！于是带着去教室不听课，校园网认证还过不了，只好用手机开热点修。这次知道不能 `nixos-enter` 了，但是只能用小手机查资料，每次挂载输入一大串，用镜像输一大串，重新 install 等好久，试错成本偏高。加上我昨天配置改了很多，二分查找需要的次数也不可估量，因此还是非常慢的。（不能简单地放弃 NVIDIA 驱动，因为有 NixOS gaming 需求）

二分查错过程中我发现每次 install 并不会重新写入 EFI 分区（配置里注释了启动项，但是 grub 菜单并没有消失），因此向群友提问。群友答日常 build 和 install 是不会擦除 EFI 的，只有 gc 时会。但是我并不在系统里，`nixos-enter` 如上文所述，并不能执行 gc 指令。

后来怀疑是内核原因：我换了 zen 内核，按理需要用 dkms 的 NVIDIA 驱动，然而实际用的是 NVIDIA 闭源驱动。。换回原内核又发生了 [EFI 空间不足](./problem.md#efi-空间不足)的惨剧，又折腾许久。等我禁用了 NVIDIA 成功开机，都过了午饭时间了。然后一开机我就去[定制了一个 iso](#iso-制作)，太折磨了。

下午折腾中文双拼输入法，详见[输入法](#拼音输入法)。

又过了一天，我想起来 NVIDIA 驱动一直没开，而此时我已经做好了万全的准备，btrfs 打了快照，grub 加了禁用 nvidia 的启动项，自制了启动盘，是时候挑战 NVIDIA 驱动了！于是我开启了显卡驱动，果然又卡 dmesg 了。把 `hardware.nvidia.open = false;` 改成 `true` 以后又好了。正当我高兴，一天后的 rebuild 又让我吸了口凉气，问题并没有解决。

这个问题一放就是两个月，总结了一点规律：

- X11 的锅，卡 dmesg 是 X11 起不来的表现
- 从 windows 重启到 nixos 时卡住的概率更高
- 如果不进 windows，只使用 nixos，则基本不会遇到此问题

反正现在我摆烂了，看到卡 dmesg 就 sysrq 重启。

@tab 二次入坑

自从我装台式后就没有再用过 NixOS，因为 1. 之前的安装给我带来了很大的心理阴影 2. NixOS 安装需要多次 bootstrap，即使有声明式配置也一点都不简单 3. 大四下我正在享受最后的青春，天天在 windows galgame，确实没有装 NixOS 的动力。因此就这样过了半年。

202507 由于我买了家庭服务器，想装成 nixos 用，于是就重新先在我的主力机上回坑 nixos，调完配置再搞。那台服务器暂时先装了个 windows 调完 Ryzen Master 参数先跑着（）

我先是用我原先的同款配置，果然 nixos-install 时整天报网络 error；不过好在有了经验，知道国内几个镜像源要轮换着用，加之我的回坑大概过了半年不算太久，intel 显卡也不需要什么配置，于是就还算顺利地在主力机上装好了。

但是这是我第一次考虑使用一份配置安装多个 NixOS 主机，原先的屎山配置肯定是要拆的。然后我一咬牙，就花了几天时间把我的 [tag 论](../../gossip/va_view.md#tag-论)设想在我的配置里实现了。拆配置是痛苦的，拆完的成就感是满的；我甚至天天在公司摸鱼读文档拆配置，晚上带回家 rebuild 解决报错，小日子过得还不错。

然后 20250726 把新配置写得差不多了，就在服务器上装好了 NixOS。期间也是切到主力机上改配置改了很多次，因为发现了各种各样的问题，包括 iso 也重做了很多次，笑死。总之没有遇到太多问题。

@tab NixOS-WSL

由于许多配置都在 NixOS，而上班必须用 WSL（问就是某个公司软件不提供 Linux 版，而项目要用 Linux 跑），之前用 ArchWSL 不够爽，因此试着用一下 NixOS-WSL。（刚好摸摸鱼）

经过了配置 feature 化改造，现在想要筛选出不需要在我的这个设备上的配置非常简单。

@tab 远程安装

- nixos-anywhere 需要[魔法咏唱](https://t.me/nixos_zhcn/687180)，挺麻烦的我不太感兴趣
- [lantian 佬的 dd 镜像](https://lantian.pub/article/modify-computer/nixos-low-ram-vps.lantian/)：用过几次，但是这个示例依赖 systemd 管理网络，我曾经遇到过 dd 完后服务器连不上的情况。
- 最后我还是用了 [bin456789/reinstall](https://github.com/bin456789/reinstall)，一键重装实在太方便了，除了强制用 ext4 以外没有缺点。

用 reinstall 重装后，再 `nixos-rebuild switch --flake .#<host> --target-host <host> --build-host <host>` 即可。

:::

## 学习

如何学习 nix 呢？nix 没有强大的 wiki，遇到问题只能到处 google。但是也有一些好的资源。

- [NixOS 中文](https://nixos-cn.org/tutorials/installation/Subsystem.html)：安装教程与初步使用
- [NixOS 与 Flakes - thiscute](https://nixos-and-flakes.thiscute.world/zh/preface)：进阶好书
- [Lan Tian @ Blog](https://lantian.pub/article/modify-website/nixos-why.lantian/)：打包与高级用法
- [中文 discourse](https://discourse.nixos.org/c/learn/chinese/55) & [telegram group](https://t.me/nixos_zhcn)：可能可以来问问题
- [awesome-nix](https://github.com/nix-community/awesome-nix)：里面也有 for tutorials / developers 的链接。

一个要点是理清 nix 的 一些事实标准，例如 flake， home manager，他们是什么，有什么用。好在那本 thiscute 的书完美解决了此问题。

还有一个学习方法是多看别人的 configuration，~~并且大量摘抄~~。我的配置在[下面](#配置)，还有一些：[ryan4yin's config](https://github.com/ryan4yin/nix-config) [nyancat](https://git.ny4.dev/nyancat/flake/src/branch/master) [wimpysworld](https://github.com/wimpysworld/nix-config) [jackdbd](https://github.com/jackdbd/nix-config) [nmasur](https://github.com/nmasur/dotfiles) [oo-infty](https://github.com/oo-infty/nixos-configurations) [AsterisMono](https://github.com/AsterisMono/flake)

### 语言基础

2025 年 AI 已经非常强大，语法问题完全可以开 online search 问 AI。

- 先阅读 [NixOS 中文 - Nix 语言快速入门](https://nixos-cn.org/tutorials/lang/QuickOverview.html)。
- 条件判断：一般接触多的是 `if..then..else` 和 `lib.mkIf`。
  - 两个 if 里条件只能是 bool，不能是其它类型。
  - `lib.mkIf` 和 `if..then..else null;` 是不一样的！`lib.mkIf` 求值时会被转换成类似 `{ _type = "if"; condition = ...; content = ...; }` 的形式，方便求值时验证和 lazy。
- `inherit x y;` = `x=x;y=y;`，就是用来透传的。
- function 的 `@` 绑定：`bargs@{a, b, ...}:` is equivalent to `{a, b, ...}@bargs:`
- `//` 用于两个 attrset 的合并，**右边覆盖左边**。
- 最常用的一些判断条件：`mkDefault` 和 `mkForce` 修改合并优先级，`mkBefore` `mkAfter` 修改 list 合并顺序，`mkIf` 条件控制某些属性的有和无，`optional` 根据条件返回 null 或 `[x]`，而 `optionals` 返回 null 或 x。
  - config 只能设置，不能取消。如果你需要取消已有的设置，只能去查一下默认值然后使用 mkForce (默认值)。并且如果版本更迭，默认值发生改变，配置就出现了不一致行为。
- 数据类型：
  - 数组：list。
    - 判断元素是否存在：`builtins.elem elem list`。
    - 删除元素只能用 filter。
- nix config 里，attrset to INI 的类型要求必须有 section。但是实际 ini 配置可能有些条目没有 section ，所以必须使用一个伪 section: main。例如 `xxx = 1` 需要写成 `main = { xxx = 1;};`。
- 有的配置只支持 string type，不支持 path。这时候我们需要把一个文件弄到 store 里并返回 store 的路径。可以使用 `"${./path/to/file}"`。
  - 我以前不知道这事，写了许多麻烦的函数：
    ```nix
    configToStore =
      configFile:
      toString (self.writeText (builtins.baseNameOf configFile) (self.lib.fileContents configFile));
    binaryToStore =
      binaryFile:
      super.runCommand (builtins.baseNameOf binaryFile)
        {
          nativeBuildInputs = [ super.coreutils ];
        }
        ''
          cp ${binaryFile} $out
          chmod +x $out
        '';
    ```
  - 如果路径里本身就含有变量呢？此时需要利用 `path + str = path` 的特性，使用 `"${./. + "/${var}/file"}"`。

### OS 基础

- NixOS 应用配置分三步：eval, build, apply。
- NixOS module 里有一些 top level attribute，例如 `imports`, `options`, `config`，还有 `disabledModules`。其他非 top level 的项默认会包在 `config = {...}` 里面。
  - disabledModules 在求值时可以取消 imports 引入的模块。因为 list 在 merge 时不能移除元素，所以很多人会分非常多的模块（例如一行 `systemPackage = ...` 也分一个模块），然后使用 disabledModules 控制不同 host 下**排除**某些包。说到底还是 Nix 的设计缺陷。
- nar 是 NixOS 的归档格式，具有确定性。[RFC 的 nar](https://nix.dev/manual/nix/2.22/protocols/nix-archive) 写得有点蠢。

### nix command

常用命令：

```sh
nix-prefetch-url <url>                  # fetch 并输出 sha256。在打包时经常用到。
nix-collect-garbage -d                  # 删除所有配置的所有旧版本，并 GC。（彻底清理）
nix flake update <input>                # update flake 想必大家天天用，但是 update 一个特定 input 应该用得很少吧
```

其他：

- 最简单的填 hash 方法是先乱填一个，rebuild 报错后再从报错信息里拿真 hash 加上去。因为 nix hash 是有坑的，默认的 nix-hash xxx 算的是 nar hash。请务必添加 `--flat`，这样才能算 file hash。

## 工具

- [nix-index](https://github.com/nix-community/nix-index)：找包位置。**实际上并不好用**，因为
  1. 需要查找的时候经常是刚安装完软件的时候，还没有 updatedb。而 nixos 的手动 updatedb 耗时极长。
  2. 默认 locate 时也会搜索路径，nix 路径又基于 hash，因此会有很多 hash 污染搜索结果。
  - 感觉真不如 `cd /nix/store && fd xxx`。
- [nix-tree](https://github.com/utdemir/nix-tree)：交互式的依赖寻找，非常好用。打开以后按 `/` 查找。关于具体的查找依赖，可以参考[这里](https://nixos-and-flakes.thiscute.world/zh/nixos-with-flakes/other-useful-tips#why-some-packages-are-installed)。

### 搜索

安装与配置中很重要的一环是学会搜索。即使 nixos 的文档比较内个，也有一些非常好用的网站用来查询所需信息。

- <https://search.nixos.org/packages>：查找包。
  - 主要也就看 Homepage 和 Source，分别对应项目 README 和 打包 nix 源码
- <https://search.nixos.org/options>：查找设置项
- <https://home-manager-options.extranix.com/>：查找 home-manager 中的设置项
- ~~<https://noogle.dev/>：nix 语言学习查找~~（其实很多定义都缺了，很捞）
- <https://nur.nix-community.org/>：NUR 包
- [Nix 落絮](https://luoxu.torus.icu/)

### 其他

- [x to nix](https://xtonix.tei.su/)：将 json，xml，yaml 配置转为 nix 配置。（但是没啥必要，因为可以通过 `lib.importJSON` 或者其他相关函数自动转。已经有 json 就真没必要硬塞到 nix 里吧。）

## 配置

[我的配置仓库](https://github.com/lxl66566/nixos-config)

202507 第二次入坑 NixOS 时，我将整个配置重新拆成类似 Rust feature gate 的形式，符合我的 [tag 论](../../gossip/va_view.md#tag-论)。这样我就可以在各种系统上方便地组合 feature，以定制最符合我的需求的配置。

### 配置的组织结构

nix 非常自由，你可以自由组织自己的配置结构。我目前见过的或者用过的有如下几种：

- 乱放型：基于 flake.nix, configuration.nix 和 home.nix 构建的配置，所有东西全部乱放。一般在 nix 早期，配置较少，还不熟悉 nix 语言和结构的时候使用。
- 开关型：有了多主机部署的要求，每台主机有着不同特点，因此原来的乱放型不适用了。开关型指的是在 flake.nix 中定义一些开关，通过 specialArgs 传到各个模块中，控制模块内部的配置。
- Dendritic Pattern：每个文件都是一个 flake-parts 模块，拥有完整的配置。这样可以组织非常庞大的配置结构，并且具有相当高的自由度。
  - Dendritic Pattern 只是这样一个比较笼统的概念，你可以在此基础上任意衍生。
  - [Arcohol/nix-config](https://github.com/Arcohol/nix-config) 是一个非常好的 Dendritic Pattern 例子。

我的看法：随着配置越来越多，尝试各种不同的组织结构来管理大量配置是一件非常自然的事情。如果你刚入坑 nix，看到复杂的组织结构被吓到也是很正常的。我觉得没必要一上来就抄复杂配置，在大量模块中迷失自我；从乱放慢慢过渡到复杂结构也是一个比较有意思的过程。

有一些教程会使用 flake-parts，但是这玩意绝不是必须的，比如 ryan4yin 佬的[巨大无比配置](https://github.com/ryan4yin/nix-config)也没有用到它。flake-parts 官方的文档跟狗屎一样，即使我有心入坑也没有任何头绪，而且这玩意有很多隐藏的复杂度，因此还是算了吧。

### linter / formatter

nix 是一门图灵完备的函数式语言，写 nixos config 就是编程的过程。说到编程那肯定少不了 linter 和 formatter。而我是 all in vscode 人，我使用的插件如下：

- _Nix IDE - Noortheen_：lsp，需要手动安装 `pkgs.nil`
- _nixfmt - brettm12345_：formatter，需要手动安装 `pkgs.nixfmt-rfc-style`

### 显卡驱动

::: tabs

@tab NVIDIA

官方给出了比较详细的 NixOS 显卡驱动教程([NixOS Manual - Nvidia](https://nixos.wiki/wiki/Nvidia))，看就完了。我认为还存在一些缺点：

1. 有些复杂，例如双显卡需要手动查总线并写入 hardware-configuration.
2. prime 功能有点残缺，官方给出的 example 里只有在启动时选择不同的启动项以应对外带和接电源两种情况，而不能动态调整性能模式：正常情况下应该是在游戏启动时启用显卡而在未游戏时关闭。

还有我自己[折腾](#后记)后想说的注意事项：使用 `hardware.nvidia.open = true;`，使用官方内核。

@tab Intel

I 卡的驱动实在是太简单了，赞美 intel。

```nix
{ pkgs, ... }:
{
  # for intel Arc A750 GPU
  hardware.graphics = {
    extraPackages = with pkgs; [
      vpl-gpu-rt
    ];
  };
}
```

:::

### 拼音输入法

用英文有点习惯，要不是我打开博客想写论文我都想不到中文输入法没装。

::: tabs

@tab fcitx5-chinese

我先尝试 arch 上用习惯的 fcitx5-chinese：

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

ps. 根据[群友描述](https://t.me/nixos_zhcn/477206)，只需要将 KDE 配置文件删除即可，与 defaultLocale 无关。

`fcitx5-configtool` 里双拼键盘下的“管理自定义词组”是坏的，点不开。我也懒得修了，把以前 archlinux 位于 `~/.local/share/fcitx5/pinyin/customphrase` 的词库搬出来，拿到 home-manager 里 source 一下就好了（需要 [重启 fcitx5](https://wiki.archlinux.org/title/Fcitx5#Emoji_show_abnormally_in_the_candidate_box)：在 bash 里跑 `` kill `ps -A | grep fcitx5 | awk '{print $1}'` && fcitx5& ``），也符合 nixos 的原则。

@tab rime

然后被 rime 党吹的有点心动，想试试 rime。刚好 ryan4yin 佬[就是 rime + 小鹤](https://github.com/ryan4yin/nix-config/tree/main/overlays)，于是我便直接开抄配置。可能是 overlays 哪出了问题，rebuild 的时候并没有把数据移到 rimedata，我也百思不得其解。后来手动移过去试了一下，发现真难用啊（包括快捷键啥都不懂）。于是滚回了 fcitx5-chinese-addon。

后来因为实在有一些多系统共用输入法的问题，然后先在 windows 上入坑了 rime，先把配置和快捷键吃明白。[相关文章](../input_method.md#rime)

然后再在 NixOS 上使用 Rime，这回我**不再使用任何 overlays**，并且已经有了自己的配置仓库，所以没遇到啥问题。

教训：不要学其他 NixOS 人洁癖，啥都必须给 NixOS 管。Rime 配置本身就是一个 home 里的文件夹，自己跟 Github 上的仓库维护同步即可。

:::

### 代理

详见 [代理客户端](../proxy/proxy_software.md)。我最开始使用 [v2rayA](../proxy/proxy_software.md#v2raya) 过渡，然后就跑到 [dae](../proxy/proxy_software.md#dae) 了。

但是在 NixOS-WSL 上，dae 无法使用；而用 v2rayA 又很丑，我希望使用 Windows 下的代理软件，此时即使设置了 `HTTP_PROXY` 等环境变量，在 NixOS 去 fetch github 时也无法生效。因为此时实际上去 fetch 的是 nix-daemon，而这玩意是不吃终端的代理的。解决方法是修改 nix-daemon service，有一个临时方案和一个永久方案。

::: tabs

@tab 永久方案

```nix
systemd.services.nix-daemon.serviceConfig = {
  Environment = "https_proxy=" + proxy;
};
```

@tab 临时方案

```sh
sudo mkdir -p /run/systemd/system/nix-daemon.service.d/
sudo tee /run/systemd/system/nix-daemon.service.d/override.conf << EOF
[Service]
Environment="https_proxy=http://localhost:10450"
EOF
sudo systemctl daemon-reload
sudo systemctl restart nix-daemon
```

([ref](https://nixos-cn.org/tutorials/installation/Networking.html#_3-使用代理工具加速访问-channels-跟-flake-inputs))

:::

然而一个更大的问题是 WSL2 的 mirrord 网络问题太多了，其中最大的问题是 tcp 建连关闭端口本来应该收到 RST，结果现在收不到 RST 而直接 timeout ([issue](https://github.com/microsoft/WSL/issues/10855))。被这个问题坑了很多次，忍无可忍，最终我还是回到了原始的 v2raya。

### 备份

nix 的配置显然用 git 备份的话非常舒适。起初我以为 `/etc/nixos` 不能放 `.git` 仓库。后来发现是不允许放未提交（dirty）的仓库。再后来我知道有配置可以强制 nixos 使用 dirty 仓库：

```nix
nix.settings.warn-dirty = false;
```

这下终于可以不用 copy 到其他地方备份了。但是有一点需要注意：在 rebuild 前一定记得把新增的文件 `git add` 到暂存区！！否则会报 _No such file or directory_。

至于备份加密，我不喜欢用密钥管理，我就是喜欢单密码，因此用的是我自己写的 [git-simple-encrypt](https://github.com/lxl66566/git-simple-encrypt)（在 [nur](https://nur.nix-community.org/repos/lxl66566/) 上可用）。如果你有更高的安全需求可以看看 sops-nix 或 agenix。

### home manager

我本来是不想用 home manager 的，全写在 `configuration.nix` 里也不麻烦。但是后来还是用了，因为有些配置文件确实不方便统一管，例如 KDE 的某些设置等。

从 `configuration.nix` 转移到 home manager 也不麻烦，[thiscute](#学习) 有很好的教程，并且它们的条目基本是兼容的。

但是进一步定制各种配置文件就没那么简单了，因为 [home-manager 的 manual](https://nix-community.github.io/home-manager/index.xhtml) 就是一坨屎！建议直接用[第三方的 options 搜索](#搜索)。

一般的 home manager 教程都会把 home manager modules 和 config modules 分开放。但是如果要将这两个 config 放在一起呢？答：只需要使用 `home-manager.users."${username}" = {...};` 即可，它们是可以放在同一个文件里的。

注意，如果在这种 home manager 块里使用其他 flake 的 homeModules 等会更改 config/lib 的操作，记得写成函数形式以将 system config 透进来，例如 `home-manager.users."${username}" = { config, lib, ... }: {...};`。否则会出一些奇奇怪怪的问题。

### [plasma manager](https://github.com/nix-community/plasma-manager)

在 nixos 下，很多 kde plasma6 的设置都不能在 conf 或 home manager 中定义。例如我尝试在 `home.nix` 中使用 `services.random-background` 更换壁纸，结果开机会显示 0.5s 壁纸然后被换回 kde 默认壁纸；还有包括[锁屏时间设置](https://discourse.nixos.org/t/stop-screen-locking-in-plasma/15303/3)的问题等等等等。

顾名思义，plasma manager 就是为了应对此情况出现的。它能保存的 kde 配置不算多，毕竟 kde 世界配置文件无穷无尽。但在一定程度上还是有用的。

### Gaming

- [Gaming on nixos : r/NixOS](https://www.reddit.com/r/NixOS/comments/1c7csct/gaming_on_nixos/)
- [github:fufexan/nix-gaming](https://github.com/fufexan/nix-gaming)：主要是 OSU 相关

Linux 上游戏还是不太行。。。cs2 fps windows 140+，在 nix 上只有 50 左右。不过据群友说，在 vulkan 着色器编译完成后游戏可以大幅提高帧率。我暂时还未尝试。

不过平常玩点轻量级游戏问题不大，galgame，启动！你的下一台电脑又何必是游戏本！扯远了。

steam 游戏都能够点击即玩，proton 还是牛逼的。一些傻逼引擎的 galgame 无法在 wine 下正常运行，此时就需要安装[虚拟机](#虚拟机)了。（某大佬：[因为没法在 wine 上玩 gal 于是啃掉一本《软件安全与逆向分析》然后开始做逆向](https://asukaminato.notion.site/gal-4f4db9c5affe4836a58ae0a44f47d5f6#4f4db9c5affe4836a58ae0a44f47d5f6)，学不来实在是学不来）

nix gaming 还有过不去的一关就是性能释放。。我这台电脑[风扇总是不转，无法调整风扇转速](./problem.md#nixos-调整风扇转速)，有点悲惨。风扇不转想打啥游戏都不行吧，立刻降频了。大量求助后仍然未果，所以立刻开寄。

### 虚拟机

::: tip

2025 年当下，最好的办法是基于 windows docker 的解决方案，例如 [winboat](https://github.com/TibixDev/winboat)，而不是虚拟机。

:::

参考我的配置中的 [`others/vm.nix`](https://github.com/lxl66566/nixos-config/blob/main/others/vm.nix) 安装 qemu kvm 及其运行库。

至于镜像我在 win10 和 win11，ltsc 和 tiny 里纠结了一下，选择了 tiny 11 23H3。可以看看[教程](https://www.iplaysoft.com/tiny11.html)，里面还有中文字体包，反正我来者不拒。下载从 web archive 或教程给的地址任选，反正我用了前者。

安装后，打开 `Virtual Machine Manager`，创建新虚拟机，选择下载的 iso 镜像。需要注意，如果 auto detect os 检测不到，需要在下面取消勾选 auto detect os 后自行输入 win11。反正这个 UI 逻辑是挺傻逼的。至于传文件，打开 USB 直通，我的移动硬盘可以分别在两端挂载，这样也不需要考虑太多。

感想：

- tiny 11 感觉也不 tiny。。。安装完占了我 17G 空间，感觉还是得 win10 吧。
- libvirt 也不好用，剪贴板和文件都没有傻瓜式解决方案。

### 快照

::: details archived

NixOS 官方的图形界面安装镜像并没有提供 btrfs 的选项，合理猜测大部分人安装都是用的 ext4 分区，因此 btrfs 的资料应该不多。况且 NixOS 本身就是一个强可复现系统，按理来说并不需要快照作为保护系统的手段。然而可复现是一回事，可复现的难易度又是一回事。`nixos-enter` 的缺陷、 minimal 镜像的折磨、外加 NVIDIA 驱动频繁崩溃，促使我用快照保护系统的安全。

在 nixos 上倒没有频繁打快照的必要，因为只要我有一个正常的快照，恢复后就可以从最新的配置文件 rebuild 回去（快照在这里起到的作用可能是 nixos-enter 的补充，使我能够使用盘里的缓存进行 rebuild），因此我选择不使用自动快照软件例如 snapper，而是手打。

nix 的根目录下都是符号链接，理论上有价值的快照理应是 nix 子卷快照而不是 root 快照。当然都打也可以。

```sh
sudo mkdir /nix/.snapshot
sudo btrfs subvolume snapshot /nix /nix/.snapshot/nix_20240629
```

但是我还没有尝试过快照的恢复，等用到再更新吧。

:::

理论上确实没必要为 `/nix` 打快照；之前解法是放一个 `minimal.nix` 作为崩溃的恢复，由于软件不多，重装也能快速装好。后来稳定下来以后发现根本就没有重装 nix 的机会。

### root on tmpfs

由于大部分内容都是软链接，nixos 上能玩一个很骚的操作：把 root 挂载成 tmpfs。好处是每次重启所有东西都会被清，可以随便运行一些喜欢到处拉屎的软件。

这里面最重要的东西是 impermanence，它就是一个 “mount mount 小工具”，可以将指定文件/文件夹 mount 到指定位置，这样它的修改也会同步到 source，并且比起 softlink 还可以跨子卷/分区。我看的教程是[Lan Tian @ Blog NixOS 系列（四）：“无状态”操作系统](https://lantian.pub/article/modify-computer/nixos-impermanence.lantian/)，结果还是踩了亿点坑。

1. 犯了[官方文档中置顶标红](https://nixos.wiki/wiki/Impermanence)的大忌：**没有设 user 密码**。（之前的 defaultPassword 删掉了）于是进不去系统。快照打的是 `/nix`，但是密码在 `/etc/shadow` 并不归 `/nix` 管；也没法直接改挂载选项把原先的 `/` 挂上，因为 `nixos-enter` 进去[无法 rebuild](#nixos-安装)，`--bootloader` 也是 `nixos-rebuild` 的，`nixos-install` 并没有。
   - 最后还是改挂载选项重新 `nixos-install` 了，得益于使用 home-manager 把我的一大堆个人软件分开，本次 install 并没有花费太多时间。install 完至少能先进系统，再修配置，重启就结束了。
2. 然后发现我的 `/etc/nixos` 配置本身没有被 impermanence。。。遂从原先的 `/` 里拷贝之，加入 impermanence，rebuild 即可。
3. 不要把 `/etc/shadow` 或 `/etc/passwd` 加入持久化。我加入以后开不了机，无法登录。

教程中把 `/var` 加入 impermanence，而我更喜欢用 btrfs 子卷管理。由于直接在 `/var` 创建子卷，子卷的 parent 会指向 `/`，所以我进了一次 live cd 创建子卷，保持 `var` 子卷与 `root`、`home` 等同级，然后把东西移过去，重启后写 `hardware-configuration.nix` 然后 rebuild 就行。

impermanence 在 NixOS 安装过程中是一个硬性的 bootstrap 来源；你必须成功安装 NixOS 后，才能获取原始的文件，进行持久化。然后教程里你需要手动将对应文件复制到 `/nix/impermanence` 下，这一步在 bootstraping 时也太麻烦了点，我思考以后想出一个好办法：在开启 root on tmpfs 时，将老的 `/` (root) 子卷挂到随便一个什么 `/fakeroot` 上；然后就可以用 impermanence 从 `/fakeroot` 里 mount 文件了，这样省去了手动 copy 文件的这一步骤，在我的配置中只需要修改一个 bool 值就可以自动切 root on tmpfs，将工作量降到了最低，非常舒服。

### ISO 制作

官方的 ISO（不论 minimal 或图形界面的）都是一坨狗屎，图形界面安装没有 btrfs 而且 rebuild 会 fail，minimal 则是缺少工具（efibootmgr）并且无法匹配我的个人设置（手动挂一大堆 btrfs 子卷实在是有点折磨），所以还是自己做 iso 比较好。我自己做的 iso 有这些需求：

1. 代理支持。如果正常安装 NixOS 的 flake，是没有办法在没有代理的环境成功安装的，如果 iso 没有代理的话就要用 minimal 配置进行一次 bootstrap。有代理的话就可以一次性解决了。
2. btrfs 相关脚本。我在所有机器上使用同一份 btrfs 配置，但是手动 mount 一大堆子卷实在是太麻烦，因此需要内置一些脚本帮我快速创建并 mount 子卷，这样也方便滚挂了以后进 livecd 修。
   - 使用 disko 一键分区是方便，但是如果你要在一块盘上装双系统不就挂比了吗？
3. 其他实用工具，例如 fish shell 等。

制作 iso 可以用下面的方法将本机文件拷贝到镜像系统里：

```nix
isoImage.contents = [
    {
      source = ./config/absx.dae;
      target = "/config.dae";
    }
];
```

但是这里有个坑，就是拷贝到的 `/` 位置在镜像里其实是独立的 `/iso` 文件夹，导致了我的 dae service fail。后来将 `dae.configFile = "/iso/config.dae";` 设置后代理才能正常启动。

还有关于 btrfs 脚本，我最开始时是直接写在 fishshell 的 interactiveShellInit 里；但是后来发现脚本写锅了需要修改时，整个 iso 里没有地方可以找到这个脚本内容并修改，这是 fishshell 的问题。没办法，我只好写好 bash 脚本并 source 到 /iso 下的指定位置；后来我直接使用 `pkgs.writeShellApplication` 做成 derivation 了，方便调用，脚本内容也可以在 iso 里 fd 出来修改。

最后我还在构建 iso 时，将整个本机的 nixos 文件夹 source 到了镜像内，方便在 dae 挂了没法 git clone 的时候也可以拿到我的配置（虽然可能过时）进行安装。这里也有 source 时需要排除 .git 文件夹和其他文件夹的问题，免得增加 iso 镜像大小。

做完了这些，现在我的 iso 就得心应手了。iso 定义可以[在配置里找到](https://github.com/lxl66566/nixos-config/blob/main/iso.nix)。

### 开发环境

我一直使用 vscode，但是在 nixos 上，还是有点难用的。

- vscode 全自动同步过程中，有部分插件没有同步过来。
- 手动在 `home.nix` 里添加插件后，所有禁用的插件会被自动启用。
- 某些插件在非 feh 环境下无法运行；feh 环境下无法在终端使用 sudo。
- 无法使用 ssh 插件远程开发。

## 问题解决

### env 不生效

在 WSL 上修改了 `environment.variables`，rebuild 后重启终端，env 仍然不生效。然后发现需要重启 WSL 才能生效。

### 太大了

我要在 VPS 上安装我的 flake。但是太大了，VPS 被塞爆了，并且我在 copy path 时观察到一些例如 llvm，rustc 等我根本没有手动安装的软件，于是需要查哪些傻卵打包者引入了这些依赖。但是问题是我需要在不实际安装的情况下进行查询。

求助群友后，[@wElmForest](https://t.me/wElmForest) 给出了一个解法：

```sh
nix why-depends .#nixosConfigurations.<hostname>.config.system.build.toplevel nixpkgs#<依赖> --impure
# or
nix-tree .#nixosConfigurations.<hostname>.config.system.build.toplevel --impure
```

实测是需要先使用 `nix why-depends` 进行 build 后，再用 `nix-tree` 进行查询，否则会爆 `nix-tree: user error (Invalid path: ... Make sure that it is built, or pass '--derivation' if you want to work on the derivation.)`。因为我是远程的配置，还没安装呢！当然没 build 过。不过抛开这个特性不谈，nix-tree 还是好用的。

找到了一个占用 3G 多的罪魁祸首 prettybat，直接把它干掉了。后续也找到 yazi 引入 ffmpeg 占用了 1.1G，也干掉了。

## 优势与劝退

我认为 NixOS 的优点有：

- Nix 语言作为一个配置语言本身设计得不错，支持复杂逻辑，考虑了配置合并与覆盖优先级与递归，支持动态类型和类型检查，支持字段描述，函数式与 std 分离等……
- 由于 NixOS 的可复现性，NixOS 可以让人敢于也愿意去尝试更多的新东西（毕竟不太需要担心它 break 你的系统或者在你的目录里拉屎）。

不过也不得不说 NixOS 自身的问题还是不小的，详见 [狂喷 nixos](../../gossip/fuckxxx.md#nixos) 和 [包管理器杂谈](../../coding/package_manager.md)。

我的资历尚浅，只能够发出如此感叹。如果你希望看到更多对 nixos 的评价，可以看看 [external 2.](#external)。

## external

1. [Why you don't need flake-utils](https://ayats.org/blog/no-flake-utils/)
2. [OS as Code - 我的 NixOS 使用体会 - thiscute](https://thiscute.world/posts/my-experience-of-nixos/)
3. [Minimizing NixOS images](https://nixcademy.com/posts/minimizing-nixos-images/)
