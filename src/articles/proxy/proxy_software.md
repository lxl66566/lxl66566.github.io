---
date: 2023-11-25
icon: tool
category:
  - 推荐
  - 教程
tag:
  - 桌面端
  - 移动端
  - 网络
---

# 代理软件选择

## Clash 系

> 20231102-20231103 Clash 系几乎全部删库跑路。因此非必要不推荐使用。

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

:::

### 其他

- [Yacd-meta](https://github.com/MetaCubeX/Yacd-meta)

## V2ray 系

### [V2rayN](https://github.com/2dust/v2rayN)

V2rayN 是 V2ray 的 windows 前端，支持自定义协议，也可以更换内核。

相比于 clash，v2ray 主战场在自建节点的方向。由于 clash 订阅本质上是一组节点+规则，单个特定协议的节点无法直接导入 clash，因此使用 v2ray <span class="heimu" title="你知道的太多了">能手搓配置文件的当我没说</span>。但是 v2ray 也能使用 clash 配置文件。

1. 前往 PC 客户端项目地址，下载
   - 可以选择下载 `v2rayN-With-Core.zip`，最为简单无脑。
   - With Core 体积太大了，我选择自己配置内核。则需要在内核项目地址下载内核后，解压放入 `/v2rayN/bin/v2fly_v5` 下。
     根据项目提示，我还下载了 [Xray-core](https://github.com/XTLS/Xray-core) 放入 `/v2rayN/bin/Xray`。<span class="heimu" title="你知道的太多了">应该不会有人把解压后的整个文件夹丢进去吧</span>
2. 复制节点地址，按 `Ctrl+V` 导入，按 `Enter` 激活。
3. 测试真连接延迟，确保节点有效。
4. 下方 _系统代理_ 处选择 _自动配置系统代理_，开启代理。

若为订阅链接：

1. 点击加号，在订阅分组设置中，将订阅链接填入 URL。别名随便写。
2. 订阅分组 - 更新全部订阅
3. 一键测延迟/速度，选择节点双击激活。
4. 同上方 4.

### V2rayNG

v2ray 的 Android 前端。

### [NekoRay](https://github.com/MatsuriDayo/nekoray)

基于 Qt 的代理前端，支持 V2ray & sing-box 内核。

> 记得好像有停更过一阵子，仓库提交记录是 2022 开始的，找不到。

### v2raya

v2raya 的质量其实一般（感觉 v2ray 内核速度比我的 windows V2rayN 用的 [Xray 内核](https://xtls.github.io/)差）。但是目前还不想直接写内核配置文件（等契机），qv2ray 又停止维护，所以没得选。（后面逃到 daed 了）

```sh
sudo pacman -S v2raya
v2raya --lite
# fishshell
set -Ux ALL_PROXY "http://127.0.0.1:20172"  # 必须加 -x, 否则系统代理无效
```

之后的操作都在网页上进行。使用系统代理端口为 `http://127.0.0.1:20172`，这个端口带自动分流。

如果需要后台运行，开机自启，可以参考[文档](https://v2raya.org/docs/advanced-application/noroot/)：`systemctl --user enable --now v2raya-lite.service`

## sing-box 系

_sing-box 系_ 指基于 sing-box 内核的一堆代理软件。sing-box 号称是 _The universal proxy platform_，以支持的协议多闻名。

缺点就是 bug 也多。

- [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid)：Matsuri 的继任，Android 端的好选择。
- [Matsuri](https://github.com/MatsuriDayo/Matsuri)：项目已 archived。之前用过一阵，后面换回 V2rayNG 了。
- [SagerNet](https://github.com/SagerNet)：前两位的 base。试了一下 hysteria 插件，不可用，遂无兴趣。

并且观测到一个很有趣的现象：在 Android 上，成功（以打断 V2rayNG 方式?）启动过 sing-box 后，之后的 V2rayNG 启动连接的速度会变慢，变为需要约 1s-2s+。

### [daed](https://github.com/daeuniverse/daed)

> 根据 dae 的官方测试，（与 v2raya 相比）确实是基于 eBPF 的 dae 速度更快，但不是快特别多
> ::: right
> ——Au, [src](https://t.me/archlinuxcn_group/2912643)
> :::

daed 是网页面板的开源代理软件，dae 的前端，而 dae 仅支持 linux。由于比较新，目前使用的人不多。

它是我目前用过的**最舒服**的代理软件，可以**维护一个节点池**，根据不同规则进行分流。例如香港不能用 tg，那就加一条规则就行。

```sh
sudo pacman -S daed
sudo systemctl enable --now daed
```

这样就开机自启，并可以 `localhost:2023` 进面板了。然后写节点，拖到 proxy 里就行。

daed 默认使用透明代理，没有 socks/http 的端口。如果有设置 `ALL_PROXY` 等系统代理变量记得取消；firefox 需要在代理设置中设为 _自动探测网络环境_。

需要写规则可以参考[这里](https://github.com/daeuniverse/dae/discussions/245#discussioncomment-6575522)。
