import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);
const temp = defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "绝对值_x 的博客",
  description: "没什么有价值的内容的，真的！",
  head: [
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-MKRDBH1ZP1",
      },
    ],
    [
      "script",
      {},
      `<!-- Google tag (gtag.js) -->
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-MKRDBH1ZP1');`,
    ],
  ],
  theme,
  shouldPrefetch: false,
});

// 用于生成组件的别名，以便于直接在 .md 文件中使用组件
const generateComponentsAlias = (list: string[]) => {
  const temp = {};
  list.forEach((item) => {
    temp[`@${item}`] = path.resolve(__dirname, "components", item + ".vue");
  });
  return temp;
};
// 用于生成数据的别名，以便于直接在 .md 文件中使用数据
const generateDataAlias = (list: string[]) => {
  const temp = {};
  list.forEach((item) => {
    temp[`@@${item}`] = path.resolve(__dirname, "data", item + ".ts");
  });
  return temp;
};
temp.alias = {
  ...generateComponentsAlias(["AvTable", "ComicTable", "GalExhibitionGrid", "Av", "reciter", "ArticleCell", "GalList", "AnimeList", "JobList", "SpeedupList"]),
  ...generateDataAlias(["article", "gossip", "learning", "job_list"]),
};
export default temp;
