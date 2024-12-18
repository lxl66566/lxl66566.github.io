---
date: 2024-03-25
icon: briefcase
category:
  - 评价
  - 经历
---

# 找工作经历

首先本精神自由人的定位非常清楚：不考研，不考公。因此找工作是我的唯一选择。

## 定位

### 方向

我喜欢的是新技术，做小玩意，想给大家带来更好的使用体验。因此我一开始选择的是 _客户端开发_。但是实际上客户端指的大多数是移动端，基本没有专门的桌面软件开发。我之前写 Android 被折磨得非常痛苦，ios 也不会，因此放弃了这个方向。

后端方向基本全是 Java/C++，偶尔会有一些 python 后端（Django, Flask）。我除了 Django 就没接触过其他框架，而且我并不喜欢后端。

不论爱好，考虑我的技术栈，我感觉 _测试开发_ 和 _Linux 运维_ 挺适合我的，毕竟前者 python 用得烂熟，也鼓捣过几个爬虫和自动化项目，后者就纯粹是喜欢尝试创造新工具，写过脚本与包管理器。确实，测开的要求低很多，但是运维就麻烦了，各种 k8s，云原生的要求我是不太满足的。

至于前端，我也写过不少前端的东西，会框架会 TS，但是基础（特别是 CSS）不牢。而且我并不看好前端的前景。

### 语言

- 我尽可能避开了 JAVA 和 C++ 这两个最多岗位的语言。。JAVA 的话我卷不过后端小子，框架也一点不熟；C++ 我甚至不敢说我会写（怀抱着对《The Book of Modern C++》的恐惧）。
- 而 Rust 非常显然，几乎没有公司招；即使有一些量化要 rust，我也暂时没有考虑，因为使用 Rust 的实习经历给我带来了不小的心理创伤。
- 最终还是 Python 岗位看得多一点，然而由于不想从事 Python 后端，我也只能投一点万金油。

## 简历模板

我用 [typst](../learning/typst.md) 比较多，好久之前就盯上了 [OrangeX4 的简历模板](https://github.com/OrangeX4/Chinese-Resume-in-Typst)。字体可能要折腾一会儿，但是确实够好看。

typst 可能有些难，再不济至少也得用个 [markdown 简历模版](https://github.com/BingyanStudio/LapisCV) 吧。

::: tip

以下记录时间 ↓ 由新至旧。

:::

## 2024 秋招

<!-- prettier-ignore -->
| 公司 | 岗位 | 渠道 | 时间 | 状态 |
| --- | --- | --- | --- | --- |
| 字节 | 测开 | 内推 | 20240904 | 一面 |

其他经历将在秋招结束后更新。

### 笔试

- 华为笔试：2h 3 题，分值是 100，200，300。我 100 反而不会写，200 AC，300 拿了 80% 分数。
  - 华为的笔试外包非常垃圾。平台名字叫 _时习知_，顶上写着 _建议使用 Chrome 浏览器访问！_ 结果点击开考发现是强制用 chrome。妈的我 edge 不是 chrome 内核吗？火速下载安装 chrome，然后摄像头一直打不开，我页面的摄像头权限也给了，不会跳出提醒“是否允许打开摄像头”的弹窗。然后进设置鼓捣一番，在 _隐私和安全 - 安全_ 里将防护等级调为 _不保护_ 才成功打开摄像头。。。太傻逼了。浪费我 10 分钟时间。
    - 进入在线 IDE 写代码，不提供读入，IDE 没有 hint 也没有警告，我 rust 不会从 stdin 读入，又没处查标准库函数到底叫啥，所以只好用 C++ 和 Python。
    - 代码尾随新行或者空格都算错的。
  1. 平衡二叉树有序插入，求最终的叶子节点。
  2. 给出一个匹配好的括号序列，要求对其排序，排序后的序列仍然匹配。具体的，如果 A，B 合法则 `(A)` 和 `AB` 都合法。解法是递归，每次都把大的切成子括号序列再排序。
  3. 猎人打怪，暴力 ~~大模拟~~ 小模拟。主要是看二进制运算掌握熟练不熟练。
- 小米笔试：用的赛码网。25 选择 + 2 编程，1.5h 时间有点不够。不过编程题允许使用本地 IDE，这点必需赞。
  1. 若干 3\*3 九宫格，每个格一个数字。可能为 0-9。0 代表未填写。需要使用空缺的数字补全九宫格，让任何数字的相邻都不会出现 `abs(a - b) == 1` 的情况。
  2. 从 1 开始，每次可以：(1) 乘 a (2) 循环移位任意次数，例如 54321 --> 43215 或 32154 或 21543 等等。输出：最少多少次可以达到 b，如果不行，输出 -1
  - 小米的两题都挺简单的，但是我用了 rust，不到 1h 时间，所以在交卷 3min 后才做出来。遗憾退场。
- 拼多多笔试用的牛客，允许用外部 IDE。2 小时四题，每题 25 分。我拿了 3 题。
  1. 求最长的子串，使串内任意两个相邻字符不相同。
     - 我 python 两分钟糊完，结果 python 居然会超时，只能拿 78% 的点。。服了，直接开 Rust。
  2. 第二题 ~~neta 了中国和美国~~，说的是 C 国和 A 国在奥运会拿金牌。有若干项目，每个项目给出 C 国拿金牌的概率和 A 国拿金牌的概率（存在都不拿金牌的情况），求最终 C 国金牌数 > A 国金牌数的概率。
  3. 模拟哈希表，哈希函数 `f(x) = x % n`，如果哈希冲突就循环顺延；塞满了就不塞了。给一个入队序列，求最终状态。（注意，哈希表中添加相同元素会跳过添加）
     - 我用 rust 写了一个纯模拟，结果 TLE，但是也过了 60% 多的点。然后维护一个 next 数组作为冲突指示，就 AC 了。
  4. n 个小朋友，每个小朋友有 x 个糖，单价 y 元，你的任务是以最少的钱去买糖，最终让自己的糖是所有人里最多的。大概是动归吧，没做出来。
- 新凯来（华为外包）笔试，三题算法。1. 简单字符串 + 栈秒了，2. 高精度 python 秒了，3. 手写计算器 python `eval(s)` 秒了。这个笔试笑死大牙了。

### 面试

- 字节一面：
  - 自我评价：答的很差，很多地方表达出现了问题，磕磕绊绊的；八股背得太少，小看了大厂对八股的重视。缺乏面试经验是这样的。面试官认为我的实习经历与定位不匹配，认为我更适合开发。
  - 自我介绍，为什么做测开，我能对公司发展产生什么好处
  - 测试原理：测试的主要目的；回归测试与集成测试区别
  - 测试设计：微信抢红包
  - python：深浅拷贝 变量与赋值的本质 垃圾回收原理 全局作用域和局部作用域
  - 计算机网络：TCP UDP 区别与应用场景；浏览器输入地址到网页响应发生了什么
  - 算法：一道 easy，十进制数各位相加。面试官不想问了，想赶快结束。
- 华为测开：
  - 发现测开主要考验不是算法能力，而是测试用例设计能力。所以用例要上点心。
  - 华为面试用的 WeMeeting，这玩意共享屏幕时不能打开窗口，导致我只能凭记忆做题，结果还被说读题不够认真
  - 一面：纯聊天，聊笔试，聊实习，聊项目，没有八股。
    - 手撕一题：给出六个数字，求能够组成的最大时间（时分秒）。不合格输出 invalid。
  - 二面：自我介绍 - 手撕 - 反问，结束了。
    - 手撕：有效的 IPV4 地址
  - hr 面：被 hr PUA 压力，然后挂了
- ベース株式会社：派遣企业比起技术，更看重日语交流。毕竟技术含量不高。然后日企面试问题也都是公式化，提前准备一阵子就行了。
- 海隆：一面纯聊天，我大聊特聊 rust。二面是日本远程，问的日企公式化和简单日语口语。
- 拼多多服务端：拼多多面试用的是在线 IDE，做的挺烂的，跟 TM 记事本没啥两样，没有补全，不能自己运行测试，有点痛苦。不过实际上面试官只是看个思路，并不一定要实际通过。语言不限，不过没有 Rust。
  - 一面，面试官不错，氛围就是聊天
    - 实习，问得很具体（问了十多分钟）
    - 操作系统：为什么要分物理内存和虚拟内存，优点有哪些
    - 数据结构：
      - 有哪些二叉树的派生数据结构，如何实现，有哪些优势
      - 为什么 rust 要用 BTree 而不是 C++ 的红黑树（没答上来）
    - 算法：
      - 哪些稳定排序，哪些非稳定排序，**为什么**它们是稳定和非稳定
      - 动态规划的概念和基本流程
    - 手撕两题
      1. 两个有序数组，找出 A 中存在而 B 中不存在的元素（双指针）
      2. 一个平衡二叉树，将其原地转换为有序双向链表
  - 二面：感觉面试官比较死板，纯问八股，后面不想问了
    - 拷问实习
    - （挑一个语言讲讲）线程池有哪些参数，有哪些区域，不同区域的特性
    - 浏览器输入网址到网页响应发生了什么
    - 手撕：
      1. 单词统计
         - 扩展：如果单词文件有 40G，我只有 10 台 2G 内存的服务器，不能使用现成的数据库，如何统计单词
      2. 第 k 大的数，O(n) 复杂度
      3. 二叉树判断是否为二叉搜索树
  - 三面：无八股，无手撕
    - 喜欢编程语言？说下学过的语言的评价
    - 拷问我的其中一个 git 加密项目，如何性能优化
    - 如何优化读单个文件的第一行（操作系统底层与算法设计）
      - 分块读
      - simd
      - 内存页大小
    - 如何做人机验证
    - 聊天
  - hr 面：公式化确认信息。面完说两周内出结果。
    - 内推码来源，为什么考虑拼多多，offer 情况，其他大厂面试进度，考研/对象/家人。
    - 实习内容，分享项目的成就，为什么找工作不找 rust，找工作最看重什么方面（排序）。
    - 拼多多的工作压力如何，薪资要求。
- 小红书运维开发一面：
  - 在线 IDE 不好用，不能 tab 整段缩进。python 还是 3.4，太低了。
  - 30min 手撕：给出任何一个正整数 a，可以分解成若干个正整数的乘积，即 $a = a1 * a2 * a3 * ... * a_n$，并且 $1 < a1 <= a2 <= a3 <= ... <= a_n$，问这样的分解的种数有多少。注意到 $a = a$ 也是一种分解。$1 < a < 32768$，100 组以内。我做了个质因数分解然后发现找不到规律……感觉还是得动归或递推
  - https 端口，四次挥手，如何做容器管理，用的数据库，redis 有没有了解
  - 反问的回答：运维开发主要是 30% 运维，70% 开发，做 go gin 的自动化后端。
- 伴芯科技面试：两轮连一起，本来应该 2h，我写了 3h。一大堆算法，他们公司要求的数学功力也太高了。
  1. 写快排
  2. s 个数字满足 sum(s) % p == 0，求其最小子集 t 也满足 sum(t) % p == 0。len(s) <= 10^7, p < 100，要求复杂度优化。
- 欢乐互娱一面：我麦克风挂了，用的笔记本自带麦。面试官网络巨烂，两句就听不清一句，而且他还没给摄像头，我都不知道说没说话。
  - 问的都挺简单的。有逻辑题，有 GC，有 TCP。

## 2024 春，实习

~~据说~~在找工作时有实习经历是很重要的，因此我将大三下初期的找暑期实习视为一场战斗。

基本信息：

- 暑期实习的难度一般比日常实习要高，不过也提供更多的转正机会。
- 一般互联网实习都是线上面试 & 笔试。
- 金三银四是真的，好的实习机会早点更多。

心得：

- 在如今的环境下，211 学历比我想象中更吃香。刷着帖子，切身感受到了学历的重要性，~~把高考前的我抓来打~~。
- 信息来源，可以是用 app（牛客，实习僧，智联，boss），一般学校也会拉群给实习信息。后者档次就相对低一点，主要是学校合作企业和当地企业在招？
- 小厂的笔试/面试体验比大厂好很多。
- 互联网大厂，算法非常重要（也可以说大厂岗位就是给 OI 爷准备的）。

| 公司     | 岗位            | 渠道       | 时间     | 状态             |
| -------- | --------------- | ---------- | -------- | ---------------- |
| NVIDIA   | 测开            | 牛客       | 20240306 | -                |
| 字节     | 研发 - 客户端   | 网站       | 20240306 | -                |
| 腾讯     | PC 客户端       | 网站       | 20240307 | 一面，笔试       |
| 商汤     | 软件开发        | 实习僧     | 20240308 | -                |
| 拼多多   | 客户端其他      | 牛客转网站 | 20240308 | 测评，笔试，挂   |
| 达坦科技 | Rust 分布式存储 | 牛客       | 20240309 | 面试，笔试，录取 |

详细说下：

- NVIDIA：简历欠打磨，写得不好。
- 腾讯：
  - 投简历当场就要做两个半小时的 IQ+EQ 测试，非常痛苦
  - 面试前才跟我讲需要去深圳实习。但是我投的是上海（
  - 一面问了我对于 rust 的看法，然后做算法题。做完对我比较失望，随便问了点计算机网络和概率论（我：¿），答的也非常烂。
    - 算法题：写一个能处理 `.` `+` `*` 三个特殊字符和其他普通字符的正则 parser。不允许用 python。当场没写出来，面完后又写了三小时都写不出来。个人总结一下：一阶段：`ab*c` 匹配 `aabbbbc`；二阶段：`aa*a` 匹配 `baab`；boss 战：`a.*b.+c` 匹配 `cababbcbc`。评价是太超模了。。
  - 笔试算法两小时 5 道，比拼多多的简单很多，但是还是牛客的 OJ，样例太太太太他妈的少了。
    - 链表删除所有值恰好等于 k 的节点
    - 01 树，从根走到叶子，路径上所有节点将表示为一个二进制数（按路径顺序）。有多少种不同方案使最终的二进制数在区间 `[l,r]` 内？<heimu>简单搜索+简单剪枝</heimu>
    - 一棵只有 1，2 的树，路径的权值为路径上所有节点的权值之和，问有多少条权值为 3 的路径？定义 u->v 和 v->u 为同一条路径。<heimu>注意只有 1，2，直接搜索找连接的 1</heimu>
    - 剪切树上的一条边，将这棵树剪切成两棵树，问两棵树直径之差的绝对值的最小值是多少。树的直径：树上任意两节点之间最长的简单路径即为树的直径。（没做）
    - n\*m 的矩阵，每个格子都是红色或紫色的，每个格子都有一个价值为 $a_{ij}$ 的宝藏。只能向右和下走，沿途拿走宝藏，但从某格子移动到同色格子上时不能拿。问走到地图右下角一共能获得的宝藏的最大价值和是多少。<heimu>简单动归，转移方程一眼看出</heimu>
- 拼多多：
  - 笔试前需要做 20min 左右的性格小测试
  - 笔试是两小时四道算法题，ACM 赛制，有点难度。OJ 的读入比较难用，反而是写 C++ 优势比较大。测试用例跟一般的 OJ 一样非常吝啬，我都是用例全过，但是 0 分。题目有贪心，图论，还有个字符串，最后一个忘了。
    - 字符串是每次能消一个回文子串，问最少的消完步数。3\*10^5 量级。
- 达坦科技：
  - 面试只聊项目，不问技术问题
  - 然后给两天做 rust 项目。实际上项目做了 10+ 天，面试官不断给我加需求。加需求我不介意，但是我感觉一次性把所有需求说出来会更好一点。
  - 面试前专攻了一天 rust 数据结构，帮了大忙。

其他否决票：

- 华为：网站连登录都登录不了，简历投不了，非常乐
  - ps. 禁用 Adguard 后可登录
- 阿里：主要在杭州招。（后来感觉其实我应该投的，即使不一定能去，多面几次也是不错的经验）
- 美团、菜鸟、高德...：都是（都只有）移动端/后端，技术栈不匹配，不考虑

## 感想

- 不要投招聘网站上经常刷到的小公司。这么多毕业生，小公司又没有多少需求，那为什么一直都在招人呢？因为真的难过它们的面试，恨不得招的都是 ACM 金。
