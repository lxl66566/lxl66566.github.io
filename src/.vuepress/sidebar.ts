import { sidebar } from "vuepress-theme-hope";
export default sidebar({
  "/gossip/": [
    {
      text: "闲聊",
      link: "/gossip/",
      children: [
        "author.md",
        "schedule.md",
        "wish.md",
        "fuckxxx.md",
        "difficulties.md",
        "withvuepress2.md",
        "consider.md",
        "hope.md",
        "compare_home_to_college.md",
        "memes.md",
      ],
    },
  ],
  "/articles/": [
    {
      text: "主张",
      children: ["worldview.md"],
    },
    {
      text: "经历",
      children: ["computer_setting.md", "mobile_setting.md", "vps.md"],
    },
    {
      text: "教程",
      children: [
        "telegram.md",
        "adb.md",
        "markdown.md",
        "vpn.md",
        "Android_ISA.md",
        "minimize_exe.md",
        "cli_compress.md",
      ],
    },
    {
      text: "推荐",
      children: [
        "time_record.md",
        "track_record.md",
        "input_method",
        "external.md",
      ],
    },
  ],
  "/coding/": [
    {
      text: "语言",
      children: [
        "Rust.md",
        "Cpp.md",
        "python.md",
        "java.md",
        "tsjs.md",
        "csharp.md",
        "kotlin",
      ],
    },
    {
      text: "工具",
      children: ["github.md", "Git.md", "linux.md", "vim.md", "sql.md"],
    },
    {
      text: "其他",
      children: ["algorithm.md"],
    },
  ],
  "/farraginous/learning/": [
    {
      text: "学习笔记",
      link: "/farraginous/learning/",
      children: [
        "physics.md",
        "complex_functions.md",
        "circuit_analysis.md",
        "analog_circuit.md",
        "signals_and_systems.md",
        "Probab.Math.Stat.md",
        "dsp.md",
        "foods.md",
        "japanese.md",
        "ulpb.md",
      ],
    },
  ],
  "/hobbies/other_games/": [
    {
      text: "其他游戏",
      link: "/hobbies/other_games/",
      children: [
        "arknights.md",
        "csgo.md",
        "uno.md",
        "rec_college.md",
        "rec_hometown.md",
      ],
    },
  ],
  "/": [
    "/index.md", // 需要让某些二级页面也能显示主页的侧边栏，为此提供索引。主页已经在顶层目录下，不向前回退。
    {
      text: "闲聊",
      link: "/gossip/",
    },
    {
      text: "我的文章",
      link: "/articles/",
    },
    {
      text: "编程",
      link: "/coding/",
    },
    {
      text: "爱好",
      prefix: "/hobbies/",
      children: [
        "rhythm_games.md",
        "galgame.md",
        "Minecraft.md",
        "books.md",
        "anime.md",
        "other_games/",
      ],
    },
    {
      text: "杂项",
      prefix: "/farraginous/",
      children: [
        "recommend_packages.md",
        "recommend_websites.md",
        "college.md",
        "atri.md",
        "reciter.md",
        "learning/",
        "log.md",
      ],
    },
  ],
});
