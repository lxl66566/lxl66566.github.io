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

类似 7z，音频文件大多数情况下只是容器，一般由元数据和**各种编码的音频数据**组成，而编码才是音频文件的本质。

有的容器只支持一种编码格式（容器名就是编码名），例如 MP3 和 FLAC。而有的容器支持多种，例如 OGG 支持 Vorbis、Opus、FLAC。

## 编码

最原始的 raw 音频也就是一串 f32 的序列（根据计算方式也有可能是 i32, i24 等），编码就是将这串序列进行有损/无损压缩后塞到容器里的过程。

最简单的编码就是 WAV 容器使用的 “PCM 编码”。实际上 PCM 本身是脉冲编码调制（Pulse Code Modulation），目的是将模拟信号转换为数字信号，这其中经过了采样、量化、编码的步骤。而 WAV 就直接将 PCM 后的数字信号塞到容器里，不做任何压缩，所以 WAV 一般都挺大的。因为容易处理，编码器好写，经常作为音频处理教学使用。

生活中最常见的 MP3 本身就是一种有损编码方式，MP3 容器只是对该编码的包装。它主要做了两件事，（1）舍弃 PCM 音频中人耳不敏感部分（FFT 到频域处理）（2）通过 Huffman 编码、动态比特率**等**各种手段减小音频数据大小。MP3 具有相当大的[技术限制](https://zh.wikipedia.org/zh-cn/MP3#MP3的设计限制)，并且放在今天 MP3 编码算法也算不上多先进，因此还是尽量少用。

Vorbis 编码被称为 Open-source alternative to MP3，是 OGG 容器中占有最主要地位的编码，常用于游戏中。我在 [galgame 音频处理](../articles/speedup.md)时跟 Vorbis 打了很多交道。Vorbis 基于 MDCT 和熵编码，能达到比 MP3 更高的压缩率。

MP3 和 Vorbis 都是有损编码，而在高品质音乐中最常用的无损编码是 FLAC。它在无损界基本是唯一选择，因为它有许多很棒的特性，例如快速解码、流式、可定位、可调压缩等级([ref](https://zh.wikipedia.org/zh-cn/FLAC#技術))等。

## 响度与均衡

_峰值电平_ 并不严格等同于 _响度_：响度是人耳对声音强度的主观感知，会受到多种因素影响。

ITU-R BS.1770-4 (2015) 定义了 LUFS 作为响度单位。LUFS 综合考虑了电信号强度与人类感知，已经得到了广泛的使用。

### EBU R.128

EBU R.128 是 EBU (European Broadcasting Union) 提出的关于响度标准化的**建议**和一套**测量方法**。其一般实现支持测量音频信息片段或音频流的 LUFS。

EBU R.128 基于三种不同长度区间内的响度进行截尾综合决策：Momentary loudness（400ms），Short-Term loudness（3s）和 Integrated loudness（长期）。更具体的可以阅读[这篇文章](https://www.bilibili.com/opus/437135530799763720)。

EBU R.128 本身并不具备响度标准化的能力；一般的响度标准化会用 EBU R.128 测出 LUFS 后，为音频叠加一种增益模式使其达到 target LUFS。这一点将在后文展开。

### 增益

最简单的增益模式就是全局增益。然而经过我的一些原型验证，这样的处理具有较为显著的缺点：

- [Loudness-Normalization-tauri-app](https://github.com/lxl66566/Loudness-Normalization-tauri-app) 是**流式场景**下的响度标准化应用。在人声占据主导地位的场合下，人声的第一个字会爆音，因为基于之前的非人声音频流计算出的增益过高。
- [audio-loudness-batch-normalize](https://github.com/lxl66566/audio-loudness-batch-normalize) 是**音频片段**下的响度标准化应用。在片段上应用时不会出现爆音问题，在一定程度上可以改善用户体验；但是由于简单的全局增益不会改变动态范围（即高音量与低音量之间的差值），这并不能使人声更加清晰可辨，没有达到我做响度均衡的期望。

对于长音频片段来说，**分段增益**可能可以改善音频片段的响度标准化体验。分段增益的切分点较为关键，应该尽可能避免在高音量时切分导致响度割裂。继续改进，我们可以将分段的增益进行平滑处理，使其成为连续的增益曲线。

### 实例

Bilibili 在 2024 年实装了 _音量动态均衡_ 功能，具体算法未公开，猜测是基于 EBU R.128 的检测，全局增益或分段增益均有可能。不过，文章 [ASMR 类的 UP 主和听众, 可以帮我一起向客服反馈下音量均衡爆音的问题吗?](https://www.bilibili.com/opus/951243597171130370) 表明，正常音频的 target LUFS 并不适合 ASMR 的 target LUFS。

Youtube 会对高于 -14 LUFS 的音频进行负增益调至 -14 LUFS，对小于 -14 LUFS 的音频不作处理（来源请求）。不过也有[一些帖子](https://gearspace.com/board/mastering-forum/1374443-chasing-after-12-lufs-youtube.html)认为 Youtube 的增益算法有一些问题，其调整并不严格。

[APU Dynamics Optimizer](https://apu.software/optimizer/) 是一款专业的高级调音软件，它可以让用户预设一条“动态范围曲线”，曲线规定了音频中不同 LUFS 的时长“占比”，超出该比例的音频片段则会被 [APU Loudness Compressor](https://apu.software/compressor/) 进行压缩/扩展。这种方式可以看成一种特殊的、更加自由的分段增益，具体效果取决于 APU Loudness Compressor 的检测与压缩方式：貌似其结合了 EBU R.128 与 RMS 进行连续的 LUFS 检测，而 Limiter 的压缩较为复杂，原理暂时未知。（描述可能存在错误，欢迎指出） 根据 APU Dynamics Optimizer 首页给出的视频演示，这个软件在高动态范围的纯音乐上效果非常好。可惜软件本身是付费的。