import { defineClientConfig } from "vuepress/client";
import dated from "./components/dated.vue";
import dtls from "./components/dtls.vue";
import dtlslong from "./components/dtlslong.vue";
import furigana from "./components/furigana.vue";
import heimu from "./components/heimu.vue";
import OrderBadge from "./components/OrderBadge.vue";
import RSSLink from "./components/RSSLink.vue";
import TelegramLink from "./components/TelegramLink.vue";
import ZoomedImg from "./components/ZoomedImg.vue";

import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("TelegramLink", TelegramLink);
    app.component("RSSLink", RSSLink);
    app.component("OrderBadge", OrderBadge);
    app.component("dtls", dtls);
    app.component("dtlslong", dtlslong);
    app.component("heimu", heimu);
    app.component("ZoomedImg", ZoomedImg);
    app.component("dated", dated);
    app.component("furigana", furigana);
  },
});
