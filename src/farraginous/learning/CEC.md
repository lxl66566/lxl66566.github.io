---
sidebar: heading
date: 2023-09-19
category:
  - 学习
tag:
  - 电子与电路
---

# 通信电子线路

## 基础概念

电容：电流超前电压，$\displaystyle i=C\frac{du}{dt}$

电感：电压超前电流，$\displaystyle u=L\frac{di}{dt}$

品质因数 $\displaystyle Q=\frac{\omega L}{R}$（感抗 / 损耗）

> 回路品质因数是为谐振时的线圈品质因数。

特性阻抗 $\displaystyle \rho=\omega_0L=\frac1{\omega_0C}=\sqrt{\frac{L}C}$（谐振时的容/感抗）

## 谐振回路

谐振曲线 $\displaystyle N(f)=\frac{\dot I}{\dot I_0}=\frac1{1+j\xi}$

（通频）带宽 $\displaystyle B_0=2\Delta f_{0.7}$

- 公式：$\displaystyle Q_0\cdot B=f_0$（常数）

### 串联谐振

广义失谐系数 $\displaystyle \xi=\frac{\omega L-\frac1{\omega C}}{R}\approx Q_0\cdot\frac{2\Delta\omega}{\omega_0}$（电抗和 / 电阻）

谐振时，$\displaystyle\begin{cases} \dot V_{L0}=jQ_0\dot V_s \\ \dot V_{C0}=-jQ_0\dot V_s \end{cases}$

### 并联谐振

广义失谐系数 $\displaystyle \xi=\frac{\omega C-\frac1{\omega L}}{G}\approx Q_0\cdot\frac{2\Delta\omega}{\omega_0}$（电纳和 / 电导）

固有谐振电阻 $\displaystyle R_{e0}=\frac{L}{CR}$

### 串并转换

串转并，有 $\displaystyle\begin{cases}R_2=R_1(1+Q^2) \\ X_2=X_1(1+\frac1{Q^2})\end{cases}$，一般 Q 很大，可以约

### 抽头

接入系数 p = 低抽头电压/高抽头电压，&lt;=1

$\displaystyle p=\frac{L_1}{L_1+L_2}=\frac{C_2}{C_1+C_2}$，1 在抽头内，需要低抽头阻抗 >> 电抗

等效阻抗为 $\displaystyle Z'=\frac1{p^2}Z$（低抽头等效到高抽头
