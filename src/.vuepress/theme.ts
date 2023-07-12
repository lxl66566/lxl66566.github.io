import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  pure: true,
  hostname: "https://mister-hope.github.io",
  // iconAssets: "fontawesome-with-brands",
  logo: "/logo.jpg",
  repo: "https://github.com/lxl66566",
  docsDir: "src",
  navbar,
  sidebar,
  editLink: false,
  encrypt: {
    config: {
      "/articles/vpn.html": ["2003"],
      "/hide/videos.html": ["2003"],
      "/gossip/wish.html": ["2003"],
    },
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
      // attrs: true,
      imgLazyload: true,
      figure: true,
      mathjax: true,
      mark: true,
      footnote: true,
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
      tabs: true,
    },
  },
});
