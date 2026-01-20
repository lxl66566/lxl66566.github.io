---
date: 2023-10-28
icon: cubes
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

> 关联文章：[包管理器吐槽与灵感](../../coding/package_manager.md)

### pacman

pacman 是 archlinux 官方指定包管理器，好用，就是指令比较难记。安装来源是 linux 官方仓库，基本上都是二进制。

- “滚”指 `sudo pacman -Syu`，更新所有包。不要隔太久不滚，挂的概率会增加。（~~今日也无事可做~~）
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
  termux-change-repo  # 虽然不是 pacman（
  ```

  :::

- [pacman 删除孤立包](https://wiki.archlinuxcn.org/wiki/Pacman/提示和技巧#删除未使用的软件包（孤立软件包）)：先检查列表，将不用删除的包[加入显式安装列表](https://wiki.archlinuxcn.org/wiki/Pacman/提示和技巧#删除必需的软件包以外的所有软件包)。
- 常见问题：[依赖冲突](./problem.md#更新破坏依赖)

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

### Nix

相对的，Nix 是 NixOS 的包管理器。整个 NixOS 是建立在 Nix 之上的。

Nix 的包有 10w+，不过里面很多是编程语言的依赖包，有一定量水分，单论数量是没有 AUR 多的。

但是 Nix 本身还是非常顶级的包管理器，使用 Nix 语言编写，这是一个纯函数式的图灵完备语言。现在是个现代编程语言都能爆杀 bash，显然 Nix 也是。

如果在非 NixOS 系统上使用 Nix 包管理器可以用 `nix-env -iA <package>` 安装包，NixOS 就直接写配置然后 rebuild 即可。

### apt

apt 是 debian 系的 Linux 包管理器。用起来只能说还凑合。

- api 会[自带 `apt-daily.service/timer` 和 `apt-daily-upgrade.service/timer`](https://askubuntu.com/questions/1038923)，挺流氓的，内网服务器建议直接 ban 了。

## 打包

### AUR

AUR 的包都是志愿维护，为开源社区做贡献是一件好事。

首先看看 arch wiki，很有用。[打包准则](https://wiki.archlinuxcn.org/zh/Arch_打包准则) | [创建软件包](https://wiki.archlinuxcn.org/wiki/创建软件包)

我在先辈推动下，先接过了一个 `autocorrect-bin` 练手。后续也打了例如 `tdl-bin` 等。

1. 首先，创建一个 AUR 账号，并[认证](https://wiki.archlinuxcn.org/wiki/AUR_提交准则#认证)
2. 认领包，clone 到本地。
   - 如果是新创建的包，只需要 `git remote add remote ssh://aur@aur.archlinux.org/<package_name>.git && git fetch` 即可，无需像 github 创建仓库那样手动操作。
3. 改 PKGBUILD 并测试。
4. 更新 `.SRCINFO`: `makepkg --printsrcinfo > .SRCINFO`
5. push。注意不要使用那些阻断 ssh 的代理。

- 可以 `paru -Gp <package>` 看看别人写的 PKGBUILD；
- `ldd xxx` 可以看可执行文件的链接库，方便寻找依赖。
- `makepkg -f` 本地测试（`-f` 是覆盖下载）。
- `updpkgsums` 可以自动更新校验和。
- `namcap PKGBUILD` 检查有没有语法错误。一般会报一个 `$CARCH` 的 warning，不用管。
- 从 Asuka 先輩那里偷来的一键更新+测试：
  ```sh
  alias pack='shfmt -w PKGBUILD && updpkgsums && makepkg --printsrcinfo > .SRCINFO && makepkg -C -sf && namcap *.zst && git clean -df'
  # 注意，由于 git clean -df 的存在，此命令只能用来更新
  ```

#### 测试

如果需要一个纯净环境测试，可以看看 [pacstrap](https://wiki.archlinux.org/title/Pacstrap)。

```sh
mkdir container
sudo pacstrap container base base-develsudo # 创建容器（使用主机密钥）。下载大小约为 223MB
sudo systemd-nspawn -D container  # 进入容器
```

[bubblewrap](https://blog.lilydjwg.me/2021/8/12/using-bwrap.215869.html) 可以以较小的开销在虚拟环境内安全构建。

## 包使用

此处不包含代理与快照工具，请前往[配置页](./install_and_config.md#代理)查看。

### 基础 CLI 工具

> 对于通过 `/`（OR）相连的软件，本人**仅推荐首个**

<!-- prettier-ignore -->
|软件包 | 功用|
| :-: | :-: |
|`fishshell` + `starship`|[shell](#shell) 及其外观|
|[`sd`](https://github.com/chmln/sd)|`sed` 的代替|
|`ripgrep` / [`skim`](https://github.com/lotabout/skim) / fzf|`grep` 的代替|
|[`fd`](https://github.com/sharkdp/fd) & `plocate`|查找，faster `find`|
|[`tldr`](https://github.com/tealdeer-rs/tealdeer)[^9]|`man` 的代替|
|`fex`|`cut` 的代替|
|`eza`|[`ls` 的代替](#eza)|
|`fastfetch`|`neofetch` 的代替|
|[`rip`](https://github.com/nivekuil/rip) / `trash-cli`|easier, safer `rm`|
|`btop` & `mission-center` / `htop` / `glances`|任务管理器，看性能，`top` 的代替|
|`xh`|`httpie` 的代替|
|`bat`|`cat` 的代替|
|[`difftastic`](https://github.com/Wilfred/difftastic)|`diff` 的代替，与 git 集成|
|[`mtr`](https://github.com/traviscross/mtr)|`traceroute` 的代替|
|`lsof` / [`somo`](https://github.com/theopfr/somo)|[查端口占用](./problem.md#umount-failed)|
|`zoxide`|智能 cd|
|[`atuin`](https://github.com/atuinsh/atuin) / [`mcfly`](https://github.com/cantino/mcfly)|history 搜索|
| `dysk` | 磁盘状态查询 |
|`dust` & `ncdu`[^8] & [dua-cli](https://github.com/Byron/dua-cli) / `gdu`|磁盘容量查询|
|`yazi`[^6] / `nnn` / `ranger`|文件浏览器|
|`lsof`|查进程占用|
|`neovim`|[文本编辑器](../../coding/vim.md)|
|[`Zellij`](https://github.com/zellij-org/zellij) / `tmux`|终端复用，多窗口|
|[`navi`](https://github.com/denisidoro/navi)|常用命令 cheatsheet|

[^6]: `yazi` 甚至能在 console 下查看图片。

[^8]: `ncdu` 在 btrfs 下不准([ref](https://wiki.archlinuxcn.org/wiki/Btrfs#显示已使用的/空闲空间))。可以考虑用 [btdu](https://github.com/CyberShadow/btdu)，这是专门为 btrfs 设计的 du 工具。

[^9]: `tldr` 有很多实现，这里推荐 Rust 的实现 [tealdeer](https://github.com/tealdeer-rs/tealdeer)。

以上是本人体验总结的结果。若需要更多推荐，不如看看[The largest Awesome List of CLI/TUI programs](https://github.com/toolleeo/cli-apps) 和 [external 1.](#external)。

### kde apps

此处列出我**额外**安装的 kde 家的软件。

- `bluedevil`：蓝牙前端。
- `yakuake`：下拉式终端，比起 konsole 的优点是快（预加载）。
  - 需要在 _系统设置 - 开机与关机_ 中将其加入开机自启。
  - [配置](https://wiki.archlinuxcn.org/wiki/Yakuake#Plasma_上的透明/模糊背景)
- `kclock`：时钟，闹钟，秒表

### shell

装完系统应该最先装 shell，否则手感一坨狗屎。至于装啥，请移步[shell script](../../coding/shell.md)。

- 美化：我使用 starship，跨平台，零配置，已经很好用了。[tide](https://github.com/IlanCosman/tide) 也是一个 fish 美化插件，不过没用过。

### 聊天软件

[Telegram](../telegram.md) 当然是首推，多平台适配好，并且在官方仓库，甚至能直接用 web 版。

但是只要在中国有原生家庭，就逃不开 QQ 和微信。

- QQ 还好说，有 QQNT（`linuxqq` <Badge text="AUR" />）用。
  - 不要安装 [LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT)。Archlinux 是滚动更新，而第三方为爱发电的注入基本上跟不上更新节奏。我试了 bin 包和 git 包都会闪退。
- [微信](https://wiki.archlinuxcn.org/wiki/微信)就是[垃圾的代名词](../../gossip/fuckxxx.md#微信有多难用)。我对微信的要求是不想用 wine，反正我没有朋友圈、小程序需求。
  - 首推当然还是 `wechat-universal-bwrap` <Badge text="AUR" />，最 popular 的一集，还能防止拉屎。
  - 也试过 `wechat-uos` <Badge text="AUR" />，在暗色模式下有 bug，并且进不了托盘。
  - [wechat-need-web](https://github.com/lqzhgood/wechat-need-web) 可以让你能够使用微信网页版。

### 邮件

我的需求挺简单，只是 IMAP 接收和多账号管理。

Thunderbird (`thunderbird-i18n-zh-cn` <Badge text="extra" />) 是一个重量级的邮件客户端，支持收发，多账号。好用是挺好用，就是太重了（600+M RAM），于是我想寻找更轻量的邮件客户端。

由于我桌面用的 kde，试了下 kmail，用不了，一直报 Akonadi 有问题，点 _详情_ 也点不开。我装了 `kde-pim` <Badge text="包组" /> 也无济于事。据说 kmail 添加 gmail 也[有问题](https://t.me/archlinuxcn_group/3030332)，因此放弃。

### 文本编辑器

详见[各种 vim 系 editor 的使用体验](../../coding/vim.md)。

### 游戏

```sh
paru -S --needed arch-gaming-meta
```

这个包里有很多好东西。

#### wine

我最初因为对命令行的恐惧而选择逃避，使用 [bottles](#bottles) 来运行 windows 应用，它实际上是一个对 wine 和 winetricks 的 GUI 包装。但是后来 bottles 出现了一些严重的问题[^2]，让我不得不回退到 wine，又发现 winetricks 很好用，所以便果断抛弃了 bottles。

[^2]: 从[此处](https://t.me/absxsgroup/7461)往下翻

安装 wine 并不难，archlinux 看两眼 wiki，nixos 就装 `wine` 和 `winetricks` 两个包就行。

出于游戏目的，首次使用 wine 时，推荐用 winetricks 进行运行库的安装。如果没有环境隔离的需求就全部装到默认容器（`~/.wine`）里即可。先装字体（`cjkfonts`），再装运行库，可以参考 [AsukaMinato 的博客](https://asukaminato.notion.site/Play-Galgame-on-wine-385828919b3b482891a42fb82a1d8fbf)。同时 minato 给出了另一个更好的解法：先装 [K-Lite Codec Pack](https://codecguide.com/download_kl.htm)，就可以跳过所有解码器的安装，更快更便捷。然后就~~看谁顺眼装谁了~~，什么 VC++ 运行库，dxvk，这些也都是比较基础的就不多说了。

使用 wine 运行某个 windows 应用，只需要 `wine <file>`，比我想的简单太多了。转区就设置 `LC_ALL="ja_JP.UTF-8"` 环境变量即可。

其他：

- wine 无法卸载已经安装的运行库，所以如果想要卸载，要么 override 要么开新容器。
- `WINEPREFIX` 可以选择不同的 wine 容器。
- `WINEDLLOVERRIDES` 可以重载不同的运行库，例如 `WINEDLLOVERRIDES="*d3d9,*d3d10,*d3d10_1,*d3d10core,*d3d11,*dxgi=b"`

#### bottles

bottles 是 python 写的 wine 包装，现在维护力度并不大，有几百个 issue 没人去解决。并且我遭遇了恶性 bug，因此换回 [wine](#wine)。

:::: details 不再使用

基于 wine 运行 windows 软件/游戏，比 wine 更傻瓜式（只需要点鼠标，不用写配置）。

::: code-tabs

@tab 已安装 arch-gaming-meta

```sh
paru -S bottles
```

@tab 未安装 arch-gaming-meta

```sh
paru -S bottles wine wine-mono
```

:::

然后打开 bottles，在依赖中手动安装运行库，字体等。

- bottles 可以直接运行挂载的 windows ntfs 盘里的游戏。
- 运行成功率与游戏发行时间相关：太老的游戏几乎无法游玩。
- 游玩日文游戏，windows 上需要 _locale-emulator_ 的，需要用 `LANG="ja_JP.UTF8" bottles` 参数启动 bottles。

::::

### 录音

#### GUI

其实 obs 就能录，但是有点重，我想试试其他的。

我先尝试了一下 `krecorder`，但是使用体验不算好，完全无法录音。音源把能选的都选了一遍，录音还是无法开始。

后来想用 `recordmydesktop`，结果 gtk 和 qt 前端都装不上，gtk 缺依赖包，qt 编译了半天，时间全花在输出 warning 了。

`kwave` 也能录，但是它本职不是干这个的，操作上可能不够直观。

#### CLI

然后从网上抄了一个 ffmpeg 代码，并改进了一下：

```sh
ffmpeg -f pulse -i 0 -c:a libmp3lame -b:a 128k -af "volume=0.04" pulse.mp3
```

it works.

当然，也可以用 `alsa-utils`<Badge text="extra"/> 包：`arecord -f dat test.wav`，但是又不能改音量又不支持压缩格式，显然不如 ffmpeg。

### 关于文档

众所周知文档领域基本由微软的 office 独占，而三件套又基本由 windows 独占。

在 linux 下，我尝试使用不同的替代品：

1. LibreOffice（不可用）：word 排版不同，原本一页的可能会变成两页。拿来只读还行，要写的话奉劝还是换一家。
2. WPS（不可用）：图片显示错误，还有广为诟病的粗体问题。
   - 解法（据说）：`paru -S freetype2-wps libtiff5` ([ref](https://t.me/archlinuxcn_group/3016741))
3. ONLYOFFICE：目前看来没啥太大毛病。

我一般用 typst 等排版工具生成 pdf，如果实在不行再去 windows 上用 office。不过现在看来或许也能试试 ONLYOFFICE。

### 系统监视

### 资源监视器

linux 自带的是 `top`，由此衍生出了一堆 tui `*top`。我同时使用 `btop` 和 `htop`。

- `btop`：制作精美的 TUI 资源监视器，跨平台（甚至能在 windows 上用）
- `htop`：top 加强，比较经典
- `mission-center`<Badge text="archlinuxcn"/>：GUI，类似 windows 任务管理器，重量级

#### 文件系统

`inotify` 是一个强大的监视器。

```sh
sudo pacman -S inotify-tools
```

具体使用方法 RTFM。

- `sudo inotifywait -m -r -e create --format '%w%f' /home/absolutex` 能监视目录下新创建的文件。

### 命令行历史记录

我之前一直在用 `mcfly`，它给的条数少，模糊匹配结果太差，我不满意。

后来看到[大佬博文](https://blog.lilydjwg.me/posts/216770.html)推荐的 `atuin`，迅速去下了一个用，果真好用。

```sh
sudo pacman -S atuin
atuin import auto
# then edit fish config manually
```

- 如果在 bash 使用 atuin，务必安装 bash-preexec（ble.sh 比较难用），否则[新命令将无法记录](https://forum.atuin.sh/t/atuin-bash-and-ble-sh/175)。
- 基础使用：`↑` 打开历史菜单，`Enter` 执行，`Tab` 上屏不执行；`<C-o><C-d>` 删除。
- 更多 keybindings 请前往 [doc](https://docs.atuin.sh/configuration/key-binding/#atuin-ui-shortcuts).

#### 过滤历史记录

如果你的历史记录里已经有了敏感信息，例如密码，那么 atuin 带来的方便的搜索功能可能将你置于不利地位。所以你需要添加一个 filter，并且使用其 filter 一次 history。

1. [添加 filter](https://docs.atuin.sh/configuration/config/#history_filter)：编辑 `~/.config/atuin/config.toml`。
2. 执行 `atuin history prune`。

### 代码量统计

[tokei](https://github.com/XAMPPRocky/tokei)

### 搜索

文字搜索当然是用 ripgrep，如果嫌命令行难用也可以用 vscode 打开文件夹然后全局搜索即可。

实时搜索当然是 fd，RIIR 的 find。

主要难的是按文件名的全系统索引搜索，类似 windows everything 那样。

- locate 能用，感觉还是差了点。
  - nixos 的 locate 可以简单配自动更新，还不错
- fsearch，怎么我第一次引入文件夹后就不能再往里添加路径了？
- 这些应用都不能提供实时文件变化检测，比 everything 还是差了一个级别。

### [neovim](../../coding/vim.md)

### eza

喜欢彩色的 ls 吗？

`alias ls='eza --all --long --color-scale size --binary --header --time-style=long-iso'`

原名 exa，现在活跃分支是 eza。注意该 alias 需要一定版本下才可正常工作。

### multiplexer

Terminal Multiplexer（终端复用器）并不是 linux 桌面的必需品（`konsole` / `yakuake` 都支持多标签），但是在纯命令行的服务器下，终端复用还是有点用的。主要作用是提供一组 key bindings，与持久运行的 sessions（允许 ssh 断连）。

:::: tabs

@tab Zellij

[Zellij](https://github.com/zellij-org/zellij)

Zellij 使用 rust 写成，由于其简洁的 key bindings（有常驻提示的），我使用其代替 tmux。

这玩意看提示用就行，没必要配置。性能会比 screen 和 tmux 差一点点，好看是有代价的。

虽然也有一些[其他问题](https://t.me/withabsolutex/1571)，不过现在还是优先用这个，毕竟也够用。

@tab screen

> 要不是学校的服务器，我还不知道有 screen 这玩意。

这是一个很古老的终端复用，主要作用就是 ssh 恢复，没啥其他功能。可以在低性能的服务器上用。

```sh
screen -S <name>  # 创建
screen -r <name>  # 重连
```

两行就够用了。

@tab tmux

tmux 的默认键位实在是过于诡异。

- 配置：[`~/.tmux.conf`](https://github.com/lxl66566/config/blob/bad37f53d84b8ab87dececd2e8616ed8f8596e29/.tmux.conf)，初始时没有，需要自己创建。编辑后需要重新载入：`tmux source ~/.tmux.conf` or `prefix`+`:source ~/.tmux.conf`
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

@tab tab-rs

[tab-rs](https://github.com/austinjones/tab-rs)

也是 rust 写的。screen 的替代品，专注简洁迅速。

::::

### [tlp](https://wiki.archlinux.org/title/TLP)

笔记本省电的。

```sh
paru -S tlp tlpui
sudo systemctl mask systemd-rfkill.service systemd-rfkill.socket
sudo systemctl enable --now tlp
```

效果其实挺一般的。毕竟涉及到硬件，又是像 linux 这种自由散漫的，厂家都不会主动适配。

### activitywatch

记录软件使用时长，参考[文章](../time_record.md)

### [waydroid](https://wiki.archlinuxcn.org/wiki/Waydroid)

waydroid 是 linux 上的首选 android 模拟器。不过想用还是需要折腾一阵的。

1. 切换为 zen 内核，参考[更换内核](./install_and_config.md#更换内核)
   - 也可以用 linux-lily <Badge text="archlinuxcn" /> 内核
2. 安装 waydroid，具体流程在 wiki 上有。
   - `pacman -S waydroid` 没有 Android 镜像，联网自动下载可能需要代理。

这里主要说下在 X11 下用 waydroid：需要一个 wayland 模拟器，archwiki 的主站说用 cage，CN 站说用 weston，都没有讲具体用法。我用 weston 了。后来尝试了一下 sway，结果与 nvidia 相性很差，不能正常使用。

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

### distrobox

[archwiki](https://wiki.archlinux.org/title/Distrobox)；通过容器，模拟其他的发行版。

注意，home 目录是共享的，不能当作沙盒使用。

我试着安装了一个 ubuntu 22.04，占用空间 500M 左右。

## external

1. [A curated list of command-line utilities written in Rust](https://github.com/sts10/rust-command-line-utilities) | [awesome-rewrite-it-in-rust](https://github.com/j-m-hoffmann/awesome-rewrite-it-in-rust)
2. [一些现代化的 linux 命令](https://www.entropy-tree.top/2023/07/24/modern-linux-commands/)
