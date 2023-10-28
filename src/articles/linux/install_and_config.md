---
date: 2023-10-28
icon: linux
category:
  - 教程
tag:
  - Linux
  - 桌面端
---

# 安装与配置

## 安装

### Archlinux

20230819 收到购买的硬盘，正式安装 archlinux（双系统）。安装过程还挺坎坷的，在[问题区](./problem.md)可见一斑。

- [中文教程](https://arch.icekylin.online/)，讲的比较好，有不少针对中文用户的细节。
  - 本人也参与了一些错误修正和内容追加。
- 不过还是建议 [archwiki - installation guide](https://wiki.archlinuxcn.org/wiki/安装指南) 也一起看看，取长补短。

分两块盘的优点：不用担心 windows 更新崩了 grub 引导<span class="heimu" title="你知道的太多了">不过我已经关了自动更新</span>；出现失误不用担心丢另一块盘的数据<span class="heimu" title="你知道的太多了">安装时我确实失手格掉了全盘数据和分区</span>。

#### 添加 windows 引导

由于双系统，安装后我肯定是都使用 grub 作为引导（开 bios 挺麻烦的），但是我双系统分别在两块不同硬盘上，无法使用 _os-prober_ 自动共存。因此我使用如下方法进行自动检测并添加：

```sh
mkdir /mnt/windows
mount /dev/<windows efi> /mnt/windows
grub-mkconfig -o /boot/grub/grub.cfg
umount /mnt/windows
```

#### 驱动

安装初期只看了一点[第三方教程](https://arch.icekylin.online/guide/rookie/graphic-driver.html)。后面发现也要看 [wiki](https://wiki.archlinux.org/title/NVIDIA)。

GPU：NVIDIA RTX 3050 Laptop + Intel 核显，这里主要讨论 NVIDIA。

我安装的驱动是 `nvidia-open`。

1. `sudo nvidia-xconfig` 生成默认配置
2. 不删 _mkinitcpio_ 的 `kms` hook 也不会出问题，只要装了 _nvidia-utils_

### ArchWSL

- 更新 ArchWSL：从[此处](https://github.com/yuk7/wsldl/releases)下载 `wsldl.exe`，改名为 `arch.exe` 并替换。

### TermuxArch

20230920 下午安装 TermuxArch，也踩了不少坑。

1. termux 本身的 pkg 需要配置好镜像源（`termux-change-repo`）。
2. 安装时如果有报错要注意看，可能需要：
   - 手动在移动端环境创建目录
   - 手动安装一些包，例如 bsdtar
3. 安装完成后为 pacman 添加镜像需要选择 arm 的而不是默认的 x86_64。
   ```
   Server = http://mirrors.tuna.tsinghua.edu.cn/archlinuxarm/$arch/$repo
   Server = http://mirrors.ustc.edu.cn/archlinuxarm/$arch/$repo
   Server = http://mirrors.stuhome.net/archlinuxarm/$arch/$repo
   ```

## 配置

这里是 _[文章 - 设置电脑](../computer_setting.md)_ 的 linux 板块内容。设置项均为 archlinux，且排名不分先后。

### 系统设置

1. 基础 alias
   ```sh
   # fish
   alias e=nvim
   alias l='exa --all --long --color-scale --binary --header --time-style=long-iso'
   ```
2. [调整 swappiness](<https://wiki.archlinuxcn.org/wiki/Swap#交换值(Swappiness)>) 至 5（我对写入量敏感，同时我拥有大 RAM）
3. 设置 `/etc/fstab`
   - [挂载 tmpfs](../ramdisk.md)
     - Archlinux 实际上有 [tmpfs 挂载的默认值](https://wiki.archlinux.org/title/Tmpfs#Usage)，然而我还是手动搞了，可以调整容量。
   - 添加 `noatime` 标识，即不带访问时间([ref](https://t.me/archlinuxcn_group/2900548))
   - 删除 `subvolid`，详见 [timeshift 引发的血案](./problem.md#timeshift-引发的血案)
4. [wayland 的 electron 支持](https://wiki.archlinuxcn.org/wiki/Wayland#Electron)（据说 wayland 对 electron 不太友好）
5. [激活启动时 numlock](https://wiki.archlinuxcn.org/wiki/启动时打开数字锁定键#SDDM)
6. 设置 pacman：
   - 将某些不常用包和自更新包加入 IgnorePkg，例如 _chromium_ & xmake | [ref](https://www.makeuseof.com/prevent-packages-from-getting-updated-arch-linux/)
   - 更改缓存至 ramdisk （`CacheDir`）
7. 更改 AUR Helper 缓存（ 参考[wiki](https://wiki.archlinuxcn.org/wiki/Makepkg#使用内存文件系统进行编译) 注意事项）：
   - yay 更改缓存至 tmpfs: `yay --builddir /tmp/yay --save`
   - _很遗憾，我仍未找到 paru 永久设置 clonedir 的方法。_ <span class="heimu" title="你知道的太多了">使用 alias 会带来另外的问题 </span> 但是！我们可以将 paru 的 `clonedir` 也 [bind mount 同一个 tmpfs](https://github.com/lxl66566/config/blob/archlinux/etc/fstab)，这样就能够解决问题了。
     - 然而这里还会出现权限问题。
   - 未测试：是否能够使用 `$PKGDEST` env 改变编译位置？([source](https://wiki.archlinuxcn.org/wiki/Makepkg#包输出))
8. [添加自定义词库](https://wiki.archlinuxcn.org/wiki/Fcitx5#词库)（待续）
9. grub 改等待时间
   ```sh
   sudo nvim /etc/default/grub
   # after edit
   sudo grub-mkconfig -o /boot/grub/grub.cfg
   ```
10. 修改 faillock attempt times
    ```sh
    # sudo edit /etc/security/faillock.conf
    deny = 10
    ```

### 输入法

我使用 fcitx5，输入要求为 _英语，双拼，日语_。可以在遇到的问题里找到一些输入法的设置。

1. 双拼关闭快速输入，默认为`；`。
2. 双拼的 `w` 默认总给的是 `为` 而不是 `我`。因此可以 _自定义词组_。

### 代理

#### [daed](https://github.com/daeuniverse/daed)

> 根据 dae 的官方测试，（与 v2raya 相比）确实是基于 eBPF 的 dae 速度更快，但不是快特别多
> ::: right
> ——Au, [src](https://t.me/archlinuxcn_group/2912643)
> :::

网页面板的开源代理，dae 的前端。由于比较新，目前使用的人不多。

```sh
sudo pacman -S daed
sudo systemctl enable --now daed
```

这样就开机自启，并可以 `localhost:2023` 进面板了。然后写节点，拖到 proxy 里就行。

daed 默认使用透明代理，没有 socks/http 的端口。如果有设置 `ALL_PROXY` 等系统代理变量记得取消；firefox 需要在代理设置中设为 _自动探测网络环境_。

需要写规则可以参考[这里](https://github.com/daeuniverse/dae/discussions/245#discussioncomment-6575522)。

#### v2raya

v2raya 的质量其实一般（感觉 v2ray 内核速度比我的 windows V2rayN 用的 [Xray 内核](https://xtls.github.io/)差）。但是目前还不想直接写内核配置文件（等契机），qv2ray 又停止维护，所以没得选。（后面逃到 daed 了）

```sh
sudo pacman -S v2raya
v2raya --lite
# fishshell
set -Ux ALL_PROXY "http://127.0.0.1:20172"  # 必须加 -x, 否则系统代理无效
```

之后的操作都在网页上进行。使用系统代理端口为 `http://127.0.0.1:20172`，这个端口带自动分流。

如果需要后台运行，开机自启，可以参考[文档](https://v2raya.org/docs/advanced-application/noroot/)：`systemctl --user enable --now v2raya-lite.service`

#### clash-verge

见[vpn](../vpn.md#clash-verge)介绍页。内核为 clash-meta，接受订阅文件，不接受节点。有订阅的可以尝试。

#### 使用 windows 代理

:::: details archwsl 内容，点击展开
我在 archwsl 中懒得重复下载，直接使用 windows 代理。[ref](https://zhuanlan.zhihu.com/p/153124468)

后来直接写了 [fish 脚本](https://github.com/lxl66566/config/blob/archwsl/.config/fish/functions/proxy_con.fish)，自用方便。
::: code-tabs
@tab bash

```sh
your_port=****
host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
export ALL_PROXY="http://$host_ip:$your_port"
```

@tab fish

```sh
set host_ip $(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
set -gx ALL_PROXY="http://$host_ip:<your_port>"  # fill your port
```

:::
::::

代理软件需要开启局域网连接。测试时不要使用 `ping` 指令（其不走代理），用 `curl`。

### kde 及其配套设施

我使用 kde 作为我的桌面（kde 爆杀 gnome!）。

1. enable flameshot：flameshot 默认无法使用 print 快捷键截图。需要在*系统设置 - 添加快捷键 - 火焰截图*，然后手动设置快捷键。
2. _输入设备_，将键盘的按键延迟改短。
3. _外观_，黑色主题
4. _开关机 - 桌面会话_，选择启动为空会话
5. _快捷键_，添加应用程序 _konsole_，设置唤醒快捷键
6. 关闭通知声音
7. 输入法，语言设置，缩放率等基础的就不要我讲了。kde(wayland?) 对分数缩放做的不算太差，只是有的图标有点糊而已。
8. 自定义状态栏。我真的爱死状态栏显示内存，磁盘 IO，CPU 占用的小组件了！<span class="heimu" title="你知道的太多了">CPU 占用其实不需要看，~~因为可以通过风扇声判断~~</span> 还有时间格式，无用图标的自定义。
9. _工作区行为 - 锁屏_，改锁屏时间。
10. [设置 numlock 行为](https://wiki.archlinuxcn.org/wiki/启动时打开数字锁定键#KDE_Plasma_用户)
11. _窗口管理 - 窗口行为_ 设置 _焦点跟随鼠标_
12. 配置窗口管理器，在窗口装饰中选择主题，调出 `置顶` 按钮。

### 快照

快照本质上就是一个 cp 而已，只不过在 btrfs 上吃了 CoW 的福利，空间占用很小罢了。

因为[被 timeshift 坑过](./problem.md#timeshift-引发的血案)，因此换用 snapper + btrfs-assistant。

> 当然还有 [btrbk](https://github.com/digint/btrbk) 可以选择，不过其主业 (backup tool) 并非快照，因此没有尝试。

快照一般不备份 `/boot`，因此若回滚了旧的内核，而 boot 仍启动新的内核，则无法正常启动。[wiki 里有解法](https://wiki.archlinux.org/title/System_backup#Snapshots_and_/boot_partition)，可以在更新内核时备份 `/boot` 以便回滚时能够手动替换 `/boot`。

#### snapper

`btrfs-assistant` 为 snapper 提供了 GUI 界面，建议安装。

`snap-pac` 会在**每次 pacman 安装 & 删除时**打一次快照（_before and after pacman transactions_），这样可能会[比较占空间](https://luoxu.archlinuxcn.org/#g=1031857103&q=snap-pac)。我对快照没有那么高要求，因此我不用。

#### timeshift

timeshift 要求子卷名字必须以 `@` 开头。

timeshift 的 cron 定时备份默认是残废的。
