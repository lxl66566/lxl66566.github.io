---
date: 2024-10-30
icon: circle-info
category:
  - 学习
---

# 信息论

## [熵](<https://zh.wikipedia.org/wiki/熵_(%E4%BF%A1%E6%81%AF%E8%AE%BA)>)

信源熵（平均不确定度）：${\displaystyle H_{s}=-\sum _{i=1}^{n}p_{i}\log _{d}p_{i}}$

条件熵（已知 X，关于 Y）：${\displaystyle \mathrm {H} (X|Y)=-\sum _{i,j}p(x_{i},y_{j})\log {p(x_{i}|y_{j})}=-\sum _{i,j}p(x_{i},y_{j})\log {\frac {p(x_{i},y_{j})}{p(y_{j})}}}$

联合熵（X 和 Y 同时发生）：${\displaystyle \mathrm {H} (X|Y)=-\sum _{i,j}p(x_{i},y_{j})\log {p(x_{i},y_{j})}}$

$H(X,Y) = H(X) + H(Y | X) = H(Y)+ H(X |Y)$

### [互信息](https://zh.wikipedia.org/wiki/互信息)

互信息代表随机变量彼此之间的相关性。

${\displaystyle I(X;Y)=\sum _{y\in Y}\sum _{x\in X}p(x,y)\log {\left({\frac {p(x,y)}{p(x)\,p(y)}}\right)},\,\!}$

关于熵和互信息之间的关系只需要记下这张图：

<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- 圆 X -->
  <circle cx="100" cy="100" r="60" fill="skyblue" fill-opacity="0.5" />
  <text x="60" y="100" font-size="12" fill="red">H(X|Y)</text>
  
  <!-- 圆 Y -->
  <circle cx="160" cy="100" r="60" fill="orange" fill-opacity="0.5" />
  <text x="180" y="100" font-size="12" fill="red">H(Y|X)</text>
  
  <!-- 重叠区域 I(X; Y) -->
  <text x="125" y="100" font-size="12" fill="red">I(X;Y)</text>
  
  <!-- 联合熵 H(X, Y) -->
  <text x="120" y="40" font-size="12" fill="red">H(X, Y)</text>
  
  <!-- 条件熵 H(X|Y) 和 H(Y|X) -->
  <text x="50" y="150" font-size="12" fill="red">H(X)</text>
  <text x="180" y="150" font-size="12" fill="red">H(Y)</text>
</svg>

## 信道

### 模型

- 信源：H(X)
- 信道：H(Y)
- 信道中损失的信息量（疑义度）：H(X|Y)
- 噪声熵：H(Y|X)
- 接收端获得的信息量：I(X;Y)

### 公式

信道容量：${\displaystyle \ C=max _{p(x)}I(X;Y)}$