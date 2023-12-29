---
sidebar: heading
date: 2023-09-22
category:
  - 学习
---

# 数字信号处理

## 实验

见 [octave](../../coding/octave.md)

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

$\Omega = 2\pi f$

$T_0$ 为原周期，$T$ 为采样周期；下标$_h$是截止频率，$_s$为 sampling.（事实上下标有很多种，没有一一对应关系，例如后面会用 $_{st}$表示截止）

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
因果性：零点个数不要大于极点个数，在原点补极点

在单位圆上转一圈，频率走完 $f_s$

- 一阶滤波器：只有一个极点
- 数字谐振器：双峰带通，具有对称性；一对共轭极点和在 x 轴上的零点
- 数字陷波器：滤除指定频率，保留其他频率。在单位圆上的零点和极为接近零点的极点，越接近，阻带越窄
- 全通滤波器：幅频=常数，零点与极点共轭倒易，若实系数因果稳定则群延迟为正，相位响应递减
- 最小相位滤波器：零点极点均在单位圆内；最小相位滞后
  - 一般系统可以配成一个 _最小相位系统_ + _全通系统_
- 线性相位：零点以单位圆镜像对称

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

圆周移位很简单，不解释。求圆周卷积：先求线性卷积，再求圆周移位（混叠）。

$\displaystyle DFT[x((n+m))_N]=W^{-km}_NX(k)$

$DFT[R_N(n)]=N\delta(k)$（直流分量，重要！）

实部 DFT 得到（圆周）共轭对称的频谱；频谱实部 IDFT 得到（圆周）共轭对称的时域谱

- $\displaystyle x_{ep}(n)=\frac12[x((n))_N+x^*((N-n))_N]R_N(n)$

圆周卷积的主值 N >= 线性卷积的长度，则两者相等；否则混叠。

### 长序列 DFT

指的是一个长序列和一个短序列 DFT。

- 重叠相加法：混叠发生在输出端，每段做线性卷积后有混叠地相加
- 重叠保留法：混叠发生在输入端，需要舍弃前 N-1 （可能要舍去后面）。
  1. 每段有效长度为 M，再取段前的 $N-1$ 个点一起循环卷积。
  2. 舍弃所有结果的前 $N-1$ 个点，相加。

一般考点是在这两个方法下，[FFT](#fft) 的次数。注意重叠保留法次数 >= 重叠相加法（需要加上短序列长度再除 FFT 长度）。

### 频域采样定理

当频域采样点数 >= 时域序列长度时才能不失真。

内插函数。

## FFT

传统方法：复乘 $N^2$ 次，复加 N(N-1) 次。

基-2-FFT：复乘 $\frac{N}{2}log_2N$，复加 _2x 复乘_

## 滤波器

IIR：$\displaystyle\frac{\sum^M_{i=0}b_iz^{-i}}{1-\sum^N_{i=1}a_iz^{-i}}$, $a_i$ 至少有一个不为 0

FIR：没有极点，只有 IIR 的分子部分

线性相位：$\displaystyle H(e^{j\omega})=|H(e^{j\omega})|e^{-j\omega\alpha}$

设计巴特沃斯低通滤波器：算出阶数查表即可。公式不用背。具体的：

1. 转换技术指标，例如高通指标需要求倒数
2. 由公式算出$N,\Omega_C$
3. 查表得$H(p)$
4. 代入求 $H_a(s)$

FIR 滤波器的差分方程就是线性卷积表达式。直接写成 $x(n)=\sum_{k=0}^{N}h(k)x(n-k)$ 即可。

### IIR 设计

数字指标 ->（T=1，预畸）-> 模拟指标

#### 脉冲响应不变法

会混叠，只能用于低通或带通。

$\displaystyle H(s)=\sum \frac{A_i}{s-s_i} \rightarrow H(z)=\sum\frac{TA_i}{1-e^{s_iT}z^{-1}}$

T 的选取：$\displaystyle \Omega_{st}<\frac{\Omega_s}2,T<\frac{2\pi}{\Omega_s}$

#### 双线性变换法

预畸：$\displaystyle \Omega_0=\frac2T\cdot tan\frac{\omega_0}{2}$

$\displaystyle s=\frac2T\cdot\frac{1-z^{-1}}{1+z^{-1}}$

### FIR 设计

> 例子：学习通视频第二个末尾

线性相位的要求：

- 一类（$\theta(\omega)=-\tau\omega$）：$h(n)$ 关于 $\tau$ 偶对称，$\tau=$ n 上下界中心（$\frac{N-1}2$）。
- 二类（$\theta(\omega)=\beta_0-\tau\omega$）：~~偶对称~~ 奇对称，$\tau=$ n 上下界中心（$\frac{N}2$）

讨论 $h(n)$ 偶对称的情况（一类）：

- 奇数点：$\displaystyle H(\omega)=\sum_{n=0}^{\tau}a(n)cos(\omega n) \begin{cases} a(0)=h(\tau) \\ a(n)=2h(\tau-n) \end{cases}$
  - $H(\omega)$ 偶对称
- 偶数点：$\displaystyle H(\omega)=\sum_{n=0}^{\tau}b(n)cos(\omega (n-\frac12)),\ \ b(n)=2h(\tau-n)$
  - $H(\omega)$ 奇对称

讨论 $h(n)$ 奇对称的情况（二类）：

- 奇数点：$\displaystyle H(\omega)=\sum_{n=1}^{\tau}c(n)sin(\omega n), \ \ c(n)=2h(\tau-n)$
  - $H(\omega)$ 奇对称
- 偶数点：$\displaystyle H(\omega)=\sum_{n=1}^{\tau}d(n)sin(\omega (n-\frac12)),\ \ d(n)=2h(\tau-n)$
  - $H(\omega)$ 偶对称

线性相位最小群延迟即为 $\tau$，N = 零点个数 + 1

如果 $\omega=\pi$ 需要有值（高通、带阻），则 N 必须为奇数。

<!-- prettier-ignore -->
|/|h(n)偶对称，奇数个点|h(n)偶对称，偶数个点|h(n)奇对称，奇数个点|h(n) 奇对称，偶数个点|
|---|---|---|---|---|
|低通滤波器|√|√|×|×|
|带通滤波器|√|√|√|√|
|高通滤波器|√|×|×|√|
|带阻滤波器|√|×|×|×|

### 设计

窗函数设计法：

1. 求指标
2. 由 $\alpha_s$ 查表得窗类型和 N 值
3. 求 $\displaystyle h_d(n)=\frac{sin(\omega_c(n-\tau))}{\pi(n-\tau)}, \tau=\frac{N-1}2$
4. $h(n)=h_d(n)w(n)R_N(n)$

## 采样

- 下采样：先过抗混叠滤波器（宁缺毋滥），再抽取
- 上采样：补 0，然后过抗影像滤波器（截止频率 $\pi/L$）
  - 补 L 个零，压缩周期 $2\pi/L$，
