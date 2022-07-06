# 我的文章
## 科学上网初级
[点击跳转](../hide/vpn.md)
## 查看手机cpu指令集  

* 国内应用商店：一个木函（7M）

<img alt="一个木函_指令集" src="/images/gossip/instruction_1.jpg" width="40%" height="40%"/>

* 谷歌商店：CPU X（10M）

<img alt="CPU_X" src="/images/gossip/instruction_2.jpg" width="40%" height="40%"/>

* ADB
要求电脑上有`adb.exe`，手机开启USB调试。~~（太麻烦了！~~

连接后执行`adb shell getprop ro.product.cpu.abi`

<img alt="CPU_X" src="/images/gossip/instruction_3.png" width="65%" height="65%"/>

## Win10设置开机自启动
`win + r`打开运行面板，输入`shell:startup`打开启动文件夹，拖入需自启动的程序快捷方式即可。

但启动文件夹中没有其他软件的自启动控制。若需关闭某些程序的自启动，可以打开任务管理器，选择`启动`进行修改。
## BIOS密码重置
*（我的电脑型号：Predator G3-573，不保证其他品牌电脑的重置方法相同）*

1. 在BIOS界面中输错三次密码，出现输入恢复码的弹窗，并给出一个Key。（我的电脑Key为10位纯数字）

2. 进入[此网站](https://1024kb.co.nz/bios/)，输入Key，然后将计算结果输回电脑。

3. 进入BIOS后，设置supervisor password为空。