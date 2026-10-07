/**
 * 「我的文章」分区唯一数据源：`/articles/` 页 ArticleCell 分区与 navbar
 * 「我的文章」下拉的分区都从这里派生（vite.config.ts 构建期映射为
 * navbar tweak items，框架校验每个链接；详见 conversion-spec §9 的
 * 单一数据源约定）。url 是相对 /articles/ 的页面链接，与页内相对
 * href 行为一致；外链由 ArticleCell 新窗口打开。
 */
export interface ArticleSectionLink {
  text: string;
  url: string;
}

export interface ArticleSection {
  field: string;
  links: ArticleSectionLink[];
}

const sections: ArticleSection[] = [
  {
    field: 'Linux 相关',
    links: [
      { text: '前言', url: './linux/index.html' },
      { text: '基础', url: './linux/basic.html' },
      { text: '安装与配置（NixOS 篇）', url: './linux/nix.html' },
      { text: '安装与配置（Arch 篇）', url: './linux/install_and_config.html' },
      { text: '安装与配置（OpenWRT 篇）', url: './linux/openwrt.html' },
      { text: '包管理与使用推荐', url: './linux/package.html' },
      { text: '遇到的问题', url: './linux/problem.html' },
    ],
  },
  {
    field: 'Windows 相关',
    links: [
      { text: 'windows 设置指南', url: './windows/settings.html' },
      { text: 'windows 小知识与日常使用', url: './windows/usage.html' },
    ],
  },
  {
    field: '移动设备',
    links: [
      { text: '前言与评价', url: './mobile/index.html' },
      { text: '手机设置', url: './mobile/settings.html' },
      { text: '刷机与 ROOT', url: './mobile/root.html' },
      { text: '模块与软件推荐', url: './mobile/module_and_app.html' },
      { text: 'ADB', url: './mobile/adb.html' },
      { text: '遇到的问题', url: './mobile/problem.html' },
    ],
  },
  {
    field: '代理与 VPS',
    links: [
      { text: '代理客户端', url: './proxy/proxy_software.html' },
      { text: 'VPS', url: './proxy/vps.html' },
      { text: '域名', url: './proxy/domain.html' },
      { text: 'Hysteria2 协议的使用', url: './proxy/hysteria.html' },
      { text: 'trojan 协议的使用', url: './proxy/trojan.html' },
      { text: 'TUIC 协议的使用', url: './proxy/tuic.html' },
      { text: 'external', url: './proxy/index.html' },
    ],
  },
  {
    field: '浏览器',
    links: [
      { text: '主流浏览器横评', url: './browser/assess.html' },
      { text: '浏览器设置', url: './browser/settings.html' },
    ],
  },
  {
    field: '教程',
    links: [
      { text: 'TG（telegram）教程', url: './telegram.html' },
      { text: 'Markdown 教程', url: './markdown.html' },
      { text: '压缩二进制文件与 dll', url: './minimize_exe.html' },
      { text: '命令行压缩', url: './cli_compress.html' },
      { text: 'Potplayer 设置', url: './potplayer_setting.html' },
      { text: 'yt-dlp 使用教程', url: './yt-dlp.html' },
      { text: 'SPEED UP!（与 galgame 解封包）', url: './speedup.html' },
    ],
  },
  {
    field: '横评、推荐与踩坑',
    links: [
      { text: '跨端使用时长记录软件横评', url: './time_record.html' },
      { text: '运动轨迹记录软件横评', url: './track_record.html' },
      { text: '输入法', url: './input_method.html' },
      { text: 'RAM Disk 横评与使用', url: './ramdisk.html' },
      { text: 'Android 手写笔记软件横评', url: './note.html' },
      { text: 'Android 音乐播放器横评', url: './android_player.html' },
      { text: '反向代理', url: './reverse_proxy.html' },
      { text: '音频转文字', url: './voice2text.html' },
      { text: 'OCR', url: './ocr.html' },
      { text: 'PDF 阅读器横评', url: './pdf_reader.html' },
      { text: '内网穿透', url: './frp.html' },
      { text: '远程控制方案', url: './control.html' },
      { text: '理财，加密货币与区块链', url: './money.html' },
      { text: '下载器横评', url: './downloaders.html' },
      { text: 'HTTP Client', url: './http_client.html' },
    ],
  },
  {
    field: '生命科学',
    links: [
      { text: '寄生虫认知与预防', url: './worm.html' },
      { text: '生活健康指南', url: './life.html' },
    ],
  },
  {
    field: '外部文章分享',
    links: [{ text: '文章分享', url: './external.html' }],
  },
];

export default sections;
