---
date: 2023-03-17
icon: brands fa-java
category:
  - 编程
tag:
  - 编程语言
---

# Java

::: details java 缺点 - 暴论

入门 java，远离 java。

- DBeaver 烂，JB 家一堆烂，Minecraft 烂，sonarlint 烂，我接触到的 java 写成的玩意总能给我带来不悦。
- 作为带 GC 的语言，Java 的性能一般（强类型打不过弱类型）；与其他 GC 语言相比，Java 编写的复杂度又更高。
- java 社区相较而言也死气沉沉，到处是 java 8（今夕是何年）。
- java 学到后期全是业务框架，不好玩，没意思。对于喜欢做小项目的我，java 的业务抽象反而是额外的复杂度，也不能让代码可读性和易用性更强。

哦，顺带一提，Android 开发建议直接 [kotlin](./kotlin.md)，Google 官方推荐的语言，并且全兼容 java。确实比 java 有意思多了。

:::

然而现在国内的 java 就业需求仍然是最高的，如果为了就业的话就不得不学了。

## 开发环境

### jdk

Windows：使用 [scoop](../farraginous/recommend_packages.md#scoop)，或者去官网下载。Linux：不多说了。

```sh
scoop bucket add java
# 然后根据你需要的版本安装对应 jdk。
scoop install openjdk22
scoop install corretto8-jdk
scoop install liberica8-full-jdk
```

几个不同提供方：

- corretto\* 是 Amazon 维护的免费、生产级 OpenJDK 8 发行版，支持周期长，包含安全修复。
- temurin\* 是社区和其他厂商维护的版本，更改少点。
- openjdk\* 是 oracle 自家的原味版本。注意 openjdk 已经没有 java 8 了。

如果你是为了兴趣学习，安装最新版本 jdk；如果是工作，根据不同要求可以选择安装 java 8 或 java 17。

### IDE

::: tabs

@tab vscode

如果只是写一些小项目，比如跑跑学校的课程，并且不需要多人协作，vscode 是完全够用的。

对于大型项目，强行使用 vscode 可能需要付出一些代价，但也绝非不可能，我一直在研究这方面的解决方法，并且有一些小心得。

#### 扩展

分析器：

- 在 vscode 扩展商店搜 `java`，直接装 _Language Support for Java(TM) by Red Hat_ 即可，这是最老牌、兼容性最好的 java 插件，用来分析大项目也是没啥问题的。
  - Red Hat 这个插件在跳转的时候会比 idea 慢一些，我猜测它是 lazy 的，打开项目时不会提前建立索引，而是在跳转时才分析。
- 不要装 Apache NetBeans，这玩意不是生产可用的。

运行/调试器：

- 对于小型项目，例如单文件，直接 `javac xx.java` 生成 `.class` 字节码。`java xx` 执行程序就行。
- 对于中大型项目，安装微软的 _Debugger for Java_。然后写一个 `.vscode/launch.json`，具体内容可以从 idea 导出 XML 配置后，再让 AI 生成。然后就可以在左侧边栏找到 debugger 图标，运行或调试了。这里是我的 example。
  ```json
  {
    "version": "0.2.0",
    "configurations": [
      {
        "type": "java",
        "name": "XXX",
        "request": "launch",
        "mainClass": "com.xxx.yyy.zzz",
        "projectName": "yyy",
        "shortenCommandLine": "jarmanifest",
        "vmArgs": "-Dfile.encoding=UTF-8 -Dxxx.xxx=xxx",
        "env": {
          "k": "v"
        }
      }
    ]
  }
  ```

- 其他可选：
  - Mybatis 跳转：_Mybatis Helper - Greenplumwine_，可以在 Mapper java 和 xml 之间互相跳转。这玩意 fork 了好几版，这个是目前还有人在维护的一版。

#### formatter

使用 vscode 做 java 大项目的一大痛点是 formatter。别人都在用 idea 进行格式化，而 idea 的 formatter 目前没有可用的第三方实现，如果用自己的 formatter，代码风格和别人的无法兼容。

- 目前来说，和 idea formatter 兼容性最高的还是原生 _Language Support for Java(TM) by Red Hat_，但是需要让使用 idea 的其他开发把 code format 导出为 Eclipse XML Profile，然后在 vscode 插件里指定。不过即使这样也没法完全复刻 idea 的 formatter，只能做到相对来说风格相似，仍会有一些行为是不一致的。
- [a-havrysh/vscode-intellij-code-formatter](https://github.com/a-havrysh/vscode-intellij-code-formatter) 是个新代码库，到我写出这段文字的时候该仓库还是 0 star。~~看到 commit 信息里有名为 claude 的菊花我就浑身难受~~，试用了下，果然不出意外地难用，即使我指定了 idea 导出的 XML 格式化文件，它的格式化行为也和 idea 是不一致的。

然后我想出了一个最终邪道：通过 commit hook **直接调用 idea** 进行 format，本质上是起了个无窗口 idea。

注意执行这个脚本的时候 idea 不能正在运行，因为同一时间只能有一个 idea 实例。由于 idea 在 format 完还会干很多别的事，例如加载插件等，所以我在 format 结束后就立刻 kill 掉了。

```py :collapsed-lines
#!/usr/bin/env python

import os
import platform
import subprocess
import sys
import time

STYLE_XML_PATH = r"C:\programs\work\XXX.xml"

IDEA_BIN_PATHS = {
    "Windows": r"C:\software\IDEA\bin\format.bat",
    "Darwin": "/Applications/IntelliJ IDEA.app/Contents/bin/format.sh",
    "Linux": "/opt/intellij-idea/bin/format.sh",
}

ALLOWED_REPOS = [
    "your_folder_name"
]


def get_platform_idea_bin():
    system = platform.system()
    path = IDEA_BIN_PATHS.get(system)

    if not path:
        print(f"[Error] Unsupported OS: {system}")
        sys.exit(1)

    if not os.path.exists(path):
        print(f"[Error] IDEA formatter not found at: {path}")
        print("Please update the path in 'idea_format.py' to match your installation.")
        sys.exit(1)

    return path


def get_staged_java_files():
    try:
        # --diff-filter=ACMR: Added, Copied, Modified, Renamed
        cmd = ["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR"]
        result = subprocess.check_output(cmd).decode("utf-8")
        files = [f.strip() for f in result.splitlines() if f.strip().endswith(".java")]
        return files
    except subprocess.CalledProcessError:
        print("[Error] Failed to get staged files.")
        sys.exit(1)


def main():
    if not os.path.exists(STYLE_XML_PATH):
        print(f"[Error] Style XML not found: {STYLE_XML_PATH}")
        sys.exit(1)

    files = get_staged_java_files()
    if not files:
        sys.exit(0)

    idea_bin = get_platform_idea_bin()

    print(f"Found {len(files)} staged Java files.")
    print("Running IntelliJ IDEA Formatter (this may take a few seconds)...")

    abs_style_path = os.path.abspath(STYLE_XML_PATH)
    cmd = [idea_bin, "-s", abs_style_path] + files

    try:
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="gbk" if platform.system() == "Windows" else "utf-8",
            errors="ignore",
        )

        formatted_success = False
        while True:
            line = process.stdout.readline()
            if not line and process.poll() is not None:
                break
            if line:
                line_content = line.strip()
                print(f"  [IDEA] {line_content}")

                if (
                    "file(s) formatted" in line_content
                    or "files formatted" in line_content
                ):
                    print(
                        "Formatting detected. Killing IDEA process to skip plugin errors..."
                    )
                    formatted_success = True
                    time.sleep(0.1)
                    process.terminate()
                    break

                if "Only one instance" in line_content:
                    print("\nError: IDEA is running. Please close it first.")
                    process.kill()
                    sys.exit(1)

        if process.poll() is None:
            process.kill()

        if not formatted_success:
            pass

    except Exception as e:
        print(f"[Error] Execution failed: {e}")
        sys.exit(1)

    print("Re-staging files...")
    subprocess.check_call(["git", "add"] + files)


if __name__ == "__main__":
    repo_dir = os.path.basename(os.getcwd())
    print(f"Current directory: {repo_dir}")
    if repo_dir not in ALLOWED_REPOS:
        print(f"repo not in {ALLOWED_REPOS}, skipping formatting for {repo_dir}")
        sys.exit(0)
    main()
```

但是 idea 还有个好用的功能是仅格式化有修改的代码行，如果你的 code base 本身并没有 fully formatted，但是又想对自己更改的内容开启格式化，这个就更难办了。在被骂过一次以后我又改进了一下脚本。

贴到 [gist 上](https://gist.github.com/lxl66566/95839c198a4e00e2b279d30af0f9dfb9)了，这里地方太小写不下.jpg

@tab idea

> 但凡有半点选择，我都不会用 idea，因为它作为一个编辑器实在是[太烂了](../gossip/fuckxxx.md#jetbrains-系列)。。。

vscode 的 java 扩展很弱鸡的，没法满足复杂的开发需求。如果是已有的 java 项目或者需要进行复杂项目开发，那么 idea 就是必要的了。idea 有社区版，这个是免费的，不需要破解，理论上也够用，没必要给 jb 送钱。

我习惯了 vscode，我比较希望将键位等都改成 vscode 上的习惯。idea 可以导入当前计算机上已有的 vscode 配置，不过算是聊胜于无。。这里有一些我的配置心得。

1. 因为 jb 家的东西都差不多，之前[配 Android Studio 的经验](./android.md#android-studio)也可以套用一点。
2. 继续删除/禁用那些没用的插件。idea 的社区版会预装很多 ultimate 的插件，然后不让你用。。
3. _编辑器 > 常规 > 编辑器标签页_，勾选 _标记已修改_。非常重要，被坑了几次。。。
4. 调整 KeyMap：前提是把 vscode 的 KeyMap 同步过来。
   - 取消绑定所有 Ctrl + w，只保留 `窗口 -> 编辑器标签页 -> 编辑器关闭操作 -> 关闭标签页`。否则在终端里使用 Ctrl + w 会关闭终端。
   - 即使把 vscode 的 vim 插件同步过来，vscode 的 vim 配置也不会同步到 ideavim。很多键位也是需要改的，比如我保留了许多编辑器自己的行为而不是 vim 行为。
5. 配置 ideavim。
   ```vim
   " 双引号是注释
   set nocompatible           " 关闭vi兼容模式
   set clipboard+=unnamedplus " 复制粘贴时同时复制到剪贴板
   set incsearch              " 搜索时实时高亮
   set hlsearch               " 高亮搜索结果
   set ignorecase             " 搜索忽略大小写
   set smartcase              " 如果搜索包含大写，则不忽略大小写
   vnoremap <C-c> "+y " 将 Visual 模式下的 Ctrl+c 映射为复制到系统剪贴板
   " 删除相关
   nnoremap x "_x
   vnoremap x "_x
   snoremap x <C-g>"_x
   nnoremap d "_d
   vnoremap d "_d
   snoremap d <C-g>"_d
   nnoremap D "_D
   " select mode 相关
   set keymodel^=startsel
   set selectmode+=mouse,key
   set idearefactormode=keep
   vnoremap <BS> "_c
   snoremap <BS> <C-g>"_c
   vnoremap <Del> "_c
   snoremap <Del> <C-g>"_c
   ```
   - ideavim 其他常用操作：
     - `gd` 是 go definition，就是鼠标 ctrl + 左键单击。
     - `<C-o>` 是返回，`<C-i>` 是前进，相当于两个鼠标侧键。
6. 为所有文件开启软换行。
7. 关闭 _分支切换时还原工作区_，没啥必要，又没开几个面板

如果 idea 以管理员运行，则插件也会获得管理员权限，而插件的行为不是我们能控制的，所以最好不要以管理员运行 idea。

:::

### gradle

`scoop install gradle` 一行完事。

- 但是很多项目有自己的 gradle 版本要求。如果运行 `./gradlew build`，脚本会帮你下载对应版本，而且下载得还贼慢。。。<heimu>不会做下载器就别做。</heimu> 此时需要自己下载，然后把整个 zip 放到 `C:\Users\<用户名>\.gradle\wrapper\dists\gradle-版本-bin\<一串随机乱码>\` 下。

## 语言基础

### 循环

JDK 5 引入了 `for (Type var : iterable) {}` 的循环。

- 循环中发生的 copy，对于对象是引用 copy，对于基本类型是值 copy。

### var

Java 10 语法糖，类型推断。like C++: `auto`, but not so powerful.

### exception

> java 错误处理挺不错的，至今也有人认为 java exception 优于 rust `Result<T, E>`.

函数可以声明可能抛出的异常，则 throw exception 后会直接跳出这个函数。只有受检异常（非 RuntimeException）必须声明 throws 抛出；RuntimeException 和 Error 是隐式抛出的，不需要声明。

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

java 7 之后还可以使用 [try-with-resource](https://github.com/Jueee/effective-Java/blob/master/ch02创建和销毁对象/09.使用try-with-resources语句替代try-finally语句.md) 以自动释放资源。

### 断言

使用非常简单，`assert expression`。默认不启用检查，需要加入 JVM 参数 `-ea` 才会触发运行时检查：`java -ea Main.java`。

### 关键字

- final：不可变，immutable。不需要同步，性能高。
- native：表示函数是外部的，类似 C/rust 的 extern。
- record：java 14 语法糖，快速创建一个拥有不可变成员的类，自带 toString 等。
- volatile：用于多线程的关键字，强制数据在内存和 CPU cache 里同步，所有线程看到的变量都是最新的。volatile 不等于加锁。
- synchronized：互斥锁，同一时间只能有一个线程访问此资源。

### 数据结构

- 创建临时数组：
  - \>= java 9：使用 `List.of`，创建不可变的数组。
  - java 8：使用 `Arrays.asList`。
- 类似的，创建临时 Map：
  - \>= java 9：使用 `Map.of`。
  - java 8：使用 `com.google.common.collect.ImmutableMap`，用法跟 `Map.of` 类似。否则就需要用 Stream + collect 或者手动添加元素创建。
- 动态数组：
  - Arraylist 和 Vector，后者是线程安全的，更慢。
    ```java:no-line-numbers
    private ArrayList<account> accounts = new ArrayList<>(List.of(new account("admin", "admin")));
    ```
- Hashmap：哈希表，不多说。
- LinkedHashMap：有序的 HashMap，按照添加顺序

### 面向对象

基础的就不说了。这里随便记一些。

- 类代码块：class 里可以写一段 `static { ... }` 静态代码块，内部的代码会在类初始化时执行（构造之前、访问 static 成员之前），有一点点像 Rust LazyLock。如果写 `{ ... }` 就是实例代码块，每次创建实例时都执行。
- 如果要处理 interface，downcast 到不同的 class：
  - java 8 只能 if (xxx instanceof xxx) 判断然后强转。
  - java 21 可以 switch。

### 包装类

基本类型例如 bool，包装类 Boolean。

- 一般尽可能用基本类型，性能好，还有非空保证。但有时候不得不用包装类，比如需要 nullable，或者泛型等。
- java 中只要是包装类，就有可能是 null，一旦在逻辑判断中直接当做基本类型用（自动拆箱），就会 NPE。比较难防。
  - 这时候需要一些额外操作，例如使用第三方包 org.apache.commons.lang3.BooleanUtils。就是一个默认会判空的 Boolean 判断条件。

### lambda

java 8 引入的匿名函数。`(parameter1, parameter2) -> expression`，expression 也可以是一个花括号 code block。

### 泛型

泛型在实现上基于类型擦除，是因为泛型出现时大量的代码没有使用泛型，需要保证和老代码的可交互性。这意味着泛型只在编译期存在，运行期不存在，使用 Jackson 等进行反序列化的时候需要添加 TypeReference。

- 泛型不支持基本类型，只能用包装类。
- 泛型不可变，比如我不能将 `List<T>` 转为 `List<I>`，即使 T implements I。必须新建一个 List，然后强转过去（构造函数强转）。

### Stream

Stream (Java 8) 是 java 中很重要的一个概念，可以理解成迭代器。类比 Rust iterator 或 C++20 的 std::ranges。Stream 提供了一组函数式链式操作。

> 刚发现的写的不错的[参考](https://blog.csdn.net/zhiyuan263287/article/details/124540708)。

#### 基本操作

- 连接流：`Stream.concat(stream1,stream2)`
- 映射：`map`
- 过滤：`filter`
- 元素操作：`forEach(lambda)`

#### 常用方法

```java
var list = Stream.of(1,2,3).collect(Collectors.toCollection(ArrayList::new));   // 为 Arraylist 赋值
list.stream();                                                                  // Arraylist 转流
Stream.of(1,2,3).mapToInt(Integer::intValue).max().getAsInt();                  // 计算最大值
// 对于 Arraylist, 更好的做法是 Collections.max(list)

Stream.of(1,2,3).mapToInt(Integer::intValue).average().getAsDouble();           // 计算平均值
Stream.of(1,2,3).sorted();                                                      // 排序（升序）
Stream.of(1,2,3).sorted(Comparator.reverseOrder());                             // 排序（降序）
```

- `collect(Collectors.toMap(...))` 是超级大坑，toMap 不允许 Value 为 null，否则会直接报 NPE。如果可能为空，需要用 `collect(HashMap::new, (m, v) -> m.put(v.getId(), v.getNote()), HashMap::putAll);`。

#### Intstream

以这个结构为例了解其用法。

```java
var temp1 = IntStream.rangeClosed(1, 3);    // 生成闭区间流 1,2,3
var temp2 = IntStream.range(1, 3);          // 生成左闭右开区间流 1,2
var temp3 = temp1.boxed();                  // Intstream 转为 Stream
```

### Optional

Optional 的作用是强制调用方处理空值。

```java
Optional.of(value)                                              // 创建，value 不可为 null
Optional.ofNullable(null)                                       // 创建
Optional.ofNullable(123).ifPresent(u -> System.out.println(u)); // 操作值
Optional.ofNullable(123).orElse(456);                           // 取值
Optional.ofNullable(123).map(u -> u + 2);                       // 映射
Optional.ofNullable(123).filter(u -> u < 150);                  // 映射
```

由于 java 泛型不能为基本类型，这里的 Optional 都会自动装箱。为了避免装箱性能损耗，java 8 还额外提供了 OptionalInt、OptionalLong 和 OptionalDouble 三个类型，建议使用。（没有 OptionalBoolean，因为 Boolean 本身就可以表示可空）

当然，在没有强制性要求处理空值的地方（内部调用等），或者对性能敏感的地方，用 `@Nullable` 注解即可。如果是 Spring 开发场景，优先使用 `org.springframework.lang.Nullable`。

### 注解

java 5 （2004 年）引入了注解，非常早。注解现在已经成了业务开发中不可或缺的一部分。注解可以在编译期或运行期被读取，并且改变代码的行为，跟 rust 的 proc macro 还是有一些区别的。之后的 [业务内容](#业务内容) 会更详细地介绍一些框架注解。

- java 注解的属性值必须是编译期常量。
- java 的注解相当混乱，同一个注解可能有一堆 package 提供；不同 package 提供的注解功能不同，不能混用。

### 序列化

序列化可以将一个 class 进行结构化表示，Jackson 或其他库可以利用这个结构表示将类转换成其他东西，例如 json。

```java
class account implements Serializable {}    // 继承接口
```

实践中，建议为每一个 implements Serializable 的类都添加一个 `private static final long serialVersionUID` 成员，用于序列化的兼容检查。反序列化时，如果该 id 不匹配则会抛出异常。

#### Jackson

最常用的 json 序列化库，Spring 默认。

- 自定义序列化函数：使用 `@JsonValue` 自定义序列化过程，使用 `@JsonCreator` 自定义反序列化过程。对于 enum，这个是比较常用的。
- 如果希望一个 json object 根据其 keys，可以反序列化到两种不同的 class：使用一个 interface 和 deduction。
  ```java
  @JsonTypeInfo(use = JsonTypeInfo.Id.DEDUCTION)
  @JsonSubTypes({
      @JsonSubTypes.Type(value = Class1.class),
      @JsonSubTypes.Type(value = Class2.class)
  })
  public interface ObjectItem {}
  ```

## swing

java GUI。原生自带，无需下载其他组件，无需构建系统，单文件就能跑。但是在前端设计上，swing 是不合格的，纯靠布局真的是非常噩梦的体验，没人用。

要不是学校的 java 课要用 swing 做东西，我也不会去用它。

::: details 默认折叠，点击展开 swing 相关内容。

### 组件

- JPanel：理解为容器
- JLable
  - 设置字号/字体/效果：`lable.setFont(new Font(Font.SERIF, Font.BOLD, 18));`
- JPasswordField：密码输入框。`getText()` 不安全会被警告，`getPassword()` 则返回 char[] 需要自行处理。

需要注意，在 remove 后 add 组件，需要重绘。

```java
panel.revalidate();
panel.repaint();
```

### 事件

\>=Java 8: 请使用 lambda 函数而不是将所有窗口事件在一个函数中处理。

```java
button.addActionListener(e -> {
    ...
});
```

:::

## 业务内容

前面的基础结束，现在是业务内容。工作中的 java 业务一般有着一套固定的流程和约定，这里又是一大堆东西。

java 业务开发一般遵守分层架构：Controller 层是对外交互的接口，Service 层是最主要的逻辑区域，Mapper 层是数据库的交互。

### 基础名词

- Bean 是一种约定的特殊 class，所有属性 private，通过 getter setter 读取/修改，有一个无参构造函数。各种框架可以根据这样的约定来操作这个类及其实例。
- DTO（Data transfer object）就相当于 python dataclass。
- DI（Dependency Injection）：依赖注入，之后 Spring 会提到。
- AOP（Aspect-Oriented Programming）：面向切面编程，类似注入的概念，在运行时将一段逻辑注入到对象里。业务层对 AOP 是无感知的。Spring 的 AOP 是动态代理，在运行期生成一个代理对象。AspectJ 主要是直接修改字节码，功能更强，可以切入构造函数、静态方法、私有方法。

### Lombok

Lombok 是一个业务开发必备库，作用是在编译时通过注解自动生成代码。

常用的注解有：

- `@NonNull`：可以修饰入参和出参对象。如果为空会 NPE。
  - Lombok 的 `@NonNull` 是**运行时检查**，并且不会被 IDE 当作非空类型进行推导。如果需要推导为非空，建议使用 `javax.annotation.Nonnull`。
- `@Getter` / `@Setter`: 生成字段的 get 和 set 方法。
- `@ToString`: 生成 toString() 方法。
- `@EqualsAndHashCode`: 生成 hashCode() 和 equals() 方法。
- `@Data`: 相当于同时使用了 @Getter、@Setter、@ToString、@EqualsAndHashCode 和 @RequiredArgsConstructor。
- `@Slf4j`：生成日志对象，可以在代码中用 `log.info` 啥的。
- `@RequiredArgsConstructor`：为所有 final 字段或 @NonNull 字段生成一个 Constructor。
- `@NoArgsConstructor`：生成一个什么也不做的 Constructor。不允许在有 final 字段的类里使用；如果要使用需要用 `@NoArgsConstructor(force = true)`，可以将其初始化为 default 值。
- `@AllArgsConstructor`：生成一个包含类中所有字段作为参数的 Constructor。字面意思。
- `@Builder`：builder 模式，不多说。
- `@SuperBuilder(toBuilder = true)`：如果父类实现了 `@SuperBuilder`，则子类也可以用 builder。注意不能和 `@Builder` 混用。

注解中再包含其他注解需要使用 `@__` 语法。一个最常用的例子是 `@RequiredArgsConstructor(onConstructor = @__({@Autowired}))`，在生成 Constructor 的同时将其标为 `@Autowired`。

#### Slf4j

可以在 `@Slf4j` 的 class 内部使用 log.xxx 进行日志打印（xxx=info, error, ...）。

- 首个参数可以是一个 fmt string，之后可以接 args。
  - args 可以比 fmt 里的坑多一个 Throwable，这样打印的日志后面可以接这个 Throwable 的调用栈。这是很常见的用法。

### Spring

后端必备套件之一。Spring 的核心是自动管理单例，因为在后端开发场景中单例实在是太多了，用 Spring 可以省去自己创建和取对象的麻烦。

- IoC（Inversion of Control）概念：Spring 启动时其会创建一个巨大的全局对象池，称为容器；并且其为每个 @Service 类在容器里创建一个单例对象。使用时只需通过 @Autowired 即可从对象池里拿到这个实例。
  - 在 Spring 语境下，“Bean” 特指被 Spring 容器管理的对象。

Spring 在运行时会自动起一个 tomcat 来运行服务。（tomcat 是一种网络容器，用它可以方便地部署网络应用）

#### uri 相关注解

uri 一般是 `/{context-path}/{Class-Mapping}/{Method-Mapping}` 形式。

- context-path：一个全局前缀，用的比较少。直接搜 `context-path` 即可。
- Class-Mapping：class 上定义的 `@RequestMapping` 注解。
- Method-Mapping：类的方法的注解，可以是 `@GetMapping` 等。

### Swagger

用于自动生成 RESTful API 文档的工具。只需要注解即可生成。

Swagger 有 v2 和 v3 两个版本，看 import 能看出项目使用的是哪个版本。v3 版本在 import 语句里一定包含 `v3.` 字样。

#### v2

随便记点。

- 对于 `@XXX("xxx")`，一般等价于 `@XXX(value = "xxx")`。如果括号内有多个 kv，必须显式写 `value =`。
- `@ApiModel`：将 class 或 enum 设为请求参数 / 响应类型。
- `@ApiModelProperty`：修饰 ApiModel 的成员。
- swagger v2 对 interface 的支持不太好，例如两个 class 实现了同一个接口，然后对这个接口做反序列化，swagger 不会自动关联到这两个类。有点致命。

### Mybatis

后端必备套件之一。

Mybatis 是一个数据库操作套件，用于把数据库操作集成到代码中。我不认为其是一个 ORM，毕竟也需要自己写 SQL。

Mybatis 有两种模式，注解模式和 XML Mapper 模式。注解模式是在注解中写 SQL 语句，Mapper 模式相当于是一个 DSL。对于复杂查询或者大型项目，用 Mapper 模式的更多。

- 如果不想学 Mapper 模式的 DSL，可以让 AI 写或者翻译 SQL 到 Mapper。
- Mapper 模式下有 `<mapper namespace="com.xxx.xxx">`，这里的 namespace 必须是一个 xxx.java 模块的完整路径；在这个模块里写一个 `public interface XXXMapper`，然后声明每一个接口方法即可。XML 标签的 id 必须与 java 接口的方法名一致。

## JVM 调优

### GC

- java 8 有这些 GC：Serial GC, Parallel GC, CMS (Concurrent Mark Sweep), G1 (Garbage-First)
  - 后二者将 GC 分为几个阶段，只在其中部分阶段 stop the world
  - CMS（标记 - 清除，没有整理）：初始标记（停顿）-> 并发标记 -> 重新标记（停顿） -> 并发清除
  - G1（标记 - 整理）：类似文件系统分块，新生代和老年代不再连续。优点：可预测，无内存碎片
  - ZGC：全部都是 Full GC；动态分块
    - 使用 Load Barriers，进行类似 CAS 的复制块访问
    - 染色指针，有四位信息存在指针本身上
    - 优点：吞吐量大，停顿短，不需要太多干预；缺点：CPU 占用高
- java 的 gc 是从根节点开始扫描不可达对象。
- JDK8 的 GC 是分两代，新生代和老年代。新生代里又有三个区（eden, Survivor（s1, s2））。在新生代 gc 叫 minor gc，gc 老年代 + 新生代叫 full gc。
  - 每次 gc 会使新生代对象的 age + 1，当 age 超过一定值时将被移入老年代
  - Survivor 区的对象总年龄超过 50% 时也会将部分年龄最大的移入老年代
- java 8 的几个 GC 都是 stop the world 的，调优目的就是减少 full gc，减少 stop the world。

### 工具

jvisualvm 是 jdk 里自带的 GUI 分析工具，可以追踪 GC 状况，日志，系统资源占用等。
