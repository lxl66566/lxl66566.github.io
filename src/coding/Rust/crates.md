---
date: 2026-08-26
icon: box
category:
  - 编程
tag:
  - 编程语言
---

# crates 评价

## 热门

有一些库几乎成为业界标准，必需掌握。

<!-- prettier-ignore -->
| 库名       | 简介       |
| ---------- | ---------- |
| anyhow | 一般用于 bin target 的错误处理，把所有 error 统一起来，可以偷懒，有需要也可以 downcast 到具体错误类型。 |
| thiserror / snafu | 一般用于 lib target 的错误处理，需要让下游使用者区分错误类型并区别处理。thiserror 比较简单，可以想象成一个快速 from other error 的容器。snafu 更复杂也更全能，完成此工作的同时也提供了易用的 context、whatever、ensure 等方便的控制。 |
| arc_swap | 高性能的读多写少并发容器 |
| tokio | 异步运行时 |
| serde | 序列化与反序列化 |
| reqwest[^5]  | 高层次的 Http Client |
| clap / palc | 命令行工具，后者是为了减小二进制体积而使用的 |
| tempfile | 创建自动销毁的临时文件/文件夹 |
| rayon | 易于使用的线程级并发库，针对 CPU 负载任务 |
| indicatif | progress bar |
| colored / simply-colored | 命令行颜色输出，后者更适合用于 no_std |
| rand / smallrand | 随机数，后者更适合用于 no_std |
| parking_lot | 一个解锁分配更公平的、没有 poison 的互斥锁 |
| enum_dispatch | 如果一个 tagged enum 的每个 variant 都实现了某个 trait，那么此 enum 本身可以直接实现这个 trait。（trait 不可携带 type） |
| walkdir | 递归访问文件系统 |

[^5]: ~~为避免傻逼 openssl 造成的影响，一般建议起手 `reqwest = { version = "0.12", default-features = false, features = ["json", "rustls-tls", "http2", "charset", "system-proxy"] }`。~~ reqwest 从 0.13 起已经将 default ssl 后端切到了 rustls，不需要再手动搞了，好事

## 推荐

另外一些库则是我用过然后觉得好用。

<!-- prettier-ignore -->
| 库名 | 简介 |
| --- | --- |
| memchr | 字符串查找 |
| assert2 / pretty_assertions | 全兼容的好看的 assert |
| ~~die-exit~~ | ~~错误处理并退出~~，不过我现在不用了（just expect it!） |
| tap | 函数式工具，在链式中途拿取引用操作而不影响返回值 |
| enum-tools / strum_macros | 提供 enum 的常用方法，最常用的就是字符串互转了 |
| pollster | 小而美，专注于 _在同步环境运行异步函数_ 一件事，打破同步与异步间隔 |
| expect-test | 自动更新 test 中 assert_eq 的期望值 |
| const-hex | `Vec<u8>` -\> hex str |
| constime | 计算编译期值，用一个非常简单易用的宏 |
| inquire | 用户命令行交互 |
| samply | profiler (support flamegraph, [tutorial video](https://www.youtube.com/watch?v=M_EniM_IfnQ&t=210s)) |
| binrw | 二进制内容的序列化 / 反序列化 [src](https://www.zhihu.com/question/604594191/answer/3121708902) |
| terminal-menu | 一个 TUI 终端选择器，小巧又好用 |
| ustr | 全局去重的 `&'static str` 池，详见 [字符串进阶](#字符串进阶) |
| flexi_logger | 如果你想在 log crate 下使用一些高级收集特性，可以尝试它，用着非常舒适，而且我想要的功能，rolling、compress、batch 等都是开箱即用。这是一个[我如何使用它的样例](https://github.com/lxl66566/GalgameManager/blob/23a0d0318cc29433de9b0292b353b054731b27fa/src-tauri/src/logging.rs)。 |

[这里](https://blessed.rs/crates)还有一个常用库的列表可以参考。

## 拉黑

当然，也有一些**避雷条目一生黑**（不仅限于 lib）：

<!-- prettier-ignore -->
| 库名 | 吐槽 |
| --- | --- |
| teloxide | Telegram bot 库，但是没有文档，只有一点最简单的 example；遇到各种问题没有解决方法；API 经常 break 并且设计得很丑 |
| rusqlite | 绑定了 openssl！不要用它，要玩 sqlite 请左转 [sqlx](#sqlx) |
| listeners | 有严重的性能问题 [ref](https://github.com/GyulyVGC/listeners/issues/25) |
| crossbeam-channel | 该暴露的方法不暴露，该设计 trait 时不设计 trait，该实现的功能没有实现，性能还不如 crossfire 一根毛([ref](https://github.com/frostyplanet/crossfire-rs/wiki/benchmark-v2.1.0-vs-v2.0.26-2025‐09‐21))；PR 卡着不推；[miri 测试不兼容](https://github.com/crossbeam-rs/crossbeam/issues/1181) |
| pingora | issue 爱理不理，trait 设计糟糕，大公司开源但不是真正意义上的开源 |
| tracing 系 | 性能不如 [fasttrace](https://github.com/fast/fastrace) 一根，tracing-appender 代码写得一坨狗屎，众望所归的 feat pr 都喂到嘴边了就是不合；如果你对 tracing 本身架构没有足够了解，很容易被干到死锁 ([issue](https://github.com/tokio-rs/tracing/issues/1565))，并且这是文档里没有指明的 |
| xq | 跟 jq cli 不兼容；纯纯傻逼玩具，性能垃圾，打一个 1G json，jq 和 jaq 峰值内存都用不了 6G，xq 吃了 20G 都打不出来 |
| tauri_specta | [2.0.0-rc.21](https://docs.rs/tauri-specta/2.0.0-rc.21/tauri_specta/) 的指令是错的，cargo add 会版本冲突；有些第三方可以 serde 的类型没有实现 `derive(specta::Type)`，例如 chrono::*；很多第三方 error 类型也没有实现 serde/Type，没法用。建议只用 ts-rs 做 struct 结构生成，事件还是用 tauri 那一套。 |
| tauri-plugin-http | 这是它的 [issue 区](https://github.com/tauri-apps/plugins-workspace/issues?q=sort:updated-desc%20is:issue%20is:open%20label:"plugin:%20http")，低级问题太多了，不知道一个 client 为什么能做得这么屎。还容易遇到权限问题。 |
| wasm-pack | vibe coding 重灾区，全是 emoji 但是关键内容缺失的大便一样的文档；还有[大便一样的代码质量](https://github.com/wasm-bindgen/wasm-pack/issues/1457)和放着根本不理的 issue 区，npm postinstall script 还会卡住。请使用 wasm-bindgen-cli。 |

## 三方库心得

### clap

一般我都用 `features = ["derive"]`，使用更方便，但是文档更难找，因为文档默认用的是动态添加成员。clap 就是得多用才能熟练，可以多去网上找找例子。

之前我用 clap derive 喜欢把 Cli 放到 static LazyLock，可以免去到处传参之苦。结果发现写测试变得非常困难，因为测试是并发的，不同测试看到的 Cli 是一致的，这样没法在测试里表达不同的 Cli 状态。~~所以如果 rust 有一个好用的 context 实践的话就好了。~~

扯远了，说回 clap。我们可能对命令行有更多自定义的验证，简单的场景可以用 [serde_valid](https://github.com/ya7010/serde_valid)，这是个比较有意思的日本人写的库，写起校验条件还是比较符合人体工学。如果你的 validate 非常复杂，或者有各种奇奇怪怪的类型，则可以自行 impl Cli 添加自定义的 `fn validate(&self)`，并且在 parse 后调用一次做校验。不要用 clap 自带的 `value_parser`，[那个是一坨大便](https://t.me/withabsolutex/2367)；或者可以使用某个 serde_inline_default 宏，但是代码这里不好给出，可以私聊我。

其他经验：

- clap 默认不允许 `-` 开头的 value，如果需要，用户可以用 `xxx=-xxx`，开发者可以考虑 [allow_hyphen_values](https://docs.rs/clap/latest/clap/struct.Arg.html#method).
- clap 的 Vec 默认允许 0 个元素。如果要求用户必须给出内容，可以使用 `#[clap(num_args = 1..)]`。
- 对于 command 的 alias 尽可能使用 `visible_alias`，可以在 help 中显示。可以多次使用以定义多个 alias。

如果你对构建后产物有极致要求，可以用群友开发的 palc，功能比 clap 弱一些，但是可以节省几百 KB 的产物大小。干点简单的 arg parse 也是可以用的。

不过注意，palc 默认不支持 `-V` / `--version` 打印版本号。

### once_cell

创建 Lazy 或 OnceCell 的 static 变量。在 rustc 1.80.0 以前这是 unstable，但是现已 stabilized（`std::sync::LazyLock`），所以 once_cell 已经没人用了。

### 字符串进阶

Rust 生态里有着各种各样的字符串，标准库里有一堆，三方库还有一堆。

ustr：全局去重的 'static str。每个字符串只是一个引用；相同的字符串只占用一份空间；可以以极低开销拷贝。只是创建字符串的时候有一次去重对比的开销，不算大。
ustr 是我最喜欢的三方 str 之一，如果你的拷贝次数远大于构造，且不同 str 的构造次数有限（如果字符串是用户输入，容易让内存无限增长），推荐使用它，无需关心各种生命周期，clone 起来也飞快。

arcstr：`Arc<str>` 的高性能替代（去除了 weak ref 以提升性能）。arcstr 也可以到处 clone 而不用关心生命周期。但是要注意，在多线程下 arcstr 的引用计数的性能损耗还是比较大的。

bstr：非 UTF-8 的字符串。没怎么用，不作评价。

compact_str：在栈上存储 \<= 24 bytes 的字符串。

### 错误处理

rust 界流传着 _bin 用 anyhow，lib 用 thiserror_ 的谚语。它们两个的目的是完全相反的。一个是细化，一个是归一。

- anyhow 可以将所有错误归为一类往外抛，并且还有额外信息（context）支持。
  - anyhow 比较“重”，会增大你的二进制大小。如果你不需要用它的一些额外特性（例如 context），也可以 `type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;`。
- thiserror 比较轻量，用来细分自定义的 error 类型，可以自动 derive From another error。
  - 不能在两个错误类型中同时 from 同一个 Error。如果确实需要，可能要手动再分 Enum 作为 suberror。

而 snafu 是一个很有野心的挑战者，它可以同时适应类似 anyhow 抛模糊错误和 thiserror 抛精确错误的场景。但是 snafu 也是有缺点的：

- snafu 虽然通过 proc macro 生成 `xxxSnafu` 来简化错误创建，但是**本质上还是手动挡**。大量的 context 会让代码复杂度变高，并且写 context 的时候如果不注意可能会造成性能问题（就像 `.context(xxxSnafu { path: p.to_path_buf() })` 这样，即使不进错误处理的分支也会多进行一次字符串拷贝）。
  - snafu 对标 anyhow 的部分，也就是 Whatever，并没有想象中的那么好用。即使对于自己创建的 Snafu，每个 Whatever 也都需要 .whatever_context 来抛出异常（如果写闭包的话代码又更长了）。

我的观点大概是，anyhow 对于 binary target 基本是必备，anyhow 的方便是其他库不能替代的。而对于 lib target，thiserror 当然没有问题，如果你的库不需要细分其他 Error 可以用 thiserror 自动档，如果有更细致的要求就用 snafu 手动挡。没有必要专门去用 snafu 重写当前的错误处理方案。

另外如果你对错误处理感兴趣，也可以看看 [eros](https://github.com/mcmah309/eros) 等小众的错误处理 crate，每个 crate 都有其设计理念。

### 日志

说日志的话总共也就两套方案，一种是传统的 log 方案，另一种是 trace 方案。trace 方案基本上算是给网关和 server 用的，像我这种写垃圾小玩具的肯定是接触不到了。

log 方案的好处就是 log crate 非常统一，而且用起来跟其他语言很像，比较简单。但是 log 只提供底层 API，而如何展示就有很多种选择了。

- 对于一般的小玩具，基本就只是支持一下颜色和时间戳输出。我之前一直在用 pretty_env_logger (based on env_logger)，不过由于 env_logger 引入了 regex，这玩意对编译后二进制大小有较大影响，所以我也在寻找更符合需求的替代品。
  - 而且 env_logger 是完全同步的，不适合多线程打日志。
- 对于更大一点的玩具，需要更多功能的，flexi_logger 用起来是手感较为舒适的。
  - 但是这玩意问题是代码质量比较一般。
- 如果需要简单、额外功能较少的日志库，也可以使用 Rust 群群友的 spdlog-rs。比起 flexi_logger，spdlog-rs 少了各种特殊 file flush 策略和轮转后日志压缩等功能，但是这些本来也不是一个日志库的核心功能。spdlog-rs 的 [benchmark](https://github.com/SpriteOvO/spdlog-rs/blob/main/spdlog/benches/README.md) 是很好看的。

trace 方案最常见最泛用的就是 tracing 了，跟 tokio 一样，大企业都在用。但是我不太喜欢（tracing 的一些生态），详见前面的[拉黑](#拉黑)。如果你做网关 / http server，并且确实需要 trace 方案的，可以看看 [fastrace](https://github.com/fast/fastrace)，号称是最快的 trace 方案库，性能方面极具竞争力，生态也尚可（有 tracing 兼容层）。

还有比较邪道的日志库使用 log crate 的生态实现 trace 的效果。例如 [context-logger](https://github.com/alekseysidorov/context-logger)，emmm 不过这个 crate 基本跟手动挡一样，感觉自己写个也不难。

### channel

crossbeam-channel 被我拉黑了，大家可以选择 [crossfire](https://github.com/frostyplanet/crossfire-rs)。它的 [crates 页](https://crates.io/crates/crossfire) 还有一些跟其他 channel 库（kanal[^fkkanal], flume）比的 benchmark。

[^fkkanal]: _kanal 不支持 poll 形式，也不 cancel safe。_ —— [Sherlock Holo](https://luoxu.archlinuxcn.org/#g=2261788729&q=kanal+不支持+poll+形式)

### serde

除了直接 derive 外，serde 一般用得多的技巧还有：

- `#[serde(rename = "xx")]` 和 `#[serde(rename_all = "kebab-case")]`，自定义序列化的名称与格式。更多宏可以看 [doc Field attributes](https://serde.rs/field-attrs.html)。
- 对于需要在缺失时使用 empty 的容器对象，`#[serde(default)]` 是个不错的选择。
- 如果有的结构需要手写 parser，可以顺带实现 serialize trait，代码不会太多。
- serde 提供了 [remote derive](https://serde.rs/remote-derive.html)，也就是为第三方 crate 里的 struct derive serde。但是我没用过，看起来不太好用的样子。

一些 serde 插件：

- [serde_valid_derive](https://github.com/ya7010/serde_valid)：使用宏对某些字段进行 validate，避免写大段函数。这玩意还是比较早期的阶段，不够好用，但是出发点是好的，开发者修 issue 也修得也很快。

### rayon

rayon 现在已经几乎统治了 rust CPU 负载型的并发。使用 rayon 可以非常方便地写出多线程程序，榨干你的 CPU，并且本身是同步的，无需引用任何异步运行时。并且 rayon 本体也是相当轻量。

rayon 内部有一堆线程池 + 一堆奇形怪状的锁和管道，然后通过工作窃取最大化核心利用率，是很有一套的。我之前做过一点 pipeline，想跟 rayon 碰一碰；测出来对于均衡负载的工作性能，我的 pipeline 不弱于 rayon，但是在非均衡负载下 rayon 把我按在地上摩擦。

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

- 对于数量巨大、每个任务开销较小的任务，我们可能希望在一个 worker 里一次处理多个任务，避免过多的上下文切换，并且内部 for 循环还可以自动 simd 提升性能。rayon 提供了 [par_chunks](https://docs.rs/rayon/latest/rayon/slice/trait.ParallelSlice.html#method.par_chunks) 来做到这一点。

### sqlx

如果你写 SQL 比较熟练，不需 ORM，那么 sqlx 就非常适合你。尤其是在当前 Rust 还没有任何特别好用的 ORM 的环境下，sqlx 更是一个不差的选择。

说到 sqlx 就不得不提，它是强制类型的，因此在编译时就需要获取数据库表信息，例如 sqlite 情况下用户需要为其提供一个模板 sqlite。但是（假设用户没有装 sqlite cli）创建一个 sqlite 本身就需要 sqlx，就遇到了鸡/蛋问题。而且修改 schema.sql 也有可能忘记重新构建模板 sqlite。这时候就要用一个 build.rs 在 schema 初始化或改变时自动更新模板 sqlite。这个 build.rs 我写在了[这里](https://gist.github.com/lxl66566/85de8095cd6644396a901440af2e10f8)。

### tauri

由于我[只写 web based GUI](#gui)，因此 tauri 成了我的唯一选择。网上有很多喷 tauri 的，我用得不爽也会喷，但又不是不能用，实现我的需求还是没问题的。

- 一开始就不要对 tauri 抱有太大期待，当成一个 IPC 框架用就行了。
- tauri 的很多插件比较狗屎，上面 [拉黑](#拉黑) 写了一些。很多插件是为了在 js 里操作只有 rust 能拿到的资源，这里建议不要用它们，自己手写 rust 然后暴露 command 给前端调用，这样比较可控。
  - 用 tauri 插件有权限问题，很烦，有时候调试半天结果发现是没给权限。如果自己写 rust 代码就没有这些问题。tauri 这些权限并不会让系统更加安全，只会加重开发者的心理负担。
  - 而且 js/ts 调某些资源还是比较危险的，先不说 nullable 语言和类型隐式转换一坨大便，光是前端响应式什么时候会重复执行，什么时候没法执行，就够开发者喝一壶了。
    - 如果 vibe coding 小子那就更应该多写 rust，少写 js/ts，这都是血的教训。
  - 当然有些插件也是可以用的，tauri_plugin_window_state、tauri-plugin-single-instance 这些都比较简单，没啥问题。像这两个插件，写 tauri APP 基本算是必须引入的，可以提升关键的用户体验。
- 错误处理一般是自己写 thiserror，还必须实现 Serialize，这个没法 derive（很多 from 的错误都没法 derive Serialize），只能自己写个：
  ```rs
  impl Serialize for Error {
      fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
      where
          S: Serializer,
      {
          serializer.serialize_str(self.to_string().as_ref())
      }
  }
  ```

### image

image 库基本就是 Rust 图像生态里知名度最高的库了，image 提供了对大量图像格式的统一操作支持，用来写 server 等业务逻辑属于必备库。

然而读了一点 issue 和代码后，我感觉 image 本身的质量比较一般。可能也是缺人的缘故吧（计算机里的图像天坑），image 的迭代速度一直很慢，[0.22 一年，0.23 两年，0.24 两年](https://github.com/image-rs/image/issues/2245#issuecomment-2133833173)，所以即使 image 处于 0.x，也没法随意进行 breaking change。

image 的性能其实**非常糟糕**：

- 最大的问题就是为了兼容各种图片格式/用户自定义结构而搞出的 GenericImage trait，很多热点路径都在用 GenericImage 的 `get_pixel` 和 `put_pixel`，这俩玩意内部有 2-3 个越界检查分支，LLVM auto vectorize 看到立刻破防了。图像处理最重要的就是 batch processing，简直是为 simd 天生打造的竞技场，然而 image 除了几个依赖用了 simd feature，自己基本没有 simd 代码，之前[有人想搞的 simd 计划](https://github.com/image-rs/image/issues/2383)现在也没声了。
- 项目里虽然 rayon 是 default feature，但是几乎没人用，尤其是某 Contributor 还[以「用 rayon 有被 DDoS 耗尽内存的风险」为由，关闭 pic-scale-safe 的 rayon feature](https://github.com/image-rs/image/pull/2639#discussion_r2508356543)，我真的被无语到了。本来 image/rayon 关联 deps/rayon 就是最佳实践，处理可控输入就开内部 rayon，批量处理外部输入就在外部用 rayon 然后关内部的 rayon，一切都是如此自然，我决不能接受这种奇葩理由来故意降低性能的行为。
- 其他的还有 `&dyn GenericImage` 动态派发无法内联、u8 -> f32 -> u8 等。

### RustCrypto/xxx

RustCrypto 的 AEAD 实现大致也是最泛用的 pure Rust 实现，其他的要么用 aws-lc-rs 要么是 openssl。

RustCrypto 的性能仍然是最大问题，网上可以找到许多 benchmark 资料，RustCrypto 就是比 aws-lc-rs/openssl 慢几倍。issue 里也[讨论过这个问题](https://github.com/RustCrypto/AEADs/issues/243)，但是显然 6 年后好像也没什么进展。

由于我主要用的是 ChaCha20Poly1305，这里就以 ChaCha20Poly1305 为例讲讲。ChaCha20Poly1305 在 openssl 里的实现是有把 ChaCha20 与 Poly1305 融合的，而 RustCrypto 是[分为两步执行](https://github.com/RustCrypto/AEADs/issues/74)。这样不仅有额外的数据拷贝，而且编译器也不好进行 SIMD 优化。
