---
date: 2023-11-17
icon: proxy
category:
  - 教程
tag:
  - 网络
---

# Hysteria

[Hysteria](https://v2.hysteria.network/zh/) 是一个比较新的代理协议，基于 QUIC/HTTP 3。其 Brutal 拥塞控制算法[非常凶猛](https://v2.hysteria.network/zh/docs/misc/Hysteria-Brutal/#q-hysteria_1)。

这玩意文档写的很好，自己写配置也非常简单。其自带了网页伪装、自动 `acme.sh` 签证书等功能，~~即使不用代理也能当成[反代](./reverse_proxy.md)来用~~。

## 服务器配置

安装 hysteria2 后，编辑 `/etc/hysteria/config.yml`，写入配置。

具体怎么写配置建议看文档，讲的挺详细的。这里给出我的配置，使用之前签过的证书，我的静态博客做伪装（）。然后国内(?)的 QUIC 网络环境非常差（亲测），因此设置 `obfs` 退化成了伪装 UDP。

伪装的网页当然也是开启了 HTTP3 的。

```yml
listen: :12139
tls:
  cert: /etc/hysteria/a.cer
  key: /etc/hysteria/a.key
auth:
  type: password
  password: ***********
masquerade:
  type: file
  file:
    dir: <static_file_location>
  listenHTTP: :80
  listenHTTPS: :443
  forceHTTPS: true
obfs:
  type: salamander
  salamander:
    password: ************
```

然后需要[启动](./linux/basic.md#服务) `hysteria-server` 服务，并检查是否启动成功。我在启动服务时遇到了一些问题。

1. 即使在 root 下运行，仍然提示权限不足无法读取证书文件。
   - 尝试编辑 `.service` 文件，删除 `group`，将 `User` 改为 `root`，无效。
   - 尝试把证书移到 `/etc/hysteria` 下，有效。

然后就是客户端了。

## 客户端使用

虽说可以按照官方教程启动一个客户端服务，但是一个黑窗口一直最小化运行比较丑。

### Windows

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

### Linux

我在 linux 上使用 [daed](./linux/install_and_config.md#daed)，然而其[尚未支持且不打算支持 hysteria 协议](https://github.com/daeuniverse/dae/issues/48)。而官方使用样例的黑窗口问题虽然可以写一个 service 绕过，但是没有透明代理会比较难受（官方透明代理教程是相对复杂的，包括创建新 user，写路由规则和 iptables）。

### Android

NekoBox (v1.2.9) 号称支持，实测不可用。
