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

在 [iStoreOS](./linux/openwrt.md) 软路由上部署了应用后，我需要一个内网穿透让我在任何地点都能连上应用。因此我尝试了几个内网穿透工具，并在此做一个简单的评价。

需求：免费，稳定。

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

## zerotier

[据说](https://openwrt.org/docs/guide-user/services/vpn/zerotier) openwrt 是有 zerotier 的软件包的，但是我在 iStoreOS 里一点也找不到，不知道是 iStoreOS 的 fork 问题还是 opkg 的问题。

然后我想直接下载 binary，结果发现[下载页面](https://www.zerotier.com/download)里只有 rpm/deb 系的，Github release 里也找不到 binary。合着其他发行版就不配装你的程序了？

而且 zerotier 几个产品之间关系也比较混乱，一会儿把你推去 zerotier One，一会儿又踢回 zerotier，但是我没空，也没兴趣了解它们之间的关系。

## [rathole](https://github.com/rapiz1/rathole)

rathole 是一个 Github 开源项目，本身并不提供内网穿透的服务器；它需要在一台有公网 IP 的服务器上部署转发程序（server），并在内网服务器上部署 client。其实也就是相当于部署一个代理了。不过好在它的配置非常简单，只要写端口就行；而且是 Rust 写的，有编程语言原神之力加持，所以我还是尝试了一下。

程序很容易就跑起来了，唯一的问题是开机自启。公网服务器上是正常发行版（systemd），这个还好写，我之前做过一个 [user-startup-rs](https://github.com/lxl66566/user-startup-rs)的程序，可以做到一键自启。但是 iStoreOS 用的是 procd，老式的 service 命令写服务，这 service 里还大量调用了 OpenWRT 的接口，学习成本和心智负担都不可忽视。

service 写完，可以跑起来了，结果实际使用时还整天断连，稳定性非常低。我猜测是 service 写出了问题，然而这又不像 systemd 接 journal，没有日志输出，调试非常不便。

同时因为我的公网服务器大多是月抛小鸡，每个月都要修改配置还是非常麻烦的，最后还是放弃了。

## tailscale

很早以前用过，给我宿舍电脑做 ssh 穿透。感觉延迟还是有一点高的，稳定性也差了点。
