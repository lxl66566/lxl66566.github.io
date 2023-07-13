---
date: 2022-07-08
icon: timer
category:
    - 推荐
    - 评价
tag:
    - 移动端
---
# 记录软件使用时长
## Windows端记录软件使用时长
我从20220428开始使用[Tai](../farraginous/recommend_packages.md#tai)记录Windows下的应用时长。直到在20220729了解到[ActivityWatch](https://github.com/ActivityWatch/activitywatch)。在此将比较它俩的一些特性。

此处小小介绍一下`ActivityWatch`。相较于`Tai`，它拥有可视化程度 & 自由度更高的图表。~~（Tai 改版后也不差）~~ 但我最关心的还是我自己的使用体验。两者均为开源软件。

|软件名|运行时内存|查询区间长|
| :-: | :-: | :-: |
|Tai|41.0M|年|
|ActivityWatch|102.2M|月|

结果很明显。
1. 我追求简洁与直接性的数据，不需要优秀的界面。
2. `ActivityWatch`核心采用python编写，高内存占用。
3. 我对时长记录最大的要求，除了准确性外，就是**查询区间长**了。而`ActivityWatch`的表现（30days）无法达到预期。

我仍然选用`Tai`作为我的时长统计软件。*（顺带一提，这俩记录的时长有点区别，而我无法分辨哪个是正确的，因为windows没有官方的时长记录工具。Tai 目前改版至 1.4.0.0，可能具有偏差，但是不多）*
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
|<text style="color:blue;">Phone statistic</text>|3.07/14.61|100%|年|<text style="color:blue;">年</text>|-|-|

解释：
* `StayFree`仅有81%准确率：QQ、nekogramX、Via等多个软件的计时数据略小于系统计时数据。（最严重偏差值达到19%）（后来发现也有偏大数据）
* 准确率为0%的软件：在20220709我看了67min小说后，这些软件有的未记录阅读器时长；有的将时长错加到QQ上。它们的准确率由0.8%-10%不等，由于偏差过大，统一算作0%。
* 除`My Phone Time` `ActionDash`外其他软件均请求`使用情况访问权限`，此处视为默认放行。
* `Phone statistic`有一个最大优点，就是刚下载就能查询到本年的全部数据。其他软件最多只能查到下载日期9天前的。

总结：

推荐同时使用`Digitox`与`Phone statistic`。*（这俩加一起都没某些家伙大*

<span class="heimu" title="你知道的太多了">感觉还想自己写啊，但是我不会，这下有生之年了</span>
