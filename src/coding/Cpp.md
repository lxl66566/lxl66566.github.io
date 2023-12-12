---
date: 2022-06-11
icon: code
category:
  - 编程
  - 经历
tag:
  - 编程语言
---

# C++

## 一些工具

- [cppinsights](https://cppinsights.io/)：显式指明代码中的隐式转换与中间变量。
- [godbolt](https://godbolt.org/)：汇编分析；pastebin；不同编译器的行为分析
- [Quick C++ Benchmark](https://quick-bench.com/)

## 常见名词

- UB：Undefined behavior，未定义行为，典型的有 `i = i++ + ++i`，一个容易被忽视的 UB 是 `a[i] = i++;`。([ref](https://en.cppreference.com/w/c/language/eval_order))
  - 还有一些易忽视 UB：有符号整数的溢出是 UB，控制流到达返回值不为 void 的函数的末尾，~~还有一些操作裸指针的~~ [src](https://zhuanlan.zhihu.com/p/391088391)

## 安装

C++ 开发前的准备挺复杂的，做好心理准备。

linux 下用包管理器，配置环境应该是基础技能。这里写的主要是 windows 下的开发步骤。

我目前正在使用 _xmake + clang 全套_ 进行开发。

### 编译器

::: tabs

@tab clang

> Clang 是 LLVM 的前端，具有速度快、内存占用小、诊断信息可读性强、兼容性好等优势。[ref](https://www.51cto.com/article/630677.html)

[scoop](../farraginous/recommend_packages.md#scoop) 一行：`scoop install llvm`。

安装 llvm 还会附带一些工具如 _clangd_, _clang-tidy_, _clang-format_。

@tab mingw

windows 上不想装 msvc 的话可以考虑使用 mingw。

[scoop](../farraginous/recommend_packages.md#scoop) 一行：`scoop install mingw`。

@tab msvc

[安装 visual studio](https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio)（体积较大）。

:::

### 开发环境

我使用 [VSCode](./vscode.md) 作为 C++ 代码编辑器。以下扩展都可以直接在 vscode 商店搜到；只需选择一个即可。

:::: tabs

@tab Clang-Tidy + Clang-Format

> Clang-Tidy 比 clangd 要**慢很多**。并且 [clangd 尊重 clang-tidy 的设置](https://discourse.llvm.org/t/list-of-clang-tidy-checks-supported-in-clangd/61013)，因此非解耦需求下还是用 clangd 比较好。

为什么选这个组合呢，因为解耦：我不喜欢让一个扩展完成所有任务，我希望 linter 和 formatter 分离[^4]，这样是自由度最高的方案。

[^4]: 例如我在嵌入式课用 vscode 写码，我需要一个 formatter 减少我的精神负担，但是由于嵌入式开发 Keil 使用自己的构建系统，因此我希望关闭 linter，否则 linter 读不出项目的结构，会满屏红色报错。

Clang-Tidy 在 vscode 扩展里的名字叫 _CS 128 Clang-Tidy_。

@tab clangd

调用外部的 linter + formatter，非常快速。

前置条件：安装 [clang 全套](#编译器)工具。主要是 linter `clangd` 和 formatter `clang-format`。

::: tip

相比 _C/C++_ 扩展的 LSP，clangd 具有其他优点：

1. 响应速度快。用过 _Microsoft C/C++_ 扩展的人都知道其慢的一批。
2. _clang-format_ 格式化功能强大，高度自定义化。
3. 支持 inlay hints

:::

可能需要自己填一个 `clang-format.exe` 的位置，去 llvm 安装位置找，或者用 [everything](../farraginous/recommend_packages.md#everything) 搜一下。

- `clang-format.exe -style=llvm -dump-config > .clang-format` 可以导出设置，一般不需要。

@tab Microsoft C/C++

all in one 类型的插件，我**不是很喜欢，不够自由**。

::: tip 不过还是说几句好话

- 快速上手，对新人友好。
- 无需了解[构建系统](#构建系统)，可以直接点右上角 _运行_ 按钮快速运行**单文件**。
- 可视化 debug。

:::

1. 在工作区**打开一个文件夹**，新建一个简单的 helloworld.cpp 文件（内容请自己写完）。
2. `Ctrl + Shift + P` 打开命令面板。
   1. 搜索并点击 `C/C++: Edit Configurations (UI)` ，将编译器路径改为编译器的 `g++.exe`；在 _IntelliSense 模式_ 下选择相应的工具链，例如 mingw 选择 `gcc-x64`。此时 vscode 会自动在工作区创建 `.vscode` 存放配置。
   2. 搜索并点击 `Tasks: Configure Default Build Task`，再选择 `C/C++: g++.exe build active file`。

::::

### 构建系统

最广泛使用的是用 _Cmake_ 生成 makefile 然后再 make，然而我并不喜欢它。网上也有一些类似的想法：[Why CMake sucks?](https://twdev.blog/2021/08/cmake/)。我也尝试过 xmake，然而用的人少，出了 bug 找不到解决方案。不过姑且我还是用着 xmake 的。

有兴趣的话也可以看看[cmkr](https://github.com/build-cpp/cmkr)，基于 toml 生成 cmake 文件，三阶构建（cmkr -> cmakelists -> makefile）

#### xmake

xmake 是向下兼容 cmake 的构建工具，拥有极度简洁的语法。xmake 使用 lua 脚本作为构建系统语言。**~~我真的不想再面对一团乱麻的 cmake 了！~~**

- [新手教程](https://zhuanlan.zhihu.com/p/640701847)，由于我自己摸索而不是看教程，多走了许多弯路。因此推荐看看。
- 开始使用：
  - use [scoop](../farraginous/recommend_packages.md#scoop), `scoop install xmake` 一行安装。输入 `xmake -h` 了解更多。
  - 示例：`xmake create -l c++ -P ./cpp && cd cpp && xmake && xmake r`
- 一些预设
  ```lua
  set_encodings("utf-8")  -- 没加会导致 Qt 中文乱码
  set_policy("build.warning", true) -- 开启编译警告
  set_languages("cxxlatest")  -- 设置 C++ 版本，或 `cxx20`
  set_optimize("fastest")     -- 优化等级，不过 release 有默认
  add_requires("fmt")
  target("test")              -- 添加 fmt 包
    ...
    add_packages("fmt")
  ```
- 查找包（任选）：
  - 手动去 [xmake-repo](https://github.com/xmake-io/xmake-repo/) 找
  - 命令行：`xrepo search <package_name>...`，可用 `*` 作为通配符
- 指定工具链
  - 在 target 中添加 `set_toolchains("clang")`

#### cmake

实际上我也就写 Qt 接触了一下 cmake，后面很快转到 xmake 了，关于 cmake 的了解不算多。

::: details archived

`scoop install cmake`。

:::

### Qt 开发环境

Qt 是一个 C++ 框架，主要是做 GUI 用的。[查看介绍](#qt-开发环境)。不用的话可以不装。

由于 Qt creater 没有 vscode 中的强大插件，因此我希望在 vscode 中开发 Qt 代码。

Qt 的构建（从 Qt6 开始）默认生成 cmake 配置，但也可以手写 xmake 配置。

#### windows

::: tabs

@tab xmake

用 xmake 作为 Qt 的构建系统是一个不错的选择。之前曾经出现过[一些问题](../gossip/difficulties.md#20230507-qt6-项目构建失败)，但 20230802 再次尝试已经可以正常使用。

1. 使用 Qt Creator 创建模版项目。
2. `xmake.lua` 参考[官方文档](https://xmake.io/#/zh-cn/guide/project_examples?id=widgets-应用程序)，这里是一个示例：
   ```lua
   add_rules("mode.debug", "mode.release")
   target("qt_widgetapp")
       add_rules("qt.widgetapp")
       add_files("src/*.cpp")
       add_files("src/mainwindow.ui")
       add_files("src/mainwindow.h")
   ```
3. 可能需要指定 sdk：`xmake f --qt=D:\software\QtSDK\6.6.0`（你的 Qt 安装路径）
4. [生成 compiler_commands.json](https://xmake.io/#/zh-cn/plugin/builtin_plugins?id=生成compiler_commands)，使 clangd 能够读取 includePath 等。一行：`xmake project -k compile_commands`
5. `xmake && xmake r` 就能跑了。

刚做完 2. 的时候会出现经典问题，clangd 报*找不到 `ui_mainwindow.h` 文件*… 因为它是编译期生成的。。用 cmake CLI 的时候可能需要麻烦手动生成，xmake 挺智能的，build 一次后就不会报错了，应该是 xmake 内置的 qt 规则起作用了。

需要注意，使用 xmake 构建的 Qt 程序无法在 stdout 输出字符，无论 release 还是 debug mode。（不知道是不是缺少了什么设置选项）

@tab cmake + C/C++ 扩展

1. 先用 Qt creater 创建一个模板项目，或者打开现有项目，或者自己手写模板。
2. `Ctrl + Shift + P`，键入`C/C++: Edit Configurations (UI)`
   - 在 _包含路径_ 下添加 `D:\software\Qt\6.5.0\mingw_64\include\**`（使用你自己的 include path）
   - 将 _C++ 标准_ 改为你需要的。（截至 Qt6.6.0 不支持 C++23）
3. 在项目目录下执行：
   ```sh
   uic mainwindow.ui -o ui_mainwindow.h
   rcc static.qrc -o static.cpp    // 如果有 qrc 文件则执行。
   // rcc 不会读取 qresource prefix，可能需要将 .qrc 文件拷贝到静态资源文件夹下并执行
   ```
4. 将 _3._ 生成的文件（static.cpp） 添加至 `CMakelists.txt` 中的 `PROJECT_SOURCES`
5. 在 `CMakelists.txt` 中的 `find_package` 语句前添加：
   ```cmake:no-line-numbers
   set(CMAKE_PREFIX_PATH "D:/software/Qt/6.5.0/mingw_64")` # （使用你自己的 path）
   ```

:::

#### linux

在 (arch)linux 上开发 qt 应用。

1. 通过 [aqtinstall](#安装) 安装 sdk；通过 pacman 安装 `qt6-base`.
2. 在 `xmake.lua` 中，新建 toolchains:
   ```lua
   toolchain("myqt")
       set_kind("standalone")
       if is_os("linux") then
           set_sdkdir("~/program/qt/6.6.0/gcc_64/") -- 填写 sdk 目录
           set_toolset("cxx", "clang")  -- 指定编译器
           add_linkdirs("/usr/lib/qt6/")
       end
   ```
   然后在 target 中 `set_toolchains("myqt")` 即可。

## 语言相关

~~太悲哀了~~

### 类型转换

> \>= C++11

- `static_cast`：不进行安全检查
- `const_cast`：设置或移除指针/引用所指对象的 const
- `dynamic_cast`：进行安全检查，用于指针/引用转换
  - 有些情况下 `dynamic_cast` 的性能可以接近 `static_cast`。但大多数时候有额外开销。
- `reinterpret_cast`：无视类型，进行最底层的比特位复制

### 智能指针

> \>= C++11, &lt;memory>

- `shared_ptr` 允许多个指针指向同一个对象，引用计数
  - (C++14) 使用 `std::make_shared<Type>()` 构建
  - `reset()` 不带参数则释放（== release()）
- `unique_ptr` 独占所指向的对象
- `weak_ptr` _shared_ptr_ 的弱引用，不影响其计数器

### 多行字符串

Raw string: `R""(some\text)""`

### 面向对象

protected：指能被子类访问，不能被外部访问的成员。

C++ 允许多继承，菱形继承需要将中间类声明为虚类。（不要使用菱形继承！）

### option

(C++17) C++ 中有 `std::optional<T>` 起到类似 rust 中 Option 的作用。

- 一些函数：`has_value() -> bool`, `value() -> T`, `value_or(T) -> T`

### template

前往 [external 1.](#external)，讲得非常不错。

### variant

本意是封装的 `union`，可以当成错误处理的一种实现，类似 rust `Result`.

c++23 请使用 `std::expected`.

> [github.com/bitwizeshift/result](https://github.com/bitwizeshift/result) —— Asuka Minato

获取值一般用 std::get + try catch，也可用 std::visit :

```cpp
std::variant<int,string> v;
try{
    return std::get<int>(v);
}catch (std::bad_variant_access&)
{
    return std::get<string>(v);
}
// std::visit([](auto&& arg) {
//     using T = std::decay_t<decltype(arg)>;
//     if constexpr (std::is_same_v<T, int>)
//         std::cout << "int with value " << arg << '\n';
//     else if constexpr (std::is_same_v<T, string>)
//         std::cout << "errlog: " << arg << '\n';
// });
std::visit(overloaded{
    [](auto arg) { std::cout << arg << ' '; },
    [](const std::string& arg) { std::cout << std::quoted(arg) << ' '; }
}, v);
```

（[src: std::visit](https://en.cppreference.com/w/cpp/utility/variant/visit)）

### assert

```cpp
static_assert(a < 0 && "error message"); // compile time
#include <cassert>
assert(a < 0 && "error message");  // runtime
```

### if constexpr

编译期剪枝。可以用于类型判断。

```cpp
#include <type_traits>
template <typename T>
void f(T)
{
  if constexpr (std::is_same_v<T, int>)
  {
    static_assert(false);
  }
}
```

## 程序计时

程序计时可以用于分析代码效率。[代码参考](https://stackoverflow.com/questions/12883493/timing-the-execution-of-statements-c) <span class="heimu" title="你知道的太多了">大佬能直接看汇编分析，但是太复杂还得 benchmark</span>

## 其他注意点

- C++ 的错误处理并没有一个除 0 的标准错误，因此自己处理时需要 if 判断并 throw.
- 被 C++20 的 `std::ranges::remove_if()` 坑过（可能当时编译器实现有 bug(?)）
- 或许很难注意到的一些 [UB](#常见名词)：有符号整数的溢出是 UB，控制流到达返回值不为 void 的函数的末尾，~~还有一些操作裸指针的~~ [source](https://zhuanlan.zhihu.com/p/391088391)

## Qt

:::tip

此处 Qt 部分版本代码为 Qt4-5，不保证能正常迁移至 Qt6;

以下内容并不是 Qt 基础的教程，缺乏目的性和针对性

:::

### 基本介绍 --> [官网](https://www.qt.io/)

Qt 是一个成熟的跨平台，~~跨语言~~的 GUI 框架（不建议再使用 MFC 等等了）。我用 C++ 做的最早的 GUI 应用就是用 Qt 写的。对于 C++ + GUI 需求，Qt 是比较简单快速的选择。

- 它封装了很多窗口与控件类，可以轻松使用而并不需要深入了解其内部实现与原理 _~~（实际上它几乎封装了一切）~~_
- 它支持可视化构建窗口界面 (Qt Designer)，极大幅度减小代码量
- ~~它提供的软件打包方式比较人性化~~（有坑）

### 安装

> 推荐使用 CLI，快、用时短、空间占用小、无需登录

- CLI: [aqtinstall](https://aqtinstall.readthedocs.io/en/latest/getting_started.html)
  1. `scoop install aqtinstaller`
  2. `aqt install-qt --outputdir D:\software\QtSDK windows desktop 6.6.0 win64_msvc2019_64`（我的示例，别抄，去读文档；安装大小是 1.46G，已经很不错了）
- 官方 GUI: [qt.io](https://www.qt.io/zh-cn/download)。
  - 需要在 msvc/mingw 中选择其一(?)。如果不想装重量级的 Visual Studio (提供 msvc)，你可以尝试安装 mingw 的 sdk，占用空间小点，不过配置会稍微麻烦一点。

### 第三方

一些可能会用到的第三方组件 / 框架。

- [QDarkStyleSheet](https://github.com/ColinDuquesnoy/QDarkStyleSheet)：窗口深色模式，参考[深色模式](#dark-mode)。
- [FluentUI](https://github.com/zhuzichu520/FluentUI)：提供一套 UI 框架。

### dark mode

深色模式支持是很重要的。

你可以很简单地[添加深色模式](https://forum.qt.io/topic/101391/windows-10-dark-theme/4)（高对比度）；若你想使用更为柔和一点的颜色，可以使用第三方的[QDarkStyleSheet](https://github.com/ColinDuquesnoy/QDarkStyleSheet)。

### 唤起最小化的窗口

```cpp:no-line-numbers
show();showNormal();raise();activateWindow();
```

### 关于控件组

Qt 官方提供了 QButtonGroup 类。该类提供了对 QAbstractButton（即记忆化选择按钮）的分组。将按钮添加到 QButtonGroup 对象中，点击某一按钮时，组中其他按钮会被自动取消 toggle（已点击状态）。你也可以为组中每个按钮赋予数字 id，通过 id 对控件进行调用。

当然，QButtonGroup 类的使用范围是具有很大局限性的。若想对其他不同类型的控件新建分组该怎么做呢？

答：使用 `QVector<QWidget*>`。由于部分常用控件(QPushButton,QLable 等)继承自 QWidget，因此通过 QWidget 类型容器对组内控件进行统一操作，例如需要隐藏主窗口内的所有控件，只需
`for (auto &i : elements) i->hide();`
即可。

_对于 hide() 与 show() 操作来说，更简便的方法是将所有控件加入新的 widget，然后将该 widget 的父对象设为主窗口。之后的隐藏与显示只需对该 widget 操作即可。_

### 关于资源文件

Qt 提供方便的资源文件引用。在项目中通过 `Add New...`新建 Qt Resource File[^2] 并添加文件到 `.qrc` 内。Qt 在构建时会将添加的文件以二进制形式存放在生成的 exe 文件中。无需将资源文件放入打包目录，程序将会从 exe 中引用资源。

但是请注意，**加入 .qrc 中的资源文件是只读的。有修改需求的文件请勿使用此方法。\***（使用相对路径）\*
[^2]: `.qrc` 文件内部是 xml 格式，理论可手搓，因此可以放心抛弃 QtCreator。

### 添加图标与版本信息

::: details 使用 qmake，已过时
图标：在项目目录下放入 .ico 图标（[在线转 ico](https://www.aconvert.com/cn/icon/)），在项目 .pro 文件中加入 `RC_ICONS = xxx.ico` 即可。所有该项目下的子窗口都会自动使用该图标。注意仅允许 ico 格式图像。

版本信息：在项目 .pro 文件中加入 `VERSION = x.x.x` 即可。
:::

1. 新建 `xxx.rc`，内容为 `IDI_ICON1 ICON DISCARDABLE "logo.ico"` （定位到你的 ico 图标）
2. （使用 [xmake](#xmake)）将 `xxx.rc` 加入 xmake.lua：`add_files(static/xxx.rc)`

### 打包

Qt 拥有人性化的打包服务。复制 release 输出目录中的 exe 文件到任意目标目录，在目录下使用 `windeployqt xxx.exe` 命令即可完成打包（windeployqt 需要在环境变量内，否则使用绝对位置）。

但是到了 Qt6，情况就完全不一样了。。Qt6 的打包不管使用 `windeployqt` 或 `windeployqt6` 打包后，程序都无法运行。重装 SDK 后也是如此。首先，使用 `windeployqt` 会缺失 `Qt6Core.dll`, `Qt6Gui.dll`, `Qt6Widgets.dll` 这老三样。其次，手动复制这三样后，测试还会出现 bug：

<div class="image50" style="text-align: center; "><img alt="bug" src="/images/coding/cpp/windeployqt_bug.png" /></div>

解法是将 Qt SDK 目录下的 `plugins` 文件夹复制到打包的 exe 目录下[^1]。。
[^1]: 我找出这个问题[真的不容易](../gossip/difficulties.md#20230507qt6-项目构建失败)，还差点错怪 xmake。。主要是 `Plugins` 并不在我的环境变量中，但却能够跑起来，迷惑了我的判断。这个报错也基本上得不到信息，网上也找不到解法。

#### 优化

这样打包出来的程序体积还能**进一步缩小**。运行 exe 后，全选目录下文件并删除，跳过已被打开的所有文件，并递归地对每个文件夹进行同样的操作。这样能够移除不必要的运行库从而==大幅==降低发布包的大小。

#### 测试

打包之后需要测试有没有丢运行库。换用另一个环境测试也太麻烦了点，而傻逼 windows GUI 也把环境变量藏得实在是太好，徒增了许多麻烦。其实只要在命令行中临时删除环境变量，再运行即可：
::: code-tabs
@windows

```bat
set path=''
main.exe
```

:::

### 全局快捷键

[参考此文章](https://blog.csdn.net/scueee/article/details/108541574)。_如果要在 Qt6 中使用，需要把 `virtual bool nativeEventFilter` 的最后一个参数由 `long*` 改为 `qintptr*`._

> 怎么说，这几乎是我在几乎全网搜到的唯一可用的全局快捷键代码[^3]。。而且由于调用了 windows api，因此只能在目标为 windows 上的 Qt 使用。linux 还需要看看 Github [QHotKey](https://github.com/Skycoder42/QHotkey)。

[^3]: 升级 Qt6 后我尝试寻找其他全局快捷键方法，全部失败。甚至生出了直接调 windows.h api 的心。

### 按键事件

Qt6 提供了 _QShortCut_，大大简化了==非全局==按键事件的处理。只需要创建一个 _QShortCut_ 对象，connect 即可。

### JSON 处理

> 根据 [benchmark](#潜伏知识)，QJson 是 JSON 库中占用内存最小的。（某个测试项目）

#### 读取

```cpp
QFile file("a.json");
if(!file.open(QIODevice::ReadOnly)){
    qDebug() << "open file failed.";
    return;
}
QByteArray data(file.readAll());
file.close();
QJsonParseError jError;
QJsonDocument jDoc = QJsonDocument::fromJson(data, &jError);
if(jError.error != QJsonParseError::NoError){
    qDebug() << "read json error.";
    return;
}
QJsonObject rootjsonobj = jDoc.object();
```

此时`rootjsonobj`即为读入的 QJsonObject 对象（理解为 python 中的字典对象）。

通过 `rootjsonobj[KEY]` 访问得到一个 QJsonValue，可以调用 `toObject()` / `toString()` 等函数将之转换为对应类型。

#### 写入

```cpp
QJsonDocument jDoc(rootjsonobj);
QFile file("b.json");
if(!file.open(QIODevice::Truncate | QIODevice::WriteOnly)){
    qDebug() << "write json error.";
    return;
}
QByteArray data(jDoc.toJson());
file.write(data);
file.close();
```

## 潜伏知识

1. C++ 开源 json 库性能好的有 simdjson 和 sonic；[benchmark](https://github.com/miloyip/nativejson-benchmark), but out of date

## external

1. [C++ Template 进阶指南](https://github.com/wuye9036/CppTemplateTutorial)
2. [2020 年 C++语言律师 等级考试 参考答案](https://www.bilibili.com/video/BV1et4y1D796/)
3. [为什么看到这么多人不推荐 C++？](https://www.zhihu.com/question/22853451/answer/1847571322)
4. [Zig's New Relationship with LLVM](https://kristoff.it/blog/zig-new-relationship-llvm/)
5. [C++ 用户定义 Ranges 算子](https://xr1s.me/2023/08/13/cxx-user-defined-range-adaptor/)
6. C++23 特性总结 [上](https://zhuanlan.zhihu.com/p/562383157) | [下](https://zhuanlan.zhihu.com/p/562383556)，可以学到很多
7. [C++ 移动语义](https://zhuanlan.zhihu.com/p/642214693)
