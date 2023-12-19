import{_ as r,r as d,o,c as l,a as e,b as n,d as i,w as c,e as t}from"./app-481899a6.js";const u={},h=e("h1",{id:"typst",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#typst","aria-hidden":"true"},"#"),n(" typst")],-1),p={href:"https://github.com/typst/typst",target:"_blank",rel:"noopener noreferrer"},b=e("br",null,null,-1),v={href:"https://typst-doc-cn.github.io/docs/chinese/",target:"_blank",rel:"noopener noreferrer"},m=t('<p>我不是很喜欢 latex，所以尝试使用 typst 作为我的论文排版工具。</p><p>优点：</p><ul><li>typst 使用 rust 语言编写，编译极快，几乎秒出</li><li>语法是类 rust 的语法，看着非常亲切</li></ul><p>缺点：</p><ul><li>新兴工具，bug 较多</li><li>社区不够完善，网上模版/教程不多</li></ul><h2 id="安装与配置" tabindex="-1"><a class="header-anchor" href="#安装与配置" aria-hidden="true">#</a> 安装与配置</h2>',6),_=t('<ol><li>进 release 下载，解压后把 <code>typst.exe</code> 直接丢进 <code>C:\\Windows\\System32</code> 就行。 <ul><li>或者也可以 <code>scoop install typst</code> 一行搞定。</li></ul></li><li>vscode 安装两个扩展，无需配置： <ul><li><em>Typst LSP</em>，Linter + watch</li><li><em>vscode-pdf</em> (optional)，viewer</li><li>或：什么也不装，只要 <code>typst watch example.typ</code> 即可。</li></ul></li></ol><p>然后就可以愉快地敲论文了。每次保存时会自动生成 pdf，拖到侧边就能看了。</p><h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2>',3),f={href:"https://typst-doc-cn.github.io/docs/chinese/#resources",target:"_blank",rel:"noopener noreferrer"},g=e("s",null,"多抄抄就会用了",-1),y=t('<p>简单来说，<code>[]</code> 内是正文（<code>content</code>），<code>{}</code> 内是代码，<code>()</code> 是数组（<code>array</code>），正文调用函数要加 <code>#</code>，代码里可以直接调。</p><p>关键字也就 <code>set</code> 和 <code>show</code> 常用，<code>set</code> 设置全局属性，<code>show</code> 设置某个组件的（外观）属性。</p><p>剩下的 <code>let</code>，<code>if</code> 什么的都是 rust 的东西，这里不说（</p><h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3><p>typst 没有 <code>list</code> 类型，只有 <code>array</code>。</p><p><code>(&quot;12&quot;)</code> 这样其实还是 string 类型，如果要数组类型需要 <code>(&quot;12&quot;,)</code></p><h2 id="数学" tabindex="-1"><a class="header-anchor" href="#数学" aria-hidden="true">#</a> 数学</h2>',7),k={href:"https://github.com/brynne8/typst-undergradmath-zh/blob/main/undergradmath.pdf",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"表格",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#表格","aria-hidden":"true"},"#"),n(" 表格")],-1),w={href:"https://github.com/typst/packages/tree/main/packages/preview/tablem/0.1.0",target:"_blank",rel:"noopener noreferrer"},q=t('<p>但是还存在着一些问题，例如无法通过 <code>\\|</code> 转义打出 <code>|</code> 字符，没法控制居中，只能说还在起步阶段。</p><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><p>代码不要直接写 <code>typ</code> 文件里。最好从外部引用，解耦，还方便扔 formatter。</p><h3 id="好看的边框" tabindex="-1"><a class="header-anchor" href="#好看的边框" aria-hidden="true">#</a> 好看的边框</h3>',4),L={href:"https://github.com/typst/typst/issues/1494#issuecomment-1591847881",target:"_blank",rel:"noopener noreferrer"},C=t(`<div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#let frame(title: none, body) = {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),S={href:"https://github.com/cherichy/BUAA-typst/blob/ab9bef8ecbdc55d4d0629c63ad96ffd5484b4f7c/functions/codeblock.typ",target:"_blank",rel:"noopener noreferrer"},B=t(`<p>然后偷窥交流群发现，如果不需要 <code>name</code> 参数的话，简单用 <code>block</code> 包一下就能实现自动切割。抄来的代码用的是 <code>box</code>，因此才会自动换页。</p><div class="language-typst line-numbers-mode" data-ext="typst"><pre class="language-typst"><code>#let 字体 = (代码: (&quot;Fira Code&quot;, &quot;Times New Roman&quot;, &quot;SimSun&quot;))
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="伪代码" tabindex="-1"><a class="header-anchor" href="#伪代码" aria-hidden="true">#</a> 伪代码</h3>`,3),N={href:"https://github.com/typst/packages/tree/main/packages/preview/algorithmic/0.1.0",target:"_blank",rel:"noopener noreferrer"},T=e("h2",{id:"bug",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#bug","aria-hidden":"true"},"#"),n(" bug")],-1),V=e("p",null,"这东西 bug 其实还真不少。。",-1),A=e("h3",{id:"参考文献",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考文献","aria-hidden":"true"},"#"),n(" 参考文献")],-1),z={href:"https://github.com/typst/typst/issues/2548",target:"_blank",rel:"noopener noreferrer"},E=t('<p>从 <code>.bib</code> 引入参考文献时，如果文献类型是 <code>thesis</code>，本该在适当位置加 <code>[D]</code> 的，然而它不会加。。</p><p>感觉是 <em>hayagriva</em> 的锅，但是我翻了下源码发现看不懂。爆了！</p><blockquote><p>看了一下 issue 时间，<em>3 days ago</em>。。那我这次课程论文寄了，唉，扣点分不重要</p></blockquote><p>其他大学模版的解法是用 python 写了个处理脚本，通过 CSL 解析，半自动加参考文献。</p><p>后续：修了，0.10.0 正常。</p><h3 id="缩进" tabindex="-1"><a class="header-anchor" href="#缩进" aria-hidden="true">#</a> 缩进</h3>',6),I={href:"https://github.com/typst/typst/issues/311",target:"_blank",rel:"noopener noreferrer"},R=e("p",null,[n("中文等语言需要在每行开头缩进两个宽字符。typst 提供了 "),e("code",null,"par()"),n(" 控制缩进行为，但是在标题下面一行的文字却不会被缩进。。")],-1),F={href:"https://github.com/typst/typst/issues/311#issuecomment-1678940781",target:"_blank",rel:"noopener noreferrer"},U=t(`<div class="language-typst line-numbers-mode" data-ext="typst"><pre class="language-typst"><code>show heading: it =&gt; {
  it
  par()[#text(size:0.5em)[#h(0.0em)]]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function j(D,P){const s=d("ExternalLinkIcon"),a=d("RouterLink");return o(),l("div",null,[h,e("blockquote",null,[e("p",null,[e("a",p,[n("Typst"),i(s)]),n(" is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use."),b,e("a",v,[n("非官方中文指南"),i(s)])])]),m,e("p",null,[n("基础用法是 CLI 使用，但我配合 "),i(a,{to:"/coding/vscode.html"},{default:c(()=>[n("VSCode")]),_:1}),n(" 使用。")]),_,e("p",null,[e("a",f,[n("这里"),i(s)]),n("有许多大学的毕业论文模版，"),g]),y,e("p",null,[e("a",k,[n("这里"),i(s)]),n("有比较全的数学符号。")]),x,e("p",null,[n("建议直接使用 "),e("a",w,[n("tablem"),i(s)]),n("，大佬写的类 markdown 语法的表格。")]),q,e("p",null,[n("从 "),e("a",L,[n("#1494"),i(s)]),n(" 摸了个好看的代码块样式来，然后自己改改，就是下面的了。")]),C,e("p",null,[n("这样用 box 包的代码块有一个致命缺陷：若 box 高度大于剩余页面高度，则会自动换页；若 box 高度大于整个页面的高度，则超出部分不会显示。因此只适合用来引用小块代码，否则就别想要边框了。我去其他地方寻找解法，"),e("a",S,[n("BUAA 的"),i(s)]),n("用 figure 包的也会有这个问题。")]),B,e("p",null,[n("目前在用"),e("a",N,[n("algorithmic"),i(s)]),n("，并且修了个 bug。")]),T,V,A,e("p",null,[e("a",z,[n("issue"),i(s)])]),E,e("p",null,[e("a",I,[n("issue"),i(s)])]),R,e("p",null,[n("所以下面有人提供了"),e("a",F,[n("一个解法"),i(s)]),n("：")]),U])}const X=r(u,[["render",j],["__file","typst.html.vue"]]);export{X as default};
