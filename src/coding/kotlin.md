---
date: 2023-05-26
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# kotlin

java 的替代品，可以无缝集成 java。Android 开发的官方语言。更现代的语法。

## 我的入坑

学了 [java](./java.md) 以后，感觉太捞了。追求新潮流的本性让我想学习之。而且，我也比较喜欢 kotlin 的一些设计理念[^1]。

[^1]: [关于空安全的语法糖](https://www.kotlincn.net/docs/reference/null-safety.html)

## 开发环境

配了半天，感觉 kotlin 的开发生态还是比 java 差多了。vscode 里搜 kotlin，都出不来几个插件。

我尝试 all in vscode，

1. 安装扩展 _Kotlin Language_
2. 新建 xxx.kt 文件，写点 helloworld
3. 终端 `kotlinc xxx.kt -include-runtime -d xxx.jar && java -jar xxx.jar`（本质上是编译出 jar 包然后用 java 执行）
   - 可以安装 code runner (<1M) 简化这一流程。（但是这玩意有点流氓，会替换你的运行图标）
   - 可以设命令行 alias

Kotlin Language 只能提供代码高亮，而没有 linter。如果想要 linter，可能需要用 _Kotlin_ 扩展，但是其需要运行在 inside a Gradle or Maven project，且文档中并没有写如何配置，我也折腾不清楚。

如果可能的话，还是用 Android Studio 吧。

### formatter

试了下 vscode 扩展中的两个 kotlin formatter，都用不了，评价为捞。

然后试 [ktfmt](https://github.com/facebook/ktfmt)。

1. 安装 _ktfmt_ vscode 扩展
2. 下载 `ktfmt-version-jar-with-dependencies.jar` （必需要 with-dependencies，否则无效）
3. 更改 settings.json（要改的还挺多，注意路径）
   ```json
   {
     "java.configuration.runtimes": [
       {
         "name": "OpenJDK-22",
         "path": "D:/scoop/apps/openjdk22/current",
         "default": true
       }
     ],
     "ktfmt.path-to-jar": "D:/no_install_software/ktfmt-0.50-jar-with-dependencies.jar",
     "[kotlin]": {
       "editor.defaultFormatter": "crdrost.ktfmt"
     },
     "[kotlinscript]": {
       "editor.defaultFormatter": "crdrost.ktfmt"
     }
   }
   ```

就可以保存时自动格式化了。

kotlin 没有官方推出的统一格式化工具，外加用的 jar + 虚拟机非常慢，每次保存时是可以感受到明显延迟的。

## 快速入门

说到 _快速_ 二字，那当然还得是我 [learnxinyminutes](https://learnxinyminutes.com/docs/zh-cn/kotlin-cn/) 了。

当然只看这点肯定不够，泛型，接口，数据结构深入，这里都不会讲，需要额外学习。

泛型和面向对象跟 java 基本一样，不过后者倒是添了很多新东西。

有了上述基础概念，然后再看一些 kotlin 进阶的零碎内容，用于补全知识。

## 泛型

[Effective Kotlin](https://narenkmanoharan.gitbooks.io/effective-kotlin/content/chapter-4-generics.html) 讲的不错。

kotlin 的泛型太弱了。

- 添加多个约束必须用 where，比起 rust 直接 `+` 少了点糖。
- 居然没有一个约束能让 `T + T` 成立？也就是没有一个 `Addable<T>`？
- 没有 android 长度约束，例如限定 T 只能接受 Dp, Sp, Px 等。

## 面向对象

- kotlin 会自动为 public 成员生成 setter/getter。这样的本意是好的，但是如果你的 class 继承自一个 interface，而这个 interface 里的函数是 setter/getter 同名函数，那么实现 `override fun getXxx` 后编译就会报错 _The following declarations have the same JVM signature_，还是比较具有迷惑性的。如果你有这样的函数，记得把成员声明为 private。
  - 最理想的应该是 kotlin 生成的 setter/getter 自动 impl 了这个 interface，可惜 kotlin 不这样干。这样必须 private 后自己重写一遍 setter/getter，还是很丑的。

## 杂

- [如何写 doc comment](https://kotlinlang.org/docs/kotlin-doc.html)
