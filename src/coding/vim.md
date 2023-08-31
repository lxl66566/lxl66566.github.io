---
date: 2023-03-05
icon: keyboard
category:
    - 编程
    - 教程
tag:
    - 工具
---
# vim
我曾在约一年前强迫自己使用 vim 作为代码编辑器，并进行相关学习。但是 vscode vim 给了我极其惨痛的教训：混用 Ctrl + Z 和 u(undo) 打乱了我的代码，我只能从 git 中恢复，浪费了数小时的时间。因此弃用。

此次重新启用，也大概是我的心血来潮吧。

开始使用 archlinux 后，我使用 nvim 作为我的默认编辑器。这下也不得不设置了。
## 设置(vscode)
[此处](https://github.com/lxl66566/my-key-data/blob/main/config/vscode/settings.json)是我对 (vim for) vscode 的一些设置。
## 设置(neovim)
首先基础设置我是照着[从零开始配置 Neovim(Nvim)](https://martinlwx.github.io/zh-cn/config-neovim-from-scratch/)来的。这篇文章确实不错。

然后进入到了自定义环节：
### 基础设置
* nvim 不支持 alt 和 TAB 快捷键绑定。。（骂人） 切窗口的快捷键还得再自定义。
* `vim.opt.wrap = true` 这行是一定要开的，可以让过长的行到行尾自动换行。（[ref](https://neovim.io/doc/user/options.html#'wrap')）
### 侧边栏
俗话说 neovim 人都在为了逼近 vscode 而努力（来源请求），我需要的侧边栏也不例外。vscode 的“打开文件夹”功能好用，我需要使用。在尝试了多个插件（opener.nvim, Telescope, NerdTree）后，最终我使用的插件是[Neo-tree](https://github.com/nvim-neo-tree/neo-tree.nvim)。这个插件专为 neovim 设计，并且快捷键更加简单易懂<span class="heimu" title="你知道的太多了">NerdTree 是什么妖魔鬼怪</span>。

1. 在 `lua/plugin.lua` 中添加：
```lua
use {
  "nvim-neo-tree/neo-tree.nvim",
  branch = "v3.x",
  requires = { 
    "nvim-lua/plenary.nvim",
    "nvim-tree/nvim-web-devicons", -- not strictly required, but recommended
    "MunifTanjim/nui.nvim",
  }
}

```
2. 快捷键（lua/keymaps.lua）：
```lua
vim.keymap.set('n', '<C-o>', ':Neotree<CR>', opts)
```
3. 其他设置（init.lua）：
```lua
require('neo-tree').setup {
  filesystem = {
    filtered_items = {
      visible = true,  
      hide_dotfiles = false,
      hide_gitignored = true,
    },
  }
}
```
## 常用组合键
* `A` = `$a`, `I` = `0i`
* `*` 是当前单词的下一个匹配项
* `yyp` 复制当前行并粘贴到下一行。我的数据记录需要频繁使用此功能。
* `daw` delete a word()
* `f{char}` search next char
* `w`,`e`,`W`,`E`,`b` 一些移动光标的操作。前四个都是向后移动，大写的会快一点（空格分隔）。`b` 是向前移动。
  > 我不是很想记它们的具体移动方式。能用就行，但是光标移动确实是 vim 增加效率的很重要的一环。
* `<C-q>` 进入 visual block，选中区域后使用 `I` 进行多行输入 / 删除。
  > 哦，这个好像是 vscode vim 插件的特有功能（
* 替换：参考[此处](http://yyq123.blogspot.com/2011/10/vim-substitute.html)。。~~感觉不如 vscode ctrl+f~~
* 加括号：选中括号头位置，`ysw`,`yse`...（不太好用）
* `vi(` 选中括号内内容，不包括括号本身。`va(` 选中包括括号本身。
## 一些想法
用 vim for vscode 用了一周，感觉有些欠缺，因此进行了一些自定义化。以下阐述我的自定义化的一些构思。
* visual 下按 `(`,`[` 等括号类可直接为选中区域添加闭合括号。
* 保留非 vim 的 Ctrl 组合键功能，例如复制粘贴等。
* 删除选中区域时不复制到剪贴板。

而以下是我对纯 vim （无插件）无法实现功能的更多构想：
* 更改指令查找替换方式（太麻烦了），直接搜索高亮，然后选择其中的一些或全部，进行直观替换
* 增加 *保持光标* 与 *新建光标* 功能，并可任意移动任一光标，方便随机修改。
## external
1. [Vim实用技巧](https://awesome-programming-books.github.io/vim/Vim实用技巧.pdf)，进阶阅读
