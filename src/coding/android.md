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
2. 设置里 _Tools - Actions on Save_，除了 Code Cleanup 全开。
3. 更改 KeyMap：
   - Close Tab: `Ctrl + w`
   - Reopen Closed Tab：`Ctrl + Shift + t`
   - ~~Comment with line Comment: `Ctrl + /`~~ 已经是默认
   - Refactor - Rename: `F2`
   - Generate Compose Preview：`Ctrl + p`
4. 更多 Inlay Hints：_Editor - Inlay Hints_，打开除了 _Code vision_ 和 _Annotations_ 的其他所有 Inlay Hints
5. ~~proxy: _auto-detect proxy settings_~~ 已经是默认
6. _Languages & Frameworks - Kotlin - enable K2 mode_

### 编译运行

我试了虚拟设备，但是每次运行都会报错 Error Creating AVD。感觉不如 wireless adb 连自己手机。后续重装的 win11 倒是没有这个问题了。

不过有时候虚拟系统不能干某些事，必须连自己手机，例如 VPN 与定位等。

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
- [Jetpack Compose 博物馆](https://jetpackcompose.cn/docs/)：中文社区的好文档，介绍了许多组件
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

换完后者以后点击 _Split_ 就能 preview 了，生草。

#### remember

Composable 中使用 remember 进行状态传递，这让其成为数据驱动的 UI，简单易懂。remember 变量被修改后，绑定的 UI 会自动重绘。

有几种 remember 的用法：

```kotlin
// 1. mapVisible 是一个 Boolean，这是一个语法糖。可以直接用，方便。
// 缺点是几乎不可能传给其他 Composable，只能在当前 Composable 用。
val mapVisible by remember { mutableStateOf(true) } // 1

// 2. mapVisible 是一个 MutableState<Boolean>，必须要 `.value` 才能拿到内部值。但是可以到处传。
val mapVisible = remember { mutableStateOf(true) }  // 2
```

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

#### 调用 Fragment

有一个 `AndroidFragment` 能直接在 Composable 内渲染 Fragment。

```kotlin
class RT : Fragment() {}
@Composable
fun Test(){
  val fragmentState = rememberFragmentState()
  AndroidFragment<RT>(
    modifier = Modifier.fillMaxSize(),
    fragmentState = fragmentState
  )
}
```

局限性还是很大的，比如你的 `AndroidFragment` 必须在 `FragmentActivity()` 上下文使用，`class RT : Fragment()` 必须拥有空构造函数等。

#### 劝退

Jetpack Compose 的思想很好，开发效率很高，但是写起来还是有不少问题的。

最大的问题还是**各种场景下对 Activity 的依赖**。Jetpack Compose 摆脱了界面对 Activity 的依赖，但是很多时候你的模块没有 Activity 还不行。然后 Jetpack Compose 对 Fragment 和 Activity 的耦合也不太行，导致开发效率都被踩坑踩完了。关键是这些 Activity 的问题还都是运行时崩溃，编译时根本不会提醒。Java 系的梦幻报错再赢一次。

还有支持 Compose 的库还是不够稳定，例如 [Google Maps Compose](https://github.com/googlemaps/android-maps-compose/)，我刚入门就踩了个这玩意两年前的 [open issue](https://github.com/googlemaps/android-maps-compose/issues/105)。

还有各种稀奇古怪的上下文与作用域规定，写得多了总会遇到。最简单的就是 `remember { mutableStateOf() }` 必须在 `@Composable` 内使用，这些中间状态如果还要分发到其他函数就必须使用

### 我的模板

一些高度泛用，加速开发的模板（组件）代码。

#### DropdownMenu on Enum

::: details 从任意 enum class 创建 DropdownMenu

```kotlin
@Composable
fun <T : Enum<T>> EnumDropdownMenu(
  enumClass: Class<T>,
  selectedEnum: T,
  onEnumSelected: (T) -> Unit
) {
  var expanded by remember { mutableStateOf(false) } // 控制菜单展开状态

  Box(
    modifier = Modifier
      .wrapContentSize(Alignment.TopStart)
  ) {
    TextButton(onClick = { expanded = true }) {
      Text(text = selectedEnum.name) // 显示当前选中的 Enum 名称
    }
    DropdownMenu(
      expanded = expanded,
      onDismissRequest = { expanded = false }
    ) {
      // 使用 enumClass 获取所有枚举值
      enumClass.enumConstants?.forEach { enumValue ->
        DropdownMenuItem(text = { Text(text = enumValue.name) }, onClick = {
          onEnumSelected(enumValue) // 选择逻辑
          expanded = false // 关闭菜单
        })
      }
    }
  }
}
```

使用方法：

```kotlin
@Preview
@Composable
fun MyScreen() {
  var selectedEnum by remember { mutableStateOf(MyEnum.Option1) } // 默认选中 Option1

  Column {
    Text(text = "Selected: ${selectedEnum.name}")

    // 传递 MyEnum::class.java 来指定枚举类
    EnumDropdownMenu(
      enumClass = MyEnum::class.java,
      selectedEnum = selectedEnum,
      onEnumSelected = { selectedEnum = it }
    )
  }
}

enum class MyEnum {
  Option1,
  Option2,
  Option3
}
```

:::

## Log

打 log 也是很重要的，android 一般在 Logcat 里打 log。

```kotlin
import android.util.Log
Log.w("Mytag", "message")
```

然后在 Logcat 窗口 filter 里写 `tag:Mytag` 即可。

还有一个小插曲，我之前明明打了 log 但是在 logcat 里怎么也看不到，莫名其妙，气死了。我直接在 Text 里打 log，结果发现 Text 里的字符也没变。一看，编译目标是那个 Composable Preview，不是 app。。。

## Test

Android 一共有两种测试，androidTest 和 test (unittest)。两个测试中使用的依赖要分别引入：

```kotlin
testImplementation(kotlin("test"))
androidTestImplementation(kotlin("test"))
```

Android 虽然有单元测试，但是并不写在当前的代码里。这一点跟 pytest 等是一样的，但是我并不喜欢。而且还容易爆 `java.lang.NoClassDefFoundError`，原因不明，我至今未解决。

新创建的空白项目中，Android studio 给了一个 Unittest 示例，照着抄就完了，非常简单。至于快速添加 test：右击 class，在 _Generate_ 里选 _Test_，然后 _OK_，记得把 _show only existing source roots_ 关了就行。

在使用 assertEquals 中[我被坑了](https://t.me/withabsolutex/1954)，请务必用 `kotlin.test.assertEquals`。（把 message 放在前面的设计简直不是人。）

## Gradle

Gradle 是 android 也是 java 的广泛使用的包管理器，但是说它烂也是真的烂。

- 这玩意是 java 写的，报错实在是不敢恭维。
- 您猜猜 build.gradle 有多少种版本？即使在 kotlin DSL 的 `build.gradle.kts` 里都有多种不同的写法，例如 `ksp("androidx.room:room-compiler:2.5.0")` 和 `ksp(libs.androidx.room.room.compiler2)`，它们的区别在哪？
- 您猜猜 `androidx.room.room.compiler`, `androidx.room.room.compiler2`, `androidx.room.compiler`, `room.compiler` 哪一个才是正确的依赖？

20240906 我因为引入 Room 依赖的原因被 gradle 折磨了一个上午，最终被[一篇 stackoverflow 回答](https://stackoverflow.com/questions/77665284)点拨了一下，终于看懂了 `build.gradle.kts` 是怎么工作的了。于是在此处写下记录。

一个 Android 项目的 Gradle Scripts 下有几个重要的文件，一个是大家都会用的 Module app 层的 `build.gradle.kts`，还有一个是顶层 Project 层的 `build.gradle.kts`。然而这都不是最重要的，最重要的其实是 `libs.versions.toml`，这也是两个 `build.gradle.kts` 的根基。

我们平时在 `build.gradle.kts` 里添加依赖，gradle sync 时就会自动把需要的东西 resolve 进 `libs.versions.toml`。然后这些 resolve 方式非常脏，会把 `libs.versions.toml` 弄得一团糟，比如 resolve Room 时堆了一堆 _room-common_，_room-compiler_ 等等，然后这些 room package 的 version 也都是重复多余的；另一个例子是 ksp 引入时它的 version 跟 kotlin version 也不匹配，导致 gradle build 时直接爆炸。

所以直接看 `libs.versions.toml`，`[versions]` 提供了 name 到 versions 的一个 alias，这个 alias 在后续每个条目的 `version.ref` 里使用。`[libraries]` 就是 APP 层 `build.gradle.kts` 的 `libs.xxx` 引用的玩意，`[plugins]` 就是两个 `build.gradle.kts` 里 plugins 块里引用的玩意，这样一来就清晰很多了。

因此回到 Room 配置的问题，在 2024 年的 Android Studio + Kotlin 下，我们不能像 sb [官方文档](https://developer.android.com/training/data-storage/room?hl=zh-tw)那样配置，而是应该：

1. 编辑 `libs.versions.toml`，

   ```toml
   [versions]
   kotlin = "2.0.20"
   room = "2.6.1"
   ksp = "2.0.20-1.0.25"

   [libraries]
   room-common = { group = "androidx.room", name = "room-common", version.ref = "room" }
   room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
   room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }
   room-testing = { group = "androidx.room", name = "room-testing", version.ref = "room" }
   room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room" }

   [plugins]
   ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
   ```

   这样写的依据是：

   1. 所有 room 相关的包必须是同版本，无需多个 versions
   2. ksp 版本必须和 kotlin 版本一致

2. 然后就可以愉快地引用了。

   ```kotlin
   // 顶层
   plugins {
     alias(libs.plugins.ksp) apply false
   }
   // APP 层
   plugins {
     alias(libs.plugins.ksp)
   }
   dependencies {
     implementation(libs.room.common)
     implementation(libs.room.runtime)
     annotationProcessor(libs.room.compiler)
     ksp(libs.room.compiler)
     implementation(libs.room.ktx)
     testImplementation(libs.room.testing)
   }
   ```

## 权限

放眼 Android，最复杂，坑最多的地方莫归于权限了。不同的 API 版本有不同的权限处理方案，这些方案杂糅在一起，网上一大堆教程和 GPT 几乎全部作废。我几度被权限折磨得死去活来，并最终放弃 Android 开发。

我刚开始写 Android 时还想着抽象一个 class PermissionManager 解决所有权限问题。显然我想得太简单了。各种需要缓存的中间对象，各种 Permission 需要的上下文都不同，这样只是死路一条。
