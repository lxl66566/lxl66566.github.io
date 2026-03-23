# jujutsu

> 几年前我就听说过 jujutsu 的大名，但是因为概念太复杂了，所以没有入坑。之后陆续一直看到有人推荐，尝鲜之心已经藏不住了；加上现在的 AI 搜索发达，降低了我的试错成本，于是尝试入坑。

jujutsu 是一个兼容 Git 的 VCS (Version Control System)。jujutsu 不是 git command wrapper 而是一个新的 VCS，比起 Git 有一些新奇的设计理念。简要介绍一下 jj 的设计理念：

- jujutsu 没有暂存区的概念，所有修改都是直接反映到当前的 `@` 里。
  - `@` 是一个虚拟 commit（「虚拟」的意思是不被 Git 系统感知，只存在于 jujutsu 系统里，后同。说 commit 是因为它有自己的 hash，可以跳转）。因此用户在任意时候切换到任意节点开始工作，当前的内容会自动保留。
- jujutsu 有 Operation Log，任何操作都可以通过 `jj undo` 直接撤销。
- 不像 git 开发必须要先切分支，jujutsu 可以直接在提交树上进行开发；开发完以后打一个 bookmark（底层是 git 的 branch），然后把 bookmark 推到远端。bookmark 不会随着提交而移动。

## 安装与其他生态

我使用 cargo binstall 进行安装：`cargo binstall --strategies crate-meta-data jj-cli`。

其他生态：

- [jj-starship](https://github.com/dmmulroy/jj-starship)：如果你使用 starship 装饰你的终端，可以使用 jj-starship，获取更多提示信息。
- [lazyjj](https://github.com/Cretezy/lazyjj)：jujutsu 的 TUI。

避雷：

- [keanemind/jjk](https://github.com/keanemind/jjk)：全是 emoji，vibe 程度很高要当心；**有非常严重的性能问题，每次 type 都会调用多次 jj 指令，并且会被中文输入法放大多倍，卡死 VSCode 的渲染进程。**
  - jujutsu 本身是基于 cli 的，并且功能相对完善，没必要硬上 VSCode 扩展。

## 入门

### 编辑配置

假设本文的读者都是开发者 + Git user，事先编辑好配置文件也是一个不错的选择。`jj config path --user` 可以查看配置文件的路径；虽然官方推荐使用平台默认路径，但是我个人还是更喜欢把配置放在 `~/.jjconfig.toml`，毕竟 windows 的 `AppData\Roaming` 实在是太邪恶了，我无法接受。

### 基本概念

在一个 jj repo 里执行 `jj`（默认执行为 `jj log`），可以看到类似下面的东西：

```sh
❯ jj
◉  mzqpoqyq <lxl66566@gmail.com> [2 minutes ago] 09ff4381
...
```

前面的字母 `mzqpoqyq` 表示变更 id，不会随着你的本地代码修改而变化；而右边的 `09ff4381` 代表 Git commit id，如果对 commit 进行了变更则会发生变化（例如 `@` 工作区也是一个虚拟 commit，所以随着你的开发，它的 commit id 是会不断变化的）。

### 初步使用

```sh
# 一般来说 --colocate 都是要加的，表示创建一个兼容 Git 的仓库。这个指令也可以在现有 git 仓库执行。
jj git init --colocate

# 前文提到，jj 的开发模式是直接在提交树上进行开发。`jj new` 的意思是以 [args] 为父节点，创建一个虚拟 commit（`@`）进行开发
# `trunk()` 代表当前的主分支（main, master 或任何名称）。
jj new 'trunk()'

# 为当前的工作区 `@` 添加一个描述。（不进行 commit，多次添加描述会覆盖之前的描述）
jj desc -m '123'

# 相当于执行了 desc + new，将当前的更改保存到一个新的 commit
jj commit -m '123'

# 推送到远端。jj 的 push 默认就使用 --force-with-lease，并且智能识别你是否真正修改了内容，强行同步到远端。
# 同样的，jj 也有本地 bookmark 和远端 bookmark（例如 xxx@origin）的概念。上传之前，我们需要：
# 1. 创建或移动本地 bookmark 到你想要的位置
# 2. 如果没有设置本地 track 远端，需要设置一下 track
#    - `jj bookmark track branch_name --remote=origin`
# 3. 然后再进行推送
jj git push --tracked

# jj 的 push 默认是指定 --remote=origin。如果需要为非 origin 的上游进行 push 需要手动指定，否则报 Nothing changed.
jj git push --tracked --remote=xxx

# 移动最近的 bookmark 到 @，因为 bookmark 不会像 git branch 那样自己动。
jj bookmark advance

# 为 @ 添加 bookmark
jj bookmark set -r @ xxx
```

### 进阶

```sh
# 丢弃当前的更改，回到上一个 commit 的状态。相当于 `git reset --hard HEAD`。
jj abandon

# jj new 里可以指定任意数量的父级分支，相当于更强大的 git merge
jj new xx1 yy2 zz3

# 从某个提交里恢复文件，相当于 git checkout xxx -- filename
jj restore --from xxx filename
```

## external

1. [thoughtpolice/jjconfig.toml](https://gist.github.com/thoughtpolice/8f2fd36ae17cd11b8e7bd93a70e31ad6)
2. [Jujutsu VCS - Getting Started Guide](https://mkaz.blog/code/jujutsu-vcs/)
3. [A Better Merge Workflow with Jujutsu](https://ofcr.se/jujutsu-merge-workflow)
