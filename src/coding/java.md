---
date: 2023-03-17
icon: brands fa-java
category:
  - 编程
tag:
  - 编程语言
---

# Java

::: details 暴论

入门 java，远离 java。

DBeaver 烂，JB 家一堆烂，Minecraft 烂，sonarlint 烂，我接触到的 java 写成的玩意总能给我带来不悦。

在我看来 Java 的优势是跨平台，代码容易维护（方便 t 人）。但是作为带 GC 的语言，Java 的性能一般（强类型打不过弱类型）；与其他 GC 语言相比，Java 编写的复杂度又更高。同时 Java 的自由度不高（其实某些方面可能还算优点），因此我对之并无好感。java 社区相较而言也死气沉沉，到处是 java 8（今夕是何年），<span class="heimu" title="你知道的太多了">tg 其他群在讨论技术问题的时候 java 群总是在疯狂 ot（不过是通病，python 群也一样</span>。java 学到后期全是框架，不好玩，没意思（

哦，顺带一提，Android 开发建议直接 [kotlin](./kotlin.md)，Google 官方推荐的语言，并且全兼容 java。确实比 java 有意思多了。

:::

由于想混学分，选修了 Java，因此记录一下我学习 Java 的历程。由于不打算深入，因此只涉及语言基础，不涉及框架。

根据其他语言学习经验，到处搜，用 Java 写点算法题，多写就完了。也可以问问 ChatGPT。

大作业做了个[垃圾](https://github.com/lxl66566/my-college-files/blob/main/信息科学与工程学院/java/实验代码/bank_gui.java)。<heimu>我校指定大作业必须做个银行管理系统 demo，不能自由选择课题。</heimu>

## 开发环境

### windows

去官网下 sdk，尽可能下载最新版本（激进）。

或者使用 [scoop](../farraginous/recommend_packages.md#scoop)：

```sh
scoop bucket add java
scoop install openjdk22
# 写此段落时最新版本为 22
```

### linux

安装就不用多说了。arch 的 [jdk 与 jre 是冲突的](https://t.me/archlinuxcn/252)，请选择安装 jdk。

### 基础使用

虽然有各种 eazy runner 帮忙跑程序，但是还是多了解点原理。

`javac xx.java` 生成 `.class` 字节码。`java xx` 执行程序。

### vscode

首先假设已经装好了 JDK。

在 vscode 扩展商店搜 `java`，直接装整个包：_Extension Pack for Java_，然后就能跑了。也可以自己选插件，理论上只需要 LSP + Runner 即可。

包管理器（gradle）就 `scoop install gradle` 一行完事。

## 语言基础

### 循环

JDK 5 引入了 `for (auto& element : collection) {}` 的循环，比 C++11 类似的功能早多了。

### var

Java 10 语法糖，类型推断。like C++: `auto`, but not so powerful.

## exception

> java 错误处理挺不错的，至今也有人认为 java exception 优于 rust Result&lt;T,E&gt;.

函数可以声明可能抛出的异常，则 throw exception 后会直接跳出这个函数。

```java
class X1Exception extends Exception{}
class X2Exception extends Exception{}
void t() throws Exception{
    throw new X2Exception("...");
    assert unreachable == true;
}
// ... main
try { t(); } catch(X1Exception | X2Exception e) {
    System.out.println(e.getMessage());
}
```

## 断言

使用非常简单，`assert expression`，不过呢，需要加入 JVM 参数 `-ea`：`java -ea Main.java`

具体地，在 vscode 中，点击 _运行(R) - 添加配置..._，在你需要的文件项下加入 `"vmArgs": "-ea"`。

## 其他关键字

- native：表示函数是外部的，类似 C/rust 的 extern。

## 数据结构

### 动态数组

Arraylist 和 Vector，后者是线程安全的，更慢。没有多线程需求建议直接用前者。

```java:no-line-numbers
private ArrayList<account> accounts = new ArrayList<>(List.of(new account("admin", "admin")));
```

### Hashmap

搜吧，懒得再讲了

### LinkedHashMap

有序的 HashMap，按照添加顺序

### record

java 14 语法糖，快速创建一个拥有不可变成员的类，自带 toString 等。

## Stream

stream (Java 8) 是 java 中很重要的一个概念，可以理解成迭代器（链表?）。类比 Rust 或 C++20 的 std::ranges。

> 刚发现的写的不错的[参考](https://blog.csdn.net/zhiyuan263287/article/details/124540708)。

### 基本操作

- 连接流：`Stream.concat(stream1,stream2)`
- 映射：`map`
- 过滤：`filter`
- 元素操作：`forEach(lambda)`

### 常用方法

```java
var list = Stream.of(1,2,3).collect(Collectors.toCollection(ArrayList::new));   // 为 Arraylist 赋值
list.stream();                                                                  // Arraylist 转流
Stream.of(1,2,3).mapToInt(Integer::intValue).max().getAsInt();                  // 计算最大值
// 对于 Arraylist, 更好的做法是 Collections.max(list)

Stream.of(1,2,3).mapToInt(Integer::intValue).average().getAsDouble();           // 计算平均值
Stream.of(1,2,3).sorted();                                                      // 排序（升序）
Stream.of(1,2,3).sorted(Comparator.reverseOrder());                             // 排序（降序）
```

### Intstream

以这个结构为例了解其用法。

```java
var temp1 = IntStream.rangeClosed(1, 3);    // 生成闭区间流 1,2,3
var temp2 = IntStream.range(1, 3);          // 生成左闭右开区间流 1,2
var temp3 = temp1.boxed();                  // Intstream 转为 Stream
```

## Optional

Java 8 新增的 Optional，是编程中空处理的重要思想。还挺早的。（后来 [kotlin](./kotlin.md) 又把空安全发扬光大了）

```java
Optional.of(value)                                              // 创建，value 不可为 null
Optional.ofNullable(null)                                       // 创建，建议都使用此方法
Optional.ofNullable(123).ifPresent(u -> System.out.println(u)); // 操作值
Optional.ofNullable(123).orElse(456);                           // 取值
Optional.ofNullable(123).map(u -> u + 2);                       // 映射
Optional.ofNullable(123).filter(u -> u < 150);                  // 映射
```

## 序列化

> java 的序列化真是方便啊。没想到强类型语言也能这么轻松。

序列化就理解为保存变量到文件，必要时也可以从文件里反序列化，读取变量。

```java
class account implements Serializable {}    // 继承接口
private ArrayList<account> accounts;    // 可以直接序列化对象数组
// serilize
try (FileOutputStream fos = new FileOutputStream("account.data");   // 存在执行目录下
        ObjectOutputStream oos = new ObjectOutputStream(fos);) {
    oos.writeObject(accounts);
} catch (Exception e) {
    System.out.println("write to file failed");
}
// deserilize
try (var fis = new FileInputStream("account.data");
    var ois = new ObjectInputStream(fis);) {
    accounts = (ArrayList<account>) ois.readObject();
} catch (IOException ioe) { // 如果文件不存在
    accounts = new ArrayList<>();   // 默认值
} catch (Exception c) {
    System.out.println("unknown exception");
    c.printStackTrace();
}
```

## swing

java GUI，跟 Qt 相比肯定是很拉的，但是也有一些优点：

- 原生自带，无需下载其他组件
- 无需构建系统，单文件就能跑

但是纯靠布局真的是非常噩梦的体验...

### 组件

- JPanel：理解为容器
- JLable
  - 设置字号/字体/效果：`lable.setFont(new Font(Font.SERIF, Font.BOLD, 18));`
- JPasswordField：密码输入框。`getText()` 不安全会被警告，`getPassword()` 则返回 char[] 需要自行处理。

### 事件

\>=Java 8: 请使用 lambda 函数而不是将所有窗口事件在一个函数中处理。

```java
button.addActionListener(e -> {
    ...
});
```

## Spring

Spring 算是 java 必修了，不过我们课上没学。Spring 是一个网络框架，使用它可以很轻松地编写后端项目。而 SpringBoot 是官方出的一个快速搭建 Spring 项目的组件，可以通过几行 yml 配置好所有设置。

Spring 在 idea 运行时会自动起一个 tomcat 来运行服务。（tomcat 是一种网络容器，用它可以方便地部署网络应用）

### 注解

Spring 中大量使用注解进行业务包装，这是好文明。一些常用注解：

- @RequestMapping：最常用的，处理路由的 request。可以再细分成 GET、POST、PUT 和 DELETE 请求。

## JVM 调优

基础概念：

- java8 有这些 GC：Serial GC, Parallel GC, CMS, G1
  - 后二者将 GC 分为几个阶段，只在其中部分阶段 stop the world
- java 的 gc 是从根节点开始扫描不可达对象。
- JDK8 的 GC 是分两代，新生代和老年代。新生代里又有三个区（eden, Survivor（s1, s2））。在新生代 gc 叫 minor gc，gc 老年代 + 新生代叫 full gc。
  - 每次 gc 会使新生代对象的 age + 1，当 age 超过一定值时将被移入老年代
  - Survivor 区的对象总年龄超过 50% 时也会将部分年龄最大的移入老年代
- java8 的几个 GC 都是 stop the world 的，调优目的就是减少 full gc，减少 stop the world。

### 工具

jvisualvm 是 jdk 里自带的 GUI 分析工具，可以追踪 GC 状况，日志，系统资源占用等。

## 一些问题

#### swing repaint

在 remove 后 add 组件，需要重绘。

```java
panel.revalidate();
panel.repaint();
```
