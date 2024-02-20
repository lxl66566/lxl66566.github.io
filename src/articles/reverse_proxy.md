---
date: 2023-11-16
icon: nginx
category:
  - 教程
  - 推荐
tag:
  - Linux
---

# 反向代理

一个系统可能有一堆服务器，一台服务器上可能运行着一堆服务。反代是一种中间件，将不同请求转发到不同服务上，兼顾了加密，负载均衡等。[more](https://www.cloudflare.com/zh-cn/learning/cdn/glossary/reverse-proxy/)

## caddy

caddy 是一个更年轻的工具，提供**非常简单**的语法和自动 https。

- [安装指南](https://caddyserver.com/docs/install)

能有多简单呢，例如我需要部署一个静态站点（用于 vps 伪装），只需要在 `/etc/caddy/Caddyfile` 中写入：

```text
<域名> {
  root * <(静态)资源路径>
  file_server
}
```

然后[启动 caddy 服务](./linux/basic.md#服务)即可。

这个配置文件可以将 http 自动重定向到 https，并且不用自己签证书。

如果要用自己的证书就加一句 `tls <crt> <key>` 即可。

> 而我在 nginx 上得自己用 acme.sh 签证书，然后写[一大坨的配置文件](https://github.com/lxl66566/config/blob/a3065d4b9797d43eb113e2932e9799f9b420c4f4/nginx.conf)，还得去看看 nginx 命令行用法，signal 有哪些，才能把我的网站搞好。

反代也很简单，只需将 `file_server` 换成 `reverse_proxy :8000`（端口号）。

- 如果只有一个域名，可以去掉大括号。（压行！现在只有三行了）
- 自带 formatter：`caddy fmt --overwrite /etc/caddy/Caddyfile`
- 自动证书存放位置是 `/var/lib/caddy/certificates/acme-v02.api.letsencrypt.org-directory/<domain>`，可以 ln 到其他地方给其他软件用。

### 日志

caddy 默认将日志输出 stderr，可以用 `journalctl` 查看。但也可以将其输出至文件，或者按域名分流日志等。

```json
{
  log default {
    output file <file_path>
  }
}
```

更具体的应用请参考文档：[log 参数](https://caddyserver.com/docs/caddyfile/directives/log) | [全局 log default](https://caddyserver.com/docs/caddyfile/options#log)。

### 其他资料

- [Caddy NGINX Config Adapter](https://github.com/caddyserver/nginx-adapter), converts NGINX config files into Caddy's native format.

## nginx

~~Nginx 502 bad gateway :(~~ nginx 是老牌反代大哥了，但是它其实不是今天&这里的主角（）。

> Several features that are free (in caddy) which cost money in nginx. :(

~~nginx 的 quic 还是 module。~~ _NGINX now officially supports HTTP/3 with QUIC. It is available as part of NGINX 1.25.1 mainline version for open source users and NGINX Plus R30 for enterprise customers._

## 所以到底如何选

观点：激进派

虽然 go 写的 caddy 性能可能比纯 c 写的、经过时间检验的 nginx 差，但是流量不大的情况下真的缺那点性能吗？nginx 那坨配置我得上 gpt 才能勉强**读**懂，折腾技术还是用尽可能简单的，减少自己精神内耗的比较好。~~选择 caddy 是在为自己的脑子着想，兄弟。~~

因此在自己搞着玩的小流量服务器上用 caddy 准没错。

目前 caddy 在 github 上有 50k star，也侧面反映了 caddy 的优秀。

## 遇到的问题

### caddy 无法建立连接

我想开一个 file server，静态文件没有任何问题（就是我的 blog）。然而 caddy 开了以后一访问就是 js 执行错误。我也用 nginx 试了一下，是可用的。

手动 `caddy run` 却是好的，可能是 service 出了问题。

### ERR_ADDRESS_UNREACHABLE

用 caddy 和 nginx 都试了一遍，浏览器访问 ERR*ADDRESS_UNREACHABLE，本地访问 403，说明不是防火墙的问题。nginx 有报错 \_13: Permission denied*，然后搜一下发现需要 `chmod +x <root>`。加了以后还是没用，原来 _root_ 的全路径都需要 `chmod +x`。。问题解决。

## external

1. [reddit: Caddy vs Nginx: How Do These Web Servers / Reverse Proxies Compare?](https://www.reddit.com/r/selfhosted/comments/hur1hx/caddy_vs_nginx_how_do_these_web_servers_reverse/)
2. [Why Caddy 2 over NGINX](https://caddy.community/t/why-caddy-2-over-nginx/9549)
