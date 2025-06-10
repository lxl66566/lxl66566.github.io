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

- 我在学习初期，先读资料，然后尝试用 Rust 去解 leetcode 上的[^1]题目，看题解以后去[文档](https://doc.rust-lang.org/std/index.html)进一步搜关键字和用法。
- 中后期就完全在做项目了，遇到不会的就去 [Telegram 群](https://t.me/rust_zh)问。

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
- (optional) ~~`crates`~~ （已改名为 `Dependi` [^crates]），更好管理依赖版本

[^crates]: <https://t.me/QC_Grove/734>

还有一些能够优化开发体验的选项：

1. [使用 clippy](https://code.visualstudio.com/docs/languages/rust#_linting) 作为 check 指令。
2. 安装[额外的 cargo 组件](#扩展)
3. ~~切换 vscode `rust-analyzer` 插件为预发布版本~~ 算了，预发布经常出 bug。
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
loop {
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

### container

- [Rust Memory Container Cheat-sheet](https://github.com/usagi/rust-memory-container-cs)

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

<div class="subtitle">——多用问号 人生会轻松很多</div>

问号用于提前返回错误。`do_something_that_might_fail()?` 等价于

```rs
match do_something_that_might_fail() {
  Ok(v) => v,
  Err(e) => return Err(e),
}
```

问号不能在正常签名的闭包中使用，例如 `for_each`，`map` 等的参数。可以用 `try_for_each`，`try_map` 等（如果有的话）。

或者等他娘的 [try_blocks](https://github.com/rust-lang/rust/issues/31436) 稳定。

#### impl Trait

匿名泛型，可以让你少写点东西。

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

#### Future

每个 async 函数返回的都是一个 `Future<Output = ...>`。Rust 的 Future 不像其他语言那样创建即执行，而是需要通过 poll 执行并推进。

- 手写 Future 要注意，如果返回 `Poll::Pending`，必需要在前面调一次 wake。
- 手动 `impl Future for Xxx` 比较复杂，要手写状态机，因此如果不是写底层库，一般就 `impl Xxx { async fn call() }`，虽然调用时不能直接 `.await` 而需要 `.call().await`，但是能够极大降低心智负担。

#### Send/Sync

关于 Send/Sync 可以看[这里](https://kaisery.github.io/trpl-zh-cn/ch16-04-extensible-concurrency-sync-and-send.html) 或者 [external articles 5.](#external)。

- 另一个理解是：Send：对象的 &mut 和析构能在别的线程访问；Sync：对象的 & 能在别的线程访问 ——[包布丁](https://t.me/c/1264662201/571556)

关于 Wrappers，看这里即可（我想大家应该都看得懂）:

| Struct                  | Trait                                              |
| ----------------------- | -------------------------------------------------- |
| `Box<T>`                | Send(T) -> Send, Sync(T) -> Sync                   |
| `Arc<T>`                | (Send + Sync)(T) -> (Send + Sync)                  |
| `Mutex<T>`              | Send(T) -> (Send + Sync)                           |
| `Rc`                    | !Send + !Sync                                      |
| `Cell<T>`, `RefCell<T>` | Send(T) -> Send, !Sync                             |
| `RwLock<T>`             | (Send + Sync)(T) -> (Send + Sync), Send(T) -> Send |

> 此处暂不考虑 allocator.

将这些类型列在一起，可以发现，标准库没有任何包装可以将 `!Send` 转为 `Send`。（貌似有一个 crate [send_wrapper](https://crates.io/crates/send_wrapper) 可以做到）

#### tokio

说到并发，目前广泛使用的异步运行时是 tokio。一般 `features = ["macros", "rt", "rt-multi-thread"]` 是必加的。

关于 tokio 可以看[入门秘籍 13 章](https://rust-book.junmajinlong.com/ch100/01_understand_tokio_runtime.html)。

- 立即执行 Future 需要用 `spawn`。否则只会在 await 时执行。
- 计算密集型任务请用 `spawn_blocking`，性能提升巨大。spawn_blocking 的默认最大线程数也是很高的（[约 512](https://github.com/tokio-rs/tokio/discussions/3858#discussioncomment-869878)），必要时也可以调小 blocking 池的大小，将任务更合理地分配给 physical thread。
  - 也可以换用 [rayon](#rayon)。
- `tokio::fs` 比 `std::fs` 要慢很多（10 倍以上），如果你没有高并发 IO 需求请尽可能用 std::fs。

#### 简单批处理

在实际并发中经常碰到需要等待一批 Future 结束并获取返回值的情况。`join!` 不能 join 任意数量；tokio 有一个 `JoinSet`，但返回值是乱序的，并且 api 设计也不够易用。所以我们如何获取顺序的并行 Future 返回值呢？

答：用 `futures` / `futures_util` crate 的 `futures::stream::FuturesUnOrdered`。具体使用方法可以参考[用例](https://github.com/tensorlakeai/indexify/blob/5999be8514a4a6595aea72ec790cb526cc5ff0ac/src/blob_storage/disk.rs#L48)。一般就是将每一个 task spawn，然后将 handle collect 到 FuturesUnOrdered 里再 `while let Some(x) = container.next().await` 即可。

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

### dyn object

一个特殊的对象是 dyn object，表示实现了某个 trait 的任意对象。开销比特定类型对象大一点，但是非常好用。

一般要求 Sized，所以要么 `dyn object + Sized`，要么 `Box<dyn object>`。如果在 struct 内用，经常还需要加生命周期。虽然要求这么多，但是真正用到才发现好用。泛型写一大串不如直接 dyn 秒了。

- dyn 在写异步时非常好用。异步经常需要跟 `Pin<Box<T>>` 打交道，而我们不能直接从 `Pin<Box<T>>` 拿到 T，假设变换过程中随便加一个中间结构（例如 `std::iter::Map`），然后就会变成 `Map<Pin<Box<T>>>`，如果又要 awaitable 又会转成 `Pin<Box<Map<Pin<Box<T>>>>>`，套来套去泛型根本没法处理。

### 宏

宏是很好用的东西，分为过程宏和声明宏。声明宏简单，常见用来写不定参数的函数/减少重复代码。过程宏就是纯 Token 处理，非常复杂，可以写装饰器。

学习宏，直接去看[如何学习](#如何学习)中提到的小宏书。讲的很好。

调试宏可以用 [cargo-expand](#扩展)，不需要通过编译就能展开宏。

- 不加 `#[macro_export]` 的话，定义的宏仅在当前 mod 可用。
- 在其他宏里调非卫生宏不能直接用，需要加 `$crate` 显式指定路径。
- 可以定义同名宏重载系统宏，但是注意不能在同名宏里调用被重载的系统宏，否则递归。[example](https://github.com/Xavientois/die/pull/3/files)
- [A Note On Working With Cfg](https://docs.rs/safe_arch/latest/safe_arch/#a-note-on-working-with-cfg)
- 有几个标签类型可以被重解释（`ident`, `tt` 等），非常强大。
- 匹配写不出来就上 `$(tt)*`，啥都能匹配。但是由于 tt 太强，需要注意边界条件，否则把所有 token 全吃了。

### 其他

- 可以显式调用 [`std::mem::drop()`](https://kaisery.github.io/trpl-zh-cn/ch15-03-drop.html#通过-stdmemdrop-提早丢弃值) 释放值，不过一般使用代码块，让变量自动销毁，会更加清晰。[更多详细解释](https://xuanwo.io/reports/2022-41/)
- 不知道结构体多大？rust-analyzer 有选项能直接看，将光标放在结构体上，（vscode 中 Ctrl + Shift + P）选择 _view memory layout_ 即可。

## Cargo

rust 唯一官方指定包管理器：`cargo`，而且在一众语言包管理中是顶级的。

- cargo 的 dep 版本中，`xxx = 1.2.1` 指的其实是 `>= 1.2.1, <2.0.0`，与 npm 中的 `^1.2.1` 一致。([ref](https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html#specifying-dependencies-from-cratesio))

### [cargo envs](https://doc.rust-lang.org/cargo/reference/environment-variables.html)

### 常用 cargo 指令

- `cargo clippy --fix --all-targets --all-features --allow-staged --allow-dirty`：用于自动修复 clippy 问题的终极命令。
- `cargo tree -i xxx`：查询某个依赖的路径，弄清引入它的罪魁祸首。

### 全局 alias

创建 `~/.cargo/config.toml` 并写入：

```toml
[alias]
b = "build"
c = "check"
t = "test -- --nocapture"
r = "run"
u = "update"
f = "clippy --fix --all-targets --all-features --allow-staged --allow-dirty"
```

### fmt

在 `rustfmt.toml` 里写代码的格式化选项。我一般会开这些：

```toml
group_imports       = "StdExternalCrate"
imports_granularity = "Crate"
merge_derives       = true
unstable_features   = true
wrap_comments       = true
```

懒的话也可以直接抄[前辈的](https://github.com/compio-rs/winio/blob/master/rustfmt.toml)。

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
| [cargo-bisect-rustc](https://github.com/rust-lang/cargo-bisect-rustc) | 二分查找哪个 rustc nightly 版本引入了错误 |
| [cargo-shear](https://github.com/Boshen/cargo-shear) / [cargo-machete](https://github.com/bnjbvr/cargo-machete) | Remove unused Rust dependencies |
| [cargo-nextest](https://github.com/nextest-rs/nextest) | 好用的 test 工具，有超时失败，log 筛选等特性 |
| [cargo-audit](https://github.com/RustSec/rustsec/tree/main/cargo-audit) | 查依赖漏洞 |
| [cargo-hakari](https://crates.io/crates/cargo-hakari) | 加速构建的黑科技 |
| [cargo-selector](https://github.com/lusingander/cargo-selector) | TUI 快速选择运行目标 |
| [cargo-sweep](https://github.com/holmgr/cargo-sweep) | 部分清理编译产物 |
| [cargo-depgraph](https://github.com/jplatte/cargo-depgraph) | 看依赖关系。比 cargo-tree 等等好用 |
| [cargo-semver-checks](https://github.com/obi1kenobi/cargo-semver-checks) | 检查 API 是否遵循 semver 规范 |

## 库

多看热门项目用的库，是发现好用的库的好方法。还有一个方法是水群。

有一些库几乎成为业界标准，必需掌握。

<!-- prettier-ignore -->
| 库名       | 简介       |
| ---------- | ---------- |
| anyhow / thiserror | 错误处理，anyhow 用于 bin，thiserror 用于 lib  |
| tokio      | 异步       |
| serde | 序列化 |
| reqwest[^5]  | 简单网络 |
| clap       | 命令行工具 |
| tempfile | 创建自动销毁的临时文件夹 |
| rayon | CPU 负载并发 |
| indicatif | progress bar |
| colored / simply-colored | 命令行颜色输出，后者更适合用于 no_std |
| rand / smallrand | 随机数，后者更适合用于 no_std |

[^5]: 为避免傻逼 openssl 造成的影响，建议添加 `feature = ["rustls-tls"]`。

另外一些库则是我用过然后觉得好用。

<!-- prettier-ignore -->
| 库名 | 简介 |
| --- | --- |
| memchr | 字符串查找 |
| assert2 / pretty_assertions | 全兼容的好看的 assert |
| ~~die-exit~~ | ~~错误处理并退出~~，不过我现在不用了 |
| tap | 函数式工具，在链式中途拿取引用操作而不影响返回值 |
| enum-tools | 提供 enum 的常用方法 |
| pollster | 小而美，专注于 _在同步环境运行异步函数_ 一件事，打破同步与异步间隔，**强烈推荐** |
| expect-test | 自动更新 test 中 assert_eq 的期望值 |
| const-hex | `Vec<u8>` -\> hex str |
| constime | 计算编译期值，用一个非常简单易用的宏 |
| inquire | 用户命令行交互 |
| samply | profiler (support flamegraph, [tutorial video](https://www.youtube.com/watch?v=M_EniM_IfnQ&t=210s)) |

[这里](https://blessed.rs/crates)还有一个常用库的列表可以参考。

当然，也有一些**避雷条目，千万不要用下表中的库！**

<!-- prettier-ignore -->
| 库名 | 吐槽 |
| --- | --- |
| teloxide | Telegram bot 库，但是没有文档，只有一点最简单的 example；遇到各种问题没有解决方法；API 经常 break 并且设计得很丑 |
| rusqlite | 绑定了 openssl！不要用它，要玩 sqlite 请左转 [sqlx](#sqlx) |

### clap

一般我都用 `features = ["derive"]`，使用更方便，但是文档更难找，因为文档默认用的是动态添加成员。[wordinfo](https://github.com/lxl66566/wordinfo/blob/main/src/cli.rs) 的 Cli 简直是我的 clap 毕生所学（，折腾了非常久。

clap derive 一般都会将 Cli 实例设为 static LazyLock，可以免去到处传参之苦。带来的问题是写测试变得更加困难，因为不同的测试可能有不同的初始参数，而测试是并发的，没法表达不同的 Cli 状态（而且 LazyLock 的话就是只读了）。所以如果 rust 有一个好用的 context 实践的话就好了。

我们可能对命令行有更多自定义的验证，这时候最好 impl Cli 添加自定义的 `fn validate(&self)`，并且在 parse 后调用。不要用 clap 自带的 `value_parser`，[那个是一坨大便](https://t.me/withabsolutex/2367)。

### once_cell

创建 Lazy 或 OnceCell 的 static 变量。在 rustc 1.80.0 以前这是 unstable，但是现已 stabilized（`std::sync::LazyLock`）。

### thiserror

轻量错误库，用来创建自定义的 error 类型；可以自动 derive From another error。

不能在两个错误类型中同时 from 同一个 Error。如果确实需要，可能要手动再分 Enum 作为 suberror。

### serde

除了直接 derive 外，serde 一般用得多的技巧还有：

- `#[serde(rename = "xx")]` 和 `#[serde(rename_all = "kebab-case")]`，自定义序列化的名称与格式。更多宏可以看[doc Field attributes](https://serde.rs/field-attrs.html)。
- 对于需要在缺失时使用 empty 的容器对象，`#[serde(default)]` 是个不错的选择。
- 如果有的结构需要手写 parser，可以顺带实现 serialize trait，代码不会太多。
- serde 提供了 [remote derive](https://serde.rs/remote-derive.html)，也就是为第三方 crate 里的 struct derive(Serialize, Deserialize)。

### rayon

rayon 现在已经几乎统治了 rust CPU 负载型的并发。使用 rayon 可以非常方便地写出多线程程序，榨干你的 CPU，并且无需引用任何异步运行时。

rayon 的基础示例可以读 doc 或让 AI 给 example，不再赘述。

rayon 的生态也不错，一个常用的是 indicatif (`features = ["rayon"]`)，它可以让 rayon 并发处理时显示易于阅读的进度条，这在一般耗时较长的 CPU 负载场景下是非常好用的。

```rust
use indicatif::{ParallelProgressIterator, ProgressBar, ProgressStyle};
let process_pb = ProgressBar::new(files.len() as u64);
process_pb.set_style(
    ProgressStyle::default_bar()
        .template("{spinner:.green} [{elapsed_precise}] [{bar:40.cyan/blue}] {pos}/{len} ({eta}) {msg}")
        .expect("Internal Error: Failed to set progress bar style")
        .progress_chars("#>-"),
);
files
    .into_par_iter()
    .progress_with(process_pb.clone())
    .for_each(|entry| {...});
process_pb.finish_with_message("Processing complete!");
```

### sqlx

如果你写 SQL 比较熟练，不需 ORM，那么 sqlx 就非常适合你。尤其是在当前 Rust 还没有任何特别好用的 ORM 的环境下，sqlx 更是一个不差的选择。

说到 sqlx 就不得不提，它是强制类型的，因此在编译时就需要获取数据库表信息，例如 sqlite 情况下用户需要为其提供一个模板 sqlite。但是（假设用户没有装 sqlite cli）创建一个 sqlite 本身就需要 sqlx，就遇到了鸡/蛋问题。而且修改 schema.sql 也有可能忘记重新构建模板 sqlite。这时候就要用一个 build.rs 在 schema 初始化或改变时自动更新模板 sqlite。这个 build.rs 我写在了[这里](https://gist.github.com/lxl66566/85de8095cd6644396a901440af2e10f8)。

## 打包

说到打包就不得不提万恶的 openssl，我已经[喷了无数次](https://t.me/withabsolutex/1609)，[无数次](https://t.me/withabsolutex/1859)…。很多库会提供 rustls feature 来绕过 openssl，例如 reqwest；但是也有库根本不提供，例如 rusqlite。所以 openssl 的问题还是得去解决。

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

我也写过 [rust release CI](https://github.com/lxl66566/rust-simple-release)，深知交叉编译在 link 阶段很容易出问题。解法有两个，一个是用工具链对应的链接器，还有一个就是 cargo-zigbuild，蛮好用的。不过 windows 上不能用 cargo-zigbuild。

### release

说到 release，我**首推我自己写的 [rust simple release](https://github.com/lxl66566/rust-simple-release)**，优势是配置非常简单 + hack openssl，可以专注代码而无需折腾 CI。（结果折腾 CI 的变成我了，天天跟 cargo-zigbuild 打）

再说到我之前用的 [taiki-e/upload-rust-binary-action](https://github.com/marketplace/actions/build-and-upload-rust-binary-to-github-releases)，我也用了很久，说句实话还行，但是它内部用的 cross docker container，如果有除了 rust 的其他依赖，或者遇到傻逼 openssl 的问题就没辙了。

[cross action](https://github.com/houseabsolute/actions-rust-cross)：使用 docker 容器进行 build，但是不提供压缩产物。

## 发布

将包发布到 crates.io 上也是极其方便的。直接 `cargo publish` 即可。

不过我不建议使用 CI 进行 publish。[具体原因](https://t.me/withabsolutex/1827)

## 测试

assert 有 `assert!()` 和 `debug_assert!()` 之分，前者在 release 下仍然会进行 assert，而后者不会。

[assert2](https://github.com/de-vri-es/assert2-rs) 是一个全兼容 assert 的更好看的第三方库，是 [pretty_assertions](https://crates.io/crates/pretty_assertions) 进化版。

关于测试看[这一篇](https://course.rs/test/write-tests.html)就够了。小总结/补充：

- `#[cfg(test)]` 指非 test 情况下忽略代码，不会被编译。后面一般接 `mod test{ use super::*; ...}`。
- `#[test]` 后接函数，名称随意，就是真正的测试函数。
- 如果 target 是 bin，则写在 doc 中的测试不会被运行。
- `cargo test` 默认不打印 _stdout_ 输出，想打印需要 `cargo test -- --show-output`。
- 所有的 test 是并行测试的，如果你的程序里有用到 global mutable static 变量/系统外部依赖，请务必注意不同测试之间是否会互相影响。
- 测试中常用的库：
  - serial_test：让指定的测试串行运行。

### cargo bench

rust 自带的 benchmark。可以参考[这篇文章](https://course.rs/test/benchmark.html)，讲的不错。

感觉 `criterion.rs` 并不好用。。毕竟不能写在文件内部做 unit bench，单独出来做成跟 pytest 那样了，我不喜欢。

## 用户界面

### GUI

GUI 是 rust 日经问题了。

一些 GUI 框架：

- tauri：electron 的竞品，据说很灵车（许多群友都说过了）。
  - 2022 年我试了一下，连 example 都跑不过。
  - 2024 尝试，还不错。主要是前端工具链是 GUI 界最顶级的那一批，爆杀各类原生 UI。
  - [得物商家客服从 Electron 迁移到 Tauri 的技术实践](https://mp.weixin.qq.com/s/UxmJxU4-fv9GeRxl2fzOGw)
  - [tauri-bug-reproducer](https://github.com/yetone/tauri-bug-reproducer)，T 黑头子（
- [egui](https://github.com/emilk/egui)：原生 GUI，有[大项目](https://www.reddit.com/r/rust/comments/1c69mrj)。
  - [20250123 我用了一次 egui 0.3.0，太灵车了](https://t.me/withabsolutex/2203)，建议别用。
  - 窗口 API，还有布局等等都很差，很多地方还要自己拿 size 算（还有缩放坑），太原始，前端一个 flex 全搞定了。而且 API 变化太大，AI 没法输出有效信息，这也是比较致命的。
- [slint](https://github.com/slint-ui/slint)：嗯写 DSL
- [dioxus](https://github.com/DioxusLabs/dioxus)：也是嗯写 DSL。release 0.5.0 时火了一把
- [native-windows-gui](https://github.com/gabdube/native-windows-gui)：非跨平台
- [winio](https://github.com/compio-rs/winio)：~~莓软的愚人节玩笑~~
- [sciter](https://docs.rs/sciter-rs/latest/sciter/)：web 界面渲染

[这里](https://www.cnblogs.com/nolca/p/17795473.html)有一些 issue/star 数对比。[Are we GUI Yet?](https://areweguiyet.com/)是更多 GUI 框架简介。

我早期尝试过一下 iced，用不明白，不用了。

_他们之中有哪个能达到 electron 80% 的可用程度，称为可用。_
::: right
——_[阿卡琳](https://github.com/magic-akari)_
:::

### TUI

比起 GUI，rust 重心还是在 CLI 和 TUI 上。

#### [ratatui](https://github.com/ratatui-org/ratatui)

一个广泛使用的 TUI 框架，教程还不错。

我读源码花了挺久时间。如果只想快速上手，建议狠狠抄[这个 example](https://github.com/ratatui-org/templates/tree/main/simple-async)。

用着发现个 bug，顺带 pr 了几行[^2]。

[^2]: [review 还挺严格的](https://t.me/withabsolutex/1441)，但是 member 说话又好听

然后 [tui-realm](https://github.com/veeso/tui-realm/) 是基于其做的一个高层 TUI 框架，或许可以一试。

## 嵌入向量数据库

我需要 rust 侧的轻量嵌入式向量数据库解决方案，要求是 10,000,000 个向量内查最近邻。（每个向量还有附带额外信息）

简单看了一下。我不希望将所有数据先加载到内存，最好的方案应该是 [DiskANN](https://www.oschina.net/news/304024)，不过这玩意目前还没有 rust 的实现。

- [sqlite-vec](https://github.com/asg017/sqlite-vec)：sqlite 跨平台扩展，但是现在并不支持最近邻算法。

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
8. [Rust magic patterns](https://github.com/alexpusch/rust-magic-patterns)：针对某些狭小的知识点的深入分析

articles:

1. [Rust Learning Smart Pointers](https://silente.top/posts/Rust-Learning-Smart-Pointers/)
2. [Rust 中的闭包递归与 Y 组合子](https://nihil.cc/posts/rust_closure_and_y/)
3. 随机 [Rust Quiz - dtolnay](https://dtolnay.github.io/rust-quiz/) / [Rust Quiz - boxyuwu](https://boxyuwu.github.io/rust-quiz/)：想成为语言律师吗？
4. [为什么 Rust 需要 Pin, Unpin ？（中文翻译）](https://zhuanlan.zhihu.com/p/404818051)
5. [如何理解 rust 中的 Sync、Send？](https://zhuanlan.zhihu.com/p/64699643)
6. [Rust 的 Pin 与 Unpin](https://folyd.com/blog/rust-pin-unpin/)
7. [static, const, let 声明变量有什么区别？](https://rustcc.cn/article?id=d3954670-a58a-427d-9c0c-6666051f5cc7)
8. [An introduction to advanced Rust traits and generics](https://www.shuttle.rs/blog/2024/04/18/using-traits-generics-rust)
9. [[翻译] async: 什么是 blocking](https://bingowith.me/2021/05/09/translation-async-what-is-blocking/)
10. [Rust Runtime 设计与实现-科普篇](https://www.ihcblog.com/rust-runtime-design-1/) 及后续系列文章
11. [Using Rust Macros for Custom VTables](https://lucumr.pocoo.org/2024/5/16/macro-vtable-magic/)：如何创建一个 runtime object
12. [金枪鱼之夜：基于完成的 Rust 异步：compio 项目及其经验](https://www.youtube.com/live/P7wLTy59-f0)
13. [用 Rust 搞科研的两年](https://zhuanlan.zhihu.com/p/670166312)
14. [The missing parts in Cargo](https://weihanglo.tw/posts/2024/the-missing-parts-in-cargo/)
15. [Fast Rust Builds](https://matklad.github.io/2021/09/04/fast-rust-builds.html)
16. [幽灵索引类型与匿名结构体](https://nihil.cc/posts/phantom_index_type/)
17. [Rust 中常见的有关生命周期的误解](https://github.com/pretzelhammer/rust-blog/blob/master/posts/translations/zh-hans/common-rust-lifetime-misconceptions.md)
