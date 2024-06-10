---
date: 2023-12-18
icon: file-pdf
category:
  - 推荐
  - 评价
tag:
  - 桌面端
  - 横评
---

# PDF 阅读器横评

一看到这个标题，肯定有人会说：嗨嗨嗨，浏览器自带的 PDF 阅读器不好吗，为啥要专门整一个阅读器呢？那是因为……

已知：我的需求是，免费，能记阅读进度，能反色（dark mode），能划词翻译，很简单很基础吧。

## 浏览器

但是在浏览器中，这是很难实现的。

1. Dark Reader 插件能直接把浏览器自带的 PDF 阅读界面反色（dark mode）。
   - 仅在 chromium 系下有效。firefox 强制所有扩展无法访问文件网址。
2. 目前所有的（_沙拉查词_，_划词翻译_）划词翻译插件都不能在自带 PDF 阅读界面工作，需要插件自行用 pdf.js 维护一个页面。
3. 我尝试在其维护的 pdf.js 页面反色，error: 此页面受浏览器保护。

### 解法

在后续的尝试中，我发现可以在控制台输入：`viewer.style.filter = 'invert() brightness(80%)'` 来强制反色。([src](https://github.com/darkreader/darkreader/issues/374#issuecomment-850989619))

也可以建一个书签，免去了输指令：`javascript:void(viewer.style.filter = 'invert() brightness(80%)')`。

## Adob​​e Acrobat Reader

这玩意我只在学校机房用过一次，当时它能做到离线 OCR，还是有点惊艳到我的。

今天尝试安装，结果下载到 90% 卡死了，甚至关不掉，只能等超时。pass。

（早都说了解耦，就是有人喜欢耦合，结果就是下载器也做不好，安装器也做不好，tmd 一坨大便。）

## Foxit PDF Reader

福昕阅读器，据说是支持反色和划词翻译的。我下载的时候选的 English，当时也没太在意。

装好以后 Darkmode 倒是好找，但是无法反色（更换背景）。怎么找也找不到。

然后去看了下[官方教程](https://www.foxit.com/blog/how-to-add-backgrounds-to-pdfs/)。好家伙，我根本找不到视频中的 `Organize` 的入口。

并且我试了下，也不能划词翻译。pass。

比较有意思的是我搜出来的中文教程的界面与英文的完全不同，这阅读器该不会是区别对待吧（）。

## Evince

这玩意是开源的阅读器，官网只能找到 linux 系统的安装包。于是去[第三方平台](https://evince.en.uptodown.com/windows/download)下载了 windows 版本（期间还在 Microsoft Store [碰了一次壁](../gossip/fuckxxx.md#批判微软)）。安装不能自定义位置，扣分。

轻量倒是轻量，也有反色，但是没有划词翻译。

这个软件在 PDF 上选择单词时会忽视单词排版的间隙，而是自己再覆盖着打一遍单词，我也说不上是好是坏。

在 archlinux 上安装则没有带 `.desktop` 文件，需要自己写一个最小 `.desktop`：

```toml
[Desktop Entry]
Name=evince
Comment=evince pdf reader
Type=Application
Exec=evince -o
Terminal=false
```

喂，你好歹是个官方 extra 仓库的应用。。到时候考虑邮件催一下打包者。
