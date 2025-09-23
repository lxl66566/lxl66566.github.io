---
date: 2022-05-06
icon: brands fa-git-alt
category:
  - 编程
tag:
  - 工具
---

# Git

## 是什么

_Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. ——[git-scm.com](https://git-scm.com/)_

版本控制，可以进行备份，协同开发。_Github 只支持 Git 作为唯一的版本库格式进行托管。_

## 学习

> 通过自顶向下的方式（从命令行接口开始）学习 Git 可能会让人感到非常困惑。很多时候您只能死记硬背一些命令行，然后像使用魔法一样使用它们。 ——[The Missing](https://missing-semester-cn.github.io/2020/version-control/)

- [learngitbranching](https://learngitbranching.js.org/?locale=zh_CN)
- [The Missing](https://missing-semester-cn.github.io/2020/version-control/)

## 安装与配置

### 安装（windows）

此处仅安装 Git Bash，不涉及 GUI。

::: tabs

@tab scoop

使用 [scoop](../farraginous/recommend_packages.md#scoop) 可以一行搞定：`scoop install git`。

注意安装完的提示，可以直接一行命令添加 `*.sh` 的键绑定。

~~在 _windows 设置 - 应用 - 默认应用_ 中为 `.sh` 文件添加默认打开方式，添加为 `...\scoop\apps\git\current\git-bash.exe`（填写实际路径）。否则无法直接双击 `*.sh` 文件直接运行。~~ 现已无需手动添加。

@tab git for windows

> "Git for Windows SDK" is 5.33GB compared to "Git for Windows" 691MB compared to "Portable Git" 275MB.
> ::: right
> ——[pacman-for-git](https://github.com/mcgitty/pacman-for-git/blob/main/pacman-for-git.txt)
> :::
> git for windows 官方的安装包就是纯纯流氓。明明是 git 和 msys2 结合体，却不让安装其他软件。

git for windows 的安装也算是一门学问，一共十几个英文步骤选项对新手极其折磨；当然你也可以一路确定，没什么大问题，就是占用空间多一点罢了。

:::

### 配置

建议在第一次使用前配置 git。当然不配置也没关系，~~后面慢慢摸索也就会了~~。

1. 配置个人信息
   ```sh
   git config --global user.name "Your Name"
   git config --global user.email "your-email@example.com"
   ```
   这里建议将 `Your Name` & `your-email@example.com` 设为 Github 注册用户名与邮箱，使 Github 能够统计你的 commits。
2. 配置代理：由于众所周知的原因，最好使用代理上 Github。请在 `<port>` 处填写你的本地代理端口：
   ```sh
   git config --global http.proxy http://127.0.0.1:<port>
   git config --global https.proxy http://127.0.0.1:<port>
   ```
   还需要配置 ssh 的代理：编辑 `~/.ssh/config`，输入如下内容[^6]：
   ```
   Host github.com   # "github.com" 匹配的是仓库的 remote host name, 可以通过 git remote -v 查看。
       User git
       Hostname ssh.github.com
       Port 443
       ProxyCommand connect -H 127.0.0.1:<port> %h %p # 如果你有系统 http 代理，请加上这行
   ```
3. 其他全局设置
   ```sh
   git config --global push.default current        # 设置默认推送，简化 git push
   git config --global push.autoSetupRemote true   # 默认设置上游，搭配上条
   git config --global core.quotepath false        # 取消中文转义，需要终端支持 utf-8
   git config --global --add safe.directory '*'    # 取消目录安全警告
   git config --global diff.algorithm histogram    # 更改默认 diff 算法，详见页面底 external 1.
   git config --global init.defaultBranch main     # 更改默认分支为 main（linux 默认还是 master）
   git config --global rebase.autoSquash true      # 自动 squash
   git config --global core.ignorecase false       # （Windows）将文件名大小写改动也视为改动。https://t.me/withabsolutex/2156
   # 全局忽略
   printf "node_modules\n__pycache__\n*.exe\n*.o\n" > ~/.gitignore_g
   git config --global core.excludesfile ~/.gitignore_g
   ```
   - 参考[取消转义](#取消转义)
   - [设置 autocrlf](https://docs.github.com/en/get-started/getting-started-with-git/configuring-git-to-handle-line-endings)。（无论 Windows 还是 Linux 都要设！）
4. vscode 插件：如果你使用 vscode 作为你的代码开发环境，那么推荐使用轻量级插件 `Git Graph` 以直观地查看 git 提交树与更改。
5. 其他 git 插件
   - [difftastic](https://difftastic.wilfred.me.uk/git.html#difftastic-by-default)
   - [git-filter-repo](#删除大文件)
6. 然后当你了解了 git 的更多知识后，可以去看看 [external 7.](#external)。

[^6]: 需要使用 [Vim](./vim.md)。你也可以修改环境变量 `EDITOR` 的值指定其他编辑器。

## 其他工具

- [gitui](https://github.com/extrawurst/gitui)：TUI git 工具
- [Commitizen](https://github.com/commitizen/cz-cli)：帮助写出规范的 commit message

## 基础

- 在 windows git bash 中，`ctrl + insert` 复制，`shift + insert` 粘贴
- 执行 git 命令前，请确认当前目录是否正确

### 创建仓库

```sh:no-line-numbers
git init
```

创建仓库后，目录下出现`.git`隐藏文件夹，即为仓库本体。因此若要删除仓库，最快捷的方法就是直接删除`.git`文件夹。

> 在 windows 下由于权限问题会出现无法删除的情况，此时请在 bash `rm -rf .git`

### 提交

提交你的修改。提交前需要**先将文件添加到暂存区**。

可以直接 `git add <file_path>`，但是一般的工程都会在主目录下使用 `.gitignore` 声明忽略的文件，然后直接 `git add -A`。

> 小知识：git stage 是同义于 git add 的。[ref](https://wkevin.github.io/GitChat/gitchat.html#修改完了为什么不是直接提交而是-git-add)

然后执行 `git commit -m "注释"` 提交。提交的注释有一定要求，如果是协作开发，请遵守。如果是个人项目，那随意。

- 言简意赅，清楚描述自己这次提交的修改内容
- 一般现在时

如果没有新增文件，可以将添加到暂存区和提交合成一条指令，`git commit -am "注释"`，即提交所有**已追踪文件**。

一般来说，不需要为修改的每个文件使用不同注释。

### 上传

将你的仓库上传到 github 等仓库托管平台。

#### 添加远程地址

::: code-tabs
@tab SSH

```sh
git remote add origin git@github.com:<yourgithubID>/<Repo>.git
```

@tab HTTPS

```sh
git remote add origin https://github.com/yourgithubID/gitRepo.git
```

:::

> 优先使用 ssh，不过需要配置，如果不想配置可以使用 https。  
> 可以理解为给 git 地址起了个别名，方便记忆。一般都用 `origin`。

#### 配置 ssh

首次使用 ssh 连接需要先配置 ssh 密钥。在 git bash 中输入下述指令：

```sh
ssh-keygen -t ed25519 -C "youremail@example.com"      # 这里的邮箱与你的 github 注册邮箱相同。
# 然后一路回车
cat ~/.ssh/id_ed25519.pub                             # 把这个文件的内容打印出来，然后复制到剪切板。或者你也可以用记事本打开，都行，只要拿到内容即可。
# 点击github右上角头像，进入 Settings-SSH and GPG keys，新建你的 ssh key 并粘贴内容。标题随便写。
ssh -T git@github.com   # 验证 ssh key 是否设置成功
```

- （疑难解答[^1]：ssh 密钥添加后出现 `ssh: connect to host github.com port 22: Connection refused` 错误）

[^1]: 可能是代理阻断了 ssh 22 端口造成。你需要将 github 远程的端口改为 443，参考[配置 2.](#配置)。

#### 推送

请确保已[添加远程地址](#添加远程地址)。

```sh
git push origin <branch>    # branch 为当前分支
git push origin <branch> -u     # 将当前分支设为默认
git push origin <branch> -f     # 强制覆盖上传，慎用
git push origin <branch> --force-with-lease # 建议使用此选项代替 -f，更加安全
```

现在你已经能完成基本的上传文件到 github 的操作。

### 忽略文件（夹）

在仓库下新建 `.gitignore`，输入你需要忽略的文件或文件夹，以换行隔开。

`!` 开头的表示反选，即“不要忽略”。
:::warning
开发时请务必将你的无关文件添加进 `.gitignore`。
:::
注意其语法与 linux 文件系统类似，`/` 开头的为根目录，别搞错了。

#### 全局忽略

`git config --global core.excludesfile <ignore_file>` 可以配置一个全局 ignore，假如忘记添加 `.gitignore`，全局命中也能避免上传无关内容。

### 自动化脚本

新建 `xxx.sh`，输入每行一个指令，双击运行。本质是 bash 脚本。

::: tip
脚本执行完成后将自动关闭窗口。若需使之不自动关闭，请添加`exec /bin/bash`指令至末行。
:::

### 设置

在前面的章节中已经用到了 `git config`。git 的配置分为仓库配置与全局配置，两者都是 `.toml` 格式的文件。`git config xxx` 本质就是添加/修改配置文件中的条目。

```sh
git config --edit # 使用默认编辑器打开 local config 文件
git config --global --edit # 相对的，打开 global 文件
git config alias.p 'pull origin code'  # 向 alias.p 内写入值（添加命令别名）
```

## 进阶

### 提交

- 撤销上次 commit：`git reset --soft HEAD~1`，其中 `--soft` 表示保留代码与 `git add` 的暂存区
- 修改注释：`git commit --amend`，(git bash 下) 需要使用 [Vim](../coding/vim.md)，需要强制推送。
- 还有比较常用的，回到上一个 commit 的状态，去除所有多余文件和改动：`git reset --hard HEAD && git clean -f -d`

### 远程

```sh
git remote show <name>        # 查看远程仓库，name 留空即为列出当前远程仓库列表
git remote rm <remote name>   # 删除远程名字
git fetch origin <branch>     # 拉取远程
```

#### 删除远程 tag

如果在 github 上新建了一个 release 后，代码又发生了改变，此时 release 中的 source code 将不会自动更新。

理论上，需要新建一个 tag 进行更新。

在特殊需求下，我们也可以通过删除原 tag 再添加 tag 的方法更新 source code。此时 release 信息会被保留，状态更改为 draft。

`git push origin :refs/tags/TAGNAME`

### 仓库查询

- 查看仓库内文件：`git ls-files`
- **查看仓库状态：`git status`**，比较重要
- 查看仓库提交记录：`git log`
  - 以树状图显示：`git log --graph --oneline --all`，很有用，特别是在服务器上。
- 查询 commit 详细信息：`git show --stat [commit]`；`[commit]` 留空则查询最近一次 commit 的信息

### 分支

```sh
git branch -a                    # 查看分支
git branch <new_branch_name>     # 新建分支
git switch <branch_name>         # 切换到分支
git checkout -b <branch_name>    # 新建并切换到分支，trick
git branch -m <old_name> <new_name> # 重命名分支
git branch --delete <branch_name>   # 删除分支
git push origin -d <branch_name> # 删除远程分支
```

- （疑难解答[^7]：_fatal: refusing to merge unrelated histories_）
- （疑难解答[^8]：_unable to delete 'origin/main': remote ref does not exist_）
- （疑难解答[^10]：`git push origin -d master` 时 github 拒绝删除分支）

[^7]: 当本地与远程交集为空时会出现此情况。解法：`git pull origin main --allow-unrelated-histories`
[^8]: 当远程不存在分支而本地存在分支时会出现此情况。执行 `git fetch --prune`。([ref](https://stackoverflow.com/questions/35941566/git-says-remote-ref-does-not-exist-when-i-delete-remote-branch))
[^10]: 这种情况一般是 Github 的默认分支保护机制。进入 repo _Settings_，将默认分支改为其他分支即可。

### 操作文件

```sh
git rm --cached filename.xxx -r  # --cached 指仅删除仓库内文件，不删除本地文件；-r 为递归
# 也可以用来删除被添加到暂存区 (git add) 的文件
git checkout [commit_hash] -- <path/to/file>  # 从某个 HEAD 指针恢复文件，注意空格
```

### 下载

```sh
git clone <gitrepo>                       # 在当前目录下创建文件夹并克隆完整仓库
git clone <gitrepo> --depth 1             # 仅克隆最新提交，减少大小
git clone <gitrepo> --filter=blob:none    # Blobless clones
git clone <gitrepo> --filter=tree:0       # Treeless clones
```

关于 Blobless clones 和 Treeless clones 可以查看 [external 6.](#external)。简单概括，Treeless clones 是下载量最少的 clone 方式。

### 彻底删除提交

在[深入](#深入)中有提到，一旦 commit 过后，此次修改就不会消失。那么如果我无论如何就是想要让此次修改消失呢？([src](https://www.cnblogs.com/my_life/articles/16141241.html))

```sh
git reflog expire --expire-unreachable=0 --all
git gc --prune=0
```

### submodule

若想在 git 仓库内包含子仓库，需要将子仓库转换为 submodule。submodule 本质上是一个 symbol link，指向一个本地或网络仓库位置。

- 创建：`git submodule add <1> <2>`，添加一个现有仓库 `1` 到 位置 `2`。`1` 可以是本地位置或网络位置，而 `2` 一般是本仓库下的相对路径。
- 拉取：
  - 使用 clone 无法直接拉取 submodule，需要添加 `--recursive`。
  - 对于 pull 或者已经拉取的仓库，单独拉取 submodule，需要 `git submodule update --init --recursive` ([ref](https://stackoverflow.com/questions/1030169/))

## 深入

> 这里是原创内容，是我个人摸索/结合其他文章得出的、对提交树的理解。可能有误，需要自行辨认。

git 构成的结构可以看成一颗**提交树**。（实际上是 DAG，有向无环图）

git 的一个重要概念是 `HEAD`。`HEAD` （理解为指针）指向你当前所在的节点。

每次提交（包括 `git stash`）相当于在提交树上创造一个 `HEAD` 的子节点。只要有过 commit，它就不会消失。后文中默认 `节点` == `提交`。

每个 branch 也是指针，指向某个节点。后文中默认 `分支` --> `指针`。（but `指针` !== `分支`）

_remote branch_ (ex. `origin/main`) 和 _local branch_ (ex. `main`) 可以看成是不同的 branch。`git push` 就可以看成让 `origin/main` 指向 `main` 的过程（当然还有同步）。

### 畅游 git 提交树

每个节点的 hash 值是 40 位的，但是可以用（最短）前 4 位来代替，当然也可以用一个指针的名字来代替。

`git checkout <hash>` 可以让 `HEAD` 指向任意节点。如果没有任何分支指向 `HEAD` 同一节点，则进入 `HEAD detached` 模式。

`git checkout <branch_name>`（新版本 git 建议用 `switch` 代替 `checkout` 的这一功能）会退出 `HEAD detached` 模式，并将 `HEAD` 附着到分支指针上。

而 `git reset --hard <hash>` 则更进一步，若当前并非 `HEAD detached` 模式（即 `HEAD` 依附于一个分支），则在将 `HEAD` 指向节点的同时，也会让分支跟随着指向 `HEAD`。

- `--hard` 表示强制恢复节点处的文件（不删除未追踪文件），请确保当前没有 Uncommited Changes，否则。。。
- 还有其他让分支指向其他节点的方法：
  - 可以用 `git branch -f <branch> <point_to>`。这个分支不能是 `HEAD` 依附的分支。
  - 可以用 `git merge --ff-only <point_to>`。将当前 `HEAD` 依附的分支指向任意代子节点。
    - 不加 `--ff-only` 则没有子节点的限制，进化为合并操作。
  - （疑难解答[^9]：无法强制更新被工作区...所使用的分支）

[^9]: 我的这个例子是没有退出变基造成的。需要 `git rebase --quit`。

这样我们已经可以操作任意指针指向任意节点了。

`git rebase -i`（即 `--interactive`，交互式）可以对提交树进行任意操作，例如：任意编辑注释，更改提交顺序，删除（`drop`）或合并（`squash`）节点等。需要使用编辑器[^6]。

`git merge ...` 创建一个节点，作为两个 branch 共同的子节点，并将两个 branch 都指向它。此时提交树已失去树结构，退化为 DAG。

默认情况下，不在 _根节点_ 和 _任意指针_ 连线路径上的节点会被隐藏，`git log -a` 是看不到的。可以用 `git reflog` 查看 hash 值。

### 任意组合提交树

现在我们已经不满足于 **畅游** 了，我们需要更进一步：将提交树改为我们想要的任意形状（）

`git cherry-pick <...nodes>` 将 `<...nodes>` 复制以后，按顺序接在 `HEAD` 的下方，成为 `HEAD` 的子链。

`git rebase <to> <from>` 会稍微复杂一点。首先 rebase 找到 `<to>` 和 `<from>` 的最近公共祖先，记为 `<pa>`，然后复制 `<pa>` 到 `<from>` 这条链（不包括 `<pa>` 自身），将其接到 `<to>` 上。

注意，这些命令都**不会改变**已存在的节点，如果遇到需要移动的情况，则会复制成不同节点。原先节点被隐藏，但我们仍然可以通过 hash 值移动到其所在位置。

## 其他技巧

### 减少 rebase 冲突

git rebase 远没有想象中的智能。如果你认为本次 rebase 一定不会有问题，或者在 rebase 中有**优先保证某一个分支不变**的需求，可以使用 `-X ours` 或 `-X theirs` arg。可以将 -X 理解为“以某一方为主”，`ours` 指代 base 分支，`theirs` 指代你的当前分支（也就是 HEAD=theirs; git rebase base），这个语义看似有些反直觉，需要注意一下。

### 将注释设为当前时间

一般不建议，但如果个人项目实在想不到写啥，可以这样。

::: code-tabs
@tab bash

```sh
# use only in bash
git commit -m $(date "+%Y%m%d-%H:%M:%S")
# result: 20220613-11:34:59
```

@tab powershell

```shell
# use only in powershell
git commit -m $(get-Date)
# result: 06/17/2023 21:05:13
```

:::

### 用于备份

#### 使用 cp 方法

有了 `.sh` 脚本后，可以用 `cp -rfu` 将所需文件复制到仓库再提交上传，进行备份。

> -r：递归地复制目录。  
> -f：强制 cp 命令在不提示的情况下覆盖现有文件。  
> -u：仅在目标文件不存在或目标文件比源文件旧时才复制文件。

但是这样也太丑了一点。

#### 软链接方法

cp 方法的一大缺点是无法反映**删除**的变化。这可以通过软链接解决。

但是，git 只会将软链接识别成链接本身，而不是其指向的内容。并且这是无解的。

因此我们只能将文件本体放在 git 仓库内，然后将文件软链接出去在其他地方用。这需要考虑软链接能否被其他应用正常使用。例如我将 galgame 存档链出去，有的游戏能读，有的游戏不能读，还是需要看运气的。

#### git bare repo

后来试了一下 [git bare repo](https://github.com/rodrigofrancisco/dotfiles#backup-technique)。

linux 上倒是挺方便，但估计不能在 windows 下跨盘符使用。

### 取消转义

git bash 默认会将中文以 `\` 转义的方式显示。要取消，需要：

1. 右键 - Options - Text - Locale，选择 `zh-CN`，字符选择 `UTF-8`。
2. `git config --global core.quotepath false`

### 协同开发

多人协同开发时，免不了要拉取上游，合并代码，解决冲突。`git stash` 可以帮助你保存当前代码，之后若有需要，还可合并与解决冲突。

```sh
git stash   # 暂存代码
git pull origin main    # 拉取上游
git stash pop   # 释放代码，进行合并
git stash drop  # 解决冲突后，请释放未被 pop 出的 stash
```

当然也可以使用 `git fetch && git merge`。

### 合并 Pull request

需要手动干预 PR 的场合，[参考 Github - 合并 Pull Request](./github.md#合并-pull-request)

### 删除大文件

删除大文件是必要的。即使你删除了某个文件，其仍会存在于仓库的提交记录内。

::: danger

在删除之前请务必 commit 未提交的修改！！警钟长鸣！警钟长鸣！这里（20230312）是血的惨痛教训。

:::

1. 查找大文件：
   ```sh
   # 需要在 git bash 或其他类 unix 环境下运行
   git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -15 | awk '{print$1}')"
   # another edition
   # git rev-list --all | xargs -rL1 git ls-tree -r --long | sort -uk3 | sort -rnk4 | head -15
   ```
   其中 `tail [-n]` 为显示的条目数。（疑难解答[^3]：_查找大文件时出现`Cannot open existing pack file '.git/objects/pack/_.idx'`错误\*）
2. 清理。
   ::: tabs

   @tab bfg-repo-cleaner（推荐）

   [bfg-repo-cleaner](https://rtyley.github.io/bfg-repo-cleaner/) 是我某天刷 nix store 时看到的，尝试了一下，也非常不错。

   主要用法就 `--delete-files`, `--delete-folders` 两个。这两个是 match 名字而不是路径。

   @tab filter-repo（推荐）

   [git-filter-repo](https://github.com/newren/git-filter-repo)

   git 官方推荐的清理工具。需要额外安装，并且可能失效。

   windows 下推荐使用 scoop 安装，安装过程详见仓库说明。（疑难解答[^4]：_运行 `git filter-repo` 出现 `name 'git' is not defined` 报错_）

   关于使用方法，~~没人能看懂官方文档~~，建议直接找[教程](https://nyakku.moe/posts/2020/06/12/use-git-filter-repo-clean-git-history.html)。

   ```sh:no-line-numbers
   git filter-repo --invert-paths -f --path "<path/of/file>"
   ```

   @tab filter-branch

   [ref](https://harttle.land/2016/03/22/purge-large-files-in-gitrepo.html)

   不太推荐这种方式，比较慢（真的）。好处是无需安装，并且一定可用。

   ```sh
   git filter-branch -f --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch <path/of/file>' --tag-name-filter cat -- --all
   # another edition:
   # git filter-branch --tree-filter "rm -f <path/of/file>" -- --all
   ```

   :::

3. 清理完成后请使用 `git gc --prune=now` 进行碎片收集，上传时需要 `git push -f` 强制覆盖。

[^3]: 说明该项目并未触发 git 的 packfile 机制，无需删除大文件。若仍需查找，可以使用 `# another edition` 后的语句。
[^4]: 根据[这里](https://github.com/newren/git-filter-repo/issues/360)的描述做就行了。

### 大文件上传

> 此处暂不讨论 git-lfs.<br/>
> Github 对单次上传限制为 2G，在我看来是个非常脑瘫的举措。

首先，若有大文件，最该考虑的是 `git-lfs`。具有先见之明的做法可以极大减少后期维护的成本。

其次，我在网上找到了[这些资料](https://gist.github.com/banyudu/b5bac69767f49073e09985d82128e713)，但其中提到的 Stackoverflow 的[脚本](https://stackoverflow.com/questions/15125862/github-remote-push-pack-size-exceeded/51468389#51468389)并不能很好地运行。因此我根据上述原理支撑，自己写了一个脚本。适用于文件总体过大但每个 commit 都不超出大小限制的情况。

1. 导出所有 commit hash 并翻转使最早的 commit 被最先提交。
   ```sh
   git log --pretty=format:"%H" > temp.txt
   tac temp.txt > log_hash.txt
   ```
   注意，`tac` 反转可能会出现第一行与第二行换行缺失问题，请手动添加换行。
2. 分 commit 上传
   ```sh
   while IFS= read -r hash; do
   echo "pushing $hash"
   git push origin $hash:refs/heads/master -f
   done < log_hash.txt
   exec /bin/bash
   ```
   关于分支与是否加 `-f` 需要根据情况判断。

### reflog 查找

我曾经遇到过文件丢失的情况，这个文件理论上应该永远是 Uncommited changes，不需要被提交。于是在某次 git 操作时文件丢失了。

但是我记得我曾经有将此文件误提交的事情，虽然当时就 fixup 了。只要有提交过，文件就会在 reflog 中保留下来。这给了我恢复文件的可能性。

那么要如何知道是哪个 commit 中引入的此文件呢？让 GPT 写一个脚本，稍作修改得到：

```bash
for reflogEntry in $(git reflog | grep commit | awk '{print $1}'); do
   git show $reflogEntry -- $@
   if [ $? -eq 0 ]; then
      echo "Found in commit $reflogEntry"
   fi
done
```

然后就可以 `bash test.sh <file>` 了。

### 签名

一般情况下，git 提交都是不需要签名的。但是面对大项目的协同开发，有时没办法，如果不签名，CI 都过不去。因此学习如何签名也是有必要的。

```sh
gpg --generate-key   # 然后填写与 git 提交一样的名字与邮箱。
gpg --list-secret-keys --keyid-format=long   # 寻找私钥 ID 并复制
gpg --armor --export 83D******** # 打印公钥，上传到 Github
git config commit.gpgsign true   # 设置该仓库 commit 时自动签名
```

如果需要对已存在的 commit 签名，可以 `git rebase -i HEAD`，然后将其中的 `noop`(_no operation_) 改为 `exec git commit --amend --no-edit -S` 即可。

### 统计 git 分支大小

用 gpt 写了个。

```sh
# 假设已 checkout 到此分支
git ls-files | xargs -n1 du -h | awk '{print $1}' | paste -sd+ - | bc
```

可能需要安装 `bc`（`pacman -S bc`）。统计结果理论以 K 为单位。

### 批量修改 committer 和 signoff

重新 git config --local user.name 和 user.email 后，执行

`git rebase -i HEAD~N --exec 'git commit --amend --reset-author --signoff -m "$(git log -1 --pretty=%B | grep -v "Signed-off-by")"'`

## 奇技淫巧

### 自动化 squash

最初目的是不要让 Github Actions 的每日 commit 过多（），于是想自动将所有 Github Actions 的 commits 压在一起。而 CI 流程让我无法手动 squash。话不多说，直接上脚本：

```sh
git commit -a --fixup HEAD
GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash HEAD~2
```

首先 `commit -a` 跟踪所有改动并提交，`--fixup HEAD` 表明这是一个对上次 commit 的修正。新的提交会被命名为 `fixup! <last commit message>`。

然后关于 `--autosquash`，[文档](https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---autosquash)指出以 `squash! …​` or `fixup! …​` or `amend! …​` 开头的 commit 都会被 squash 进 `…` 对应的 commit。但是这个参数的使用条件被限制死了：

> _move commits that begin with squash!/fixup! ==under -i==_

也就是必需要进入 `--interactive` 环境下才可进行 _autosquash_。在平常这可能不是一个问题，手动在 vim `:q` 即可。但现在需要在全自动条件下执行，又无法绕开 `-i` 条件，那么我们要怎么办呢？

`GIT_SEQUENCE_EDITOR=:` 是绝杀，它重写了环境变量，使 git 无法打开编辑器。这样 _rebase_ 就会被强制结束，问题解决。

总结：

> _Asuka Minato：用 ci 的 repo 为啥要在意提交次数，人家 cn 源的 bot 那次数都没人管_  
> _AbsoluteX：话题结束，鉴定为吃太饱（_

### 崭新出厂

像我这种喜欢用 Git 备份一切的人，也会用 Git 备份一些经常变化的大二进制文件，代表性仓库是 [my-key-data](https://github.com/lxl66566/my-key-data)。久而久之，Git 仓库会越来越大，因此一段时间以后让 repo “恢复出厂设置” 以减小文件大小是有必要的。（我的备份场景下，并不在乎历史版本追溯）

我之前用的一直是简单粗暴 `rm -rf .git && git init`，但是现在似乎也有了新的思路。

```sh
# 假设仓库已将最新修改 commit 到 main 分支
git checkout -b new                    # 切换临时分支
git branch -D main                     # 删除旧分支
git checkout --orphan main             # 全新分支
git add -A
git commit --signoff -a -m "init"
git push -f                            # 干掉 origin/HEAD 和 origin/main
git branch -D new
git reflog expire --expire=now --all   # 干掉所有引用
git gc --prune=now --aggressive        # gc，删除 blob
```

这样就能得到一个船新的、与之前完全一致的、最小化空间占用的 repo 了。虽然这样做弯弯绕绕，咋一看还不如 `rm -rf .git`；但是这样有一个极大的好处，就是步骤中的 commit 的文件列表和之前的 commit 是一致的，`git push -f` 上传到 Github 时经过比对，实际上不需要上传数据。如果你的仓库大小上了 GB 甚至数十 GB，这一点操作能为你节约不少上传时间和流量。而 git 仓库重建后的上传是需要全量上传的。

## Git 插件

与 cargo 类似，`git xxx` 实际上会在系统里调用名为 `git-xxx` 的可执行文件。这里有一些插件，未给出链接的请自行搜索：

- git-cliff：自动生成 changelog
- git-absorb：将当前更改合并到某个 commit 内。
  - 我不太喜欢它，我选择用我自己的[脚本](./snipets.md#gfixup)。
- git-se：[git-simple-encrypt](https://github.com/lxl66566/git-simple-encrypt)，用于仓库加解密

## 自建 git 托管

有一些东西，不方便放在托管网站上（即便是 private），例如个人隐私，被 DMCA 的资源，等等。因此可以在 [VPS](../articles/proxy/vps.md) 上自建一个 git 托管解决。

我的需求非常简单，保持同步即可。因此这里也不讲什么 Gitea，直接利用最原始的 ssh([ref](https://www.zzxworld.com/posts/4-ways-to-self-host-git-service))：在 VPS 上建一个 bare repo 就结束了！之后上传只要指定 host 和路径就行了。

```sh
git push <host>:<path>/<name>.git
```

## external

1. [How different are different diff algorithms in Git?](https://link.springer.com/article/10.1007/s10664-019-09772-z)
2. [Commits are snapshots, not diffs](https://github.blog/2020-12-17-commits-are-snapshots-not-diffs/)
3. file structure [inside .git](https://wizardzines.com/comics/inside-git/)
4. [深入探討 Git 中的 Unreachable (無法到達的) 物件與清理方法](https://blog.miniasp.com/post/2024/06/18/How-to-Remove-Git-Unreachable-Objects)
5. [一文讲透 Git 底层数据结构和原理](https://www.jiqizhixin.com/articles/2020-05-20-3)
6. [Get up to speed with partial clone and shallow clone](https://github.blog/open-source/git/get-up-to-speed-with-partial-clone-and-shallow-clone/)
7. [How Core Git Developers Configure Git](https://blog.gitbutler.com/how-git-core-devs-configure-git/)，非常好的文章
