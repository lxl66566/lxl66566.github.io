# Probability and Mathematical Statistics
概率论与数理统计。我看的网课是[孔祥仁](https://space.bilibili.com/453967238)的。
## 概率论基础
### 独立性
若 A,B 相互独立，则 {A,~A} 和 {B,~B} 相互独立。
## 分布
泊松分布：<span v-pre>$X\sim\pi(\lambda), P\{x=k\}=\large \frac{\lambda^k}{k!}\cdot e^{-\lambda}$</span>

泊松定理：若 n * p = λ，则（对任意 k） <span v-pre>$lim_{n\to+\infty}X\sim b(n,p)=X\sim\pi(\lambda)$</span> 一般地，n >= 20, p <= 0.05 时可近似计算。

几何分布：<span v-pre>$X\sim G(p), P\{x=k\}=(1-p)^{k-1}p$</span>

超几何分布：<span v-pre>$X\sim H(n,D,N), P\{x=k\}=\Large\frac{C_D^kC_{N-D}^{n-k}}{C_N^n}$</span>