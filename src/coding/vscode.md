---
date: 2023-08-31
icon: editor
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
- `Ctrl + p`：选择打开文件
- `Ctrl + Shift + p`：操作面板

## 插件

插件系统是 vscode 的精髓。正由于活跃的插件系统，vscode 才能如此强大。这里会放出我使用的插件。

- 通用：
  - AI 代码补全（只需其一）：_Codeium..._ | _Tabnine..._
  - 更好的警告：_Error Lens_，_SonarLint_
  - 轻量级 Git 可视化：_Git Graph_
  - 代码格式化：_Prettier - Code formatter_（主要用于 markdown
  - 编辑器：_Vim_
- markdown：_Markdown Preview Enhanced_
- 前端：_Auto Rename Tag_，_Rome_（需要设置 `"rome.requireConfiguration": false`）
- C++：_clangd_
- python：_Black Formatter_，_isort_，_Ruff_
- rust：_Cargo_，_cargo-crate-completer_，_Even Better TOML_，_rust-analyzer_
- java：_Language Support for Java(TM) by Red Hat_，_Test Runner for Java_
- kotlin：_Kotlin Language_，_vscode-runner_
- 数据库：_SQLite Viewer_
- 其他：_Chinese (Simplified)..._，_CodeSnap_

### 关于补全

上述两个代码补全的插件我都用过，感觉难分伯仲。目前在使用 _Codeium_。不过如果还想看看其他的 AI 代码补全插件（本人未使用过），也可以：

- [Code GPT](https://docs.codegpt.co/)：需要自己提供 API KEY 或本地跑模型。
- [CodeGeeX](https://codegeex.cn/)：国产，对标 GitHub CoPilot

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
