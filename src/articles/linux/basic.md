---
date: 2023-10-28
icon: build
category:
  - 教程
tag:
  - Linux
  - 桌面端
---

# 基础

1. 我建议仔细看看 [The Missing](https://missing-semester-cn.github.io/)的前几章，比较到位，**免去了自己折腾之苦**（本人亲身体会）。
2. [Linux ls -al 得到的结果代表什么意思？](https://zhuanlan.zhihu.com/p/495554731)
3. `[Y/n]` 可以直接回车表示确认。`Y` 大写表示默认。([ref](https://t.me/archlinuxcn_group/2950979))
4. awk 是一门语言([ref](https://luoxu.archlinuxcn.org/#g=1031857103&q=awk+语言))，~~但我从不用 awk~~。

## [Terminal shortcuts](https://linuxhandbook.com/linux-shortcuts/)

`<C-a>` 代表 `Ctrl + a`.

<!-- prettier-ignore -->
| 按键 | 执行 |
| :-: | :-: |
| `<C-a>` | 移动光标到最前 |
| `<C-w>` | 删除前一个单词 |
| `<C-u>` | 清空光标前输入 |

## POSIX 指令

> 不是系统性描述，更多是一些 tricks 和踩坑；可能不是最简，欢迎指正。

### sed

- sed 正则表达式的 `{}` 需要转义 `\{\}`，否则需要使用 `sed -r`（maybe `alias sed='sed -r'` ?）

### find

- 末尾的 `\;` 的作用是声明了 `-exec` 的结尾。
- 众所周知如果要删除当前目录中的所有文件，排除目录，可以直接 `rm *`。若我要反过来，只删除目录而排除文件呢？
  ```sh
  find . -maxdepth 1 -mindepth 1 -type d -exec rm -r {} \;
  # OR `find . -maxdepth 1 -mindepth 1 -type d -print0 | xargs -0 rm -r`
  ```
- 复制目录下所有文件，除了其中一个：
  ```sh
  find . -maxdepth 1 -mindepth 1 ! -name 'exclude.*' -type f -exec cp {} to_dir \;
  ```

通过这些例子，应该就能基本上手 `find` 了。

## 文件系统(fs)

ext4 是许多 linux 的默认 fs，有的 archlinux 教程也使用 ext4，我使用 btrfs，除此之外常用的文件系统还有 zfs, xfs, bcachefs 等。这里着重讲 btrfs。（其他的我都没用过啊

> [有前辈说](https://t.me/archlinuxcn_group/2949935)了一些 zfs 的优势。
> xfs 比较适合数据库使用，并发写性能好 ([ref](https://t.me/archlinuxcn_group/2963733))

### btrfs

对于一个用惯 windows ntfs 的人来说，btrfs <span class="heimu" title="你知道的太多了">as well as 现代文件系统</span>一定能让他眼前一亮。（文章参考 [external](#external) 1.）我最爱 CoW(写时复制)，透明压缩。

使用 btrfs 有一些坑需要注意：

1. 由于 CoW，使用 `du` 查看磁盘空间可能不准确，需要使用：`btrfs fi usage /`.
2. 由于 CoW + 快照，操作数据库的时候需要小心，尽可能不要将数据库加入快照备份区（可以使用其他子卷存放）。

#### 工具

[btrfs-heatmap](https://github.com/knorrie/btrfs-heatmap) 可以看 bg 的大小与碎片分布 ([src](https://blog.lilydjwg.me/2023/7/25/btrfs-metadata-full.216670.html))。

#### 互操作

互操作能极大提升多系统使用体验。<span class="heimu" title="你知道的太多了">ext4 从 windows 访问根本没啥好用工具</span>

众所周知 windows 默认使用它那 ntfs 已经很久了，并且默认没有 btrfs 支持。而双系统经常需要进行文件的互访问。linux 默认可读 ntfs，写入则只需安装 `ntfs-3g` 即可。而 windows 访问 btrfs 也非常简单。

1. [安装 Winbtrfs](https://github.com/maharmstone/btrfs)
2. 此时已经可以在资源管理器中访问了。
3. 默认挂载是读写的，我比较建议改为只读，降低出现问题的概率。[在这里](https://github.com/maharmstone/btrfs#mount-options)可以进行一些设置，重启生效。

事实上，_winbtrfs_ 与 _ntfs-3g_ 都不能保证一定不会出问题（有一些群友被坑过）。所以建议都只读不写。

## 服务

与 windows _service_ 的概念相通。有的 debian 系 distro 使用 `service` 指令，而 archlinux 使用 `systemctl` 进行服务管理。本节默认使用 `systemctl`。

查看服务的输出，请前往[日志](#日志)。

### 常用指令

`systemctl <operation> <service_name>`，无需打 `.service` 全名。

- `start` & `stop`，不多说
- `enable` & `disable`，设置是否开机自启
  - `enable --now` 为 `enable` + `start`
- `mask` （深度）禁用。

### WSL2

WSL2(ArchWSL) 由于不从 systemd 启动，导致无法使用 `systemctl` 管理服务。

解法是有一个 python 实现的 [docker-systemctl-replacement](https://github.com/gdraheim/docker-systemctl-replacement)，可以代替(?) `systemctl` 的功能。([ref](https://github.com/yuk7/ArchWSL/issues/20))

```sh
sudo curl https://raw.githubusercontent.com/gdraheim/docker-systemctl-replacement/master/files/docker/systemctl3.py -o /usr/bin/systemctl
sudo python /usr/bin/systemctl <command>
```

## 日志

`journalctl` 用于查看系统日志。

- `journalctl -u <service_name>` 查看服务日志

`dmesg` 用于查看内核消息。

## external

1. 了解一下 btrfs（注意时效）：[Linux Btrfs 文件系统使用指南](https://www.mivm.cn/linux-btrfs-usage-guide)
2. [Linux fontconfig 的字体匹配机制](https://catcat.cc/post/2020-10-31/)
3. [btrfs 元数据满了怎么办](https://blog.lilydjwg.me/2023/7/25/btrfs-metadata-full.216670.html)
4. A chapter of [PKGBUILD-cookbook](https://github.com/asukaminato0721/PKGBUILD-cookbook/blob/master/launch.md)
5. [ZFS ── 瑞士军刀般的文件系统](https://www.eaimty.com/2020/zfs-file-system/)
