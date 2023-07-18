import { defineClientConfig } from "@vuepress/client";
import TelegramLink from "./components/TelegramLink.js";

import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("TelegramLink", TelegramLink);
  },
});
