# 设置电脑
好的设置能够在未来降低你的血压，并大幅提高你的工作效率。

关于软件推荐请前往[杂项-软件汇总](../farraginous/recommend_packages.md)页面。
## 对 win11 的设置
由于入手了 12500H，即使很不想使用 win11，也只能硬上了。以下是我对新电脑 win11 系统的设置。

1. 移动 *文档、图片、下载* 等文件夹到新分区的D盘。
2. 还原右键菜单并设置：右击 *开始键*，打开 *Windows终端（管理员）* ，执行`reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve` （或直接使用[Winaero Tweaker](../farraginous/recommend_packages.md#winaero-tweaker) 进行设置），再用 [ContextMenuManager](../farraginous/recommend_packages.md#ContextMenuManager) 调整。
3. 关闭所有系统提示音。
4. 关闭 Windows 安全中心，[参考文章](https://zhuanlan.zhihu.com/p/494923217)：
    * *Windows安全中心-病毒和威胁防护-管理设置* ，关闭所有开关
    * 使用组策略编辑器禁用 Windows Defender
        * `win + r`运行`gpedit.msc`，*计算机配置-管理模板-Windows 组件-关闭Microsoft Defender防病毒* ，选择已启用
        * 由于我的电脑是家庭版升专业版，没有 `gpedit.msc` 文件，因此需先添加组策略编辑器。
        * 在记事本输入以下代码并保存为 .bat 文件，管理员运行。
        ```batch
        pushd "%~dp0"
        dir /b %systemroot%\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >gp.txt
        dir /b %systemroot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>gp.txt
        for /f %%i in ('findstr /i . gp.txt 2^>nul') do dism /online /norestart /add-package:"%systemroot%\servicing\Packages\%%i"
        pause
        ```
    * 使用[Defender Control](https://www.sordum.org/9480/defender-control-v2-1/)彻底关闭安全中心。
5. 关闭搜索推荐&热门新闻：关闭 *设置-隐私和安全性-搜索权限-更多设置-显示搜索要点* 。（参考[来源](https://www.landiannews.com/archives/95045.html)
6. 升级专业版：使用[HEU_KMS_Activator](https://github.com/zbezj/HEU_KMS_Activator)升级win11专业版并激活。
7. 开启Hyper-V功能 <Badge type="tip" text="前置条件：6." />：由于在 *设置-应用-可选功能-更多Windows功能* 中找不到Hyper-V选项，因此采用网上教程：文本文档输入以下代码：
```batch
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```
保存为.bat文件并管理员运行即可。

8. 更改触摸板功能：三指左右划调节音量。我本人感觉挺方便。
9. 安装 Win11 Android 子系统（WSA） <Badge type="tip" text="前置条件：7." />：
    * *设置-时间和语言-国家和地区* ，选择美国
    * 打开 Microsoft Store（记得关代理），下载 Amazon Appstore。系统将自动下载安装 Windows Subsystem for Android™️。
    * 可选项：在*设置-应用和功能* 内找到Windows Subsystem for Android™️，移动到 D 盘以节省空间。
    * 别忘了把*国家和地区* 改回去。
    * 打开安装好的 Windows Subsystem for Android™️，点击左侧 Developer，打开 Developer mode.（意味着在 `127.0.0.1:58526` 默认端口开启调试）
    * 在这里你可以使用两种方式安装软件：
        1. [WSA PacMan](https://github.com/alesimula/wsa_pacman)提供了便捷的图形化界面。
        2. 使用[ADB](./adb.md)，输入 `adb connect 127.0.0.1:58526` 连接,`adb install ...`安装。
    * 关于网络受限问题：在虚拟机的*设置-Network&internet* 中看到网络连接受限。win11发出弹窗警告。
    解决方法（参考[来源](https://www.shenshanhongye.com/jc/2134.html)）：在adb成功连接后，输入：
    ```batch
    adb shell settings put global captive_portal_mode 0
    adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
    adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
    ```
    重启wifi即可。
10. 更改任务栏样式：下载[RoundedTB](https://apps.microsoft.com/store/detail/roundedtb/9MTFTXSJ9M7F?hl=en-us&gl=us)，根据提示更改。
11. 使用[O&O ShutUp10++: Free antispy tool for Windows 10 and 11](https://www.oo-software.com/en/shutup10)禁用一些非必须功能。
12. 启用睡眠。笔记本电脑有带着出门的需求，然而我的电脑无法进入睡眠（点击睡眠后，仅屏幕背光取消，一切元件照常运转）。估计是电脑品牌方的驱动阻止了系统睡眠。启用方法（[参考](https://zhuanlan.zhihu.com/p/336846460)）：在 regedit 中，将 `HKEY_LOCAL_MacHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power\AwayModeEnabled` 的值设为 0.
13. 卸载小组件：打开管理员终端，执行 `winget uninstall MicrosoftWindows.Client.WebExperience_cw5n1h2txyewy`。然后重启个资源管理器就行了。我是用了一段时间后才想到卸载小组件，鸡肋，不小心点到的话也烦。
14. 开 [ArchWSL](https://github.com/yuk7/ArchWSL)。

## 对 ArchWSL 的设置
* 我安装的包：cmake, yay, fishshell, neovim, neofetch, fd, 
* 我计划装的包：trash-cli
* ~/.bashrc（仅含手动编辑）:
```bash
alias ll='ls -alF'
export DWM=/home/lxl/myfile/dwm
if [[ $(ps --no-header --pid=$PPID --format=cmd) != "fish" ]]
then
    exec fish
fi
```
    
## 设置开机自启动
`win + r`打开运行面板，输入`shell:startup`打开启动文件夹，拖入需自启动的程序快捷方式即可。

但启动文件夹中没有其他软件的自启动控制。若需关闭某些程序的自启动，可以打开任务管理器，选择`启动`进行修改。
## BIOS密码重置
> *以 Predator G3-573 为例，不保证其他品牌电脑的重置方法相同*
1. 在BIOS界面中输错三次密码，出现输入恢复码的弹窗，并给出一个Key。（我的电脑Key为10位纯数字）
2. 进入[此网站](https://1024kb.co.nz/bios/)，输入Key，然后将计算结果输回电脑。
3. 进入BIOS后，设置supervisor password为空。
## edge 转 firefox
20230214，我从 edge 用户转为了 firefox 用户。edge 并不是不满足我的需求，甚至更加贴合我的个人需求（纵向标签栏，firefox 没有内置此功能），换浏览器大约只是我的心血来潮而已。为此我花了很多功夫设置 firefox。
> 于 20230304 换回 edge。

我最终使用 [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) 而不是 Firefox。

* 优点：
    * firefox 在 bilibili 等网站的表现较差，放开权限后子页面仍无法读取 cookies。Firefox Developer Edition 无此问题。
    * > 只有这个可以安装 ruffle —— Asuka Minato（虽然这不是我的刚需）

设置步骤如下：
1. 迁移书签与历史记录。此方面 firefox 有专门的接口，可以一键导入。
2. 设置中文：在 `about:config` 中，将 `intl.multilingual.enabled`、`intl.multilingual.downloadEnabled` 设为 true，然后就能在设置中选择中文。
3. 迁移扩展与扩展数据。具体地：
    * 由于 chrome 系扩展与 mozilla 系扩展不兼容，扩展需要手动迁移。
    * Tampermonkey 脚本迁移：*Dashboard - Utilities - File Export & Import from file*
4. 使用 [Sidebery](https://addons.mozilla.org/en-US/firefox/addon/sidebery/) 实现纵向标签栏。
5. 隐藏标题栏，书签栏，标签栏：
    * 在 `about:config` 中，将 `toolkit.legacyUserProfileCustomizations.stylesheets` 改为 true。（为了允许 firefox 加载自定义 css）
    * 在 `about:support` 中，点击 *配置文件夹 -> 打开文件夹*（*Profile Folder -> Open Folder*），在此目录下新建名为 `chrome` 的文件夹，在新文件夹下新建 `userChrome.css`，写入[此处代码](https://github.com/MrOtherGuy/firefox-csshacks/blob/master/chrome/autohide_toolbox.css)。
> 注：在地址栏输入上述 *about:\** 即可打开对应界面。
6. 解决跨源错误：在 `about:config` 中，将 security.fileuri.strict_origin_policy 设为 false。