---
date: 2023-06-03
icon: mysql
category:
  - 编程
tag:
  - 工具
---

# 数据库

大概分为关系型和非关系型，分布式和非分布式...

## 数据库选择

首先有一个很重要的概念，有跟随程序分发到客户端的文件数据库，也有作为服务器端具有本地驱动的数据库。前者主要就是 SQLite，其他常见数据库基本都属于后者。所以在 java 连接 Mysql 时出现的 `jdbc:mysql://localhost:3306/mydatabase` 就是需要先启动数据库的服务驱动，在电脑上开个端口才能使用，不像 SQLite 直接读文件。

由于我初期不知道这个概念，走了很多弯路。（~~本人只是个臭写小玩意应用的，服务端数据库是什么，没听说过。~~）

常见的数据库：

- 文件型大多是 SQLite，不过也有 [duckdb](https://duckdb.org/)。
- 关系型一般选择 MySQL, PostgreSQL, 追求极致性能可以选 OracleDB，
- 非关系型 Redis, MongoDB，分布式就 Cassandra 等等。

（反正都没用过，以上信息都是浅浅了解的）

## SQLite

SQLite 没有驱动，没有压缩，没有加密，非常简单的数据库，可以被分发。不过作为开发者，建议还是装一个驱动吧。

- Windows: use [scoop](../farraginous/recommend_packages.md#scoop). `scoop install sqlite`

基本使用，去看[菜鸟教程](https://www.runoob.com/sqlite/sqlite-commands.html)。

### 压缩

SQLite 本身不具备压缩功能，而我非常看重压缩，因此我使用 [sqlite-zstd](https://github.com/phiresky/sqlite-zstd) 进行压缩。

具体使用，我试过 rust crates，结果发现 sqlite-zstd 和 rusqlite 的依赖冲突了(?)，python3 的库就嗯装不上。。因此只能使用最基本的 dll，即在 `.open` 后 `.load sqlite_zstd.dll`，dll 是在 Release 里下的，然后调用 `select zstd_enable_transparent(...);` 和 `select zstd_incremental_maintenance(null, 0.05);`，效果其实不是很理想：其压缩功能只针对 `TEXT / BLOB` 类型才可使用，同时具有一定额外开销。

嘛，我真正需要的压缩大概是透明压缩的吧...

### python

```py
import sqlite3
conn = sqlite3.connect("xx.sqlite")
cursor = conn.cursor()
cursor.execute(f"""create table if not exists sheetname(
    user1 varchar not null,
    user2 varchar,
    money real
)""")
cursor.execute(f"""insert into sheetname values(..., ..., ...)""")
conn.commit()
cursor.close()
conn.close()
```

### rust

随便找个 [gpt](../farraginous/recommend_websites.md#ai-工具) 写吧。我目前看到有 rusqlite 和 sqlx 两套库可以选择。

## mysql 运维

我是一个完全不懂数据库的非计专业学生，但我需要为部门维护数据库（

### 键位

- `<C-d>` = 退出

### 基础改查

```sql
mysql -p  # 登录
show databases;
use xxx;
show tables;
select * from users where sID = 'xxx';
delete from users where sID = 'xxx';
update users set sBalance = 1000.00 where sID = '...';
```

- 查看 sql 历史指令：`less ~/.mysql_history`

### 备份与恢复

mysqldump 是热备份，即无需关闭 mysql 服务。

```sh
# 备份
sudo mysqldump -p <database name> > bak-time.sql
rsync -avz <sshname>:<file_path> <destination_path>
# 恢复
create database <database_name>;
mysql -u <user_name> -p <database name> < <dumpfile>
```

### 安装

有了 Mariadb 的[前车之鉴](#安装-mariadb)，安装 mysql 不再是问题——

```sh
sudo pacman -S mysql
sudo chmod +rx /var/lib/mysql
sudo rm -rf /var/lib/mysql/*
sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl start mysqld
sudo mysqld
```

如果真的这么想，那就大错特错了。

### 创建

```sql
sudo mysql
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'new_user'@'localhost';
FLUSH PRIVILEGES;
\q
# then login
mysql -u <user_name> -p
```

## MariaDB

MariaDB replaces mysql (( ([src](https://archlinux.org/news/mariadb-replaces-mysql-in-repositories/))

安装问题可以看看 [安装 MariaDB](#安装-mariadb)。

安装后，可以将 mysql 看成 mariadb 的 alias。有的 mysql 指令直接用会报 deprecate warning，无所 x 谓。

> 我原以为 mariadb 这么高的兼容度完全可以直接用，没想到被 django 打脸。  
> 真的吗？

### 从 mysql 导入

首先[获取到 mysql 的 dumpfile](#备份与恢复)，尝试直接恢复报错：`Unknown collation: 'utf8mb4_0900_ai_ci'`。

于是直接 `sed -i 's/utf8mb4_0900_ai_ci/uca1400_as_ci/g' test.sql` 再导入，问题解决。([ref](https://dba.stackexchange.com/a/314442))

## 遇到的问题

### 安装 Mysql

init 阶段获取到了一个默认密码。[安装](#安装)后直接 `sudo mysqld`，提示：

> 2023-10-21T10:21:00.659995Z 0 [ERROR] [MY-010123] [Server] Fatal error: Please read "Security" section of the manual to find out how to run mysqld as root!  
> 2023-10-21T10:21:00.660021Z 0 [ERROR] [MY-010119] [Server] Aborting  
> 2023-10-21T10:21:00.660109Z 0 [System] [MY-010910] [Server] /usr/bin/mysqld: Shutdown complete (mysqld 8.0.34) Source distribution.

`sudo mysqladmin -u root -p login`：_error: 'Your password has expired. To log in you must change it using a client that supports expired passwords.'_

加上了 `--skip-password` 后，_error: 'Access denied for user 'root'@'localhost' (using password: NO)'_ 仍然不行。

吃了个晚饭，清空了下脑子的缓存，然后直接 `mysql -u root -p` 输入默认密码就好了。。这是我没想到的。

进去以后重置下密码：`ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';`。

### 安装 MariaDB

被 mysql 的初始化折磨了好久（~~结果发现这位一样折磨~~）。在 archlinux 上折腾 mysql 久无果，得知 [mariadb](#mariadb) 兼容 mysql，因此换用之：

```sh
sudo pacman -Rs mysql
sudo pacman -S mariadb libmariadbclient mariadb-clients
```

然后直接 `mariadb` 报：_Can't connect to local server through socket '/run/mysqld/mysqld.sock' (2) when trying to connect_

没有启动服务，启动之：`sudo systemctl start mariadb`，报：

> Job for mariadb.service failed because the control process exited with error code.  
> See "systemctl status mariadb.service" and "journalctl -xeu mariadb.service" for details.

`sudo journalctl -u mariadb.service`，log 显示

> [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.  
> [Note] Plugin 'wsrep-provider' is disabled.  
> [ERROR] Could not open mysql.plugin table: "Table 'mysql.plugin' doesn't exist". Some plugins may be not loaded  
> [ERROR] Unknown/unsupported storage engine: InnoDB  
> [ERROR] Aborting  
> mariadb.service: Main process exited, code=exited, status=1/FAILURE  
> mariadb.service: Failed with result 'exit-code'.  
> Failed to start MariaDB 11.1.2 database server.

麻了，尝试 `sudo mysql_install_db --user=mysql --ldata=/var/lib/mysql/`，一样报错。提示 `/usr/bin/mysql_install_db --defaults-file=~/.my.cnf`，结果根本没有 `~/.my.cnf`。

漫长的试错，最后：

```sh
sudo rm -rf /var/lib/mysql/*
sudo mysql_install_db --user=mysql --ldata=/var/lib/mysql/
sudo systemctl start mysql
```

才解决。感觉像是从 mysql 换到 mariadb 没有删 `/var/lib/mysql/` ，不兼容导致的。
