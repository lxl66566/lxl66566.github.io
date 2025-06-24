import { sidebar } from "vuepress-theme-hope";
export default sidebar({
  "/gossip/": [
    {
      text: "闲聊",
      link: "/gossip/",
      children: [
        "worldview.md",
        "va_view.md",
        "author.md",
        "schedule.md",
        "wish.md",
        "fuckxxx.md",
        "difficulties.md",
        "consider.md",
        "hope.md",
        "pc_hardware.md",
        "compare_home_to_college.md",
        "memes.md",
        "forward.md",
        "chicken_soup.md",
        "zero_fill.md",
        "brainhole.md",
        "job.md",
      ],
    },
  ],
  "/articles/linux/": ["index.md", "basic.md", "install_and_config.md", "nix.md", "openwrt.md", "package.md", "problem.md"],
  "/articles/mobile/": ["index.md", "settings.md", "root.md", "module_and_app.md", "problem.md", "adb.md", "Android_ISA.md"],
  "/articles/proxy/": ["index.md", "vpn.md", "vps.md", "proxy_software.md", "hysteria.md", "trojan-go.md", "trojan.md"],
  "/articles/browser/": ["index.md", "assess.md", "settings.md"],
  "/articles/": [
    {
      text: "经历",
      children: ["linux/index.md", "windows_setting.md", "mobile/index.md"],
    },
    {
      text: "教程",
      children: ["proxy/index.md", "telegram.md", "markdown.md", "minimize_exe.md", "cli_compress.md", "yt-dlp.md", "speedup.md"],
    },
    {
      text: "推荐",
      children: [
        "time_record.md",
        "track_record.md",
        "input_method",
        "ramdisk.md",
        "note.md",
        "reverse_proxy.md",
        "voice2text.md",
        "ocr.md",
        "pdf_reader.md",
        "frp.md",
        "android_player.md",
        "money.md",
      ],
    },
    {
      text: "外部文章分享",
      link: "external.md",
    },
  ],
  "/coding/": [
    {
      text: "思考",
      children: ["philosophy_of_PL.md"],
    },
    {
      text: "语言",
      children: ["Rust.md", "python.md", "Cpp.md", "shell.md", "java.md", "tsjs.md", "html.md", "csharp.md", "kotlin.md", "clojure.md", "octave.md"],
    },
    {
      text: "工具",
      children: ["github.md", "Git.md", "vscode.md", "vim.md", "sql.md", "container.md", "package_manager.md"],
    },
    {
      text: "前端",
      children: ["nodejs.md", "tsjs.md", "css.md", "html.md", "vue.md", "react.md", "solidjs.md"],
    },
    {
      text: "其他",
      children: ["bagu.md", "android.md", "algorithm.md", "bot.md", "audio.md"],
    },
  ],
  "/blog/": ["index.md", "withvuepress2.md", "log.md", "todo.md"],
  "/essay/": [
    {
      text: "随笔",
      link: "/essay/",
      children: ["2025", "2024", "2023.md", "2022.md", "earlier.md"],
    },
  ],
  "/learning/": [
    {
      text: "学习笔记",
      link: "/learning/",
      children: [
        "japanese.md",
        "english.md",
        "ulpb.md",
        "typst.md",
        "ps.md",
        "physics.md",
        "complex_functions.md",
        "circuit_analysis.md",
        "analog_circuit.md",
        "signals_and_systems.md",
        "Probab.Math.Stat.md",
        "dsp.md",
        "dsp2.md",
        "CEC.md",
        "network.md",
        "PoC.md",
        "electromagnetic_wave.md",
        "image_processing.md",
        "information_theory.md",
        "foods.md",
      ],
    },
  ],
  "/hobbies/other_games/": [
    {
      text: "其他游戏",
      link: "/hobbies/other_games/",
      children: ["arknights.md", "csgo.md", "uno.md", "rec_college.md", "rec_hometown.md"],
    },
  ],
  "/hobbies/NSFW/": ["index.md", "videos.md", "comic.md", "bangumi.md"],
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
      children: ["rhythm_games.md", "galgame.md", "Minecraft.md", "books.md", "anime.md", "other_games/"],
    },
    {
      text: "杂项",
      prefix: "/farraginous/",
      children: ["recommend_packages.md", "recommend_websites.md", "college.md", "reciter.md"],
    },
    "essay/",
  ],
});
