---
date: 2023-11-25
icon: proxy
category:
  - 教程
tag:
  - 网络
  - 协议
---

# [Trojan-Go](https://github.com/p4gefau1t/trojan-go)

trojan-go 是 trojan 的 go 实现，兼容原版。

## [服务端配置](https://p4gefau1t.github.io/trojan-go/basic/config/)

trojan-go 的配置又是一个简洁的典范，几乎不逊色于 hysteria。

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

## 客户端

由于 trojan 协议广泛使用，因此是个客户端基本都支持。

而关于 trojan-go，在 Android 端可以用 [NekoBox](./proxy_software.md#sing-box-系)，不过需要[下载插件](https://matsuridayo.github.io/m-plugin/)。（F-Droid 下载地址已失效，插件不再更新）

## 遇到的问题

一觉醒来，trojan-go 寄了。
