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

## 基础

看看[tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/podman_tutorial_cn.md)。

```sh
podman ps   # 查看运行状态
podman run -d ... # -d 表示后台运行
podman rm <name>  # 删除容器
podman logs <name>  # 查看输出(stdout + stderr)
```

## 遇到的问题

- podman 拉取镜像时可能不支持短名称，需要在名称前加 `docker.io/` 前缀，或者如 external 1. 所述：Open your `$HOME/.config/containers/registries.conf` file and paste the following contents: `unqualified-search-registries=["docker.io"]`

## external

1. [Exploring Podman: A More Secure Docker Alternative](https://betterstack.com/community/guides/scaling-docker/podman-vs-docker/)
