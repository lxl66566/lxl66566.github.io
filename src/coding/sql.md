---
date: 2023-06-03
icon: database
category:
  - 编程
tag:
  - 工具
---

# 数据库

本人并没有深入学习数据库，日常都是简单的基础使用。因此事先声明，不要对此文抱有过高的期望。

## 数据库选择

大概分为关系型和非关系型，分布式和非分布式，嵌入和非嵌入，还有向量数据库等...

首先有一个很重要的概念，有跟随程序分发到客户端的文件数据库（嵌入式数据库），也有作为服务器端具有本地驱动的数据库。前者的关系型主要就是 SQLite，其他常见数据库基本都属于后者。所以在 java 连接 Mysql 时出现的 `jdbc:mysql://localhost:3306/mydatabase` 就是需要先启动数据库的服务驱动，在电脑上开个端口才能使用，不像 SQLite 直接读文件。由于我初期不知道这个概念，走了很多弯路。（~~本人只是个臭写小玩意应用的，服务端数据库是什么，没听说过。~~）

然后关系型和非关系型不多说，非关系型大部分都是 KV（key-value）数据库。

如何选择：

1. 嵌入式
   - 关系型大多是 SQLite，新兴的有 [duckdb](https://duckdb.org/)。
   - KV 首选 rocksdb，据说性能高。其他还有 redb (pure rust)。
2. 非嵌入式
   - 关系型
     - MySQL/MariaDB[^1][^2] 最为泛用，学习简单，但是确实有点老了。
     - PostgreSQL 这玩意非常全能，属于宗教级别。
     - Oracle 商用要买授权，但是挺多外企用这个的。复杂是复杂，不过非常强。
   - 非关系型，纯内存的选 Redis
   - 分布式 Cassandra

[^1]: MariaDB 是 MySQL 的分支，完全开源，而 MySQL 是商业产品，部分开源。([ref](https://aws.amazon.com/cn/compare/the-difference-between-mariadb-vs-mysql/))
[^2]: ~~MySQL 已死：~~ _开源界一般用 mariadb，IT 公司一般用 percona-server。_ ——[依云](https://blog.lilydjwg.me)

## 可视化工具

要求：免费，易用，通用。

用过 DBeaver，java 写的垃圾，bug 很多。

后来换了 Beekeeper Studio，只读非常好用，写的话一般。

## SQL 语法基础

现在 GPT 写 sql 已经很厉害了，写项目只需要能看懂即可；如果面试就得掌握了。

### 学习路线

学习 sql 语法其实很简单。分几步走：

1. 基础：即单表查询，如何选表名，如何拿想要的字段并初步处理。[菜鸟教程](https://www.runoob.com/sqlite/sqlite-commands.html)
2. 进阶：多表查询，可以看看 [这个视频](https://www.bilibili.com/video/av436892344/)。
3. 性能：深入原理，学习索引的作用，查询技巧；其他性能优化（分表分库等）。
   - 索引详解，可以看[这个视频](https://www.bilibili.com/video/av951719613)的前 11 p。
   - [索引语法](https://www.runoob.com/mysql/mysql-index.html)
4. 其他依赖于特定数据库的实现，例如隔离级别与锁。这些跟 SQL 语法本身就没什么关系了。

### 多表查询

- [外键的创建](https://github.com/guobinhit/mysql-tutorial/blob/master/articles/foreign-key.md)：先创建一个正常数据（与关联的类型一致），再进行关联：`foreign key(外键字段) + references + 外部表名(主键字段);`
  - [级联](https://www.cnblogs.com/itjeff/p/11578721.html)：如果表 A 有 foreign key 关联到表 B，那么在 B 变动时可以让相关的 A 的行也变动。常用的有 `on delete cascade`（B 删除项时，A 也删除）
- 直接 `select * from table1, table2` 出来的是两表的笛卡尔积
- 内连接（显式）：`SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件...`
- 左外连接（所有的表 1 数据 + 交集）：`SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件`
- 右外连接：一般转为左外形式
- 自连接：给自己的表添加两个 alias，然后当成两张不相关的表用。

### 集合操作

对**多次**查询的结果取并集或交集的操作。

- 联合查询：
  - 两个 select 语句使用 `union all` 拼接：相当于两张表直接拼接。
  - `union` 会去重。
  - 双表列数必需一致，否则报错
- 子查询：在首次查询的结果中继续查询。子句加 `()`。
  - 子查询返回单个值：正常使用
  - 子查询返回一行或一列：当成集合使用，一般有 `in`, `not in`, `any`, `all`
  - 子查询返回一表：一般需要 `select ... where (A, B) in (select ...)` 的形式，代表满足子表中任意一行的要求

## SQLite

SQLite 没有驱动，没有压缩，没有加密，非常简单的数据库，可以被分发。作为开发者，也可以装一个 CLI 驱动，方便调试。

- Windows: use [scoop](../farraginous/recommend_packages.md#scoop). `scoop install sqlite`

### 注意事项

- Android Sqlite，`CREATE TABLE` 内部不允许尾随逗号。

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

## duckdb

duckdb 比 sqlite 具有更多的功能。

python 版本还有一个[官方推荐的 orm](https://duckdb.org/docs/guides/python/ibis.html) 可用。

rust 没有 duckdb 的原生实现，需要 bind c。

## Redis

Redis 是一个非常简单的内存 KV (key-value) 数据库，主要用来做缓存。

## MySQL 基础

- 存储引擎：
  - InnoDB（默认）支持事务和外键，而 MyISAM 不支持。
  - InnoDB 中一定有主键，主键一定是聚簇索引；MyISAM 使用的是非聚簇索引，没有聚簇索引。
  - 大量数据的全表扫描，MyISM 空间性能更好。
- 锁：
  - InnoDB 提供表锁和行锁。
    - 行锁：`SELECT ... LOCK IN SHARE MODE` 是读锁，`SELECT ... FOR UPDATE` 是写锁。
    - 表锁：`LOCK TABLES table_name READ` 和 `LOCK TABLES table_name WRITE`。需要显式解锁：`UNLOCK TABLES`。
  - MyISAM 虽然不支持事务，但是其 select 和 insert/update/delete 会自动加表读/写锁。
- 分析：
  - 语句前 + `explain` 分析此语句的详情，是否走索引。
  - `ANALYZE TABLE my_table;` 分析并存储表的关键字分布，用于优化查询。
  - `OPTIMIZE TABLE my_table;` 整理碎片。

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

## MySQL 运维

虽然之前说 MySQL 已经老了，但是由于其比较简单，现在还有非常多的企业在用，面试也是高频考点。学习一些 MySQL 并不影响对其他关系型数据库的掌握。

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

如果真的这么想，[那就大错特错了](#安装-mysql)。

### 基础

- `<C-d>` = 退出
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

### 用户管理

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

## PostgreSQL

我看到了很多 pgsql 吹（[external 2.3.](#external)），被吹得有点心动。日后可能会尝试。

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

## external

1. [MySQL 和 PostgreSQL 有何区别？](https://aws.amazon.com/cn/compare/the-difference-between-mysql-vs-postgresql)
2. [PostgreSQL is Enough](https://gist.github.com/cpursley/c8fb81fe8a7e5df038158bdfe0f06dbb)
3. [Simplify: move code into database functions](https://sive.rs/pg)
4. [分布式数据库的一致性问题与共识算法](https://thiscute.world/posts/consistency-and-consensus-algorithm/)
5. [MySQL 已死，PostgreSQL 当立](https://pigsty.cc/zh/blog/db/mysql-is-dead/)
