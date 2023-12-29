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
				"compare_home_to_college.md",
				"memes.md",
				"forward.md",
				"chicken_soup.md",
				"zero_fill.md",
				"brainhole.md",
			],
		},
	],
	"/articles/linux/": [
		"index.md",
		"basic.md",
		"install_and_config.md",
		"package.md",
		"problem.md",
	],
	"/articles/mobile/": [
		"index.md",
		"root_and_setting.md",
		"module_and_app.md",
		"problem.md",
	],
	"/articles/proxy/": [
		"index.md",
		"vpn.md",
		"vps.md",
		"proxy_software.md",
		"hysteria.md",
		"trojan-go.md",
	],
	"/articles/browser/": ["index.md", "assess.md", "settings.md"],
	"/articles/": [
		{
			text: "经历",
			children: ["linux", "windows_setting.md", "mobile", "browser"],
		},
		{
			text: "教程",
			children: [
				"proxy",
				"telegram.md",
				"adb.md",
				"markdown.md",
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
				"ramdisk.md",
				"note.md",
				"reverse_proxy.md",
				"voice2text.md",
				"ocr.md",
				"pdf_reader.md",
			],
		},
	],
	"/coding/": [
		{
			text: "思考",
			children: ["philosophy_of_PL.md"],
		},
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
			children: [
				"github.md",
				"Git.md",
				"nodejs.md",
				"vscode.md",
				"vim.md",
				"sql.md",
				"container.md",
			],
		},
		{
			text: "其他",
			children: ["algorithm.md", "bot.md", "octave.md"],
		},
	],
	"/blog/": ["index.md", "withvuepress2.md", "log.md", "todo.md"],
	"/essay/": [
		{
			text: "随笔",
			link: "/essay/",
			children: ["2023.md", "2022.md", "earlier.md"],
		},
	],
	"/farraginous/learning/": [
		{
			text: "学习笔记",
			link: "/farraginous/learning/",
			children: [
				"japanese.md",
				"english.md",
				"ulpb.md",
				"typst.md",
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
				"foods.md",
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
				"reciter.md",
				"learning/",
			],
		},
		"essay/",
	],
});
