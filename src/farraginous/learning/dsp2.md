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

离散线性卷积，结果长度为 $N_1+N_2-1$

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

## 频率响应与滤波器

群延迟：某一个角频率 W1 的群延迟是在 W1 上的相频曲线的切线斜率 \*-1. $\displaystyle grd(\omega)=-\frac{d\theta(\omega)}{d\omega}$

$\displaystyle H(e^{j\omega})=A\cdot e^{j\omega(N-M)}\frac{\prod^M e^{j\omega}-c_r}{\prod^N e^{j\omega}-d_r}$ ，c 零 d 极

归一化：滤波器最大值设为 1
实系数：极点与零点最好关于 x 轴对称
因果性：零点个数不要大于极点个数，在原点补零

在单位圆上转一圈，频率走完 $f_s$

- 一阶滤波器：只有一个极点
- 数字谐振器：双峰带通，具有对称性；一对共轭极点和在 x 轴上的零点
- 数字陷波器：滤除指定频率，保留其他频率。在单位圆上的零点和极为接近零点的极点，越接近，阻带越窄
- 全通滤波器：幅频=常数，零点与极点共轭倒易，若实系数因果稳定则群延迟为正，相位响应递减
- 最小相位滤波器：零点极点均在单位圆内；最小相位滞后
  - 一般系统可以配成一个 _最小相位系统_ + _全通系统_

## FT

时域周期，频域离散。

时域离散，频域周期，周期为 $\Omega_s=2\pi f_s$，幅度变为 $\frac1T$

谱密度函数即为单周期内的频域连续函数

### DTFT

- 共轭对称序列：$\displaystyle x_e(n)=x_e^*(-n)$，即实部偶函数，虚部奇函数
- 共轭反对称序列 $x_o(n)$，即实部奇函数，虚部偶函数
- $\displaystyle\begin{cases} x(n)=x_e(n)+x_o(n)\\ x^*(-n)=x_e(n)-x_o(n)\end{cases}$
- $\displaystyle\begin{cases} DTFT[Re[x(n)]]=X_e(e^{j\omega})\\ DTFT[jIm[x(n)]]=X_o(e^{j\omega})\end{cases}$
- $\displaystyle\begin{cases} DTFT[x_e(n)]=Re[X(e^{j\omega})]\\ DTFT[x_o(n)]=jIm[X(e^{j\omega})]\end{cases}$

### DFS

时域、频域均为离散周期，时域周期为 $T_0$，间隔为 T；频域周期为 $f_s$，间隔为 $F_0$，$f_s=\frac{1}{T}$

定义式、性质只需要用 $\displaystyle \omega=\frac{2\pi}{k}N$ 代入 (I)DTFT 即可。

DFS：$\displaystyle \widetilde X(k)=\sum_{n=0}^{N-1}\widetilde x(n)e^{-j\frac{2\pi}Nkn}$

助记符：旋转因子 $\displaystyle W_n=e^{-j\frac{2\pi}N}$

### DFT

DFT：在 DFS 基础上只取主值，$\displaystyle X(k)=\sum_{n=0}^{N-1}x(n)W_N^{nk}, x(n)=\frac{1}{N}\sum_{n=0}^{N-1}X(k)W^{-nk}$

$x((n))_N=\widetilde x(n)$，表示周期

圆周（循环移位）：~~相当于传送门~~，先周期延拓，再移位，再取主值。$\displaystyle DFT[x((n+m))_N]=W^{-km}_NX(k)$

$DFT[R_N(n)]=N\delta(k)$（直流分量，重要！）

实部 DFT 得到（圆周）共轭对称的频谱；频谱实部 IDFT 得到（圆周）共轭对称的时域谱

圆周卷积的主值 N >= 线性卷积的长度，则两者相等；否则混叠。

### 长序列 DFT

指的是一个长序列和一个短序列 DFT。

- 重叠相加法：混叠发生在输出端
- 重叠保留法：混叠发生在输入端，需要舍弃前 N-1 （可能要舍去后面）

### 频域采样定理

当频域采样点数 >= 时域序列长度时才能不混叠。
