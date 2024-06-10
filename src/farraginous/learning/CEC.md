---
date: 2023-09-19
category:
  - 学习
tag:
  - 电子与电路
---

# 通信电子线路

> 由于较难找到好的网课，这里的笔记由不同网课拼凑而成。不同网课的侧重点不同，也可能会漏考点。

这门学科是信工大三上最抽象的课。建议先快速刷完基础概念，然后看复习，然后刷题。作业给的还挺多，因此考试考啥其实比较明确。

- 基础概念：[华中科技大学通信（高频）电子线路精品公开课（附课件和知识体系图）](https://www.bilibili.com/video/BV1hE411N79f)，11.5h
- 复习：[【知识点速通+习题讲解】通信(高频)电子线路【开荒实况】](https://www.bilibili.com/video/av594978092)，7h
- 作业的复习补充：
  - 传输线阻抗变换和魔 T 网络（视频，书上都没有）
  - 调幅检波电路计算与失真（视频比较简略）

## 基础概念

电容：电流超前电压，$\displaystyle i=C\frac{du}{dt}$

电感：电压超前电流，$\displaystyle u=L\frac{di}{dt}$

品质因数 $\displaystyle Q=\frac{\omega L}{R}$（感抗 / 损耗）= $2\pi\times$ 回路储能 / 每周期耗能

特性阻抗 $\displaystyle \rho=\omega_0L=\frac1{\omega_0C}=\sqrt{\frac{L}C}$（谐振时的容/感抗）

谐振时回路阻抗有最大值（谐振阻抗） $\displaystyle R_p=\frac L{rC}=Q_0 \rho$

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

串转并，有 $\displaystyle\begin{cases}R_p=R_s(1+Q^2) \\ X_p=X_s(1+\frac1{Q^2})\end{cases}$，一般 Q 很大，可以约

### 抽头

接入系数 p = 低抽头电压/高抽头电压，&lt;=1

$\displaystyle p=\frac{L_1}{L_1+L_2}=\frac{C_2}{C_1+C_2}$，1 在抽头内，需要低抽头阻抗 >> 电抗

等效阻抗为 $\displaystyle Z'=\frac1{p^2}Z$（低抽头等效到高抽头

### 耦合

反射阻抗：通过耦合对另一回路的附加阻抗。反射后，电抗正负号发生改变。

反射阻抗（次级反射到初级）：$\displaystyle Z_{f1}=\frac{(\omega M)^2}{Z_{22}}$，其中 $Z_{22}$ 是次级回路自阻抗。

- 部分谐振：**等效**回路谐振，即等效回路电抗 = 0
- 复谐振：**等效**回路谐振并匹配（_原电阻 = 等效电阻_）
- 全谐振：初级与次级的**原**回路均谐振，=> **等效**回路也谐振
- 最佳全谐振：全谐振 + 匹配

## 高频谐振小放

### 单级

模型：三极管输出端 接 耦合并联谐振放大回路 作为负载

三要素：增益，品质因数，通频带

电压增益（谐振）：$\displaystyle \dot A_v=\frac{-p_1p_2|y_{fe}|}{g_\Sigma},g_\Sigma$ 为谐振电阻$R_p$+输入等效$p_1^2g_{oe}$+输出等效$p_2^2g_{ie}$

电压增益 \* 通频带 = const

矩形系数 $\displaystyle K_{r0.1}=\sqrt{99}\approx9.96$

### 多级

- 增益：乘积
- 通频带：（各级增益相同情况下）总通频带 = $\displaystyle\sqrt{2^{\frac1{m}}-1}\times$ 单级通频带
- 噪声系数：$\displaystyle N_{F\Sigma}=N_{F1}+\frac{N_{F2}-1}{G_1}+\frac{N_{F3}-1}{G_1G_2}+...,\ \ G_x=A_{vx}^2$

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

## 噪声

<details>
  <summary>不重要，大概不考，记一下上面的多级噪声系数就行</summary>

- 串并联电阻噪声等于等效电阻噪声（均方值）
- 并联谐振回路噪声约等于等效电阻产生的噪声
- 等效噪声带宽 $\displaystyle B_n\approx\frac\pi 2B_{0.7}$
- 噪声系数 $N_F$ = 输入信噪比 / 输出信噪比 $\approx\displaystyle 1 + \frac{U_a^2}{U_{io}^2} = ...$ （自激噪声 / 输入对输出的影响）
  - 信噪比是功率比值
  - 降低噪声系数可以提高系统灵敏度，但是灵敏度不是越高越好
- 多级噪声：$\displaystyle N_F=N_{F1}+\frac{N_{F2}-1}{K_1}+\frac{N_{F3}-1}{K_1\cdot K_2}+...$，显然与第一级关系最大

</details>

## 谐振功放

> 注意 $g_c$（跨导）和 $g_{cr}$（临界线斜率）不是同一个东西，不要搞错了。

<!-- prettier-ignore -->
|$V_{bm}$|$V_{bz}$|
|---|---|
|交流信号幅度|截止电压|

基极反偏，截止区域 > 工作区域，因此是工作在丙类（效率高）。负载是谐振回路。

电压利用系数 $\displaystyle\xi=\frac{V_{cm}}{V_{cc}}$，波形系数 $\displaystyle g_1(\theta_c)=\frac{I_{cm1}}{I_{c0}}=\frac{\alpha_1}{\alpha_0}$

输出功率$P_0=\frac12V_{cm}I_{cm1}$，直流功率$P_==V_{cc}I_{c0}$

[效率](https://www.bilibili.com/video/BV1hE411N79f/?p=30&t=344) $\displaystyle\eta=\frac12\xi g_1(\theta_c)$

$I_{cmax}=g_cV_{bm}(1-cos(\theta_c))=g_{cr}(V_{cc}-V_{cm})$

$\displaystyle cos\theta_c=\frac{V_{BB}+V_{BZ}}{V_{bm}}$

[傅里叶级数展开求 $I_{c0},I_{cm1}$](https://www.bilibili.com/video/BV1hE411N79f/?p=31&t=637)：$I_{c0}=I_{cmax}\alpha_0, I_{cm1}=I_{cmax}\alpha_1$

$\displaystyle V_{cm}=V_{cc}-\frac{i_{Cmax}}{g_{cr}}$

最佳半导通角约为 70 度

增大负载，$V_{bm}$ -> 过压，增大 $V_{cc}$ -> 欠压

关于效率：临界效率最高。[曲线](https://www.bilibili.com/video/BV1hE411N79f/?p=37&t=946)

## 振荡器

起振条件：$A_0 > \frac1F$

增益写为电路参数：$\dot A=\bar{y_{fe}}Z_{p1}$

- 互感耦合振荡器：应用于中短波，因为存在分布电容，稳定性差
- 电感三点振荡器
  - $f=1/2\pi\sqrt{(L_1+L_2+2M)C}$
  - 优点：容易起振，方便调节，不影响反馈系数
  - 缺点：高次谐波失真，频率不高
- 电容三点振荡器
  - $f=1/2\pi\sqrt{L(C_1C_2)/(C_1+C_2)}$
  - 优点：波形好，稳定，高频
  - 缺点：不方便调整（会改变反馈系数）。可以在 L 两端并联电容解决。
- 克拉泼振荡电路，相比电容三点振荡器添加了一个 C3（远小于 C1，C2）
  - $f=1/2\pi\sqrt{LC_3}$
  - 反馈系数$F=C_1/C_2$
  - 优点：
    - 利于调节。振荡频率与反馈系数无关。
    - 接入系数减小，稳定。
  - 缺点：波段覆盖范围窄（频率覆盖系数小），波形随频率变化大，高频不易起振。
- 西勒振荡电路，相比克拉泼振荡电路在电感两端并了一个可调电容
  - 优点：改进克拉泼

$F\in(\frac18,\frac12)$ 用来判断稳定性

石英晶振

- 并联等效电感，串联等效导线
- 振荡频率就是晶振频率！不用算 LC
- 接入系数小
- Q 很大（石英晶体 > 陶瓷）

## 幅度调制

<!-- prettier-ignore -->
|$V_\Omega(t)$|$V_0(t)$|DSB-SC|SSB|
|---|---|---|---|
|待调制信号|载波|抑制载波双边带调幅|单边带调幅|

$V_{AM}=V_0(1+m_acos\Omega t)cos\omega_0 t$

调幅指数：$\displaystyle m_a=\frac{k_a|V_{\Omega}(t)|_{max}}{V_0}=\frac{V_{max}-V_0}{V_0}$（上半部分），若 $m_a>1$则会相位反转

载波分量功率：$\displaystyle P_0=\frac{V_{0}^2}{2R_L}$

单边频功率：$P_{SSB}=\frac14m_a^2P_0$

DSB-SC：直接相乘，相位反转

调幅电路

- 低电平调幅
  - 平方律调幅：AM
  - 平衡调幅（双二极管）：DSB
  - 环形调幅
- 高电平调幅：边调幅边功放

### 检波

包络检波：主要针对普通调幅。

- 串联二极管，充电快，放电慢

同步检波：输入信号需要同频同相。主要针对 DSB-SC 和 SSB。

- 乘积型简单，相乘，再低通
- 叠加型麻烦，是把同步检波转换为包络检波。

不产生失真的条件：

- 无惰性失真：$\displaystyle RC\Omega_{max}<\frac{\sqrt{1-m_{amax}^2}}{m_{amax}}$
- 无负峰切割失真：$\displaystyle m_a<\frac{R(\Omega)}{R}$（交流总电阻/直流电阻）

### 混频

将高频转为中频。

<!-- prettier-ignore -->
|$f_c$|$f_1$|
|---|---|
|收听频率|中频频率，一般为 465kHz|

- 哨声干扰：没有干扰源，$\displaystyle f_c\approx \frac{p\pm 1}{q-p}f_1$
- 组合副波道干扰：$\displaystyle f_c=\frac{q}{p}f_n+\frac{p\pm 1}{p}f_1$
  - p=0,q=1：中频干扰
  - p=1,q=1：镜像干扰
- 交调干扰：一个干扰源
- 互调干扰：两个干扰源，且不能同时听到

## 角度调制

调相：

- $V_{PM}=V_0cos(\omega_0 t+k_pv_\Omega(t))$
- 调相指数（最大相偏）：$m_p=k_p|v_\Omega(t)|_{max}$
- 最大频偏（$\Delta\omega_m$）：上式对 t 求微分。在单频调制下，$\Delta\omega_m=m_p\Omega$

调频：

- $V_{FM}=V_0cos(\omega_0 t+m_fsin\Omega t)$
- 调频指数（最大相偏）：$m_f=k_f|\int_0^tv_\Omega(t)dt|_{max}$

调相指数与调频指数合称调制指数（$\Delta f_m$）。

[调频与调相公式对比表格](https://www.bilibili.com/video/BV1hE411N79f/?p=85&t=548)

有效频宽：$B=2(\Delta f_m+F)=2(m_p+1)F\text{（调相）}=2(m_f+F)\text{（调频）}$，F 是低频信号的频率。

功率：等于载波功率

[直接调频优缺点](https://www.bilibili.com/video/BV1hE411N79f/?p=89&t=324)

间接调频：优点：中心频率稳定性很高，缺点：频偏小

- 矢量合成法：$v_{PM}(t)\approx V_0cos\omega_0 t-V_0k_pv_\Omega(t)sin\omega_0t$，需要掌握框图

提升频偏：倍频同时提升频偏和中心频率，再混频降低中心频率

### 鉴频

- 相位鉴频器：波形变换（为调幅波）+ 包络检波
