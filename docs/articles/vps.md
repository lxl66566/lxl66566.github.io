# VPS
我与我的 VPS 的故事。
## Price
### 20230514
|Host|Price|bandwidth|RAM|Storage|Core|
| :-: | :-: | :-: | :-: | :-: |
|[CLOUDCONE](https://cloudcone.com/vps/)|$21.60/yr|1TB 1Gbps|1GB|30GB|1|
|[RackNerd](https://my.racknerd.com/cart.php?a=add&pid=695)|$10.28/yr|1000GB 1Gbps|768MB|10GB|1|
|[CloudServer](https://cloudserver.net/billing/index.php?rp=/store/custom-packages/leb-1gb-annual-plan)|$10.00/yr|1000GB 1Gbps|1GB|20GB|1|

also see here: 
* [$1 VPS – 1 USD VPS Per Month (Updated February 2023)](https://lowendbox.com/blog/1-vps-1-usd-vps-per-month/)
* [Best Cheap VPS Hosting - Updated March 2023](https://lowendbox.com/best-cheap-vps-hosting-updated-2020/)

<!-- |[hostEONS](https://my.hosteons.com/cart.php?a=confproduct&i=0)||2TB 1Gbps|256MB|5GB|1| -->
## SSH 工具
youtube 上清一色的 finalshell，但是这种不开源的小作坊国产软件我不可能用。不过话说回来，对不会用 linux 的小白，finalshell 门槛确实低（图形文件系统和编辑器）。

先用了 SuperPuTTY，体验挺差，真不如用 cli。于是后面直接 ArchWSL 里 `sudo pacman -S openssl` 了（
## 安全性
VPS 的公网 ip 一定会带来安全性问题。不容忽视。
### 自检
* 可以在 `/var/log/auth.log` 中查看登录日志。我的日志里的攻击记录非常多。
* `ps aux | grep sshd` 查看有没有 `sshd: root [.*]` 类型的进程。
### 解法
* 可以通过修改 `/etc/ssh/sshd_config` 中的内容进行限制，例如修改 `MaxAuthTries`。
* 密码位数太少也不安全。一个简单的方法是将你的密码重复两遍。
* firewalld
:::: code-group
::: code-group-item basic
```sh
systemctl <start | stop> firewalld
firewall-cmd status
firewall-cmd --reload   # after change
```
:::
::: code-group-item add
```sh
firewall-cmd --permanent --add-port=<port>/tcp  # permanent
```
:::
::::
## 遇到的问题
### 配置了错误的 firewalld 把自己防住了
20230516：如题，乱搞 firewalld，结果忘记放行 22 端口（ssh）直接 `firewall-cmd --reload`，直接把我 ssh 干掉了。。。然后进 rescue mode 抢救了...

rescue 只有 nano file editor；挂载了分区到 `test` 以后，直接 `nano /test/etc/firewalld/zones/public.xml` 加上 `<port port="22" protocol="tcp"/>`。
### X-UI does not work
我小白一个，只会跟着用简单的一键部署脚本，然后寄了。面板添加节点后，使用 v2rayN 添加服务器无法连上。

后面换了 [trojan 面板](https://github.com/Jrohy/trojan)，能正常用一阵子，但稳定性堪忧。