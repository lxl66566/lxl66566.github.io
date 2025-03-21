---
date: 2024-08-06
icon: cubes
category:
  - 编程
tag:
  - 包管理
  - 工具
  - 灵感
---

# 包管理器

> 前置文章：[linux - 包管理与使用推荐](../articles/linux/package.md)

20240805 晚，辗转反侧，想到了点灵感，因此有了这篇文章。

<!-- ## scoop

最早用的包管理器应该是 scoop。让我接触到只要知道名字，一行命令就能安装软件，省去所有环境变量的麻烦配置的方法。

不过 scoop 本身用 powershell 写的，只支持 windows，代码也比较捞。而且近年来直连 Github 网络质量下降，对于没有代理的新人还是不太友好的。

## pacman

我最早主用的 linux distro 就是 Archlinux， -->

## Nix

一个月前我从 Archlinux 叛逃到了 NixOS，因为 Nix 宣传的特性确实很吸引我。然而现在我只觉得上了贼船，很多宣称的优势达不到我的心理预期。（这里先不谈 [NixOS 的其他缺陷](../articles/linux/nix.md#劝退)，单谈 Nix 包管理）

1. Nix 的包多。
   - 有点扯。虽然 [repology](https://repology.org/repositories/packages) 上 Nix 的数据很好看，但是
     1. Nix 有很多不同版本的相同软件是算不同包的；
     2. 编程语言（例如 haskell）的 dev package 占了很大一部分数量，而非可使用的二进制软件包。
2. Nix 把所有包都放在一个 store 下，使用 hash 对包进行标识。
   - 既然都上 hash 了，那我肯定期望我能安装任何包且不发生冲突，并且我更新的任何依赖都不应该 break 上层应用版本。然而：
     - 安装同一个包的不同 feature 会冲突，例如 _yt-dlp_ 和 _yt-dlp-light_。这倒能理解，毕竟系统也不知道要用哪个链到 `/etc/profiles/per-user/<user>/bin/`。
     - 关于更新依赖 break 版本，我自己就亲身经历了一次：前段时间的 python 更新到 3.12 break 了一大堆包，例如我用的 activitywatch。原因大概是 **nix 通过 `flake.lock` 锁全局版本**，而软件自己是不锁自身依赖版本的。`pkgs.python`（无版本后缀）是滚动更新的，它更新到 3.12，依赖它的包也会自动更新依赖。如果要指定旧版本应该需要依赖 `pkgs.python311`，这也是 Nix 不同版本算不同包的一个原因吧。但这就让我很不爽，因为一个软件而锁死整个系统版本，要么就放弃这个软件，那跟一般的发行版不是差不多吗？你都上了 hash，膨胀了这么多路径，还这么捞？
     - 由上述，`pkgs.python311` 和 `pkgs.python313` 也是不能同时装的。。。因为这两个算是平等的两个包，而不是同一个包的新旧关系，系统不知道用哪个。。当然如果只是作为其他软件的依赖，是可以共存的。这算是一点微弱优势，但是挽回不了局面；并且很吃打包者水平（很多就直接依赖 `pkgs.python` 完事了，而不会去依赖 `pkgs.python311`），否则此次 break 就不该发生。
3. Nix 不推荐打 bin 包，每个包都从源码编译（如果有的话），bin 则通过 cache server 和 mirror server 提供。
   - 首先大家想必都喜欢用 bin 包吧，就连 Gentoo 也 goes Binary 了不是吗。~~我超喜欢，甚至写了 [bpm](https://github.com/lxl66566/bpm)（~~
   - 第一次听到这个 cache 的思路觉得还挺清奇的，这样确实没有必要多打一个 bin。但是实际体验并不佳。
     1. 官方的 cachix 在国外，速度慢，没多少人用。
     2. 一般大家都是用各高校镜像站，然而 Nix 镜像不像其他滚动镜像只存一个最新版本，Nix 是需要存多个版本的。高校镜像的钱也不是吹来的，本来包就多，还有国内 PCDN 恶意刷流，在此之上还要保证足够服务质量算是比较困难了。于是镜像站同步速率放缓，也会导致 update 时有的软件包在 cache 里找不到需要自己编译，到头来不打 bin 包吃亏的还是自己。
     3. 有一些第三方提供自建 cache server 的服务，例如 garnix。但是人家是新兴商业公司，免费版限时，而且据说经常卡死，把时间配额耗完。而且自建 cache server 只是换了个地方编译而已，本质还是编译，并没有为全球变暖做出什么改善。
   - 结果就是我也能看到有挺多人打包了 bin 上去，bin 和 unbin 混在一起，反而让人迷惑。
   - 随着包越来越多，cache server 的编译负担会越来越重。服务器的性能不是无限增长的。别人已经编译过一次的 bin 包还需要 cache server 再次编译，感觉也不是很 bin。
   - 自己改过的 drv 一定需要重新编译，即使只是改一个运行参数。
4. store 下的包通过链接进系统。
   - NixOS 管理整个系统，没什么好说。好处是可以玩一些 root on tmpfs 的骚操作，最大的问题是 NixOS 这样搞不支持 [FHS](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) 标准，装个啥软件，找个啥 lib，搞个啥编程开发，全部都要自己去写 `shell.nix` 或 `flake.nix`。像我这种愣头青，还不会 nix 语法就直接莽上 NixOS 的就很难受，干个啥都相当于打包（文档还烂）。
     - nix 语言的学习曲线也是公认的陡峭；而且难的不是语言，而是 builtin functions/variables，查也查不到。例如我想看看 `wrapProgram` 的详细用法，结果到处搜不到文档，最后求助群友问哪里能看详细 manual，群友扔给我 Github 源码… 这种学习的 overheads 不可谓不高。
   - 我感觉坏处是比好处大的。
5. 版本回退时会清空应用数据，例如 microsoft edge，telegram。回退其实比想象中要频繁，例如一发 rebuild 在后期失败了，再次回到 old conf 时就算是回退。于是我莫名其妙丢失了许多应用数据与 cookies。

除了这些特性，还有一些表现：

1. Nix 每次更新下载全量 nixpkgs metadata，是一个经典的 40+M 的 `.tar.gz`，里面包的啥玩意没拆过不知道，但是这量还是有点大的。看看隔壁 Arch，人家 binary 数据库也就 10M 左右。（emmm，不过人家 core 包量级确实小，好像也没得说）

## 打包

### 语言

Arch 用的 PKGBUILD 是简单粗暴 bash。虽然也可以引入个 python 依赖去写 py，但是总归是不方便的。

Nix 自身即高级函数式语言，但是前面提到学习曲线陡峭，加之 Nix 的报错非常模糊，因此我也不喜欢。

### 更新

Arch 软件包需要自己关注版本更新，并且手动 update version。虽然有例如 updpkgsums 等东西帮我把其他的活干完，但这也只能算是半自动。而且如果不开隔离环境，打出来的包可能在其他人系统上跑不了，因为我有的依赖别人不一定有。

Nix 好一点，Nix 打包默认隔离环境，也就是所有系统上的 build 表现应该是一样的。因此上 nixpkgs 提交软件包只要跑过了 CI 就没啥问题。但是 PR 也都要人来合，不像 Arch AUR 归自己，想 push 就 push。因此也只能算是半自动。

貌似也有一些 bot 提供了简单的全自动实现，例如 Arch 的 lilac，不过我没用过不清楚效果，nixpkgs 这里也不懂有没有 update bot（应该得有吧），反正有个 nixpkgs-merge-bot。

## 我的灵感

喷了一大通，总算来到了灵感环节。我夜里想到一个 ~~universal package manager~~ 的方案（名字被用了！）。可能有一些尚未考虑到的 cases，如果能帮我指出，我会非常感激。

### 前端

- 支持所有脚本语言编写构建脚本！与其做一个类似 nix 的万能但难学的语言，不如充分利用现有语言。提供内置的 python, lua, amber, nix, fish, zsh, nu, javascript... 语言解释器的下载。构建脚本继承 PKGBUILD 的简单粗暴，分成几个阶段（pre-, install, post-），每个阶段只需要用对应解释器运行对应代码即可。
  - 不防恶意代码，但会在隔离环境构建（bwrap）。
- 所有的 `-bin`, `-git` 和指定的 version 都算作同一个包，写在同一个 manifest 里面。安装时默认优先安装 bin 包，也可以指定行为。
- 可以用任意结构化格式储存 manifest！json, toml, yaml, ron, 甚至非结构化的 markdown!
- 打包脚本提供少量 builtin 变量，例如 `#OUT#`，`#TMP#`，`#ARCH#` 等，执行时直接全局替换完事。也可以选择不使用，而直接在脚本中调库获取。这样可以最小化打包者的心智负担。
- 在打包脚本中写版本更新与测试逻辑！方便使用 CI 全自动更新版本。（经验来自 dependabot）
- 每个打包脚本内都有依赖锁（hash + version），保证依赖版本不变。更新单个包绝不会破坏其上层软件包。

### 后端

- 类似 Nix，使用 hash 前缀，将所有软件包放在一个地方统一管理！允许多版本共存，并将脚本中指定的内容**遵循 FHS 标准**链接到标准位置。
  - ~~统一管理就不用像 pacman 那样存所有软件的安装文件位置。只需存一个 hash 即可。~~ 呃，还要存链接位置，差不多
  - 多版本名字冲突无法链接到同一位置？在链接后加上版本号解决；最高版本优先（无需添加版本号）。
  - 显然一次链接几万个文件开销比较大，因此不能像 nix 那样玩 root on tmpfs。
  - 链接的目的是什么？让依赖 FHS 的**第三方软件/插件**能够正常运行。但是通过包管理器本身安装的软件还是正常隔离环境运行的。
  - 如果第三方软件不读符号链接？爬。
    - 要么要用的人自己写 wrapper，从 store 链；要么就自己打包。

### 分发

- P2P torrent 网络分发，所有下载了包的人都自动加入上传。
  - 为了防止恶意修改包后上传，每个包都会过两种不同的 hash 算法；hash 值是交给中心 server（github） 存储的，不会被篡改。
- (Optional) 只下载不上传？~~学习 PT 站经验~~ 开个玩笑

### 基础设施

写一点 converter 把 AUR 和 Nix 那边的现有打包脚本偷来（）

## external

- [现代软件打包者的安全噩梦](https://zhuanlan.zhihu.com/p/782348147)，但是我不太赞同
