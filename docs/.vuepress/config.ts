import { defineUserConfig } from 'vuepress'
const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')

export default defineUserConfig({
  lang: 'zh-CN',
  title: '绝对值_x的博客',
  description: '没什么有价值的内容的，真的！',
  theme: defaultTheme({
    logo: '/images/logo.jpg',
    navbar: [
      {
        text: '编程',
        children: [
          // {
          // text: 'Rust',
          // children: ['/coding/Rust/Rust.md'],
          // },
          // {
          // text: 'Python',
          // children: ['/coding/Python/Python.md'],
          // },
          // {
          // text: 'C++',
          // children: ['/coding/Cpp/Cpp.md'],
          // },
          {
            text: '语言',
            children: [
              '/coding/Rust.md',
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
        ],
      },
      {
        text: '杂项',
        children: [
          '/farraginous/my_articles.md',
          '/farraginous/recommend_packages.md',
          '/farraginous/recommend_websites.md',
          '/coding/atri.md',
        ]
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
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
        // '/zh/': {
        //   placeholder: '搜索',
        // },
      },
      maxSuggestions: 10,
    }),
  ],
})