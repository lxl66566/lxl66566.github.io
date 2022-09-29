# 生活中遇到的困难
有关博客写作的问题请跳转[VuePress2与博客心得](./withvuepress2.md)。
## 20220813：更新博客
因为[某些原因](../hide/memories.md#大学-大一后暑假)电脑坏了，在等新电脑到的过程中进行了一次最费力的博客更新。（动力：实在是太想bb了）

事件背景：两台台式机（家庭机and鞋盒机），一个屏幕，两条电源线（电脑与屏幕供电），1条vga线。两机相距甚远，网线在家庭机上。鞋盒机没有网卡驱动。家庭机性能无法胜任vscode | node.js。

1. 在手机上下载node.js & vscode安装包，用U盘通过a2c转接器拷到鞋盒机并安装。
2. 不依赖MPV插件，写一个下午博客，并测试编译。
3. 将屏幕搬去，三条线接到家庭机上，科学上网（期间还忘记了机场密码），下载git，登录github。
4. 安装并配置git，设置rsa密钥（家庭机的键盘甚至没有insert键），上传仓库。
5. 将所有物品重新搬回鞋盒机。（毕竟是游戏主力）

然后人就累死了。。。
## 20220817-18：Hyper-V的各种问题
* 问题一：在 *设置-应用-可选功能-更多Windows功能* 中找不到Hyper-V选项。<text style="color:blue;">[已解决](../my_articles.md#对win11的设置)</text>
* 问题二：在安装系统界面无法使用键盘鼠标。<text style="color:red;font-weight:bold">未解决！</text>

    * ![fuckhyperv](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/gossip/fuckhyperv.png)

    尝试：
    * 使用其他系统iso ：出现`Start PXE over IPv4`，键盘仍然无法使用。
    * 使用`vmguest.iso`：同上。
    * 关闭安全启动、关闭网络、其他设置：无效。