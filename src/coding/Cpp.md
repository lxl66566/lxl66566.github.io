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

<div class="subtitle">——我从未懂过 C++</div>

## 一些工具

- [cppinsights](https://cppinsights.io/)：显式指明代码中的隐式转换与中间变量。
- [godbolt](https://godbolt.org/)：汇编分析；pastebin；不同编译器的行为分析
- [Quick C++ Benchmark](https://quick-bench.com/)

## 常见名词

- UB：Undefined behavior，未定义行为，典型的有 `i = i++ + ++i`，一个容易被忽视的 UB 是 `a[i] = i++;`。([ref](https://en.cppreference.com/w/c/language/eval_order))

## 安装

C++ 开发前的准备挺复杂的，做好心理准备。

linux 下用包管理器，配置环境应该是基础技能。这里写的主要是 windows 下的开发步骤。

我目前正在使用 _xmake + clang 全套_ 进行开发。

### 编译器

::: tabs

@tab clang

> Clang 是 LLVM 的前端，具有速度快、内存占用小、诊断信息可读性强、兼容性好等优势。[ref](https://www.51cto.com/article/630677.html)

[scoop](../farraginous/recommend_packages.md#scoop) 一行：`scoop install llvm`。

安装 llvm 还会附带 clang 前端工具如 _clangd_, _clang-tidy_, _clang-format_。

注：llvm 本体貌似不带运行库，可以考虑 `scoop install mingw-winlibs-llvm`。

@tab mingw

windows 上不想装 msvc 的话可以考虑使用 mingw。

[scoop](../farraginous/recommend_packages.md#scoop) 一行：`scoop install mingw`。

@tab msvc

[安装 visual studio](https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio)（体积较大）。

:::

### 开发环境

我使用 [VSCode](./vscode.md) 作为 C++ 代码编辑器。以下扩展都可以直接在 vscode 商店搜到；只需选择一个即可。

:::: tabs

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

@tab Clang-Tidy + Clang-Format

> Clang-Tidy 比 clangd 要**慢很多**（功能也更多）。并且 [clangd 尊重 clang-tidy 的设置](https://discourse.llvm.org/t/list-of-clang-tidy-checks-supported-in-clangd/61013)，因此非解耦需求下还是用 clangd 比较好。

为什么选这个组合呢，因为解耦：我不喜欢让一个扩展完成所有任务，我希望 linter 和 formatter 分离[^4]，这样是自由度最高的方案。

[^4]: 例如我在嵌入式课用 vscode 写码，我需要一个 formatter 减少我的精神负担，但是由于嵌入式开发 Keil 使用自己的构建系统，因此我希望关闭 linter，否则 linter 读不出项目的结构，会满屏红色报错。

Clang-Tidy 在 vscode 扩展里的名字叫 _CS 128 Clang-Tidy_。

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

最广泛使用的是用 _Cmake_，然而我并不喜欢它。网上也有一些类似的想法：[Why CMake sucks?](https://twdev.blog/2021/08/cmake/)。

::: tabs

@tab xmake

xmake 是~~向下兼容 cmake~~ 的构建工具，拥有较为简洁的语法。xmake 使用 lua 脚本作为构建系统语言。

- [新手教程](https://zhuanlan.zhihu.com/p/640701847)，由于我自己摸索而不是看教程，多走了许多弯路。因此推荐看看。
- 开始使用：
  - use [scoop](../farraginous/recommend_packages.md#scoop), `scoop install xmake` 一行安装。输入 `xmake -h` 了解更多。
  - 示例：`xmake create -l c++ -P ./cpp && cd cpp && xmake && xmake r`
  - 一些 LSP （clangd）需要 `compile_commands.json` 来进行正确的 lint，此时需要执行一次 `xmake project -k compile_commands`，然后重启 LSP。
- 一些预设
  ```lua
  set_encodings("utf-8")            -- 没加会导致 Qt 中文乱码
  set_policy("build.warning", true) -- 开启编译警告
  set_languages("cxxlatest")        -- 设置 C++ 版本
  set_optimize("fastest")           -- 优化等级，不过 release 有默认
  add_requires("fmt")
  target("test")
    -- ...
    add_packages("fmt")             -- 添加 fmt 包
  ```
- 查找包（任选）：
  - 手动去 [xmake-repo](https://github.com/xmake-io/xmake-repo/) 找
  - 命令行：`xrepo search <package_name>...`，可用 `*` 作为通配符
  - [microblock 群友做的第三方网页](https://xmake.microblock.cc/)
- 指定工具链
  - 在 target 中添加 `set_toolchains("clang")`

#### 其他技巧

将动态库复制到构建目录：有的第三方库是 GPL license，如果静态链接的话会违规，只能用动态链接；所以最好能把动态库的 dll 给自动 copy 到构建目录，方便打包或执行。

```lua
add_packages("soundtouch")
after_build(function(target)
	-- 1. 获取目标的所有依赖包
	local pkgs = target:pkgs()
	if pkgs then
		-- 2. 遍历所有包，找到我们需要的 'soundtouch'
		for _, pkg in pairs(pkgs) do
			if pkg:name() == "soundtouch" then
				-- 3. 获取包的安装路径下的 bin 目录 (通常存放 dll)
				local dll_dir = path.join(pkg:installdir("bin"), "bin")
				print("SoundTouch DLL dir: %s", dll_dir)
				-- 4. 检查目录是否存在且其中有文件
				if os.isdir(dll_dir) and #os.files(path.join(dll_dir, "*.dll")) > 0 then
					-- 5. 将该目录下的所有 dll 文件拷贝到当前目标的输出目录
					print("Copying DLL to %s", target:targetdir())
					os.cp(path.join(dll_dir, "*.dll"), target:targetdir())
				end
			end
		end
	end
end)
```

#### 评价

优点：

- xmake 算是 C++ 构建系统里的一股清流，我真的不想再面对一团乱麻的 cmake 了！
- xmake 引入三方包是真的方便！`add_requires` `add_packages` 两行终结了写 C++ 的造轮子焦虑。

缺点：

- 用的人少，出了 bug 不好找解决方案。不过随着 xmake 包越来越多，生态越来越好，我现在还是愿意在个人项目里用 xmake 的。
- [lua 本身是一坨屎](./lua.md)，`xmake.lua` 没有 typing 和 lsp，这方面的生态是欠缺的。

@tab cmake

cmake 内部原理是生成 makefile 然后再 make。

实际上我也就写 Qt 接触了一下 cmake，后面很快转到 xmake 了，关于 cmake 的了解不算多。

- 安装：`scoop install cmake`，或者 VS 安装里也有，不过要自己加 PATH。

我很不喜欢 cmake，感觉还不如回归本源 Makefile。

@tab cmkr

[cmkr](https://github.com/build-cpp/cmkr)，基于 toml 生成 cmake 文件，三阶构建（cmkr -> cmakelists -> makefile）

:::

### 包管理

#### windows

虽然有的构建系统（例如 xmake）有 xrepo 帮你解决了包管理问题，但是大部分项目仍然需要使用专门的包管理器管理依赖，更有甚者需要手动摸索依赖。vcpkg 是 windows msvc 体系里最常用的包管理器。你甚至可以在各种 rust 库里看到要求使用 vcpkg 安装的依赖，例如 libarchive。

vcpkg [有两个工作模式](https://learn.microsoft.com/zh-cn/vcpkg/concepts/classic-mode)，_经典模式_ 和 _清单模式_，其实就是 global 和 per-project 的区别。如果你使用的是 Visual Studio 自带的 vcpkg，其默认运行在 _清单模式_；但是很多时候（比如上述的 rust 编译需要调用 vcpkg）时，直接用 `vcpkg install xxx` 会[报错 _Could not locate a manifest_](https://learn.microsoft.com/zh-cn/vcpkg/troubleshoot/build-failures?WT.mc_id=vcpkg_inproduct_cli#cannot-install-packages-using-classic-mode)，我们更需要 _经典模式_ 的全局包，因此用 scoop 再 install 一个独立的 vcpkg 是很有必要的。

#### linux

linux 上各种包一般依赖于系统包管理器与 pkgconfig 的 .pc 文件。系统包安装后自带了一个 .pc 文件用于指示包的位置、版本、依赖等信息。构建系统会通过 pkg-config 命令读取这些 .pc 文件来获取编译所需的信息。

### Qt 开发环境

Qt 是一个 C++ 框架，主要是做 GUI 用的。[查看介绍](#qt)。不用的话可以不装。

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

刚做完 2. 的时候会出现经典问题，clangd 报 _找不到 `ui_mainwindow.h` 文件_… 因为它是编译期生成的。。用 cmake CLI 的时候可能需要麻烦手动生成，xmake 挺智能的，build 一次后就不会报错了，应该是 xmake 内置的 qt 规则起作用了。

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

~~在大片的构建系统篇幅后我们终于走到了语言基础，太悲哀了。~~

### range-based for loop

> \>= C++11

不用再写下标了。

```cpp
for(auto &i : vec){}
```

如果需要同时使用下标，可以用 [ranges enumerate](#ranges)（不过要 C++20）。

而且，range-based for loop 还有[生命周期问题](https://www.reddit.com/r/cpp/comments/pye3iv/c_committee_dont_want_to_fix_rangebased_for_loop/)，10 年未修复。使用时应特别注意。

### 数据结构

- `<queue>`：
  - 优先队列：`priority_queue<T, vector<T>, std::greater<T>>`
    - 自定义比较函数；重载类的 `<` operator

### 值类型

> \>= C++11

C++11 引入了更多的值类型，这其实也是所有权的体现。在左值和右值中间添加了 xvalue（将亡值），也就是带有所有权的右值（右值引用）<heimu>（名词真的好多！）</heimu>至于其他的 glvalue, prvalue 都是集合的相加相减，没啥意思。总之只要知道 xvalue 是啥就行。

std::move() 可以将值转换为 xvalue，实际上相当于 `static_cast<T &&>()`。

### 类型转换

> \>= C++11

- `static_cast`：不进行安全检查
- `const_cast`：设置或移除指针/引用所指对象的 const
- `dynamic_cast`：进行安全检查，用于指针/引用转换，可以用于运行时父类转子类
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

- 构造函数：
  ```cpp
  class MyClass {
  public:
      int* data;
      // 默认构造函数
      MyClass() : data(new int[100]) {}
      // 拷贝构造函数
      MyClass(const MyClass& other) : data(new int[100]) {
          std::copy(other.data, other.data + 100, data);
      }
      // 移动构造函数
      MyClass(MyClass&& other) noexcept : data(other.data) {
          other.data = nullptr; // 将资源置为空，避免释放时出错
      }
  };
  ```
- protected：指能被子类访问，不能被外部访问的成员。
- virtual：每个拥有虚对象的**类本身**都会有一个虚表，用来查询任何子类的某一特定重载。所以虚表对类是 static 的。
  - 虚函数查找表发生在运行时。
  - 调用虚函数所需的代价基本上和非虚函数效率一样，开销很小。
  - 其他的可以看[这篇文章](https://jacktang816.github.io/post/virtualfunction/)。
- C++ 允许多继承，菱形继承需要将中间类声明为虚类。（正常情况下不要使用菱形继承！）
- 非虚函数定义在类内自动内联。类外则需要显式 inline。
- C++ 实现 interface：纯虚类，所有函数都是纯虚函数。
- C++ 提倡继承代替组合。因为空类还会有 1byte 的空间，组合的话很亏。
- 私有继承不允许多态转换。

### option

(C++17) C++ 中有 `std::optional<T>` 起到类似 rust 中 Option 的作用。

- 一些函数：`has_value() -> bool`, `value() -> T`, `value_or(T) -> T`

### template

前往 [external 1.](#external)，讲得非常不错。

### 内置模版比较函数

算法竞赛常用的，例如优先队列会用到。签名是 class Compare。主要有：`std::greater`, `std::greater_equal`, `std::equal_to`, `std::not_equal_to`，再加上两个 greater 改成 less 的。

### variant

（C++17）

[external 14.](#external) 是对 variant 的深度评测，推荐阅读。

variant 本意是封装的 `union`，可以当成错误处理的一种实现，类似 rust `Result`. C++23 请使用 `std::expected`.

获取值可以用 `std::get` + try catch，可以用 `std::get_if`，也可用 [`std::visit`](https://en.cppreference.com/w/cpp/utility/variant/visit):

```cpp
// 1
std::variant<int, string> v;
try {
  return std::get<int>(v);
} catch (std::bad_variant_access &) {
  return std::get<string>(v);
}
// 2
if (auto pval = std::get_if<int>(&v))
  return *pval;
else
  std::cerr << "failed to get value!" << '\n';
// 3
std::visit([](auto &&arg) {
  using T = std::decay_t<decltype(arg)>;
  if constexpr (std::is_same_v<T, int>)
    std::cout << "int with value " << arg << '\n';
  else if constexpr (std::is_same_v<T, string>)
    std::cout << "errlog: " << arg << '\n';
});
```

### assert

```cpp
static_assert(a < 0 && "error message"); // compile time
#include <cassert>
assert(a < 0 && "error message");  // runtime
```

至于 assert_eq 这种 std 就没有了，需要自己写宏或者引入 crpcut.hpp、GoogleTest 等框架。

### explicit

explicit 可以防止隐式转换；修饰构造函数时，还可以防止复制初始化。rust 人非常喜欢这个东西。

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

### ranges

> &gt;= C++20

ranges 是 C++ 在函数式方面的努力，C++20 的四大特性之一。简单的说就是把各类操作变换 chain 在一起，简化写法，不再需要 `(c.begin(), c.end(), ...)`。

example 可以看 [cpp reference](https://en.cppreference.com/w/cpp/ranges)。

- `std::views` 和 `std::ranges::views` 是等价的。
- `std::ranges::for_each(Range, func)` 不能用 `|` chain，我不明白为什么要这么设计，有点脑残。
- `std::views::transform` 就是 map。
- 直到 C++23 都没有一个可 chain 的 reduce ([std::ranges::fold_left](https://en.cppreference.com/w/cpp/algorithm/ranges/fold_left))
- `std::views::zip` 和 `std::views::enumerate` 返回结果都是 tuple，要用 `std::get<0>(tuple)` 取值。
- 遍历 zip 时必须用 `auto`，不能用 `auto &`：
  ```cpp
  for (auto [a, b] : std::ranges::views::zip(range_a, range_b)) {}
  ```

## [volatile](https://www.runoob.com/w3cnote/c-volatile-keyword.html)

表示某个变量可能随时变化，不要优化此变量的操作。

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
  1. `scoop install aqtinstall`
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

<ZoomedImg alt="bug" src="/images/coding/cpp/windeployqt_bug.png" scale="50%" />

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
8. [[Brief Talk] `auto`, `auto&`, `const auto&` 以及其它形式的 auto 变种在 for-range loop 的选择](https://zhuanlan.zhihu.com/p/25148592)
9. [浅谈 C++ Undefined Behavior](https://zhuanlan.zhihu.com/p/391088391)
10. [ELF 格式的 Symbol 及 C++ 的 inline 关键字](https://zhuanlan.zhihu.com/p/380982475)
11. [Daily bit(e) of C++](https://simontoth.substack.com/archive)
12. [Writing GUI apps for Windows is painful](https://tulach.cc/writing-gui-apps-for-windows-is-painful/)
13. [hackingcpp](https://hackingcpp.com/)：提供语法的简洁 cheatsheet。
14. [std::variant 很难用！](https://ykiko.me/zh-cn/articles/645810896/)
15. [附录：C++ 未定义行为成因列表](https://github.com/Qihoo360/safe-rules/blob/main/cpp-ub-list.md)
16. [Incrementing Vectors](https://travisdowns.github.io/blog/2019/08/26/vector-inc.html) 探讨了 `vector<uint8_t>` 存在的问题。

books:

1. [C++ 性能优化指南](https://github.com/weaiken/ebook/blob/master/01_programming/C++/C++性能优化指南.pdf)
2. [Compiler Options Hardening Guide for C and C++](https://best.openssf.org/Compiler-Hardening-Guides/Compiler-Options-Hardening-Guide-for-C-and-C++.html)
