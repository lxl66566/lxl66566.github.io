import { defineUserConfig } from 'vuepress'
const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')
const { prismjsPlugin } = require('@vuepress/plugin-prismjs')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { path } = require('@vuepress/utils')

export default defineUserConfig({
  lang: 'zh-CN',
  base: '/',
  title: '绝对值_x的博客',
  description: '没什么有价值的内容的，真的！',
  theme: defaultTheme({
    logo: '/images/logo.jpg',
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
              '/coding/Git.md',
              '/coding/othertools.md',
          ]
          },
        ],
      },
      {
        text: '游戏',
        children: [
          '/games/csgo_settings.md',
          '/games/Minecraft.md',
          '/games/rhythm_games.md',
          '/games/galgame.md',
        ],
      },
      {
        text: '杂项',
        children: [
          '/farraginous/recommend_packages.md',
          '/farraginous/recommend_websites.md',
          '/farraginous/books.md',
          '/farraginous/atri.md',
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
    }),
    prismjsPlugin({
      preloadLanguages:['markdown', 'jsdoc', 'yaml',
        'rust', 'cpp', 'git','bash','batch']
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    }),
  ],
})