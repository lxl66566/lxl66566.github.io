---
date: 2022-06-17
icon: keyboard
category:
  - 爱好
tag:
  - 游戏
---

# 音游

至今我只打过移动端音游。本篇不含任何街机元素。

## 前言

::: details 回忆

小时候有打过节奏大师，很菜，平常管控也很严，拿不到手机。因此打的时长可以忽略不计。

真正开始打音游是在高二吧（20200614），在别人的推荐下开始玩 phigros。此时也是偶尔打打<span class="heimu" title="你知道的太多了">基本不打</span>。我当时用的设备是华为荣耀 9，延迟离谱外加断触严重，但我还是喜欢上了音游。

顺便说一句，我当时还有试着接触过喵赛克（玩两小时卸了，没有任何记录），project fx（最早记录是 20200722）等音游，不过并不持久。后来手机空间快用完了（64G）就卸了。

我的第一个音游视频是 2020 年 11 月发布的（已经是高三上了），当时全连了 FULI AUTO SHOOTER。此后又发了一堆视频。

我接触（并且持续玩至今）的第二个音游是 Arcaea。日记中最早出现`arc`的时间是 20201217。开始时很菜，后来才慢慢发现 arcaea 的魅力。

应该是在 2020 年下半年沉迷音游的。音游水平突飞猛进。（要是高考成绩也能突飞猛进就好了）高考完后还入坑了プロセカ，大学刚开学入坑了 osu，（大一下）买了平板后下载了 lanota，等等。

大二渐渐忽视了其他音游，专打 osu。大二下渐显颓势。音游水平在大三上前段达到顶峰，随后开始迅速下降，并失去兴趣。大四基本不玩了。

:::

::: details 暴论：为什么你不该入坑音游

致想要入坑音游的新人：快跑！

### 延迟

整个音游环境都被**高延迟**的乌云笼罩着。

首先我想强调有能力调整多个延迟的重要性。**谱面，音乐，打击延迟，三者缺一不可**。若以其中之一作为参考系，那么应该需要调整其他二者的延迟使其同步。也就是，音游至少需要支持两种延迟的调整。目前据我所知只有 malody 能够调两种延迟，其他音游都是不合格的。

- 在 OSU 下，可以通过增加底部遮罩强行调整谱面延迟，但是局限性很大：
  1. 遮罩高度是不变的，$t = h/v$，碰到变速谱一定会丢准度。
  2. 必需是新手；打太久习惯以后就没法改了，强行改只会变得遮罩和不遮罩都打不好。

然后再看看移动端：

- 移动端高延迟的根源是[触控](#触控)。
- 移动端高延迟也造就了宽判定。即使是广为人知的窄判定游戏 arcaea，最高判定的 $\pm 25ms$ 也比 OSU mania OD8 的最高判定 $\pm 16.5ms$ 来得高。
  - 这二者结合还会衍生出更多的问题。
- [external 1.](#external) 提出了一项新技术，但我并不乐观。

而桌面端的延迟环境也不乐观（虽然已经能爆杀移动端）：

- osu (legacy windows) 不支持 asio，而 windows 音频混合的延迟非常大。
- 键盘和轴也有很重要的延迟参数，但是一般的键盘厂家都不会说。键盘的回报率是多少？轴体触发键程和最大键程？主控消抖算法和时延量？一般的机械键盘在这里都会栽跟头，只有磁轴能压到 2ms 以下让你无感。

### 触控

这么多年过去了，Android 平板的触控还是没有半点进步。

- 目前在中国，Android 平板的份额是 华为 > 小米 > otehrs，然而华为早因断触而出名，小米平板也有非常严重的断触（亲历）。
- 没有厂家会为了数量稀少的音游玩家去做触控的优化，~~除非老板自己打~~。

### 其他

- 大部分音游会以 _帧_ 作为判定间隔[^1]。
  - 其他音游我不太懂，osu legacy 是这样的。只有到了 lazer 才好转。

[^1]: [音游判定原理详解——从触摸屏幕到判定音符](https://www.bilibili.com/read/cv13690032/)

### 具体分析

#### OSU

[OSU](../hobbies/rhythm_games.md#osu) 是一款开源游戏，但是实际上其运营依旧是盈利性质的。尤其现在 OSU (stable) 的开发极为保守，与开源精神相背甚远。lazer 无法与 stable 进行联机，种种不便也导致 stable 玩家不愿迁移至更新更好（maybe）的 lazer。

- 令人难过的是，osu 并不支持任何低延迟音效组件(coreaudio/wasapi/asio)。[source](https://github.com/Evisolpxe/OsuCNwiki/blob/master/jin-jie-zhi-lu/xu-yao-yong-dao-de-ruan-jian-zhi-shi.md#42-解决办法)
- 没有客户端音量均衡，而很多谱师上传的音量差距很大。
- 需要纵连任务栏图标才能打开的恶性 bug 几年了都没修。。还有 edit 闪退恶性 bug
- 倍速 mod 只有 0.75x 和 1.5x 两个可选；而很多高难歌曲需要细致到 0.05x 的间距划分。
  - 偶然间点开了最早的没有合并的 pull request，发现是个挺不错的任意倍速功能的前置功能：任意倍数计算 star 数的功能。接近 2 years 的不被合并的更改。
- 20230507：恶性 bug，osu 打开便闪退，目录出现 `.require_update` 文件，再次打开 `osu!.exe` 或 `repair osu!` 均会下载替换 exe 并继续闪退，不断循环。
- feature：既然采用了玩家作曲的开放社区，那为什么不学习一下 github 等的代码管理经验，让玩家能够为谱面发 pr？
- lazer 在调整谱面流速时会给出按键显示时间。这个时间在 stable 上是个谜，各种论坛，第三方 wiki 都没有对照表。

官方态度，stable 玩家不被支持，赶人去 lazer。而 lazer 并不好用。

- [20230508](https://t.me/withabsolutex/1054)：尝试下载 osu!lazer，然后自动安装到 c 盘并把我 20+G 的谱面文件夹复制了一份到 c 盘并塞满了。直接导致了我退坑 osu。（虽然当时不知道跨盘符不能硬链接确实是我的知识不足）
- 安装时无法选择安装目录，需要安装后跳过谱面选择阶段，然后进游戏改
- 谱面文件夹不公开，所有文件全部用 hash 值存储。
- 迁移后皮肤不适配（按键高度不对）
- 卡顿问题

这里这么多内容完全是我的血与泪[^2]。

[^2]: [offset 机制](https://t.me/withabsolutex/1044)，[无限崩溃](https://t.me/withabsolutex/1051)，[lazer 缺陷](https://t.me/withabsolutex/1054)

然后再说说各 mode 的痛处。

##### mania

- OSU 分为几个游戏板块，但是在 mania 板块却不再细分。而不同 key 数的 mania 基本相当于两个游戏。
  - OSU API 无法查询 mania 歌曲的 key 数信息，因此目前我使用过的谱面下载器均无法选择特定 key 数下载。
    - 专打 4k 的人（你猜是不是我）却要被下载一堆 7k 谱面，污染高难 ranked 池。可能你会说，下了再删掉不就行了，但是这种方式一点也不优雅，平添了许多磁盘与网络开销。（特别是 7k 的谱还非常多）
- 同水平段的 7k 玩家比 4k 玩家的 pp 和排名要高。我也听到了有社区发声说要为 4k 玩家的 pp 乘上补偿系数，但目前尚未实装。

##### std

比起 std，mania 的缺点都已经算是好的了。202505 我因为契机入坑 std 后差点被瞬间劝退。

- std mode 有一个类似 mania “下落速度”的玩意叫 [AR](https://osu.ppy.sh/wiki/en/Beatmap/Approach_rate)。而 AR 是由谱面决定而不是玩家决定的。
  - 这是我玩过的音游里唯二玩家不能自由选择“下落速度”的之一，另一个是 phigros 靠谱面吃饭的可以理解，但 osu 我是真不能理解。
  - 为了适合的 AR 区间去越级高难谱收益低，而去适应低 AR 谱就像玩 [arcaea 1 速风暴](https://www.bilibili.com/video/BV1ZY4y1V72A/)比吃了屎还难受。<heimu>我还真打过一段时间的 1 速 arc，结果就是两边捞，1 速打不好，调回 5 速发现实力又掉了两阶。</heimu>
  - 我能接受的最低 AR 是 8。
- 我下载了所有 2012 - 2025 的 mania 与 std 的 rank 谱，std 谱比 mania 多很多，但 std 一曲多谱比较常态化，论曲数不会比 mania 多太多。这为下面的观点埋下根源：
  - 谱面质量低。
    - std 一直都是 osu 的主旋律，繁荣时期来得早，老谱也多，但是大家都知道老谱变化少审核松，很多都是粪谱（无论 mode），因此论起优质谱比例，std 是不如 mania 的。
    - std 并不像 mania 那样实力为尊，自然也不追求谱面质量。
  - 歌曲质量低。这个很重要，我对音乐一直都很挑剔。前面说到两个 mode 的总曲数接近；std 老谱非常多，然后新谱里的动漫曲占比又很大，动漫曲的特点就是**下限高上限低**，比较难入我的旋律审美。
  - std 打击稀疏，比 mania 吃节奏得多，音押很重要；然而很多谱面有时候押人声（主旋律），有时候押伴奏，有时候押鼓点，初见被爆完了。
- std 由于开各种 mod 都会加倍率，所以你可以看到排行榜上全是卷 HD HR 的。~~大家都在吃屎，你不吃是不是显得不合群？~~ 反观 mania 不加倍率显得非常正常。
- std 容易死。std 的血条是不击打就会自己掉的，对准度要求太高。而且二维游戏就是容易 miss，光标没挪到位说啥都没用，mania 乱按至少也能糊个 50/100 吧。
  - 然后由于 AR 原因我又整天越级，因此只能一直开 no fail。
- 读谱力过于重要。我知道不管什么模式读谱力都很重要，但是**在 mania 练读谱是为了变强，而在 std 练读谱是为了不被傻逼谱师恶心到**。
  - std 喜欢藏 hit。谱师把一个 hit 藏在另一个 hit/slide 的下面（**完全重合**）是相当常见的做法，这就是故意恶心人，暴打初见。
  - std 里每一个 hit/slide 都在一个 combo counter 区间内，区间内的 hit/ _slide 起点_ 之间会有连线；谱师可以在任何时候重置该 counter，重置的 counter 和前面的 hit 是没有连线的。有的谱师就会故意在同一小节连续高速 hit 之间（也就是没必要重置 counter 的区域）疯狂重置 counter，为的就是让连线消失，让数字全部变成 `1`，来故意恶心你让你混淆击打次序。
- 连击比准确度重要很多，到了离谱的程度，随便去高难曲看看榜就知道。

#### phigros

由于移动端延迟离谱，phigros 选择以 _宽判定区间_ 应对。高延迟 + 宽判定的组合让断触的问题越发严峻：只要你在键密集处漏了一个键，你有很大概率在接下来的连续键上取得较差的成绩。

而且，phigros 以谱面飘逸闻名，某些曲子上黄键乱飞，我有很大的六指同按需求。然而大部分平板 & 手机的多指触控就是一坨大便。

#### Arcaea

- 616 对玩家的态度有目共睹。
  - 是谁把查分 API 撤了？
  - 我亲眼目睹神仙群友被误永封的经历，616 根本不看自证视频。

:::

## 总体现况

我是音押人，这里的音押指的是敲键盘或屏幕时的声音跟音乐声重合；同时也因为小米平板 5 的屏幕延迟数据稀烂的影响，我玩音游的延迟设置非常怪。我没法快速适应其他音游人的设备，别人也同理。<span class="heimu" title="你知道的太多了">（我们之间已经隔了一层可悲的厚障壁了）</span>我接触一个新音游要做的第一件事并不是新手教程而是不断尝试调延迟。

音游调整延迟大多是听重音是否重合，对我来说**p 用没有**。因为重音与触屏延迟没有任何关系，我的延迟根本无法调整！下面也会列举各音游调延迟的人性化程度分数<span class="heimu" title="你知道的太多了">包含了我的无尽怨念</span>。

本人所有触屏设备音游均关闭打击音效。

<!-- prettier-ignore -->
|音游名|游玩时长(%,初期数据)|延迟|谱面速度|延迟人性化程度得分|
| :-: | :-: | :-: | :-: | :-: |
|osu|81|<text style="color:red;">RK98+将星X15内置声卡: -86ms<br/>RK98+GS02声卡 -41ms<br/>cloud98+GS02声卡 -22ms</text>|30|0|
|osu!lazer|-|<text style="color:red;">-107ms - -94ms</text>|25|4|
|phigros(latest)|10|<text style="color:blue;">+100ms</text>|-|1|
|arcaea|7|<text style="color:blue;">78</text>|5|5|
|KALPA|<1|<text style="color:red;">-148ms</text>|6.5|5|
|lanota|<0.5|<text style="color:blue;">+12</text>|7.0|0|
|Dynamix|<0.1|<text style="color:red;">-0.12</text>|1.2|2|
|Malody|<0.1|<text style="color:red;">-164;-4?</text>|10|10|
|phigros(2.1.4)|<0.05|<text style="color:blue;">+75ms</text>|-|1|
|phigros(1.6.5)|<0.05|+105ms|-|1|
|phigros(1.4.1)|<0.04|+120ms|-|1|
|プロセカ|<0.01|<text style="color:red;">-2</text>|10.7|2|

<!-- Predator G3-573: -63ms(-55~-70) 鞋盒机: -13ms  -->

_（注：延迟中的颜色含义为延迟调整方法：纯音押打歌后，<text style="color:red;">late 过多，向负方向调整，early 过多，向正方向调整；</text> <text style="color:blue;">late 过多，向正方向调整，early 过多，向负方向调整。</text>）_

**游玩时长变化情况：**

<iframe frameborder="no" src="/charts/rhythm_games_time_percentage.html" width="100%" height="280" loading="lazy"></iframe>

## 观点

- OSU 敲键盘的快感是敲平板无法带来的：平板用力会敲坏，而且越级空有力气还不一定能敲到键上。而 OSU 很适合发泄情绪。x
- 我很讨厌在面条上写变速的谱师。非常讨厌。
- 我也不喜欢背谱文化，因此非常反感 _冰与火之舞_。这也是我现在很少打移动端音游的一个原因，因为移动端背谱需求太多了。

## OSU

~~<div class="subtitle">——空を超えるために、頑張らなくちゃいけないんだよ！</div>~~

主玩 mania。202505 入坑 osu! std。

- [我的 osu 主页](https://osu.ppy.sh/users/25751103)

> 20230514 - 20230629 退坑

### 我的记录

- 我的 o!m 健身按键数 ~~（众所周知 osu 是健身游戏）~~

<iframe frameborder="no" src="/charts/keysnum.html" width="100%" height="300" loading="lazy"></iframe>

以前很热衷于记录我的成绩与进步情况，并将其可视化。现在废了，懒得记了。

:::: details 历史成长

- 叠（Jack）：β, ex-4

<iframe frameborder="no" src="/charts/reform_jack.html" width="100%" height="280" loading="lazy"></iframe>
<iframe frameborder="no" src="/charts/malody_jack.html" width="100%" height="280" loading="lazy"></iframe>

- 技（Tech）：β, ex-4
  - 本人最擅长技。尤其是偏叠的技。

<iframe frameborder="no" src="/charts/reform_tech.html" width="100%" height="280" loading="lazy"></iframe>
<iframe frameborder="no" src="/charts/malody_tech.html" width="100%" height="280" loading="lazy"></iframe>

- 乱（Speed）：10, ex-2
  - 严重偏科。

<iframe frameborder="no" src="/charts/reform_speed.html" width="100%" height="280" loading="lazy"></iframe>
<iframe frameborder="no" src="/charts/malody_speed.html" width="100%" height="280" loading="lazy"></iframe>

- 切（Stamina / Stream）：β, ex-4
  - 耐力是限制切力的最重要因素。耐力不稳定，因此成绩不稳定。
  - 非常痛恨无休切。Malody v3 段打得挺好，但 reform 段极为下手。

<iframe frameborder="no" src="/charts/reform_stamina.html" width="100%" height="280" loading="lazy"></iframe>
<iframe frameborder="no" src="/charts/malody_stream.html" width="100%" height="280" loading="lazy"></iframe>

一些解释说明：

- 上为 reform 段位，下为 malody v3 段位；MR 等特殊 MOD 不显示。
- 健身按键数
  - 20220809+：由于[OSU 打一半电脑炸了](../hide/memories.md#大学-大一后暑假)，晚锻炼的按键数未记录。（实际 > 记录）
  - 20221022?,20230309?,20230324?：由于 osu-kps（记录键数的软件）崩溃，导致键数只能取估计值。

::::

### 说两句

给新人： [OSU 萌娘百科](https://mzh.moegirl.org.cn/Osu!) | [osu!mania 4k](https://www.bilibili.com/read/mobile?id=11073476)

我的暴论可以在[前言](#前言)里查看。

::: details 我的经历

原本大学时看到音游群的同学在玩 osu，我也入坑了，想着练练 4k 可以提高我其他音游的成绩（多指力）。当时打了好久 osu 默认自带的那几首曲子，后来才知道怎么下载曲子...

我打 osu 主打 mania。主 4k，副 6k。其他 key 数碰过几次后就再也不碰。大学期间几乎没玩 std <heimu>曾经为了练 cs 定位用 [McOsu](https://store.steampowered.com/app/607260/McOsu/)的 3d 模式打 std</heimu>，大四末尾由于买了数位板就顺便入坑了。

- 为什么打 osu 最频繁呢？
  1. 打 OSU 不需要忍受移动端的延迟不稳定与断触。虽然延迟还是可感知，但是并不是不能接受。
  2. 上限最高。 **osu，本是逆天而行。** <span class="heimu" title="你知道的太多了">（内卷而行</span> ~~虽然 Malody 同样具有高上限，但是固定 key 还是习惯敲键盘…~~
- 其他想说的。
  - 我曾经历了一段时间的准度崩坏期（2022.06.28 前后），现在想来，应该是当时打段位过于急于求成了，无视准度打了很多超过我极限的曲子。为了救回准度付出了一定代价。所以，**在逆天的路上，也别忘了去欣赏沿途的风景。** 还有，**OSU 如逆水行舟，不进则退**，72h 内需要有完全热手的时间，否则实力就会开始退步。对我而言，4 天不打 OSU，就需要约 20w 键的复健才能恢复原先水平。

:::

### 设置

参考[OsuCNwiki](https://github.com/Evisolpxe/OsuCNwiki/blob/master/jin-jie-zhi-lu/xu-yao-yong-dao-de-ruan-jian-zhi-shi.md)。

#### 调整延迟

offset 对个人手感，后续进步与习惯养成极为重要。但是调整 offset 是个漫长而痛苦的过程（20230502-03，16w 键才调好）。

我个人习惯音乐声与键盘声同步，需要同时考虑键盘输入延迟和音乐延迟。键盘延迟一般在 1ms 左右，关系不大，而音乐延迟极难调整。官方对音，录制波形，都是调整 key 音的手段，对音乐无能为力。摸索了非常久才得出一个比较好的方法：**将分数计（看准度的那个条）调大，开 NF 打节奏强的 rank 图**，打一段调整一下。rank 图也并非没有 offset 问题，需要多打不同谱面，不断调整。

### 键盘参数

<!-- prettier-ignore -->
|轴体|使用时间区间|优点|缺点|
| :-: | :-: | :-: | :-: |
|光轴|2020-20220530|便宜<br/>延迟低<br/>耐操|巨吵无比<br/>触发压力大<br/>无法换轴|
|AJAZZ红轴|20220607-20220609|手感不错<br/>静音|-|
|RK红轴|20220611-20220614|触发压力小|触发键程大|
|<text style="color:blue;">快银轴</text>|20220614-20250406|快，触发键程小|触发压力稍大|
|金粉轴v2|20220624-20220625|触发压力小|触发键程大，延迟高|
|雨露磁轴|20250406-至今|触发键程可调|

大一用了一整年的地摊货键盘，光轴，咸鱼 40 的网吧淘汰品。延迟很低，可以随便泡水不会坏——但是巨 tm 吵，舍友震怒；而且触发压力大，打得很累。

放假回家后用过了 AJAZZ 红轴，手感还行，可惜因为套件模具不喜欢，退掉了。第三次换的是 RK 红轴，打字舒服但是打 osu 不行：因为触发键程问题，轻按与重按的触发延迟是不一样的，导致我爆发段和正常段准度总会死一个。<span class="heimu" title="你知道的太多了">现在想想，当时是换键盘的延迟适应期，准度差挺正常的，不该甩锅</span>

第四也就是现在用的，朋友送我几个 ttc 快银轴，试了试，手感挺不错的。不过还有一些缺点：克数稍微大了点(45g)，打久了累；声音也比较大。

第五，ttc 金粉 v2，跟第三个 RK 红轴很像，这里不多说（好像因为工艺原因延迟较大）。摸完五种轴我感觉应该已经有了一定的认知了，**osu 不仅仅是耐力游戏，更是准度游戏，键程比压力更重要。** 快银凭借导通行程 1.08+0.4/-0.2mm，总行程 3.4-0.4mm 获得第一。

2025 年由于原来的键盘频繁断连，换了个 cloud98 磁轴键盘花了 ￥ 250，这是我在低价位唯一能买到的 98 配列总键程<3.6mm 的一把磁轴键盘。2024-2025 年磁轴市场卷飞，磁轴已经变成了平民键盘，而 cloud98 也没让我失望，让我的全局 offset 直接下调至 -22ms。

由于我是音押，我的磁轴触发参数是要比正常位置低的。参数为首次触发行程 2.4mm，动态触发行程 0.3mm，动态重置行程 1.3mm。

### 皮肤

大一一整年用的是蓝白钉皮，R Skin v3.1 (diamond) 的改版。可以在我的 B 站视频里找到。顺带一提，当时也是试了好多皮肤，发现其他皮肤都没什么手感，只有这套拥有超亮击打特效的蓝白钉皮很对我的胃口。~~当然，猫猫也很好看！~~

然后地狱时刻（20220612）到了，我下载了一个别人的同名皮肤，并且覆盖掉了原皮肤。这种覆盖是不可逆的，无法恢复。同时我在当时下载皮肤的群里和网上疯狂找原皮肤。找不到了，销声匿迹了，找到的都是 R Skin 的原版或其他改版。这大概是我最痛苦的一个晚上。

第二天我几乎是死心了，开始了自己融合皮肤的过程，希望能融出像原来那种的蓝白钉皮。自己融了整整一天，也融不出什么手感好的皮肤。

然后在 20220613 晚上，放弃自己原本融的那个（absolute x v1），在朋友帮助下重新开始再融一个。基准皮肤选的是 R Skin v3.0 (Jakads' New) LNCut，结果只需稍稍修改，就融出了 absolute x v2。手感还不错，能够足够逼近原来的皮肤了。

现在的皮肤是[absolutex v6](https://osu.ppy.sh/community/forums/topics/1746341)。

### 段位

叠和切主要考验手速和耐力；乱是节奏和读谱；技在这二者之间。

#### 4k

- [4K Reform Dan](https://wwp.lanzout.com/iIUjo02rxm5a) （官方，96% pass）
- [Malody 4K Regular Dans v3](https://osu.ppy.sh/beatmapsets?q=malody%204k%20regular%20dan%20v3&s=any) | [Malody 4K Extra Dans v3](https://osu.ppy.sh/beatmapsets?q=malody%204k%20extra%20dan%20v3&s=any)（96% pass）
- [4k LN Dan Courses v2](https://osu.ppy.sh/beatmapsets?q=4k%20ln%20dan&s=any)（需要开启 Score V2 mod, 97% pass）
  民间（高难）：
- [4K Technical Dan Course](https://www.bilibili.com/read/cv21330945)
- [勿段](https://www.bilibili.com/read/cv19532510)

#### 6k

6k 对玩家与谱面把控极为严格。~~（怎么会事呢？）~~ 请加入 QQ 群: 579602633 获取谱面与资讯。群内对成员活跃度有一定要求。

### 其他推荐

- ~~护眼软件：[f.lux](../farraginous/recommend_packages.md#flux)~~
  > 由于我在家的房间采光极差，白天跟傍晚的光线差不多，而我用的 osu 皮肤是蓝白钉皮，非常刺眼，因此我使用这款护眼软件。osu 运行时会自动屏蔽 win10 的夜间模式，但 f.lux 可以无视这个屏蔽（win10 不稳定，win11 稳定），强制护眼，我还是觉得很舒服的。平时玩电脑也是常开的。  
  > 不过现在的 win 11 已经没有这个问题了，因此不需要。
- 谱面下载：[Ranked 地图下载器.exe](https://osu.sayobot.cn/software)
  > 只能按 ranked 时间下载，且不可选择 key 数。但它已经是我用过的最好用的谱面下载器了。  
  > 仅限 legacy osu，lazer 下载器暂时未知。
- 键数记录：[osu-kps](https://github.com/UnnamedOrange/osu-kps)，具有 kps 图表与键数记录。当然，它甚至还能在 osu 的 replay 中记录键数。
- 夹带私货：我写的[自动调整 mania 皮肤水平位置](https://github.com/lxl66566/osu-ColumnStart-adjustor)的脚本。
- 关于制谱：[MixMeister BPM Analyzer](https://wwp.lanzout.com/iuJPC06l9xje)：分析音频 bpm。

### 最好成绩

- 4k 段位：[β 96.33%](https://www.bilibili.com/video/av661009839/)([replay](https://wwkh.lanzout.com/iGlrJ18lyudi)) & [malody v3 ex2 96.03%](https://www.bilibili.com/video/BV1R8411A7Ye) | [LN 11](https://www.bilibili.com/video/BV1vv4y1p7b1)
  ![malody v3 ex2 96.03%](/images/hobbies/rhythm_games/osu_best.jpg)
- 6k 段位：[4dan 96.27%](https://www.bilibili.com/video/BV1Ks4y1K77B/)

## phigros

目前处于瓶颈期/厌倦期：因 osu 打多了开始反感谱面演出；15 好听的能收的基本上收完了<span class="heimu" title="你知道的太多了">放屁</span>；16 能 ap 的 _（Lyrith -迷宮リリス-）_ 懒得打，摆烂；16 想 ap 的 _（Stasis）_ 还没解 5k 段。16 上位 _（igallta & Rrhar'il）_ 根本不会打。

同时因为电脑端音游（OSU）打得多了，越来越不适应小米平板的极高延迟（100ms），让我更加不想碰它。<span class="heimu" title="你知道的太多了">给不能收歌的我再找个借口</span>

<!-- ### 调整延迟
若early过多，则将谱面延时调小。
:::warning 警告
不要用 SIGMA IN 来调整延迟！
::: -->

### 数据转移

同品牌手机可以用自带的换机工具转移。（例：小米换机）

:::details 老方法失效，archived
此处给出另一应用范围更广的 phigros 数据转移方法：

1. 移动设备打开 USB 调试并与电脑端连接。
2. 备份：`adb backup -f NAME.ab -noapk -noshared -nosystem com.PigeonGames.Phigros`
   - `NAME`最好包括游戏名、版本、备份时间等信息。
3. 恢复：`adb restore NAME.ab`

[这里（Phigros 2.4.1）](https://github.com/lxl66566/my-key-data/releases/tag/backup)是我的用户数据，data 充足，AT 全解锁，有需要可以自取。
:::

现在有在线存档了，请使用在线存档转移。而且能否下载到老版本也是个问题。

### 最好成绩

15.9 all perfect

![15.9 all perfect](/images/hobbies/rhythm_games/phigros_best.jpg)

### 共存版

- 2.1.4（2022 愚人节）：[下载链接](https://pan.baidu.com/s/1dRuoIVPCCgkbSxCyD-Z-IQ?pwd=2022) | [出处：『Phigors』2022 年愚人节共存版 Phigros 来了！！！](https://www.bilibili.com/video/BV1L44y15713)

## Arcaea

<!-- 目前处于恢复期：因好久没打了，比巅峰时，11 平均退步 15w 分，10+平均退步 8w 分。 -->

我在 arc 打歌基本只打好听的戳 xp 的曲子，这也导致了我在各曲子上的实力极度不均衡。

之前用手机打，后来买了 mipad5，平板大，接蛇确实好接。但是米板断触极为严重，属实傻逼。

### 账号

本人账号（917042883）0 氪，很久没登录了。一直在借别人的号打。感谢 NitroYlide 和 Colinxu29 的支持。

### 我的 XP

此处列出一些我觉得好听的曲子（Favorites 的一部分）。（排名按照 FTR 难度顺序）

<=9: INTERNET OVERDOSE, Particle Arts, Alice's Suitcase, Equilibrium, Vindication

9+: 7thSense, amygdata, Defection, Far Away Light, Infinite Strife,, Lost Desire, Sulfur

10: Climax, cyanine, `Good bye, Merry-Go-Round`, GLORY : ROAD, Löschen, Oshama Scramble!, Pentiment, PRAGMATISM, Sheriruth, アリス・リデルに捧ぐ, 妖艶魔女 -trappola bewitching-

<!-- prettier-ignore -->
10+: #1f1e33, AMAZING MIGHTYYYY!!!!, Cyaegha, Halcyon, ouroboros -twin stroke of the end-, 烈華RESONANCE, Ringed Genesis, Singularity, Stasis, Tempestissimo, Testify, TEmPTaTiON, World Vanquisher

<!-- prettier-ignore -->
11: Aegleseeker, Grievous Lady, 最強STRONGER

### 最好成绩

Sheriruth 10.1 pure memory

![Sheriruth 10.1 pure memory](/images/hobbies/rhythm_games/arcaea_best.jpg)

### 其他

- [改残片](https://www.mbrjun.cn/archives/443/) ，需 root（精简版：`/data/data/moe.low.arc/shared_prefs/Cocos2dxPrefsFile.xml`, `<string name="fr_k">e71fbd09303b100e1e97b9acc8970bb4</string>`, `<int name="fr_v" value="29997" />`）
- [破解版](https://t.me/GlowerHi_mods/24)，截至 4.6.0 的所有歌曲，未测试

## pjsk

20230715，我为我的 mipad5 解 bl 锁。由于需要清空数据，我复制出了我的引き継ぎ码并发给了我的 telegram 收藏夹。

机也刷完了，pjsk 也下回来了，我去 tg 找我的码时，震惊地发现——它没了。或许是梯子问题没发出去，或许是我误删了，反正它没了。

众所周知 tg 收藏夹无法恢复，而我好久没打 pjsk 了，账号信息基本上不记得。。因此没有任何一丝可能性能救回我的账号。~~里面有想抽 _朝比奈まふゆ_ 的 100 抽~~。这已经是我第二次丢失 pjsk 账号了。

<div style="text-align: center; ">
<img alt="有人丢了引き継ぎ 我不说是谁" src="/images/hobbies/rhythm_games/sbgaaru.png"  width="40%" height="40%">
</div>

本人于 20230715 退坑 pjsk。

## external

1. [我已经迫不及待地想给各位安利一项游戏音频新技术了](https://baijiahao.baidu.com/s?id=1704721336592372120)
2. [Low-latency osu! on Linux](https://blog.thepoon.fr/osuLinuxAudioLatency/)
