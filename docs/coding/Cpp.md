---
sidebar: 'auto'
---
# C++
## 在vscode中配置环境
1. 下载安装 mingw 编译器。我使用[chocolatey](https://chocolatey.org/)进行下载安装，好处是无需手动配置环境变量。
    * 打开管理员下的命令提示符，执行 `choco install mingw`，按提示进行安装。安装后，默认位置应为`C:\ProgramData\chocolatey\lib\mingw\tools\install\mingw64`。（当然，得参考你的chocolatey安装位置）
2. 在 vscode 中安装 *C/C++* 扩展。
3. 在工作区**打开一个文件夹**，新建一个简单的 helloworld.cpp 文件（内容请自己写完）。
4. `Ctrl + Shift + P` 打开命令面板，搜索并点击 `C/C++: Edit Configurations (UI)` ，将编译器路径改为 mingw 文件夹下的 `/bin/g++.exe`；在*IntelliSense 模式* 下选择 `gcc-x64`。此时 vscode 会自动在工作区创建 `.vscode` 存放配置。
5. 同上打开命令面板，搜索并点击 `Tasks: Configure Default Build Task`，再选择 `C/C++: g++.exe build active file`。

现在你已经可以在 vscode 中编译并运行 c++ 代码了。
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
* 可以使用 `std::make_shared<Type>()` 构建
* `reset()` 不带参数则释放（== release()）
## 程序计时
程序计时可以用于分析代码效率。[代码参考](https://stackoverflow.com/questions/12883493/timing-the-execution-of-statements-c) ~~大佬请直接看汇编结果~~
## Qt
### 基本介绍 --> [官网](https://www.qt.io/)
Qt是一个跨平台，跨语言的GUI框架。我用C++做的最早的GUI应用就是用Qt写的。对于C++开发GUI应用来说，Qt是比较简单快速的选择。

* 它封装了很多窗口与控件类，可以轻松使用而并不需要深入了解其内部实现与原理 *~~（实际上它几乎封装了一切）~~*
* 它支持可视化构建窗口界面，极大幅度减小代码量
* 它提供的软件打包方式比较人性化

::: tip
以下内容并不是Qt基础的教程，缺乏目的性和针对性
:::
### 唤起最小化的窗口
```cpp
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