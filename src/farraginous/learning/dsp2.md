---
sidebar: heading
date: 2023-09-22
category:
  - 学习
tag:
---

# 数字信号处理

教师：万永菁

## z 变换

参考[信号与系统 - z 变换](./signals_and_systems.md#z-transform)

与 s 的关系：$\displaystyle z=e^{sT}$

收敛域：满足 $\displaystyle \sum_{n=-\infty}^{+\infty}|h(n)z^{-n}|<\infty$ 的 z 值区间。注意判明 `0` 处和 `∞` 处的值是否能取到。

### 反变换

1. 部分分式法，就是信号与系统学的方法。
2. 长除法，也需要判断收敛域（决定长除的延伸方向），然后进行多项式的硬除。
