import{_ as i,o as s,c as a,g as e,e as t}from"./app-BzilSif_.js";const n={},l=t('<h1 id="markdown" tabindex="-1"><a class="header-anchor" href="#markdown"><span>Markdown</span></a></h1><blockquote><p>本文章写于早期，质量并不高，建议阅读其他教程。</p></blockquote><p>Markdown 是被广泛使用的轻量级标记语言。</p><p>推荐教程：<a href="http://younghz.github.io/Markdown/" target="_blank" rel="noopener noreferrer">younghz.github.io/Markdown/</a></p><h2 id="速查" tabindex="-1"><a class="header-anchor" href="#速查"><span>速查</span></a></h2><p>标题：1-6 个 <code>#</code> 加空格加标题。<code>#</code> 数量对应标题等级（大小）。例如：</p><p><code>### 这是三级标题</code></p><h3 id="这是三级标题" tabindex="-1"><a class="header-anchor" href="#这是三级标题"><span>这是三级标题</span></a></h3><hr><p>换行：多给一个空行，或者在末尾加两个空格再换行。有些 Markdown 渲染器可能不需要。</p><hr><p>引用： &gt; 一级引用 &gt;&gt; 二级引用</p><blockquote><p>一级引用</p><blockquote><p>二级引用</p></blockquote></blockquote><hr><p>代码块<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup>：（部分渲染器有语法高亮功能，可以在头部的 ``` 后加上语言。）</p><p>```python<br> print(&quot;123&quot;)<br> ```</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><hr><p>分割线：连续的三个 <code>*</code> 或者 <code>_</code></p><hr><p>列表（注意符号后面要有一个空格）：</p><div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E5C07B;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 无序列表 1</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E5C07B;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 无序列表 2</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E5C07B;">  -</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 前面加 Tab 可分级</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E5C07B;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 再分级</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E5C07B;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 有序列表 1</span></span>\n<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E5C07B;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> 有序列表 2 3. 有序列表 3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>无序列表 1</li><li>无序列表 2 <ul><li>前面加 Tab 可分级 <ul><li>再分级</li></ul></li></ul></li></ul><ol><li>有序列表 1</li><li>有序列表 2</li><li>有序列表 3</li></ol><hr><p>文本样式</p>',26),r=t('<table><thead><tr><th style="text-align:center;">样式</th><th style="text-align:center;">样例</th><th style="text-align:center;">效果</th></tr></thead><tbody><tr><td style="text-align:center;">斜体</td><td style="text-align:center;"><code>*斜体*</code></td><td style="text-align:center;"><em>斜体</em></td></tr><tr><td style="text-align:center;">粗体</td><td style="text-align:center;"><code>**粗体**</code></td><td style="text-align:center;"><strong>粗体</strong></td></tr><tr><td style="text-align:center;">删除线</td><td style="text-align:center;"><code>~~删除~~</code></td><td style="text-align:center;"><s>删除</s></td></tr><tr><td style="text-align:center;">标记</td><td style="text-align:center;">`等宽标记`</td><td style="text-align:center;"><code>等宽标记</code></td></tr><tr><td style="text-align:center;">链接</td><td style="text-align:center;"><code>[百度](https://www.baidu.com/)</code></td><td style="text-align:center;"><a href="https://www.baidu.com/" target="_blank" rel="noopener noreferrer">百度</a></td></tr><tr><td style="text-align:center;">图片</td><td style="text-align:center;"><code>![加载失败时显示此处文字](https://s2.loli.net/2023/03/20/bn4zcdBPgXKq5DH.jpg)</code></td><td style="text-align:center;"><img src="https://s2.loli.net/2023/03/20/bn4zcdBPgXKq5DH.jpg" alt="加载失败时显示此处文字" loading="lazy"></td></tr><tr><td style="text-align:center;">转义</td><td style="text-align:center;"><code>\\*不是斜体\\*</code></td><td style="text-align:center;">*不是斜体*</td></tr></tbody></table><hr><p>表格：</p>',3),d=t(`<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">|靠左内容|居中内容|靠右内容|</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">| :- | :-: | -:|</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">|L|M|R|</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),h=t(`<table><thead><tr><th style="text-align:left;">靠左内容</th><th style="text-align:center;">居中内容</th><th style="text-align:right;">靠右内容</th></tr></thead><tbody><tr><td style="text-align:left;">L</td><td style="text-align:center;">M</td><td style="text-align:right;">R</td></tr></tbody></table><hr><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><ol><li>有时候没有渲染出想要的效果，不妨前后加个空格或空行试试。</li><li>Markdown 支持 HTML，所以也可以进行如下操作：</li></ol><div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">text-align</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">center</span><span style="--shiki-light:#032F62;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;居中&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">text</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">red</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#032F62;--shiki-dark:#ABB2BF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;红色字体&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">text</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">强制添加空格</span><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">，</span><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">&amp;lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">尖括号</span><span style="--shiki-light:#005CC5;--shiki-dark:#E06C75;">&amp;gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div style="text-align:center;">居中</div><text style="color:red;">红色字体</text><p>强制添加空格    ，&lt;尖括号&gt;</p><h2 id="external" tabindex="-1"><a class="header-anchor" href="#external"><span>external</span></a></h2><ol><li><a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer">GitHub Flavored Markdown Spec</a></li></ol><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>本博客的代码块功能颇多，详见<a href="https://theme-hope.vuejs.press/zh/cookbook/vuepress/markdown.html#%E4%BB%A3%E7%A0%81%E5%9D%97" target="_blank" rel="noopener noreferrer">此处</a> <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li></ol></section>`,12);function o(p,k){return s(),a("div",null,[l,e(" prettier-ignore "),r,e(" prettier-ignore "),d,e(" prettier-ignore "),h])}const g=i(n,[["render",o],["__file","markdown.html.vue"]]),y=JSON.parse('{"path":"/articles/markdown.html","title":"Markdown","lang":"zh-CN","frontmatter":{"date":"2023-03-20T00:00:00.000Z","icon":"brands fa-markdown","category":["教程"],"description":"Markdown 本文章写于早期，质量并不高，建议阅读其他教程。 Markdown 是被广泛使用的轻量级标记语言。 推荐教程：younghz.github.io/Markdown/ 速查 标题：1-6 个 # 加空格加标题。# 数量对应标题等级（大小）。例如： ### 这是三级标题 这是三级标题 换行：多给一个空行，或者在末尾加两个空格再换行。有些 M...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/markdown.html"}],["meta",{"property":"og:site_name","content":"绝对值_x的博客"}],["meta",{"property":"og:title","content":"Markdown"}],["meta",{"property":"og:description","content":"Markdown 本文章写于早期，质量并不高，建议阅读其他教程。 Markdown 是被广泛使用的轻量级标记语言。 推荐教程：younghz.github.io/Markdown/ 速查 标题：1-6 个 # 加空格加标题。# 数量对应标题等级（大小）。例如： ### 这是三级标题 这是三级标题 换行：多给一个空行，或者在末尾加两个空格再换行。有些 M..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://s2.loli.net/2023/03/20/bn4zcdBPgXKq5DH.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-10T08:35:24.000Z"}],["meta",{"property":"article:published_time","content":"2023-03-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-10T08:35:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Markdown\\",\\"image\\":[\\"https://s2.loli.net/2023/03/20/bn4zcdBPgXKq5DH.jpg\\",\\"https://s2.loli.net/2023/03/20/bn4zcdBPgXKq5DH.jpg\\"],\\"datePublished\\":\\"2023-03-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-10T08:35:24.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"速查","slug":"速查","link":"#速查","children":[{"level":3,"title":"这是三级标题","slug":"这是三级标题","link":"#这是三级标题","children":[]}]},{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[]},{"level":2,"title":"external","slug":"external","link":"#external","children":[]}],"git":{"createdTime":1679325635000,"updatedTime":1718008524000,"contributors":[{"name":"lxl66566","email":"18259734087@163.com","commits":7},{"name":"lxl66566","email":"lxl66566@gmail.com","commits":2}]},"readingTime":{"minutes":1.81,"words":544},"filePathRelative":"articles/markdown.md","localizedDate":"2023年3月20日","excerpt":"\\n","autoDesc":true}');export{g as comp,y as data};
