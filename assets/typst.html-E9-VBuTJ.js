import{_ as d,r as l,o as r,c as o,a as e,b as n,d as i,w as c,e as t}from"./app-Xj5ddj7v.js";const u="/images/farraginous/learning/typst/outline_err.svg",v={},b=e("h1",{id:"typst",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#typst","aria-hidden":"true"},"#"),n(" typst")],-1),m={href:"https://github.com/typst/typst",target:"_blank",rel:"noopener noreferrer"},p=e("br",null,null,-1),h={href:"https://typst-doc-cn.github.io/docs/chinese/",target:"_blank",rel:"noopener noreferrer"},g=e("br",null,null,-1),_={href:"https://sitandr.github.io/typst-examples-book/book/about.html",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,"我不是很喜欢 latex，所以尝试使用 typst 作为我的论文排版工具。",-1),y=e("p",null,"优点：",-1),k=e("ul",null,[e("li",null,[n("typst 使用 rust 语言编写，编译极快，几乎秒出 "),e("ul",null,[e("li",null,"据群聊天记录所传，latex 编译 30min 的 typst 只要 46s")])]),e("li",null,"小，二进制也就数十 MB；第三方包只有源码，约等于不占空间")],-1),x=e("p",null,"缺点：",-1),w=e("li",null,[n("新兴工具，"),e("a",{href:"#bug"},"bug"),n(" 较多")],-1),q=e("li",null,[n("社区不够完善，网上模版/教程不多，文档很烂 "),e("ul",null,[e("li",null,"面向 user 的文档还行，但是面向 developer 的…一点没有。")])],-1),A={href:"https://github.com/typst/typst/issues/1669",target:"_blank",rel:"noopener noreferrer"},E=e("ul",null,[e("li",null,"要我说，还不如直接用 rust（但是这样二进制大小也压不下来）")],-1),B=e("h2",{id:"安装与配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装与配置","aria-hidden":"true"},"#"),n(" 安装与配置")],-1),L=t('<ol><li>进 release 下载，解压后把 <code>typst.exe</code> 直接丢进 <code>C:\\Windows\\System32</code> 就行。 <ul><li>或者也可以 <code>scoop install typst</code> 一行搞定。</li></ul></li><li>vscode 安装两个扩展，无需配置： <ul><li><em>Typst LSP</em>，Linter + watch</li><li><em>vscode-pdf</em> (optional)，viewer</li><li>或：什么也不装，只要 <code>typst watch example.typ</code> 即可。</li><li>我为什么不推荐 <em>Typst Preview</em>？1. 曾经遇到过无法生成的 bug；2. 很慢，10 页的 pdf 就会卡了。</li></ul></li></ol><p>然后就可以愉快地敲论文了。每次保存时会自动生成 pdf，拖到侧边就能看了。</p><h2 id="模板" tabindex="-1"><a class="header-anchor" href="#模板" aria-hidden="true">#</a> 模板</h2>',3),S={href:"https://github.com/lxl66566/my-college-files/blob/main/%E4%BF%A1%E6%81%AF%E7%A7%91%E5%AD%A6%E4%B8%8E%E5%B7%A5%E7%A8%8B%E5%AD%A6%E9%99%A2/template.typ",target:"_blank",rel:"noopener noreferrer"},C=t(`<h2 id="编译导出" tabindex="-1"><a class="header-anchor" href="#编译导出" aria-hidden="true">#</a> 编译导出</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>typst compile xxx.typ <span class="token comment"># 基础编译指令</span>
typst compile <span class="token parameter variable">--root</span> <span class="token punctuation">..</span> xxx.typ   <span class="token comment"># 如果需要 include 父级目录的文件，则需要指定 root</span>
typst compile <span class="token parameter variable">--format</span> svg xxx.typ <span class="token string">&#39;{n}.svg&#39;</span>  <span class="token comment"># 导出为 svg 格式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2>`,3),z={href:"https://typst-doc-cn.github.io/docs/chinese/#resources",target:"_blank",rel:"noopener noreferrer"},T=e("s",null,"多抄抄就会用了",-1),V=t('<p>简单来说，<code>[]</code> 内是正文（<code>content</code>），<code>{}</code> 内是代码，<code>()</code> 是数组（<code>array</code>），正文调用函数要加 <code>#</code>，代码里可以直接调。</p><p>关键字也就 <code>set</code> 和 <code>show</code> 常用，<code>set</code> 设置作用域内的属性，<code>show</code> 相当于每次使用都调用某个函数。</p><p>剩下的 <code>let</code>，<code>if</code> 什么的都是 rust 的东西，这里不说（</p><h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3><p>typst 没有 <code>list</code> 类型，只有 <code>array</code>。</p><p><code>(&quot;12&quot;)</code> 这样其实还是 string 类型，如果要数组类型需要 <code>(&quot;12&quot;,)</code></p><h2 id="数学" tabindex="-1"><a class="header-anchor" href="#数学" aria-hidden="true">#</a> 数学</h2>',7),D={href:"https://github.com/brynne8/typst-undergradmath-zh/blob/main/undergradmath.pdf",target:"_blank",rel:"noopener noreferrer"},N=e("h2",{id:"表格",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#表格","aria-hidden":"true"},"#"),n(" 表格")],-1),F={href:"https://github.com/typst/packages/tree/main/packages/preview/tablem/0.1.0",target:"_blank",rel:"noopener noreferrer"},P=e("ul",null,[e("li",null,[n("无法通过 "),e("code",null,"\\|"),n(" 转义打出 "),e("code",null,"|"),n(" 字符")]),e("li",null,"超出列数报错（与 markdown 行为不同；在 markdown 中会直接忽略）")],-1),I={href:"https://github.com/PgBiel/typst-tablex",target:"_blank",rel:"noopener noreferrer"},R={href:"https://github.com/PgBiel/typst-tablex/issues/18",target:"_blank",rel:"noopener noreferrer"},O={href:"https://gist.github.com/lxl66566/30e309e696169829524ee04503b526db",target:"_blank",rel:"noopener noreferrer"},U=e("ul",null,[e("li",null,[n("这个预计算是很难改的（源码访问 "),e("code",null,"at"),n(" 时的 "),e("code",null,"default"),n(" 已经是 "),e("code",null,"Option<Value>"),n(" 了）。说到底，根本问题还是 typst 选择自创的这个 DSL 的问题，你像 rust 那样 Option 套 "),e("code",null,"or_else"),n(" 哪有这么多事。")])],-1),j=t(`<h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><p>大段代码不要直接写 <code>typ</code> 文件里，最好从外部引用，解耦，还方便扔 formatter。小段就无所谓了。放个我的带边框代码块：</p><div class="language-typst line-numbers-mode" data-ext="typst"><pre class="language-typst"><code>// 带边框代码块
#let frame(title: none, body) = {
  let stroke = black + 1pt
  let radius = 5pt
  let txt = (font: 字体.代码)
  set text(..txt)
  let name = block(
                breakable: false,
                fill: color.linear-rgb(0, 0, 0, 10),
                stroke: stroke,
                inset: 0.5em,
                below: -1.5em,
                radius: (top-right: radius, bottom-left: radius),
                title,
              )
  block(
    stroke: stroke,
    width: 100%,
    inset: (rest: 0.5em),
    radius: radius,
  )[
    #if title != none {
      place(top + right, dx: radius + stroke.thickness, dy: -(radius + stroke.thickness), name)
    }
    #body
  ]
}

// 引入外部代码块
#let include_code(file_path) = {
  let name = file_path.split(&quot;/&quot;).at(-1)
  let lang = name.split(&quot;.&quot;).at(-1)
  frame(title: name)[
    #raw(read(file_path), lang: lang)
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),M={class:"hint-container details"},W=e("summary",null,"我的折腾历程",-1),X={href:"https://github.com/typst/typst/issues/1494#issuecomment-1591847881",target:"_blank",rel:"noopener noreferrer"},G=t(`<div class="language-typst line-numbers-mode" data-ext="typst"><pre class="language-typst"><code>#let frame(title: none, body) = {
  let stroke = black + 1pt
  let radius = 5pt
  let font = (font: &quot;Fira Code&quot;, size: 10pt)
  let name = block(
               breakable: false,
               fill: color.linear-rgb(0, 0, 0, 10),
               stroke: stroke,
               inset: 0.5em,
               below: -1.5em,
               radius: (top-right: radius, bottom-left: radius),
               title,
             )
  set text(..font)
  show raw: set text(..font)
  box(stroke: stroke, radius: radius)[
    #if title != none {
      align(top + right, name)
    }
    #block(
      width: 100%,
      inset: (rest: 0.5em),
      body,
    )
  ]
}

#let include_code_file(file_path, name, lang) = {
  frame(title: name)[
    #raw(read(file_path), lang: lang)
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),H={href:"https://github.com/cherichy/BUAA-typst/blob/ab9bef8ecbdc55d4d0629c63ad96ffd5484b4f7c/functions/codeblock.typ",target:"_blank",rel:"noopener noreferrer"},J=t(`<p>然后偷窥交流群发现，如果不需要 <code>name</code> 参数的话，简单用 <code>block</code> 包一下就能实现自动切割。抄来的代码用的是 <code>box</code>，因此才会自动换页。</p><div class="language-typst line-numbers-mode" data-ext="typst"><pre class="language-typst"><code>#let 字体 = (代码: (&quot;Fira Code&quot;, &quot;Times New Roman&quot;, &quot;SimSun&quot;))
#let frame(body) = {
  set text(font: 字体.代码)
  block(
    stroke: black + 1pt,
    width: 100%,
    inset: (rest: 0.5em),
    radius: 7pt,
    body,
  )
}

// 使用方法：
#frame[
\`\`\`js
console.log(&quot;1&quot;)
\`\`\`
]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),K=e("h3",{id:"伪代码",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#伪代码","aria-hidden":"true"},"#"),n(" 伪代码")],-1),Q={href:"https://github.com/typst/packages/tree/main/packages/preview/algorithmic/0.1.0",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://github.com/typst/packages/tree/main/packages/preview/lovelace/0.1.0",target:"_blank",rel:"noopener noreferrer"},Z=t('<h3 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h3><p>众所周知，中文报告一般会要求页码遵循 <code>第 x 页，共 x 页</code> 的格式。这没问题，在 <code>set page(numbering: (..nums) =&gt; ...)</code> 即可。</p><p>然而 typst 的目录（<code>outline</code>）默认使用页面的页码格式，也就是说，会出现这样的情况：</p><figure><img src="'+u+`" alt="鬼畜页码" tabindex="0" loading="lazy"><figcaption>鬼畜页码</figcaption></figure><p>我尝试问群友，没人理；尝试看源码，发现写死了；最后在 repo 里乱搜，居然被我搜到了一个究极自定义方案，改一改就是解法：</p><div class="language-typst line-numbers-mode" data-ext="typst"><pre class="language-typst"><code>#set text(lang: &quot;zh&quot;, region: &quot;cn&quot;)
#set heading(numbering: &quot;1.&quot;)
#set page(
  numbering: (..nums) =&gt; {
    &quot;第&quot; + str(nums.pos().at(0)) + &quot;页，共&quot; + str(nums.pos().at(-1)) + &quot;页&quot;
  },
  number-align: center,
)
#show outline: ol =&gt; {
  show heading: it =&gt; {
    align(center, it)
  }
  ol
}
#show outline.entry: it =&gt; {
  set text(size: 10pt)
  let loc = it.element.location()
  let num = str(..counter(page).at(loc))
  link(loc, it.body)
  box(width: 1fr, repeat[#it.fill.body;.])
  link(loc, [#num])
}
#outline(indent: auto)
= test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bug" tabindex="-1"><a class="header-anchor" href="#bug" aria-hidden="true">#</a> bug</h2><p>这东西 bug 其实还真不少。。</p><h3 id="中文粗体斜体" tabindex="-1"><a class="header-anchor" href="#中文粗体斜体" aria-hidden="true">#</a> 中文粗体斜体</h3><p>广为诟病的一条了，typst 不支持伪粗体伪斜体。不过据说是会修。</p><h3 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h3>`,11),$={href:"https://github.com/typst/typst/issues/2548",target:"_blank",rel:"noopener noreferrer"},ee=t('<p>从 <code>.bib</code> 引入参考文献时，如果文献类型是 <code>thesis</code>，本该在适当位置加 <code>[D]</code> 的，然而它不会加。。</p><p>感觉是 <em>hayagriva</em> 的锅，但是我翻了下源码发现看不懂。爆了！</p><blockquote><p>看了一下 issue 时间，<em>3 days ago</em>。。那我这次课程论文寄了，唉，扣点分不重要</p></blockquote><p>其他大学模版的解法是用 python 写了个处理脚本，通过 CSL 解析，半自动加参考文献。</p><p>后续：修了，0.10.0 正常。</p><h3 id="缩进" tabindex="-1"><a class="header-anchor" href="#缩进" aria-hidden="true">#</a> 缩进</h3>',6),ne={href:"https://github.com/typst/typst/issues/311",target:"_blank",rel:"noopener noreferrer"},ie=e("p",null,[n("中文等语言需要在每行开头缩进两个宽字符。typst 提供了 "),e("code",null,"par()"),n(" 控制缩进行为，但是在标题下面一行的文字却不会被缩进。。")],-1),se={href:"https://github.com/typst/typst/issues/311#issuecomment-1678940781",target:"_blank",rel:"noopener noreferrer"},te=t(`<div class="language-typst line-numbers-mode" data-ext="typst"><pre class="language-typst"><code>show heading: it =&gt; {
  it
  par()[#text(size:0.5em)[#h(0.0em)]]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法在上一行是 figure 啊，raw 啊什么的时候还是无法缩进，如果手动 <code>linebreak()</code> 的话又多出了不必要的间距，太丑了。</p>`,2);function le(ae,de){const s=l("ExternalLinkIcon"),a=l("RouterLink");return r(),o("div",null,[b,e("blockquote",null,[e("p",null,[e("a",m,[n("Typst"),i(s)]),n(" is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use."),p,e("a",h,[n("非官方中文指南"),i(s)]),n("，我一般拿来快速找第三方包"),g,n(" typst 并没有一个给开发者的清晰的文档。。"),e("a",_,[n("examples book"),i(s)]),n("可以抄点东西。")])]),f,y,k,x,e("ul",null,[w,q,e("li",null,[n("自创的 DSL 比较折磨（这是一个连标准输出都没有的弱类型语言("),e("a",A,[n("src"),i(s)]),n(")，debug 很容易红温） "),E])]),B,e("p",null,[n("基础用法是 CLI 使用，但我配合 "),i(a,{to:"/coding/vscode.html"},{default:c(()=>[n("VSCode")]),_:1}),n(" 使用。")]),L,e("p",null,[e("a",S,[n("我的模板"),i(s)])]),C,e("p",null,[e("a",z,[n("这里"),i(s)]),n("有许多大学的毕业论文模版，"),T]),V,e("p",null,[e("a",D,[n("这里"),i(s)]),n("有比较全的数学符号。")]),N,e("ul",null,[e("li",null,[e("a",F,[n("tablem"),i(s)]),n("，类 markdown 语法的表格，简单快速，功能不强。 "),P]),e("li",null,[e("a",I,[n("tablex"),i(s)]),n("，更麻烦但更强大的表格。 "),e("ul",null,[e("li",null,[n("如果表格中含有粗体斜体，批量处理就比较麻烦。("),e("a",R,[n("ex"),i(s)]),n(") "),e("a",O,[n("我的解法，甚至还发现了个 bug?"),i(s)]),U])])])]),j,e("details",M,[W,e("p",null,[n("从 "),e("a",X,[n("#1494"),i(s)]),n(" 摸了个好看的代码块样式来，然后自己改改，就是下面的了。")]),G,e("p",null,[n("这样用 box 包的代码块有一个致命缺陷：若 box 高度大于剩余页面高度，则会自动换页；若 box 高度大于整个页面的高度，则超出部分不会显示。因此只适合用来引用小块代码，否则就别想要边框了。我去其他地方寻找解法，"),e("a",H,[n("BUAA 的"),i(s)]),n("用 figure 包的也会有这个问题。")]),J]),K,e("p",null,[n("目前在用"),e("a",Q,[n("algorithmic"),i(s)]),n("，并且修了个 bug。")]),e("p",null,[n("不过目前看来，还是"),e("a",Y,[n("lovelace"),i(s)]),n("更泛用一点。")]),Z,e("p",null,[e("a",$,[n("issue"),i(s)])]),ee,e("p",null,[e("a",ne,[n("issue"),i(s)])]),ie,e("p",null,[n("所以下面有人提供了"),e("a",se,[n("一个解法"),i(s)]),n("：")]),te])}const oe=d(v,[["render",le],["__file","typst.html.vue"]]);export{oe as default};
