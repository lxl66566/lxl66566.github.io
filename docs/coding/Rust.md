---
sidebar: 'auto'
---
# Rust
## 介绍
Rust是一门系统编程语言，专注于安全，尤其是并发安全，支持函数式和命令式以及泛型等编程范式的多范式语言。Rust在语法上和C++类似，但是设计者想要在保证性能的同时提供更好的内存安全。——[百度百科](https://baike.baidu.com/item/Rust%E8%AF%AD%E8%A8%80)

### 为什么推荐
#### 优点
* 高性能（系统级语言）
* 函数多，模版丰富
* 安全，生命周期与所有权机制
* 开发社区激进，更新频繁
#### 缺点
* 限制条件多，难以通过编译
* 新生代语言，网上缺少问题的解决方案
* 学习曲线陡峭
### 如何学习
[官网](https://www.rust-lang.org/zh-CN/)有详细的 QA 与你所需要的一切。以下陈述个人想法：

我认为[这个文档](https://doc.rust-lang.org/std/index.html)最为重要。

我在学习初期，先阅读 rust 教程（官网），然后尝试用 Rust 去解决 leetcode 上的一些题目 <span class="heimu" title="你知道的太多了">由于 rust 的 I/O 较为麻烦，leetcode 能免去 I/O 之苦</span> ，去搜索题目一些的子问题，了解解决方法。最后，去[上述文档](https://doc.rust-lang.org/std/index.html)进一步了解该解决方法的详细信息。

其他资料：[Rust语言圣经](https://course.rs/about-book.html)

以下所涉及到的类型与函数，请自行Google。
## 循环
Rust 的 for 循环需要跟可迭代对象，例如：
```rs
for i in 0..100 {} // i in [0,99]
```
若需要设置步长，可使用 `step_by()` ：
```rs
for i in 0..=100.step_by(2) {} // i in { 0,2,4,6...,98,100 }
```
而类似 C++ 的 do while 循环可以写成：
```rs
loop{
  // do something
  if condition { break; }
}
```
## [输出](https://doc.rust-lang.org/rust-by-example/hello/print.html)
`dbg!()` 宏可以在 `stderr` 中输出调试信息。
## 输入
众所周知 rust 一般使用 `print!()` 或 `println!()` 进行输出。而输入需要使用标准库中的std::io.（或者其他非标准库）
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
## 基础数据结构
[这里](https://skyao.io/learning-rust/docs/grammar/collection.html)可能会有一些帮助。
* 栈：Vec. 使用 `push()` & `pop()` 管理栈。
* （双端）队列：[`std::collections::VecDeque`](https://doc.rust-lang.org/std/collections/struct.VecDeque.html)
* 优先队列（堆）：[`std::collections::BinaryHeap`](https://doc.rust-lang.org/std/collections/struct.BinaryHeap.html)
* 字典 / Object / map（键值对）：[`std::collections::HashMap`](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
* 链表：自己写。[对于链表的实现，在 Rust 中有多种方式，比如：（摘自）](https://jasonkayzk.github.io/2022/02/20/%E4%BD%BF%E7%94%A8Rust%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%8F%8C%E5%90%91%E9%93%BE%E8%A1%A8/)
  * 使用 Box 实现（由于 Box 本身的限制，基本只能实现单向链表）；
  * 使用 Rc + RefCell 实现（由于 RefCell 的限制，迭代器无法很好的实现）；
  * 使用 Unsafe 实现；
## 字符串
* Rust 字符串默认支持分行。使用 \ 可以使多行字符串不换行。
* 原始字符串：`r#"\something"#`
### 字符串处理
* 字符串转换：`to_owned()` or `to_string()` converts &str -> String.
* [字符串连接](https://iq.opengenus.org/rust-string-concat/)
### 字符串修改
在Rust语言中，字符串采用utf-8编码，字符长度不一，因此Rust不提供下标查找字符串的方法。这让字符串的修改需要一点点的技巧。
1. 转换为`Vec<char>`后修改

C++程序员认为这种方式非常亲切。之后若有需要，还可将`Vec<char>`重新转换为字符串。注意，Rust 中的 `char` 为 4 字节，转为 Vec 后，可进行 O(1) 查找。
```rust
let s1:String = String::from("Hello我是绝对值_x");
let mut a : Vec<char> = s1.chars().collect();
a[5] = '你';
let s2 = a.iter().collect::<String>();
assert_eq!(s2,"Hello你是绝对值_x");
```
2. replace_range函数
```rust
let mut s1:String = String::from("Hello我是绝对值_x");
s1.replace_range(5..=7,"你");
assert_eq!(s1,"Hello你是绝对值_x");
```
请注意，若替换范围不在utf-8字符的分割点上将会导致程序抛出panic，因此不适用于变字节数的未知字符串的替换。

3. as_bytes_mut方法(**unsafe**)
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
该方法异常繁琐，同样也不适用于变字节数的未知字符串的替换，但是若替换范围不在utf-8字符的分割点上并不会触发panic.
例如，将第6行代码改为`s1_bytes[i + 6] = s2_bytes[i]`的运行结果：
```rust
Hello�你��绝对值_x
```
## 问号
目前本人所学到的问号主要用于 `Result` 的处理。
`do_something_that_might_fail()?` 等价于
```rs
match do_something_that_might_fail() {
  Ok(v) => v,
  Err(e) => return Err(e),
}
```
## [drop](https://kaisery.github.io/trpl-zh-cn/ch15-03-drop.html#%E9%80%9A%E8%BF%87-stdmemdrop-%E6%8F%90%E6%97%A9%E4%B8%A2%E5%BC%83%E5%80%BC)
可以显式调用 `std::mem::drop()` 释放值。
## 获取 Cargo 根目录
`env!("CARGO_MANIFEST_DIR")`