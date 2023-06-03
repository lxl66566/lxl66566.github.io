const { defineUserConfig } = require("@vuepress/cli");
const { searchPlugin } = require("@vuepress/plugin-search");
const { prismjsPlugin } = require("@vuepress/plugin-prismjs");
const {
  registerComponentsPlugin,
} = require("@vuepress/plugin-register-components");
const { path } = require("@vuepress/utils");
const { commentPlugin } = require("vuepress-plugin-comment2");
const { commentTheme } = require("./theme");
// const { pangu } = require("vuepress-plugin-pangu");
// require('vuepress-plugin-pangu');
// const panguPlugin = require('markdown-it-pangu')

function add_prefix(prefix: string, list: string[]): string[] {
  return list.map((item) => prefix + item);
}
export default defineUserConfig({
  lang: "zh-CN",
  base: "/",
  build: { chunkSizeWarningLimit: 3000 },
  title: "绝对值_x的博客",
  description: "没什么有价值的内容的，真的！",
  head: [
    ["link", { rel: "stylesheet", href: "/styles/head.css" }],
    [
      "script",
      {
        src: "/styles/pangu.min.js",
      },
    ],
  ],
  theme: commentTheme({
    logo: "https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/logo.jpg",
    navbar: [
      {
        text: "编程",
        // children: [
        //   {
        //     text: "语言",
        //     children: add_prefix("/coding/",["Rust.md","Cpp.md","csharp.md","python.md","java.md",])
        //   },
        //   {
        //     text: "工具",
        //     children: ["/coding/github.md", "/coding/Git.md", {text:"Vim",link:"/coding/vim.md"},],
        //   },
        // ],
        link: "/coding/",
      },
      {
        text: "爱好",
        children: [
          {
            text: "游戏",
            children: add_prefix("/hobbies/", [
              "rhythm_games.md",
              "galgame.md",
              "Minecraft.md",
              "other_games/",
            ]),
          },
          {
            text: "其他",
            children: add_prefix("/hobbies/", ["books.md", "anime.md"]),
          },
        ],
      },
      {
        text: "杂项",
        children: add_prefix("/farraginous/", [
          "recommend_packages.md",
          "recommend_websites.md",
          "college.md",
          "atri.md",
          "reciter.md",
          "learning/",
          "log.md",
        ]),
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
    ],
    repo: "https://github.com/lxl66566",
    repoLabel: "MyGitHub",
    editLink: false,
    contributors: false,
    tip: "提示",
    warning: "注意",
    danger: "警告",
    sidebar: {
      "/gossip/": [
        {
          text: "闲聊",
          link: "/gossip/",
          children: [
            "author.md",
            "schedule.md",
            "fuckxxx.md",
            "difficulties.md",
            "withvuepress2.md",
            "consider.md",
            "hope.md",
            "compare_home_to_college.md",
          ],
        },
      ],
      "/articles/": [
        {
          text: "我的文章",
          link: "/articles/",
          children: [
            "worldview.md",
            "computer_setting.md",
            "mobile_setting.md",
            "Android_ISA.md",
            "time_record.md",
            "track_record.md",
            "telegram.md",
            "adb.md",
            "markdown.md",
            "minimize_exe.md",
            "cli_compress.md",
            "vps.md",
          ],
        },
      ],
      "/coding/": [
        {
          text: "语言",
          children: [
            "Rust.md",
            "Cpp.md",
            "python.md",
            "java.md",
            "tsjs.md",
            "csharp.md",
            "kotlin",
          ],
        },
        {
          text: "工具",
          children: [
            "github.md",
            "Git.md",
            "linux.md",
            { text: "Vim", link: "/coding/vim.md" },
            "sql.md",
          ],
        },
        {
          text: "其他",
          children: ["algorithm.md"],
        },
      ],
      "/farraginous/learning/": [
        {
          text: "学习笔记",
          link: "/farraginous/learning/",
          children: [
            "physics.md",
            "complex_functions.md",
            "circuit_analysis.md",
            "analog_circuit.md",
            "signals_and_systems.md",
            "Probab.Math.Stat.md",
            "foods.md",
          ],
        },
      ],
      "/hobbies/other_games/": [
        {
          text: "其他游戏",
          link: "/hobbies/other_games/",
          children: [
            "arknights.md",
            "csgo.md",
            "uno.md",
            "rec_college.md",
            "rec_hometown.md",
          ],
        },
      ],
      "/": [
        "../README.md",
        {
          text: "闲聊",
          link: "/gossip/",
          children: add_prefix("/gossip/", [
            "author.md",
            "schedule.md",
            "fuckxxx.md",
            "difficulties.md",
            "withvuepress2.md",
            "consider.md",
            "hope.md",
            "compare_home_to_college.md",
          ]),
        },
        {
          text: "我的文章",
          link: "/articles/",
          children: add_prefix("/articles/", [
            "worldview.md",
            "computer_setting.md",
            "mobile_setting.md",
            "Android_ISA.md",
            "time_record.md",
            "track_record.md",
            "telegram.md",
            "adb.md",
            "markdown.md",
            "minimize_exe.md",
            "cli_compress.md",
            "vps.md",
          ]),
        },
        {
          text: "杂项",
          children: add_prefix("/farraginous/", [
            "recommend_packages.md",
            "recommend_websites.md",
            "college.md",
            "atri.md",
            "reciter.md",
            "learning/",
            "log.md",
          ]),
        },
        {
          text: "编程",
          children: add_prefix("/coding/", [
            "Rust.md",
            "Cpp.md",
            "python.md",
            "github.md",
            "Git.md",
            "vim.md",
            "java.md",
            "tsjs.md",
            "linux.md",
            "csharp.md",
            "kotlin.md",
            "sql.md",
          ]),
        },
        {
          text: "爱好",
          children: add_prefix("/hobbies/", [
            "rhythm_games.md",
            "galgame.md",
            "Minecraft.md",
            "books.md",
            "anime.md",
            "other_games/",
          ]),
        },
      ],
    },
  }),
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
      maxSuggestions: 10,
      isSearchable: (page) => {
        const bannedlist = ["videos", "wish", "vpn"].map((item) =>
          item.concat(".html")
        );
        return !bannedlist.some((item) => String(page.path).endsWith(item));
      },
    }),
    prismjsPlugin({
      preloadLanguages: [
        "markdown",
        "jsdoc",
        "yaml",
        "rust",
        "cpp",
        "git",
        "bash",
        "batch",
      ],
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    commentPlugin({
      provider: "Giscus",
      repo: "lxl66566/lxl66566.github.io",
      repoId: "R_kgDOHRyDvA",
      category: "General",
      categoryId: "DIC_kwDOHRyDvM4CQSP1",
      mapping: "pathname",
      light: "light",
      darkTheme: "transparent_dark",
    }),
  ],
  extendsMarkdown: (md) => {
    md.use(require("markdown-it-mathjax3"));
    md.linkify.set({ fuzzyEmail: false });
  },
});
