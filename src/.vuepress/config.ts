import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "绝对值_x的博客",
  description: "没什么有价值的内容的，真的！",
  theme,
  plugins: [
    searchProPlugin({
      indexContent: true,
      autoSuggestions: false,
    }),
  ],
});
