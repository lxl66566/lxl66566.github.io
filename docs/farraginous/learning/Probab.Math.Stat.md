# Probability and Mathematical Statistics
概率论与数理统计。我看的网课是[孔祥仁](https://space.bilibili.com/453967238)的。

`(...)` 表示此处表述不够严谨，若想完全掌握请自行学习。
## 概率论基础
### 独立性
若 A,B 相互独立，则 {A,~A} 和 {B,~B} 相互独立。
## 分布
求**概率分布**，就是求：分布函数 + 分布律（离散）/概率密度（连续）

分布函数：<span v-pre>$F(x)=P\{\xi\leq x\}$</span>
### 离散
二项分布，X ~ B(n,p)，期望：np，方差：np(1-p)

泊松分布：<span v-pre>$X\sim\pi(\lambda), P\{x=k\}=\large \frac{\lambda^k}{k!}\cdot e^{-\lambda}$</span>，期望：λ，方差：λ

> 泊松定理：(...) 若 n * p = λ，则（对任意 k） <span v-pre>$lim_{n\to+\infty}X\sim b(n,p)=X\sim\pi(\lambda)$</span> 一般地，n >= 20, p <= 0.05 时可近似计算。

几何分布：<span v-pre>$X\sim G(p), P\{x=k\}=(1-p)^{k-1}p$</span>，期望：1/p

超几何分布：<span v-pre>$X\sim H(n,D,N), P\{x=k\}=\Large\frac{C_D^kC_{N-D}^{n-k}}{C_N^n}$</span>

### 连续
概率密度：若连续型随机变量 X 有分布函数<span v-pre>$F(x)=\int_{-\infty}^xf(t)dt$</span>，则 f(t) 为概率密度

对于连续型随机变量，其概率在某点的取值为 0.

均匀分布：X ~ U(a,b)，期望：(a+b)/2，方差：<span v-pre>$\frac{(b-a)^2}{12}$</span>

指数分布：X ~ E(λ)，<span v-pre>$f(x)=\lambda e^{-\lambda x},x>0$</span>，分布函数 <span v-pre>$F(x)=1-e^{-\lambda x}$</span>，期望：1/λ，方差：1/λ^2

> 无记忆性质：P{X>t} = P{X>s+t|X>s}

正态分布：<span v-pre>$X\sim N(\mu,\sigma^2)：f(x)=\large\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$</span>，期望：μ，方差：<span v-pre>$\sigma^2$</span>

正态标准化：若 <span v-pre>$X\sim N(\mu,\sigma^2)，则Z=\frac{x-\mu}\sigma\sim N(0,1)$</span>，标准正态分布函数记为 Φ(x)

|2Φ(1)-1|2Φ(2)-1|2Φ(3)-1|
| :-: | :-: | :-: |
|0.6826|0.9544|0.9974|

### 函数
求函数的概率密度
1. 需要转化为分布函数再求解。
2. 设 X 有概率密度<span v-pre>$f_X(x),a<x<b$</span> ,g(x) 在 (a,b) 处处可导且严格单调，则 Y = g(X) 有概率密度 <span v-pre>$f_Y(y)=f_X(g^{-1}(y))|\frac{g^{-1} (y)}{dy}|\ \ \ \ \ \ \small g(a)<y<g(b)$</span>，其中 g(a) 与 g(b) 小的在前。其他位置概率密度为 0
## 数字特征
### 期望
E(C) = C（常数）

期望满足线性规律；

**独立变量**的积的期望 = 期望的积

函数的期望是函数与 分布律/概率密度 相乘再 求和/积分
### 方差
本质上是函数的期望。函数为 (X-EX)^2

计算公式 2：<span v-pre>$D(X)=E(X^2)-E^2(X)$</span>
#### 性质
<span v-pre>$D(CX)=C^2D(X)$</span>

<span v-pre>$D(X+Y)=D(X)+D(Y)+2E((X-EX)(Y-EY))$</span>，（若 X Y 独立，则最后一项为 0）

### 切比雪夫不等式
<span v-pre>$P\{|X-EX|\geq\varepsilon\}\leq\frac{DX}{\varepsilon^2}，\varepsilon$</span> 为任意大于 0 常数