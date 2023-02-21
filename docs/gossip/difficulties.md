# 生活中遇到的困难
**此页面几乎不再更新。请前往[我的频道](https://t.me/withabsolutex)搜索 tag: `#垃圾桶`。**

有关博客写作的问题请跳转[VuePress2与博客心得](./withvuepress2.md)。
## 20230221：网站访问问题
问题描述：开启 clash 系统代理时无法访问校内 pt 站：`pt6.neko2022.com`。反之则可以访问。<text style="color:red;font-weight:bold">未解决！</text>

一些信息：
> \> ping pt6.neko2022.com<br/>
> Ping request could not find host pt6.neko2022.com.<br/>
> \> nslookup<br/>
> \> pt6.neko2022.com<br/>
> Server:  dns2.ecust.edu.cn<br/>
> Address:  202.120.111.30<br/>
> Name:    pt6.neko2022.com<br/>
> Address:  2001:da8:8007:1358:20c:29ff:fe89:603f

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
> couldn't find ip:pt6.neko2022.com<br/>
> <text style="color:red;">DIRECT (match Domain/pt6.neko2022.com)</text>

大致感觉问题在 DNS 上（那为什么 v6 也无法访问呢）。然而搜了很久，ipv6 两个开关都放行了，还是不行。明天再说吧。
## 20220817-18：Hyper-V的各种问题
* 问题一：在 *设置-应用-可选功能-更多Windows功能* 中找不到Hyper-V选项。<text style="color:blue;">[已解决](../articles/computer_setting.md)</text>
* 问题二：在安装系统界面无法使用键盘鼠标。<text style="color:red;font-weight:bold">未解决！</text>

    * ![fuckhyperv](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/gossip/difficulties/fuckhyperv.png)

    尝试：
    * 使用其他系统iso ：出现`Start PXE over IPv4`，键盘仍然无法使用。
    * 使用`vmguest.iso`：同上。
    * 关闭安全启动、关闭网络、其他设置：无效。
## 20220813：更新博客
因为[某些原因](../hide/memories.md#大学-大一后暑假)电脑坏了，在等新电脑到的过程中进行了一次最费力的博客更新。（动力：实在是太想bb了）

事件背景：两台台式机（家庭机and鞋盒机），一个屏幕，两条电源线（电脑与屏幕供电），1条vga线。两机相距甚远，网线在家庭机上。鞋盒机没有网卡驱动。家庭机性能无法胜任vscode | node.js。

1. 在手机上下载node.js & vscode安装包，用U盘通过a2c转接器拷到鞋盒机并安装。
2. 不依赖MPV插件，写一个下午博客，并测试编译。
3. 将屏幕搬去，三条线接到家庭机上，科学上网（期间还忘记了机场密码），下载git，登录github。
4. 安装并配置git，设置rsa密钥（家庭机的键盘甚至没有insert键），上传仓库。
5. 将所有物品重新搬回鞋盒机。（毕竟是游戏主力）

然后人就累死了。。。