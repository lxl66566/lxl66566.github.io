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
  - 本人也参与了一些微小的错误修正和内容追加。
- 不过还是建议 [archwiki - installation guide](https://wiki.archlinuxcn.org/wiki/安装指南) 也一起看看，取长补短。

::: tip

[archwiki](https://wiki.archlinuxcn.org) 是最官方、最权威、最详细的指南，可以多看看，发生分歧时，以 wiki 为准。

:::

分两块盘的优点：不用担心 windows 更新崩了 grub 引导<span class="heimu" title="你知道的太多了">不过我已经关了自动更新</span>；出现失误不用担心丢另一块盘的数据<span class="heimu" title="你知道的太多了">安装时我确实失手格掉了全盘数据和分区</span>。

#### 分区

如果想使用多个内核，_boot 分区_ 分 512M 可能不够。不缺的话建议直接 1G。

swap 无所谓，不分都行，~~反正我有大 RAM~~。（即使我分了，我也[调低了 swappiness](#系统设置)。）

由于我用 btrfs，因此只要把其他空间全部给主分区就行了。

#### 添加 windows 引导

由于双系统，安装后我肯定是都使用 grub 作为引导（开 bios 挺麻烦的），但是我双系统分别在两块不同硬盘上，无法使用 _os-prober_ 自动共存。因此我使用如下方法进行自动检测并添加：

```sh
mkdir /mnt/windows
mount /dev/<windows efi> /mnt/windows
grub-mkconfig -o /boot/grub/grub.cfg
umount /mnt/windows
```

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

这里是 _[文章 - 设置电脑](../windows_setting.md)_ 的 linux 板块内容。设置项均为 archlinux，且排名不分先后。

### 系统设置

1. 基础 alias
   - `e`：default `$EDITOR`
   - `l`：[exa](./package.md#exa)
   - `gp`: `git pull`
   - `gfixup`: [git 奇技淫巧 # 自动化 squash](../../coding/Git.md#自动化-squash)
   - `docker`: `podman` [-> container](../../coding/container.md)
   - `makepkg`：[抄来的](./package.md#测试) bwrap。
     ```sh
     alias makepkg='bwrap --unshare-all --share-net --die-with-parent \
     --ro-bind /usr /usr --ro-bind /etc /etc --proc /proc --dev /dev \
     --symlink usr/bin /bin --symlink usr/bin /sbin --symlink usr/lib /lib --symlink usr/lib /lib64 \
     --bind $PWD /build/$PWD --ro-bind /var/lib/pacman /var/lib/pacman --ro-bind ~/.ccache ~/.ccache \
     --bind ~/.cache/ccache ~/.cache/ccache --chdir /build/$PWD /usr/bin/makepkg'
     ```
2. 设置 [zram swap](https://wiki.archlinux.org/title/Zram#Using_zram-generator)。
3. 设置 `/etc/fstab`
   - [挂载 tmpfs](../ramdisk.md)
     - Archlinux 实际上有 [tmpfs 挂载的默认值](https://wiki.archlinux.org/title/Tmpfs#Usage)，然而我还是手动搞了，可以调整容量。
   - 添加 `noatime` 标识，即不带访问时间 ([ref](https://t.me/archlinuxcn_group/2900548))
   - 删除 `subvolid`，详见 [timeshift 引发的血案](./problem.md#timeshift-引发的血案)
     - 可以用 `sudo sed -i -E 's/(subvolid=[0-9]+,)|(,subvolid=[0-9]+)//g' /etc/fstab` 命令行删除。
4. ~~[wayland 的 electron 支持](https://wiki.archlinuxcn.org/wiki/Wayland#Electron)（据说 wayland 对 electron 不太友好）~~
   - > 无所谓，现在是 X11 人
5. [激活启动时 numlock](https://wiki.archlinuxcn.org/wiki/启动时打开数字锁定键#SDDM)
6. 设置 pacman：
   - 将某些不常用包和自更新包加入 IgnorePkg，例如 _chromium_ & xmake | [ref](https://www.makeuseof.com/prevent-packages-from-getting-updated-arch-linux/)
   - 更改缓存至 ramdisk (`CacheDir`)
7. 更改 AUR Helper 缓存（参考[wiki](https://wiki.archlinuxcn.org/wiki/Makepkg#使用内存文件系统进行编译) 注意事项）：
   - yay 更改缓存至 tmpfs: `yay --builddir /tmp/yay --save`
   - _很遗憾，我仍未找到 paru 永久设置 clonedir 的方法。_ <span class="heimu" title="你知道的太多了">使用 alias 会带来另外的问题 </span> 但是！我们可以将 paru 的 `clonedir` 也 bind mount 同一个 tmpfs，这样就能够解决问题了。
     - 然而这里还会出现权限问题，无法 (?) 解决，因此我 [mount 到了另一个新的 tmpfs](https://github.com/lxl66566/dotfile/blob/3c97b7cbad449d4a70100e132b775365951cf250/etc/fstab#L15)。（不 bind 了）
   - [更改 makepkg 编译位置至 tmpfs](https://wiki.archlinux.org/title/makepkg#Building_from_files_in_memory)
8. 设置 grub
   ```sh
   sudo -e /etc/default/grub
   # after edit
   sudo grub-mkconfig -o /boot/grub/grub.cfg
   ```
   - 改等待时间
   - [多内核的设置](https://wiki.archlinuxcn.org/wiki/GRUB/技巧和窍门#多个启动条目)
9. 修改 faillock attempt times
   ```sh
   # sudo -e /etc/security/faillock.conf
   deny = 10
   ```
10. [安装 `xsettingsd`](https://wiki.archlinux.org/title/Xsettingsd) 并简单配置
11. sysctl 相关。
    - [Tcp Fast Open](https://wiki.archlinux.org/title/sysctl#Enable_TCP_Fast_Open)
    - [bbr](https://wiki.archlinux.org/title/sysctl#Enable_BBR)
12. system.conf
    - [调整 DefaultTimeoutStopSec](https://unix.stackexchange.com/a/297318)，使关机时不会被某些应用阻断长达 90s

### 输入法

我使用 fcitx5，输入要求为 _英语，双拼，日语_。可以在遇到的问题里找到一些输入法的设置。

1. 双拼关闭快速输入，默认为`；`。
2. 中文 _自定义词组_。
   - `w` -> `我`
   - `l` -> `了`
3. [添加自定义词库](https://wiki.archlinuxcn.org/wiki/Fcitx5#词库)

### 代理

目前我使用 [daed](../proxy/proxy_software.md#daed) 作为 linux 下的代理软件。

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

### 文件系统设置

如果按照上文推荐教程安装，那么默认只会创建两个 btrfs 子卷（`@`, `@home`）。但是 btrfs 的最佳实践其实是将易变化文件（日志，缓存，数据库，容器）全部放到单独子卷里（排出根子卷），以避免打快照时将其全部加入，增大空间消耗。

如果在某位置新建子卷，该位置存在的文件将被覆盖。那么在需要保存文件前提下，如何新建子卷呢？答案是手动处理。([src](https://dev.to/klo2k/convert-directory-into-btrfs-subvolume-p98))

::: tabs
@tab fish

可能要注意一下，路径不能带空格。

```sh
function make_new_subvolume
  set dir $argv
  sudo mv $dir{,.bak}
  sudo btrfs subvolume create $dir
  sudo cp --archive --one-file-system --reflink=always $dir{.bak/*,}
  sudo rm -r --one-file-system $dir'.bak'
end
# Usage
make_new_subvolume /var/log
```

@tab bash

参考 src。
:::

### kde 及其配套设施

我使用 kde 作为我的桌面（kde 爆杀 gnome!）。

我安装的 kde 系列软件详见[包管理与使用推荐](./package.md#kde-apps)。

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
13. [配置蓝牙](https://wiki.archlinuxcn.org/wiki/蓝牙)，安装 `bluedevil`
14. 关闭文件索引 ([ref](https://zhuanlan.zhihu.com/p/493375508))

## 快照

快照本质上就是一个 cp 而已，只不过在 btrfs 上吃了 CoW 的福利，空间占用很小罢了。

因为[被 timeshift 坑过](./problem.md#timeshift-引发的血案)，因此换用 snapper + btrfs-assistant。

> 当然还有 [btrbk](https://github.com/digint/btrbk) 可以选择，不过其主业 (backup tool) 并非快照，因此没有尝试。

快照一般不备份 `/boot`，因此若回滚了旧的内核，而 boot 仍启动新的内核，则无法正常启动。[wiki 里有解法](https://wiki.archlinux.org/title/System_backup#Snapshots_and_/boot_partition)，可以在更新内核时备份 `/boot` 以便回滚时能够手动替换 `/boot`。

### snapper

`btrfs-assistant` 为 snapper 提供了 GUI 界面，建议安装。

`snap-pac` 会在**每次 pacman 安装 & 删除时**打一次快照（_before and after pacman transactions_），这样可能会[比较占空间](https://luoxu.archlinuxcn.org/#g=1031857103&q=snap-pac)。我对快照没有那么高要求，因此我不用。

### timeshift

timeshift 要求子卷名字必须以 `@` 开头。

timeshift 的 cron 定时备份默认是残废的。

甚至连卸载 timeshift 都是一个[大坑](./problem.md#timeshift-删除快照)。

## 驱动

### 显卡驱动

安装初期只看了一点[第三方教程](https://arch.icekylin.online/guide/rookie/graphic-driver.html)。后面发现也要看 [wiki](https://wiki.archlinux.org/title/NVIDIA)。

GPU：NVIDIA RTX 3050 Laptop + Intel 核显，装驱动[抄教程](#archlinux)即可（但是不要抄后面的 _双显卡_）。检测驱动是否成功安装，可以执行 `nvidia-smi`。

以下设置可能并没有什么卵用，但是写在这里记录以下我的摸索过程。

1. **不要安装** `xf86-video-intel`，DRI 3 直接炸，DRI 2 在 election 下会花屏。
2. [DRM 内核级显示模式设置](https://wiki.archlinuxcn.org/wiki/NVIDIA#DRM_内核级显示模式设置)

#### 双显卡

关于双显卡，混合方案用 _prime_，不要用 _optimus-manager_（具体去落絮搜）。想要用 N 卡运行的软件需要 `prime-run`，实测是需要的。至于怎么测，打开 `nvtop` 然后开游戏，看占用。

目前我还没找到能够硬件加速 firefox 的方法。`prime-run` 测的结果是不行。

1. 设置[在不使用的时候完全关闭 GPU](https://wiki.archlinuxcn.org/wiki/PRIME#NVIDIA)。

### 音频驱动

默认是 `pulseaudio`，我尝试更换为 `pipewire`。

```sh
sudo pacman -S lib32-libpipewire libpipewire pipewire-alsa pipewire-pulse pipewire-audio pipewire-jack wireplumber
```

## 更换内核

linux 下内核基本无需手动编译，毕竟有 PKGBUILD 脚本。

例如我想更换 `linux-zen` 内核（该内核在官方仓库无需编译），需要：

```sh
sudo pacman -S linux-zen linux-zen-headers
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

即可。initramfs 会通过 pacman hook 自动生成，无需手动 `mkinitcpio -P`。

首次更换内核还请注意：

1. 参考[系统设置](#系统设置) `8.` 的 grub 设置。
2. 需要更换 NVIDIA 驱动至 dkms（如果有的话）：
   ```sh
   sudo pacman -S nvidia-dkms
   ```
