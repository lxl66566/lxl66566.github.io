---
sidebar: 'auto'
---
# 大学物理
## 电磁学
常量：<span v-pre>$\varepsilon_0 = 8.85\times 10^{12}\ C^2/N\cdot m^2$</span>
### 场强
高斯定理：<span v-pre>$\large \phi = \frac{Q} {\varepsilon_0}$</span>

无限长直导线场强：<span v-pre>$\large E = \frac{\lambda}{2\pi\varepsilon_0r}$</span>

无限大平面场强：<span v-pre>$\large E = \frac{\sigma}{2\varepsilon_0}$</span>

均匀带电球体场强：<span v-pre>$\large E = \begin{cases}\frac{qr}{4\pi\varepsilon_0R^3} & r<R \\ \frac{q}{4\pi\varepsilon_0r^2} & r\geq R\end{cases}$</span>

均匀带电圆环对轴线上一点的场强：<span v-pre>$\large E = \frac{1}{4\pi\varepsilon_0}\frac{qx}{{(x^2+R^2)}^{3/2}}$</span>
### 电容
平行板电容器：<span v-pre>$\large C = \frac{\varepsilon_0S}{d}$</span>

同心球电容器：<span v-pre>$\large C = 4\pi\varepsilon_0\frac{R_AR_B}{R_B-R_A}$</span> （使用电势计算）

同轴柱形电容器：<span v-pre>$\large U_{AB} = \int_{A}^{B} \frac{\lambda}{2\pi\varepsilon_0r}dr = \frac{q}{2\pi\varepsilon_0l}ln\frac{R_B}{R_A}\ , \ C = \frac{q}{U_{AB}}$</span>
### 电介质
相对介电常数：<span v-pre>$\large \varepsilon_r = 1 + \chi_e = \frac{\varepsilon}{\varepsilon_0}$</span>

极化强度矢量：<span v-pre>$\large \vec{P} = \chi_e\varepsilon_0\vec{E}$</span>

（极化强度矢量定义为单位体积内电偶极矩的矢量和，<span v-pre>$\large\chi_e$</span>为电极化率。）

电位移矢量：<span v-pre>$\large \vec{D} = \varepsilon_0\vec{E} + \vec{P}$</span>

介质中的高斯定理：<span v-pre>$\large \iint_{S}\vec{D} \cdot d\vec{S} = \sum_{S内}q$</span> （积分符号应为环路二重积分）

有介质时，仅需把真空中的公式中 <span v-pre>$\large\varepsilon_0$</span> 替换为 <span v-pre>$\large\varepsilon_0\varepsilon_r$</span> 即可。