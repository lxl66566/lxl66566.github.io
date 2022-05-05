# 我的文章
## 查看手机cpu指令集  

### APP

* 国内应用商店：一个木函（7M）

<img alt="一个木函_指令集" src="/images/gossip/instruction_1.jpg" width="50%" height="50%"/>

* 谷歌商店：CPU X（10M）

<img alt="CPU_X" src="/images/gossip/instruction_2.jpg" width="50%" height="50%"/>

### ADB
要求电脑上有`adb.exe`，手机开启USB调试。~~（太麻烦了！~~

连接后执行`adb shell getprop ro.product.cpu.abi`

<img alt="CPU_X" src="/images/gossip/instruction_3.png" width="65%" height="65%"/>