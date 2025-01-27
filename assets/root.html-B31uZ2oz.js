import{_ as s,r as n,o as d,c,a as e,b as o,d as t,w as l,e as i}from"./app-CST2w-Ku.js";const p={},m=i('<h1 id="刷机" tabindex="-1"><a class="header-anchor" href="#刷机"><span>刷机</span></a></h1><p>刷机圈一直是一个排外的圈子。当 Android 的封闭碰上了刷机圈的封闭……</p><p>刷机圈一直岌岌可危。君不见 LSPosed Archived...</p><blockquote><p>Android 的封闭社区内充满了悖论：如果你需要 <code>dd ... of=/sdcard/boot.img</code>，你需要 root；因为需要 root 所以需要 <code>boot.img</code>。。</p></blockquote><h2 id="刷机工具" tabindex="-1"><a class="header-anchor" href="#刷机工具"><span>刷机工具</span></a></h2>',5),h=e("code",null,"scoop install adb",-1),u=i('<li>用来从 <code>payload.bin</code> 提取分区的。（按照推荐顺序排序） <ul><li><a href="https://github.com/5ec1cff/payload-dumper" target="_blank" rel="noopener noreferrer">5ec1cff/payload-dumper</a>：群友激情制作，可以从 URL 里提取部分分区，大幅减少了下载需求。</li><li><a href="https://github.com/libxzr/FastbootEnhance" target="_blank" rel="noopener noreferrer">FastbootEnhance</a>，提供一个 GUI 界面，解 <code>payload.bin</code> 很好用。但是对于刷入则不太行了，至少我 Oneplus 不行，启到 fastbootd 也卡在半中间。</li><li><s><a href="https://github.com/ssut/payload-dumper-go" target="_blank" rel="noopener noreferrer">payload-dumper-go</a>：解 <code>payload.bin</code> 的另一个 CLI 工具</s>，被 FastbootEnhance 上位替代了。payload-dumper 要解就只能解全部，太傻了，不过至少能用。</li></ul></li><li>小米/红米： <ul><li>MIUI 刷机工具：小米官方提供的刷机工具。能用就是好的，至少小米一般不用太担心变砖，只要能进 fastboot 就能活。 <ul><li>千万不要在右下角选择 lock（我选择直接删线刷包里的 <em>*lock.sh/bat</em>）</li><li>最好把 Configuration 中的 CheckPoint 删了。</li><li>想想一加甚至没有刷全量包的工具。。开始羡慕起小米来了。</li></ul></li><li><s>MIUI 解锁工具</s> 时代结束了，现在的澎湃 OS 解锁要答题（</li></ul></li>',2),f=e("h2",{id:"redmi-note-10-pro",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#redmi-note-10-pro"},[e("span",null,"Redmi Note 10 pro")])],-1),_=e("blockquote",null,[e("p",null,[o("题外话："),e("s",null,"高考结束后买的手机，当时还是一个普通人，自然不知道刷机解 bl root 这些东西，等我想解的时候已经太迟了，数据已经太多了。下一部手机必 root。"),o(" 然而等到了一个能够使我无视数据的契机。"),e("br"),e("span",{class:"heimu",title:"你知道的太多了"},"忘了备份应用时间了，妈的；后来发现这东西没法备份。")])],-1),b=e("p",null,"20230614 记一次失败的刷机（redmi note 10 pro, sweet）。",-1),g=e("li",null,"解 BL 锁，等了 7days。",-1),k=e("p",null,[o("没有第三方 recovery 就无法卡刷，而一些类原生例如 Havoc OS | Evolution OS 只提供了卡刷包，无法线刷。寄。"),e("s",null,"（据说有 python 脚本能把卡刷包转成线刷包，没试过，有生之年）")],-1),x=e("p",null,"再退，用国行 MIUI (chopin)，不使用 twrp 刷入 magisk。（kernelSU 不支持：非 GKI 设备内核）",-1),y=i('<li>安装 <a href="https://github.com/topjohnwu/Magisk/releases/latest" target="_blank" rel="noopener noreferrer">magisk</a>。</li><li>从原生线刷包把 <code>boot.img</code> 拷到手机上。</li><li>在 magisk 中，选择安装 magisk（修补一个文件），选择 <code>boot.img</code> 修补。</li><li>再将修补后的 <code>magiskxxx.img</code> 拷回电脑，<code>fastboot flash boot magiskxxx.img &amp;&amp; fastboot reboot</code> 刷新 boot。</li>',4),E=e("h2",{id:"mipad-5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mipad-5"},[e("span",null,"mipad 5")])],-1),B=e("p",null,"20230715，尝试刷我的小米平板 5（nabu）。",-1),A=e("p",null,[o("折腾了一下 twrp，在 Github 下载了一个"),e("a",{href:"https://github.com/bm0x/twrp_device_xiaomi_nabu/releases",target:"_blank",rel:"noopener noreferrer"},"不明来源的 twrp"),o(" 刷入，又寄了，表现为闪屏无法启动。算了，这年头 VAB 分区的我再也不想再折腾 twrp 了。好在有了第一次的刷机经验，没有手忙脚乱，能进 fastboot 就能救。")],-1),v=e("p",null,[o("退而求其次，刷 EU。在"),e("a",{href:"https://xiaomirom.com/download/xiaomi-pad-5-nabu-stable-V14.0.4.0.TKXMIXM/#global-fastboot",target:"_blank",rel:"noopener noreferrer"},"这里"),o("找了个欧版 ROM，这次倒是没出什么岔子，10min 后顺利刷入。那接下来的 root & magisk 也是水到渠成了，这里按下不表。")],-1),w=e("p",null,"但是等我开始搞机，渐渐发现事情没我想象得那么简单。",-1),M=e("li",null,"EU 的 Google 全家桶也是无法卸载（即使有些边角如 YT Music 能卸载，Play store 也会再悄悄给你下回来），近 20 个 Google 密密麻麻排着嘲笑我，数量甚至比国行还多；",-1),I=e("li",null,[o("后台运行着好多叫不出名字的奇怪服务，有些我 Google 半天也搜不到是什么（例如 "),e("code",null,"com.qti.qcc"),o("）；")],-1),S=i('<p>然后使用 miflash 刷回国行；刷入失败。一重启就自动进 fastboot。由于<a href="https://xiaomirom.com/rom/mi-pad-5-nabu-china-fastboot-recovery-rom/" target="_blank" rel="noopener noreferrer">此 ROM 下载地址</a>没有 MD5，于是<a href="https://xiaomifirmwareupdater.com/archive/miui/nabu/" target="_blank" rel="noopener noreferrer">换了一个</a>重下，校验 MD5，没有任何问题。刷机工具 Configuration 设置 EraseAll，再刷，还是不行。然后刷欧版，就行了。。由于每次刷机都需要 10min 以上，我连着刷了 5 6 次，等待的时间确实紧张难熬。</p><p>所以刷欧版是一件非常冒险的事：在只使用初级工具前提下<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup>，这一步没有后悔药，没法再刷回其他系统<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup>。</p><h2 id="oneplus-ace-racing-edition" tabindex="-1"><a class="header-anchor" href="#oneplus-ace-racing-edition"><span>Oneplus Ace Racing edition</span></a></h2><p>这里是 <em>一加 Ace 竞速版</em> 的 root 过程。</p><p>一加的教程基本都是 <em>daxiaamu</em> 的一键工具箱，让人 root 了以后却不知其所以然。这样是不好的。再说了，这个工具箱也无法刷全量包。</p><p>找了半天没找到这个机型如何刷 Oxygen OS，也没有提供线刷 ROM <span class="heimu" title="你知道的太多了">daxiaamu 自称官方</span>，怕出问题，还是将就用着并不喜欢的 ColorOS 吧。</p><p>解 BL 的过程中，无法通过音量键选择 unlock。。甚至也无法长按开机键重启。用 <code>fastboot reboot</code> 试了一下，第二次还是一样。具体地：</p><ul><li>在 <em>fastboot</em> 界面，电脑执行 <code>fastboot flashing unlock</code>，手机出现文字且立刻 timeout，无法选择，无法解锁。</li><li><code>... failed to record unlock state</code></li><li>长按 <em>音量+</em> 键输入解锁指令，可成功解锁。</li><li>或者长按 <em>音量-</em> 键输入解锁指令，此时不会弹出 timeout，再按 <em>音量+</em> 即可。</li></ul><p>莫名其妙。我测过音量键，并无问题。总之最终是解锁了。root 的折腾过程中也遇到了很多问题：</p><p>下载 rom 包，解出一个 <code>payload.bin</code>；目的：从中提取出 <code>boot.img</code>。然后有：</p>',10),U=e("li",null,[o("用不知哪下的 "),e("code",null,"payload_dumper.exe"),o("（一眼 python 打包），发现不能自定义输入输出路径。勉为其难地把 rom 拷进同目录，运行闪退。")],-1),O=e("a",{href:"https://github.com/vm03/payload_dumper",target:"_blank",rel:"noopener noreferrer"},"源码",-1),R={class:"heimu",title:"你知道的太多了"},T=e("code",null,"_lzma.LZMAError: Input format not supported by decoder",-1),L=e("li",null,"我甚至还重新解压到 RAMDisk 然后 checksum 了一下，不出所料，并没有什么问题。",-1),C=e("li",null,[o("在 "),e("a",{href:"https://github.com/vm03/payload_dumper/issues/47#issuecomment-1311973400",target:"_blank",rel:"noopener noreferrer"},"issue"),o(" 中找到另一个 go 版本，亲测可用，速度还快。")],-1),N=e("li",null,"最后发现 FastbootEnhance 可以选择某些 img 解包。。",-1),D=e("li",null,"后来又发现一个 fork 版本可以仅下载某分区。",-1),F=i('<p>得到了 <code>boot.img</code>，剩下的就是用 magisk 修补，刷入了。跟<a href="#redmi-note-10-pro">用小米时</a>一样，不再赘述。</p><h2 id="关于-kernelsu" tabindex="-1"><a class="header-anchor" href="#关于-kernelsu"><span>关于 KernelSU</span></a></h2><p>在<a href="https://t.me/withabsolutex/1601" target="_blank" rel="noopener noreferrer">浪费了两个小时</a>后，我想说：<strong>如果你不是开发者，别碰 KernelSU</strong>。</p><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p>指 miflash + adb。我有考虑过使用<a href="https://web.vip.miui.com/page/info/mio/mio/detail?postId=1655550" target="_blank" rel="noopener noreferrer">磁盘模式工具</a>甚至更底层的方法，但是尚未有收入的我还是无法承担飙升的刷砖风险。 <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li><li id="footnote2" class="footnote-item"><p>暂不清楚是只是 <em>无法刷回国行</em> 还是 <em>无法刷成其他任一系统</em>。推测是刷 EU 的分区(?)更改比国行的多，导致刷回国行时未对额外分区进行更改。 <a href="#footnote-ref2" class="footnote-backref">↩︎</a></p></li></ol></section>',5);function P(Z,G){const a=n("RouteLink"),r=n("dtls");return d(),c("div",null,[m,e("ul",null,[e("li",null,[o("adb/fastboot 套，这个不多说，100% 必备。最方便的安装是 "),t(a,{to:"/farraginous/recommend_packages.html#scoop"},{default:l(()=>[o("scoop")]),_:1}),o("："),h,o("。")]),u]),f,_,b,e("ol",null,[g,e("li",null,[o("刷入 twrp "),t(a,{to:"/articles/mobile/problem.html#%E5%88%B7%E5%85%A5-twrp-%E5%A4%B1%E8%B4%A5"},{default:l(()=>[o("失败")]),_:1}),o("。")])]),k,e("p",null,[o("退而求其次，想刷 EU 版 MIUI，"),t(a,{to:"/articles/mobile/problem.html#%E7%BA%BF%E5%88%B7-global-%E5%A4%B1%E8%B4%A5"},{default:l(()=>[o("失败 again")]),_:1}),o("，寄。")]),x,e("ol",null,[y,e("li",null,[o("好了，之后就是"),t(a,{to:"/articles/mobile/module_and_app.html#magisk"},{default:l(()=>[o("另一个板块")]),_:1}),o("了。")])]),E,B,A,v,w,e("ol",null,[M,I,e("li",null,[o("也间接导致了"),t(a,{to:"/articles/mobile/problem.html#%E4%B9%B1%E5%86%BB%E7%BB%93"},{default:l(()=>[o("之后的系统崩溃")]),_:1}),o("。（我承认主要责任在我）")])]),S,t(r,{alt:"一些血泪史"},{default:l(()=>[e("ol",null,[U,e("li",null,[o("去找 payload_dumper 的"),O,o("，搞环境"),e("span",R,[o("由于前几天迁移 python 导致 "),t(a,{to:"/coding/python.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%AF%A5%E4%BD%BF%E7%94%A8-pipx"},{default:l(()=>[o("pipx 及其安装的软件路径坏了")]),_:1}),o("，")]),o("又搞了好久。运行，报错 "),T,o("...")]),L,C,N,D])]),_:1}),F])}const q=s(p,[["render",P],["__file","root.html.vue"]]),z=JSON.parse('{"path":"/articles/mobile/root.html","title":"刷机","lang":"zh-CN","frontmatter":{"date":"2023-01-22T00:00:00.000Z","icon":"android","category":["教程","经历"],"tag":["移动端"],"description":"刷机 刷机圈一直是一个排外的圈子。当 Android 的封闭碰上了刷机圈的封闭…… 刷机圈一直岌岌可危。君不见 LSPosed Archived... Android 的封闭社区内充满了悖论：如果你需要 dd ... of=/sdcard/boot.img，你需要 root；因为需要 root 所以需要 boot.img。。 刷机工具 adb/fast...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/mobile/root.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"刷机"}],["meta",{"property":"og:description","content":"刷机 刷机圈一直是一个排外的圈子。当 Android 的封闭碰上了刷机圈的封闭…… 刷机圈一直岌岌可危。君不见 LSPosed Archived... Android 的封闭社区内充满了悖论：如果你需要 dd ... of=/sdcard/boot.img，你需要 root；因为需要 root 所以需要 boot.img。。 刷机工具 adb/fast..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-20T14:55:37.000Z"}],["meta",{"property":"article:tag","content":"移动端"}],["meta",{"property":"article:published_time","content":"2023-01-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-20T14:55:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"刷机\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-20T14:55:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"刷机工具","slug":"刷机工具","link":"#刷机工具","children":[]},{"level":2,"title":"Redmi Note 10 pro","slug":"redmi-note-10-pro","link":"#redmi-note-10-pro","children":[]},{"level":2,"title":"mipad 5","slug":"mipad-5","link":"#mipad-5","children":[]},{"level":2,"title":"Oneplus Ace Racing edition","slug":"oneplus-ace-racing-edition","link":"#oneplus-ace-racing-edition","children":[]},{"level":2,"title":"关于 KernelSU","slug":"关于-kernelsu","link":"#关于-kernelsu","children":[]}],"git":{"createdTime":1699459657000,"updatedTime":1718895337000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":3}]},"readingTime":{"minutes":6.17,"words":1850},"filePathRelative":"articles/mobile/root.md","localizedDate":"2023年1月22日","excerpt":"\\n","autoDesc":true}');export{q as comp,z as data};