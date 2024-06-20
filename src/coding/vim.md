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

其他同等级编辑器还有 emacs, helix 等，等有缘人去尝试吧。

## for beginner

如果您没有学习 vim 并碰到需要使用 vim 的场景，这两条规则会很有帮助：

1. `a` or `i` 开启编辑。
2. `<ESC>:wq` 保存并退出。

## 设置(vscode)

[此处](https://github.com/lxl66566/my-key-data/blob/main/config/vscode/settings.json)是我对 (vim for) vscode 的一些设置。

## 设置(neovim)

在折腾了大段配置后，我决定使用 lazy.vim 代替 packer 进行插件管理。于是懒狗的我直接使用 [lazyvim](https://www.lazyvim.org/)，该仓库使用 lazy.vim 并预设了许多插件和 keybindings，非常方便。因此我就在此基础上再进行自定义。

> 对于懒狗还有一些其他选择：[nvchad](https://nvchad.com/) | [AstroNvim](https://astronvim.com/)
> [这里](https://www.reddit.com/r/neovim/comments/13pzwq6/comment/jlcbfzg/)有一些插件推荐，能够使 neovim 接近 vscode（笑）

我的配置存放在 [github 仓库](https://github.com/lxl66566/dotfile/tree/archlinux/home/absolutex/.config/nvim)，直接替换 `~/.config/nvim` 然后启动 nvim 就能使用。首次启动会黑屏一阵，不要 Ctrl+c 终止，否则需要清理缓存重新配置。

1. 迁移我原先的 keymaps。
2. 禁用 Telescope 及其衍生插件，改为使用 [Neotree.nvim](https://github.com/nvim-neo-tree/neo-tree.nvim)。

::: details outdated, archived

首先基础设置我是照着 [external 2.](#external) 来的。这篇文章确实讲的还行。后续冲浪时也看到一篇写得很好的文章，见 [external 3.](#external)，有空的话去试吧。

然后进入到了自定义环节：

### 基础设置

- nvim 不支持 alt 和 TAB 快捷键绑定。。（骂人） 切窗口的快捷键还得再自定义。
- `vim.opt.wrap = true` 这行是一定要开的，可以让过长的行到行尾自动换行。([ref](https://neovim.io/doc/user/options.html#'wrap'))

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

:::

### 我的插件

- Neotree

## 常用组合键

- `A` = `$a`, `I` = `0i`
- `*` 是当前单词的下一个匹配项
- `yyp` 复制当前行并粘贴到下一行。我的数据记录需要频繁使用此功能。
- `daw` delete a word()
- `f{char}` search next char
- `w`,`e`,`W`,`E`,`b` 一些移动光标的操作。前四个都是向后移动，大写的会快一点（空格分隔）。`b` 是向前移动。
  > 我不是很想记它们的具体移动方式。能用就行，但是光标移动确实是 vim 增加效率的很重要的一环。
- `<C-q>` 进入 visual block，选中区域后使用 `I` 进行多行输入 / 删除。
  > 哦，这个好像是 vscode vim 插件的特有功能（
- 替换：参考[此处](http://yyq123.blogspot.com/2011/10/vim-substitute.html)。。~~感觉不如 vscode ctrl+f~~
- 加括号：选中括号头位置，`ysw`,`yse`...（不太好用）
- `vi(` 选中括号内内容，不包括括号本身。`va(` 选中包括括号本身。括号可以用各种符号（`[`, `` ` ``, etc）代替。
  - 同理，`c`, `d`, `y` 也能代替 `v`。

## 一些想法

用 vim for vscode 用了一周，感觉有些欠缺，因此进行了一些自定义化。以下阐述我的自定义化的一些构思。

- visual 下按 `(`,`[` 等括号类可直接为选中区域添加闭合括号。
- 保留非 vim 的 Ctrl 组合键功能，例如复制粘贴等。
- 删除选中区域时不复制到剪贴板。

而以下是我对纯 vim （无插件）无法实现功能的更多构想：

- 更改指令查找替换方式（太麻烦了），直接搜索高亮，然后选择其中的一些或全部，进行直观替换
- 增加 _保持光标_ 与 _新建光标_ 功能，并可任意移动任一光标，方便随机修改。

## external

1. [Vim 实用技巧](https://awesome-programming-books.github.io/vim/Vim实用技巧.pdf)，进阶阅读
2. [从零开始配置 Neovim(Nvim)](https://martinlwx.github.io/zh-cn/config-neovim-from-scratch/)（踩坑配置教程）
3. [Neovim 使用体验](https://luyuhuang.tech/2023/03/21/nvim.html)
