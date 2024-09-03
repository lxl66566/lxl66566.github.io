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

## 杂

- [如何写 doc comment](https://kotlinlang.org/docs/kotlin-doc.html)
