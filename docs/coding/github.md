---
sidebar: 'auto'
---
# Github
[跳转官网](https://github.com/)

Github是全球最大的~~同性交友平台~~ 源代码托管服务平台，拥有良好的开源生态，是开发者的圣地。<span class="heimu" title="你知道的太多了">（我乱写的）</span>

## 给新人
如果你没听说过 Github，或者知道它但却不会下载，请看完此条目。

* 首先，github服务器在国外，国内访问速度慢且有几率连接不上。请：
    * 使用校园网访问
    * 使用加速器访问，如 [steam++](../farraginous/recommend_packages.md#steam) 或 [dev-sidecar](https://github.com/docmirror/dev-sidecar)
    * 科学上网
    * 更换访问时间段

> 顺带一提，本博客也部署在 Github 上（如果域名是 lxl66566.github.io 的话），所以想在此博客获得更好的阅读体验，请同样采纳上述建议。

* 其次，你需要一定英语能力，或者会使用机翻。

## 下载文件
打开仓库后，点击releases（发行版）。

![下载文件](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/github/releases.png)

在最底下找到Assets，下载你需要的条目。

![下载文件](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/github/assets.png)

* Q: Releases 栏显示 No releases published ？

A: 开发者并未发布release.
1. 请查看仓库页面下的 README.md 对该仓库的解释。
2. 可能源码就是文件本身，请点击 Code -> Download ZIP 下载源码。
* Q: 这么多文件到底要下载哪一个？
![下载文件](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/github/packages.png)

A: 此处我假设会看此条目的都是Windows&Android用户。
1. 排除源码与大小明显不正常的文件（如图中的sha256sum）。
2. 按照后缀选择，排除后缀**不是**以下格式的：
    * Windows压缩包格式（.7z/.zip/.rar）
    * 可执行文件格式（.exe）
    * Android安装包（.apk）
3. 然后根据你的喜好选择安装版（可执行文件）或者免安装版（压缩包）。建议新人下载安装版。
4. 关于apk文件：
    * 如果文件名带有v7a,v8a的：请[查看手机指令集](../articles/Android_ISA.md)，然后按结果选择。
    * 如果实在无法判断，优先选择更上方的。
## 上传文件
在此之前，你需要有一个 Github 账号，创建一个属于你自己的仓库。

Github 只支持 Git 作为唯一的版本库格式进行托管。相关内容请跳转[编程-工具-Git](./Git.md)。
## 下载仓库
几种方法都可使用，请选择以下一种，自行查指令。
1. `git clone`
2. `git init && git pull`
3. `git init && git fetch && git checkout`

下面的一个方法下载仓库文件而不包含 .git 信息：
4. CDN：`https://codeload.github.com/<your name>/<repo name>/zip/<branch name>`
## 搜索技巧
搜索格式与你的关键词使用空格隔开。你也可以使用 [Github 官方提供的高级搜索](https://github.com/search/advanced)界面。

|格式|作用|样例|
| :-: | :-: | :-: |
|in:name|指定搜索仓库名称|`in:name words english`|
|in:description|指定搜索摘要|类比|
|in:readme|指定搜索readme文档|类比|
|stars:|指定星数范围|`stars:<50`<br/>`stars:>100`<br/>`stars:50..100`|
|fork:|指定fork数范围|类比|
|language:|指定程序语言|`language:c#`|
|pushed:|指定最近更新时间范围|`pushed:>2022-01-01`|
## Github Workflow
Github 工作流，极为强大。可以理解为一个虚拟机。[官方文档](https://docs.github.com/cn/actions/using-workflows/about-workflows)

使用方法：在项目根目录下，新建 `.github/workflows/<name>.yml`.
### Trigger
ex.
```yml
on:
  workflow_dispatch:
  schedule:
    - cron: '30 00 * * *'
```
定时任务: 使用 cron 表达式。[此处](https://crontab.guru/)可在线计算表达式。
> 注意，定时任务时间为中时区（UTC），并且会出现 0-60+ min 的延时，若有精确执行需求请使用其他服务商提供的云函数

手动任务：使用 `workflow_dispatch`。强烈建议不要再使用 `on:push` 进行手动运行控制。