---
date: 2023-11-25
icon: circle-check
category:
  - 推荐
  - 教程
tag:
  - 桌面端
  - 移动端
  - 网络
---

# 代理客户端选择

有关于各代理客户端的性能 benchmark，请看[这里](https://docs.google.com/spreadsheets/d/1UaWU6nNho7edBNjNqC8dfGXLlW0-cm84MM7sH6Gp7UE/edit?pli=1&gid=1965963111#gid=1965963111)。

## Clash 系

> 20231102-20231103 Clash 系几乎全部删库跑路。虽然也有一些 fork 版本接手就是了。  
> 不过我不推荐使用，除非你用的是只提供 clash 配置的机场。

::: details

### [Clash Verge](https://github.com/zzzgydi/clash-verge)

开源跨平台 Clash 客户端，rust + tauri 使我非常放心。

相比[Clash for Windows](#clash-for-windows)，其拥有更小的体积（66MB，vs 240MB）与开放性，图形界面不相上下，而<span class="heimu" title="你知道的太多了">对于一般使用者无关紧要的</span>功能会更少一些。

其 _设置热键_ 的功能也是我非常喜欢的一点。不过由于 VPS 自建节点的原因，懒得做订阅转换，放弃了 Clash Verge 而去使用了 [v2rayN](#v2ray)。

#### 简易教程

我们可以先在设置中将其语言调成中文。

类似地，在 _配置_ 中粘贴订阅链接，下载并选中，然后就可以在 _代理_ 中使用节点了。记得在 _配置_ 中打开 _系统代理_ 选项。

### Clash for Windows

#### 简介

_Clash for Windows_ 是闭源的 PC 客户端。（然而因为一个 [bug](https://github.com/Fndroid/clash_for_windows_pkg/issues/1105)导致我转向了 [Clash Verge](#clash-verge)。）

#### 下载地址

[项目地址](https://github.com/Fndroid/clash_for_windows_pkg) | [PC 端下载地址](https://github.com/Fndroid/clash_for_windows_pkg/releases) | [私链](https://wwp.lanzout.com/ixncj0a1k28h)

#### 优势

- 优秀图形界面
- 简单易上手

#### 简易配置教程 _v0.19.16_

1. 在 Profiles 中的文本框内粘贴订阅链接并下载。选中下载的配置文件。
2. 进入 Proxies，选择 rule，点击测速图标并在下方选择一个可用节点。
3. 进入 General，开启 System Proxy。

#### 一些提示

- [这里](https://github.com/BoyceLig/Clash_Chinese_Patch)提供 clash 的汉化。
- 在节点界面点击测速图标测试全部节点的连通性
- 建议设置配置文件自动更新（Profiles -> 右击配置文件 -> Settings -> Update Interval 设为 24）

### Clash For Android

> 20231103 继 CFW 删库后，Clash 内核与 Meta 核均删库跑路。

请前往谷歌商店或[前往 github 下载](https://github.com/Kr328/ClashForAndroid/releases)。[私链](https://wwp.lanzout.com/iL6sD03mi0gf)

### 其他

- [Yacd-meta](https://github.com/MetaCubeX/Yacd-meta)
- [神秘模块](https://xrhexo.netlify.app/posts/1542838017/)：magisk module
- [虚空代理](https://github.com/ModuleList/akashaProxy)：magisk/kernelsu module

:::

## V2ray 系

### [V2rayN](https://github.com/2dust/v2rayN)

V2rayN 是 V2ray 的 windows 前端，支持自定义协议，也可以更换内核。

相比于 clash，v2ray 主战场在自建节点的方向。由于 clash 订阅本质上是一组节点+规则，单个特定协议的节点无法直接导入 clash，因此使用 v2ray <span class="heimu" title="你知道的太多了">能手搓配置文件的当我没说</span>。但是 v2ray 也能使用 clash 配置文件。

1. 前往 PC 客户端项目地址，下载 `v2rayN-With-Core.zip`。（我以前是自己配内核的，但是后来发现问题太多了，还有跨版本兼容性，真不如 with core）
2. 复制节点地址，按 `Ctrl+V` 导入，按 `Enter` 激活。
3. 测试真连接延迟，确保节点有效。
4. 下方 _系统代理_ 处选择 _自动配置系统代理_，开启代理。

若为订阅链接：

1. 点击加号，在订阅分组设置中，将订阅链接填入 URL。别名随便写。
2. 订阅分组 - 更新全部订阅
3. 一键测延迟/速度，选择节点双击激活。
4. 同上方 4.

#### 注意事项

- 在 v2rayN 7.3 及以上版本，bbr2 可能会导致其不可用。可以尝试关闭 bbr2。

### v2rayA

v2rayA 是一个跨多平台的代理客户端。它有一个易于使用的网页面板，对于初入 linux 的 user 是非常友好的；它也支持透明代理、分流规则、订阅链接等。

安装：

::: tabs
@tab archlinux

```sh
sudo pacman -S v2raya
sudo v2raya
# 也可以不用 sudo：`v2raya --lite`
# fishshell
set -Ux ALL_PROXY "http://127.0.0.1:20172"  # 必须加 -x, 否则系统代理无效
```

如果需要后台运行，开机自启，可以参考[文档](https://v2raya.org/docs/advanced-application/noroot/)：`systemctl --user enable --now v2raya-lite.service`。

用 sudo 和不用 sudo 的区别主要是透明代理的支持。显然 `--lite` （无需 sudo）是不能开透明代理的。

@tab OpenWRT

<https://v2raya.org/docs/prologue/installation/openwrt/>，讲得非常清除。注意需要安装 `xray-core`。

:::

之后的操作都在网页上 (`127.0.0.1:2017`) 进行。

- 如果你不开透明代理，则代理端口最好使用 `http://127.0.0.1:20172`，这个端口带有分流。
- 如果你开启透明代理，可以将分流规则选成 [RoutingA](https://v2raya.org/docs/manual/routinga/)，然后透明代理分流与端口分流一致。这样方便自定义直连或代理的规则。

### V2rayNG

v2ray 的 Android 前端。

### [NekoRay](https://github.com/MatsuriDayo/nekoray)

基于 Qt 的代理前端，支持 V2ray & sing-box 内核。

> 记得好像有停更过一阵子，仓库提交记录是 2022 开始的，找不到。

### qv2ray

2017 年左右的很多油管教程都会推荐 qv2ray。qv2ray 停止维护过一段时间(?)，但是我在 2024 年看的时候是有人接手维护的。我没用过。

## sing-box 系

_sing-box 系_ 指基于 sing-box 内核的一堆代理软件。sing-box 号称是 _The universal proxy platform_，以支持的协议多闻名。

缺点就是 bug 也多。

- [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid)：Matsuri 的继任，Android 端的好选择。
- [Matsuri](https://github.com/MatsuriDayo/Matsuri)：项目已 archived。之前用过一阵，后面换回 V2rayNG 了。
- [SagerNet](https://github.com/SagerNet)：前两位的 base。试了一下 hysteria 插件，不可用，遂无兴趣。
- [husi](https://github.com/xchacha20-poly1305/husi)：内置各种小众协议插件的 NekoBox。

并且观测到一个很有趣的现象：在 Android 上，成功（以打断 V2rayNG 方式?）启动过 sing-box 后，之后的 V2rayNG 启动连接的速度会变慢，变为需要约 1s-2s+。

## [daed](https://github.com/daeuniverse/daed)

> 根据 dae 的官方测试，（与 v2raya 相比）确实是基于 eBPF 的 dae 速度更快，但不是快特别多
> ::: right
> ——Au, [src](https://t.me/archlinuxcn_group/2912643)
> :::

daed 是网页面板的开源代理软件，[dae](#dae) 的前端，而 dae 基于 eBPF[^1]，仅支持 linux。由于比较新，目前使用的人不多。

[^1]: [What is eBPF?](https://ebpf.io/what-is-ebpf/)

这是我目前用过的**最舒服**的代理软件，可以**维护多个节点池**，对于池中节点取最小延迟使用，并能根据不同规则进行节点池分流。例如香港不能用 tg，那就多建一个节点池，加一条分流规则就行。

1. 安装：
   ```sh
   sudo pacman -S daed
   sudo systemctl enable --now daed # 启动，并设为开机自启
   ```
2. 浏览器进入 `localhost:2023`
3. 一路确定。例如数据库后端使用默认值：`http://127.0.0.1:2023/graphql`，首次登录会要求设账号密码，设一个即可。
4. 导入节点信息，拖拽到左侧 proxy 即可。

踩坑：

1. daed 默认使用透明代理，没有 socks/http 端口。如果有设置 `ALL_PROXY` 等系统代理变量记得取消；firefox 需要在代理设置中设为 _自动探测网络环境_。
2. ~~务必将 _配置 - global - 连接选项 - 拨号模式_ 设为 _ip_（默认值）。否则可能无法使用 chatgpt。~~ 经测试，非此问题。

需要写规则可以参考[这里](https://github.com/daeuniverse/dae/discussions/245#discussioncomment-6575522)。

软件数据存储在 `/etc/daed/wing.db`（sqlite 数据库），如果需要备份、改账号密码，需要先给 rw 权限，然后用数据库软件更改。

daed 的一个缺点是无法主动测试节点连通性。但是 daed 默认每 30s 会测试一次节点延迟，你可以 `journalctl -eu daed` 查看其日志，获取信息。

## [dae](https://github.com/daeuniverse/dae)

在 NixOS 上 nixpkgs 没有 daed 的包，只有 dae 能够直接使用。而 dae 官方提供了一个 [flake.nix](https://github.com/daeuniverse/flake.nix) 配置（包含 dae 和 daed），我现在推荐使用此 flake，因为 flake 的版本更新，也包含了最新的 bug 修复；但是我之前[踩了这玩意一个坑](https://github.com/daeuniverse/flake.nix/issues/103)，因此在 bug 解决之前我还是回退到 nixpkgs 的 dae。

不使用 daed 还有一个原因：不符合 NixOS 的确定一切的思想。特定位置存的 sqlite 总归是不如用 git 管理配置文件的。

我已经用了很长一段时间的 daed，写 dae 配置文件可以说是非常简单；而且 dae 的官方教程确实非常不错，把 [example](https://github.com/daeuniverse/dae/blob/main/example.dae) 下载下来对着改就行，内含丰富注释。这里由于隐私问题，我并未把我的配置公开，而是加密后上传到 github。

改完配置以后，直接在 `configuration.nix` 中写：

```nix
services.dae = {
  enable = true;
  configFile = "<your/config/file/path>";   # 必需是绝对路径字符串，看我的踩坑
  assets = with pkgs; [
    v2ray-geoip
    v2ray-domain-list-community
  ];
};
```

rebuild 后重启即可（不直接生效，是 eBPF 的特性？）。这分流不比 v2rayA 爽多了？

当然，如果你的配置主目录不一定在 `/etc/nixos` 下，使用绝对路径确实不算明智。这时候可以用一个比较脏的方法，监听 config 的改动，并且每次改动时将最新版本复制到特定绝对路径里。

```nix
# configuration.nix
dae = {
  enable = true;
  # dae needs 0600 permission, but we cannot source file with permission.
  # related issue: https://github.com/nix-community/home-manager/issues/3090
  configFile = "/home/absx/.config/absx_.dae";
  assets = with pkgs; [
    v2ray-geoip
    v2ray-domain-list-community
  ];
};

# home.nix
home.file = {
  ".config/absx.dae" = {
    source = ./config/absx.dae;
    onChange = ''
      rm -f ~/.config/absx_.dae
      cp ~/.config/absx.dae ~/.config/absx_.dae
      chmod 0640 ~/.config/absx_.dae
    '';
  };
};
```
