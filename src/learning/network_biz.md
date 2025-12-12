---
date: 2025-12-12
icon: network-wired
category:
  - 学习
  - 工作
---

# 计算机网络（专业）

这里的内容比起[大学授课 - 计算机网络](./network.md)，会更加偏向于技术细节。

## HTTP

历史：HTTP/0.9, HTTP/1.0, HTTP/1.1, HTTP/2, HTTP/3 (QUIC).

- HTTP/1.0：添加状态码、header、content-type。
- HTTP/1.1：复用同一个 tcp 连接，chunked encoding，Pipelining。
- HTTP/2：多路复用，帧和流，二进制传输，Server Push。

公司内部一般使用 HTTP/1.1。之后的 section 若未指明，默认为 HTTP/1.1。

### HTTP/1.0

- 每个请求都**必须**新建一个 tcp 连接。

### HTTP 1.1

**建议阅读 [RFC 9113 HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9113)**。主要内容在 RFC 里都有，这里随便做点笔记。

- HTTP/1.1 可以在同一个 TCP 连接（连接复用）上**连续**发送**多个请求**，不用等待前一个请求的响应返回（Pipelining）。
- 响应的返回顺序必须与请求的发送顺序严格一致。只要发送顺序一致，tcp 协议层会保证接收顺序也一致。
- Host header 是必须有的，如果没有，server 必须返回 400。
- Header 是一个 map，其中 key 不分大小写，不能有下划线。
- chunked:
  - `Transfer-Encoding: chunked` 时，Content-Length 将被忽略。
  - chunked 是 HTTP/1.1 唯一的应用层分块机制，除此之外就只能靠 tcp 分包了。chunked 对每个块的大小没有限制。

### HTTP/2

HTTP/2（2015）是 HTTP 1.1（1997）以来的一个重大更新。

- 所有 header 都**必须**被 HPACK 算法压缩。Body (DATA) 不强制压缩，一般由应用自行实现。

## TCP

- MTU：Maximum Transmission Unit，单数据包的可传输最大数据量，受到现实网络设备限制，一般为 1500。
- MSS：Maximum Segment Size，TCP segment 的最大长度，一般为 MTU - 40（20 IP header, 20 TCP header）。
