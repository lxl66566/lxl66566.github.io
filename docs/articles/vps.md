# VPS
我与我的 VPS 的故事。

与 VPS 无关的 linux 问题请移步 [linux](../coding/linux.md)
## Price
### 20230514
|Host|Price|bandwidth|RAM|Storage|Core|
| :-: | :-: | :-: | :-: | :-: | :-: |
|[RackNerd](https://my.racknerd.com/cart.php?a=add&pid=695)|$10.28/yr|1000GB 1Gbps|768MB|10GB|1|
|[CloudServer](https://cloudserver.net/billing/index.php?rp=/store/custom-packages/leb-1gb-annual-plan)|$10.00/yr|1000GB 1Gbps|1GB|20GB|1|
|[CLOUDCONE](https://cloudcone.com/vps/)|$21.60/yr|1TB 1Gbps|1GB|30GB|1|

also see here: 
* [$1 VPS – 1 USD VPS Per Month (Updated February 2023)](https://lowendbox.com/blog/1-vps-1-usd-vps-per-month/)
* [Best Cheap VPS Hosting - Updated March 2023](https://lowendbox.com/best-cheap-vps-hosting-updated-2020/)
## about me
我本来想买 CloudServer 的（明显同价位的配置更好），然而账号被标记了危险无法付款。（无语子）。因此只能退而求其次买了 RackNerd 家的。

10G storage 打消了我自建 java server 的欲望，同时美国西海岸 VPS 的地理位置也使节点真连接延迟常年维持在 700+ms，并不适合作为游戏服务器。
<!-- |[hostEONS](https://my.hosteons.com/cart.php?a=confproduct&i=0)||2TB 1Gbps|256MB|5GB|1| -->
## SSH 工具
youtube 上（与其他教程）清一色的 finalshell，但是这种不开源的小作坊国产软件我不用。不过话说回来，对不会用 linux 的小白，finalshell 门槛确实低（图形文件系统和编辑器）。

先用了 SuperPuTTY，体验挺差，真不如用 cli。差点忘了我有 ArchWSL，于是直接 `sudo pacman -S openssl` 了（
## 安全性
VPS 的公网 ip 一定会带来安全性问题。不容忽视。
### 自检
* 可以在 `/var/log/auth.log` 中查看登录日志。我的日志里的攻击记录非常多。
* `ps aux | grep sshd` 查看有没有 `sshd: root [.*]` 类型的进程。
    * `ps aux | grep 'sshd' | grep -v 'root@pts/0\|grep\|/sbin/sshd' | awk '{print $2}' | xargs kill -9` 可以杀掉这些进程。（很粗糙了属于是）
* `less /var/log/auth.log | grep -i 'accepted'` 可以查看登录成功的记录
* `lastb -9` 可以查看最近 9 条登录失败记录

### 解法
* 可以通过修改 `/etc/ssh/sshd_config` 中的内容进行限制，例如修改 `MaxAuthTries`。
* 密码位数太少也不安全。一个简单的方法是将你的密码重复两遍。
* 限制登录 ip。修改 `/etc/hosts.allow` & `/etc/hosts.deny` 文件。
* firewalld
    :::: code-group
    ::: code-group-item basic
    ```sh
    systemctl <start | enable | stop | disable> firewalld
    firewall-cmd --state
    firewall-cmd --reload   # after change
    firewall-cmd --add-masquerade --permanent   # 伪装
    ```
    :::
    ::: code-group-item add
    ```sh
    firewall-cmd --add-port=<port>/tcp --permanent  # permanent
    ```
    :::
    ::: code-group-item show
    ```sh
    firewall-cmd --zone=public --list-all
    firewall-cmd --zone=public --list-ports # or
    ```
    :::
    ::::
    * 我写了一个脚本用于快速执行防火墙指令。
    ```bash
    function firewall --description 'enable or disable firewalld'
    set usage "usage: firewall [option]
    options: -e: enable and start firewall
            -d: disable and stop firewall"
    if [ (count $argv) -eq 0 ]
        echo $usage
    else
        switch $argv[1]
            case '-e'
                systemctl enable firewalld
                systemctl start firewalld
            case '-d'
                systemctl stop firewalld
                systemctl disable firewalld
            case '*'
                echo $usage
        end
    end
    end
    ```
## 搭建代理
有谁买了海外 VPS 不是为了搭代理的呢？
### 协议
网上小白教程比较多的是 vmess/vless + ws + tls 的方案，我选择 trojan，也是一个比较常见的方案。

我比较菜，直接用 [trojan 一键脚本](https://github.com/Jrohy/trojan)了。（本来是想用 X-UI 的，然而[出了问题](#x-ui-does-not-work)）

如果有问题可以尝试换个端口。[GFW 会主动对端口进行封禁](#对抗-gfw)，我的端口基本只能存活一天。
### WARP
发现访问 Google 时会有机器人异常验证，久而久之还是挺烦的。可以用 [WARP 一键脚本](https://github.com/P3TERX/warp.sh) 装个 WARP 解决。
### 对抗 GFW
GFW 检测到异常就会封禁端口，若换端口继续使用则需要考虑 ip 被永久封禁的风险。trojan 本身是 TLS over TLS 加密方式，但仍然有办法识别出流量特征。

我使用如下方式降低封锁几率（**有没有用其实是不太清楚的**）：
* 开启 trojan-go 而非纯 trojan
* [WARP](#warp)
* 使用 Nginx 将伪装页面（我选择我的小破博客）[部署](#nginx)到 443 端口 (80 转发 443)。（然而 443 早就被封了，令人感慨）
* 开启 cloudflare 代理
* 设置一个固定端口与一个活动端口，固定端口将流量转发到活动端口。
    ```bash
    firewall-cmd --add-forward-port=port=12138:proto=udp:toport=$trojan_port --permanent
    ```
## 包
已安装：psmisc, nvim, firewalld, curl, fd, net-tools, nginx, fish, 
### nginx
部署我的博客到 443，同时将 80 端口转发到 443.
* /etc/nginx/nginx.conf:
    ```nginx
    http {
        server {
            listen 80;
            server_name <domain name>;
            rewrite ^(.*)$ https://${host}$1 permanent;
        }
        server {
            listen 443 ssl;
            server_name <domain name>;
            ssl_certificate /root/cert/....cer;
            ssl_certificate_key /root/cert/....key;
            index index.html;
            location / {
                root /etc/nginx/myblog;
            }
        }
    }
    ...
    ```
* 重新载入：`nginx -s reload`
## 遇到的问题
### 端口被封问题
20230520：端口每天被封一次，于是写了个 fish 脚本每天更换端口并显示在伪装页面上（还作出了[其他努力](#对抗-gfw)）。脚本还是有 bug 的（我菜），`$temp` 赋值不成功，但无伤大雅。
```bash
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
    sed -i "s/MyGitHub/$trojan_port/g" index.html
    nginx -s reload
end
```
不应同时使用 firewalld 和 iptables，可能会导致混乱。由于 `firewalld` 是更高一层的抽象(?)，因此我使用之：
```bash
systemctl stop iptables
systemctl disable iptables
systemctl mask iptables
systemctl unmask firewalld
systemctl enable firewalld
systemctl start firewalld
```
### 配置了错误的 firewalld 把自己防住了
20230516：如题，乱搞 firewalld，结果忘记放行 22 端口（ssh）直接 reload，直接把我 ssh 干掉了。。。然后进 rescue mode 抢救了...

> rescue mode 是 VPS 服务商的一项服务，可以将 VPS 挂载到另一个虚拟机上，通过其对文件进行备份与修改，适用于乱搞把 VPS 搞炸了的情况。

rescue 只有 nano file editor；挂载了分区到 `test` 以后，直接 `nano /test/etc/firewalld/zones/public.xml` 加上 `<port port="22" protocol="tcp"/>`。
### X-UI does not work
我小白一个，只会跟着用简单的一键部署脚本，然后寄了。面板添加节点后，使用 v2rayN 添加服务器无法连上。

后面换了 [trojan 面板](https://github.com/Jrohy/trojan)，能正常用一阵子，但稳定性一般。