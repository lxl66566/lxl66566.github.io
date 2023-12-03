---
date: 2023-05-14
icon: computer
category:
  - 教程
  - 经历
tag:
  - 桌面端
  - Linux
---

# VPS

我与我的 VPS 的故事。服务器运维/代理搭建。

与 VPS 无关的 linux 问题请移步 [linux](./linux)

## 购买

### 消息来源

- [lowendbox](https://lowendbox.com/)
- [主机百科](https://zhujiwiki.com)

### 我买到的

<!-- prettier-ignore -->
|Host|location|Price|bandwidth|RAM|Storage|Core|saying|
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|20230514 [RackNerd](https://my.racknerd.com/cart.php?a=add&pid=695)|San Jose|$10.28/yr|1000GB 1Gbps|768MB|10GB|1|<dtls>装了 Debian 10。美西机 + trojan 真连接常年 700+ms，显然不能做游戏服务器。</dtls>[^1]|
|20230602 [vpslog](https://distribute.vpslog.net/)||free||64MB|||<dtls>白嫖的小鸡，纯 v6，太捞只能装 alpine，还要定期续。后来不续了。</dtls>|
|20231124 [silicloud](www.silicloud.com) (BF)|Tokyo|HK$128/yr|300GB 300Mbps|768MB|20GB|1|<dtls>性价比高，代价是超售。提供 archlinux 镜像，很好。</dtls>

[^1]: 本想买 CloudServer 的（明显同价位的配置更好），然而账号被标记了危险无法付款...因此只能退而求其次买了 RackNerd 家的。

::: details 我想买的

想买但没买的超级好价

- 2023 BF
  - [InfraveoCloud](https://zhujiwiki.com/35833/)，东京机 1T 月流量只要 $9/yr。然而我已经入手了一台东京灵车，因此没钱再买了。

:::

## 工具

- [ping.pe](https://ping.pe/#)：连通性
- `curl -Lso- bench.sh | bash`：VPS 信息，全球测速

### SSH

<dtls alt="没啥用的">

youtube 上（与其他教程）清一色的 finalshell，但是这种不开源的小作坊国产软件我不用。不过话说回来，对不会用 linux 的小白，finalshell 门槛确实低（图形文件系统和编辑器）。

先用了 SuperPuTTY，体验挺差，真不如用 cli。差点忘了我有 ArchWSL，于是直接 `sudo pacman -S openssl` 了（。后来转 linux 后就没 ssh 这烦恼了。

说回来，其实 windows 好像是有自带(?) ssh 的。

用法：`ssh root@ip [-p port]`

</dtls>

#### 别名

建立一个 _别名 -> VPS(用户 + ip + 端口)_ 的映射关系。

```
# edit ~/.ssh/config
Host <name>
  User root
  Hostname <ip>
  Port 22
```

#### 添加公钥

由于 vps 暴露在公网，因此需要复杂的密码，但我肯定不想每次登录都需要输那么一长串的密码，因此需要将公钥添加到 vps。

::: tabs

@tab 自动添加

`ssh-copy-id hostname`

@tab 手动复制

`cat ~/.ssh/id_*.pub` 并复制，再粘贴到 vps 的 `~/.ssh/authorized_keys` 内。

:::

## 我的设置

1. [增加 UDP Buffer Sizes](https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes)
2. 如果 VPS 没开 bbr 记得开。（[参考 11. sysctl 相关](../linux/install_and_config.md#系统设置)）

## 安全性

VPS 的公网 ip 一定会带来安全性问题。不容忽视。

### 自检

- 可以在 `/var/log/auth.log` 中查看登录日志。我的日志里的攻击记录非常多。
  - `less /var/log/auth.log | grep -i 'accepted'` 可以查看登录成功的记录，看看是不是自己的 ip。
- `ps aux | grep sshd` 查看有没有除自己以外的 `sshd: root [.*]` 类型的进程。
  - `ps aux | grep 'sshd' | grep -v 'root@pts/0\|grep\|/sbin/sshd' | awk '{print $2}' | xargs kill -9` 可以杀掉这些进程。（很粗糙了属于是）
- `lastb -9` 可以查看最近 9 条登录失败记录

### 解法

- 可以通过修改 `/etc/ssh/sshd_config` 中的内容进行限制，例如修改 `MaxAuthTries`。
- 密码位数太少也不安全。一个简单的方法是将你的密码重复两遍。
- 限制登录 ip。修改 `/etc/hosts.allow` & `/etc/hosts.deny` 文件。

#### 防火墙

::: tabs
@tab firewalld

```sh
systemctl <start | enable | stop | disable> firewalld
firewall-cmd --state
firewall-cmd --reload   # after change
firewall-cmd --add-masquerade --permanent   # 伪装
firewall-cmd --add-port=<port>/tcp --permanent  # 永久放行
firewall-cmd --zone=public --list-all
firewall-cmd --zone=public --list-ports
```

@tab nftables
[查看 wiki](https://wiki.archlinuxcn.org/wiki/Nftables)

:::

## 代理

**不要把证书放在 `/root` ！！！** 我又不能改 `/root`权限，代理服务端又会出一大堆权限问题，日志还不好看。

### 协议

网上小白教程比较多的是 vmess/vless + ws + tls 的方案，我选择 trojan，也是一个比较常见的方案。trojan 使用 TLS 加密方案，安全性高，但是数据包比较大，现在的 trojan 检测技术也比较成熟。

我最开始直接用 [trojan 一键脚本](https://github.com/Jrohy/trojan)[^2]。如[GFW 会主动对端口进行封禁](#对抗-gfw)，我的端口基本只能存活一天。（后来做了端口转发就基本没死了，偶尔会被 Qos(?)）

[^2]: 本来是想用 X-UI 的，然而[出了问题](#x-ui-does-not-work)

随着后来自己也使用 linux，我对于一键脚本不够满意，因此开始自己写 trojan-go 的配置文件。

也尝试了一下 hysteria 协议，并且写了个教程。

### WARP

有的 IP 访问 Google 时会有机器人异常验证。可以用 [WARP 一键脚本](https://github.com/P3TERX/warp.sh)解决。

### 对抗 GFW

GFW 检测到异常就会封禁端口，若换端口继续使用则需要考虑 ip 被永久封禁的风险。trojan 本身是 TLS over TLS 加密方式，但仍然有办法识别出流量特征。

我使用如下方式降低封锁几率（**有没有用其实是不太清楚的**）：

- 反代一个伪装主页，详见[反向代理](../reverse_proxy.md)。（然而 443 早就被封了，令人感慨）
- 设置一个固定端口与一个活动端口，固定端口将流量转发到活动端口。
  ```bash:no-line-numbers
  firewall-cmd --add-forward-port=port=12138:proto=udp:toport=$trojan_port --permanent
  ```

### 清理僵尸进程

如果你看到许多 `[journalctl] <defunct>` 标识，这代表有未结束的僵尸子进程。可以[参考此处](https://www.linkedin.com/pulse/how-identify-kill-zombiedefunct-processes-linux-without-george-gabra)清理他们。

```sh
top -b1 -n1 | grep Z    # find
ps -A -ostat,ppid | grep -e '[zZ]'| awk '{ print $2 }' | uniq | xargs ps -p # Find the parent of zombie processes, remenber ppid
kill -s SIGCHLD <ppid>
top -b1 -n1 | grep Z    # Identify if the zombie processes have been killed
# if haven't been killed, just kill <ppid>
```

## 运维

虽然我非常菜，但还是姑且记录一些心得。由于有的服务器是公家的，想干点啥总是感觉束手束脚。。

1. 如果是自己的服务器，那肯定先把[常用工具](../../farraginous/recommend_packages.md#linux)下载好。
   - 公家服务器如果有权限安装软件，也可以装一些典型的/极大增加效率的。例如 fish, zoxide
2. ssh 保活用的 screen 而不是 tmux。[一些基础命令](https://linuxize.com/post/how-to-use-linux-screen/)，加一个[删除命令](https://stackoverflow.com/a/1509764/18929691)，加一个 `<C-a> [` 进 copy mode 然后可以往上滚的命令。

## 挂机

VPS 的流量可以共享，并且可以赚点小钱([src](https://post.vpslog.org/archives/gua-ji))。为了防止 IP 被污染，一般放在非主要的 VPS 上跑。

跑挂机的 VPS 就变成美国最抢手了，毕竟 openai 流媒体啥的都能解。（我的 jp 机就没法解 openai）

一般挂机都拿 docker 跑，我当然！用 [podman](../../coding/container.md) 啦。

- [PacketStream](https://packetstream.io/?psr=5wA2)：0.1\$/G，满 5\$ 可提现。
  - 流量跑得慢，80M / 36h，不过至少可用
- ~~[EarnFM](https://earn.fm/ref/LXZX43NC)~~，不可用：`Connection is halted because: This IP is a known proxy connection, therefore its not allowed.`
- [repoket](https://link.repocket.co/cwYQ): 满 20$ 可提。不可用：`Too many devices on the same IPs.`
- [traffmonetizer](https://traffmonetizer.com/?aff=1578168)
  - `podman run -d --name tm traffmonetizer/cli_v2 start accept --token TOKEN`

先挂着，到时候再看看收益。

## 遇到的问题

### 无法使用密钥登录

某天服务器突然无法使用密钥验证登录了。查一下日志，发现一句：`Authentication refused: bad ownership or modes for directory /root`。

我确实改过 `/root` 的权限，因此改回 750 即可。

### 卡在 Reloading system manager configuration

archlinux 的服务器，每次安装软件都卡在 Reloading system manager configuration，卡大约 1min。

尝试了一下 `systemctl daemon-reload` 也卡住了。

然后根据[这个回答](https://bbs.archlinux.org/viewtopic.php?id=281599)，罪魁祸首是 `netplan`（_netplan_ 是 _cloud-init_ 的可选依赖。而 _cloud-init_ 是 VPS 自带的玩意）于是卸载，问题解决——

才怪。服务器重启就连不上 ssh 了。。。

这就不得不说，我这次买的 vps，silicloud 家的并没有 rescue 服务。还好我乱搞炸的是网络而不是系统，用 VNC 面板进去修就行了。

所以这个问题是无解的，或许得等我哪天琢磨出换个 vps 联网手段才行吧。

ps. 群里也有相同问题的。

### 端口被封问题

20230520：端口每天被封一次，于是写了个 fish 脚本每天更换端口~~并显示在伪装页面上~~映射到 12138（还作出了[其他努力](#对抗-gfw)）。脚本还是有 bug 的（我菜），`$temp` 赋值不成功，但无伤大雅。

```sh
# fish function
function new_trojan_port --description 'change to a new trojan port'
    firewall-cmd --remove-forward-port=port=12138:proto=tcp:toport=$trojan_port --permanent
    firewall-cmd --remove-forward-port=port=12138:proto=udp:toport=$trojan_port --permanent
    set -U trojan_port (math $trojan_port + 1)
    firewall-cmd --add-forward-port=port=12138:proto=udp:toport=$trojan_port --permanent
    firewall-cmd --add-forward-port=port=12138:proto=tcp:toport=$trojan_port --permanent
    set temp (echo $trojan_port | trojan port | tee /dev/tty | sed -n "s/.*端口: \([0-9]*\).*/\1/p")
    echo "port: $temp -> $trojan_port"
    firewall-cmd --reload
    # update blog and show port
    cd /etc/nginx/lxl66566.github.io
    git pull origin main
    # sed -i "s/MyGitHub/$trojan_port/g" index.html
    nginx -s reload
end
```

不应同时使用 firewalld 和 iptables，可能会导致混乱。由于 `firewalld` 是更高一层的抽象(?)，因此我使用之：

```sh
systemctl stop iptables
systemctl disable iptables
systemctl mask iptables
systemctl unmask firewalld
systemctl enable firewalld
systemctl start firewalld
```

后来采用[端口转发和伪装](#对抗-gfw)后就没被封过端口了 www

### 配置了错误的 firewalld 把自己防住了

20230516：如题，乱搞 firewalld，结果忘记放行 22 端口（ssh）直接 reload，直接把我 ssh 干掉了。。。然后进 rescue mode 抢救了...

> rescue mode 是 VPS 服务商的一项服务，可以将 VPS 挂载到另一个虚拟机上，通过其对文件进行备份与修改，适用于乱搞把 VPS 搞炸了的情况。

rescue 只有 nano file editor；挂载了分区到 `test` 以后，直接 `nano /test/etc/firewalld/zones/public.xml` 加上 `<port port="22" protocol="tcp"/>`。

### X-UI does not work

我小白一个，只会跟着用简单的一键部署脚本，然后寄了。面板添加节点后，使用 v2rayN 添加服务器无法连上。

后面换了 [trojan 面板](https://github.com/Jrohy/trojan)，能正常用一阵子，但稳定性一般。

顺带，x-ui 在 alpine 的表现可谓是《惊艳》到我了，，，

> ~# x-ui install<br/> > [ERR] 面板启动失败，可能是因为启动时间超过了两秒，请稍后查看日志信息  
> ~# x-ui log<br/> > [ERR] 请先安装面板

## external

1. [节点搭建系列教程 - 不良林](https://bulianglin.com/archives/guide.html)，在一众垃圾 youtube 教程中算是讲得比较透彻的。
2. [vps2arch](https://gitlab.com/drizzt/vps2arch)：为你的 vps 安装 arch！
3. [使用一键脚本，部署 Hysteria 2 协议节点](https://blog.misaka.rest/2023/09/02/hysteria2-script/)
