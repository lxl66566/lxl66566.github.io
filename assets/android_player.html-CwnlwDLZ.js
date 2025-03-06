import{_ as e,o as d,c as r,f as a,a as t,e as o}from"./app-DSUucrbm.js";const i={},l=t("h1",{id:"android-音乐播放器横评",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#android-音乐播放器横评"},[t("span",null,"Android 音乐播放器横评")])],-1),n=t("p",null,"播放器这个赛道虽然已经卷得要死，但各种产品看起来总是大同小异，并且总有些我不满意的地方。",-1),p=t("ol",null,[t("li",null,"许多 material 风格，许多产品只注重外观，而不注重用户交互体验。"),t("li",null,"每个播放器都会扫描全局音频，然后在播放器首页把我的音乐和录音和其他奇奇怪怪的音频全部混在一起。"),t("li",null,"因此，听音乐需要划定一个范围，一般使用文件夹模式。然而有的播放器进入文件夹模式需要的点击数太多了，我打开软件后还需要多次点击才能听音乐。"),t("li",null,"Android 设备上进行快速导航的最佳实践就是侧边滑动首字母。这个在任何 OS 的联系人软件里都能看到的、让 Niagara Launcher 成功的核心设计，却很难在音乐播放器里见到。")],-1),c=t("h2",{id:"一表流",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#一表流"},[t("span",null,"一表流")])],-1),s=o('<table><thead><tr><th>名称</th><th>开源?</th><th>随机播放?</th><th>播放点击数</th><th>内存占用</th><th>备注</th></tr></thead><tbody><tr><td>椒盐音乐</td><td>❌</td><td>✅</td><td>2</td><td>114M</td><td>致命缺陷</td></tr><tr><td>APlayer</td><td>✅</td><td>✅</td><td>4</td><td>60M</td><td></td></tr><tr><td>Gramophone</td><td>✅</td><td>✅</td><td>4</td><td>89M</td><td></td></tr><tr><td>Phocid</td><td>✅</td><td>✅</td><td>2</td><td>77M</td><td></td></tr><tr><td>Oto Music</td><td>❌</td><td>✅</td><td>4</td><td>153M</td><td></td></tr><tr><td>Phonograph Plus</td><td>✅</td><td>✅</td><td>2</td><td>135M</td><td></td></tr><tr><td>Powerramp</td><td>❌</td><td>✅</td><td>3</td><td>327M</td><td></td></tr></tbody></table><p>字段解释：</p><ul><li>播放点击数定义：从 APP 首页，到文件夹，到我播放一首指定歌曲（假设无需寻找）所花费的点击数</li><li>内存占用：同一设备播放同一首歌的内存占用</li></ul><h2 id="详细评价" tabindex="-1"><a class="header-anchor" href="#详细评价"><span>详细评价</span></a></h2><p>一般播放点击数 &lt;=2 的软件，是通过“记住我上一次退出时所在区域”减小点击数的，这是不错的设计。</p><p>椒盐音乐比起其他播放器，还多了侧边滑动首字母，选歌方便，我确实喜欢。它用的 UI 是自己做的而不是直接 material，内存占用稍高也可以原谅。但是它有一个致命缺陷让我不得不抛弃之：文件夹列表被缓存，无法更新。也就是说我向文件夹里添加新歌后，它并不能检测到，并添加到播放列表。</p><p>APlayer 在 Github 上很火，并且有一个叫 “随机播放全部” 的按钮比较好用。</p><p>Gramophone 和 Phocid 这俩都是 Material，非常相似，甚至播放进度条的样式都是一模一样的，使用手感也差不多。根据上表，我更倾向于 Phocid。</p><p>Oto Music 也是 Material 的，优点是自带均衡器。<a href="https://t.me/xyxyspace/1746" target="_blank" rel="noopener noreferrer">这里</a>有破解了高级版的。</p><p>Phonograph Plus 有出现文件夹点不开的 bug。</p><p>Powerramp 是付费软件，可以下载限时试用。整体的 UI 设计真的是<strong>非常惊艳</strong>，比千篇一律的 material 好看/有个性多了。并且也有均衡器支持和侧边首字母选歌。它是列表中唯一一个不会自动扫盘找歌曲的软件，我可以自己选择让它读取的文件夹，从而避免录音等被放到播放列表中。因此列表中的 <em>播放点击数</em> 就不再重要了。</p>',11);function h(m,u){return d(),r("div",null,[l,n,p,c,a(" prettier-ignore "),s])}const g=e(i,[["render",h],["__file","android_player.html.vue"]]),y=JSON.parse('{"path":"/articles/android_player.html","title":"Android 音乐播放器横评","lang":"zh-CN","frontmatter":{"date":"2025-02-07T00:00:00.000Z","icon":"play","category":["推荐"],"tag":["移动端","横评","音频"],"description":"Android 音乐播放器横评 播放器这个赛道虽然已经卷得要死，但各种产品看起来总是大同小异，并且总有些我不满意的地方。 许多 material 风格，许多产品只注重外观，而不注重用户交互体验。 每个播放器都会扫描全局音频，然后在播放器首页把我的音乐和录音和其他奇奇怪怪的音频全部混在一起。 因此，听音乐需要划定一个范围，一般使用文件夹模式。然而有的播放...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/articles/android_player.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"Android 音乐播放器横评"}],["meta",{"property":"og:description","content":"Android 音乐播放器横评 播放器这个赛道虽然已经卷得要死，但各种产品看起来总是大同小异，并且总有些我不满意的地方。 许多 material 风格，许多产品只注重外观，而不注重用户交互体验。 每个播放器都会扫描全局音频，然后在播放器首页把我的音乐和录音和其他奇奇怪怪的音频全部混在一起。 因此，听音乐需要划定一个范围，一般使用文件夹模式。然而有的播放..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-06T14:27:57.000Z"}],["meta",{"property":"article:tag","content":"移动端"}],["meta",{"property":"article:tag","content":"横评"}],["meta",{"property":"article:tag","content":"音频"}],["meta",{"property":"article:published_time","content":"2025-02-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-06T14:27:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Android 音乐播放器横评\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-02-07T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-06T14:27:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"一表流","slug":"一表流","link":"#一表流","children":[]},{"level":2,"title":"详细评价","slug":"详细评价","link":"#详细评价","children":[]}],"git":{"createdTime":1738945155000,"updatedTime":1741271277000,"contributors":[{"name":"lxl66566","email":"lxl66566@gmail.com","commits":4}]},"readingTime":{"minutes":2.6,"words":781},"filePathRelative":"articles/android_player.md","localizedDate":"2025年2月7日","excerpt":"\\n","autoDesc":true}');export{g as comp,y as data};
