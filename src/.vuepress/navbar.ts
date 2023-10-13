import { navbar } from "vuepress-theme-hope";
export default navbar([
	{
		text: "编程",
		link: "/coding/",
		icon: "code",
	},
	{
		text: "爱好",
		icon: "like",
		children: [
			{
				text: "游戏",
				prefix: "/hobbies/",
				children: [
					"rhythm_games.md",
					"galgame.md",
					"Minecraft.md",
					"other_games/",
				],
			},
			{
				text: "其他",
				prefix: "/hobbies/",
				children: ["books.md", "anime.md"],
			},
		],
	},
	{
		text: "杂项",
		prefix: "/farraginous/",
		icon: "categoryselected",
		children: [
			"recommend_packages.md",
			"recommend_websites.md",
			"college.md",
			"reciter.md",
			"learning/",
		],
	},
	{
		text: "文章",
		link: "/articles/",
		icon: "blog",
	},
	{
		text: "闲聊",
		link: "/gossip/",
		icon: "comment",
	},
	{
		text: "随笔",
		link: "/essay.md",
		icon: "article",
	},
	{
		text: "博客",
		link: "/blog/",
		icon: "vue",
	},
]);
