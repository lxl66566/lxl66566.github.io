import { absolutePress, defineSiteConfig } from 'absolute-press';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

import articleSections from './src/.vuepress/data/article';
import type { ArticleSection } from './src/.vuepress/data/article';
import gossipSections from './src/.vuepress/data/gossip';
import learningSections from './src/.vuepress/data/learning';
import { allIcons } from './src/.vuepress/icons';
import { siteScan } from './src/.vuepress/site-data';

const CONTENT_DIR = 'src';

/**
 * 分区板块（我的文章/学习笔记/闲聊）的 navbar 面板条目：与对应 index 页
 * ArticleCell 共用同一数据模块（单一数据源），这里映射为 navbar tweak
 * items——首行总览行（icon 由框架按链接回填 frontmatter 图标），多链接
 * 分区成为二级菜单，单链接分区降为以文章名显示的普通行。数据模块里是
 * 页面相对链接，映射为站点路由（外链原样），构建期由框架校验链接并
 * 追加未覆盖成员。
 */
const toSectionRoute = (dir: string, url: string): string =>
  /^https?:/.test(url) ? url : `/${dir}/${url.replace(/^\.?\//, '')}`;

const toSectionNavItems = (
  dir: string,
  overview: string,
  sections: ArticleSection[],
) => [
  { text: overview, link: `/${dir}/`, index: true },
  ...sections.map(section => {
    const links = section.links.map(link => ({
      text: link.text,
      link: toSectionRoute(dir, link.url),
    }));
    // 单文章分区直接显示文章名（分区名只留在 index 页的分区框上）。
    return links.length === 1
      ? { text: links[0]!.text, link: links[0]!.link }
      : { text: section.field, children: links };
  }),
];

const articleNavItems = toSectionNavItems(
  'articles',
  '我的文章',
  articleSections,
);
const learningNavItems = toSectionNavItems(
  'learning',
  '学习笔记',
  learningSections,
);
const gossipNavItems = toSectionNavItems('gossip', '闲聊', gossipSections);

const siteConfig = defineSiteConfig({
  contentDir: CONTENT_DIR,
  // Term-reference articles behind the inline `[[id]]` popover syntax: a
  // separately maintained nested repo at src/reference (recorded as a
  // gitlink; CI clones it before building).
  refs: 'reference',
  title: '绝对值_x 的博客',
  description: '没什么有价值的内容的，真的！',
  hostname: 'https://absx.pages.dev',
  lang: 'zh-CN',
  // Frontmatter icons: the full FA free registry from
  // src/.vuepress/icons.ts; the framework validates content keys against it
  // and subsets the per-page payload.
  icons: allIcons(),
  // Site-wide data for islands (homepage taxonomy + project desc HTML),
  // served via virtual:absolute-press/site-data.
  onScan: siteScan,
  // Large share card (og:image + twitter:card summary_large_image); the
  // same legacy avatar doubles as the site-wide share image.
  seo: {
    image: '/logo.jpg',
    author: { name: 'lxl66566', url: 'https://github.com/lxl66566' },
    // /hide/ 是不列出的目录：不进 sitemap，robots 追加 Disallow
    exclude: ['/hide'],
  },
  favicon: '/favicon.ico',
  // Navbar options in the framework's single nav section.
  nav: {
    // Legacy anime avatar (src/.vuepress/public/logo.jpg) as the navbar /
    // drawer brand image (老站 navbar 左侧即此头像).
    logo: '/logo.jpg',
    // Navbar wording decoupled from directory names + dropdown group layout,
    // mirroring the old navbar.ts (L3 杂项/爱好, M2 分组与顺序). Item paths
    // are extension-less and relative to their top-level directory;
    // uncaptioned groups only fix the member order.
    tweaks: {
      farraginous: {
        label: '杂项',
        groups: [
          // 老站顺序: 软件汇总/网址汇总/校内专栏/背词器
          {
            items: [
              'recommend_packages',
              'recommend_websites',
              'college',
              'reciter',
            ],
          },
        ],
      },
      hobbies: {
        label: '爱好',
        // Single uncaptioned group: no section headers, folders first via the
        // framework's panel slimming (site UX rule: 爱好下拉不分区域).
        groups: [
          {
            items: [
              'galgame',
              'rhythm_games',
              'other_games',
              'books',
              'anime',
              'art',
              'NSFW',
              'snack',
            ],
          },
        ],
      },
      // Curated panels: each section tree comes from the same data module its
      // index-page masonry renders (single source; see toSectionNavItems).
      articles: { items: articleNavItems },
      learning: { items: learningNavItems },
      gossip: { items: gossipNavItems },
      // 时间轴 top-level dir label (the generated panel needs no groups;
      // unlisted in `order`, so the entry appends after 博客).
      timeline: { label: '时间轴' },
    },
    // Top-level navbar order mirrors the old navbar.ts entries:
    // 编程 爱好 杂项 文章 学习 闲聊 随笔 博客.
    order: [
      'coding',
      'hobbies',
      'farraginous',
      'articles',
      'learning',
      'gossip',
      'essay',
      'blog',
    ],
    // The old navbar centered its entries between the brand and the icon rail.
    align: 'center',
    // Navbar social icons (old navbarLayout: Repo / TelegramLink / RSSLink);
    // both resolve to the framework's built-in brand glyphs.
    social: [
      { icon: 'github', url: 'https://github.com/lxl66566', title: 'GitHub' },
      { icon: 'telegram', url: 'https://t.me/ab5_x', title: 'Telegram' },
    ],
    // hide/ stays published but out of the auto-generated navigation.
    exclude: ['/hide'],
  },
  // The homepage is a designed landing (profile rail + prose + projects);
  // the framework's paginated article feed would render above the body.
  home: { feed: false },
  // Footer credit (left side, desktop footer + mobile drawer); the theme
  // renders the fixed "Powered by absolute-press" attribution on the right.
  footer: { credit: '© 2022-2026 lxl66566' },
  algolia: {
    appId: 'UMGMTUUIFU',
    apiKey: '6e1820d0f954590466468855790a2440',
    indexName: 'algolia',
  },
  giscus: {
    repo: 'lxl66566/lxl66566.github.io',
    repoId: 'R_kgDOHRyDvA',
    category: 'General',
    categoryId: 'DIC_kwDOHRyDvM4CQSP1',
  },
  googleAnalytics: 'G-MKRDBH1ZP1',
  // Related-articles graph: include two-hop (indirectly linked) articles.
  // The dense cross-linking here overflows the framework defaults
  // (60 nodes / 240 edges), so the caps are raised to fit the natural
  // depth-2 distribution (max ~138 nodes / ~362 edges).
  // Hub fallback: pages whose graph exceeds twoHopNodeLimit nodes
  // render as the one-hop star instead, keeping the canvas labels
  // readable — only small two-hop neighborhoods draw both hops. A star
  // larger than the limit (blog/log links the whole site directly) keeps
  // only its strongest limit-1 members, so 24 is the rendered-node
  // ceiling of every related graph on this site.
  related: {
    depth: 2,
    maxNodes: 160,
    maxEdges: 512,
    twoHopNodeLimit: 24,
  },
  // Client-side password gates carried over from the old theme config.
  // The vpn article moved to articles/proxy/ on the old site; its gate
  // entry still pointed at the dead /articles/vpn.html route.
  encrypt: [
    {
      match: '/articles/proxy/vpn',
      passwords: ['2003'],
      hint: '作者生年',
    },
    { match: '/articles/telegram', passwords: ['2003'], hint: '作者生年' },
    { match: '/gossip/wish', passwords: ['2003'], hint: '作者生年' },
    { match: '/gossip/job', passwords: ['2003'], hint: '作者生年' },
    { match: '/hide/memories', passwords: ['2003'], hint: '作者生年' },
    {
      match: '/hobbies/NSFW/videos',
      passwords: ['0721'],
      hint: '返回上一页查看提示',
    },
    {
      match: '/hobbies/NSFW/comic',
      passwords: ['0721'],
      hint: '返回上一页查看提示',
    },
    {
      match: '/hobbies/NSFW/bangumi',
      passwords: ['0721'],
      hint: '返回上一页查看提示',
    },
  ],
  // Site islands translated from the legacy .vue components
  // (src/.vuepress/components). PascalCase tag -> module path relative to
  // the project root; see docs/conversion-spec.md for the
  // markdown-side migration rules.
  islands: {
    // Homepage profile rail (avatar / stats / categories+tags), see
    // islands/HomeProfile.tsx.
    HomeProfile: 'islands/HomeProfile.tsx',
    // Homepage project shelf (featured cards + foldable group rows), see
    // islands/HomeProjects.tsx.
    HomeProjects: 'islands/HomeProjects.tsx',
    // Site-wide archive on /timeline/ (year-grouped article list), see
    // islands/Timeline.tsx.
    Timeline: 'islands/Timeline.tsx',
    Dated: 'islands/Dated.tsx',
    TelegramLink: 'islands/TelegramLink.tsx',
    RSSLink: 'islands/RSSLink.tsx',
    Reciter: 'islands/Reciter.tsx',
    ArticleCell: 'islands/ArticleCell.tsx',
    GalExhibitionGrid: 'islands/GalExhibitionGrid.tsx',
    AvTable: 'islands/AvTable.tsx',
    ComicTable: 'islands/ComicTable.tsx',
    // Data-backed xlist tables (TS data + @@@ slot bodies, see
    // islands/xlist/). They replace the framework's ExpandableList on the
    // migrated list pages.
    GalList: 'islands/xlist/GalList.tsx',
    BookList: 'islands/xlist/BookList.tsx',
    AnimeList: 'islands/xlist/AnimeList.tsx',
    JobList: 'islands/xlist/JobList.tsx',
    CryptoList: 'islands/xlist/CryptoList.tsx',
    SpeedupList: 'islands/xlist/SpeedupList.tsx',
  },
  // Those islands' children markdown runs through the framework's `@@@`
  // entry-list pipeline: the build renders the static table skeleton
  // (title + slot bodies) that the islands parse and enhance client-side.
  entryListIslands: [
    'GalList',
    'BookList',
    'AnimeList',
    'JobList',
    'CryptoList',
    'SpeedupList',
  ],
});

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  // Legacy vuepress public assets (images/charts/favicon/logo) stay in place.
  publicDir: 'src/.vuepress/public',
  plugins: [UnoCSS(), solidPlugin(), absolutePress(siteConfig)],
  server: {
    port: 8080,
  },
});
