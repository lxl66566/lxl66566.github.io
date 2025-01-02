---
date: 2022-09-06
icon: brands fa-github
category:
  - 编程
  - 教程
tag:
  - 工具
---

# Github

[跳转官网](https://github.com/)

Github 是全球最大的~~同性交友平台~~ 源代码托管服务平台，拥有良好的开源生态，是开发者的圣地。<span class="heimu" title="你知道的太多了">（我乱写的）</span>

## 给新人

::: details 如果你没听说过 Github，或者知道它但却不会下载，请看完此条目

- 首先，github 服务器在国外，国内访问速度慢且有几率连接不上。请：
  - 使用校园网访问
  - 使用加速器访问，如 [steam++](../farraginous/recommend_packages.md#steam) 或 [dev-sidecar](https://github.com/docmirror/dev-sidecar)
  - 科学上网
  - 更换访问时间段

> 顺带一提，本博客也部署在 Github 上（如果域名是 lxl66566.github.io 的话），所以想在此博客获得更好的阅读体验，请同样采纳上述建议。

- 其次，你需要一定英语能力，或者会使用机翻。

## 下载文件

打开仓库后，点击 releases（发行版）。

![下载文件](/images/coding/github/releases.png)

在最底下找到 Assets，下载你需要的条目。

![下载文件](/images/coding/github/assets.png)

- Q: Releases 栏显示 No releases published ？

A: 开发者并未发布 release.

1. 请查看仓库页面下的 README.md 对该仓库的解释。
2. 可能源码就是文件本身，请点击 Code -> Download ZIP 下载源码。

- Q: 这么多文件到底要下载哪一个？
  ![下载文件](/images/coding/github/packages.png)

A: 此处我假设会看此条目的都是 Windows&Android 用户。

1. 排除源码与大小明显不正常的文件（如图中的 sha256sum）。
2. 按照后缀选择，排除后缀**不是**以下格式的：
   - Windows 压缩包格式（.7z/.zip/.rar）
   - 可执行文件格式（.exe）
   - Android 安装包（.apk）
3. 然后根据你的喜好选择安装版（可执行文件）或者免安装版（压缩包）。建议新人下载安装版。
4. 关于 apk 文件：
   - 如果文件名带有 v7a,v8a 的：请[查看手机指令集](../articles/mobile/Android_ISA.md)，然后按结果选择。
   - 如果实在无法判断，优先选择更上方的。

## 上传文件

在此之前，你需要有一个 Github 账号，创建一个属于你自己的仓库。

Github 只支持 Git 作为唯一的版本库格式进行托管。相关内容请跳转[编程-工具-Git](./Git.md)。
:::

## 下载仓库

直接点击 _Download ZIP_ 仅下载仓库文件，不包含 `.git` 仓库。可以使用 CDN 加速：`https://codeload.github.com/<your name>/<repo name>/zip/<branch name>`

在需要拉取 `.git` 仓库时，可以用 clone, pull, fetch 等拉取指令，一般使用 [clone](./Git.md#下载)。

## markdown 增强

冷知识，Github 的 markdown 也可以用提示块，[src](https://github.com/orgs/community/discussions/16925)。

## 合并 Pull Request

你是一个仓库 owner，有人对仓库发起了 pr。如果你愿意全盘接受改动，可以简单地在网页上点击 merge 即可。如果需要修改细节而对方没开写权限<span class="heimu" title="你知道的太多了">OR 不想亲自动手</span>，那就在网页上提出 review 叫对方改，改到满意为止<span class="heimu" title="你知道的太多了">~~堪比黑心资本家~~</span>。而这里讲的是第三种情形，即需要修改细节而对方提供写权限，owner 亲自进行修改并 merge 的方法。

> 为什么不使用 codespace 呢？因为它确实难用（

1. 拉取到本地：可以使用 Github CLI 完成。
   - 在 pull request 界面右上角点击 _Code - Local - Checkout with GitHub CLI_，复制指令。
   - 安装 [Github CLI](https://cli.github.com/)，运行指令。
2. 将提交树上的 HEAD 设为最新的，属于 Contributor 的远程分支：`git checkout <branch>`（[参考 Git](./Git.md)）
3. 修改
4. 提交
5. rebase 一下，想干啥干啥，~~注释稀烂就删注释，提交没压就 squash 一下~~。
6. push 到自己的 remote 即可。

此时进入 Github pull request 界面一看，发现已经是 _Merged_ 的状态了。

## 搜索技巧

搜索格式与你的关键词使用空格隔开。你也可以使用 [Github 官方提供的高级搜索](https://github.com/search/advanced)界面。

<!-- prettier-ignore -->
|格式|作用|样例|
| :-: | :-: | :-: |
|in:name|指定搜索仓库名称|`in:name words english`|
|in:description|指定搜索摘要|类比|
|in:readme|指定搜索readme文档|类比|
|stars:|指定星数范围|`stars:<50`<br/>`stars:>100`<br/>`stars:50..100`|
|fork:|指定fork数范围|类比|
|language:|指定程序语言|`language:c#`|
|pushed:|指定最近更新时间范围|`pushed:>2022-01-01`|
|path:|指定匹配文件名，例如 path:*.toml|

在这里查看[代码搜索](https://docs.github.com/zh/search-github/github-code-search/understanding-github-code-search-syntax)的详细信息。

不过，对于代码搜索，我建议使用第三方提供的 [grep app](https://grep.app/)，这玩意是真的快。

- fork 项目默认不出现在搜索页面。而 `fork:only` 仅搜索其 fork 项目，非常好用。
  - 也可以用第三方的工具：[active-forks](https://techgaun.github.io/active-forks/index.html) 进行搜索。
- 如何查看最新的一次提交记录？([src](https://www.cnblogs.com/saysmy/p/7292177.html))（github 的翻页做的真的垃圾。）

## 批量下载 Release

我需要批量下载某个 Release 中的所有文件。首先，**需要保证这个仓库是 Public 的**。<span class="heimu" title="你知道的太多了">被坑了，我是傻杯</span>

- 一个方法是手动复制所有链接，然后用 [Ditto](../farraginous/recommend_packages.md#ditto) 批量粘贴到 AriaNgGUI/IDM 等下载器下载。
  - 由于我使用 XDM 而批量下载抽风了，于是只好使用 aria2 下载。
- 另一个方法是用命令行下载([ref](https://www.bilibili.com/read/cv21459907))。例如在 Archlinux 上：
  ```sh
  sudo pacman -S aria2 jq
  curl -s https://api.github.com/repos/<USERNAME>/<REPONAME>/releases/latest | jq -r '.assets[].browser_download_url' | aria2c -c -s 16 -x 16 -k 1M -i -
  ```

## Github Workflow

Github 工作流，极为强大。可以理解为一个性能强悍的虚拟机帮你跑任务。[官方文档](https://docs.github.com/cn/actions/using-workflows/about-workflows)

使用方法：在项目根目录下，新建 `.github/workflows/<name>.yml`.

### Trigger

ex.

```yml
on:
  workflow_dispatch:
  schedule:
    - cron: "30 00 * * *"
```

定时任务: 使用 cron 表达式。[此处](https://crontab.guru/)可在线计算表达式。

> 注意，定时任务时间为中时区（UTC），并且会出现 0-60+ min 的延时，若有精确执行需求请使用其他服务商提供的云函数

手动任务：使用 `workflow_dispatch`；建议每个 workflow 都加一个方便调试。不要再使用 `on:push` 进行**手动运行控制**。

### 杂

- if 的外面会自动包 `${{ }}`，不需要手动包，否则会出现预料之外的行为。

### 调试

- [action-tmate](https://github.com/mxschmitt/action-tmate) 提供了 ssh 进入 action 环境里调试的方法，不过这是违反使用协定的，有被封号的风险。
- [act](https://github.com/nektos/act) 提供了 github action docker，可以在本地模拟 action 环境。

## Powerful CI

这里列出一些我常用的 CI。顺带一提，CI 就是 Continuous Integration，在每次代码操作后自动进行一系列检查或服务更新部署，简化操作流程。

写在这里的 CI 理论上应该是语言无关的。如果需要特定编程语言的 CI，可以去对应语言页面查看。

学习写 CI？不用学习，多看多抄，会用 template 就懂了。

### [typos](https://github.com/crate-ci/typos)

检查你的英文水平（检查代码拼写错误）。rust 写的，速度极快，即使不用 CI 也可以在本地用，方便修复。

```yml
- name: Check Spelling
  uses: crate-ci/typos@v1.23.3
```

本地用就

```sh
cargo binstall typos-cli
typos     # 检查
typos -w  # 纠正
```

### [cache](https://github.com/actions/cache)

缓存构建中的依赖项，加速 CI。比较适合大型项目，依赖很多，经常跑 CI 的那种。个人的小仓库就有点鸡肋了，不如不开 cahce，多花 10 秒钟构建省 300MB 空间，不为 Github 想想也得为 SSD 想想吧~~（虽然不是我的，但爱是平等的）~~。

每个仓库免费 10 GB 的存储空间，应该是 Github 官方提供的(?)，真富啊。

有问题去看官方文档，他这个写的还是不差的。这里随手举一个 rust 项目的例子。

```yml
- name: Cache dependencies installed with cargo
  uses: actions/cache@v4
  with:
    path: |
      ~/.cargo/bin/
      ~/.cargo/registry/index/
      ~/.cargo/registry/cache/
      ~/.cargo/git/db/
      target/
    key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
    restore-keys: ${{ runner.os }}-cargo-
```

### [sccache-action](https://github.com/Mozilla-Actions/sccache-action)

方便地使用 [sccache](https://github.com/mozilla/sccache/) 的 CI。这个和上面的 cache 不太一样，sccache 提供更智能的 cache 而不是暴力缓存 `./target`。

使用也非常简单，对 rust 来说，设置两个 env，编译前 use 一下就行。编译后还可以打印。

## Powerful APPs

Github APPs 是不同于 CI 的一种自动化功能，它们可以更加自由、更加灵活地帮你操作存储库。当然，并不是所有 APP 都是免费的（毕竟是 APP 提供的服务），你也只能使用 APP 本身有的功能，而不像 CI 那样可以自己写任意指令。

### 自动更新依赖

Github 仓库一多，就免不了自动升级依赖。Github 有一些 APP 可以帮你做到这一点。一般来说，项目还需要有测试能跑，并且测试覆盖率越高越好，这样才不会在自动依赖更新时炸掉项目，自己还不知道。

我的要求是自动更新依赖 + 自动跑测试 + 自动合并，并且只有在测试通过时才能合并。

::: tabs

@tab renovate bot

renovate bot 是一个更加强大的依赖管理 APP。据说是因为 dependabot 非常保守，不肯支持新的语言，它才出现的。renovate bot 自身就支持多语言的依赖升级 + 自动合并。

但是 renovate bot 的文档简直就是一坨大便，我摸索了很久才得以一窥门道。

1. renovate bot [支持引用其他配置文件](https://docs.renovatebot.com/config-presets/)。也就是我可以在一个单独的 Github 存储库里放一个通用配置，就可以在各个库里引用这同一份配置，这样比较好统一更改。
2. renovate bot 的配置项 Reference 在[这里](https://docs.renovatebot.com/configuration-options)。当然这么多不可能每个都看一遍，只能去网上抄其他人的。这里是我的一个模板样例：
   ```json
   {
     "$schema": "https://docs.renovatebot.com/renovate-schema.json",
     "extends": ["config:base"],
     "timezone": "Asia/Shanghai",
     "semanticCommits": "enabled",
     "schedule": ["on the first day of the week"],
     "commitMessagePrefix": "chore(deps): ",
     "automerge": true,
     "automergeStrategy": "rebase",
     "platformAutomerge": true,
     "vulnerabilityAlerts": {
       "enabled": true,
       "automerge": true
     }
   }
   ```

@tab dependabot

dependabot 是老牌的自动更新 APP 了，Github 官方推出的，还不错。

以 rust 项目为例，只需要在 `.github/dependabot.yml` 写：

```yml
version: 2
updates:
  - package-ecosystem: "cargo"
    directory: "/"
    schedule:
      interval: "weekly"
```

即可。首次启用记得在 Security 里开启 dependabot。

至于 auto merge，我试过了 [dependabot-auto-merger](https://github.com/marketplace/dependabot-auto-merger)，但是其并不能正常合并。即使我已经设置了 branch protect rules 也不行。

## external

1. [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
2. [使用 sccache 加快 Rust 编译速度](https://xuanwo.io/reports/2022-45/)
