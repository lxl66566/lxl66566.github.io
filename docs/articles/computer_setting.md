# 设置电脑
好的设置能够在未来降低你的血压，并大幅提高你的工作效率。

关于软件推荐请前往[杂项-软件汇总](../farraginous/recommend_packages.md)页面。
## 对win11的设置
由于入手了12500H，即使很不想使用win11，也只能硬上了。以下是我对新电脑win11系统的设置。

1. 移动 *文档、图片、下载* 等文件夹到新分区的D盘。
2. 还原右键菜单并设置：右击win，打开 *Windows终端（管理员）* ，执行`reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve` （或直接使用[Winaero Tweaker](../farraginous/recommend_packages.md#winaero-tweaker)进行设置），再用[ContextMenuManager](../farraginous/recommend_packages.md#ContextMenuManager)调整。
3. 关闭所有系统提示音。
4. 关闭Windows安全中心，[参考文章](https://zhuanlan.zhihu.com/p/494923217)：
    * *Windows安全中心-病毒和威胁防护-管理设置* ，关闭所有开关
    * 使用组策略编辑器禁用 Windows Defender
        * `win + r`运行`gpedit.msc`，*计算机配置-管理模板-Windows 组件-关闭Microsoft Defender防病毒* ，选择已启用
        * 由于我的电脑是家庭版升专业版，没有`gpedit.msc`文件，因此需先添加组策略编辑器。
        * 在记事本输入以下代码并保存为.bat文件，管理员运行。
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
9. 安装Win11 Android子系统 <Badge type="tip" text="前置条件：7." />：
    * *设置-时间和语言-国家和地区* ，选择美国
    * 打开Microsoft Store （记得关代理），下载Amazon Appstore。系统将自动下载安装Windows Subsystem for Android™️。
    * 可选项：在*设置-应用和功能* 内找到Windows Subsystem for Android™️，移动到D盘以节省空间。
    * 别忘了把*国家和地区* 改回去。
    * 打开安装好的Windows Subsystem for Android™️，点击左侧Developer，打开Developer mode.（意味着在127.0.0.1:58526端口开启调试）
    * 在这里你可以使用两种方式安装软件：
        1. [WSA PacMan](https://github.com/alesimula/wsa_pacman)提供了便捷的图形化界面。
        2. 使用[ADB](../farraginous/recommend_packages.md#adb)，输入`adb connect 127.0.0.1:58526`连接,`adb install ...`安装。
    * 关于网络受限问题：在虚拟机的*设置-Network&internet* 中看到网络连接受限。win11发出弹窗警告。
    解决方法（参考[来源](https://www.shenshanhongye.com/jc/2134.html)）：在adb成功连接后，输入：
    ```batch
    adb shell settings put global captive_portal_mode 0
    adb shell settings put global captive_portal_https_url https://www.google.cn/generate_204
    adb shell settings put global captive_portal_http_url http://www.google.cn/generate_204
    ```
    重启wifi即可。
10. 更改任务栏样式：下载[RoundedTB](https://apps.microsoft.com/store/detail/roundedtb/9MTFTXSJ9M7F?hl=en-us&gl=us)，根据提示更改。
    
## 设置开机自启动
`win + r`打开运行面板，输入`shell:startup`打开启动文件夹，拖入需自启动的程序快捷方式即可。

但启动文件夹中没有其他软件的自启动控制。若需关闭某些程序的自启动，可以打开任务管理器，选择`启动`进行修改。
## BIOS密码重置
*（我的电脑型号：Predator G3-573，不保证其他品牌电脑的重置方法相同）*

1. 在BIOS界面中输错三次密码，出现输入恢复码的弹窗，并给出一个Key。（我的电脑Key为10位纯数字）

2. 进入[此网站](https://1024kb.co.nz/bios/)，输入Key，然后将计算结果输回电脑。

3. 进入BIOS后，设置supervisor password为空。