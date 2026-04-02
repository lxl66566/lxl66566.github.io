---
date: 2026-03-31
icon: brands fa-windows
category:
  - 教程
tag:
  - 桌面端
  - Windows
---

# Windows 小知识与日常使用

## 软件

关于软件推荐请前往[杂项 - 软件汇总](../../farraginous/recommend_packages.md)页面。

## 自启动

有几种方法可以在 windows 上进行自启动：

1. 打开任务管理器，选择到 `启动` 进行修改。
2. 在 _运行_ 中输入 `shell:startup` 打开启动文件夹，拖入需自启动的程序快捷方式。
3. `services.msc` 中的服务可以设为自启动。

如果你习惯命令行操作，也可以使用我写的 [user-startup-rs](https://github.com/lxl66566/user-startup-rs) 添加自启动命令。

## shell alias

[ref](https://stackoverflow.com/questions/20530996/aliases-in-windows-command-prompt)。被 linux 驯化了，再回到没有 alias 的 windows 是真不习惯。而且微软的 shell 确实傻逼[^fuckpwsh]。

[^fuckpwsh]: [powershell 笑话一则](https://t.me/withabsolutex/2473)。

::: tabs

@tab 更换其他 shell

最简单也是更好的方法是[换其他 shell](../../coding/shell.md)。我在 windows 上比较喜欢用 nushell。如果你不想折腾这种新东西，可以用 git bash。

@tab cmd

新建一个脚本放在某个地方，然后设成打开 shell 自动执行，对 cmd 来说相当于 `.bashrc`。

```bat
@echo off
DOSKEY ls=dir $*
DOSKEY alias=notepad %USERPROFILE%\alias.cmd
```

如果有 alias 多行指令需求，那就得写 `.cmd` 文件并写进 `PATH` 里了。

:::

## 组织管理

Windows 的最大后门是微软自己。组织管理是一种以不正常方式控制你的个人电脑的行为，我非常反感这一行为。

正常来说个人电脑不应该出现组织管理。如果出现，请立刻删除：

1. _设置 - 账户 - 登录工作或学校帐户_ 里自查，是否有登录账户。
2. 终端管理员执行 ([ref](https://answers.microsoft.com/zh-hans/windows/forum/all/如何解决windows11/c8ca1777-f33a-487a-bb36-c8ac920fbd6c))：
   ```bat
   RD /S /Q "%WinDir%\System32\GroupPolicyUsers"
   RD /S /Q "%WinDir%\System32\GroupPolicy"
   gpupdate /force
   ```
   然后重启。
3. 清除所有注册表组织策略：终端管理员执行
   ```bat
   reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies" /f
   reg delete "HKCU\Software\Policies" /f
   reg delete "HKLM\Software\Microsoft\Policies" /f
   reg delete "HKLM\Software\Microsoft\Windows\CurrentVersion\Policies" /f
   reg delete "HKLM\Software\WOW6432Node\Microsoft\Policies" /f
   reg delete "HKLM\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Policies" /f
   ```
4. 注册表修改，不允许 Azuer AD 组织管理的询问弹窗 ([ref](https://www.reddit.com/r/Intune/comments/14cgova/how_to_disable_or_turn_off_the_allow_my/))。
   ```reg
   Windows Registry Editor Version 5.00
   [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WorkplaceJoin]
   "BlockAADWorkplaceJoin"=dword:00000001
   ```

然而对我的公司来说，无论我怎么折腾，只要我运行了公司的软件，它就会给我的 windows 账户加入组织管理，前面的这些方法对它一点用都没有。所以说微软是 Windows 的最大后门，如果碰上这种情况还是放弃吧。
（这也是为什么我司只提供 Windows 和 MacOS 的办公软件，因为方便 MDM 组织管理，Linux 因为太自由了没有合法的方法控制，所以不会被纳入考虑范围。）

在这种情况下，怎么对某个不得不运行的软件抓包，用改 host 的方式阻断 MDM 相关域名，这又是另一个话题了。

## 权限控制

> 起因：MS-DOS 自带的 `tree` 命令太难用了。我想把它替换为 [tree for windows](https://gnuwin32.sourceforge.net/packages/tree.htm)。

windows 文件/文件夹除了对不同 User 的权限控制外，还有 _所有者_ 这一概念。_所有者_ 可以修改文件/文件夹权限。

一般来说，拥有管理员权限能干的事情已经比较多了，但是对于某些系统位置还是没辙。究其原因，有些文件的 _所有者_ 是 _TrustedInstaller_，并且权限设置成了 _所有者_ 拥有完全访问权限，管理员只读。因此我们在修改这些文件时需要：

1. 将所有者改为自己：_属性 - 安全 - 高级_，更改所有者，输入你的用户名然后右边点 _检查名称_，会帮你自动补全。然后一路确定。
2. 更改权限：一般这种文件/文件夹的父文件夹也是管理员控制的。因此给管理员 _完全控制_ 权限即可。在上一步的 _安全_ 内点 _编辑_，给管理员勾上 _完全控制_ 即可。

## 链接

windows 下也可以[像 linux 一样](../../articles/linux/basic.md#链接)创建硬链接和软连接。由于盘符即分区，硬链接是无法跨盘符的，所以以后使用 windows 还是不要分多个盘符比较好。

软链接：

- 不能使用 _创建快捷方式_ 的方法。快捷方式本质上是一个 `.lnk` 文件，与真正的软链接不同。
- 不能在 wsl 内使用 `ln -s` 创建。这样创建的软链接不会被 windows 识别。

软链接的创建方式：打开管理员终端，`mklink /D <destination> <source>`。`mklink` 默认为软链接，`<destination>` 与 `<source>` 的位置跟 `ln` 是相反的，并且必需要指定名字[^2]。

[^2]: 例如，若有一个 `src` 目录，在 linux 下 `ln -s /mnt/d/src /mnt/d/tmp` 创建 `/mnt/d/tmp/src` 的软连接，则在 windows 上需要 `mklink /D D:\tmp\src D:\src` 指明 `src` 的名称。

## 杀毒

一般我不喜欢杀毒软件时刻运行，也不喜欢 Microsoft Defender 乱删乱扫。但是对于天天运行用户上传的 exe 的 galgame 玩家来说，杀毒可以给自己一些心理安慰。这时候就需要一个一次性的杀毒工具。

[卡巴斯基病毒清除工具应用程序](https://www.kaspersky.com.cn/downloads/free-virus-removal-tool) 是一个一次性无残留的杀毒工具，用后即丢，非常匹配我的需求。

## 虚拟化与 WSL

早先的时代，WSL1 实现了一个 Linux API 到 Windows API 的转译层，跟 wine 比较像。但是 WSL1 自身也存在很多缺点，例如 IO 非常慢、一些 Linux 内核功能缺失等。

WSL2 是基于 Hyper-V 虚拟化的一个真正的 Linux 系统，拥有自己的 Linux 内核。因此 WSL2 对 Linux 程序的兼容性接近 100%，IO 性能也有一定提升（虽然比起 WSL1 是数量级的提升，但还是很慢。。）。微软已经放弃 WSL1（不再进行功能更新），全面转向 WSL2 了。

看网上经常有人吹 WSL2 有多完美，有了 WSL2 为啥还要安装 Linux 系统，等等。我想说 WSL2 并不是没有任何开销的完美方案，最大的问题就是虚拟化本身。

本质上，开启 Hyper-V 以后，系统会在底层插入一层 Hypervisor 代码，而 Windows 成为了运行在 Hypervisor 上的一个虚拟机。现在 CPU 会强制拦截某些指令，并把控制权交还给底层的 Hypervisor，这个切换过程就是 VM Exit。除了拦截指令，虚拟化还有各种缺陷，例如失去连续物理内存、调度导致的 vCPU 漂移和 L3 cache miss 等。

例如，在 Windows 上跑雷电等 Android 模拟器可以看到提示：_虚拟服务未关闭，会导致游戏异常或卡顿，建议立即修复！_。跑 Xmrig 等极致性能要求的程序，也容易被虚拟机的上述问题给坑到，导致长时间运行 Hashrate 减半。

### 端口随机占用

这也是虚拟化的锅。win11 下有时代理软件端口突然无法使用，有时测试网站 localhost 端口无法使用，随机性很强。于是去搜了下[解法](https://www.cnblogs.com/fanqisoft/p/17071121.html)。

```shell
netsh int ipv4 set dynamic tcp start=53530 num=12000
netsh int ipv6 set dynamic tcp start=53530 num=12000
net stop winnat
net start winnat
```

## 遇到的问题

### 初始化登录微软帐号酿成的悲剧

20241215，我重装 windows，使用 Windows11 专业版官方镜像。

安装完成后初始化阶段，我登录了我的微软帐号，并设置我的用户名，然而 `C:/Users/` 下的用户文件夹名字是我的邮箱前五位，而不是我设置的用户名。没有任何方法可以更改这个文件夹的名字，网上教程全部无效，包括改注册表（`Profilelist` 里面根本没东西）、`netplwiz` 修改用户名（不影响文件夹名）。

最终我尝试新建一个用户，然后把老的用户删掉，这样成功将用户文件夹名字改成我想要的。接下来一次重启，windows 要求我设置 PIN 码，否则我必须使用邮箱验证码登录，我设置了。

再次重启，登录界面的用户名是我已经删除的老用户的用户名；报错 Something happened and your PIN isn't available. Click to set up your PIN again. 只有一个按钮能够点击，点击后屏幕闪烁一次，仍然报错。按住 Shift 重启，进入启动选项，[清理 Ngc 文件夹](https://answers.microsoft.com/en-us/windows/forum/all/something-happened-and-your-pin-isnt-available/5365fc65-27a9-4ec6-b9c3-032b54da50f9)无效，安全模式启动无效。

于是只好重装，我刚装好的系统已经配了一个小时，全部变成一场空。还好我有双系统，重装前还能备份一点点配好的东西。

### 百度网盘图标

偶然我有一次需要使用百度网盘，我将其安装在 [RAMDisk](../ramdisk.md) 里。结果重启后百度网盘留下了一大堆垃圾都没有清除。其中最烦的就是在 _此电脑_ 里留下的百度网盘图标，windows 11 的这个图标也不能右键删除，非常鸡肋。

解法：注册表打开 `计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace` 删除全部文件夹。

顺带说一句，把软件安装在 RAMDisk 以后记得手动卸载。
