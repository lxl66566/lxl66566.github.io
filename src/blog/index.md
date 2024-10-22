---
date: 2023-10-13
category:
  - 导航
  - 博客
---

# 关于博客

## 基本信息

- 使用 [VuePress2](https://v2.vuepress.vuejs.org/zh/) 搭建，[VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 主题，`pure: true`
- [项目地址](https://github.com/lxl66566/lxl66566.github.io)，Markdown 源码位于 branch code。
- 您可以下载源码并在本地预览（dep: `node`, `pnpm`, `git`）：
  ```sh {1}
  git clone git@github.com:lxl66566/lxl66566.github.io.git -b code
  cd lxl66566.github.io
  pnpm i
  pnpm dev
  ```
- 部署于 _Github Pages_ / _Cloudflare_ / _netlify_ / _vps + 反代_

## 文章

1. [**遇到的问题**](./withvuepress2.md)
2. [**博客日志**](./log.md)
3. [**博客日程**](./todo.md)

## 前言

> 本栏最初写于 20220718，算是对我建站三个半月来的一些总结。（之后持续更新）

建博客时我还是个小白，对前端与框架一窍不通，因此在搭建博客过程中遇到了很多麻烦。有些在现在的我看来已经不是问题，但仍有问题悬而未决。

设想阶段，有[很多博客工具可供选择](#工具选择)，我最终选择了 vuepress。个中缘由嘛…

1. ~~根本没了解多少博客工具啊！~~
2. （原版）vuepress 的简洁和自定义程度是我较为欣赏的一个点，因为我并不那么关注美感<span class="heimu" title="你知道的太多了">说实话我对我的审美本身就没什么自信</span>。
   - vuepress 官方也作出了[为什么推荐自己的说明](https://v2.vuepress.vuejs.org/zh/guide/introduction.html#为什么不是)，但对一个萌新而言这些理由~~显然看不懂~~…

刚开始三个月写得不多。2022 暑假大爆发，写了很多文章，也踩了很多坑。之后一直保持“平常做点记录，偶尔一次大更新”的状态。再后来 20230712 经历了依赖爆炸，于是换了主题。

本人对存储空间敏感，因此博客的图片很少（越后期新增越少），且所有图片均压缩。

## 友链

我写博客并在朋友间分享这件事也带动了朋友们写博客——

- 甲朋友[^1]用的 vuepress 默认主题
- 乙[^2]和戊[^5]用的 hexo
- 丙[^3]直接手搓 bootstrap
- 丁[^4]和我一样用 VuePress Theme Hope

不知不觉直接或间接地带动了这么多人写，连我自己都觉得惊讶。

[^1]: [dream_oyh 的 blog](https://dream-oyh.github.io/)
[^2]: [Lilic 的博客](https://lilic2233.github.io/)
[^3]: [Perry Kum's Personal Blog](https://perrykum.github.io/)
[^4]: [Sin 的博客](https://bear-sin.github.io/)
[^5]: [Lry722 的博客](Lry722.github.io)

## 工具选择

1. 静态博客，排除 Wordpress
2. 需要足够的自定义化（手搓组件的那种），排除 mdbook & Gitbook
   - 目前自定义化一般就 vue 组件和 [MDX](../coding/mdx.md) <heimu>暂先排除 svetlepress（</heimu>，后者我只能说是真的难用。。
3. 一些个人喜好，排除 docsify, Docusaurus
4. 尝试过迁移 Vitepress [失败](./withvuepress2.md#试图迁移至-vitepress)
5. 还有一些等于自己写前端的
   - nextra & Rspress[^6]：通过 [mdx](../coding/mdx.md) 加扩展性，上手更难
   - lume & zola：Single binary
     - zola 用的[类似 django 的语法](https://www.getzola.org/documentation/getting-started/overview/)

[^6]: Rspress 我尝试过一段时间，我的评价是。。[1](https://t.me/withabsolutex/1501) [2](https://t.me/withabsolutex/1526)

那还剩下：

- Hexo & HUGO：最广泛使用的博客工具

## 主题选择

<div class="subtitle">——主题选的好，写文没烦恼</div>

最开始年少无知，用的 Vuepress2 默认主题，非常折磨，[问题列表](./withvuepress2.md)基本都是关于默认主题的问题。

依赖炸了之后破罐子破摔，试了下 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 主题，然后发现异常好用。。该主题自带合适的**评论**插件，**搜索增强**插件，[**Markdown 增强**](https://plugin-md-enhance.vuejs.press/zh/) 插件，**死链检测**，应有尽有。如果一开始就用此主题，定然能解决下述大部分的问题。代价是静态体积多了一倍，在我可接受范围内。

如果您专注于博客内容产出，也可以看看更小众的 [Gungnir V2](https://github.com/Renovamen/vuepress-theme-gungnir)。

## external

1. [No CSS Club](https://nocss.club/)
