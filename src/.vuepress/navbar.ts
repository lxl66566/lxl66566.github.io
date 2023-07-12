import { navbar } from "vuepress-theme-hope";
function add_prefix(prefix: string, list: string[]): string[] {
  return list.map((item) => prefix + item);
}
export default navbar([
  {
    text: "编程",
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
]);
