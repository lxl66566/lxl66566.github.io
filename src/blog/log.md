---
# headerDepth: 1
date: 2022-07-21
icon: list
category:
  - 博客
---

# 博客日志

<div class="subtitle">记录点点滴滴</div>

::: tip

- 较小的语句优化与增删改不作记录。因此即使博客几乎为**日更**，但日志较稀疏。
- _维护_ 一般指花费时间较长或改动占比较大。后期记录频次降低。
- [学习笔记](../learning/README.md)区只记录 _创建_ 活动。（学习不止，维护过多）
- 自 20231112 起，新增文章不再记录于此处。
- 自 2023.12 起，此处只会记录博客工具有关的信息，一切 markdown 更改均不会记录于此处。

:::

## 2025

### 20250222

- 移除 xxx_interval 图表，数据已迁移到 [telegram-shasei-bot](https://github.com/lxl66566/telegram-shasei-bot)。

### 20250128

- 将 ExpandableListItem 组件应用上 speedup.md 的加速列表

## 2024

### 20241231

- 新增 `Date` 组件
- 对 galgame_list 和 job_list 排序

### 20241228

- 将 ExpandableListItem 组件应用上 anime.md 的番剧列表
- 更新[找工作记录](../gossip/job.md) 并且也应用了 ExpandableListItem。

### 20241227

- 将点击列表展开的动作抽象为新的 ExpandableListItem 组件

### 20241225

- galgame 页面大更新，通过点击列表展开 galgame 评价
  - 新增 GalListItem，GalList，MyCheckBox 组件
  - 将原有 markdown 转为 `galgame_list.ts` 数据

::: details 部分处理脚本代码

处理原始 markdown 字符串

```ts
content.replaceAll(/\d{4}\.\d{2}\.\d{2}/g, (date) => date.replaceAll(".", "-"));
const cleanUndefined = (object: any) => JSON.parse(JSON.stringify(object));
const list: GalItemType[] = [];
for (const line of s
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line)) {
  let [name, use_time, duration, score_story, score_visual, score_program, comment] = line
    .trim()
    .replaceAll(/^\||\|$/g, "")
    .split("|")
    .map((item) => item.trim());
  const du_split = duration
    .split("-<br/>")
    .map((item) => new Date(item.trim()))
    .map((item) => (isNaN(item.getTime()) ? undefined : item.toISOString().slice(0, 10)));
  const match = name.match(/\s*<OrderBadge\s*:order=(\d+)\s*\/>/);
  const order = match ? parseInt(match[1]) : undefined;
  if (match) {
    name = name.replace(match[0], "").trim();
  }
  const item: GalItemType = {
    name,
    use_time,
    order,
    duration: {
      start: du_split.at(0),
      end: du_split.at(1),
    },
    score: {
      story: parseFloat(score_story) || score_story,
      visual: parseFloat(score_visual) || score_visual,
      program: parseFloat(score_program) || score_program,
    },
    comment,
  };
  list.push(cleanUndefined(item));
}
console.log(list);
```

slot 别名

```ts
function sanitizeSlotName(str: string) {
  // 正则表达式匹配所有非中文、日文、数字、字母的字符
  const regex = /[^a-zA-Z0-9\u4e00-\u9fa5\u3040-\u30ff]/g;
  return str.replace(regex, "");
}
const proc = original_list.map((item) => {
  const new_name = sanitizeSlotName(item.name);
  if (new_name == item.name) {
    return item;
  } else {
    return {
      ...item,
      valid_name: new_name,
    };
  }
});
console.log(proc);
```

:::

### 20241224

- 修改部分组件数据的引入方式
- `ExhibitionTable` 改名为 `GalExhibitionGrid`

### 20241028

- 使用自写组件，更换 _文章_，_学习_，_闲聊_ 的导航样式
- 将 _零食区_ 由 _闲聊_ 移动到 _爱好_

### 20241026

- 将所有组件与背词器页面使用 TS 和 Vue3 重写。

### 20240611

- 更新了博客依赖，修复 RSS，更换图标源，修复了一些报错

### 20240216

- 新增组件 `ZoomedImg`, `dated`。替换正则：
  ```text
  <div\s?class="image(\d+)"\s*style="text-align: center;\s*"\s*>\n?<img alt="(.*?)" src="(.*?)"\s?/\s?>\n?</div>
  <ZoomedImg alt="$2" src="$3" scale="$1%" />
  ---------------------
  <div\s?class="image(\d+)"\s*style="text-align: center;\s*"\s*>\n?<img alt=".*?" src="(.*?)"\s?/\s?>\n?<div>\n?(.*?)\n?</div>\n?</div>
  <ZoomedImg alt="$3" src="$2" scale="$1%" />
  ---------------------
  <div style="text-align: right;font-style: italic;">——(\d+)</div>
  <dated date="$1"/>
  ```

### 20240124

- 新增组件 `GalExhibitionGrid`
- 更新依赖

## 2023

### 20231217

- 移动 _道论_ 至 _闲聊区_，并定义 _道论_ 与 _杂论_ 的关系。

### 20231210

- 尝试将各种 lineplot 写成 vue 组件[失败](./withvuepress2.md#尝试将-plot-放入-vue-组件)

### 20231203

- 合并浏览器 _横评，设置_ 两块内容

### 20231201

- 重写 _编程 - Git_ 的大部分内容

### 20231125

- 合并所有代理相关文章。

### 20231122

- 新增组件：`OrderBadge`。替换正则表达式：
  ```text
  \s?<Badge (type=".*" )?text="(\d)"\s?/>
  <OrderBadge :order=$2 />
  ```
  anime 页面特殊处理。

### 20231111

- 新增 _爱好 - NSFW - 本子合集_

### 20231108

- 拆分 _设置手机_

### 20231104

- 新增 _学习笔记 - typst_

### 20231102

- 作者详细信息 新增 _About Me 流程图_

### 20231101

- 新增 _爱好 - NSFW_ 区，将 videos 移入。

### 20231031

- 使用 vue 组件重写 Av 列表，拥有自动分组，自动排序功能。
  - 脚本审阅替换了 `uncensored-leak`

### 20231028

- 继续拆分 _linux_ 页面，分为 _基础_、_安装与配置_、_包管理与使用_ 以及之前的 _遇到的问题_ 四个页面

### 20231021

- _编程 - 数据库_ 新增大量内容

### 20231020

- 新增 _编程 - html_、_学习笔记 - 计算机网络_

### 20231018

- 闲聊新增 _零化_、_脑洞_

### 20231017

- 按年份独立 [随笔](../essay/index.md) 并放入 _年终总结_
- 维护 python, Git

### 20231013

- **新增 _博客_ 板块，并移动 _VuePress2 与博客心得_（更名为 _问题列表_） 与本页面到此处**
  - 从 _日程库_ 中独立出 _博客日程_
- add Google Analytics

### 20231011

- 目录结构更改：分离 [linux](../articles/linux) 与 [折腾 linux 遇到的问题](../articles/linux/problem.md)
- 折腾 linux，新增内容。
- 新增[闲聊 - 鸡汤](../gossip/chicken_soup.md)

### 20230926

- _软件汇总_ 新增 [linux](../farraginous/recommend_packages.md#linux)

### 20230925

- 新增 vue 组件：`Av`

### 20230922

- 新增学习笔记 - 数字信号处理

### 20230920

- 不再使用 cdn 作为图片加载来源

### 20230919

- 新增学习笔记 - 通信电子线路

### 20230909

- 使用 Prettier 几乎格式化了所有文档
- 日常维护

### 20230906

- 新增[闲聊 - 神评](../gossip/forward.md)

### 20230831

- 新增[编程 - vscode](../coding/vscode.md)
- 迁移 Linux 页面至[文章](../articles)

### 20230828

- 新增 [笔记软件横评](../articles/note.md) 页面
- 格式化部分文档

### 20230820-26

- 持续更新 [linux](../articles/linux) 页面

### 20230808

- 维护 [Github](../coding/github.md)，[linux](../articles/linux)
- 图表去缩进，减小体积

### 20230807

- 尝试添加 pwa 支持，更改代码行号宽度
- 添加 [rss](../rss.xml)

### 20230806

- [git](../coding/Git.md) 大改。

### 20230802

- [c++](../coding/Cpp.md) 新增内容

### 20230801

- 使用 pnpm 代替 npm 进行包管理
- 设置自动部署并写进[心得](./withvuepress2.md)

### 20230729

- 新增 [文章 - RAM Disk 横评](../articles/ramdisk.md)
- 分类增强

### 20230724

- 迁移 _atri_ 页面到 [编程 - bot](../coding/bot.md) 并新增 koishi 内容

### 20230723

- 将 typescript 中的 node.js 部分分离为新增独立页面 [node.js](../coding/nodejs.md)

### 20230721

- 新增 [文章 - 文章分享](../articles/external.md)，并在许多页面末尾新增 _external_，用于相关文章推荐。
- _对 xxx 的希望_ 新增[内容](../gossip/hope.md#对浏览器的希望)

### 20230720

- 修复代码块选项卡的 bug，代码块行号优化。
- [Git 页面](../coding/Git.md) 修改
- [添加协议为 MIT](../index.md#关于博客)

### 20230716

- _应用汇总_ 大改动：重新排版，添加/归档许多条目。

### 20230715

- 为图表添加 `loading="lazy"`
- 再刷机一次，[设置手机](../articles/mobile/settings.md) 新增内容
- 音游新增 [pjsk](../hobbies/rhythm_games.md#pjsk)
- [灭蟑记（六）](../essay/2023.md#_20230715)

### 20230714

- [UNO 扩展规则](../hobbies/other_games/uno.md) 更新至 5.2.1，优化页面阅读体验

### 20230713

- 为文章添加创建日期，分类，标签
- navbar, sidebar 添加无障碍图标
- 移除 Broken links
- 维护首页

### 20230712

- **更换主题：[VuePress Theme Hope](https://theme-hope.vuejs.press/zh/)，并使用其提供的全文搜索，加密，Markdown 增强，评论功能**
- _VuePress2 与博客心得_ 新增 [# 更换主题](./withvuepress2.md#更换主题)
- 新增 [文章 - 输入法](../articles/input_method.md) 页面

### 20230711

- _VuePress2 与博客心得_ 新增 [试图迁移至 vitepress](./withvuepress2.md#试图迁移至-vitepress)，[尝试更好的搜索](./withvuepress2.md#尝试更好的搜索)
- config.ts 改动

### 20230704

- [consider](../gossip/consider.md#如何看待偏科) 新增内容

### 20230702

- 重审 _边缘二次元_ 属性，维护相关页面
- 更改本页面：去除月份索引，使用 8digit 日期格式

### 20230622

- 新增 _学习笔记 - 双拼_

### 20230620

- 维护回忆录

### 20230617

- 新增 _学习笔记 - 日本語勉強_
- 合并 _禁用快应用中心_ 到 [设置手机 - 禁用软件](../articles/mobile/settings.md#禁用软件)

### 20230615

- 新增 [闲聊 - 绷不住了](../gossip/memes.md)

### 20230614

- 新增 [设置手机 - 刷机](../articles/mobile/settings.md#刷机)

### 20230610

- 维护 [算法](../coding/algorithm.md)

### 20230605

- 新增 _学习笔记 - 数字系统设计_
- 维护 _xxx 有多难用_，_网址汇总_

### 20230603

- 编程 新增 [数据库](../coding/sql.md)
- 维护 [TypeScript](../coding/tsjs.md)
- 移动 _编程 - 杂项_ 到 [文章 - 命令行压缩](../articles/cli_compress.md)

### 20230601

- [Java](../coding/java.md) 新增内容

### 20230528

- 新增自动空格（[盘古之白](https://github.com/vinta/pangu.js/tree/master)）（后证明无效）

### 20230526

- _编程_ 新增 [kotlin](../coding/kotlin.md)

### 20230518

- _VPS_ 新增 搭建代理 内容

### 20230517

- _VPS_ 新增 安全性 内容

### 20230514

- [Linux](../articles/linux) 中新增内容
- _网址推荐_ 中新增 _AI 工具_
- 文章新增 VPS

### 20230510

- 设置电脑 新增 [对 ArchWSL 的设置](../articles/windows_setting.md#对-archwsl-的设置)

### 20230508

- 生活中遇到的困难 新增 [qt6 项目构建失败](../gossip/difficulties.md#_20230507-qt6-项目构建失败)

### 20230429

- [xxx 的缺陷](../gossip/fuckxxx.md) 新增 [OSU](../gossip/fuckxxx.md#osu-有多难用)

### 20230428

- [文章](../articles/)新增[最小化二进制文件与 dll](../articles/minimize_exe.md)
- [C++](../coding/Cpp.md)新增[vscode 配置 Qt 开发环境](../coding/Cpp.md#vscode-配置-qt-开发环境)

### 20230417

- [编程](../coding/)新增[Linux](../articles/linux)

### 20230412

- [文章](../articles/) 新增 [设置手机](../articles/mobile/index.md)

### 20230410

- [xxx 的缺陷](../gossip/fuckxxx.md) 新增了一些内容

### 20230409

- 部分图表新增当年数据统计
- 编程部分新增[版块主页](../coding/)，并添加[TypeScript & JavaScript](../coding/tsjs.md)，[算法](../coding/algorithm.md)页面

### 20230401

- [其他游戏](../hobbies/other_games/) 细分

### 20230328

- **新增 [道论](../gossip/worldview.md)**

### 20230320

- 新增 [Markdown 教程](../articles/markdown.md)

### 20230317

- 新增 [编程 - Java](../coding/java.md)
- [xxx 有多难用](../gossip/fuckxxx.md) 新增了一些内容
- 维护 [Git](../coding/Git.md), [Github](../coding/github.md) 页面

### 20230312

- 维护 [Git](../coding/Git.md) 页面，并为博客添加注释。

### 20230306

- 新增 [如何看待 xxx # 如何看待大学班级](../gossip/consider.md#如何看待大学班级)

### 20230305

- 新增 [编程 - Vim](../coding/vim.md)

### 20230303

- 新增 _学习笔记 - 信号与系统_

### 20230301

- 新增 _学习笔记 - 模电_

### 20230223

- C++ 页面新增内容

### 20230222

- 新增 _闲聊 - 自由道（已移除）_ & _校内专栏 # 评教_

### 20230221

- 新增 [python # 使用 poetry 进行包管理](../coding/python.md#使用-poetry-进行包管理)
- 新增 [生活中遇到的困难 # 20230221：网站访问问题](../gossip/difficulties.md#_20230221-网站访问问题)

### 20230217

- 维护 [编程 - git](../coding/Git.md)

### 20230215

- 新增[闲聊-xxx 有多难用#运营商有多傻逼](../gossip/fuckxxx.md#运营商有多傻逼)，[设置电脑 - edge 转 firefox](../articles/windows_setting.md#edge-转-firefox)，_学习笔记 - 食物制作_
- 修复了一些跳转错误

### 20230210

- 新增 _灵感 - 奇物志_

### 20230209

- 读日记，补充了[读书](../hobbies/books.md)页面与回忆录的一些内容

### 20230206

- _软件汇总_ 与 _网址汇总_ 新增一些项目
- 新增[如何看待 xxx - 如何看待猫这种生物](../gossip/consider.md#如何看待猫这种生物)
- 回忆录新增内容

### 20230201

- 新增[xxx 有多难用 # Telegram 有多难用](../gossip/fuckxxx.md#telegram-有多难用)

### 20230124

- 新增[文章 - ADB](../articles/mobile/adb.md)

### 20230123

- 维护[关于作者](../gossip/author.md)与更详细回答

### 20230122

- 新增：文章 - 禁用手机快应用中心（迁移至[设置手机](../articles/mobile/settings.md#禁用快应用中心)）
- 全局优化排版与语言逻辑，补充信息

### 20230117

- 回忆录新增内容：_#更早_ 与 _#梦 / 幻想_（更名为 _梦，幻想和其他虚幻之物_ ）
- 新增[如何看待 xxx - 如何看待三体动画/电视剧](../gossip/consider.md#如何看待三体动画-电视剧)

### 20230115

- [TG 教程](../articles/telegram.md)、[Rust](../coding/Rust.md) 新增大量内容

### 20230114

- 全局优化排版与语言逻辑
- 新增[Potplayer 设置](../articles/potplayer_setting.md)页面

### 20230112

- VPN 更新，新增性价比机场两位

### 20230104

- [读书](../hobbies/books.md)新增部分书评
- 新增 xxx_interval 图表

## 2022

### 20221231

- 新增[闲聊 - xxx 有多难用#B 站有多难用](../gossip/fuckxxx.md#b站有多难用)、[文章 - TG 教程](../articles/telegram.md)

### 20221226

- 新增 _学习笔记-电路分析基础_
- 新增 _回忆录#大二上寒假_

### 20221224

- 公开[关于作者-运动](../hide/sports.md)页面并优化图表

### 20221220

- 更新亿些页面的过时信息；增加页面可读性
- 添加各图表的夜间模式适配
- [OSU](../hobbies/rhythm_games.md#osu)新增键数求和统计

### 20221215

- 压缩所有站内图片。
- 新增[闲聊-家与学校生活环境对比](../gossip/compare_home_to_college.md)

### 20221129

- 更新 _初级科学上网_ [（现 VPN）](../articles/proxy/vpn.md) 并更改排版
- 维护*我的回忆录-大二*
- 小维护：[关于作者](../gossip/author.md)及其子页面、[编程-Git](../coding/Git.md)页面

### 20221125

- 移动 _爱好-CSGO_ 页面至 其他游戏#CSGO （已撤销更改）
- 新增[对 xxx 的希望#对推荐算法的希望](../gossip/hope.md#对推荐算法的希望)
- 新增 _软件汇总 # 为什么你们就是不能加个空格呢？_

### 20221120

- [背词器](../farraginous/reciter.md)英文网址更新

### 20221118

- 新增[Rust-输入](../coding/Rust.md#输入)

### 20221115

- 归类并新增[python 页面](../coding/python.md)中条目

### 20221113

- 新增 _学习笔记 - 复变函数与积分变换_

### 20221105

- 新增[杂项 - 学习笔记](../learning/README.md) <-- _学习笔记 - 大学物理_

### 20221028

- 合并闲聊-...希望的两个页面，并加入[#对聊天软件的希望](../gossip/hope.md#对聊天软件的希望)

### 20221021

- 新增[闲聊-对算法竞赛 & OJ contest 的希望](../gossip/hope.md#对算法竞赛-oj-contest的希望)页面（已合并）
- 在软件汇总页面中，将 _Via_ 更换为 _m 浏览器_

### 20221020

- 更新 [VPN](../articles/proxy/vpn.md) 页面

### 20221016

- 新增[闲聊-如何看待 xxx](../gossip/consider.md)

### 20221003

- 新增[编程-Python](../coding/python.md)页面，且整合了原*其他工具* 页面并更改排版。

### 20220930

- 新增[VuePress2 与博客心得 # 配置 sidebar 问题](./withvuepress2.md#配置sidebar问题)

### 20220929

- **大更新：重写博客 sidebar 逻辑**
- 新增[编程-C#](../coding/csharp.md)页面

### 20220928

- 新增 _校内专栏 # 校内极限生存_

### 20220921

- 新增[C++#在 vscode 中配置环境](../coding/Cpp.md#配置_vscode_环境)
- 新增 csgo#常用指令

### 20220915

- 维护 _网址汇总_ 页面，新增大量条目，更改排版

### 20220911

- 新增[校内专栏](../farraginous/college.md)页面

### 20220908

- 新增[音游#我的记录](../hobbies/rhythm_games.md#我的记录)四个图表
- _软件汇总_ 新增 Keepass2Android 与 KeePassXC 两个密码管理器（已合并为 _Keepass 系列_）

### 20220906

- 新增 _软件汇总 # Seal_
- 新增[编程-工具-Github](../coding/github.md)页面
- 维护隐藏页面：灵感 | 愿景，文章-对 win11 的设置（迁移至[电脑设置](../articles/windows_setting.md)）

### 20220903

- 新增[OSU 能力变化表](../hobbies/rhythm_games.md#我的记录)

### 20220901

- [使用 vue 组件创建背词器失败](./withvuepress2.md#html转vue组件失败问题)

### 20220831

- 新增[背词器](../farraginous/reciter.md)，功能还未完全实现

### 20220829

- 维护初级科学上网页面

### 20220828

- 修正了运动图表错误

### 20220827

- 将博客内*长日期格式* 从`2022/08/27`统一为`20220827`样式

### 20220824

- 新增 _网址汇总 # 我的常用网站_

### 20220822

- 新增[番剧#我计划看](../hobbies/anime.md#我计划看)

### 20220818

- 新增[闲聊-生活中遇到的困难](../gossip/difficulties.md)

### 20220817

- [安装$\displaystyle \LaTeX$插件](./withvuepress2.md#关于数学插件)

### 20220815

- 紧急修复：文件损坏导致的`keysnum`与`GBperprice`图表、初级科学上网缺失问题。（同时导致了其他的一系列问题）
- 调整运动图表

### 20220814

- 添加运动页面与图表

### 20220813

- 添加[杂项-番剧](../hobbies/anime.md)页面
- 维护[回忆录#大学（大一后暑假）](../hide/memories.md#大学-大一后暑假)，与其他一堆页面
- 更改页面逻辑（改`游戏`版块为`兴趣`，并移动`番剧`与`读书`到此）

### 20220808

- 新增[大学（大一后暑假）](../hide/memories.md#大学-大一后暑假)
- 在[galgame#程序问题](../hobbies/galgame.md#程序问题)反馈 bug
- 尝试选定其他网页的一个 div 加入博客中的 iframe，失败

### 20220807

- 添加[我的 o!m 健身按键数](../hobbies/rhythm_games.md#osu)图表并每日维护
- 尝试 vue 组件形式使用 g2plot 失败

### 20220806

- 维护 网址汇总#TG 推荐（已合并到文章-TG 教程）

### 20220805

- 维护 初级科学上网，添加机场性价比图表

### 20220803

- 修复 图片加载失败问题：使用 cdn 加速

### 20220730

- 新增 游戏-galgame#游戏优点（已合并到 #说两句）

### 20220729

- 改为使用图床存放图片(images 分支)
- 新增 [游戏-明日方舟](../hobbies/other_games/arknights.md)，文章#Windows 端记录软件使用时长（迁移至[文章 - 记录软件使用时长](../articles/time_record.md#windows端记录软件使用时长)）
- 维护 [VuePress2 与博客心得](./withvuepress2.md)

### 20220726

- 新增 [galgame#吐槽一下](../hobbies/galgame.md#吐槽一下)

### 20220721

- 新增 [杂项-博客日志](#博客日志)、游戏-其他游戏
- 更改搜索插件配置

### 20220720

- 添加评论插件
- 修复 Vue 组件注册失败的问题

### 20220718

- 新增 [闲聊#VuePress2 与博客心得](./withvuepress2.md)

### 20220717

- 为 [游戏-音游](../hobbies/rhythm_games.md#总体现况)、[闲聊-生存意义](../gossip/author.md#生存意义) 添加[g2plot](https://g2plot.antv.vision/zh)图表
- 添加黑幕样式并实装
- 尝试添加 vue 组件失败

### 20220713

- 尝试添加 dr-vue-echarts 组件，无法使用
- 维护 [游戏-音游](../hobbies/rhythm_games.md)

### 20220712

- 新增 [文章-运动轨迹记录软件横评](../articles/track_record.md)

### 20220709

- 新增 [文章-Android 端记录软件使用时长](../articles/time_record.md#android端记录软件使用时长)

### 20220706

- 添加 自动注册 Vue 组件插件
- 新增 [文章#BIOS 密码重置](../articles/windows_setting.md#bios密码重置)

### 20220703

- 维护 [随笔](../essay/2022.md)

### 20220701

- 新增 [杂项-读书](../hobbies/books.md)

### 20220628

- 新增 [galgame#我的设置](../hobbies/galgame.md#我的设置)

### 20220625

- 新增 [闲聊#我的爱好](../gossip/author.md#我的爱好)、[游戏-galgame](../hobbies/galgame.md)

### 20220623

- 添加代码染色插件并实装
- 维护 [编程-Git](../coding/Git.md)

### 20220619

- 新增 [软件汇总#浏览器插件&浏览器脚本](../farraginous/recommend_packages.md#浏览器插件)

### 20220618

- 新增 _网址汇总 # 其他游戏_ & [TG 推荐](../articles/telegram.md#频道群组推荐)
- 维护 [游戏-音游](../hobbies/rhythm_games.md)、[编程-C++](../coding/Cpp.md)、[回忆录](../hide/memories.md)

### 20220617

- 新增 [游戏-音游](../hobbies/rhythm_games.md)、闲聊#QQ 有多难用（已合并为*xxx 有多难用*）

### 20220616

- 取消 editLink 与 contributors

### 20220613

- 新增 [编程-Git#高级技巧](../coding/Git.md#高级技巧)、闲聊-初级科学上网（现：隐藏）

### 20220611

- 新增 [编程-C++](../coding/Cpp.md)、闲聊 # 回忆录 & [对编程语言的希望](../gossip/hope.md#对编程语言的希望)（回忆录已隐藏）

### 20220526

- 新增 闲聊#灵感&对美好未来社会的愿景（现：隐藏）

### 20220521

- 新增 [我的文章-Win10 设置开机自启动（现：设置开机自启动）](../articles/windows_setting.md#设置开机自启动)、[闲聊#日程区](../gossip/schedule.md)

### 20220517

- 新增 [游戏-我的世界](../hobbies/Minecraft.md)

### 20220516

- 新增 [Rust#字符串修改](../coding/Rust.md#字符串修改)、[关于作者#习惯（现：关于作者#性格）](../gossip/author.md#性格)

### 20220510

- 新增 杂项-atri（迁移到 编程 - bot）

### 20220506

- 更改 navbar 逻辑
- 新增 [编程-Git](../coding/Git.md)&_其他工具（已整合为[python](../coding/python.md)页面）_、[随笔](../essay/index.md)

### 20220505

- 新增 [杂项-我的文章#查看手机 cpu 指令集（现：文章-关于手机-\~）](../articles/mobile/Android_ISA.md)
- 更新 [主页](../index.md)、[闲聊-关于作者#QA](../gossip/author.md#qa)

### 20220504

- 发布博客
- 创建 [主页](../index.md)、[闲聊 - 关于作者](../gossip/author.md)、[编程 - Rust](../coding/Rust.md)、[杂项 - 软件汇总](../farraginous/recommend_packages.md)、[杂项 - 网址汇总](../farraginous/recommend_websites.md)、游戏 - 其他游戏 - csgo 游戏配置
- 添加搜索插件
