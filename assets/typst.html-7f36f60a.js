import{_ as r,r as d,o,c as l,a as e,b as t,d as n,w as c,e as s}from"./app-58e8b0df.js";const h={},u=e("h1",{id:"typst",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#typst","aria-hidden":"true"},"#"),t(" typst")],-1),p={href:"https://github.com/typst/typst",target:"_blank",rel:"noopener noreferrer"},b=s('<p>我不是很喜欢 latex，所以尝试使用 typst 作为我的论文排版工具。</p><p>优点：</p><ul><li>typst 使用 rust 语言编写，编译极快，几乎秒出</li><li>语法是类 rust 的语法，看着非常亲切</li></ul><p>缺点：</p><ul><li>新兴工具，bug 较多</li><li>社区不够完善，网上模版/教程不多</li></ul><h2 id="安装与配置" tabindex="-1"><a class="header-anchor" href="#安装与配置" aria-hidden="true">#</a> 安装与配置</h2>',6),m=s('<ol><li>进 release 下载，解压后把 <code>typst.exe</code> 直接丢进 <code>C:\\Windows\\System32</code> 就行。 <ul><li>或者也可以 <code>scoop install typst</code> 一行搞定。</li></ul></li><li>vscode 安装两个扩展，无需配置： <ul><li><em>Typst LSP</em>，Linter + watch</li><li><em>vscode-pdf</em> (optional)，viewer</li><li>或：什么也不装，只要 <code>typst watch example.typ</code> 即可。</li></ul></li></ol><p>然后就可以愉快地敲论文了。每次保存时会自动生成 pdf，拖到侧边就能看了。</p><h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2>',3),v={href:"https://typst-doc-cn.github.io/docs/chinese/#resources",target:"_blank",rel:"noopener noreferrer"},_=e("s",null,"多抄抄就会用了",-1),f=s('<p>简单来说，<code>[]</code> 内是正文，<code>{}</code> 内是代码，<code>()</code> 是数组或列表，正文调用函数要加 <code>#</code>，代码里可以直接调。</p><p>关键字也就 <code>set</code> 和 <code>show</code> 常用，<code>set</code> 设置全局属性，<code>show</code> 设置某个组件的（外观）属性。</p><p>剩下的 <code>let</code>，<code>if</code> 什么的都是 rust 的东西，这里不说（</p><h2 id="数学" tabindex="-1"><a class="header-anchor" href="#数学" aria-hidden="true">#</a> 数学</h2>',4),g={href:"https://github.com/brynne8/typst-undergradmath-zh/blob/main/undergradmath.pdf",target:"_blank",rel:"noopener noreferrer"},y=e("h2",{id:"表格",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#表格","aria-hidden":"true"},"#"),t(" 表格")],-1),k={href:"https://github.com/typst/packages/tree/main/packages/preview/tablem/0.1.0",target:"_blank",rel:"noopener noreferrer"},x=s('<p>但是还存在着一些问题，例如无法通过 <code>\\|</code> 转义打出 <code>|</code> 字符，没法控制居中，只能说还在起步阶段。</p><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><p>代码不要直接写 <code>typ</code> 文件里。最好从外部引用，解耦，还方便扔 formatter。</p><h4 id="好看的边框" tabindex="-1"><a class="header-anchor" href="#好看的边框" aria-hidden="true">#</a> 好看的边框</h4>',4),w={href:"https://github.com/typst/typst/issues/1494#issuecomment-1591847881",target:"_blank",rel:"noopener noreferrer"},L=s(`<div class="language-typ line-numbers-mode" data-ext="typ"><pre class="language-typ"><code>#let frame(title: none, body) = {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样用 box 包的代码块有一个致命缺陷：若 box 高度大于剩余页面高度，则会自动换页；若 box 高度大于整个页面的高度，则超出部分不会显示。因此只适合用来引用小块代码，否则就别想要边框了。</p>`,2),q={href:"https://github.com/cherichy/BUAA-typst/blob/ab9bef8ecbdc55d4d0629c63ad96ffd5484b4f7c/functions/codeblock.typ",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"bug",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#bug","aria-hidden":"true"},"#"),t(" bug")],-1),B=e("p",null,"这东西 bug 其实还真不少。。",-1),S=e("h3",{id:"参考文献",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考文献","aria-hidden":"true"},"#"),t(" 参考文献")],-1),V={href:"https://github.com/typst/typst/issues/2548",target:"_blank",rel:"noopener noreferrer"},A=s('<p>从 <code>.bib</code> 引入参考文献时，如果文献类型是 <code>thesis</code>，本该在适当位置加 <code>[D]</code> 的，然而它不会加。。</p><p>感觉是 <em>hayagriva</em> 的锅，但是我翻了下源码发现看不懂。爆了！</p><blockquote><p>看了一下 issue 时间，<em>3 days ago</em>。。那我这次课程论文寄了，唉，扣点分不重要</p></blockquote><p>其他大学模版的解法是用 python 写了个处理脚本，通过 CSL 解析，半自动加参考文献。</p><h3 id="缩进" tabindex="-1"><a class="header-anchor" href="#缩进" aria-hidden="true">#</a> 缩进</h3>',5),N={href:"https://github.com/typst/typst/issues/311",target:"_blank",rel:"noopener noreferrer"},T=e("p",null,[t("中文等语言需要在每行开头缩进两个宽字符。typst 提供了 "),e("code",null,"par()"),t(" 控制缩进行为，但是在标题下面一行的文字却不会被缩进。。")],-1),z={href:"https://github.com/typst/typst/issues/311#issuecomment-1678940781",target:"_blank",rel:"noopener noreferrer"},E=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>show heading: it =&gt;  {
  it
  par()[#text(size:0.5em)[#h(0.0em)]]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>我最早在知乎看到一个解法，但是有副作用。。</p></blockquote>`,2);function I(R,U){const i=d("ExternalLinkIcon"),a=d("RouterLink");return o(),l("div",null,[u,e("blockquote",null,[e("p",null,[e("a",p,[t("Typst"),n(i)]),t(" is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use.")])]),b,e("p",null,[t("基础用法是 CLI 使用，但我配合 "),n(a,{to:"/coding/vscode.html"},{default:c(()=>[t("VSCode")]),_:1}),t(" 使用。")]),m,e("p",null,[e("a",v,[t("这里"),n(i)]),t("有许多大学的毕业论文模版，"),_]),f,e("p",null,[e("a",g,[t("这里"),n(i)]),t("有比较全的数学符号。")]),y,e("p",null,[t("建议直接使用 "),e("a",k,[t("tablem"),n(i)]),t("，大佬写的类 markdown 语法的表格。")]),x,e("p",null,[t("从 "),e("a",w,[t("#1494"),n(i)]),t(" 摸了个好看的代码块样式来，然后自己改改，就是下面的了。")]),L,e("p",null,[t("我去其他地方寻找解法，"),e("a",q,[t("BUAA 的"),n(i)]),t("用 figure 包的也会有这个问题，暂时无解。")]),C,B,S,e("p",null,[e("a",V,[t("issue"),n(i)])]),A,e("p",null,[e("a",N,[t("issue"),n(i)])]),T,e("p",null,[t("所以下面有人提供了"),e("a",z,[t("一个解法"),n(i)]),t("：")]),E])}const F=r(h,[["render",I],["__file","typst.html.vue"]]);export{F as default};
