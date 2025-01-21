import{_ as i,r as s,o,c,a as e,b as t,d as l,w as r,e as a}from"./app-Cn3FtHoM.js";const h={},p=a('<h1 id="远控方案" tabindex="-1"><a class="header-anchor" href="#远控方案"><span>远控方案</span></a></h1><p>上学/出差在外，总有远程控制电脑的需求。我折腾过一些，将经验写于此处。</p><p>我的刚需：Android 控制电脑；P2P 低延迟。</p><h2 id="一体化方案" tabindex="-1"><a class="header-anchor" href="#一体化方案"><span>一体化方案</span></a></h2><p>这里主要是企业级一体化的解决方案，一个方案包揽了全平台的服务端与客户端，并且不需要涉及公网等，一般具有容易上手的 GUI。</p><h3 id="向日葵远程控制" tabindex="-1"><a class="header-anchor" href="#向日葵远程控制"><span>向日葵远程控制</span></a></h3><p>老牌远程控制软件了，以前我用了很久。其拥有优秀的客户端界面交互和无人值守。可惜的是免费版流量会经过官方服务器，无法做到 P2P，延迟还是比较高的。</p><h3 id="parsec" tabindex="-1"><a class="header-anchor" href="#parsec"><span><a href="https://parsec.app/downloads" target="_blank" rel="noopener noreferrer">Parsec</a></span></a></h3><p>也是之前我很喜欢的远控软件，用来 Android 控制 Windows 非常好用。它主打 P2P 的低延迟。与向日葵相比：</p><ul><li>优点： <ul><li>低延迟</li><li>性能占用极低</li></ul></li><li>缺点： <ul><li>全英文</li><li>需要自己解决驱动兼容性问题（如果有的话）</li><li>手机端控制电脑不够友好（无法右击；无法像向日葵一样调出鼠标），建议自带轻便键鼠</li><li>早期版本可能会有音频撕裂问题</li></ul></li></ul><p>不过后来 Parsec 进行了商业化，现在我在 Windows 上甚至一直无法登录（重装系统后也不行，所以是服务端问题），显示连接到 <code>/v2/auth</code> 啥啥啥的超时，所以只能尝试其他的远控方案。</p><h3 id="rustdesk" tabindex="-1"><a class="header-anchor" href="#rustdesk"><span>RustDesk</span></a></h3><p>一个开源的服务端/客户端软件，需要自己用服务器搭建。本质上还是需要让流量走中转服务器，延迟与丢包取决于中转的质量。</p><p>我从不买国内服务器，于是否决了。而且即使这玩意是 Rust 写的，它也有爆出过安全漏洞。</p><h3 id="todesk" tabindex="-1"><a class="header-anchor" href="#todesk"><span>ToDesk</span></a></h3><p>跟向日葵差不多，都是中心化连接。UI 会好看一点，但是我感觉没有向日葵好用。</p><h3 id="teamviewer" tabindex="-1"><a class="header-anchor" href="#teamviewer"><span>TeamViewer</span></a></h3><p>很早之前试过一次，感觉难用，不用了。这玩意国外用得应该更广泛一些。</p><h2 id="分离式方案" tabindex="-1"><a class="header-anchor" href="#分离式方案"><span>分离式方案</span></a></h2><p>由于企业级一体化方案基本没有 P2P（有也不能用），因此我将重心放到了分离式方案上。分离式指用户需要自己部署客户端、服务端、内网穿透等模块，具有复杂与高度自定义化的特点。</p><h3 id="内网穿透" tabindex="-1"><a class="header-anchor" href="#内网穿透"><span>内网穿透</span></a></h3><p>分离式方案要想实现 P2P，关键就在内网穿透这一步。如果我们使用支持 P2P 的虚拟组网内网穿透，就可以享受低延迟的快感。</p>',22),d=a('<h4 id="皎月连" tabindex="-1"><a class="header-anchor" href="#皎月连"><span>皎月连</span></a></h4><p>是一个国内的免费（需要每日签到）内网穿透服务，支持 P2P 和虚拟组网。一般国内教程里都跟 sunshine + moonlight 配套出现。试了一下还行。</p><ul><li>在受控端上安装皎月连，建立帐号并登录；然后在服务端里开启组网模式，开启服务并设为自动开启。最后再让系统开机自启皎月连即可。</li><li>在控制端安装皎月连，使用已有帐号登录，然后选中网络，连接即可。</li></ul><h3 id="vnc" tabindex="-1"><a class="header-anchor" href="#vnc"><span>VNC</span></a></h3><p>VNC 也是 Linux 乃至许多系统上的成熟远控方案。严格来说这是一套协议，服务端和客户端都可以任选。</p><p>VNC 的缺点是传输的是屏幕图像的变化部分而不是视频流，因此不支持修改码率，可能会对带宽造成压力。</p><ul><li><a href="https://sourceforge.net/projects/tigervnc/files/stable/" target="_blank" rel="noopener noreferrer">TigerVNC</a>：用作 Windows 服务端还算合格，默认配置即可。</li><li><a href="https://github.com/gujjwal00/avnc" target="_blank" rel="noopener noreferrer">avnc</a>：Android VNC 客户端。界面中看不中用，首先默认手势卡手，需要改设置；其次是有发现鼠标偏移的情况。</li><li><a href="https://github.com/FreeRDP/" target="_blank" rel="noopener noreferrer">Remmina</a>：Linux GTK VNC 客户端。</li></ul><h3 id="sunshine-moonlight" tabindex="-1"><a class="header-anchor" href="#sunshine-moonlight"><span>sunshine + moonlight</span></a></h3><p>这是一个广泛使用的游戏串流方案，也可以用到远控上。其中 sunshine 是被控端，moonlight 是主控端。二者之间还需要一个虚拟组网的内网穿透进行连接。（需要虚拟组网的原因是，sunshine 用了很多端口，写映射的话比较麻烦）</p>',9),u=e("code",null,"scoop install sunshine",-1),m=e("ul",null,[e("li",null,[t("安装完后，记得在安装目录下 scripts 里"),e("strong",null,"以管理员权限"),t("执行 "),e("em",null,"install-service.bat"),t(", "),e("em",null,"autostart-service.bat"),t(" 等脚本，以便开机自启。")]),e("li",null,"打开网页面板，设置里可以改中文语言，然后要在 Network 里把 UPnP 打开。")],-1),g=e("li",null,[t("moonlight 官方 APP 并不好用，例如无法发送特殊按键。所以这里建议使用"),e("a",{href:"https://github.com/qiin2333/moonlight-android",target:"_blank",rel:"noopener noreferrer"},"第三方 fork"),t("，对键盘有增强。 "),e("ul",null,[e("li",null,"打开 APP，点击右上角加号，将组网里的受控端 IP 填写进去即可。"),e("li",null,[t("实际上也可以将特殊按键的职责交给输入法，使用例如 "),e("a",{href:"https://github.com/Julow/Unexpected-Keyboard",target:"_blank",rel:"noopener noreferrer"},"Unexpected Keyboard"),t(" 可以比较轻松地发送特殊键。")]),e("li",null,"官方 APP 是拖动指针鼠标，第三方是触摸鼠标，但是我两种鼠标都要用，而它们并没有一个切换鼠标样式的选项。因此我是不满意的。")])],-1),f=a('<details class="hint-container details"><summary>其他不采纳方案</summary><h3 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh"><span>SSH</span></a></h3><p>最著名的命令行远程连接方案，可以在任何客户端连上任何服务器。坏处是只有命令行黑窗口，显然不方便操作。Windows 很多 GUI 的东西不能用 CLI 代替，例如最常见的远控浏览器，即使 Linuxer 能驾驭命令行，遇到这种需求也没辙。</p><h3 id="nomachine" tabindex="-1"><a class="header-anchor" href="#nomachine"><span>NoMachine</span></a></h3><p>国外的局域网远控软件，需要内网穿透。全英文，具有非常古老的 UI，并且连接质量也不咋样。然后 windows 受控端卸载程序还卡死了。纯纯的垃圾。</p></details>',1);function _(k,b){const n=s("RouteLink");return o(),c("div",null,[p,e("p",null,[t("具体使用哪个，请前往"),l(n,{to:"/articles/frp.html"},{default:r(()=>[t("内网穿透")]),_:1}),t("页面。")]),d,e("ul",null,[e("li",null,[t("sunshine 安装可以用 "),l(n,{to:"/farraginous/recommend_packages.html#scoop"},{default:r(()=>[t("scoop")]),_:1}),t(" (extras bucket)："),u,t("。 "),m]),g]),f])}const x=i(h,[["render",_],["__file","control.html.vue"]]),v=JSON.parse('{"path":"/articles/control.html","title":"远控方案","lang":"zh-CN","frontmatter":{"date":"2025-01-18T00:00:00.000Z","icon":"house-signal","category":["推荐","评价"],"tag":["横评","工具","桌面端","Windows"],"description":"远控方案 上学/出差在外，总有远程控制电脑的需求。我折腾过一些，将经验写于此处。 我的刚需：Android 控制电脑；P2P 低延迟。 一体化方案 这里主要是企业级一体化的解决方案，一个方案包揽了全平台的服务端与客户端，并且不需要涉及公网等，一般具有容易上手的 GUI。 向日葵远程控制 老牌远程控制软件了，以前我用了很久。其拥有优秀的客户端界面交互和无...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/control.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"远控方案"}],["meta",{"property":"og:description","content":"远控方案 上学/出差在外，总有远程控制电脑的需求。我折腾过一些，将经验写于此处。 我的刚需：Android 控制电脑；P2P 低延迟。 一体化方案 这里主要是企业级一体化的解决方案，一个方案包揽了全平台的服务端与客户端，并且不需要涉及公网等，一般具有容易上手的 GUI。 向日葵远程控制 老牌远程控制软件了，以前我用了很久。其拥有优秀的客户端界面交互和无..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-21T16:58:38.000Z"}],["meta",{"property":"article:tag","content":"横评"}],["meta",{"property":"article:tag","content":"工具"}],["meta",{"property":"article:tag","content":"桌面端"}],["meta",{"property":"article:tag","content":"Windows"}],["meta",{"property":"article:published_time","content":"2025-01-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-21T16:58:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"远控方案\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-01-18T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-21T16:58:38.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"一体化方案","slug":"一体化方案","link":"#一体化方案","children":[{"level":3,"title":"向日葵远程控制","slug":"向日葵远程控制","link":"#向日葵远程控制","children":[]},{"level":3,"title":"Parsec","slug":"parsec","link":"#parsec","children":[]},{"level":3,"title":"RustDesk","slug":"rustdesk","link":"#rustdesk","children":[]},{"level":3,"title":"ToDesk","slug":"todesk","link":"#todesk","children":[]},{"level":3,"title":"TeamViewer","slug":"teamviewer","link":"#teamviewer","children":[]}]},{"level":2,"title":"分离式方案","slug":"分离式方案","link":"#分离式方案","children":[{"level":3,"title":"内网穿透","slug":"内网穿透","link":"#内网穿透","children":[]},{"level":3,"title":"VNC","slug":"vnc","link":"#vnc","children":[]},{"level":3,"title":"sunshine + moonlight","slug":"sunshine-moonlight","link":"#sunshine-moonlight","children":[]}]}],"git":{"createdTime":1737136374000,"updatedTime":1737478718000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":4}]},"readingTime":{"minutes":4.83,"words":1448},"filePathRelative":"articles/control.md","localizedDate":"2025年1月18日","excerpt":"\\n","autoDesc":true}');export{x as comp,v as data};
