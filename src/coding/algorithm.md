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

- long long
  ```cpp
  typedef long long ll;
  ```
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
  - 该传引用传引用，该用 move 用 move。

## 基础

- [快排原理](https://github.com/sisterAn/JavaScript-Algorithms/issues/70)

## 数据结构

- STL 大法好，需要熟练运用 vector, deeue, priority_queue, unurdered_map, unordered_set 等。
  - vector 建议使用 `emplace_back()` 原地构造和使用 `resize()` 控制大小（注意 `resize()` != `reserve()`），初始化 `vector(int size,const t& value)` 和 initializer_list 构造。
  - 优先队列有三个 template type，容易忘，但是很重要，很多算法都会用到。
- 插入和查询有一个是区间：树状数组
- 区间插入、区间查询：线段树（with lazy tag）
- 树和图：我一般使用 struct + vector 建树/建图。一般不会有太大问题，性能卡得实在死的话可以考虑前向星存图 ~~这个我脑子总是转不过来所以不想用~~

## 图论

- 最短路：dijkstra > SPFA + priority_queue（dijkstra 不能用于负边权，但是一般场景下不会有），我以前只用 SPFA 吃了亏。
  - [为什么用 SPFA 会吃亏？](https://zh.wikipedia.org/wiki/最短路径快速算法#最坏情况下的性能) 真有点没绷住
  - 但是 dijkstra 老忘（一说蓝白点就想到<heimu>蓝白碗</heimu>）。注意，每次找离**源节点**距离最近的点更新。
- 最小生成树：考得不多。优先队列存边 + 并查集。
- lca：求树上距离的时候经常用。我学的是倍增法，有兴趣也可以看看 tarjan。

## 数论

### 素数

素数实在是太重要了。每次比赛几乎必定涉及的考点。

区间求素数一般埃氏筛够用了，也很好写。素数判断可以使用 [Miller Rabin](https://zhuanlan.zhihu.com/p/349360074)。

## 模板

一些常用模板，如果背下来的话可以省时间。

### gcd

C++17 后有 `std::gcd` 和 `std::lcm`，不过显然在做题时是没有 C++17 用的。

```cpp
ll gcd(ll a, ll b) { return b == 0 ? a : gcd(b, a % b); }
```

### permutation

如果使用 \>=C++11 / Python，可以很简单地使用标准库：

::: tabs

@tab C++

```cpp
#include <algorithm>
do
{}
while (std::next_permutation(s.begin(), s.end()));
```

@tab Python

```py
from itertools import permutations
for p in permutations([1, 2, 3]):
    print(p)
```

:::

但是在其他语言就得手写 permutation 了。

::: tabs

@tab Rust

```rust
fn permute<T: std::fmt::Debug>(arr: &mut Vec<T>, start: usize) {
    if start == arr.len() - 1 {
        println!("{:?}", arr);
    } else {
        for i in start..arr.len() {
            arr.swap(start, i);
            permute(arr, start + 1);
            arr.swap(start, i); // backtrack
        }
    }
}
fn main() {
    let mut arr = vec![1, 2, 3];
    permute(&mut arr, 0);
}
```

@tab TypeScript

```ts
function permute<T>(arr: T[], callback: (arr: readonly T[]) => void) {
  const backtrack = (start: number) => {
    if (start === arr.length - 1) {
      callback(arr);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap
      backtrack(start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]]; // Backtrack
    }
  };
  backtrack(0);
}
const arr = [1, 2, 3];
permute(arr, console.log);
```

:::

总之，如果不是竞赛，只是一个在线 OJ 笔试，那肯定是用越方便的语言越好。如果你很熟练，快速糊一个 permutation 也无妨。

### 背包问题

基础背包：

```cpp
for (int i = 0; i < n; ++i) {
    for (int j = capacity; j >= weights[i]; --j) {
        dp[j] = std::max(dp[j], dp[j - weights[i]] + values[i]);
    }
}
```

完全背包（仅需要修改遍历顺序）：

```cpp
for (int i = 0; i < n; ++i) {
    for (int j = weights[i]; j <= capacity; ++j) {
        dp[j] = std::max(dp[j], dp[j - weights[i]] + values[i]);
    }
}
```

而其他背包问题基本都是可拆的。

### 树状数组

单点加，区间和

```cpp
inline ll lowbit(ll x) { return x & (-x); }
void add(ll x, ll k) {
  for (int i = x; i <= n; i += lowbit(i))
    s[i] += k;
}
ll sum(ll x) // [1, x]
{
  ll tmp = 0;
  for (int i = x; i; i -= lowbit(i))
    tmp += s[i];
  return tmp;
}
```

### 并查集

```cpp
int fa(int i) {
  if (i == father[i])
    return i;
  else
    return father[i] = fa(father[i]);
}
```

## 我出的题

大一的时候来了兴致，随便出的一点。当乐子看吧（

[download](https://github.com/lxl66566/lxl66566.github.io/releases/download/storate/AbsoluteX.s_confusion.pdf)

## external

1. [信息学竞赛 (OI) 究竟发生了什么？](https://www.bilibili.com/video/BV1di421f7L5)
