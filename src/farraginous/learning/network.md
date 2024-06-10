---
date: 2023-10-20
category:
  - 学习
---

# 计算机网络

我专业的课只能算是小计网，总共也就 16 学时。

网课的话，对于已经有一些基础的人，还是直接上[高级计算机网络](https://www.bilibili.com/video/av849922709)吧。有一些快速过掉的（例：RDT）可能还需要去看[本科课程](https://www.bilibili.com/video/av416090103)。

## 基础

### 名词解释

TTL = Time To Live，生存时间
RTT = Round Trip Time，往返时间

### 延时

节点延时 = 处理 + 排队 + 传输 + 传播。

- 传输延时：分组 bits / 链路带宽
- 传播延时：物理长度 / 物理速度
- 流量强度：分组长度 \* 到达个数 / 链路输出，in [0,1]
- [排队延时与流量强度公式](https://www.zhihu.com/question/317549997)

### 分层

各层协议数据单元

- 应用层：message
- 传输层：segment
- 网络层：packet
- 数据链路层：frame
- 物理层：bit

### 其他

平均吞吐量取决于瓶颈链路。

## 协议层（传输层）

### RTT

指数加权移动平均

- EstimatedRTT = (1 − 𝛼) EstimatedRTT + 𝛼 SampleRTT
- DevRTT = (1 − 𝛽) DevRTT + 𝛽 |SampleRTT − EstimatedRTT|

### RDT

RDT = Reliable Data Transfer

- 1.0：无
- 2.0：反馈 ACK(Acknowledgement) / NAK(Negative Acknowledgement)
- 2.1：分组编号
- 2.2：NAK free, 使用 ACK 回应上一个通过校验的分组号
- 3.0：超时重传

流水线协议：为了解决 RDT 利用率低的问题，使用 SW(Slide Window)。

发送窗口（SW）：已发送，未确认；接收窗口（RW）。

RW > 1 时，发送的 ACK 序号等于接收到的。

- RW = 1 时，若出错，将重传所有 SW 内的分组；
- RW > 1 时，若出错，只重传出错分组。

### 拥塞控制

对于拥塞窗口大小（TCP Reno）：

- 慢启动：从 1 开始每时刻 \* 2
- 拥塞避免时：每时刻 + 1
- 3 个冗余 ACK：减半（可能需要 +3）
- 超时：重设为 1；sslhresh 设为 cwnd 的一半。

## 链路层

奇偶校验：算 1 的个数

循环冗余码：补零，然后模 2 除法。$(D << r) mod_2 G$

报文在不同子网中传输：IP 地址始终不变，MAC 地址变。

## 无线网

多路访问协议：多个设备共享同一通信信道的协议。

## external

1. [图解 QUIC 连接 - 对每一个字节的解释和再现](https://cangsdarm.github.io/illustrate/quic)
