# 设置手机
为了追求绝对控制与我所需要的功能。
## 红米 note 10 pro
> 题外话：高考结束后买的手机，当时还是一个普通人，自然不知道刷机解 bl root 这些东西，等我想解的时候已经太迟了，数据已经太多了。下一部手机必 root。
1. 开启开发者模式
    * 在 USB 调试版块，该放行放行，该关闭关闭。
    * 在最下方关闭 MIUI 优化。MIUI 优化可能会导致无法使用 adb install 安装软件。（报错 `INSTALL_FAILED_USER_RESTRICTED`）*顺带，这已经是一个持续至少 6 年的问题了。*
        * 关闭后刷新率会自动 120HZ，调回 60。
2. [使用 ADB](./adb.md) 卸载一些包
    * `com.miui.systemAdSolution`：广告
    * `com.miui.hybrid`：快应用，杂种；[为什么要卸载](./fuck_quickapp.md)
    * `com.sohu.inputmethod.sogou.xiaomi` & `com.iflytek.inputmethod.miui`：自带的 搜狗 讯飞 输入法，我用 gboard