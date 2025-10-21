---
date: 2022-06-17
icon: face-angry
category:
  - 主张
  - 评价
tag:
  - 负面
---

# 暴论：xxx 有多难用

此页面虽然是暴论的合集，但是有部分暴论并未收录于此处，而是写在相关页面内。点击前往查看：

- [音游暴论](../hobbies/rhythm_games.md#暴论-为什么你不该打音游)
- [浏览器暴论](../articles/browser/assess.md)

## 通用

- Android 软件凡是不使用系统输入法，而是自己提供输入法的，都是**一坨屎**。特指银行 APP。
  - 最痛恨的是这些输入法不能按快，否则会丢键。
- 人脸识别：
  - 国内人脸识别都靠调整手机屏幕背光计算脸部光线漫反射，来识别是否为真人。然而我的手机背光不够亮，即使拉到最高，在到处都是灯的公司里或者白天街上也没法通过识别；
  - 人脸 API 可能也比较贵，多失败几次就会被调用方封禁一段时间。
  - 人脸会自动拉高背光，这在晚上被窝里看手机时是致命的。我被搞过几次，晚上蹭蹭不小心就点到了人脸识别。。

## 编程语言系列

### Rust 有多难用

- features stable 周期长，一般需要经历 5-7 年。而好用的东西全在 nightly。
  - `Duration::from_days`
- const 和 static 非常弱，导致很难将计算搬到编译期。
  - 理论上如果 const 够强，`const_str` 这个 crate 就不应该存在。
  - rust 的 Regex 官方也不支持编译期构建。[这里](https://github.com/rust-lang/regex/discussions/1076)是一些解释，反正把锅推给了 const。
- [过程宏无法定义在同一 crate 中](https://www.reddit.com/r/rust/comments/tuxawv/why_do_procedural_macros_have_to_be_defined_in_a/)，对于简单的代码替换复用复杂度过高；而声明宏又无法实现某些复杂需求（或者实现难度过大，魔法过多）。
- `dbg!` 和 `log.debug!` 的设计[有问题](https://t.me/withabsolutex/1615)：行为不一致。
- Trait 是一个很好的设计，但是 Rust 的 Trait 太弱了：
  - 缺乏集合运算：只能取交集。不能取反：`impl<T: !Sized> for xxx<T>`；不能取并；不能取补，导致一大堆 conflict，例如同时 impl 同一个 trait for `FnOnce() -> T + Send` 和 `Future<Output = T> + Send` 结果是 conflict，目前无解。
  - auto trait unstable.
  - Trait alias 还是 unstable; trait aliases cannot be auto，这二者不能共存。
  - `impl Trait` is not allowed in `fn` pointer return types，`impl Trait` is only allowed in arguments and return types of functions and methods.
- `std::process::Command` 的设计中，command 和 args 一定要分开的，其只在内部进行组合；这就导致如果我要执行完整的语句，就要先 split 再 join，多此一举。
- Unsafe 并不是那么自由：
  - 无法改一个 not mut 的 static 变量。
  - 无法 access 一个库的 private field。
- 官方社区与开发者社区过于分裂
  - 倾向于将新的 feature 做成 crate 而不是 merge 进 std。
    - [Why not use d-ary heap inside rather than binary heap](https://internals.rust-lang.org/t/why-not-use-d-ary-heap-inside-rather-than-binary-heap/18765)
    - 这也导致了很多看起来应该是 official 的功能被分散到 crate 里，并且水平参差不齐，甚至是 [API 不一致](https://t.me/withabsolutex/1608)。
  - 很多东西理应在 std 实现，但是（目前）却没有
    - Semaphore（信号量）
- [不能添加 bin dependencies](https://stackoverflow.com/questions/35711044/how-can-i-specify-binary-only-dependencies)。
- `std::fs::canonicalize`：**rust 史上极恶函数之一**。这个函数在 Windows 上的第三方 fs、RAMDisk 等地方用就会返回 error（[ex](https://github.com/rust-lang/rustup/issues/682)），但是各种应用和库的开发者不知道这些，导致这个函数被广泛用于各种 rust 程序上，比较知名的例如 nushell, ouch 等。
  - 虽然这个问题的根源要怪傻逼微软的 `GetFinalPathNameByHandleW`，但是 rust 也不是一点错都没有，凭什么其他语言（C/Python/Go）去拿 real path 都不会有这个问题，就你 rust 有？
- nightly 工具链不允许指定版本，只能指定日期，而对 rust 了解不够的人根本不知道要下载哪个日期的工具链，也没有任何官方的查询页面/工具。`RUSTC_BOOTSTRAP=1` 是 rust 最后的仁慈。

#### 工具链与包管理

- _Blocking waiting for file lock on the registry index_，经典 cli 和 rust-analyzer clippy 抢锁，结果抢着抢着就死锁了。[解决方法](https://stackoverflow.com/questions/47565203)

#### 一些流行的 Rust 的垃圾库

**真 TM 难用**

- teloxide：一坨大便。
  - REPL 和 dispatcher 没有任何平衡，一个太弱一个太复杂，无法折中；
  - 各种抽象 trait + 生命周期疯狂拒绝我的参数，struct Bot 不愿意做我的成员，进来就赖着 move 不动，clone 不出，还拿生命周期威胁它的爸爸类。
  - dispatcher 就到处玩宏，到处都是非变量非函数根本不知道干嘛的 ident。
  - from_env 该抛异常时抛 panic。
  - 官方的 examples 也是要么太简单要么太复杂，没一个覆盖我的需求。去 github 找别人代码，全是 single function，没有用 struct 的。我生气了，不让我写 struct，那我就把所有成员全部扔到 LazyLock。
- sea-orm & sea-query
  - 貌似 sea-orm 不支持动态 table name，sea-query 支持有限动态 table name，必需是 derive 了 Iden 的 enum 才行。。。拿非有限用户输入当 table name 不是一个很正常的需求吗？
- j4rs
  - 该爆 args type not match 时爆 `Method xxx was not found`
  - 各种输入用 `&[InvocationArg]` 包，结果包的 api 跟屎一样

### python 有多难用

- python module 看着很方便，实际上仍然过于粗暴，解决不了交叉引用的问题。
- python 的高阶函数（`filter`, `map`, `reduce` 等）语法又非常变态，`func` 放前面，`self` 放后面，做个 UFCS 还得和其他函数分裂。
- ~~python 不优化尾递归。~~ python 3.14 introduces optional Tail Call Interpreter
- python 自由度太低。
  - 不能写宏。参考 PEP 638。
  - 不能为 builtin class 添加方法。
  - python lambda 只有一行。

#### python 写的软件有多难用

- 性能就不多说了，虽然 numpy 用 C 写了性能还行，但除开数值计算，其他方面就很阴间。
- 打包阴间。不管是 pyinstaller 还是 nuitka 都贼拉，体积爆炸[^4]。
- 代理问题[^3]
  - poetry：install script 不读代理
  - [insanely-fast-whisper](https://github.com/Vaibhavs10/insanely-fast-whisper)：访问模型时不读代理（而且是 eBPF 代理）

[^3]: 遇到了不少 py 写的 install script，不读系统代理，不能配置代理，不做错误处理，不具有可读性。真的难绷 😅 ([src](https://t.me/withabsolutex/1304))

    ps. python setuptools 可能只读环境变量（`HTTP_PROXY`）而不读 windows 下的系统代理。

[^4]: 一个 customtkinter + matplotlib 项目，朋友遇到打包问题问我。pyinstaller 打出来 200M，运行不了，我教他用 nuitka，他在 windows 下打出了 **1.2G** 的好成绩。

### Clojure 有多难用

- ns 和文件名有各种映射关系，例如 `_` 和 `-`，`.` 和 `/`，导致写文件名限制重重，这个符号不能用，那个符号也不能用。被文件名坑了几次。
- 报错模糊。根本看不出啥错误。感觉比 nix 还烂。
- REPL 环境有问题。例如
  - 没有 `load` 和 `load-file`，反正我用 bb 是没有的。
  - 正常的 `:require` 代码，可以在 cli 执行的，在 REPL 里会 `Attempting to call unbounded fn`。并且也看不出错在哪。
  - 这个 `Attempting to call unbounded fn` 非常灵车，我 rust ffi 到 clojure 天天报这个错，没有任何有效信息，调试几小时结果[发现跟 fn 完全没关系](https://t.me/withabsolutex/1877)……
- 文档挺一般的，不能一下找到重点，整体也很散。
- 用户交流方式也不行，搜问题排名靠前的居然一大堆 google group。很难将解决方法传承下去。
  - 倒是有一个 [clojureverse](https://clojureverse.org/c/questions-help)，但是已经死了（最新帖子 2022.06），而且不在搜索引擎范围内，fw。

### lua 有多难用

语言设计：

- lua 很多细节要另辟蹊径，不用常规编程语言的那一套。
- 写 end 太丑了，不如写 `{}`
- 动态 require，有人就会构造运行时字符串进行 require，把静态分析的工具全部炸烂
- nil 有一大堆的坑，比如最经典的 array table 设 nil 在计算长度时会爆炸
- 没有可用的 typing。typedlua 已经死了，luau 勉强算一个吧，但是生态呢。。
- std 里缺了非常多的函数
- 实践里的错误处理跟 go 一样丑

生态：

- 虽然包管理器是唯一的 luarocks，但是整个包管理方式也是一坨大便。
  - 很多包是 C 动态库，需要当场编译；但是又没使用任何可复现构建导致一大堆基础包构建都是失败的。例如本人亲历 [luasocket issue](https://github.com/lunarmodules/luasocket/issues/429)。
  - 还有的包依赖莫名其妙的东西，例如有的包依赖整个几百 MB 的 openssl。。
  - [feat] luarocks 在 windows 上不会自动改 path，想正常用需要自己去写环境变量。但是 windows 人已经习惯让软件给自己设好变量了。
  - luarocks 在 Windows 上不吃代理，或者是我明明能访问 luarocks.org 但是还是 _Failed downloading https://luarocks.org/manifest-5.4_
- formatter 一坨大便。sumneko LSP 的 formatter 就跟没有一样很多错不会纠正；Stylua 比较强硬，可选项很少，但是最让我气愤的是它的 column_width 只是一个不强制的建议值！我设了 80 甚至 70，结果一 fmt 还有一大堆超过 80 的，真的难绷。

#### openresty 有多难用

也归到 lua 下吧。

- 安装：
  - windows：`resty -e "..."` 指令必须在 openresty 安装目录执行，不能在任意目录执行。否则会报 `nginx: [alert] failed to load the 'resty.core' module (https://github.com/openresty/lua-resty-core); ensure you are using an OpenResty release from https://openresty.org/en/download.html (reason: ...luarocks\current\rocks\share\lua\5.4\resty\core\base.lua:31: ngx_stream_lua_module 0.0.7 required) in Z:\Temp\ZTUSK4zJCF/conf/nginx.conf:105`
  - linux：`pacman -S openresty` 安装后，/usr/bin 里甚至找不到任何相关可执行文件。（不过这应该算打包者的锅，不是它的）
- 虽然以前的性能可能挺好，但是在现在 luajit 打不过 v8 jit 的时代，它的性能并不出众。
- 测试用的是 perl 那坨屎山，perl 生态又是更大的一坨

### go 有多难用

- 语法丑，很丑啊。人家 lua 丑是因为简单，std 东西很少。go 这么重还这么丑真说不过去。
- [构建系统一坨大便](https://t.me/absxsgroup/10597)
- workspace 一坨大便。
  - `go work vendor` 会将老的所有 vendor 都删掉，然后再写入新的 vendor。
  - go 1.20 无法使用 `-mod=vendor` 在 workspace 内进行编译；但是如果不使用这个 `-mod=vendor` flag，编译时它又会去请求网络。

## 文本编辑器系列

### vscode 有多难用

- 关闭了某插件的弹窗通知权限后，该插件依然会弹窗通知。
- 跨平台（跨系统）做得挺烂的。
  - 不支持仅在某平台禁用部分插件
  - 不支持仅在某平台修改任意设置项
- 推自家的 copilot 真是推死马了，每次打开新项目都会弹出侧栏。
- 打开 vscode 时如果你的 CPU 负载很高，弹出的终端就有可能是 powershell，即使你已经设置了 `"terminal.integrated.defaultProfile.windows": "Nushell"` ([src](https://t.me/withabsolutex/2157))。这个 bug 从 2021 年开始就已存在。
- 无法打开 1GB 的文本。这是 chromium based 编辑器的限制。
- linux 下某次更新后，每次打开都会被 kwallet 提示输密码跳脸，疑似自动连接 ssh-agent。
- vscode 在用 range 格式化 _包含 emoji 作为行开头_ 的 range 时，有概率让 emoji 爆炸（消失或 �）([src](https://t.me/withabsolutex/2459)，1.9x 行为，当前已修复)
- vscode wsl 是靠读终端文字内容来提醒用户某某端口可用的，非常脑残。([src](https://t.me/withabsolutex/2436))
- [符号双击与字符替换问题](https://github.com/microsoft/vscode/issues/251608) ([src](https://t.me/withabsolutex/2392))

### [cursor](../coding/vscode.md#关于-cursor) 有多难用

- 改完设置要重启才能应用
- 魔改了 vscode 里本来很舒服的设计
- 占用 vscode 2-3 倍的内存。。
- 某日启动，报错 main.js not found，只能重装。后来发现是 [updater 的问题](https://github.com/getcursor/cursor/issues/2670)。
- Cursor 0.45 后无法再无限续。而 0.44 即使设置了不要更新（`"update.enableWindowsBackgroundUpdates": false`），也会被强制更新到 0.45。
- Cursor 在未知情况下会主动处理我的 `settings.json`，并且导致注释丢失和格式改变（可以看出是用普通的 json parser 改的，而不是 vscode 自定义的那个）。

## QQ 有多难用

实在受不了了，来细数 QQ 的罪状 _~~（可以当作对比 telegram~~_

程序角度：

- **大！太大了！** 喜欢虚幻引擎是吧？
- 手机端和 PC 端都自动下载所有图片，从不自动清理。加了一堆群的我够受了，就算数月不点开群，双端 QQ 也会不漏过任何一张图片。（tg 可以设置自动下载媒体的阈值）
- （接上条）当我手机 QQ 占了 40+G 的空间后从 _设置-通用_ 进入清理后，发现存储空间扫描卡死，卡在一半转圈圈（对，甚至连进度条都没有）。文件索引稀烂。
  > 改版后：卡 99%。改了 UI 逻辑而没改文件索引，p 用没有。
- 就算从来不玩换装、厘米秀之类的无聊东西，资源文件和引擎也会内置。
- 深色模式 bug：QQ 安装后，在经典视图下无法设置深色。
- bug: 2023.12 QQNT 在 windows 下托盘图标无法显示头像

使用体验角度：

- 视频播放没有倍速，聊天界面视频甚至连横屏都没有。（tg 支持长按加速，desktop 版支持倍速按钮）
- 点进聊天不会从未读部分开始，并且回到未读位置的按键经常失灵（或者不出现）。
- 小程序的构思太拉，一个网页能解决的事一定要复杂化，花上大量时间。（我是链接党）
- QQ 空间文字复制仅支持全部复制，不可部分复制。
- 好不容易抄了个好用的频道功能，QQ 聊天与频道消息不互通（互相转发）。一个软件，两套独立系统。
- 某些消息 _（例如合并聊天记录，部分选中文字）_ 无法直接转发到我的电脑。
- 手机 QQ 无法更改文件默认下载路径。。默认路径 **`Android/data/com.tencent.mobileqq/Tencent/QQfile_recv/`** 极为复杂（设计就不想给你看），且`Android11`及以上版本使用文件管理访问 data 将遭遇一系列麻烦 _（拜垃圾安卓存储访问框架所赐）_ 。
  - 部分文件格式 _（例：json）_ 在`用其他应用打开`时给出的少量 _（仅 5 个，还附带 QQ 浏览器推广）_ 选项均为非文本查看类应用，结果没一个能打开的，还是要回到去上条所述的地址找文件的情况。
- 打开网页需要复制后进入浏览器打开。甚至不肯调用一下默认浏览器。
  - 内置浏览器没有刷新按钮。版本老，渲染不出一些新网页；看不了网址；开不了黑夜。
  - （tg 甚至自带网页预览，不用点进去就可以知道网页梗概）
- 黄钻用户可以隐身访问他人空间。最重要的隐私方面遭受不平等待遇。
- 云端聊天记录仅保存 7 天（不付费）。不要求像 tg 永久，长一点根本不过分。或者文字一年媒体图片 7 天我也能接受。
- 电脑 QQ 看完频道消息后，手机的频道未读不会消失。
- 电脑 QQ 多选界面可选超过 100 条消息，但是无法转发；转发失败后还会自动取消已勾选。（辛辛苦苦跳着挑出的 100 条消息全没了）
- 电脑 QQ-分享屏幕，比较严重的 bugs，包括鼠标闪烁，边框锁死。无法拖动浮窗，使用体验极差。你可以[点此](https://wwp.lanzout.com/iEYeW0836ged)获取本条问题的视频。
- 无法关闭某些消息通知。（2023 春节前有一堆广告；2022 底有频道推广，点击直接进入，自动以麦克风音量外放声音）
- 202306，刷机前备份 QQ 聊天记录到电脑，用的 QQ 官方功能。结果刷机完无法恢复，总是卡在 10/85，然后断掉，说网络环境较差。。
- QQ 新密码不能出现连续的 3 个字母 | 数字，如 `abc` | `012` 等。这帮 b 真以为各种盗号是密码复杂度不够啊 😅 极其傻逼的设计，这么有本事怎么不禁止公民身份证号出现连续数字啊 😅([source](https://t.me/withabsolutex/1174))
- 群文件无法关闭在线预览。在线预览做得也太烂了。
- 2024 上旬，点开群聊的 bug 火苗会停在中间，不会自己消失。

综上所述，QQ 做得稀烂。但我无法退坑，毕竟我的好友，我的游戏兴趣群体都在 QQ。（20230123 现在基本上已经切割完毕了。<span class="heimu" title="你知道的太多了">只要把我的朋友们都拉到 telegram，我就不需要用 QQ (x</span>）<text style="color:gray;">国产通讯软件里大抵是看不到一点明亮的光的。</text>

## 微信有多难用

不是很理解很多以前同学抛弃 QQ 转到微信的做法。在我看来就是从一坨屎跳出来跑到了另一坨更臭的屎里。

- 大，看着简约，实际上都是屎山。
  - 2023，仅安装登录的微信（其他什么都没干）就 1.1 GB
- 之前爆出过，转发文件一次，就复制一次。虽然修复了，但这条已经成为了微信永久的笑点了。
  - 然而微信电脑版还是没有修复这个问题（特性）
- 20230614 备份出现检测错网络，无法自定义备份聊天与备份保存位置。比起 QQ 备份差了十八条街。
- 权限管理稀烂。朋友圈等。
  - 群聊群主除了踢人，啥都干不了。
- linux 下没有可用的微信客户端。
  - > 为了保障你的账号安全，暂不支持使用网页版微信。你可以前往微信官网 <https://weixin.qq.com/> 下载客户端登录。
- 在我的平板 wechat 上会出现小程序无法获取位置信息的情况。（已开权限）
- play 版微信登录被封号
- 开启全局代理登录被封号
- 人机验证打断验证码的发送，需要点两次
- 新设备登录需要 tmd 朋友验证，并且还要朋友填银行卡号
- 更新身份证照片，上传照片后的 OCR 是阻塞的。不能继续传下一张，需要等待识别。
  - ps. 支付宝也是一样的。
- 文件不下载就不能转发。如果想通过收藏绕过下载，不好意思，收藏失败。
- 电脑微信同步最近聊天记录，结果同步的又不够多。
- [分享的链接带一大堆跟踪器](https://soaked.in/2020/08/wechat-platform-url/)，并且[转短链 API 已关闭](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&announce_id=11615366683l3hgk&version=63010043&lang=zh_CN&token=)
- 公众号推荐未关注的账号，无法关闭功能

## B 站有多难用

B 站你**什么时候\***啊?

- 推荐算法又垃圾又不可管理。（作为一个人，无法掌控自己的喜好真的很悲哀）
  - 反复推荐同一个没看的视频。（我要是喜欢我会不看？不喜欢了还一直推送？）
- 直播抽成高，退款机制傻逼。（未成年退款扣除的比收益还多，详情@KL_qiqi）
- 年报垃圾。（2022 为例）连最基本的 _看视频总时长_ 的数据都没有。
- 不氪金锁 30 帧。吃相难看。
- 番剧删减。
- 没有登录无法查看评论，无法查看 480P 以上的清晰度，引诱登录。
  - 有脚本能够绕过。

### 网页端

B 站歧视网页版用户。可能是因为：网页版用户不是核心群体；网页版被一大堆插件针对，挡着叔叔财路了. ..

- 网页版无法查看：UP 主荣誉周报，创作者报告，年度报告等。
- 网页版无法点踩。网页版剥夺了表达“不喜欢”的权利。
  - 2025 年，bilibili 首页可以表示对推送不感兴趣，是一点小进步。但是比起手机的反馈还是缺了不少，只有内容不感兴趣和 UP 主不感兴趣两个反馈，导致我即使反馈多次仍然会给我推荐分区内容。
  - 不喜欢某个 UP 主，点击 “对此 UP 不感兴趣” 是下策，应该进主页直接加入黑名单。
- 手机网页版连个大图都看不了，硬引到 app。
- 网页版直播间无法参与活动。
- 简介无空格的文字过长则被截断。[例子](https://www.bilibili.com/video/BV1UR4y1V7Ry/)
- 在播放合集时，切换视频后，URL 不会自动更换。此时如果遇到被下架的视频，页面会直接刷新，跳转到最开始时播放的那个视频。

### 移动端

- 一些 tag，例如“7 千点赞”“全站热门”等会遮挡 UP 主名字。我觉得看视频前看 UP 名字还是有点重要的。

## Telegram 有多难用

虽然我已渐渐由国产聊天软件用户转型为 Telegram 用户，但 Telegram 的程序也并非尽善尽美。以下所述皆为官方客户端的问题：

- bug: windows 端有着极为严重的内存泄漏问题([source](https://t.me/withabsolutex/1132))。截至 20230723 仍未解决。
  - 尝试解决：降低其进程优先级，为其开启 windows 效率模式（任务管理器）。
  - 根据 [issue](https://github.com/telegramdesktop/tdesktop/issues/25189) 所述，在 _设置 - 高级_ 中更改 ANGLE 图形后端，建议改为 _OpenGL_
- 中文（CJK）内容检索垃圾。使用空格分词检索模式，不适合该语系的内容检索。
- （PC）：无法针对聊天内容调整字体大小。
- bug：在频道回复消息时，链接的群组不会回复。
- 手机查看图片时，随图文字无法关闭，遮挡图片内容
- bug: PC 端有时打开任意图片都会弹出之前看过的同一图片
- PC 无法更改缓存位置。
- PC 端点击左侧聊天栏会将当前聊天进度调至最下，假设误触则丢失进度。

## 运营商有多傻逼

- 我爸的手机号，携号转网（移动 -> 联通）后部分短信无法接收。个人短信可以接收，而验证码平台（1068 开头的）的不能。
  - 浏览了一下网上的问题，不同运营商的通道是不一样的，有可能是第三方验证码服务平台根据号段选择了错误的平台发送验证码，然后没有触发跨平台的转发机制。（甚至有可能是利用运营商漏洞进行验证码发送）
  - 通信领域分为三个运营商是真的浪费。没有好的协调方案，资源浪费，恶性竞争，建议是：快润！
- 以前经历过被偷偷安排了非自愿的套餐，交了两年钱才发现。。
- 近年来取消了很多优惠套餐与低价套餐。

## 隐私号码有多难用

直到 20230311，隐私号码收快递时必需通过单号查询快递，否则没有取件码。。有据怀疑快递公司把手机号当主键标识了。。果然鼠鼠就不配拥有隐私。

## MIUI 有多难用

- MIUI13+ 阉割了全局深色模式。国产软件的尿性就是不适配深色，这一阉割，我眼睛直接快瞎了。
- [免打扰逻辑是一坨屎](https://t.me/withabsolutex/895)
- 没有 _WIFI 优先级_ 设置。
- 无法关闭 IPV6。

### 关于 MIUI 优化

MIUI 代码就是一坨屎山，不关 MIUI 优化，adb 连不上；关了 MIUI 优化，出现了如下 bug，**个个都是极度恶性 bug**：

- [深色模式无法关闭](https://t.me/withabsolutex/985)
- [文件管理逻辑问题和无效点击 bug](https://t.me/withabsolutex/976)
- 无法使用小米互传
- [相机录制视频被吞](https://t.me/withabsolutex/1099)
- [bug: 无法设置铃声](../articles/mobile/problem.md#miui-无法更换铃声)

什么，你说让我反馈？我早在 2018 就试过了，p 都没有一个。

## ColorOS 有多难用

ColorOS 是目前一加的默认系统。

- 不要冻 _应用包安装程_！！！！[惨痛教训，并附带了哪些东西能冻](../articles/mobile/problem.md#一加无限重启)
- 音量过高。最低音量都过高了。
  - [没法通过 `ro.config.media_vol_steps` 调](https://t.me/withabsolutex/1401)。
- 亮度调节也非常不线性。
- 不在接电话时，无法调节通话音量。
- 声音与震动中**无法关闭震动**，只能在震动强度中拉到最小。这意味着想关震动得去一个个应用设置里关。
- 自动熄屏里没有不熄屏的选项。。不过可以用其他方法解，见移动端页面。
- 在权限管理中，即使点击“所有权限”，也无法显示我想要的权限，例如“访问所有文件”权限。

## Git 有多难用

众所周知 Git 是目前被广泛使用的分布式版本控制系统。我之前也一直学习使用，并无不便之处。然而 20230317 真的很无语。

我想 clone 一个 >10G 的大仓库，由于一些原因，总是传一半断开。**而作为一个现代的系统，git clone/fetch 居然都没有断点续传的功能，很是令我失望。**（不确定是 Git 还是 Github 的锅）

- git diff 算法仍有待进步。（本人只用过 `Myers` & `Histogram`）
  - 会出现未修改代码，却被标记成变动的情况
  - 以行为单位（check `--word-diff-regex`）
- 压缩率一般
- ~~无法通过链接添加仓库外的文件（需要将仓库目录设为根目录）~~ git bare repo

## Github 有多难用

- 权限管理一坨屎。
  - private 仓库只能通过添加 collaborator 对个人开放，但 collaborator 意味着给出了读写权限。我经常想给别人读权限，但不给写权限。此时只能通过 organization 方式，而且无法自动同步仓库至 org，使用 org fork 个人 private 仓库，也无法进行 sync。
  - ssh 权限稀烂。Github 建议使用 ssh 进行传输，没有添加 ssh 密钥连某些 clone 都做不到，但添加了 ssh 密钥后，本机就对 Github 的所有仓库拥有了所有权限。我认为[^1]ssh 至少需要能够控制对不同仓库的访问权限与写入权限。这样开发者能够在可能不安全的主机上使用 ssh。
- workflow 一坨屎。
  - stay away from yaml!
  - [apt 无法使用](https://t.me/withabsolutex/1588)
  - [LF 变成 CRLF](https://t.me/withabsolutex/1590)
  - 自带工具挤占大量磁盘空间
- (2023) 强制 2FA
  - 甚至强制 2FA 后还会爆安全问题
- feat: fork 没有细分类型，例如为了推送上游或为了自立门户的。
- 查看 history commit 的页面写的稀烂，只有 newer/older 两个按钮来翻页，无法快速跳转到我想要的时间。
- Github 强行推广的 app 一坨屎。
  - 无法下载 raw file。
  - 代码在小屏设备上的表现不好。例如长代码会自动换行，使用户无需横向滑动，只需纵向滑动。但是这样导致了稍长的代码可以占满大部分屏幕，对信息获取并不友好。并且因为英语断词格式，无用的空区域进一步增多。
- Github PR 的 CI 如果 failed 了，并不会通知发起者。
- Github 首次 PR 的 workflow 需要手动验证([src](https://docs.github.com/en/actions/managing-workflow-runs/approving-workflow-runs-from-public-forks))。。。不是，你们 CI 改没改 `.github` 不能特判一下？非得一棒子打死？
- Github 在 commit message 中提到了其他仓库的 issue，然后删除 + force push 后，原先的 refer 不会移除。也就是说，我进行的 fixup 行为把别人 refer 了两次，感觉像 spam 了。。
- Github 移动端一坨屎。
  - ~~右上角的 `...` 总是点不开~~（修了）
  - 202406 在 kiwi browser 上代码查看抽风，自动上下滑动，无法定位。其他浏览器没有问题。对照实验，排除插件影响。
- Secret names must not start with `GITHUB_`. 所有之前的 actions 及其依赖全部爆炸。甚至还有一些 action 隐性依赖 `GITHUB_TOKEN`，又不知道 break 了多少仓库。
  - 更重要的是这破坏了 github action 的可复现性，只要之前的仓库使用了 `GITHUB_`，当前就一定无法复现。
- release binary，无法直接更换一个同名 binary
- Github 支持 merge, squash merge, rebase merge，但是不支持 squash + rebase merge。。您不是 ci 都会 matrix 吗，这个 merge matrix 怎么就不会了
- 在 pr 里复制分支的格式是 `name:branch`，但是这个格式在哪都用不了。。git clone 需要 `name branch`，而 git checkout 需要 `name/branch`

[^1]: [source](https://t.me/withabsolutex/1075)

## Youtube Music 有多难用

起因：20230409 我想把网易云音乐歌单迁移到 youtube music，使用[迁移工具](https://yyrcd.com/n2s/)。但是迁移过程和迁移后的实际体验并不能令我满意。

- **迁移过程中很多（40%+）的歌曲被替换为了近似形式（或无关歌曲）而非原曲迁移**，这是我最无法忍受的一点。
- 上传歌曲时只允许一首一首上传，不允许批量上传
- 上传完成的歌曲并不在一个 playlist 中，而是以单曲形式出现，需要自行一个个添加
- youtube music 网页版在我删除播放列表歌曲时出现了 bug，歌曲并未删除，在刷新之后仍然存在。
- 各种 ui 逻辑不足，例如在单击右上角头像时，点击其他空白区域并不能关闭弹窗等。

## utools 有多难用

- 远离 electron，维持身心健康
- 插件一直在后台消耗内存（还挺大），为什么不能随开随用？
- 商业化，拿着开源社区的东西疯狂吸血。（我亲身经历，好用的剪贴板插件某天开始收费）
- bug：时不时有个子进程莫名其妙让我的风扇转起来，瞬时 CPU & 内存高占用，kill 后不影响主进程，猜测是某个插件死循环

如何戒断？

1. 剪贴板用 [Ditto](https://github.com/sabrogden/Ditto)
2. 取色用 [ColorPicker](https://github.com/martinchrzan/ColorPicker) 随用随开

<ZoomedImg alt="utools vs diy my tools" src="/images/gossip/fuckxxx/fuckutools.png" scale="60%" />

## 批判微软

不更新系统我有可能被黑客攻击，更新系统我天天被微软工程师攻击。

简单看了一下[《开源世界旅行》](https://i.linuxtoy.org/docs/guide/index.html)，比较老的一本书，作者是国人，对微软批判非常辛辣。我借用赞同的观点。

- Office 是恶心的垄断，它庞大（占用以 G 计），混乱（甚至 2021 版都经常出现无法删除空行，无法对齐，保存崩溃），打开还慢。
- 无论 windows 还是 office，本质上都是傻瓜式操作，限制了人类的创造力（对首字自动大写有深刻体会）
- windows 就是强迫你接受微软的设计理念，我无法得到我需要的个性化效果，例如 windows 11 的任务栏
- windows bug 一堆，历史遗留重，设计也有缺陷（
  - windows 的设计理念是**所有程序的运行库全部自带**。这导致了混乱与体积膨胀。
    - 我喜欢 linux 统一 lib 位置的设计，避免了大堆重复占用空间。例如 windows 下 electron 人人喊打，但 linux 上却并没有太多不妥。
      - 这一点与 linux 上的开源流行有关系。当发生依赖不匹配时，志愿者能够迅速修复。
- 微软的应用在处理系统代理方面简直就是**垃圾中的战斗机**。例如 Microsoft Store 和 语音输入，你但凡走系统代理或者不走系统代理都能正常工作，你 tm 处于走和不走之间的叠加态，就是转圈圈用不了，我真的不好说了。
- 微软商店如果有什么应用因为地区限制无法下载，能不能麻烦说明一下啊。。找了半天没找到下载按钮，地区限制也是我猜的。
- [GetFinalPathNameByHandleW 在某些 RAMDisk 上会炸](https://t.me/withabsolutex/1683)
- 大力推广 copilot，一堆 copilot 图标，添加 copilot 按键等。但是 copilot 的智力在我用过的 LLM 里是垫底的。
- 在不同硬盘上装了两个 windows，它们会使用同一个盘上的引导；在主板 logo 结束后进入切换系统界面，切换后居然还要重启才能进系统？
- 2025 年 10 月微软连续爆出 T0 bugs，每天都在蓝点网刷屏。

### WSL 有多难用

WSL 就是你妈的垃圾屎山，傻逼 powershell 脚本，和 scoop 坐一桌。

- ([src](https://t.me/withabsolutex/2469)) 编程时出现 bug，排查半天，发现我的文件进入了存在与不存在的量子叠加态：
  ```sh
  ❯ cp -f libdecodeutils.so ../../xxx/lib/libdecodeutils.so || ls -ld ../../xxx/lib/libdecodeutils.so
  cp: cannot create regular file '../../xxx/lib/libdecodeutils.so': File exists
  "../../xxx/lib/libdecodeutils.so": No such file or directory (os error 2)
  ```
  然后 wsl --shutdown 再重启就好了，WSL 我操你吗
- ([src](https://t.me/withabsolutex/2450)) 20250812，我卸载 WSL 的其中一个发行版（ArchWSL），结果再进 wsl 就报错 0x80041001。无法重装，因为在 `wsl --update` 里会显示某个服务没有运行无法 update，它也不说是哪个服务没运行。我的 windows update 等服务是开的，都没用。最后靠系统还原点还原解了。
- [神人翻译](https://t.me/withabsolutex/2448)

## Geforce Experience 有多难用

众所周知 NVIDIA 显卡的游戏支持是 Geforce Experience，其提供了一系列硬件级游戏功能扩展，如游戏滤镜，录制与推流，重放等。但是程序本身 bug 一堆，拉的要死。

- 有时候启动游戏时不会启动游戏内覆盖，需要重启游戏。
- 游戏内覆盖窗口的鼠标灵敏度不同。
- bug: 游戏内覆盖不起作用，尝试重启您的系统。而此错误与重启系统没啥关系。需要在软件卸载界面为所有的 `Microsoft Visual C++` 点击卸载，选择修复[^2]。
- bug: 游戏内覆盖窗口不显示，只显示鼠标。重装驱动都无法解决。

[^2]: [source](https://www.zhihu.com/question/315889356)

## steam 有多难用

- 交易垃圾。
  - 作为一个垄断性质游戏平台，拿了与提供的服务不相称的抽成。
    - 交易区的 cs2 箱子要抽成 15% 左右。
  - 需要一年内买过游戏才允许交易。（PS. 买过钥匙也行就是了）
  - 送礼，付款时显示订单异常，无法下单
  - 充值 30 起充，不能提现余额。
- 新版 steam 退出甚至需要等待一段时间。我还没见过哪些软件退出要等待的。
- 改名垃圾。
  - 限制十个宽字符，但是不提前声明。改完以后发现名字被截断了。
  - 然后想将错误名字改回来，提示 _不允许过于频繁地更改个人资料名称。请过几分钟后再试。_
  - 然后过了几个小时也无法改名。上网一搜发现大家说要几天。。
- 找回令牌非常难用，点了半天没有引导。
- bug：
  - 下载时切换代理显示无网络连接，无法重连，需要重启 steam。
- 搜索（主要是特别优惠界面）是屎。
  - 请使用 [SteamDB](https://steamdb.info) 进行搜索！！！
  - 锁国区游戏直接隐藏，而不是显示无法购买。
  - 一次加载 20 个
  - filter 数量和种类都不够
  - 从二级页面返回该页面后之前浏览过的全部重刷
  - 鼠标滚轮滚动过快还会重置 filters
- 异地登录不安全，即使我在手机上批准都没法通过，要答两道题，而且不选 _其他_ 就不让我登录。

## ubuntu 有多难用

我本人入坑 linux 是直接 archlinux 的，但是朋友用的 ubuntu，而我经常要帮他解决问题（）

- 首先喷 ubuntu 的 90% 都是喷 snap。确实，当我想要 btrfs defrag 时，看到一堆 readonly 的分区真是血压高。
- 然后 ubuntu 的默认 shell 是 dash。。不支持 source 命令。

## neea 的网站有多难用

- 首次打开网址黑屏，需要刷新才能显示
- 神奇的浏览器兼容性：
  - 四六级 firefox 无法报名，必须使用 chrome 内核浏览器
  - jlpt edge 无法预订座位，更换 firefox 后解决
- 验证码输错一次，所有信息重新填
- 报名和查分分裂，账号和密码不同

## Youtube 有多难用

- 我不想看 shorts，但是点击关闭只能隐藏 30 天。
- 推荐算法一般，感觉不如 B 站的。

## Fuck annoying Sliders

众所周知 slider（滑动条） 经常会成为不好的设计。此处收集了一些让我非常恼火的 slider 设计。

- 边界范围设计失败：一般是没有给用户提供足够大的设置范围。
  - [Cherrygram](https://github.com/arsLan4k1390/Cherrygram)：_贴纸大小_ 最小 50
  - Battery Guru：_低于以下电量开启系统省电_ 最大 50

## 雷蛇驱动有多难用

- 大，太大了，我就要一个宏功能，驱动总共不到 10M，它安装后给我装了 1G Synapse3，喜欢我雷蛇全家桶吗
- 流氓软件，在托盘退出后还有后台进程运行

## 12306 有多难用

- 只能看 30 天的车票。
- 人脸验证经常失败，爆一串没人看得懂的 hash。（可能是夜里不能用？）
- 查询算法垃圾，用过携程都知道，完全爆杀 12306
- 价格计算不透明。我买学生票 75 折，但是付款永远比 75 折要多。（393.5 的票，付钱付了 317？）
- 性能差，查询车次会卡
- 查询经停某站的所有车次时，不显示火车

## Android Studio 有多难用

- 自带的 Terminal 天天炸。我用的 atuin，这个 Terminal 一调 atuin 就报 `` Error: failed to create file `/etc/nixos/config/atuin.key ``，但是我在其他 IDE 的 terminal 就没有任何问题。
  - Terminal 是二等公民，例如我要用 `Ctrl + w` 删单词，结果 IDE 的快捷键优先，把 Terminal 窗口给我关了。
- 插件垃圾。
  - Vim 插件垃圾。只能调一点键冲突，没有其他选项。
  - 设置同步依赖 Settings Sync 插件，但是甚至无法登录，localhost 端口没开。
- 污染依赖。喜欢我 gradle 自动解析自动 import 然后把环境搞炸吗？我还好，毕竟已经习惯了；其他不会用 git 的同学就惨了，没有 diff，炸了代码就废了。

## 批判华为

### 招聘

- 华为的招聘系统垃圾。
  - 只要浏览器开着 Adguard，在 2024.07 之前都无法登录，因为图形验证码永远过不了。
  - 一个部门挂了以后换另一个部门，不给机会。
- 我参加了华为 2024 秋招的测开招聘。笔试，两轮面试都是秒杀，结果主管面被 PUA，直接挂了。
- 华为的秋招极为烦人。我在 BOSS 上被华为骚扰了至少 30 次。
- 牛客上看看就知道，2024 秋招华为的薪资开得都不高，许多人无法接受。据传还有毁约记录。

### 宣发

- 华为吹太多了，尤其是在通信/芯片领域，我大学里遇到的一堆老师/企业员工全是华为吹。天天 7nm > 3nm，只谈性能不谈能效，把我当傻子？

### 开发者联盟

- `developer.huawei.com` 前端还是有点屎的。没有自适应，弹出的窗口在我 110% 缩放下连关闭按钮都出不来。
- 开发者认证要刷脸实名，然后验证是录制一段视频，要等一定时间；第一次录制微信网页直接崩溃，第二次验证结束后手机端无反馈。

## 飞书有多难用

- 飞书的编辑器是所见即所得的 Markdown，但是却不支持导出为 Markdown。
- 不支持一键取消日程，只能取消单个日程
- 在 PC 端处理消息后，手机端的红点不会消失

## 实时同步方案多难用

实时同步有 syncthing 和 Resilio Sync 两套主流方案，后者非开源，因此我尝试了一下 syncthing。

1. 没设置 `$HOME` 就 panic
2. 服务器部署后访问面板 503，无日志

## 夸克有多难用

我高中时期是夸克厨，用夸克的缓存 m3u8 功能缓存了许多小电影。后来夸克越来越走下坡路，就不用了。然而即使在现在我大学毕业时，夸克也还时不时来恶心我。

- 夸克之前是不封网址的，看小电影贼方便。后来封了。
- 之前免费的功能现在基本都要收费，吃相难看。
- 夸克网盘和百度网盘一个尿性，下载贼慢。比度盘还慢，至少度盘还能卖上传换下载速度。
- 夸克系的东西广告和拼多多差不多流氓。

## Android 模拟器有多难用

我需要在电脑上运行 Android 程序。WSA 不争气，下面的商业化模拟器又全是傻逼，真受不了了。

### 蓝叠模拟器有多难用

20250202 我回坑方舟，使用蓝叠模拟器。结果当天晚上就换上了 MuMu 模拟器。

- 无限闪退：我还没有开启 MAA 的时候就闪退了，所以可以排除 MAA 问题，就是蓝叠本身问题。正是因为这个问题我才放弃蓝叠了，一天闪退了 6，7 次。
- 安装时无法修改安装文件夹：有一个选文件夹的事件，但是是选数据存储文件夹而不是软件本身的安装位置。
- 无法传文件夹到虚拟机：文件管理器里只能上传文件，不能传文件夹。
- 文件夹映射太差：因为不能传文件夹，我想直接将文件夹映射到虚拟机里。结果我需要在数据文件夹用 ripgrep `rg Documents`，然后去手动编辑一堆文件做映射。而且不能在开着模拟器时写映射，否则关闭模拟器时我的修改被全部还原。

### Mumu 模拟器有多难用

- 拖动 apk 进行安装，显示正在检查后消失，没有实际安装
- 使用 apk 安装 功能后，提示：
  ```
  检测到风险
  该应用未经MuMu审核，可能发生卡顿、闪退等兼容异常问题!
  建议通过游戏中心安全安装。
  立即安装
  不，谢谢（灰色小字）
  ```
  然后点击 _立即安装_ 其实就是用游戏中心安装。并且游戏中心安装的应用，**跟我的 apk 的签名还不一样**，cnm 傻逼。
- 老版本可以设置更多的网络选项，例如手动 DNS 等。新版已经不行了。
- 每次点击下次更新不再弹出 结果还是会不断弹出广告。

### 雷电模拟器有多难用

- 每次启动首屏都提示关闭虚拟化
- 首屏启动时无法缩小屏幕。强制广告大屏播放，而且在公司开游戏太显眼了。
- 在副屏使用，弹出游戏的工具小屏（其实就是广告）的时候会把窗口强制移到主屏。

## 闲鱼有多难用

- 2024 年加收 0.6% \~ 1.6% 服务费。
- 拍卖的物品很少，并且没有专门的入口进入拍卖；拍卖商品的等级和普通商品是相同的。
- “个人闲置”按钮并不总是出现，并且也不算太个人，里面混了不少商家。
- 闲鱼小法庭加载慢，有每日限额，并且限额的应用是在看完案件，打完字审判完成后，提交前弹出，等于是白看了一个案件。
- 反馈的选项不够多。
- 各种恶意标价不卖的，没有提供反制措施。
- 寄件只能从住址寄，不能人在公司然后不修改地址的情况下定位寄件。
- 填写寄件信息（使用菜鸟快递）后，想要修改信息，结果会跳到菜鸟的界面，此时地址簿是菜鸟的，与闲鱼不共用。
- 上门取件无法给快递员自定义文字备注！只有一些简单选项式寄件要求，无法满足其他需求。

## 某些 shell 有多难用

### nushell

- nushell 补全只是对 history 的拙劣参考，手感稀烂，比 fish 差多了。nushell 一直都不能通过读 fs 补全。
- 根本没有人关心 canonicalize，nushell 在 RAMDisk 上就是用不了的。
- 每次更新都是 breaking change，都要改配置
- 0.104 - 0.106.1 的某次更新不允许 `cd Z:`：_Cannot set $env.PWD to a prefix-only path_。有病吗？
  - 更新后不允许 `./test.sh` 执行脚本：_'.' 不是内部或外部命令，也不是可运行的程序或批处理文件。_ 有病吗？
- 类型系统垃圾

## Rime 有多难用

- Rime 标榜自由，但绝非想象中的那么自由。随便看几个 issue 就能发现某些开发者固执己见，拒绝讨论。不过还好也有愿意合并修复的开发者。
- rime 有一个默认行为就是在全角中文下，数字后加符号会变成半角（[issue#972](https://github.com/rime/librime/issues/972)）。我觉得非常不正常，理论上我在哪个模式下输入就应该是原汁原味的；就算不支持，也需要做一个开关让用户自由切换，而不是到了 2025 年再来修这个 bug。
