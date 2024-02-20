---
sidebar: heading
date: 2023-03-14
category:
  - 学习
tag:
  - 数学
---

# Probability and Mathematical Statistics

概率论与数理统计。我看的网课是[孔祥仁](https://space.bilibili.com/453967238)的。概率论东西真不多，多刷题就完了，题型比较死。

`(...)` 表示此处表述不够严谨，若想完全掌握请自行学习。

## 工具

[分布计算器](https://www.statskingdom.com/zh-Hans/2distributions-zhhans.html)：计算标准正态分布

## 概率论基础

独立性：若 A,B 相互独立，则 {A,~A} 和 {B,~B} 相互独立。

## 分布

求**概率分布**，就是求：分布函数 + 分布律（离散）/概率密度（连续）

分布函数：<span v-pre>$\displaystyle F(x)=P\{\xi\leq x\}$</span>

### 离散

二项分布，X ~ B(n,p)，期望：np，方差：np(1-p)

泊松分布：<span v-pre>$\displaystyle X\sim\pi(\lambda), P\{x=k\}=\frac{\lambda^k}{k!}\cdot e^{-\lambda}$</span>，期望：λ，方差：λ

> 泊松定理：(...) 若 n \* p = λ，则（对任意 k） <span v-pre>$\displaystyle lim_{n\to+\infty}X\sim b(n,p)=X\sim\pi(\lambda)$</span> 一般地，n >= 20, p <= 0.05 时可近似计算。

> 泊松分布可加性：X,Y 独立，各自服从 π(λ1),π(λ2)，则 Z=X+Y 服从 π(λ1 + λ2)

几何分布：<span v-pre>$\displaystyle X\sim G(p), P\{x=k\}=(1-p)^{k-1}p$</span>，期望：1/p

超几何分布：<span v-pre>$\displaystyle X\sim H(n,D,N), P\{x=k\}=\frac{C_D^kC_{N-D}^{n-k}}{C_N^n}$</span>

### 连续

概率密度：若连续型随机变量 X 有分布函数<span v-pre>$\displaystyle F(x)=\int_{-\infty}^xf(t)dt$</span>，则 f(t) 为概率密度

对于连续型随机变量，其概率在某点的取值为 0.

均匀分布：X ~ U(a,b)，期望：(a+b)/2，方差：<span v-pre>$\displaystyle \frac{(b-a)^2}{12}$</span>

指数分布：X ~ E(λ)，<span v-pre>$\displaystyle f(x)=\lambda e^{-\lambda x}, x>0$</span>，分布函数 <span v-pre>$\displaystyle F(x)=1-e^{-\lambda x}$</span>，期望：1/λ，方差：1/λ^2

> 无记忆性质：P{X>t} = P{X>s+t|X>s}

正态分布：<span v-pre>$\displaystyle X\sim N(\mu,\sigma^2): f(x)=\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$</span>，期望：μ，方差：<span v-pre>$\displaystyle \sigma^2$</span>

正态标准化：若 <span v-pre>$\displaystyle X\sim N(\mu,\sigma^2), \text{则}Z=\frac{x-\mu}\sigma\sim N(0,1)$</span>，标准正态分布函数记为 Φ(x)

| 2Φ(1)-1 | 2Φ(2)-1 | 2Φ(3)-1 |
| :-----: | :-----: | :-----: |
| 0.6826  | 0.9544  | 0.9974  |

### 函数

求函数的概率密度

1. 需要转化为分布函数再求解。
2. 设 X 有概率密度<span v-pre>$\displaystyle f_X(x), a<x<b$</span> ,g(x) 在 (a,b) 处处可导且严格单调，则 Y = g(X) 有概率密度 <span v-pre>$\displaystyle f_Y(y)=f_X(g^{-1}(y))|\frac{g^{-1} (y)}{dy}|\ \ \ \ \ \ g(a)<y<g(b)$</span>，其中 g(a) 与 g(b) 小的在前。其他位置概率密度为 0

## 数字特征

### 期望

- EC = C
- 期望满足线性规律；

**独立变量**的积的期望 = 期望的积

函数的期望是函数与 分布律/概率密度 相乘再 求和/积分

### 方差

本质上是函数的期望。函数为 (X-EX)^2

计算公式 2：<span v-pre>$\displaystyle D(X)=E(X^2)-E^2(X)$</span>

- <span v-pre>$\displaystyle D(CX)=C^2D(X)$</span>
- D(X+Y)=D(X)+D(Y)+2[cov(X,Y)](#协方差)，（若 X,Y 独立，则 cov(X,Y) 为 0）

### 协方差

cov(X,Y) = E((X-EX)(Y-EY)) = E(XY) - EXEY

- cov(X,X) = DX
- cov(CX,Y) = Ccov(X,Y)
- cov(X+Y,Z) = cov(X,Z) + cov(Y,Z)

### 相关系数

<span v-pre>$\displaystyle \rho_{XY} = \frac{cov(X,Y)}{\sqrt{DX} \sqrt{DY}},|\rho|\leq 1,\rho$</span> =1 时即为线性关系。

独立 => 不相关，不相关 !=> 独立。特例：当 X,Y ~ N(μ1,μ2,...) 时可互推。

## 二维

边缘概率密度 = 联合概率密度在 R 上对另一自变量积分。

联合能求边缘，边缘不能求联合

条件概率密度：<span v-pre>$\displaystyle f_{X|Y}(x|y)=f(x,y)/f_Y(y)$</span> （联合概率密度 / 边缘概率密度）

独立性判断：

- 离散：<span v-pre>$\displaystyle P_{ij}=\Sigma P_i\cdot\Sigma P_j$</span>
- 连续：<span v-pre>$\displaystyle f(x,y)=f_X(x)\cdot f_Y(y)$</span>
  - 对分布函数也适用

### 函数

- Z=X+Y，则<span v-pre>$\displaystyle f_Z(z)=\int_{-\infty}^{+\infty}f(z-y,y)dy$</span> （也可类比对 X 积分）若 X，Y 独立，还可写成 <span v-pre>$\displaystyle f_Z(z)=\int_{-\infty}^{+\infty}f_X(z-y)f_Y(y)dy$</span>（卷积公式）
- Z=aX+bY，则<span v-pre>$\displaystyle f_Z(z)=\int_{-\infty}^{+\infty}\frac1{|b|}f(x,\frac{z-ax}{b})dx = \int_{-\infty}^{+\infty}\frac1{|a|}f(\frac{z-by}{a},y)dy$</span>
- Z=XY，则<span v-pre>$\displaystyle f_Z(z)=\int_{-\infty}^{+\infty}\frac1{|x|}f(x,\frac{z}{x})dx =$</span>...
- Z=X/Y，类比
- Z=max{X,Y...} 且 XY... 独立，则 <span v-pre>$\displaystyle F_Z(z)=\prod F_{...}(z)$</span>
- Z=min{X,Y...} 且 XY... 独立，则 <span v-pre>$\displaystyle F_Z(z)=1-\prod (1-F_{...}(z))$</span>

### 多维正态

<span v-pre>$\displaystyle if X_1\sim N(\mu_1,\sigma_1^2) and X_2\sim N(\mu_2,\sigma_2^2)\text{独立}, \text{则}\sum X\sim N(\sum\mu,\sum(\sigma^2))$</span> （对线性组合成立）

正态变量具有线性变换不变性，即多维正态变量的线性组合也服从正态分布；多维正态变量的线性函数也服从正态分布

多个多维正态变量若相互独立，则各变量之间不相关

### 矩

- k 阶原点矩：<span v-pre>$\displaystyle Ex^k=E(x-0)^k$</span>
- k 阶中心矩：<span v-pre>$\displaystyle E(x-Ex)^k$</span>
  :::tip
  以下为数理统计内容
  :::

## inequalities

- Markov's inequality：<span v-pre>$\displaystyle \mathrm {P} (X\geq a)\leq {\frac {\mathrm {E} (X)}{a}}$</span>
- Chebyshev's Inequality：<span v-pre>$\displaystyle P\{|X-EX|\geq\varepsilon\}\leq\frac{DX}{\varepsilon^2}, \varepsilon\geq0$</span>

## [Law of large numbers](https://en.wikipedia.org/wiki/Law_of_large_numbers)

- Bernoulli's theorem (LLN)：_频率_ 概率收敛于 _概率_
  > Today, Bernoulli’s law of large numbers is also known as the weak law of large numbers. —— Bernoulli’s Law of Large Numbers, Erwin Bolthausen∗ and Mario V. W¨uthrich†
- Weak Law (also Khinchin's law)：_均值_ 概率收敛于 _期望值_ （独立同分布）

## Central limit theorem

- [De Moivre–Laplace theorem](https://en.wikipedia.org/wiki/De_Moivre–Laplace_theorem)：<span v-pre>$\displaystyle {\displaystyle \left(X\!\,-\!\,np\right)\!/\!{\sqrt {np(1-p)}}} \xrightarrow {d} \ {\mathcal {N}}(0,1)$</span>
- [Lindeberg CLT](https://zh.wikipedia.org/wiki/中心极限定理#林德伯格－列维定理)：（独立同分布）<span v-pre>$\displaystyle {\frac {{\bar {X}}-EX }{\sigma /{\sqrt {n}}}}\xrightarrow {d} \ {\mathcal {N}}(0,1).$</span>
- [Lyapunov CLT](https://en.wikipedia.org/wiki/Central_limit_theorem#Lyapunov_CLT)：（独立，满足...条件）<span v-pre>$\displaystyle s_{n}^{2}=\sum _{i=1}^{n}\sigma _{i}^{2},\displaystyle {\frac {1}{s_{n}}}\,\sum _{i=1}^{n}\left(X_{i}-EX_{i}\right) \ \xrightarrow {d} \ {\mathcal {N}}(0,1).$</span>

## 抽样

- 样本方差是除以 n-1 的
- [经验分布函数](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=67&t=1499)
- Glivenko–Cantelli Theorem: n → ∞，经验分布函数趋于分布函数

### [箱线图](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=66&t=1991)

不是重点；需要掌握分位数的求法。

### distribution

- χ²-distribution：χ²(n) 为 n 个（总体为服从标准正态分布的变量的抽样）的平方和，n 称为自由度
  - 期望：n，方差：2n
  - X,Y ~ χ²(n), χ²(m) 且相互独立，则 X+Y ~ χ²(n+m)
  - <span v-pre>$\displaystyle \frac{(n-1)S^2}{\sigma^2}=\chi^2(n-1)$</span>
- Student's t-distribution: X~N(0,1), Y~ χ²(n) 且独立，t=<span v-pre>$\displaystyle \frac{X}{\sqrt{Y/n}}$</span> ~ t(n)
  - E = 0, D = n/(n-2)
  - n → ∞, t ~ N(0,1)
- [F-distribution](https://zh.wikipedia.org/wiki/F-分布#特征)
  - E = <span v-pre>$\displaystyle \frac{n_2}{n_2-2}$</span>
  - [性质](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=70&t=623)

### 其他性质

总体 X 均值 μ 方差 σ 则<span v-pre>$\displaystyle E\bar X=\mu,D\bar X=\sigma^2/n,ES_{n-1}^2=\sigma^2,DS_{n-1}^2=\frac{2\sigma^4}{n-1}$</span>

[四个定理](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=73&t=1096)

<span v-pre>$\displaystyle \frac{(n-1)S_{n-1}^2}{\sigma^2}\sim\chi(n-1)$</span>

<span v-pre>$\displaystyle \frac{\bar X-\mu}{S_{n-1}}\sqrt n\sim t(n-1)$</span>

<span v-pre>$\displaystyle \frac{S_x^2/\sigma_1^2}{S_y^2/\sigma_2^2}\sim F(m-1,n-1)$</span>

## 参数估计

### 矩估计

有几个变量就作几阶原点矩

[例题：求矩估计量](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=77&t=1372)

### 最大似然估计

已知观测值，估计参数

[例题](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=78&t=1416)

### 评选标准

- 无偏性：<span v-pre>$\displaystyle E\hat\theta=\theta,\hat\theta\text{为}\theta$</span> 的无偏估计
- 有效性：都是无偏估计，则方差更小的估计更加有效
- 相合性：当 n → ∞ 时，估计量依概率收敛于某值。

### 置信区间

[例题](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=84&t=231) | [正态估均值通解](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=85&t=1398) | 下一节为正态估方差通解

## 参数检验

### 正态检验

解题步骤：

1. 设 H0, H1 并判断是否进入 H1
2. 判断是否落在拒绝域内。

#### 拒绝域

均值检验：总体方差已知，构造正态检验量<span v-pre>$\displaystyle \frac{\bar X-\mu_0}{\sigma/\sqrt{n}}$</span>; 未知, 构造 t 分布检验量<span v-pre>$\displaystyle \frac{\bar X-\mu_0}{s/\sqrt{n}}$</span>

[各种拒绝域的判断](https://www.bilibili.com/video/BV1hD4y1b7Y4/?p=94&t=556)

之后还有方差检验。
