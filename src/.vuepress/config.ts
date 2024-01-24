import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { getDirname, path } from "@vuepress/utils";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);
const temp = defineUserConfig({
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
temp.alias = {
	"@AvTable": path.resolve(__dirname, "components/AvTable.vue"),
	"@ComicTable": path.resolve(__dirname, "components/ComicTable.vue"),
	"@GalExhibition": path.resolve(__dirname, "components/GalExhibition.vue"),
};
export default temp;
