---
date: 2022-05-21
icon: computer
category:
  - 教程
tag:
  - 桌面端
  - CLI
  - Windows
---

# 设置 Windows

好的设置能够在未来降低血压，并大幅提高工作效率。

## 对 win11 的设置

由于入手了 12500H，即使很不想使用 win11，也只能硬上了。以下是我对新电脑 win11 系统的设置。

1. 移动 _文档、图片、下载_ 等文件夹到新分区的 D 盘。
2. 还原右键菜单并设置：右击 _开始键_，打开 _Windows 终端（管理员）_ ，执行`reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve` （或直接使用[Winaero Tweaker](../farraginous/recommend_packages.md#winaero-tweaker) 进行设置），再用 [ContextMenuManager](../farraginous/recommend_packages.md#ContextMenuManager) 调整。
3. 关闭所有系统提示音。
4. 关闭 Windows 安全中心。[为什么我们需要关闭它？](https://zhuanlan.zhihu.com/p/611313419)
   1. 法一（推荐）：[Defender Remover](https://github.com/jbara2002/windows-defender-remover)
   2. 法二（[src](https://zhuanlan.zhihu.com/p/494923217)，但实测并不能完全关闭）：
      - _Windows 安全中心-病毒和威胁防护-管理设置_ ，关闭所有开关
      - 使用组策略编辑器禁用 Windows Defender
      - `win + r`运行`gpedit.msc`，_计算机配置 - 管理模板-Windows 组件 - 关闭 Microsoft Defender 防病毒_ ，选择已启用
      - 由于我的电脑是家庭版升专业版，没有 `gpedit.msc` 文件，因此需先添加组策略编辑器。在记事本输入以下代码并保存为 `.bat` 文件，管理员运行。
        ```batch
        pushd "%~dp0"
        dir /b %systemroot%\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >gp.txt
        dir /b %systemroot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>gp.txt
        for /f %%i in ('findstr /i . gp.txt 2^>nul') do dism /online /norestart /add-package:"%systemroot%\servicing\Packages\%%i"
        pause
        ```
      - 使用[Defender Control](https://www.sordum.org/9480/defender-control-v2-1/)彻底关闭安全中心。
   - 注意，关闭 Windows 安全中心不会关闭防火墙。之后若需要设置防火墙，不能再从安全中心进入，而需要从（尚存的 win10）控制面板进入。
5. 关闭搜索推荐&热门新闻：关闭 _设置 - 隐私和安全性 - 搜索权限 - 更多设置 - 显示搜索要点_ 。([src](https://www.landiannews.com/archives/95045.html))
6. 升级专业版：使用[HEU_KMS_Activator](https://github.com/zbezj/HEU_KMS_Activator)升级 win11 专业版并激活。
   - 若对开源有需求，也可使用 [Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts)激活。
7. ~~开启 Hyper-V 功能 <Badge type="tip" text="前置条件：6." />：_设置 - 应用 - 可选功能 - 更多 Windows 功能_ 打开 _Hyper-V_ 选项。~~ 但是 WSA 似了
   - 提示，开启 WSL 并不需要 Hyper-V ([ref](https://github.com/MicrosoftDocs/WSL/issues/899#issuecomment-690753034))，但是 WSA 需要。
   - 由于我找不到 Hyper-V 选项，因此采用网上教程：将以下代码保存为 `.bat` 并管理员运行即可。
     ```batch
     pushd "%~dp0"
     dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
     for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
     del hyper-v.txt
     Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
     ```
8. 更改触摸板功能：三指左右划调节音量。实际上并不是很好用：我音量常年 20%，触摸板调节的话很容易拉得太大。
9. ~~安装 Win11 Android 子系统（WSA） <Badge type="tip" text="前置条件：7." />~~ WSA 兼容性还有待进步；WSA 在开机时自启，会占用一定性能 / 内存；我是双系统用户，而 Android Emulator 在 linux 上的有更好的选择（[Waydroid](./linux/package.md#waydroid)）。
   ::: details 而且 WSA 已经似了，微软官宣停止支持了。
   - _设置 - 时间和语言 - 国家和地区_ ，选择美国
   - 打开 Microsoft Store（记得关代理），下载 Amazon Appstore。系统将自动下载安装 Windows Subsystem for Android™️。
   - 可选项：在 _设置 - 应用和功能_ 内找到 Windows Subsystem for Android™️，移动到 D 盘以节省空间。
   - 别忘了把 _国家和地区_ 改回去。
   - 打开安装好的 Windows Subsystem for Android™️，点击左侧 Developer，打开 Developer mode.（意味着在 `127.0.0.1:58526` 默认端口开启调试）
   - 在这里你可以使用两种方式安装软件：
     1. [WSA PacMan](https://github.com/alesimula/wsa_pacman)提供了便捷的图形化界面。
     2. 使用[ADB](./mobile/adb.md)，输入 `adb connect 127.0.0.1:58526` 连接,`adb install ...`安装。
   - 关于网络受限问题：在虚拟机的 _设置 - Network&internet_ 中看到网络连接受限。win11 发出弹窗警告。
     解决方法（参考[来源](https://www.shenshanhongye.com/jc/2134.html)）：在 adb 成功连接后，输入：
     ```batch
     adb shell settings put global captive_portal_mode 0
     adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
     adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
     ```
     重启 wifi 即可。
     :::
10. 更改任务栏样式：下载[RoundedTB](https://apps.microsoft.com/store/detail/roundedtb/9MTFTXSJ9M7F?hl=en-us&gl=us)，根据提示更改。
11. 使用[O&O ShutUp10++: Free antispy tool for Windows 10 and 11](https://www.oo-software.com/en/shutup10)禁用一些非必须功能。
12. ~~启用睡眠。笔记本电脑有带着出门的需求，然而我的电脑无法进入睡眠（点击睡眠后，仅屏幕背光取消，一切元件照常运转）。估计是电脑品牌方的驱动阻止了系统睡眠。启用方法（[参考](https://zhuanlan.zhihu.com/p/336846460)）：在 regedit 中，将 `HKEY_LOCAL_MacHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power\AwayModeEnabled` 的值设为 0.~~  
    应该是休眠。而且现在的我已经禁用了休眠。
    - 休眠 == hibernate，原理是将内存写入磁盘。其会在 C 盘创建一块用于休眠的大块文件，并且每次休眠都会向硬盘中写入大量数据。我显然无法接受这一点<Badge text="参考 14."/>。
13. 卸载各种傻逼预装玩意。
    1. 卸载小组件：打开管理员终端，执行 `winget uninstall MicrosoftWindows.Client.WebExperience_cw5n1h2txyewy`。然后重启个资源管理器就行了。我是用了一段时间后才想到卸载小组件，鸡肋，不小心点到的话也烦。
    2. [卸载 Minecraft Education Edition](https://aka.ms/meeremove) ([src](https://educommunity.minecraft.net/hc/en-us/community/posts/4410545727764))
    3. 卸载 Your Phone：powershell `Get-AppxPackage Microsoft.YourPhone -AllUsers | Remove-AppxPackage`，但是 `C:\Program Files\WindowsApps` 的 Your Phone 文件并不会删除。
14. **关闭快速启动**。
    1. 避免关机时自动保存 [RAM Disk](./ramdisk.md) 文件到固态盘；
    2. Windows 更新 "更新并关闭" 选项可能无法正常关闭电脑，变为 _更新并重启_。[ref](https://t.me/withabsolutex/1193)
    3. 事实上快速启动的关机[其实是 hibernate](https://learn.microsoft.com/en-us/troubleshoot/windows-client/deployment/fast-startup-causes-system-hibernation-shutdown-fail#more-information)，是固态写入量的**最大贡献者**[^1]。
    4. 热知识：为什么安装 linux 双系统时要关闭快速启动？因为挂载在 hibernate 状态的硬盘几乎必炸（double mount）。
15. 开 [ArchWSL](https://github.com/yuk7/ArchWSL)。
16. 解决[端口随机占用](#端口随机占用)
17. ~~开启全局 UTF-8：_设置 - 语言和区域 - 管理语言设置 - 更改系统区域设置 - beta:使用 UTF-8..._~~ 实测会导致一些 galgame 乱码。
18. 文件夹与文件改为单击。
    - windows 的单击逻辑做的还是比 linux kde 好的，_悬浮选中_ 是单击逻辑中的重要组成部分。
19. 在 _Internet 选项 - 高级_ 中，打开 TLS 1.3
20. [组织管理滚](https://answers.microsoft.com/zh-hans/windows/forum/all/如何解决windows11/c8ca1777-f33a-487a-bb36-c8ac920fbd6c)
21. 关闭自动更新。
    1. [组策略编辑器](https://answers.microsoft.com/zh-hans/windows/forum/all/要彻底关闭win11/3c448d50-2e7f-42df-9fdb-f7f9aa9820ec)内关闭
    2. 服务：`services.msc` 里禁用 `Windows Update` 服务
    3. 任务计划程序关闭：_Microsoft > Windows > WindowsUpdate > 禁用 Scheduled Start_
    - 既然无需经常更新，那就[关闭传递优化](https://blog.51cto.com/u_13464709/2057007)，并且用 _磁盘清理_ 清一下这位占用的空间。
22. [开启 bbr 拥塞算法](https://stackoverflow.com/questions/60159716/how-to-enable-tcp-bbr-on-windows)：bbr 在弱网环境下表现异常优异，是 linux 内核的一部分。不过可能有着强网络下流量消耗增大的缺陷。
23. 打开任务栏时间秒数显示：_任务栏设置 - 任务栏行为_
24. 开启透明压缩。LZW 算法，效果只能说聊胜于无，非系统盘 208G 压到 183G。
25. [设置 alias](https://stackoverflow.com/questions/20530996/aliases-in-windows-command-prompt)。被 linux 驯化了，再回到没有 alias 的 windows 是真不习惯。
    ```bat
    @echo off
    DOSKEY ls=dir $*
    DOSKEY alias=notepad %USERPROFILE%\alias.cmd
    DOSKEY gp=git pull
    ```
    如果有多行指令需求，那就是 `.cmd` 文件写进 `PATH` 里了。
    当然，也可以直接不用 cmd，换用 git bash 或者 msys2 等 shell 然后去写 `.bashrc`。我目前正在用 git-bash 作为默认 shell。
26. 禁用一些服务。
    - Windows Font Cache Service
27. 将 bash 设为默认 shell。由于需要从 _运行_ 和 cmd 中都能直接进 bash，所以一些步骤：
    - 安装 bash（scoop + git 装玩以后就自带了，位置在 `scoop/shims/bash.exe`）
    - 删掉 `C:\Windows\System32\bash.exe`。也是[改拥有者 + 改权限](#权限控制)那一套。
    - 创建一个 bash 快捷方式放到 `C:\Windows\System32`
    - 创建一个 cmd 放到 `C:\Windows\System32`，内容参考[我在 bpm 里的写法](https://github.com/lxl66566/bpm/blob/5b1f30d583ad4a71759b4ad97c204faf172492bf/bpm/install/__init__.py#L369)。
28. 设置 copilot：copilot 确实是个免费用的 gpt4，就是比较慢。
    - ms 在 2024.03-04 把 copilot 图标对中国用户禁了。可以重新启用：编辑 `C:\Windows\System32\IntegratedServicesRegionPolicySet.json`，在最下面将 _Show Copilot on taskbar..._ 项的 disabled 里把 `"CN", ` 删掉。需要[获取权限](#权限控制)。
    - 即使开着代理，用着用着也经常出现 _很抱歉，目前无法连接到服务。_。解法：在 edge 浏览器中改微软账户地区至其他地区。([src](https://www.bilibili.com/read/cv33602923/))
29. [安装 winget](https://github.com/microsoft/winget-cli)。虽然我一般不用 ms 家的东西包括安装器，但有时候有脚本会调用 winget，因此还是装一下。
    - 但是 winget 的文件夹内自带了两个 python3，我讨厌它的 python3，因此把它移出了 PATH。所以我在另外的 PATH 里写了个 cmd 脚本调用 winget。理论上也可以通过安排环境变量顺序达到屏蔽它的 python 的效果。
30. ~~使用 [Win11Debloat](https://github.com/Raphire/Win11Debloat) 移除一些自带软件与组件。~~
    - 这会有一些 sideeffects，例如使某些终端乱码，win + R 失去记忆，等等。必需谨慎使用。

[^1]: 购入电脑 11 个月，固态盘写入量已达 10T。我平常一直很注意控制写入，大文件、下载缓存都存在移动硬盘上。

## 软件

关于软件推荐请前往[杂项 - 软件汇总](../farraginous/recommend_packages.md)页面。

我的 windows 开机自启动的托盘软件有：

- [XDM](../farraginous/recommend_packages.md#xdm)
- [Ditto](../farraginous/recommend_packages.md#ditto)
- [parsec](../farraginous/recommend_packages.md#parsec)
- V2rayN
- [f.lux](../farraginous/recommend_packages.md#flux)
- [everything](../farraginous/recommend_packages.md#everything)
- [Tai](../farraginous/recommend_packages.md#tai)
- [截图软件](../farraginous/recommend_packages.md#截图软件)

后台：

- [Imdisk](./ramdisk.md)

因此耗电还是挺多的，因此我出门一般都用 linux。

## 自启动

打开任务管理器，选择到 `启动` 进行修改。如果你需要让自己的软件自启动：`win + r` 打开运行面板，输入 `shell:startup` 打开启动文件夹，拖入需自启动的程序快捷方式即可。

## BIOS 密码重置

> _以 Predator G3-573 为例，不保证其他品牌电脑的重置方法相同_

1. 在 BIOS 界面中输错三次密码，出现输入恢复码的弹窗，并给出一个 Key。（我的电脑 Key 为 10 位纯数字）
2. 进入[此网站](https://1024kb.co.nz/bios/)，输入 Key，然后将计算结果输回电脑。
3. 进入 BIOS 后，设置 supervisor password 为空。

## 权限控制

> 起因：MS-DOS 自带的 `tree` 命令太难用了。我想把它替换为 [tree for windows](https://gnuwin32.sourceforge.net/packages/tree.htm)。

windows 文件/文件夹除了对不同 User 的权限控制外，还有 _所有者_ 这一概念。_所有者_ 可以修改文件/文件夹权限。

一般来说，拥有管理员权限能干的事情已经比较多了，但是对于某些系统位置还是没辙。究其原因，有些文件的 _所有者_ 是 _TrustedInstaller_，并且权限设置成了 _所有者_ 拥有完全访问权限，管理员只读。因此我们在修改这些文件时需要：

1. 将所有者改为自己：_属性 - 安全 - 高级_，更改所有者，输入你的用户名然后右边点 _检查名称_，会帮你自动补全。然后一路确定。
2. 更改权限：一般这种文件/文件夹的父文件夹也是管理员控制的。因此给管理员 _完全控制_ 权限即可。在上一步的 _安全_ 内点 _编辑_，给管理员勾上 _完全控制_ 即可。

## 链接

windows 下也可以[像 linux 一样](../articles/linux/basic.md#链接)创建硬链接和软连接。由于盘符即分区，硬链接是无法跨盘符的，所以以后使用 windows 还是不要分多个盘符比较好。

软链接：

- 不能使用 _创建快捷方式_ 的方法。快捷方式本质上是一个 `.lnk` 文件，与真正的软链接不同。
- 不能在 wsl 内使用 `ln -s` 创建。这样创建的软链接不会被 windows 识别。

软链接的创建方式：打开管理员终端，`mklink /D <destination> <source>`。`mklink` 默认为软链接，`<destination>` 与 `<source>` 的位置跟 `ln` 是相反的，并且必需要指定名字[^2]。

[^2]: 例如，若有一个 `src` 目录，在 linux 下 `ln -s /mnt/d/src /mnt/d/tmp` 创建 `/mnt/d/tmp/src` 的软连接，则在 windows 上需要 `mklink /D D:\tmp\src D:\src` 指明 `src` 的名称。

## 遇到的问题

### 端口随机占用

win11 下有时代理软件端口突然无法使用，有时测试网站 localhost 端口无法使用，随机性很强。于是去搜了下[解法](https://www.cnblogs.com/fanqisoft/p/17071121.html)。

```shell
netsh int ipv4 set dynamic tcp start=53536 num=12000
netsh int ipv6 set dynamic tcp start=53536 num=12000
net stop winnat
net start winnat
```
