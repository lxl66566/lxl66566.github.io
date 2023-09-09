---
sidebar: heading
date: 2022-05-06
icon: git
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

[learngitbranching](https://learngitbranching.js.org/?locale=zh_CN)对学习 git 有一定帮助。

## 安装与配置

### 安装

git 在 windows 下的安装也算是一门学问。一共十几个步骤选项极其折磨[^5]。因此建议先了解下 Git 的基本知识。更推荐的安装方法是 [scoop](../farraginous/recommend_packages.md#scoop)：`scoop install git`。
[^5]: 当然你也可以一路确定，没什么大问题，就是占用空间多一点罢了

下载安装 git 后，在任意目录右击即可看到 Git Bash Here （命令行界面）（若安装时使用默认选项，还会出现 _Git GUI Here（图形界面）_）。本文仅介绍 Git Bash 用法。

当然，git 安装时会将自身安装目录添加到环境变量，因此你也可以在 cmd 或 Powershell 中使用 git 命令。

### 配置

建议在第一次使用前配置 git。当然不配置也没关系，~~后面慢慢摸索也就会了~~。

1. 配置个人信息
   ```sh
   git config --global user.name "Your Name"
   git config --global user.email "your-email@example.com"
   ```
   这里建议将 `Your Name` & `your-email@example.com` 设为 Github 注册用户名与邮箱，使 Github 能够统计你的 commits。
2. 配置代理
   由于众所周知的原因，最好使用代理上 Github。请在 `<port>` 处填写你的本地代理端口
   ```sh
   git config --global http.proxy http://127.0.0.1:<port>
   git config --global https.proxy http://127.0.0.1:<port>
   ```
   还需要配置 ssh 的代理：执行 `vi ~/.ssh/config`，输入如下内容[^6]：
   ```
   Host github.com
       User git
       Hostname ssh.github.com
       Port 443
       ProxyCommand connect -H 127.0.0.1:<port> %h %p
   ```
   也可以将 `-H` 换为 `-S` 以使用 socks 代理，若 http 代理失效，可使用。（[ref](https://hanyuzhou.com/2022/03/06/connect-with-ssh-through-a-proxy/)）
3. 其他全局设置
   ```sh
   git config --global push.default current    # 设置默认推送，简化 git push
   git config --global core.quotepath false    # 取消中文转义，需要终端支持 utf-8
   git config --global --add safe.directory '*'    # 取消目录安全警告
   git config --global diff.algorithm histogram    # 更改默认 diff 算法，详见页面底 external 1.
   git config --global init.defaultBranch main     # 更改默认分支为 main（linux 默认还是 master）
   ```
4. vscode 插件：如果你使用 vscode 作为你的代码开发环境，那么推荐使用插件 `Git Graph` 以直观地查看 git 提交树与更改。
   [^6]: 需要使用 [Vim](./vim.md)。若不想用，请自行搜索 `git bash 更改默认编辑器`

### 基础使用

- 在 windows git bash 中，`ctrl + insert` 复制，`shift + insert` 粘贴
- 执行 git 命令前，请确认当前目录是否正确
- 如果你只想上传文件到 Github，请参考[常用命令](#常用命令) - _创建仓库 -> 提交_ 即可。

## 深入

git 的一个重要概念是 `HEAD`。`HEAD` （理解为指针）指向你当前所在的节点。`branch` 也是指针，指向某个节点。而 git 构成的结构可以看成一颗**提交树**。

- 使用 `git checkout` 切换 `HEAD`
- 使用 `git rebase -i` 对提交树进行任意操作
- 使用 `git reset` 删除节点

remote branch(ex. `origin/main`) 和 local branch(ex. `main`) 可以看成是不同的分支。push 就可以看成让 `origin/main` 指向 `main` 的过程（当然还有同步）。

## 常用命令

### 创建仓库

```sh:no-line-numbers
git init
```

创建仓库后，目录下出现`.git`隐藏文件夹，即为仓库本体。

因此若要删除仓库，最快捷的方法就是直接删除`.git`文件夹。

> 在 windows 下由于权限问题会出现无法删除的情况，此时请在 bash `rm -rf .git`

### 添加文件

将文件添加到暂存区。

```sh
git add *.py    # 添加所有后缀为 .py 的文件
git add dirname # 添加文件夹
git add -A      # 添加仓库内所有文件与文件夹
```

关于“添加所有文件”不同方法的差异，请看[这里](https://www.jb51.net/article/191458.htm)

推荐[使用 `.gitignore`](#忽略文件-夹)，然后都直接 `git add -A`。

### 提交

添加文件后需要将暂存区的文件提交（commit）到仓库内。

```sh
git commit -m "注释"
git commit -am "注释"   # add 跟踪的文件并 commit
```

使用此命令的一次 commit 会将所有变化的文件添加同一个注释。若需要对不同文件添加不同注释，你可以选择其一：

1. 分批 add，并每次 commit 不同的注释
2. 一次性 add，并每次使用 `git commit file1.xxx file2.xxx -m '...'` 命令打包。

> 有的终端环境注释使用单引号会报错，需要双引号<br/>
> ssh 密钥生成后首次添加注释可能会出现额外提醒，请根据提示照做

#### 撤销提交

- 撤销上次 commit：`git reset --soft HEAD~1`，其中 `--soft` 表示保留代码与 `git add` 的暂存区
- 修改注释：`git commit --amend`，(git bash 下) 需要使用 [Vim](../coding/vim.md)，需要强制推送。
- 还有比较常用的，回到上一个 commit 的状态，去除所有多余文件和改动：`git reset --hard HEAD && git clean -f -d`

#### 合并提交

在 Pull Requst 时，最好将自己所做的更改合为一个。假设上游没有冲突，需要将最后两个 commit 合并为一个：

1. `git rebase -i HEAD~2`
2. 留出一个主 commit 不改变，将其余 commit 的 `pick` 改为 `squash`，保存关闭。
3. 下一个页面是更改注释的，可以直接关闭。

### 连接远程仓库

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

> 优先使用 ssh，不过需要配置<br/>
> 可以理解为给后面那串玩意起了个别名，方便记忆。一般都用 `origin`。

其他指令：

```sh
git remote show <name>  # 查看远程仓库，name 留空即为列出当前远程仓库列表
git remote rm <remote name> # 删除远程仓库
```

### 上传

将你的仓库上传到 github 等仓库托管平台。
::: tip
注：首次使用 ssh 连接需要先配置 ssh 密钥。在 git bash 中输入下述指令。若不使用 _git bash_，请理解指令意思后自行操作
:::

```sh
cd ~    # 进入 home 目录（windows 下即为 C:/Users/<your windows user name>）
ssh-keygen -t rsa -C "youremail@example.com"    # 然后一路回车
clip < ~/.ssh/id_rsa.pub    # 复制公钥内容至剪切板
# 点击github右上角头像，进入Settings-SSH and GPG keys，新建你的 ssh key 并粘贴内容。标题随便写。
ssh -T git@github.com   # 输入该命令验证是否成功
```

- （疑难解答[^1]：_ssh 密钥添加后出现`ssh: connect to host github.com port 22: Connection refused`错误_）
- （疑难解答[^2]：_复制密钥时遇到`bash: clip: command not found`错误_）

[^1]:
    > 尝试连接 GitHub 的 443 端口。([source](https://segmentfault.com/a/1190000041909858))
    >
    > ```sh
    > vim ~/.ssh/config
    > ```
    >
    > 然后在打开的 vim 编辑器内添加以下内容：
    >
    > ```
    > Host github.com
    >   Hostname ssh.github.com
    >   Port 443
    > ```
    >
    > 此时回到[这里](#连接)进行实验。成功连接即解决问题。

[^2]:
    > `clip.exe` should be in `C:\Windows\System32\` or `C:\Windows\SysWOW64\`. You can check if those folders are in your path by doing `echo $PATH`. If they aren't (which would surprise me), you can add them.

    不过这只是复制一个密钥的事，用不着那么麻烦。执行 `cat ~/.ssh/id_rsa.pub` 并手动复制你的密钥即可。

请确保已[连接远程仓库](#连接远程仓库)。

```sh:no-line-numbers
git push origin <branch>    # branch 为当前分支
git push origin <branch> -u     # 将当前分支设为默认
git push origin <branch> -f     # 强制覆盖上传，慎用
git push origin <branch> --force-with-lease # 建议使用此选项代替 -f，更加安全
```

:::tip 提示
至此，你已经可以完成 github 等平台的文件上传了。

接下来是一些其他命令
:::

### 仓库查询

- 查看仓库内文件：`git ls-files`
- **查看仓库状态：`git status`**，比较重要
- 查看仓库提交记录：`git log`
- 查询 commit 详细信息：`git show --stat [commit]`；`[commit]` 留空则查询最近一次 commit 的信息

### 分支

```sh
git branch                      # 查看分支
git branch <new_branch_name>    # 新建分支
git checkout <branch_name>      # 切换到分支
git checkout -b <branch_name>   # 新建并切换到分支，trick
git branch -m old_name new_name # 重命名分支
git branch --delete <branch_name>   # 删除分支
git merge <branch_name>         # 将 当前分支 合并到 指定分支
git merge <branch_name> --ff-only   # 快进合并
```

- （疑难解答[^7]：_fatal: refusing to merge unrelated histories_）
  [^7]: 当本地与远程交集为空时会出现此情况。解法：`git pull origin main --allow-unrelated-histories`

### 删除文件

```sh
# --cached 指仅删除仓库内文件，不删除本地文件；-r 为递归
git rm --cached filename.xxx -r
```

### 恢复文件

```sh
git checkout [commit_hash] -- <path/to/file>  # 从某个 commit 恢复文件，注意空格
git reset --hard <HEAD pointer>    # 强制重置到某 commit，重置所有更改，但不删除新增文件
```

### 拉取远程

`git fetch origin <branch>`

### 删除远程 tag

如果在 github 上新建了一个 release 后，代码又发生了改变，此时 release 中的 source code 将不会自动更新。我们可以通过删除原 tag 再添加 tag 的方法更新 source code。（release 信息会被保留，状态更改为 draft）

仅删除远程 tag：`git push origin :refs/tags/TAGNAME`

## 其他技巧

### 忽略文件(夹)

在仓库下新建 `.gitignore`，输入你需要忽略的文件或文件夹，以换行隔开。
:::warning
开发时请务必将你的无关文件添加进 `.gitignore`。
:::
注意其语法与 linux 文件系统类似，`/` 开头的为根目录，别搞错了。

### 自动化脚本

1. 新建 `xxx.sh`，输入你需要的所有指令语句，以换行隔开。
2. 双击运行或 `bash xxx.sh`

> 其本质是 linux bash 脚本，因此你可以使用其语法<br/>
> 若你在 windows 且未安装 git bash，可以尝试使用 bat 批处理脚本替代。

::: tip
脚本执行完成后将自动关闭窗口。若需使之不自动关闭，请添加`exec /bin/bash`指令至末行。
:::

### 将注释设为当前时间

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

有了 `.sh` 脚本后，我们就能很轻松地在 Github 上备份自己的文件。请 ChatGPT 讲一下移动与覆盖：

> cp 是一个在 Bash shell 中用来复制文件和目录的命令。与 cp 命令一起使用的选项控制了复制的方式。这里是每个选项的含义：
>
> -r：递归地复制目录。这意味着 cp 命令会复制指定的目录以及它的所有子目录和它们的内容。
>
> -f：强制 cp 命令在不提示的情况下覆盖现有文件。
>
> -n：防止 cp 命令覆盖现有文件。如果目标目录中已经存在同名文件，cp 命令会跳过它并且不复制该文件。
>
> -u：仅在目标文件不存在或目标文件比源文件旧时才复制文件。这对于在两个目录之间同步文件非常有用。

因此，对于**文件夹** 备份移动适合使用 `cp -rfu /path/to/source/directory /path/to/destination`，而对于**文件** 备份移动适合使用 `cp -fu /path/to/source/file /path/to/destination/file`。

### 取消转义

git 默认会将中文以 `\` 转义的方式显示。要取消，需要：

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

当然你也可以使用 `git fetch && git merge` 进行协同开发。

### 合并 Pull request

[参考 Github - 合并 Pull Request](./github.md#合并-pull-request)

### 删除大文件

删除大文件是必要的。即使你删除了某个文件，其仍会存在于仓库的提交记录内。
::: danger
在删除之前请务必 commit 未提交的修改！！警钟长鸣！警钟长鸣！这里（20230312）是血的惨痛教训。
:::

- 查找大文件：

```sh
git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -15 | awk '{print$1}')"
# another edition
# git rev-list --all | xargs -rL1 git ls-tree -r --long | sort -uk3 | sort -rnk4 | head -15
```

其中 `tail [-n]` 为显示的条目数。（疑难解答[^3]：_查找大文件时出现`Cannot open existing pack file '.git/objects/pack/_.idx'`错误*）
[^3]: 说明该项目并未触发 git 的 packfile 机制，无需删除大文件。若仍需查找，可以使用 `# another edition` 后的语句。

- 清理完成后请使用 `git gc --prune=now` 进行碎片收集，上传时需要 `git push -f` 强制覆盖。

#### [filter-repo](https://github.com/newren/git-filter-repo)（推荐）

git 官方推荐的清理工具。

我使用 `scoop` 安装，安装过程详见仓库说明。（疑难解答[^4]：_运行`git filter-repo`出现`name 'git' is not defined`报错_）关于使用方法，~~没人能看懂官方文档~~，建议直接找教程。
[^4]: 根据[这里](https://github.com/newren/git-filter-repo/issues/360)的描述做就行了。

```sh:no-line-numbers
git filter-repo --invert-paths -f --path "<path/of/file>"
```

> [References](https://nyakku.moe/posts/2020/06/12/use-git-filter-repo-clean-git-history.html)

#### filter-branch

不太推荐这种方式，比较慢（真的）。

```sh
git filter-branch -f --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch <path/of/file>' --tag-name-filter cat -- --all
# another edition:
# git filter-branch --tree-filter "rm -f <path/of/file>" -- --all
```

> [References](https://harttle.land/2016/03/22/purge-large-files-in-gitrepo.html)

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
   `sh
while IFS= read -r hash; do
    echo "pushing $hash"
    git push origin $hash:refs/heads/master -f
done < log_hash.txt
exec /bin/bash
`
   关于分支与是否加 `-f` 需要根据情况判断。

## external

1. [How different are different diff algorithms in Git?](https://link.springer.com/article/10.1007/s10664-019-09772-z)
