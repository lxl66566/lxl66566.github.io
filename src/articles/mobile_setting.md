# 设置手机
为了追求绝对控制与我所需要的功能。前往[MIUI 有多难用](../gossip/fuckxxx.md#miui13-有多难用)
## Redmi note 10 pro - before root
> 题外话：高考结束后买的手机，当时还是一个普通人，自然不知道刷机解 bl root 这些东西，等我想解的时候已经太迟了，数据已经太多了。下一部手机必 root。<br/>
> 然而等到了一个能够使我无视数据的契机。
1. 开启开发者模式
    * 在 USB 调试版块，该放行放行，该关闭关闭。
    * 在最下方关闭 MIUI 优化。MIUI 优化可能会导致无法使用 adb install 安装软件。（报错 `INSTALL_FAILED_USER_RESTRICTED`）*顺带，这已经是一个持续至少 6 年的问题了。*
        * 关闭后刷新率会自动 120HZ，调回 60。
2. [使用 ADB 卸载](./adb.md)一些包
    * `com.miui.systemAdSolution`：广告
    * `com.miui.hybrid`：快应用，杂种；[为什么要卸载](#禁用快应用中心)
    * `com.sohu.inputmethod.sogou.xiaomi` & `com.iflytek.inputmethod.miui`：自带的 搜狗 讯飞 输入法，我用 gboard
    * `com.miui.newhome`：内容中心，广告，好像不能卸载只能禁用
3. 关闭 Github Mobile 的默认打开网址。Github Mobile 因 2FA 需要使用，但使用其查看项目确实非常智障。幸好 MIUI14 提供了设置应用默认打开的功能：长按应用 - 应用信息 - 默认打开，调为拒绝。
## 刷机
<span class="heimu" title="你知道的太多了">忘了备份应用时间了，妈的</span>

20230614 记一次失败的刷机。型号：redmi note 10 pro
1. 解 BL 锁，等了 7days。
2. 刷入 twrp [失败](#刷入-twrp-失败)。

没有第三方 recovery 就无法卡刷，而一些类原生例如 Havoc OS | Evolution OS 只提供了卡刷包，无法线刷。寄。~~（据说有 python 脚本能把卡刷包转成线刷包，没试过，有生之年）~~

退而求其次，想刷 EU 版 MIUI，[失败 again](#线刷-global-失败)，寄。

再退，用国行 MIUI (chopin)，不使用 twrp 刷入 magisk。（kernelSU 不支持：非 GKI 设备内核）
1. 安装 [magisk](https://github.com/topjohnwu/Magisk/releases/latest)。
2. 从原生线刷包把 `boot.img` 拷到手机上。
3. 在 magisk 中，选择安装 magisk（修补一个文件），选择 `boot.img` 修补。
4. 再将修补后的 `magiskxxx.img` 拷回电脑，`fastboot flash boot magiskxxx.img && fastboot reboot` 刷 新 boot。
5. 好了，之后就是[另一个板块](#magisk)了。

### 一些问题
#### 线刷 global 失败
已经注释了 `Missmatching image and device` 验证，跳过了 crclist & sparsecrclis 认证，最后还是卡在了 `error: Writing 'xbl' FAILED (remote:'This partition doesn't exist')` 上。。网上说 xbl error 是没解 bl 锁，但我这个显然是找不到分区。

下了两个 global (sweet)，都需要 `xbl` 分区，都没法用。然后放弃了。
#### 刷入 twrp 失败
在 fastboot 下执行 `fastboot flash recovery twrp.img`，报错：`Writing 'recovery'   FAILED (remote: 'This partition doesn't exist')`。

网上看了一下，这个型号是 A/B 分区的，并没有 recovery 分区。执行 `fastboot boot twrp.img`（不刷入，直接启动），报错 `Booting   FAILED (Status read failed (Too many links))`。然后能试的方法都试过了，使用 USB2.0，改注册表驱动，使用最新的 platform-tools，使用舍友的电脑，把 twrp 换用 OrangeFox...都无法解决此问题。
#### 误炸 boot
> 此事件也直接导致了我屏蔽 csdn

弱智 csdn 给了一个把 twrp 镜像刷入 boot 的脑残方法（那是刷 recovery 的）。。于是 boot 损坏，手机无限重启。

解法：下载个官方 ROM 解压，找到 `boot.img` 刷入 `fastboot flash boot boot.img` 就行了。

我第一次搞，以为要刷砖了比较慌，直接用 miflash 把整个原生 ROM 都刷进去了。。（最后还刷失败了，还是无限重启，miflash 你不得好死）

> 再吐槽一下 [bandizip](../farraginous/recommend_packages.md#bandizip)，解压 `*.tgz` 时默认一层一层解（`*.tgz` -> `*.tar` -> `*`）。。一个 10G 的包硬生生给我占了 26G 的空间。<br/>
> <div class="image50" style="text-align: center; "><img alt="fun1" src="https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/articles/mobile_setting/fuckbandizip.png" /><div>你为什么不开？你为什么不开？</div></div>
## magisk
假定已经完全安装好了 magisk（参见[刷机](#刷机)）。以下是我的配置步骤。
1. 隐藏：*首页右上角 - 设置 - App - 隐藏*
2. 安装 [LSPosed](https://github.com/LSPosed/LSPosed/releases/latest) (Zygisk)：下载 zip，复制进手机，在 *magisk - 模块* 安装并重启，在设置中打开 Zygisk。（不再重复模块安装步骤）
3. 安装内置的屏蔽广告插件
### magisk modules
* LSPosed
* [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)：隐藏 root。
* [uperf](https://github.com/yc9559/uperf)
* 神仙自动救砖（**闭源**）
* [电池容量纠正](https://downloads.suchenqaq.club/magiskmodules/tool/%E7%94%B5%E9%87%8F%E4%BF%AE%E5%A4%8D.zip)（**闭源**）
### LSPosed modules
* WeXposed
* QXposed
* TSBattery
* [核心破解](https://github.com/LSPosed/CorePatch/releases)
* 哔哩漫游
* [自动记账](https://github.com/Auto-Accounting/Qianji_auto)，测试中
* [QQ 瘦身](https://github.com/KitsunePie/QQCleaner)
* Telegram UserID Viewer
* Bili调速
### 其他
通过 play 商店安装：
* [shizuku](https://github.com/RikkaApps/Shizuku)
* [雹](https://github.com/aistra0528/Hail)：冻结应用。拒绝使用闭源商业化的 *冰箱*。（顺带一提，下述的 *Scene5* 也有冻结应用的功能）
* App ops（**闭源！**）：权限管理。闭源功能有限。

通过 Github 安装：
* [AdAway](https://github.com/AdAway/AdAway)：屏蔽广告。
    <!-- * 可以在 *首选项 - 基于 root... - 安装自签名证书*，以避免 Android 系统的 WIFI 认证 -->
* [DarQ](https://github.com/KieronQuinn/DarQ)：强制黑夜。支持不算好，pdd，咸鱼都无法强制。
* [App Manager](https://github.com/MuntashirAkon/AppManager)：开源的 root 软件管理，可以查看运行中服务，可以禁用，控制权限

通过酷安安装：
* Scene5（**闭源！**）：注意，scene5 ROOT 后的功能为试用，到期需**付费**，正在寻找开源免费替代品。
    * 目前依赖其任务管理，控制性能与冻结应用。

## Redmi note 10 pro - after root
1. 安装 V2rayNG.基础中的基础。
2. 安装 Google Play。
3. 不要在 Google Play 安装 Wechat，会被冻结账号。需要绑定身份证解封 (fuck u)。<span class="heimu" title="你知道的太多了">然后我人脸验证的时候刚好熄灯了，你妈</span>
4. 不要在 Google Play 安装 QQ，无法开启深色模式 (fuck u)。

## 禁用快应用中心
快应用服务框架本意是好的，大家联合起来统一为一个标准，减少不必要的重复开发。

但是到了现在，快应用已经成为了手机的毒瘤，垃圾的藏匿处。无数的广告弹窗在手机厂商纵容下疯狂攻击使用者。同时快应用服务框架本身违背了自由原则，无法在设置中卸载 | 禁用，只能收回权限，最多降低版本。为了您和**家人**的身心健康，建议禁用之：

1. 查看快应用的包名：（例：MIUI 12.5）设置 - 应用设置 - 应用管理 - 找到*快应用服务框架* 进入，点击右上角感叹号，查看应用包名。
> 或：已知关键字可使用 `adb shell pm list package [<keyword>]` 在手机内以关键字查找包名。
例：在 MIUI 12.5 中，快应用服务框架包名为`com.miui.hybrid` <span class="heimu" title="你知道的太多了">杂种</span>
2. 连接手机并[开启 ADB 调试](./adb.md)。
3. 禁用包：`adb shell pm disable-user com.miui.hybrid`，也可以直接卸载，详情参考 [ADB](./adb.md)

以上教程为 MIUI 下禁用快应用中心的步骤，不保证在其他操作系统上正常运作。