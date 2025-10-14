---
date: 2023-08-31
icon: file-pen
category:
  - 编程
  - 教程
tag:
  - 工具
---

# VSCode

<div class="subtitle">——neovim 死里配，不如 vscode 同步一根毛</div>

我是 vscode 的重度使用者，所有的编程行为 all in vscode。虽说是 electron 电子垃圾，但它确实强大且开箱即用。_（据说是优化得很好的电子垃圾，来源请求）_

在 linux 端我曾尝试抛弃 vscode，转向 neovim，但是几天后即放弃。

## 使用

在 _设置_ 页右上角可以 `打开设置（json）`，我经常需要直接编辑配置文件。[这里](https://github.com/lxl66566/backup/blob/main/config/vscode/settings.json)是我的全局配置文件。

### 快捷键

这里是我比较常用的快捷键。

- `Ctrl + ,`：打开设置
- `` Ctrl + ` ``：打开终端
- `Ctrl + r`（资源管理器窗口）：选择打开最近项目
- `Ctrl + p` / `Ctrl + e`：选择打开文件
- `Ctrl + Shift + p`：操作面板
- `Alt + 鼠标`：多光标模式，最重要的快捷键之一，可以和 vim 扩展共用，可以大幅提升效率

你可以在[这里](https://code.visualstudio.com/assets/docs/getstarted/tips-and-tricks/KeyboardReferenceSheet.png)看到快捷键 cheetsheet。可以看出有很多从 vim 来的常见操作；并且在 vim 插件下这里的一些快捷键也会改变。

还有，许多编辑器用 `Ctrl + d` 克隆当前行，但是 vscode 默认不用这个键绑定。所以可以去设置里把这个动作改为 `Ctrl + d`。([ref](https://stackoverflow.com/questions/70120201))

## 插件

编程需要有好用的工具，编程语言的流行离不开好用的 linter, highlighter, formatter。

插件系统是 vscode 的精髓。正由于活跃的插件系统，vscode 才能如此强大。这里放出我使用的插件（可能有过时的选项）：

- 通用：
  - [AI 代码补全](#ai-代码补全)
  - 更好的警告：_Error Lens_
    - 不可否认 _SonarLint_ 很强，但是 java 写的，占用空间和 RAM 都很大。因此在使用了几年 _SonarLint_ 以后我选择分语言使用不同 linter。
  - 轻量级 Git 可视化：_Git Graph_
  - 代码格式化：_Prettier - Code formatter_（主要用于 markdown
  - 编辑器：_Vim_
    - [添加如下配置](https://github.com/microsoft/vscode/issues/75627#issuecomment-1114048271)可以降低 vim 插件的延迟。
  - 跨语言依赖更新：_Dependi_
- markdown：_Markdown Preview Enhanced_
- 前端：_Auto Rename Tag_，_Oxc_
  - Vue: _Vue - Official_
- C++：_Clang-Tidy_，_Clang-Format_，详见[开发环境](./Cpp.md#开发环境)
- python：_Pylance_，_Ruff_，详见[Python](./python.md#vscode-扩展)
- rust：_cargo-crate-completer_，_Even Better TOML_，_rust-analyzer_，_Flowistry_
- java：_Language Support for Java(TM) by Red Hat_，_Test Runner for Java_
- ~~kotlin：_Kotlin Language_，_vscode-runner_~~ 不要用 vscode 写 kotlin
- verilog：_verilog-formatter_（有点记不太清了）
- octave：_Octave_，_Octave Formatter_，详见[octave](./octave.md#ide)
- Typst：_Typst LSP_
- 数据库：_SQLite Viewer_
- 协同：_Live Share_
- 其他：_Chinese (Simplified)..._，_CodeSnap_

### 插件管理

- 分析：当插件数量多了以后，每次启动都耗时很久，甚至卡在某个插件的启动上。此时需要 `Ctrl + Shift + p` 打开操作面板，进入 _Developer: Show Running Extensions_，可以看到插件状态与启动用时。
- 禁用内置插件：虽然[无法在 config 里禁用内置插件](https://github.com/microsoft/vscode/issues/40239)，但是我们可以在扩展里搜索 `@Builtin`，然后禁用那些用不到的，可以减小 vscode 内存占用。([ref](https://github.com/microsoft/vscode/issues/58600#issuecomment-420992831))

### AI 代码补全

我的刚需是：免费（考虑付费的话直接上 copilot 完事了），可部分禁用。

<details>

<summary>点击展开前言</summary>

我最早使用的是 Tabnine，后面由于一些契机换了 Codeium；然而它在 RAMDisk 上工作得很差：由于其在 windows 上使用 `%TEMP%` 作为存储目录，每天首次打开 vscode 会加载失败，重新下载数据。于是 20230918 尝试换用 CodeGeeX。这个模型比较小，补全速度快；而且最主要是由于国内服务器，免去了科学上网带来的大量延迟。

用久了感觉 CodeGeeX 不够智能，又尝试其他插件。

</details>

非国产：

- [windsurf（原 Codeium）](https://windsurf.com/)：国外在线服务，我转 cursor 前最常用。
  - 下载会显示进度和大小，好评
- [Cline]：需要自己提供 API KEY 或本地跑模型。它支持 Gemini 2.5 支持得很快，因此我用它做 Chat/MCP agent。
- [Tabnine](https://www.tabnine.com/)：补全较弱（_Short code completions (2 to 3 words)_）
- [supermaven](https://supermaven.com/)：免费补全，联想能力不错，但是 vscode 插件目前闭源。
- [tabby](https://github.com/TabbyML/tabby)：本地模型，但是支持的语言有限
- [Continue](https://www.continue.dev/)：需要自己提供 API KEY 或本地跑模型。支持得太慢，一个月后都没法用 Gemini 2.5，直接抛弃。
- [Code GPT](https://docs.codegpt.co/)：需要自己提供 API KEY 或本地跑模型，不考虑
- [Cody](https://github.com/sourcegraph/cody)：官网进不去，插件装了，下载其他东西时 503。评价是垃圾。

国产：

- [fitten code](https://code.fittentech.com/)：国产，水平跟其他国产模型都差不多，不太聪明。
  - 一个很大的缺点是不读工作区 `.vscode` 配置，也就是无法在某些项目（隐私项目如日记等）里禁用。
- [MarsCode](https://www.marscode.com/)：一直报 Network unstable，根本不可用，捞。
- [CodeGeeX](https://codegeex.cn/)：国产开源模型，响应速度快
  - 20231212 开始需要绑定手机号
  - 比较扰民，会入侵 _快速修复_
- [通义灵码](https://tongyi.aliyun.com/lingma)：阿里的，用起来还行，略逊于 Codeium 的水平。
  - 这货也挺扰民的，每个函数间都会被插入一个通义的标志。插的位置还烂，rust 如果多行注释的话就会插在注释中间。。
  - 20240914 更新，出现双保存现象，即一次 `Ctrl + S` 后，文件仍然处于未保存状态。对照实验发现是通义灵码的问题。

关于 API：

- chat api，gemini 一直都是免费的
- code 补全 API 的话，deepseek api 比较便宜

### 插件黑名单

我踩到的坑

- Even Better Comments：启动卡死

## feature

vscode 的特色：

- 前文的插件系统不再赘述
- **设置同步**，可以瞬间在其他平台搭好最适合自己的开发环境。（这也是小标题的由来）
- 集成全文搜索（ripgrep）；linux 下需要自己 `find` / `grep`
- 集成 git 图形化界面，虽说我不用且功能不多，但是对不会用 git 的新手非常友好
- 多光标支持

## 主题

得益于 electron，vscode 可以很容易地更换主题。`Ctrl + Shift + P` 输入 theme 选择即可。

我个人喜欢用的是 _Monokai Dimmed_。我也曾试过一些其他主题，Nord 感觉对眼睛还是不够友好。

## 正则匹配

vscode 的正则匹配[使用两个不同的引擎](https://github.com/microsoft/vscode/issues/39404#issuecomment-348710460)，因此可能无法使用某些正则语法。

要匹配所有中文，请使用 `[一-龥]`。([ref](https://superuser.com/questions/983441/visual-studio-search-through-code-for-chinese-text))

## 协同编辑

有时候需要帮别人处理代码时，协同编辑是一个非常不错的选择。

1. 安装 _Live Share_
2. 发送链接给对方
3. 同意连接请求
4. 给对方权限，例如读写，或终端执行代码

## 小技巧

- vscode 自带了许多好用的小工具，可以通过 Ctrl + Shift + p 打开菜单，搜索就能用。我推荐下面这些：
  - _ANSI Text: Open Preview_：如果你使用 [script 命令](./snipets.md#)或者其他记录日志的工具，那么输出的日志中有很多 ansi 颜色符号夹杂在日志中使其可读性极低。这个功能就是给日志准备的，可以将这些颜色符号还原。
  - _Sort Lines Ascending_：选中一段文本，然后按升序排列。在写一些 list 代码或文档时比较有用。
- 可以把某个关键字标成自己选择的颜色 ([ref](https://t.me/c/1264662201/584813))
  ```json
  "editor.semanticTokenColorCustomizations": {
    "rules": {
      "*.unsafe:rust": "#eb5046"
    }
  },
  ```

## 编写插件

我写过一个 [anyformatter](https://github.com/lxl66566/anyformatter-vscode)。

### 上传

编写完插件以后需要发布到 market。

我不爱用那些令牌啥的，因此我选择直接 <https://marketplace.visualstudio.com/manage>，然后把打出来的 .vsix 文件拖到这里即可。

## 关于 cursor

[Cursor](https://www.cursor.com/pricing) 是 AI 时代下的，基于 VSCode 的 IDE，其将 AI 深度集成到了编辑器内。Cursor 全兼容 VSCode，所以可以快速抢占市场。

我曾今在早期用过一次 Cursor，用的提问 API 是 Gemini，补全 API 是 deepseek，感觉不太行。这也是因为模型本身不够聪明。第二次入坑是新号注册，这一段时间内 cursor 也把用户体验补起来了一点，并且我也免费（试）用 claude-3.5-sonnet，这下就感觉舒服多了。直接写了一个 [Telegram-RSS-Bot-on-Cloudflare-Workers](https://github.com/lxl66566/Telegram-RSS-Bot-on-Cloudflare-Workers)。虽然细微部分还是手改，但是确实好用很多，tab 补全也很智能。

入坑 cursor 前，最好先去 b 站找个视频快速过一遍，自己摸索很容易丧失耐心。

cursor 难用的地方，我写在[这里](../gossip/fuckxxx.md#cursor-有多难用)。

### 设置

cursor 基于 vscode，但是有些地方还是做了些修改，非常卡手。建议 vsc 人入坑 cursor 的时候进行这些设置：

1. 恢复左侧纵向图标栏：`"workbench.activityBar.orientation": "vertical"` ([src](https://www.maemo.cc/2024/10/23/edit-cursor-activitybar-orientation.html))
2. 终端允许 Ctrl + V 粘贴：`"terminal.integrated.sendKeybindingsToShell": false` （vscode 默认允许终端粘贴）
3. 打开右侧 minimap：`"editor.minimap.enabled": true`
4. 由于 cursor update [问题很多](https://github.com/getcursor/cursor/issues/2670)，需要设置 `"update.enableWindowsBackgroundUpdates": false` 关闭后台自动更新。
   - 即使设置了此项，cursor 还是可能无视此设置仍然自动更新（骂人）。此时需要：清空文件夹 `C:\Users\<username>\AppData\Local\cursor-updater` 并将其权限修改为全部 deny。([ref](https://www.youtube.com/watch?v=oNe36xIsJ6g))
5. 从 vscode 继承过去的中文插件可能失效，需要重新手动装一下。

### 无限续

Cursor 无限续主要是靠无限流邮箱注册 + id 清除器。有一些需要注意的点：

1. 2025.02 之后，cursor 无法再通过清除 machine id 的方式无限续，猜测它用了一些其他方法进行追踪。因此需要下载历史版本：<https://downloader.cursor.sh/builds/250103fqxdt5u9z/windows/installer/x64>，并关闭自动更新。
2. cursor 清除 ID 的脚本，网上有很多（讽刺的是基本都是 Cursor 写的）。
   - [go-cursor-help](https://github.com/yuaotian/go-cursor-help)
   - [cursor-free-vip](https://github.com/yeongpin/cursor-free-vip)
   - [cursor-reset](https://github.com/ultrasev/cursor-reset)
   - cursor-mate（闭源）
3. ~~邮箱无限续可以用 2925 无限邮。~~
   - 2025.03 之后，2925 无限邮和一些滥用邮箱被彻底禁用，爆 [_User is unauthorized_](https://forum.cursor.com/t/user-is-unauthorized/43042/79)。这里建议买一个域名托管到 Cloudflare，然后用这个域名开一堆子域的邮箱。

## 其他评价

- vscode 的可自定义程度还不够高
- 有一些官方插件太臃肿了（例如 _python_，_C/C++_）
- 没法控制插件行为和权限
  - （比如某个看似没啥用的插件向我的 C 盘写入了 6GB 的缓存，说的就是你，_SonarLint_！）
  - （比如 java 的插件天天申请公共网络访问权限）

## external

1. [AI 编程助手测评：GitHub Copilot vs 豆包 MarsCode](https://www.ruanyifeng.com/blog/2024/07/copilot-vs-marscode.html)
