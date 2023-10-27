---
date: 2023-04-17
icon: linux
category:
  - 编程
  - 教程
tag:
  - 工具
  - Linux
  - 桌面端
---

# linux

我最早使用 linux 用的是 [ArchWSL](https://github.com/yuk7/ArchWSL) on WSL2，最初是学习用，基本上没啥存在感。

之后正式使用 archlinux，双系统，windows 只拿来打游戏（galgame & osu stable 地狱兼容）。也在 linux 上试着跑了点模拟器。

在 Android 平板上 使用 termux，也装了 arch（[TermuxArch](https://github.com/TermuxArch/TermuxArch)），之前主要用作 ssh 连接 VPS。VPS 有关问题请移步 [VPS](../vps.md)。

- 更新 ArchWSL：从[此处](https://github.com/yuk7/wsldl/releases)下载 `wsldl.exe`，改名为 `arch.exe` 并替换。

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

## 基础

1. 我建议仔细看看 [The Missing](https://missing-semester-cn.github.io/)的前几章，比较到位，**免去了自己折腾之苦**。
2. [Linux ls -al 得到的结果代表什么意思？](https://zhuanlan.zhihu.com/p/495554731)
3. `[Y/n]` 可以直接回车表示确认。`Y` 大写表示默认。([ref](https://t.me/archlinuxcn_group/2950979))
4. awk 是一门语言（[ref](https://luoxu.archlinuxcn.org/#g=1031857103&q=awk+语言)），~~但我从不用 awk~~。

### [Terminal shortcuts](https://linuxhandbook.com/linux-shortcuts/)

`<C-a>` 代表 `Ctrl + a`.

|  按键   |      执行      |
| :-----: | :------------: |
| `<C-a>` | 移动光标到最前 |
| `<C-w>` | 删除前一个单词 |
| `<C-u>` |  清空当前输入  |

### POSIX 指令

> 不是系统性描述，更多是一些 tricks 和踩坑. 可能不是最简，欢迎指正。

#### sed

- sed 正则表达式的 `{}` 需要转义 `\{\}`，否则需要使用 `sed -r`（maybe `alias sed='sed -r'` ?）

#### find

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

<!-- ## 外部包

- 我安装的包（少部分）：
  - archwsl: cmake, yay, fishshell, neovim, neofetch, fd, openssh, plocate, trash-cli, tmux, tldr, jq, netcat, lsof, iotop, zsh, sysstat
  - archlinux: 与 archwsl 相同，htop, exfat-utils, [zoxide](https://github.com/ajeetdsouza/zoxide), ncdu, namcap, activitywatch-bin, ripgrep, starship, nnn, fex, ntfs-3g
  - > rg 是增强版的 grep，fex 是增强版的 cut ——依云
- 我计划装的包：Joshuto, gparted, txcv -->

## 文件系统(fs)

ext4 是许多旧 linux 的默认 fs，有的 archlinux 教程也使用 ext4，我使用 btrfs，除此之外常用的文件系统还有 zfs, xfs, bcachefs 等。这里着重讲 btrfs。（其他的我都没用过啊，而且没进内核主线

> [有前辈说](https://t.me/archlinuxcn_group/2949935)了一些 zfs 的优势。
> xfs 比较适合数据库使用，并发写性能好 ([ref](https://t.me/archlinuxcn_group/2963733))

### btrfs

btrfs <span class="heimu" title="你知道的太多了">其实现代文件系统都</span>有好多功能吸引着我，~~当我第一次看到介绍 btrfs 的文章时，我不禁大呼：“这才是现代文件系统！windows ntfs 是什么垃圾！” ~~ 文章参考 [external](#external) 1. 我最爱 CoW(写时复制)，透明压缩，还有好用的 winbtrfs 极大提升多系统使用体验。<span class="heimu" title="你知道的太多了">ext4 从 windows 访问根本没啥好用工具</span>

使用 btrfs 有一些坑需要注意：

1. 由于 CoW，使用 `du` 查看磁盘空间可能不准确，需要使用：`btrfs fi usage /`.
2. 由于 CoW + 快照，操作数据库的时候需要小心，尽可能不要将数据库加入快照备份区（可以使用其他子卷存放）。

#### 互操作

众所周知 windows 默认使用它那 ntfs 已经很久了，并且默认没有 btrfs 支持。而双系统经常需要进行文件的互访问。linux 默认可读 ntfs，写入则只需安装 `ntfs-3g` 即可。而 windows 访问 btrfs 也非常简单。

1. [安装 Winbtrfs](https://github.com/maharmstone/btrfs)
2. 此时已经可以在资源管理器中访问了。
3. 默认挂载是读写的，我比较建议改为只读，降低出现问题的概率。[在这里](https://github.com/maharmstone/btrfs#mount-options)可以进行一些设置，重启生效。

事实上，_winbtrfs_ 与 _ntfs-3g_ 都不能保证一定不会出问题（有一些群友被坑过）。所以建议都只读不写。

## 设置

这里是 _[文章 - 设置电脑](../computer_setting.md)_ 的 linux 板块内容。设置项均为 archlinux，且排名不分先后。

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

### 设置代理

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

需要写规则可以参考[这里](https://github.com/daeuniverse/dae/discussions/245)。

#### v2raya

v2raya 的质量其实一般（感觉 v2ray 内核速度比我的 windows V2rayN 用的 [Xray 内核](https://xtls.github.io/)差）。但是目前还不想直接写内核配置文件（等契机），qv2ray 又停止维护，所以没得选。

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

archwsl 内容
:::: details 点击展开
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

## shell

最好装完系统就先装 shell。

- 若使用 `chsh` 切换了其他的 shell，则 `.bashrc` & `.bash_profile` 将失效。
- bash 可以不用，但是需要会写。。毕竟 default shell 的兼容性不是盖的。
- [Y/N 选择器](https://stackoverflow.com/questions/226703/how-do-i-prompt-for-yes-no-cancel-input-in-a-linux-shell-script/27875395#27875395)，以下是两个例子：
  ::: code-tabs
  @tab bash
  ```sh
  read -n 1 -p "Are you sure to clean git and push force? (y/N) " answer
  case ${answer:0:1} in
      y|Y )
          echo "Y"
      ;;
      * )
          echo "do nothing"
      ;;
  esac
  ```
  @tab fish
  ```sh
  # fish 的语法有些许差别。。例如 `-P` 大写
  read -n 1 -P 'Use tldr instead of man? (Y/n) ' answer
  switch $answer
      case n N
          /usr/sbin/man "$argv"
      case '*'
          tldr "$argv"
  end
  ```
  :::

### fishshell

fishshell 语法自成一系，学习成本较高，但是补全太好用了，爆杀 zsh，所以我使用 fish。

- set fish as default
  ::: code-tabs
  @tab 侵入式

  ```bash
  # 侵入式就是直接设置默认 shell，包括启动时(?)
  chsh -s fish
  ```

  @tab 温和式

  ```sh
  # 温和式是先启动 bash，再将 shell 作为 bash 子进程启动
  # edit ~/.bashrc
  if [[ $(ps --no-header --pid=$PPID --format=cmd) != "fish" ]]
  then
      exec fish
  fi
  ```

  :::

  > 不建议通过 chsh 更换 shell,你可以使用 Konsole(如果是 KDE)的 profile 改 shell——[@MkfsSion](https://t.me/archlinuxcn_group/2755963)

- 语法：有个叫 [bass](https://github.com/edc/bass) 的可以在 fish 里用 bash 语法。不过我觉得不如快速查下鱼文档。
- 环境变量：[`set`](https://fishshell.com/docs/2.6/commands.html#set)，注意作用域与是否 export 的问题。
- 函数
  - 使用 function 新增函数后，可以使用 `funcsave <function>` 保存到配置文件夹下以便修改与备份，修改后需要重新 source：`. ~/.config/fish/config.fish`
  - 当然，官方推荐的修改是使用 `funced <function>`。
    - `funced` 默认是 interactive 编辑的。我建议设置 `$EDITOR` 环境变量，可以在喜欢的编辑器里修改。
  - 删除函数 / 变量：`-e` == `--erase`
  - fish 皆为函数，alias 也是函数
- 美化：我使用 starship，零配置。如果需要更多自定义可以使用 [tide](https://github.com/IlanCosman/tide)。

### [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)

> 在尝试三大 shell 后我选择 fish 而不是 zsh. [why?](https://t.me/withabsolutex/1214)<br/>
> 据说 omz 会有性能问题。[ref](https://luoxu.archlinuxcn.org/#g=1031857103&q=omz&sender=313927976)

<details><summary>archived</summary><p>

ref: [Linux Zsh 使用 oh-my-zsh 打造高效便捷的 shell 环境](https://sysin.org/blog/linux-zsh/)

- 安装 zsh 时会问 set default shell, `y` 即可
- [我的配置&插件](https://github.com/lxl66566/config/blob/archwsl/.zshrc)
</p></details>

## pacman & AUR Helper

AUR 是用户仓库，由用户自行维护。AUR 只管理 PKGBUILD，相当于一个**小型安装脚本**而非程序本体。这里有一篇[说明文章](https://blog.asukaminato.eu.org/AUR-vs-vs-cn-dd42c7a8f0f943dcabd23d4cdf03a914)。

而由于 PKGBUILD 经常会从 github 等地方拉取软件压缩包，所以请[使用代理](#设置代理)。

AUR 可能携带恶意软件，请自行甄别，谨慎下载偏门小软件。

- “滚” 指 `sudo pacman -Syu`，更新所有包。不要隔太久不滚，挂的概率会增加。（~~今日也无事可做~~）
  - 也可以直接 `yay` 或 `paru` 进行更新。（这俩不带参数默认执行 `-Syu`）
  - 如果更新了内核（`linux` 包），请立即重启。
- 出现 `The requested URL returned error: 404`，可能是本地缓存没有更新，请 `sudo pacman -Syy`
- 每次修改镜像之后都应该使用 `sudo pacman -Syyu` 强制更新缓存 ([ref](https://wiki.archlinuxcn.org/wiki/镜像源#强制_pacman_刷新软件包列表))。
- pacman 常用指令：`-S`, `-Ss`, `-Rs`
- yay 是一个广泛使用的 AUR Helper，使用 go 语言编写。
  - 如果一个包同时在 archlinux 仓库和 AUR 仓库，则 yay 优先使用 pacman ([ref](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/63))
  - yay 的问题也太多了点。。可以试试 paru。
- 另一个广泛使用的 AUR Helper 是 _paru_，使用 rust 编写。
  - 与 yay 不同的是安装时默认展示 PKGBUILD 以供审阅。
- pacman 更换镜像
  ::: code-tabs
  @tab ArchWSL
  ```bash:no-line-numbers
  nvim /etc/pacman.d/mirrorlist
  ```
  @tab termux
  ```bash:no-line-numbers
  termux-change-repo  # 虽然不是 pacman （
  ```
  :::
- 疑难解答：
  - yay：疑难解答：[yay 安装问题](./problem.md#yay-安装问题) | [yay 换源问题](./problem.md#yay-换源问题) | [yay 权限错误](./problem.md#yay-权限错误)

## 打包

AUR 的包都是志愿维护，为开源社区做贡献是一件好事。

首先看看 arch wiki，很有用。[打包准则](https://wiki.archlinuxcn.org/zh/Arch_打包准则) | [创建软件包](https://wiki.archlinuxcn.org/wiki/创建软件包)

我在先辈推动下，先接过了一个 `autocorrect-bin` 练手。

1. 首先，创建一个 AUR 账号，并[认证](https://wiki.archlinuxcn.org/wiki/AUR_提交准则#认证)
2. 认领包，clone 到本地
3. 改 PKGBUILD
4. 更新 `.SRCINFO`: `makepkg --printsrcinfo > .SRCINFO`
5. push。注意不要使用那些阻断 ssh 的代理。

可以 `paru -Gp <package>` 看看别人写的 PKGBUILD；`makepkg -si` 测试安装。

## 包使用

推荐的包 / 软件请跳转[软件汇总](../../farraginous/recommend_packages.md#linux)

先生，何不看看[The largest Awesome List of CLI/TUI programs](https://github.com/toolleeo/cli-apps)？

### [neovim](../../coding/vim.md)

### [locate](https://man7.org/linux/man-pages/man1/locate.1.html)

快速搜索。

```bash:no-line-numbers
sudo updatedb   # 更新缓存，使用前执行
```

### 快照

快照本质上就是一个 cp 而已。只不过在 btrfs 上吃了 CoW 的福利，空间占用很小罢了。

因为[被 timeshift 坑过](./problem.md#timeshift-引发的血案)，因此换用 snapper + btrfs-assistant。

当然还有 [btrbk](https://github.com/digint/btrbk) 可以选择，不过其主业 (backup tool) 并非快照，因此没有尝试。

### exa

`ls='exa --all --long --color-scale --binary --header --time-style=long-iso'`

### tmux

> tmux 在不使用图形界面或有恢复 shell 需求时比较好用。

是一个比较牛逼的终端(?)。支持多窗口，分屏，后台挂起。

- 配置：[`~/.tmux.conf`](https://github.com/lxl66566/config/blob/archwsl/.tmux.conf)，初始时没有，需要自己创建。编辑后需要重新载入：`tmux source ~/.tmux.conf` or `prefix`+`:source ~/.tmux.conf`
- 插件：不要用默认的插件管理器。。不好用。
- copy-mode(vi): `Space` 进入选择，`Enter` 复制。（我觉得是假的 vi mode）
- 默认启动 ([bash ref](http://129.226.226.195/post/28785.html) | [zsh ref](https://unix.stackexchange.com/questions/41274/having-tmux-load-by-default-when-a-zsh-terminal-is-launched) [ref2](https://superuser.com/questions/253786/how-can-i-make-tmux-use-my-default-shell))：
  :::code-tabs
  @tab zsh
  ```sh
  # add on top of .zshrc
  if [ "$TMUX" = "" ]; then tmux; fi
  # add in .tmux.config
  set-option -g default-shell /bin/zsh
  ```
  @tab bash
  ```sh
  if command -v tmux &> /dev/null && [ -n "$PS1" ] && [[ ! "$TERM" =~ screen ]] && [[ ! "$TERM" =~ tmux ]] && [ -z "$TMUX" ]; then
  exec tmux
  fi
  ```
  :::

### [tlp](https://wiki.archlinux.org/title/TLP)

笔记本省电的。

```sh
paru -S tlp tlpui
sudo systemctl mask systemd-rfkill.service systemd-rfkill.socket
sudo systemctl enable --now tlp
```

## [遇到的问题](./problem.md)

## external

1. 了解一下 btrfs（注意时效）：[Linux Btrfs 文件系统使用指南](https://www.mivm.cn/linux-btrfs-usage-guide)
2. [【譯】Manjaro 的爭議](https://blog.origincode.me/manjaro-controversies/)
3. [Linux fontconfig 的字体匹配机制](https://catcat.cc/post/2020-10-31/)
4. [btrfs 元数据满了怎么办](https://blog.lilydjwg.me/2023/7/25/btrfs-metadata-full.216670.html)
