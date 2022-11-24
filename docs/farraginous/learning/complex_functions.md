---
sidebar: 'auto'
---
# 复变函数与积分变换
## 计算
<span v-pre>$\large sinz=\frac{e^{iz}-e^{-iz}}{2i} \ , \ cosz=\frac{e^{iz}+e^{-iz}}{2}$</span>

<span v-pre>$lnz = ln|z| + iarg z \ , \ Lnz = lnz+i2k\pi$</span>

<span v-pre>$\large z^{1/n}=r^{1/n}[cos(\frac{1}{n}(\theta+2k\pi)) + isin(\frac{1}{n}(\theta+2k\pi))]$</span> &nbsp; k=0,1..=n-1

<span v-pre>$z^a=e^{aLnz}$</span>

## 解析与调和
Cauchy–Riemann equations: <span v-pre>$\large f(z)=u(x,y)+v(x,y) \ is \ holomorphic\Leftrightarrow \begin{cases}\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \\ \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}\end{cases}$</span> (u,v is differentiable)

Harmonic function: <span v-pre>$\large u(x,y) \ is \ harmonic \Leftrightarrow \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}=0$</span> (x, y is real, u is twice continuously differentiable function)

## 留数
奇点类型：<span v-pre>$\lim_{z\to z_0} f(z) = \begin{cases} 有限值 & 可去奇点 \\ \infty & 极点 \\ 不存在 & 本性奇点\end{cases}$</span>

留数定理：<span v-pre>$\large \oint_{C}{f(z)dz} = 2\pi i\sum Res[f(z),z_k]$</span>；如果f(z)在扩充复平面内只有有限个孤立奇点,
则f(z)在所有各奇点(包括∞点)的留数总和必等于零。

留数计算：<span v-pre>$\large Res[f(z),z_0] = \begin{cases} 0 & 可去奇点 \\ \lim_{z\to z_0}(z-z_0)f(z) & 一级极点 \\ \frac{P(z_0)}{Q'(z_0)} & 该值存在且不为0;一级极点;f(z) = \frac{P(z)}{Q(z)} \\ \frac{1}{(m-1)!}\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^{m}f(z)] & m级极点 \\ 洛朗展开 & 本性奇点 \end{cases}$</span>

无穷远点的留数：<span v-pre>$\large Res[f(z),\infty] = -Res[f(\frac{1}{z})\cdot\frac{1}{z^2},0]$</span>

## Fourier transform
Fourier transform: <span v-pre>$\large F(\omega)=\mathscr{F}(f(t))=\int_{-\infty}^{+\infty}f(t)e^{-i\omega t}dt$</span>

inverse Fourier transform: <span v-pre>$\large f(t)=\mathscr{F}^{-1}(F(\omega))=\frac{1}{2\pi}\int_{-\infty}^{+\infty}F(\omega)e^{i\omega t}d\omega$</span>

Dirichlet integral: <span v-pre>$\large \int_{0}^{+\infty}\frac{sin\omega}{\omega}d\omega=\frac{\pi}{2}$</span>

筛选性质: <span v-pre>$\large \int_{-\infty}^{+\infty}\delta(t-t_0)f(t)dt=f(t_0) \ \ \ \ \ \ (f(t)在t_0连续)$</span>