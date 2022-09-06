const { defineUserConfig } = require("@vuepress/cli");
const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')
const { prismjsPlugin } = require('@vuepress/plugin-prismjs')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { path } = require('@vuepress/utils')
const { commentPlugin } = require("vuepress-plugin-comment2");
const { commentTheme } = require("./theme");

export default defineUserConfig({
  lang: 'zh-CN',
  base: '/',
  title: '绝对值_x的博客',
  description: '没什么有价值的内容的，真的！',
  head:[
    ['link', { rel: 'stylesheet', href: '/styles/head.css' }]
  ],
  theme: commentTheme({
    logo: 'https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/logo.jpg',
    // logo: 'https://s2.loli.net/2022/08/03/DCPGWEa6dyoLK1t.jpg',
    navbar: [
      {
        text: '编程',
        children: [
          {
            text: '语言',
            children: [
              '/coding/Rust.md',
              '/coding/Cpp.md',
            ]
          },
          {
            text: '工具',
            children: [
              '/coding/github.md',
              '/coding/Git.md',
              '/coding/othertools.md',
          ]
          },
        ],
      },
      {
        text: '爱好',
        children: [
          {
            text: '游戏',
            children: [
              '/hobbies/rhythm_games.md',
              '/hobbies/galgame.md',
              '/hobbies/csgo.md',
              '/hobbies/Minecraft.md',
              '/hobbies/other_games.md',
            ]
          },
          {
            text: '其他',
            children: [
              '/hobbies/books.md',
              '/hobbies/anime.md',
            ]
          }
        ]
      },
      {
        text: '杂项',
        children: [
          '/farraginous/recommend_packages.md',
          '/farraginous/recommend_websites.md',
          '/farraginous/atri.md',
          '/farraginous/log.md',
          '/farraginous/reciter.md',
        ]
      },
      {
        text : '文章',
        link : '/my_articles.md',
      },
      {
        text : '闲聊',
        link : '/gossip.md',
      },
      {
        text : '随笔',
        link : '/essay.md',
      },
    ],
    repo: 'https://github.com/lxl66566',
    repoLabel : 'MyGitHub',
    editLink: false,
    contributors: false,
    tip: '提示',
    warning: '注意',
    danger: '警告',
    // sidebar:{
    //   '/docs/': 'auto',
    //   '/docs/test/': [
    //     {
    //       text: '关于作者',
    //       children: ['/test/test.md', '/test/gossip.md'],
    //     },
    //   ],
    // },
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
      maxSuggestions: 10,
      isSearchable: (page) => page.path !== '/hide/videos.html',
    }),
    prismjsPlugin({
      preloadLanguages:['markdown', 'jsdoc', 'yaml',
        'rust', 'cpp', 'git','bash','batch']
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    }),
    commentPlugin({
      provider: "Giscus",
      repo: "lxl66566/lxl66566.github.io",
      repoId: "R_kgDOHRyDvA",
      category: "Announcements",
      categoryId: "DIC_kwDOHRyDvM4CQSP0",
      mapping: 'pathname',
    }),
  ],
  extendsMarkdown: md => {
    md.use(require('markdown-it-mathjax3'))
    md.linkify.set({ fuzzyEmail: false })
  },
})