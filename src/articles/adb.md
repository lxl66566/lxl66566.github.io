---
date: 2023-01-24
icon: android
category:
  - 教程
tag:
  - 移动端
---

# ADB

ADB (Android Debug Bridge) 是强大的手机调试应用。由于 Android 手机的一些共性（垃圾的应用管理 / 备份 / 安装），同时我还是[重度电脑使用者](../gossip/author.md#我的爱好) 和 [root user](./mobile/index.md)，因此 ADB 使用频率很高。

通过 ADB 获取到的权限较高，但低于 root 权限。

## 下载

- [官网](https://developer.android.com/studio/command-line/adb)
- [从谷歌直接下载](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)

## 使用方法

1. 下载并解压后，进入 ADB 目录，打开 cmd。
   > 推荐将 ADB 目录加入环境变量。这样就不仅限于在 ADB 目录下使用指令。
2. 手机开启 USB 调试，并用数据线连接电脑。
   - 开启开发者模式：（例：MIUI 12.5）设置 - 我的设备 - 全部参数 - 多次点击 _MIUI 版本_
   - 在开发者选项中启用 _USB 调试_
3. 执行 `adb devices`，出现以下代码即为连接成功：

```batch:no-line-numbers
* daemon started successfully
List of devices attached
****************        device
```

## 常用指令

```sh
adb devices # 开启端口，检测设备，请求匹配。
adb install <filepath>  # 安装应用。`<filepath>` 可以是相对 / 绝对路径。一般为 .apk 文件。
adb shell pm list package [<keyword>]   # 根据包名查找包
adb shell pm list packages | findstr <keyword>  # 同上
adb shell pm uninstall -k --user 0 <package name>   # 卸载包
adb shell pm disable-user <package name>    # 禁用包
adb reboot fastboot # 重启至 fastboot
```

## 刷机指令

由于 fastboot 同属于 platform tools，因此也归入 ADB 指令。

```sh
adb reboot  # 普通重启，= fastboot reboot
adb reboot bootloader   # 重启至 fastboot
fastboot flash boot xxx.img # 刷入 ROM
```

## 其他指令

```sh
adb shell getprop ro.product.name   # 查看设备代号，或 fastboot getvar product
adb shell am startservice <package name>    # 启动服务
```
