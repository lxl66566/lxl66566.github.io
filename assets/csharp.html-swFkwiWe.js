import{_ as e,o as t,c as a,e as o}from"./app-BkRG5jpT.js";const r={},n=o('<h1 id="c" tabindex="-1"><a class="header-anchor" href="#c"><span>C#</span></a></h1><p>我没有太多动力去学习 C#，因此本篇文章目前不会有太多内容。</p><h2 id="学习" tabindex="-1"><a class="header-anchor" href="#学习"><span>学习</span></a></h2><p>我个人喜欢 MS 官方的 <a href="https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/" target="_blank" rel="noopener noreferrer">C# 语言参考</a> 挺不错的，抓牢了这门语言的特性，没一句废话，样例也很全。</p><p>不过我不推荐给编程初学者，术语太多太杂了，初学的还是去 google “C# tutorial” 选几个吧。</p><h2 id="安装与开发环境配置" tabindex="-1"><a class="header-anchor" href="#安装与开发环境配置"><span>安装与开发环境配置</span></a></h2><p>C# 在 windows 的环境配置是我接触过的语言中最简单的<strong>之一</strong>。</p><ol><li>进入<a href="https://dotnet.microsoft.com/en-us/download" target="_blank" rel="noopener noreferrer">.NET 官网</a>下载 .NET SDK x64 安装包并安装。你可以在 cmd 中运行 <code>dotnet -h</code> 测试环境是否完善。</li><li>vscode 中安装 C# 扩展。后续记得看右下角可能出现的提示。</li><li>打开你的项目文件夹，终端中输入 <code>dotnet new console</code> 创建项目。</li><li>F5 编译运行。</li><li>Formatter: 扩展搜索 <a href="https://csharpier.com/" target="_blank" rel="noopener noreferrer">CSharpier</a> 并安装。首次使用会在右下角弹出本地安装提示，选择 global install。然后就是 format on save 老规矩安排上。</li></ol><h2 id="语言基础" tabindex="-1"><a class="header-anchor" href="#语言基础"><span>语言基础</span></a></h2><p>由于文档很全，这里就不放长篇语法基础或者容易找到的部分了，主要放一些个人理解。</p><ul><li>object vs dynamic：object 仍然是编译期类型，而 dynamic 是运行期；object 赋值是显式，dynamic 是隐式。无论哪一种，强制转换时类型不匹配都会抛异常（不过异常的种类不同，InvalidCastException vs RuntimeBinderException）。</li></ul>',11),i=[n];function c(l,s){return t(),a("div",null,i)}const d=e(r,[["render",c],["__file","csharp.html.vue"]]),h=JSON.parse('{"path":"/coding/csharp.html","title":"C#","lang":"zh-CN","frontmatter":{"date":"2022-09-29T00:00:00.000Z","icon":"code","category":["编程"],"tag":["编程语言"],"description":"C# 我没有太多动力去学习 C#，因此本篇文章目前不会有太多内容。 学习 我个人喜欢 MS 官方的 C# 语言参考 挺不错的，抓牢了这门语言的特性，没一句废话，样例也很全。 不过我不推荐给编程初学者，术语太多太杂了，初学的还是去 google “C# tutorial” 选几个吧。 安装与开发环境配置 C# 在 windows 的环境配置是我接触过的语...","head":[["meta",{"property":"og:url","content":"https://absx.pages.dev/coding/csharp.html"}],["meta",{"property":"og:site_name","content":"绝对值_x 的博客"}],["meta",{"property":"og:title","content":"C#"}],["meta",{"property":"og:description","content":"C# 我没有太多动力去学习 C#，因此本篇文章目前不会有太多内容。 学习 我个人喜欢 MS 官方的 C# 语言参考 挺不错的，抓牢了这门语言的特性，没一句废话，样例也很全。 不过我不推荐给编程初学者，术语太多太杂了，初学的还是去 google “C# tutorial” 选几个吧。 安装与开发环境配置 C# 在 windows 的环境配置是我接触过的语..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-08T17:21:18.000Z"}],["meta",{"property":"article:tag","content":"编程语言"}],["meta",{"property":"article:published_time","content":"2022-09-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-08T17:21:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C#\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-29T00:00:00.000Z\\",\\"dateModified\\":\\"2025-01-08T17:21:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"学习","slug":"学习","link":"#学习","children":[]},{"level":2,"title":"安装与开发环境配置","slug":"安装与开发环境配置","link":"#安装与开发环境配置","children":[]},{"level":2,"title":"语言基础","slug":"语言基础","link":"#语言基础","children":[]}],"git":{"createdTime":1664443865000,"updatedTime":1736356878000,"contributors":[{"name":"lxl66566","email":"18259734087@163.com","commits":3},{"name":"lxl66566","email":"lxl66566@gmail.com","commits":2}]},"readingTime":{"minutes":1.28,"words":384},"filePathRelative":"coding/csharp.md","localizedDate":"2022年9月29日","excerpt":"\\n","autoDesc":true}');export{d as comp,h as data};
