import{_ as e,e as s,f as a,o as t}from"./app-DjPa-OFf.js";const l={};function h(n,i){return t(),s("div",null,i[0]||(i[0]=[a('<h1 id="yt-dlp-使用教程" tabindex="-1"><a class="header-anchor" href="#yt-dlp-使用教程"><span>yt-dlp 使用教程</span></a></h1><p><a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noopener noreferrer">yt-dlp</a> 是一个开源命令行视频/音频下载工具，远比那些闭源收费的视频下载扩展/软件好用。</p><p>但是，yt-dlp 也有一些缺点：</p><ul><li>对于某些 B 站视频可能无法选择最高清晰度</li><li>yt-dlp 不能下载任意网站的视频。要查看是否支持某网站，请直接搜 <a href="https://github.com/yt-dlp/yt-dlp/blob/master/Changelog.md" target="_blank" rel="noopener noreferrer">Changelog</a>。我主要用 yt-dlp 下载 youtube 与 bilibili 视频。</li><li>2024 年后期 Youtube 和 Chrome 同时增强了限制，导致现在下载 Youtube 的视频显得稍有麻烦。</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p>linux 上可以使用包管理器安装。</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pacman</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -S</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> yt-dlp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ffmpeg</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>windows 上请：</p><ol><li>前往<a href="https://github.com/yt-dlp/yt-dlp/releases" target="_blank" rel="noopener noreferrer">其 github release</a>，下载以 <code>.exe</code> 结尾的可执行文件。</li><li>放到 <code>C:\\Windows\\System32</code> 下。（比起操作环境变量，我更推荐这种方式）</li><li>(recommended) 安装 ffmpeg 用于音视频合并。</li></ol><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><p>以下例子中的视频仅做学习使用。</p><h3 id="基础下载" tabindex="-1"><a class="header-anchor" href="#基础下载"><span>基础下载</span></a></h3><p><code>yt-dlp &lt;video-link&gt;</code></p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yt-dlp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://www.bilibili.com/video/BV1wK41147Za</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>其会自动调用 ffmpeg 进行合并。</p><h3 id="选择画质-仅下载音频" tabindex="-1"><a class="header-anchor" href="#选择画质-仅下载音频"><span>选择画质/仅下载音频</span></a></h3><p>+ <code>-F</code></p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yt-dlp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://www.bilibili.com/video/BV1wK41147Za</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -F</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>然后在弹出的列表中，选择你需要的项目 ID ，并交给 <code>-f &lt;ID&gt;</code>：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yt-dlp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://www.bilibili.com/video/BV1wK41147Za</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 30216</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>注意，一次只能传入一个 <code>-f</code>（多的以最后一个为准），如果要下载多个项目，需要使用多条指令。</p><h3 id="手动合并" tabindex="-1"><a class="header-anchor" href="#手动合并"><span>手动合并</span></a></h3><p>当下载好（选择完画质的）视频后，可能需要手动合并音视频。此时需要用到 ffmpeg。</p><h4 id="单独合并" tabindex="-1"><a class="header-anchor" href="#单独合并"><span>单独合并</span></a></h4><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ffmpeg</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> input.mp4</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> input.m4a</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c:v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> copy</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c:a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> copy</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -strict</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> experimental</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> output.mp4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="批量合并" tabindex="-1"><a class="header-anchor" href="#批量合并"><span>批量合并</span></a></h4><p>linux 脚本，注意更改目标位置。</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">find</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;*.mp4&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -exec</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bash</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;file=&quot;{}&quot;; ffmpeg -nostats -i &quot;$file&quot; -i &quot;${file%.mp4}.m4a&quot; -c:v copy -c:a copy -strict experimental &quot;/home/absolutex/Videos/${file}&quot;&#39;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> \\;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="下载大会员视频" tabindex="-1"><a class="header-anchor" href="#下载大会员视频"><span>下载大会员视频</span></a></h3><p>你可能有下载 B 站版权保护视频（大会员专享）的需求，例如番剧、电视剧等，或者在 Youtube 新政策后下载 Youtube 视频。</p><p>此时需要用到 <code>--cookies-from-browser &lt;browser&gt;</code>。例如使用 chromium 登录了 B 站的大会员账号，然后：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">yt-dlp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> https://www.bilibili.com/bangumi/play/ss27047</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --cookies-from-browser</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chromium</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -F</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>其会自动读取 chromium 浏览器的 cookie。然后就能愉快下载了。</p><p>当然，现在 Chrome 系浏览器更新了 cookie 保护措施，第三方软件无法再直接读取 cookie。此时需要费一点事，参考<a href="#%E4%BD%BF%E7%94%A8-cookie">使用 cookie</a></p><h3 id="使用-cookie" tabindex="-1"><a class="header-anchor" href="#使用-cookie"><span><a href="https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp" target="_blank" rel="noopener noreferrer">使用 cookie</a></span></a></h3><ol><li>使用 <a href="https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc" target="_blank" rel="noopener noreferrer">Get cookies.txt LOCALLY</a> 导出 cookies 文件</li><li>使用参数 <code>--cookies &lt;exported file path&gt;</code></li></ol>',36)]))}const p=e(l,[["render",h],["__file","yt-dlp.html.vue"]]),d=JSON.parse('{"path":"/articles/yt-dlp.html","title":"yt-dlp 使用教程","lang":"zh-CN","frontmatter":{"date":"2023-12-30T00:00:00.000Z","icon":"download","category":["推荐","教程"],"tag":["工具","桌面端"],"description":"yt-dlp 使用教程 yt-dlp 是一个开源命令行视频/音频下载工具，远比那些闭源收费的视频下载扩展/软件好用。 但是，yt-dlp 也有一些缺点： 对于某些 B 站视频可能无法选择最高清晰度 yt-dlp 不能下载任意网站的视频。要查看是否支持某网站，请直接搜 Changelog。我主要用 yt-dlp 下载 youtube 与 bilibili...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"yt-dlp 使用教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-30T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-12T18:14:05.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/yt-dlp.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"yt-dlp 使用教程"}],["meta",{"property":"og:description","content":"yt-dlp 使用教程 yt-dlp 是一个开源命令行视频/音频下载工具，远比那些闭源收费的视频下载扩展/软件好用。 但是，yt-dlp 也有一些缺点： 对于某些 B 站视频可能无法选择最高清晰度 yt-dlp 不能下载任意网站的视频。要查看是否支持某网站，请直接搜 Changelog。我主要用 yt-dlp 下载 youtube 与 bilibili..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-12T18:14:05.000Z"}],["meta",{"property":"article:tag","content":"桌面端"}],["meta",{"property":"article:tag","content":"工具"}],["meta",{"property":"article:published_time","content":"2023-12-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-12T18:14:05.000Z"}]]},"git":{"createdTime":1703958610000,"updatedTime":1736705645000,"contributors":[{"name":"lxl66566","username":"lxl66566","email":"18259734087@163.com","commits":5,"url":"https://github.com/lxl66566"}]},"readingTime":{"minutes":2.22,"words":665},"filePathRelative":"articles/yt-dlp.md","localizedDate":"2023年12月30日","excerpt":"\\n","autoDesc":true}');export{p as comp,d as data};
