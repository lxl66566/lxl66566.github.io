---
date: 2022-05-26
category:
  - 作者
tag:
  - 灵感
---

# 灵感

这里的灵感请随便用。如果有人能实现我的想法，我会非常高兴的。

猜你喜欢：[绝对值\_x 对 xxx 的希望](../gossip/hope.md)

## 游戏灵感

- [ ] 双人智力竞技，边战斗边添加规则。触发规则则失败。在规则越来越多的情况下作出正确判断反应。
- [ ] 全拟真 FPS
- [ ] 万有引力四肢的人形 2d 游戏
- [ ] 操纵世界上所有 npc 进行决定主角命运的行为
- [ ] 你是一个监狱守备，一名囚犯买通了你，你需要协助他避开其他守卫越狱。
- [ ] galgame 主题的 iwanna，素材来源于收藏的语音
- [ ] 数据结构打怪，红黑树/平衡树
  - 数组合成高维数组
  - B 树 + 链表合成 = B+ 树
- 超级鸡马 + 蔚蓝
- [ ] 过载：电路竞技，场上有预设好的导线和电源（直流和交流）。玩家依次打出元件组成回路，结算时场上的所有己方正常元件都能算分，竞技性来源是烧掉对方的元件。
  - 支持的元件：导线（十字连通/十字非连通/T 形/L 形/I 形） 电阻 电容 电感 开关 电机（直流/交流） 二极管
    - 玩家可以在任意时刻操作开关，以产生感应电流/电压。
  - 场上可预设：运算放大器 扬声器（彩蛋）
- [ ] 内推模拟器
  - 模拟手机界面
  - 目标：在完成最低内推数要求的前提下，摸最多的鱼
  - 组长就在你身边：通过各种探测方式探测组长的位置，组长走近时就将手机界面切换为内推软件
  - 小游戏：社畜写代码；下班偷溜走；

### galgame

- 想把中式传统玄幻结合到 galgame 一次。至今玩了挺多西式奇幻 gal，但是感觉还是缺了点什么。

## 编程灵感

- [ ] ~~音乐播放器~~ 我现在使用 Telegram 频道作为云端音乐存储，保证同步。（问题是音乐缓存会被定期清理，需要将所有音乐保存到 Music 目录。）
  - [ ] ~~跨平台，多端同步（WebDav）~~
  - [ ] ~~自行导入歌曲，支持文件导入与 url 导入（即自定义音源，书源 like）~~
- [ ] ~~浏览器。直到现在我还没找到一个满意的浏览器。（我尝试过的：[浏览器横评](../articles/browser/assess.md)）~~
  - [ ] ~~Chromium 内核，开源，**高度自定义化**~~ 难度过高，暂不考虑
  - [ ] ~~sync cookies~~
- [ ] A git-like distributed version manager
  - [ ] 连续压缩
  - [ ] parts in a project, like how i use branch
  - [ ] 断点重传
  - [ ] 软连接，可在目录外创建虚仓库，指向真实仓库
- [ ] HDL 高阶语言，能将类 Rust 语法的语言编译成 verilog 或 VHDL。
- [ ] [音频加速](../articles/speedup.md)
- [ ] 流式分布式的视频软件?
- [ ] 响应式计算机设计与编程（与轮询式相对，主要切入点是屏幕）
- [ ] pdf 无损图片压缩
  - [ ] wasm, static web
- [x] git-crypt-weak，类似于 git-crypt, git-secret 的存储库加密，但是使用自定义密码的弱加密。
- [ ] ~~lzma 数据库，简易迁移，不依赖特定程序~~
- [ ] ~~浏览器书签 & 历史数据库(rust cli / js)~~ History Trends Unlimited?
- [ ] ~~better sqlite_zstd~~ 要么手操要么透明压缩
- [ ] windows electron lib(runtime)?
- [ ] windows volume locker
- [x] [wd: info words online in cli, written in rust](https://github.com/lxl66566/wordinfo)
- [ ] ~~ecust-survival, (with vuepress)~~ use [wiki.cic.cab](https://wiki.cic.cab) instead
- [ ] galgame engine
  - [ ] 自动生成可视化线路攻略
- [x] [bin package manager（release installer）](https://github.com/lxl66566/bpm)
- [ ] better [xdotool gui](https://github.com/sickcodes/xdotool-gui)
- [ ] osu beatmap downloader, support stable and lazer
- [ ] poetry plugin to import requirements.
- [ ] ~~pyshell~~ see [xonsh](https://github.com/xonsh/xonsh)?
- [ ] 好用的麦克风录音机 + 音频处理
  - 暂停与继续
  - 降噪
  - [ ] 智能限幅
    - 参考阅读：<https://magiclen.org/ffmpeg-normalize/>
- [ ] 系统音频录音机
  - [ ] 比特率与采样率选择
  - [ ] 录制结束后可裁切
  - [ ] [有声音时开始保存数据，静音 X 秒后自动停止录音](https://autoclose.net/autoaudiorecorder.html)
- [x] [urldecoder](https://github.com/lxl66566/urldecoder)
- [ ] ~~windows 工具包: alias, ls,~~ use bash instead.
- [ ] yakuake on windows
- [ ] ~~更好的静态博客/文档框架~~ 学了点前端发现 vuepress 也没有那么难用，暂时搁置
- [x] fuck, delete it! (windows)
- [ ] 代理，自行设计协议，对称加密
  - [ ] 通过虚拟组网方式，各节点设置 inbound/outbound，动态选择路径
- [ ] ~~windows shell with everything:~~ everything SDK is hard to use, i can't ever compile a basic example code...
  - ref: <https://micahkepe.com/blog/minishell/>
- [x] openppp2 client
  - [x] 绕过路由
- [ ] ~~rust tui 脚本工具箱~~ 做了一点尝试，意义不大，终止
<!-- - 转码，复制，参考我的 fish function
- 平台无关的 alias
- [ ] dotfile backup script -->
- [ ] ~~脚本语言~~ TS + bun？
- [x] python beautiful assert: [pretty-assert](https://github.com/lxl66566/pretty-assert)
  - 颜色，当前行，变量值
  - [ ] 可选不打印堆栈
  - [x] 分级，可禁用 exit
- [x] [Telegram RSS bot on cloudflare workers](https://github.com/lxl66566/Telegram-RSS-Bot-on-Cloudflare-Workers)
  - [ ] filter
- [x] rust release ci
- [ ] kde spectacle ocr plugin
- [ ] 分布式服务器监控全栈
- [ ] 半连接时序神经网络
- [ ] matlab executor or translator
- [ ] use excel-like editor to edit sql database
- [x] 射精记录 bot，cloudflare workers + d1
- [ ] rust TUI easy_download
- [ ] ~~GalgameManager~~ <https://github.com/GoldenPotato137/PotatoVN> ?
  - [ ] 随机启动 计时
  - [ ] 插件与启动链
  - [ ] 计时
  - [ ] 备份存档
  - [ ] 优秀的用户交互（自动查找图片）
- [ ] AI 相册整理。核心：[tag 论](../gossip/va_view.md#tag-论)；不使用树状组织而是使用 tag 型数据库组织，快速查找。
  - [ ] 移动端：做到比现有产品更好
  - [ ] 桌面端：场景：一大堆杂乱的照片放在一大堆杂乱的文件夹里。
    1. hash 去重。遇到重复照片，判断照片绝对路径的“熵”，保留更有意义的路径。并通过路径内包含的信息建立 tag。
    2. 自动解压路径中遇到的压缩文件，当成目录处理。
- [ ] rust-checkenizer: rust lsp based on cargo check. NO MORE RA NEEDED.
- [ ] rust easy context like tokio/compio do.
- [ ] 明日方舟视频自动去暂停
- [ ] SNP's Not Pydantic，回归原始，拒绝[隐性假设](https://t.me/withabsolutex/2338)
- [x] touchfish commit
- [x] ~~windows simple zstd~~ 遇到了[亿些麻烦](https://t.me/withabsolutex/2378)。后来基于更好的 dwarfs 写了个 ([windows-dwarfs-tools](https://github.com/lxl66566/windows-dwarfs-tools))
- [ ] strbase，基于 string 的关系型 db，git 友好。
- [ ] minix, mini nix lang
- [ ] bash compitable modern shell

### RIIR

- [ ] scoop
- [ ] bpm
  - [x] rust crate: select by arch
- [x] chnroutes
- [ ] fail2ban
- [x] Telegram marsbot
- [x] cross platform startup script -> [成果](https://github.com/lxl66566/user-startup-rs)
- [ ] reader
- [ ] sync tools
- [ ] diskann
- [ ] bubblewrap

### Android

<!-- - [ ] 绝对值下载器，贯彻小而美（same as appstore） -->

- [ ] 关于轨迹记录软件与应用时长记录软件<span class="heimu" title="你知道的太多了">时空刻录器</span>
- [ ] Android opensource store, package manager（AUR-like）
  - [ ] dependency
- [ ] 录音机 app，抓住日常的每一个瞬间
  - [ ] 全天录音 to RAM，手动保存重放
- [ ] Android task manager, \*top

#### module

- [ ] tg 多选截屏
- [ ] bilibili 任意倍速
- [ ] _usage time recoder_
- [ ] _kill MIUI restriction_
  - [ ] 10s countdown
  - [ ] 72h(24h in EU) unlock
- [ ] 意图拦截，intent scheme blocking

### nodejs & tsjs

- [ ] B 站 CC 字幕下载脚本
- [ ] osu 谱面下载器（仅前端？）
- [ ] 轻量级 pdf 演示 (pdf as ppt, in any browser)
- [ ] b 站历史记录搜索
- [ ] html compresser, <-> rss
  - [ ] 已找到同类项目 [sanitize-html](https://www.npmjs.com/package/sanitize-html)，但可以改进合并
- [x] B 站直播增强
  - [ ] 弹幕区域取消，发送弹幕放在视频下方
  - [x] f 全屏
  - [x] 屏蔽无用组件
- [ ] ~~类 markdown 方言, nmd (negative markdown) 换行问题 样式统一 高亮与黑幕 双列阅读区支持~~ 不要让方言再多一个啦！
- [ ] ~~better markdown formatter~~ just PR to _prettier_ if you don't like it.
- [ ] 答题网模板，选择题实时反馈
- [ ] SAVE MY LOCK FILE
- [ ] gaussian blur lib
- [ ] ~~koishi plugin:~~ （koishi 有关计划暂时搁置）
  - [ ] ~~advanced: wordle game~~
- [ ] 今天吃什么 project
  - [ ] 分食堂，自动根据图片目录生成
  - [ ] 可添加排除，写入 cookie
- [x] Google 翻译 x 次，网页 -> [成果](https://github.com/lxl66566/Google-translate-x-times)
- [ ] PT 站，但是更低的门槛
- [x] open bilibili video in mpv -> [成果](https://github.com/lxl66566/auto-play-in-mpv)
- [ ] AV 找片互助
- [ ] virtual network cluster，分布式理论同步
  - [ ] tag 论分区

### 插件

#### vscode

- ~~typst formatter~~ [typstyle](https://github.com/Enter-tainer/typstyle)

## 加密货币相关

- [ ] 高频交易 bot（以下方向有待验证）
  - [ ] 全连接神经网络 + 随机突变进化
  - [ ] transformer
  - [ ] 预设算法 + 高频因子筛选
  - [ ] [Merlion](https://github.com/salesforce/Merlion)
- [ ] 回测平台（rust，自动收集数据，接口调用）
- [ ] 发币（合约），构思一个尽可能公平，不会被土狗滥用的模式
- [ ] 币价监视浮窗
- [ ] Trump X.com 监视，LLM 判断加密货币相关性与积极性，并据此下单。
  - 可用 OCR 或支持图片输入的大模型。

## 文学创作灵感

- 门是拥有“灵”的， 被打开只是因为无法抗拒钥匙。

## 实物创作灵感

- [ ] 不压耳朵（开槽?）的侧睡枕
- [ ] 甩棍伞
- [ ] 安全鸭舌帽
- [ ] 肉色隐形防割护颈带
- [ ] 与电视交互的红外眼镜
  - 光标跟随视线
  - 眨眼控制左右键
- 贴膜机（快速对齐机）
- [ ] 全弧度不锈钢杯（不发霉，易清洗）

## 大型灵感

- [ ] 水中的 _Swimming Circus (スイミング・サーカス)_ 。FC 的模仿产物。
  - [ ] 25\*25\*3 - [ ] 30\*30\*4 (m)
  - [ ] 是否携带氧气罐：未决定。可做成扁平型。
  - [ ] 背部装备统一大小的触控信号贴

## 奇物志

记载了我梦中的奇物。

### 表盘

表盘认主后，其主视野中始终出现一个蓝色描边的虚幻表盘，执行着以下周期运动：

1. 表针向同方向快速旋转
2. 表针向反方向快速旋转
3. 表针停止旋转，刻度线出现并指向一个时间。
4. 到了刻度线所指示的时间，出现异变。
5. 异变结束后，重复周期过程。

异变是什么，梦里并没有具体感受。

- [ ] 描述：蓝色描边的具体图形：两个同心圆和花纹，两根指针，还有一个颜色稍有异的刻度线。其余区域皆透明无阻挡。
- [ ] 特性：自晦，未认主时不会被轻易发现。
- [ ] 副作用：表盘认主后，主人的修为不会继续上升；表盘脱离时，会将正常应上升的修为返还，实现飞跃。
