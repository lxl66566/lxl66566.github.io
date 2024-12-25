import{_ as o,r,o as d,c as k,a as i,b as s,d as t,w as e,e as h}from"./app-BzilSif_.js";const c={},g=i("h1",{id:"js-运行时",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#js-运行时"},[i("span",null,"JS 运行时")])],-1),m=i("p",null,[s("现在也出现了很多新的 js/ts 集成开发环境（你们 Rust 人…），如 "),i("s",null,[i("a",{href:"https://swc.rs/",target:"_blank",rel:"noopener noreferrer"},"swc")]),s("（swc 是底层，不要直接用它）, "),i("a",{href:"https://bun.sh/",target:"_blank",rel:"noopener noreferrer"},"bun"),s(", "),i("a",{href:"https://deno.com/",target:"_blank",rel:"noopener noreferrer"},"deno"),s(" 等。这些新 runtime 对 TypeScript 的支持都非常好。")],-1),u=i("p",null,[s("Node.js 是 js 运行时 + npm 包管理 + corepack，前端开发"),i("strong",null,"必装"),s("。毕竟公司的运行时用的一定是最老牌最稳定的 Node.js。")],-1),y=i("p",null,"Node.js 正在计划原生支持 ts，不过截至 2024 尚未实装。",-1),b=i("p",null,"Node.js 的原生 command 和文件系统 API 都很难用。",-1),f=i("p",null,"bun 是 Rust 写的 js 运行时，自带包管理器，并且比 deno 快。",-1),B=i("p",null,[i("a",{href:"https://bun.sh/guides/runtime",target:"_blank",rel:"noopener noreferrer"},"bun 的一些 API 设计"),s("非常对我的胃口，特别是 system command。")],-1),v=i("ul",null,[i("li",null,"不过跨平台差了点。我在 2023 年就尝试过 bun 了。当时刚宣布支持 windows，结果疯狂 crash，就是一坨。不过现在倒是稳定了许多，即使现在还是有很多 crash 报告。")],-1),F=i("p",null,"deno 我也试用过了一下，没啥感觉。",-1),A=h(`<h2 id="包管理" tabindex="-1"><a class="header-anchor" href="#包管理"><span>包管理</span></a></h2><p>nodejs 常见的就 npm, yarn, pnpm 三件套，现在的框架文档也基本会同时给出这三个包管理器的命令。其他的 js 运行时或许有自带包管理（bun），这样统一也不错。</p><ul><li><a href="#npm">npm</a> 为 Node.js 的自带官方包管理器，挺难用的，安装又慢，进度条又假。当然由于 nodejs 自带，普及率非常广。</li><li>yarn 在早期比 npm 强，卖点是可复现性。然而现在优势<a href="https://zhuanlan.zhihu.com/p/27449990" target="_blank" rel="noopener noreferrer">貌似不大</a>。</li><li><a href="#pnpm">pnpm</a> 使用硬链接，一块硬盘上同一个依赖不会被复制多次，在节省空间上具有很大优势。安装速度也非常快。但普及度还是略逊一筹（可能难以找到非常规问题解法），并且老项目兼容性会差一点。</li></ul><p>节省磁盘空间对我来说真的很加分，因此我使用 pnpm。由于其文档并不面向初心者，建议先熟悉 npm 命令后，再使用 pnpm 命令。</p><h3 id="pnpm" tabindex="-1"><a class="header-anchor" href="#pnpm"><span>pnpm</span></a></h3><p><a href="https://pnpm.io/zh/pnpm-cli#%E5%91%BD%E4%BB%A4%E8%A1%8C" target="_blank" rel="noopener noreferrer">用前必读</a></p><ul><li>如果直接使用 <code>pnpm i</code> 安装依赖后运行报错（而在 npm/yarn 上表现良好），请使用 <code>pnpm i --shamefully-hoist</code> 安装依赖！<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></li><li><code>npm init ...</code> == <code>pnpm create ...</code></li></ul><h3 id="npm" tabindex="-1"><a class="header-anchor" href="#npm"><span>npm</span></a></h3><p>我已不再使用 npm。npm 比起其他包管理器有太多不足了，除非公司强制使用，否则我不用。</p><details class="hint-container details"><summary>archive</summary><h4 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令"><span>基本命令</span></a></h4><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> search</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">   # 查找包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [option] </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 安装包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> list</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -g</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --depth=0</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">   # 列出全局包，不包含依赖</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> update</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -g</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">   # Update all global</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> uninstall</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">package_nam</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">e</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [option] </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 卸载包及其依赖</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><a href="https://www.runoob.com/w3cnote/npm-switch-repo.html" target="_blank" rel="noopener noreferrer">镜像</a></li></ul><h4 id="其他命令" tabindex="-1"><a class="header-anchor" href="#其他命令"><span>其他命令</span></a></h4><ul><li><p>如果需要重装所有 <code>node_modules</code>，可在 bash 中：<code>rm -rf node_modules &amp;&amp; npm cache clear --force</code></p></li><li><p>更新依赖(<a href="https://juejin.cn/post/6844903827599015944" target="_blank" rel="noopener noreferrer">ref</a>)：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> npm-check</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm-check</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -u</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="关于-save" tabindex="-1"><a class="header-anchor" href="#关于-save"><span>关于 --save</span></a></h4><p>有时候会看到 <code>npm i xxx --save</code>，<code>--save</code> 是写入 <code>package.json</code> 的过程，而 npm 5 之后 install 会自动 save，不需要手动指定。一句话：<strong>不用加</strong>。</p></details><h3 id="关于-lockfile" tabindex="-1"><a class="header-anchor" href="#关于-lockfile"><span>关于 lockfile</span></a></h3><blockquote><p>对于不同的包管理器，lockfile 的名称不同。</p></blockquote><p>在 <code>package.json</code> 的包版本信息是使用<a href="https://eminoda.github.io/2021/01/29/npm-semver-strategy/" target="_blank" rel="noopener noreferrer">版本修饰符</a>，允许上下浮动的。并且依赖、依赖的依赖……都可能不固定版本。然而版本不同就有可能导致错误，此时就需要使用 lockfile 进行精确版本的指定。</p><p>若 lockfile 不存在，install/update 时会自动生成。若存在且 lockfile 版本符合 <code>package.json</code> 版本，则从 lockfile 中安装依赖。若 lockfile 不兼容 <code>package.json</code>，则 pnpm/npm 会直接更新 lockfile 或报错退出（因此，强烈建议将 lockfile 添加到 git 版本控制中<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup>）。</p><p>很遗憾，目前我没有找到任何方法使我能够严格依照 lockfile 进行依赖安装：在冲突时使用 <code>--frozen-lockfile</code> 参数，npm 会直接忽略之并写入 lockfile，pnpm/yarn 会报错并终止。同样的，<code>npm init -y</code> | <code>npm-collect</code> 都无法完成此任务。</p><h3 id="npx" tabindex="-1"><a class="header-anchor" href="#npx"><span>npx</span></a></h3><p>npx 是一个执行脚本的 nodejs 附属物。其实际上做的是临时拉取某个 bin 包并执行，但是不太好用的样子。</p><p>因此我们也可以 <code>pnpm/yarn install -g &lt;bin&gt; &amp;&amp; &lt;bin&gt; ...</code> 安装到全局再执行，或者 install as dep 后，在 <code>./node_modules/.bin/&lt;bin&gt;</code> 下手动调用执行。</p><h3 id="查询包大小" tabindex="-1"><a class="header-anchor" href="#查询包大小"><span>查询包大小</span></a></h3><p>查询 install size 可以使用 <a href="https://packagephobia.com/" target="_blank" rel="noopener noreferrer">Package Phobia</a>。</p><h2 id="运行时特性" tabindex="-1"><a class="header-anchor" href="#运行时特性"><span>运行时特性</span></a></h2><h3 id="输入" tabindex="-1"><a class="header-anchor" href="#输入"><span>输入</span></a></h3><p>JS/TS 有一个很大的特点，就是对于 console 输入、文件系统等实现并不是由语言本身，而是由 runtime 提供的 builtin package 完成的。因此这部分内容在不同的 runtime 上需要实现不同的代码。这其中自然就有 API 设计的优劣之分。</p>`,23),E=i("p",null,"deno 支持 prompt API：",-1),C=i("div",{class:"language-ts line-numbers-mode","data-highlighter":"shiki","data-ext":"ts","data-title":"ts",style:{"--shiki-light":"#24292e","--shiki-dark":"#abb2bf","--shiki-light-bg":"#fff","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"alert"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},'"Please acknowledge the message."'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"); "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#7F848E","--shiki-light-font-style":"inherit","--shiki-dark-font-style":"italic"}},"// 相当于带消息的 pause")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"confirm"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},'"Do you want to proceed?"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"); "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#7F848E","--shiki-light-font-style":"inherit","--shiki-dark-font-style":"italic"}},"// yN 选择器")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"prompt"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},'"Please enter your name:"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"); "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#7F848E","--shiki-light-font-style":"inherit","--shiki-dark-font-style":"italic"}},"// input")])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1),_=i("p",null,"但是 prompt API 有一个巨大的问题：无法不带 prompt。这是例子：",-1),D=i("div",{class:"language-ts line-numbers-mode","data-highlighter":"shiki","data-ext":"ts","data-title":"ts",style:{"--shiki-light":"#24292e","--shiki-dark":"#abb2bf","--shiki-light-bg":"#fff","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"prompt"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"(); "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#7F848E","--shiki-light-font-style":"inherit","--shiki-dark-font-style":"italic"}},'// 会在用户输入前打印 "Prompt "')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"prompt"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},'""'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"); "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#7F848E","--shiki-light-font-style":"inherit","--shiki-dark-font-style":"italic"}},'// 会在用户输入前打印 " "')])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1),x=i("p",null,"prompt api 总是会想要打印一点东西，我是真的没绷住。",-1),j=i("p",null,"bun 官方提供了一个示例：",-1),q=i("div",{class:"language-ts line-numbers-mode","data-highlighter":"shiki","data-ext":"ts","data-title":"ts",style:{"--shiki-light":"#24292e","--shiki-dark":"#abb2bf","--shiki-light-bg":"#fff","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}},"for"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}}," await"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," ("),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}},"const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#E5C07B"}}," line"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}}," of"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}}," console"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},") {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"}")])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1),w=i("p",null,[s("但是问题是我并不知道如何仅读取一行输入。如果每次都要在 for 循环里读入然后 break 也太傻了。然而翻了 "),i("a",{href:"https://stackoverflow.com/questions/78247715/",target:"_blank",rel:"noopener noreferrer"},"SO 的回答"),s(" 和 "),i("a",{href:"https://github.com/oven-sh/bun/issues/7541",target:"_blank",rel:"noopener noreferrer"},"关联的 issue"),s("，并没有其他解法，还是 break 大法好。")],-1),R=i("p",null,"bun 也同时支持 prompt API，不过如前文 deno 所述，有一个问题。",-1),S=i("p",null,[i("a",{href:"https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs",target:"_blank",rel:"noopener noreferrer"},"nodejs 的 api"),s(" 又臭又长，暂且不论。")],-1),T=i("h3",{id:"system-command",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#system-command"},[i("span",null,"system command")])],-1),P=i("p",null,"目前的 js runtime 里，system command 我只服 bun 一个。他的语法实在是太简洁了。",-1),N=i("div",{class:"language-ts line-numbers-mode","data-highlighter":"shiki","data-ext":"ts","data-title":"ts",style:{"--shiki-light":"#24292e","--shiki-dark":"#abb2bf","--shiki-light-bg":"#fff","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes github-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}},"import"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," { "),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}},"$"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," } "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}},"from"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},' "bun"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}},"let"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}}," res"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}}," await"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}}," $"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},"`ls .`"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}},"for"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}}," ("),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}},"const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#E5C07B"}}," line"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#C678DD"}}," of"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}}," res"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"stdout"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"toString"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"()."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"split"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},'"'),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#56B6C2"}},"\\n"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#98C379"}},'"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},")) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E5C07B"}},"  console"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#61AFEF"}},"log"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E06C75"}},"line"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},");")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#ABB2BF"}},"}")])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1),I=h(`<h2 id="遇到的问题" tabindex="-1"><a class="header-anchor" href="#遇到的问题"><span>遇到的问题</span></a></h2><blockquote><p>时间倒序</p></blockquote><h2 id="标准输入" tabindex="-1"><a class="header-anchor" href="#标准输入"><span>标准输入</span></a></h2><p>nodejs 想实现在 terminal 内的标准输入甚至需要对 async/await 模型有一点了解。</p><p>首先，<code>import readline from &quot;readline&quot;;</code> 的 readline 是非阻塞的。回调函数会在用户输入后才执行，但在 readline 前的代码就惨了。。</p><p>其次，<code>&quot;readline&quot;</code> 本身没有提供 Promise。因此需要这样：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> readline</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;node:readline/promises&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> rl</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> readline</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">createInterface</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">process</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">stdin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> element</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> of</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> data</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">  do_something_pre</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> answer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> rl</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">question</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;?&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">  do_something_after</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>才能让 <code>pre()</code> 与 <code>after()</code> 都呈现阻塞的效果。</p><h2 id="脚本调库" tabindex="-1"><a class="header-anchor" href="#脚本调库"><span>脚本调库</span></a></h2><p>有时我们可能会想在简单的脚本中调用第三方 nodejs 库。但使用包管理器后，又带来了不必要的复杂度。</p><p>当我为了调库而创建了一个项目后，首先需要填写一堆信息。当然，只是写点小脚本完全可以不填，一路回车。然后再安装需要的包。</p><p>然而，在代码中直接使用 <code>require</code> 调库会报错：</p><blockquote><p>ReferenceError: require is not defined in ES module scope, you can use import instead</p></blockquote><p>而使用 <code>import</code> 又会报：</p><blockquote><p>SyntaxError: Cannot use import statement outside a module</p></blockquote><p>在 <code>package.json</code> 中添加 <code>&quot;type&quot;: &quot;module&quot;,</code> 后，才能算是结束。</p><h3 id="神秘报错" tabindex="-1"><a class="header-anchor" href="#神秘报错"><span>神秘报错</span></a></h3><p>nodejs 出错的报错基本上是没用的，因为一般出现玄学问题是依赖包的问题而不是用户的问题（笑）。</p>`,18),J=i("code",null,"--shamefully-hoist",-1),z=i("li",null,[i("a",{href:"https://github.com/DIYgod/RSSHub/issues/13007",target:"_blank",rel:"noopener noreferrer"},"vuepress1 文档构建失败"),s("：webpack 与 nodejs 之间的碰撞！我甚至想到了降级 nodejs 到 LTS，但没想到的是连 LTS v18 也不行，得降到 v17......")],-1),O=h(`<h3 id="安装-sharp" tabindex="-1"><a class="header-anchor" href="#安装-sharp"><span>安装 sharp</span></a></h3><p>我想使用 sharp 作为图像处理库。而直接 <code>npm i sharp</code> 会报错：</p><div class="language-text line-numbers-mode" data-highlighter="shiki" data-ext="text" data-title="text" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>npm ERR! code 1</span></span>
<span class="line"><span>npm ERR! path D:\\program\\koishi-app\\node_modules\\sharp</span></span>
<span class="line"><span>npm ERR! command failed</span></span>
<span class="line"><span>npm ERR! command C:\\WINDOWS\\system32\\cmd.exe /d /s /c (node install/libvips &amp;&amp; node install/dll-copy &amp;&amp; prebuild-install) || (node install/can-compile &amp;&amp; node-gyp rebuild &amp;&amp; node install/dll-copy)</span></span>
<span class="line"><span>npm ERR! sharp: Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.14.3/libvips-8.14.3-win32-x64.tar.br</span></span>
<span class="line"><span>npm ERR! sharp: Please see https://sharp.pixelplumbing.com/install for required dependencies</span></span>
<span class="line"><span>npm ERR! sharp: Installation error: Request timed out</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尝试：</p><ol><li><p>更换其他 npm 源，无法解决。</p></li><li><p>使用 <code>--ignore-scripts</code> 选项，能够安装，但无法启动 koishi 服务器：</p><blockquote><p>app Error: <br> Something went wrong installing the &quot;sharp&quot; module<br> Cannot find module &#39;../build/Release/sharp-win32-x64.node&#39;</p></blockquote></li><li><p>尝试执行(<a href="https://sharp.pixelplumbing.com/install#chinese-mirror" target="_blank" rel="noopener noreferrer">ref</a>)：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> sharp_binary_host</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;https://npmmirror.com/mirrors/sharp&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> sharp_libvips_binary_host</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;https://npmmirror.com/mirrors/sharp-libvips&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>报错</p><blockquote><p>npm ERR! code ENOWORKSPACES<br> npm ERR! This command does not support workspaces.</p></blockquote></li></ol><p>难道真的山穷水尽了吗？不！再次 <code>npm i sharp</code> 后，经过漫长的等待，终于安装成功了！并且服务器也没有报错！</p><p>总之，还是挺玄学的。</p><h3 id="cors-policy" tabindex="-1"><a class="header-anchor" href="#cors-policy"><span>CORS policy</span></a></h3><p>在单文件 html 内写 js 时调试，总会遇到 CORS policy 问题，即不允许访问本地文件。解法很简单，开个 local server (!= localhost) 跑 html 就完事了。 在文件目录下 <code>python -m http.server</code>，打开浏览器访问 <code>localhost:8000</code>，点击要调试的 html 即可。<span class="heimu" title="你知道的太多了">20230603：我是铸币</span></p><p>这种方法只能避开访问 localhots 的跨域，不能避开 fetch 其他网站的跨域。如果对于确定的网站资源，可以 <em>curl</em> 到本地再引入。</p><h2 id="external" tabindex="-1"><a class="header-anchor" href="#external"><span>external</span></a></h2><ol><li><a href="https://javascript.plainenglish.io/npm-vs-pnpm-vs-yarn-which-package-manager-reigns-supreme-a942d17a2051" target="_blank" rel="noopener noreferrer">npm vs pnpm vs Yarn — Which Package Manager Reigns Supreme?</a></li><li><a href="https://wooyun.js.org/drops/%E5%8A%A0%E7%9B%90hash%E4%BF%9D%E5%AD%98%E5%AF%86%E7%A0%81%E7%9A%84%E6%AD%A3%E7%A1%AE%E6%96%B9%E5%BC%8F.html" target="_blank" rel="noopener noreferrer">加盐 hash 保存密码的正确方式</a></li></ol><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>感谢 Asuka Minato 解答；大概是有依赖不支持 pnpm 的目录模式。 <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li><li id="footnote2" class="footnote-item"><p><a href="https://t.me/withabsolutex/1216" target="_blank" rel="noopener noreferrer">惨痛教训</a> <a href="#footnote-ref2" class="footnote-backref">↩︎</a></p></li></ol></section>`,14);function Z(L,V){const p=r("RouteLink"),l=r("Tabs");return d(),k("div",null,[g,i("blockquote",null,[i("p",null,[i("em",null,[s("（js/ts 语言有关请"),t(p,{to:"/coding/tsjs.html"},{default:e(()=>[s("跳转 JavaScript/TypeScript")]),_:1}),s("）")])])]),m,t(l,{id:"11",data:[{id:"node.js"},{id:"bun"},{id:"deno"}]},{title0:e(({value:a,isActive:n})=>[s("node.js")]),title1:e(({value:a,isActive:n})=>[s("bun")]),title2:e(({value:a,isActive:n})=>[s("deno")]),tab0:e(({value:a,isActive:n})=>[u,y,b]),tab1:e(({value:a,isActive:n})=>[f,B,v]),tab2:e(({value:a,isActive:n})=>[F]),_:1}),A,t(l,{id:"170",data:[{id:"deno"},{id:"bun"},{id:"nodejs"}]},{title0:e(({value:a,isActive:n})=>[s("deno")]),title1:e(({value:a,isActive:n})=>[s("bun")]),title2:e(({value:a,isActive:n})=>[s("nodejs")]),tab0:e(({value:a,isActive:n})=>[E,C,_,D,x]),tab1:e(({value:a,isActive:n})=>[j,q,w,R]),tab2:e(({value:a,isActive:n})=>[S]),_:1}),T,t(l,{id:"205",data:[{id:"bun"}]},{title0:e(({value:a,isActive:n})=>[s("bun")]),tab0:e(({value:a,isActive:n})=>[P,N]),_:1}),I,i("ol",null,[i("li",null,[s("pnpm 安装 "),t(p,{to:"/coding/bot.html"},{default:e(()=>[s("koishi")]),_:1}),s(" 依赖的问题，dev 的时候遇到神秘报错，而使用 npm 安装却不会报错。需要使用 "),J,s(" 生成与 npm 一样的扁平化目录。")]),z]),O])}const M=o(c,[["render",Z],["__file","nodejs.html.vue"]]),Y=JSON.parse('{"path":"/coding/nodejs.html","title":"JS 运行时","lang":"zh-CN","frontmatter":{"date":"2023-07-24T00:00:00.000Z","icon":"brands fa-node-js","category":["编程"],"tag":["工具","前端"],"description":"JS 运行时 （js/ts 语言有关请） 现在也出现了很多新的 js/ts 集成开发环境（你们 Rust 人…），如 （swc 是底层，不要直接用它）, bun, deno 等。这些新 runtime 对 TypeScript 的支持都非常好。 包管理 nodejs 常见的就 npm, yarn, pnpm 三件套，现在的框架文档也基本会同时给出这三个...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/coding/nodejs.html"}],["meta",{"property":"og:site_name","content":"绝对值_x的博客"}],["meta",{"property":"og:title","content":"JS 运行时"}],["meta",{"property":"og:description","content":"JS 运行时 （js/ts 语言有关请） 现在也出现了很多新的 js/ts 集成开发环境（你们 Rust 人…），如 （swc 是底层，不要直接用它）, bun, deno 等。这些新 runtime 对 TypeScript 的支持都非常好。 包管理 nodejs 常见的就 npm, yarn, pnpm 三件套，现在的框架文档也基本会同时给出这三个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-02T18:05:19.000Z"}],["meta",{"property":"article:tag","content":"工具"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:published_time","content":"2023-07-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-02T18:05:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JS 运行时\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-11-02T18:05:19.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"包管理","slug":"包管理","link":"#包管理","children":[{"level":3,"title":"pnpm","slug":"pnpm","link":"#pnpm","children":[]},{"level":3,"title":"npm","slug":"npm","link":"#npm","children":[]},{"level":3,"title":"关于 lockfile","slug":"关于-lockfile","link":"#关于-lockfile","children":[]},{"level":3,"title":"npx","slug":"npx","link":"#npx","children":[]},{"level":3,"title":"查询包大小","slug":"查询包大小","link":"#查询包大小","children":[]}]},{"level":2,"title":"运行时特性","slug":"运行时特性","link":"#运行时特性","children":[{"level":3,"title":"输入","slug":"输入","link":"#输入","children":[]},{"level":3,"title":"system command","slug":"system-command","link":"#system-command","children":[]}]},{"level":2,"title":"遇到的问题","slug":"遇到的问题","link":"#遇到的问题","children":[]},{"level":2,"title":"标准输入","slug":"标准输入","link":"#标准输入","children":[]},{"level":2,"title":"脚本调库","slug":"脚本调库","link":"#脚本调库","children":[{"level":3,"title":"神秘报错","slug":"神秘报错","link":"#神秘报错","children":[]},{"level":3,"title":"安装 sharp","slug":"安装-sharp","link":"#安装-sharp","children":[]},{"level":3,"title":"CORS policy","slug":"cors-policy","link":"#cors-policy","children":[]}]},{"level":2,"title":"external","slug":"external","link":"#external","children":[]}],"git":{"createdTime":1690137964000,"updatedTime":1730570719000,"contributors":[{"name":"lxl66566","email":"18259734087@163.com","commits":11},{"name":"lxl66566","email":"lxl66566@gmail.com","commits":9}]},"readingTime":{"minutes":7.81,"words":2342},"filePathRelative":"coding/nodejs.md","localizedDate":"2023年7月24日","excerpt":"\\n","autoDesc":true}');export{M as comp,Y as data};
