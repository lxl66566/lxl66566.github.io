---
sidebar: 'auto'
---
# 复变函数与积分变换
## 基础计算
<span v-pre>$\large sinz=\frac{e^{iz}-e^{-iz}}{2i} \ , \ cosz=\frac{e^{iz}+e^{-iz}}{2}$</span>

<span v-pre>$lnz = ln|z| + iarg z \ , \ Lnz = lnz+i2k\pi$</span>

<span v-pre>$\large z^{1/n}=r^{1/n}[cos(\frac{1}{n}(\theta+2k\pi)) + isin(\frac{1}{n}(\theta+2k\pi))]$</span> &nbsp; k=0,1..=n-1

<span v-pre>$z^a=e^{aLnz}$</span>

## 解析与调和
~~(holomorphic and harmonic)~~

Cauchy–Riemann equations: <span v-pre>$\large f(z)=u(x,y)+v(x,y) \ is \ holomorphic\Leftrightarrow \begin{cases}\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \\ \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}\end{cases} \Leftarrow$</span> (u,v is differentiable)

Harmonic function: <span v-pre>$\large u(x,y) \ is \ harmonic \Leftrightarrow \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}=0 \Leftarrow$</span> (x, y is real, u is twice continuously differentiable function)

## 留数
奇点类型：<span v-pre>$\lim_{z\to z_0} f(z) = \begin{cases} 有限值 & 可去奇点 \\ \infty & 极点 \\ 不存在 & 本性奇点\end{cases}$</span>

留数定理：<span v-pre>$\large \oint_{C}{f(z)dz} = 2\pi i\sum Res[f(z),z_k]$</span>；如果f(z)在扩充复平面内只有有限个孤立奇点,
则f(z)在所有各奇点(包括∞点)的留数总和必等于零。

留数计算：<span v-pre>$\large Res[f(z),z_0] = \begin{cases} 0 & \small 可去奇点 \\ \lim_{z\to z_0}(z-z_0)f(z) & \small 一级极点 \\ \frac{P(z_0)}{Q'(z_0)} & \small 该值存在且不为0;一级极点;f(z) = \frac{P(z)}{Q(z)} \\ \frac{1}{(m-1)!}\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^{m}f(z)] & \small m级极点 \\ 洛朗展开 & \small 本性奇点 \end{cases}$</span>

无穷远点的留数：<span v-pre>$\large Res[f(z),\infty] = -Res[f(\frac{1}{z})\cdot\frac{1}{z^2},0]$</span>

### 解定积分

<span v-pre>$\large \int_{0}^{2\pi}R(cos\theta,sin\theta)d\theta = \oint_{|z|=1}R(\frac{z^2+1}{2z},\frac{z^2-1}{2iz})\frac{1}{iz}dz$</span>

<span v-pre>$\large \int_{-\infty}^{+\infty}\frac{P(z)}{Q(z)}dz = 2\pi i\sum Res[\frac{P(z)}{Q(z)},z_k] \ \ \Leftarrow \ \  z_k$</span> 为上半平面奇点，Q(z) 比 P(z) 高至少两次

<span v-pre>$\large \int_{-\infty}^{+\infty}\frac{P(z)}{Q(z)}e^{i\alpha z}dz = 2\pi i\sum Res[\frac{P(z)}{Q(z)}e^{i\alpha z},z_k] \ \ \ \Leftarrow \ \ z_k$</span> 为上半平面奇点，Q(z) 比 P(z) 高至少一次，P(x),Q(x) 为有理函数

### [儒歇定理](https://zh.m.wikipedia.org/zh/%E5%84%92%E6%AD%87%E5%AE%9A%E7%90%86)
## Fourier transform
Fourier transform: <span v-pre>$\large F(\omega)=\mathscr{F}(f(t))=\int_{-\infty}^{+\infty}f(t)e^{-i\omega t}dt$</span>

inverse Fourier transform: <span v-pre>$\large f(t)=\mathscr{F}^{-1}(F(\omega))=\frac{1}{2\pi}\int_{-\infty}^{+\infty}F(\omega)e^{i\omega t}d\omega$</span>

Dirichlet integral: <span v-pre>$\large \int_{0}^{+\infty}\frac{sin\omega}{\omega}d\omega=\frac{\pi}{2}$</span>

δ函数筛选性质: <span v-pre>$\large \int_{-\infty}^{+\infty}\delta(t-t_0)f(t)dt=f(t_0) \ \ \Leftarrow \small \ f(t)在t_0连续$</span>

位移性质：<span v-pre>$\large \begin{cases}\mathscr{F}(f(t\pm a))=e^{\pm i\omega a}F(\omega)\\ \mathscr{F}(e^{\pm i\omega_0 t}f(t))=F(\omega\mp\omega_0)\end{cases}$</span>

微分性质：<span v-pre>$\large \mathscr{F}(f'(t))=i\omega F(\omega) \ \Leftarrow\ \small lim_{|t| \to +\infty}f(t)=0$</span>

像函数的微分性质：<span v-pre>$\large \mathscr{F}(t^nf(t))=i^nF^{(n)}(\omega)$</span>

积分性质：<span v-pre>$\large \mathscr{F}(\int_{-\infty}^t f(t)dt)=\frac{1}{i\omega}F(\omega) \ \Leftarrow\ \small \int_{-\infty}^{+\infty}f(t)dt=0$</span>

对称性质：<span v-pre>$\large \mathscr{F}(F(t))=2\pi f(-\omega)$</span>

相似性质：<span v-pre>$\large \mathscr{F}(f(at))=\frac{1}{|a|}F(\omega/a)$</span>

翻转性质：<span v-pre>$\large \mathscr{F}(f(-t))=F(-\omega)$</span>

## Laplace transform
Laplace transform: <span v-pre>$\large F(s)=\mathscr{L}(f(t))=\int_{0}^{+\infty}f(t)e^{-st}dt$</span>

相似性质：<span v-pre>$\large \mathscr{L}(f(at))=\frac{1}{a}F(s/a)$</span>

微分性质：<span v-pre>$\large \mathscr{L}(f'(t))=sF(s)-f(0)$</span>

> 推论: <span v-pre>$ \mathscr{L}(f^{(n)}(t))=s^nF(s)-s^{(n-1)}f(0)-s^{(n-2)}f'(0)-...-f^{(n-1)}(0)$</span>

像函数的微分性质：<span v-pre>$\large F^{(n)}(s)=(-1)^n\mathscr{L}(t^nf(t))$</span>

积分性质：<span v-pre>$\large \mathscr{L}(\int_0^t f(t)dt)=\frac{1}{s}F(s)$</span>

象函数的积分性质：<span v-pre>$\large \int_s^{\infty}F(s)ds=\mathscr{L}(\frac{f(t)}{t})$</span>

位移性质：<span v-pre>$\large \mathscr{L}(e^{at}f(t))=F(s-a)$</span>

初值定理：f(t)在[0,+∞]可微，则<span v-pre>$\large \begin{cases}lim_{t \to 0}f(t)\\ f(0)\end{cases}=lim_{s\to\infty}sF(s)$</span>    （若存在）

终值定理：若sF(s)在Re(s)≥0的区域解析，<span v-pre>$\large \begin{cases}lim_{t \to \infty}f(t)\\ f(\infty)\end{cases}=lim_{s\to 0}sF(s)$</span>

inverse Laplace transform：<span v-pre>$\large f(t)=\frac{1}{2\pi i}\int_{\beta-i\infty}^{\beta+i\infty}F(s)e^{st}ds=\Sigma Res[F(s)e^{st},s_k], \ s_k$</span> is to the left of Re(s)=β

## 卷积
傅氏卷积：<span v-pre>$\large f_1(t) * f_2(t) = \int_{-\infty}^{\infty}f_1(\tau)f_2(t-\tau)d\tau$</span>&nbsp;&nbsp;&nbsp;（收敛）

拉氏卷积：<span v-pre>$\large f_1(t)*f_2(t) = \int_{0}^{t}f_1(\tau)f_2(t-\tau)d\tau\ \Leftarrow\ \small t<0时f_1(t)=f_2(t)=0$</span> 

卷积满足：交换律，结合律，分配率

（时域）卷积定理：<span v-pre>$ F[f_1(t)*f_2(t)]=F_1(w)\cdot F_2(w)$</span>

## 共形映射

<span v-pre>$旋转角=arg(f'(z_0)),伸缩率=|f'(z_0)|$</span>

共形映射定义：w=f(z) 在区域内保角，且为一一映射

> 推论：<span v-pre>$f(z)解析，f'(z_0)\neq 0 \Rightarrow f(z)在z_0处保角$</span>

