---
date: 2023-11-05
icon: file-audio
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

录音转文字：

- 小米的录音机能够转文字，不过效果较差，而且需要手动打标点。
- 一加的录音机更垃圾，我目前的 OS 版本必定 `转文本出现异常`。

## 桌面端

### 微软

如果使用 windows 10/11，当然选择微软自家的语音输入，按 `Win + H` 即可（通过调输入法选择语言）。中文识别准确率在 2022 之前较一般，现在不错。

这里有一个 [trick](https://www.appinn.com/speech-to-text-windows10-and-11/)，可以用它识别音频。

### autosrt

对于需要输入音频，输出 **srt 字幕**的场合，可以用 [autosrt](https://github.com/asukaminato0721/autosrt) 跑本地模型。

- 跨平台
- 多语言支持
- 使用纯 CPU，对内存要求不高
- 有很多模型可以选择，越大的模型自然越慢，需要平衡准确率与速度。参考我用 large 跑了个 30min 的中文字幕，在 laptop i5-12500 上跑了接近 1h。

autosrt 在 linux 下是一个不错的选择。具体地：

::: code-tabs

@tab archlinux

```sh
paru -S whisper.cpp ffmpeg  # 可执行文件在 `/usr/bin/whisper.cpp`
git clone git@github.com:lxl66566/autosrt.git
cd autosrt && python main.py
```

:::

然后遵循 readme，下载一个模型（我选择了 `ggml-small-q5_1` 181.3 MB），填入 GUI 即可。

### VSCode

VSCode 居然支持语音输入了！([src](https://t.me/absxsgroup/6059))这是我没想到的。你需要：

1. 安装插件 _VS Code Speech - Microsoft_ 和 _Chinese (Simplified, China) language support for VS Code Speech - Microsoft_
2. 在设置中添加一行 `"accessibility.voice.speechLanguage": "zh-CN",`

实测识别准确率还是不错的。这下 Linux 也有即开即用的 voice2text 了，而且由于我本身就用 vscode 写日记，所以还挺好的。

不过有几个问题：

1. 不方便多语言切换，得去设置里改。
2. 不支持 NixOS，因为 NixOS 不遵守 fhs，找不到 libasound。

### [CapsWriter](https://github.com/HaujetZhao/CapsWriter)

一款语音输入工具，但是使用它需要购买阿里云的 API。因此不推荐。

## 云端

### [通义听悟](https://tingwu.aliyun.com/)

### [腾讯云](https://cloud.tencent.com/product/asr)

每月 10h 免费时长，基本够用。

懒得看文档了，左边有个 _功能体验_，上传录音，选择 _不带时间戳_ 即可。

### whisper

实际上上述 [autosrt](#autosrt) 就是使用 whisper 模型放本地跑，只不过用 python 写了个小前端而已。在 huggingface 上也可以[在线用](https://huggingface.co/spaces/sanchit-gandhi/whisper-jax)，不过速度比本地还要慢。（可以理解，又不是做慈善）

#### whisper.jax

[在线演示](https://huggingface.co/spaces/sanchit-gandhi/whisper-jax)，据说比 whisper 快 70 倍

### incredibly-fast-whisper

基于 Whisper Large v3 模型。有一个[在线 demo](https://replicate.com/vaibhavs10/incredibly-fast-whisper) 可以用。

### [groq](https://console.groq.com/playground?model=whisper-large-v3-turbo)

groq 有一定免费额度，是一个在线模型运行 playground。需要代理，不支持香港节点。
