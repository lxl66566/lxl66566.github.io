# 杂项
## 命令行压缩
我电脑上使用的压缩软件为[Bandizip](../farraginous/recommend_packages.md#bandizip)，命令行指令为`bz`，详见[官网-命令行参数](https://cn.bandisoft.com/bandizip/help/parameter/)。

我使用脚本备份我的浏览器历史记录，并使用bandizip命令行进行7z加密压缩后上传到Github。代码如下（隐去关键部分）：
```bash
cp -f "C:\Users\NAME\AppData\Local\Microsoft\Edge\User Data\Default\History" D:/temp
bz c -p:PASSWORD -aoa -l:9 ./History_pwd:TIP.7z D:/temp/History
```

若直接对History文件压缩会报错（我也不清楚为什么），因此使用cp命令复制到缓存文件夹压缩，曲线救国。