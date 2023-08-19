---
date: 2023-04-17
icon: linux
category:
    - 编程
    - 教程
tag:
    - 工具
    - Linux
---
# linux
我最早使用 linux 用的是 [ArchWSL](https://github.com/yuk7/ArchWSL) on WSL2，之后正式使用 archlinux。因为游戏原因（galgame & osu stable 地狱兼容）无法抛弃 windows，但又想学习 Linux，于是使用折中方案。在 Android 平板上 使用 termux，主要用作 ssh 连接 VPS。VPS 有关问题请移步 [VPS](../articles/vps.md)。
* 更新 ArchWSL：从[此处](https://github.com/yuk7/wsldl/releases)下载 `wsldl.exe`，改名为 `arch.exe` 并替换。
## 安装
20230819 收到购买的硬盘，正式安装 archlinux（双系统）。安装过程还挺坎坷的，下面问题区可见一斑。
* [中文教程](https://arch.icekylin.online/)，讲的确实好。不过还是建议 archwiki 也一起看看，取长补短。
### 添加 windows 引导
安装后我肯定是都使用 grub 作为引导，但是我双系统分别在两块不同硬盘上，无法使用 *os-prober* 自动共存。因此我使用如下方法进行自动检测并添加：
```sh
mkdir /mnt/windows
mount /dev/<windows efi> /mnt/windows
grub-mkconfig -o /boot/grub/grub.cfg
umount /mnt/windows
```
## 外部包
* 我安装的包：cmake, yay, fishshell, neovim, neofetch, fd, openssh, plocate, trash-cli, tmux, tldr, jq, netcat, lsof, iotop, zsh, sysstat
* 我计划装的包：Joshuto
## Terminal 基础
`<C-a>` 代表 `Ctrl + a`.
|按键|执行|
| :-: | :-: |
|`<C-a>`|移动光标到最前|
|`<C-w>`|删除前一个单词|
|`<C-u>`|清空当前输入|
## pacman & yay
使用前请先 `sudo pacman -Syy` 更新本地缓存，否则可能找不到包。（类比：scoop 每次运行都更新一次所以无需手动）每次修改镜像之后都应该使用 `pacman -Syyu` 强制更新缓存 ([ref](https://wiki.archlinuxcn.org/wiki/镜像源#强制_pacman_刷新软件包列表))。
* `sudo pacman -Ss <name>` 是搜索包，支持正则
* yay 用来下载 AUR 的包，更多社区维护，质量更差
* 如果一个包同时在 archlinux 仓库和 AUR 仓库，则优先使用 pacman ([ref](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/63))
* pacman 更换镜像
    ::: code-tabs
    @tab ArchWSL
    ```bash:no-line-numbers
    nvim /etc/pacman.d/mirrorlist
    ```
    @tab termux
    ```bash:no-line-numbers
    termux-change-repo  # 虽然不是 pacman 的（
    ```
    :::
* 遇到的问题：[更新 pacman keyring](#更新-pacman-keyring)
## 使用 windows 代理
懒得在 wsl 里重复下载，直接使用 windows 代理。[ref](https://zhuanlan.zhihu.com/p/153124468)

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
代理软件需要开启局域网连接。测试时不要使用 `ping` 指令（其不走代理），用 `curl`。
## 系统管理
1. 一般使用 `ps aux` 配合 `grep` 查找进程。
2. 使用 `top` 查看内存，CPU 占用等。
### 清理僵尸进程
如果你看到许多 `[journalctl] <defunct>` 标识，这代表有未结束的僵尸子进程。可以[参考此处](https://www.linkedin.com/pulse/how-identify-kill-zombiedefunct-processes-linux-without-george-gabra)清理他们。
```sh
top -b1 -n1 | grep Z    # find
ps -A -ostat,ppid | grep -e '[zZ]'| awk '{ print $2 }' | uniq | xargs ps -p # Find the parent of zombie processes, remenber ppid
kill -s SIGCHLD <ppid>
top -b1 -n1 | grep Z    # Identify if the zombie processes have been killed
# if haven't been killed, just kill <ppid>
```
## bash
使用：
<details><summary>use zsh or fishshell, not bash</summary>

* ~/.bashrc（仅含手动编辑）:
    ```bash
    alias ll='ls -alF'
    ```
* termux 的 bash 配置文件位置比较奇怪，在 `~/../usr/etc/bash.bashrc`。
</details>

可以不用，但是需要会写。。
* [Y/N 选择器](https://stackoverflow.com/questions/226703/how-do-i-prompt-for-yes-no-cancel-input-in-a-linux-shell-script/27875395#27875395)
    ::: code-tabs
    @tab bash
    ```sh
    read -n 1 -p "Are you sure to clean git and push force? (y/n) " answer
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
    read -n 1 -P 'Use tldr instead of man? (y/n) ' answer
    switch $answer
        case n N
            /usr/sbin/man "$argv"
        case '' y Y
            tldr "$argv"
    end
    ```
    :::
## 包使用
我安装的：[外部包](#外部包)
### [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)[^1]
[^1]: 推荐阅读：[Linux Zsh 使用 oh-my-zsh 打造高效便捷的 shell 环境](https://sysin.org/blog/linux-zsh/)
* 安装 zsh 时会问 set default shell, `y` 即可
* [我的配置&插件](https://github.com/lxl66566/config/blob/archwsl/.zshrc)
### fishshell
* set fish as default
    ::: code-tabs
    @tab ArchWSL
    ```bash
    # edit ~/.bashrc
    if [[ $(ps --no-header --pid=$PPID --format=cmd) != "fish" ]]
    then
        exec fish
    fi
    ```
    @tab termux
    ```bash:no-line-numbers
    chsh -s fish
    ```
    :::
* 配置文件一般在 `~/.config/fish` 下。
* `~/.config/fish/config.fish`：
    ```bash
    if status is-interactive
        # bind \t accept-autosuggestion
        bind \t forward-word
    end
    ```
* 环境变量：[`set`](https://fishshell.com/docs/2.6/commands.html#set)，注意作用域问题
* 函数：使用 function 新增函数后，还需要使用 `funcsave <function>` 保存到配置文件夹下以便修改，修改后需要重新加载 fish。
    * 删除函数：`functions -e <function>`
    * alias 本质上也是函数+
### neovim
参考 [从零开始配置 Neovim (Nvim) - MartinLwx](https://martinlwx.github.io/zh-cn/config-neovim-from-scratch/)
### [locate](https://man7.org/linux/man-pages/man1/locate.1.html)
快速搜索。
```bash:no-line-numbers
sudo updatedb   # 更新缓存，使用前执行
```
### tldr
人类可读的 man 替代品。
### [lsof](https://www.jianshu.com/p/a3aa6b01b2e1)
### tmux
是一个很牛逼的终端。支持多窗口，分屏，后台挂起。
* 配置：[`~/.tmux.conf`](https://github.com/lxl66566/config/blob/archwsl/.tmux.conf)，初始时没有，需要自己创建。编辑后需要重新载入：`tmux source ~/.tmux.conf` or `prefix`+`:source ~/.tmux.conf`
* 插件：不要用默认的插件管理器。。不好用。
* copy-mode(vi): `Space` 进入选择，`Enter` 复制。（我觉得是假的 vi mode）
* 默认启动 ([bash ref](http://129.226.226.195/post/28785.html) | [zsh ref](https://unix.stackexchange.com/questions/41274/having-tmux-load-by-default-when-a-zsh-terminal-is-launched) [ref2](https://superuser.com/questions/253786/how-can-i-make-tmux-use-my-default-shell))：
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
## 遇到的问题
按时间倒序。
### 更新 pacman keyring
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
### sed 语法
sed 正则表达式的 `{}` 需要转义 `\{\}` 。。。。。。
### [libcuda.so.1 is not a symbolic link](https://bbs.archlinuxcn.org/viewtopic.php?id=13402)
Windows 的锅，[解法](https://github.com/microsoft/WSL/issues/5548)，但还有问题残留。
### 分区格式化
使用 `cfdisk` 分好区，需要分别为每个分区进行格式化。然而我使用 nvme 盘而看的 sata 指令，对硬盘格式化而非对分区进行格式化（`mkfs.vfat /dev/nvme1n1`），报错：
> Partitions or virtual mapping on device, not making file system. (use -I to override)

然后尝试了 `-I`，结果分区全没了；对着 `nvme1n1` `mkswap`，分区又炸了。最后才发现不能对硬盘操作。。
### 挂载出错
非常低级的错误。。挂载时打错了指令，导致不同的分区被挂载到了同一个位置。不过检查得早，没有继续下一步就发现了问题。

然后重新挂载，后来到 *生成 fstab 文件* 的时候又出了问题：`genfstab -U /mnt > /mnt/etc/fstab` 输出了一大堆东西，我读了一下，原来把我挂载时做的所有操作都记录进去了，包括错误的部分。于是手动删除了冗余，不清楚后续是否会出问题。
### NetworkManager warning
设置自启服务 `systemctl enable --now NetworkManager` 时报错：
> ... iwlwifi ... WRT: invalid buffer destination

不过后面 `systemctl status NetworkManager` 发现服务已经启动了，也就没管了（所以问题还是没解决的。
## external
1. [Linux ls -al 得到的结果代表什么意思？](https://zhuanlan.zhihu.com/p/495554731)