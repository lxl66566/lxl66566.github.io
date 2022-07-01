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