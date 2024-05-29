---
date: 2024-05-25
icon: physics
category:
  - 学习
tag:
  - 物理
---

# 电磁场与电磁波

我看的网课是[这个](https://www.bilibili.com/video/av417507556)。

## 基础

叉乘：右手螺旋，三阶矢量算三阶行列式，注意中间的分量是负号。（+-+）

叉乘的模是两向量形成的平行四边形面积，矢量混合积是六面体体积

注意不同坐标系的物理量实际位置。

$\displaystyle\frac{\partial\varphi}{\partial l}|_M=\frac{\partial\varphi}{\partial x}\cos\alpha+\frac{\partial\varphi}{\partial y}\cos\beta+\frac{\partial\varphi}{\partial z}\cos\gamma = \nabla\varphi\cdot\vec{l_0}$

$\nabla$ 算子运算法则与求导法则一致。$\nabla$ 算子在每个坐标的分量是该坐标拉梅系数倒数，根据这个可以简单背下在柱/球坐标系下的散度定义式。

[立体角](https://zh.wikipedia.org/wiki/%E7%AB%8B%E9%AB%94%E8%A7%92)：$\displaystyle \Omega =\iint _{S}{\frac {dA}{r^{2}}}=\iint _{S}{\frac {{\vec {r}}\cdot {\textrm {d}}{\vec {S}}}{\left|{\vec {r}}\right|\,r^{2}}}=\iint _{S}{\frac {{\vec {r}}\cdot {\textrm {d}}{\vec {S}}}{r^{3}}}$，封闭曲面的立体角 $= 4\pi$（求高斯定理使用）

### 三个度

标量场梯度：$\displaystyle\nabla r=\vec{r_0}, \nabla \frac1r=-\frac{\vec{r_0}}{r^2}$，可以按求导记忆。

通量：$\psi=\int_{s}\vec{A}\cdot d\vec{S}=\int_{s}\vec{A}\cdot\vec{n}dS$，闭合曲面改为 $\oint$（符号实际上代表二重积分）

散度：单位体积的通量 $\displaystyle div\vec{A}=\nabla\cdot\vec{A}=lim_{\Delta V\to 0}\frac{\oint_s\vec{A}\cdot d\vec{S}}{\Delta V}$

散度定理：$\int_V\nabla\cdot\vec{A}dV=\oint_s\vec{A}\cdot d\vec{S}$

环量： $\psi=\oint_{c}\vec{A}\cdot d\vec{l}=\oint_{c}A\cos\theta dl$，$\psi=0$ 对应无旋场。

旋度：矢量，环量面密度最大值 $rot\vec{A}=\nabla\times\vec{A}=\vec{n} \lim_{\Delta S\to0}\frac{\left|\oint_c\vec{A}\cdot d\vec{l}\right|_{\max}}{\Delta S}$

旋度定理（斯托克斯定理）：$\int_s\nabla\times\vec{A}\cdot d\vec{S}=\oint_c\vec{A}\cdot d\vec{l}$

两个恒等式：标量场的梯度的旋度恒等于 0 矢量($\nabla\times(\nabla\varphi)=\vec{0}$)，矢量场的旋度的散度恒等于 0 标量($\nabla\cdot(\nabla\times\vec{A})=0$)。

亥姆霍兹定理：场的分解。$\displaystyle\vec{F}=\vec{F_1}+\vec{F_2}=-\nabla\varphi+\nabla\times\vec{A}$；$F_1$ 无旋，$F_2$ 无源（无散）

## 静电磁场

[大物基础](./physics.md#电学)

[安培定律](./physics.md#磁场力)：$\displaystyle d\vec{F}=\frac{\mu_0}{4\pi}\frac{Id\vec{l}\times(I'd\vec{l}'\times\vec{R})}{R^3}$, $\vec{F}=\left(\oint_cId\vec{l}\right)\times\vec{B}$

毕奥-萨法尔定律：$\displaystyle \vec{B}=\frac{\mu_{0}}{4\pi}\oint_{c'}\frac{I'd\vec{l}'\times\vec{R}}{R^{3}}$

电流密度（面积微元）：$\vec{J}=\operatorname*{lim}_{\Delta S\to0}\frac{\Delta I}{\Delta S}\vec{n}=\frac{dI}{dS}\vec{n}$，电流是电流密度的通量

[高斯定理](https://zh.wikipedia.org/wiki/%E9%AB%98%E6%96%AF%E5%AE%9A%E5%BE%8B)：$\displaystyle \oint_S\vec{E}\cdot d\vec{S}=\frac q{\varepsilon_0}$

[静电场场方程](https://www.bilibili.com/video/BV1uV411H7xf/?p=60&t=106)（微分形式）：$\displaystyle\nabla\cdot\vec{E}=\frac{\rho}{\varepsilon_0}, \nabla\times\vec{E}=\vec{0}$

静磁场场方程：$\begin{aligned}&\nabla\cdot\vec{B}=0\\&\nabla\times\vec{B}=\mu_{0}\vec{J}\end{aligned}$ J 为体电流密度

[泊松方程](https://zh.wikipedia.org/wiki/%E6%B3%8A%E6%9D%BE%E6%96%B9%E7%A8%8B)

电位表达式 $\displaystyle\varphi(\vec{r})=\frac{1}{4\pi\varepsilon_{0}}\int_{V}\rho(\vec{r}^{\prime})\frac{1}{\left|\vec{r}-\vec{r}^{\prime}\right|}dV^{\prime}$
