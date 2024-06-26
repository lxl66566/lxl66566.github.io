---
date: 2024-05-25
icon: physics
category:
  - 学习
tag:
  - 物理
---

# 电磁场与电磁波

我最早看的网课是[这个](https://www.bilibili.com/video/av417507556)。不过如评论所说，“这个视频里没有入射折射还有波导相关的章节，知识讲的很细，对速成不友好，对你写题帮助更是不大”。全篇讲证明，没有任何做题，并且是有读 PPT 的嫌疑的。不过物理也就是证明吸引人。

而且，我校的电磁场考得还挺多的，从斜透射到波导，从传输线到偶极子天线，B 站很少有视频能全部讲到。因此我还是自己对照作业 + 书了。

学了一阵子电磁波，发现为了应付考试没有必要去管推导。。那个视频里讲的东西几乎全部没用，笑死。

## 基础

真空磁导率 $\mu_0=4\pi\times10^{-7} N·A^{−2}$

$\displaystyle c=\frac1{\mu_0\varepsilon_0}$

拉梅系数：

| xyz   | $\rho\phi z$ | $r\theta\phi$ |
| ----- | ------------ | ------------- |
| 1,1,1 | 1,ρ,1        | 1,r,rsinθ     |

叉乘：右手螺旋，三阶矢量算三阶行列式，注意中间的分量是负号。（+-+）

叉乘的模是两向量形成的平行四边形面积，矢量混合积是六面体体积

注意不同坐标系的物理量实际位置。

$\displaystyle\frac{\partial\varphi}{\partial l}|_M=\frac{\partial\varphi}{\partial x}\cos\alpha+\frac{\partial\varphi}{\partial y}\cos\beta+\frac{\partial\varphi}{\partial z}\cos\gamma = \nabla\varphi\cdot\vec{l_0}$

$\nabla$ 算子运算法则与求导法则一致。$\nabla$ 算子在每个坐标的分量是该坐标拉梅系数倒数，根据这个可以简单背下在柱/球坐标系下的散度定义式。

[立体角](https://zh.wikipedia.org/wiki/立體角)：$\displaystyle \Omega =\iint _{S}{\frac {dA}{r^{2}}}=\iint _{S}{\frac {{\vec {r}}\cdot {\textrm {d}}{\vec {S}}}{\left|{\vec {r}}\right|\,r^{2}}}=\iint _{S}{\frac {{\vec {r}}\cdot {\textrm {d}}{\vec {S}}}{r^{3}}}$，封闭曲面的立体角 $= 4\pi$（求高斯定理使用）

### 三个度

标量场梯度：$\displaystyle\nabla r=\vec{r_0}, \nabla \frac1r=-\frac{\vec{r_0}}{r^2}$，可以按求导记忆。

通量：$\psi=\int_{s}\vec{A}\cdot d\vec{S}=\int_{s}\vec{A}\cdot\vec{n}dS$，闭合曲面改为 $\oint$（符号实际上代表二重积分）

散度：单位体积的通量 $\displaystyle div\vec{A}=\nabla\cdot\vec{A}=lim_{\Delta V\to 0}\frac{\oint_s\vec{A}\cdot d\vec{S}}{\Delta V}$

散度定理：$\int_V\nabla\cdot\vec{A}dV=\oint_s\vec{A}\cdot d\vec{S}$

环量： $\psi=\oint_{c}\vec{A}\cdot d\vec{l}=\oint_{c}A\cos\theta dl$，$\psi=0$ 对应无旋场。

旋度：矢量，环量面密度最大值 $rot\vec{A}=\nabla\times\vec{A}=\vec{n} \lim_{\Delta S\to0}\frac{\left|\oint_c\vec{A}\cdot d\vec{l}\right|_{\max}}{\Delta S}$

旋度定理（斯托克斯定理）：$\int_s\nabla\times\vec{A}\cdot d\vec{S}=\oint_c\vec{A}\cdot d\vec{l}$

两个恒等式：标量场的梯度的旋度恒等于 0 矢量($\nabla\times(\nabla\varphi)=\vec{0}$)，矢量场的旋度的散度恒等于 0 标量($\nabla\cdot(\nabla\times\vec{A})=0$)。（梯无旋，旋无散）

亥姆霍兹定理：场的分解。$\displaystyle\vec{F}=\vec{F_1}+\vec{F_2}=-\nabla\varphi+\nabla\times\vec{A}$；$F_1$ 无旋，$F_2$ 无源（无散）

记住：散度转通量是面积分，旋度转环量是线积分。

### 介质

- 线性介质：介质参数与场强大小无关
- 各向同性介质：介质参数与场强方向无关
- 均匀介质：介质参数与位置无关
- 色散介质：介质参数与场的频率有关

## 静电磁场/恒流场

[公式大表](https://www.bilibili.com/video/BV1uV411H7xf/?p=137&t=29)

[场方程大表](https://www.bilibili.com/video/BV1uV411H7xf/?p=154&t=320)

### 电场

[大物基础](./physics.md#电学)

[安培定律](./physics.md#磁场力)：$\displaystyle d\vec{F}=Id\vec{l}\times d\vec{B}$

毕奥-萨法尔定律：$\displaystyle \vec{B}=\frac{\mu_{0}}{4\pi}\oint_{c'}\frac{I'd\vec{l}'\times\vec{R}}{R^{3}}$

电流密度（面积微元）：$\vec{J}=\operatorname*{lim}_{\Delta S\to0}\frac{\Delta I}{\Delta S}\vec{n}=\frac{dI}{dS}\vec{n}$，电流是电流密度的通量

[高斯定理](https://zh.wikipedia.org/wiki/高斯定律)：$\displaystyle \oint_S\vec{E}\cdot d\vec{S}=\frac q{\varepsilon_0}$

[静电场场方程](https://www.bilibili.com/video/BV1uV411H7xf/?p=60&t=106)（微分形式）：$\displaystyle\nabla\cdot\vec{E}=\frac{\rho}{\varepsilon_0}, \nabla\times\vec{E}=\vec{0}$

电位表达式 $\displaystyle\varphi(\vec{r})=\frac{1}{4\pi\varepsilon_{0}}\int_{V}\rho(\vec{r}^{\prime})\frac{1}{\left|\vec{r}-\vec{r}^{\prime}\right|}dV^{\prime}$

### 磁场

静磁场场方程：$\begin{aligned}&\nabla\cdot\vec{B}=0\\&\nabla\times\vec{B}=\mu_{0}\vec{J}\end{aligned}$ &emsp;J 为体电流密度。

一般用的多的是 $\oint_c\vec{B}d\vec{l}=\mu_0I$

引入一个 $\vec{A}$ 称为磁矢位，则 $\vec{B}=\Delta\times\vec{A}$。

（体）磁矢位方程：$\displaystyle\vec{A}(\vec{r})=\frac{\mu_{0}}{4\pi}\int_{V}\frac{\vec{J}}{\left|\vec{r}-\vec{r}^{\prime}\right|}dV^{\prime}$

[泊松方程](https://zh.wikipedia.org/wiki/泊松方程)

### 介质中

极化强度 P = 趋于无穷小体积内的电偶极矩之和

极化电荷密度（体，面）：$\left.\left\{\begin{array}{l}\rho_{ps}(\vec{r})=\vec{P}(\vec{r})\cdot\vec{n}\\\\\rho_{p}(\vec{r})=-\nabla\cdot\vec{P}(\vec{r})\end{array}\right.\right.$

电位移矢量 $\vec{D}=\varepsilon_{0}\vec{E}+\vec{P}=\varepsilon\vec{E}$

在线性介质中，$\vec{P}=\varepsilon_0\chi_e\vec{E} ,\chi_e$ 称为极化率。$\varepsilon_{r}=1+\chi_{e}, \varepsilon=\varepsilon_{0}\varepsilon_{r}$ 称为介质介电常数。

介质内电场方程：$\displaystyle\nabla\cdot\vec{D}=\rho$，即 $\nabla\cdot\vec{E}=\frac{\rho}{\varepsilon}$

磁化强度 $\vec{M}$ 趋于无穷小体积内的磁偶极矩之和

磁化电流密度（体，面）：$\begin{cases}\vec{J}_{ms}=\vec{M}\times\vec{n}\\\\\vec{J}_{m}=\nabla\times\vec{M}\end{cases}$

磁场强度 $\displaystyle\vec{H}=\frac{\vec{B}}{\mu_{0}}-\vec{M}$

介质内磁场方程：$\displaystyle\nabla\cdot\vec{H}=\vec{J}$

类似的，有 $\vec{B}=\mu\vec{H}$，其中 $\vec{M}=\chi_m\vec{H}, \mu_{r}=1+\chi_{m}, \mu=\mu_0\mu_r$

线性介质内的方程：$\nabla\times\vec{B}=\mu\vec{J}$

### 能量

能量 $W=\int_V w dV$

电场能量密度 $\displaystyle w_e=\frac{1}{2}\vec{E}\cdot\vec{D}=\frac{1}{2}\varepsilon|\vec{E}|^2$

磁场能量密度 $\displaystyle w_m=\frac{1}{2}\vec{H}\cdot\vec{B}=\frac{1}{2}\mu|\vec{H}|^2$

恒定电流电场功率密度 $p=\vec{J}\cdot\vec{E}$

电场力 = $\vec{F}=\nabla W_e$

### 恒定电流

一般情况：$\displaystyle\nabla\cdot\vec{J}=-\frac{\partial\rho}{\partial t}$

恒定电流时 $\displaystyle\nabla\cdot\vec{J}=0, \nabla\times\vec{E}=\vec{0}$

边界条件；$\vec{n}\cdot(\vec{J}_{1}-\vec{J}_{2})=0\\\vec{n}\times(\vec{E}_{1}-\vec{E}_{2})=\vec{0}$

功率密度：$p=\vec{J}\cdot\vec{E}=\sigma |\vec{E}|^2$

$\vec{J}=\sigma\vec{E}$

### 镜像法

- 双垂直平面镜像：一个电荷镜像出三个，两个 -q，一个 +q
- 球镜像：$-\frac adq$

## 时变电磁场

主要研究方法：研究正弦时变电磁场，并将其他所有分量通过傅里叶变换为正弦形式。

无源：指 $\vec{J}=\vec{0}, \rho = 0$

位移电流密度：$\displaystyle\vec{J}_d=\frac{\partial\vec{D}}{\partial t}$

位移电流不需要导体；而传导电流只有在导体内才有。

麦克斯韦方程组：$\begin{aligned}&\nabla\times\vec{E}=-\frac{\partial\vec{B}}{\partial t}\\&\nabla\times\vec{H}=\vec{J}+\frac{\partial\vec{D}}{\partial t}\\&\nabla\cdot\vec{D}=\rho\\&\nabla\cdot\vec{B}=0\end{aligned}$

根据麦克斯韦方程组，可以推导出时变电磁场的边界条件：

$\begin{aligned}
&\vec{n}\times(\vec{E}_{1}-\vec{E}_{2})=\vec{0} \\
&\vec{n}\times(\vec{H}_{1}-\vec{H}_{2})=\vec{J}_{s} \\
&\vec{n}\cdot(\vec{D}_{1}-\vec{D}_{2})=\rho_{s} \\
&{\vec{n}}\cdot({\vec{B}}_{1}-{\vec{B}}_{2})=0
\end{aligned}$

理想导体表面，有面电荷密度 $\rho_s=\vec{e_n}\cdot\vec{D}$

### 能量

时变电磁场的功率流密度（坡印廷矢量）：$\vec{S}=\vec{E}\times\vec{H}$

坡印廷定理：单位时间内，一定体积中电磁场能量减少的速率，等于场力所做的功与单位时间向外的净通量的和。

### 复数

转换为复振幅，消元 t，微分转乘法。

$\begin{aligned}
&\frac{\partial}{\partial t}\leftrightarrow j\omega \\
&\vec{E}(x,y,z,t)=\mathrm{Re}[\dot{\vec{E}}(x,y,z)e^{j\omega t}]
\end{aligned}$

麦克斯韦方程复数形式：将对 t 偏导以 $j\omega$ 代替即可。

平均坡印廷矢量复数：$\vec{S}_c=\frac12\vec{E}\times\vec{H}^*$

这种复数公式同样适用于 电/磁场能量密度等。

## 平面波

波的传播方向：$e^{-j\beta z}$ 代表 z 正向。

### 波动方程

无源波动方程：$\displaystyle\begin{cases}\nabla^2E-\mu\varepsilon \frac{\partial^2\boldsymbol{E}}{\partial t^2}=0\\\nabla^2H-\mu\varepsilon \frac{\partial^2\boldsymbol{H}}{\partial t^2}=0\end{cases}$

达朗贝尔方程：$\displaystyle\begin{cases}{\nabla}^2{A} - \mu{\varepsilon} \frac{\partial^2{A}}{\partial t^2}=- \mu {J}\\{\nabla}^2{\varphi} - \mu{\varepsilon} \frac{\partial^2{\varphi}}{\partial t^2}=- \frac\rho\varepsilon\end{cases}$

亥姆霍兹方程：$\displaystyle\begin{cases}\nabla^{2}\vec{E}+k^{2}\vec{E}=\vec{0}\\\nabla^{2}\vec{H}+k^{2}\vec{H}=\vec{0}\end{cases}$

波数 $k=\omega\sqrt{\mu\varepsilon}$

平均坡印廷矢量：$\vec{S}_{av}=\frac12Re[\vec{E}\times\vec{H}^*]$

#### 无源无耗

波阻抗：$\displaystyle\eta=\frac{E_0}{H_0}=\sqrt{\frac{\mu}{\varepsilon}}$，真空中为 120π

复数解为 $\begin{cases}\vec{E}(z)=E_{0m}e^{j\phi_0}e^{-jkz}\vec{e}_x\\\vec{H}(z)=H_{0m}e^{j\phi_0}e^{-jkz}\vec{e}_y=\frac{E_{0m}}{\eta}e^{j\phi_0}e^{-jkz}\vec{e}_y\end{cases}$

实数解为 $\begin{cases}\vec{E}(z,t)=E_{0m}\cos(\omega t-kz+\phi_0)\vec{e}_x\\\vec{H}(z,t)=H_{0m}\cos(\omega t-kz+\phi_0)\vec{e}_y\end{cases}$

任一时刻电杨能量密度和磁场能量密度相等，各为总电磁能量的一半

#### 无源有耗

只需用复介电常数：$\varepsilon_c=\varepsilon-j\frac{\sigma}{\omega}$ 代入所有 $\varepsilon$ 即可。

用 $\gamma=j\omega\sqrt{\mu\varepsilon_c}=\alpha+j\beta$ 替换 k，其中 α 称为衰减常数，β 称为相位常数

瞬时解：$\begin{cases}\vec{E}(z,t)=E_{0m}e^{-\alpha z}\cos(\omega t-\beta z+\phi_{0})\vec{e}_{x}\\\vec{H}(z,t)=\frac{E_{0m}}{|\eta_{c}|}e^{-\alpha z}\cos(\omega t-\beta z+\phi_{0}-\theta)\vec{e}_{y}\end{cases}$, $\theta$ 是 $\eta_c$ 的相角

任一时刻电场能量密度和磁场能量密度一般不相等

相速度 $v_p=\frac\omega\beta$，若相速度与频率有关称为色散介质。

### 位函数

$\begin{aligned}&\vec{B}=\nabla\times\vec{A}\\&\vec{E}=-\nabla\varphi-\frac{\partial\vec{A}}{\partial t}\end{aligned}$

[位函数、洛仑兹规范位函数方程的实数复数表示小结](https://www.bilibili.com/video/BV1uV411H7xf/?p=191&t=505)

### 导体

良导体 $\displaystyle\frac{\sigma}{\omega\varepsilon}>>1$

弱导电媒质 $\displaystyle\frac{\sigma}{\omega\varepsilon}<<1$

趋肤效应：良导体中电磁波衰减快，局限于导体表面附近的区域。趋肤深度 $\delta\approx\frac\lambda{2\pi}$

### 极化

- 线极化：$\phi=0, \pi$
- 圆极化：$\phi_y-\phi_x=\pm\frac\pi 2$，振幅相等
  - 右旋：Ex 超前 Ey，$\phi_y-\phi_x<0$
  - 左旋：Ex 落后 Ey，$\phi_y-\phi_x>0$

### 反射和透射

理想导体没有透射

垂直射理想导体：$\begin{cases}E_{1}( z )=e_{x}E_{\mathrm{im}}( \mathrm{e}^{-\mathrm{j}\beta_{1}z}-\mathrm{e}^{\mathrm{j}\beta_{1}z} )=-e_{x}\mathrm{j}2E_{\mathrm{im}}\sin\beta_{1}z\\H_{1}(z)=e_{y} \frac{1}{\eta_{1}}E_{\mathrm{im}}( \mathrm{e}^{-\mathrm{j}\beta_{1}z}+\mathrm{e}^{\mathrm{j}\beta_{1}z} )=e_{y} \frac{2}{\eta_{1}}E_{\mathrm{im}}\mathrm{cos}\beta_{1}z\end{cases}$

反射系数 $\displaystyle\Gamma=\frac{E_{_{\mathrm{rm}}}}{E_{_{\mathrm{im}}}}=\frac{\eta_{_2}-\eta_{_1}}{\eta_{_2}+\eta_{_1}}$

透射系数 $\displaystyle\tau=\frac{E_{\mathrm{tm}}}{E_{\mathrm{im}}}=\frac{2\eta_2}{\eta_2+\eta_1}$

驻波系数（驻波比） $S=\frac{1+|\Gamma|}{1-|\Gamma|}$

$\Gamma$ < 0 时反射波和入射波电场相差相位 $\pi$，称为半波损失

三层介质等效阻抗：$\displaystyle\eta_{\mathrm{ef}}=\eta_2\frac{\eta_3+\mathrm{j}\eta_2\tan(\beta_2d)}{\eta_2+\mathrm{j}\eta_3\tan(\beta_2d)}$

全反射临界角 $\theta_c=arcsin(n_2/n_1)$

## 应用

### （矩形）波导

均匀平面波是 TEM 波；TEM 波不能在空心导体波导内传播。

截止波数 $k_{\text{c}mn}=\sqrt{\left(\frac{m\pi}a\right)^2+\left(\frac{n\pi}b\right)^2}$

截止频率 $\displaystyle f_{\text{c}mn}=\frac{k_{\text{c}mn}}{2\pi\sqrt{\mu\varepsilon}}$

截止波长 $\lambda_{\text{ c}mn}=\frac{2\pi}{k_{\text{ c}mn}}$

相位常数 $\beta_{mn}=\sqrt{k^2-k_{\mathrm{c}mn}^2}$

传播常数 $\gamma_{mn}=j\beta_{mn}$

相速度 $v_{pmn}=\frac\omega{\beta_{mn}}$

波导波长 $\lambda_{\text{ g}mn}=\frac{2\pi}{\beta_{mn}}$

波阻抗 $Z_{TE}=\frac{\omega\mu}{\beta}, Z_{TM}=\frac{\beta}{\omega\varepsilon}$

TE10 称为主模。主模开槽应在宽边中心，不切断管壁电流，不影响波导内电磁场。

### 传输线

输入阻抗 $Z_\text{in}(z)=Z_0\frac{Z_\text{L}+\text{j}Z_0\tan(\beta z)}{Z_0+\text{j}Z_\text{L}\tan(\beta z)}$ （不记）

反射系数 $\Gamma=|\Gamma_2|\mathrm{e}^{-\mathrm{j}2\beta z}\mathrm{e}^{\mathrm{j}\phi_2}$（无耗），其中 $\Gamma_2=\frac{Z_\text{L}-Z_0}{Z_\text{L}+Z_0}$

$Z_\text{in}{\left(\frac\lambda4\right)}=\frac{Z_0^2}{Z_\text{L}}$

$Z_\text{in}{\left(\frac\lambda2\right)}=Z_\text{L}$

$\lambda=\frac{2\pi}{k}$
