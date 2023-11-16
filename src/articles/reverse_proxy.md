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
- 一些[讨论](https://www.reddit.com/r/selfhosted/comments/hur1hx/caddy_vs_nginx_how_do_these_web_servers_reverse/)

能有多简单呢，例如我需要反代一个静态站点（我用于 vps 伪装），只需要在 `/etc/caddy/Caddyfile` 中写入：

```
<域名> {
  root * <静态文件路径>
  file_server
}
```

然后[启动 caddy 服务](./linux/basic.md#服务)即可。

这个配置文件可以将 http 自动重定向到 https，并且不用自己签证书。

> 而我在 nginx 上得自己用 acme.sh 签证书，然后写[一大坨的配置文件](https://github.com/lxl66566/config/blob/a3065d4b9797d43eb113e2932e9799f9b420c4f4/nginx.conf)，还得去看看 nginx 命令行用法，signal 有哪些，才能把我的网站搞好。

反代也很简单，这里不展示了。总之，在初级配置、流量不算大的服务上，选 caddy 准没错。

## nginx

~~Nginx 502 bad gateway :(~~ nginx 是老牌反代大哥了，但是它其实不是今天&这里的主角（）。
