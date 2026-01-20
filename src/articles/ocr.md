---
date: 2023-12-09
icon: camera-rotate
category:
  - 推荐
  - 评价
tag:
  - 横评
  - 移动端
  - 桌面端
---

# OCR

OCR 也是生活中的一大刚需，甚至比[语音转文字](./voice2text.md)更为重要。

优秀的 OCR 在面对常见字体的印刷字时需要做到 100% 正确率，并且在其他恶劣条件下仍能保证一定正确率。

::: tip
**付费服务**不在本文考虑范围内。

_手写识别_ 并不是传统 OCR 的刚需，因此本文对其不作要求。
:::

## Android

如果你使用的是国产系统，那么 Android 端的 OCR 并不需要其他软件，大多数手机自带的相册即可胜任。

- MIUI（小米）：体验很好。相册打开图片的状态下长按并稍等片刻即可自由复制。
- ColorOS（一加）：体验较差。只有使用相机“超级文本”模式下拍摄的照片才能 OCR。点开照片，右上角有 _文字识别_ 按钮。

## Windows

windows 下的 OCR 我首推 [PixPin](../farraginous/recommend_packages.md#截图软件)。它其实是一个截图软件，附带了离线 OCR 功能，中文的识别准确率非常高。

包含模型，软件总大小 70M 左右，我还是很满意的。

## Linux

有个 [NormCap](https://github.com/dynobo/normcap)，其本质上是基于 `Tesseract OCR` 的前端。

在 archlinux 上安装：

```sh
paru -S normcap tesseract-data-chi_sim
```

然后打开，右上角 _设置_ 的 _language_ 选择 `chi` 即可。

这个离线模型大小 41M 左右，准确率特别差，例如 PDF 扫描件 OCR。

然后我实在是忍不了了，试了一下用 wine 装 [PixPin](#windows)，居然能用，就是没有快捷键，不过也无所谓了。
