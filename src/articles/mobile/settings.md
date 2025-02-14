---
date: 2023-01-22
icon: android
category:
  - 教程
  - 生活
  - 经历
tag:
  - 移动端
---

# 移动平台设置

~~拿到手机第一件事肯定是 [root](./root.md) 啊..~~

## before root

MIUI：

1. 开启开发者模式
   - 在 USB 调试版块，该放行放行，该关闭关闭。
   - 在最下方关闭 MIUI 优化。MIUI 优化可能会导致无法使用 adb install 安装软件。（报错 `INSTALL_FAILED_USER_RESTRICTED`）_顺带，这已经是一个持续至少 6 年的问题了。_
     - 关闭后刷新率会自动 120HZ，调回 60。
2. [使用 ADB 卸载](./adb.md)一些包
   - `com.miui.systemAdSolution`：广告
   - `com.miui.hybrid`：快应用，杂种；[为什么要卸载](#禁用快应用中心)
   - `com.sohu.inputmethod.sogou.xiaomi` & `com.iflytek.inputmethod.miui`：自带的 搜狗 讯飞 输入法，我用 gboard
   - `com.miui.newhome`：内容中心，广告，好像不能卸载只能禁用
3. 关闭 Github Mobile 的默认打开网址。Github Mobile 因 2FA 需要使用，但使用其查看项目确实非常智障。幸好 MIUI14 提供了设置应用默认打开的功能：长按应用 - 应用信息 - 默认打开，调为拒绝。

ColorOS：

1. 开启开发者模式并设置：
   - _禁止权限监控_，让你从某应用打开其他应用不需要确认

## after root

通用：

1. 不要在 Google Play 安装 QQ，无法开启深色模式 (fuck u)。
2. 见[禁用软件](#禁用软件)。
3. Google Play 可以通过蓝牙进行发送 - 接受软件，无需再次下载，不过只能传商店内的软件。
4. Delta Chat 可以在源手机上点击 _设置 - 添加第二台设备_，然后用目标机扫码即可迁移**单个账户**。
5. 可以在开发者选项里关闭 5G，减少耗电。
6. 开启通话自动录音。

一加：

1. ColorOS 原生支持更换应用名称与图标，可以规避审查。
   - 需要在 Google Play 安装[ColorOS 13 Icon pack](https://play.google.com/store/apps/details?id=com.akbon.coloros)
2. [LuckyTool](./module_and_app.md#lsposed) 安装后在任务栏小部件有多出一些选项。
   - **极暗模式**是好东西。
   - LuckeyTool 可以开启 ColorOS 隐藏的不息屏模式，这在双机位笔试时非常有用。（_LuckeyTool - 功能 - 设置 - 启用息屏永不超时_）

### 禁用软件

我使用 [App Manager](./module_and_app.md#app) 进行软件的冻结操作。

> _scene5/6_ 也可以，但是其为闭源商业软件，操作麻烦，不用它。<br/>_雹_ 也可以，但是主要用于禁止日常应用后台运行；无法冻结某些系统应用。

#### MIUI

[这里](https://gist.github.com/mcxiaoke/0a4c639d04e94c45eb6c787c0f98940a)可以看 MIUI 有哪些不能禁用的东西。

#### EU MIUI

- 禁用负一屏需要冻结 Google (`com.google.android.googlequicksearchbox`)。
- Google 家的大多数都能冻
- 不要冻 _媒体存储设备_(`com.google.android.providers.media.module`) ！！！[惨痛教训](./problem.md#乱冻结)

#### ColorOS

一加和 OPPO 的。

- 不要冻 _应用包安装程序_！！！！[惨痛教训，并附带了哪些东西能冻](./problem.md#一加无限重启)
- [这篇文章](https://bbs.oneplus.com/thread/6003405)指出了一些能卸载的包。
  - 对于新系统，文章包名里的 `heytap` 基本都要换成 `coloros`，`oplus` 换成 `nearme`。

#### 禁用快应用中心

> 这是一篇久远的文章，是本页面中年龄最大的一篇。  
> 快应用服务框架本意是好的，大家联合起来统一为一个标准，减少不必要的重复开发。（参考 browser）

但是到了现在，快应用已经成为了手机的毒瘤，垃圾的藏匿处。无数的广告弹窗在手机厂商纵容下疯狂攻击使用者。同时快应用服务框架本身违背了自由原则，无法在设置中卸载 | 禁用，只能收回权限，最多降低版本。为了您和**家人**的身心健康，建议禁用之：

1. 查看快应用的包名：（例：MIUI 12.5）设置 - 应用设置 - 应用管理 - 找到 _快应用服务框架_ 进入，点击右上角感叹号，查看应用包名。
   > 或：已知关键字可使用 `adb shell pm list package [<keyword>]` 在手机内以关键字查找包名。
   - MIUI 12.5：`com.miui.hybrid` <span class="heimu" title="你知道的太多了">杂种</span>，可能还有 `.accessory` 后缀
   - HarmonyOS：`com.huawei.fastapp`
   - ColorOS：`com.nearme.instant.platform`
   - vivo：`com.vivo.hybrid`
2. 连接手机并[开启 ADB 调试](./adb.md)。
3. 禁用包：`adb shell pm disable-user com.miui.hybrid`，也可以直接卸载，详情参考 [ADB](./adb.md)

## external

1. [小米平板 5 Pro 刷入 GSI Android 教程](https://dev.moe/2716)
