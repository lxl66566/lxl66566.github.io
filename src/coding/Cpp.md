---
date: 2022-06-11
icon: code
category:
    - 编程
tag:
    - 编程语言
---
# C++
## 一些工具
* [cppinsights](https://cppinsights.io/)：显式指明代码中的隐式转换与中间变量。
* [godbolt](https://godbolt.org/)：汇编分析；pastebin；不同编译器的行为分析
## 常见名词
* UB：Undefined behavior，未定义行为，典型的有 `i = i++ + ++i`。
## 配置 vscode 环境
默认 Windows 下。
### mingw + *C/C++*
1. 下载安装 mingw 编译器。推荐使用 Windows 下包管理器进行安装（[scoop](../farraginous/recommend_packages.md#scoop) | [chocolatey](https://chocolatey.org/)），好处是无需手动配置环境变量。
    * 打开管理员下终端，执行 `choco install mingw`，按提示进行安装。安装后，默认位置应为`C:\ProgramData\chocolatey\lib\mingw\tools\install\mingw64`。（当然，得参考 chocolatey 安装位置）
2. 在 vscode 中安装 *C/C++* 扩展。
3. 在工作区**打开一个文件夹**，新建一个简单的 helloworld.cpp 文件（内容请自己写完）。
4. `Ctrl + Shift + P` 打开命令面板，搜索并点击 `C/C++: Edit Configurations (UI)` ，将编译器路径改为 mingw 文件夹下的 `/bin/g++.exe`；在*IntelliSense 模式* 下选择 `gcc-x64`。此时 vscode 会自动在工作区创建 `.vscode` 存放配置。
5. 同上打开命令面板，搜索并点击 `Tasks: Configure Default Build Task`，再选择 `C/C++: g++.exe build active file`。

现在你已经可以在 vscode 中编译并运行 c++ 代码了。
### clangd + xmake
这里是进阶的环境配置。需要先安装好编译器（随便哪个），~~和一点对技术的渴望。（需要学习 xmake）~~

> clangd 是一个基于Clang C++编译器的语言服务器，可以通过LSP协议向编辑器如VSCode、Vim、Emacs等提供语法补全、错误检测、跳转、格式化等功能。 —— GPT4

相比 *C/C++* 扩展的 LSP，clangd 具有其他优点：
1. 响应速度快。用过 *C/C++* 扩展 的人都知道其慢的一批。
2. 格式化功能强大。
3. 支持 inlay hints

而 xmake 也是向下兼容 cmake 的构建工具，拥有简洁的语法。~~我真的不想再面对一团乱麻的 cmake 了~~

具体配置方式如下：
1. 扩展：安装 *clangd - LLVM*, *XMake - tboox*
2. 从 [scoop](../farraginous/recommend_packages.md#scoop) 安装 xmake：`scoop install xmake`
3. `xmake create -l c++ -P ./cpp && cd cpp`，意思是在当前目录下创建项目`cpp`并进入
4. `xmake && xmake r` 构建并运行。
5. 设置格式化：在项目根目录运行 `clang-format.exe -style=llvm -dump-config > .clang-format`
    * 若找不到`clang-format.exe`可以使用[everything](../farraginous/recommend_packages.md#everything)搜索并用绝对路径启动，我的`clang-format.exe`路径为`C:\Users\<user_name>\.vscode\extensions\ms-vscode.cpptools-1.15.4-win32-x64\LLVM\bin\clang-format.exe`
    * 进入`.clang-format`编辑个性化设置。主要是把缩进调成 4（我的习惯）。其他具体项的意思可以自行搜索。
### vscode 配置 Qt 开发环境
由于 Qt 没有 vscode 中的强大插件，因此我希望在 vscode 中开发 Qt 代码。下述过程：
1. 假设你：
    * 安装了 Qt 与 cmake
    * vscode 已经安装好 cmake 与 C/C++ 扩展
    * Qt 的版本构建文件使用 cmake 而非 qmake. （Qt6 默认使用 cmake）
2. 打开项目文件夹，`Ctrl + Shift + P`，键入`C/C++: Edit Configurations (UI)`
    * 在 *包含路径* 下添加 `D:\software\Qt\6.5.0\mingw_64\include\**`（使用你自己的 include path）
    * 将 *C++ 标准* 改为你需要的。
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
## 构建系统
最广泛使用的是 Cmake，然而我并不喜欢它。网上也有一些类似的想法：[Why CMake sucks?](https://twdev.blog/2021/08/cmake/)。我也尝试过 xmake，然而用的人少，出了 bug 找不到解决方案。所以我也不太好说。不过姑且我还是用着 xmake 的。
## 类型转换
>= C++11
* `static_cast`：不进行安全检查
* `const_cast`：设置或移除指针/引用所指对象的 const
* `dynamic_cast`：进行安全检查，用于指针/引用转换
* `reinterpret_cast`：无视类型，进行最底层的比特位复制
## 智能指针
>= C++11, &lt;memory>
* `shared_ptr` 允许多个指针指向同一个对象
* `unique_ptr` 独占所指向的对象
* `weak_ptr` *shared_ptr* 的弱引用，不影响其计数器
### 操作
* 可以使用 `std::make_shared<Type>()` 构建 (C++14)
* `reset()` 不带参数则释放（== release()）
## 多行字符串
```cpp:no-line-numbers
R""(some text)""
```
## 面向对象
protected：指能被子类访问，不能被外部访问的成员。

C++ 允许多继承，菱形继承需要将中间类声明为虚类。（不要使用菱形继承！）
## option
学过 rust 后，比较推崇 rust 中的 Option 的写法。C++ 中有 std::optional&lt;T> (C++17) 起到类似作用。
* 一些函数：`has_value() -> bool`, `value() -> T`, `value_or(T) -> T`
## template
[see here](https://github.com/wuye9036/CppTemplateTutorial).讲得非常不错。
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
程序计时可以用于分析代码效率。[代码参考](https://stackoverflow.com/questions/12883493/timing-the-execution-of-statements-c) ~~大佬请直接看汇编结果~~
## 其他注意点
* C++ 的错误处理并没有一个除 0 的标准错误，因此自己处理时需要 if 判断并 throw.
* 慎用 C++20 的 std::ranges::remove_if()
* 或许很难注意到的一些 [UB](#常见名词)：有符号整数的溢出是 UB，控制流到达返回值不为 void 的函数的末尾，~~还有一些操作裸指针的~~ [source](https://zhuanlan.zhihu.com/p/391088391)
## Qt
:::tip
此处 Qt 版本大多为 Qt4-5，部分代码无法正常迁移至 Qt6.
:::
### 基本介绍 --> [官网](https://www.qt.io/)
Qt是一个跨平台，跨语言的GUI框架。我用C++做的最早的GUI应用就是用Qt写的。对于C++开发GUI应用来说，Qt是比较简单快速的选择。

* 它封装了很多窗口与控件类，可以轻松使用而并不需要深入了解其内部实现与原理 *~~（实际上它几乎封装了一切）~~*
* 它支持可视化构建窗口界面，极大幅度减小代码量
* 它提供的软件打包方式比较人性化

::: tip
以下内容并不是Qt基础的教程，缺乏目的性和针对性
:::
### 安装
* CLI: [aqtinstall](https://github.com/miurahr/aqtinstall)（我并未试过）
* 官方 GUI: [qt.io](https://www.qt.io/zh-cn/download)
### 第三方
一些可能会用到的第三方组件 / 框架。
* [FluentUI](https://github.com/zhuzichu520/FluentUI)：提供一套 UI 框架。
### 唤起最小化的窗口
```cpp:no-line-numbers
show();showNormal();raise();activateWindow();
```
### 关于控件组
Qt 官方提供了 QButtonGroup 类。该类提供了对 QAbstractButton（即记忆化选择按钮）的分组。将按钮添加到 QButtonGroup 对象中，点击某一按钮时，组中其他按钮会被自动取消 toggle（已点击状态）。你也可以为组中每个按钮赋予数字 id，通过 id 对控件进行调用。

当然，QButtonGroup 类的使用范围是具有很大局限性的。若想对其他不同类型的控件新建分组该怎么做呢？

答：使用 `QVector<QWidget*>`。由于部分常用控件(QPushButton,QLable 等)继承自 QWidget，因此通过 QWidget 类型容器对组内控件进行统一操作，例如需要隐藏主窗口内的所有控件，只需
`
for (auto i = elements.begin();i != elements.end();++i) (*i)->hide();
`
即可。

*对于 hide() 与 show() 操作来说，更简便的方法是将所有控件加入新的 widget，然后将该widget的父对象设为主窗口。之后的隐藏与显示只需对该 widget 操作即可。*
### 关于资源文件
Qt提供方便的资源文件引用。在项目中通过 `Add New...`新建 Qt Resource File 并添加文件到 .qrc 内。Qt 在构建时会将添加的文件以二进制形式存放在生成的 exe 文件中。无需将资源文件放入打包目录，程序将会从 exe 中引用资源。

但是请注意，**加入 .qrc 中的资源文件是只读的。有修改需求的文件请勿使用此方法。***（使用相对路径）*

### 添加图标与版本信息

图标：在项目目录下放入 .ico 图标（[在线转ico](https://www.aconvert.com/cn/icon/)），在项目 .pro 文件中加入 `RC_ICONS = xxx.ico` 即可。所有该项目下的子窗口都会自动使用该图标。注意仅允许 ico 格式图像。

版本信息：在项目 .pro 文件中加入 `VERSION = x.x.x` 即可。

### 打包技巧

Qt 拥有人性化的打包服务。复制 release 输出目录中的 exe 文件到任意目标目录，打开开始菜单 Qt 文件夹中的 MinGW 命令行，进入目标目录后使用 `windeployqt xxx.exe` 命令即可完成打包。

但是，这样打包出来的程序体积还能**进一步缩小**。运行 exe 后，全选目录下文件并删除，跳过已被打开的所有文件。这样能够移除不必要的运行库从而大幅降低发布包的大小。
### 全局快捷键
[参考此文章](https://blog.csdn.net/scueee/article/details/108541574)
### JSON处理
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
此时`rootjsonobj`即为读入的QJsonObject对象（理解为python中的字典对象）。

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
## external
1. [2020年 C++语言律师 等级考试 参考答案](https://www.bilibili.com/video/BV1et4y1D796/)