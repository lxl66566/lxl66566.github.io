import { navbar } from "vuepress-theme-hope";
export default navbar([
	{
		text: "编程",
		link: "/coding/",
		icon: "code",
	},
	{
		text: "爱好",
		icon: "heart",
		children: [
			{
				text: "游戏",
				prefix: "/hobbies/",
				children: [
					"galgame.md",
					"rhythm_games.md",
					"Minecraft.md",
					"other_games/",
				],
			},
			{
				text: "其他",
				prefix: "/hobbies/",
				children: ["books.md", "anime.md", "art.md", "NSFW/"],
			},
		],
	},
	{
		text: "杂项",
		prefix: "/farraginous/",
		icon: "plus",
		children: [
			"recommend_packages.md",
			"recommend_websites.md",
			"college.md",
			"reciter.md",
		],
	},
	{
		text: "文章",
		link: "/articles/",
		icon: "blog",
	},
	{ text: "学习", link: "/learning/", icon: "pen" },
	{
		text: "闲聊",
		link: "/gossip/",
		icon: "comment",
	},
	{
		text: "随笔",
		link: "/essay/",
		icon: "newspaper",
	},
	{
		text: "博客",
		link: "/blog/",
		icon: "blog",
	},
]);
