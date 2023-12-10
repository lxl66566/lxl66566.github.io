---
date: 2023-11-26
icon: proxy
category:
  - 教程
tag:
  - 网络
  - 协议
---

# Trojan

trojan 协议是一个广泛使用的，伪装成明确特征的 https 流量的协议，直接利用了现有的 tls 加密。

[trojan](https://github.com/trojan-gfw/trojan) repo 的上一次 commit 是 2020 年，大致能认为无人维护了。（并且 issue 区充斥着大量垃圾内容）

## 安装

:::tabs
@tab archlinux

```sh
pacman -S trojan
```

:::

配置文件在 `/etc/trojan/config.json`，内部已有一个模版，[稍作修改](https://trojan-gfw.github.io/trojan/config)即可使用。

首次启动建议先 `trojan /etc/trojan/config.json` 测试配置文件是否正确。若正确，启动服务 `trojan.service` 即可。

## 客户端

不需要我多说。

## 遇到的问题

启动服务时报错 `trojan.service: Start request repeated too quickly.`。搜，按照 [issue 所述](https://github.com/trojan-gfw/trojan/issues/387)改了用户组，无效。

然后直接运行 `trojan /etc/trojan/config.json`，看到 error 是端口占用了。猜测 trojan 不会将报错信息输出到 stderr，因此无法直接 `systemctl status trojan` 查看报错信息。
