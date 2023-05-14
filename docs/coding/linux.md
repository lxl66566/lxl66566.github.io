# linux
我使用的是 [ArchWSL](https://github.com/yuk7/ArchWSL) on WSL2。因为游戏原因无法抛弃 windows，但又想学习体验 Linux，于是使用折中方案。
## 包
* 我安装的包：cmake, yay, fishshell, neovim, neofetch, fd, 
* 我计划装的包：trash-cli
## 更换镜像
`nvim /etc/pacman.d/mirrorlist`
## 使用 windows 代理
懒得在 wsl 里重复下载，直接使用 windows 代理。[参考](https://zhuanlan.zhihu.com/p/153124468)
```sh
your_port=****
host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
export ALL_PROXY="http://$host_ip:$your_port"
```

代理软件需要开启局域网连接。测试时不要使用 `ping` 指令（用 `curl`），其不走代理。
## 包使用
### bash
<details><summary>use fishshell, not bash</summary>

* ~/.bashrc（仅含手动编辑）:
```bash
alias ll='ls -alF'
export DWM=/home/lxl/myfile/dwm
if [[ $(ps --no-header --pid=$PPID --format=cmd) != "fish" ]]
then
    exec fish
fi
```
</details>

### fishshell
* `~/.config/fish/config.fish`：
```bash
if status is-interactive
    # bind \t accept-autosuggestion
    bind \t forward-word
end
```
* 环境变量：[`set`](https://fishshell.com/docs/2.6/commands.html#set)
## 遇到的问题
### [libcuda.so.1 is not a symbolic link](https://bbs.archlinuxcn.org/viewtopic.php?id=13402)
Windows 的锅，[解法](https://github.com/microsoft/WSL/issues/5548)，但还有问题残留。