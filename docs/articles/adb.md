# ADB
ADB （全称 Android Debug Bridge）是强大的手机调试应用。由于 Android 手机的一些共性（垃圾的应用管理 / 备份 / 安装），同时我还是[重度电脑使用者](../gossip/author.md#我的爱好)，因此 ADB 使用频率很高。因此才有了这篇文章。

[前往下载](../farraginous/recommend_packages.md#adb)
## 使用方法
1. 下载并解压后，进入 ADB 目录，打开 cmd。
> 推荐将 ADB 目录加入环境变量。这样就不仅限于在 ADB 目录下使用指令。
2. 手机开启 USB 调试，并用数据线连接电脑。
    * 开启开发者模式：（例：MIUI 12.5）设置 - 我的设备 - 全部参数 - 多次点击 *MIUI 版本*
    * 在开发者选项中启用 *USB 调试*
3. 执行 `adb devices`，出现以下代码即为连接成功：
```batch
* daemon started successfully
List of devices attached
****************        device
```
## 常用指令
* `adb devices`：开启端口，检测设备，请求匹配。
* `adb install <filepath>`：安装应用。`<filepath>` 可以是相对 / 绝对路径。一般为 .apk 文件。