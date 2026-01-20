---
date: 2023-11-17
icon: house-tsunami
category:
  - 教程
tag:
  - 网络
  - 协议
---

# Hysteria

[Hysteria](https://v2.hysteria.network/zh/) 是一个 Go 写的代理协议/工具，基于 QUIC/HTTP 3。

优势：

- 这玩意文档写的**很好**，自己写配置也非常简单。
- 自带了网页伪装、自动 `acme.sh` 签证书等功能，~~即使不用代理也能当成[反代](../reverse_proxy.md)来用~~。
- QUIC 豁免机制方便利用。

劣势：

- 其 Brutal 拥塞控制算法[非常凶猛霸道](https://v2.hysteria.network/zh/docs/misc/Hysteria-Brutal/#q-hysteria_1)，容易被 IDC 警告，被本地网络 QOS，因为确实太像被攻击了。[src](https://www.youtube.com/watch?v=kTYfclAzy38)
  - 因此我使用 bbr 而不是 Brutal。
- 不只是拥塞控制算法，UDP 本身也容易被丢包。

## QUIC 豁免

2025 年的一篇 [《揭示并绕过中国防火长城基于 SNI 的 QUIC 封锁机制》](./index.md#external) 大幅提高了 hysteria2 的地位：QUIC 流量拥有豁免机制，在一众代理协议中脱颖而出。

最容易利用的豁免机制是 **源端口 <= 目标端口**。只需要使用 nftables 或其他流量转发机制，将 VPS 的高位端口 inbound 转发到 hysteria2 的真实低位端口，即可实现双向 QUIC 流量均被豁免。由于代理软件通常也使用高位端口，因此 VPS 上的端口号需要设成极端的高（我使用 65533）；而 hysteria2 的低位端口最好也要设得更低。

```nftables
table inet nat {
  chain prerouting {
    type nat hook prerouting priority -100; policy accept;
    # 将外部流入的流量从 65533 端口重定向到 5497 端口
    tcp dport 65533 redirect to :5497
    udp dport 65533 redirect to :5497
  }
}
```

## 服务器配置

安装 hysteria2 后，随便创一个 json 或 yaml，写入配置。具体怎么写配置建议看文档，讲的挺详细的。

这里给出我的配置，仅供参考；使用之前签过的证书，我的博客做伪装（）。

```json
{
  "auth": { "password": "xxx", "type": "password" },
  "ignoreClientBandwidth": true,
  "listen": ":5497",
  "masquerade": { "proxy": { "rewriteHost": true, "url": "https://absx.pages.dev" }, "type": "proxy" },
  "quic": { "maxIncomingStreams": 50000 },
  "tls": { "cert": "/var/cert/xxx.crt", "key": "/var/cert/xxx.key" }
}
```

然后用 `hysteria server --config your-config.json` 就能跑了。当然，你还需要保活。如果你的包管理有帮忙装 `hysteria-server` 服务就用包管理的来跑，没有的话，自己写 systemd service 或者用 [multiplexer](../linux/package.md#multiplexer) 保活都行。

我在启动服务时遇到了一些问题。

1. 即使在 root 下运行，仍然提示权限不足无法读取证书文件。
   - 尝试编辑 `.service` 文件，删除 `group`，将 `User` 改为 `root`，无效。
   - 尝试把证书移到 `/etc/hysteria` 下。
   - 后续又折腾一阵，发现需要 `chmod +rwx 证书文件` 才行。（只 `+x` 是不行的）
2. 在 debian 上这样启动服务没啥问题，然而在 archlinux 上就不行了。
   - AUR 的 `hysteria-bin` 包安装的证书在 `/usr/lib/systemd/system`，名字是 `xxx@.service`，根据 [wiki](https://wiki.archlinux.org/title/systemd#Using_units) 所述是模板文件，需要传参。直接 `systemctl start hysteria-server` 是不行的，只会提示 _unit not found_。因此需要自己读 service，理解那个传参的意思。

然后就是客户端了。

## 客户端使用

虽说可以按照官方教程启动一个客户端服务，但是一个黑窗口一直最小化运行比较丑。

### Windows

::: details archived

V2rayN 以内核插件形式支持 hysteria。

1. 从 Release 下载 `.exe` 内核，放入 V2rayN 文件夹的 `bin/hysteria` 下。注意可能需要重命名为 `hysteria.exe`。
2. 打开 V2rayN，_添加自定义配置服务器_，_地址_ 选择客户端的配置文件，_Core 类型_ 选择 `hysteria`。

然后就可以愉快地使用了。我的客户端配置文件参考：

```yml
server: <url>:<port>
auth: ***********
socks5:
  listen: 127.0.0.1:1080
http:
  listen: 127.0.0.1:8000
obfs:
  type: salamander
  salamander:
    password: ************
```

> ps. V2rayN v6.23 亲测可用；而 v6.30 虽然加入了官方 hysteria2 支持，但在 sing-box 内核相同配置下测试不可用。

:::

V2rayN v6.30 后原生支持 hysteria2 协议。虽然在初期有些问题，但是到了 v7.x 以后就没啥问题了。

### Linux

我在 linux 上使用 [daed](./proxy_software.md#daed)，~~然而其[尚未支持且不打算支持 hysteria 协议](https://github.com/daeuniverse/dae/issues/48)。~~

:::: details 后来还是支持了哈哈哈，下文作废

不过我们可以本地开一个 hysteria client，通过 http 或 socks5 再接入 daed。

1. 下载
   ::: tabs
   @tab AUR
   archlinux 可以从 AUR 下载：`paru -S hysteria-bin`
   @tab 使用脚本
   [见文档](https://v2.hysteria.network/zh/docs/getting-started/Installation/#linux)
   :::
2. 写好配置文件。
3. 启动 client 服务。
   ::: tabs
   @tab AUR
   从 AUR 安装 hysteria 是服务端和客户端一体的，因此会安装两个**服务模板**，使用时需要传入字符串指定配置文件。例如，我需要使用 `/etc/hysteria/server.yaml` 则需要 `systemctl enable --now hysteria-server@server`。要用 client 同理。
   @tab 使用脚本
   `systemctl enable --now hysteria-server`
   :::
4. 在 daed 中手动添加 socks5 节点，使用配置文件端口。

::::

### Android

::: details archived

NekoBox (v1.2.9) 号称支持，~~实测不可用~~。windows 上测了能用的配置，放在 NekoBox 上用不了。

后来我换了个 japan 的 vps，试了下，居然又能用了？？服务端版本相同，配置也没变，就改个服务器地址，我不好说。

测了一下其他软件，SagerNet 安装了[插件](https://github.com/SagerNet/SagerNet/releases/tag/hysteria-plugin-1.3.5)，然而 _专有设备供应商篡改了你的安卓系统，使该插件无法使用_，我又不好说了。

:::

2025 年了，[sing-box 系](./proxy_software.md#sing-box-系)的全都原生支持 hysteria2 了。

## 总结

- 这是我第一次直接写配置文件部署一个协议，以前都是一键脚本。
- 任何协议都吃代理软件支持，hysteria 的适配在一众代理内算比较出众的。2024-2025 年 hysteria2 的可用性比起两年前上升了很多。
- 基于 QUIC 的代理协议挺多，hysteria 据说打不过 TUIC，但是现在 TUIC 跑路了（乐）。

## 遇到的问题

### too many open streams

此事在 [issue](https://github.com/apernet/hysteria/issues/1073) 中均有记载。由于 sing-box 会开大量端口进行通信，很容易超过 hysteria2 默认的 `maxIncomingStreams: 1024` 限制，因此需要在服务端将此值调大。

### no route to host

前一秒还正常使用的 hysteria 连接，立刻变得无法使用了。

NekoBox 报错：`...cloudflare.com INTERNAL_ERROR(local):read udp ...: read: no route to host.`，客户端报 `FATAL failed to initialize client {"error": "connect error: timeout: no recent networkactivity"}`。

重启服务器就行了。感觉可能是网络波动吧。
