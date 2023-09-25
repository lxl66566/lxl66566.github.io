import { defineClientConfig } from "@vuepress/client";
import TelegramLink from "./components/TelegramLink.js";
import rssLink from "./components/rssLink.js";
import av from "./components/av.vue";

import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
	enhance: ({ app }) => {
		app.component("TelegramLink", TelegramLink);
		app.component("rssLink", rssLink);
		app.component("av", av);
	},
});
