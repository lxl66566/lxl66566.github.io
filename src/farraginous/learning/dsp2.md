---
sidebar: heading
date: 2023-09-22
category:
  - 学习
---

# 数字信号处理

教师：万永菁

## 基础

系统分类（见 [信号与系统基础](./signals_and_systems.md#信号系统基础)）：

- 线性系统：$\displaystyle T[k_1x_1(n)+k_2x_2(n)]=k_1T[X_1(n)]+k_2T[X_2(n)]$
- 移不变系统：$\displaystyle T[x(n-m)]=y(n-m)$
- 因果系统：与未来状态无关；$\displaystyle if\ n\ <0, h(n)=0$
- 稳定系统：输入有界输出也有界；h(n) 绝对可和（$<\infty$）

$R_k(n)$ 为 $[0,k)$ 上的全 1 序列

## z 变换

参考[信号与系统 - z 变换](./signals_and_systems.md#z-transform)

与 s 的关系：$\displaystyle z=e^{sT}$

收敛域：满足 $\displaystyle \sum_{n=-\infty}^{+\infty}|h(n)z^{-n}|<\infty$ 的 z 值区间。注意判明 `0` 处和 `∞` 处的值是否能取到。

### 反变换

1. 部分分式法，就是信号与系统学的方法。
2. 长除法，也需要判断收敛域（决定长除的延伸方向），然后进行多项式的硬除。
