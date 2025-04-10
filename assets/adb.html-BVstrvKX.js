import{_ as r,e as o,g as s,f as n,h as a,i as h,j as t,r as d,o as g}from"./app-DjPa-OFf.js";const A={};function c(y,i){const k=d("RouteLink"),p=d("Tabs");return g(),o("div",null,[i[12]||(i[12]=s("h1",{id:"adb",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#adb"},[s("span",null,"ADB")])],-1)),s("p",null,[i[2]||(i[2]=a("ADB (Android Debug Bridge) 是强大的手机调试应用。由于 Android 手机的一些共性（垃圾的应用管理 / 备份 / 安装），同时我还是")),h(k,{to:"/gossip/author.html#%E6%88%91%E7%9A%84%E7%88%B1%E5%A5%BD"},{default:t(()=>i[0]||(i[0]=[a("重度电脑使用者")])),_:1}),i[3]||(i[3]=a(" 和 ")),h(k,{to:"/articles/mobile/"},{default:t(()=>i[1]||(i[1]=[a("root user")])),_:1}),i[4]||(i[4]=a("，因此 ADB 使用频率很高。"))]),i[13]||(i[13]=n('<p>通过 ADB 获取到的权限较高，但低于 root 权限。</p><h2 id="下载" tabindex="-1"><a class="header-anchor" href="#下载"><span>下载</span></a></h2><ul><li><a href="https://developer.android.com/studio/command-line/adb" target="_blank" rel="noopener noreferrer">官网</a></li><li><a href="https://dl.google.com/android/repository/platform-tools-latest-windows.zip" target="_blank" rel="noopener noreferrer">从谷歌直接下载</a></li></ul><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h2>',4)),s("ol",null,[i[10]||(i[10]=s("li",null,[s("p",null,"下载并解压后，进入 ADB 目录，打开 cmd。"),s("blockquote",null,[s("p",null,"推荐将 ADB 目录加入环境变量。这样就不仅限于在 ADB 目录下使用指令。")])],-1)),s("li",null,[i[9]||(i[9]=s("p",null,"手机开启开发者选项与 USB 调试。（有的手机还需要开启文件传输）",-1)),h(p,{id:"42",data:[{id:"有线"},{id:"无线"}]},{title0:t(({value:l,isActive:e})=>i[5]||(i[5]=[a("有线")])),title1:t(({value:l,isActive:e})=>i[6]||(i[6]=[a("无线")])),tab0:t(({value:l,isActive:e})=>i[7]||(i[7]=[s("p",null,"使用数据线连接电脑与手机即可。",-1),s("p",null,"请务必检查数据线是否能够传输数据，而不是只能充电！",-1)])),tab1:t(({value:l,isActive:e})=>i[8]||(i[8]=[s("ol",null,[s("li",null,"开启无线调试开关"),s("li",null,[a("使用配对码配对设备，PC 端执行 "),s("code",null,"adb pair <ip>:<port>")]),s("li",null,[a("连接设备，PC 端执行 "),s("code",null,"adb connect <ip>:<port>"),a("（注意此时 port 与配对时不同）")])],-1),s("p",null,"无线调试一般来说是给 Android developer 的 Android Studio 使用的，直接连接连不上是正常情况。一般还是需要备一根数据线的。",-1)])),_:1})]),i[11]||(i[11]=n(`<li><p>执行 <code>adb devices</code>，<code>List of devices attached</code> 下方有设备即为连接成功：</p><div class="language-text line-numbers-mode" data-highlighter="shiki" data-ext="text" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>List of devices attached</span></span>
<span class="line"><span>****************        device</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1))]),i[14]||(i[14]=n(`<h2 id="常用指令" tabindex="-1"><a class="header-anchor" href="#常用指令"><span>常用指令</span></a></h2><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> devices</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> # 开启端口，检测设备</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">filepat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">h&gt;  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 安装应用。\`&lt;filepath&gt;\` 可以是相对 / 绝对路径。一般为 .apk 文件。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> list</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> package</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [&lt;keyword&gt;]   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 根据包名查找包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> list</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> packages</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">findstr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">keywor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">d&gt;  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 同上</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> uninstall</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -k</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --user</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">package</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">e&gt;   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 卸载包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> disable-user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">package</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">e&gt;    </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 禁用包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> reboot</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> fastboot</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> # 重启至 fastboot</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="刷机指令" tabindex="-1"><a class="header-anchor" href="#刷机指令"><span>刷机指令</span></a></h2><p>由于 fastboot 同属于 platform tools，因此也归入 ADB 指令。</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> reboot</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  # 普通重启，= fastboot reboot</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> reboot</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bootloader</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   # 重启至 fastboot</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fastboot</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> flash</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> boot</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xxx.img</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> # 刷入 ROM</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他指令" tabindex="-1"><a class="header-anchor" href="#其他指令"><span>其他指令</span></a></h2><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> getprop</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ro.product.name</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   # 查看设备代号，或 fastboot getvar product</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">adb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> am</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> startservice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">package</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">e&gt;    </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 启动服务</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,7))])}const b=r(A,[["render",c],["__file","adb.html.vue"]]),m=JSON.parse('{"path":"/articles/mobile/adb.html","title":"ADB","lang":"zh-CN","frontmatter":{"date":"2023-01-24T00:00:00.000Z","icon":"brands fa-usb","category":["教程"],"tag":["移动端"],"description":"ADB ADB (Android Debug Bridge) 是强大的手机调试应用。由于 Android 手机的一些共性（垃圾的应用管理 / 备份 / 安装），同时我还是 和 ，因此 ADB 使用频率很高。 通过 ADB 获取到的权限较高，但低于 root 权限。 下载 官网 从谷歌直接下载 使用方法 下载并解压后，进入 ADB 目录，打开 cmd。 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ADB\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-24T00:00:00.000Z\\",\\"dateModified\\":\\"2025-04-10T08:46:20.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/mobile/adb.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"ADB"}],["meta",{"property":"og:description","content":"ADB ADB (Android Debug Bridge) 是强大的手机调试应用。由于 Android 手机的一些共性（垃圾的应用管理 / 备份 / 安装），同时我还是 和 ，因此 ADB 使用频率很高。 通过 ADB 获取到的权限较高，但低于 root 权限。 下载 官网 从谷歌直接下载 使用方法 下载并解压后，进入 ADB 目录，打开 cmd。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-10T08:46:20.000Z"}],["meta",{"property":"article:tag","content":"移动端"}],["meta",{"property":"article:published_time","content":"2023-01-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-10T08:46:20.000Z"}]]},"git":{"createdTime":1674578195000,"updatedTime":1744274780000,"contributors":[{"name":"lxl66566","username":"lxl66566","email":"18259734087@163.com","commits":16,"url":"https://github.com/lxl66566"}]},"readingTime":{"minutes":1.73,"words":519},"filePathRelative":"articles/mobile/adb.md","localizedDate":"2023年1月24日","excerpt":"\\n","autoDesc":true}');export{b as comp,m as data};
