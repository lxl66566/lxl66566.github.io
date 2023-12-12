---
date: 2023-08-31
icon: vscode
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
- `Ctrl + r`（资源管理器窗口）：选择打开最近项目
- `Ctrl + p` / `Ctrl + e`：选择打开文件
- `Ctrl + Shift + p`：操作面板

## 插件

编程需要有好用的工具，编程语言的流行离不开好用的 linter, highlighter, formatter。

插件系统是 vscode 的精髓。正由于活跃的插件系统，vscode 才能如此强大。这里放出我使用的插件：

- 通用：
  - [AI 代码补全](#AI-补全)
  - 更好的警告：_Error Lens_，_SonarLint_
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
- 其他：_Chinese (Simplified)..._，_CodeSnap_

### AI 补全

本人目前在使用 _CodeGeeX_。

<details><summary>点击展开前言</summary><p>我最早使用的是 Tabnine，后面由于一些契机换了 Codeium；然而它在 RAMDisk 上工作得很差：由于其在 windows 上使用 %TEMP% 作为存储目录，每天首次打开 vscode 会加载失败，重新下载数据。于是 20230918 尝试换用 CodeGeeX。这个模型比较小，补全速度快；而且最主要是由于国内服务器，免去了科学上网带来的大量延迟。</p></details>

- [CodeGeeX](https://codegeex.cn/)：国产开源模型，对标 GitHub CoPilot，响应速度快
  - 20231212 开始需要绑定手机号
- [Codeium](https://codeium.com/)：免费，在线服务
- [Code GPT](https://docs.codegpt.co/)：需要自己提供 API KEY 或本地跑模型。
- [Tabnine](https://www.tabnine.com/)：免费的补全较弱（_Short code completions (2 to 3 words)_）

未来可能会尝试：

- [tabby](https://github.com/TabbyML/tabby)：本地模型，但是支持的语言有限

## feature

vscode 的特色：

- 前文的插件系统不再赘述
- **设置同步**，可以瞬间在其他平台搭好最适合自己的开发环境。（这也是小标题的由来）
- 集成全文搜索；linux 下需要自己 `find` / `grep`
- 集成 git 图形化界面，虽说我不用且功能不多，但是对不会用 git 的新手非常友好
- 多光标支持

## 其他评价

- vscode 的可自定义程度还不够高
- 有一些官方插件太臃肿了（例如 _python_，_C/C++_）
- 没法控制插件行为和权限
  - （比如某个看似没啥用的插件向我的 C 盘写入了 6GB 的缓存，说的就是你，_SonarLint_！）
  - （比如 java 的插件天天申请公共网络访问权限）
