import{_ as d,r as i,o as c,c as p,a as e,b as o,d as t,w as n,e as a}from"./app-BzilSif_.js";const h={},m=e("h1",{id:"遇到的问题",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#遇到的问题"},[e("span",null,"遇到的问题")])],-1),u=e("p",null,"时间倒序。",-1),g=e("h2",{id:"一加无限重启",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一加无限重启"},[e("span",null,"一加无限重启")])],-1),b=e("em",null,"神仙自动救砖",-1),_=a('<p>刷回官方 <code>boot.img</code>，但是还是无限重启。看样子原因并非模块，而可能是冻结了不该冻结的东西（maybe <em>手机管家</em>？）。然后进 recovery 清除了数据分区，才能进入。</p><p>后来我测试了一下，root 的裸机，冻结一堆应用然后重启，确实变砖了。然后开始测试能冻结的应用。</p><p>假如测到了变砖的应用，我需要重启 recovery 恢复，再重新开机准备选项，root 一遍，才能进行下一轮测试，时间（与<span class="heimu" title="你知道的太多了">产品</span>寿命）成本还是很高的。</p><p>第一次测试：手机管家，居然不是？</p><p>第二次测试：OPPO* Carlink 主题* 智能* 智慧*，没有问题</p><p>第三次测试：远程守护服务 游戏* 应用?安装* 一加互传 小游戏 小布* 下载*，寄了，答案就在这里！（<code>?</code> 匹配 0 或 1 个字符）</p><p>这时候开始俄罗斯轮盘赌了，舍友赌一个 <code>小布*</code>（：<em>我不认为一加会让你把小布卸了去装小爱同学</em>），我则赌 <code>应用?安装*</code>。紧张刺激的重启环节后，结果我一次赌对了，崩了。</p><p>现在目标只剩两个：<code>应用包安装程序</code> 与 <code>应用安装器</code>，不管哪个都很可疑。按道理我只需要将这俩位都加入冻结黑名单即可，但我很好奇，非常好奇！到底是哪个干崩了我的系统！</p><p>这是一个二选一的赌注，我把罪魁祸首赌在了 <code>应用安装器</code> 上，而冻结了 <code>应用包安装程序</code>。我可能潜意识觉得，反正我用第三方安装程序，如果能够安全地冻结 <code>应用包安装程序</code>，那对我来说也是一个不错的消息。然而这次赌错了。问题就是出在 <code>应用包安装程序</code> 上。用 adb 和 root 都无法绕过这个玩意，我体会到了不自由的感觉，不禁一阵恶心。</p><p>后续测试：安全* 百变引擎 (动态)?壁纸* 多彩引擎 儿童空间 服务治理框架 更新服务 基本互动屏保 健康* 快应用 乐划锁屏 浏览器 默认打印服务 钱包 (全局)|(融合)搜索 设备*连* 升级指南 识屏* 手势体感 速览 随身工作台 我的一加 系统升级服务 这些全部没有问题。</p><p>一个傻逼应用，坏了一部手机。</p><h2 id="miui-无法更换铃声" tabindex="-1"><a class="header-anchor" href="#miui-无法更换铃声"><span>MIUI 无法更换铃声</span></a></h2>',12),f=e("li",null,[o("点击 "),e("em",null,"设置 - 声音与触感 - 电话铃声 - 全部铃声"),o("，bug 闪退")],-1),k=e("li",null,"下载 138M 的音乐（系统应用），“设置铃声需要开通 VIP”",-1),y=e("li",null,[o("将铃声 push 到系统 ringtone 文件夹："),e("code",null,"adb push xxx.mp3 /system/media/audio/ringtones/"),o("("),e("a",{href:"https://oddity.oddineers.co.uk/2020/08/24/wear-os-custom-ringtones-via-adb/",target:"_blank",rel:"noopener noreferrer"},"ref"),o(")，报错 "),e("code",null,"remote couldn't create file: Read-only file system")],-1),v=e("code",null,"adb remount",-1),x=e("code",null,"/system/bin/sh: adb: inaccessible or not found",-1),A=e("code",null,"adb shell",-1),w=e("code",null,"su",-1),I=e("code",null,"mount -o rw,remount /system",-1),M=e("code",null,"mount: '/system' not in /proc/mounts",-1),E=a('<p>没招了，非常痛苦。可能还能参考下<a href="https://forum.xda-developers.com/t/closed-universal-systemrw-superrw-feat-makerw-ro2rw-read-only-2-read-write-super-partition-converter.4247311/" target="_blank" rel="noopener noreferrer">这篇</a>，不过希望不大且比较危险。</p><h2 id="线刷-global-失败" tabindex="-1"><a class="header-anchor" href="#线刷-global-失败"><span>线刷 global 失败</span></a></h2><p>已经注释了 <code>Missmatching image and device</code> 验证，跳过了 crclist &amp; sparsecrclis 认证，最后还是卡在了 <code>error: Writing &#39;xbl&#39; FAILED (remote:&#39;This partition doesn&#39;t exist&#39;)</code> 上。。网上说 xbl error 是没解 bl 锁，但我这个显然是找不到分区。</p><p>下了两个 global (sweet)，都需要 <code>xbl</code> 分区，都没法用。然后放弃了。</p><h2 id="刷入-twrp-失败" tabindex="-1"><a class="header-anchor" href="#刷入-twrp-失败"><span>刷入 twrp 失败</span></a></h2><p>在 fastboot 下执行 <code>fastboot flash recovery twrp.img</code>，报错：<code>Writing &#39;recovery&#39; FAILED (remote: &#39;This partition doesn&#39;t exist&#39;)</code>。</p><p>网上看了一下，这个型号是 A/B 分区的，并没有 recovery 分区。执行 <code>fastboot boot twrp.img</code>（不刷入，直接启动），报错 <code>Booting FAILED (Status read failed (Too many links))</code>。然后能试的方法都试过了，使用 USB2.0，改注册表驱动，使用最新的 platform-tools，使用舍友的电脑，把 twrp 换用 OrangeFox...都无法解决此问题。</p><p>之后的刷 mipad5 我也去网上找了带有 twrp 的 boot.img，但都是不可用的。</p><blockquote><p>貌似 XDA 上有能用的 recovery，以后再试吧。</p></blockquote><h2 id="误炸-boot" tabindex="-1"><a class="header-anchor" href="#误炸-boot"><span>误炸 boot</span></a></h2><blockquote><p>此事件也直接导致了我屏蔽 csdn</p></blockquote><p>弱智 csdn 给了一个把 twrp 镜像刷入 boot 的脑残方法（那是刷 recovery 的）。。于是 boot 损坏，手机无限重启。</p><p>解法：下载个官方 ROM 解压，找到 <code>boot.img</code> 刷入 <code>fastboot flash boot boot.img</code> 就行了。</p><p>我第一次搞，以为要刷砖了比较慌，直接用 miflash 把整个原生 ROM 都刷进去了。。（最后还刷失败了，还是无限重启，miflash 你不得好死）</p>',14),T=e("code",null,"*.tgz",-1),N=e("code",null,"*.tgz",-1),R=e("code",null,"*.tar",-1),U=e("code",null,"*",-1),D=a('<h2 id="乱冻结" tabindex="-1"><a class="header-anchor" href="#乱冻结"><span>乱冻结</span></a></h2><p>在刷了 EU 版 MIUI 后，使用 App Manager 冻结了 <code>媒体存储设备</code>(<code>com.google.android.providers.media.module</code>)，导致 App Manager 闪退；无法访问 sdcard。随之发生壁纸变黑，帧率暴降，VPN 自动断连等现象。<span class="heimu" title="你知道的太多了">对于 app 来说，大概就像是末世吧。</span></p><p>信息：</p><ol><li><a href="https://github.com/MuntashirAkon/AppManager/discussions/835" target="_blank" rel="noopener noreferrer">freeze 实际上做了什么？</a>，是 App Manager 的官方(?)解释</li></ol><p>尝试：</p><ol><li>先瞎尝试：<code>adb shell pm enable &lt;package name&gt;</code> + <code>adb shell am start com.google.android.providers.media.module</code>： <blockquote><p>Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] pkg=com.google.android.providers.media.module }<br> Error: Activity not started, unable to resolve Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] flg=0x10000000 pkg=com.google.android.providers.media.module }</p></blockquote></li><li>在获取上述信息后，进入 <code>adb shell</code>，<code>su</code> 获取 root，执行： <ol><li><code>pm unhide com.google.android.providers.media.module</code></li><li><code>pm enable com.google.android.providers.media.module</code></li><li><code>pm unsuspend com.google.android.providers.media.module</code></li><li>三步开启权限后，退出 shell，重启，静·候·佳·音。</li></ol></li></ol>',6),C=a('<p>这个故事告诉我：<strong>root 后记得先刷救砖模块。</strong></p><h2 id="android-product-out-not-set" tabindex="-1"><a class="header-anchor" href="#android-product-out-not-set"><span>ANDROID_PRODUCT_OUT not set</span></a></h2><p><code>fastboot flash</code> 刷入分区时报错：</p><blockquote><p>fastboot: error: ANDROID_PRODUCT_OUT not set</p></blockquote><p>此时需要检查当前终端路径，是否包含你的 <code>.img</code> 文件。</p><h2 id="找不到-lsposed-图标" tabindex="-1"><a class="header-anchor" href="#找不到-lsposed-图标"><span>找不到 LSPosed 图标</span></a></h2><p>解法：<code>adb shell</code>，<code>su</code> 提权后，输入</p><div class="language-shell" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">am</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;intent:#Intent;action=android.intent.action.MAIN;category=org.lsposed.manager.LAUNCH_MANAGER;package=com.android.shell;component=com.android.shell/.BugreportWarningActivity;end&quot;</span></span></code></pre></div><p>即可启动。（<a href="https://www.bilibili.com/video/BV1UR4y1V7Ry/" target="_blank" rel="noopener noreferrer">source</a>, my_version: 1.8.6）</p><h2 id="备份恢复" tabindex="-1"><a class="header-anchor" href="#备份恢复"><span>备份恢复</span></a></h2><p>由于尝试了 <code>App Manager</code> 和 <code>adb backup</code> 均无法备份应用数据，无奈使用小米的备份（<code>com.miui.backup</code>）。结果果然不出所料——出事了，EU 版系统即使装了国内的应用商店也无法下载备份<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup>。解法：</p>',11),O=e("li",null,[o("安装完后没有快捷方式，也无法打开（App Manager 与 ADB 均无法启动，摸索了挺久）。此时需要去设置中搜索 "),e("code",null,"备份"),o(" 即可进入界面使用。"),e("span",{class:"heimu",title:"你知道的太多了"},"假如刷的非小米系统就惨了，我也不懂能不能用")],-1),B=a('<hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="footnote1" class="footnote-item"><p><a href="https://t.me/withabsolutex/1165" target="_blank" rel="noopener noreferrer">source</a> <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p></li></ol></section>',2);function q(L,P){const l=i("RouteLink"),r=i("Badge"),s=i("ZoomedImg");return c(),p("div",null,[m,u,g,e("p",null,[o("root 以后，安装了个 "),t(l,{to:"/articles/mobile/module_and_app.html#magisk"},{default:n(()=>[b]),_:1}),o(" 就大意了，折腾了许久，一个重启直接给我干砖了。。我所期望的救砖模块并没有生效。但是 fastboot 还是能进的，因此尝试救砖。")]),_,e("ol",null,[f,k,y,e("li",null,[v,o(),t(r,{text:"root"}),o("，报错 "),x]),e("li",null,[A,o("，"),w,o("，"),I,o(),t(r,{text:"root"}),o("，报错 "),M])]),E,e("blockquote",null,[e("p",null,[o("再吐槽一下 "),t(l,{to:"/farraginous/recommend_packages.html#bandizip"},{default:n(()=>[o("bandizip")]),_:1}),o("，解压 "),T,o(" 时默认一层一层解（"),N,o(" -> "),R,o(" -> "),U,o("）。。一个 10G 的包硬生生给我占了 26G 的空间。")]),t(s,{alt:"你为什么不开？你为什么不开？",src:"/images/articles/mobile_setting/fuckbandizip.png",scale:"50%"})]),D,e("p",null,[o("然后就卡开机界面了。。这下没办法了，adb 已经寄了，只能重装，前面全部白折腾。刚好我对 EU 挺失望的，想直接装回原国行系统，甚至还"),t(l,{to:"/articles/mobile/settings.html#mipad-5"},{default:n(()=>[o("失败了")]),_:1}),o("。")]),C,e("ol",null,[e("li",null,[o("从手机提取安装包，装到平板。（可用 App Manager 或 "),t(l,{to:"/farraginous/recommend_packages.html#%E5%A4%9A%E8%AE%BE%E5%A4%87%E4%BA%92%E4%BC%A0"},{default:n(()=>[o("Localsend")]),_:1}),o("）")]),O]),B])}const F=d(h,[["render",q],["__file","problem.html.vue"]]),V=JSON.parse('{"path":"/articles/mobile/problem.html","title":"遇到的问题","lang":"zh-CN","frontmatter":{"date":"2023-11-08T00:00:00.000Z","icon":"regular fa-circle-xmark","category":["经历"],"tag":["移动端","工具"],"description":"遇到的问题 时间倒序。 一加无限重启 root 以后，安装了个 就大意了，折腾了许久，一个重启直接给我干砖了。。我所期望的救砖模块并没有生效。但是 fastboot 还是能进的，因此尝试救砖。 刷回官方 boot.img，但是还是无限重启。看样子原因并非模块，而可能是冻结了不该冻结的东西（maybe 手机管家？）。然后进 recovery 清除了数据分...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/mobile/problem.html"}],["meta",{"property":"og:site_name","content":"绝对值_x的博客"}],["meta",{"property":"og:title","content":"遇到的问题"}],["meta",{"property":"og:description","content":"遇到的问题 时间倒序。 一加无限重启 root 以后，安装了个 就大意了，折腾了许久，一个重启直接给我干砖了。。我所期望的救砖模块并没有生效。但是 fastboot 还是能进的，因此尝试救砖。 刷回官方 boot.img，但是还是无限重启。看样子原因并非模块，而可能是冻结了不该冻结的东西（maybe 手机管家？）。然后进 recovery 清除了数据分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-04T16:45:11.000Z"}],["meta",{"property":"article:tag","content":"移动端"}],["meta",{"property":"article:tag","content":"工具"}],["meta",{"property":"article:published_time","content":"2023-11-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-04T16:45:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"遇到的问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-08T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-04T16:45:11.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"一加无限重启","slug":"一加无限重启","link":"#一加无限重启","children":[]},{"level":2,"title":"MIUI 无法更换铃声","slug":"miui-无法更换铃声","link":"#miui-无法更换铃声","children":[]},{"level":2,"title":"线刷 global 失败","slug":"线刷-global-失败","link":"#线刷-global-失败","children":[]},{"level":2,"title":"刷入 twrp 失败","slug":"刷入-twrp-失败","link":"#刷入-twrp-失败","children":[]},{"level":2,"title":"误炸 boot","slug":"误炸-boot","link":"#误炸-boot","children":[]},{"level":2,"title":"乱冻结","slug":"乱冻结","link":"#乱冻结","children":[]},{"level":2,"title":"ANDROID_PRODUCT_OUT not set","slug":"android-product-out-not-set","link":"#android-product-out-not-set","children":[]},{"level":2,"title":"找不到 LSPosed 图标","slug":"找不到-lsposed-图标","link":"#找不到-lsposed-图标","children":[]},{"level":2,"title":"备份恢复","slug":"备份恢复","link":"#备份恢复","children":[]}],"git":{"createdTime":1699459657000,"updatedTime":1733330711000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":4},{"name":"lxl66566","email":"18259734087@163.com","commits":2}]},"readingTime":{"minutes":6.1,"words":1829},"filePathRelative":"articles/mobile/problem.md","localizedDate":"2023年11月8日","excerpt":"\\n","autoDesc":true}');export{F as comp,V as data};
