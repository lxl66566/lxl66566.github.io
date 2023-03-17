# Java
由于想混学分，选修了 Java，因此记录一下我学习 Java 的历程。

在我看来 Java 的优势是跨平台。但是作为带 GC 的语言，Java 的性能一般；与其他 GC 语言相比，Java 编写的复杂度又更高。同时 Java 的自由度很低（甚至不能自定义类型别名，还有默认驼峰命名并对异己发出警告），因此我对之并无好感。
## 学习方法
根据其他语言学习经验，到处搜，用 Java 写点算法题，多写就完了。也可以问问 ChatGPT。

Java 跟 C++ 语法挺像的。~~虽然对标的 C# 应该会更像，但我没学。~~
## 使用 vscode 开发
首先假设已经装好了 JDK。

在 vscode 扩展商店搜 `java`，直接装整个包：*Extension Pack for Java*，然后就能跑了。包管理器就 scoop 一行完事。
## var
Java 10 新特性，类型推断。like C++: auto
## 数据结构
### 动态数组
Arraylist 和 Vector，后者是线程安全的，更慢。没有多线程需求建议直接用前者。
## Stream
stream (Java 8) 是 java 中很重要的一个概念，可以理解成迭代器（链表?）。类比 Rust 或 C++20 的 std::ranges。

刚发现的写的不错的[参考](https://blog.csdn.net/zhiyuan263287/article/details/124540708)。
### 基本操作
* 连接流：`Stream.concat(stream1,stream2)`
* 映射：`map`
* 过滤：`filter`
* 元素操作：`forEach(lambda)`
### 流赋值
```java
var list = Stream.of(1,2,3).collect(Collectors.toCollection(ArrayList::new));   // 为 Arraylist 赋值
```
### Intstream
以这个结构为例了解其用法。
```java
var temp1 = IntStream.rangeClosed(1, 3);// 生成闭区间流 1,2,3
var temp2 = IntStream.range(1, 3);      // 生成左闭右开区间流 1,2
var temp3 = temp1.boxed();              // Intstream 转为 Stream
```
## 断言
使用非常简单，`assert expression`