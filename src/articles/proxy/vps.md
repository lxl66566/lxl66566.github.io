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

## 地区选择

买了一年机，好多地方全买过了。我现在有着极为明确的购机地点倾向：JP。

我对延迟有着比较高的要求，因为需要刷 tg 看本子，如果图片出得慢，效率太低了。所以 US 全部 out。

在东亚里，SG, KR, TW 的延迟也是垫底的，随便 ping 都上 200ms。所以 out。

最后剩下 JP 和 HK，虽然 HK 延迟最低，但由于非常多的服务是屏蔽 HK 的（chatgpt，许多日本网站，gemini 和其他 google 家大模型），所以 JP 胜出。

以后可能会尝试一下越南等地区。

## 购买

### 消息来源

- [lowendbox](https://lowendbox.com/)
- [主机百科](https://zhujiwiki.com)

### 我买到的

<!-- prettier-ignore -->
|Host|location|Price|bandwidth|RAM|Storage|Core|saying|
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|20230514 [RackNerd](https://my.racknerd.com/cart.php?a=add&pid=695)|San Jose|$10.28/yr|1000GB 1Gbps|768MB|10GB|1|<dtls>装了 Debian 10（后来换成了 12）。美西机 + trojan 真连接常年 700+ms，显然不能做游戏服务器。[^1]</dtls>|
|20230602 [vpslog](https://distribute.vpslog.net/)||free||64MB|||<dtls>白嫖的小鸡，纯 v6，太捞只能装 alpine，还要定期续。后来不续了。</dtls>|
|20231124 [silicloud](www.silicloud.com) (BF)|Tokyo|HK$128/yr|300GB 300Mbps|768MB|20GB|1|<dtls>提供 archlinux 镜像。没有 rescue。稳定性开始还行，半年后差不多烂完了。</dtls>|
|20231212 azure|Korea Central|~~$9.xx/mo~~ free|unknown|1GB|30GB|1|<dtls>学生优惠送 $100 现金券，买这个等级的，每年用 10 个月。</dtls>|
|20231213 aliyun|HK|~~288CNY/yr~~ free|1024 GB unknown|896MB|40GB|2|<dtls>香港地区 TG 时常抽风；免费的香港机我想都不敢想（）</dtls>|
|202403xx wawo|US|￥3.73/mo|unknown|512MB|unknown|1|<dtls>冲便宜买的，质量很捞，本来是用作测试的。结果半个月给我封了，莫名其妙。于是避雷 wawo 了。</dtls>|
|20240518 Churros|JP|￥8.9/mo + ￥6 初装|200GB 100Mbps|1GB|5GB|1|<dtls>silicloud IP 寄了，换台 JP。这家是超级垃圾灵车，非常不稳定</dtls>|
|20240714 Akile|HK|￥5/mo|200GB 1000Mbps|1GB|5GB|1|<dtls>akile 很灵车，不推荐。介于 Churros 和 Lamhosting 之间。</dtls>|
|20240726 Lamhosting|TW|￥10.6/mo(coupon -￥2)|512GB 1000Mbps|512M|10GB|1|<dtls>有点灵，TW ping 都有 190ms… 比 akile 稳一点，但不算太多</dtls>|
|20240820 SurfCloud|HK|$1/mo|200GB 30Mbps|1G|40GB|1|<dtls>银联付款，需要编辑防火墙，便宜实惠。缺点是太慢了点…</dtls>|
|20240911 YXVM|JP|$3/mo|1TB 500Mbps|768MB|5GB|1|<dtls>买这家要靠抢。刚开始不错，稳定性高，延迟低。后面炸了几次，每天晚上可用性也大幅降低了。两个月弃坑。</dtls>|
|20241018 azure|JP|free|?|1G|30G|1|微软，我的超人|
|20241031 [91idc](https://91idc.gg/index.php)|HK|￥10|20MBps|1G|10G|1|<dtlslong>优惠码无法使用；带宽偏低；新商家，稳定倒是挺稳定的</dtlslong>|

[^1]: 本想买 CloudServer 的（明显同价位的配置更好），然而账号被标记了危险无法付款...因此只能退而求其次买了 RackNerd 家的。

::: details 我想买的

`RAM/存储`，`流量/端口速度`；默认 1C SSD

想买但没买的超级好价

<!-- prettier-ignore -->
|Host|location|Price|bandwidth|RAM|Storage|Note|
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|2023 BF [InfraveoCloud](https://zhujiwiki.com/35833/)|JP|$9/yr|1T 1Gbps|-|20GB|
|[ColoCrossing](https://zhujiwiki.com/36155/)|Los Angeles|$9/yr|不限流 1Gbps|2G|37GB|
|[Vision Cloud](https://t.me/visioncloud_notification/32)|JP|$14/yr|1TB 1000Mbps|1GB|6GB|
|[哇沃](https://zhujiwiki.com/36281/)|HK|￥80/yr|2TB 500Mbps|1GB|20GB|
|[Churros](https://zhujiwiki.com/36298/)|JP|￥6.3/mo|100GB 100Mbps|1GB|5GB|
|[AKileCloud](https://akile.io/shop/server?type=traffic&areaId=3&nodeId=80&planId=448)|HK|￥60/yr|1TB 5000Mbps|1GB|5GB|<dtlslong>这个容易抢光，但是常驻有 ￥10/mo 的香港机</dtlslong>|
|[DigitalVirt](https://zhujiwiki.com/36771/)|HK|￥95/yr|1TB 200Mbps|1GB|10GB|
|[碳云](https://www.coalcloud.net/aff.php?aff=63&pid=124)|HK|￥40/yr|500GB 10Gbps|1GB|20GB|
|[碳云](https://www.coalcloud.net/aff.php?aff=63&pid=145)|HK|￥88/yr|1600GB 10Gbps|1GB|20GB|
|[ASVM](https://asvm.net/billing/aff.php?aff=28&pid=18)|HK|$10/yr|2TB 1Gbps|1GB|10GB|

一般价

- [Digirdp](https://zhujiwiki.com/36114/)，10$/yr 1GB/15GB 1TB/1Gbps 美国，虽然 HDD，但是跑流量也不影响。
- [BestVM](https://zhujiwiki.com/36288/)，15 CNY/mo 512MB/5GB 1T/1Gbps TW
- [wap.ac](https://zhujiwiki.com/34105/)，1$/mo 256MB/5GB 500GB/1Gbps JP/HK

:::

### 学生白嫖

阿里云和 Azure 理论上都是不能当代理机用的，不过真拿来跑，自用的话它们也不管。

- 阿里云：免费服务器，**每年** 300 元优惠券，可以全额抵扣。
  1. （需要 chromium 系浏览器）[university.aliyun.com](https://university.aliyun.com) 学生认证领券
  2. ~~首页，_产品 - 计算 - 轻量应用服务器_ 下单即可。 新加坡、日本有货，香港需要 12 点抢。注意，下单不锁定，以支付成功为界。~~
  - 学生优惠现在无法购买轻量；在领券页面下面只能购买国内 ECS，无法作为翻墙机使用，而且带宽很低。![现在已经寄了](/images/articles/vps/news.jpg)
- Azure：每年 $100 优惠券，学生无限续。财大气粗！
  1. 先过学生认证
  2. 服务器下单，配置那边按价格排序一下，选便宜的，1C1G 够用了。
  3. 开好机子，默认不能 root 登录。查看 [允许 root](#允许-root) 章节可解。
  4. 默认是不放行其他端口的。去 _网络_，自己添加入站和出站规则，放开所有端口。

## 工具

- [一键脚本](https://github.com/lxl66566/init-script)：不得不提我自己写的一键脚本，一键常用软件 + 代理（hysteria + trojan-go + trojan）
- [ping.pe](https://ping.pe/#)：连通性
- 全球测速
  - `curl -Lso- bench.sh | bash`：VPS 信息，全球测速
- 国内测速
  - `curl -sL network-speed.xyz | bash -s -- -r china`
  - `bash <(curl -sL bash.icu/speedtest)`
- <https://bgp.tools/>，ASN 信息
- <https://ip.skk.moe/>，查 IP
- [网络面板](https://net.ljxnet.cn/)流量消耗器

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

### 允许 root

一般的 vps 都是允许 root 登录的，但是像 azure 这些“大厂”则不行。所以需要用户进去改 ssh 配置。

```sh
sudo vim /etc/ssh/sshd_config
# 设置：PermitRootLogin yes, PasswordAuthentication yes
sudo systemctl restart sshd
```

### 端口转发

将来自端口 `<from>` 的流量转发到 `<to>`

::: tabs
@tab socat

```sh
socat TCP-LISTEN:<from>,reuseaddr,fork TCP:localhost:<to> # 最简型
socat -dd -lf <log_file> TCP-LISTEN:<from>,reuseaddr,fork TCP:localhost:<to>  # 复杂型
socat -dd -lf <log_file> -F port_forwarding.conf  # 泛用型
```

socat 默认在终端前台进行端口转发，需要后台运行的话可以[写个服务](https://unix.stackexchange.com/a/658320)，或者[终端复用](../linux/package.md#tmux)。

@tab firewalld

```sh
firewall-cmd --add-forward-port=port=<from>:proto=udp:toport=<to> --permanent
```

:::

## 我的设置

1. [增加 UDP Buffer Sizes](https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes)
2. 如果 VPS 没开 bbr 记得开。（[参考 11. sysctl 相关](../linux/install_and_config.md#系统设置)）

## 安全性

VPS 的公网 ip 会带来安全性问题，不过尝试登录的多，真正攻进去的也几乎没有。

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
- 尝试 fail2ban 等软件。（这个我不会用）

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

网上小白教程比较多的是 vmess/vless + ws + tls 的方案，这些协议比较老，基本被打烂了。我选择 trojan，也是一个比较常见的方案，相对来说安全性更高。trojan 使用 TLS 加密方案，安全性高，但是数据包比较大，现在也存在着 trojan 检测技术。

我最开始直接用 [trojan 一键脚本](https://github.com/Jrohy/trojan)[^2]。如[GFW 会主动对端口进行封禁](#对抗-gfw)，我的端口基本只能存活一天。（后来做了端口转发就基本没死了，偶尔会被 Qos(?)）

[^2]: 本来是想用 X-UI 的，然而[出了问题](#x-ui-does-not-work)

随着后来自己也使用 linux，我对于一键脚本不够满意，因此开始[自己写 trojan/trojan-go 配置文件](./trojan-go.md)。也尝试了一下 hysteria 协议，并且写了个[教程](./hysteria.md)。

评价起来就是，hysteria 延迟最低，trojan-go 小幅度落后，差得不多。trojan 延迟比较大，但是胜在兼容性强。而 hysteria 风险较大，没必要为了几十 ms 延迟去冒险，因此还是 trojan-go 适合我。

### 脚本

- [我的一键脚本](https://github.com/lxl66566/init-script)：linux 常用工具，trojan-go, trojan, hysteria
- [V2ray 脚本](https://github.com/233boy/v2ray)：融合怪，啥都有
- [trojan 脚本](https://github.com/Jrohy/trojan)：仅 trojan

### WARP

有的 IP 访问 Google 时会有机器人异常验证。可以用 [WARP 一键脚本](https://github.com/P3TERX/warp.sh)解决。

### 对抗 GFW

GFW 检测到异常就会封禁端口，若换端口继续使用则需要考虑 ip 被永久封禁的风险。trojan 本身是 TLS over TLS 加密方式，但仍然有办法识别出流量特征。

我使用如下方式降低封锁几率（**有没有用其实是不太清楚的**）：

- 反代一个伪装主页，详见[反向代理](../reverse_proxy.md)。（然而 443 早就被封了，令人感慨）
- 设置一个固定端口与一个活动端口，固定端口将流量[转发](#端口转发)到活动端口。

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
   - 当然不缺配置的话就用 zellij 了。

## 挂机

VPS 的流量可以共享，并且可以赚点小钱([src](https://post.vpslog.org/archives/gua-ji))。为了防止 IP 被污染，一般放在非主要的 VPS 上跑。

跑挂机的 VPS 就变成美国最抢手了，毕竟 openai 流媒体啥的都能解。（我的 jp 机就没法解 openai）

一般挂机都拿 docker 跑，我当然！用 [podman](../../coding/container.md) 啦。

- [PacketStream](https://packetstream.io/?psr=5wA2)：0.1\$/G，满 5\$ 可提现。
  - 流量跑得慢，80M / 36h，不过至少可用
- ~~[EarnFM](https://earn.fm/ref/LXZX43NC)~~，不可用：`Connection is halted because: This IP is a known proxy connection, therefore its not allowed.`
- [repoket](https://link.repocket.co/cwYQ): 满 20$ 可提。不可用：`Too many devices on the same IPs.`
- ~~[traffmonetizer](https://traffmonetizer.com/?aff=1578168)~~,不可用。

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
