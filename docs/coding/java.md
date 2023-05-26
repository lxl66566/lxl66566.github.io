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
Java 10 新特性，类型推断。like C++: `auto`
## 数据结构
### 动态数组
Arraylist 和 Vector，后者是线程安全的，更慢。没有多线程需求建议直接用前者。
### Hashmap
搜吧，懒得再讲了
## Stream
stream (Java 8) 是 java 中很重要的一个概念，可以理解成迭代器（链表?）。类比 Rust 或 C++20 的 std::ranges。

刚发现的写的不错的[参考](https://blog.csdn.net/zhiyuan263287/article/details/124540708)。
### 基本操作
* 连接流：`Stream.concat(stream1,stream2)`
* 映射：`map`
* 过滤：`filter`
* 元素操作：`forEach(lambda)`
### 流转数据结构
```java
var list = Stream.of(1,2,3).collect(Collectors.toCollection(ArrayList::new));   // 为 Arraylist 赋值
list.stream();  // Arraylist 转流
```
### 流计算
```java
Stream.of(1,2,3).mapToInt(Integer::intValue).max().getAsInt();  // 计算最大值
// 对于 Arraylist, 更好的做法是 Collections.max(list)
Stream.of(1,2,3).mapToInt(Integer::intValue).average().getAsDouble();   // 计算平均值
Stream.of(1,2,3).sorted();  // 排序（升序）
Stream.of(1,2,3).sorted(Comparator.reverseOrder()); // 排序（降序）
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

不过呢，需要加入 JVM 参数 `-ea`：`java -ea Main.java`

具体地，在 vscode 中，点击 *运行(R) - 添加配置...*，在你需要的文件项下加入 `"vmArgs": "-ea"`。
## Optional
option 思想，编程的重要思想。Java 8 新增的，还挺早的。
```java
Optional.of(value)          // 创建，value 不可为 null
Optional.ofNullable(null)   // 创建，建议都使用此方法
Optional.ofNullable(123).ifPresent(u -> System.out.println(u)); // 操作值
Optional.ofNullable(123).orElse(456);   // 取值
Optional.ofNullable(123).map(u -> u + 2);   // 映射
Optional.ofNullable(123).filter(u -> u < 150);   // 映射
```
## swing
java GUI，跟 Qt 相比肯定是很拉的，但是也有一些优点：
* 原生自带，无需下载其他组件
* 无需构建系统，单文件就能跑

但是纯靠布局真的是非常噩梦的体验...
### 组件
* JPanel：理解为容器
### 事件
请使用 lambda 函数而不是将所有窗口事件在一个函数中处理。
```java
button.addActionListener(e -> {
    ...
});
```