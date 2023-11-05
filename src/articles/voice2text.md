---
date: 2023-11-05
icon: mark
category:
  - 推荐
  - 评价
tag:
  - 横评
---

# 音频转文字

**付费服务**不在本文考虑范围内。

## 移动端

移动端自然不用多说，语音转文字但凡是个正常输入法都能干。对于中文，一般国产输入法的质量会好点，gboard 效果比较差。

文件的话，小米的录音机能够转文字，不过效果较差，而且需要手动打标点。

## 桌面端

### 微软

如果使用 windows 10/11，当然选择微软自家的语音输入，按 `Win + H` 即可（通过调输入法选择语言）。中文识别准确率在 2022 之前较一般，现在不错。

这里有一个 [trick](https://www.appinn.com/speech-to-text-windows10-and-11/)，可以用微软语音转文字转音频。

### autosrt

对于需要输入音频输出 srt 字幕的场合，如果电脑算力足够，可以用下 [autosrt](https://github.com/asukaminato0721/autosrt) 跑本地模型，跨平台多语言，使用纯 CPU，对内存没有要求。有很多模型可以选择，越大的模型自然越慢。参考我用 large 跑了个 30min 的中文字幕，在 laptop i5-12500 上跑了接近 1h。

### [腾讯云](https://cloud.tencent.com/product/asr)

每月 10h 免费时长，基本够用。

### whisper

实际上上述 [autosrt](#autosrt) 就是使用 whisper 模型放本地跑，只不过用 python 写了个小前端而已。在 huggingface 上也可以[在线用](https://huggingface.co/spaces/sanchit-gandhi/whisper-jax)，不过速度比本地还要慢。（可以理解，又不是做慈善）
