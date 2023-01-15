# TG教程
[Telegram](https://telegram.org/)(TG) 是一款境外的聊天软件。需要[科学上网](./vpn.md)。（[维基百科](https://zh.m.wikipedia.org/zh-cn/Telegram)）其优势如下：
* 云端永久无限量存储
* 客户端友好，爆杀国内一众聊天软件
* 多端，优秀的同步机制
* 言论不受审查与限制
## 教程
简体中文包：`tg://setlanguage?lang=classic-zh-cn`（复制，发送给任意用户，点击；PC 用户可直接在浏览器内打开
:::danger 特别注意
若您使用 +86 号码注册，请点击 *设置-隐私与安全-手机号码-谁可以通过我的手机号找到我* ，将其改为*我的联系人* 。
:::

单击消息（PC：右键消息）可对消息进行处理。你可以**删除**（相当于撤回）& **编辑** 你发出的任意时刻的消息。<span class="heimu" title="你知道的太多了">此二者是聊天软件**最基本**的功能，而国内聊天软件做不到这**基本**。</span>

消息发送成功后会在消息右下角显示一个 `√`。对方已读会在消息右下角显示两个 `√`。

聊天界面点击 头像 / 聊天标题 即可进入聊天详情界面。可以查看一些详细信息，查找媒体文件等。 
### 分类
大体上，telegram 的聊天领域可分为三类：**私聊（Private message,PM），群组（Group），频道（Channel）**。此处着重解释频道：
* 加入者被称为 **订阅者**，仅能单向接受频道主的消息。订阅者可以对频道消息进行**回应（Reactions）**（指目前 61 种表情）。
* 频道主可以为频道**链接一个群组**，使订阅者能够在群组内交流，并开启频道的评论功能。（增加了频道的双向性）频道内发布的内容会在链接的群组自动置顶。
* 在频道的聊天详情界面，点击右上角三个点 - 查看讨论 即可进入链接的群组。
### 文字效果
Telegram 文字效果支持 粗体，斜体，下划线，等宽，删除线，链接，防剧透。（除了*防剧透*，其余均为 markdown 支持的效果）

要使用这些效果：
* 移动端，使用 markdown 语法。
* PC 端：选中文字，右键，在文字样式中选择。
### 文本搜索
TG 仅支持*空格分词搜索*。这是拉丁语系国家习惯的搜索方式，但对 CJK 国家极为不友好。<span class="heimu" title="你知道的太多了">当然，有寄术的可以使用 bot + sql [自建查询系统](https://github.com/lilydjwg/luoxu)。</span> 在文本中使用 [#tag](#tag) 也是一个不错的选择。
### 用户搜索
每一位用户，每个群组、频道都**可以有**一个**用户名**。（有别于昵称，需要主动设置）已知用户名情况下，有许多方法可以添加对应的用户、群组、频道：
* 在 TG 搜索框输入 `@` + *用户名* ；
* 在浏览器中打开 `t.me/` + *用户名* 所构成的网址；
* 在任意聊天窗口发送 `@` + *用户名* ，Telegram 会自动创建链接，单击。
### 发送图片
Telegram 会自动压缩发送的图片。若想发送原图：
* 移动端：点击回形针 - 文件 - 相册（发送未经压缩的图片）
* PC 端：拖入 / 粘贴图片，取消勾选 Compress the image
### 贴纸
单击别人发送的贴纸（PC：右键）可以添加贴纸包。然后就能用了。

下载贴纸可以使用：[TG Downloader](https://t.me/GIFDownloader_bot)
### tag
tag 由两端的空格，`#`号与 tag 名构成。Telegram 会自动为 tag 创建链接，点击即可在此聊天搜索所有带有该 tag 的消息。[这是一个示例](https://t.me/withabsolutex/520)
### 置顶
聊天界面的上方可以看到置顶消息（如果有的话）。点击即可跳转。跳转置顶消息**不会**将当前位置记为锚点。
### 回复与锚点
点击 *回复性质的消息* 会添加当前位置为锚点。你可以点击右下角向下的箭头返回最近的锚点。
## 频道群组推荐
由于本人使用telegram的时间不算久，此处频道/群组多为受先行者们所转发传播，在此对他们表示敬意。<span class="heimu" title="你知道的太多了">但是现在的我与当时写下这句话的我已经不一样啦kora！</span>

首先当然是要夹带私货啦！我和我的频道：<a href="https://t.me/ab5_x" target="_blank"><img src="https://img.shields.io/badge/Telegram-%40ab5__x-blue?style=flat-square&logo=telegram" /></a>
### 新闻
* [竹新社](https://t.me/tnews365)：较为客观的国内外新闻转载，简洁
* [Disclose.tv](https://t.me/disclosetv)：英文新闻频道，较客观
* [中国数字时代](https://t.me/cdtchinesefeed)：转载网评文章，较主观
#### 科技新闻
* [风向旗参考快讯](https://t.me/xhqcankao)
* [Solidot](https://t.me/solidot)
* [每日消费电子观察](https://t.me/CE_Observe)
### 外语
* [双语新闻](https://t.me/shuangyunews_rss)：看新闻学英语，拥有逐段双语对照
* [【音声可能】日本語雑談部屋](https://t.me/onseizatudan) & [日本語雑談部屋](https://t.me/nihongo_practice)：日语聊天群（不使用日语会被封禁）
* [つぐみ喫茶店](https://t.me/nihongo_soudann)：颇具规模的日语聊天群
* [英日部屋](https://t.me/enjpchat)：聊天群，仅能使用日语与英语
* [日語學習小組](https://t.me/learn_ja_group) & [日本語研修](https://t.me/LearningJapaneseGroup)：中文交流的日语学习群组
* [Word Power Made Easy](https://t.me/pieroots)：英语单词词根起源探寻
### 科技
* [黑洞资源笔记](https://t.me/tieliu)：分享一些有价值的编程工具及技巧 / 卖课的
* [C++ 中文交流](https://t.me/cpluspluszh)：讨论 C++ 问题 ~~（以及膜拜~~
* [蓝点网订阅频道](https://t.me/landiansub)：分享好用软件
### 资源
* [Visual Novel Channel](https://t.me/erogamecloud)：galgame 推荐与下载
* [NEP.Anime | 动画仓库](https://t.me/AnimeNep)：动漫收藏搬运
### 涩涩
* [美图与色图](https://t.me/setu_nsfw) & [everyday color photos](https://t.me/everydaycolorphoto)：每日色图
* [安利 (NSFW)](https://t.me/qingan567)：本子推荐
* [韵の小院🍃ᴺˢᶠʷ](https://t.me/YunRan1314)：<span class="heimu" title="你知道的太多了">露点</span>涩图
* [(ゲームCG) 一个兴趣使然的[NSFW-ios-XNR]](https://t.me/galgamenoHCG)：galgame CG鉴赏
* [每日精选](https://t.me/watchaveveryday) & [超清|中文字幕](https://t.me/CCTAV)：三次元的，嗯，不用我介绍吧
* [Absolutex's H storage](https://t.me/absolutexsH)：夹带私货，是我自己的涩涩仓库，*绝对值_x 精选，质量有保证！*
### 闲聊
* [垃圾高校毁我青春](https://t.me/joinchat/Ytplgt-buepkYThl)：大学生闲聊群
### vpn
建议去看[初级科学上网](../articles/vpn.md)，你可以在那些机场的官网找到TG群组链接。
### 其他
* [Iyouport](https://t.me/iyouport)：教你如何保护自己