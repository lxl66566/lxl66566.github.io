/**
 * 首页「我的项目」展示区唯一数据源，由 islands/HomeProjects.tsx 渲染。
 * 数据迁移自 GitHub profile README 的 Some of my projects 部分：主打项目
 * 单独展示，其余按聚类分组（分组名即货架行标题，去掉与主打重复的条目）。
 */
export interface Project {
  /** 展示名，同时是 GitHub 链接文本。 */
  name: string;
  /** GitHub 仓库地址。 */
  url?: string;
  /**
   * 一句话描述，支持行内 markdown：构建期经框架 inline 渲染器
   * （createInlineMarkdownRenderer）转 HTML，heimu/mark/katex/强调/链接可用。
   */
  desc: string;
  /** 展示图 URL（仅少部分项目有）。 */
  img?: string;
}

/** 主打卡片：额外带技术栈文本。 */
export interface FeaturedProject extends Project {
  stack: string;
}

export interface ProjectGroup {
  name: string;
  /** 默认收起（低价值分组，如 Garbage）。 */
  collapsed?: boolean;
  projects: Project[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    name: 'GalgameManager',
    url: 'https://github.com/lxl66566/GalgameManager',
    desc: 'Galgame 管理器，支持存档同步、插件系统、游玩时长统计等',
    stack: 'Rust (Tauri) · SolidJS',
    img: 'https://github.com/lxl66566/GalgameManager/raw/master/assets/main.png',
  },
  {
    name: 'AudioSpeedHack',
    url: 'https://github.com/lxl66566/AudioSpeedHack',
    desc: '基于 dll 注入的 galgame 音频加速工具',
    stack: 'C++ · Rust',
  },
];

export const projectGroups: ProjectGroup[] = [
  {
    name: '更多项目',
    projects: [
      {
        name: 'BPM',
        url: 'https://github.com/lxl66566/bpm',
        desc: '跨平台包管理器，从 GitHub Release 安装软件，拒绝源码编译',
      },
      {
        name: 'git-simple-encrypt',
        url: 'https://github.com/lxl66566/git-simple-encrypt',
        desc: '安全简单易用的单密码 Git 仓库加密方案',
      },
      {
        name: 'zdu',
        url: 'https://github.com/lxl66566/zdu',
        desc: 'blazing fast 的 disk usage tool，UI 抄的 dust',
      },
      {
        name: 'youpipe',
        url: 'https://github.com/lxl66566/youpipe',
        desc: '高度性能优化的 CPU + IO workload pipeline',
      },
      {
        name: 'reader-server-rs',
        // url: 'https://github.com/lxl66566/reader-server-rs',
        desc: '[WIP，敬请期待] 用来在线读书的服务端 + 网页',
      },
      {
        name: 'absolute-press',
        url: 'https://github.com/lxl66566/absolute-press',
        desc: '本站使用的博客框架',
      },
      {
        name: 'zstdx',
        url: 'https://github.com/lxl66566/zstdx',
        desc: 'zstd 的 pure Rust 实现，性能直击 libzstd',
      },
    ],
  },
  {
    name: '小玩具',
    projects: [
      {
        name: 'anyformatter',
        url: 'https://github.com/lxl66566/anyformatter-vscode',
        desc: '使用本地 command 格式化任意文件的 VSCode 插件。',
      },
      {
        name: 'rime-formatter',
        url: 'https://github.com/lxl66566/rime-formatter',
        desc: 'VSCode 插件，用于 Rime 词库格式化',
      },
      {
        name: 'rust-simple-release',
        url: 'https://github.com/lxl66566/rust-simple-release',
        desc: '为 Rust 项目提供简单的跨平台二进制发布',
      },
      {
        name: 'Fuck, delete it!',
        url: 'https://github.com/lxl66566/fuck-delete-it',
        desc: '强制删除 Windows 上的文件/文件夹，终止占用的进程。',
      },
      {
        name: 'windows-env',
        url: 'https://github.com/lxl66566/windows-env',
        desc: '命令行快速编辑 Windows 环境变量，也可作为 crate 使用。',
      },
      {
        name: 'urldecoder',
        url: 'https://github.com/lxl66566/urldecoder',
        desc: '批量解码文档中的 URL，并**将性能优化到极致**。',
      },
      {
        name: 'user-startup-rs',
        url: 'https://github.com/lxl66566/user-startup-rs',
        desc: '在系统启动时自动运行指令。跨平台。',
      },
      {
        name: 'git-sync-backup',
        url: 'https://github.com/lxl66566/git-sync-backup',
        desc: '基于 Git 的文件同步和备份工具',
      },
      {
        name: 'git-touchfish-commit',
        url: 'https://github.com/lxl66566/git-touchfish-commit',
        desc: '摸鱼鱼',
      },
      {
        name: 'sing-dae',
        url: 'https://github.com/lxl66566/sing-dae',
        desc: 'dae/sing-box 代理配置文件互转',
      },
    ],
  },
  {
    name: '我维护的活跃 Fork',
    projects: [
      {
        name: 'VSCodeVim',
        url: 'https://github.com/lxl66566/VSCodeVim',
        desc: '修复中文输入相关的多个 bug 以及 easymotion 使用体验',
      },
      {
        name: 'weasel（小狼毫）',
        url: 'https://github.com/lxl66566/weasel',
        desc: 'Windows 的 Rime 输入法实现：大量 bug 修复与性能优化',
      },
      {
        name: 'GARbro',
        url: 'https://github.com/lxl66566/GARbro',
        desc: '为更多加密格式提供了封包能力',
      },
    ],
  },
  {
    name: 'Galgame 工具',
    collapsed: true,
    projects: [
      {
        name: 'audio-loudness-batch-normalize',
        url: 'https://github.com/lxl66566/audio-loudness-batch-normalize',
        desc: '音频响度批量均衡',
      },
      {
        name: 'audio-batch-speedup',
        url: 'https://github.com/lxl66566/audio-batch-speedup',
        desc: '音频批量加速工具',
      },
      {
        name: 'xp3-pack-unpack',
        url: 'https://github.com/lxl66566/xp3-pack-unpack',
        desc: 'xp3 解封包工具',
      },
      {
        name: 'arc-reader-rs',
        url: 'https://github.com/lxl66566/arc-reader-rs',
        desc: 'BGI 引擎 .arc 文件解封包工具',
      },
      {
        name: 'SilkyArcTool-rs',
        url: 'https://github.com/lxl66566/SilkyArcTool-rs',
        desc: "Silky's engine .arc 文件解封包工具",
      },
      {
        name: 'aos_up',
        url: 'https://github.com/lxl66566/aos_up',
        desc: '.aos 文件解封包工具',
      },
      {
        name: 'fvp-rs',
        url: 'https://github.com/lxl66566/fvp-rs',
        desc: 'fvp 引擎 .bin 解包工具',
      },
    ],
  },
  {
    name: 'Telegram Bots',
    collapsed: true,
    projects: [
      {
        name: 'Telegram RSS Bot on Cloudflare Workers',
        url: 'https://github.com/lxl66566/Telegram-RSS-Bot-on-Cloudflare-Workers',
        desc: '托管在 Cloudflare 的 RSS 订阅 bot',
      },
      {
        name: 'telegram-shasei-bot',
        url: 'https://github.com/lxl66566/telegram-shasei-bot',
        desc: '记录射精数据并分析',
      },
      {
        name: 'telegram-subscribe-bot',
        url: 'https://github.com/lxl66566/telegram-subscribe-bot',
        desc: '按正则规则订阅群组消息',
      },
      {
        name: 'Mars-Bot-rs',
        url: 'https://github.com/lxl66566/Mars-Bot-rs',
        desc: '检测重复图像，你火星了.jpg',
      },
    ],
  },
  {
    name: '游戏',
    collapsed: true,
    projects: [
      {
        name: 'super24points',
        url: 'https://github.com/lxl66566/super24points-game',
        desc: '一个包含 幂、位运算 和 整除 的 24 点游戏（另有 SolidJS 网页版）',
      },
      {
        name: 'ThingInRings (AI powered)',
        url: 'https://github.com/lxl66566/thing-in-rings-with-ai',
        desc: 'Thing In Rings 桌游，但是 AI 做裁判',
      },
      {
        name: 'Kraken-chess-game',
        url: 'https://github.com/absxsfriends/Kraken-chess-game',
        desc: 'Kraken 棋，课设 pygame 的重写版本',
      },
    ],
  }
];
