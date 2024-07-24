---
date: 2022-10-10
# 注：此日期不准确，是估计值
icon: compress
category:
  - 教程
tag:
  - CLI
---

# 命令行压缩/解压

## bz

我在 windows 上使用的压缩软件为[Bandizip](../farraginous/recommend_packages.md#bandizip)，命令行指令为`bz`，详见[官网-命令行参数](https://cn.bandisoft.com/bandizip/help/parameter/)。

我使用脚本备份我的浏览器历史记录，并使用 bandizip 命令行进行 7z 加密压缩后上传到 Github。代码如下（隐去关键部分）：

```bash
cp -f "C:\Users\<NAME>\AppData\Local\Microsoft\Edge\User Data\Default\History" D:/browsertemp
# backup edge
cp -fu "C:\Users\<NAME>\AppData\Roaming\Mozilla\Firefox\Profiles\ab9jg6na.dev-edition-default\formhistory.sqlite" D:/browsertemp
cp -fu "C:\Users\<NAME>\AppData\Roaming\Mozilla\Firefox\Profiles\ab9jg6na.dev-edition-default\places.sqlite" D:/browsertemp
# backup firefox data
bz c -p:<PASSWORD> -aoa -l:9 ./History_pwd:<TIP>.7z D:/temp/History
# compress
exit
```

若直接对 History 文件压缩会报错（我也不清楚为什么），因此使用 cp 命令复制到缓存文件夹压缩，曲线救国。

## 7z/7za

linux 上安装 p7zip 即可。

```sh
7za a -p<PASSWORD> -mx9 output input
```

## tar

压缩 cvaf 解压 xvaf ([ref](https://t.me/archlinuxcn_group/2966078))

```sh
tar -xaf my.tmp --one-top-level=my  # --one-top-level 指明解压到的文件夹名称
tar -caf xxx.tar.gz xxx             # 前面是输出，后面是输入
```

## unrar

rar 不是自由压缩格式，一般无法直接在 GNU 那批激进自由软件里解压。不过由于历史原因，用的人也非常多，特别是那些网盘仔。

在 linux 上安装 `unrar`，其用法与 tar 差不多。

```sh
unrar x xxx.rar   # extract to current folder
```
