# 我的文章
## [科学上网初级](../hide/vpn.md)
## 查看手机cpu指令集  

<!-- * 国内应用商店：一个木函（7M）

<img alt="一个木函_指令集" src="/images/gossip/instruction_1.jpg" width="40%" height="40%"/>

* 谷歌商店：CPU X（10M）

<img alt="CPU_X" src="/images/gossip/instruction_2.jpg" width="40%" height="40%"/>

* ADB
要求电脑上有adb工具，手机开启USB调试，连接后执行`adb shell getprop ro.product.cpu.abi`命令。

<img alt="CPU_X" src="/images/gossip/instruction_3.png" width="65%" height="65%"/> -->

|手段|大小|图片|使用方法|
| :-: | :-: | :-: | :-: |
|一个木函（国内应用商店）|7M|![一个木函](/images/my_articles/yigemuhan.jpg)|设备应用-查看设备详细信息|
|CPU X（谷歌商店）|10M|![CPU X](/images/my_articles/cpux.jpg)|中央处理器|
|[ADB](../farraginous/recommend_packages.md#adb)（需要电脑）|-|![ADB](/images/my_articles/adb.png)|执行`adb shell getprop ro.product.cpu.abi`|

## Android端记录软件使用时长
我有多喜欢统计时长，从[galgame页面](../games/galgame.md)和[读书页面](../farraginous/books.md)便可略知一二。但是——

由于安卓自带的屏幕使用时长最长只允许查看本周数据，而我需要的是类似windows端[Tai](../farraginous/recommend_packages.md#tai)的替代产品，可以记录与查看过去的一切数据。因此去谷歌商店下载了三款记录软件时长的app，在此做个横评。*（将`自己做个这种软件`写入日程！）*

|软件名|大小（使用前/使用后）|权限|可否查看非本周数据|准确率|
| :-: | :-: | :-: | :-: | :-: |
|StayFree|48.88/63.11MB|无障碍<br/>应用信息查询|Yes|81%|
|My Phone Time|15.23/27.86MB|-|-|-|
|ActionDash|17/43.26MB|-|No|100%|

由于`My Phone Time`数据记录从安装后开始，我需要使用一段时间才可给出具体评价。

剩下两款都达不到我的需求：
* `StayFree`记录的不准确，QQ、nekogramX、Via等多个软件的计时数据小于系统计时数据。从严谨性来看，这是极其严重的问题。
* `ActionDash`则无法查看本周之外的数据，完全违背了该问题的初衷。

~~说到底还得自己写啊，但是我不会~~

## Win10设置开机自启动
`win + r`打开运行面板，输入`shell:startup`打开启动文件夹，拖入需自启动的程序快捷方式即可。

但启动文件夹中没有其他软件的自启动控制。若需关闭某些程序的自启动，可以打开任务管理器，选择`启动`进行修改。
## BIOS密码重置
*（我的电脑型号：Predator G3-573，不保证其他品牌电脑的重置方法相同）*

1. 在BIOS界面中输错三次密码，出现输入恢复码的弹窗，并给出一个Key。（我的电脑Key为10位纯数字）

2. 进入[此网站](https://1024kb.co.nz/bios/)，输入Key，然后将计算结果输回电脑。

3. 进入BIOS后，设置supervisor password为空。