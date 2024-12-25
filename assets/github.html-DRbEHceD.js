import{_ as n,r,o as h,c as d,a as i,b as e,d as t,w as a,g as p,e as l}from"./app-BzilSif_.js";const o="/images/coding/github/releases.png",c="/images/coding/github/assets.png",k="/images/coding/github/packages.png",g={},u=l('<h1 id="github" tabindex="-1"><a class="header-anchor" href="#github"><span>Github</span></a></h1><p><a href="https://github.com/" target="_blank" rel="noopener noreferrer">跳转官网</a></p><p>Github 是全球最大的<s>同性交友平台</s> 源代码托管服务平台，拥有良好的开源生态，是开发者的圣地。<span class="heimu" title="你知道的太多了">（我乱写的）</span></p><h2 id="给新人" tabindex="-1"><a class="header-anchor" href="#给新人"><span>给新人</span></a></h2>',4),b={class:"hint-container details"},m=i("summary",null,"如果你没听说过 Github，或者知道它但却不会下载，请看完此条目",-1),y=i("li",null,"使用校园网访问",-1),f=i("a",{href:"https://github.com/docmirror/dev-sidecar",target:"_blank",rel:"noopener noreferrer"},"dev-sidecar",-1),v=i("li",null,"科学上网",-1),_=i("li",null,"更换访问时间段",-1),C=l('<blockquote><p>顺带一提，本博客也部署在 Github 上（如果域名是 lxl66566.github.io 的话），所以想在此博客获得更好的阅读体验，请同样采纳上述建议。</p></blockquote><ul><li>其次，你需要一定英语能力，或者会使用机翻。</li></ul><h2 id="下载文件" tabindex="-1"><a class="header-anchor" href="#下载文件"><span>下载文件</span></a></h2><p>打开仓库后，点击 releases（发行版）。</p><figure><img src="'+o+'" alt="下载文件" tabindex="0" loading="lazy"><figcaption>下载文件</figcaption></figure><p>在最底下找到 Assets，下载你需要的条目。</p><figure><img src="'+c+'" alt="下载文件" tabindex="0" loading="lazy"><figcaption>下载文件</figcaption></figure><ul><li>Q: Releases 栏显示 No releases published ？</li></ul><p>A: 开发者并未发布 release.</p><ol><li>请查看仓库页面下的 README.md 对该仓库的解释。</li><li>可能源码就是文件本身，请点击 Code -&gt; Download ZIP 下载源码。</li></ol><ul><li>Q: 这么多文件到底要下载哪一个？ <img src="'+k+'" alt="下载文件" loading="lazy"></li></ul><p>A: 此处我假设会看此条目的都是 Windows&amp;Android 用户。</p>',12),B=i("li",null,"排除源码与大小明显不正常的文件（如图中的 sha256sum）。",-1),A=i("li",null,[e("按照后缀选择，排除后缀"),i("strong",null,"不是"),e("以下格式的： "),i("ul",null,[i("li",null,"Windows 压缩包格式（.7z/.zip/.rar）"),i("li",null,"可执行文件格式（.exe）"),i("li",null,"Android 安装包（.apk）")])],-1),x=i("li",null,"然后根据你的喜好选择安装版（可执行文件）或者免安装版（压缩包）。建议新人下载安装版。",-1),F=i("li",null,"如果实在无法判断，优先选择更上方的。",-1),w=i("h2",{id:"上传文件",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#上传文件"},[i("span",null,"上传文件")])],-1),E=i("p",null,"在此之前，你需要有一个 Github 账号，创建一个属于你自己的仓库。",-1),D=i("h2",{id:"下载仓库",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#下载仓库"},[i("span",null,"下载仓库")])],-1),G=i("p",null,[e("直接点击 "),i("em",null,"Download ZIP"),e(" 仅下载仓库文件，不包含 "),i("code",null,".git"),e(" 仓库。可以使用 CDN 加速："),i("code",null,"https://codeload.github.com/<your name>/<repo name>/zip/<branch name>")],-1),q=i("code",null,".git",-1),I=l('<h2 id="markdown-增强" tabindex="-1"><a class="header-anchor" href="#markdown-增强"><span>markdown 增强</span></a></h2><p>冷知识，Github 的 markdown 也可以用提示块，<a href="https://github.com/orgs/community/discussions/16925" target="_blank" rel="noopener noreferrer">src</a>。</p><h2 id="合并-pull-request" tabindex="-1"><a class="header-anchor" href="#合并-pull-request"><span>合并 Pull Request</span></a></h2><p>你是一个仓库 owner，有人对仓库发起了 pr。如果你愿意全盘接受改动，可以简单地在网页上点击 merge 即可。如果需要修改细节而对方没开写权限<span class="heimu" title="你知道的太多了">OR 不想亲自动手</span>，那就在网页上提出 review 叫对方改，改到满意为止<span class="heimu" title="你知道的太多了"><s>堪比黑心资本家</s></span>。而这里讲的是第三种情形，即需要修改细节而对方提供写权限，owner 亲自进行修改并 merge 的方法。</p><blockquote><p>为什么不使用 codespace 呢？因为它确实难用（</p></blockquote>',5),R=i("li",null,[e("拉取到本地：可以使用 Github CLI 完成。 "),i("ul",null,[i("li",null,[e("在 pull request 界面右上角点击 "),i("em",null,"Code - Local - Checkout with GitHub CLI"),e("，复制指令。")]),i("li",null,[e("安装 "),i("a",{href:"https://cli.github.com/",target:"_blank",rel:"noopener noreferrer"},"Github CLI"),e("，运行指令。")])])],-1),z=i("code",null,"git checkout <branch>",-1),N=i("li",null,"修改",-1),T=i("li",null,"提交",-1),P=i("li",null,[e("rebase 一下，想干啥干啥，"),i("s",null,"注释稀烂就删注释，提交没压就 squash 一下"),e("。")],-1),M=i("li",null,"push 到自己的 remote 即可。",-1),S=i("p",null,[e("此时进入 Github pull request 界面一看，发现已经是 "),i("em",null,"Merged"),e(" 的状态了。")],-1),Z=i("h2",{id:"搜索技巧",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#搜索技巧"},[i("span",null,"搜索技巧")])],-1),L=i("p",null,[e("搜索格式与你的关键词使用空格隔开。你也可以使用 "),i("a",{href:"https://github.com/search/advanced",target:"_blank",rel:"noopener noreferrer"},"Github 官方提供的高级搜索"),e("界面。")],-1),V=l('<table><thead><tr><th style="text-align:center;">格式</th><th style="text-align:center;">作用</th><th style="text-align:center;">样例</th></tr></thead><tbody><tr><td style="text-align:center;">in:name</td><td style="text-align:center;">指定搜索仓库名称</td><td style="text-align:center;"><code>in:name words english</code></td></tr><tr><td style="text-align:center;">in:description</td><td style="text-align:center;">指定搜索摘要</td><td style="text-align:center;">类比</td></tr><tr><td style="text-align:center;">in:readme</td><td style="text-align:center;">指定搜索readme文档</td><td style="text-align:center;">类比</td></tr><tr><td style="text-align:center;">stars:</td><td style="text-align:center;">指定星数范围</td><td style="text-align:center;"><code>stars:&lt;50</code><br><code>stars:&gt;100</code><br><code>stars:50..100</code></td></tr><tr><td style="text-align:center;">fork:</td><td style="text-align:center;">指定fork数范围</td><td style="text-align:center;">类比</td></tr><tr><td style="text-align:center;">language:</td><td style="text-align:center;">指定程序语言</td><td style="text-align:center;"><code>language:c#</code></td></tr><tr><td style="text-align:center;">pushed:</td><td style="text-align:center;">指定最近更新时间范围</td><td style="text-align:center;"><code>pushed:&gt;2022-01-01</code></td></tr><tr><td style="text-align:center;">path:</td><td style="text-align:center;">指定匹配文件名，例如 path:*.toml</td><td style="text-align:center;"></td></tr></tbody></table><p>在这里查看<a href="https://docs.github.com/zh/search-github/github-code-search/understanding-github-code-search-syntax" target="_blank" rel="noopener noreferrer">代码搜索</a>的详细信息。</p><p>不过，对于代码搜索，我建议使用第三方提供的 <a href="https://grep.app/" target="_blank" rel="noopener noreferrer">grep app</a>，这玩意是真的快。</p><ul><li>fork 项目默认不出现在搜索页面。而 <code>fork:only</code> 仅搜索其 fork 项目，非常好用。 <ul><li>也可以用第三方的工具：<a href="https://techgaun.github.io/active-forks/index.html" target="_blank" rel="noopener noreferrer">active-forks</a> 进行搜索。</li></ul></li><li>如何查看最新的一次提交记录？(<a href="https://www.cnblogs.com/saysmy/p/7292177.html" target="_blank" rel="noopener noreferrer">src</a>)（github 的翻页做的真的垃圾。）</li></ul><h2 id="批量下载-release" tabindex="-1"><a class="header-anchor" href="#批量下载-release"><span>批量下载 Release</span></a></h2><p>我需要批量下载某个 Release 中的所有文件。首先，<strong>需要保证这个仓库是 Public 的</strong>。<span class="heimu" title="你知道的太多了">被坑了，我是傻杯</span></p>',6),W=i("ul",null,[i("li",null,"由于我使用 XDM 而批量下载抽风了，于是只好使用 aria2 下载。")],-1),$=l(`<li>另一个方法是用命令行下载(<a href="https://www.bilibili.com/read/cv21459907" target="_blank" rel="noopener noreferrer">ref</a>)。例如在 Archlinux 上：<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pacman</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -S</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> aria2</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> jq</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> https://api.github.com/repos/</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">USERNAM</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">E</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">REPONAM</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">E</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">/releases/latest</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> jq</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;.assets[].browser_download_url&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> aria2c</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -s</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 16</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -x</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 16</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -k</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1M</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> -</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),j=l(`<h2 id="github-workflow" tabindex="-1"><a class="header-anchor" href="#github-workflow"><span>Github Workflow</span></a></h2><p>Github 工作流，极为强大。可以理解为一个性能强悍的虚拟机帮你跑任务。<a href="https://docs.github.com/cn/actions/using-workflows/about-workflows" target="_blank" rel="noopener noreferrer">官方文档</a></p><p>使用方法：在项目根目录下，新建 <code>.github/workflows/&lt;name&gt;.yml</code>.</p><h3 id="trigger" tabindex="-1"><a class="header-anchor" href="#trigger"><span>Trigger</span></a></h3><p>ex.</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  workflow_dispatch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  schedule</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">cron</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;30 00 * * *&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定时任务: 使用 cron 表达式。<a href="https://crontab.guru/" target="_blank" rel="noopener noreferrer">此处</a>可在线计算表达式。</p><blockquote><p>注意，定时任务时间为中时区（UTC），并且会出现 0-60+ min 的延时，若有精确执行需求请使用其他服务商提供的云函数</p></blockquote><p>手动任务：使用 <code>workflow_dispatch</code>；建议每个 workflow 都加一个方便调试。不要再使用 <code>on:push</code> 进行<strong>手动运行控制</strong>。</p><h3 id="杂" tabindex="-1"><a class="header-anchor" href="#杂"><span>杂</span></a></h3><ul><li>if 的外面会自动包 <code>\${{ }}</code>，不需要手动包，否则会出现预料之外的行为。</li></ul><h3 id="powerful-ci" tabindex="-1"><a class="header-anchor" href="#powerful-ci"><span>Powerful CI</span></a></h3><p>这里列出一些我常用的 CI。顺带一提，CI 就是 Continuous Integration，在每次代码操作后自动进行一系列检查或服务更新部署，简化操作流程。</p><p>写在这里的 CI 理论上应该是语言无关的。如果需要特定编程语言的 CI，可以去对应语言页面查看。</p><p>学习写 CI？不用学习，多看多抄，会用 template 就懂了。</p><h4 id="dependabot" tabindex="-1"><a class="header-anchor" href="#dependabot"><span>dependabot</span></a></h4><p>为你的项目自动更新依赖，非常好用。不过需要你项目有一个 check PR 的 test CI，因为 dependabot 靠提 PR 修改代码。项目的测试覆盖率越高越好，这样才不会在自动依赖更新时炸掉项目，自己还不知道。</p><p>以 rust 项目为例，只需要在 <code>.github/dependabot.yml</code> （注意，不是 workflow 里）写：</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">updates</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">package-ecosystem</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;cargo&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    directory</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;/&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    schedule</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">      interval</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;weekly&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即可。首次启用记得在 Security 里开启 dependabot。</p><h5 id="auto-merge" tabindex="-1"><a class="header-anchor" href="#auto-merge"><span>auto merge</span></a></h5><p>使用 dependabot 后，项目一多，容易被通知消息刷屏。我希望在有写 test 的项目中，能够通过测试自动 merge。</p><p>我目前使用 <a href="https://github.com/marketplace/dependabot-auto-merger" target="_blank" rel="noopener noreferrer">dependabot-auto-merger</a>。注意，你的每个仓库都需要手动开启 branch protection ruleset。</p><h4 id="typos" tabindex="-1"><a class="header-anchor" href="#typos"><span><a href="https://github.com/crate-ci/typos" target="_blank" rel="noopener noreferrer">typos</a></span></a></h4><p>检查你的英文水平（检查代码拼写错误）。rust 写的，速度极快，即使不用 CI 也可以在本地用，方便修复。</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">Check Spelling</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">crate-ci/typos@v1.23.3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>本地用就</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">cargo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> binstall</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> typos-cli</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">typos</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">     # 检查</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">typos</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -w</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  # 纠正</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cache" tabindex="-1"><a class="header-anchor" href="#cache"><span><a href="https://github.com/actions/cache" target="_blank" rel="noopener noreferrer">cache</a></span></a></h4><p>缓存构建中的依赖项，加速 CI。比较适合大型项目，依赖很多，经常跑 CI 的那种。个人的小仓库就有点鸡肋了，不如不开 cahce，多花 10 秒钟构建省 300MB 空间，不为 Github 想想也得为 SSD 想想吧~~（虽然不是我的，但爱是平等的）~~。</p><p>每个仓库免费 10 GB 的存储空间，应该是 Github 官方提供的(?)，真富啊。</p><p>有问题去看官方文档，他这个写的还是不差的。这里随手举一个 rust 项目的例子。</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">Cache dependencies installed with cargo</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">actions/cache@v4</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  with</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    path</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">      ~/.cargo/bin/</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">      ~/.cargo/registry/index/</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">      ~/.cargo/registry/cache/</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">      ~/.cargo/git/db/</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">      target/</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    key</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">\${{ runner.os }}-cargo-\${{ hashFiles(&#39;**/Cargo.lock&#39;) }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    restore-keys</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">\${{ runner.os }}-cargo-</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sccache-action" tabindex="-1"><a class="header-anchor" href="#sccache-action"><span><a href="https://github.com/Mozilla-Actions/sccache-action" target="_blank" rel="noopener noreferrer">sccache-action</a></span></a></h4><p>方便地使用 <a href="https://github.com/mozilla/sccache/" target="_blank" rel="noopener noreferrer">sccache</a> 的 CI。这个和上面的 cache 不太一样，sccache 提供更智能的 cache 而不是暴力缓存 <code>./target</code>。</p><p>使用也非常简单，对 rust 来说，设置两个 env，编译前 use 一下就行。编译后还可以打印。</p><h4 id="调试" tabindex="-1"><a class="header-anchor" href="#调试"><span>调试</span></a></h4><ul><li><a href="https://github.com/mxschmitt/action-tmate" target="_blank" rel="noopener noreferrer">action-tmate</a> 提供了 ssh 进入 action 环境里调试的方法，不过这是违反使用协定的，有被封号的风险。</li><li><a href="https://github.com/nektos/act" target="_blank" rel="noopener noreferrer">act</a> 提供了 github action docker，可以在本地模拟 action 环境。</li></ul><h2 id="external" tabindex="-1"><a class="header-anchor" href="#external"><span>external</span></a></h2><ol><li><a href="https://www.conventionalcommits.org/zh-hans/v1.0.0/" target="_blank" rel="noopener noreferrer">约定式提交</a></li><li><a href="https://xuanwo.io/reports/2022-45/" target="_blank" rel="noopener noreferrer">使用 sccache 加快 Rust 编译速度</a></li></ol>`,40);function O(U,H){const s=r("RouteLink");return h(),d("div",null,[u,i("details",b,[m,i("ul",null,[i("li",null,[e("首先，github 服务器在国外，国内访问速度慢且有几率连接不上。请： "),i("ul",null,[y,i("li",null,[e("使用加速器访问，如 "),t(s,{to:"/farraginous/recommend_packages.html#steam"},{default:a(()=>[e("steam++")]),_:1}),e(" 或 "),f]),v,_])])]),C,i("ol",null,[B,A,x,i("li",null,[e("关于 apk 文件： "),i("ul",null,[i("li",null,[e("如果文件名带有 v7a,v8a 的：请"),t(s,{to:"/articles/mobile/Android_ISA.html"},{default:a(()=>[e("查看手机指令集")]),_:1}),e("，然后按结果选择。")]),F])])]),w,E,i("p",null,[e("Github 只支持 Git 作为唯一的版本库格式进行托管。相关内容请跳转"),t(s,{to:"/coding/Git.html"},{default:a(()=>[e("编程-工具-Git")]),_:1}),e("。")])]),D,G,i("p",null,[e("在需要拉取 "),q,e(" 仓库时，可以用 clone, pull, fetch 等拉取指令，一般使用 "),t(s,{to:"/coding/Git.html#%E4%B8%8B%E8%BD%BD"},{default:a(()=>[e("clone")]),_:1}),e("。")]),I,i("ol",null,[R,i("li",null,[e("将提交树上的 HEAD 设为最新的，属于 Contributor 的远程分支："),z,e("（"),t(s,{to:"/coding/Git.html"},{default:a(()=>[e("参考 Git")]),_:1}),e("）")]),N,T,P,M]),S,Z,L,p(" prettier-ignore "),V,i("ul",null,[i("li",null,[e("一个方法是手动复制所有链接，然后用 "),t(s,{to:"/farraginous/recommend_packages.html#ditto"},{default:a(()=>[e("Ditto")]),_:1}),e(" 批量粘贴到 AriaNgGUI/IDM 等下载器下载。 "),W]),$]),j])}const J=n(g,[["render",O],["__file","github.html.vue"]]),X=JSON.parse('{"path":"/coding/github.html","title":"Github","lang":"zh-CN","frontmatter":{"date":"2022-09-06T00:00:00.000Z","icon":"brands fa-github","category":["编程","教程"],"tag":["工具"],"description":"Github 跳转官网 Github 是全球最大的 源代码托管服务平台，拥有良好的开源生态，是开发者的圣地。（我乱写的） 给新人 如果你没听说过 Github，或者知道它但却不会下载，请看完此条目 首先，github 服务器在国外，国内访问速度慢且有几率连接不上。请： 使用校园网访问 使用加速器访问，如 或 dev-sidecar 科学上网 更换访问时...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/coding/github.html"}],["meta",{"property":"og:site_name","content":"绝对值_x的博客"}],["meta",{"property":"og:title","content":"Github"}],["meta",{"property":"og:description","content":"Github 跳转官网 Github 是全球最大的 源代码托管服务平台，拥有良好的开源生态，是开发者的圣地。（我乱写的） 给新人 如果你没听说过 Github，或者知道它但却不会下载，请看完此条目 首先，github 服务器在国外，国内访问速度慢且有几率连接不上。请： 使用校园网访问 使用加速器访问，如 或 dev-sidecar 科学上网 更换访问时..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://absx.pages.dev/images/coding/github/releases.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-14T17:34:14.000Z"}],["meta",{"property":"article:tag","content":"工具"}],["meta",{"property":"article:published_time","content":"2022-09-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-14T17:34:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Github\\",\\"image\\":[\\"https://absx.pages.dev/images/coding/github/releases.png\\",\\"https://absx.pages.dev/images/coding/github/assets.png\\",\\"https://absx.pages.dev/images/coding/github/packages.png\\"],\\"datePublished\\":\\"2022-09-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-14T17:34:14.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"给新人","slug":"给新人","link":"#给新人","children":[]},{"level":2,"title":"下载仓库","slug":"下载仓库","link":"#下载仓库","children":[]},{"level":2,"title":"markdown 增强","slug":"markdown-增强","link":"#markdown-增强","children":[]},{"level":2,"title":"合并 Pull Request","slug":"合并-pull-request","link":"#合并-pull-request","children":[]},{"level":2,"title":"搜索技巧","slug":"搜索技巧","link":"#搜索技巧","children":[]},{"level":2,"title":"批量下载 Release","slug":"批量下载-release","link":"#批量下载-release","children":[]},{"level":2,"title":"Github Workflow","slug":"github-workflow","link":"#github-workflow","children":[{"level":3,"title":"Trigger","slug":"trigger","link":"#trigger","children":[]},{"level":3,"title":"杂","slug":"杂","link":"#杂","children":[]},{"level":3,"title":"Powerful CI","slug":"powerful-ci","link":"#powerful-ci","children":[]}]},{"level":2,"title":"external","slug":"external","link":"#external","children":[]}],"git":{"createdTime":1662444810000,"updatedTime":1734197654000,"contributors":[{"name":"lxl66566","email":"18259734087@163.com","commits":12},{"name":"lxl66566","email":"lxl66566@gmail.com","commits":10}]},"readingTime":{"minutes":7.55,"words":2266},"filePathRelative":"coding/github.md","localizedDate":"2022年9月6日","excerpt":"\\n","autoDesc":true}');export{J as comp,X as data};
