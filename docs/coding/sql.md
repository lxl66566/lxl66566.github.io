# 数据库
大概分为关系型和非关系型，分布式和非分布式...
## 数据库选择
首先有一个很重要的概念，有跟随你的程序分发到客户端的数据库，也有作为服务器端具有本地驱动的数据库。前者主要就是 SQLite，其他常见数据库基本上都属于后者。所以在 java 连接 Mysql 时出现的 `jdbc:mysql://localhost:3306/mydatabase` 就是需要先启动数据库的服务驱动，在你电脑上开个端口才能使用，不像 SQLite 直接读文件。由于我初期不知道这个概念，走了很多弯路。

> ~~本人只是个臭写应用的，服务端数据库是什么，没听说过。~~

常见的数据库，关系型一般选择 MySQL, PostgreSQL, 追求极致性能可以选 OracleDB，还有非关系型 Redis, MongoDB，分布式就 Cassandra 等等。（反正都没用过，以上信息都是浅浅了解的）
## SQLite
SQLite 没有驱动，没有压缩，没有加密，非常简单的数据库，可以被分发。不过作为开发者，建议还是装一个驱动吧。
* Windows: use [scoop](../farraginous/recommend_packages.md#scoop). `scoop install sqlite`

基本使用，去看[菜鸟教程](https://www.runoob.com/sqlite/sqlite-commands.html)。
### 压缩
SQLite 本身不具备压缩功能，而我非常看重压缩，因此我使用 [sqlite-zstd](https://github.com/phiresky/sqlite-zstd) 进行压缩。

具体使用，我试过 rust crates，结果发现 sqlite-zstd 和 rusqlite 的依赖冲突了(?)，python3 的库就嗯装不上。。因此只能使用最基本的 dll，即在 `.open` 后 `.load sqlite_zstd.dll`，dll 是在 Release 里下的，然后调用 `select zstd_enable_transparent(...);` 和 `select zstd_incremental_maintenance(null, 0.05);`，效果其实不是很理想：其压缩功能只针对 `TEXT / BLOB` 类型才可使用，同时具有一定额外开销。
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
随便找个 gpt 写吧。