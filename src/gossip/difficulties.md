---
date: 2022-08-13
icon: debug
category:
  - 生活
---

# 生活中遇到的困难

**此页面几乎不再更新。请前往[我的频道](https://t.me/withabsolutex)搜索 tag: `#垃圾桶`。**

有关博客写作的问题请跳转[VuePress2 与博客心得](./withvuepress2.md)。

## 20230816: install electron

状态：已解决；问题描述：安装 electron 失败。

首先，在 cmd 中使用 `pnpm i -g electron`，然后 postinstalling 后就无响应了。

看了一下，可能是 postinstalling 不会调用系统代理。于是[设置镜像](https://www.electronjs.org/zh/docs/latest/tutorial/installation#自定义镜像和缓存)：`set ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"`，然后再次安装，报错：

> Error: EPERM: operation not permitted, lstat "xxx.zip"

查了一下是权限问题。然而 windows 权限设置[就是他妈一坨屎](../articles/computer_setting.md#windows-下的权限控制)，我改来改去，都放了 _完全控制_，还是报错。之后也尝试了：使用管理员终端，更换 `TEMP` 位置，更换安装盘符，均无法正常安装。网上查到的要么是 clean cache，要么是改权限，没有一点用。

<span class="heimu" title="你知道的太多了">妈的，不想玩了，跟这个傻卵 windows 爆了！（我仍然认为是 windows 的问题）</span>然后因为 `lstat` 是 linux 指令，突然想到在 git bash 中执行安装命令会怎样。于是问题解决了。。。。

```sh
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
pnpm i -g electron
```

最终，我还是对 electron 抱有怨气：为什么不直接使用 npm 的包管理，非要自己用一个 postinstall 脚本还他妈问题一堆，非要去其他源下载还不走代理，非要用 linux 命令，😅

## 20230507：qt6 项目构建失败

状态：已解决；问题描述：使用 cmake | xmake 构建 qt6 项目均失败。

### cmake

::: details 已过时；已弃用 cmake
项目结构：

> ├─ui<br/>
> │ ├─\*.ui<br/>
> │ └─ui\_\*.h<br/>
> ├─\*.cpp<br/>
> └─\*.h

其中 `ui_\*.h` 为 `uic` 命令行生成。

以 settingswidget 为例：

1. settingswidget.ui

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ui version="4.0">
 <class>settingswidget</class>
 <widget class="QWidget" name="settingswidget">
...
```

2. ui_settingswidget.h

```cpp
...
namespace Ui {
    class settingswidget: public Ui_settingswidget {};
} // namespace Ui
...
```

3. settingswidget.h

```cpp
namespace Ui
{
    class settingswidget;
}
class settingswidget : public QWidget
{
    ...
    Ui::settingswidget *ui;
    ...
}
```

4. settingswidget.cpp

```cpp
#include "settingswidget.h"
#include "ui/ui_settingswidget.h"
settingswidget::settingswidget(QWidget *parent) : QWidget(parent), ui(new Ui::settingswidget)
{                                                                      // ^...不允许使用不完整的类型C/C++(70): namespace Ui
    ui->setupUi(this);                                                 // invalid use of incomplete type 'class Ui::...'
    ...
}
```

5. CMakeLists.txt

```
...
file(GLOB UI "${PROJECT_SOURCES}/ui/ui_(.*).h")
set(PROJECT_SOURCES
        ...h
        ...cpp
        ${UI}
)
...
```

:::
现在想来，错误可能是没有生成 `compile_commands.json`，clangd 读不到导致的。

### xmake

xmake 就别说项目了，连最基本的 example 都无法构建。

```shell
xmake create -t qt.widgetapp test
cd test
xmake
```

> [ 71%]: linking.release test.exe<br/>
> error: LINK : fatal error LNK1181: 无法打开输入文件“Qt6Gui.lib”

Qt sdk lib 里没有 `Qt6Gui.lib`，全是 `.prl` 文件（和 `.a`）。xmake 的资料太少，网上也缺少问题解法。

之后使用 aqtinstaller 装了另一套 qt sdk，然后就能 `xmake && xmake r` 跑了。。但是程序用 windeployqt/windeployqt6 打包以后又寄了。。

最终解决了，可以看 [C++ - Qt 打包](../coding/Cpp.md#打包)

### 说两句

感觉 c++ 项目管理差不多了，cmake 抽象得一批，xmake 出了问题又找不到解法。

## 20230221：网站访问问题

问题描述：开启 clash 系统代理时无法访问校内 pt 站：`pt6.neko2022.com`。反之则可以访问。需要实现分流功能。<text style="color:red;font-weight:bold">未解决！</text>

ps. 后续：不用 pt 站了，也不用 clash for windows 而改用 clash verge 了。

一些信息：

> \> ping pt6.neko2022.com<br/>
> Ping request could not find host pt6.neko2022.com.<br/> > \> nslookup<br/> > \> pt6.neko2022.com<br/>
> Server: dns2.ecust.edu.cn<br/>
> Address: 202.120.111.30<br/>
> Name: pt6.neko2022.com<br/>
> Address: 2001:da8:8007:1358:20c:29ff:fe89:603f

尝试 1：在 clash Mixin Yaml 中添加：

```yaml
mixin:
  ipv6: true
  dns:
    enable: true
    ipv6: true
    default-nameserver: [202.120.111.30, ...]
    ...
  rules:
    - 'DOMAIN,pt6.neko2022.com,DIRECT'
    - 'DOMAIN,[2001:da8:8007:1358:20c:29ff:fe89:603f],DIRECT'
    ...
```

无效。

尝试 2：在 clash - Settings - System Proxy - Bypass Domain/IPNet 中添加：

```yaml
bypass:
  - pt6.neko2022.com
  - [2001:da8:8007:1358:20c:29ff:fe89:603f]
  ...
```

无效。（以上均尝试有无中括号的版本）

进行上述尝试后，可以 ping 通该站，但浏览器无法访问（域名与 ipv6 都无法访问），clash log：

> <text style="color:red;">pt6.neko2022.com:80</text><br/>
> couldn't find ip:pt6.neko2022.com<br/> > <text style="color:red;">DIRECT (match Domain/pt6.neko2022.com)</text>

大致感觉问题在 DNS 上（那为什么 v6 也无法访问呢）。然而搜了很久，ipv6 两个开关都放行了，还是不行。明天再说吧。

## 20220817-18：Hyper-V 的各种问题

- 问题一：在 _设置-应用-可选功能-更多 Windows 功能_ 中找不到 Hyper-V 选项。<text style="color:blue;">[已解决](../articles/computer_setting.md)</text>
- 问题二：在安装系统界面无法使用键盘鼠标。<text style="color:red;font-weight:bold">未解决！</text>

  ![fuckhyperv](/images/gossip/difficulties/fuckhyperv.png)

  尝试：

  - 使用其他系统 iso ：出现`Start PXE over IPv4`，键盘仍然无法使用。
  - 使用`vmguest.iso`：同上。
  - 关闭安全启动、关闭网络、其他设置：无效。

## 20220813：更新博客

因为[某些原因](../hide/memories.md#大学-大一后暑假)电脑坏了，在等新电脑到的过程中进行了一次最费力的博客更新。（动力：实在是太想 bb 了）

事件背景：两台台式机（家庭机 and 鞋盒机），一个屏幕，两条电源线（电脑与屏幕供电），1 条 vga 线。两机相距甚远，网线在家庭机上。鞋盒机没有网卡驱动。家庭机性能无法胜任 vscode | node.js。

1. 在手机上下载 node.js & vscode 安装包，用 U 盘通过 a2c 转接器拷到鞋盒机并安装。
2. 不依赖 MPV 插件，写一个下午博客，并测试编译。
3. 将屏幕搬去，三条线接到家庭机上，科学上网（期间还忘记了机场密码），下载 git，登录 github。
4. 安装并配置 git，设置 rsa 密钥（家庭机的键盘甚至没有 insert 键），上传仓库。
5. 将所有物品重新搬回鞋盒机。（毕竟是游戏主力）

然后人就累死了。。。
