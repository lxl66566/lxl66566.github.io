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

# 设置电脑

好的设置能够在未来降低你的血压，并大幅提高你的工作效率。

关于软件推荐请前往[杂项-软件汇总](../farraginous/recommend_packages.md)页面。

本章目录：
[[toc]]

## 对 win11 的设置

由于入手了 12500H，即使很不想使用 win11，也只能硬上了。以下是我对新电脑 win11 系统的设置。

1. 移动 _文档、图片、下载_ 等文件夹到新分区的 D 盘。
2. 还原右键菜单并设置：右击 _开始键_，打开 _Windows 终端（管理员）_ ，执行`reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve` （或直接使用[Winaero Tweaker](../farraginous/recommend_packages.md#winaero-tweaker) 进行设置），再用 [ContextMenuManager](../farraginous/recommend_packages.md#ContextMenuManager) 调整。
3. 关闭所有系统提示音。
4. 关闭 Windows 安全中心。[为什么我们需要关闭它？](https://zhuanlan.zhihu.com/p/611313419)[^1]
   _ 法一（推荐）：[Defender Remover](https://github.com/jbara2002/windows-defender-remover)
   _ 法二（[source](https://zhuanlan.zhihu.com/p/494923217)，但实测并不能完全关闭）： \* _Windows 安全中心-病毒和威胁防护-管理设置_ ，关闭所有开关
   _ 使用组策略编辑器禁用 Windows Defender
   _ `win + r`运行`gpedit.msc`，_计算机配置-管理模板-Windows 组件-关闭 Microsoft Defender 防病毒_ ，选择已启用
   _ 由于我的电脑是家庭版升专业版，没有 `gpedit.msc` 文件，因此需先添加组策略编辑器。
   _ 在记事本输入以下代码并保存为 .bat 文件，管理员运行。
   ```batch
   pushd "%~dp0"
   dir /b %systemroot%\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >gp.txt
   dir /b %systemroot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>gp.txt
   for /f %%i in ('findstr /i . gp.txt 2^>nul') do dism /online /norestart /add-package:"%systemroot%\servicing\Packages\%%i"
   pause
   ```
   - 使用[Defender Control](https://www.sordum.org/9480/defender-control-v2-1/)彻底关闭安全中心。
     [^1]: 购入电脑 11 个月，固态盘写入量已达 10T。我平常一直很注意控制写入，大文件、下载缓存都存在移动硬盘上。
5. 关闭搜索推荐&热门新闻：关闭 _设置-隐私和安全性-搜索权限-更多设置-显示搜索要点_ 。（参考[来源](https://www.landiannews.com/archives/95045.html)
6. 升级专业版：使用[HEU_KMS_Activator](https://github.com/zbezj/HEU_KMS_Activator)升级 win11 专业版并激活。
7. 开启 Hyper-V 功能 <Badge type="tip" text="前置条件：6." />：由于在 _设置-应用-可选功能-更多 Windows 功能_ 中找不到 Hyper-V 选项，因此采用网上教程：文本文档输入以下代码：
   ```batch
   pushd "%~dp0"
   dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
   for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
   del hyper-v.txt
   Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
   ```
   保存为.bat 文件并管理员运行即可。
8. 更改触摸板功能：三指左右划调节音量。我本人感觉挺方便。
9. 安装 Win11 Android 子系统（WSA） <Badge type="tip" text="前置条件：7." />：
   - _设置-时间和语言-国家和地区_ ，选择美国
   - 打开 Microsoft Store（记得关代理），下载 Amazon Appstore。系统将自动下载安装 Windows Subsystem for Android™️。
   - 可选项：在*设置-应用和功能* 内找到 Windows Subsystem for Android™️，移动到 D 盘以节省空间。
   - 别忘了把*国家和地区* 改回去。
   - 打开安装好的 Windows Subsystem for Android™️，点击左侧 Developer，打开 Developer mode.（意味着在 `127.0.0.1:58526` 默认端口开启调试）
   - 在这里你可以使用两种方式安装软件：
     1. [WSA PacMan](https://github.com/alesimula/wsa_pacman)提供了便捷的图形化界面。
     2. 使用[ADB](./adb.md)，输入 `adb connect 127.0.0.1:58526` 连接,`adb install ...`安装。
   - 关于网络受限问题：在虚拟机的*设置-Network&internet* 中看到网络连接受限。win11 发出弹窗警告。
     解决方法（参考[来源](https://www.shenshanhongye.com/jc/2134.html)）：在 adb 成功连接后，输入：
   ```batch
   adb shell settings put global captive_portal_mode 0
   adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
   adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
   ```
   重启 wifi 即可。
10. 更改任务栏样式：下载[RoundedTB](https://apps.microsoft.com/store/detail/roundedtb/9MTFTXSJ9M7F?hl=en-us&gl=us)，根据提示更改。
11. 使用[O&O ShutUp10++: Free antispy tool for Windows 10 and 11](https://www.oo-software.com/en/shutup10)禁用一些非必须功能。
12. 启用睡眠。笔记本电脑有带着出门的需求，然而我的电脑无法进入睡眠（点击睡眠后，仅屏幕背光取消，一切元件照常运转）。估计是电脑品牌方的驱动阻止了系统睡眠。启用方法（[参考](https://zhuanlan.zhihu.com/p/336846460)）：在 regedit 中，将 `HKEY_LOCAL_MacHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power\AwayModeEnabled` 的值设为 0.
    > 是否为休眠？
13. 卸载小组件：打开管理员终端，执行 `winget uninstall MicrosoftWindows.Client.WebExperience_cw5n1h2txyewy`。然后重启个资源管理器就行了。我是用了一段时间后才想到卸载小组件，鸡肋，不小心点到的话也烦。
14. **关闭快速启动**。
    - 原因 1：避免关机时自动保存 [RAM Disk](./ramdisk.md) 文件到固态盘；
    - 原因 2: Windows 更新 "更新并关闭" 选项可能无法正常关闭电脑，变为 _更新并重启_。[ref](https://t.me/withabsolutex/1193)
15. 开 [ArchWSL](https://github.com/yuk7/ArchWSL)。
16. 解决[端口随机占用](#端口随机占用)
17. ~~开启全局 UTF-8：_设置 - 语言和区域 - 管理语言设置 - 更改系统区域设置 - beta:使用 UTF-8..._~~ 实测会导致一些 galgame 乱码。
18. 文件夹与文件改为单击。
19. 在 _Internet 选项 - 高级_ 中，打开 TLS 1.3
20. [组织管理滚](https://answers.microsoft.com/zh-hans/windows/forum/all/如何解决windows11/c8ca1777-f33a-487a-bb36-c8ac920fbd6c)
21. [关闭自动更新](https://answers.microsoft.com/zh-hans/windows/forum/all/要彻底关闭win11/3c448d50-2e7f-42df-9fdb-f7f9aa9820ec)，我只需手动更新。
    - 既然无需经常更新，那就[关闭传递优化](https://blog.51cto.com/u_13464709/2057007)，并且用磁盘清理清一下这位占用的空间。
22. [开启 bbr 拥塞算法](https://stackoverflow.com/questions/60159716/how-to-enable-tcp-bbr-on-windows)：bbr 在弱网环境下表现异常优异，是 linux 内核的一部分。不过可能有着强网络下流量消耗增大的缺陷。

## 我使用的软件们

我的 windows 11 开机自启动的托盘软件有：[XDM](../farraginous/recommend_packages.md#xdm), Ditto, [parsec](../farraginous/recommend_packages.md#parsec), V2rayN, [f.lux](../farraginous/recommend_packages.md#flux), [everything](../farraginous/recommend_packages.md#everything), 火绒, [Tai](../farraginous/recommend_packages.md#tai), [flameshot](../farraginous/recommend_packages.md#flameshot)，[Quiet on the Set?](https://github.com/troylar/quiet-on-the-set)，还有一个后台的[Imdisk](./ramdisk.md)

## 设置开机自启动

`win + r`打开运行面板，输入`shell:startup`打开启动文件夹，拖入需自启动的程序快捷方式即可。

但启动文件夹中没有其他软件的自启动控制。若需关闭某些程序的自启动，可以打开任务管理器，选择`启动`进行修改。

## BIOS 密码重置

> _以 Predator G3-573 为例，不保证其他品牌电脑的重置方法相同_

1. 在 BIOS 界面中输错三次密码，出现输入恢复码的弹窗，并给出一个 Key。（我的电脑 Key 为 10 位纯数字）
2. 进入[此网站](https://1024kb.co.nz/bios/)，输入 Key，然后将计算结果输回电脑。
3. 进入 BIOS 后，设置 supervisor password 为空。

## edge 转 firefox

20230214，我从 edge 用户转为了 firefox 用户。edge 并不是不满足我的需求，甚至更加贴合我的个人需求（纵向标签栏，firefox 没有内置此功能），换浏览器大约只是我的心血来潮而已。为此我花了很多功夫设置 firefox。

> 于 20230304 换回 edge。

我最终使用 [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) 而不是 Firefox。

- 优点：
  - firefox 在 bilibili 等网站的表现较差，放开权限后子页面仍无法读取 cookies。Firefox Developer Edition 无此问题。
  - > 只有这个可以安装 ruffle —— Asuka Minato（虽然这不是我的刚需）

设置步骤如下：

1. 迁移书签与历史记录。此方面 firefox 有专门的接口，可以一键导入。
2. 设置中文：在 `about:config` 中，将 `intl.multilingual.enabled`、`intl.multilingual.downloadEnabled` 设为 true，然后就能在设置中选择中文。
3. 迁移扩展与扩展数据。具体地：
   - 由于 chrome 系扩展与 mozilla 系扩展不兼容，扩展需要手动迁移。
   - Tampermonkey 脚本迁移：_Dashboard - Utilities - File Export & Import from file_
4. 使用 [Sidebery](https://addons.mozilla.org/en-US/firefox/addon/sidebery/) 实现纵向标签栏。
5. 隐藏标题栏，书签栏，标签栏：
   _ 在 `about:config` 中，将 `toolkit.legacyUserProfileCustomizations.stylesheets` 改为 true。（为了允许 firefox 加载自定义 css）
   _ 在 `about:support` 中，点击 _配置文件夹 -> 打开文件夹_（_Profile Folder -> Open Folder_），在此目录下新建名为 `chrome` 的文件夹，在新文件夹下新建 `userChrome.css`，写入[此处代码](https://github.com/MrOtherGuy/firefox-csshacks/blob/master/chrome/autohide_toolbox.css)。
   > 注：在地址栏输入上述 \*about:\*\* 即可打开对应界面。
6. 解决跨源错误：在 `about:config` 中，将 security.fileuri.strict_origin_policy 设为 false。
7. `adons.mozilla.org` 对中国用户屏蔽了广告拦截扩展，因此我使用一个第三方的[扩展商店](https://www.crxsoso.com/firefox/category/extensions) 进行安装。

## windows 下的权限控制

起因：MS-DOS 自带的 `tree` 命令太难用了（不包含文件）。我需要把它替换为 [tree for windows](https://gnuwin32.sourceforge.net/packages/tree.htm)。windows 的权限管理太“安全”了，很烦。

1. （本节无关）下载并将 `tree.exe` 单文件放入 `C:\WINDOWS\System32`
2. 修改 `tree.com` 的名字（或直接删除），需要获取权限。 1. _属性 - 安全 - 高级_，更改所有者为当前用户。 2. 然后在下面选择 _Users_ 那一栏，编辑，改为完全控制。 3. 一路确定即可。
   不过之后清理 WinSxS 的时候又没法用了。。

## 遇到的问题

### 端口随机占用

win11 下有时代理软件端口突然无法使用，有时测试网站 localhost 端口无法使用，随机性很强。于是去搜了下[解法](https://www.cnblogs.com/fanqisoft/p/17071121.html)。

```shell
netsh int ipv4 set dynamic tcp start=53536 num=12000
netsh int ipv6 set dynamic tcp start=53536 num=12000
net stop winnat
net start winnat
```
