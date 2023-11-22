import { defineClientConfig } from "@vuepress/client";
import TelegramLink from "./components/TelegramLink.js";
import rssLink from "./components/rssLink.js";
import AvTable from "./components/AvTable.vue";
import ComicTable from "./components/ComicTable.vue";
import OrderBadge from "./components/OrderBadge.vue";

import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
	enhance: ({ app }) => {
		app.component("TelegramLink", TelegramLink);
		app.component("rssLink", rssLink);
		app.component("AvTable", AvTable);
		app.component("ComicTable", ComicTable);
		app.component("OrderBadge", OrderBadge);
	},
});
