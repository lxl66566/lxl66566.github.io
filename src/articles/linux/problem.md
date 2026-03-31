---
date: 2023-10-11
icon: regular fa-circle-xmark
category:
  - 经历
  - 问题
tag:
  - 桌面端
  - 工具
  - Linux
---

# 遇到的问题

## 如何减少问题

老生常谈：

1. `pacman -Syu` 若更新了内核，立刻重启

踩了很多坑，总结了点通用经验：

1. 干点什么之前，先备份（打快照）
2. 干点什么之前，先去 [Arch 落絮](https://luoxu.archlinuxcn.org/)搜一下关键词，看看别人有没有踩坑
   - nixos 也有 [Nix 落絮](https://luoxu.torus.icu/)

::: tip

以下是正文，按时间倒序。越后面（越早）时犯的错越傻逼…

:::

## NixOS bootloader

由于[一些原因](./nix.md#nixos-安装)，`nixos-enter` 后无法 rebuild。如果配置坏了那就只能 reinstall 了，但是如果只是 bootloader 坏了，还是有办法免安装救一下的，`nixos-enter` 后 `/nix/var/nix/profiles/system/bin/switch-to-configuration --install-bootloader` 即可。

## NixOS 调整风扇转速

未解决！

由于 [nix gaming](./nix.md#gaming) 的需求，需要调教性能。但是我的 nixos 的风扇就是转不起来，即使温度已经过 90 了。。。

nixos 原生支持 [fancontrol service](https://search.nixos.org/options?channel=unstable&show=hardware.fancontrol.enable)，但是需要一个配置文件。这个配置基本上都是用 pwmconfig 生成的，我跑这指令只能得到 `There are no pwm-capable sensor modules installed`。搜了一圈，找不到解。尝试了包括内核参数 `acpi_enforce_resources=lax`，加载 `coretemp` 内核模块，无效。

而其他调速软件例如 fan2go 也是基于 lm_sensors 的，显然无法使用。

如果不使用 fancontrol，各种三方软件缺乏维护，也需要手写配置，还没有文档。反正总线地址是绕不开的。还有许多三方是针对特定 PC 型号的，联想华硕都是机上机，可惜我这台七彩虹不在五型之中。

emm，最后还试了一下 wine 跑七彩虹的 game center，毫不意外地崩了。

有群友建议我使用 tuxedo-rs，试了一下也不行，`input=AddError("Bus response error: org.freedesktop.DBus.Error.InvalidArgs: No fan found at requested index")`。

## libvirt 虚拟机 Network not found

我使用 libvirt + qemu kvm + Virtual Machine Manager (VMM) 进行虚拟机管理。然而在我用 archinstall 安装 arch 后，发现没装 dhcpcd，所有镜像的域名都无法解析。因此我需要再次挂载安装盘，进去装 dhcpcd。

然后去实验室上课，带着电脑，到那边启动虚拟机发现报错：`error: Network not found: no network with matching name 'default'`。猜测是 active 的联网设备由网口变为 wifi 导致的。

使用 `virsh net-autostart default` 启动 default 配置，报错 `error: Network not found: no network with matching name 'default'`。啊？然后去自定义一个 default：`sudo virsh net-define /var/lib/libvirt/qemu/networks/default.xml`（nixos 的默认路径）。然后再次 `virsh net-autostart default`，还是报一样的错误。我猜测是用了 sudo 的问题，define 的配置并不在当前用户上。因此我将此 xml 拷到 /tmp，更改 owner 和权限，不使用 sudo 进行 `virsh net-define` 并 start，成功。

## EFI 空间不足

一些 Linux 新手（包括我）在第一次给 Linux 分区时都会将 EFI 分区分得过小。我分了 512M，之前在 Arch 最多也就同时用三个内核，而此次再加上了一堆 NixOS 的内核后终究是不堪重负，`no space left on device`。

于是我考虑为其扩容。在我的硬盘上，EFI 是第一个分区，而第二个刚好是 19GB 的 swap，这非常有利，我完全不需要考虑数据问题。使用 cfdisk，直接缩小 swap 分区会从后方缩小，因此需要删除 swap 分区，在扩大 EFI 分区后，再在原位置建立 swap 分区。

这还没完，EFI 分区扩大了，但是 filesystem 的大小是没变的（又被坑了一次，分完区还报错空间不足呢）。由于我的 Nixos 安装盘上并没有 fatresize（吐槽），并且系统进不去（说到底这个 bug 是我在解决另一个 bug 时出现的），所以只好使用笨办法，借用 swap 分区。

首先，上 cfdisk 把 swap 改成正常分区，然后 `mkfs.ext4`，挂载后把 EFI 的东西全部 cp 进去，再对 EFI 分区 `mkfs.vfat`。最后把数据移回去，swap 改回去就大功告成了。听着就麻烦。后来我自己做了 NixOS iso 并且把 fatresize 加进去了，不过估计是用不到了。（现在 EFI 有 2G）

改完千万别忘了调挂载里的 uuid。

## cfdisk 操作分区

cfdisk 是一个非常好用的 TUI 分区工具，但是对于初次使用的人（其实不是初次，但是忘了），cfdisk 也可能成为一个坑。

所有在 cfdisk 里的操作都是**模拟**。在完成操作后需要执行一次 `写入（Write）` 才会被真正应用。~~我说我怎么缩过的分区还会自己合起来的~~

## 你的复制是真正的复制？

在 windows 上将一个 2G 的镜像复制到 U 盘里要花上几分钟，而在 Archlinux 上是瞬间。而 U 盘的写入速度不可能超越瓶颈。很容易猜到后台有东西在对 U 盘进行写入。遂关机，发现 `A stop job is running for Disk Manager`，证毕。

## NixOS-WSL 网络

首先，装好 NixOS-WSL 后，无法 `sudo nix-channel --update`。查看环境变量发现没有设代理，于是[设了](https://nixos-cn.org/tutorials/installation/Networking.html#_3-使用代理工具加速访问-channels-跟-flake-inputs)，结果发现还是不行。然后想到 root 和 user 用的不是同一个 env，便进入 root 修改（需要用 `sudo -i` 进 root 而不是 `su`）。

在 root 下，`/run/systemd/system/nix-daemon.service.d/override.conf` 并不能在 env 中生效，因此我只好手动 `export https_proxy=http://localhost:10450` 代理环境变量，成功 update + rebuild。~~然后一个更新就 5.6G 了~~

## KDE6

KDE 在 20240306 左右释出了 KDE6，但是有一些需要手动处理的地方：

- 我直接升级后遇到了破坏主题的情况，使 sddm 登录回退到默认主题。解法：`pacman -S layer-shell-qt5 plasma-framework5`. ([ref](https://t.me/archlinuxcn_group/3093488))
- KDE6 带来了默认悬浮任务栏，但是刚开始的时候是有 bug 的，点击位置并没有悬浮，出现错位。后来虽然修了，但我也不想用悬浮了。解法：右击任务栏进入编辑模式，关闭悬浮。
- KDE6 将默认打开行为由单击改为了双击，但我是单击党。因此我改回单击：在 _系统设置 - 工作区 - 常规行为_ 里调。Dolphin 的设置里是没有的。

## 关机等待 90s

首先把 timeout 改到 10s。

```sh
sudo printf "DEFAULT_TIMEOUT_SEC=10\n" >> /etc/environment
# 不能 set -Ux DEFAULT_TIMEOUT_SEC 10，因为不读 fish 环境变量
sudo -e /etc/systemd/system.conf
# change this
DefaultTimeoutStartSec={{DEFAULT_TIMEOUT_SEC}}s
DefaultTimeoutStopSec={{DEFAULT_TIMEOUT_SEC}}s
DefaultDeviceTimeoutSec={{DEFAULT_TIMEOUT_SEC}}s
```

但是并没有什么卵用。

后面多经历了几次，发现某些 wine 程序会导致这个问题。因此在关机前执行 `wineserver -k9`。

然后发现内核参数有个 `nowatchdog`，将此参数删除可能可以解决此问题。但是在 wiki 的性能优化中有提到，在桌面或笔记本个人电脑上没有必要开启 watchdog，我认为还是不要损失性能的更好。

最后我的解法是 [sysrq 键 (13.)](./install_and_config.md#系统设置)，这是一组能直接与内核交互的键。当我关机时出现等待时，按下 `Alt + Sysrq + I` 即可对其他进程发出 `SYSKILL`，也就能够正常关机了。

## waydroid 的问题

### 启动失败

安装 waydroid 不久后，`waydroid show-full-ui` 启动失败，命令行显示 `waydroid  [gbinder] Service manager /dev/anbox-binder has appeared`，但是却没有打开图形界面。

重启后好了，再重启又炸了。

[某个 issue](https://github.com/waydroid/waydroid/issues/136#issuecomment-949694932) 讲设置内核启动参数，试了一下，无效。

此时想到要看 log，`waydroid log` 显示 `lxc-start: waydroid: ../src/lxc/conf.c: run_buffer: 322 Script exited with status 126`。

没辙，然后 `sudo waydroid init -f` 重装。然后就能用了。

后来又一次遇到了相同问题，这次拿了更多信息去搜，发现一个[看起来不相似的 issue](https://github.com/waydroid/waydroid/issues/294#issuecomment-1027392592) 居然能解决我的问题，非常惊讶。

## timeshift 删除快照

未解决！

我已经转 snapper 了，想删除所有 timeshift 的快照并卸载。然而有一个快照在删除中出现错误（真的太傻逼了）。于是我找到了[这个回答](https://bbs.archlinux.org/viewtopic.php?id=266965)，发现问题基本是一样的。于是只要手动删除子卷就行了。

但是，我找不到子卷的位置。

> \> sudo timeshift --list\
> Mounted '/dev/nvme1n1p3' at '/run/timeshift/36810/backup'

`/run/timeshift` 文件夹是空的。后来又找到了[其他人相同的遭遇](https://bbs.archlinux.org/viewtopic.php?id=287094)。That's STICKY！

## sddm 无法启动

这是我遇到的第二个恶性 bug[^2]（第一个是 [timeshift](#timeshift-引发的血案)）。

[^2]: 个人定义需要使用 archiso 进 arch-chroot 的都叫恶性。

[log](https://t.me/withabsolutex/1331)，具体来说是启动全绿，而后左上角光标卡住不闪烁。`Ctrl + Alt + F1` 后进入 tty，屏幕显示方才的内核全绿消息，光标闪烁，但仍然无法输入任何字符。

我尝试：

1. 首先短按关机，用 archiso 挂载后 `arch-chroot` 进去，看日志，看内核消息，无相关报错。
2. 重新 `mkinitcpio -p linux`，重启无效。
3. 想到最后一条内核消息是 SDDM，绞尽脑汁，我今天干了啥呢，哦，我用了个 `nvidia-xconfig` 生成了 NVIDIA 配置。
4. 重新 `arch-chroot`，去 `/etc/X11` 里根据修改日期删除生成的两个 `.conf` 文件，重启，问题解决。

哎，NVIDIA 害人不浅。。而且 archwiki 并未指出双显卡不能使用 `nvidia-xconfig`。

## ubuntu 提示重启

在公家服务器上 `apt update && apt install ...`，然后出现一个 tui 界面提示 _new kernel available_，让我选要重启的服务。。由于不知道重启之后会多出什么问题，我按两次 ESC 退出了。

## timeshift 引发的血案

> 前情提要见[网卡问题](#网卡问题)。

1. 使用 timeshift 回退到 20+days 前，重启，发现错误：_Failed to mount /boot_。`journalctl -xb` 查看，找到：_unknown filesystem type 'vfat'_。
2. 搜了一阵，`uname -a` 显示我内核是 6.5.5，而回退到的时间点正在用内核 6.5.3，猜测是内核版本冲突。
3. 去 archlinuxcn 群里问，果真，然后都在说是 timeshift 的锅。（本群又一个 timeshift 受害者）去 luoxu 找历史记录，出现回答“_timeshift 不兼容 genfstab，生成出來的子卷掛載帶 subvolid= 參數的情況_” ([ref](https://t.me/archlinuxcn_group/2927677))
4. 照着 13 天前另一个人的一模一样的问题走了一遍老路。具体的，进入 archiso 安装盘：

   ```sh
   # 挂载子卷 / 和 /boot（nvmexnxpx 填写实际驱动器号）
   mount -t btrfs -o subvol=/@,compress=zstd /dev/nvmexnxpx /mnt
   mount /dev/nvmexnxpx /mnt/boot
   # chroot
   arch-chroot /mnt
   # 重装内核与软件包
   pacman -Syu linux
   # 删掉 fstab 中的 subvolid...
   nvim /etc/fstab
   # 重启
   reboot
   ```

其实在折腾过程中还遇到各种脑残小问题，排查花了一些时间，这里按下不表。

> 你是遇到问题才想到恢复到快照吗，下次建议直接修遇到的问题，只要解决 1 个问题。回滚的话你现在要修原本遇到的问题和因为回滚遇到的问题，共 2 个问题（
> ::: right
> ——@Senaruk, [ref](https://t.me/archlinuxcn_group/2951737)
> :::

## 网卡问题

连接网线使用时总是约每 5min 炸一次（以太网无 Internet 响应，回退到使用 wlan0）。去 Realtek 下载网卡驱动，README 让执行一个自动脚本，`sudo bash xxx.sh` 把我原来网卡驱动卸(禁用?)掉以后就报错强退了。。。（写的什么屎山，真不负责啊）于是没有 eth0 用了。

搜索解法无果，想着用 timeshift 回退到爆炸前，但是快照打得不勤，只能回退到 20+days 前，于是就发生了[timeshift 引发的血案](#timeshift-引发的血案)——

## 安装 OSU

首先[教程在这](https://osu.ppy.sh/community/forums/topics/1248084?n=1)。

安装时显示没网，是我 daed 透明代理的锅，`curl google.com` 正常但是 ping 不动。把脚本那行 ping 验证注释掉就行了。后面安装可能会缺东西，照着提示装。

装完后没有 `osu-wine` 被添加到环境变量，不能直接执行；`osu-wine` 脚本在 `git clone` 那个目录，使用绝对路径即可。

这样用 wine 装好的 osu 游戏时只能跑到 170 帧（windows 上 1k+ fps），使用 `nvtop` 查看，果然跑在核显上，需要 `prime-run`。这个 `prime-run` 还不是随便加的，我在 krunner 里加了以后帧率没有变化，但是 `nvtop` 是有输出的。我一直以为有什么其他问题，直到我看到了[这个](https://github.com/NelloKudo/osu-winello/wiki/(Possibly)-optimize-your-game:-Gamemode#installing-gamemode)，我才发现加错了位置，需要加到 `~/.local/bin/osu-wine` 脚本里。（对，这是个脚本）

现在又出现了音频问题，pipewire 下无法正常播放，唉。

## 更新破坏依赖

四个字，**先删再装**。参考[forum](https://bbs.archlinuxcn.org/viewtopic.php?id=10208)，问题可能是有游离的软件包，也可能是上游改了依赖。

相信我，这个问题以后还会经常出现。

## nvim 剪贴板问题

我在 `option.lua` 中有设置 `vim.opt.clipboard = 'unnamedplus'`，之前运作挺好，但自从换了 X11 以后就不能再复制。

解法也很简单，安装 `xclip` 即可。

## yay 权限错误

使用 `yay` 安装 `wine-stable` 时出现了一些问题。

```text
-> 无法安装以下软件包，需要手动介入处理：
lib32-http-parser - exit status 4
lib32-libheif - exit status 8
lib32-libgphoto2 - exit status 8
lib32-libxpm - exit status 1
lib32-libgit2 - exit status 8
lib32-gd - exit status 8
wine-stable - exit status 8
lib32-libraqm - exit status 4
lib32-rav1e - exit status 8
# 详细报错：
make: ./test_g: 权限不够 make: *** [Makefile:76：test] 错误 127
==> 错误：在 check() 中发生一个错误。正在放弃...
```

其中大多数是权限错误。但是我用 paru 安装就可以成功安装。

结果发现是下载目录的 tmpfs 开了 `noexec` 导致的。而同时由于 paru 的 clonedir 是 [bind to tmpfs](./index.md#设置) 的，没有加 `noexec`，于是可以正常使用。。。（乐

## 输入法不显示

在[安装了 kubuntu](#重装-ubuntu) 后，设置页默认不显示输入法。在语言页面一看，简体中文是残缺的，警告需要 Install Missing Packages。但是我无法直接在 kde ui 里直接下载安装，点击了过一阵子又是残缺警告（包括 kde ui 也没法更新软件）。

解法是 `sudo apt install $(check-language-support)`。然后注销，再 login 就有输入法了。

## 日文输入法

需要安装日文输入法，去 archwiki 日语页面看，选择了 `mozc`。然后我就直接 `yay -S mozc` 了，，装是装了，然而没法使用。。

后来发现我使用 fcitx5 的话需要装 fcitx5 的 mozc utils（包名是`fcitx5-mozc-ut`）。然后就没啥问题了。

> ~~吐槽一下，mozc 源码有 600+MB，然而 bin 只有 30MB，编译还风扇起飞转了好久。只能说体会到了编译源码的不便。~~

## 重装 ubuntu

在别人的电脑上~~乱搞~~，装了 intel 核显驱动然后没有重启就 `sudo apt install vim`（是的，没有 vim）；然后 gnome 就已经开始出问题了，重启键消失了。这时候我还没有意识到，直接 `sudo reboot`，再次开机就内核加载失败了。。

然后尝试修复。能进 tty，但什么都没有，ifconfig 没有，`iwconfig` or `ls /sys/class/net` 只显示 `lo`，也就是说找不到网卡了。。那没网我能干啥，~~vi 进去修吗？~~

还好没啥重要数据。授权后重装了 kubuntu。然后发现 kde 爆杀 gnome（二嘲）。

有一说一，我不喜欢 ubuntu 这样臃肿的系统。~~[其他观点](https://t.me/archlinuxcn_group/2896194)，看上下文~~ 但是是帮别人装，还是别搞什么 archlinux（哪天滚挂了都不会修）和 nixos（小众，问题解法少）了。

> 出现此问题时我是纯正小白，能力不足.jpg

## 中文设置问题

在语言中设置了中文，重启后 kde 有部分 ui 变为英文。

原因：更改 `/etc/locale.gen` 后没有运行 `sudo locale-gen`。运行即可。

## yay 换源问题

刚开始一直以为 yay 就是类似 pacman 的 extra，所以想要给 yay 换源。根据简中内网的傻逼教程（没错，此时还没上代理），换了个已经废弃的清华源（换源指令：`yay --aururl "https://..." --save`），发现用不了后换成了中科大源，结果报错：

> -> 查找 AUR 软件包失败： ttf-ms-win11-auto-zh_cn:1 error occurred:<br/> \* response decoding failed: invalid character '<' looking for beginning of value

并且换回官方源仍然相同报错。换源过去然后发现换不回来，堪比刷小米 EU[^1].

[^1]: 参考[刷机](../mobile/root.md)

之后发现，在 `~/.config/yay/config.json` 中有一个 `aurrpcurl` 字段，会保留上一个换源的结果(?) 并且不会自动更换回去。于是我删除该条，重新执行 `yay --aururl "https://aur.archlinux.org" --save`，问题得解。如果一次不行就两次，一定能解(?)。

ps. 群友提出了 `yay --aurrpcurl 'https://aur.archlinux.org' --save`

## umount failed

`sudo umount /mnt/windows`，提示

> /mnt/windows: 目标忙

估计有莫名奇妙的软件在占用。直接 `lsof /mnt/windows` 查占用，然后再 `kill -9 <PID>` 强关。

## Windows 字体问题

根据[教程](https://arch.icekylin.online/guide/advanced/optional-cfg-1.html#安装-windows-字体)复制 windows 字体，<span class="heimu" title="你知道的太多了">打错大小写就先不说了，纠正以后</span>提示：

> cp: 对 './yuminl.ttf' 调用 stat 失败：没有那个文件或目录

后来使用 `yay -S ttf-ms-win11-auto-zh_cn` 安装字体也失败，中间报 warning 一大堆。

没辙，暂时用 U 盘拷吧。

## yay 安装问题

使用 `sudo pacman -S yay` 时一直报错，`signature is unknown trust` 类似的。怀疑是 pacman-keyring 问题，去前面 [更新 pacman-keyring](#更新-pacman-keyring) 试了好久，都不行。

后面看教程，发现需要先安装 cn 源中的签名：`sudo pacman -S archlinuxcn-keyring`，然后才能正常使用。。（因为 pacman 用的是 archlinuxcn 源）

## NetworkManager warning

设置自启服务 `systemctl enable --now NetworkManager` 时报错：

> ... iwlwifi ... WRT: invalid buffer destination

不过后面 `systemctl status NetworkManager` 发现服务已经启动了，也就没管了（所以问题还是没解决的，然而图形界面后开机自启看不到报错了）

ps. 实际上 linux 下不明所以的 warning, error 好多的（详见 `journalctl` or `dmesg`），都是**能用就别管**原则

## 挂载出错

非常低级的错误。。挂载时打错了指令，导致不同的分区被挂载到了同一个位置。不过检查得早，没有继续下一步就发现了问题。

然后重新挂载，后来到 _生成 fstab 文件_ 的时候又发现了怪事：`genfstab -U /mnt > /mnt/etc/fstab` 输出了一大堆东西，我读了一下，原来把我挂载时做的所有操作（包括错误部分）都记录进去了。于是手动删除了冗余，后续重启工作正常。

这个文件用于指示开机挂载。包括后来挂内存盘也是从这里改。

## 分区格式化

使用 `cfdisk` 分好区，需要分别为每个分区进行格式化。然而我使用 nvme 盘而看的 sata 指令，对硬盘格式化而非对分区进行格式化（错误示范：`mkfs.vfat /dev/nvme1n1`），报错：

> Partitions or virtual mapping on device, not making file system. (use -I to override)

然后尝试了 `-I`，结果分区全没了；对着 `nvme1n1` `mkswap`，分区又炸了（全盘格成了 swap）。最后才发现格式化是分区操作，而不是硬盘操作。。非常的萌新非常的弱智。

## 更新 pacman keyring

遇到问题：使用 pacman 安装时报错

> error: python-cairo: signature from "Caleb Maclennan <alerque@archlinux.org>" is unknown trust

1. 尝试执行 `pacman-key --refresh-keys`，但是效率感人
2. [据此所述](https://www.reddit.com/r/archlinux/comments/sorhb1/how_long_does_a_pacmankey_refreshkeys_take/)：

   ```sh
   sudo mv /etc/pacman.d/gnupg{,.bak}
   sudo pacman-key --init
   sudo pacman-key --populate archlinux
   ```

   然而没什么软用，还是报相同错误

3. 更新 `archlinux-keyring` 本身：`sudo pacman -Sy archlinux-keyring`，问题解决

:::: tip

裝 `archlinux-keyring` 其實就是在跑 `pacman-key --populate archlinux`

:::right
——farseerfc 😂, [src](https://t.me/archlinuxcn_group/2911740)
:::

::::

所以遇到 keyring 问题就先装 keyring 准没错（也适用于 `archlinuxcn-keyring`）。

## [libcuda.so.1 is not a symbolic link](https://bbs.archlinuxcn.org/viewtopic.php?id=13402)

Windows WSL 的锅，[解法](https://github.com/microsoft/WSL/issues/5548)，但还有问题残留。
