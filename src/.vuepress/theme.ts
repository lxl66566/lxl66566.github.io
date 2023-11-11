import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
	pure: true,
	hostname: "https://absx.pages.dev",
	iconAssets: "iconfont",
	logo: "/logo.jpg",
	repo: "https://github.com/lxl66566/lxl66566.github.io",
	docsDir: "src",
	navbar,
	sidebar,
	editLink: false,
	contributors: false,
	breadcrumb: false,
	encrypt: {
		config: {
			"/articles/vpn.html": ["2003"],
			"/hobbies/NSFW/videos.html": ["0721"],
			"/hobbies/NSFW/comic.html": ["0721"],
			"/gossip/wish.html": ["2003"],
		},
	},
	blog: {
		name: "绝对值_x",
		intro: "/gossip/author.html",
		medias: {
			GitHub: "https://github.com/lxl66566",
			Telegram: "https://t.me/ab5_x",
			Bilibili: "https://space.bilibili.com/346365047",
		},
		articlePerPage: 3,
		articleInfo: ["Date", "Category", "PageView", "Tag", "ReadingTime"],
	},
	navbarLayout: {
		start: ["Brand"],
		center: ["Links"],
		end: ["Repo", "TelegramLink", "rssLink", "Outlook", "Search"],
	},
	plugins: {
		blog: { excerptLength: 1 },
		comment: {
			provider: "Giscus",
			repo: "lxl66566/lxl66566.github.io",
			repoId: "R_kgDOHRyDvA",
			category: "General",
			categoryId: "DIC_kwDOHRyDvM4CQSP1",
			mapping: "pathname",
			lightTheme: "light",
			darkTheme: "transparent_dark",
		},

		mdEnhance: {
			align: true,
			codetabs: true,
			// attrs: true,
			imgLazyload: true,
			figure: true,
			katex: { copy: true },
			mark: true,
			footnote: true,
			tabs: true,
			tasklist: true,
			mermaid: true,
			stylize: [
				{
					matcher: "Recommended",
					replacer: ({ tag }) => {
						if (tag === "em")
							return {
								tag: "Badge",
								attrs: { type: "tip" },
								content: "Recommended",
							};
					},
				},
			],
		},
		feed: {
			rss: true,
			count: 30,
		},
		pwa: {
			update: "force",
			maxSize: 4096,
			cacheHTML: true,
		},
	},
});
