import{_ as o,r as n,o as s,c,a as l,b as e,d as r,w as a,e as t}from"./app-DMpk9M0D.js";const d={},h=t('<h1 id="vscode" tabindex="-1"><a class="header-anchor" href="#vscode"><span>VSCode</span></a></h1><div class="subtitle">——neovim 死里配，不如 vscode 同步一根毛</div><p>我是 vscode 的重度使用者，所有的编程行为 all in vscode。虽说是 electron 电子垃圾，但它确实强大且开箱即用。<em>（据说是优化得很好的电子垃圾，来源请求）</em></p><p>在 linux 端我曾尝试抛弃 vscode，转向 neovim，但是几天后即放弃。</p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><p>在 <em>设置</em> 页右上角可以 <code>打开设置（json）</code>，我经常需要直接编辑配置文件。<a href="https://github.com/lxl66566/my-key-data/blob/main/config/vscode/settings.json" target="_blank" rel="noopener noreferrer">这里</a>是我的全局配置文件。</p><h3 id="快捷键" tabindex="-1"><a class="header-anchor" href="#快捷键"><span>快捷键</span></a></h3><p>这里是我比较常用的快捷键。</p><ul><li><code>Ctrl + ,</code>：打开设置</li><li><code>Ctrl + `</code>：打开终端</li><li><code>Ctrl + r</code>（资源管理器窗口）：选择打开最近项目</li><li><code>Ctrl + p</code> / <code>Ctrl + e</code>：选择打开文件</li><li><code>Ctrl + Shift + p</code>：操作面板</li><li><code>Alt + 鼠标</code>：多光标模式，最重要的快捷键之一，可以和 vim 扩展共用，可以大幅提升效率</li></ul><p>你可以在<a href="https://code.visualstudio.com/assets/docs/getstarted/tips-and-tricks/KeyboardReferenceSheet.png" target="_blank" rel="noopener noreferrer">这里</a>看到快捷键 cheetsheet。可以看出有很多从 vim 来的常见操作；并且在 vim 插件下这里的一些快捷键也会改变。</p><p>还有，许多编辑器用 <code>Ctrl + d</code> 克隆当前行，但是 vscode 默认不用这个键绑定。所以可以去设置里把这个动作改为 <code>Ctrl + d</code>。(<a href="https://stackoverflow.com/questions/70120201" target="_blank" rel="noopener noreferrer">ref</a>)</p><h2 id="插件" tabindex="-1"><a class="header-anchor" href="#插件"><span>插件</span></a></h2><p>编程需要有好用的工具，编程语言的流行离不开好用的 linter, highlighter, formatter。</p><p>插件系统是 vscode 的精髓。正由于活跃的插件系统，vscode 才能如此强大。这里放出我使用的插件（可能有过时的选项）：</p>',14),p=t('<li>通用： <ul><li><a href="#ai-%E4%BB%A3%E7%A0%81%E8%A1%A5%E5%85%A8">AI 代码补全</a></li><li>更好的警告：<em>Error Lens</em><ul><li>不可否认 <em>SonarLint</em> 很强，但是 java 写的，占用空间和 RAM 都很大。因此在使用了几年 <em>SonarLint</em> 以后我选择分语言使用不同 linter。</li></ul></li><li>轻量级 Git 可视化：<em>Git Graph</em></li><li>代码格式化：<em>Prettier - Code formatter</em>（主要用于 markdown</li><li>编辑器：<em>Vim</em><ul><li><a href="https://github.com/microsoft/vscode/issues/75627#issuecomment-1114048271" target="_blank" rel="noopener noreferrer">添加如下配置</a>可以降低 vim 插件的延迟。</li></ul></li><li>跨语言依赖更新：<em>Dependi</em></li></ul></li><li>markdown：<em>Markdown Preview Enhanced</em></li><li>前端：<em>Auto Rename Tag</em>，<em>Oxc</em><ul><li>Vue: <em>Vue - Official</em></li></ul></li>',3),m=l("em",null,"Clang-Tidy",-1),u=l("em",null,"Clang-Format",-1),g=l("em",null,"Pylance",-1),f=l("em",null,"Ruff",-1),v=t("<li>rust：<em>Cargo</em>，<em>cargo-crate-completer</em>，<em>Even Better TOML</em>，<em>rust-analyzer</em></li><li>java：<em>Language Support for Java(TM) by Red Hat</em>，<em>Test Runner for Java</em></li><li><s>kotlin：<em>Kotlin Language</em>，<em>vscode-runner</em></s> 不要用 vscode 写 kotlin</li><li>verilog：<em>verilog-formatter</em>（有点记不太清了）</li>",4),k=l("em",null,"Octave",-1),b=l("em",null,"Octave Formatter",-1),_=l("li",null,[e("Typst："),l("em",null,"Typst LSP")],-1),C=l("li",null,[e("数据库："),l("em",null,"SQLite Viewer")],-1),x=l("li",null,[e("协同："),l("em",null,"Live Share")],-1),y=l("li",null,[e("其他："),l("em",null,"Chinese (Simplified)..."),e("，"),l("em",null,"CodeSnap")],-1),A=t(`<h3 id="ai-代码补全" tabindex="-1"><a class="header-anchor" href="#ai-代码补全"><span>AI 代码补全</span></a></h3><p>我的刚需是：免费（考虑付费的话直接上 copilot 完事了），可部分禁用。</p><details><summary>点击展开前言</summary><p>我最早使用的是 Tabnine，后面由于一些契机换了 Codeium；然而它在 RAMDisk 上工作得很差：由于其在 windows 上使用 <code>%TEMP%</code> 作为存储目录，每天首次打开 vscode 会加载失败，重新下载数据。于是 20230918 尝试换用 CodeGeeX。这个模型比较小，补全速度快；而且最主要是由于国内服务器，免去了科学上网带来的大量延迟。</p><p>用久了感觉 CodeGeeX 不够智能，又尝试其他插件。</p></details><p>非国产：</p><ul><li><a href="https://codeium.com/" target="_blank" rel="noopener noreferrer">Codeium</a>：国外在线服务 <ul><li>下载会显示进度和大小，好评</li></ul></li><li><a href="https://docs.codegpt.co/" target="_blank" rel="noopener noreferrer">Code GPT</a>：需要自己提供 API KEY 或本地跑模型，不考虑</li><li><a href="https://www.tabnine.com/" target="_blank" rel="noopener noreferrer">Tabnine</a>：补全较弱（<em>Short code completions (2 to 3 words)</em>）</li><li><a href="https://github.com/sourcegraph/cody" target="_blank" rel="noopener noreferrer">Cody</a>：官网进不去，插件装了，下载其他东西时 503。评价是垃圾。</li><li><a href="https://github.com/TabbyML/tabby" target="_blank" rel="noopener noreferrer">tabby</a>：本地模型，但是支持的语言有限</li><li><a href="https://www.continue.dev/" target="_blank" rel="noopener noreferrer">Continue</a>：需要自己提供 API KEY 或本地跑模型</li><li><a href="https://supermaven.com/" target="_blank" rel="noopener noreferrer">supermaven</a>：免费补全，联想能力不错，但是 vscode 插件目前闭源。</li></ul><p>国产：</p><ul><li><a href="https://code.fittentech.com/" target="_blank" rel="noopener noreferrer">fitten code</a>：国产，水平跟其他国产模型都差不多，不太聪明。 <ul><li>一个很大的缺点是不读工作区 <code>.vscode</code> 配置，也就是无法在某些项目（隐私项目如日记等）里禁用。</li></ul></li><li><a href="https://www.marscode.com/" target="_blank" rel="noopener noreferrer">MarsCode</a>：一直报 Network unstable，根本不可用，捞。</li><li><a href="https://codegeex.cn/" target="_blank" rel="noopener noreferrer">CodeGeeX</a>：国产开源模型，响应速度快 <ul><li>20231212 开始需要绑定手机号</li><li>比较扰民，会入侵 <em>快速修复</em></li></ul></li><li><a href="https://tongyi.aliyun.com/lingma" target="_blank" rel="noopener noreferrer">通义灵码</a>：阿里的，用起来还行，略逊于 Codeium 的水平。 <ul><li>这货也挺扰民的，每个函数间都会被插入一个通义的标志。插的位置还烂，rust 如果多行注释的话就会插在注释中间。。</li><li>20240914 更新，出现双保存现象，即一次 <code>Ctrl + S</code> 后，文件仍然处于未保存状态。对照实验发现是通义灵码的问题。</li></ul></li></ul><p>关于 API：</p><ul><li>chat api，gemini 1.5 是免费的</li><li>code 补全 API 的话，deepseek api 比较便宜</li></ul><h3 id="插件管理" tabindex="-1"><a class="header-anchor" href="#插件管理"><span>插件管理</span></a></h3><ul><li>分析：当插件数量多了以后，每次启动都耗时很久，甚至卡在某个插件的启动上。此时需要 <code>Ctrl + Shift + p</code> 打开操作面板，进入 <em>Developer: Show Running Extensions</em>，可以看到插件状态与启动用时。</li><li>禁用内置：<a href="https://github.com/microsoft/vscode/issues/40239" target="_blank" rel="noopener noreferrer">想屁吃，根本没有</a></li></ul><h3 id="插件黑名单" tabindex="-1"><a class="header-anchor" href="#插件黑名单"><span>插件黑名单</span></a></h3><p>我踩到的坑</p><ul><li>Even Better Comments：启动卡死</li></ul><h2 id="feature" tabindex="-1"><a class="header-anchor" href="#feature"><span>feature</span></a></h2><p>vscode 的特色：</p><ul><li>前文的插件系统不再赘述</li><li><strong>设置同步</strong>，可以瞬间在其他平台搭好最适合自己的开发环境。（这也是小标题的由来）</li><li>集成全文搜索（ripgrep）；linux 下需要自己 <code>find</code> / <code>grep</code></li><li>集成 git 图形化界面，虽说我不用且功能不多，但是对不会用 git 的新手非常友好</li><li>多光标支持</li></ul><h2 id="主题" tabindex="-1"><a class="header-anchor" href="#主题"><span>主题</span></a></h2><p>得益于 electron，vscode 可以很容易地更换主题。<code>Ctrl + Shift + P</code> 输入 theme 选择即可。</p><p>我个人喜欢用的是 <em>Monokai Dimmed</em>。我也曾试过一些其他主题，Nord 感觉对眼睛还是不够友好。</p><h2 id="正则匹配" tabindex="-1"><a class="header-anchor" href="#正则匹配"><span>正则匹配</span></a></h2><p>vscode 的正则匹配<a href="https://github.com/microsoft/vscode/issues/39404#issuecomment-348710460" target="_blank" rel="noopener noreferrer">使用两个不同的引擎</a>，因此可能无法使用某些正则语法。</p><p>要匹配所有中文，请使用 <code>[一-龥]</code>。(<a href="https://superuser.com/questions/983441/visual-studio-search-through-code-for-chinese-text" target="_blank" rel="noopener noreferrer">ref</a>)</p><h2 id="协同编辑" tabindex="-1"><a class="header-anchor" href="#协同编辑"><span>协同编辑</span></a></h2><p>有时候需要帮别人处理代码时，协同编辑是一个非常不错的选择。</p><ol><li>安装 <em>Live Share</em></li><li>发送链接给对方</li><li>同意连接请求</li><li>给对方权限，例如读写，或终端执行代码</li></ol><h2 id="小技巧" tabindex="-1"><a class="header-anchor" href="#小技巧"><span>小技巧</span></a></h2><ul><li>可以把某个关键字标成自己选择的颜色 (<a href="https://t.me/c/1264662201/584813" target="_blank" rel="noopener noreferrer">ref</a>)<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;editor.semanticTokenColorCustomizations&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">  &quot;rules&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">    &quot;*.unsafe:rust&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;#eb5046&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">},</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="编写插件" tabindex="-1"><a class="header-anchor" href="#编写插件"><span>编写插件</span></a></h2><p>我写过一个 <a href="https://github.com/lxl66566/anyformatter-vscode" target="_blank" rel="noopener noreferrer">anyformatter</a>。</p><h3 id="上传" tabindex="-1"><a class="header-anchor" href="#上传"><span>上传</span></a></h3><p>编写完插件以后需要发布到 market。</p><p>我不爱用那些令牌啥的，因此我选择直接 <a href="https://marketplace.visualstudio.com/manage" target="_blank" rel="noopener noreferrer">https://marketplace.visualstudio.com/manage</a>，然后把打出来的 .vsix 文件拖到这里即可。</p><h2 id="关于-cursor" tabindex="-1"><a class="header-anchor" href="#关于-cursor"><span>关于 cursor</span></a></h2><p><a href="https://www.cursor.com/pricing" target="_blank" rel="noopener noreferrer">Cursor</a> 是 AI 时代下的，基于 VSCode 的 IDE，其将 AI 深度集成到了编辑器内。Cursor 全兼容 VSCode，所以可以快速抢占市场。</p><p>我曾今在早期用过一次 Cursor，用的提问 API 是 Gemini，补全 API 是 deepseek，感觉不太行。这也是因为模型本身不够聪明。第二次入坑是新号注册，这一段时间内 cursor 也把用户体验补起来了一点，并且我也免费（试）用 claude-3.5-sonnet，这下就感觉舒服多了。直接写了一个 <a href="https://github.com/lxl66566/Telegram-RSS-Bot-on-Cloudflare-Workers" target="_blank" rel="noopener noreferrer">Telegram-RSS-Bot-on-Cloudflare-Workers</a>。虽然细微部分还是手改，但是确实好用很多，tab 补全也很智能。</p><p>入坑 cursor 前，最好先去 b 站找个视频快速过一遍，自己摸索很容易丧失耐心。</p>`,37),w=t('<h3 id="设置" tabindex="-1"><a class="header-anchor" href="#设置"><span>设置</span></a></h3><p>cursor 基于 vscode，但是有些地方还是做了些修改，非常卡手。建议 vsc 人入坑 cursor 的时候进行这些设置：</p><ol><li>恢复左侧纵向图标栏：<code>&quot;workbench.activityBar.orientation&quot;: &quot;vertical&quot;</code> (<a href="https://www.maemo.cc/2024/10/23/edit-cursor-activitybar-orientation.html" target="_blank" rel="noopener noreferrer">src</a>)</li><li>终端允许 Ctrl + V 粘贴：<code>&quot;terminal.integrated.sendKeybindingsToShell&quot;: false</code> （vscode 默认允许终端粘贴）</li></ol><h3 id="无限续" tabindex="-1"><a class="header-anchor" href="#无限续"><span>无限续</span></a></h3><p>Cursor 无限续主要是靠无限流邮箱注册 + id 清除器。</p><h2 id="其他评价" tabindex="-1"><a class="header-anchor" href="#其他评价"><span>其他评价</span></a></h2><ul><li>vscode 的可自定义程度还不够高</li><li>有一些官方插件太臃肿了（例如 <em>python</em>，<em>C/C++</em>）</li><li>没法控制插件行为和权限 <ul><li>（比如某个看似没啥用的插件向我的 C 盘写入了 6GB 的缓存，说的就是你，<em>SonarLint</em>！）</li><li>（比如 java 的插件天天申请公共网络访问权限）</li></ul></li></ul><h2 id="external" tabindex="-1"><a class="header-anchor" href="#external"><span>external</span></a></h2><ol><li><a href="https://www.ruanyifeng.com/blog/2024/07/copilot-vs-marscode.html" target="_blank" rel="noopener noreferrer">AI 编程助手测评：GitHub Copilot vs 豆包 MarsCode</a></li></ol>',9);function E(S,B){const i=n("RouteLink");return s(),c("div",null,[h,l("ul",null,[p,l("li",null,[e("C++："),m,e("，"),u,e("，详见"),r(i,{to:"/coding/Cpp.html#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83"},{default:a(()=>[e("开发环境")]),_:1})]),l("li",null,[e("python："),g,e("，"),f,e("，详见"),r(i,{to:"/coding/python.html#vscode-%E6%89%A9%E5%B1%95"},{default:a(()=>[e("Python")]),_:1})]),v,l("li",null,[e("octave："),k,e("，"),b,e("，详见"),r(i,{to:"/coding/octave.html#ide"},{default:a(()=>[e("octave")]),_:1})]),_,C,x,y]),A,l("p",null,[e("cursor 难用的地方，我写在"),r(i,{to:"/gossip/fuckxxx.html#cursor-%E6%9C%89%E5%A4%9A%E9%9A%BE%E7%94%A8"},{default:a(()=>[e("这里")]),_:1}),e("。")]),w])}const V=o(d,[["render",E],["__file","vscode.html.vue"]]),q=JSON.parse('{"path":"/coding/vscode.html","title":"VSCode","lang":"zh-CN","frontmatter":{"date":"2023-08-31T00:00:00.000Z","icon":"file-pen","category":["编程","教程"],"tag":["工具"],"description":"VSCode ——neovim 死里配，不如 vscode 同步一根毛 我是 vscode 的重度使用者，所有的编程行为 all in vscode。虽说是 electron 电子垃圾，但它确实强大且开箱即用。（据说是优化得很好的电子垃圾，来源请求） 在 linux 端我曾尝试抛弃 vscode，转向 neovim，但是几天后即放弃。 使用 在 设置 ...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/coding/vscode.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"VSCode"}],["meta",{"property":"og:description","content":"VSCode ——neovim 死里配，不如 vscode 同步一根毛 我是 vscode 的重度使用者，所有的编程行为 all in vscode。虽说是 electron 电子垃圾，但它确实强大且开箱即用。（据说是优化得很好的电子垃圾，来源请求） 在 linux 端我曾尝试抛弃 vscode，转向 neovim，但是几天后即放弃。 使用 在 设置 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-19T17:34:46.000Z"}],["meta",{"property":"article:tag","content":"工具"}],["meta",{"property":"article:published_time","content":"2023-08-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-19T17:34:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"VSCode\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-31T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-19T17:34:46.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[{"level":3,"title":"快捷键","slug":"快捷键","link":"#快捷键","children":[]}]},{"level":2,"title":"插件","slug":"插件","link":"#插件","children":[{"level":3,"title":"AI 代码补全","slug":"ai-代码补全","link":"#ai-代码补全","children":[]},{"level":3,"title":"插件管理","slug":"插件管理","link":"#插件管理","children":[]},{"level":3,"title":"插件黑名单","slug":"插件黑名单","link":"#插件黑名单","children":[]}]},{"level":2,"title":"feature","slug":"feature","link":"#feature","children":[]},{"level":2,"title":"主题","slug":"主题","link":"#主题","children":[]},{"level":2,"title":"正则匹配","slug":"正则匹配","link":"#正则匹配","children":[]},{"level":2,"title":"协同编辑","slug":"协同编辑","link":"#协同编辑","children":[]},{"level":2,"title":"小技巧","slug":"小技巧","link":"#小技巧","children":[]},{"level":2,"title":"编写插件","slug":"编写插件","link":"#编写插件","children":[{"level":3,"title":"上传","slug":"上传","link":"#上传","children":[]}]},{"level":2,"title":"关于 cursor","slug":"关于-cursor","link":"#关于-cursor","children":[{"level":3,"title":"设置","slug":"设置","link":"#设置","children":[]},{"level":3,"title":"无限续","slug":"无限续","link":"#无限续","children":[]}]},{"level":2,"title":"其他评价","slug":"其他评价","link":"#其他评价","children":[]},{"level":2,"title":"external","slug":"external","link":"#external","children":[]}],"git":{"createdTime":1693466847000,"updatedTime":1737308086000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":20},{"name":"lxl66566","email":"18259734087@163.com","commits":11}]},"readingTime":{"minutes":7.04,"words":2111},"filePathRelative":"coding/vscode.md","localizedDate":"2023年8月31日","excerpt":"\\n","autoDesc":true}');export{V as comp,q as data};
