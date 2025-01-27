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

::: details 前言

我最初入坑 win11 是由于入手了 12500H，有大小核，即使很不想使用 win11，也只能硬上了。

后来用了两年，因为毛病越积越多，20241216 我又重装了一次 win11，也算是小有心得。

下面是我两次装 win11 的心得汇总。

:::

### 小工具

- 在 b 站看到一个 [Windows11 轻松设置工具](https://wwkh.lanzout.com/iMb0v2ladkhe) ([src](https://www.bilibili.com/video/av113807439503289/))，一部分内容和下面我的设置是重合的，用这个工具可以进行快速便捷的设置，非常好用。

### 安装时

- 如果你的 windows 是从 win11 官方 ISO 安装的，那么初始化时登录微软帐号的那一步，**千万不要登录微软帐号**。[理由](#初始化登录微软帐号酿成的悲剧)

### 安装后（关键步骤）

- 进行 windows 更新。
- 还原右键菜单并设置：右击 _开始键_，打开 _Windows 终端（管理员）_ ，执行 `reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve` （或直接使用[Winaero Tweaker](../farraginous/recommend_packages.md#winaero-tweaker) 进行设置），再用 [ContextMenuManager](../farraginous/recommend_packages.md#ContextMenuManager) 调整。
- 关闭 Windows 安全中心([为什么我们需要关闭它？](https://zhuanlan.zhihu.com/p/611313419))。下面给出了几种方法，可以任选其一。
  1. （推荐）使用 [Windows11 轻松设置工具](#小工具)。
  2. [Defender Remover](https://github.com/ionuttbara/windows-defender-remover)，但是不好用，移除后还有设置项残留，并且无法再次进入安全中心调整选项。所以需要移除前去手动关闭安全中心里看得见的所有设置项。
  3. 手动([src](https://zhuanlan.zhihu.com/p/494923217))，但实测并不能完全关闭
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
- 关闭安全检查与防火墙：_控制面板 > 系统和安全 > 安全和维护_
- 关闭 Windows Defender SmartScreen：Windows Defender SmartScreen 是 edge 下载 exe 提示有风险的元凶。
  - 组策略编辑器（`gpedit.msc`）中，_管理模板 > Windows 组件 > Windows Defender SmartScreen > Microsoft Edge > 配置 Windows Defender SmartScreen_ 里禁用两个选项。
- 升级专业版：使用[HEU_KMS_Activator](https://github.com/zbezj/HEU_KMS_Activator)升级 win11 专业版并激活。
  - 若对开源有需求，也可使用 [Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts)激活。
- [安装 Imdisk](./ramdisk.md#imdisk-toolkit) 并[配置](./ramdisk.md#使用指南)。
- **关闭快速启动**。运行 `control`，在 _系统和安全 - 电源选项 - 选择电源按钮的功能_ 里设置。
  1. 避免关机时自动保存 [RAM Disk](./ramdisk.md) 文件到固态盘；
  2. Windows 更新 "更新并关闭" 选项可能无法正常关闭电脑，变为 _更新并重启_。[ref](https://t.me/withabsolutex/1193)
  3. 事实上快速启动的关机[其实是 hibernate](https://learn.microsoft.com/en-us/troubleshoot/windows-client/deployment/fast-startup-causes-system-hibernation-shutdown-fail#more-information)，是固态写入量的**最大贡献者**[^1]。
  4. 热知识：为什么安装 linux 双系统时要关闭快速启动？因为挂载在 hibernate 状态的硬盘几乎必炸（double mount）。
- 开启透明压缩。LZW 算法，效果只能说聊胜于无，非系统盘 208G 压到 183G。
- 安装 scoop 与 winget，并通过其安装一些常用软件。
  ```sh
  # scoop
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
  # winget
  Add-AppxPackage -RegisterByFamilyName -MainPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe
  ```
  - winget 会自带一个 python，记得用 everything 找出来，从 PATH 里把那个 path 删掉。
- 还需要下载其他的关键软件。这里没有链接，如果有可信来源、容易下载的链接可以联系我，贴在这里。
  - 在 extras bucket 里安装 `scoop search vcredist` 搜到的所有 C++ 运行库。
  - [DirectX 修复工具](https://www.puresys.net/5055.html)
- [安装 ArchWSL](./linux/install_and_config.md#安装)
- 解决[端口随机占用](#端口随机占用)
- [组织管理滚](https://answers.microsoft.com/zh-hans/windows/forum/all/如何解决windows11/c8ca1777-f33a-487a-bb36-c8ac920fbd6c)。
- 关闭自动更新。
  1. [组策略编辑器](https://answers.microsoft.com/zh-hans/windows/forum/all/要彻底关闭win11/3c448d50-2e7f-42df-9fdb-f7f9aa9820ec)内关闭
  2. 服务：`services.msc` 里禁用 `Windows Update` 服务
  3. 任务计划程序关闭：_Microsoft > Windows > WindowsUpdate > 禁用 Scheduled Start_
  - 既然无需经常更新，那就[关闭传递优化](https://blog.51cto.com/u_13464709/2057007)，并且用 _磁盘清理_ 清一下这位占用的空间。
- 开启长路径：组策略编辑器（运行 `gpedit.msc`），_计算机配置 > 管理模板 > 系统 > 文件系统 > 启用 Win32 长路径_ 选择已启用

### 安装后（推荐步骤）

- 分区设置：
  - 如果硬盘有分区，移动 _文档、图片、下载_ 等文件夹到 D 盘（新分区），以避免过多占用 C 盘空间。
  - 如果有移动硬盘，请在 _磁盘管理_ 中右键分区，手动指定驱动器号。固定驱动器号可以保证各个脚本运行正常。
- 禁用休眠。休眠 == hibernate，原理是将内存写入磁盘。其会在 C 盘创建一块用于休眠的大块文件，并且每次休眠都会向硬盘中写入大量数据。我不喜欢这样，为什么不选择关机呢？
- 网络设置：
  - 在 _高级网络设置 - Internet 选项 - 高级_ 中，打开 TLS 1.3
  - [开启 bbr 拥塞算法](https://stackoverflow.com/questions/60159716/how-to-enable-tcp-bbr-on-windows)：bbr 在弱网环境下表现异常优异，是 linux 内核的一部分。不过可能有着强网络下流量消耗增大的缺陷。
- 外观设置：
  - 打开任务栏时间秒数显示：_任务栏设置 - 任务栏行为_
- 习惯设置：
  - 关闭所有系统提示音。
  - 文件夹与文件改为单击。我个人不喜欢双击。
    - windows 的单击逻辑做的还是比 linux kde 好的，_悬浮选中_ 是单击逻辑中的重要组成部分。
  - 更改触摸板功能：三指左右划调节音量。实际上并不是很好用：我音量常年 20%，触摸板调节的话很容易拉得太大。
  - [shell alias](#shell-alias)
  - 关闭鼠标的 “提高指针精确度”，这个实际上是根据加速度修正移动距离，对于 FPS 极为不友好。
- 做减法：
  - 使用[O&O ShutUp10++: Free antispy tool for Windows 10 and 11](https://www.oo-software.com/en/shutup10)禁用一些非必须功能。
  - 关闭搜索推荐&热门新闻：关闭 _设置 - 隐私和安全性 - 搜索权限 - 更多设置 - 显示搜索要点_ 。([ref](https://www.landiannews.com/archives/95045.html)，最新版 win11 可能没有此条设置)
  - 卸载各种傻逼预装玩意。
    1. 卸载小组件：打开管理员终端，执行 `winget uninstall MicrosoftWindows.Client.WebExperience_cw5n1h2txyewy`。然后重启个资源管理器就行了。我是用了一段时间后才想到卸载小组件，鸡肋，不小心点到的话也烦。
    2. [卸载 Minecraft Education Edition](https://aka.ms/meeremove) ([src](https://educommunity.minecraft.net/hc/en-us/community/posts/4410545727764))
    3. 卸载 Your Phone：powershell `Get-AppxPackage Microsoft.YourPhone -AllUsers | Remove-AppxPackage`，但是 `C:\Program Files\WindowsApps` 的 Your Phone 文件并不会删除。
    4. 卸载 PC Manager（微软电脑管家）、Microsoft Power BI，在设置 - 应用里可以直接卸载
  - 禁用一些服务。
    - Windows Font Cache Service
  - 禁用搜索框联网搜索功能 ([src](https://www.landiannews.com/archives/107320.html))
- 开启 _运行_ 历史记录：_设置 - 隐私和安全性 - 常规 - 允许 Windows 跟踪应用启动以改进“开始"和搜索结果_。此设置项默认开启的，之前不小心被某个脚本关了。
- 设置 copilot：copilot 确实是个免费用的 gpt4，就是比较慢。
  - ms 在 2024.03-04 把 copilot 图标对中国用户禁了。可以重新启用：编辑 `C:\Windows\System32\IntegratedServicesRegionPolicySet.json`，在最下面将 _Show Copilot on taskbar..._ 项的 disabled 里把 `"CN", ` 删掉。需要[获取权限](#权限控制)。
  - 即使开着代理，用着用着也经常出现 _很抱歉，目前无法连接到服务。_。解法：在 edge 浏览器中改微软账户地区至其他地区。([src](https://www.bilibili.com/read/cv33602923/))
- 设置 Explorer：使用 [WinSetView](https://github.com/lesferch/WinSetView/) 将 _音乐_ 文件夹 view 设为小图标。否则当你打开一个装满音乐的文件夹时，Explorer 将会去读取所有文件的元数据，会导致卡顿。([src](https://answers.microsoft.com/en-us/windows/forum/windows_11-files/how-to-prevent-windows-explorer-from-reading/c123eab1-e5a5-4124-bf20-68f67a08e47b?messageId=b010aeba-a852-40e7-8732-8f67cb4fd1ed))

### 旧设置项

:::: details 已失效设置项

- ~~开启 Hyper-V 功能 ：_设置 - 应用 - 可选功能 - 更多 Windows 功能_ 打开 _Hyper-V_ 选项。~~ 开启 Hyper-V 原本是启用 WSA 的前置条件，但是 WSA 似了
  - 由于我找不到 Hyper-V 选项，因此采用网上教程：将以下代码保存为 `.bat` 并管理员运行即可。
    ```batch
    pushd "%~dp0"
    dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
    for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
    del hyper-v.txt
    Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
    ```
- WSA 已经似了，微软官宣停止支持了。
  - 即使是之前我也不喜欢 WSA：WSA 兼容性还有待进步；WSA 在开机时自启，会占用一定性能 / 内存；我是双系统用户，而 Android Emulator 在 linux 上的有更好的选择（[Waydroid](./linux/package.md#waydroid)）。
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
    ```sh
    adb shell settings put global captive_portal_mode 0
    adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
    adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
    ```
    重启 wifi 即可。
- 更改任务栏样式：下载[RoundedTB](https://apps.microsoft.com/store/detail/roundedtb/9MTFTXSJ9M7F?hl=en-us&gl=us)，根据提示更改。
  - 默认情况美观度还不错，但是在全屏窗口下反而很丑。
- ~~开启全局 UTF-8：_设置 - 语言和区域 - 管理语言设置 - 更改系统区域设置 - beta:使用 UTF-8..._~~ 实测会导致一些 galgame 乱码。
- ~~使用 [Win11Debloat](https://github.com/Raphire/Win11Debloat) 移除一些自带软件与组件。~~
  - 这会有一些 sideeffects，例如使某些终端乱码，win + R 失去记忆，等等。必需谨慎使用。

::::

[^1]: 购入电脑 11 个月，固态盘写入量已达 10T。我平常一直很注意控制写入，大文件、下载缓存都存在移动硬盘上。

## 软件

关于软件推荐请前往[杂项 - 软件汇总](../farraginous/recommend_packages.md)页面。

我的 windows 开机自启动的托盘软件有：

- [Ditto](../farraginous/recommend_packages.md#ditto)
- V2rayN
- [everything](../farraginous/recommend_packages.md#everything)
- [Tai](../farraginous/recommend_packages.md#tai)
- [截图软件](../farraginous/recommend_packages.md#截图软件)

后台：

- [Imdisk](./ramdisk.md)

因此耗电还是挺多的，因此我出门一般都用 linux。

## 自启动

有几种方法可以在 windows 上进行自启动：

1. 打开任务管理器，选择到 `启动` 进行修改。
2. 在 _运行_ 中输入 `shell:startup` 打开启动文件夹，拖入需自启动的程序快捷方式。
3. `services.msc` 中的服务可以设为自启动。

如果你习惯命令行操作，也可以使用我写的 [user-startup-rs](https://github.com/lxl66566/user-startup-rs) 添加自启动命令。

## shell alias

[ref](https://stackoverflow.com/questions/20530996/aliases-in-windows-command-prompt)。被 linux 驯化了，再回到没有 alias 的 windows 是真不习惯。

::: tabs

@tab 更换其他 shell

最简单也是更好的方法是换 shell，我用 bash 和 nushell 都挺顺手的。

```sh
scoop install git
winget install nushell
```

@tab cmd

把这个脚本放在某个地方，然后设成打开 shell 自动执行，对 cmd 来说相当于 `.bashrc`。

```bat
@echo off
DOSKEY ls=dir $*
DOSKEY alias=notepad %USERPROFILE%\alias.cmd
```

如果有 alias 多行指令需求，那就得写 `.cmd` 文件并写进 `PATH` 里了。

:::

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

### 初始化登录微软帐号酿成的悲剧

20241215，我重装 windows，使用 Windows11 专业版官方镜像。

安装完成后初始化阶段，我登录了我的微软帐号，并设置我的用户名，然而 `C:/Users/` 下的用户文件夹名字是我的邮箱前五位，而不是我设置的用户名。没有任何方法可以更改这个文件夹的名字，网上教程全部无效，包括改注册表（`Profilelist` 里面根本没东西）、`netplwiz` 修改用户名（不影响文件夹名）。

最终我尝试新建一个用户，然后把老的用户删掉，这样成功将用户文件夹名字改成我想要的。接下来一次重启，windows 要求我设置 PIN 码，否则我必须使用邮箱验证码登录，我设置了。

再次重启，登录界面的用户名是我已经删除的老用户的用户名；报错 Something happened and your PIN isn't available. Click to set up your PIN again. 只有一个按钮能够点击，点击后屏幕闪烁一次，仍然报错。按住 Shift 重启，进入启动选项，[清理 Ngc 文件夹](https://answers.microsoft.com/en-us/windows/forum/all/something-happened-and-your-pin-isnt-available/5365fc65-27a9-4ec6-b9c3-032b54da50f9)无效，安全模式启动无效。

于是只好重装，我刚装好的系统已经配了一个小时，全部变成一场空。还好我有双系统，重装前还能备份一点点配好的东西。

### 百度网盘图标

偶然我有一次需要使用百度网盘，我将其安装在 [RAMDisk](./ramdisk.md) 里。结果重启后百度网盘留下了一大堆垃圾都没有清除。其中最烦的就是在 _此电脑_ 里留下的百度网盘图标，windows 11 的这个图标也不能右键删除，非常鸡肋。

解法：注册表打开 `计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace` 删除全部文件夹。

顺带说一句，把软件安装在 RAMDisk 以后记得手动卸载。

### 端口随机占用

win11 下有时代理软件端口突然无法使用，有时测试网站 localhost 端口无法使用，随机性很强。于是去搜了下[解法](https://www.cnblogs.com/fanqisoft/p/17071121.html)。

```shell
netsh int ipv4 set dynamic tcp start=53536 num=12000
netsh int ipv6 set dynamic tcp start=53536 num=12000
net stop winnat
net start winnat
```
