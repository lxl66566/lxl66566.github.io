---
date: 2024-12-04
icon: wifi
category:
  - 教程
tag:
  - Linux
  - 桌面端
---

# OpenWRT

我之前买了一个 n1 盒子用来玩，上面已经刷了 iStoreOS，这是一个 OpenWRT 的分支。这里记录了一些我的折腾过程。

日后我可能会为其刷其他系统（Arch），不过现在还是先算了吧。

## 包管理

OpenWRT 用的包管理器是 `opkg`。虽然 OpenWRT 已经声称要转到 apt，但是还没转，并且 iStoreOS 应该还没有那么快跟上。因此我不得不用这个不合格的包管理器。

- 查找：help 里写 `opkg find <regexp>`，但是我使用 `opkg find 'python.*'` 并不能找到任何结果。我感觉这个 regexp 是假的。
- 软件包本身也是残缺的，例如 vim 的 `si` 功能被砍了。

## docker

iStoreOS 上啥都没有，但是有 docker。

然而这个 docker 的配置是 OpenWRT 乱写的，需要去看 `/etc/init.d/dockerd` 才知道怎么配，配置文件在哪。网上的 docker 配置教程都废了。（[开喷](https://t.me/withabsolutex/2119)）

## 代理

OpenWRT 的 Linux 内核是 5.10，iStoreOS 也[遵循上游内核版本](https://github.com/istoreos/istoreos/issues/1386)。然而 dae 的最低内核要求是 5.17，因此我无法在 iStoreOS 上使用 dae 作为代理。

## 服务

OpenWRT 不支持 systemd，果然还是太重了吧。所以必须使用传统的 [procd init script](https://openwrt.org/docs/guide-developer/procd-init-scripts)。

1. 在 `/etc/init.d/<service name>` 写入：
   ```bash
   #!/bin/sh /etc/rc.common
   USE_PROCD=1
   START=90
   start_service() {
       procd_open_instance MyInstance
       procd_set_param command <your startup command>
       procd_set_param limits nofile="unlimited"
       procd_set_param respawn 300 5 10
       procd_set_param stdout 0
       procd_set_param stderr 0
       procd_close_instance
   }
   ```
   （这里我关闭了输出到日志，为了避免体积膨胀；startup command 可以不是绝对可执行路径）
2. 添加权限：`chmod +x /etc/init.d/<service name>`
3. 运行 `service <service name> enable`。
4. 开机自启：`cd /etc/rc.d && ln -s ../init.d/<service> ./S99<service>`
