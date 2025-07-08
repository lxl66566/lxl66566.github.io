---
icon: box
date: 2023-11-12
category:
  - 编程
  - 教程
tag:
  - 工具
---

# 容器

其实我一直不喜欢容器，我认为处理复杂依赖是包管理器的职责，推给 container 是比较粗暴浪费空间的做法。然而比起虚拟机，容器的开销确实小多了，还是有一定价值的[^3]。

[^3]: 抽象层次与价值取向绑定。

## 选择

最流行的容器工具应该就是 docker 了吧，然而因为几次负面消息[^1][^2]让我对其没有任何好感。

[^1]: Docker 向所有 Docker Hub 用户发去邮件，如果他们是以组织的名义创建账号，那么他们的账号将被删除，所有镜像也将一并删除，除非他们升级到一个付费的团队方案——其年费为 420 美元。[src: solidot](https://www.solidot.org/story?sid=74406)
[^2]: Docker 公司将限制其 Docker Desktop 工具仅供个人或小企业免费使用，大企业将需要[付费订阅](https://www.theregister.com/2021/08/31/docker_desktop_no_longer_free/)。该公司要求员工人数在 250 人以上或年收入超过一千万美元的企业如果需要使用 Docker Desktop 那么就必须付费订阅。[src: solidot](https://www.solidot.org/story?sid=68775)

我也尝试在 wsl2 上部署了一下 docker，然而由于没有 systemctl 而无法启动其守护进程。[docker-systemctl-replacement](https://github.com/gdraheim/docker-systemctl-replacement) 不可用，需要 nohup 启动 `dockerd`。我的 wsl2 只有纯命令行，折腾许久，浪费了许多时间。

于是我转向了 [podman](https://docs.podman.io)，这是一个 **daemonless, open source**（开源的、无守护进程的）容器工具，解决了我对 docker 的偏见。并且其兼容性也不错：_Most users can simply alias Docker to Podman (alias docker=podman) without any problems._。不过 podman 也有缺点，例如[开机自启](#关于开机自启动)要麻烦一些。可以前往 [external 1.](#external) 查看详细信息。

再说说平台兼容性：

- Linux 随便选啥都行，而且跑容器是没有性能损失的。
- Windows 上如果懒人就使用 Docker Desktop 一键配置（也是基于 WSL 的运行方式），想折腾就开 WSL，在 WSL 里装个发行版然后当 linux 用。
- MacOS 有 [apple/container](https://github.com/apple/container) 用，当然也可以装 Docker Desktop，不过有原生的话可能没啥必要。

::: tip

本篇中 docker 和 podman 命令是混用的。

:::

## 工具

- [lazydocker](https://github.com/jesseduffield/lazydocker)：lazygit 的同作者做的 docker TUI，不再需要背 docker 指令。
  - 实际上 docker 的 cli 确实很傻逼，很多地方依赖 hash。
- [dpanel](https://github.com/donknap/dpanel)：更高级的 docker 管理 GUI。

## 基础

看看[tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/podman_tutorial_cn.md)。

**容器**和**镜像**是两个概念，可以类比为系统和系统盘。

```sh
docker ps                                 # 查看运行状态
docker ps -a                              # 查看所有容器状态
docker run -d ...                         # -d 表示后台运行
docker rm <name>                          # 删除容器
docker logs <name>                        # 查看输出 (stdout + stderr)
docker logs -f <name>                     # 持续查看输出 (stdout + stderr)
docker pull <repository>:<tag>            # 拉取镜像到本地
docker images                             # 查看镜像
docker tag <image ID> <repository>:<tag>  # 重命名镜像
docker stop $(docker ps -aq)              # 停止所有容器
docker rm $(docker ps -aq)                # 删除所有容器
docker rmi $(docker images -q)            # 删除所有镜像
```

### 调试

- 我可以从一个 image 新建一个容器，忽略 CMD 而直接进 `/bin/bash` 进行 image 调试：`docker run -it <image> /bin/bash`
- 我也可以进入一个正在运行的容器的主进程：`docker attach <container>`
- 但是我不能对一个运行中或已退出的容器**新开一个 bash 进程**进行调试，这是非常致命的。只能用 `docker exec`。

```sh
docker run -it --entrypoint /bin/bash <image>     # 从 image 创建容器并进入（作为调试用）
docker build .                                    # 构建容器镜像（需要先下载 docker-buildx，否则会吃一个 deprecated。
                                                  # 下载完后，docker build 相当于 docker buildx build 的 alias）
docker system prune                               # 清理所有缓存、非运行中的镜像
docker builder prune -a                           # 清理构建缓存
```

## 代理

[src](https://wiki.archlinuxcn.org/wiki/Docker#HTTP代理)

简言之：守护进程和 docker 都需要配置，`/etc/docker/daemon.json` 和 `~/.docker/config.json` 都需要写入代理内容。

而且注意，容器内部无法直接通过 localhost，127.0.0.1 访问宿主机代理端口，解法在[容器中访问宿主机服务](#容器中访问宿主机服务)。

如果你的容器有指定虚拟子网，记得将互相的容器名加入 `NO_PROXY`，否则可能出现通信错误。

## dockerhub mirror

在 2024 年，中国大规模下架了 docker 镜像。所以现在想要使用 docker 仓库会有一些麻烦。[Using docker in China 2024](https://taogenjia.com/2024/08/19/Using-docker-in-China-2024/) 这篇文章介绍了一些方法，我尝试了 cloudflare 反代。不过反代的后果也是 UNAUTHORIZED。

然后还踩了[应用镜像的坑](#无法应用镜像)。

## 容器中访问宿主机服务

最佳解法：使用宿主机的局域网 ip，并且关掉防火墙。

其他办法都挺麻烦的，例如 `host.docker.internal` 只在 Docker Desktop 上能用，而 linux `ip addr show docker0` 的 `172.17.0.1` 试过了用不了。

## Dockerfile

如果你需要制作一个镜像，那么本质上就是写一个 Dockerfile 用来描述镜像。

<!-- prettier-ignore -->
| 指令 | 解释 |
| --- | --- |
| ENV | 设置环境变量。对所有之后的指令生效，可以多次覆盖。 |
| COPY | 将外部文件复制到容器内。了解更多请阅读[坑](#坑)。 |

每个 `ADD`，`COPY`，`RUN` 指令会为 image 创建一个只读 UnionFS layer。layer 是用于缓存的，当修改了 Dockerfile 的某一行后，系统只会构建此行和所有之后的指令，之前的 layer 可以被跳过构建。也正是因为 layer 的存在，尽可能不要写紧邻的 `RUN` 语句，如果每个 command 都分配一个 `RUN` 语句会导致 layer 过多，影响存储和性能。

### 坑

Dockerfile 的坑实在是太多了，真是他妈的屎一样的设计。

- 类似 .gitignore，Docker 也有 .dockerignore 用于在 COPY 时忽略文件/文件夹。但是它和 .gitignore 不一致的地方很多：
  1. .gitignore 可以放在任意子目录下，.dockerignore 只能放在你的 build 目录下，否则不生效。
  2. .gitignore 里的内容可以匹配任意层子目录下的文件名，而 .dockerfile 只能匹配 build 目录下的路径。相当于 .gitignore 里的 `xxx` 在 .dockerfile 里都要写成 `**/xxx` 或者绝对路径 `/aaa/bbb/xxx`。
- `COPY a b` 命令指的是将 `a` 目录**下的所有文件** copy 到 `b` 目录里，而不是将 `a` 目录本身 copy 到 `b` 目录里。这跟 `cp -r` 的表现又不一样。

## 网络

docker 网络有四种模式，Host（和宿主共用网卡 IP 端口）, Container（和其他容器共用网卡 IP 端口）, None, Bridge（虚拟子网）。

一般容器间通信可以用 Container 也可以用 Bridge，Container 不用额外配置，Bridge 则更灵活。

Bridge 组网大致如下：

```sh
docker network create xxx                                           # 先创建虚拟子网
# 通过 --network (--net) 指定虚拟子网
docker run -d --name AAA -p 8000:8000 --network xxx <image>         # 假设这是一个提供服务的容器
docker run -it --name BBB -p 8000:8000 --network xxx <image> sh     # 假设这是一个访问服务的容器
NO_PROXY=AAA curl -v http://AAA:8000                                # 访问 AAA 的服务。如果你设置了代理，要保证虚拟子网内的请求不走代理。
```

可以看出，Bridge 需要修改容器内程序的源码或 env 以适配新的 base url，还是有一些麻烦的。好处是可以加新的容器到子网，或者随便更换服务提供容器都行。

## 为离线机器下载镜像

假设我有无法联网的内网服务器，我需要使用其跑镜像。

::: tabs

@tab 使用 docker 导出

如果你的电脑上安装了 docker，你应该优先选择这个方法。

1. 使用 docker pull 拉取镜像。注意你的**目标架构**需要与服务器的架构相同。
   ```sh
   docker pull --platform linux/arm64 hectorqin/reader:openj9-latest
   ```
2. 使用 `docker save` 导出指定镜像。如果你有多个镜像，并且 docker 内所有镜像都需要导出，你可以用脚本批量导出：
   ```sh
   #!/bin/bash
   output_dir="docker_images"
   mkdir -p "$output_dir"
   for image in $(docker images --format "{{.Repository}}:{{.Tag}}"); do
       echo "Saving $image..."
       file_name=$(echo "$image" | sed 's/[\/:]/_/g').tar
       docker save -o "$output_dir/$file_name" "$image"
   done
   echo "All images saved to $output_dir/"
   ```
3. 通过 rsync 或者其他方法将所有 `.tar` 传输到目标机器上
4. 使用 `docker load` 加载所有镜像。

@tab 使用脚本下载（无法使用）

[docker-drag](https://github.com/NotGlop/docker-drag) 用不了，别看了。我用的算是官方的 moby 脚本吧。

```sh
wget https://raw.githubusercontent.com/moby/moby/master/contrib/download-frozen-image-v2.sh
chmod +x download-frozen-image-v2.sh
bash download-frozen-image-v2.sh reader hectorqin/reader:openj9-latest
tar -cvaf reader.tar reader
# 这样就把镜像下载并打成了 tar 包。
```

不过这个脚本在 20241204 时还有 bug，就是必须指定 image 的 tag，否则下载链接会 404。

好不容易下载完了，结果打出的 tar 还不能直接被 docker load 加载，非常神奇。我不知道怎么办了。

:::

## docker-compose

docker-compose 是 docker 的上一层抽象，一言：**一个 yaml 文件，指明了多个容器的参数**。实际上使用一个 bash 脚本也能做到 docker-compose 做的事。

## 关于开机自启动

docker 容器非常方便，用 `--restart always`（总是自动重启）或 `--restart unless-stopped`（除非手动停止，否则总是自动重启）启动容器就行。

但是 podman 是 rootless 的，没有一个守护进程去叫醒容器，`--restart` 参数对其无效。使用 systemd 用户服务的话，按照网上教程 `podman generate systemd` 又会发现 command deprecated，而且这样无法启动 podman-compose 生成的 pod。

然后我又[折腾了一段时间](https://t.me/withabsolutex/2199)。遇到了太多无语的事情。

最后我的解决方法：回归本源，每次开机时运行 `user-startup add '/usr/bin/podman pod start pod_root'` 来启动 pod。至于开机自启动命令，可以用我的 [user-startup](https://github.com/lxl66566/user-startup-rs)，一行搞定。

## 遇到的问题

### 无法应用镜像

- 网上教程修改镜像都是 `/etc/docker/daemon.json`，改完重启 docker。但是我重启后并无法应用镜像。
  - OS：iStoreOS

解法：`ps | grep dockerd`，可以看到应用的 config 是 `--config-file=/tmp/dockerd/daemon.json`，根本就不是 `/etc/docker/daemon.json`。

继续看 `/etc/init.d/dockerd`，可以发现其 config 是写在奇怪的地方，并且格式也是自定义格式。（[被我喷了](https://t.me/withabsolutex/2119)）

### podman 指定 registry

- podman 拉取镜像时可能不支持短名称，需要在名称前加 `docker.io/` 前缀，或者如 external 1. 所述：Open your `$HOME/.config/containers/registries.conf` file and paste the following contents: `unqualified-search-registries=["docker.io"]`

### /var/run/docker.sock: connect: permission denied

这个也是常见问题了，守护进程运行在 root 下，普通用户无法访问。解法([ref](https://stackoverflow.com/questions/48568172))：

```sh
sudo usermod -aG docker $USER
```

然后重新登录。

### 安装问题

正常的 Linux 发行版的包管理器安装都不会出现问题。不过 WSL 就折磨了。我用 ArchWSL，结果 docker 没有守护进程，podman 爆 subuid 错误。

#### docker

ArchWSL 上没有 systemd 用，所以自然也不会自行启动 dockerd 守护进程。因此我必须要在另一个 console 上手动运行 `sudo dockerd` 才能正常使用 docker。

#### podman

在 ArchWSL 上 podman 找不到 `/etc/subuid`，报错。subuid 和 subgid 是用于 User Namespaces 的一部分，主要用于容器化软件，以创建特权分离的容器。

运行指令：

```sh
sudo usermod --add-subuids 100000-165535 <user>
sudo usermod --add-subgids 100000-165535 <user>
```

解决。

## external

1. [Exploring Podman: A More Secure Docker Alternative](https://betterstack.com/community/guides/scaling-docker/podman-vs-docker/)
2. [podman 踩坑记录 - Aya](https://note.aya1.de/#/22-podman) | [source code](https://github.com/Brx86/brx86.github.io/blob/5b03fc42683587be98bf6c72685a69d6d86b5c25/22-podman.md)
