# 禁用快应用中心
快应用服务框架本意是好的，大家联合起来统一为一个标准，减少不必要的重复开发。

但是到了现在，快应用已经成为了手机的毒瘤，垃圾的藏匿处。无数的广告弹窗在手机厂商纵容下疯狂攻击使用者。同时快应用服务框架本身违背了自由原则，无法在设置中卸载 | 禁用，只能收回权限，最多降低版本。为了您和**家人**的身心健康，建议禁用之：

1. 查看快应用的包名：（例：MIUI 12.5）设置 - 应用设置 - 应用管理 - 找到*快应用服务框架* 进入，点击右上角感叹号，查看应用包名。
> 或：已知关键字可使用 `adb shell pm list package [<keyword>]` 在手机内以关键字查找包名。
例：在 MIUI 12.5 中，快应用服务框架包名为`com.miui.hybrid` <span class="heimu" title="你知道的太多了">杂种</span>
2. 连接手机并[开启 ADB 调试](./adb.md)。
3. 禁用包：`adb shell pm disable-user <package_name>`，例如：`adb shell pm disable-user com.miui.hybrid`.

*若需直接卸载请使用 `adb shell pm uninstall -k --user 0 <package_name>`。*