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
          '/coding/farraginous.md',
          {
            text: '语言',
            children: [
              '/coding/Rust.md',
              '/coding/Cpp.md',
              '/coding/csharp.md',
              '/coding/python.md',
            ]
          },
          {
            text: '工具',
            children: [
              '/coding/github.md',
              '/coding/Git.md',
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
          '/farraginous/college.md',
          '/farraginous/atri.md',
          '/farraginous/reciter.md',
          '/farraginous/log.md',
        ]
      },
      {
        text : '文章',
        link : '/articles/',
      },
      {
        text : '闲聊',
        link : '/gossip/',
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
    sidebar:{
      '/gossip/': [
        {
          text : '闲聊',
          link : '/gossip/',
          children: ['author.md','schedule.md','fuckqq.md','difficulties.md','withvuepress2.md','consider.md','hope.md'],
        },
      ],
      '/articles/': [
        {
          text : '我的文章',
          link : '/articles/',
          children: ['computer_setting.md','vpn.md','Androi_ISA.md','time_record.md','track_record.md'],
        },
      ],
      '/': [
        '../README.md',
        {
          text : '闲聊',
          link : '/gossip/',
          children: ['/gossip/author.md','/gossip/schedule.md','/gossip/fuckqq.md','/gossip/difficulties.md',
          '/gossip/withvuepress2.md','/gossip/consider.md','/gossip/hope.md',],
        },
        {
          text : '我的文章',
          link : '/articles/',
          children: ['/articles/computer_setting.md','/articles/vpn.md','/articles/Androi_ISA.md',
          '/articles/time_record.md','/articles/track_record.md'],
        },
        {
          text : '编程',
          children: ['/coding/farraginous.md','/coding/Rust.md','/coding/Cpp.md','/coding/csharp.md','/coding/python.md',
          '/coding/github.md','/coding/Git.md',],
        },
        {
          text : '爱好',
          children: ['/hobbies/rhythm_games.md','/hobbies/galgame.md','/hobbies/csgo.md','/hobbies/Minecraft.md','/hobbies/books.md',
          '/hobbies/anime.md','/hobbies/other_games.md',],
        },
        {
          text : '杂项',
          children: ['/farraginous/recommend_packages.md','/farraginous/recommend_websites.md','/farraginous/college.md',
          '/farraginous/atri.md','/farraginous/reciter.md','/farraginous/log.md',
        ],
        },
      ],
    },
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