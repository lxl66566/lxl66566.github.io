---
date: 2026-10-08
icon: solid/circle-check
category:
  - 博客
  - 教程
  - 经历
---

# 迁移 absolute-press

2022 年以来，我[一直在被 vuepress 坑](./withvuepress2.md)，然而由于博客已经达到了相当大的体量，迁移成本非常高，我一度以为本博客要永久埋葬在 vuepress 里了。但是 2026 年 AI/agnet 光速发展，从前被认为是不可能的迁移，现在也看到了新的希望。

2026 国庆假期，我的其他项目进展也差不多了，token 放着也是浪费，于是就开始了新博客框架的编写。

## 设计

泛前端项目的一些约束，比如 ts full typing、禁 any 和 as unknown as、工具链就不多说了。直接基于 [my-solid-template](https://github.com/lxl66566/my-solid-template) 开搞即可。

首先，先让 AI 把我的 blog review 一遍，总结出到底用了哪些 vuepress-theme-hope 的特性和迁移时注意的点，方便我和 AI 测试。

然后我大概定了几个规矩：

1. 性能第一。
   - 这几年把 React、Vue、SolidJS（甚至还有 svetle）等几个前端框架都尝试了一遍，最终结论是 vue 的表达能力太差，我不想再写 vue 组件了。同时我非常重视性能，SolidJS 的性能在各个前端框架里绝对是碾压级别的（甚至比 lit 还能打），并且我认同 SolidJS 理念、自己也写了几个 SolidJS 小玩具，因此就决定基于 SolidJS 开发框架。
     - 我以前写的一堆 vue 组件也全部迁移到 SolidJS。
   - 我倾向于 Rust 工具链，所以选了 rolldown。后面想起来 vite v8 默认就用的 rolldown，于是直接升级到 vite v8。
2. 在性能基础上提了一些 SEO 要求，然后 AI 就帮我选了 Astro 那种 island 和 MPA 架构。本来我以为会回到 [MDX 的老路](../coding/mdx.md)，现在有了（看起来）更好的解法，那还是先试试吧。
3. 尽可能降低迁移成本。
   - 我自己的博客里最有价值的是 markdown 文档，这些变更我肯定都要看一遍。如果迁移改了太多东西，不好 review。因此新的博客框架也是走 markdown-it 渲染 + shiki 代码高亮 + katex 渲染公式那一套，保证兼容老 vuepress-theme-hope 的各种语法，比如 `::: code-tabs` `::: details` 等容器。
   - algolia 搜索、gisgus 评论区等都重新实现一份，不能丢。

## 编写

实施就全部交给 AI，让它指挥 subagnet 去重写、写完做视觉验证、然后把我的 blog 。由于 AI 读了很多 vuepress-theme-hope 源码，所以写出来的东西真的很有 vuepress 内味儿。

当然目前我用的 AI 只能做到「写出来」，没法做到「写得好看」。所以之后还需要非常多的反馈迭代；同时也必须要用其他模型对框架代码进行二次 review。

## 开发过程中的踩坑

- vite...
- cloudflare 308...
