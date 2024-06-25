---
date: 2024-06-15
icon: brands fa-android
category:
  - 编程
  - 应用
tag:
  - 领域
---

# Android

因为一些契机，开始学习 Android 开发了。

## 学习

kotlin 请参考 [kotlin](./kotlin.md)，这里不多讲。

B 站可以看看 [扔物线](https://space.bilibili.com/27559447)，跟 python 领域的码农高天比较相似的存在，平常发零碎知识点，讲得也很现代。

## Android Studio

Android 开发官方唯一 IDE：Android Studio。我曾经是个 all in vscode，然而 Android in vscode 简直寸步难行，甚至 kotlin 在 vscode 上都显得无力，因此我不得不克服对 Android Studio（以下简称 AS） 的恐惧，开始使用这个基于 IDEA 的重量级的 IDE。

安装显然是装新不装旧，不多讲。代理也要准备好，它在编译项目时会到处拉依赖项，没有代理的话会奇慢无比。

### 使用技巧

- `Ctrl + f` 只有查找，`Ctrl + r` 才有替换

### 配置

1. 插件：
   - 禁用一些 Google 家的垃圾
   - ~~Key Promoter X~~ 不是纯键盘党，不用
   - CodeGlance Pro
   - Rainbow Brackets
   - Material UI Theme，先用 GitHub Dark (Material) 一段时间
   - AI 插件
     - cody 完全不可用就不多说了
     - codiumate 登录认证过不了，还会把 AS 卡死
     - 最后还是回到了 vscode 时的老朋友 Codeium
   - 两个 json 插件：_JSON To Kotlin Class_，_GsonFormat_
2. _File - Settings - Tools - Actions on Save_，除了 Code Cleanup 全开。

### 编译运行

我试了虚拟设备，但是每次运行都会报错 Error Creating AVD。感觉不如 wireless adb 连自己手机。

## 传统 UI

### 更改按钮反馈

一般人肯定希望按钮按下时颜色会加深，能够出现按钮的反馈。加反馈很简单：在 drawable 里加一个 selector，然后在 layout 里给 background 用即可。

```xml
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="?attr/colorPrimary" android:state_pressed="true"/>
    <item android:color="?attr/colorOnSurface"/>
</selector>
```

难的是加的反馈要适应 day 和 night 的主题，所以颜色不能定死。不仅要同时修改 background 和 textColor，而且主题可能会更换颜色，此时按钮的颜色也需要跟随主题变换。

我折腾许久，最后放弃使用颜色变换，而是使用 alpha，绕开了这个使我为难许久的问题。

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:alpha="0.25" android:state_pressed="true" />
    <item android:alpha="0.1" />
</selector>
```

## Jetpack Compose

这是一种新的 UI 写法，Google 强推的下一代 UI，在 kotlin 写前端，完全抛弃 xml。里面的组件全部是 kotlin 的函数。显然，必需使用 kotlin，不能使用 java。
