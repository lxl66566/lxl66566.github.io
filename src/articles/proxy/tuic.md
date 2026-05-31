---
date: 2026-05-31
icon: truck-fast
category:
  - 教程
tag:
  - 网络
  - 协议
---

# TUIC

TUIC 也是一个基于 QUIC 的代理协议，目前已经出到 v5。

TUIC 命途多舛，原本是 [EAimTY 的个人项目](https://www.eaimty.com/2022/tuic/)，但是后来被放弃了。现在是[社区维护的项目](https://www.eaimty.com/2025/restart-developing-tuic-but-not-as-the-author/)。

## 服务端

[使用 sing-box 部署](https://sing-box.sagernet.org/configuration/inbound/tuic/)即可。

近来的代理配置项已经越来越少了。

```json
{
  "auth_timeout": "10s",
  "congestion_control": "bbr",
  "heartbeat": "20s",
  "listen": "0.0.0.0",
  "listen_port": 5498,
  "tag": "tuic-in",
  "tls": {
    "certificate_path": "<your_cert_path_crt>",
    "enabled": true,
    "key_path": "<your_cert_path_key>"
  },
  "type": "tuic",
  "users": [
    {
      "name": "default",
      "password": "<your_password>",
      "uuid": "4180c033-1066-4508-94a2-d19191c345ba"
    }
  ]
}
```

- 注意，users 里必须填写 uuid，并且是 RFC 定义的 uuid 标准格式，可以在 [uuidgenerator](https://www.uuidgenerator.net/version4) 里生成一个。客户端连接时必须使用 server 侧有定义的 uuid。

## 客户端

2026 年，所有基于 sing-box、mihomo 和 dae 的代理都支持 TUIC。

## 评价

QUIC based 的代理，局限性永远在运营商和 ISP，短时间内也很难成为完美代理协议。

相比于同样是 QUIC based 的 hysteria2，TUIC 的被接受程度更低、繁琐的 uuid 鉴权导致客户端使用体验不佳、没有 hysteria2 的拥塞控制与端口跳跃功能，并且 TUIC 的最大特色（大写在 github desc 里的）0-RTT 也处于一个非常尴尬的状态（不安全，不推荐开启）。

如果你的 server 已经有 sing-box service，并且你喜欢折腾，可以顺手起一个 TUIC 协议，否则没有特地去用它的必要。
