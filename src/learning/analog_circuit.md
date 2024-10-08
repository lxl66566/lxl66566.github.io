---
date: 2023-03-01
category:
  - 学习
tag:
  - 电子与电路
---

# 模拟电子技术及实验

b 站课程：[郑益慧](https://www.bilibili.com/video/BV1Gt411b7Zq)（原本看过一段时间华成英的，发现看不下去）

关于电路仿真实验，windows 系统可以尝试下 [QucsStudio](http://qucsstudio.de/)，是一个免费的闭源模拟器。（~~帮我踩坑~~）

## 电子元器件

### 二极管

PN 结电流方程：<span v-pre>$\displaystyle I=I_s(e^\frac{U}{U_T}-1),U_T =26mV,I_S$</span> 为饱和电流

温度升高，同电压下的电流变大。每升高 1℃，正向压降减小 2-2.5mV；每升高 10℃，反向电流增大一倍。

直流电源驮载小交流信号在二极管上，可以等效为电阻（伏安特性曲线）

正向压降，硅管 0.7 V，锗管 0.2V

### 三极管

三极管本质：1. 电流放大，<span v-pre>$\displaystyle I_c = \beta I_b,(\beta\text{为共射放大系数})$</span>, 2. <span v-pre>$\displaystyle U_{be}$</span> 二极管压降

牢记输入特性曲线（类似二极管）与输出特性曲线。温度升高，输入曲线左移，输出上移。

（H 参数微变等效，中低频）：b e 加电阻，c e 加流控电流源

### 场效应管

g,s,d 对应三极管的 b,e,c，跨导 gm 对应三极管的 β

N 沟道结型场效应管需要工作在 <span v-pre>$\displaystyle U_{GS(off)}<U_{GS}<0$</span> 的条件下

N 沟道增强型/耗尽型 MOS 管转移特性方程：<span v-pre>$\displaystyle i_D=I_{DO}(\frac{U_{GS}}{U_{GS(th)}}-1)^2,I_{DO}(I_{DSS})$</span>在不同型代表的意义不同。

## 单级放大电路

指标：通频带，指 A > 0.707 Am 的频率区域。

共射放大电路：底部失真为饱和，顶部失真为截止。

### 分析法

等效电路法：三极管等效为 <span v-pre>$\displaystyle r_{be}=r_{bb'}+(1+\beta)\frac{U_T}{I_{EQ}}=\frac{\Delta U_{be}}{\Delta I_b}$</span> （复习：如何求 rbe?）

输出电阻越小，输出电压越稳定；输出电阻越大，输出电流越稳定。

### 特点

- 共射放大电路：电压，电流放大倍数大；缺点：输入电阻小，输出电阻大
- 共基放大电路：拓宽通频带
- 共集放大电路（射极输出器）：输入电阻大，输出电阻小；缺点：放大倍数低

## 多级放大电路

- 直接耦合
  - 优点：低频特性好，易于集成
  - 缺点：漂移放大，调试困难，Q 点不稳定
- 阻容耦合，优缺点相反
- 变压器耦合与光电耦合（非重点）
- 长尾式
- 功率放大电路

## 电流源

- 镜像电流源
- 比例电流源
- 微电流源
- 改进电流源
  - 射极输出电流源
  - 威尔逊电流源

## 频率响应

- 高通：<span v-pre>$\displaystyle \dot A_u=\frac{j\frac{f}{f_L}}{1+j\frac{f}{f_L}}$</span>，U0 超前
- 低通：<span v-pre>$\displaystyle \dot A_u=\frac{1}{1+j\frac{f}{f_H}}$</span>，U0 滞后

（物理模型等效，全频域）：

<div style="text-align: center;">
<img alt="物理模型等效" src="/images/learning/analog_circuit/1.png"  width="70%" height="70%"/>
</div>

且还能再继续简化。<span v-pre>$\displaystyle g_m=\beta_0/r_{b'e}$</span>

### 多级频率响应

级数越多，通频带越窄。

<span v-pre>$\displaystyle f_L^2=1.1\sum f_{Li}^2$</span>，修正系数

## 反馈

- 怎么判断到底是电压反馈还是电流反馈？
  - 假设输出电压为零，或令负载电阻 RL=0，然后看反馈信号是否存在，若反馈信号不存在了，说明反馈信号与输出电压成比例，就是电压反馈。若反馈信号还存在，则说明反馈信号与输出电压不成比例，而是与输出电流成比例，是电流反馈。

负反馈在相同端子：并联负反馈；相异端子：串联负反馈

### 参数

- 闭环放大倍数：<span v-pre>$\displaystyle \dot A_f=\frac{\dot A}{1+\dot A\dot F}\approx\frac{1}{\dot F}$</span> &nbsp;&nbsp;&nbsp;(深度负反馈
- 反馈深度：|1+AF|

### 负反馈影响

- 输入电阻，串联：\*反馈深度，并联：/反馈深度
- 输出电阻：电压：/反馈深度，电流：\*反馈深度
- 通频带：\*反馈深度
- 放大倍数：/反馈深度
- 减小非线性失真
- 自激振荡：相移 180 度时，放大倍数大于 1
  - 消除：高通电路加电容，简单滞后

## 电压比较器

种类：单限，双限，滞回，

### 非正弦波发生电路

1. 矩形波：滞回比较器 + 电容
2. 三角波：矩形波 + 积分器
