import { defineUserConfig } from 'vuepress'
const { defaultTheme } = require('@vuepress/theme-default')
const { searchPlugin } = require('@vuepress/plugin-search')

export default defineUserConfig({
  lang: 'zh-CN',
  title: '绝对值_x的博客',
  description: '没什么有价值的内容的，真的！',
  theme: defaultTheme({
    logo: '/image/logo.jpg',
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
          '/coding/Rust.md',
          '/coding/Python.md',
          '/coding/Cpp.md'
        ],
      },
      {
        text : '闲聊',
        link : '/gossip.md',
        // children: [
        //   '/gossip.md'
        // ]
      }
      // '/bar/README.md',
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