---
date: 2023-10-28
icon: tool
category:
  - 教程
  - 推荐
tag:
  - Linux
  - 桌面端
  - 工具
---

# 包管理与使用推荐

## 包管理

### pacman

pacman 是 linux 官方指定包管理器，好用，就是指令比较难记。安装来源是 linux 官方仓库，基本上都是二进制。

- “滚” 指 `sudo pacman -Syu`，更新所有包。不要隔太久不滚，挂的概率会增加。（~~今日也无事可做~~）
  - 也可以直接 `yay` 或 `paru` 进行更新。（这俩不带参数默认执行 `-Syu`）
  - 如果更新了内核（`linux` 包），请立即重启。
- 出现 `The requested URL returned error: 404`，可能是本地缓存没有更新，请 `sudo pacman -Syy`
- 每次修改镜像之后都应该使用 `sudo pacman -Syyu` 强制更新缓存 ([ref](https://wiki.archlinuxcn.org/wiki/镜像源#强制_pacman_刷新软件包列表))。
- pacman 常用指令：`-S`, `-Ss`, `-Rs`
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

### AUR

AUR 是用户仓库，由用户自行维护。AUR 只管理 PKGBUILD，相当于一个**小型安装脚本**而非程序本体。这里有一篇[说明文章](https://blog.asukaminato.eu.org/AUR-vs-vs-cn-dd42c7a8f0f943dcabd23d4cdf03a914)。

由于 PKGBUILD 经常会从 github 等地方拉取软件压缩包，所以请[使用代理](./install_and_config.md#设置代理)。PKGBUILD 经常需要自行编译，因此尽量不要在笔记本未插入电源情况下更新[^1]。

[^1]: [我再也不敢在课上不插电滚 aur 了 😭](https://t.me/withabsolutex/1303)

由于上传无门槛，AUR 可能携带恶意软件，请谨慎下载偏门小软件。有经验的用户会在安装前审阅 PKGBUILD。

- AUR Helper 会先在官方仓库搜索包。若失败才会去 AUR 下载（并编译），然后**使用 pacman 安装**。
- yay 是一个广泛使用的 AUR Helper，使用 go 语言编写。
  - yay 的问题也太多了点。。可以试试 paru。
- 另一个广泛使用的 AUR Helper 是 _paru_，使用 rust 编写。
  - 与 yay 不同的是安装时默认展示 PKGBUILD 以供审阅。
- 疑难解答：
  - yay：疑难解答：[yay 安装问题](./problem.md#yay-安装问题) | [yay 换源问题](./problem.md#yay-换源问题) | [yay 权限错误](./problem.md#yay-权限错误)

### 打包

AUR 的包都是志愿维护，为开源社区做贡献是一件好事。

首先看看 arch wiki，很有用。[打包准则](https://wiki.archlinuxcn.org/zh/Arch_打包准则) | [创建软件包](https://wiki.archlinuxcn.org/wiki/创建软件包)

我在先辈推动下，先接过了一个 `autocorrect-bin` 练手。

1. 首先，创建一个 AUR 账号，并[认证](https://wiki.archlinuxcn.org/wiki/AUR_提交准则#认证)
2. 认领包，clone 到本地
3. 改 PKGBUILD
4. 更新 `.SRCINFO`: `makepkg --printsrcinfo > .SRCINFO`
5. push。注意不要使用那些阻断 ssh 的代理。

可以 `paru -Gp <package>` 看看别人写的 PKGBUILD；`makepkg -f` 测试（`-f` 是覆盖下载）。

`updpkgsums PKGBUILD` 可以自动更新校验和。

#### 测试

如果需要一个纯净环境测试，可以看看 [pacstrap](https://wiki.archlinux.org/title/Pacstrap)。

```sh
mkdir container
sudo pacstrap container base base-develsudo # 创建容器（使用主机密钥）。下载大小约为 223MB
sudo systemd-nspawn -D container  # 进入容器
```

或许还可以找个机会试试 [bwrap](https://blog.lilydjwg.me/2021/8/12/using-bwrap.215869.html)？据说更轻量。我确实觉得为了打个包下载 200+MB 的东西有点浪费了。

## 包使用

此处不包含代理与快照工具，请前往[配置页](./install_and_config.md#代理)查看。

### 基础 CLI 工具

> 对于通过 `/`（OR）相连的软件，本人**仅推荐首个**

<!-- prettier-ignore -->
|软件包|功用|
| :-: | :-: |
|`fishshell` + `starship`|[shell](#shell) 及其外观|
|`ripgrep` / [`skim`](https://github.com/lotabout/skim) / fzf|`grep` 的代替|
|`fd` & `plocate`|查找，faster `find`|
|`tldr`|`man` 的代替|
|`fex`|`cut` 的代替|
|`exa`|[`ls` 的代替](#exa)|
|`fastfetch`|`neofetch` 的代替|
|[`rip`](https://github.com/nivekuil/rip) / `trash-cli`|easier, safer `rm`|
|`btop` / `htop` / `glances`|任务管理器，看性能，`top` 的代替|
|`lsof`|[查端口占用](./problem.md#umount-failed)|
|`zoxide`|智能 cd|
|[`mcfly`](https://github.com/cantino/mcfly)|智能 history|
|`dust` & `ncdu` / `gdu`|磁盘容量查询|
|`yazi`[^6] / `nnn` / `ranger`|文件浏览器|
|`lsof`|查进程占用|
|`neovim`|[文本编辑器](../../coding/vim.md)|

[^6]: `yazi` 甚至能在 console 下查看图片。

以上是本人体验总结的结果。若需要更多推荐，不如看看[The largest Awesome List of CLI/TUI programs](https://github.com/toolleeo/cli-apps)。

### shell

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

#### fishshell

fishshell 语法自成一系，学习成本较高，但是补全太好用了，爆杀 zsh，所以我使用 fish。

> fish 会自动从 man 生成补全 ([ref](https://t.me/archlinuxcn_group/2974806))

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

#### bash

不会有人真的用 bash 做主 shell 吧。。

bash 按 tab 也能补全，不过默认不显示候选项。

bash 语法：

- `xx1 && xx2` 在 xx1 成功后执行 xx2
- `xx1 || xx2` 在 xx1 失败后执行 xx2

#### [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki)

> 在尝试三大 shell 后我选择 fish 而不是 zsh. [why?](https://t.me/withabsolutex/1214)<br/>
> 据说 omz 会有性能问题。[ref](https://luoxu.archlinuxcn.org/#g=1031857103&q=omz&sender=313927976)

<details><summary>archived</summary><p>

ref: [Linux Zsh 使用 oh-my-zsh 打造高效便捷的 shell 环境](https://sysin.org/blog/linux-zsh/)

- 安装 zsh 时会问 set default shell, `y` 即可
- [我的配置&插件](https://github.com/lxl66566/config/blob/archwsl/.zshrc)
</p></details>

### [neovim](../../coding/vim.md)

### [locate](https://man7.org/linux/man-pages/man1/locate.1.html)

快速搜索，其维护了一个数据库，使用 `sudo updatedb` 更新（默认开机时自动执行），搜索时不再遍历目录。

### exa

`ls='exa --all --long --color-scale all --binary --header --time-style=long-iso'`

### tmux

tmux 是一个比较牛逼的终端(?)。支持多窗口，分屏，后台挂起，在**不使用图形界面**或有恢复 shell 需求时比较好用。

如果只想要简单的恢复 shell 功能，可以考虑一下 `screen`。

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

### activitywatch

记录软件使用时长，参考[文章](../time_record.md)

### bottles

基于 wine 运行 windows 软件，比 wine 更傻瓜式（只需要点鼠标，不用写配置）。

但是试了一下，不能直接运行挂载 windows 盘里的游戏，只能 copy 一份到 linux 下运行。

目前试了几个 galgame，都能正常运行。~~（来人，上点逆天的！）~~

### [waydroid](https://wiki.archlinuxcn.org/wiki/Waydroid)

waydroid 是 linux 上的首选 android 模拟器。不过想用还是需要折腾一阵的。

1. 切换为 zen 内核，参考[更换内核](./install_and_config.md#更换内核)
2. 安装 waydroid，具体流程在 wiki 上有。
   - `pacman -S waydroid` 没有 Android 镜像，联网自动下载可能需要代理。

这里主要说下在 X11 下用 waydroid：需要一个 wayland 模拟器，archwiki 的主站说用 cage，CN 站说用 weston，都没有讲具体用法。我用 weston 了。

```sh
sudo pacman -S weston
weston
# 然后点击打开的窗口的左上角，打开内部终端，执行 waydroid 指令。
waydroid show-full-ui
```

- 存储位置：`~/.local/share/waydroid/data/media/0`，还有权限问题，我直接乱暴 `chmod 777 ... -R`
- 进去不用连 wifi，直接有网。~~虽然想连也连不上~~

> 挺想吐槽，waydroid 居然不能重连 session，所以如果 session activated，weston 窗口又关了，这时候只能 `waydroid session stop && waydroid show-full-ui` 重启。。

更多踩坑可以看看[某位群友的心得](https://luoxu.archlinuxcn.org/#g=1031857103&q=这是我在waydroid上踩过的坑&sender=5958395317)
