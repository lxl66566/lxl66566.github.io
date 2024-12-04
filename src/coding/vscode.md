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

在 _设置_ 页右上角可以 `打开设置（json）`，我经常需要直接编辑配置文件。[这里](https://github.com/lxl66566/my-key-data/blob/main/config/vscode/settings.json)是我的全局配置文件。

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

插件系统是 vscode 的精髓。正由于活跃的插件系统，vscode 才能如此强大。这里放出我使用的插件：

- 通用：
  - [AI 代码补全](#ai-代码补全)
  - 更好的警告：_Error Lens_
    - 不可否认 _SonarLint_ 很强，但是 java 写的，占用空间和 RAM 都很大。因此在使用了几年 _SonarLint_ 以后我选择分语言使用不同 linter。
  - 轻量级 Git 可视化：_Git Graph_
  - 代码格式化：_Prettier - Code formatter_（主要用于 markdown
  - 编辑器：_Vim_
    - [添加如下配置](https://github.com/microsoft/vscode/issues/75627#issuecomment-1114048271)可以降低 vim 插件的延迟。
- markdown：_Markdown Preview Enhanced_
- 前端：_Auto Rename Tag_，_Rome_（需要设置 `"rome.requireConfiguration": false`）
  - Vue: _Vue Language Features (Volar)_ （为什么要用这个呢，因为我的 vue 组件有特殊 formatter 需求，不方便用 prettier 预设）
- C++：_Clang-Tidy_，_Clang-Format_，详见[开发环境](./Cpp.md#开发环境)
- python：_Black Formatter_，_isort_，_Ruff_，详见[Python](./python.md#vscode-扩展)
- rust：_Cargo_，_cargo-crate-completer_，_Even Better TOML_，_rust-analyzer_
- java：_Language Support for Java(TM) by Red Hat_，_Test Runner for Java_
- kotlin：_Kotlin Language_，_vscode-runner_
- verilog：_verilog-formatter_（有点记不太清了）
- octave：_Octave_，_Octave Formatter_，详见[octave](./octave.md#ide)
- Typst：_Typst LSP_
- 数据库：_SQLite Viewer_
- 协同：_Live Share_
- 其他：_Chinese (Simplified)..._，_CodeSnap_

### AI 代码补全

我的刚需是：免费（考虑付费的话直接上 copilot 完事了），可部分禁用。

<details>

<summary>点击展开前言</summary>

我最早使用的是 Tabnine，后面由于一些契机换了 Codeium；然而它在 RAMDisk 上工作得很差：由于其在 windows 上使用 `%TEMP%` 作为存储目录，每天首次打开 vscode 会加载失败，重新下载数据。于是 20230918 尝试换用 CodeGeeX。这个模型比较小，补全速度快；而且最主要是由于国内服务器，免去了科学上网带来的大量延迟。

用久了感觉 CodeGeeX 不够智能，又尝试其他插件。

</details>

非国产：

- [Codeium](https://codeium.com/)：国外在线服务
  - 下载会显示进度和大小，好评
- [Code GPT](https://docs.codegpt.co/)：需要自己提供 API KEY 或本地跑模型，不考虑
- [Tabnine](https://www.tabnine.com/)：补全较弱（_Short code completions (2 to 3 words)_）
- [Cody](https://github.com/sourcegraph/cody)：官网进不去，插件装了，下载其他东西时 503。评价是垃圾。
- [tabby](https://github.com/TabbyML/tabby)：本地模型，但是支持的语言有限
- [Continue](https://www.continue.dev/)：需要自己提供 API KEY 或本地跑模型
- [supermaven](https://supermaven.com/)：免费补全，联想能力不错，但是 vscode 插件目前闭源。

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

- chat api，gemini 1.5 是免费的
- code 补全 API 的话，deepseek api 比较便宜

#### AI IDE

当然，现在除了开发 AI 插件，还有相当一部分 IDE 另辟蹊径，将 AI 作为自己的主要卖点，并且也可以安装 Vscode 的插件，快速抢占市场。这些编辑器有：

- [Cursor](https://www.cursor.com/pricing)：免费限量补全，全兼容 Vscode

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

- 可以把某个关键字标成自己选择的颜色 ([ref](https://t.me/c/1264662201/584813))
  ```json
  "editor.semanticTokenColorCustomizations": {
    "rules": {
      "*.unsafe:rust": "#eb5046"
    }
  },
  ```

## 编写插件

### 上传

编写完插件以后需要发布到 market。

我不爱用那些令牌啥的，因此我选择直接 <https://marketplace.visualstudio.com/manage>，然后把打出来的 .vsix 文件拖到这里即可。

## 其他评价

- vscode 的可自定义程度还不够高
- 有一些官方插件太臃肿了（例如 _python_，_C/C++_）
- 没法控制插件行为和权限
  - （比如某个看似没啥用的插件向我的 C 盘写入了 6GB 的缓存，说的就是你，_SonarLint_！）
  - （比如 java 的插件天天申请公共网络访问权限）

## external

1. [AI 编程助手测评：GitHub Copilot vs 豆包 MarsCode](https://www.ruanyifeng.com/blog/2024/07/copilot-vs-marscode.html)
