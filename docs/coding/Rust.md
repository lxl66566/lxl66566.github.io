# Rust
## 介绍
Rust是一门系统编程语言，专注于安全，尤其是并发安全，支持函数式和命令式以及泛型等编程范式的多范式语言。Rust在语法上和C++类似，但是设计者想要在保证性能的同时提供更好的内存安全。——[百度百科](https://baike.baidu.com/item/Rust%E8%AF%AD%E8%A8%80)

### 为什么推荐
#### 优点
* 高性能（与python相比）
* 函数多，语法简单（与C++相比）
* 安全，自动释放内存，所有权机制（与C++相比）
* 开发社区激进，更新频繁
#### 缺点
* 限制条件多，难以通过编译
* 使用群体较少，网上缺少不常见问题的解决方案
* 学习曲线陡峭
### 如何学习
[官网](https://www.rust-lang.org/zh-CN/)有详细的QA与你所需要的一切。以下陈述个人想法：

我认为[这个文档](https://doc.rust-lang.org/std/index.html)最为重要。

我在学习初期，先阅读rust教程（官网），然后尝试用Rust去解决leetcode上的一些题目，去搜索题目一些的子问题，了解解决方法。最后，去[上述文档](https://doc.rust-lang.org/std/index.html)进一步了解该解决方法的详细信息。

其他资料：[Rust语言圣经](https://course.rs/about-book.html)

## 字符串修改

在Rust语言中，字符串采用utf-8编码，字符长度不一，因此Rust不提供下标查找字符串的方法。这让字符串的修改需要一点点的技巧。

1. 转换为`Vec<char>`后修改
C++程序员认为这种方式非常亲切。
之后若有需要，还可将`Vec<char>`重新转换为字符串。
```
let s1:String = String::from("Hello我是绝对值_x");
let mut a : Vec<char> = s1.chars().collect();
a[5] = '你';
let s2 = a.iter().collect::<String>();
assert_eq!(s2,"Hello你是绝对值_x");
```

2. replace_range函数
```
let mut s1:String = String::from("Hello我是绝对值_x");
s1.replace_range(5..=7,"你");
assert_eq!(s1,"Hello你是绝对值_x");
```
请注意，若替换范围不在utf-8字符的分割点上将会导致程序抛出panic，因此不适用于变字节数的未知字符串的替换。

3. as_bytes_mut方法(**unsafe**)
```
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
```
Hello�你��绝对值_x
```