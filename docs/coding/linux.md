# linux
我使用的是 [ArchWSL](https://github.com/yuk7/ArchWSL) on WSL2。因为游戏原因无法抛弃 windows，但又想学习体验 Linux，于是使用折中方案。在 Android 平板上 使用 termux，主要用作 ssh 连接 VPS。

VPS 有关问题请移步 [VPS](../articles/vps.md)。
## 包
* 我安装的包：cmake, yay, fishshell, neovim, neofetch, fd, openssh, plocate(locate), trash-cli, tmux, tldr
* 我计划装的包：Joshuto
## 更换镜像
:::: code-group
::: code-group-item ArchWSL
```bash
nvim /etc/pacman.d/mirrorlist
```
:::
::: code-group-item termux
```bash
termux-change-repo
```
:::
::::
## 使用 windows 代理
懒得在 wsl 里重复下载，直接使用 windows 代理。[参考](https://zhuanlan.zhihu.com/p/153124468)
```sh
your_port=****
host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
export ALL_PROXY="http://$host_ip:$your_port"
```

代理软件需要开启局域网连接。测试时不要使用 `ping` 指令（用 `curl`），其不走代理。
## 关于进程
一般使用 `ps aux` 配合 `grep` 查找进程。
### 清理僵尸进程
如果你看到许多 `[journalctl] <defunct>` 标识，这代表有未结束的僵尸子进程。可以[参考此处](https://www.linkedin.com/pulse/how-identify-kill-zombiedefunct-processes-linux-without-george-gabra)清理他们。
```sh
top -b1 -n1 | grep Z    # find
ps -A -ostat,ppid | grep -e '[zZ]'| awk '{ print $2 }' | uniq | xargs ps -p # Find the parent of zombie processes, remenber ppid
kill -s SIGCHLD <ppid>
top -b1 -n1 | grep Z    # Identify if the zombie processes have been killed
# if haven't been killed, just kill <ppid>
```
## 包使用
[包](#包)
### bash
<details><summary>use fishshell, not bash</summary>

* ~/.bashrc（仅含手动编辑）:
    ```bash
    alias ll='ls -alF'
    export DWM=/home/lxl/myfile/dwm
    ```
</details>

termux 的 bash 配置文件位置比较奇怪，在 `~/../usr/etc/bash.bashrc`。
### fishshell
* set fish as default
    :::: code-group
    ::: code-group-item ArchWSL
    ```bash
    # edit ~/.bashrc
    if [[ $(ps --no-header --pid=$PPID --format=cmd) != "fish" ]]
    then
        exec fish
    fi
    ```
    :::
    ::: code-group-item termux
    ```bash
    chsh -s fish
    ```
    :::
    ::::
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
### locate
快速搜索。
```bash
sudo pacman -S locate
sudo updatedb
```
### tmux
是一个很牛逼的终端。支持多窗口，分屏，后台挂起。
* 配置：[`~/.tmux.conf`](https://github.com/lxl66566/config/blob/archwsl/.tmux.conf)，初始时没有，需要自己创建。编辑后需要重新载入：`tmux source ~/.tmux.conf` or `prefix`+`:source ~/.tmux.conf`
* 插件：不要用默认的插件管理器。。不好用。
* copy-mode(vi): `Space` 进入选择，`Enter` 复制。（我觉得是假的 vi mode）
* 默认启动 ([source](http://129.226.226.195/post/28785.html))：
    ```sh
    if command -v tmux &> /dev/null && [ -n "$PS1" ] && [[ ! "$TERM" =~ screen ]] && [[ ! "$TERM" =~ tmux ]] && [ -z "$TMUX" ]; then
    exec tmux
    fi
    ```
## 遇到的问题
### sed 语法
sed 正则表达式的 `{}` 需要转义 `\{\}` 。。。。。。
### [libcuda.so.1 is not a symbolic link](https://bbs.archlinuxcn.org/viewtopic.php?id=13402)
Windows 的锅，[解法](https://github.com/microsoft/WSL/issues/5548)，但还有问题残留。