---
date: 2022-05-04
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# Rust

## 介绍

Rust 是一门系统编程语言，专注于安全，尤其是并发安全，支持函数式和命令式以及泛型等编程范式的多范式语言。Rust 在语法上和 C++类似，但是设计者想要在保证性能的同时提供更好的内存安全。——[百度百科](https://baike.baidu.com/item/Rust语言)

### 成果

几年前 rust 掀起了一股 RIIR (Rewrite it in Rust) 的热潮。

[Awesome Alternatives in Rust](https://github.com/TaKO8Ki/awesome-alternatives-in-rust) 有一些 rust 成果。主要是 linux cli 工具。

### 为什么推荐

#### 优点

- 高性能（系统级语言）
- 函数多，模版丰富
- 安全，生命周期与所有权机制
- 开发社区激进，更新频繁，讨论环境良好（tg: [@rust_zh](https://t.me/rust_zh)）
- 唯一指定顶级包管理器：cargo

#### 缺点

- 限制条件多，难以通过编译
- 学习曲线陡峭
- GUI 库有待进步

### 如何学习

[官网](https://www.rust-lang.org/zh-CN/)有详细的 QA 与你所需要的一切。资料方面，rust 的学习资料非常多，列举几个：

- [Rust 语言圣经](https://course.rs/about-book.html)：圣经，**文风**上乘，**质量**高。
- [tour of rust](https://tourofrust.com/00_zh-cn.html)：交互授课式。
- [rust by example](https://doc.rust-lang.org/rust-by-example/index.html)：注重例子。

我在学习初期，先读资料，然后尝试用 Rust 去解 leetcode 上的[^1]题目，看题解以后去[文档](https://doc.rust-lang.org/std/index.html)进一步搜关键字和用法。中期就该做点项目了，遇到不会的就去 [Telegram 群](https://t.me/rust_zh)问。

[^1]: 由于 rust 的 I/O 较为麻烦，leetcode （比起 _洛谷_ 等）能免去 I/O 之苦。

其他资料：

- [Rust new libraries and applications](https://lib.rs/new)

## 开发环境

### 安装 rust

rust 的安装与配置并不难。在 windows 上可以使用官方脚本一行安装 rustup 及 rust。linux 也可以选择用包管理器，详见 [Archwiki](https://wiki.archlinuxcn.org/wiki/Rust)。

使用 rustup 的好处是支持交叉编译；方便切换 nightly。坏处是不通过包管理器更新，容易忘。

### 开发

然后我使用 [vscode](./vscode.md) 作为 IDE。只需安装 `rust-analyzer` 插件即可。

还有一些能够优化开发体验的选项：

1. [使用 clippy](https://code.visualstudio.com/docs/languages/rust#_linting) 或者 [bacon](https://github.com/Canop/bacon) 作为 check 指令。
2. 切换 vscode `rust-analyzer` 插件为**预发布版本**。否则对于 rust 这样的高速发展语言，跟不上进度，很容易误报。

## 语言基础

### 循环

Rust 的 for 循环需要跟可迭代对象，例如：

```rs:no-line-numbers
for i in 0..100 {} // i in [0,99]
```

若需要设置步长，可使用 `step_by()` ：

```rs:no-line-numbers
for i in 0..=100.step_by(2) {} // i in { 0,2,4,6...,98,100 }
```

而类似 C++ 的 do while 循环可以写成：

```rs
loop{
  // do something
  if condition { break; }
}
```

### [输出](https://doc.rust-lang.org/rust-by-example/hello/print.html)

`dbg!()` 宏可以在 `stderr` 中输出调试信息。

### 输入

众所周知 rust 一般使用 `print!()` 或 `println!()` 进行输出。而输入需要使用标准库中的 std::io.（或者其他非标准库）

```rust
use std::io;
let mut s = String::new();
io::stdin().read_line(&mut s).expect("failed to read");
let num: i32 = s.trim().parse().unwrap(); // 转换类型过程
```

读入一行以空格隔开的不定量整数：

```rust
io::stdin().read_line(&mut s).expect("failed to read");
let num : Vec<i128> = s.trim().split(" ")
  .map(|x| x.parse().unwrap_or(0)).collect(); // 转换类型过程
```

### 基础数据结构

[这里](https://skyao.io/learning-rust/docs/grammar/collection.html)可能会有一些帮助。

- 栈：Vec. 使用 `push()` & `pop()` 管理栈。
- （双端）队列：[`std::collections::VecDeque`](https://doc.rust-lang.org/std/collections/struct.VecDeque.html)
- 优先队列（堆）：[`std::collections::BinaryHeap`](https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html)
- 字典 / Object / map（键值对）：[`std::collections::HashMap`](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
- 链表：[`std::collections::LinkedList`](https://doc.rust-lang.org/std/collections/struct.LinkedList.html)，但是其功能在所有权机制下被削弱了（例如，无法删除一个 iter 的值 (safe)）。rust 并不推荐使用链表，如果确实需要完整链表，可以自己写 <span class="heimu" title="你知道的太多了">反正我是不写</span>。[对于链表的实现，在 Rust 中有多种方式，比如：（摘自）](https://jasonkayzk.github.io/2022/02/20/使用Rust实现一个双向链表/)
  - 使用 Box 实现（由于 Box 本身的限制，基本只能实现单向链表）；
  - 使用 Rc + RefCell 实现（由于 RefCell 的限制，迭代器无法很好的实现）；
  - 使用 Unsafe 实现；

### 字符串

_Rust 的字符串所包含的问题实际上很多，此处只是冰山一角。_

最主要的就是 `&str` 和 `String` 两种了，前者没有所有权，后者有。

- Rust 字符串默认支持分行。使用 \ 可以使多行字符串不换行。
- 原始字符串：`r#"\something"#`
- 字符串转换：`to_owned()` or `to_string()` converts `&str` -> `String`（造了一个所有权）。也可以用 `into()`，更简单，但是更不直观。
- [字符串连接](https://iq.opengenus.org/rust-string-concat/)
- `Option<String>` 要转 `&str`，不能直接 `.unwrap().as_str()`，因为 unwrap 会消耗所有权。可以用 `as_deref()` 转成 `Option<&str>` 再 unwrap。

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

目前本人所学到的问号主要用于 `Result` 的处理。
`do_something_that_might_fail()?` 等价于

```rs
match do_something_that_might_fail() {
  Ok(v) => v,
  Err(e) => return Err(e),
}
```

### 并发

如果你对 _async/await_ 模型没有明确概念，可以看看[这篇文章](https://course.rs/advance/async/getting-started.html)入门。

rust 提供 _async/await_ 模型和线程模型。

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

### 其他

可以显式调用 [`std::mem::drop()`](https://kaisery.github.io/trpl-zh-cn/ch15-03-drop.html#通过-stdmemdrop-提早丢弃值) 释放值，不过一般使用代码块，让变量自动销毁，会更加清晰。[更多详细解释](https://xuanwo.io/reports/2022-41/)

## Cargo

rust 唯一官方指定包管理器：`cargo`

### 获取 Cargo 根目录

`env!("CARGO_MANIFEST_DIR")`

### alias

创建 `~/.cargo/config` 并写入：

```toml
[alias]
b = "build"
c = "check"
t = "test -- --nocapture"
r = "run"
```

## 库

多看热门项目用的库，是发现好用的库的好方法。还有一个方法是水群。

有一些库几乎成为业界标准，必需掌握。

<!-- prettier-ignore -->
| 库名       | 简介       |
| ---------- | ---------- |
| anyhow / eyre    | 错误处理   |
| tokio      | 异步       |
| serde_json | json       |
| reqwest    | 简单网络   |
| clap       | 命令行工具 |

另外一些库则是好用，但非必须。

<!-- prettier-ignore -->
| 库名 | 简介 |
| --- | --- |
| memchr | 字符串查找 |
| assert2 | 全兼容的好看的 assert |

## 打包

### [最小化二进制](https://github.com/johnthagen/min-sized-rust)

一般这样够用了。~~我虽然敏感，但没有那么极端。~~

```toml
[profile.release]
strip = true
opt-level = "z"
lto = true
panic = "abort"
```

## 发布

如果只是想要用 Github CI 自动出 binary 放到 release，那么[这个 Action](https://github.com/marketplace/actions/build-and-upload-rust-binary-to-github-releases)专注于这一任务，非常好用。

## 测试

assert 有 `assert!()` 和 `debug_assert!()` 之分，前者在 release 下仍然会进行 assert，而后者不会。

[assert2](https://github.com/de-vri-es/assert2-rs) 是一个全兼容 assert 的更好看的第三方库。

### cargo test

> 其实多读点源码就会了。

首先看看[文档](https://doc.rust-lang.org/rust-by-example/testing.html)，了解一下不同测试的区别。

然后，关于 `#[cfg(test)]` 与 `#[test]` 的区别：

- `#[cfg(test)]` 指非 test 情况下**忽略代码**，不会被编译。后面一般接 `mod test{ use super::*; ...}`。
- `#[test]` 后接函数，名称随意，就是真正的测试函数。
- 如果 target 是 bin，则写在 doc 中的测试不会被运行。

`cargo test` 默认不打印 _stdout_ 输出，想打印需要 `cargo test -- --show-output`。

### cargo bench

rust 自带的 benchmark。可以参考[这篇文章](https://course.rs/test/benchmark.html)，讲的不错。

## 用户界面

### GUI

一些 GUI 框架：

- [slint](https://github.com/slint-ui/slint)
- [native-windows-gui](https://github.com/gabdube/native-windows-gui)

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

1. [Rust Learning Smart Pointers](https://silente.top/posts/Rust-Learning-Smart-Pointers/)
2. [Rust 中的闭包递归与 Y 组合子](https://nihil.cc/posts/rust_closure_and_y/)
3. 随机 [Rust Quiz](https://dtolnay.github.io/rust-quiz/)：想成为语言律师吗？
