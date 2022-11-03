# VuePress2与博客心得
建站时我还是个小白，对javascript,typescript,css一窍不通，html也只看过菜鸟教程的前几部分，因此在搭建博客过程中遇到了很多问题。有一些在现在的我看来已经不是问题，但仍有问题悬而未决。本栏写于20220718（之后持续更新），算是对我建站三个半月来的一些总结。

设想建立博客之初，选择工具阶段，有很多博客工具可供选择，如Hexo,Wordpress,HUGO,docsify等。后来随着慢慢深入接触也了解了Vitepress,mdbook,Gitbook。但我还是选择vuepress。个中缘由嘛，vuepress的简洁是我最欣赏的一个点，因为像我这种意义党并不那么关注美感<span class="heimu" title="你知道的太多了">说实话我对我的审美本身就没什么自信</span>（出于简洁性原因，我甚至没有采用官方推荐的首页主题）。vuepress官方也作出了[为什么推荐自己的说明](https://v2.vuepress.vuejs.org/zh/guide/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF)，但对一个萌新而言这些理由显然~~看不懂~~…

然后到了搭建之初阶段，由于vuepress1.x仅使用config.js，而2.x改用ts，这导致了我被网上教程（我看的很多是用js的）与官方文档的ts搞得不明所以。（官方文档肯定正确，但是官方的说明显然不是面向当时的我的）

后来在开发过程中还遇到了亿些问题——

## 字体颜色问题
网上教程为使用`<font color="red">`标签，但此标签不受html5支持（并导致了下述Rendering pages failed问题）。我还尝试了`<p>`标签（但会自动换行）与`<a>`标签（但有下划线和点击效果）。最终选用`<text style="color:red;">`标签，写起来最为简洁，无需添加额外属性。

## Rendering pages failed问题
显示的错误信息是Vuepress的底层问题，无法直接看出问题所在。且`docs:dev`本地预览完全不受影响。之后不断比对各处编译，发现是引入未知html标签导致的。（初次为`<font>`标签，之后还有：自定义组件的标签，被识别成组件的语法）*（感谢[oyh同学](https://dream-oyh.github.io/)重蹈覆辙，提供**完全一致**的错误信息，如下所示。）* <span class="heimu" title="你知道的太多了">原本因为时隔太久且当时没有博客心得，因此没有记录，没想到有笨比（</span>

> TypeError: Invalid value used as weak map key<br/>
> at WeakMap.set (\<anonymous\>)<br/>
> at normalizePropsOptions (C:\Users\oyh\vuepress-starter\node_modules\@vue\runtime-core\dist\runtime-core.cjs.prod.js:3179:15)<br/>
> at createComponentInstance (C:\Users\oyh\vuepress-starter\node_modules\@vue\runtime-core\dist\runtime-core.cjs.prod.js:5695:23)<br/>
> at renderComponentVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:168:22)<br/>
> at Object.ssrRenderComponent (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:605:12)<br/>
> at _sfc_ssrRender$b (C:\Users\oyh\vuepress-starter\docs\.vuepress\.temp\.server\app.js:1362:24)<br/>
> at renderComponentSubTree (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:250:13)<br/>
> at renderComponentVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:185:16)<br/>
> at renderVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:292:22)<br/>
> at renderComponentSubTree (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:256:13)<br/>

## Vue组件注册失败的问题
目前开发过程中遇到的最大的问题。详情懒得再写一遍了，请直接[跳转stackoverflow查看](https://stackoverflow.com/questions/73009755/failed-to-register-a-vue-component-in-vuepress2)。我还剩一种方法（在client.ts中手动注册组件）没试，不过既然已经曲线救国成功（使用iframe引入带组件的html），就暂时不尝试了。（20220720速报：问题已解决，解决方法：重新下载vuepress2包。猜测是旧vuepress2的依赖包出了问题。）

## 评论插件配置失败问题
我使用的评论插件是[vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/zh/)。该插件的文档写的甚至比vuepress2文档还含糊不清，关键部分更是一句没提。配置成功后评论插件一开始并没有载入成功（而且抓瞎不知道什么原因），我非常疑惑，花了好多时间仔细检查好多遍，都不能理解为什么。后来对照官方的例子（还好有给出[演示](https://vuepress-theme-hope.github.io/v2/comment/zh/demo.html)）才发现原来还需要自己写一个theme出来...我哪有那个能耐啊，直接Ctrl+CV了。不过这种东西本应在文档里指明的。
## 添加黑幕
在`.vuepress/public`下任选目录，新建`FileName.css`，输入如下代码：
```css
.heimu, .heimu a, a .heimu, .heimu a.new {
    background-color: #404040;
    color: #404040;
    text-shadow: none;
}
.heimu:hover, .heimu:active,
.heimu:hover .heimu, .heimu:active .heimu {
    color: white !important;
}
.heimu:hover a, a:hover .heimu,
.heimu:active a, a:active .heimu {
    color: lightblue !important;
}
.heimu:hover .new, .heimu .new:hover, .new:hover .heimu,
.heimu:active .new, .heimu .new:active, .new:active .heimu {
    color: #BA0000 !important;
}
```
在`config.ts`内添加全局css：
```ts
export default defineUserConfig({
    head:[
        ['link', { rel: 'stylesheet', href: '/styles/head.css' }] //填写你创建的css目录
    ],
})
```
然后就可以在.md文件中使用黑幕了：`<span class="heimu" title="你知道的太多了">你想说的话</span>` 效果：<span class="heimu" title="你知道的太多了">你想说的话</span>

## 图床衍生问题
由于图片越来越多，博客更新频繁，这样占云端空间大，上传也慢。于是就直接就地开了个images分支当作图床。我一开始直接在`.vuepress/public/images`文件夹里创建仓库上传的，然后也能正常使用，到了发布博客的时候，编译也过了，上传也成功了，结果github告诉我因为一个奇妙的问题构建不成功......此处放出错误信息：

> Fetching submodules<br/>
> /usr/bin/git submodule sync --recursive<br/>
> /usr/bin/git -c protocol.version=2 submodule update --init --force --depth=1 --recursive<br/>
> Error:fatal:No url found for submodule path 'images' in .gitmodules<br/>
> Error:The process '/usr/bin/git' failed with exit code 128<br/>

后来经过不断摸索发现是.git文件夹放在public/images文件夹里的原因。现在把images文件夹整个移出去以后就好了。我也是至今还不知道为什么会在如此诡异刁钻的地方出现这种问题。

## 编译失败问题
运行`npm run docs:build`时报错。显示：
> Error: EPERM: operation not permitted, lstat 'F:\program\myweb\docs\.vuepress\dist\.git\logs\refs\heads\main'

本地预览 *`npm run docs:dev`* 不受影响。

上网搜索，尝试管理员权限，清除缓存，更新npm手段，皆无效。看到有人说是xftp造成的dist文件夹占用问题，不了解。但是既然说是占用，那我就重启试试。于是问题解决。<span class="heimu" title="你知道的太多了">看来这是99%的问题其中之一呢</span>

## 图床国内无法解析问题
我原本使用的github图床图片格式为`https://raw.githubusercontent.com/lxl66566/lxl66566.github.io/images/logo.jpg`，由于我clash双端全天候开启，我根本没发现图片无法加载的这个问题，直到20220803我关了梯才发现，原来国内无法正常加载图片，报错：
> Failed to load resource: net::ERR_NAME_NOT_RESOLVED

一个比较合理的解释是国内dns无法解析`raw.githubusercontent.com`域名。

然后我尝试了其他图床：[SM.MS](https://sm.ms/)，但是：
1. 这个图床有*容量上限：5GB*和*单张图片上限：5MB*
2. 原有的每张图都需要手动替换，因为src是随机生成的
3. 会出现一些玄学问题，例如：使用`<img src="https://s2.loli.net/2022/08/03/DCPGWEa6dyoLK1t.jpg" width="100%" height="100%">`进行图片缩放时将不显示图片，即无法获取图片原始大小，需要使用绝对大小缩放（[下文](#图片无法比例缩放问题)有解释，这并不是图床的问题）
4. 在[关于SM.MS](https://sm.ms/about)界面你将能看到：![fucksmms](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/gossip/fucksmms.png)<span class="heimu" title="你知道的太多了">这样的图床还是早点死吧！</span>

因此寻找其他解决方案。开始采用CDN加速github图床的方案。cdn的好处：
* 不改变图片目录结构
* 替换方便。仅需全局查找替换，点一下鼠标即可。~~（但是对我来说需要把SM.MS图床的链接再换回原链接…）~~

然后参考[这篇文章](https://www.31du.cn/blog/jsdelivr.html)，先试了下[jsdelivr](https://www.jsdelivr.com/)，不能用。网上搜，大家也都说寄了。再试[statically](https://statically.io/)，这次成功了。于是就决定用它了。至此，问题解决。
## 关于数学插件
为markdown-it渲染器安装<span v-pre>$\LaTeX$</span>插件。[参考来源](https://blog.csdn.net/Flyingheart1991/article/details/126067149)，亲测有效。

由于`$...$`会被vuepress识别为未知标签，因此在需要使用公式时需包裹`<span v-pre></span>`标签。否则将触发[weak map key](#rendering-pages-failed问题) bug。
## 图片无法比例缩放问题
实际上，在[之前](#图床国内无法解析问题)已经出现过此问题，当时只会使用绝对大小解决。而这次，当我向图床中添加第一张手机照片时，玄学问题出现了。

我之前一直使用`<img src="..." width="100%" height="100%">`进行图片缩放。当我使用此方法对此图片进行缩放时，图片将不显示，调试显示此图片标签属性为`width="0" height="0"`。只有当`width`与`height`都不含`%`时，图片才能显示。

有以下两个解决方法：

1. 在全局css中新增类`.ClassName img{width: 60% !important; height:auto !important;}`，并在md中以`<div class='ClassName'><img src='...'/></div>`使用。
2. 在全局css中新增类`.ClassName img{max-width: 60%;}`，并在md中以`<div class="ClassName";"><img src="..."/></div>`使用。

## 为单一页面添加css

<text style="color:red;font-weight:bold">未解决！</text>

起因：不想全局添加css。[官方说明](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%A1%B5%E9%9D%A2%E7%B1%BB)已尝试，无效。（该文档为v1文档，不适用于v2）

最新发现：[官方在此处的声明](https://v2.vuepress.vuejs.org/zh/reference/default-theme/styles.html#style-%E6%96%87%E4%BB%B6)中，style文件类型从.styl改为.scss。有机会的话可以尝试。
## html转vue组件失败问题

<text style="color:red;font-weight:bold">未解决！</text>

用html, js, css 三件套写了一个简陋的[背词器](../farraginous/reciter.md)出来，但是受制于iframe的固定大小，很容易出现超出边框的情况。于是想到了vue组件引入的方法。但是，遇到了~~前所未有~~的麻烦。vue组件单文件（SFC）仅允许一个`<script>`标签的存在。而我的背词器中使用了两个script：jquery库与我自己写的js。

网上的关于SFC的解释非常的含糊其辞。几乎没有实例。

现在无法正常执行js脚本。
## 配置sidebar问题
由于我一开始对sidebar的机制并不清楚，官方文档的教程也无法满足我的需求，于是就自己慢慢摸了几个小时…**此处只讲述如何*在不同子路径中使用不同的侧边栏* 这一泛用性广但示例少的解决方案。**

首先，sidebar配置结构为`绝对路径:sidebar对象`这样的键值对。一个sidebar对象有：
* `text`，表示该栏显示的文字
* `link`，表示点击该栏后跳转的位置
* `children`，表示该栏下的sidebar对象

当然它也可以是一个路径字符串，其他功能由vuepress2帮你自动生成。

另外，若需要为文件夹做一个向导，应在文件夹内部添加`README.md`主页。指向该主页的路径为文件夹名称。使指定页面覆盖配置，自动生成sidebar需要在该页面顶部添加[sidebar frontmatter](https://v2.vuepress.vuejs.org/zh/reference/default-theme/frontmatter.html#sidebar)。

下面是我的sidebar配置参考。
```ts
sidebar:{
    '/gossip/': [
    {
        text : '闲聊',
        link : '/gossip/',
        children: ['author.md',...],
    },
    ],
    '/articles/': [
    {
        text : '我的文章',
        link : '/articles/',
        children: ['computer_setting.md',...],
    },
    ],
    '/': [
    '../README.md',
    {
        text : '闲聊',
        link : '/gossip/',
        children: ['/gossip/author.md',...],
    },
    {
        text : '我的文章',
        link : '/articles/',
        children: ['/articles/computer_setting.md',...],
    },
    {
        text : '编程',
        children: ['/coding/Rust.md',...],
    },
    {
        text : '爱好',
        children: ['/hobbies/rhythm_games.md',...],
    },
    {
        text : '杂项',
        children: ['/farraginous/recommend_packages.md',...],
    },
    ],
},
```

17行写的是`'../README.md'`而不是`'/README.md'`，是因为我需要让某些二级页面也能显示主页的侧边栏，为此提供索引。主页已经在顶层目录下，无法向前回退。

### vuepress v1.x的要求
vuepress1的配置有一点不一样。

v1.x sidebar工作机制为：**从上到下寻找该页面匹配的绝对路径前缀，若匹配则使用该sidebar对象**。这使我需要把多级sidebar放在前而根目录放在最后。还好[v1.x文档对此有警告](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%A4%9A%E4%B8%AA%E4%BE%A7%E8%BE%B9%E6%A0%8F)。

团队使用的[vuepress-theme-hope](https://vuepress-theme-hope.github.io/v1/zh/)主题中，sidebar对象有以下字段：
* `title`：规定显示的文字
* `link`：表示点击该栏后跳转的位置
* `prefix`：路径前缀
* `children`：子对象

一个配置示例为：
```js
sidebar: {
    "/": [
        "/",
        {
            title: "教程系列",
            link: "/Learning-list/",
            prefix: "/Learning-list/",
            collapsable: false,
            children: ["git/", "OpenGL/", "Linux/", "如何浅层地使用pgp加密.md", ],
        },
    ],
},
```