import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { cut } from "nodejs-jieba";

const passwords = {
  general: {
    password: "2003",
    hint: "作者生年",
  },
  h: {
    password: "0721",
    hint: "返回上一页查看提示",
  },
};

export default hopeTheme({
  pure: true,
  hostname: "https://absx.pages.dev",
  logo: "/logo.jpg",
  repo: "https://github.com/lxl66566/lxl66566.github.io",
  docsDir: "src",
  navbar,
  sidebar,
  editLink: false,
  contributors: false,
  breadcrumb: true,

  markdown: {
    align: true,
    alert: true,
    codeTabs: true,
    // attrs: true,
    imgLazyload: true,
    imgSize: true,
    imgMark: true,
    figure: true,
    math: {
      type: "katex",
      copy: true,
      displayMode: true,
    },
    include: true,
    spoiler: true, // https://theme-hope.vuejs.press/zh/guide/markdown/stylize/spoiler.html
    hint: true,
    mark: true,
    footnote: true,
    tabs: true,
    tasklist: true,
    mermaid: true,
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
          return undefined;
        },
      },
    ],
  },
  encrypt: {
    config: {
      "/articles/vpn.html": passwords.general,
      "/gossip/wish.html": passwords.general,
      "/hobbies/NSFW/videos.html": passwords.h,
      "/hobbies/NSFW/comic.html": passwords.h,
      "/hobbies/NSFW/bangumi.html": passwords.h,
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
    articlePerPage: 3,
    articleInfo: ["Date", "Category", "PageView", "Tag", "ReadingTime"],
  },
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Repo", "TelegramLink", "RSSLink", "Outlook", "Search"],
  },
  plugins: {
    activeHeaderLinks: false, // 禁用滚动自动更新 url anchor，以支持 #:~:text=xxx 的链接格式
    blog: {
      excerptLength: 1,
    },
    slimsearch: {
      indexContent: true,
      suggestion: true,
      searchDelay: 500,
      indexOptions: {
        // 使用 nodejs-jieba 进行分词
        tokenize: (text, fieldName) => (fieldName === "id" ? [text] : cut(text, true)),
      },
    },
    photoSwipe: true,
    icon: {
      assets: "fontawesome-with-brands",
      prefix: "fas fa-",
    },
    // searchPro: {
    //   indexContent: true,
    //   autoSuggestions: true,
    // },
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
    feed: {
      rss: true,
      count: 20,
    },
    seo: true,
  },
});
