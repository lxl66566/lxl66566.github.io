---
date: 2022-05-04
icon: brands fa-rust
category:
  - 编程
tag:
  - 编程语言
---

# Rust

## 介绍

Rust 是一门系统编程语言，专注于安全，尤其是并发安全，支持函数式和命令式以及泛型等编程范式的多范式语言。Rust 在语法上和 C++类似，但是设计者想要在保证性能的同时提供更好的内存安全。——[百度百科](https://baike.baidu.com/item/Rust语言)

rust 掀起了一股 RIIR (Rewrite it in Rust) 的热潮。

[Awesome Alternatives in Rust](https://github.com/TaKO8Ki/awesome-alternatives-in-rust) | [A curated list of command-line utilities written in Rust](https://github.com/sts10/rust-command-line-utilities) 收录了一些 rust 优秀应用。主要是 linux cli 工具。

### 为什么推荐

#### 优点

- 高性能（系统级语言）
- 安全，生命周期与所有权机制
- 开发社区激进，更新频繁，讨论环境良好（tg: [@rust_zh](https://t.me/rust_zh)）
- 统一的代码格式、文档、测试、打包流程
  - 唯一指定顶级包管理器：cargo
- 易于打包
- 静态检查给力，能过 $\approx$ 能跑

#### 缺点

- 限制条件多，难以通过编译
- 学习曲线陡峭
- 开发周期长
- GUI 库有待进步
- [我的其他个人暴论](../gossip/fuckxxx.md#rust-有多难用)

### 如何学习

[官网](https://www.rust-lang.org/zh-CN/)有详细的 QA 与你所需要的一切。资料方面，rust 的学习资料非常多，列举几个我读过的：[external - book](#external)

我在学习初期，先读资料，然后尝试用 Rust 去解 leetcode 上的[^1]题目，看题解以后去[文档](https://doc.rust-lang.org/std/index.html)进一步搜关键字和用法。中期就该做点项目了，遇到不会的就去 [Telegram 群](https://t.me/rust_zh)问。

[^1]: 由于 rust 的 I/O 较为麻烦，leetcode （比起 _洛谷_ 等）能免去 I/O 之苦。

其他资料：

- [Rust new libraries and applications](https://lib.rs/new)

## 开发环境

### 安装 rust

rust 的安装与配置并不难。在 windows 上可以使用官方脚本一行安装 rustup 及 rust。linux 也可以选择用包管理器，详见 [Archwiki](https://wiki.archlinuxcn.org/wiki/Rust)；但是最为推荐的还是 rustup，毕竟写 rust 会经常换工具链。

使用 rustup 的好处是支持交叉编译；方便切换 nightly。坏处是不通过包管理器更新，容易忘。

### 开发

然后我使用 [vscode](./vscode.md) 作为 IDE。安装插件：

- `rust-analyzer`，开发必备
- (optional) `Rust Feature Toggler`，方便切换 features
- (optional) `crates`，更好管理依赖版本

还有一些能够优化开发体验的选项：

1. [使用 clippy](https://code.visualstudio.com/docs/languages/rust#_linting) 作为 check 指令。
2. 安装[额外的 cargo 组件](#扩展)
3. (Optional) 切换 vscode `rust-analyzer` 插件为**预发布版本**。否则对于 rust 这样的高速发展语言，跟不上进度，很容易误报。
   - <heimu>`rust-analyzer` 本身并不是很好用。经常卡。</heimu>
4. 设置 cargo fmt（[我常用的](https://github.com/lxl66566/git-simple-encrypt/blob/main/rustfmt.toml)）
   - [开启注释自动换行](https://rust-lang.github.io/rustfmt/?version=v1.6.0&search=#wrap_comments)。由于其默认不开启且还停留在 unstable（五年啊！），因此需要自行写个 `rustfmt.toml` 开启。查看 [cargo](#cargo) 小节获取更多 rustfmt 信息。
   - 自动处理与合并 use 句

## 语言基础

### 循环

Rust 的 for 循环需要跟可迭代对象，例如：

```rs
for i in 0..100 {} // i in [0,99]
for i in 0..=100.step_by(2) {} // i in { 0,2,4,6...,98,100 }
```

而类似 C++ 的 do while 循环可以写成：

```rs
loop{
  // do something
  if condition { break; }
}
```

loop 循环还可以 break 出一个值。

### [输出](https://doc.rust-lang.org/rust-by-example/hello/print.html)

`dbg!()` 宏可以在 `stderr` 中输出调试信息，会消耗所有权。`dbg!` 返回值就是输入。`dbg!` 在 release 下也会输出。

`ln` 代表结束空行。常用的就 `print(ln)!` `eprint(ln)!`，没了。`print` 系列宏不消耗所有权。`print!` 底层是 `write!`。

### 输入

输入需要使用标准库中的 `std::io`（或者其他非标准库），输入是各行的字符串，需要手动处理。

```rust
use std::io;
let mut s = String::new();
io::stdin().read_line(&mut s).expect("failed to read");
let num: i32 = s.trim().parse().unwrap(); // 转换类型过程
```

### 基础数据结构

[这里](https://skyao.io/learning-rust/docs/grammar/collection.html)可能会有一些帮助。

- 栈：Vec. 使用 `push()` & `pop()` 管理栈。
- （双端）队列：[`std::collections::VecDeque`](https://doc.rust-lang.org/std/collections/struct.VecDeque.html)
- 优先队列（堆）：[`std::collections::BinaryHeap`](https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html)
  - [Why not use d-ary heap inside rather than binary heap](https://internals.rust-lang.org/t/why-not-use-d-ary-heap-inside-rather-than-binary-heap/18765)，因此工程实践中可以不用 BinaryHeap。
- 字典 / Object / map（键值对）：[`std::collections::HashMap`](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
- 链表：[`std::collections::LinkedList`](https://doc.rust-lang.org/std/collections/struct.LinkedList.html)，但是其功能在所有权机制下被削弱了（例如，无法删除一个 iter 的值 (safe)）。rust 并不推荐使用链表，如果确实需要完整链表，可以~~自己写~~去 <https://crates.io> 多翻翻。[对于链表的实现，在 Rust 中有多种方式，比如：（摘自）](https://jasonkayzk.github.io/2022/02/20/使用Rust实现一个双向链表/)

  - 使用 Box 实现（由于 Box 本身的限制，基本只能实现单向链表）；
  - 使用 Rc + RefCell 实现（由于 RefCell 的限制，迭代器无法很好的实现）；
  - 使用 Unsafe 实现；

    不得不说手写数据结构确实是一个学习 rust 的好方式，自己写一遍，什么 \*Cell 什么 Weak 全部都能吃透。

### monad

此处特指 `Option` 与 `Result` 两种。后面的方法可以不记，实际写到再查（IDE 下拉列表看函数签名）。

- 取出值就是 `unwrap()`，有几个变体。注意会消耗所有权。
- 对内部映射，`map()` & `map_err()`
- 后面继续接 monad：`and_then()`
- 取出值的引用，可变就 `as_mut()`，不可变就 `as_ref()`。
  - 字符串特殊一点，`Option<String>` 转 `Option<&str>` 需要 `as_deref()`。
- 进阶一点，`Option<Option<T>>` 可以 `flatten()`，`Option<Result<T, E>>` 可以 `transpose()`，等等。可以读手册。

### 字符串

_Rust 的字符串所包含的问题实际上很多，此处只是冰山一角。_

<ZoomedImg alt="Rust string meme" src="/images/coding/rust/string_meme.jpg" scale="80%" />

最主要的就是 `&str` 和 `String` 两种了，前者没有所有权，后者有。

- Rust 字符串默认支持分行。使用 \ 可以使多行字符串不换行。
- Raw String：`r#"\something"#`
- 字符串转换：`to_owned()` or `to_string()` converts `&str` -> `String`（造了一个所有权）。也可以用 `into()`，更简单，但是更不直观。
- [字符串连接](https://iq.opengenus.org/rust-string-concat/)

#### 字符串修改

在 Rust 语言中，字符串采用 utf-8 编码，字符长度不一，因此 Rust 不提供下标查找字符串的方法。这让字符串的修改需要一点点的技巧。

1. 转换为`Vec<char>`后修改
   C++程序员认为这种方式非常亲切。之后若有需要，还可将`Vec<char>`重新转换为字符串。注意，Rust 中的 `char` 为 4 字节，转为 Vec 后，可进行 O(1) 查找。
   ```rust
   let s1:String = String::from("Hello我是绝对值_x");
   let mut a : Vec<char> = s1.chars().collect();
   a[5] = '你';
   let s2 = a.iter().collect::<String>();
   assert_eq!(s2,"Hello你是绝对值_x");
   ```
2. replace_range 函数
   ```rust
   let mut s1:String = String::from("Hello我是绝对值_x");
   s1.replace_range(5..=7,"你");
   assert_eq!(s1,"Hello你是绝对值_x");
   ```
   请注意，若替换范围不在 utf-8 字符的分割点上将会导致程序抛出 panic，因此不适用于变字节数的未知字符串的替换。
3. as_bytes_mut 方法(**unsafe**)
   ```rust
   let mut s1:String = String::from("Hello我是绝对值_x");
   unsafe {
     let s1_bytes: &mut [u8] = s1.as_bytes_mut();
     let s2_bytes: &[u8] = "你".as_bytes();
     for i in 0..3{
       s1_bytes[i + 5] = s2_bytes[i]
     }
   }
   assert_eq!(s1,"Hello你是绝对值_x");
   ```
   该方法异常繁琐，同样也不适用于变字节数的未知字符串的替换，但是若替换范围不在 utf-8 字符的分割点上并不会触发 panic.
   例如，将第 6 行代码改为`s1_bytes[i + 6] = s2_bytes[i]`的运行结果：
   ```rust:no-line-numbers
   Hello�你��绝对值_x
   ```

#### 其他字符串

- `std::path::{Path, PathBuf}` 是路径字符串。`Path` 没有所有权，`PathBuf` 有所有权。
- `url::Url` <Badge text="url"/> 是 url 字符串。

### 语法糖

#### 问号

<div class="subtitle">多用问号 人生会轻松很多</div>

问号用于提前返回错误。`do_something_that_might_fail()?` 等价于

```rs
match do_something_that_might_fail() {
  Ok(v) => v,
  Err(e) => return Err(e),
}
```

问号不能在正常签名的闭包中使用，例如 `for_each`，`map` 等的参数。可以用 `try_for_each`，`try_map` 等。

#### impl Trait

匿名泛型。

```rs
fn print(a: impl IntoIterator<Item = impl fmt::Display>) {
    a.into_iter().for_each(|s| println!("{}", s));
}
// equals to:
fn print<T>(a: T)
where
    T: IntoIterator,
    T::Item: fmt::Display,
{
    a.into_iter().for_each(|s| println!("{}", s));
}
```

### 并发

> 如果你对 _async/await_ 模型没有明确概念，可以看看[这篇文章](https://course.rs/advance/async/getting-started.html)入门。  
> rust 提供 _async/await_ 模型和线程模型。

关于 Send/Sync 可以看[这里](https://kaisery.github.io/trpl-zh-cn/ch16-04-extensible-concurrency-sync-and-send.html) 或者 [external 5.](#external)。做个总结（我想大家应该都看得懂）:

| Struct                  | Trait                                              |
| ----------------------- | -------------------------------------------------- |
| `Box<T>`                | Send(T) -> Send, Sync(T) -> Sync                   |
| `Arc<T>`                | (Send + Sync)(T) -> (Send + Sync)                  |
| `Mutex<T>`              | Send(T) -> (Send + Sync)                           |
| `Rc`                    | !Send + !Sync                                      |
| `Cell<T>`, `RefCell<T>` | Send(T) -> Send, !Sync                             |
| `RwLock<T>`             | (Send + Sync)(T) -> (Send + Sync), Send(T) -> Send |

> 此处暂不考虑 allocator.

将这些类型列在一起，可以发现，没有任何包装可以将 `!Send` 转为 `Send`。

#### tokio

说到并发基本上离不开 tokio。一般 `features = ["macros", "rt-multi-thread"]` 这两个是必加。

关于 tokio 可以看[入门秘籍 13 章](https://rust-book.junmajinlong.com/ch100/01_understand_tokio_runtime.html)。

- `spawn` 的 Future 都是立即在后台执行的。
- 计算密集型任务，请用 `spawn_blocking`，必要时也可以调小 blocking 池的大小。

#### 解惑

在实际并发中可能会碰到运行时才知道数量的并行 Future，而 `join!` 是编译时，tokio 的 `JoinSet` 返回值是乱序的，我们如何获取顺序的并行 Future 返回值呢？

答：用 `futures` crate 的 `futures::stream::FuturesOrdered`。具体使用方法比较难找，文档和测试代码都没有。我好不容易从 Github 搜到一个[用例](https://github.com/tensorlakeai/indexify/blob/5999be8514a4a6595aea72ec790cb526cc5ff0ac/src/blob_storage/disk.rs#L48)。

> 貌似也可以用最简单的 tokio::spawn 做（

### mod

rust 的 mod 确实会让人摸不着头脑。建议先搜几篇文章看看：

- [Rust 模块和文件 - [译]](https://zhuanlan.zhihu.com/p/73544030)

然后以下是我的一些浅薄理解，可能不正确，请自行分辨：

1. 每一个 **`.rs`文件** 和 **带有 `mod.rs` 的文件夹** 都是模块。
2. `main.rs` 是顶层模块(`crate`)，其他模块层级即为**文件目录层级**。
3. mod 后若不跟代码块，则**声明当前模块与==低层级==模块的依赖关系**；若跟代码块，则**在当前模块中声明定义一个子模块**。

例如我有一个文件结构：

```
.
|-- config.rs
|-- core
|   |-- cambridge_en_zh.rs
|   `-- mod.rs
|-- main.rs
`-- request.rs
```

则 `main.rs` 为 0 级模块，`config.rs` & `request.rs` & `core` 为 1 级模块，`cambridge_en_zh.rs` 为 2 级模块。

在某个模块中使用 `mod` 语句只能声明**更低级**的模块关系。例如，我不能在 `request.rs` 中使用 `mod core;`，因为它俩同级（1 级）。

那我们怎样在 `request.rs` 中使用 `core` 的内容呢？这就要通过更高级的模块进行中转：

```rs
// main.rs
mod request;
mod core;

// request.rs
use crate::core;  // or `use super::core;`
```

### trait

trait 可谓是 rust 核心，不是 OOP 胜似 OOP(?)，rust 学习的一大难点也是掌握 trait 的用法。

- trait 在一些方面有点像其他语言的 interface，但脱离了继承的限制，可以随时创建，随时 implement，trait 之间不需要有联系。
- trait 可以为现有的结构**附加方法**，这是多数强类型语言所不具备的。
- trait 简化了泛型的实现。（点名 C++ (<20)）
- trait 可以“继承”，指 impl 其他 trait 后才能 impl 这个 trait。最经典的就是 `Eq` 需要 `PartialEq`。
- trait 本身也是一个类型，可以 `impl trait for trait`:
  ```rs
  pub trait Process {
    fn f(&self);
  }
  pub trait Takable {
    fn take(&self);
  }
  impl<T> Takable for T
  where
    T: Process,
  {
    fn take(&self) {
      self.f();
    }
  }
  ```
  - 但是从其他模块调用 take 时需要 `use <mod_name>::Takable`。
- [TAIT](https://juejin.cn/post/7302359255330504739)：Trait alias.

### 宏

宏是很好用的东西，分为过程宏和声明宏。声明宏简单，主要用来写不定参数的函数。过程宏就是纯 Token 处理，非常复杂，可以写装饰器。

学习宏，直接去看[如何学习](#如何学习)中提到的小宏书。

- 不加 `#[macro_export]` 的话，定义的宏仅在当前 mod 可用。
- 可以定义同名宏重载系统宏，但是注意不能在同名宏里调用被重载的系统宏，否则递归。[example](https://github.com/Xavientois/die/pull/3/files)

### 其他

可以显式调用 [`std::mem::drop()`](https://kaisery.github.io/trpl-zh-cn/ch15-03-drop.html#通过-stdmemdrop-提早丢弃值) 释放值，不过一般使用代码块，让变量自动销毁，会更加清晰。[更多详细解释](https://xuanwo.io/reports/2022-41/)

## Cargo

rust 唯一官方指定包管理器：`cargo`，而且在一众语言包管理中是顶级的。

- cargo 的 dep 版本中，`xxx = 1.2.1` 指的其实是 `>= 1.2.1, <2.0.0`，与 npm 中的 `^1.2.1` 一致。

### [cargo envs](https://doc.rust-lang.org/cargo/reference/environment-variables.html)

### 全局 alias

创建 `~/.cargo/config.toml` 并写入：

```toml
[alias]
b = "build"
c = "check"
t = "test -- --nocapture"
r = "run"
u = "update"
f = "fix --allow-dirty"
```

### fmt

在 `rustfmt.toml` 里写代码的格式化选项。我一般只开 `wrap_comments`，不过也可以直接抄[前辈的](https://github.com/compio-rs/winio/blob/master/rustfmt.toml)。

### 构建

cargo build 在全局获取包与依赖的源码，并编译到 target 里。rust 的包构建体积膨胀非常厉害，而且同一份源码的编译产物可能不同[^4]，因此没有全局缓存，还是需要为每个仓库都编出中间产物。

[^4]: 哪怕同一个编译器同一个包 rust 的编译是有副作用的，比如 env 宏 build script 乃至 proc macro，都是能任意副作用的 ([ref](https://t.me/c/1264662201/550767))

不过可以试试 [sccache](https://github.com/mozilla/sccache/) 全局缓存。

### 扩展

cargo 扩展跟 git 扩展很像，只要是名为 `cargo-xxx` 的可执行文件都能视作 cargo 扩展。以下列举一些常用的 cargo 扩展应用。

<!-- prettier-ignore -->
| 名字       | 简介       |
| ---------- | ---------- |
| [miri](https://github.com/rust-lang/miri)|`rustup +nightly component add miri`，用于更严格的测试，检测内存泄漏与不安全，死锁等|
| [cargo-binstall](https://github.com/cargo-bins/cargo-binstall) | 安装 binary，减少从源码编译 |
| [cargo-bloat](https://github.com/RazrFalcon/cargo-bloat)|Find out what takes most of the space in your executable.|
| [cargo-expand](https://github.com/dtolnay/cargo-expand)|展开宏|
| [cargo-msrv](https://github.com/foresterre/cargo-msrv) | Find the minimum supported Rust version (MSRV) for your project |
| [cargo-wizard](https://github.com/Kobzol/cargo-wizard)|提供编译模板以配置为最大性能、快速编译时间或最小二进制大小。感觉一般。|
| [flamegraph](https://github.com/flamegraph-rs/flamegraph) | benchmark 火焰图 |

## 库

多看热门项目用的库，是发现好用的库的好方法。还有一个方法是水群。

有一些库几乎成为业界标准，必需掌握。

<!-- prettier-ignore -->
| 库名       | 简介       |
| ---------- | ---------- |
| anyhow / thiserror | 错误处理   |
| tokio      | 异步       |
| serde_json | json       |
| reqwest[^5]  | 简单网络   |
| clap       | 命令行工具 |
| once_cell[^3]  | 延迟创建 static 变量 |

[^3]: `lazy_static` 已弃用；LazyLock 已在 1.80 稳定，建议使用官方的。
[^5]: 为避免傻逼 openssl 造成的影响，建议添加 `feature = ["rustls-tls"]`。

另外一些库则是我用过然后觉得好用。

<!-- prettier-ignore -->
| 库名 | 简介 |
| --- | --- |
| memchr | 字符串查找 |
| assert2 / pretty_assertions | 全兼容的好看的 assert |
| die-exit | 错误处理并退出 |
| temp_testdir | 目前我在用的临时目录实现 |
| tap | 函数式工具，在链式中途拿取引用操作而不影响返回值 |
| enum-tools | 提供 enum 的常用方法 |
| pollster | 小而美，专注于 _在同步环境运行异步函数_ 一件事 |

### clap

一般我都用 `features = ["derive"]`，使用更方便，但是文档更难找，因为文档默认用的是动态添加成员。[wordinfo](https://github.com/lxl66566/wordinfo/blob/main/src/cli.rs) 的 Cli 简直是我的 clap 毕生所学（，折腾了非常久。

clap 可以跟 lazy_static 一起使用，将 CLI 设为 static，可以免去到处传参之苦。带来的问题是写测试变得更加困难。

## 打包

### [最小化二进制](https://github.com/johnthagen/min-sized-rust)

一般这样够用了。~~我虽然敏感，但没有 no-std 那么极端。~~

```toml
[profile.release]
strip = true
opt-level = "z"
lto = true
panic = "abort"
```

或者也可以看看 [cargo-wizard](#开发)。

### 交叉编译

```sh
rustup target add x86_64-unknown-linux-musl
cargo build --release --target x86_64-unknown-linux-musl
```

### release

如果只是想要用 Github CI 自动出 binary 放到 release，那么[这个 Action](https://github.com/marketplace/actions/build-and-upload-rust-binary-to-github-releases)专注于这一任务，非常好用。

当然也有其他的，我以后可能会尝试：

- [cross action](https://github.com/houseabsolute/actions-rust-cross)：使用 docker 容器进行 build，但是不提供压缩。

还有，跑 Github CI 就不得不提万恶的 openssl，我已经[喷了无数次](https://t.me/withabsolutex/1609)。如果你编译时使用自定义 target，就会寄。我搞了半天，终于搞出了[可用的 CI](https://github.com/lxl66566/git-simple-encrypt)，放在这里供参考。

## 发布

将包发布到 crates.io 上也是极其方便的，我认为甚至根本不需要 CI。直接 `cargo publish` 即可。

## 测试

assert 有 `assert!()` 和 `debug_assert!()` 之分，前者在 release 下仍然会进行 assert，而后者不会。

[assert2](https://github.com/de-vri-es/assert2-rs) 是一个全兼容 assert 的更好看的第三方库，是 [pretty_assertions](https://crates.io/crates/pretty_assertions) 进化版。

关于测试看[这一篇](https://course.rs/test/write-tests.html)就够了。小总结/补充：

- `#[cfg(test)]` 指非 test 情况下忽略代码，不会被编译。后面一般接 `mod test{ use super::*; ...}`。
- `#[test]` 后接函数，名称随意，就是真正的测试函数。
- 如果 target 是 bin，则写在 doc 中的测试不会被运行。
- `cargo test` 默认不打印 _stdout_ 输出，想打印需要 `cargo test -- --show-output`。

### cargo bench

rust 自带的 benchmark。可以参考[这篇文章](https://course.rs/test/benchmark.html)，讲的不错。

感觉 `criterion.rs` 并不好用。。毕竟不能写在文件内部做 unit bench，单独出来做成跟 pytest 那样了，我不喜欢。

## 用户界面

### GUI

GUI 是 rust 日经问题了。

一些 GUI 框架：

- [egui](https://github.com/emilk/egui)：原生 GUI，有[大项目](https://www.reddit.com/r/rust/comments/1c69mrj)，看起来不错。
- tauri：electron 的竞品，但是很灵车（许多群友都说过了）。我连 example 都跑不过。
- [slint](https://github.com/slint-ui/slint)：嗯写 DSL
- [dioxus](https://github.com/DioxusLabs/dioxus)：也是嗯写 DSL。release 0.5.0 时火了一把
- [native-windows-gui](https://github.com/gabdube/native-windows-gui)：非跨平台
- [winio](https://github.com/compio-rs/winio)：~~莓软的愚人节玩笑~~

我早期尝试过一下 iced，用不明白，不用了。

### TUI

比起 GUI，rust 重心还是在 CLI 和 TUI 上。

#### [ratatui](https://github.com/ratatui-org/ratatui)

一个广泛使用的 TUI 框架，教程还不错。

我读源码花了挺久时间。如果只想快速上手，建议狠狠抄[这个 example](https://github.com/ratatui-org/templates/tree/main/simple-async)。

用着发现个 bug，顺带 pr 了几行[^2]。

[^2]: [review 还挺严格的](https://t.me/withabsolutex/1441)，但是 member 说话又好听

## r18n

去 luoxu [随便一搜](https://luoxu.archlinuxcn.org/#g=1264662201&q=i18n)，发现 i18n 模型是个自古以来的难题。

我也找了一些看，包括 `rust-i18n`, `r18`, `i18n-embed`, `fluent-rs`，最后还是感觉 `rust-i18n` 文档清晰，模型简单，比较适合我的项目。

## external

books:

1. [Rust 语言圣经](https://course.rs/about-book.html)：圣经，文风上乘，质量高。
2. [tour of rust](https://tourofrust.com/00_zh-cn.html)：交互授课式，基础入门。
3. [rust by example](https://doc.rust-lang.org/rust-by-example/index.html)：注重例子。
4. [小宏书](https://zjp-cn.github.io/tlborm/introduction.html)：专门介绍 rust macro
5. [Rust Atomics and Locks](https://marabos.nl/atomics/)：底层并发原理入门
6. [Rust 入门秘籍](https://rust-book.junmajinlong.com/about.html)：一本既简洁又深入的书，非常值得一看（特别是 tokio 相关章节）。
7. [Rust 编程第一课 - 陈天](https://learn.lianglianglee.com/专栏/陈天%20·%20Rust%20编程第一课/00%20开篇词%20让Rust成为你的下一门主力语言.md)：比较进阶的书，写得很好，着重讲述了难点和实战

articles:

1. [Rust Learning Smart Pointers](https://silente.top/posts/Rust-Learning-Smart-Pointers/)
2. [Rust 中的闭包递归与 Y 组合子](https://nihil.cc/posts/rust_closure_and_y/)
3. 随机 [Rust Quiz](https://dtolnay.github.io/rust-quiz/)：想成为语言律师吗？
4. [为什么 Rust 需要 Pin, Unpin ？（中文翻译）](https://zhuanlan.zhihu.com/p/404818051)
5. [如何理解 rust 中的 Sync、Send？](https://zhuanlan.zhihu.com/p/64699643)
6. [Rust 的 Pin 与 Unpin](https://folyd.com/blog/rust-pin-unpin/)
7. [static, const, let 声明变量有什么区别？](https://rustcc.cn/article?id=d3954670-a58a-427d-9c0c-6666051f5cc7)
8. [An introduction to advanced Rust traits and generics](https://www.shuttle.rs/blog/2024/04/18/using-traits-generics-rust)
9. [[翻译] async: 什么是 blocking](https://bingowith.me/2021/05/09/translation-async-what-is-blocking/)
10. [Rust Runtime 设计与实现-科普篇](https://www.ihcblog.com/rust-runtime-design-1/) 及后续系列文章
