---
sidebar: 'auto'
---
# vim 使用心得
我曾在约一年前强迫自己使用 vim 作为代码编辑器，并进行相关学习。但是 vscode vim 给了我极其惨痛的教训：混用 Ctrl + Z 和 Normal 模式下的 u 打乱了我的代码，我只能从 git 中恢复，浪费了数小时的时间。因此弃用。

此次重新启用，也大概是我的心血来潮吧。
## 设置
此处是我对 vim for vscode 的一些设置。在 `C:/Users/<user name>/AppData/Roaming/Code/User/settings.json` 添加即可。路径可在扩展设置中打开。
```json
"vim.useSystemClipboard": true,
"vim.history": 100,
"explorer.confirmDragAndDrop": false,
"vim.visualModeKeyBindingsNonRecursive": [
    { "before": ["x"], "after": ["\"","_","x",] },
    { "before": ["X"], "after": ["\"","_","X",] },
    { "before": ["d"], "after": ["\"","_","d",] },
    { "before": ["D"], "after": ["\"","_","D",] },
    { "before": ["dd"], "after": ["\"","_","dd",] },
    { "before": ["("], "after": ["s","(","<esc>","p",] },
    { "before": ["["], "after": ["s","[","<esc>","p",] },
    { "before": ["{"], "after": ["s","{","<esc>","p",] },
],
"vim.insertModeKeyBindings": [
    { "before": ["j", "j"], "after": ["<Esc>"] },
    { "before": ["<C-s>"], "commands": [ "workbench.action.files.save", ] },
    { "before": ["<C-w>"], "commands": [ ":q", ] },
],
"vim.normalModeKeyBindings": [
    { "before": ["<C-s>"], "commands": [ "workbench.action.files.save", ] },
    { "before": ["<C-w>"], "commands": [ ":q", ] },
],
```
## 组合键
* `yyp` 复制当前行并粘贴到下一行。我的数据记录需要频繁使用此功能。
* `w`,`e`,`W`,`E`,`b` 一些移动光标的操作。前四个都是向后移动，大写的会快一点（空格分隔）。`b` 是向前移动。
> 我不是很想记它们的具体移动方式。能用就行，但是光标移动确实是 vim 增加效率的很重要的一环。
* `<C-q>` 进入 visual block，选中区域后使用 `I` 进行多行输入 / 删除。
* 替换：参考[此处](http://yyq123.blogspot.com/2011/10/vim-substitute.html)
* 加括号：选中括号头位置，`ysw`,`yse`...（不太好用）
* `vi(` 选中括号内内容，不包括括号本身。`va(` 选中包括括号本身。
## 一些想法
用 vim for vscode 用了一周，感觉有些欠缺，因此进行了一些自定义化。以下阐述我的自定义化的一些构思。
* visual 下按`(`,`[`等括号类可直接为选中区域添加闭合括号。
* 保留非 vim 的 Ctrl 组合键功能，例如复制粘贴等。
* 删除选中区域时不复制到剪贴板。

而以下是我对 vim 无法实现功能的更多构思：
* 更改指令查找替换方式（太麻烦了），直接搜索高亮，然后选择其中的一些或全部，进行直观替换
* 增加 *保持光标* 与 *新建光标* 功能，并可任意移动任一光标，方便随机修改。