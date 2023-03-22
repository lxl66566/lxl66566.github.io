# 信号与系统
我看的网课是浙大的胡浩基老师的[视频](https://www.bilibili.com/video/BV1g94y1Q76G)，优点是讲的非常细致生动，缺点大概是时长太长了。
## 信号
能量信号：积分为有限值 功率信号：积分无限
## LTI System
> 注意，此章节中的微分方程直接求解考试不考。（考变换求解）

设 h(t) 为系统冲激响应，则任意信号的响应为其与 h(t) 的卷积。

> 课外知识：系统稳定：<span v-pre>$\int_{-\infty}^{+\infty}|h(t)|dt < +\infty$</span>
### 卷积
与 u(t) 的卷积：通过门函数的选择作用，改变积分的上下限；其本身可不参与卷积。记得卷积结果要把 u(t) 加回去！门函数本身的卷积是三角波。
 
卷积的左侧起始是两函数的左侧起始相加。右侧同理。（在面对复杂卷积函数时可能失效）

与 δ(t) 的卷积：等于本身。若为 δ(t - x) 即为平移。

只要卷积函数不含 δ(t)，则卷积结果是不跳变的。（验算）
#### 卷积性质
满足交换律，结合律，总体积分（微分）等于对其中之一积分（微分）
## 傅里叶变换
### 正交
内积：<span v-pre>$<f_1(t),f_2(t)>=\int_{t1}^{t2}f_1(t)f_2^*(t)dt$</span> （`*` 是共轭，不影响实函数）

正交：&lt;f1(t),f2(t)&gt;=0

最佳近似：对正交函数集有近似 <span v-pre>$f(t)\approx c_1g_1(t)+c_2g_2(t)+...，则 c_i=\frac{<f(t),g_i(t)>}{<g_i(t),g_i(t)>}$</span>

### 傅里叶级数
从 1,cos(w0x),cos(2w0x),...,sin(w0x),sin(2w0x)... 中任取两个相乘并在 0-T0 上做定积分，结果均为 0。其互为正交基函数。
### 公式
#### 离散
<span v-pre>$\begin{cases}B_0=\frac{1}{T_0}\int_0^{T_0}f(x)dx \\ B_k=\frac2{T_0}\int_0^{T_0}f(x)cos(k\omega_0x)dx \\ C_k=\frac2{T_0}\int_0^{T_0}f(x)sin(k\omega_0x)dx\end{cases}$</span>

复数形式：<span v-pre>$x(t)=\sum_{k=-\infty}^{\infty}a_ke^{jk\omega_0t}, a_k=\frac{1}{T_0}\int_0^{T_0}x(t)e^{-jk\omega_0t}dt$</span>
#### 连续
[跳转复变函数](./complex_functions.md#fourier-transform)
### 条件
狄利赫里条件：
1. 周期内绝对可积
2. 最值个数有限
3. 不连续点有限
### 常见变换
<span v-pre>$\mathscr{F}[ e^{-at}u(t) ]=\frac1{a+j\omega}$</span>

<span v-pre>$\mathscr{F}[ \delta(t) ]=1,\mathscr{F}[ 1 ]=2\pi\delta(\omega)$</span>

<span v-pre>$\mathscr{F}[ E[u(t+\frac{\tau}{2}) - u(t-\frac{\tau}{2})]]=E\tau Sa(\frac\tau2\omega)=\large \frac{2Esin(\frac\tau2\omega)}{\omega}$</span>

<span v-pre>$\mathscr{F}[ \frac{sin(\omega_ct)}{\pi t} ]\normalsize =u(t+\omega_c) - u(t-\omega_c)$</span>

<span v-pre>$\mathscr{F}[ cos(\omega_0t)]=\pi[\delta(\omega+\omega_0) + \delta(\omega-\omega_0)]$</span>

<span v-pre>$\mathscr{F}[ sin(\omega_0t)]=\frac\pi j[\delta(\omega-\omega_0) - \delta(\omega+\omega_0)]$</span>

<span v-pre>$\mathscr{F}[ u(t) ]=\frac1{j\omega}+\pi\delta(\omega)$</span>