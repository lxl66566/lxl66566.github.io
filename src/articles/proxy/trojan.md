---
date: 2023-11-26
icon: passport
category:
  - 教程
tag:
  - 网络
  - 协议
---

# Trojan

trojan 协议是一个广泛使用的，伪装成明确特征的 https 流量的协议，直接利用了现有的 tls 加密。

广泛使用的 trojan 服务端主要有三种实现：原版 trojan，trojan-go 和 sing-box。

## [原版 trojan](https://github.com/trojan-gfw/trojan)

trojan repo 的上一次 commit 是 2020 年，已经死透了。

### 安装

:::tabs
@tab archlinux

```sh
pacman -S trojan
```

:::

配置文件在 `/etc/trojan/config.json`，内部已有一个模版，[稍作修改](https://trojan-gfw.github.io/trojan/config)即可使用。

首次启动建议先 `trojan /etc/trojan/config.json` 测试配置文件是否正确。若正确，启动服务 `trojan.service` 即可。

## [trojan-go](https://github.com/p4gefau1t/trojan-go)

trojan-go 是 trojan 的 go 实现，兼容原版。trojan-go repo 的上一次 commit 是 2021 年，也死透了。由于 trojan-go 死得晚一点，被收录在了 nixpkgs 里，所以现在用 NixOS 作服务器的我还偶有使用。

### [服务端配置](https://p4gefau1t.github.io/trojan-go/basic/config/)

trojan-go 的配置又是一个简洁的典范。

1. 安装。
   ::: code-tabs
   @tab archlinux
   ```sh
   paru -S trojan-go-bin
   ```
   其会默认安装两个服务，分别为 `trojan-go.service` 和 `trojan-go@.service`，~~有效防止 archlinux 新手不会启动 template unit 的尴尬~~。
   :::
2. 配置。
   编辑 `/etc/trojan-go/config.json`：
   ```json
   {
     "run_type": "server",
     "local_addr": "0.0.0.0",
     "local_port": 12138,
     "remote_addr": "127.0.0.1",
     "remote_port": 80,
     "password": ["**********"],
     "ssl": {
       "cert": "...",
       "key": "...",
       "fallback_port": 80
     },
     "mux": {
       "enabled": true
     },
     "router": {
       "enabled": true,
       "bypass": ["geoip:cn", "geoip:private", "geosite:cn", "geosite:private"],
       "block": ["geosite:category-ads"],
       "proxy": ["geosite:geolocation-!cn"],
       "default_policy": "proxy",
       "geoip": "/usr/share/trojan-go/geoip.dat",
       "geosite": "/usr/share/trojan-go/geosite.dat"
     }
   }
   ```

然后就可以愉快地使用了。

## [sing-box](https://github.com/SagerNet/sing-box)

sing-box 是一个现代、多协议、高性能的服务端 + 客户端。自然我们也可以使用 sing-box 来部署 trojan 服务。

具体配置我就不说了，2026 年直接让 AI 写吧。

一些服务端部署提示：

- sing-box 的 trojan 协议支持 `multiplex` 多路复用，建议开启。这是原版 trojan、trojan_go 都做不到的。
- `tcp_fast_open` 也建议开启。

## 客户端

trojan 协议广泛使用，基本所有的客户端实现都支持 trojan。

关于 trojan-go，在 Android 端可以用 [NekoBox](./proxy_software.md#sing-box-系)，不过需要[下载插件](https://matsuridayo.github.io/m-plugin/)。（F-Droid 下载地址已失效，插件不再更新）

trojan 的一些客户端设置注意事项：

- trojan 是基于 TLS 的代理，必须要有一个域名。如果使用域名作为代理地址，则不需要填写 SNI；如果使用 IP 作为代理地址则必须填写 SNI。
- fingerprint 建议设成 chrome/firefox。如果用 randomize 可能遇到 _tls: CurvePreferences includes unsupported curve_ 的问题。
- 如果服务端和客户端都启用了多路复用，建议开启 ALPN，并包含 HTTP/2。
