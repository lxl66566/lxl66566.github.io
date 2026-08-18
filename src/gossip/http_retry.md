---
date: 2026-08-09
icon: handshake-slash
category:
  - 评价
tag:
  - 测试
---

# HTTPS retry 测试

最近我司代理出公网质量下降得厉害，2%-20% 的 https 请求握手都会 tls eof（而且体感上首次建连爆炸的概率非常高），但是几次重试后往往可以成功（毕竟概率是乘算的）。这网络环境简直是一切开源闭源小玩具最严厉的父亲，只要是个会发 https 请求的玩意，一眼就能看出有没有做重试、报错行为和错误信息是啥。

于是在这里把我的日常测试都记录下来，嘲讽模式，启动！

## MaaAssistantArknights

使用 MAA 挂机明日方舟时，无法自动更新软件本体，表现为点击「软件更新」，显示新版本下载失败。

查看日志，发现 GET api.maa.plus/MaaAssistantArknights/api/version/summary.json 下载有重试（实际上是 fallback 到 api2.maa.plus），而 https://github.com/MaaAssistantArknights/MaaRelease/releases/download/v6.16.5/MAAComponent-OTA-v6.16.4_v6.16.5-win-x64.zip 软件更新 zip 包下载没有重试，一次 fail 直接失败。

然后提了 issue 不久后就[修了](https://github.com/MaaAssistantArknights/MaaAssistantArknights/pull/17675)，非常 nice。~~果然还是国人最懂网络的苦~~

## rustup

使用 cargo-msrv 找 MSRV 时（内部安装 toolchain 调用 rustup）获取到如下报错信息：

```
Unable to install toolchain '1.74.0-x86_64-pc-windows-msvc', rustup reported:
    info: syncing channel updates for 1.74.0-x86_64-pc-windows-msvc
    error: could not download file from 'https://static.rust-lang.org/dist/channel-rust-1.74.0.toml.sha256' to 'C:\Users\lxl\.rustup\tmp\6ccizx52h6tfy891_file': error downloading file: error sending request for url (https://static.rust-lang.org/dist/channel-rust-1.74.0.toml.sha256): client error (Connect): tls handshake eof
```

显然 rustup 并没有做失败重试。

看了下 rustup 的重试机制只覆盖组件包下载，不覆盖 manifest / sha256 的下载。并且 rustup 只对 BrokenPartialFile 和 DownloadingFile 两种错误重试，tls handshake eof 根本不被包含在内，没有重试行为。

## topcoat

我其实不用 tokio 出的这玩意，感觉也太玩具了点。只是 rust 群群友分享了下其 builtin tailwind support 源码，就点进去看了下。

它实现 tailwind support 的方式是……去 Github 下载一个 tailwindcss 的 binary😅。对你软的稳定性没点 b 数吗，要是 Github down 了我连程序都跑不起来。

扫了一眼代码，也就 [ureq 一发 download](https://github.com/tokio-rs/topcoat/blob/0c6d43fee8df66306754c67f72dc66b915de8dec/crates/topcoat-tailwind/src/build/executable.rs#L159)，没有任何重试机制。这种玩具还是进垃圾桶吧。

## autocorrect

执行 `autocorrect init`，下载无重试：

```
Fetching https://github.com/huacnlee/autocorrect/raw/main/.autocorrectrc.template
Fetch config template error: 

error sending request for url (https://github.com/huacnlee/autocorrect/raw/main/.autocorrectrc.template): error trying to connect: tls handshake eof
```

说实话我根本不懂这玩意去联网 init 的必要性是啥，每个 autocorrect 版本能解析的格式难道不是固定的吗？还有这玩意用 0 1 2 代表 off error warning，也是活久见了，感觉是 java 狗屎写多以后产生的幻觉。

## vscode

我经常打开一个带有 `$schema` 的 json，看到 schema url 下面有一条黄线说 `无法从“https://json.schemastore.org/component-detection-manifest.json”加载架构: Client network socket disconnected before secure TLS connection was established。` 那我猜测十有八九 vscode 这货就是没有重试机制的了。

简单拉下 vscode 源码做个验证，vscode 拉 schema 用的 [node-request-light](https://github.com/microsoft/node-request-light)，让我康康你的发育正不正常哟！果然没看到重试逻辑。request 调用方也没有做 error 重试，那么也基本确定这个问题真实存在了。

## Dependi

这个机器上摸鱼，经常可以在 Cargo.toml 里看到每个依赖后面有三个大大的红色感叹号。不用看 Dependi 日志我都知道发生了啥事。

果然，日志内容：

```
Error fetching versions for anyhow: Error: Client network socket disconnected before secure TLS connection was established
```

并且每一个依赖都是全部失败，非常整齐，不知道怎么做到的。
