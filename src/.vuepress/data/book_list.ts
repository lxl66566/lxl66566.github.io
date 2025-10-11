import { BookItemInputType, HLevel } from "../definition/book_type.js";

const original_list: BookItemInputType[] = [
  {
    name: "魅魔学院的反逆者",
    author: "听雨",
    h_level: HLevel.HIGH,
    duration: {
      start: "2025-10-11",
    },
  },
  {
    name: "一生悬命",
    author: "陆春吾",
    h_level: HLevel.NONE,
    duration: {
      start: "2025-08-22",
      end: "2025-08-27",
    },
  },
  {
    name: "冲出重围365",
    h_level: HLevel.NONE,
    reading_status: {
      kind: "在读",
    },
    nth_time: 2,
    duration: {
      start: "2025-06-14",
    },
  },
  {
    name: "术师手册",
    h_level: HLevel.LOW,
    duration: {
      start: "2025-05-16",
      end: "2025-05-31",
    },
  },
  {
    name: "雪国的青梅四重奏",
    tags: {
      japanese: true,
    },
    h_level: HLevel.LOW,
    duration: {
      start: "2025-04-09",
      end: "2025-05-12",
    },
  },
  {
    name: "圣女修道院",
    h_level: HLevel.HIGH,
    duration: {
      start: "2025-03-28",
      end: "2025-04-05",
    },
  },
  {
    name: "死人经",
    h_level: HLevel.LITE,
    duration: {
      start: "2024-12-12",
      end: "2025-07-17",
    },
  },
  {
    name: "柴刀流恋爱日常",
    h_level: HLevel.MEDIUM,
    duration: {
      start: "2024-12-06",
      end: "2024-12-11",
    },
  },
  {
    name: "我们的教室没有欺凌",
    h_level: HLevel.HIGH,
    tags: {
      japanese: true,
    },
    duration: {
      start: "2024-12-05",
      end: "2024-12-06",
    },
  },
  {
    name: "我的风俗店打工生活",
    h_level: HLevel.MEDIUM,
    use_time: "<30min",
    url: "https://www.incnjp.com/thread-1153976-1-1.html",
    duration: {
      start: "2024-10-04",
      end: "2024-10-04",
    },
  },
  {
    name: "最强杀手系统",
    h_level: HLevel.HIGH,
    use_time: "7h41min",
    reading_status: {
      kind: "已放弃",
      extra: "28.5%",
    },
    duration: {
      start: "2024-09-1x",
      end: "2024-09-16",
    },
  },
  {
    name: "催眠王座",
    h_level: HLevel.HIGH,
    use_time: "6h16min",
    reading_status: {
      kind: "已放弃",
    },
    duration: {
      start: "2024-09-09",
      end: "2024-09-11",
    },
  },
  {
    name: "我就是神！",
    valid_name: "我就是神",
    h_level: HLevel.NONE,
    use_time: "62h51min",
    url: "https://t.me/absolutexsresource/13",
    duration: {
      start: "2024-07-21",
      end: "2024-09-08",
    },
  },
  {
    name: "一周一次买下同班同学的那些事",
    url: "https://www.linovelib.com/novel/3605.html",
    h_level: HLevel.LOW,
    tags: {
      japanese: true,
    },
    reading_status: {
      kind: "等待连载",
    },
    duration: {
      start: "2024-06-14",
    },
  },
  {
    name: "凡人修仙传",
    h_level: HLevel.LOW,
    use_time: ">60h",
    url: "https://zxcs.zip/book/1064.html",
    duration: {
      start: "2024-04-27",
      end: "2024-05-14",
    },
  },
  {
    name: "北方的天空",
    h_level: HLevel.HIGH,
    url: "https://t.me/absolutexsresource/3",
    duration: {
      start: "2024-01-31",
      end: "2024-04-27",
    },
  },
  {
    name: "某 R18 内容",
    h_level: HLevel.HIGH,
    url: "https://www.pixiv.net/novel/show.php?id=21329454",
    reading_status: {
      kind: "等待连载",
      extra: "2",
    },
    duration: {
      start: "2024-01-31",
    },
  },
  {
    name: "Re0：从零开始的异世界生活",
    h_level: HLevel.NONE,
    use_time: "3h52min",
    url: "https://github.com/re-zero-khis/re0-web",
    reading_status: {
      kind: "已放弃",
    },
    duration: {
      start: "2024-01-20",
    },
  },
  {
    name: "我在末世捡到白狐",
    h_level: HLevel.HIGH,
    url: "https://www.pixiv.net/novel/series/10523577",
    use_time: "2h23min",
    reading_status: {
      kind: "等待连载",
      extra: "23",
    },
    duration: {
      start: "2023-08-29",
    },
  },
  {
    name: "加速世界",
    h_level: HLevel.NONE,
    url: "https://www.wenku8.net/book/381.htm",
    use_time: "21h33min(未包括前 23.5%)",
    tags: {
      japanese: true,
    },
    reading_status: {
      kind: "等待连载",
      extra: "26",
    },
    duration: {
      start: "2023-07-09",
    },
  },
  {
    name: "龍神の巫女",
    h_level: HLevel.LITE,
    url: "https://kakuyomu.jp/works/16816452219814553126",
    tags: {
      japanese: true,
      namaniku: true,
    },
    reading_status: {
      kind: "已放弃",
      extra: "40章左右",
    },
    duration: {
      start: "2023-0[34]",
    },
  },
  {
    name: "末世之黑暗召唤师",
    h_level: HLevel.HIGH,
    use_time: "41h10min",
    duration: {
      start: "2023.07.14",
      end: "2023.07.31",
    },
  },
  {
    name: "知北游",
    h_level: HLevel.LOW,
    use_time: "18h16min",
    duration: {
      start: "2023-02-10",
      end: "2023-02-18",
    },
  },
  {
    name: "空想之拳",
    h_level: HLevel.HIGH,
    use_time: "21h17min",
    reading_status: {
      kind: "已停更",
    },
    duration: {
      start: "2023-01-29",
      end: "2023-02-06",
    },
  },
  {
    name: "万族之劫",
    h_level: HLevel.NONE,
    use_time: "103h57min",
    duration: {
      start: "2023-01-07",
      end: "2023-01-26",
    },
  },
  {
    name: "学魔养成系统",
    h_level: HLevel.LITE,
    use_time: "19h36min",
    duration: {
      start: "2022-12-24",
      end: "2022-12-28",
    },
  },
  {
    name: "继母的拖油瓶是我的前女友",
    h_level: HLevel.NONE,
    use_time: "11h56min",
    tags: {
      japanese: true,
    },
    duration: {
      start: "2022-12-17",
      end: "2022-12-20",
    },
  },
  {
    name: "与绿茶妹妹交换身体之后",
    h_level: HLevel.HIGH,
    use_time: "50min*",
    duration: {
      start: "2022-08-04",
      end: "2022-08-05",
    },
  },
  {
    name: "星辰变",
    use_time: "22h7min",
    duration: {
      start: "2022-07-07",
      end: "2022-07-25",
    },
  },
  {
    name: "圣墟",
    use_time: "83h45min",
    duration: {
      start: "2022-03-15",
      end: "2022-05-13",
    },
  },
  {
    name: "我假装会异能",
    use_time: "2h",
    duration: {
      start: "2022-03-12",
      end: "2022-03-14",
    },
  },
  {
    name: "想要成为影之实力者",
    use_time: "12h",
    tags: {
      japanese: true,
    },
    duration: {
      start: "2022-02-18",
      end: "2022-03-10",
    },
  },
  {
    name: "诡秘之主",
    duration: {
      end: "2022-02-07",
    },
  },
  {
    name: "我当上帝那些事",
    h_level: HLevel.HIGH,
    duration: {
      end: "2022-01-20",
    },
  },
  {
    name: "末日之无限兑换",
    h_level: HLevel.HIGH,
    duration: {
      start: "2021-08-23",
      end: "2021-12-16",
    },
  },
  {
    name: "万能数据",
    duration: {
      start: "2021-08-08",
      end: "2021-08-09",
    },
  },
  {
    name: "茅山终极僵尸王",
    h_level: HLevel.HIGH,
    duration: {
      start: "2021-07-10",
      end: "2021-08-07",
    },
  },
  {
    name: "子夜鸮",
    duration: {
      start: "2021-07-02",
      end: "2021-07-08",
    },
  },
  {
    name: "抱歉有系统就是了不起",
    h_level: HLevel.HIGH,
    duration: {
      start: "2021-06-11",
      end: "2021-06-18",
    },
  },
  {
    name: "独步天下",
    duration: {
      start: "2021-01-10",
      end: "2021-04-07",
    },
  },
  {
    name: "都市之无赖弃少",
    h_level: HLevel.HIGH,
    duration: {
      start: "2021-01-09",
      end: "?",
    },
  },
  {
    name: "拔刀狂想曲",
    tags: {
      japanese: true,
    },
    duration: {
      start: "2021-01-01",
      end: "2021-01-07",
    },
  },
  {
    name: "凌天传说",
    h_level: HLevel.MEDIUM,
    duration: {
      start: "2020-12-14",
      end: "2020-12-31",
    },
  },
  {
    name: "走进修仙",
    valid_name: "走进修仙二刷",
    nth_time: 2,
    duration: {
      start: "2020-05-09",
      end: "2020-11-20",
    },
  },
  {
    name: "天道图书馆",
    duration: {
      start: "2020-09-23",
      end: "2020-10-08",
    },
  },
  {
    name: "学霸的黑科技系统",
    duration: {
      start: "2020-08-23",
      end: "2020-09-23",
    },
  },
  {
    name: "大道争锋",
    h_level: HLevel.NONE,
    duration: {
      start: "2019-09-01",
      end: "2020-08-09",
    },
  },
  {
    name: "游戏人生",
    tags: {
      japanese: true,
    },
    duration: {
      start: "2020-08-01",
      end: "?",
    },
  },
  {
    name: "武动乾坤",
    h_level: HLevel.LOW,
    duration: {
      start: "2020-07-25",
      end: "2020-08-01",
    },
  },
  {
    name: "超弦空间",
    duration: {
      start: "?",
      end: "2020-06-26",
    },
  },
  {
    name: "天才基本法",
    duration: {
      start: "2020-05-07",
      end: "2020-05-17",
    },
  },
  {
    name: "儒道至圣",
    duration: {
      start: "2020-03-25",
      end: "2020-05-06",
    },
  },
  {
    name: "遮天",
    duration: {
      start: "2020-02-18",
      end: "2020-03-24",
    },
  },
  {
    name: "无极魔道",
    duration: {
      start: "2020-01-31",
      end: "2020-02-16",
    },
  },
  {
    name: "我的极品大小姐",
    h_level: HLevel.HIGH,
    duration: {
      start: "?",
      end: "2020-01-30",
    },
  },
  {
    name: "杀神",
    duration: {
      start: "2019-11-24",
      end: "2019-12-13",
    },
  },
  {
    name: "绝品仙医",
    h_level: HLevel.HIGH,
    duration: {
      start: "?",
      end: "2019-11-24",
    },
  },
  {
    name: "天辰",
    duration: "<2019.07.30>",
  },
  {
    name: "大主宰",
    duration: "<2019.05.29>",
  },
  {
    name: "斗破苍穹",
    duration: {
      start: "?",
      end: ">2019-05-23",
    },
  },
  {
    name: "走进修仙",
    nth_time: 1,
    duration: {
      start: "<2019-01-20",
      end: "?",
    },
  },
  {
    name: "仙路争锋",
    nth_time: 2,
    duration: "2018.10.17?",
  },
  {
    name: "神控天下",
    duration: "?<2018.10.17",
  },
  {
    name: "万域之王",
    duration: "?<2018.10.17",
  },
  {
    name: "飞天",
    h_level: HLevel.HIGH,
    duration: "?<2018.10.17",
  },
  {
    name: "我是大法师",
    h_level: HLevel.HIGH,
    duration: "?<2018.10.17",
  },
  {
    name: "纨绔子弟",
    h_level: HLevel.HIGH,
    duration: "?<2018.07.28",
  },
  {
    name: "现代艳帝",
    h_level: HLevel.HIGH,
    duration: "?<2018.07.28",
  },
  {
    name: "异界邪君",
    duration: "?<2018.07.28",
  },
  {
    name: "大魔王",
    duration: "<2018.07.21",
  },
  {
    name: "天火大道",
    duration: "<2018.07.21",
  },
  {
    name: "诛仙",
    duration: "2018.07.21?",
  },
  {
    name: "傲剑凌云",
    h_level: HLevel.MEDIUM,
    duration: "?<2018.07.21",
  },
  {
    name: "九荒天帝",
    reading_status: {
      kind: "已停更",
    },
    duration: "?",
  },
  {
    name: "戮仙",
    duration: "<2018.06",
  },
  {
    name: "仙路争锋",
    nth_time: 1,
    duration: "<2015.06",
  },
  {
    name: "斗罗大陆",
    order: 3,
  },
  {
    name: "斗罗大陆",
    order: 2,
  },
  {
    name: "斗罗大陆",
    order: 1,
  },
  {
    name: "孽乱青春",
    h_level: HLevel.HIGH,
  },
  {
    name: "匹夫的逆袭",
  },
  {
    name: "當代學生生存手冊",
    use_time: "1h30min",
    tags: {
      not_network: true,
    },
    duration: {
      start: "2024-10-04",
      end: "2024-11-27",
    },
  },
  {
    name: "事实核查手册",
    url: "https://chinafactcheck.com/?p=11465",
    reading_status: {
      kind: "已放弃",
    },
    tags: {
      not_network: true,
    },
    duration: {
      start: "2024-06-22",
    },
  },
  {
    name: "教育的浪费",
    author: "Bryan Caplan",
    url: "https://t.me/absolutexsresource/4",
    reading_status: {
      kind: "在读",
    },
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2024-06-08",
    },
  },
  {
    name: "大学刑法课",
    h_level: HLevel.HIGH,
    reading_status: {
      kind: "在读",
    },
    tags: {
      study: true,
    },
    duration: {
      start: "2023-11-13",
    },
  },
  {
    name: "sicp-js",
    url: "https://github.com/lxl66566/sicp-js-zh/",
    reading_status: {
      kind: "在读",
      extra: "2章,边做习题",
    },
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2023-10-13",
    },
  },
  {
    name: "经济学原理",
    author: "N.Gregory Mankiw",
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2023-07-2?",
    },
  },
  {
    name: "Harry Potter",
    order: 1,
    reading_status: {
      kind: "在读",
    },
    tags: {
      namaniku: true,
      not_network: true,
    },
    duration: {
      start: "2023-0?.??",
    },
  },
  {
    name: "乌合之众",
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2024-04-17",
      end: "2024-04-25",
    },
  },
  {
    name: "编程的修炼",
    author: "Edsger W. Dijkstra",
    reading_status: {
      kind: "已放弃",
      extra: "过于抽象",
    },
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2023-12-19",
    },
  },
  {
    name: "Exercised: Why Something We Never Evolved to Do Is Healthy and Rewarding",
    valid_name: "Exercised",
    use_time: "2h39min",
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2023-0?.??",
      end: "2024-01-21",
    },
  },
  {
    name: "操作系统导论",
    use_time: "9h13min",
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2023-09-22",
      end: "2023-12-12",
    },
  },
  {
    name: "耻",
    author: "库切",
    use_time: "2h3min",
    tags: {
      not_network: true,
    },
    duration: {
      start: "2023-11-07",
      end: "2023-11-08",
    },
  },
  {
    name: "SICP",
    reading_status: {
      kind: "已放弃",
      extra: "转向 sicp-js",
    },
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2023-0?.??",
    },
  },
  {
    name: "世界重启",
    use_time: "1h58min",
    tags: {
      not_network: true,
    },
    duration: {
      start: "2023-09-0?",
      end: "2023-09-25",
    },
  },
  {
    name: "如何系统思考",
    author: "邱绍良",
    use_time: "1h15min",
    tags: {
      not_network: true,
      study: true,
    },
    reading_status: {
      kind: "已放弃",
      extra: "50%",
    },
    duration: {
      start: "2023-07-06",
    },
  },
  {
    name: "新版标准日本语中级下",
    tags: {
      not_network: true,
      study: true,
    },
    reading_status: {
      kind: "已放弃",
      extra: "80%",
    },
  },
  {
    name: "别闹了，费曼先生",
    valid_name: "别闹了费曼先生",
    author: "Richard Feynman",
    use_time: "4h16min",
    tags: {
      not_network: true,
    },
    duration: {
      start: "2023-08-01",
      end: "2023-08-02",
    },
  },
  {
    name: "三体 三部曲",
    valid_name: "三体",
    nth_time: 2,
    use_time: "9h27min",
    tags: {
      not_network: true,
    },
    duration: {
      start: "2023-01-01",
      end: "2023-01-04",
    },
  },
  {
    name: "数学之美",
    tags: {
      not_network: true,
      study: true,
    },
    duration: {
      start: "2021-07-22",
      end: ">2021-08-13",
    },
  },
];

export default original_list;
