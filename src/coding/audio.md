---
date: 2025-06-24
icon: volume-high
category:
  - 原理
tag:
  - 音频
---

# 音频处理

音频处理是编程界的几大天坑之一。

## 容器

待续

## 编码

待续

## 响度与均衡

_峰值电平_ 并不严格等同于 _响度_：响度是人耳对声音强度的主观感知，会受到多种因素影响。

ITU-R BS.1770-4 (2015) 定义了 LUFS 作为响度单位。LUFS 综合考虑了电信号强度与人类感知，已经得到了广泛的使用。

### EBU R.128

EBU R.128 是 EBU (European Broadcasting Union) 提出的关于响度标准化的**建议**和一套**测量方法**。其一般实现支持测量音频信息片段或音频流的 LUFS。

EBU R.128 本身并不具备响度标准化的能力；一般的响度标准化会用 EBU R.128 测出 LUFS 后，为音频叠加一个**全局增益**使其达到 target LUFS。经过我的一些原型验证，这样的处理具有较为显著的缺点：

- [Loudness-Normalization-tauri-app](https://github.com/lxl66566/Loudness-Normalization-tauri-app) 是**流式场景**下的响度标准化应用。在人声占据主导地位的场合下，人声的第一个字会爆音，因为基于之前的非人声音频流计算出的增益过高。
- [audio-loudness-batch-normalize](https://github.com/lxl66566/audio-loudness-batch-normalize) 是**音频片段**下的响度标准化应用。在片段上应用时不会出现爆音问题，在一定程度上可以改善用户体验；但是由于简单的全局增益不会改变动态范围（即高音量与低音量之间的差值），这并不能使人声更加清晰可辨，没有达到我做响度均衡的期望。

对于长音频片段来说，**分段增益**可能可以改善音频片段的响度标准化体验。分段增益的切分点较为关键，应该尽可能避免在高音量时切分导致响度割裂。继续改进，我们可以将分段的增益进行平滑处理，使其成为连续的增益曲线。

### 实例

Bilibili 在 2024 年实装了 _音量动态均衡_ 功能，具体算法未公开，猜测是基于 EBU R.128 的检测，全局增益或分段增益均有可能。不过，文章 [ASMR 类的 UP 主和听众, 可以帮我一起向客服反馈下音量均衡爆音的问题吗?](https://www.bilibili.com/opus/951243597171130370) 表明，正常音频的 target LUFS 并不适合 ASMR 的 target LUFS。

Youtube 会对高于 -14 LUFS 的音频进行负增益调至 -14 LUFS，对小于 -14 LUFS 的音频不作处理（来源请求）。不过也有[一些帖子](https://gearspace.com/board/mastering-forum/1374443-chasing-after-12-lufs-youtube.html)认为 Youtube 的增益算法有一些问题，其调整并不严格。
