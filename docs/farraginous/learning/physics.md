---
sidebar: 'auto'
---
# 大学物理
## 电学
常量：

e = 1.6×10⁻¹⁹C

<span v-pre>$\varepsilon_0 = 8.85\times 10^{12}\ C^2/N\cdot m^2$</span>

真空磁导率：<span v-pre>$\mu_0 = 4\pi\times 10^{-7}\ T\cdot m/A$</span>

### 场强
高斯定理：<span v-pre>$\large \phi = \frac{Q} {\varepsilon_0}$</span>

无限长直导线场强：<span v-pre>$\large E = \frac{\lambda}{2\pi\varepsilon_0r}$</span>

无限大平面场强：<span v-pre>$\large E = \frac{\sigma}{2\varepsilon_0}$</span>

均匀带电球体场强：<span v-pre>$\large E = \begin{cases}\frac{qr}{4\pi\varepsilon_0R^3} & r<R \\ \frac{q}{4\pi\varepsilon_0r^2} & r\geq R\end{cases}$</span>

均匀带电圆环对轴线上一点的场强：<span v-pre>$\large E = \frac{1}{4\pi\varepsilon_0}\frac{qx}{{(x^2+R^2)}^{3/2}}$</span>
### 电容
平行板电容器：<span v-pre>$\large C = \frac{\varepsilon_0S}{d}=\frac{Q}{U}$</span>

同心球电容器：<span v-pre>$\large C = 4\pi\varepsilon_0\frac{R_AR_B}{R_B-R_A}$</span> （使用电势计算）

同轴柱形电容器：<span v-pre>$\large U_{AB} = \int_{A}^{B} \frac{\lambda}{2\pi\varepsilon_0r}dr = \frac{q}{2\pi\varepsilon_0l}ln\frac{R_B}{R_A}\ , \ C = \frac{q}{U_{AB}}$</span>

电容器能量：<span v-pre>$\large W = \frac{Q^2}{2C} = \frac{1}{2}QU = \frac{1}{2}\varepsilon_0E^2$</span>

> 地球电量约为 46000 C
> 
> 平行板电容器带电 +Q,-Q 拉开 dx 能量变化 <span v-pre>$\frac{Q^2}{2\varepsilon_0S}$</span>
### 电介质
相对介电常数：<span v-pre>$\large \varepsilon_r = 1 + \chi_e = \frac{\varepsilon}{\varepsilon_0}$</span>

极化强度矢量：<span v-pre>$\large \vec{P} = \chi_e\varepsilon_0\vec{E}$</span>

（极化强度矢量定义为单位体积内电偶极矩的矢量和，<span v-pre>$\large\chi_e$</span>为电极化率。）

电位移矢量：<span v-pre>$\large \vec{D} = \varepsilon_0\vec{E} + \vec{P} = \varepsilon_0\varepsilon_r\vec{E}$</span>

介质中的高斯定理：<span v-pre>$\large \iint_{S}\vec{D} \cdot d\vec{S} = \sum_{S内}q$</span> （积分符号应为环路二重积分）

有介质时，仅需把真空中的公式中 <span v-pre>$\large\varepsilon_0$</span> 替换为 <span v-pre>$\large\varepsilon_0\varepsilon_r$</span> 即可。
## 磁学
Biot-Savart law: <span v-pre>$\large d\vec{B} = \frac{\mu_0}{4\pi} \frac{Id\vec{l} \times \vec{e_r}}{r^2},\ dB = \frac{\mu_0}{4\pi}\frac{Idlsin\alpha}{r^2}$</span>

载流直导线产生的磁场：<span v-pre>$\large B = \begin{cases}\frac{\mu_0I}{4\pi a}(cos \theta_1 - cos\theta_2) & 有限长 \\  B = \frac{\mu_0I}{2\pi a} & 无限长\end{cases}$</span>&nbsp;&nbsp;&nbsp; <span v-pre>$\small a:距离 \ \ \theta:<\vec{I},\vec{r}> \ \ \vec{I}:1 \to 2$</span>

载流圆线圈轴线磁场：<span v-pre>$\large B = \frac{\mu_0IR^2}{2(R^2 + x^2)^{3/2}}$</span>&nbsp;&nbsp;&nbsp;方向由右手定则确定。

密绕螺线管磁场：<span v-pre>$\large B = \begin{cases}\frac{\mu_0nI}{2}(cos\beta_2-cos\beta_1) & 有限长 \\ \mu_0nI & 无限长\end{cases}$</span>&nbsp;&nbsp;&nbsp; <span v-pre>$\small n=N/L:匝密度 \ \ \ \beta:<\vec{B},\vec{r}> \ \ \ \vec{r}指向螺线管表面两端$</span>

Ampère's circuital law: <span v-pre>$\large \oint_{L}\vec{B}\cdot d\vec{l} = \mu_0\sum_{L内}I$</span>

无限长圆柱均匀载流导体磁场：<span v-pre>$\large B = \begin{cases}\frac{\mu_0Ir}{2\pi R^2} & r < R \\ \frac{\mu_0I}{2\pi r} & r > R\end{cases}$</span>

磁矩：<span v-pre>$\large \mu_0 = IS$</span> ，S:回路面积，方向：右手定则
### 磁场力
电流元受力（安培定律变形）：<span v-pre>$\large d\vec{F} = Id\vec{l}\times \vec{B}$</span>

洛伦兹力：<span v-pre>$F=q\vec{v}\times \vec{B}$</span>
圆周运动半径：<span v-pre>$\large R=\frac{mv}{qB}$</span>

线圈磁矩：<span v-pre>$m=NIS$</span>
所受磁力矩：<span v-pre>$M=\vec{m}\times \vec{B}$</span>

磁场力做功：<span v-pre>$A=I\Delta\Phi$</span>
### 磁介质
磁场强度：<span v-pre>$\large H=\frac{B}{\mu_0}-M$</span>, M 为磁化强度

磁介质的安培环路定律：<span v-pre>$\large \oint H\cdot dl=\sum I$</span>

磁化率：<span v-pre>$\chi_m=\large\frac{M}{H}$</span>

相对磁导率：<span v-pre>$\mu_r=1+\chi_m$</span>

<span v-pre>$B=\mu_0\mu_r H$</span>

## 电磁感应
法拉第电磁感应定律：感应电动势 <span v-pre>$\varepsilon_i=-\Large\frac{d\Phi}{dt}$</span>

磁链：<span v-pre>$\Phi_N=NΦ$</span>（匝数×磁通）

动生电动势：<span v-pre>$\varepsilon_i=\begin{cases}-Blv & 运动导线 \\ NBS\omega sin\omega t & 转动线圈\end{cases}$</span>
### 自感与互感
自感系数：<span v-pre>$\large L=\mu_0\frac{N^2}{l}\pi R^2=\frac{\Phi_N}{I}$</span>

互感系数：<span v-pre>$\large M=\frac{\Phi_{21}}{I_1}=\frac{\Phi_{12}}{I_2}=\normalsize k\sqrt{L_1L_2}$</span>
## 光学
### 干涉
双缝干涉 第 k 级明文距中心： <span v-pre>$\large x = k\lambda\frac{D}{d}$</span>

叠加光强：<span v-pre>$\large I=4I_0cos^2\frac{\Delta\phi}{2} \ \ \ I_0$</span> 为每个波分别照射的光强。

相位差与光程差：<span v-pre>$\large \Delta\phi=\frac{2\pi\delta}{\lambda}$</span>

增透膜满足干涉相消：<span v-pre>$\large d=\frac{\lambda}{4n}$</span>

### 衍射
单缝衍射公式：<span v-pre>$\large \delta=asin\theta=a\frac{x}{f}=\normalsize \begin{cases}\pm k\lambda & 暗纹 \\ \in -(\lambda,\lambda) & 中央明纹 \\ \pm (2k+1)\frac{\lambda}{2} & 其余明纹\end{cases} \ \ \ k = 1,2,3...$</span>

圆孔衍射 最小分辨角（第一级暗环衍射角）：<span v-pre>$\large sin \theta_R = 1.22\frac{\lambda}{d}$</span>

光栅衍射明纹：<span v-pre>$\large (a+b)sin\theta=\pm k\lambda$</span>

缺级：<span v-pre>$\large k=\frac{a+b}{a}k'$</span>
### 偏振
偏振片光强变化：<span v-pre>$\large I=I_0cos^2\theta$</span> ；自然光通过，光强减半。