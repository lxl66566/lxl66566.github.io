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

vim 是一种在部分情况下更加强大的输入方式。如果你是 linux user，vim 是基本功；但如果是 windows user，我觉得没必要一定学习 vim，可以先看看 [#总结](#总结)。

## for beginner

如果您没有学习 vim 并碰到需要使用 vim 的场景，这两条规则会很有帮助：

1. `a` or `i` 开启编辑。
2. `<ESC>:wq` 保存并退出。

## 常用组合键

- `A` = `$a`, `I` = `0i`
- `*` 是当前单词的下一个匹配项
- `yyp` 复制当前行并粘贴到下一行。我的数据记录需要频繁使用此功能。
- `daw` delete a word()
- `f{char}` search next char，使用 `;` 可以继续搜索
- `w`,`e`,`W`,`E`,`b` 一些移动光标的操作。前四个都是向后移动，大写的会快一点（空格分隔）。`b` 是向前移动。
  > 我不是很想记它们的具体移动方式。能用就行，但是光标移动确实是 vim 增加效率的很重要的一环。
- 替换：参考[此处](http://yyq123.blogspot.com/2011/10/vim-substitute.html)。。~~感觉不如 vscode ctrl+f~~
- 加括号：选中括号头位置，`ysw`,`yse`...（不太好用）
- `vi(` 选中括号内内容，不包括括号本身。`va(` 选中包括括号本身。括号可以用各种符号（`[`, `` ` ``, etc）代替。
  - 同理，`c`, `d`, `y` 也能代替 `v`。
- `g` 开头的：
  - `g` + j/k/0/$/m... 跳转视觉行的位置，而不是实际行。
  - `gd`：go definition，相当于 ctrl + 左键单击

vscode vim 特有：

- `<C-q>` 进入 visual block，选中区域后使用 `I` 进行多行输入 / 删除。
- `gb` 是多光标，添加下一个相同单词到多光标。然后就可以用 `A` 或 `I` 进入 insert 修改。

## 设置(vscode)

直接看[我的 vscode settings.json](https://github.com/lxl66566/backup/blob/main/config/vscode/settings.json) 吧。

## 设置(懒狗型)

由于现在 vscode 是我的主要编辑器，因此无需折腾，配置简单的 vim 系编辑器也是不错的选择。

- [lunarvim](https://www.lunarvim.org/zh-Hans/)
- [AstroNvim](https://astronvim.com/)
- [nvchad](https://nvchad.com/)

## 设置(neovim)

在折腾了大段配置后，我决定使用 lazy.vim 代替 packer 进行插件管理。于是懒狗的我直接使用 [lazyvim](https://www.lazyvim.org/)，该仓库使用 lazy.vim 并预设了许多插件和 keybindings，非常方便。因此我就在此基础上再进行自定义。

[这里](https://www.reddit.com/r/neovim/comments/13pzwq6/comment/jlcbfzg/)有一些插件推荐，能够使 neovim 接近 vscode（笑）

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

### 我的插件

- Neotree

:::

## 中文用户专栏

vim 也有很多缺点。

最大的缺点是它没有考虑到中文用户 —— 1. 输入法跟 vim 天生就不搭，2. 在中文段落里想要定位也不是一件简单的事情。也难怪 vim 在国人这里流行不起来了，有时候切换输入法去做一些操作可能还真不如把手移到鼠标上操作来得快。包括我是 windows 用户，平常切个窗口、操作些浏览器都是需要动鼠标的，我的手也经常离开键盘，因此对 vim 没有太多的感觉。vim 还是比较适合只用 WM 的 linux user，只有配合 WM 才能尽可能减少鼠标的使用。

### 关于切换输入法

业界其实有一个 im-select 的方案，并且 vscode vim 也[提供了一些配置](https://github.com/VSCodeVim/Vim#input-method)用于切换输入法。

但是，im-select 已经很久不维护了，并且没有一个公认的优秀 fork；而 vscode vim 目前的切换方案是切换系统输入法，这跟我的理念不合，我希望切换的是 rime 内部的中英文开关，而不是系统的英文键盘。然而我调研许久，目前还没有任何外部切换 rime 中英文模式的方法。

- [PEMessage/im-select-imm](https://github.com/PEMessage/im-select-imm)：这个 fork 实现可以切换输入法内部的中英文开关（IME mode），但是实测在 rime 上无法切换 mode，最终一定是中文。
- [rime 的某个 issue](https://github.com/rime/squirrel/issues/164)：从这里我们可以看到许多第三方的 lua 脚本实现，但是这些实现都是切换的系统输入法，而不是 rime mode。

所以目前看来，用户必须接受系统输入法的切换。接受输入法切换的话就简单了，使用上面的 im-select-imm：

```json
"vim.autoSwitchInputMethod.enable": true,
"vim.autoSwitchInputMethod.defaultIM": "1033-513",
"vim.autoSwitchInputMethod.obtainIMCmd": "C:/run/im-select-imm.exe",
"vim.autoSwitchInputMethod.switchIMCmd": "C:/run/im-select-imm.exe {im}",
```

注意：这里的两个 Cmd 必须使用 `.exe` 的绝对路径，而不能只是 `im-select-imm` 这样的 bin name，否则无法完成切换。我估计是 vscode vim 是 split 命令后直接 spawn 这个进程，而不是在终端里执行。

### 关于中文跳转

一般来说，vim 内进行复杂的跳转可以使用 easymotion，这玩意 vscode vim 是自带的，只要一行 `"vim.easymotion": true,` 就能开。不过还是建议使用下面的 keybindings 简化 easymotion 的激活。

```json
"vim.normalModeKeyBindings": [
  {
    "before": ["s"],
    "after": ["<leader>", "<leader>", "s"],
  },
]
```

但是 easymotion 并不能解决中文跳转问题，它还是只能支持英文。尝试寻找一些其他方案：

- [zzhirong/vim-easymotion-zh](https://github.com/zzhirong/vim-easymotion-zh)：看起来挺有意思的，支持小鹤双拼的 easymotion。但是问题是这是原生 vim plugin，vscode vim 并不能使用。
- [zzhirong/hop-zh-by-flypy](https://github.com/zzhirong/hop-zh-by-flypy)：同一个作者的 nvim 插件，基于 hop.nvim（archived）。但是这要求在本地安装 neovim 和 vscode-neovim 插件，等于是两套不同的 vim 实现。我对 neovim 没什么好感，所以不打算使用。

然后我看了眼 vscodevim 的 easymotion 实现，发现核心部分也没几行，直接 vibe 了一个能搜中文全拼前缀的 [vim-lxl66566 fork](https://github.com/lxl66566/VSCodeVim)。于是问题解决。至于要不好给上游提 PR，我感觉为了一个比较小众的功能去给所有 VSCodeVim user 引入一个 tiny-pinyin 依赖不一定能过，因此还是暂时先不提。

## 总结

我个人并不遵循 「vim 之禅」（指能用更少键实现的操作就不会用更多的键）。这跟输入法的原理一样，需要平衡效率和记忆量，而我选择了折中。

- 其他编辑器

其他类似的编辑方式还有 emacs, helix 等。但是我不太建议去使用这些编辑方式，emacs 比较扭曲（对小拇指来说），helix 虽然吹自己键位更自然，但是其实没有好多少，都离不开死记硬背，而且功能还没 vim 丰富（至少对我常用的 vim 功能，helix 的支持堪忧）。

## external

1. [Vim 实用技巧](https://awesome-programming-books.github.io/vim/Vim实用技巧.pdf)，进阶阅读
2. [从零开始配置 Neovim(Nvim)](https://martinlwx.github.io/zh-cn/config-neovim-from-scratch/)（踩坑配置教程）
3. [Neovim 使用体验](https://luyuhuang.tech/2023/03/21/nvim.html)
4. [Emacs 101 新手求生指南](https://github.com/emacs-tw/emacs-101-beginner-survival-guide)（知己知彼）
