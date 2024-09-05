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
     - 最后还是回到了 vscode 时的老朋友 **Codeium**
       - 关掉 _Show Selection Toolbar_，这个很烦
   - 两个 json 插件：_JSON To Kotlin Class_，_GsonFormat_
   - ~~vim 插件：ideavim~~ 太捞了，不用
     1. 这个 vim 插件的所有设置项就只有解决与 IDE 快捷键冲突的了。。什么加 bindings 都干不了。
     2. 无法与系统剪切板交互。
   - ~~Settings Sync~~ 连登录都登录不了。
2. _File - Settings - Tools - Actions on Save_，除了 Code Cleanup 全开。
3. 更改 KeyMap：
   - Close Tab: `Ctrl + w`
   - Remove Closed Tab：`Ctrl + Shift + t`
   - Comment with line Comment: `Ctrl + /`
   - Refactor - Rename: `F2`
   - Generate Compose Preview：`Ctrl + p`
4. 更多 Inlay Hints：_Editor - Inlay Hints_，打开除了 _Code vision_ 和 _Annotations_ 的其他所有 Inlay Hints
5. proxy: _auto-detect proxy settings_

### 编译运行

我试了虚拟设备，但是每次运行都会报错 Error Creating AVD。感觉不如 wireless adb 连自己手机。

### 劝退

[Android Studio 有多难用？](../gossip/fuckxxx.md#android-studio-有多难用)

## UI

### 传统 UI

#### 更改按钮反馈

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

### Jetpack Compose

这是一种新的 UI 写法，Google 强推的下一代 UI，在 kotlin 写前端，完全抛弃 xml。里面的组件全部是 kotlin 的函数。显然，必需使用 kotlin，不能使用 java。

Jetpack Compose 是数据驱动的，写法非常简单，我很喜欢。可以类比用 js 对象树模拟 DOM 的 [vanjs](./html.md#工具) 等。

我本来接触的项目是 openppp2，它用的是 java，上不了这个；但是大四上学校有一个实践，刚好是做 Android，那我可就不客气了，开写！

#### 学习

Jetpack Compose 的资料良莠不齐，比如 b 站上基本没有什么 compose 相关视频，并且有的那一小撮质量也很差。这里列举一些我认可的学习资料：

- [Compose 基础知识 - Google](https://developer.android.com/courses/pathways/jetpack-compose-for-android-developers-1?hl=zh-cn)：google 家官方的视频还不错
- [leobert's blog](https://leobert-lan.github.io/Compose/index.html)：有一些源码分析

然后到 2024 年 9 月，GPT-4o 写 Jetpack Compose 的正确率还是比其他的 AI 高不少，建议用 GPT 写。

#### Preview

Compose 本来也应该能够像老式 xml 一样 preview 的，只要将 `@Compose` 函数加上 `@Preview` 即可。但是我从新建项目开始就无法 preview，点击 Android Studio 右上角的 _Split_ 或者 _Design_ 都**没反应**。找了一下，stackoverflow 说这是 bug，于是我都要去 run 来看效果。

我从来没有怀疑过是 android studio 新建项目时 `build.gradle.kts` 的问题。然后某一天我刷到了[官方文档的这个页面](https://developer.android.com/develop/ui/compose/tooling?hl=zh-tw#individually)，发现这个好像跟 `build.gradle.kts` 里默认的不太一样。新建项目时自带的是：

```
implementation(libs.androidx.ui.tooling.preview)
debugImplementation(libs.androidx.ui.tooling)
```

而我从文档里抄的是：

```
implementation(libs.ui.tooling.preview)
debugImplementation(libs.ui.tooling)
```

换完后者以后就能 preview 了，生草。

#### icons

显然我懒得找 icon 了，而 android material 有一套内置的，非常好用。

```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
NavigationBarItem(
  icon = {
    Icon(
      imageVector = Icons.Default.Home,
      contentDescription = "home"
    )
  }
)
```

至于哪里能找到所有 icon，emmm，第一个当然是看 IDE 补全的提示。 [Google Fonts](https://fonts.google.com/icons) 也可以看（[ref](https://slack-chats.kotlinlang.org/t/509025/is-there-list-of-icons-to-browse-for-jetpack-compose)），但是 material 包里默认的 icon 数量相当少，只能看一部分。那么如何拿到更多的 icons 呢？答：可以用 [libs.androidx.material.icons.extended](https://stackoverflow.com/a/78616305)，这下就全了。（记得要同步依赖）

#### 获取宽度

我们可能需要手动获取某个 view 内部的宽度，以进行一些其他计算。这一点 jetpack compose 做的还是有待提高，现在还是有一点麻烦的：

```kotlin
val density = LocalDensity.current // 获取当前的 Density 实例
val pxToDp = { px: Int -> with(density) { px.toDp() } }
Row(
  modifier = modifier
    .onGloballyPositioned { coordinates ->
      // 获取 Row 的宽度
      widthDp = pxToDp(coordinates.size.width)
    }
) {
  // 然后就能把 `widthDp` 拿来用了
}
```

## Log

打 log 也是很重要的，android 一般在 Logcat 里打 log。

```kotlin
import android.util.Log
Log.w("Mytag", "message")
```

然后在 Logcat 窗口 filter 里写 `tag:Mytag` 即可。

还有一个小插曲，我之前明明打了 log 但是在 logcat 里怎么也看不到，莫名其妙，气死了。我直接在 Text 里打 log，结果发现 Text 里的字符也没变。一看，编译目标是那个 Composable Preview，不是 app。。。

## Test

Android 虽然有单元测试，但是并不写在当前的代码里。这一点跟 pytest 等是一样的，但是我并不喜欢。

新创建的空白项目中，Android studio 给了一个 Unittest 示例，照着抄就完了，非常简单。至于快速添加 test：右击 class，在 _Generate_ 里选 _Test_，然后 _OK_，记得把 _show only existing source roots_ 关了就行。
