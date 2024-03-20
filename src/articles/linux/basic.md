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
4. awk 是一门（图灵完备的）语言([ref](https://luoxu.archlinuxcn.org/#g=1031857103&q=awk+语言))，~~但我从不用 awk~~。
5. linux 可执行文件没有后缀；可以用 `detect-it-easy-bin` <Badge text="AUR" /> 查看任意文件的类型。

## Terminal shortcuts

`<C-a>` 代表 `Ctrl + a`.

<!-- prettier-ignore -->
| 按键 | 执行 |
| :-: | :-: |
| `<C-a>` | 移动光标到最前 |
| `<C-LEFT>` & `<C-LEFT>` | 移动光标到上 / 下一个单词 |
| `<C-w>` | 删除前一个单词 |
| `<C-u>` | 清空光标前输入 |

您还可以查看[本文](https://effective-shell.com/part-2-core-skills/fly-on-the-command-line)获取更多实用 shortcuts。

## POSIX 指令

> 不是系统性描述，更多是一些 tricks 和踩坑；可能不是最简，欢迎指正。

### sed

- sed 正则表达式的 `{}` 需要转义 `\{\}`，否则需要使用 `sed -r`（maybe `alias sed='sed -r'` ?）
- 冷知识：sed（和 awk）都是图灵完备的语言。

### grep

- grep 不支持贪婪匹配 `.*?`，需要的话要 `grep -P` (`--perl-regexp`)

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

### xargs

将管道前的值传入后面的语句的**最后方**。

### sudo

- `sudo nvim` 相当于切换到 root 用户空间，无法使用用户 nvim 配置。然而 `sudo -e` 编辑文件，相当于在用户空间编辑完后覆盖回去，是可以用用户配置的。

## 文件系统(fs)

> 事实上文件系统的内容非常之大，这里主要还是偏向磁盘文件系统的应用方向的。

ext4 是许多 linux 的默认 fs，有的 archlinux 教程也使用 ext4，我使用 btrfs，除此之外常用的文件系统还有 zfs, xfs, bcachefs 等。这里着重讲 btrfs。（其他的我都没用过啊

> [有前辈说](https://t.me/archlinuxcn_group/2949935)了一些 zfs 的优势。
> xfs 比较适合数据库使用，并发写性能好 ([ref](https://t.me/archlinuxcn_group/2963733))

### btrfs

对于一个用惯 windows ntfs 的人来说，btrfs <span class="heimu" title="你知道的太多了">as well as 现代文件系统</span>一定能让他眼前一亮。（文章参考 [external](#external) 1.）

1. CoW(写时复制)
2. 透明压缩
3. 快照
4. 只有 btrfs 能 online shrink ([ref](https://t.me/archlinuxcn_group/2996595))

目前 btrfs 比起其他现代文件系统，缺的只是 raid5/6 支持和加密；但是其使用难度比很多其他 fs 低多了。

使用 btrfs 有一些坑需要注意：

1. 由于 CoW，使用 `du` 查看磁盘空间可能不准确，需要使用：`btrfs fi usage /`.
2. 由于 CoW + 快照，操作数据库的时候需要小心，尽可能不要将数据库加入快照备份区（可以使用其他子卷存放）。

#### 常用指令

- `btrfs fi us /`：查看已用大小
- `sudo btrfs scrub start /` && `btrfs scrub status /`：检查 checksum

#### 工具

[btrfs-heatmap](https://github.com/knorrie/btrfs-heatmap) 可以看 bg 的大小与碎片分布 ([src](https://blog.lilydjwg.me/2023/7/25/btrfs-metadata-full.216670.html))。

#### 互操作

互操作能极大提升多系统使用体验。<span class="heimu" title="你知道的太多了">ext4 从 windows 访问根本没啥好用工具</span>

众所周知 windows 默认使用它那 ntfs 已经很久了，并且默认没有 btrfs 支持。而双系统经常需要进行文件的互访问。linux 默认可读 ntfs，写入则只需安装 `ntfs-3g` 即可。而 windows 访问 btrfs 也非常简单。

1. [安装 Winbtrfs](https://github.com/maharmstone/btrfs)
2. 此时已经可以在资源管理器中访问了。
3. 默认挂载是读写的，我比较建议改为只读，降低出现问题的概率。[在这里](https://github.com/maharmstone/btrfs#mount-options)可以进行一些设置，重启生效。

事实上，_winbtrfs_ 与 _ntfs-3g_ 都不能保证一定不会出问题（有一些群友被坑过）。所以建议都只读不写。

还有，windows 蓝屏可能会炸硬盘，导致 windows 能读，linux 挂不上。ntfs 炸了就无脑用 chkdsk 修就行。

### 链接

分为硬链接和软链接。硬链接文件共享相同的 inode 值，指向同一份文件，因此是同步更新。软链接就是快捷方式。

> 软链接和快捷方式本质是相同的，但还有一些细微的差别，比如 lnk 还会存 description, icon...

git 内添加链接指向的文件需要手动 `git add -f`。

## 混成器

混成器是向实际屏幕绘制的抽象层，提供了接口供 UI 软件调用。更多混成器相关知识可以看 farseerfc 的两篇博文([1](https://farseerfc.me/zhs/brief-history-of-compositors-in-desktop-os.html) [2](https://farseerfc.me/zhs/compositor-in-X-and-compositext.html))。

目前广泛使用的 linux 混成器有 X11 和 Wayland，其中 X11 已宣布停止维护。

### 为什么我不使用 Wayland？

现在谈到混成器，Wayland 几乎成为了“政治正确”的代言，许多发行版也将默认混成器换为 Wayland（例如 Fedora）。但是我一直都是坚定的 X11 人。

- 最让我无法接受的是 Wayland 协议下无法获取当前窗口标题，这直接导致了 [activitywatch 无法使用](https://github.com/ActivityWatch/activitywatch/issues/92)。
- 某些软件的 Wayland 协议适配差，例如 _腾讯会议_（摄像头无法使用）。
  - 远程桌面基本上用不了。([ref](https://luoxu.archlinuxcn.org/#g=1031857103&q=wayland+远程桌面))

## 服务

与 windows _service_ 的概念相通。有的 debian 系 distro 使用 `service` 指令，而 archlinux 使用 `systemctl` 进行服务管理。[archwiki](https://wiki.archlinux.org/title/systemd)。现在 `systemctl` 才是主流。

查看服务的输出，一般在 status 里会有几条，也可以前往[日志](#日志)查看。

### 基本概念

每个服务（unit）是一个 `.service` 文件，存放在不同位置，其中由软件安装的服务在 `/usr/lib/systemd/system/` 下。

- systemd 是现在主流 linux 管理 service 的方式。
- `xxx@.service` 是一个 template unit，不能直接启动，而是需要传入一个 string，作为 `xxx@something.service` 启动。string 的含义需要自己看 service 内容。

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

- `journalctl` 用于查看系统日志。
  - `journalctl -u <service_name>` 查看服务日志
- `dmesg` 用于查看内核消息。

## .desktop

许多软件安装后可以在 krunner 中直接运行，实际上就是读取了 _.desktop file_。

软件的 _.desktop file_ 一般保存在 `~/.local/share/applications`。

_.desktop file_ 理解为启动脚本。只要随便打开看一个就懂了。

```toml
[Desktop Entry]
Name=evince
Comment=evince pdf reader
Type=Application
Exec=evince -o
Terminal=false
```

这里提供一个较小的 `.desktop` file 示例，若软件不自带，可以考虑自己写个。

## 文件传输

rsync 用于主机之间的文件传输，带有断点恢复等功能，吊打 scp 等。

我比较推荐 `rsync -aviuzP ...`。具体什么意思，这里不赘述（RTFM）。

## external

1. 了解一下 btrfs（注意时效）：[Linux Btrfs 文件系统使用指南](https://www.mivm.cn/linux-btrfs-usage-guide)
2. [Linux fontconfig 的字体匹配机制](https://catcat.cc/post/2020-10-31/)
3. [btrfs 元数据满了怎么办](https://blog.lilydjwg.me/2023/7/25/btrfs-metadata-full.216670.html)
4. A chapter of [PKGBUILD-cookbook](https://github.com/asukaminato0721/PKGBUILD-cookbook/blob/master/launch.md)
5. [ZFS ── 瑞士军刀般的文件系统](https://www.eaimty.com/2020/zfs-file-system/)
6. [使用 btrfs 提升 HDF5 透明压缩百倍性能](https://www.ducksoft.site/深度学习/fuck-hdf5-compression-using-btrfs.html)