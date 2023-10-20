---
sidebar: heading
date: 2023-10-20
category:
  - 学习
---

# 计算机网络

我专业的课只能算是小计网，总共也就 16 学时。但是我看的[网课](https://www.bilibili.com/video/av416090103)是 44h 的。

## 基础

### 名词解释

TTL = Time To Live，生存时间
RTT = Round Trip Time，往返时间

### 延时

节点延时 = 处理 + 排队 + 传输 + 传播。

- 传输延时：分组 bits / 链路带宽
- 传播延时：物理长度 / 物理速度

### 分层

各层协议数据单元

- 应用层：message
- 传输层：segment
- 网络层：packet
- 数据链路层：frame
- 物理层：bit

### 其他

平均吞吐量取决于瓶颈链路。
