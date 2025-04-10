import{_ as o,e as s,f as n,k as d,g as l,h as e,i,j as a,r as c,o as y}from"./app-DjPa-OFf.js";const x={};function g(p,t){const r=c("RouteLink");return y(),s("div",null,[t[11]||(t[11]=n('<h1 id="记录软件使用时长" tabindex="-1"><a class="header-anchor" href="#记录软件使用时长"><span>记录软件使用时长</span></a></h1><h2 id="windows-端记录软件使用时长" tabindex="-1"><a class="header-anchor" href="#windows-端记录软件使用时长"><span>Windows 端记录软件使用时长</span></a></h2><ul><li>从 20220428 开始使用 <a href="https://github.com/Planshit/Tai" target="_blank" rel="noopener noreferrer">Tai</a> 记录 Windows 下的应用时长。 <ul><li>C# 写的，windows 下专用的软件。</li><li>Tai 最后一次更新是 20231228，已经很久没有维护了。然而 Tai 1.5.0.6 <a href="https://github.com/Planshit/Tai/issues/378" target="_blank" rel="noopener noreferrer">有 bug</a>，第三方 fork 的 <a href="https://github.com/NLick47/Taix" target="_blank" rel="noopener noreferrer">Taix</a> 目前还不成熟（有 bug），因此我建议使用 1.5.0.5 版本。</li></ul></li><li>在 20220729 了解到<a href="https://github.com/ActivityWatch/activitywatch" target="_blank" rel="noopener noreferrer">ActivityWatch</a>。 <ul><li>跨平台的时长记录软件，python 写的，基于浏览器 UI。</li><li>在 linux wayland 下<a href="https://github.com/ActivityWatch/activitywatch/issues/92" target="_blank" rel="noopener noreferrer">表现差</a>。<s>我为了计时长特意换到 X11</s></li></ul></li></ul><p>两者均为开源软件。</p>',4)),d(" prettier-ignore "),t[12]||(t[12]=n('<table><thead><tr><th style="text-align:center;">软件名</th><th style="text-align:center;">运行时内存 (windows)</th><th style="text-align:center;">查询区间长</th></tr></thead><tbody><tr><td style="text-align:center;">Tai</td><td style="text-align:center;">41.0M</td><td style="text-align:center;">年</td></tr><tr><td style="text-align:center;">ActivityWatch</td><td style="text-align:center;">102.2M</td><td style="text-align:center;"><s>月</s> 任意</td></tr></tbody></table><p>结果很明显。</p><ol><li>我对时长记录最大的要求，除了准确性外，就是<strong>查询区间长</strong>了。<s>而 <code>ActivityWatch</code> 的表现（30days）无法达到我的预期。</s><ul><li>实际上 <code>ActivityWatch</code> 能够查任意区间。</li></ul></li><li><code>ActivityWatch</code> 的数据不方便备份。而 Tai 就只有图标和 sqlite 数据库，非常方便。</li></ol><p>我仍然选用 <code>Tai</code> 作为我的时长统计软件。而在 Linux 上使用 <code>ActivityWatch</code> 是无奈之举。</p><h3 id="activitywatch" tabindex="-1"><a class="header-anchor" href="#activitywatch"><span>ActivityWatch</span></a></h3><p>ActivityWatch 的 Activity, Timeline 界面只能查询最长区间为月的数据。而在 Query 界面则可以查询任意时间长的数据。</p><p>但是，ActivityWatch 的 query 就是一坨屎：</p><ol><li>说了好多遍了，不要 DSL，连个注释符号都没有。。。 <ul><li>(<a href="https://github.com/ActivityWatch/aw-research/blob/master/queries/aw-development.awq" target="_blank" rel="noopener noreferrer">from</a>: <em>We should really add support for comments</em> lmao)</li></ul></li><li>查询很慢，python debuff。 <ul><li>Tai 查询速度快的原因是额外维护了年月日的时长记录表。</li></ul></li><li>文档垃圾。<a href="https://docs.activitywatch.net/en/latest/examples/querying-data.html" target="_blank" rel="noopener noreferrer">这里</a>是 query 的文档，示例没有解释，没有 <code>flood</code> 的说明，挂着 TODO，API 页面 404。。</li></ol><h2 id="android-端记录软件使用时长" tabindex="-1"><a class="header-anchor" href="#android-端记录软件使用时长"><span>Android 端记录软件使用时长</span></a></h2>',9)),l("p",null,[t[2]||(t[2]=e("我有多喜欢统计时长，从")),i(r,{to:"/hobbies/galgame.html"},{default:a(()=>t[0]||(t[0]=[e("galgame 页面")])),_:1}),t[3]||(t[3]=e("和")),i(r,{to:"/hobbies/books.html"},{default:a(()=>t[1]||(t[1]=[e("读书页面")])),_:1}),t[4]||(t[4]=e("便可略知一二。但是——"))]),l("p",null,[t[6]||(t[6]=e("由于安卓自带的屏幕使用时长最长只允许查看本周数据，而我需要的是类似 windows 端")),i(r,{to:"/farraginous/recommend_packages.html#tai"},{default:a(()=>t[5]||(t[5]=[e("Tai")])),_:1}),t[7]||(t[7]=e("的替代产品，可以记录与查看过去的一切数据。因此去谷歌商店下载了三款（后追加为好几款）记录软件时长的 app，在此做个横评。")),t[8]||(t[8]=l("s",null,[l("em",null,[e("（将"),l("code",null,"自己做个这种软件"),e("写入日程！）")])],-1)),t[9]||(t[9]=e()),t[10]||(t[10]=l("span",{class:"heimu",title:"你知道的太多了"},[l("em",null,"笑死，开摆")],-1))]),t[13]||(t[13]=l("text",{style:{color:"red"}},"红色字体：此处为较大劣势；",-1)),t[14]||(t[14]=l("text",{style:{color:"blue"}},"蓝色字体：此处有较大优势，推荐；",-1)),t[15]||(t[15]=e("以下功能默认为免费版。")),d(" prettier-ignore "),t[16]||(t[16]=n('<table><thead><tr><th style="text-align:center;">软件名</th><th style="text-align:center;">大小（使用前/后,MB）</th><th style="text-align:center;">准确率</th><th style="text-align:center;">数据可查询</th><th style="text-align:center;">查询区间长</th><th style="text-align:center;"><text style="color:red;">其他缺陷</text></th><th style="text-align:center;">其他权限</th></tr></thead><tbody><tr><td style="text-align:center;">StayFree</td><td style="text-align:center;">48.88/63.11</td><td style="text-align:center;"><text style="color:red;">81%</text></td><td style="text-align:center;">ALL</td><td style="text-align:center;"><text style="color:blue;">无限</text></td><td style="text-align:center;">-</td><td style="text-align:center;"><text style="color:red;">无障碍</text></td></tr><tr><td style="text-align:center;">MyPhoneTime</td><td style="text-align:center;">15.23/20.65</td><td style="text-align:center;"><text style="color:red;">0%</text></td><td style="text-align:center;">ALL</td><td style="text-align:center;"><text style="color:blue;">无限</text></td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">ActionDash</td><td style="text-align:center;">17/43.26</td><td style="text-align:center;">100%</td><td style="text-align:center;">ALL</td><td style="text-align:center;"><text style="color:red;">周</text></td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">YourHour</td><td style="text-align:center;">25.74/70.52</td><td style="text-align:center;">100%</td><td style="text-align:center;">ALL</td><td style="text-align:center;"><text style="color:red;">天</text></td><td style="text-align:center;"><text style="color:red;">查看具体应用数据需付费</text></td><td style="text-align:center;">上层显示</td></tr><tr><td style="text-align:center;">AppUsage</td><td style="text-align:center;">4.69/28.54</td><td style="text-align:center;"><text style="color:red;">0%</text></td><td style="text-align:center;">ALL</td><td style="text-align:center;">月</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">手机使用时间</td><td style="text-align:center;">?/11.73</td><td style="text-align:center;">100%?</td><td style="text-align:center;"><text style="color:red;">上个月</text></td><td style="text-align:center;">月</td><td style="text-align:center;"><text style="color:red;">必需挂着后台才可计时；广告</text></td><td style="text-align:center;">后台免杀</td></tr><tr><td style="text-align:center;"><text style="color:blue;">Digitox</text></td><td style="text-align:center;">3.89/20.67</td><td style="text-align:center;">100%</td><td style="text-align:center;">ALL</td><td style="text-align:center;">月</td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">AppBlock</td><td style="text-align:center;">10.87/44.05</td><td style="text-align:center;"><text style="color:red;">0%</text></td><td style="text-align:center;">ALL</td><td style="text-align:center;"><text style="color:red;">周</text></td><td style="text-align:center;"><text style="color:red;">不氪金仅能查看前3个程序数据</text></td><td style="text-align:center;"><text style="color:red;">无障碍</text></td></tr><tr><td style="text-align:center;"><text style="color:blue;">Phonestatistic</text></td><td style="text-align:center;">3.07/14.61</td><td style="text-align:center;">100%</td><td style="text-align:center;">年</td><td style="text-align:center;"><text style="color:blue;">年</text></td><td style="text-align:center;">-</td><td style="text-align:center;">-</td></tr></tbody></table><p>解释：</p><ul><li><code>StayFree</code>仅有 81%准确率：QQ、nekogramX、Via 等多个软件的计时数据略小于系统计时数据。（最严重偏差值达到 19%）（后来发现也有偏大数据）</li><li>准确率为 0%的软件：在 20220709 我看了 67min 小说后，这些软件有的未记录阅读器时长；有的将时长错加到 QQ 上。它们的准确率由 0.8%-10%不等，由于偏差过大，统一算作 0%。</li><li>除<code>My Phone Time</code> <code>ActionDash</code>外其他软件均请求<code>使用情况访问权限</code>，此处视为默认放行。</li><li><code>Phone statistic</code>有一个最大优点，就是刚下载就能查询到本年的全部数据。其他软件最多只能查到下载日期 9 天前的。</li></ul><p>总结：</p><p>推荐同时使用<code>Digitox</code>与<code>Phone statistic</code>。<em>（这俩加一起都没某些家伙大</em></p><p><span class="heimu" title="你知道的太多了">感觉还想自己写啊，但是我不会，这下有生之年了</span></p>',6))])}const m=o(x,[["render",g],["__file","time_record.html.vue"]]),u=JSON.parse('{"path":"/articles/time_record.html","title":"记录软件使用时长","lang":"zh-CN","frontmatter":{"date":"2022-07-08T00:00:00.000Z","icon":"clock","category":["推荐","评价"],"tag":["移动端","横评"],"description":"记录软件使用时长 Windows 端记录软件使用时长 从 20220428 开始使用 Tai 记录 Windows 下的应用时长。 C# 写的，windows 下专用的软件。 Tai 最后一次更新是 20231228，已经很久没有维护了。然而 Tai 1.5.0.6 有 bug，第三方 fork 的 Taix 目前还不成熟（有 bug），因此我建议使用...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"记录软件使用时长\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-08T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-20T17:24:50.000Z\\",\\"author\\":[]}"],["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/time_record.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"记录软件使用时长"}],["meta",{"property":"og:description","content":"记录软件使用时长 Windows 端记录软件使用时长 从 20220428 开始使用 Tai 记录 Windows 下的应用时长。 C# 写的，windows 下专用的软件。 Tai 最后一次更新是 20231228，已经很久没有维护了。然而 Tai 1.5.0.6 有 bug，第三方 fork 的 Taix 目前还不成熟（有 bug），因此我建议使用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-20T17:24:50.000Z"}],["meta",{"property":"article:tag","content":"横评"}],["meta",{"property":"article:tag","content":"移动端"}],["meta",{"property":"article:published_time","content":"2022-07-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-20T17:24:50.000Z"}]]},"git":{"createdTime":1664443865000,"updatedTime":1740072290000,"contributors":[{"name":"lxl66566","username":"lxl66566","email":"18259734087@163.com","commits":14,"url":"https://github.com/lxl66566"}]},"readingTime":{"minutes":3.77,"words":1131},"filePathRelative":"articles/time_record.md","localizedDate":"2022年7月8日","excerpt":"\\n","autoDesc":true}');export{m as comp,u as data};
