import { defineClientConfig } from "@vuepress/client";
import TelegramLink from "./components/TelegramLink.js";
import rssLink from "./components/rssLink.js";
import OrderBadge from "./components/OrderBadge.vue";
import dtls from "./components/dtls.vue";
import heimu from "./components/heimu.vue";

import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
	enhance: ({ app }) => {
		app.component("TelegramLink", TelegramLink);
		app.component("rssLink", rssLink);
		app.component("OrderBadge", OrderBadge);
		app.component("dtls", dtls);
		app.component("heimu", heimu);
	},
});
