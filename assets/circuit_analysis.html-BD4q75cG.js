import{_ as t,o as e,c as n,e as l,a as s,b as a}from"./app-B0fWRK6O.js";const i={},m=l('<h1 id="电路分析基础" tabindex="-1"><a class="header-anchor" href="#电路分析基础"><span>电路分析基础</span></a></h1><p>此处仅记载部分重要内容。更多内容请前往查看<a href="https://github.com/lxl66566/my-college-files/blob/main/%E7%94%B5%E8%B7%AF%E5%8E%9F%E7%90%86%E5%8F%8A%E5%85%B6%E5%AE%9E%E9%AA%8C/%E8%AF%BE%E4%BB%B6/%E7%94%B5%E8%B7%AF%E5%88%86%E6%9E%90_%E5%A4%8D%E4%B9%A0%E7%BA%B2%E8%A6%81.pdf" target="_blank" rel="noopener noreferrer">Github - 电子与电路分析_复习纲要</a>。</p><h2 id="分析法" tabindex="-1"><a class="header-anchor" href="#分析法"><span>分析法</span></a></h2><h3 id="回路电流法" tabindex="-1"><a class="header-anchor" href="#回路电流法"><span>回路电流法</span></a></h3><p>自电阻*自电流 + 互电阻*互电流（同向为正） = 压升</p><h3 id="结点电压法" tabindex="-1"><a class="header-anchor" href="#结点电压法"><span>结点电压法</span></a></h3><blockquote><p>第一步：把电压源与阻抗的串联形式化为电流源与导纳的并联形式</p><p>第二步：标出节点，并把其中一个节点选为参考节点（一般为 0 电位点）</p><p>第三步：列出节点电压方程。</p><p>列方程方法：自电导乘以该节点电压 +∑ 与该节点相邻的互电导乘以相邻节点的电压 = 流入该节点的电流源的电流 - 流出该节点电流源的电流</p><p>【注：这里的 “+” 是 考虑了互导纳是电导的相反数，如果不考虑相反数的话，这个 “+” 就得写为 “-”】</p><p>第四步：联立求解出上面所有的节点电压方程。</p></blockquote><p>——来自<a href="https://baike.baidu.com/item/%E8%8A%82%E7%82%B9%E7%94%B5%E5%8E%8B%E6%B3%95/7725643" target="_blank" rel="noopener noreferrer">百度百科</a></p><p><strong>一定要注意：互电导为负</strong></p><h2 id="电路定理" tabindex="-1"><a class="header-anchor" href="#电路定理"><span>电路定理</span></a></h2><h3 id="戴维南定理" tabindex="-1"><a class="header-anchor" href="#戴维南定理"><span>戴维南定理</span></a></h3>',11),p=s("p",null,[a("求"),s("span",null,[s("span",{"v-pre":"",class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mstyle",{scriptlevel:"0",displaystyle:"true"},[s("msub",null,[s("mi",null,"R"),s("mrow",null,[s("mi",null,"e"),s("mi",null,"q")])])])]),s("annotation",{encoding:"application/x-tex"},"\\displaystyle R_{eq}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.9694em","vertical-align":"-0.2861em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.00773em"}},"R"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0077em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"e"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"q")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])])])])])]),a("的方法：")],-1),r=s("ol",null,[s("li",null,"直接法：电源置零，求电阻（适用于无受控源电路）"),s("li",null,"电源置零，加流求压 / 加压求流"),s("li",null,[a("电源保留，求开路电压 / 短路电流（可顺带求出 "),s("span",null,[s("span",{"v-pre":"",class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mstyle",{scriptlevel:"0",displaystyle:"true"},[s("msub",null,[s("mi",null,"U"),s("mrow",null,[s("mi",null,"o"),s("mi",null,"c")])])])]),s("annotation",{encoding:"application/x-tex"},"\\displaystyle U_{oc}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.109em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"oc")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])])]),a("）")])],-1),c=s("h3",{id:"最大功率",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#最大功率"},[s("span",null,"最大功率")])],-1),h=s("p",null,[s("span",null,[s("span",{"v-pre":"",class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mstyle",{scriptlevel:"0",displaystyle:"true"},[s("msub",null,[s("mi",null,"P"),s("mrow",null,[s("mi",null,"m"),s("mi",null,"a"),s("mi",null,"x")])]),s("mo",null,"="),s("mfrac",null,[s("msubsup",null,[s("mi",null,"U"),s("mrow",null,[s("mi",null,"o"),s("mi",null,"c")]),s("mn",null,"2")]),s("mrow",null,[s("mn",null,"4"),s("msub",null,[s("mi",null,"R"),s("mrow",null,[s("mi",null,"e"),s("mi",null,"q")])])])])])]),s("annotation",{encoding:"application/x-tex"},"\\displaystyle P_{max}=\\frac{U_{oc}^2}{4R_{eq}}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"P"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.1389em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"ma"),s("span",{class:"mord mathnormal mtight"},"x")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.4632em","vertical-align":"-0.9721em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.4911em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"4"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.00773em"}},"R"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0077em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"e"),s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"q")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2861em"}},[s("span")])])])])])])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8141em"}},[s("span",{style:{top:"-2.453em","margin-left":"-0.109em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"oc")])])]),s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"2")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.247em"}},[s("span")])])])])])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.9721em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})])])])])])],-1),o=s("h2",{id:"一阶电路",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#一阶电路"},[s("span",null,"一阶电路")])],-1),g=s("p",null,[a("零输入："),s("span",null,[s("span",{"v-pre":"",class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mstyle",{scriptlevel:"0",displaystyle:"true"},[s("msub",null,[s("mi",null,"U"),s("mi",null,"s")]),s("mo",null,"="),s("mn",null,"0")])]),s("annotation",{encoding:"application/x-tex"},"\\displaystyle U_s=0")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.109em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"s")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"0")])])])])],-1),u=s("p",null,[a("零状态："),s("span",null,[s("span",{"v-pre":"",class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mstyle",{scriptlevel:"0",displaystyle:"true"},[s("msub",null,[s("mi",null,"i"),s("mi",null,"L")]),s("mo",{stretchy:"false"},"("),s("mn",null,"0"),s("mo",null,"+"),s("mo",{stretchy:"false"},")"),s("mo",{stretchy:"false"},"("),s("mi",null,"o"),s("mi",null,"r"),s("mtext",null," "),s("msub",null,[s("mi",null,"U"),s("mi",null,"C")]),s("mo",{stretchy:"false"},"("),s("mn",null,"0"),s("mo",null,"+"),s("mo",{stretchy:"false"},")"),s("mo",{stretchy:"false"},")"),s("mo",null,"="),s("mn",null,"0")])]),s("annotation",{encoding:"application/x-tex"},"\\displaystyle i_L(0+)(or\\ U_C(0+))=0")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"i"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"L")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mopen"},"("),s("span",{class:"mord"},"0"),s("span",{class:"mord"},"+"),s("span",{class:"mclose"},")"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"or"),s("span",{class:"mspace"}," "),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.109em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"C")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mopen"},"("),s("span",{class:"mord"},"0"),s("span",{class:"mord"},"+"),s("span",{class:"mclose"},"))"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"0")])])])])],-1),d=l('<h2 id="相量" tabindex="-1"><a class="header-anchor" href="#相量"><span>相量</span></a></h2><p>解题记得画相量图，有分。</p><h2 id="三相电路" tabindex="-1"><a class="header-anchor" href="#三相电路"><span>三相电路</span></a></h2><p>三角负载转星形负载：Z&#39; = Z/3</p><p>三角电源转星形电源：有效值 / sqrt(3), 相位角 - 30°</p><h3 id="三相功率" tabindex="-1"><a class="header-anchor" href="#三相功率"><span>三相功率</span></a></h3>',6),y=s("p",null,[a("复功率 "),s("span",null,[s("span",{"v-pre":"",class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mstyle",{scriptlevel:"0",displaystyle:"true"},[s("mi",null,"S"),s("mo",null,"="),s("msqrt",null,[s("mn",null,"3")]),s("msub",null,[s("mi",null,"U"),s("mi",null,"L")]),s("msub",null,[s("mi",null,"I"),s("mi",null,"L")]),s("mi",null,"c"),s("mi",null,"o"),s("mi",null,"s"),s("msub",null,[s("mi",null,"φ"),s("mi",null,"z")]),s("mo",null,"+"),s("mi",null,"j"),s("msqrt",null,[s("mn",null,"3")]),s("msub",null,[s("mi",null,"U"),s("mi",null,"L")]),s("msub",null,[s("mi",null,"I"),s("mi",null,"L")]),s("mi",null,"s"),s("mi",null,"i"),s("mi",null,"n"),s("msub",null,[s("mi",null,"φ"),s("mi",null,"z")])])]),s("annotation",{encoding:"application/x-tex"},"\\displaystyle S=\\sqrt{3}U_LI_Lcos\\varphi_z+j\\sqrt{3}U_LI_Lsin\\varphi_z")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"S"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.1505em","vertical-align":"-0.1944em"}}),s("span",{class:"mord sqrt"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.9561em"}},[s("span",{class:"svg-align",style:{top:"-3em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord",style:{"padding-left":"0.833em"}},[s("span",{class:"mord"},"3")])]),s("span",{style:{top:"-2.9161em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"hide-tail",style:{"min-width":"0.853em",height:"1.08em"}},[s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"400em",height:"1.08em",viewBox:"0 0 400000 1080",preserveAspectRatio:"xMinYMin slice"},[s("path",{d:`M95,702
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l0 -0
c5.3,-9.3,12,-14,20,-14
H400000v40H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M834 80h400000v40h-400000z`})])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.0839em"}},[s("span")])])])]),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.109em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"L")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0785em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"L")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"cos"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"φ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.04398em"}},"z")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.1505em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.05724em"}},"j"),s("span",{class:"mord sqrt"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.9561em"}},[s("span",{class:"svg-align",style:{top:"-3em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord",style:{"padding-left":"0.833em"}},[s("span",{class:"mord"},"3")])]),s("span",{style:{top:"-2.9161em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"hide-tail",style:{"min-width":"0.853em",height:"1.08em"}},[s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"400em",height:"1.08em",viewBox:"0 0 400000 1080",preserveAspectRatio:"xMinYMin slice"},[s("path",{d:`M95,702
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l0 -0
c5.3,-9.3,12,-14,20,-14
H400000v40H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M834 80h400000v40h-400000z`})])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.0839em"}},[s("span")])])])]),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.109em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"L")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3283em"}},[s("span",{style:{top:"-2.55em","margin-left":"-0.0785em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"L")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mord mathnormal"},"in"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"φ"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.04398em"}},"z")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])])]),a("；其中 "),s("code",null,"z"),a(" 为阻抗角，电压电流均为线（星形）")],-1),v=[m,p,r,c,h,o,g,u,d,y];function b(x,_){return e(),n("div",null,v)}const f=t(i,[["render",b],["__file","circuit_analysis.html.vue"]]),w=JSON.parse('{"path":"/learning/circuit_analysis.html","title":"电路分析基础","lang":"zh-CN","frontmatter":{"date":"2022-12-26T00:00:00.000Z","icon":"circle-nodes","category":["学习"],"tag":["电子与电路"],"description":"电路分析基础 此处仅记载部分重要内容。更多内容请前往查看Github - 电子与电路分析_复习纲要。 分析法 回路电流法 自电阻*自电流 + 互电阻*互电流（同向为正） = 压升 结点电压法 第一步：把电压源与阻抗的串联形式化为电流源与导纳的并联形式 第二步：标出节点，并把其中一个节点选为参考节点（一般为 0 电位点） 第三步：列出节点电压方程。 列方...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/learning/circuit_analysis.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"电路分析基础"}],["meta",{"property":"og:description","content":"电路分析基础 此处仅记载部分重要内容。更多内容请前往查看Github - 电子与电路分析_复习纲要。 分析法 回路电流法 自电阻*自电流 + 互电阻*互电流（同向为正） = 压升 结点电压法 第一步：把电压源与阻抗的串联形式化为电流源与导纳的并联形式 第二步：标出节点，并把其中一个节点选为参考节点（一般为 0 电位点） 第三步：列出节点电压方程。 列方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-22T12:41:38.000Z"}],["meta",{"property":"article:tag","content":"电子与电路"}],["meta",{"property":"article:published_time","content":"2022-12-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-22T12:41:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"电路分析基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-12-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-22T12:41:38.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析法","slug":"分析法","link":"#分析法","children":[{"level":3,"title":"回路电流法","slug":"回路电流法","link":"#回路电流法","children":[]},{"level":3,"title":"结点电压法","slug":"结点电压法","link":"#结点电压法","children":[]}]},{"level":2,"title":"电路定理","slug":"电路定理","link":"#电路定理","children":[{"level":3,"title":"戴维南定理","slug":"戴维南定理","link":"#戴维南定理","children":[]},{"level":3,"title":"最大功率","slug":"最大功率","link":"#最大功率","children":[]}]},{"level":2,"title":"一阶电路","slug":"一阶电路","link":"#一阶电路","children":[]},{"level":2,"title":"相量","slug":"相量","link":"#相量","children":[]},{"level":2,"title":"三相电路","slug":"三相电路","link":"#三相电路","children":[{"level":3,"title":"三相功率","slug":"三相功率","link":"#三相功率","children":[]}]}],"git":{"createdTime":1672067230000,"updatedTime":1729600898000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":2}]},"readingTime":{"minutes":1.74,"words":523},"filePathRelative":"learning/circuit_analysis.md","localizedDate":"2022年12月26日","excerpt":"\\n","autoDesc":true}');export{f as comp,w as data};