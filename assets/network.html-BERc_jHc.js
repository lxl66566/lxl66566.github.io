import{_ as l,o as t,c as s,e as a,a as e,b as i}from"./app-Bf6O9Ap7.js";const n={},r=a('<h1 id="计算机网络" tabindex="-1"><a class="header-anchor" href="#计算机网络"><span>计算机网络</span></a></h1><p>我专业的课只能算是小计网，总共也就 16 学时。</p><p>网课的话，对于已经有一些基础的人，还是直接上<a href="https://www.bilibili.com/video/av849922709" target="_blank" rel="noopener noreferrer">高级计算机网络</a>吧。有一些快速过掉的（例：RDT）可能还需要去看<a href="https://www.bilibili.com/video/av416090103" target="_blank" rel="noopener noreferrer">本科课程</a>。</p><h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础"><span>基础</span></a></h2><h3 id="名词解释" tabindex="-1"><a class="header-anchor" href="#名词解释"><span>名词解释</span></a></h3><p>TTL = Time To Live，生存时间 RTT = Round Trip Time，往返时间</p><h3 id="延时" tabindex="-1"><a class="header-anchor" href="#延时"><span>延时</span></a></h3><p>节点延时 = 处理 + 排队 + 传输 + 传播。</p><ul><li>传输延时：分组 bits / 链路带宽</li><li>传播延时：物理长度 / 物理速度</li><li>流量强度：分组长度 * 到达个数 / 链路输出，in [0,1]</li><li><a href="https://www.zhihu.com/question/317549997" target="_blank" rel="noopener noreferrer">排队延时与流量强度公式</a></li></ul><h3 id="分层" tabindex="-1"><a class="header-anchor" href="#分层"><span>分层</span></a></h3><p>各层协议数据单元</p><ul><li>应用层：message</li><li>传输层：segment</li><li>网络层：packet</li><li>数据链路层：frame</li><li>物理层：bit</li></ul><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3><p>平均吞吐量取决于瓶颈链路。</p><h2 id="协议层-传输层" tabindex="-1"><a class="header-anchor" href="#协议层-传输层"><span>协议层（传输层）</span></a></h2><h3 id="rtt" tabindex="-1"><a class="header-anchor" href="#rtt"><span>RTT</span></a></h3><p>指数加权移动平均</p><ul><li>EstimatedRTT = (1 − 𝛼) EstimatedRTT + 𝛼 SampleRTT</li><li>DevRTT = (1 − 𝛽) DevRTT + 𝛽 |SampleRTT − EstimatedRTT|</li></ul><h3 id="rdt" tabindex="-1"><a class="header-anchor" href="#rdt"><span>RDT</span></a></h3><p>RDT = Reliable Data Transfer</p><ul><li>1.0：无</li><li>2.0：反馈 ACK(Acknowledgement) / NAK(Negative Acknowledgement)</li><li>2.1：分组编号</li><li>2.2：NAK free, 使用 ACK 回应上一个通过校验的分组号</li><li>3.0：超时重传</li></ul><p>流水线协议：为了解决 RDT 利用率低的问题，使用 SW(Slide Window)。</p><p>发送窗口（SW）：已发送，未确认；接收窗口（RW）。</p><p>RW &gt; 1 时，发送的 ACK 序号等于接收到的。</p><ul><li>RW = 1 时，若出错，将重传所有 SW 内的分组；</li><li>RW &gt; 1 时，若出错，只重传出错分组。</li></ul><h3 id="拥塞控制" tabindex="-1"><a class="header-anchor" href="#拥塞控制"><span>拥塞控制</span></a></h3><p>对于拥塞窗口大小（TCP Reno）：</p><ul><li>慢启动：从 1 开始每时刻 * 2</li><li>拥塞避免时：每时刻 + 1</li><li>3 个冗余 ACK：减半（可能需要 +3）</li><li>超时：重设为 1；sslhresh 设为 cwnd 的一半。</li></ul><h2 id="链路层" tabindex="-1"><a class="header-anchor" href="#链路层"><span>链路层</span></a></h2><p>奇偶校验：算 1 的个数</p>',30),p=e("p",null,[i("循环冗余码：补零，然后模 2 除法。"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mo",{stretchy:"false"},"("),e("mi",null,"D"),e("mo",null,"<"),e("mo",null,"<"),e("mi",null,"r"),e("mo",{stretchy:"false"},")"),e("mi",null,"m"),e("mi",null,"o"),e("msub",null,[e("mi",null,"d"),e("mn",null,"2")]),e("mi",null,"G")]),e("annotation",{encoding:"application/x-tex"},"(D << r) mod_2 G")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mopen"},"("),e("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D"),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),e("span",{class:"mrel"},"<<"),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),e("span",{class:"mclose"},")"),e("span",{class:"mord mathnormal"},"m"),e("span",{class:"mord mathnormal"},"o"),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"d"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.3011em"}},[e("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},"2")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])]),e("span",{class:"mord mathnormal"},"G")])])])],-1),o=a('<p>报文在不同子网中传输：IP 地址始终不变，MAC 地址变。</p><h2 id="无线网" tabindex="-1"><a class="header-anchor" href="#无线网"><span>无线网</span></a></h2><p>多路访问协议：多个设备共享同一通信信道的协议。</p><h2 id="external" tabindex="-1"><a class="header-anchor" href="#external"><span>external</span></a></h2><ol><li><a href="https://cangsdarm.github.io/illustrate/quic" target="_blank" rel="noopener noreferrer">图解 QUIC 连接 - 对每一个字节的解释和再现</a></li></ol>',5),h=[r,p,o];function c(m,d){return t(),s("div",null,h)}const u=l(n,[["render",c],["__file","network.html.vue"]]),T=JSON.parse('{"path":"/learning/network.html","title":"计算机网络","lang":"zh-CN","frontmatter":{"date":"2023-10-20T00:00:00.000Z","icon":"network-wired","category":["学习"],"description":"计算机网络 我专业的课只能算是小计网，总共也就 16 学时。 网课的话，对于已经有一些基础的人，还是直接上高级计算机网络吧。有一些快速过掉的（例：RDT）可能还需要去看本科课程。 基础 名词解释 TTL = Time To Live，生存时间 RTT = Round Trip Time，往返时间 延时 节点延时 = 处理 + 排队 + 传输 + 传播。...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/learning/network.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"计算机网络"}],["meta",{"property":"og:description","content":"计算机网络 我专业的课只能算是小计网，总共也就 16 学时。 网课的话，对于已经有一些基础的人，还是直接上高级计算机网络吧。有一些快速过掉的（例：RDT）可能还需要去看本科课程。 基础 名词解释 TTL = Time To Live，生存时间 RTT = Round Trip Time，往返时间 延时 节点延时 = 处理 + 排队 + 传输 + 传播。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-22T12:41:38.000Z"}],["meta",{"property":"article:published_time","content":"2023-10-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-22T12:41:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"计算机网络\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-10-22T12:41:38.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"基础","slug":"基础","link":"#基础","children":[{"level":3,"title":"名词解释","slug":"名词解释","link":"#名词解释","children":[]},{"level":3,"title":"延时","slug":"延时","link":"#延时","children":[]},{"level":3,"title":"分层","slug":"分层","link":"#分层","children":[]},{"level":3,"title":"其他","slug":"其他","link":"#其他","children":[]}]},{"level":2,"title":"协议层（传输层）","slug":"协议层-传输层","link":"#协议层-传输层","children":[{"level":3,"title":"RTT","slug":"rtt","link":"#rtt","children":[]},{"level":3,"title":"RDT","slug":"rdt","link":"#rdt","children":[]},{"level":3,"title":"拥塞控制","slug":"拥塞控制","link":"#拥塞控制","children":[]}]},{"level":2,"title":"链路层","slug":"链路层","link":"#链路层","children":[]},{"level":2,"title":"无线网","slug":"无线网","link":"#无线网","children":[]},{"level":2,"title":"external","slug":"external","link":"#external","children":[]}],"git":{"createdTime":1697814833000,"updatedTime":1729600898000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":2}]},"readingTime":{"minutes":1.77,"words":532},"filePathRelative":"learning/network.md","localizedDate":"2023年10月20日","excerpt":"\\n","autoDesc":true}');export{u as comp,T as data};