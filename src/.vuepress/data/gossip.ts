/**
 * 「闲聊」分区唯一数据源：/gossip/ 页 ArticleCell 分区与 navbar「闲聊」
 * 下拉分区都从这里派生（约定同 data/article.ts）。url 是相对 /gossip/
 * 的页面链接。
 */
import type { ArticleSection } from './article';

const sections: ArticleSection[] = [
  {
    field: '关于我',
    links: [
      { text: '关于作者', url: './author.html' },
      { text: '作者的日程库', url: './schedule.html' },
    ],
  },
  {
    field: '核心观点',
    links: [
      { text: '道论', url: './worldview.html' },
      { text: '杂论', url: './va_view.html' },
    ],
  },
  {
    field: '我的思考',
    links: [
      { text: '社会愿望（加密）', url: './wish.html' },
      { text: 'fuckxxx', url: './fuckxxx.html' },
      { text: '如何看待 xxx？一些锐评与想法', url: './consider.html' },
      { text: '对 xxx 的希望', url: './hope.html' },
      { text: '脑洞', url: './brainhole.html' },
    ],
  },
  {
    field: '我的遭遇',
    links: [
      { text: '装机', url: './pc_hardware.html' },
      { text: '生活中遇到的困难', url: './difficulties.html' },
      {
        text: '家与学校生活环境对比（我为什么不愿意回家）',
        url: './compare_home_to_college.html',
      },
      { text: '找工作经历', url: './job.html' },
      { text: '各种尝鲜体验', url: './userexp.html' },
      { text: 'HTTPS retry 测试', url: './http_retry.html' },
    ],
  },
  {
    field: '我的心情',
    links: [
      { text: '绷不住了', url: './memes.html' },
      { text: '神评', url: './forward.html' },
      { text: '鸡汤', url: './chicken_soup.html' },
      { text: '「零化（Zero Fill）」', url: './zero_fill.html' },
    ],
  },
];

export default sections;
