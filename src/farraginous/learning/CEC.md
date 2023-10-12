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

矩形系数 $\displaystyle K_{r0.1}=\frac{f_{0.1}}{f_{0.7}}$ 表示接近理想曲线的程度

抑制比 $\displaystyle d_n=\frac{A_{v0}}{A_{vn}}$

## 谐振回路

谐振曲线 $\displaystyle N(f)=\frac{\dot I}{\dot I_0}=\frac1{1+j\xi}$

（通频）带宽 $\displaystyle B_0=2\Delta f_{0.7}$

- 公式：$\displaystyle Q_0\cdot B=f_0$（常数）

### 串联谐振

广义失谐系数 $\displaystyle \xi=\frac{\omega L-\frac1{\omega C}}{R}\approx 2Q_0\cdot\frac{\Delta\omega}{\omega_0}$（电抗和 / 电阻）

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

### 耦合

反射阻抗：通过耦合对另一回路的附加阻抗。反射后，电抗正负号发生改变。

初级反射阻抗：$\displaystyle Z_{f1}=\frac{(\omega M)^2}{Z_{22}}$，次级类似

- 部分谐振：**等效**回路谐振，即等效回路电抗 = 0
- 复谐振：**等效**回路谐振并匹配（_原电阻 = 等效电阻_）
- 全谐振：初级与次级的**原**回路均谐振，=> **等效**回路也谐振
- 最佳全谐振：全谐振 + 匹配

## 高频谐振小放

### 单级

模型：三极管输出端 接 耦合并联谐振放大回路

三要素：增益，品质因数，通频带

电压增益：$\displaystyle \dot A_v=\frac{-p_1p_2y_{fe}}{g_\Sigma+j\omega C_\Sigma+\frac1{j\omega L}}$

电压增益 \* 通频带 = const

矩形系数 $\displaystyle K_{r0.1}=\sqrt{99}\approx9.96$

### 多级

- 增益：乘积
- 通频带：（各级增益相同情况下）总通频带 = $\displaystyle\sqrt{2^{\frac1{m}}-1}\times$ 单级通频带

### 自激

- 稳定系数越接近 1，越不稳定
- 降低自激：
  - 中和法：高增益，不适合带宽放大
  - 失配法：低增益，但稳定

## 滤波器

- 石英晶体/陶瓷
  - 接入系数小
  - Q 很大（石英晶体 > 陶瓷）
  - 并联谐振频率比串联大；在此二频率中间显感性，其他显容性

## 噪声

- 串并联电阻噪声等于等效电阻噪声（均方值）
- 并联谐振回路噪声约等于等效电阻产生的噪声
- 等效噪声带宽 $\displaystyle B_n\approx\frac\pi 2B_{0.7}$
- 噪声系数 $N_F$ = 输入信噪比 / 输出信噪比 $\approx\displaystyle 1 + \frac{U_a^2}{U_{io}^2} = ...$ （自激噪声 / 输入对输出的影响）
  - 信噪比是功率比值
