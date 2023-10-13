import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
	base: "/",
	lang: "zh-CN",
	title: "绝对值_x的博客",
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
	plugins: [
		searchProPlugin({
			indexContent: true,
			autoSuggestions: false,
		}),
	],
	shouldPrefetch: false,
});
