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

### 三个度

标量场梯度：$\displaystyle\nabla r=\vec{r_0}, \nabla \frac1r=-\frac{\vec{r_0}}{r^2}$，可以按求导记忆。

通量：$\psi=\int_{s}\vec{A}\cdot d\vec{S}=\int_{s}\vec{A}\cdot\vec{n}dS$，闭合曲面改为 $\oint$（符号实际上代表二重积分）

散度：单位体积的通量 $\displaystyle div\vec{A}=\nabla\cdot\vec{A}=lim_{\Delta V\to 0}\frac{\oint_s\vec{A}\cdot d\vec{S}}{\Delta V}$

散度定理：$\int_V\nabla\cdot\vec{A}dV=\oint_s\vec{A}\cdot d\vec{S}$

环量： $\psi=\oint_{c}\vec{A}\cdot d\vec{l}=\oint_{c}A\cos\theta dl$，$\psi=0$ 对应无旋场。

旋度：矢量，环量面密度最大值 $rot\vec{A}=\nabla\times\vec{A}=\vec{n} \lim_{\Delta S\to0}\frac{\left|\oint_c\vec{A}\cdot d\vec{l}\right|_{\max}}{\Delta S}$

旋度定理（斯托克斯定理）：$\int_s\nabla\times\vec{A}\cdot d\vec{S}=\oint_c\vec{A}\cdot d\vec{l}$

两个恒等式：标量场的梯度的旋度恒等于 0 矢量($\nabla\times(\nabla\varphi)=\vec{0}$)，矢量场的旋度的散度恒等于 0 标量($\nabla\cdot(\nabla\times\vec{A})=0$)。

亥姆霍兹定理：场的分解。$\vec{F}=\vec{F_1}+\vec{F_2}=-\nabla\varphi+\nabla\times\vec{A}$；$F_1$ 无旋，$F_2$ 无源（无散）

## 静电场

[大物基础](./physics.md#电学)
