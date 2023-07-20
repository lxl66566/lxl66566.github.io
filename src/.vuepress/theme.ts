import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  pure: true,
  hostname: "https://mister-hope.github.io",
  iconAssets: "iconfont",
  logo: "/logo.jpg",
  repo: "https://github.com/lxl66566/lxl66566.github.io",
  docsDir: "src",
  navbar,
  sidebar,
  editLink: false,
  contributors: false,
  encrypt: {
    config: {
      "/articles/vpn.html": ["2003"],
      "/hide/videos.html": ["2003"],
      "/gossip/wish.html": ["2003"],
    },
  },
  blog: {
    name: "绝对值_x",
    intro: "/gossip/author.html",
    medias: {
      GitHub: "https://github.com/lxl66566",
      Telegram: "https://t.me/ab5_x",
      Bilibili: "https://space.bilibili.com/346365047",
    },
    articlePerPage: 1,
    articleInfo: ["Date", "Category", "PageView", "Tag", "ReadingTime"],
  },
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Repo", "TelegramLink", "Outlook", "Search"],
  },
  plugins: {
    blog: true,
    comment: {
      provider: "Giscus",
      repo: "lxl66566/lxl66566.github.io",
      repoId: "R_kgDOHRyDvA",
      category: "General",
      categoryId: "DIC_kwDOHRyDvM4CQSP1",
      mapping: "pathname",
      lightTheme: "light",
      darkTheme: "transparent_dark",
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      codetabs: true,
      // attrs: true,
      imgLazyload: true,
      figure: true,
      mathjax: true,
      mark: true,
      footnote: true,
      tabs: true,
      tasklist: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
    },
  },
});
