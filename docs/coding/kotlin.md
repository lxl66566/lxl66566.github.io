# kotlin
java 的替代品，可以无缝集成 java。Android 开发的官方语言。更现代的语法。
## 我的入坑
学了 [java](./java.md) 以后，感觉太拉了。追求新潮流的本性让我想学习之。而且，我也比较喜欢 kotlin 的一些设计理念[^1]。

[^1]: https://www.kotlincn.net/docs/reference/null-safety.html

## 开发环境
*本着我 all in vscode 的原则，*

1. 安装扩展 Kotlin Language (>1M)
2. 新建 xxx.kt 文件，写点 helloworld
3. 终端 `kotlinc xxx.kt -include-runtime -d xxx.jar && java -jar xxx.jar`（本质上是编译出 jar 包然后用 java 执行）

可以安装 code runner (<1M) 简化这一流程。