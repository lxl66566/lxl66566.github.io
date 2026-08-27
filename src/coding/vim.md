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

## vim 操作学习

### for beginner

如果您没有学习 vim 并碰到需要使用 vim 的场景，这两条规则会很有帮助：

1. `a` or `i` 开启编辑。
2. `<ESC>:wq` 保存并退出。

### 常用组合键

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

vim 有着各种各样的分支（就像 linux core 和各种 distro 一样），自然也有一些无需折腾，配置简单的 vim 系 IDE，有兴趣可以尝试。

- [lunarvim](https://www.lunarvim.org/zh-Hans/)
- [AstroNvim](https://astronvim.com/)
- [nvchad](https://nvchad.com/)

## 设置(neovim 一期)

> 2023.06 是我第一次尝试入坑 neovim，不过浅尝一阵以后立刻跑路 vscode 了，这是我的一些心得。

在折腾了大段配置后，我决定使用 lazy.vim 代替 packer 进行插件管理。于是懒狗的我直接使用 [lazyvim](https://www.lazyvim.org/)，该仓库使用 lazy.vim 并预设了许多插件和 keybindings，非常方便。因此我就在此基础上再进行自定义。

::: details archived

[这里](https://www.reddit.com/r/neovim/comments/13pzwq6/comment/jlcbfzg/)有一些插件推荐，能够使 neovim 接近 vscode（笑）

我的配置存放在 [github 仓库](https://github.com/lxl66566/dotfile/tree/archlinux/home/absolutex/.config/nvim)，直接替换 `~/.config/nvim` 然后启动 nvim 就能使用。首次启动会黑屏一阵，不要 Ctrl+c 终止，否则需要清理缓存重新配置。

1. 迁移我原先的 keymaps。
2. 禁用 Telescope 及其衍生插件，改为使用 [Neotree.nvim](https://github.com/nvim-neo-tree/neo-tree.nvim)。

首先基础设置我是照着 [external 2.](#external) 来的。这篇文章确实讲的还行。后续冲浪时也看到一篇写得很好的文章，见 [external 3.](#external)，有空的话去试吧。

然后进入到了自定义环节：

### 基础设置

- nvim 不支持 alt 和 TAB 快捷键绑定。。（骂人） 切窗口的快捷键还得再自定义。
- `vim.opt.wrap = true` 这行是一定要开的，可以让过长的行到行尾自动换行。([ref](https://neovim.io/doc/user/options.html#'wrap'))

### 侧边栏

俗话说 neovim 人都在为了逼近 vscode 而努力（来源请求），我需要的侧边栏也不例外。vscode 的“打开文件夹”功能好用，我需要使用。在尝试了多个插件（opener.nvim, Telescope, NerdTree）后，最终我使用的插件是 [Neo-tree](https://github.com/nvim-neo-tree/neo-tree.nvim)。这个插件专为 neovim 设计，并且快捷键更加简单易懂<span class="heimu" title="你知道的太多了">NerdTree 是什么妖魔鬼怪</span>。

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

## 设置(neovim 二期)

2026.08.26，时隔三年，我看着[越来越臃肿、越来越难用的 vscode](../gossip/fuckxxx.md#vscode-有多难用) 陷入沉思。刚好这段时间舍友在折腾 WSL，学习与配置 neovim，我闲得无聊也一起来玩玩。

2026 年折腾东西的一大好处就是有 AI，曾今望而却步的 lua 现在已经不成阻碍，曾今网上到处翻找的疑难杂症现在也能轻易解决。然而从开发到产品经理的转变也丧失了许多乐趣，不禁让我怀念起年轻气盛的……扯远了。总之，基于[第一期的残废 neovim 配置](#设置neovim-一期)，我开始了第二次的折腾。具体的提示词啥的先不说，这里随便记录一些经验之谈吧。

第二次折腾我仍然使用 lazyvim，框架本身还行，不过仍然有一些问题：

- LazyVim 默认给 markdown/text/typst 等文本类型开了拼写检查，满屏幕的红线还是非常傻逼的。需要注册一个 autocmd 把这个去掉。
  ```lua
  -- 关闭拼写检查：LazyVim 默认给 markdown 等文本类型开 spell，中文会满屏红线
  -- （本文件在 LazyVim autocmds 之后加载，此回调后执行可覆盖它）
  vim.api.nvim_create_autocmd("FileType", {
    group = vim.api.nvim_create_augroup("user_no_spell", { clear = true }),
    pattern = { "text", "plaintex", "typst", "gitcommit", "markdown" },
    callback = function()
      vim.opt_local.spell = false
    end,
  })
  ```

snack 的问题也不少。snack 是 lazyvim 作者搞的一个工具包，提供了许多功能，但是有些默认设置比较垃圾，必须要改：

- snacks.scroll.animate.duration 默认是 total=200ms，这个动画实在是太长了，连续滚动的效果跟虫在爬一样，非常差。我把它调整为了 30ms。
- snack 默认双击 leader（空格）进入文件选择界面，然而这个界面不会展示 `.` 开头的文件和 git ignore 掉的文件。我之前[吃过一次亏](https://t.me/withabsolutex/2692)，所以立刻给 picker.sources.files 加了 hidden=true, ignored=true。
- 可以通过 snacks.dashboard.preset.header = "" 去掉开屏的大 logo。
- 侧边栏默认是 snack 的 explorer 而不是 neotree，需要手动设置一下 `vim.g.lazyvim_explorer = "neo-tree"`。explorer 又占位置又不好看，性能也不如 neotree。
  - neotree 也需要进行一些设置。
    ```lua
    opts = {
      close_if_last_window = true, -- 只剩文件树时自动关闭
      filesystem = {
        filtered_items = {
          visible = true,
          hide_dotfiles = false,
          hide_gitignored = false,
          hide_by_name = { "node_modules" },
          never_show = { ".DS_Store", "thumbs.db" },
        },
      },
      window = { width = 25 },
    }
    ```

有一些 lazyvim 键位也需要熟悉一下：

- `<leader>gg` 打开 lazygit 面板。用得频繁的话也可以设置为 `<leader>g`。
- `<leader>e` 打开/关闭 NeoTree 面板。NeoTree 在一周目尝试的时候被我盛赞了，所以二周目吸取教训，还是用它。
- `<leader>/` 打开全文搜索。lazyvim 的默认实现就是用的 rg，不需要手动去改了。
- `<C-/>` 打开底部终端。我尝试根据 vscode 习惯设为 ``<C-`>``，然而并不能用，问了下 AI 说是 windows terminal 有一些限制，需要去 `Ctrl + Shift + ,` 编辑一下 windows terminal 的配置，在 action 数组内添加 ``{"keys":"ctrl+`","command":{"action":"sendInput","input":"\u001f"}}`` 即可。之后按下 ``<C-`>`` 就会映射到 `<C-/>` 打开终端，亲测有效。
  - 还有 windows terminal 的字体也需要改下，需要改成 nerd font 的系列才能显示 lazyvim 的图标。在上述 windows terminal 配置文件里，profiles.defaults 里添加 `"font":{"face":"FiraCode Nerd Font Mono"}`。（字体从 [nerd font 官网](https://www.nerdfonts.com/font-downloads)下载即可。我比较习惯 FiraCode，所以下的是 FiraCode Nerd Font）
  - 调整终端高度，需要添加这些 keymap（默认是 normal 下才可调，显然我在 terminal 下也需要调整高度）。
    ```lua
    map({ "n", "t" }, "<S-Up>", "<cmd>resize +2<cr>")
    map({ "n", "t" }, "<S-Down>", "<cmd>resize -2<cr>")
    map({ "n", "t" }, "<S-Left>", "<cmd>vertical resize -2<cr>")
    map({ "n", "t" }, "<S-Right>", "<cmd>vertical resize +2<cr>")
    ```
  - 至于每次打开/关闭终端时记住调整的高度，~~这里空白太小写不下~~，反正就是让 AI 写点 lua 脚本。
  - terminal mode 下按 ESC 会变成 normal mode。。。还是需要设一下拦截 ESC。
    ```lua
    opts = {
      terminal = {
        win = {
          keys = {
            term_normal = false, -- 禁用 snacks 终端对 <Esc> 的拦截
          },
        },
      },
    },
    ```

多光标一般使用 jake-stewart/multicursor.nvim。进入多光标模式后，默认按 a/i 插入是不会像 vscode 那样所有光标同时输入，其只会在当前光标上输入，只有输入结束按 esc 后会把所有操作应用到其他位置上。包括多光标键位有很多也需要手动绑一下的。由于 `<C-d>` 比较重要，我就绑了 `<C-n>`。

关于 resolve conflict：

我其实还是习惯用 vscode 那种左右下三栏的 merge 界面（之前见过 idea 那种左中右的狗屎三栏感觉真难用）。因此还是打算在 neovim 里复刻这个。简单用 git-conflict.nvim 和 diffview.nvim 写了点。

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
