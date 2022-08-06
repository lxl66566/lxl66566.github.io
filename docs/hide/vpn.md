# 初级科学上网
:::danger 警告
本人不承担因使用以下推荐所带来的任何后果。
:::

## 免费VPN
:::warning 警告
自带闭源客户端的免费VPN在安全性方面没有保证，不推荐使用。
:::

**免费VPN仅应在无其他安全选择的情况下，接触非敏感信息时使用，且有较高信息泄露风险。** 随着审查力度变化，不排除肉身被带走的风险。[血的教训（当然不是我](https://focus.scol.com.cn/shwx/202007/57862317.html)

以下免费推荐均为Android端app，**均可在谷歌商店下载**。
### 火箭加速（推荐）
[私链下载地址](https://wwp.lanzout.com/ibdoB02z8o8d)

优点：
* 体积小
* 权限低
* 速度较快（有时能跑到1.5M/s）

缺点：
* 节点变化频繁，易失效

tips：加速前需事先选择能通过连接测试的节点
### 蚂蚁VPN
声称永久免费，操作简单，但开启较慢，有强制弹窗广告
### 银河VPN（不推荐）
开启成功率看脸，网速不敌上面两位，同样有强制弹窗广告
## 机场选择

此处列出部分机场性价比及其变化情况。数字代表**每1元RMB买到的GB数**<Badge type="tip" text="月付最低合理价格" vertical="top" />。

<iframe frameborder="no" src="/charts/GBperprice.html" width="100%" height="280"></iframe>

:::warning
每一次付费都请告诫自己机场跑路的可能性。
:::

*（以下数据截止于20220806）*
### 白嫖机场（推荐）
[官网](https://bpjc.xyz/) | [邀请链接](https://bpjc.xyz/#/register?code=YnrLNenI)

[备用官网](https://xn--mesv7f5toqlp.club/) | [备用邀请链接](https://xn--mesv7f5toqlp.club/#/register?code=YnrLNenI)

|月付|流量|限速|
| :--: | :--: | :--: |
|￥1.02|100G|未知|

|年付|流量|限速|
| :--: | :--: | :--: |
|￥10.65|500G*12|未知|

*（此前限速为500Mbps）*
### 番茄花园
[官网](https://fqhy.xyz/)

拥有免费节点，每日签到可领免费流量

|月付|流量|限速|
| :--: | :--: | :--: |
|￥0.00|每日签到（约2G）|100Mbps|
|￥30.00|300G|300Mbps|
|￥60.00|1300G|500Mbps|
|￥100.00|6000G|无限制|

### Simple Cloud
[官网](https://spcloud.cc/) | [邀请链接](https://spcloud.cc/#/register?code=97EXi3tX)

|月付|流量|限速|
| :--: | :--: | :--: |
|￥3.00|20G|1Gbps|
|￥5.00|50G|1Gbps|
|￥8.00|100G|1Gbps|
|￥10.00|150G|1Gbps|
|￥20.00|350G|1Gbps|

|一次性|流量|限速|
| :--: | :--: | :--: |
|￥15.00|50G|1Gbps|
### StarTrip（已跑路）
[官网](https://www.startrip.top)
|月付|￥1.00|无限期（已取消）|￥1.00|
| :----: | :----: | :----: | :----: |
|流量|60G|流量|15G|
|限速|50Mbps|限速|无限制|

*（旧版表格）*
### 貓貓互聯
[官网](https://neko.services/) | [邀请链接](https://neko.services/#/register?code=xjZ5356D)

|月付|流量|限速|
| :--: | :--: | :--: |
|￥13.00|200G|未知|

|一次性|流量|限速|
| :--: | :--: | :--: |
|￥10.00|64G|未知|

:::tip 提示
以下机场因性价比原因不推荐购买；数据久远。
:::

### 墙裂
[官网](https://my.qianglie.com/) | [邀请链接](https://my.qianglie.com/#/register?code=ItpWJ6fF)
|月付|流量|限速|
| :--: | :--: | :--: |
|￥5.99|50G|1000Mbps|
### 流量库
[官网](https://llcool.xyz/) | [邀请链接](https://llcool.xyz/#/register?code=3y4cAFpN)
|月付|流量|限速|
| :--: | :--: | :--: |
|￥1.00|1G|1Gbps|
|￥5.00|32G|1Gbps|
|￥8.00|64G|1Gbps|
|￥12.00|128G|1Gbps|
|￥20.00|256G|1Gbps|
### 大哥云
[官网](https://www.dageyun.net/) | [邀请链接](https://www.dageyun.net/#/register?code=dpY4UdX3)
|月付|流量|限速|
| :--: | :--: | :--: |
|￥19.90|100G|500Mbps|
## 客户端选择
### clash（推荐）
#### 简介
clash是开源的、支持Android与PC的客户端。（Android端请前往谷歌商店或[前往github下载](https://github.com/Kr328/ClashForAndroid/releases)）
#### 下载地址
[（内核）项目地址](https://github.com/Dreamacro/clash) | [PC端官方下载地址](https://github.com/Fndroid/clash_for_windows_pkg/releases) | [Android端私链](https://wwp.lanzout.com/iL6sD03mi0gf)

#### 优势
* 流畅的图形界面
* 简单易上手

#### 简易配置教程 *v0.19.16*
1. 在Profiles中的文本框内粘贴订阅链接并下载。选中下载的配置文件。
2. 进入Proxies，选择rule，并在下方选择一个可用节点。
3. 进入General，开启System Proxy。

#### 一些提示

<!-- * 科学上网默认只对浏览器有效。若要全局加速请开启TUN Mode。 -->
* [这里](https://github.com/BoyceLig/Clash_Chinese_Patch)提供clash的汉化。
* 在节点界面点击测速图标测试全部节点的连通性
* 建议设置配置文件自动更新（Profiles->右击配置文件->Settings->Update Interval）

### V2ray
#### 简介
V2ray是一款优秀的开源网络代理软件包，它的目标是提供常用的代理软件模块，简化网络代理软件的开发。（摘自[此处](https://www.xuebuyuan.com/3296293.html)）

V2ray同样拥有Android与PC客户端。由于我不常用，故不给出教程与建议。

#### 下载地址

[内核项目地址](https://github.com/v2fly/v2ray-core) | [客户端项目地址](https://github.com/2dust/v2rayN) | [Android端私链（已被封禁）](https://wwp.lanzout.com/iCPkW049jz0d)

### Matsuri & NekoRay
开源，选项丰富，安全性好，使用体验一般 *(Matsuri > NekoRay)* 。

关于下载与使用请[进入网站](https://matsuricom.github.io/)自行查阅。