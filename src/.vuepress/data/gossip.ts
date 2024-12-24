import type { ArticleCellBoxType } from "../definition/types.js";

const links: ArticleCellBoxType[] = [
  {
    field: "世界观",
    links: [
      { text: "道论", url: "worldview" },
      { text: "杂论", url: "va_view" },
    ],
  },
  {
    field: "关于我",
    links: [
      { text: "关于作者", url: "author" },
      { text: "作者的日程库", url: "schedule" },
    ],
  },
  {
    field: "我的思考",
    links: [
      { text: "社会愿望（加密）", url: "wish" },
      { text: "fuckxxx", url: "fuckxxx" },
      { text: "如何看待 xxx？一些锐评与想法", url: "consider" },
      { text: "对 xxx 的希望", url: "hope" },
      { text: "脑洞", url: "brainhole" },
    ],
  },
  {
    field: "我的遭遇",
    links: [
      { text: "生活中遇到的困难", url: "difficulties" },
      {
        text: "家与学校生活环境对比（我为什么不愿意回家）",
        url: "compare_home_to_college",
      },
      { text: "找工作经历", url: "interview" },
    ],
  },
  {
    field: "我的心情",
    links: [
      { text: "绷不住了", url: "memes" },
      { text: "神评", url: "forward" },
      { text: "鸡汤", url: "chicken_soup" },
      { text: "「零化（Zero Fill）」", url: "zero_fill" },
    ],
  },
];

export default links;
