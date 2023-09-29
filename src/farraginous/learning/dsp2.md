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
- 因果系统：与未来状态无关；$\displaystyle if\ n\ <0, h(n)=0$；收敛域向外；零点个数 <= 极点
- 稳定系统：输入有界输出也有界；h(n) 绝对可和（$<\infty$）；收敛域包含单位圆

$R_k(n)$ 为 $[0,k)$ 上的全 1 序列

周期性：对采样后信号求$\displaystyle \frac{2\pi}\omega$，分为三种情况判断：整数，整分式，无理。

### 采样

$\omega$ 为数字角频率，$\Omega$ 为模拟角频率；$\omega n, \Omega t$

$T_0$ 为原周期，$T$ 为采样周期；下标$_h$是截止频率，$_s$为 sampling.

- 采样角频率：$\displaystyle\Omega_s=\frac{2\pi}{T}$，即为采样信号的频谱间隔
- $\omega=\Omega T$，对同一下标成立。
- $\displaystyle\frac{\Omega}{\Omega_s}=\frac{f}{f_s}=\frac\omega{2\pi}$

时域采样后，频域被周期延拓了。

## z 变换

参考[信号与系统 - z 变换](./signals_and_systems.md#z-transform)

与 s 的关系：$\displaystyle z=e^{sT}$

收敛域：满足 $\displaystyle \sum_{n=-\infty}^{+\infty}|h(n)z^{-n}|<\infty$ 的 z 值区间。注意判明 `0` 处和 `∞` 处的值是否能取到。

### 反变换

1. 部分分式法，就是信号与系统学的方法。
2. 长除法，也需要判断收敛域（决定长除的延伸方向），然后进行多项式的硬除。

## DTFT

- 共轭对称序列：$\displaystyle x_e(n)=x_e^*(-n)$，即实部偶函数，虚部奇函数
- 共轭反对称序列 $x_o(n)$
- $\displaystyle\begin{cases} x(n)=x_e(n)+x_o(n)\\ x^*(-n)=x_e(n)-x_o(n)\end{cases}$
- $\displaystyle\begin{cases} DTFT[Re[x(n)]]=X_e(e^{j\omega})\\ DTFT[jIm[x(n)]]=X_o(e^{j\omega})\end{cases}$
- $\displaystyle\begin{cases} DTFT[x_e(n)]=Re[X(e^{j\omega})]\\ DTFT[x_o(n)]=jIm[X(e^{j\omega})]\end{cases}$

## 频率响应

$\displaystyle |H(e^{j\omega})|=A\cdot\frac{\prod c_rb}{\prod d_rb}$