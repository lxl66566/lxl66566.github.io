---
date: 2022-07-18
icon: circle-xmark
category:
  - 博客
  - 教程
  - 经历
---

# 问题列表

折腾此 Vuepress 博客时遇到的问题。Vuepress 本质上还是为 Vue 开发者准备的，如果在写博客之前能系统地学习 Vue 与其他前端技术，能够避开很多问题。

后来我是学了，详见 [Vue](../coding/vue.md)。

::: tip

- 以下问题可能不具有时效性与主题泛用性，请自行判断。
- 按时间升序。

:::

## 博客搭建问题

搭建之初阶段，由于 vuepress1.x 仅使用 config.js，而 2.x 改用 ts，这导致了我（还不会用 google）被网上教程（多为 js 写成）与官方文档的 ts 搞得不明所以。

官方文档肯定正确，但是官方的说明显然是面向 Vue 开发者而不是面向新手的，所以我也看不懂。

## 字体颜色问题

网上教程为使用 `<font color="red">` 标签，但此标签不受 html5 支持（并导致了下述 _Rendering pages failed_ 问题）。我还尝试了 `<p>` 标签（但会自动换行）与 `<a>` 标签（但有下划线和点击效果）。最终选用 `<text style="color:red;">` 标签，写起来最为简洁，无需添加额外属性。

## Rendering pages failed 问题

显示的错误信息是 Vuepress 的底层问题，无法直接看出问题所在。且 `docs:dev` 本地预览完全不受影响。之后不断比对各处编译，发现是引入未知 html 标签导致的。（初次为 `<font>` 标签，之后还有：自定义组件的标签，被识别成组件的语法）<span class="heimu" title="你知道的太多了">_（感谢[dream 同学](https://dream-oyh.github.io/)重蹈覆辙，提供**完全一致**的错误信息，如下所示。）_ 原本因为时隔太久且当时没有博客心得，因此没有记录，没想到有笨比（</span>

> TypeError: Invalid value used as weak map key<br/>
> at WeakMap.set (\<anonymous\>)<br/>
> at normalizePropsOptions (C:\Users\oyh\vuepress-starter\node_modules\@vue\runtime-core\dist\runtime-core.cjs.prod.js:3179:15)<br/>
> at createComponentInstance (C:\Users\oyh\vuepress-starter\node_modules\@vue\runtime-core\dist\runtime-core.cjs.prod.js:5695:23)<br/>
> at renderComponentVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:168:22)<br/>
> at Object.ssrRenderComponent (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:605:12)<br/>
> at \_sfc_ssrRender$b (C:\Users\oyh\vuepress-starter\docs\.vuepress\.temp\.server\app.js:1362:24)<br/>
> at renderComponentSubTree (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:250:13)<br/>
> at renderComponentVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:185:16)<br/>
> at renderVNode (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:292:22)<br/>
> at renderComponentSubTree (C:\Users\oyh\vuepress-starter\node_modules\@vue\server-renderer\dist\server-renderer.cjs.prod.js:256:13)<br/>

## Vue 组件注册失败的问题

前期开发过程中遇到的最大的问题。详情懒得再写一遍了，请直接[跳转 stackoverflow 查看](https://stackoverflow.com/questions/73009755/failed-to-register-a-vue-component-in-vuepress2)。我还剩一种方法（在 client.ts 中手动注册组件）没试，不过既然已经曲线救国成功（使用 iframe 引入带组件的 html），就暂时不尝试了。（20220720 速报：问题已解决，解决方法：重新下载 vuepress2 包。猜测是旧 vuepress2 的依赖包出了问题。）

## 评论插件配置失败问题

我使用的评论插件是[vuepress-plugin-comment2](https://vuepress-theme-hope.github.io/v2/comment/zh/)。该插件的文档写的甚至比 vuepress2 文档还含糊不清，关键部分更是一句没提。配置成功后评论插件一开始并没有载入成功（而且抓瞎不知道什么原因），我非常疑惑，花了好多时间仔细检查好多遍，都不能理解为什么。后来对照官方的例子（还好有给出[演示](https://vuepress-theme-hope.github.io/v2/comment/zh/demo.html)）才发现原来还需要自己写一个 theme 出来...我哪有那个能耐啊，直接 Ctrl+CV 了。不过这种东西本应在文档里指明的。

后来发现。。事实上这个插件是 [VuePress Theme Hope 主题](./index.md#主题选择)的专用组件，因此未说明默认主题下的使用方法。

## 添加黑幕

其实就是添加全局 css。

在`.vuepress/public`下任意位置新建`head.css`（名字不重要），输入：

```css
.heimu,
.heimu a,
a .heimu,
.heimu a.new {
  background-color: #404040;
  color: #404040;
  text-shadow: none;
}
.heimu:hover,
.heimu:active,
.heimu:hover .heimu,
.heimu:active .heimu {
  color: white !important;
}
.heimu:hover a,
a:hover .heimu,
.heimu:active a,
a:active .heimu {
  color: lightblue !important;
}
.heimu:hover .new,
.heimu .new:hover,
.new:hover .heimu,
.heimu:active .new,
.heimu .new:active,
.new:active .heimu {
  color: #ba0000 !important;
}
```

在`config.ts`内添加全局 css：

```ts
export default defineUserConfig({
  head: [
    ["link", { rel: "stylesheet", href: "/styles/head.css" }], // 填写对 public 的 css 相对路径
  ],
});
```

然后就可以在 .md 文件中使用黑幕了：`<span class="heimu" title="你知道的太多了">你想说的话</span>` 效果：<span class="heimu" title="你知道的太多了">比如这样</span>

### 另一个方法

创建 `.vuepress/styles/index.scss` 并写入 css。vuepress 会自动引入，无需写入配置。是通用解法，与主题无关。

### 组件方法

也可以把这个 css 抽成一个 [vue 组件](../coding/vue.md)，比样式派每次少写一些，还是不错的。

目前我的博客是 `<heimu>` 组件和样式混用的。

## 图床衍生问题

由于图片越来越多，博客更新频繁，这样占云端空间大，上传也慢。于是就直接就地开了个 images 分支当作图床。我一开始直接在 `.vuepress/public/images` 文件夹里创建仓库上传的，然后也能正常使用，到了发布博客的时候，编译也过了，上传也成功了，结果 Github 告诉我因为一个奇妙的问题构建不成功......此处放出错误信息：

> Fetching submodules<br/>
> /usr/bin/git submodule sync --recursive<br/>
> /usr/bin/git -c protocol.version=2 submodule update --init --force --depth=1 --recursive<br/>
> Error:fatal:No url found for submodule path 'images' in .gitmodules<br/>
> Error:The process '/usr/bin/git' failed with exit code 128<br/>

后来经过不断摸索发现大概是 git 内包含了一个 git 的原因。把 images 文件夹整个移出去以后就好了。

## EPERM 编译失败问题

运行 `npm run docs:build` 时报错。显示：

> Error: EPERM: operation not permitted, lstat 'F:\program\myweb\docs\.vuepress\dist\.git\logs\refs\heads\main'

本地预览 _`npm run docs:dev`_ 不受影响。

上网搜索，尝试管理员权限，清除缓存，更新 npm 手段，皆无效。看到有人说是 xftp 造成的 dist 文件夹占用问题，不了解。但是既然说是占用，那我就重启试试。于是问题解决。~~看来这是 99%的问题其中之一呢~~

## 图床国内无法解析问题

我原本博客托管在 github.io，图片加载链接为`https://raw.githubusercontent.com/lxl66566/lxl66566.github.io/images/logo.jpg`，由于我 clash 双端全天候开启，我根本没发现图片无法加载的这个问题，直到 20220803 我关了梯才发现，原来国内无法正常加载图片，报错：

> Failed to load resource: net::ERR_NAME_NOT_RESOLVED

原因是 `raw.githubusercontent.com` 域名在墙内受到污染。

然后我尝试了使用其他图床托管图片：[SM.MS](https://sm.ms/)，但是：

1. 这个图床有 _容量上限：5GB_ 和 _单张图片上限：5MB_
2. 原有的每张图都需要手动替换，因为 src 是随机生成的
3. 会出现一些玄学问题，例如：使用`<img src="https://s2.loli.net/2022/08/03/DCPGWEa6dyoLK1t.jpg" width="100%" height="100%">`进行图片缩放时将不显示图片，即无法获取图片原始大小，需要使用绝对大小缩放（[下文](#图片无法比例缩放问题)有解释，这并不是图床的问题）
4. 在[关于 SM.MS](https://sm.ms/about)界面你将能看到：![fucksmms](/images/blog/withvuepress2/fucksmms.png) ~~这样的图床还是早点死吧！~~

因此寻找其他解决方案。开始采用 CDN 加速 Github 图床的方案。cdn 的好处：

- 不改变图片目录结构
- 替换方便。仅需全局查找替换，点一下鼠标即可。<span class="heimu" title="你知道的太多了">~~（但是对我来说需要把 SM.MS 图床的链接再换回原链接…）~~</span>

后来尝试了以下 cdn：

- [jsdelivr](https://www.jsdelivr.com/)，然而国内无法使用。网上搜，大家也都说寄了。
- [statically](https://statically.io/)，成功。于是就决定用它了。
  - 后来 _cdn.staticaly.com has expired._，然而我并没有发现是代理域名的问题（_statically.io_ 可以正常使用），于是把图片直接放到静态站点里了。由于博客主要托管不再是 _github.io_ 而是 cloudflare，因此回归本源也不错，不会再出现此问题。

## 关于数学插件

为 markdown-it 渲染器安装<span v-pre>$\displaystyle \LaTeX$</span>插件。[参考来源](https://blog.csdn.net/Flyingheart1991/article/details/126067149)，亲测有效。

由于`$...$`会被 vuepress 识别为未知标签，因此在需要使用公式时需包裹`<span v-pre></span>`标签。否则将触发[weak map key](#rendering-pages-failed-问题) bug。

## 图片无法比例缩放问题

实际上，在[之前](#图床国内无法解析问题)已经出现过此问题，当时只会使用绝对大小解决。而这次，当我向图床中添加第一张手机照片时，玄学问题出现了。

我之前一直使用 `<img src="..." width="100%" height="100%">` 进行图片缩放。当我使用此方法对此图片进行缩放时，图片将不显示，调试显示此图片标签属性为 `width="0" height="0"`。只有当 `width` 与 `height` 都不含 `%` 时，图片才能显示。

解决方法：

- 在全局 css 中新增类选择器`.ClassName img{width: 60% !important; height:auto !important;}`或`.ClassName img{max-width: 60%;}`，并在 md 中以`<div class="ClassName"><img src="..."/></div>`使用。

## 为单一页面添加 css

<text style="color:red;font-weight:bold">未解决！</text>

起因：不想全局添加 css。[官方说明](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#自定义页面类)已尝试，无效。（该文档为 v1 文档，不适用于 v2）

最新发现：[官方在此处的声明](https://v2.vuepress.vuejs.org/zh/reference/default-theme/styles.html#style-文件)中，style 文件类型从 .styl 改为 .scss。有机会的话可以尝试。~~扩展名与文件无关！~~

~~其实加的 css 也就这么几行，全局不全局的无所谓了~~

## html 转 vue 组件失败问题

用 html, js, css 三件套写了一个简陋的[背词器](../farraginous/reciter.md)出来，但是受制于 iframe 的固定大小，很容易出现超出边框的情况。_（曲线救国：预留大量位置）_ 于是想到了 vue 组件引入的方法。但是，遇到了大麻烦：vue 组件单文件（SFC）仅允许一个 `<script>` 标签的存在。而我的背词器中使用了两个 script：jquery 库与我自己写的 js。现在无法正常执行 js 脚本。

> emmm，现在我已经学习了 Vue，vue 里根本没必要用 jquery。

## 配置 sidebar 问题

由于我一开始对 sidebar 的机制并不清楚，官方文档的教程也无法满足我的需求，于是就自己慢慢摸了几个小时…**此处只讲述如何 _在不同子路径中使用不同的侧边栏_ 这一泛用性广但示例少的解决方案。**

首先，sidebar 配置结构为 `绝对路径:sidebar对象` 这样的键值对。一个 sidebar 对象有：

- `text`，表示该栏显示的文字
- `link`，表示点击该栏后跳转的位置
- `children`，表示该栏下的 sidebar 对象

当然它也可以是一个路径字符串，其他功能由 vuepress2 帮你自动生成。

另外，若需要为文件夹做一个向导，应在文件夹内部添加 `README.md` 主页。指向该主页的路径为文件夹名称。使指定页面覆盖配置，自动生成 sidebar 需要在该页面顶部添加[sidebar frontmatter](https://v2.vuepress.vuejs.org/zh/reference/default-theme/frontmatter.html#sidebar)。

下面是我的 sidebar 配置参考。

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
        children: ['windows_setting.md',...],
    },
    ],
    '/': [
    '../index.md',
    {
        text : '闲聊',
        link : '/gossip/',
        children: ['/gossip/author.md',...],
    },
    {
        text : '我的文章',
        link : '/articles/',
        children: ['/articles/windows_setting.md',...],
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

17 行写的是`'../index.md'`而不是`'/index.md'`，是因为我需要让某些二级页面也能显示主页的侧边栏，为此提供索引。主页已经在顶层目录下，无法向前回退。

### vuepress v1.x 的要求

vuepress1 的配置有一点不一样。

v1.x sidebar 工作机制为：**从上到下寻找该页面匹配的绝对路径前缀，若匹配则使用该 sidebar 对象**。这使我需要把多级 sidebar 放在前而根目录放在最后。还好[v1.x 文档对此有警告](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#多个侧边栏)。

团队使用的[vuepress-theme-hope](https://vuepress-theme-hope.github.io/v1/zh/)主题中，sidebar 对象有以下字段：

- `title`：规定显示的文字
- `link`：表示点击该栏后跳转的位置
- `prefix`：路径前缀
- `children`：子对象

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

## 上传问题

`git push` 时出现问题：`ssh: connect to host github.com port 22: Connection timed out`。代理无问题，可上 Github。

解决方法（二选一）：

1. 参考[Github 官方解释](https://docs.github.com/zh/authentication/troubleshooting-ssh/using-ssh-over-the-https-port)，使用 443 端口
2. 配置 git 全局代理

## html 传参引入指定 js

目的：复用画图表的 html 文件。尝试：

1. 给页面中的 iframe html 传参:
   ```html:no-line-numbers
   <iframe src="/charts/animation.html?src=GBperprice"></iframe>
   ```
2. 然后在 html script 中处理参数:
   ```js
   function getParams(key) {
     var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r != null) {
       return unescape(r[2]);
     }
     return null;
   }
   const addr = "/charts/" + getParams("src") + ".js";
   ```
3. 并引入`addr`参数位置的 .js 文件。
   <text style="color:red;font-weight:bold">未解决！</text>
   ::: code-tabs
   @tab HTML

   ```html
   ...
   <!-- <script type="text/javascript" src=addr></script> 
       无效。script 无法使用 JavaScript 变量。 -->
   <script type="module">
     // import {data} from addr; 报错，其将 addr 识别为 "addr" 而非 String 变量
     import(addr); // 无效
   </script>
   ...
   ```

   @tab JS

   ```js:no-line-numbers
   export const data=[...]
   ```

   :::

## pangu 插件安装失败

试图安装 [vuepress-plugin-pangu](https://shigma.github.io/markdown-it-pangu) 失败。官方文档稀烂，缺乏维护，只有 vuepress1.x 的 js 配置，而我使用 ts ；由于并未学习，面对各种报错显得很无力。（有生之年必学）

解决方法：
突然想到了我[加黑幕的方法](#添加黑幕)，直接将 js 引入每个页面的 head。
config.ts:

```ts
head: [
  ["link", { rel: "stylesheet", href: "/styles/head.css" }],
  ["script", { src: "/styles/pangu.min.js" } ],
],
```

其中`/styles/pangu.min.js`内是[https://cdnjs.cloudflare.com/ajax/libs/pangu/4.0.7/pangu.min.js](https://cdnjs.cloudflare.com/ajax/libs/pangu/4.0.7/pangu.min.js)的内容。但是这样一来便引入了以下问题：

### 无法加载 pangu 问题

<text style="color:red;font-weight:bold">未解决！</text>

使用此方法添加的 pangu.min.js 在 head 中被注入，存在加载次序问题，在浏览器上无法正常运行。我尝试使用 [`enhanceApp.js`](https://vuepress.vuejs.org/zh/guide/basic-config.html#应用级别的配置) 将其添加到文档末尾解决这个问题：

`.vuepress/enhanceApp.js`:

```js
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  router, // 当前应用的路由实例
}) => {
  const pangujs = document.createElement("script");
  pangujs.src = "./styles/pangu.min.js";
  pangujs.async = true;
  pangujs.defer = true;
  document.body.appendChild(pangujs);
  console.log("pangu installed"); // test
};
```

但是失败了，`console.log` 并未执行，说明 `.vuepress/enhanceApp.js` 未被自动加载。我也尝试了在 `config.ts` 中加入 `enhanceAppFiles: resolve(__dirname, 'enhanceApp.js')`[^1]，无效。

[^1]: [ref](https://vuepress.vuejs.org/zh/plugin/option-api.html#enhanceappfiles)

> ps. 现在已使用 Prettier 格式化代码，其会自动添加空格，曲线救国。

## 端口拒绝访问

> listen EACCES: permission denied 0.0.0.0:8080

解法：[解决 windows(hyper-v) 端口随机占用](../articles/windows_setting.md#端口随机占用)

## 试图迁移至 vitepress

vitepress 其实是 VuePress 的一个分支，其具有更快的渲染速度与更高的自由度(?)，因此我尝试将此 blog 迁移至 vitepress。结果——如你所见，失败了。但是，此配置过程中也学到了一些东西。

1. 安装好 vitepress 并配置。其配置有些许不同：
   - `navbar` 改为 `nav`，并且其与 `sidebar` 接受参数的语法不同。
   - vitepress 以 `index.md` 作为默认页面，而非 `readme.md`.
   - 考虑[抄抄官方](https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts)，有一些好的理念。
2. 安装插件。
   1. 搜索插件：vitepress [内置](https://vitepress.dev/reference/default-theme-search#local-search)，并且其功能爆杀 VuePress。
   2. 数学公式插件，`npm install markdown-it markdown-it-mathjax3`。详细配置可以抄[这里](https://github.com/brc-dd/vitepress-mathjax3)，完美解决遇到的问题。
   3. 评论插件：[vitepress-plugin-comment-with-giscus](https://github.com/T-miracle/vitepress-plugin-comment-with-giscus)，非常简单，但是首页无法显示评论，搞了好久没法解决。
3. 全局 css：在 `.vitepress/theme/styles/` 中放入任何想要的 css 文件，然后在 `theme/index.ts` 下 import 就行了。可惜没法这样引入 js，`pangu.js` 还是无法使用。
4. 无法加载 `public` 中的资源。无论 img 还是 html 用 iframe 引入都不行。
   - iframe 404，用法 `<iframe frameborder="no" src="/charts/sports_distance.html" width="100%" height="304"></iframe>`，报错 `GET http://localhost:5173/charts/sports_distance.md?import&t=1689086185464 net::ERR_ABORTED 404 (Not Found)`，看起来是把后缀强制上了 `.md`。。我在官方文档看到了[关于 pathname:// 的解释](https://vitepress.dev/guide/asset-handling#the-public-directory)，但是并没有什么卵用。
5. 无法 build，preview。我是真的很不理解。

   1. `npm run docs:build` 报错
      > ✓ building client + server bundles...<br/>
      > build error:<br/>
      > ReferenceError: window is not defined<br/>
      > at file:///D:/program/vitepress/docs/.vitepress/.temp/app.js:4675:3<br/>
      > ...

   但是我也没用什么组件，找不到解法。 2. `npm run docs:preview` 报错

   > failed to start server. error:<br/>
   > Error: ENOENT: no such file or directory, open 'D:\program\vitepress\docs\.vitepress\dist\404.html'

   这就很好理解了，毕竟 `dist` 还是残缺的。不过至少有个理论能用的 preview 已经很不错了，~~都可以杀 VuePress（~~

::: details 最后附上我尝试的 config.ts 代码留念 x

```ts
import { defineConfig } from "vitepress";
import mathjax3 from "markdown-it-mathjax3";
const customElements = ["mjx-container"];
export default defineConfig({
  lang: "zh-CN",
  title: "绝对值_x 的博客",
  description: "没什么有价值的内容的，真的！",
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    logo: "https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/logo.jpg",
    nav: nav(),
    sidebar: sidebar(),
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/lxl66566/lxl66566.github.io",
      },
    ],
    search: {
      provider: "local",
    },
    externalLinkIcon: true,
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
});
function nav() {
  return [
    {
      text: "编程",
      link: "/coding/",
    },
    {
      text: "文章",
      link: "/articles/",
    },
    {
      text: "闲聊",
      link: "/gossip/",
    },
    {
      text: "随笔",
      link: "/essay.md",
    },
  ];
}
function sidebar() {
  return {
    "/gossip/": [
      {
        text: "闲聊",
        link: "/gossip/",
        items: [{ text: "author", link: "/gossip/author" }],
      },
    ],
  };
}
```

:::

## 尝试更好的搜索

[如上所述](#试图迁移至-vitepress)，VuePress 拥有极为垃圾的默认搜索机制，而官方推荐的第三方服务（algolia）需要经过严格审查。因此我看到了能够本地索引的[flexsearch](https://github.com/nextapps-de/flexsearch)，继续找到了：

- [vuepress-plugin-flexsearch](https://github.com/z3by/vuepress-plugin-flexsearch)，此插件已经两年未维护，依赖包的安全漏洞数十个，甚至连 [example 都未能执行](https://github.com/z3by/vuepress-plugin-flexsearch/issues/85)。。在 vuepress 2.x 上无法使用。
- [vuepress-plugin-fulltext-search](https://github.com/leo-buneev/vuepress-plugin-fulltext-search)，我更愿意将其看成 _vuepress-plugin-flexsearch_ 的一个 fork，同样的两年未维护，同样的无法使用，同样的安全漏洞。/流汗
- [Run your own docsearch](https://docsearch.algolia.com/docs/legacy/run-your-own)，文章也两年未更新了，而且也需要借助 algolia 的 API 服务，免费最高支持 10k 条(?)，总之不是一个好选择。
- [vuepress-plugin-full-text-search2](https://github.com/ota-meshi/vuepress-plugin-full-text-search2)：testing

参考：[liuli-moe/to-the-stars](https://github.com/liuli-moe/to-the-stars/issues/22)

## 更换主题

20230712 由于开头所述原因，更换了 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 主题。迁移过程比我想象的时间要少。该主题有如下优势：

- 自动检测 Broken links
- Markdown 增强：
  - 自带 $TEX$ 支持
  - 任务列表
  - 脚注支持
  - 容器扩展
  - 图片扩展
- 更适用于博客的首页
- 无障碍图标
- 自动明暗主题
- 内容加密

反正就是非常牛逼。

不过还有一些问题（功能改进）没有解决：

- ~~比如我想在 navbar 上加一个 telegram 的跳转链接。~~（[已解决](#navbar-添加组件)）
- 主页评论区寄了。明明都是 gisgus 的服务，配置一模一样，也是按照 `pathname` 查找，但是原先的评论就是找不回来。
  - 官方有提到[如何在主页添加评论](https://theme-hope.vuejs.press/zh/guide/advanced/replace.html#插槽利用)，但是事实上并没有什么软用。。。直接报错 import 路径错误了。

## navbar 添加组件

起因：想给导航栏添加一个 Telegram 的链接。由于 VuePress Theme Hope 就有，可以直接抄。

1. 写（抄）一个[组件](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/0b04354dcfe6a2f7391029091da23c3df950a0e5/docs-shared/src/components/TelegramLink.ts)，替换链接。
2. 在 `client.ts` 中[手动注册](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs-shared/src/client.ts)。
3. 在 `theme.ts` 中[引入](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/9baaa2ffac93f9952a244b39769e7dc6c598a611/docs-shared/src/theme-wrapper.ts#L48)。

后来发现写一个这个 ts 实际上等价于写一个 vue 组件，而 vue 的写法可读性更好。因此我后来改成了 vue。

## 添加 rss 订阅

[官方说](https://theme-hope.vuejs.press/zh/guide/advanced/feed.html)是说支持，还内置，但是并不能用...首先 VuePress Theme Hope 文档的描述就比插件文档描述少了东西，比如 `hostname`。其次我配置好以后并不知晓如何获取 `rss.xml`，官方示例使用默认主题配置，使用外部导入的插件，没有参考意义。

后来发现 dev 没法使用，但是 build 后在 dist 内会生成 `rss.xml`，就可以订阅了。

### 添加订阅图标

模仿 [telegram 图标](#navbar-添加组件) 添加。首先替换链接，再去找个 rss 的 svg，替换 `<path d=...>` 内容；替换 `viewBox` 内容（没错，我踩坑了）即可。<span class="heimu" title="你知道的太多了">不熟悉 svg 是这样的</span>

## 自动部署

- 已提 [issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/3332)

使用 pnpm 指令 `pnpm create vuepress-theme-hope my-docs` 创建模版项目后，自动生成的 _.github/workflows/deploy-docs.yml_ 并不能在 Github actions 中成功构建，报错：

> Error: Error: No pnpm version is specified.<br/>
> Please specify it by one of the following ways:<br/> - in the GitHub Action config with the key "version"

解法可以参考 [pnpm 文档](https://pnpm.io/zh/continuous-integration#github-actions)，加一条 `version: 8` 即可。

## hope theme template build error

20230807，使用 pnpm 指令 `pnpm create vuepress-theme-hope my-docs` 创建模版项目后，执行 `pnpm docs:build` 会报错。原因是依赖未更新，Github 上的依赖更新未同步至 npmjs [create-vuepress-theme-hope](https://www.npmjs.com/package/create-vuepress-theme-hope)。

解法：在 `package.json` 中将 vue 版本改为 `^3.3.4` 并执行 `pnpm i` 更新依赖。

<span class="heimu" title="你知道的太多了">妈的，这些 bugs Github 都修了，npmjs 一直不更新是几个意思呢？</span>

## 图片防爆

- 已撤销

此博客使用 CDN 引入图片。然而即使是老牌 CDN 也可能会有不稳定的时候，想着加个防爆链接，当 CDN 爆了以后 img 从另一个链接加载。([ref](https://www.w3schools.com/jsref/event_onerror.asp))

```html
<img src="image.jpg" onerror="this.src='other link'" />
```

而 markdown 内的图片格式可以用[markdown enhancement: attr](https://theme-hope.vuejs.press/zh/guide/markdown/attrs.html#使用)添加 attr。然后踩了坑：

1. 首先大括号 `{}` 需要紧跟在图片的 `)` 后，不能有空格。。（然而官网示例是给的空格）
2. 其次，添加的 attr 不允许出现大写字母。。。（这确实是标准，但是一般浏览器遇到大写会自动纠正 ([ref](https://stackoverflow.com/questions/25033268/are-html5-data-attributes-case-insensitive))）

最后还是决定不加了，毕竟防爆用的原始链接是 `raw.githubusercontent.com` 下的，本身就被墙了；而且还没有考虑可能出现的的死循环问题。

## Google Analystics

**ps. 当天发现 _cloudflare pages_ 自带 _Web Analytics_，白干。**

想看看我的博客的访问数据，但是不能直接用一个简单计数器，否则我自己对我的博客访问最多，会污染数据。于是使用 Google 家的免费服务。

跟随[官网操作](https://analytics.google.com/)，账号和媒体资源名称随便填。输入博客网址，然后会给你一段 html 代码让你写进网页。

很容易想到在 `config.ts` 中写 head 项，把 script 载入每个博客页面。这里是[官网的说明](https://v2.vuepress.vuejs.org/zh/reference/config.html#head)。

写的时候犹豫了一下 `async` 要怎么写，稍作尝试就写出来了。示例：

```ts
...
head: [
  [
    "script",
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-xxxxxxxx",
    },
  ],
  [
    "script",
    {},
    `<!-- Google tag (gtag.js) -->
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-xxxxxxxx');`,
  ],
],
...
```

其实 cloudflare 是有自己的 _Web Analytics_ 的，但是我对比了一下，感觉还是 Google 的更准确点。

## 静态资源引用错误

build 报错

> ✖ Compiling with vite - failed in 1.80s<br/>
> Error: [vite]: Rollup failed to resolve import "/images/essay/20220619.png" from "D:/program/lxlsblog/src/.vuepress/.temp/pages/essay/2022.html.vue".
> This is most likely unintended because it can break your application at runtime.<br/>
> If you do want to externalize this module explicitly add it to
> `build.rollupOptions.external`

第二句提示报错，发现是 public 资源改位置了而文章里没改，没引用到。

## 局部注册组件

[主题文档](https://theme-hope.vuejs.press/zh/guide/customize/component.html#在-markdown-中使用-vue-语法与组件)是有描述如何局部注册组件的，但是我之前尝试了几次都失败了。

第一个报错发生在 `import { getDirname, path } from "@vuepress/utils";` 时，系统提示找不到 `@vuepress/utils`。由于主题默认采用 _pnpm_，`node_modules` 的布局与传统的不同，因此确实无法找到 `@vuepress/utils`。后来自己手动装了才能用（`pnpm install`）。

第二个问题是我的 `export default` 后面跟的是一个 `defineUserConfig({...})`，返回一个 `UserConfig` 对象。我尝试直接 `defineUserConfig({alias:{...},...})` 会报类型错误，毕竟是 ts，这个函数本来就不能接受未知参数。后来学了点 ts/js，发现只需要借助中间变量即可。

```ts
const temp = defineUserConfig({...});
temp.alias = {...};
export default temp;
```

## 尝试将 plot 放入 vue 组件

这是一次失败的尝试，我将改动放在了 [_vueplotfailed1_ 分支](https://github.com/lxl66566/lxl66566.github.io/tree/vueplotfailed1)内。我本以为写了一些组件的我能够胜任这项任务，事实证明我还是太天真了。

在经历了各种调试以后，我发现 `@antv/g2plot` 的官方调用方式是：

```js
const bar = new Bar("container", {
  data,
  xField: "sales",
  yField: "year",
  ...
});
```

其中第二个参数（`option`） 是一个自定义的类型，而不是一个 `Object`；它的第一个参数是一个 Array，而后面却是一堆键值对。这就导致了我没法向第一个 data 传参：如果我用 `this.data`，则会被报错 `expected ':'`；如果我 `const temp = this.data;{data,...}`，`temp` 又不能跟随 `this.data` 的变化。

## 处理 darkmode

起因是我在博客中放了一张黑色文字 svg，但是图片默认不反色，因此黑暗主题下完全看不到。因此我想写一点 css 使其在黑暗模式下自动反色。

翻了点文档发现了个 scss [example](https://theme-hope.vuejs.press/zh/guide/customize/color.html#修改其他颜色)，对着其和 GPT 抄了以后发现无论如何都无法反色。（尝试了一堆邪道，`@if` 啊，`$isDarkmode` 啊，`#{hope-config.$dark-selector}` 啊）

```scss
img[type="image/svg+xml"] {
  html[data-theme="dark"] {
    filter: invert(1);
  }
}
```

后来进群问（没错，theme-hope 有群了），说 html 选择器要放外面。于是发现我抄漏了一个 `&`，这个符号就是指定父元素用的。

然后加了 `&` 还是没用，我又尝试了一下其他 scss 官方示例，但是都是可以正常工作的。所以这一定是我的问题。

然后发现这个 `type` 并不是 img 自带的属性。。我一直以为这选择器能自动判断 type 来着。后来就可以了。下面是最终的 scss：

```scss
img[src$=".svg"] {
  html[data-theme="dark"] & {
    filter: invert(1);
  }
}
```

带给我一个教训：折腾之前先系统学习（scss 语法）。

## 更新依赖问题

vuepress 及其 theme-hope 有着一大堆 peerDenepdencies，完全就是一副依赖地狱的场景。而我之前一直在使用的 pwa2 某次更新时爆了，我尝试更新都会提示 pwa2 需要的 vuepress 版本不满足。其他的依赖都依赖最新的 vuepress（2.0.0.rc13），而 pwa2 依赖更老的版本（2.0.0.rc7）。

首先 pwa2 是必需留着的，否则已经加载过我博客的浏览器将永远不能收到博客更新。而且 remove-pwa 插件也尝试过了，并不能用。（这 pwa 跟屎一样，之前不小心安装了就跟狗皮膏药一样粘着我）因此这次我也没有往 pwa2 的角度思考问题。

我尝试将所有其他的依赖都降级到它们依赖 vuepress 2.0.0.rc7，但是 pnpm 官方并没有提供一个好用的降级工具，我也找不到还有哪里有降级工具。
而 npmjs 也不会显示某包的历史版本都依赖了哪些库的版本，我只能跳转到某个历史版本然后去 code 里找 `package.json`，非常痛苦。因此手动给每个依赖降级是不太现实的。

于是更新依赖就被我拖了很久，直到我 20240610 发现我的 RSS 插件爆了。。这下是箭在弦上，不得不更新了！折腾了一下降级，又被劝退了。然后去翻文档，去 npmjs 到处走，突然发现——`vuepress-plugin-pwa2` 已经被标了 deprecated。于是问题解决，换成了新的 `@vuepress/plugin-pwa`，不会再出现依赖冲突问题了。回想起来发现我是真的傻（也可能是 `vuepress-plugin-pwa2` 在前几次折腾时还未标记弃用）这下功过后人评了。

垂死病中惊坐起，千行变更改依赖。lockfile 改了两千多行，这甚至都会被 git 忠实记录下来然后无故增大仓库体积。

然后又遇到了问题：根据 pnpm 提示，装了 `@vuepress/bundler-vite`，然而还是无法 build：`The bundler / theme option is missing`，引导我到[这个页面](https://v2.vuepress.vuejs.org/guide/troubleshooting.html#the-bundler-theme-option-is-missing)。这能看懂啥嘛！实在摸不着头脑，我又生成了一份能够正常 build 的 vuepress-theme-hope blog，并且把 `package.json` 拿来对照。结果发现依赖并无区别，定睛一看，才发现 build command 改了。。。从 `vuepress build src` 改到 `vuepress-vite build src` 了。。。

升级了依赖，还有一些小问题：

- 原来的 Iconfont 因为版权原因(?) 不再内置，因此我的图标全部挂了。于是我换到了文档推荐的 [Fontawesome](https://fontawesome.com/search?o=r&m=free)。给我的一百多篇博文重新挑选图标实在是一件痛苦的事，尤其是 Fontawesome 也没有好到哪里去，图标库大了一点，但是有些基础的商标反而没有，并且不同图标有不同的前缀，只用新图标规则的一个 `iconPrefix` 难以覆盖所有情况，于是很多图标还得手动处理。。。改图标就改了 1h+，人直接乏了。
- frontmatter 里的 sidebar 只接受 bool 值了，原来控制不显示文件夹内其他文件的选项移到了 dir 里。我懒得管了，一个全局替换把 sidebar 项目都删了。
- 现在页面过窄时也会默认显示文章目录，因此删了所有 `[[toc]]`。
- rss 和 pwa 多了更多的可设置项。~~射！~~设！
- 据传编译速度提升了，但我没有感觉，反倒感觉预览速度下降了。
