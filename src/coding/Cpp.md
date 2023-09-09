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

## 常见名词

- UB：Undefined behavior，未定义行为，典型的有 `i = i++ + ++i`。

## 配置环境

默认 Windows 下，使用 vscode 开发。如果使用其他系统 | IDE，请移步他处。

### mingw + _Microsoft C/C++_

> 使用此方法的好处是比较无脑，可以快速上手；可以直接点右上角 _运行_ 按钮快速运行单文件。

::: details archived，已不再使用此方式

1. 下载安装 mingw 编译器。推荐使用 Windows 下包管理器进行安装（[scoop](../farraginous/recommend_packages.md#scoop) | [chocolatey](https://chocolatey.org/)），好处是无需手动配置环境变量。
   - 打开管理员下终端，执行 `choco install mingw`，按提示进行安装。安装后，默认位置应为`C:\ProgramData\chocolatey\lib\mingw\tools\install\mingw64`。（当然，得参考 chocolatey 安装位置）
2. 在 vscode 中安装 _C/C++_ 扩展。
3. 在工作区**打开一个文件夹**，新建一个简单的 helloworld.cpp 文件（内容请自己写完）。
4. `Ctrl + Shift + P` 打开命令面板，搜索并点击 `C/C++: Edit Configurations (UI)` ，将编译器路径改为 mingw 文件夹下的 `/bin/g++.exe`；在 _IntelliSense 模式_ 下选择 `gcc-x64`。此时 vscode 会自动在工作区创建 `.vscode` 存放配置。
5. 同上打开命令面板，搜索并点击 `Tasks: Configure Default Build Task`，再选择 `C/C++: g++.exe build active file`。

现在你已经可以在 vscode 中编译并运行 c++ 代码了。
:::

### clang + clangd + xmake

这里是进阶的环境配置。~~需要一点对技术的渴望（需要学习 [xmake](#xmake)）。~~

> clangd 是一个基于 Clang C++ 编译器的语言服务器，可以通过 LSP 协议向编辑器如 VSCode、Vim、Emacs 等提供语法补全、错误检测、跳转、格式化等功能。 —— GPT4<br/>
> Clang 是 LLVM 的前端，具有速度快、内存占用小、诊断信息可读性强、兼容性好等优势。- [ref](https://www.51cto.com/article/630677.html)

相比 _C/C++_ 扩展的 LSP，clangd 具有其他优点：

1. 响应速度快。用过 _Microsoft C/C++_ 扩展的人都知道其慢的一批。
2. 格式化功能强大，高度自定义化。
3. 支持 inlay hints

配置方式如下：

1. 扩展：安装 _clangd (LLVM)_, _XMake (tboox)_（习惯 CLI 的可以不装 xmake 扩展）
2. 从 [scoop](../farraginous/recommend_packages.md#scoop) 安装 _xmake_, _clangd_, _llvm_：`scoop install xmake clangd llvm`
3. `xmake create -l c++ -P ./cpp && cd cpp`（在当前目录下创建项目`cpp`并进入）
4. `xmake && xmake r` 构建并运行。
5. 设置格式化：在项目根目录运行 `clang-format.exe -style=llvm -dump-config > .clang-format`
   - 若找不到`clang-format.exe`可以使用[everything](../farraginous/recommend_packages.md#everything)搜索并用绝对路径启动，我的`clang-format.exe`路径为`C:\Users\<user_name>\.vscode\extensions\ms-vscode.cpptools-1.15.4-win32-x64\LLVM\bin\clang-format.exe`
   - 进入`.clang-format`编辑个性化设置。主要是把缩进调成 4（我的习惯）。其他具体项的意思可以自行搜索。

### 配置 Qt 开发环境

由于 Qt 没有 vscode 中的强大插件，因此我希望在 vscode 中开发 Qt 代码。其他 Qt 内容请[跳转 Qt](#qt)

#### cmake + _Microsoft C/C++_

> 默认已做过[之前](#mingw-microsoft-c-c)的环境配置。

::: details archived，已不再使用此方式

1. 假设你：
   - 安装了 Qt 与 cmake
   - vscode 已经安装好 cmake 与 C/C++ 扩展
   - Qt 的版本构建文件使用 cmake 而非 qmake. （Qt6 默认使用 cmake）
2. 打开项目文件夹，`Ctrl + Shift + P`，键入`C/C++: Edit Configurations (UI)`
   - 在 _包含路径_ 下添加 `D:\software\Qt\6.5.0\mingw_64\include\**`（使用你自己的 include path）
   - 将 _C++ 标准_ 改为你需要的。
3. 在项目目录下执行：

```batch
uic mainwindow.ui -o ui_mainwindow.h
rcc static.qrc -o static.cpp    // 如果有 qrc 文件则执行。
// rcc 不会读取 qresource prefix，可能需要将 .qrc 文件拷贝到静态资源文件夹下并执行
```

4. 将 3. 生成的文件（static.cpp） 添加至 `CMakelists.txt` 中的 `PROJECT_SOURCES`
5. 在 `CMakelists.txt` 中的 `find_package` 语句前添加：

```cmake:no-line-numbers
set(CMAKE_PREFIX_PATH "D:/software/Qt/6.5.0/mingw_64")` # （使用你自己的 path）
```

然后就能~~愉快地~~构建了。
:::

#### xmake + clangd

选用 xmake 作为 Qt 的构建系统是一个不错的选择。之前曾经出现过[一些问题](../gossip/difficulties.md#20230507-qt6-项目构建失败)，但 20230802 再次尝试已经可以正常使用。以 Mainwindow 项目为例：

1. 使用 Qt Creator 创建模版项目。（还是逃不开的，，<span class="heimu" title="你知道的太多了">除非有大叠特别熟练嘎嘎写完</span>
2. `xmake.lua` 参考[官方文档](https://xmake.io/#/zh-cn/guide/project_examples?id=widgets-应用程序)
   ```lua
   add_rules("mode.debug", "mode.release")
   target("qt_widgetapp")
       add_rules("qt.widgetapp")
       add_files("src/*.cpp")
       add_files("src/mainwindow.ui")
       add_files("src/mainwindow.h")
   ```
3. 可能需要指定 sdk：`xmake f --qt=D:\software\QtSDK\6.6.0`（你的 Qt 路径）
4. [生成 compiler_commands.json](https://xmake.io/#/zh-cn/plugin/builtin_plugins?id=生成compiler_commands)，使 clangd 能够读取 includePath 等。一行：`xmake project -k compile_commands`
5. `xmake && xmake r` 就能跑了。

刚做完 2. 的时候会出现经典问题，clangd 报*找不到 `ui_mainwindow.h` 文件*… 因为它是编译期生成的。。用 cmake CLI 的时候可能需要麻烦手动生成，xmake 挺智能的，build 一次后就不会报错了，应该是 xmake 内置的 qt 规则起作用了。

需要注意，使用 xmake 构建的 Qt 程序无法在 stdout 输出字符，无论 release 还是 debug mode。（不知道是不是缺少了什么设置选项）

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

## 构建系统

最广泛使用的是用 _Cmake_ 生成 makefile 然后再 make，然而我并不喜欢它。网上也有一些类似的想法：[Why CMake sucks?](https://twdev.blog/2021/08/cmake/)。我也尝试过 xmake，然而用的人少，出了 bug 找不到解决方案。不过姑且我还是用着 xmake 的。

### xmake

xmake 是向下兼容 cmake 的构建工具，拥有极度简洁的语法。xmake 使用 lua 脚本作为构建系统语言。**~~我真的不想再面对一团乱麻的 cmake 了！~~**

- [新手教程](https://zhuanlan.zhihu.com/p/640701847)，由于我自己摸索而不是看教程，多走了许多弯路。因此推荐看看。
- 开始使用：use [scoop](../farraginous/recommend_packages.md#scoop), `scoop install xmake` 一行安装。输入 `xmake -h` 了解更多。
- _xmake.lua_ 一定要加这句：`set_encodings("utf-8")`（之前没加导致 Qt 中文乱码）
- 可以抢先使用 dev：`xmake update -s dev`
- 至少得用个 c++20 吧：(_xmake.lua_)`set_languages("cxx20")`；注意，如果使用 `set_languages("cxxlatest")` 可能会出现问题，clangd 无法读取 _compiler_commands.json_ 的 c++ 版本
- 代码优化：`set_optimize("fastest")` ~~开你妈的 O3 就完事了！~~
- 添加包，例如 fmt：(_xmake.lua_)
  ```lua
  add_requires("fmt")
  target("test")
      ...
      add_packages("fmt")
  ```
- 查找包（任选）：
  - 手动去 [xmake-repo](https://github.com/xmake-io/xmake-repo/) 找
  - 命令行：`xrepo search <package_name>...`，可用 `*` 作为通配符

#### 指定工具链

用惯了 mingw 和 msvc，想试试用 clang 编译，很简单：

1. 安装 llvm: `scoop install llvm`
2. 在 target 中添加一句 `set_toolchains("clang")` 即可。

## 类型转换

> = C++11

- `static_cast`：不进行安全检查
- `const_cast`：设置或移除指针/引用所指对象的 const
- `dynamic_cast`：进行安全检查，用于指针/引用转换
- `reinterpret_cast`：无视类型，进行最底层的比特位复制

## 智能指针

> = C++11, &lt;memory>

- `shared_ptr` 允许多个指针指向同一个对象
- `unique_ptr` 独占所指向的对象
- `weak_ptr` _shared_ptr_ 的弱引用，不影响其计数器

### 操作

- 可以使用 `std::make_shared<Type>()` 构建 (C++14)
- `reset()` 不带参数则释放（== release()）

## 多行字符串

Raw string: `R""(some\text)""`

## 面向对象

protected：指能被子类访问，不能被外部访问的成员。

C++ 允许多继承，菱形继承需要将中间类声明为虚类。（不要使用菱形继承！）

## option

学过 rust 后，比较推崇 rust 中的 Option 的写法。C++ 中有 std::optional&lt;T> (C++17) 起到类似作用。

- 一些函数：`has_value() -> bool`, `value() -> T`, `value_or(T) -> T`

## template

前往 [external 1.](#external)，讲得非常不错。

## variant

错误处理的时候比较好用。类似<Badge text="?" /> rust Result.

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

（来源：[std::visit](https://en.cppreference.com/w/cpp/utility/variant/visit)）

## 程序计时

程序计时可以用于分析代码效率。[代码参考](https://stackoverflow.com/questions/12883493/timing-the-execution-of-statements-c) <span class="heimu" title="你知道的太多了">大佬能直接看汇编分析，但是太复杂还得 benchmark</span>

## 其他注意点

- C++ 的错误处理并没有一个除 0 的标准错误，因此自己处理时需要 if 判断并 throw.
- 慎用 C++20 的 std::ranges::remove_if()
- 或许很难注意到的一些 [UB](#常见名词)：有符号整数的溢出是 UB，控制流到达返回值不为 void 的函数的末尾，~~还有一些操作裸指针的~~ [source](https://zhuanlan.zhihu.com/p/391088391)

## Qt

:::tip
此处 Qt 部分版本代码为 Qt4-5，不保证能正常迁移至 Qt6;

以下内容并不是 Qt 基础的教程，缺乏目的性和针对性
:::

### 基本介绍 --> [官网](https://www.qt.io/)

Qt 是一个跨平台，跨语言的 GUI 框架。我用 C++做的最早的 GUI 应用就是用 Qt 写的。对于 C++开发 GUI 应用来说，Qt 是比较简单快速的选择。

- 它封装了很多窗口与控件类，可以轻松使用而并不需要深入了解其内部实现与原理 _~~（实际上它几乎封装了一切）~~_
- 它支持可视化构建窗口界面，极大幅度减小代码量
- 它提供的软件打包方式比较人性化

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
`for (auto i = elements.begin();i != elements.end();++i) (*i)->hide();`
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

<div class="image50" style="text-align: center; "><img alt="bug" src="https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/cpp/windeployqt_bug.png" /></div>

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
