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
- [ ] lzma 数据库，简易迁移，不依赖特定程序
- [ ] 浏览器书签 & 历史数据库(rust cli / js)
- [ ] better sqlite_zstd
- [ ] windows electron lib(runtime)?
- [ ] windows volume locker
- [x] [wd: info words online in cli, written in rust](https://github.com/lxl66566/wordinfo)
- [ ] ~~ecust-survival, (with vuepress)~~ use [wiki.cic.cab](https://wiki.cic.cab) instead
- [ ] galgame engine
- [x] [bin package manager（release installer）](https://github.com/lxl66566/bpm)
- [ ] better [xdotool gui](https://github.com/sickcodes/xdotool-gui)
- [ ] osu beatmap downloader, support stable and lazer
- [ ] poetry plugin to import requirements.
- [ ] ~~pyshell~~ see [xonsh](https://github.com/xonsh/xonsh)?
- [ ] 好用的 CLI 录音机 + 音频处理
  - 暂停与继续
  - 降噪
  - [ ] 智能限幅
    - 参考阅读：<https://magiclen.org/ffmpeg-normalize/>
- [x] [urldecoder](https://github.com/lxl66566/urldecoder)
- [ ] ~~windows 工具包: alias, ls,~~ use bash instead.
- [ ] yakuake on windows
- [ ] ~~更好的静态博客/文档框架~~ 学了点前端发现 vuepress 也没有那么难用，暂时搁置
- [x] fuck, delete it! (windows)
- [ ] 代理，自行设计协议，对称加密
- [ ] ~~windows shell with everything:~~ everything SDK is hard to use, i can't ever compile a basic example code...
- [x] openppp2 client
  - [ ] 绕过路由
- [ ] ~~rust tui 脚本工具箱~~ 做了一点尝试，意义不大，终止
<!-- - 转码，复制，参考我的 fish function
- 平台无关的 alias
- [ ] dotfile backup script -->
- [ ] ~~脚本语言~~ TS + bun？
- [x] python beautiful assert: [pretty-assert](https://github.com/lxl66566/pretty-assert)
  - 颜色，当前行，变量值
  - [ ] 可选不打印堆栈
  - [x] 分级，可禁用 exit
- [ ] RSS telegram bot
  - [ ] using github actions
  - [ ] filter
- [x] rust release ci
- [ ] kde spectacle ocr plugin
- [ ] 分布式服务器监控全栈
- [ ] 半连接神经网络
- [ ] matlab executor or translator
- [ ] use excel-like editor to edit sql database
- [ ] 射精记录 bot，cloudflare workers + d1

### RIIR

- [ ] scoop
- [ ] bpm
  - [x] rust crate: select by arch
- [x] chnroutes
- [ ] fail2ban
- [x] Telegram marsbot
- [x] cross platform startup script -> [成果](https://github.com/lxl66566/user-startup-rs)

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
- [ ] 类 markdown 方言, nmd (negative markdown)
  - [ ] 换行问题
  - [ ] 样式统一
  - [ ] formatter
  - [ ] 高亮与黑幕
  - [ ] 双列阅读区支持
- [ ] ~~better markdown formatter~~ just pull to _prettier_ if you don't like it.
- [ ] 答题网，选择题实时反馈
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

### 插件

#### vscode

- ~~typst formatter~~ [typstyle](https://github.com/Enter-tainer/typstyle)

### 文学创作灵感

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
