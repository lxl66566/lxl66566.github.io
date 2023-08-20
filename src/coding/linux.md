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
我最早使用 linux 用的是 [ArchWSL](https://github.com/yuk7/ArchWSL) on WSL2，最初是学习用，基本上没啥存在感。

之后正式使用 archlinux，双系统，windows 只拿来打游戏（galgame & osu stable 地狱兼容）。

在 Android 平板上 使用 termux，主要用作 ssh 连接 VPS。VPS 有关问题请移步 [VPS](../articles/vps.md)。
* 更新 ArchWSL：从[此处](https://github.com/yuk7/wsldl/releases)下载 `wsldl.exe`，改名为 `arch.exe` 并替换。
## 安装
20230819 收到购买的硬盘，正式安装 archlinux（双系统）。安装过程还挺坎坷的，下面[问题区](#遇到的问题)可见一斑。
* [中文教程](https://arch.icekylin.online/)，讲的确实好，有一些针对中文用户的细节。
* 不过还是建议 [archwiki - installation guide](https://wiki.archlinuxcn.org/wiki/安装指南) 也一起看看，取长补短。

分两块盘的优点：不用担心 windows 更新崩了 grub 引导<span class="heimu" title="你知道的太多了">不过我已经关了自动更新</span>；出现失误不用担心丢失数据（安装时我确实失手格掉了全盘数据和分区）。
### 添加 windows 引导
由于双系统，安装后我肯定是都使用 grub 作为引导（开 bios 挺麻烦的），但是我双系统分别在两块不同硬盘上，无法使用 *os-prober* 自动共存。因此我使用如下方法进行自动检测并添加：
```sh
mkdir /mnt/windows
mount /dev/<windows efi> /mnt/windows
grub-mkconfig -o /boot/grub/grub.cfg
umount /mnt/windows
```
## 基础
### [Terminal shortcuts](https://linuxhandbook.com/linux-shortcuts/)
`<C-a>` 代表 `Ctrl + a`.
|按键|执行|
| :-: | :-: |
|`<C-a>`|移动光标到最前|
|`<C-w>`|删除前一个单词|
|`<C-u>`|清空当前输入|
## 外部包
* 我安装的包：
    * archwsl: cmake, yay, fishshell, neovim, neofetch, fd, openssh, plocate, trash-cli, tmux, tldr, jq, netcat, lsof, iotop, zsh, sysstat
    * archlinux: htop, exfat-utils
* 我计划装的包：Joshuto
## pacman & yay
* 请定期 `sudo pacman -Syy` 更新本地缓存（update），否则可能找不到包。（~~今日也无事可做~~）
* 每次修改镜像之后都应该使用 `sudo pacman -Syyu` 强制更新缓存 ([ref](https://wiki.archlinuxcn.org/wiki/镜像源#强制_pacman_刷新软件包列表))。
* `pacman -Ss <name>` 是搜索包，支持正则
* yay 是一个广泛使用的 AUR Helper，使用 go 语言编写。
    * yay 用来下载 AUR 的包（也可以下载官方包），社区维护，质量更差，更容易过期，常出现安装报错的情况。
    * 如果一个包同时在 archlinux 仓库和 AUR 仓库，则 yay 优先使用 pacman ([ref](https://github.com/ArchLinuxStudio/ArchLinuxTutorial/issues/63))
    * yay 使用系统代理，需要导出 `ALL_PROXY` 环境变量。否则会出现 Github 源的包无法安装的情况。
* pacman 更换镜像
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
* 疑难解答：
    * pacman：[更新 pacman keyring](#更新-pacman-keyring)
    * yay：疑难解答：[yay 安装问题](#yay-安装问题) | [yay 换源问题](#yay-换源问题)
## 设置代理
### v2raya
v2raya 的质量其实一般，速度比我的 windows V2rayN 用的 [Xray 内核](https://xtls.github.io/)差。但是目前还不想直接写内核配置文件（等契机），qv2ray 又停止维护，所以没得选。
```sh
sudo pacman -S v2raya
v2raya --lite
# fishshell
set -Ux ALL_PROXY "http://127.0.0.1:20172"  # 必须加 -x, 否则系统代理无效
```
之后的操作都在网页上进行。使用系统代理端口为 `http://127.0.0.1:20172`，这个端口带自动分流。
### 使用 windows 代理
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
## kde
我使用 kde 作为为的桌面（看起来就很现代，很符合我的想象）。
1. enable flameshot：flameshot 默认无法使用 print 快捷键截图。需要在*系统设置 - 添加快捷键 - 火焰截图*，然后手动设置快捷键。
## bash
若使用 `chsh` 切换了其他的 shell，则 `.bashrc` & `.bash_profile` 将失效。所以最好装好系统就先装 shell.
使用：
<details><summary>use zsh or fishshell, not bash</summary>

* ~/.bashrc（仅含手动编辑）:
    ```bash
    alias ll='ls -alF'
    ```
* termux 的 bash 配置文件位置比较奇怪，在 `~/../usr/etc/bash.bashrc`。
</details>

可以不用，但是需要会写。。毕竟 default shell 的兼容性不是盖的。
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
        case '*'
            tldr "$argv"
    end
    ```
    :::
## 包使用
我安装的：[外部包](#外部包)
### fishshell
fishshell 语法自成一系，学习成本较高，但是补全太好用了，爆杀 zsh，所以我使用 fish。
* set fish as default
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
    > 不建议通过chsh更换shell,你可以使用Konsole(如果是KDE)的profile改shell——[@MkfsSion](https://t.me/archlinuxcn_group/2755963)
* `~/.config/fish/config.fish`：
    ```sh
    if status is-interactive
        bind \t forward-word    # 每个 tab 键只补全一个单词
    end
    ```
* 我的习惯：
```sh
alias e=nvim    # editor，快捷编辑，或使用 e=$EDITOR
alias l="ls -alF --color=auto"
```
* 环境变量：[`set`](https://fishshell.com/docs/2.6/commands.html#set)，注意作用域与是否 export 的问题。
    * 我喜欢使用 `set -Ux ...`，这样开机就能自动加载
* 函数：使用 function 新增函数后，可以使用 `funcsave <function>` 保存到配置文件夹下以便修改与备份，修改后需要重新加载 fish：`. ~/.config/fish/config.fish`。（用不惯 `funced` 的交互式编辑。。）
    * 删除函数 / 变量：`-e` == `--erase`
    * fish 皆为函数，alias 也是函数
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
> tmux 在不使用图形界面或有恢复 shell 需求时比较好用。

是一个比较牛逼的终端(?)。支持多窗口，分屏，后台挂起。
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
### [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)
> 在尝试三大 shell 后我选择 fish 而不是 zsh.
<details><summary>archived</summary><p>

ref: [Linux Zsh 使用 oh-my-zsh 打造高效便捷的 shell 环境](https://sysin.org/blog/linux-zsh/)
* 安装 zsh 时会问 set default shell, `y` 即可
* [我的配置&插件](https://github.com/lxl66566/config/blob/archwsl/.zshrc)
</p></details>

## 遇到的问题
**按时间倒序**。
## yay 换源问题
刚开始一直以为 yay 就是类似 pacman 的 extra，所以想要给 yay 换源。根据简中内网的傻逼教程（没错，此时还没上代理），换了个已经废弃的清华源（换源指令：`yay --aururl "https://..." --save`），发现用不了后换成了中科大源，结果报错：
> -> 查找 AUR 软件包失败： ttf-ms-win11-auto-zh_cn:1 error occurred:<br/>
>       * response decoding failed: invalid character '<' looking for beginning of value

并且换回官方源仍然相同报错。换源过去然后发现换不回来，堪比刷小米 EU[^1].
[^1]: 参考[刷机](../article/mobile_setting#mipad-5)

之后发现，在 `~/.config/yay/config.json` 中有一个 `aurrpcurl` 字段，会保留上一个换源的结果(?) 并且不会自动更换回去。于是我删除该条，重新执行 `yay --aururl "https://aur.archlinux.org" --save`，问题得解。如果一次不行就两次，一定能解(?)。
## umount failed
`sudo umount /mnt/windows`，提示
> /mnt/windows: 目标忙

估计有莫名奇妙的软件在占用。直接 `lsof /mnt/windows` 查占用，然后再 `kill -9 <PID>` 强关。
## Windows 字体问题
**未解决**。

根据[教程](https://arch.icekylin.online/guide/advanced/optional-cfg-1.html#安装-windows-字体)复制 windows 字体，<span class="heimu" title="你知道的太多了">打错大小写就先不说了，纠正以后</span>提示：
> cp: 对 './yuminl.ttf' 调用 stat 失败: 没有那个文件或目录

后来使用 `yay -S ttf-ms-win11-auto-zh_cn
` 安装字体也失败，中间报 warning 一大堆。

没辙，暂时用 U 盘拷吧。
### yay 安装问题
使用 `sudo pacman -S yay` 时一直报错，`signature is unknown trust` 类似的。怀疑是 pacman-keyring 问题，去前面 [更新 pacman-keyring](#更新-pacman-keyring) 试了好久，都不行。

后面看教程，发现需要先安装 cn 源中的签名：`sudo pacman -S archlinuxcn-keyring`，然后才能正常使用。。（因为 pacman 用的是 archlinuxcn 源）
### NetworkManager warning
设置自启服务 `systemctl enable --now NetworkManager` 时报错：
> ... iwlwifi ... WRT: invalid buffer destination

不过后面 `systemctl status NetworkManager` 发现服务已经启动了，也就没管了（所以问题还是没解决的，然而图形界面后开机自启看不到报错了）
### 挂载出错
非常低级的错误。。挂载时打错了指令，导致不同的分区被挂载到了同一个位置。不过检查得早，没有继续下一步就发现了问题。

然后重新挂载，后来到 *生成 fstab 文件* 的时候又发现了怪事：`genfstab -U /mnt > /mnt/etc/fstab` 输出了一大堆东西，我读了一下，原来把我挂载时做的所有操作（包括错误部分）都记录进去了。于是手动删除了冗余，后续重启工作正常。

这个文件我猜测是开机指示挂载的指令。我以后还会改 btrfs 挂载选项，到时候试试从这里改。
### 分区格式化
使用 `cfdisk` 分好区，需要分别为每个分区进行格式化。然而我使用 nvme 盘而看的 sata 指令，对硬盘格式化而非对分区进行格式化（错误示范：`mkfs.vfat /dev/nvme1n1`），报错：
> Partitions or virtual mapping on device, not making file system. (use -I to override)

然后尝试了 `-I`，结果分区全没了；对着 `nvme1n1` `mkswap`，分区又炸了（全盘格成了 swap）。最后才发现格式化是分区操作，而不是硬盘操作。。
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
Windows WSL 的锅，[解法](https://github.com/microsoft/WSL/issues/5548)，但还有问题残留。
## external
1. [Linux ls -al 得到的结果代表什么意思？](https://zhuanlan.zhihu.com/p/495554731)
2. 了解一下 btrfs（注意时效）：[Linux Btrfs 文件系统使用指南](https://www.mivm.cn/linux-btrfs-usage-guide)
3. [【譯】Manjaro 的爭議](https://blog.origincode.me/manjaro-controversies/)