---
date: 2023-01-14
icon: play
category:
  - 教程
tag:
  - 视频播放器
  - 桌面端
  - Windows
---

# Potplayer 设置

::: warning
本人已不再使用 potplayer，改用 [mpv](../farraginous/recommend_packages.md#mpv)，请知悉
:::
[Potplayer](../farraginous/recommend_packages.md#potplayer) 是一个强大的视频播放器。

由于自定义程度过高，普通情况下很难调教好 Potplayer。因此本文分享一些我在设置过程中的微不足道的心得。

## 解码器设置

请自行搜索 _Potplayer + Lav Filters + madVR_ .其中，_Lav Filters_ 为解码器，_madVR_ 则为渲染器。

## 倍速音画不同步

我喜欢高倍速看视频，最高不限于 5x.（解说性质） 但受限于解码器与电脑性能，高倍速下视频渲染速度无法跟上倍速，会出现音画不同步现象。

解决方法：F5 打开参数选项，依次点击 _滤镜 - 视频解码器 - 内置解码器/DXVA 设置 - 图像滞后时允许漏帧保持同步_。
