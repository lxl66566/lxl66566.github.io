---
date: 2022-07-08
icon: timer
category:
  - 推荐
  - 评价
tag:
  - 移动端
  - 横评
---

# 记录软件使用时长

## Windows 端记录软件使用时长

- 从 20220428 开始使用 [Tai](https://github.com/Planshit/Tai) 记录 Windows 下的应用时长。
  - C# 写的，windows 下专用的软件。
- 在 20220729 了解到[ActivityWatch](https://github.com/ActivityWatch/activitywatch)。
  - 跨平台的时长记录软件，python 写的，基于浏览器 UI。
  - 在 linux wayland 下表现差。~~我为了计时长特意换到 X11~~

两者均为开源软件。

<!-- prettier-ignore -->
|    软件名     | 运行时内存 (windows) | 查询区间长 |
| :-----------: | :------------------: | :--------: |
|      Tai      |        41.0M         |     年     |
| ActivityWatch |        102.2M        | ~~月~~ 任意  |

结果很明显。

1. 我对时长记录最大的要求，除了准确性外，就是**查询区间长**了。~~而 `ActivityWatch` 的表现（30days）无法达到我的预期。~~
   - 实际上 `ActivityWatch` 能够查任意区间。
2. `ActivityWatch` 的数据不方便备份。而 Tai 就只有图标和 sqlite 数据库，非常方便。

我仍然选用 `Tai` 作为我的时长统计软件。而在 Linux 上使用 `ActivityWatch` 是无奈之举。

### ActivityWatch

ActivityWatch 的 Activity, Timeline 界面只能查询最长区间为月的数据。而在 Query 界面则可以查询任意时间长的数据。

但是，ActivityWatch 的 query 就是一坨屎：

1. 说了好多遍了，不要 DSL，连个注释符号都没有。。。
   - ([from](https://github.com/ActivityWatch/aw-research/blob/master/queries/aw-development.awq): _We should really add support for comments_ lmao)
2. 查询很慢，python debuff。
   - Tai 查询速度快的原因是额外维护了年月日的时长记录表。
3. 文档垃圾。[这里](https://docs.activitywatch.net/en/latest/examples/querying-data.html)是 query 的文档，示例没有解释，没有 `flood` 的说明，挂着 TODO，API 页面 404。。

## Android 端记录软件使用时长

我有多喜欢统计时长，从[galgame 页面](../hobbies/galgame.md)和[读书页面](../hobbies/books.md)便可略知一二。但是——

由于安卓自带的屏幕使用时长最长只允许查看本周数据，而我需要的是类似 windows 端[Tai](../farraginous/recommend_packages.md#tai)的替代产品，可以记录与查看过去的一切数据。因此去谷歌商店下载了三款（后追加为好几款）记录软件时长的 app，在此做个横评。~~_（将`自己做个这种软件`写入日程！）_~~ <span class="heimu" title="你知道的太多了">_笑死，开摆_ </span>

<text style="color:red;">红色字体：此处为较大劣势；</text><text style="color:blue;">蓝色字体：此处有较大优势，推荐；</text>以下功能默认为免费版。

<!-- prettier-ignore -->
|软件名|大小（使用前/后,MB）|准确率|数据可查询|查询区间长|<text style="color:red;">其他缺陷</text>|其他权限|
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|StayFree|48.88/63.11|<text style="color:red;">81%</text>|ALL|<text style="color:blue;">无限</text>|-|<text style="color:red;">无障碍</text>|
|MyPhoneTime|15.23/20.65|<text style="color:red;">0%</text>|ALL|<text style="color:blue;">无限</text>|-|-|
|ActionDash|17/43.26|100%|ALL|<text style="color:red;">周</text>|-|-|
|YourHour|25.74/70.52|100%|ALL|<text style="color:red;">天</text>|<text style="color:red;">查看具体应用数据需付费</text>|上层显示|
|AppUsage|4.69/28.54|<text style="color:red;">0%</text>|ALL|月|-|-|
|手机使用时间|?/11.73|100%?|<text style="color:red;">上个月</text>|月|<text style="color:red;">必需挂着后台才可计时；广告</text>|后台免杀|
|<text style="color:blue;">Digitox</text>|3.89/20.67|100%|ALL|月|-|-|
|AppBlock|10.87/44.05|<text style="color:red;">0%</text>|ALL|<text style="color:red;">周</text>|<text style="color:red;">不氪金仅能查看前3个程序数据</text>|<text style="color:red;">无障碍</text>|
|<text style="color:blue;">Phonestatistic</text>|3.07/14.61|100%|年|<text style="color:blue;">年</text>|-|-|

解释：

- `StayFree`仅有 81%准确率：QQ、nekogramX、Via 等多个软件的计时数据略小于系统计时数据。（最严重偏差值达到 19%）（后来发现也有偏大数据）
- 准确率为 0%的软件：在 20220709 我看了 67min 小说后，这些软件有的未记录阅读器时长；有的将时长错加到 QQ 上。它们的准确率由 0.8%-10%不等，由于偏差过大，统一算作 0%。
- 除`My Phone Time` `ActionDash`外其他软件均请求`使用情况访问权限`，此处视为默认放行。
- `Phone statistic`有一个最大优点，就是刚下载就能查询到本年的全部数据。其他软件最多只能查到下载日期 9 天前的。

总结：

推荐同时使用`Digitox`与`Phone statistic`。_（这俩加一起都没某些家伙大_

<span class="heimu" title="你知道的太多了">感觉还想自己写啊，但是我不会，这下有生之年了</span>
