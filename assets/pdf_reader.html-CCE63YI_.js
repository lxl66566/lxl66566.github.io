import{_ as r,e as n,f as i,g as s,h as a,i as p,j as d,r as l,o}from"./app-DjPa-OFf.js";const h={};function c(k,e){const t=l("RouteLink");return o(),n("div",null,[e[5]||(e[5]=i('<h1 id="pdf-阅读器横评" tabindex="-1"><a class="header-anchor" href="#pdf-阅读器横评"><span>PDF 阅读器横评</span></a></h1><p>一看到这个标题，肯定有人会说：嗨嗨嗨，浏览器自带的 PDF 阅读器不好吗，为啥要专门整一个阅读器呢？那是因为……</p><p>已知：我的需求是，免费，能记阅读进度，能反色（dark mode），能划词翻译，很简单很基础吧。</p><h2 id="浏览器" tabindex="-1"><a class="header-anchor" href="#浏览器"><span>浏览器</span></a></h2><p>但是在浏览器中，这是很难实现的。</p><ol><li>Dark Reader 插件能直接把浏览器自带的 PDF 阅读界面反色（dark mode）。 <ul><li>仅在 chromium 系下有效。firefox 强制所有扩展无法访问文件网址。</li></ul></li><li>目前所有的（<em>沙拉查词</em>，<em>划词翻译</em>）划词翻译插件都不能在自带 PDF 阅读界面工作，需要插件自行用 pdf.js 维护一个页面。</li><li>我尝试在其维护的 pdf.js 页面反色，error: 此页面受浏览器保护。</li></ol><h3 id="解法" tabindex="-1"><a class="header-anchor" href="#解法"><span>解法</span></a></h3><p>在后续的尝试中，我发现可以在控制台输入：<code>viewer.style.filter = &#39;invert() brightness(80%)&#39;</code> 来强制反色。(<a href="https://github.com/darkreader/darkreader/issues/374#issuecomment-850989619" target="_blank" rel="noopener noreferrer">src</a>)</p><p>也可以建一个书签，免去了输指令：<code>javascript:void(viewer.style.filter = &#39;invert() brightness(80%)&#39;)</code>。</p><h2 id="adob​​e-acrobat-reader" tabindex="-1"><a class="header-anchor" href="#adob​​e-acrobat-reader"><span>Adob​​e Acrobat Reader</span></a></h2><p>这玩意我只在学校机房用过一次，当时它能做到离线 OCR，还是有点惊艳到我的。</p><p>今天尝试安装，结果下载到 90% 卡死了，甚至关不掉，只能等超时。pass。</p><p>（早都说了解耦，就是有人喜欢耦合，结果就是下载器也做不好，安装器也做不好，tmd 一坨大便。）</p><h2 id="foxit-pdf-reader" tabindex="-1"><a class="header-anchor" href="#foxit-pdf-reader"><span>Foxit PDF Reader</span></a></h2><p>福昕阅读器，据说是支持反色和划词翻译的。我下载的时候选的 English，当时也没太在意。</p><p>装好以后 Darkmode 倒是好找，但是无法反色（更换背景）。怎么找也找不到。</p><p>然后去看了下<a href="https://www.foxit.com/blog/how-to-add-backgrounds-to-pdfs/" target="_blank" rel="noopener noreferrer">官方教程</a>。好家伙，我根本找不到视频中的 <code>Organize</code> 的入口。</p><p>并且我试了下，也不能划词翻译。pass。</p><p>比较有意思的是我搜出来的中文教程的界面与英文的完全不同，这阅读器该不会是区别对待吧（）。</p><h2 id="evince" tabindex="-1"><a class="header-anchor" href="#evince"><span>Evince</span></a></h2>',20)),s("p",null,[e[1]||(e[1]=a("这玩意是开源的阅读器，官网只能找到 linux 系统的安装包。于是去")),e[2]||(e[2]=s("a",{href:"https://evince.en.uptodown.com/windows/download",target:"_blank",rel:"noopener noreferrer"},"第三方平台",-1)),e[3]||(e[3]=a("下载了 windows 版本（期间还在 Microsoft Store ")),p(t,{to:"/gossip/fuckxxx.html#%E6%89%B9%E5%88%A4%E5%BE%AE%E8%BD%AF"},{default:d(()=>e[0]||(e[0]=[a("碰了一次壁")])),_:1}),e[4]||(e[4]=a("）。安装不能自定义位置，扣分。"))]),e[6]||(e[6]=i(`<p>轻量倒是轻量，也有反色，但是没有划词翻译。</p><p>这个软件在 PDF 上选择单词时会忽视单词排版的间隙，而是自己再覆盖着打一遍单词，我也说不上是好是坏。</p><p>在 archlinux 上安装则没有带 <code>.desktop</code> 文件，需要自己写一个最小 <code>.desktop</code>：</p><div class="language-toml line-numbers-mode" data-highlighter="shiki" data-ext="toml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Desktop</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> Entry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=e</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">vince</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Comment</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=e</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">vince pdf reader</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=A</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">pplication</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Exec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=e</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF;">vince -o</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">Terminal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>喂，你好歹是个官方 extra 仓库的应用。。到时候考虑邮件催一下打包者。</p>`,5))])}const g=r(h,[["render",c],["__file","pdf_reader.html.vue"]]),F=JSON.parse('{"path":"/articles/pdf_reader.html","title":"PDF 阅读器横评","lang":"zh-CN","frontmatter":{"date":"2023-12-18T00:00:00.000Z","icon":"file-pdf","category":["推荐","评价"],"tag":["桌面端","横评"],"description":"PDF 阅读器横评 一看到这个标题，肯定有人会说：嗨嗨嗨，浏览器自带的 PDF 阅读器不好吗，为啥要专门整一个阅读器呢？那是因为…… 已知：我的需求是，免费，能记阅读进度，能反色（dark mode），能划词翻译，很简单很基础吧。 浏览器 但是在浏览器中，这是很难实现的。 Dark Reader 插件能直接把浏览器自带的 PDF 阅读界面反色（dark...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PDF 阅读器横评\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-12-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-10T08:35:24.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/pdf_reader.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"PDF 阅读器横评"}],["meta",{"property":"og:description","content":"PDF 阅读器横评 一看到这个标题，肯定有人会说：嗨嗨嗨，浏览器自带的 PDF 阅读器不好吗，为啥要专门整一个阅读器呢？那是因为…… 已知：我的需求是，免费，能记阅读进度，能反色（dark mode），能划词翻译，很简单很基础吧。 浏览器 但是在浏览器中，这是很难实现的。 Dark Reader 插件能直接把浏览器自带的 PDF 阅读界面反色（dark..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-10T08:35:24.000Z"}],["meta",{"property":"article:tag","content":"横评"}],["meta",{"property":"article:tag","content":"桌面端"}],["meta",{"property":"article:published_time","content":"2023-12-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-10T08:35:24.000Z"}]]},"git":{"createdTime":1702914551000,"updatedTime":1718008524000,"contributors":[{"name":"lxl66566","username":"lxl66566","email":"lxl66566@gmail.com","commits":4,"url":"https://github.com/lxl66566"}]},"readingTime":{"minutes":2.46,"words":737},"filePathRelative":"articles/pdf_reader.md","localizedDate":"2023年12月18日","excerpt":"\\n","autoDesc":true}');export{g as comp,F as data};
