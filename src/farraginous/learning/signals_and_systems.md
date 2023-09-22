---
sidebar: heading
date: 2023-03-03
category:
  - 学习
---

# 信号与系统

信号与系统的差异度非常大，同一教材不同大学的教学顺序、公式变量与考试重点千差万别。

我看的网课是浙大的胡浩基老师的[视频](https://www.bilibili.com/video/BV1g94y1Q76G)，优点是讲的非常细致，不管什么点全部讲一遍 + 推导一遍，缺点大概是时长太长了（网课有总计 55h）。对于我校的课程考试来说，不是很合适。

## 捷径与方法

- 待定系数法，[盖起来算其他](https://www.bilibili.com/video/BV1g94y1Q76G/?p=34&vd_source=71a6ca6eaedad249d0549081f1edfdec&t=9752)：盖一个待定分子，假设分母为 0，令另一个分子为原分子（拆分前），那个分数就是盖起来的分子
- -∞ 到 t 的积分可以看成卷积 u(t)

## 信号系统基础

- 信号
  - 能量信号：积分为有限值
  - 功率信号：积分无限
  - 因果信号：从 0 开始有值的信号
  - 双边信号：(-∞, +∞) 都有值的信号
  - [稳定信号](https://www.bilibili.com/video/BV1g94y1Q76G/?p=49&t=2628)：绝对可积，即绝对值积分有界
- 系统
  - 线性：齐次 + 可加。积分、微分都是线性运算。
  - 时不变：先延时后变换 = 先变换后延时。f(t) 内的 t 系数只能为 1 且 f(t) 系数需要是常数。
  - 因果：与未来的状态无关

## LTI System

> 此章节中的微分方程直接求解考试不一定考。

设 h(t) 为系统冲激响应，则任意信号的响应为其与 h(t) 的卷积。

系统稳定：<span v-pre>$\displaystyle \int_{-\infty}^{+\infty}|h(t)|dt < +\infty$</span>

## 卷积

与 u(t) 的卷积：通过门函数的选择作用，改变积分的上下限；其本身可不参与卷积。记得卷积结果要把 u(t) 加回去！

卷积的左侧起始是两函数的左侧起始相加。右侧同理。（在面对复杂卷积函数时可能失效）

与 δ(t) 的卷积：等于本身。若为 δ(t - x) 即为平移。

只要卷积函数不含 δ(t)，则卷积结果是不跳变的。（验算）

### 卷积性质

满足交换律，结合律，总体积分（微分）等于对其中之一积分（微分）

### 卷积样例

- 等宽方波的卷积是三角波，不等宽方波的卷积是梯形波。
- 对任意函数做积分相当于与 u(t) 的卷积（重要！）

## 傅里叶变换

### 离散傅里叶级数

::: details 非重点
内积：<span v-pre>$\displaystyle <f_1(t),f_2(t)>=\int_{t1}^{t2}f_1(t)f_2^*(t)dt$</span> （`*` 是共轭，不影响实函数）

正交：&lt;f1(t),f2(t)&gt;=0

最佳近似：对正交函数集有近似 <span v-pre>$\displaystyle f(t)\approx c_1g_1(t)+c_2g_2(t)+..., \text{则} c_i=\frac{<f(t),g_i(t)>}{<g_i(t),g_i(t)>}$</span>

从 1,cos(w0x),cos(2w0x),...,sin(w0x),sin(2w0x)... 中任取两个相乘并在 0-T0 上做定积分，结果均为 0。其互为正交基函数。
:::

<span v-pre>$\displaystyle \begin{cases}B_0=\frac{1}{T_0}\int_0^{T_0}f(x)dx \\ B_k=\frac2{T_0}\int_0^{T_0}f(x)cos(k\omega_0x)dx \\ C_k=\frac2{T_0}\int_0^{T_0}f(x)sin(k\omega_0x)dx\end{cases}$</span>

**复数形式**：<span v-pre>$\displaystyle x(t)=\sum_{k=-\infty}^{\infty}a_ke^{jk\omega_0t}, a_k=\frac{1}T\int_0^Tx(t)e^{-jk\omega_0t}dt$</span>

### 周期傅里叶

<span v-pre>$\displaystyle a_k=\frac{1}{T}F(jk\omega_0)=\frac{1}{T}\int_Tx(t)e^{-jk\omega_0}dt$</span>

周期函数的傅里叶变换：<span v-pre>$\displaystyle \mathscr{F}[ x(t) ]=2\pi\sum_{k=-\infty}^{\infty}a_k\delta(\omega-k\omega_0)$</span>

求解过程：

1. 对单个周期作傅里叶变换
2. 求 a_k
3. 写出 x(t)，前面的复数形式
4. 带入公式

### 连续傅里叶变换

定义式：[跳转复变函数](./complex_functions.md#fourier-transform)

::: details 非重点

狄利赫里条件：

1. 周期内绝对可积
2. 最值个数有限
3. 不连续点有限

常用公式

<span v-pre>$\displaystyle lim_{n\to +\infty}\frac{sin(\omega n)}{\omega}=\pi\delta(\omega),\int_{-\infty}^{+\infty}\frac{sin(\omega t)}{\omega}d\omega = \pi sgn(t)$</span>

<span v-pre>$\displaystyle \int_{-\infty}^{+\infty}f(t)dt=F(j0)$</span>
:::

### 基本变换

<span v-pre>$\displaystyle \mathscr{F}[ e^{-at}u(t) ]=\frac1{a+j\omega}\ \ \ \  (a>0)$</span>

<span v-pre>$\displaystyle \mathscr{F}[ \delta(t) ]=1,\mathscr{F}[ 1 ]=2\pi\delta(\omega)$</span>

<span v-pre>$\displaystyle \mathscr{F}[ g_\tau(t)]=\tau Sa(\frac\tau2\omega)$</span> 面积\*Sa(端点\*ω)

<span v-pre>$\displaystyle \mathscr{F}[ \frac{sin(\omega_0t) }{t}]=\pi g_{2\omega_0}(\omega)$</span>

<span v-pre>$\displaystyle \mathscr{F}[ cos(\omega_0t) ]=\pi[\delta(\omega+\omega_0) + \delta(\omega-\omega_0)]$</span>

<span v-pre>$\displaystyle \mathscr{F}[ sin(\omega_0t) ]=\frac\pi j[\delta(\omega-\omega_0) - \delta(\omega+\omega_0)]$</span>

<span v-pre>$\displaystyle \mathscr{F}[ u(t) ]=\frac1{j\omega}+\pi\delta(\omega)$</span>

### 性质

[跳转复变函数](./complex_functions.md#fourier-transform)

时域卷积 = 频域相乘； 时域相乘 = 频域卷积 / 2π

Parseval's theorem：<span v-pre>$\displaystyle \int_{-\infty}^{+\infty}|x(t)|^2dt=\frac{1}{2\pi}\int_{-\infty}^{+\infty}|X(j\omega)|^2d\omega$</span>

任意实函数的傅里叶变换实部偶函数，虚部奇函数。实偶对实偶，实奇对虚奇。

> 特殊变换 - 双边指数信号：<span v-pre>$\displaystyle \mathscr{F}[ e^{-a|t|} ]=\frac{2a}{a^2+\omega^2}$</span>

## 离散傅里叶（非重点）

本质：离散 -> 连续

离散： <span v-pre>$\displaystyle \mathscr{F}(x[n]) = X(e^{j\omega})=\sum X[n]e^{-j\omega n}$</span> 是一个 2π 为周期的函数。

<span v-pre>$\displaystyle X[n]=\frac1{2\pi}\int_{2\pi}X(e^{j\omega})e^{j\omega n}d\omega$</span>

### [基本变换](https://www.bilibili.com/video/BV1g94y1Q76G/?p=33)

<span v-pre>$\displaystyle \mathscr{F}[ a^nu[n] ]=\frac1{1-ae^{-j\omega}}\ \ \ \  (|a|\lt1)$</span>

<span v-pre>$\displaystyle \mathscr{F}[ \delta[n] ]=1$</span>

<span v-pre>$\displaystyle \mathscr{F}[ 1 ]=2\pi\sum_{k=-\infty}^{+\infty}\delta(\omega-2k\pi)$</span>

<span v-pre>$\displaystyle \mathscr{F}[ u[n+N]-u[n-N-1] ]=\frac{sin((N+1/2)\omega)}{sin(\frac12\omega)}$</span>

<span v-pre>$\displaystyle \mathscr{F}[ \frac{sin(\omega_0n)}{\pi n} ]=\sum g(\omega_0)$</span>（当 ω0 &gt; 2π 时，需要考虑叠加）

<span v-pre>$\displaystyle \mathscr{F}[ u[n] ]=\frac1{1-e^{-j\omega}}+\pi\sum_{k=-\infty}^{+\infty}\delta(\omega-2k\pi)$</span>

cos，sin 在[-π,π]上跟连续一样，其他部分周期重复

### 性质

重要概念：离散条件下，<span v-pre>$\displaystyle cos\pi n=e^{\pm j\omega n}=(-1)^n$</span>

基本与连续时的相同：线性性质，时移频移性质，微分，卷积

不同的：

- 时域扩展：<span v-pre>$\displaystyle x_{(k)}[n]=X(e^{j\omega k}), x_{(k)}[n]=x[n/k]$</span> 当且仅当 n%k==0（即离散扩宽）
- 调制性质：频域相乘 = 时域卷积 / 2π，卷积积分限为周期 2π。卷积的时候可能需要考虑其他周期的卷积重合影响。

### 应用

- 带宽 Bf = 脉宽的倒数 = Bw/2π，脉宽是（一个周期内）信号的宽度，Bw 是频域的第一个零点
- Nyquist frequency = 2 \* max frequency
- 调制：<span v-pre>$\displaystyle y(t)=\sum X_i(t)cos(w_{ci}t), X_i(t)$</span> 是 [-w0,w0) 的带限信号
- 解调：卷积低通滤波器：<span v-pre>$\displaystyle 2sin(w_pt)/\pi t, 2w_0<w_{ci}-w_{cj}, w_0<w_p<2w_{c1}-w_0$</span>
- 无失真系统幅频特性为水平直线，相频特性为“捺”斜线

#### 采样定理（非重点）

(Nyquist–Shannon) sampling theorem （[证明](https://www.bilibili.com/video/BV1g94y1Q76G?p=39)）：带限连续信号可以由 <span v-pre>$\displaystyle \omega_s>2\omega_m$</span>的采样频率的离散信号完美恢复（唯一确定）。

证明中间式：

1. 对 X(t) 的 T 周期冲激串采样的 Fourier transform：<span v-pre>$\displaystyle X_p(j\omega)=\frac1T\sum X(j(\omega-k\omega_s)), \omega_s=2\pi/T$</span> 为采样频率

Nyquist frequency: 2wm

## Laplace transform

计算拉式变换必须考虑收敛域

### 基本变换

<span v-pre>$\displaystyle \mathscr{L}[ e^{-at}u(t) ]=1/(s+a),\ \ \ Re(s)>-a$</span>

> （特例）<span v-pre>$\displaystyle \mathscr{L}[ u(t) ]=1/s,\ \ \ Re(s)>0$</span>

<span v-pre>$\displaystyle \mathscr{L}[ -e^{-at}u(-t) ]=1/(s+a),\ \ \ Re(s)<-a$</span>

<span v-pre>$\displaystyle \mathscr{L}[ \delta(t) ]=1$</span>

<span v-pre>$\displaystyle \mathscr{L}[ cos(\omega_0t)u(t) ]=s/(s^2+\omega_0^2),\ \ \ Re(s)>0$</span>

<span v-pre>$\displaystyle \mathscr{L}[ sin(\omega_0t)u(t) ]=\omega_0/(s^2+\omega_0^2),\ \ \ Re(s)>0$</span>

<span v-pre>$\displaystyle \mathscr{L}[ t^nu(t) ]=n!/s^{n+1},\ \ \ Re(s)>0$</span>

### 性质

见 [复变函数 - Laplace transform](./complex_functions.md#laplace-transform)

或[wikipedia](https://zh.wikipedia.org/zh-hans/拉普拉斯变换#性质和定理)

与傅里叶变换的联系：s=jw，可以直接互相代入

#### [收敛域性质](https://www.bilibili.com/video/BV1g94y1Q76G/?p=47&t=807)

- 收敛域为平行于 jw 轴的带状区域
- 收敛域无极点
- 绝对可积信号收敛域为全平面
- 右/左边信号收敛于最右/左边极点的右/左侧
- 双边信号收敛域为带状
- [稳定信号](#信号)收敛域包含 jw 轴

### 周期拉普拉斯

- 单边(0, +∞)：<span v-pre>$\displaystyle \mathscr{L}[ x(t) ]=\frac{1}{1-e^{sT}}X(s)$</span>，收敛域 R 交 Re(s)>0，X(s) 为单周期的变换

### 系统与微分方程

- 极点都在左半平面，则系统稳定
- 求 H(s)
- [画系统框图](https://www.bilibili.com/video/BV1g94y1Q76G/?p=52&t=2028)（不考）：二阶微分框图：左边从上到下是 1/a2, -a1, -a0；一阶的是 1/a1, -a0；
- 定理：系统 s 域函数 H(s)，若 <span v-pre>$\displaystyle x(t)=e^{s_0t}, s_0$</span>在收敛域内，则 y = H(s)x(t)
- zero-input response: x(t) = 0 while t > 0; y(0), y'(0) 有值
- zero-state response: x(t) 有值；y(0) = y'(0) = 0
  - [例题](https://www.bilibili.com/video/BV1g94y1Q76G/?p=53&t=4365)
- 全通网络的极点在左半平面，零点在对称的右半平面。
- 最小相移网络的极点在左半平面，零点在左半平面和 jw 轴。([source](https://www.bilibili.com/video/BV1ZB4y1q7Cr/?p=145&t=71))
- 画 s 域电路：电压源 / s, 电容 1/sC + Vc(0-)/s, 电感 Ls - L iL(0-)
- [根据零极点画幅频相频曲线](https://www.bilibili.com/video/BV1ZB4y1q7Cr/?p=141&t=444)

## Z-transform

<span v-pre>$\displaystyle X(z)=\sum x[n]z^{-n}=\mathscr{F}[ x[n]r^{-n} ]$</span>

<span v-pre>$\displaystyle x[n]=\frac{1}{2\pi j}\int_{\omega\in(0,2\pi]}X(z)z^{n-1}dz$</span>

### 基本变换

> 见 [wikipedia](https://zh.wikipedia.org/wiki/Z轉換#常见的Z变换对表ttps://zh.wikipedia.org/wiki/Z轉換#常见的Z变换对表)

<span v-pre>$\displaystyle a^nu[n] \rightarrow 1/(1-az^{-1}),|z|>|a|$</span>

<span v-pre>$\displaystyle -a^nu[-n-1] \rightarrow 1/(1-az^{-1}),|z|<|a|$</span>

### 性质

- 线性
- 移位性质：<span v-pre>$\displaystyle x[n-n_0] \rightarrow X(z)z^{-n_0}$</span>，收敛域不变

* > [单边移位公式](https://www.bilibili.com/video/BV1g94y1Q76G/?p=60&t=3258)

- z 域微分性质：<span v-pre>$\displaystyle nx[n] \rightarrow -zX'(z)$</span>，收敛域不变
- 序列指数加权：<span v-pre>$\displaystyle a^nx[n] \rightarrow X(z/a)$</span>，收敛域扩大 a 倍
- 时域扩展：<span v-pre>$\displaystyle x_{(k)}[n] \rightarrow X(z^k)$</span>，收敛域 R^{1/k}
- 卷积性质
- 累加性质：等于与 u[n] 卷积
- 与离散 fourier 的联系：z = e^jw
- 因果信号
  - 初值定理：<span v-pre>$\displaystyle x[0] \rightarrow X(+\infty)$</span>
  - 终值定理：<span v-pre>$\displaystyle x[+\infty] \rightarrow lim_{z\to 1}(z-1)X(z)$</span>

#### 收敛域性质

- 有限长序列，收敛域全平面
- 右/左/双边序列，收敛域圆外/内/环，不包括 `0` & `∞`
- 稳定序列：收敛域包含单位圆（充要）
- 相当于 Laplace 变换 jw 轴向负半轴折成单位圆

### 系统与差分方程

使用移位性质。

系统框图与 Laplace 框图大致相同。

解差分方程：默认为因果信号，单位样值响应即冲激响应，此时 Y(z) = H(z) （X(z)=1）

定理：系统 z 域函数 H(z)，若 <span v-pre>$\displaystyle x[n]=a^n, a$</span>在收敛域内，则 y = H(a)x(n)
