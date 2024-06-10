---
date: 2023-07-29
icon: diagram-next
category:
  - 推荐
  - 教程
  - 评价
  - 经历
tag:
  - 横评
  - 工具
  - 桌面端
  - Windows
---

# RAM Disk 横评

RAM Disk 系列软件可以将内存映射为硬盘，养成将临时文件存放在 RAM 中的好习惯，保护固态盘的寿命。

## 使用指南

archlinux 下的 ramdisk 非常简单，只需

:::code-tabs
@tab 自动

```sh
# edit /etc/fstab, add the following line
# 此处不要添加 `noexec`，否则 AUR Helper 无法编译软件包
tmpfs /tmp tmpfs rw,size=10G,nodev,nosuid,noatime,mode=1777 0 0
```

@tab 临时

```sh
mkdir -p /mnt/tmp
sudo mount -t tmpfs -o size=10g tmpfs /mnt/tmp
sudo chmod -R 777 /mnt/tmp
```

:::

即可。

因此后文介绍的皆为 Windows 系统上的 ramdisk。

1. 在 Windows 电源计划中，关闭快速启动。（否则关机默认暂存 RAM Disk 内容到硬盘，违背了使用的初衷。）<span class="heimu" title="你知道的太多了">被坑了好几天</span>
2. 安装 RAM Disk 软件并挂载。
3. 将 Windows Temp 环境变量设为此 RAM Disk.（可手动，有的软件提供一键设置）
4. 如果使用 Edge 浏览器，将 CacheDir 设为 RAM DISK。[src](https://www.reddit.com/r/edge/comments/e8z1y3/comment/jfg8d3u/?utm_source=share&utm_medium=web2x&context=3)，保存为 `.reg` 文件后双击

   ```toml
   Windows Registry Editor Version 5.00
   [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge]
   "DiskCacheDir"="Z:\\EdgeCache"
   ```

::: tip

以下为横评正文，您也可以直接[阅读`总结`](#总结)。

:::

## ERAM

[Github ramdisk topic](https://github.com/topics/ramdisk) 的第一名。但是呢，直接卡在安装上了。。如何使用？文档在何方？README 早已过时，于是开源阵营 RAM Disk 阵亡。~~（樂~~

## AMD Radeon RAMDISK

免费版只能开 4G，太商业了，~~只有 4G 我能存下 yuzusoft 的压缩包吗？下一个。~~

## [Softperfect RAM Disk](https://www.majorgeeks.com/files/details/softperfect_ram_disk.html)

- 不得不说，**Softperfect 的 UI 是本横评中最好的一个**。
- 还有添加开机启动的小玩具。
- 可一键设置 `$Temp` 环境变量。
- 缺点：
  1. （也许不算缺点）会一直占用一个托盘图标。
  2. 有时关机会出现蓝屏。

## StarWind RAM Disk

- 官网下载需要注册，需要非中国号码。。
- 不能更换盘符与文件格式（默认 FAT32，最大支持 file size = 4GB，显然不够）。
- UI 很老，win11 下有 bug（标题栏被挤没）
- 无中文翻译。

## [ImDisk Toolkit](https://sourceforge.net/projects/imdisk-toolkit/)

- **本横评中唯一一个带有动态内存分配功能的软件！** 动态内存分配指的是往 RAM Disk 里放多少东西就吃多少内存，而不是一般的，开多少空间就吃多少内存。会慢一点，但胜在内存自由。
- 非常好，有关闭电源计划的提示。
- 可一键设置 `$Temp` 环境变量。
- RAM Disk 的文件会占用双倍的空间？？我不太清楚原理。文件 6.68 GB，占用空间差不多，但是设备和驱动器里显示磁盘占用了 13.38 GB 空间。
  - 但是 _ImDisk_ 能够**保留文件扩容**，非常舒服。
- 开机自启，默认隐藏托盘

## 魔方内存盘

创建 RAM Disk **必需要创建同样大小的镜像文件**，即使无需保存。逗我玩呢？

## 总结

使用 [ImDisk Toolkit](#imdisk-toolkit)。

## external

1. [RAM Disk comparison](https://www.ghacks.net/2017/04/03/the-best-free-ramdisk-programs-for-windows/)
