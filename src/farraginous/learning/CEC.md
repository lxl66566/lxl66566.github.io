---
sidebar: heading
date: 2023-09-19
category:
  - 学习
tag:
  - 电子与电路
---

# 通信电子线路

我由于找不到好网课，这里的笔记由不同网课拼凑而成，质量很低，建议不看。。

复习可以看[这里](https://www.bilibili.com/video/av594978092)，讲的很好。

## 基础概念

电容：电流超前电压，$\displaystyle i=C\frac{du}{dt}$

电感：电压超前电流，$\displaystyle u=L\frac{di}{dt}$

品质因数 $\displaystyle Q=\frac{\omega L}{R}$（感抗 / 损耗）= $2\pi\times$ 回路储能 / 每周期耗能

> 回路品质因数是为谐振时的线圈品质因数。

特性阻抗 $\displaystyle \rho=\omega_0L=\frac1{\omega_0C}=\sqrt{\frac{L}C}$（谐振时的容/感抗）

谐振时回路阻抗有最大值（谐振阻抗） $\displaystyle R_p=\frac L{rC}=Q \rho$

矩形系数 $\displaystyle K_{r0.1}=\frac{f_{0.1}}{f_{0.7}}$ 表示接近理想曲线的程度

失谐阻抗公式：$\displaystyle Z=\frac{R_p}{1+jQ\frac{2\Delta\omega}{\omega_0}}$，可以根据此公式计算幅频与相位

抑制比 $\displaystyle d_n=\frac{A_{v0}}{A_{vn}}$

谐振曲线 $\displaystyle N(f)=\frac{\dot I}{\dot I_0}=\frac1{1+j\xi}$

带宽 $\displaystyle B_0=2\Delta f_{0.7}$

**$\displaystyle Q_0\cdot B=f_0$（常数）**

### 串联谐振

广义失谐系数 $\displaystyle \xi=\frac{\omega L-\frac1{\omega C}}{R}\approx 2Q_0\cdot\frac{\Delta\omega}{\omega_0}$（电抗和 / 电阻）

谐振时，$\displaystyle\begin{cases} \dot V_{L0}=jQ_0\dot V_s \\ \dot V_{C0}=-jQ_0\dot V_s \end{cases}$

小于谐振频率时，$\varphi<0$，容性阻抗

$Q=\rho/r$

### 并联谐振

广义失谐系数 $\displaystyle \xi=\frac{\omega C-\frac1{\omega L}}{G}\approx Q_0\cdot\frac{2\Delta\omega}{\omega_0}$（电纳和 / 电导）

固有谐振电阻（等效并联电阻） $\displaystyle R_{e0}\approx\frac{L}{RC}$ （在 Q 高时成立）

$Q=R_{e0}/\rho$

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

模型：三极管输出端 接 耦合并联谐振放大回路 作为负载

三要素：增益，品质因数，通频带

电压增益：$\displaystyle \dot A_v=\frac{-p_1p_2y_{fe}}{g_\Sigma+j\omega C_\Sigma+\frac1{j\omega L}}$；关于公式理解可以看[视频](https://www.bilibili.com/video/BV1hE411N79f/?p=23&t=337)

- 在谐振频率附近分母后两项可以舍去

电压增益 \* 通频带 = const

矩形系数 $\displaystyle K_{r0.1}=\sqrt{99}\approx9.96$

### 多级

- 增益：乘积
- 通频带：（各级增益相同情况下）总通频带 = $\displaystyle\sqrt{2^{\frac1{m}}-1}\times$ 单级通频带

### 自激

- 稳定系数越接近 1，越不稳定
- 降低自激：
  - 中和法：高增益，不适合带宽放大
    - [具体方法公式](https://www.bilibili.com/video/BV1p441197Xp/?p=15&t=1307)
  - 失配法：低增益，但稳定

### 做题

[这个](https://www.bilibili.com/video/BV1bq4y1v7a7/?t=500)讲的不错。

- 会画交流等效电路和 Y 参数微变等效电路。
- $\displaystyle g_{eo}=\frac1{Q_0\omega_0L}$
- 知道抽头变换，$n_1$ 和 $n_2$ 的计算。

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
  - 降低噪声系数可以提高系统灵敏度，但是灵敏度不是越高越好
- 多级噪声：$\displaystyle N_F=N_{F1}+\frac{N_{F2}-1}{K_1}+\frac{N_{F3}-1}{K_1\cdot K_2}+...$，显然与第一级关系最大

## 谐振功放

<!-- prettier-ignore -->
|$V_{bm}$|$V_{bz}$
|---|---|
|交流信号幅度|截止电压|

基极反偏，截止区域 > 工作区域，因此是工作在丙类（效率高）。负载是谐振回路。

电压利用系数 $\displaystyle\xi=\frac{V_{cm}}{V_{cc}}$，波形系数 $\displaystyle g_1(\theta_c)=\frac{I_{cm1}}{I_{c0}}=\frac{\alpha_1}{\alpha_0}$

输出功率$P_0=\frac12V_{cm}I_{cm1}$，直流功率$P_==V_{cc}I_{c0}$

[效率](https://www.bilibili.com/video/BV1hE411N79f/?p=30&t=344) $\displaystyle\eta=\frac12\xi g_1(\theta_c)$

$I_{cmax}=g_cV_{bm}(1-cos(\theta_c))$

$\displaystyle cos\theta_c=\frac{V_{BB}+V_{BZ}}{V_{bm}}$

[傅里叶级数展开求 $I_{c0},I_{cm1}$](https://www.bilibili.com/video/BV1hE411N79f/?p=31&t=637)：$I_{c0}=I_{cmax}\alpha_0, I_{cm1}=I_{cmax}\alpha_1$

最佳半导通角约为 70 度

负载特性：欠压恒流，过压恒压。关于效率：[曲线](https://www.bilibili.com/video/BV1hE411N79f/?p=37&t=946)

## 振幅调制

不失真：$m_a\sqrt{1+\Omega^2C^2R_L^2}<1$

$U_{AM}(t)=U_{CM}[1+m_acos\Omega t]cos\omega_c t$，前面是包络，后面是高频载波
