---
date: 2023-04-09
icon: wand-sparkles
category:
  - 编程
  - 教程
tag:
  - 工具
---

# 算法

虽然是 OIer，经验比较足，但是花时间太少，水平只能说一般。不想卷算法了，没什么兴趣，学到能应对面试的水平就差不多了。

论个人能力，比较擅长数据结构，暴力和骗分，不擅长动归图论数论<span class="heimu" title="你知道的太多了">这不是什么都不会了嘛！</span>。纯暴力神教，因此只会打 OI/IOI 赛制，不会打 ACM。

## 学习方法

我是看书入门，对入门级网络教程没什么评价。但是在有一定基础的条件下，建议看[OI wiki](https://oi.wiki/)，大家一起贡献的指南，深度肯定是足够的，不过讲得比较抽象，需要一定理解力。

刷题也很重要 ~~（我好像没有资格说出这句话）~~，看下面 [OJ](#oj)。

## OJ

用过一些 Online Judge。一般竞赛[洛谷](https://www.luogu.com.cn/)，面试[力扣](https://leetcode.cn/problemset/)。其他牛客，cf 都不用碰，没有太大意义。

简评一下：

- 洛谷基本全是 C++。测试点样例几乎不提供，错了也不知道错哪儿，不容易调试。
- 力扣无需关注读入，对某些语言比较友好；测试点样例全给。不过可能缺乏一些深度。
- cf 就垃圾了。

有关我对 OJ 的评价请[跳转此处](../gossip/hope.md#对算法竞赛-oj-contest的希望)。

## 竞赛技巧

打了几次蓝桥，几次 NOIP/CSP，算是有点小经验。

- 输入：快读好写，但我觉得没必要。。一般加点以下的就够用了。
  ```cpp
  std::ios::sync_with_stdio(false);
  std::cin.tie(nullptr);
  ```
  不过需要注意，（程序最后的）输出时需要 `std::cout << endl;` 以刷新缓冲区。（std::cerr 会自动刷新）
- 使用 `std::cerr` 输出调试信息。提交代码时不删调试语句不会影响结果。
- 写码
  - IDE：尽量使用 vscode（如果有的话），没有的话至少把底色调成黑的。盯 4h 白色屏幕眼睛真的受不住，会影响比赛状态的。
  - 重写代码或者换想法，先备份。
- 编译器
  - 暴力跑蓝桥填空题的时候记得开 `-O3`.（我一般比赛时常开的）
  - 别开 `-Wall`，~~警告能算错吗？~~
- 卡常：不能指望编译器帮你优化。~~反正比赛评测机`-Og`也不优化~~
  - 该传引用传引用。

## 数据结构

- STL 大法好，需要熟练运用 vector, deeue, priority_queue, unurdered_map, unordered_set 等。
  - vector 建议使用 `emplace_back()` 原地构造和使用 `resize()` 控制大小（注意 `resize()` != `reserve()`），初始化 `vector(int size,const t& value)` 和 initializer_list 构造。
- 插入和查询有一个是区间：树状数组
- 区间插入、区间查询：线段树（with lazy tag）
- 树和图：我一般使用 struct + vector 建树/建图。一般不会有太大问题，性能卡得实在死的话可以考虑前向星存图 ~~这个我脑子总是转不过来所以不想用~~

## 图论

- 最短路：dijkstra > SPFA + priority_queue（一般场景下没有负边权），我以前只用 SPFA 吃了亏。
- 最小生成树：kruskal + priority_queue。考得不多。
- lca：求树上距离的时候经常用。我学的是倍增法，有兴趣也可以看看 tarjan。

## 数论

### 素数

素数实在是太重要了。每次比赛几乎必定涉及的考点。

区间求素数一般埃氏筛够用了，也很好写。素数判断可以使用 [Miller Rabin](https://zhuanlan.zhihu.com/p/349360074)。

## external

1. [信息学竞赛 (OI) 究竟发生了什么？](https://www.bilibili.com/video/BV1di421f7L5)
