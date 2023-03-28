# Probability and Mathematical Statistics
概率论与数理统计。我看的网课是[孔祥仁](https://space.bilibili.com/453967238)的。

`(...)` 表示此处表述不够严谨，若想完全掌握请自行学习。
## 概率论基础
### 独立性
若 A,B 相互独立，则 {A,~A} 和 {B,~B} 相互独立。
## 分布
求**概率分布**，就是求：分布函数 + 分布律（离散）/概率密度（连续）
### 离散
泊松分布：<span v-pre>$X\sim\pi(\lambda), P\{x=k\}=\large \frac{\lambda^k}{k!}\cdot e^{-\lambda}$</span>

泊松定理：(...) 若 n * p = λ，则（对任意 k） <span v-pre>$lim_{n\to+\infty}X\sim b(n,p)=X\sim\pi(\lambda)$</span> 一般地，n >= 20, p <= 0.05 时可近似计算。

几何分布：<span v-pre>$X\sim G(p), P\{x=k\}=(1-p)^{k-1}p$</span>

超几何分布：<span v-pre>$X\sim H(n,D,N), P\{x=k\}=\Large\frac{C_D^kC_{N-D}^{n-k}}{C_N^n}$</span>

分布函数：<span v-pre>$F(x)=P\{\xi\leq x\}$</span>
### 连续
概率密度：若连续型随机变量 X 有分布函数<span v-pre>$F(x)=\int_{-\infty}^xf(t)dt$，则 f(t) 为概率密度</span>

对于连续型随机变量，其概率在某点的取值为 0.

均匀分布：X ~ U(a,b)

指数分布：X ~ E(λ)，<span v-pre>$f(x)=\lambda e^{-\lambda x},x>0$</span>，分布函数 <span v-pre>$F(x)=1-e^{-\lambda x}$</span>，具有无记忆性质：P{X>t} = P{X>s+t|X>s}

正态分布：<span v-pre>$X\sim N(\mu,\sigma^2)：f(x)=\large\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$</span>

正态标准化：若 <span v-pre>$X\sim N(\mu,\sigma^2)，则Z=\frac{x-\mu}\sigma\sim N(0,1)$</span>，标准正态分布函数记为 Φ(x)

|2Φ(1)-1|2Φ(2)-1|2Φ(3)-1|
| :-: | :-: | :-: |
|0.6826|0.9544|0.9974|