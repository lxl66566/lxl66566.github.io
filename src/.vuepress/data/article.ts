import type { ArticleCellBoxType } from "../definition/types.js";

const links: ArticleCellBoxType[] = [
  {
    field: "Linux 相关",
    links: [
      { text: "前言", url: "./linux/index" },
      { text: "基础", url: "./linux/basic" },
      { text: "安装与配置（Nix 篇）", url: "./linux/nix" },
      { text: "安装与配置（Arch 篇）", url: "./linux/install_and_config" },
      { text: "安装与配置（OpenWRT 篇）", url: "./linux/openwrt" },
      { text: "包管理与使用推荐", url: "./linux/package" },
      { text: "遇到的问题", url: "./linux/problem" },
    ],
  },
  {
    field: "移动设备",
    links: [
      { text: "前言与评价", url: "./mobile/index" },
      { text: "手机设置", url: "./mobile/settings" },
      { text: "刷机与 ROOT", url: "./mobile/root" },
      { text: "模块与软件推荐", url: "./mobile/module_and_app" },
      { text: "遇到的问题", url: "./mobile/problem" },
    ],
  },
  {
    field: "代理与 VPS",
    links: [
      { text: "代理软件", url: "./proxy/proxy_software" },
      { text: "VPS", url: "./proxy/vps" },
      { text: "域名", url: "./proxy/domain" },
      { text: "Hysteria2 协议的使用", url: "./proxy/hysteria" },
      { text: "trojan-go 协议的使用", url: "./proxy/trojan-go" },
      { text: "trojan 协议的使用", url: "./proxy/trojan" },
      { text: "external", url: "./proxy/index" },
    ],
  },
  {
    field: "浏览器",
    links: [
      { text: "主流浏览器横评", url: "browser/assess" },
      { text: "浏览器设置", url: "browser/settings" },
    ],
  },
  {
    field: "教程",
    links: [
      { text: "设置 windows", url: "windows_setting" },
      { text: "TG（telegram）教程", url: "telegram" },
      { text: "Markdown 教程", url: "markdown" },
      { text: "压缩二进制文件与 dll", url: "minimize_exe" },
      { text: "命令行压缩", url: "cli_compress" },
      { text: "Potplayer 设置", url: "potplayer_setting" },
      { text: "yt-dlp 使用教程", url: "yt-dlp" },
      { text: "SPEED UP!（与 galgame 解封包）", url: "speedup" },
    ],
  },
  {
    field: "横评与推荐",
    links: [
      { text: "跨端使用时长记录软件横评", url: "time_record" },
      { text: "运动轨迹记录软件横评", url: "track_record" },
      { text: "输入法", url: "input_method" },
      { text: "RAM Disk 横评与使用", url: "ramdisk" },
      { text: "Android 手写笔记软件横评", url: "note" },
      { text: "Android 音乐播放器横评", url: "android_player" },
      { text: "反向代理", url: "reverse_proxy" },
      { text: "音频转文字", url: "voice2text" },
      { text: "OCR", url: "ocr" },
      { text: "PDF 阅读器横评", url: "pdf_reader" },
      { text: "内网穿透", url: "frp" },
      { text: "远程控制方案", url: "control" },
      { text: "理财，加密货币与区块链", url: "money" },
    ],
  },
  {
    field: "杂",
    links: [{ text: "寄生虫认知与预防", url: "worm" }],
  },
  {
    field: "外部文章分享",
    links: [{ text: "点击前往", url: "external" }],
  },
];

export default links;
