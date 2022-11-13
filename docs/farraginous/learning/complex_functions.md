---
sidebar: 'auto'
---
# 复变函数与积分变换
## 留数
奇点类型：<span v-pre>$\lim_{z\to z_0} f(z) = \begin{cases} 有限值 & 可去奇点 \\ \infty & 极点 \\ 不存在 & 本性奇点\end{cases}$</span>

留数定理：<span v-pre>$\large \oint_{C}{f(z)dz} = 2\pi i\sum Res[f(z),z_k]$</span>；如果f(z)在扩充复平面内只有有限个孤立奇点,
则f(z)在所有各奇点(包括∞点)的留数总和必等于零。

留数计算：<span v-pre>$\large Res[f(z),z_0] = \begin{cases} 0 & 可去奇点 \\ \lim_{z\to z_0}(z-z_0)f(z) & 一级极点 \\ \frac{P(z_0)}{Q'(z_0)} & 该值存在且不为0;一级极点;f(z) = \frac{P(z)}{Q(z)} \\ \frac{1}{(m-1)!}\lim_{z\to z_0}\frac{d^{m-1}}{dz^{m-1}}[(z-z_0)^{m}f(z)] & m级极点 \\ 洛朗展开 & 本性奇点 \end{cases}$</span>

无穷远点的留数：<span v-pre>$\large Res[f(z),\infty] = -Res[f(\frac{1}{z})\cdot\frac{1}{z^2},0]$</span>