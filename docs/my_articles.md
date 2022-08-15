# 我的文章
此处仅包含杂项文章。若需要阅读编程、游戏文章请前往对应版块。若需要阅读隐藏文章请自行探索博客。
## <span class="heimu" title="你知道的太多了">[科学上网初级](../hide/vpn.md)</span>
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
|一个木函（国内应用商店）|7M|![一个木函](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/my_articles/yigemuhan.jpg)|设备应用-查看设备详细信息|
|CPU X（谷歌商店）|10M|![CPU X](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/my_articles/cpux.jpg)|中央处理器|
|[ADB](../farraginous/recommend_packages.md#adb)（需要电脑）|-|![ADB](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/my_articles/adb.png)|执行`adb shell getprop ro.product.cpu.abi`|

## Windows端记录软件使用时长
我从20220428开始使用[Tai](./farraginous/recommend_packages.md#tai)记录Windows下的应用时长。直到在20220729了解到[ActivityWatch](https://github.com/ActivityWatch/activitywatch)。在此将比较它俩的一些特性。

此处小小介绍一下`ActivityWatch`。相较于`Tai`，它拥有可视化程度&自由度更高的图表。但我最关心的还是我自己的使用体验。

|软件名|运行时内存|查询区间长|
| :-: | :-: | :-: |
|Tai|41.0M|年|
|ActivityWatch|102.2M|月|

结果很明显。
1. 我追求简洁与直接性的数据，不需要优秀的界面。
2. `ActivityWatch`核心采用python编写，高内存占用使我无法很好地接受。
3. 我对时长记录最大的要求，除了准确性外，就是**查询区间长**了。而`ActivityWatch`的表现无法达到预期。

我仍然选用`Tai`作为我的时长统计软件。*（顺带一提，这俩记录的时长有点区别，而我无法分辨哪个是正确的，因为windows没有官方的时长记录工具。）*
## Android端记录软件使用时长
我有多喜欢统计时长，从[galgame页面](../hobbies/galgame.md)和[读书页面](../hobbies/books.md)便可略知一二。但是——

由于安卓自带的屏幕使用时长最长只允许查看本周数据，而我需要的是类似windows端[Tai](../farraginous/recommend_packages.md#tai)的替代产品，可以记录与查看过去的一切数据。因此去谷歌商店下载了三款（后追加为好几款）记录软件时长的app，在此做个横评。~~*（将`自己做个这种软件`写入日程！）*~~ <span class="heimu" title="你知道的太多了">*笑死，开摆* </span>

<text style="color:red;">红色字体：此处为较大劣势；</text><text style="color:blue;">蓝色字体：此处有较大优势，推荐；</text>以下功能默认为免费版。

|软件名|大小（使用前/后,MB）|准确率|数据可查询|查询区间长|<text style="color:red;">其他缺陷</text>|其他权限|
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|StayFree|48.88/63.11|<text style="color:red;">81%</text>|ALL|<text style="color:blue;">无限</text>|-|<text style="color:red;">无障碍</text>|
|My Phone Time|15.23/20.65|<text style="color:red;">0%</text>|ALL|<text style="color:blue;">无限</text>|-|-|
|ActionDash|17/43.26|100%|ALL|<text style="color:red;">周</text>|-|-|
|YourHour|25.74/70.52|100%|ALL|<text style="color:red;">天</text>|<text style="color:red;">查看具体应用数据需付费</text>|上层显示|
|App Usage|4.69/28.54|<text style="color:red;">0%</text>|ALL|月|-|-|
|手机使用时间|?/11.73|100%?|<text style="color:red;">上个月</text>|月|<text style="color:red;">必需挂着后台才可计时；广告</text>|后台免杀|
|<text style="color:blue;">Digitox</text>|3.89/20.67|100%|ALL|月|-|-|
|AppBlock|10.87/44.05|<text style="color:red;">0%</text>|ALL|<text style="color:red;">周</text>|<text style="color:red;">不氪金仅能查看前3个程序数据</text>|<text style="color:red;">无障碍</text>|
|<text style="color:blue;">Phone statistic</text>|3.07/14.61|100%|当年|<text style="color:blue;">年</text>|-|-|

解释：
* `StayFree`仅有81%准确率：QQ、nekogramX、Via等多个软件的计时数据略小于系统计时数据。（最严重偏差值达到19%）（后来发现也有偏大数据）
* 准确率为0%的软件：在20220709我看了67min小说后，这些软件有的未记录阅读器时长；有的将时长错加到QQ上。它们的准确率由0.8%-10%不等，由于偏差过大，统一算作0%。
* 除`My Phone Time` `ActionDash`外其他软件均请求`使用情况访问权限`，此处视为默认放行。
* `Phone statistic`有一个最大优点，就是刚下载就能查询到本年的全部数据。其他软件最多只能查到下载日期9天前的。

总结：

推荐同时使用`Digitox`与`Phone statistic`。*（这俩加一起都没某些家伙大*

<span class="heimu" title="你知道的太多了">感觉还想自己写啊，但是我不会，这下有生之年了</span>
## 运动轨迹记录软件横评
我希望找到一款能够记录运动轨迹的软件，在满足需求前提下越小越好。需求：在地图上绘制运动轨迹，定位精确，最好显示方向（由指南针得到）。

评测结果挺让我失望的，有一大批软件连定位精确都无法做到，而且都不约而同地定位到我西北方向数百米。我只能猜想这些软件用了错误的地图，或者久远以前的地图。<span class="heimu" title="你知道的太多了">（我甚至考虑了大陆漂移）</span>因此以下将分为两部分横评。

（后来的测试印证了我的观点：同一软件中使用`Google->标准，地形和卫星地图`出现定位偏移，使用`OpenStreetMap->标准地图`则未出现偏移。）

老规矩，<text style="color:red;">红色劣势</text>，<text style="color:blue;">蓝色优势</text>。

### 定位精确的软件

|软件名|大小（安装后,MB）|显示方向?|无需翻墙?|其他缺陷|
| :-: | :-: | :-: | :-: | :-: |
|GPX Viewer|53.43|✔|✖|
|Gaia GPS|205|✔|✔|卫星地图&OpenStreetMap需付费|
|小步点|211|✔|✔|
|Keep|<text style="color:red;">895</text>|✖|✔|GPS信号弱|
|Wikiloc|55.34|✔|✖|
|Guru Maps|119|✔|✔|部分地名&街道名为英文|

解释：
* `无需翻墙`一般代表该软件的地图非谷歌地图组件，可直连加载。
### 定位偏移的软件
此栏为**避雷**而设置。毕竟做不到精确的话，自然就没有了使用的必要。

由于定位偏移是地图问题，此处将列出**所有地图均存在偏移现象**的软件。

|软件名|大小（安装后,MB）|显示方向?|无需翻墙?|其他缺陷|
| :-: | :-: | :-: | :-: | :-: |
|Yudo|71.90|✖|✖|
|RouteHistory|53.80|✖|✖|
|越野路线|22.31|✔|✖|指南针延迟高|
|跑步记录|42.06|✔|✖|指南针延迟高|
|我的路线|26.54|✔|✖|指南针延迟高|
|Geo Tracker|56.74|✔|✖|

总结：没有特别满意的。
## 对win11的设置
由于入手了12500H，即使很不想使用win11，也只能硬上了。以下是我对新电脑win11系统的设置。

1. 移动 *文档、图片、下载* 等文件夹到新分区的D盘。
2. 还原右键菜单并设置：右击win，打开 *Windows终端（管理员）* ，执行`reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve`，再用[ContextMenuManager](./farraginous/recommend_packages.md#ContextMenuManager)设置。
3. 关闭系统提示音。
4. 关闭Windows安全中心。

## 设置开机自启动
`win + r`打开运行面板，输入`shell:startup`打开启动文件夹，拖入需自启动的程序快捷方式即可。

但启动文件夹中没有其他软件的自启动控制。若需关闭某些程序的自启动，可以打开任务管理器，选择`启动`进行修改。
## BIOS密码重置
*（我的电脑型号：Predator G3-573，不保证其他品牌电脑的重置方法相同）*

1. 在BIOS界面中输错三次密码，出现输入恢复码的弹窗，并给出一个Key。（我的电脑Key为10位纯数字）

2. 进入[此网站](https://1024kb.co.nz/bios/)，输入Key，然后将计算结果输回电脑。

3. 进入BIOS后，设置supervisor password为空。