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
- 部署于 _Github Pages_ / _Cloudflare_ / _netlify_ / _vps + nginx_

## 文章

1. [遇到的问题](./withvuepress2.md)
2. [博客日志](./log.md)
3. [博客日程](./todo.md)

## 前言

> 本栏最初写于 20220718，算是对我建站三个半月来的一些总结。（之后持续更新）

建博客时我还是个小白，对 javascript & typescript & css & vue 一窍不通，html 也是菜鸟级，因此在搭建博客过程中遇到了很多麻烦。有些在现在的我看来已经不是问题，但仍有问题悬而未决。

设想建立博客之初，选择工具阶段，有很多博客工具可供选择，如 Hexo, Wordpress, HUGO, docsify 等。后来随着慢慢深入接触也了解了 Vitepress([已尝试](#试图迁移至-vitepress)), mdbook, Gitbook, Docusaurus。但我还是选择 vuepress。个中缘由嘛，vuepress 的简洁是我最欣赏的一个点，因为像我这种意义党并不那么关注美感<span class="heimu" title="你知道的太多了">说实话我对我的审美本身就没什么自信</span>。vuepress 官方也作出了[为什么推荐自己的说明](https://v2.vuepress.vuejs.org/zh/guide/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF)，但对一个萌新而言这些理由~~显然看不懂~~…

然后到了搭建之初阶段，由于 vuepress1.x 仅使用 config.js，而 2.x 改用 ts，这导致了我被网上教程（多为 js 写成）与官方文档的 ts 搞得不明所以<span class="heimu" title="你知道的太多了">官方文档肯定正确，但是官方的说明显然不是面向新手的</span>。

刚开始三个月写得不多。2022 暑假大爆发，写了很多文章，也踩了很多坑。之后一直保持“平常做点记录，偶尔一次大更新”的状态。

再后来经历了[依赖爆炸](#依赖爆炸)，换了主题。

我写博客并在朋友间分享这件事也带动了朋友们写博客——甲朋友[^1]用的 vuepress 默认主题，乙[^2]用的 hexo，丙[^3]直接手搓 bootstrap，丁[^4]和我一样用 VuePress Theme Hope。不知不觉带动了整整四个人写，连我自己都很惊讶。

本人对存储空间敏感，因此博客的图片很少（越后期新增越少），且所有图片均压缩。

[^1]: [dream_oyh 的 blog](https://dream-oyh.github.io/)
[^2]: [Lilic 的博客](https://lilic2233.github.io/)
[^3]: [Perry Kum's Personal Blog](https://perrykum.github.io/)
[^4]: [Sin 的博客](https://bear-sin.github.io/)

## 事迹

### 依赖爆炸

20230712 由于依赖地狱把 node_modules 给崩了，重装、回档也救不回来。并且是在 lockfile 存在的情况下。

## 主题选择

<div class="subtitle">——主题选的好，写文没烦恼</div>

最开始年少无知，用的 Vuepress2 默认主题，非常折磨，[问题列表](./withvuepress2.md)基本都是关于默认主题的问题。

[炸了](#依赖爆炸)之后破罐子破摔，试了下 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 主题，然后发现异常好用。。该主题自带合适的**评论**插件，**搜索增强**插件，[**Markdown 增强**](https://plugin-md-enhance.vuejs.press/zh/) 插件，**死链检测**，应有尽有。如果一开始就用此主题，定然能解决下述大部分的问题。代价是静态体积多了一倍，在我可接受范围内。

如果您专注于博客内容产出，也可以看看更小众的 [Gungnir V2](https://github.com/Renovamen/vuepress-theme-gungnir)。

## external

1. [No CSS Club](https://nocss.club/)
