---
date: 2026-11-20
icon: solid/floppy-disk
category:
  - 编程
  - 教程
tag:
  - 磁盘
  - 尝鲜
  - 探索
---

# 节省磁盘空间

比起其他语言，Rust 最大的问题是编译产物实在是太大了。几十 GB 的 target 遍地走，上百 GB 的 target 也比比皆是。如果再加上 worktree 开发，几个 worktree 就占用几倍的磁盘，我都不敢想象 SSD 会有多酸爽。

2026 年存储大涨的环境下，2TB 的 SSD 已经比我的二手 7950x 更贵了，必须做点什么来保护 SSD 了。

## 编译缓存

在探索节省磁盘空间之前，先来说几个编译产物缓存工具。

之前几年比较流行 sccache 这个东西：sccache 维护一个中心 store 并在编译时检测 hash，如果命中已编译的产物则会拷贝到 target。但是 sccache **并不能节省磁盘空间**，它只是用来加速构建的：假如你有 n 个副本，在 NTFS 上会占用 n+1 的存储空间（比原来占用得还多一份）！另外 sccache 在 CoW fs 上也[不支持 reflink](https://github.com/mozilla/sccache/issues/1053)，因为中心 store 存储的不是原内容而是压缩后的内容，因此也是占用 n+C 的空间（C 是某个 <=1 的常数）。在存储价格高涨的现在，不再推荐使用 sccache。

kache 是 sccache 的竞争者，kache 专注于减小磁盘占用，最大程度使用 reflink 节省磁盘空间，在 CoW fs 上可以混得很好。虽然代码基本都是 vibe coding 出来的，质量比较堪忧，但也勉强能用。

- 用 kache 的时候发现并提了 [#1979](https://github.com/kunobi-ninja/kache/issues/1979)，我觉得这真不是人类能写出来的代码吧，only LLMs can do。
- 另外别人的 [#1825](https://github.com/kunobi-ninja/kache/issues/1825) 也报告了 kache 2.0 缓存命中下降过多的问题。不过我的 nixpkgs 比较老，刚好装到 kache 1.x，reflink 这些功能都是全的。

## rust incremental 编译的问题

rust 默认对 dev/test 开启 incremental 编译，但是这玩意的问题实在是太多了。incremental 的原理是把 codegen-units 设为 256，把每一个 unit 拆细，然后再在 `target/debug/incremental/` 里维护一个依赖图，基于依赖图进行重新编译。那么这里有几个问题：

- codegen-units 高了就没法做复杂优化，默认的 16 我都嫌高，这玩意 256？所以导致 debug / test 的性能会下降。还有一堆 .o 小文件会崩你的 IO。
- 额外生成的这份 `target/debug/incremental/` 依赖图会一直滚动，谁来清？答案是——[不清](https://github.com/kevinthelago/base-studio-code/issues/3821)。所以用 zdu 等 du 工具扫 target，经常能扫到 incremental 是大头，因为它根本就不会清啊，项目迭代几轮就爆炸了。

incremental 在历史上还有非常非常多问题，例如 [#162240: rustc 在每次增量重编时都会额外多保留一份冗余快照，target/ 体积膨胀 20%](https://github.com/rust-lang/rust/pull/162240)，等等，不想多说了。

建议任何平台下都关闭 incremental 编译：`CARGO_INCREMENTAL=0`。

## 我的探索

在有了上面的编译缓存说明后，我们就知道了：节省磁盘空间基本算是只有 NTFS user 或者 ext4 user 需要考虑的东西，其他带 CoW 的 fs 可以直接 kache 复用编译产物，甚至不跑在线去重都可以获得不错的省磁盘效果。比如我在 btrfs 上跑一个 bees 离线去重，就可以节省大量空间。（虽然离线去重并不能节省 I/O 量和 SSD 寿命）

于是四舍五入（~~四舍指的是舍掉 ext**4**~~），只有 Windows NTFS 用户受伤的世界达成了。而我恰恰在 Windows 上开发比较多，又恰恰在 Windows 上有大量游戏资源 / galgame 占用空间……就非常蛋疼。

### CARGO_TARGET_DIR

首先我尝试使用 CARGO_TARGET_DIR 指向同一个 dir，复用 target。

CARGO_TARGET_DIR 的一个已知问题是编译会加锁，不同的 worktree 之间只能串行编译，不过我不太在乎这个，因为对于 32 核 20500H/s 的 7950x CPU 来说，编译时长只占 multi agent 开发的一小部分，完全可以接受。

但是没过多久就踩了第一个大坑：链接到了错误的 rlib。

cargo 每个 unit 的编译产物（rlib）文件名带有一个 hash，这个 hash 是从（包名 + 版本 + target 名 + profile + feature + 每个依赖自己的哈希……）构造的；问题是，这个 hash 不包含源码的 path。因此我创建的不同 worktree 的编译产物就会撞 rlib hash，然后 cargo 就直接寻思这（个 worktree 创建的）rlib 也没人要呢，俺拾咧，就链接到 binary 里了，然后就会产生一些不符合预期又非常难排查的结果。

- 例如 `env!(CARGO_MANIFEST_DIR)` 是直接展开进 rlib 的，链接错误的 rlib 之后运行时去拉 CARGO_MANIFEST_DIR 就会拉错位置。

除非改 cargo 的构建流程，否则没有任何方法可以规避这个问题，只能放弃复用 CARGO_TARGET_DIR。

### vhdx 挂 ReFS

咨询 AI，得知微软有个 dev drive 专门处理开发者的小玩具。于是尝试了一下。这玩意本质上就是创建一个 ReFS 的 vhdx 文件（就是 WSL 用的那种 vhdx），然后挂载到盘符上即可。而 ReFS 是 Windows 原生支持的带 CoW 的 fs，因此可以吃上 kache 的编译缓存。详细步骤如下：

1. 创建 C:/devdrv，写入两个 txt：
   ::: code-tabs

   @tab C:/devdrv/create.txt

   ```text
   create vdisk file="C:/devdrv/builds.vhdx" type=expandable maximum=300000
   attach vdisk
   create partition primary
   assign letter=V
   ```

   @tab C:/devdrv/attach.txt

   ```text
   select vdisk file="C:/devdrv/builds.vhdx"
   attach vdisk
   assign letter=V
   ```

   :::
2. 创建 dev drive：
   ```sh
   sudo diskpart /s "C:/devdrv/create.txt"
   sudo format.com V: /DevDrv /Q /Y
   # 验证
   sudo fsutil devdrv query V:
   sudo fsutil fsinfo refsinfo V:
   ```
3. 登录时自动挂载。我不喜欢用我无法掌控的 Windows 计划任务，所以选择了 [user-startup](https://github.com/lxl66566/user-startup-rs)：`user-startup add "sudo diskpart /s C:/devdrv/attach.txt" -n DevDriveMount`
4. 配置 kache：
   ```sh
   kache config set cache.local_store 'V:/kache'
   kache config set cache.cache_executables true
   kache config set cache.local_max_size 100GiB
   kache config set cache.explain_miss true
   kache daemon restart  # 需要启动两次，首次可能超时
   kache doctor
   ```
5. 将项目设为使用 V 盘存放 target 即可。写入每个 worktree 的 `.cargo/config.toml`: `[build] target-dir = "V:/targets/<repo>/<branch>`。注意 `.cargo/config.toml` 需要 ignore 掉，因为每个 worktree 的都不同。
6. 编译完成后，使用 `kache report` 验证缓存命中率。

然后就可以愉快地使用 ReFS 了。

我就这么兴高采烈地使用了一天，~~还特地清了 80GB 的 osu! std 谱面庆祝 ReFS 的诞生~~。然后玩着 galgame 时，我的机械盘突然就转起来了，电脑变得非常卡，一看发现 SSD 已经被打爆了，只剩 7G 的可用空间，ReFS 也挂了，cargo 和 zdu 进程全部卡死。乃大惊，问垃圾何处来，发现 vhdx 占用了超过 160GB 的空间，但是 V 盘里显示只有 90GB。

咨询 AI 以后才想起来，windows 的 vhdx 是**只增不减**的，而我当时设的容量上限是 300GB，远超磁盘的剩余空间。vhdx 只增不减已经坑死了无数 WSL 用户，然而我家里的电脑并没有受过 NixOS-WSL 的压测洗礼（只装了一个 ArchWSL 偶尔跑点交叉编译），所以我并没有意识到这个问题。只要跑几次 fuzz 生成 corpus、或者 LLM 随便做点小动作就会往 ReFS 里瞬时写入过量数据，vhdx 快速扩容，进而打爆我的物理磁盘。

### 移动硬盘挂 ReFS

被 vhdx 好好上了一课以后，我把我的 V 盘和 vhdx 销毁了，这种不定时炸弹真的不敢再用。

那么我用物理盘做外接 ReFS 会怎样呢？钞能力启动！刚好一年前买了个 m.2 盘盒，刚好拆机拆的 m.2 还在吃灰，因此就直接格盘然后在 V 盘挂上了物理 ReFS。

这个 m.2 是我从服役多年的笔记本里拆出的 500G 系统盘，经历过 60 多次 P/E 周期，寿命比起本机的 SSD 更是风中残烛，但是放编译产物，偶尔炸两声也问题不大。于是我 zcode 一发闲时任务跑满 5 subagents 并发就去睡觉了。

醒来发现 commits 远比我想象中的少，一看设备，大惊，老子的 V 盘怎么消失了？然后磁盘管理器和 DiskGenius 都看不到设备，插拔以后发现 _跟这台计算机连接的前一个 USB 设备工作不正常，Windows 无法识别它。_，我才慢慢接受，这个残烛已经死透了，估计是被烫死的。5 并发还是太权威了。

### 之后要怎么办？

如果还要再把我本机的 SSD 分一块给 ReFS，那是万万不可的。

还是尽量多在我的 Linux server 上搞开发吧，必须在 Windows 上跑 zcode 闲时任务的话，还是用我的 [shell-proxy](https://github.com/lxl66566/shell-proxy) 代理过去。

然后得安排好跨项目的 flock，为了在 server 上同时跑多个 AI 开发多个项目，而不用担心 benchmark 被影响。
