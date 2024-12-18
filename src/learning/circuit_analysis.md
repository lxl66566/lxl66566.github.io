---
date: 2022-12-26
icon: circle-nodes
category:
  - 学习
tag:
  - 电子与电路
---

# 电路分析基础

此处仅记载部分重要内容。更多内容请前往查看[Github - 电子与电路分析\_复习纲要](https://github.com/lxl66566/my-college-files/blob/main/电路原理及其实验/课件/电路分析_复习纲要.pdf)。

## 分析法

### 回路电流法

自电阻\*自电流 + 互电阻\*互电流（同向为正） = 压升

### 结点电压法

> 第一步：把电压源与阻抗的串联形式化为电流源与导纳的并联形式
>
> 第二步：标出节点，并把其中一个节点选为参考节点（一般为 0 电位点）
>
> 第三步：列出节点电压方程。
>
> 列方程方法：自电导乘以该节点电压 +∑ 与该节点相邻的互电导乘以相邻节点的电压 = 流入该节点的电流源的电流 - 流出该节点电流源的电流
>
> 【注：这里的 “+” 是 考虑了互导纳是电导的相反数，如果不考虑相反数的话，这个 “+” 就得写为 “-”】
>
> 第四步：联立求解出上面所有的节点电压方程。

——来自[百度百科](https://baike.baidu.com/item/节点电压法/7725643)

**一定要注意：互电导为负**

## 电路定理

### 戴维南定理

求<span v-pre>$\displaystyle R_{eq}$</span>的方法：

1. 直接法：电源置零，求电阻（适用于无受控源电路）
2. 电源置零，加流求压 / 加压求流
3. 电源保留，求开路电压 / 短路电流（可顺带求出 <span v-pre>$\displaystyle U_{oc}$</span>）

### 最大功率

<span v-pre>$\displaystyle P_{max}=\frac{U_{oc}^2}{4R_{eq}}$</span>

## 一阶电路

零输入：<span v-pre>$\displaystyle U_s=0$</span>

零状态：<span v-pre>$\displaystyle i_L(0+)(or\ U_C(0+))=0$</span>

## 相量

解题记得画相量图，有分。

## 三相电路

三角负载转星形负载：Z' = Z/3

三角电源转星形电源：有效值 / sqrt(3), 相位角 - 30°

### 三相功率

复功率 <span v-pre>$\displaystyle S=\sqrt{3}U_LI_Lcos\varphi_z+j\sqrt{3}U_LI_Lsin\varphi_z$</span>；其中 `z` 为阻抗角，电压电流均为线（星形）
