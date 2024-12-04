---
icon: box
date: 2023-11-12
category:
  - 编程
tag:
  - 工具
---

# 容器

其实我一直不喜欢容器，我认为处理复杂依赖是包管理器的职责，推给 container 是比较粗暴浪费的做法。

然而看到虚拟机以后，我感觉容器还是有它的价值的[^3]。:(

[^3]: 抽象层次与价值取向绑定。

## 选择

最流行的容器工具应该就是 docker 了吧，然而因为几次负面消息[^1][^2]让我对其没有任何好感。

[^1]: Docker 向所有 Docker Hub 用户发去邮件，如果他们是以组织的名义创建账号，那么他们的账号将被删除，所有镜像也将一并删除，除非他们升级到一个付费的团队方案——其年费为 420 美元。[src: solidot](https://www.solidot.org/story?sid=74406)
[^2]: Docker 公司将限制其 Docker Desktop 工具仅供个人或小企业免费使用，大企业将需要[付费订阅](https://www.theregister.com/2021/08/31/docker_desktop_no_longer_free/)。该公司要求员工人数在 250 人以上或年收入超过一千万美元的企业如果需要使用 Docker Desktop 那么就必须付费订阅。[src: solidot](https://www.solidot.org/story?sid=68775)

我也尝试在 wsl2 上部署了一下 docker，然而由于没有 systemctl 而无法启动其守护进程。[docker-systemctl-replacement](https://github.com/gdraheim/docker-systemctl-replacement) 不可用，需要 nohup 启动 `dockerd`。我的 wsl2 只有纯命令行，折腾许久，浪费了许多时间。

于是我转向了 [podman](https://docs.podman.io)，这是一个 **daemonless, open source**（开源的、无守护进程的）容器工具，完美解决了我对 docker 的偏见。并且其兼容性也不错：_Most users can simply alias Docker to Podman (alias docker=podman) without any problems._

可以前往 [external 1.](#external) 查看详细信息。

::: tip

本篇中 docker 和 podman 命令是混用的。

:::

## 安装

Linux 安装简单，这里不说。

WSL 上就折磨了，我用 ArchWSL，结果 docker 没有守护进程，podman 找不到 `/etc/subuid`，两个玩意都没法正常工作，评价是有点傻逼。

## 基础

看看[tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/podman_tutorial_cn.md)。

```sh
docker ps                                 # 查看运行状态
docker run -d ...                         # -d 表示后台运行
docker rm <name>                          # 删除容器
docker logs <name>                        # 查看输出(stdout + stderr)
docker pull <repository>:<tag>            # 拉取镜像到本地
docker images                             # 查看镜像
docker tag <image ID> <repository>:<tag>  # 重命名镜像
```

## dockerhub mirror

在 2024 年，中国大规模下架了 docker 镜像。所以现在想要使用 docker 仓库会有一些麻烦。[Using docker in China 2024](https://taogenjia.com/2024/08/19/Using-docker-in-China-2024/) 这篇文章介绍了一些方法，我尝试了 cloudflare 反代。不过反代的后果也是 UNAUTHORIZED。

然后还踩了[应用镜像的坑](#无法应用镜像)。

## 下载镜像到本地

有时候我没有安装 docker，但是我需要下载镜像为 tar 文件，传给我的 VPS 使用。

[docker-drag](https://github.com/NotGlop/docker-drag) 用不了，别看了。我用的算是官方的 moby 脚本吧。

```sh
wget https://raw.githubusercontent.com/moby/moby/master/contrib/download-frozen-image-v2.sh
chmod +x download-frozen-image-v2.sh
bash download-frozen-image-v2.sh reader hectorqin/reader:openj9-latest
tar -cvaf reader.tar reader
# 这样就把镜像下载并打成了 tar 包。
```

不过这个脚本在 20241204 时还有 bug，就是必须指定 image 的 tag，否则下载链接会 404。

## 遇到的问题

### 无法应用镜像

- 网上教程修改镜像都是 `/etc/docker/daemon.json`，改完重启 docker。但是我重启后并无法应用镜像。
  - OS：iStoreOS

解法：`ps | grep dockerd`，可以看到应用的 config 是 `--config-file=/tmp/dockerd/daemon.json`，根本就不是 `/etc/docker/daemon.json`。

继续看 `/etc/init.d/dockerd`，可以发现其 config 是写在奇怪的地方，并且格式也是自定义格式。（[被我喷了](https://t.me/withabsolutex/2119)）

### podman 指定 registry

- podman 拉取镜像时可能不支持短名称，需要在名称前加 `docker.io/` 前缀，或者如 external 1. 所述：Open your `$HOME/.config/containers/registries.conf` file and paste the following contents: `unqualified-search-registries=["docker.io"]`

## external

1. [Exploring Podman: A More Secure Docker Alternative](https://betterstack.com/community/guides/scaling-docker/podman-vs-docker/)
2. [podman 踩坑记录 - Aya](https://note.aya1.de/#/22-podman) | [source code](https://github.com/Brx86/brx86.github.io/blob/5b03fc42683587be98bf6c72685a69d6d86b5c25/22-podman.md)
