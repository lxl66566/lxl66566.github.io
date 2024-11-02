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

信道容量：${\displaystyle \ C=max _{p(x)}I(X;Y)}$，一般可以拿 $I(X;Y)$ 来变形

单位时间信道容量：$C_t=C/t$

BSC 信道（二进制对称 DMC 信道）：$C=1-H(ε)$ bit （ε 为转移概率）

二元擦除信道（两个输入的擦除是改到同一个值）：$C=1-a$ bit （a 为擦除概率）

定义如果信道转移矩阵的任何两行互相置换，任何两列也互相置换，那么称该信道是对称的。如果转移矩阵的每一行都是其他每行的置换，而所有列的元素 sum 相等，则称这个信道是弱对称的。

对于弱对称信道，C=log (Y 的取值个数) - H(转移矩阵的一行)

和信道：指在任一单位时间内随机地选用任一个而不能同时选用多个的信道。和信道中 $C=log(\sum 2^{C_i})$

## 编码

(M, n) 码指的是 X 的 (码本长度，序列长度)。

- [定长编码](https://www.bilibili.com/video/BV19z4y1o7nV/?p=2&t=642)
  - 无失真：$R>H(X)$
  - 输出信息率（码率）：$R=log m\cdot$ (编码后长度/编码前长度)，其中 m 为进制数
  - 编码效率 $\eta=\frac{H(X)}R$

信道编码定理：对于离散无记忆信道，小于信道容量 C 的所有码率都是可达的。

### 信源编码

- [Haffman 编码](https://en.wikipedia.org/wiki/Huffman_coding)：构建 Haffman Tree 即可，非常简单。每次取两个最小的节点组成新的子树。约定每次概率较大的分配 0，较小的分配 1。
- [算术编码](https://zh.wikipedia.org/wiki/算术编码)：直接把整个输入的消息编码为一个数
  - 先对输入符号的概率进行估计
  - 按照估计概率之比，对 0-1 的区间进行切分
  - 每次取实际信息的一个符号，在符号对应的区间继续按照相同的比例切分
  - 切分全部结束后，任取最终区间内的一点即为编码结果。最终可以将此小数转为整数；也可以转为二进制。

## 微分熵

连续变量的熵 $h(X)=-\int_S f(x)log f(x)dx$

正态分布熵：$h(N(\mu,\sigma^2))=\frac12log(2\pi e \sigma^2) \ bits$

## 高斯信道

$Z_i\sim\mathcal{N}(0, N)$