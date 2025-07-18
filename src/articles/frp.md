---
date: 2024-12-04
icon: slash
category:
  - 推荐
  - 教程
  - 评价
tag:
  - Linux
  - 桌面端
---

# 内网穿透

1. 在 [iStoreOS](./linux/openwrt.md) 软路由上部署了应用后，我需要一个内网穿透让我在任何地点都能连上应用。需求：免费，稳定。
2. 我希望使用自定义化的[远程控制](./control.md)方案。（高级）需求：虚拟组网，P2P

## cloudflare tunnel（推荐）

折腾完了其他几个服务我才想到 cloudflare，一搜，果然有。

cloudflare 的内网穿透是部署最简单，使用体验最好的服务，杀死了所有其他 frp 玩家。

1. 前往 [cloudflare zero trust](https://one.dash.cloudflare.com/)，左侧选择 _Networks - Tunnels_，创建一个新的 tunnel。
2. 根据提示在服务器上安装 cloudflared。提示中的 Linux 部分只包含了 rpm/deb 系，但是没有关系，直接到 [Github cloudflared](https://github.com/cloudflare/cloudflared) 的 release 中下载对应架构 binary 文件。
3. 执行 cloudflare 步骤里带有 token 的命令。

就这么简单，可以说一行命令完成内网穿透也不为过。而且你永远可以相信 cloudflare 的延迟和稳定性。

不过 cloudflared 在 [procd](./linux/openwrt.md#服务) 系统上只会将 service 写入 `/etc/init.d/cloudflared`，并不会开机自启。如果需要开机自启，需要手动创建一个软链接：

```sh
cd /etc/rc.d && ln -s ../init.d/cloudflared ./S99cloudflared
```

## [easytier](https://easytier.cn/)

类似 zerotier 等的组网软件，免费，对国内有优化。而且是 rust 写的。我没有用过，不过可以 mark 一下。

> 和 zerotier、tailscale 故意区分了不同端相比，easytier 是全对等的。包括官方的公益节点也是普通 peer，所有 peer 都可以传递信令、组织网络、中转流量。——Losarch

## zerotier

[据说](https://openwrt.org/docs/guide-user/services/vpn/zerotier) openwrt 是有 zerotier 的软件包的，但是我在 iStoreOS 里一点也找不到，不知道是 iStoreOS 的 fork 问题还是 opkg 的问题。

然后我想直接下载 binary，结果发现[下载页面](https://www.zerotier.com/download)里只有 rpm/deb 系的，Github release 里也找不到 binary。合着其他发行版就不配装你的程序了？

zerotier 软件 UI 也都比较古老，网页不清晰，几个产品之间关系也比较混乱，一会儿把你推去 zerotier One，一会儿又踢回 zerotier，但是我没空，也没兴趣了解它们之间的关系。

之后我在被控端和受控端安装了 Zerotier One，然后将几个节点加入网络，我居然还不能直接从 Android 节点拿到被控端的 IP，要我登录网页去看。网页里也不显示 hostname，分不清设备。然后发现如果用 private 网络，我的几个节点都过不了 auth，呃呃，软件里哪有 auth 功能。只好在面板里把网络设成 public。

尝试远控，质量比 Tailscale 好点，但是还是达不到我的标准。码率不足，延迟 1s 以上。

## [rathole](https://github.com/rapiz1/rathole)

rathole 是一个 Github 开源项目，本身并不提供内网穿透的服务器；它需要在一台有公网 IP 的服务器上部署转发程序（server），并在内网服务器上部署 client。其实也就是相当于部署一个代理了。不过好在它的配置非常简单，只要写端口就行；而且是 Rust 写的，有编程语言原神之力加持，所以我还是尝试了一下。

程序很容易就跑起来了，唯一的问题是开机自启。公网服务器上是正常发行版（systemd），这个还好写，我之前做过一个 [user-startup-rs](https://github.com/lxl66566/user-startup-rs)的程序，可以做到一键自启。但是 iStoreOS 用的是 procd，老式的 service 命令写服务，这 service 里还大量调用了 OpenWRT 的接口，学习成本和心智负担都不可忽视。

service 写完，可以跑起来了，结果实际使用时还整天断连，稳定性非常低。我猜测是 service 写出了问题，然而这又不像 systemd 接 journal，没有日志输出，调试非常不便。

同时因为我的公网服务器大多是月抛小鸡，每个月都要修改配置还是非常麻烦的，最后还是放弃了。

## Tailscale

Tailscale 与 其开源实现 headscale 都是老牌的虚拟组网工具。Tailscale 免费版可以虚拟组网 100 台设备。安装很简单，对应平台下载安装包，登录就行。

但是实测下来，串流效果很差，视频完全无法显示。我猜这个组网并不是 P2P 的，免费服务器的带宽不够，无法承载串流流量。

Tailscale 还有一点不好用的地方，就是打开 Android APP 就要启动 VPN service，而不是手动点 connect 时启动。

## NetBird

官网看着很现代化，让我抱有了一丝不切实际的希望。结果连接稳定性极低，进去以后也是码率不足黑屏。并且和 zerotier 一样也是无法在 APP 内看 IP。
