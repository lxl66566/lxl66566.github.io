import { GalItemInputType, PlayingStatus } from "../definition/gal_type.js";

const original_list: GalItemInputType[] = [
  {
    name: "ふゆから、くるる。",
    valid_name: "ふゆからくるる",
    other_names: ["冬滚滚"],
    use_time: "+3min",
    duration: {
      start: "2025-11-26",
    },
  },
  {
    name: "魔法少女的魔女审判",
    other_names: ["manosaba", "魔法少女ノ魔女裁判", "魔裁"],
    use_time: "17h20min",
    intense: true,
    all_ages: true,
    duration: {
      start: "2025-11-02",
      end: "2025-11-14",
    },
    score: {
      story: 9,
      visual: 9.5,
      program: 5.1,
    },
  },
  {
    name: "恋狱～月狂病～《REBIRTH FHD SIZE EDITION》",
    valid_name: "恋狱月狂病",
    other_names: ["恋狱月狂病", "カルタグラ～ツキ狂イノ病～"],
    intense: true,
    playing_status: PlayingStatus.PLAYING,
    use_time: "-1min",
    duration: {
      start: "2025-10-18",
    },
  },
  {
    name: "传述之魔女",
    other_names: ["イハナシの魔女"],
    all_ages: true,
    use_time: "6h",
    duration: {
      start: "2025-10-06",
      end: "2025-10-12",
    },
    score: {
      story: 8.8,
      visual: 9.6,
      program: 2.8,
    },
  },
  {
    name: "魔王城的隐居参谋",
    other_names: ["魔王城の隠居参謀"],
    use_time: "2h9min",
    duration: {
      start: "2025-10-05",
      end: "2025-10-05",
    },
    not_strict: true,
    score: {
      story: 0.6,
      visual: 8.4,
      program: 1,
    },
  },
  {
    name: "流星·世界演绎者",
    valid_name: "流星世界演绎者",
    other_names: ["WorldActor"],
    order: 1,
    use_time: "14h13min",
    duration: {
      start: "2025-09-27",
      end: "2025-10-04",
    },
    score: {
      story: 7,
      visual: 5.2,
      program: 3,
    },
  },
  {
    name: "流星·世界演绎者 Badge & Dagger",
    valid_name: "流星世界演绎者",
    other_names: ["WorldActor"],
    order: 2,
    use_time: "4h29min",
    duration: {
      start: "2025-09-20",
      end: "2025-09-27",
    },
    score: {
      story: 5.1,
      visual: 5,
      program: 3,
    },
  },
  {
    name: "美少女万华镜5-理与迷宫的少女",
    valid_name: "美少女万华镜",
    other_names: ["美少女万華鏡"],
    order: 5,
    use_time: "6h52min",
    duration: {
      start: "2025-09-15",
      end: "2025-09-27",
    },
    score: {
      story: 7.4,
      visual: 6.2,
      program: 7,
    },
  },
  {
    name: "AIR",
    playing_status: PlayingStatus.PLAYING,
    use_time: "-2min",
    duration: {
      start: "2025-09-12",
    },
  },
  {
    name: "美少女万华镜4-罪与罚的少女",
    valid_name: "美少女万华镜",
    other_names: ["美少女万華鏡"],
    use_time: "4h36min",
    order: 4,
    duration: {
      start: "2025-09-09",
      end: "2025-09-14",
    },
    score: {
      story: 6.7,
      visual: 6.2,
      program: 6.2,
    },
  },
  {
    name: "赫雷斯的角斗场",
    order: 1,
    not_strict: true,
    use_time: "1h24min",
    duration: {
      start: "2025-09-06",
      end: "2025-09-06",
    },
    score: {
      story: 0,
      visual: 6.7,
      program: 3.5,
    },
  },
  {
    name: "美少女万华镜3-神明所创造的少女们",
    valid_name: "美少女万华镜",
    other_names: ["美少女万華鏡"],
    use_time: "4h44min",
    order: 3,
    duration: {
      start: "2025-09-03",
      end: "2025-09-09",
    },
    score: {
      story: 6,
      visual: 6.4,
      program: 6.8,
    },
  },
  {
    name: "美少女万华镜2-勿忘草与永远的少女",
    valid_name: "美少女万华镜",
    other_names: ["美少女万華鏡"],
    use_time: "1h48min",
    order: 2,
    duration: {
      start: "2025-09-01",
      end: "2025-09-03",
    },
    score: {
      story: 6.6,
      visual: 5.8,
      program: 7.4,
    },
  },
  {
    name: "春音Alice＊Gram",
    valid_name: "春音AliceGram",
    order: 1,
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2025-08-30",
    },
  },
  {
    name: "美少女万华镜1-被诅咒之传说少女",
    valid_name: "美少女万华镜",
    other_names: ["美少女万華鏡"],
    use_time: "2h2min",
    order: 1,
    duration: {
      start: "2025-08-30",
      end: "2025-09-01",
    },
    score: {
      story: 2.4,
      visual: 6.1,
      program: 6.8,
    },
  },
  {
    name: "スターライトBLUE～幼なじみで推しの娘が知らないうちに開発されていた～",
    use_time: "1h52min",
    valid_name: "starlightblue",
    other_names: ["starlight blue"],
    namaniku: true,
    duration: {
      start: "2025-08-29",
      end: "2025-08-30",
    },
    score: {
      story: 1.7,
      visual: 8.7,
      program: 2.5,
    },
  },
  {
    name: "Deep One",
    valid_name: "DeepOne",
    other_names: ["Deep One -ディープワン"],
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2025-08-22",
    },
  },
  {
    name: "星辰密文",
    other_names: ["StellarCode"],
    all_ages: true,
    use_time: "2h44min",
    duration: {
      start: "2025-08-16",
      end: "2025-08-16",
    },
    score: {
      story: 9.7,
      visual: 8.3,
      program: 7.6,
    },
  },
  {
    name: "挑战勇者试炼时被诱惑的我",
    use_time: "4h37min",
    not_strict: true,
    duration: {
      start: "2025-08-11",
      end: "2025-08-12",
    },
    score: {
      story: 2,
      visual: 9.1,
      program: 3.5,
    },
  },
  {
    name: "猫忍之心",
    order: 2,
    other_names: ["猫忍えくすはーと", "NEKO-NIN"],
    use_time: "1h28min",
    duration: {
      start: "2025-08-09",
      end: "2025-08-22",
    },
    score: {
      story: 1.5,
      visual: 9.7,
      program: 3,
    },
  },
  {
    name: "猫忍之心",
    order: 1,
    other_names: ["猫忍えくすはーと", "NEKO-NIN"],
    use_time: "1h18min",
    duration: {
      start: "2025-08-08",
      end: "2025-08-09",
    },
    score: {
      story: 2.6,
      visual: 9.4,
      program: 3,
    },
  },
  {
    name: "ISLAND",
    all_ages: true,
    nth_time: 2,
    use_time: ">10h",
    duration: {
      start: "2025-07-02",
      end: "2025-08-01",
    },
    score: {
      story: 13,
      visual: 7.8,
      program: 2,
    },
  },
  {
    name: "白日梦的构想图",
    other_names: ["白昼夢の青写真"],
    use_time: "9h9min",
    duration: {
      start: "2025-06-30",
      end: "2025-08-16",
    },
    score: {
      story: 8.4,
      visual: 4.7,
      program: 7.9,
    },
  },
  {
    name: "NEKOPARA After",
    other_names: ["草猫", "巧克力与香子兰", "猫娘乐园", "ネコぱら"],
    valid_name: "NEKOPARAAfter",
    order: 6,
    use_time: "1h30min",
    duration: {
      start: "2025-06-21",
      end: "2025-06-27",
    },
    score: {
      story: 1.4,
      visual: 9.9,
      program: 6,
    },
  },
  {
    name: "大图书馆的牧羊人",
    other_names: ["大図書館の羊飼い"],
    valid_name: "大图书馆的牧羊人",
    use_time: "17h5min",
    order: 1,
    duration: {
      start: "2025-06-12",
      end: "2025-07-02",
    },
    score: {
      story: 4.3,
      visual: 7.8,
      program: 5.9,
    },
  },
  {
    name: "大图书馆的牧羊人 -Dreaming Sheep-",
    other_names: ["大図書館の羊飼い -Dreaming Sheep-"],
    valid_name: "大图书馆的牧羊人",
    playing_status: PlayingStatus.PAUSED,
    order: 2,
    duration: {
      start: "2025-06-12",
    },
  },
  {
    name: "心之形心之色心之声",
    other_names: ["ココロのカタチとイロとオト"],
    use_time: "1h52min",
    duration: {
      start: "2025-06-09",
      end: "2025-06-10",
    },
    score: {
      story: 3.4,
      visual: 9,
      program: 9.3,
    },
  },
  {
    name: "装甲恶鬼村正",
    other_names: ["装甲悪鬼村正"],
    use_time: "45h19min",
    duration: {
      start: "2025-05-22",
      end: "2025-06-26",
    },
    score: {
      story: 10.6,
      visual: 2.5,
      program: 0,
    },
  },
  {
    name: "终之空Remake",
    other_names: ["終ノ空 remake"],
    use_time: "6h35min",
    duration: {
      start: "2025-05-13",
      end: "2025-05-14",
    },
    score: {
      story: 7.3,
      visual: 5.8,
      program: 4.3,
    },
  },
  {
    name: "ジュエリー・ハーツ・アカデミア -We will wing wonder world-",
    valid_name: "JewelryHeartsAcademia",
    other_names: ["宝石心学院"],
    playing_status: PlayingStatus.PLAYING,
    use_time: "-2min",
    duration: {
      start: "2025-04-30",
    },
    namaniku: true,
  },
  {
    name: "Butterfly Seeker",
    valid_name: "ButterflySeeker",
    other_names: ["寻蝶者"],
    use_time: "12h29min",
    duration: {
      start: "2025-04-22",
      end: "2025-05-03",
    },
    score: {
      story: 9.5,
      visual: 5.6,
      program: 4.5,
    },
  },
  {
    name: "想要传达给你的爱恋",
    other_names: ["恋×シンアイ彼女"],
    use_time: "12h18min",
    duration: {
      start: "2025-04-16",
      end: "2025-04-24",
    },
    score: {
      story: 8.8,
      visual: 7,
      program: 3,
    },
  },
  {
    name: "きまぐれテンプテーション",
    other_names: ["异想魅惑"],
    intense: true,
    use_time: "4h19min",
    order: 1,
    duration: {
      start: "2025-04-12",
      end: "2025-04-18",
    },
    score: {
      story: 7.7,
      visual: 9.5,
      program: 5.4,
    },
  },
  {
    name: "NOIR:NOAH",
    valid_name: "NOIRNOAH",
    not_strict: true,
    intense: true,
    use_time: "1h1min",
    duration: {
      start: "2025-04-11",
      end: "2025-04-11",
    },
    score: {
      story: 6.3,
      visual: 6,
      program: 6.8,
    },
  },
  {
    name: "千の刃涛、桃花染の皇姫",
    other_names: ["千之刃涛、桃花染之皇姬"],
    valid_name: "千の刃涛桃花染の皇姫",
    use_time: "13h48min",
    duration: {
      start: "2025-03-28",
      end: "2025-05-13",
    },
    score: {
      story: 5.1,
      visual: 7.2,
      program: 8.7,
    },
  },
  {
    name: "旭光のマリアージュ",
    other_names: ["旭光的婚礼"],
    namaniku: true,
    use_time: "21h29min",
    duration: {
      start: "2025-03-23",
      end: "2025-11-15",
    },
    score: {
      story: 6.8,
      visual: 6.5,
      program: 7.8,
    },
  },
  {
    name: "女祭司之眼",
    not_strict: true,
    url: "https://t.me/Alice_In_Cradle/29369",
    use_time: "<50min>",
    duration: {
      start: "2025-03-12",
      end: "2025-03-12",
    },
    score: {
      story: 0.1,
      visual: 2.7,
      program: 0,
    },
  },
  {
    name: "はるまで、くるる。",
    other_names: ["春开，意遥遥"],
    valid_name: "はるまでくるる",
    order: 1,
    use_time: "-1min",
    duration: {
      start: "2025-03-06",
      end: "2025-07-04",
    },
    score: {
      story: 7.1,
      visual: 4.8,
      program: 0,
    },
  },
  {
    name: "淫獄の8番街・少女探偵ミオリの怪異ノート",
    other_names: ["淫狱的8番街·少女侦探美织的怪异笔记"],
    valid_name: "淫獄の8番街少女探偵ミオリの怪異ノート",
    not_strict: true,
    url: "https://t.me/absolutexsresource/21",
    use_time: "<30min>",
    duration: {
      start: "2025-03-05",
      end: "2025-03-05",
    },
    score: {
      story: 0,
      visual: 8.3,
      program: 2.7,
    },
  },
  {
    name: "FLIP * FLOP ~RAMBLING OVERRUN~",
    valid_name: "FLIPFLOP2",
    order: 2,
    use_time: "4h28min",
    duration: {
      start: "2025-03-01",
      end: "2025-03-03",
    },
    score: {
      story: 2,
      visual: 11,
      program: 8,
    },
  },
  {
    name: "玉响未来",
    other_names: ["タマユラミライ"],
    use_time: "12h1min",
    duration: {
      start: "2025-02-23",
      end: "2025-05-27",
    },
    score: {
      story: 4.5,
      visual: 9.6,
      program: 8.8,
    },
  },
  {
    name: "廢村少女~誘惑迷離的籠之鄉~",
    other_names: ["废村少女~诱惑迷离的笼之乡~"],
    valid_name: "廢村少女1",
    order: 1,
    use_time: "12h53min",
    duration: {
      start: "2025-02-16",
      end: "2025-03-01",
    },
    score: {
      story: 8.2,
      visual: 7.9,
      program: 7,
    },
  },
  {
    name: "禁亲圣交苏菈",
    other_names: ["禁親聖交スゥラ～実娘ロリオナホ誘い受けADV～"],
    use_time: "16min",
    duration: {
      start: "2025-02-14",
      end: "2025-02-14",
    },
    score: {
      story: 0,
      visual: 4.4,
      program: 1.3,
    },
  },
  {
    name: "天使☆嚣嚣RE-BOOT!",
    other_names: ["天使☆騒々RE-BOOT!"],
    use_time: "21h47min",
    duration: {
      start: "2025-01-27",
      end: "2025-02-21",
    },
    score: {
      story: 4.9,
      visual: 9.5,
      program: 9.5,
    },
  },
  {
    name: "空に刻んだパラレログラム",
    other_names: ["印刻天际的Parallelogram"],
    use_time: "15h53min",
    duration: {
      start: "2025-01-21",
      end: "2025-04-10",
    },
    score: {
      story: 4.3,
      visual: 3.1,
      program: 0.8,
    },
  },
  {
    name: "魔法使之夜",
    other_names: ["魔法使いの夜"],
    all_ages: true,
    use_time: "11h20min",
    duration: {
      start: "2025-01-17",
      end: "2025-02-08",
    },
    score: {
      story: 6,
      visual: 9,
      program: 6.5,
    },
  },
  {
    name: "圣女不死心",
    other_names: [
      "圣女不死心～不受欢迎形单影只的死灵法师转生成为圣女，努力结交新的朋友～",
      "ホーリーアンデッド～非モテでぼっちの死霊術士が、聖女に転生してお友達を増やします～",
    ],
    all_ages: true,
    use_time: "4h23min",
    duration: {
      start: "2025-01-16",
      end: "2025-01-16",
    },
    score: {
      story: 5,
      visual: 9.8,
      program: 8,
    },
  },
  {
    name: "転性魔王さまは勇者に勝てない！",
    other_names: ["性转魔王敌不过勇者"],
    valid_name: "転性魔王さまは勇者に勝てない",
    namaniku: true,
    use_time: "5h47min",
    duration: {
      start: "2025-01-01",
      end: "2025-01-21",
    },
    score: {
      story: 3.8,
      visual: 7.4,
      program: 7,
    },
  },
  {
    name: "eden* PLUS + MOSAIC",
    valid_name: "edenPlusMosaic",
    use_time: "9h35min",
    duration: {
      start: "2024-12-23",
      end: "2025-01-06",
    },
    score: {
      story: 5.8,
      visual: 3.5,
      program: 3.2,
    },
  },
  {
    name: "奇异恩典 -What color is your attribute?-",
    other_names: ["Amazing Grace", "アメイジング・グレイス -What color is your attribute?-"],
    valid_name: "奇异恩典Whatcolorisyourattribute",
    use_time: "21h3min",
    duration: {
      start: "2024-12-20",
      end: "2025-01-12",
    },
    score: {
      story: 9.6,
      visual: 8.9,
      program: 6.4,
    },
  },
  {
    name: "青鸟",
    other_names: ["アオイトリ"],
    use_time: "12h58min",
    duration: {
      start: "2024-11-17",
      end: "2025-03-06",
    },
    score: {
      story: 5.9,
      visual: 5.5,
      program: 5.5,
    },
  },
  {
    name: "戦巫＜センナギ＞ ―穢れた契りと神ころも―",
    valid_name: "戦巫センナギ穢れた契りと神ころも",
    not_strict: true,
    namaniku: true,
    use_time: "20h41min",
    duration: {
      start: "2024-10-31",
      end: "2025-04-11",
    },
    score: {
      story: 7,
      visual: 7.6,
      program: 7,
    },
  },
  {
    name: "サクラノ刻 -櫻の森の下を歩む-",
    other_names: ["樱之刻 －在樱花之森下漫步－"],
    valid_name: "サクラノ刻櫻の森の下を歩む",
    namaniku: true,
    use_time: "47h52min",
    order: 2,
    duration: {
      start: "2024-10-11",
      end: "2025-06-10",
    },
    score: {
      story: 6.4,
      visual: 8,
      program: 7.9,
    },
  },
  {
    name: "五彩斑斓的世界",
    other_names: ["いろとりどりのセカイ"],
    order: 1,
    use_time: "23h17min",
    duration: {
      start: "2024-07-20",
      end: "2025-04-20",
    },
    score: {
      story: 8.9,
      visual: 8.2,
      program: 9.1,
    },
  },
  {
    name: "無限煉姦～恥辱にまみれし不死姫の輪舞～",
    other_names: ["无限炼奸~不死舞姬的凌辱轮舞曲~"],
    valid_name: "無限煉姦恥辱にまみれし不死姫の輪舞",
    use_time: "6h48min",
    duration: {
      start: "2024-01-24",
      end: "2025-06-28",
    },
    score: {
      story: 6.2,
      visual: 0,
      program: 1.2,
    },
  },

  {
    name: "アンレス テルミナリア",
    other_names: ["Unless Terminalia"],
    valid_name: "アンレステルミナリア",
    namaniku: true,
    use_time: "+3h",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2023-05-11",
    },
    score: {
      story: 3.7,
      visual: 9.4,
      program: 8,
    },
  },
  {
    name: "KARAKARA",
    playing_status: PlayingStatus.PAUSED,
    duration: {
      start: "2021-08-25",
    },
    score: {
      story: 3.3,
      visual: 5,
      program: 6.5,
    },
  },
  {
    name: "千恋＊万花",
    valid_name: "千恋万花",
    playing_status: PlayingStatus.PAUSED,
    duration: {
      start: "2021-06-21",
    },
    score: {
      story: 6.1,
      visual: 8.5,
      program: 9,
    },
  },
  {
    name: "少女＊领域",
    other_names: ["オトメ＊ドメイン"],
    valid_name: "少女领域",
    use_time: "-",
    duration: {
      start: "2020-10-29",
      end: "2024-05-12",
    },
    score: {
      story: 4.2,
      visual: 8.2,
      program: 8,
    },
  },
  {
    name: "恶魔石板与被诅咒的犬公主",
    use_time: "2h29min",
    not_strict: true,
    duration: {
      start: "2024-12-29",
      end: "2024-12-30",
    },
    score: {
      story: 1.3,
      visual: 4.9,
      program: 4.5,
    },
  },
  {
    name: "FLIP＊FLOP ~INNOCENCE OVERCLOCK~",
    valid_name: "FLIPFLOP1",
    order: 1,
    use_time: "5h55min",
    score: {
      story: 2.6,
      visual: 10.2,
      program: 8,
    },
    duration: {
      start: "2024-12-12",
      end: "2024-12-18",
    },
  },
  {
    name: "流景之海的艾佩理雅",
    other_names: ["景の海のアペイリア"],
    use_time: "26h35min",
    score: {
      story: 10,
      visual: 4.2,
      program: 4,
    },
    duration: {
      start: "2024-11-22",
      end: "2024-12-11",
    },
  },
  {
    name: "LUNARiA",
    all_ages: true,
    use_time: "4h49min",
    score: {
      story: 8.3,
      visual: 8,
      program: 7.7,
    },
    duration: {
      start: "2024-11-08",
      end: "2024-11-16",
    },
  },
  {
    name: "变态监狱",
    other_names: ["ヘンタイ・プリズン"],
    use_time: "45h53min",
    score: {
      story: 9.3,
      visual: 5.3,
      program: 7,
    },
    duration: {
      start: "2024-09-18",
      end: "2024-11-03",
    },
  },
  {
    name: "苍之彼方的四重奏 EXTRA1",
    other_names: ["蒼の彼方のフォーリズムEXTRA1"],
    valid_name: "苍之彼方的四重奏EXTRA1",
    use_time: "4h39min",
    order: 2,
    score: {
      story: 1.2,
      visual: 6.6,
      program: 8,
    },
    duration: {
      start: "2024-09-15",
      end: "2024-10-31",
    },
  },
  {
    name: "流る星 -a Wish Star-",
    other_names: ["流星"],
    valid_name: "流る星aWishStar",
    namaniku: true,
    use_time: "5h27min",
    score: {
      story: 5.8,
      visual: 8.7,
      program: 4,
    },
    duration: {
      start: "2024-09-27",
      end: "2024-10-10",
    },
  },
  {
    name: "聖光天使マリア 悪堕ち連鎖・狂い咲き",
    valid_name: "聖光天使マリア悪堕ち連鎖狂い咲き",
    url: "https://t.me/absolutexsresource/14",
    use_time: "2h10min",
    score: {
      story: 0.2,
      visual: 6.6,
      program: 9,
    },
    duration: {
      start: "2024-09-25",
      end: "2024-09-27",
    },
  },
  {
    name: "未来广播与人工鸽",
    other_names: ["未来ラジオと人工鳩"],
    use_time: "12h4min",
    score: {
      story: 6.8,
      visual: 5.2,
      program: 7,
    },
    duration: {
      start: "2024-08-31",
      end: "2024-09-14",
    },
  },
  {
    name: "LOOPERS",
    other_names: ["时廻者"],
    all_ages: true,
    use_time: "6h7min",
    score: {
      story: 8.2,
      visual: 7,
      program: 8,
    },
    duration: {
      start: "2024-08-24",
      end: "2024-08-25",
    },
  },
  {
    name: "家喵二三事",
    other_names: ["ウチのペット事情"],
    use_time: "8h56min",
    score: {
      story: 2.9,
      visual: 7,
      program: 2.5,
    },
    duration: {
      start: "2023-08-10",
      end: "2024-08-24",
    },
  },
  {
    name: "GINKA",
    all_ages: true,
    use_time: ">6h45min",
    score: {
      story: 7.8,
      visual: 8.7,
      program: 9.9,
    },
    duration: {
      start: "2024-06-26",
      end: "2024-07-20",
    },
  },
  {
    name: "战国兰斯",
    other_names: ["戦国ランス"],
    not_strict: true,
    use_time: "11h27min",
    order: 7,
    score: {
      story: 4.7,
      visual: 2,
      program: 2,
    },
    duration: {
      start: "2024-03-30",
      end: "2024-06-04",
    },
  },
  {
    name: "铃色记忆",
    url: "https://hoshinasuzu.cc/suzu-memory/",
    all_ages: true,
    use_time: "<20min>",
    score: {
      story: 3,
      visual: 8,
      program: 1.6,
    },
    duration: {
      start: "2024-05-30",
      end: "2024-05-30",
    },
  },
  {
    name: "饿殍：明末千里行",
    valid_name: "饿殍明末千里行",
    all_ages: true,
    use_time: "5h52min",
    score: {
      story: 9,
      visual: 8.5,
      program: 7.6,
    },
    duration: {
      start: "2024-05-14",
      end: "2024-05-21",
    },
  },
  {
    name: "月之少女、河中天使、成神之刻。",
    valid_name: "月之少女河中天使成神之刻",
    use_time: "3h3min",
    score: {
      story: 5,
      visual: 5.6,
      program: 4.7,
    },
    duration: {
      start: "2024-05-12",
      end: "2024-05-14",
    },
  },
  {
    name: "死に逝く君、館に芽吹く憎悪",
    other_names: ["濒死轮回的卿于馆中萌生的憎恶", "死馆"],
    valid_name: "死に逝く君館に芽吹く憎悪",
    intense: true,
    use_time: "7h9min",
    order: 1,
    score: {
      story: 3.6,
      visual: 5.2,
      program: 6.7,
    },
    duration: {
      start: "2024-04-26",
      end: "2024-05-12",
    },
  },
  {
    name: "抜きゲーみたいな島に住んでる貧乳はどうすりゃいいですか？",
    other_names: ["住在拔作岛上的贫乳应该如何是好？", "ぬきたし"],
    valid_name: "抜きゲーみたいな島に住んでる貧乳はどうすりゃいいですか2",
    use_time: "30h20min",
    order: 2,
    score: {
      story: 5.2,
      visual: 5.3,
      program: 2.4,
    },
    duration: {
      start: "2024-02-16",
      end: "2024-05-10",
    },
  },
  {
    name: "拾われ愛して奉仕したい ～亜人娘とのイチャエロ生活",
    valid_name: "拾われ愛して奉仕したい亜人娘とのイチャエロ生活",
    other_names: ["捡到亚人少女~开启幸福生活~"],
    use_time: "43min",
    score: {
      story: 2,
      visual: 5.7,
      program: 5.3,
    },
    duration: {
      start: "2024-04-25",
      end: "2024-04-25",
    },
  },
  {
    name: "樱之诗-在樱花之森上飞舞-",
    other_names: ["サクラノ詩 -櫻の森の上を舞う-"],
    valid_name: "樱之诗",
    use_time: "50h",
    order: 1,
    score: {
      story: 9.8,
      visual: 8.5,
      program: 3.7,
    },
    duration: {
      start: "2024-02-25",
      end: "2024-04-21",
    },
  },
  {
    name: "枯れない世界と終わる花",
    other_names: ["永不枯萎的世界与终结之花"],
    use_time: "9h44min",
    score: {
      story: 5.7,
      visual: 10,
      program: 6.2,
    },
    duration: {
      start: "2024-02-13",
      end: "2024-02-22",
    },
  },
  {
    name: "天津罪",
    other_names: ["アマツツミ"],
    use_time: "18h26min",
    score: {
      story: 6.7,
      visual: 5.5,
      program: 7.8,
    },
    duration: {
      start: "2024-01-31",
      end: "2024-02-12",
    },
  },
  {
    name: "神聖昂燐ダクリュオン・ルナ",
    valid_name: "神聖昂燐ダクリュオンルナ",
    use_time: "20h26min",
    namaniku: true,
    order: 3,
    score: {
      story: 2.9,
      visual: 4.1,
      program: 2.7,
    },
    duration: {
      start: "2023-11-18",
      end: "2024-02-06",
    },
  },
  {
    name: "提早绽放的黑百合",
    other_names: ["早咲きのくろゆり"],
    all_ages: true,
    use_time: "14h28min",
    score: {
      story: 8.1,
      visual: 9.9,
      program: 9.1,
    },
    duration: {
      start: "2024-01-22",
      end: "2024-01-30",
    },
  },
  {
    name: "秽翼的尤斯蒂娅",
    other_names: ["穢翼のユースティア"],
    use_time: "37h26min?",
    score: {
      story: 10.2,
      visual: 7.5,
      program: 0.5,
    },
    duration: {
      start: "2024-01-05",
      end: "2024-01-24",
    },
  },
  {
    name: "初雪樱",
    other_names: ["はつゆきさくら"],
    use_time: "25h28min",
    score: {
      story: 8.6,
      visual: 7.6,
      program: 7.5,
    },
    duration: {
      start: "2023-12-06",
      end: "2023-12-22",
    },
  },
  {
    name: "樱色之云 * 绯色之恋",
    other_names: ["さくらの雲＊スカアレットの恋"],
    valid_name: "樱色之云绯色之恋",
    use_time: "27h22min",
    score: {
      story: 8.6,
      visual: 9.6,
      program: 5.9,
    },
    duration: {
      start: "2023-10-27",
      end: "2023-12-19",
    },
  },
  {
    name: "近月少女的礼仪",
    other_names: ["月に寄りそう乙女の作法"],
    use_time: "67h58min",
    order: 1,
    score: {
      story: 4,
      visual: 5.5,
      program: 6,
    },
    duration: {
      start: "2023-04-23",
      end: "2023-11-26",
    },
  },
  {
    name: "君と彼女と彼女の恋",
    other_names: ["君与彼女与彼女之恋", "君彼"],
    use_time: "10h16min",
    score: {
      story: 9.1,
      visual: 4.2,
      program: 5.4,
    },
    duration: {
      start: "2023-08-04",
      end: "2023-10-26",
    },
  },
  {
    name: "牛顿与苹果树",
    other_names: ["ニュートンと林檎の樹"],
    use_time: "18h9min",
    score: {
      story: 9.2,
      visual: 6,
      program: 2,
    },
    duration: {
      start: "2023-10-03",
      end: "2023-10-25",
    },
  },
  {
    name: "兰斯5D",
    other_names: ["ランス5D -ひとりぼっちの女の子"],
    not_strict: true,
    use_time: "2h25min",
    order: 5,
    score: {
      story: 2,
      visual: 3,
      program: 4.6,
    },
    duration: {
      start: "2023-10-10",
      end: "2023-10-10",
    },
  },
  {
    name: "哥哥，早上起床之前都要抱紧我哦！",
    other_names: ["お兄ちゃん、朝までずっとギュッてして！"],
    valid_name: "哥哥早上起床之前都要抱紧我哦",
    use_time: ">11h",
    order: 1,
    score: {
      story: 2,
      visual: 8.2,
      program: 9,
    },
    duration: {
      start: "2021-02-13",
      end: "2023-09-25",
    },
  },
  {
    name: "兰斯03",
    other_names: ["ランス03 リーザス陥落"],
    not_strict: true,
    use_time: "27h25min",
    order: 3,
    score: {
      story: 6.3,
      visual: 9.5,
      program: 3,
    },
    duration: {
      start: "2023-09-14",
      end: "2023-09-21",
    },
  },
  {
    name: "兰斯02",
    other_names: ["ランス2 はんぎゃくのしょうじょたち"],
    not_strict: true,
    use_time: "2h10min",
    order: 2,
    score: {
      story: 2.5,
      visual: 3.3,
      program: 2,
    },
    duration: {
      start: "2023-09-13",
      end: "2023-09-14",
    },
  },
  {
    name: "兰斯01重制",
    other_names: ["ランス01 光をもとめて"],
    not_strict: true,
    use_time: "8h3min",
    order: 1,
    score: {
      story: 5.4,
      visual: 6,
      program: 4,
    },
    duration: {
      start: "2023-09-12",
      end: "2023-09-13",
    },
  },
  {
    name: "Summer Pockets Reflection Blue",
    other_names: ["SPRB", "夏日口袋"],
    valid_name: "SummerPocketsReflectionBlue",
    use_time: "49h45min",
    score: {
      story: 10.9,
      visual: 8.6,
      program: 5,
    },
    duration: {
      start: "2023-06-22",
      end: "2023-08-03",
    },
  },
  {
    name: "真愿朦幻馆〜在的洋馆里追寻明天的羔羊们〜",
    other_names: ["ゆまほろめ～時を停めた館で明日を探す迷子たち～"],
    valid_name: "真愿朦幻馆在的洋馆里追寻明天的羔羊们",
    use_time: "28h2min",
    score: {
      story: 5.7,
      visual: 7.1,
      program: 8.4,
    },
    duration: {
      start: "2022-12-02",
      end: "2023-06-28",
    },
  },
  {
    name: "抜きゲーみたいな島に住んでる貧乳はどうすりゃいいですか？",
    other_names: ["住在拔作岛上的贫乳应该如何是好？", "ぬきたし"],
    valid_name: "抜きゲーみたいな島に住んでる貧乳はどうすりゃいいですか1",
    use_time: "39h53min",
    order: 1,
    score: {
      story: 8.3,
      visual: 5.3,
      program: 0,
    },
    duration: {
      start: "2023-04-11",
      end: "2023-06-12",
    },
  },
  {
    name: "Melia's Witch Test",
    valid_name: "MeliasWitchTest",
    not_strict: true,
    use_time: "46min",
    score: {
      story: 0,
      visual: 3,
      program: 0.1,
    },
    duration: {
      start: "2023-06-07",
      end: "2023-06-07",
    },
  },
  {
    name: "ご主人様、セイラに夢みたいないちゃラブご奉仕させていただけますか",
    other_names: ["为主人献上圣罗的甜蜜侍奉"],
    valid_name: "ご主人様セイラに夢みたいないちゃラブご奉仕させていただけますか",
    use_time: "3h10min",
    score: {
      story: 2.4,
      visual: 9.4,
      program: 1,
    },
    duration: {
      start: "2023-05-27",
      end: "2023-05-27",
    },
  },
  {
    name: "NEKOPARA vol.4 ネコとパティシエのノエル",
    other_names: ["草猫", "巧克力与香子兰", "猫娘乐园", "ネコぱら"],
    valid_name: "NEKOPARAvol4ネコとパティシエのノエル",
    use_time: "8h43min",
    order: 5,
    score: {
      story: 2.5,
      visual: 9.7,
      program: 0.4,
    },
    duration: {
      start: "2023-03-11",
      end: "2023-05-10",
    },
  },
  {
    name: "melancholianna",
    url: "https://melancholianna.pages.dev/",
    not_strict: true,
    use_time: "30min?",
    score: {
      story: 0,
      visual: 5,
      program: 0.3,
    },
    duration: {
      start: "2023-04-22",
      end: "2023-04-22",
    },
  },
  {
    name: "終のステラ",
    other_names: ["星之终途"],
    all_ages: true,
    use_time: "8h15min",
    score: {
      story: 9.2,
      visual: 8.3,
      program: 8.5,
    },
    duration: {
      start: "2023-04-09",
      end: "2023-04-22",
    },
  },
  {
    name: "ISLAND",
    all_ages: true,
    use_time: "29h43min",
    score: {
      story: 13,
      visual: 7.8,
      program: 3.8,
    },
    duration: {
      start: "2023-01-07",
      end: "2023-04-08",
    },
  },
  {
    name: "竜姫ぐーたらいふ3",
    other_names: ["龙姬混~日子3"],
    use_time: "5h50min",
    order: 4,
    score: {
      story: 2.8,
      visual: 10,
      program: 6,
    },
    duration: {
      start: "2023-03-30",
      end: "2023-04-04",
    },
  },
  {
    name: "竜姫ぐーたらいふLOVE+PLUS",
    other_names: ["龙姬混~日子LOVE+PLUS"],
    valid_name: "竜姫ぐーたらいふLOVEPLUS",
    use_time: "2h59min",
    order: 2,
    score: {
      story: 2,
      visual: 9,
      program: 6,
    },
    duration: {
      start: "2023-03-25",
      end: "2023-03-28",
    },
  },
  {
    name: "水葬銀貨のイストリア",
    other_names: ["水葬银币的伊斯特里亚", "水葬银货"],
    use_time: "43h6min",
    score: {
      story: 8.2,
      visual: 7.3,
      program: 3,
    },
    duration: {
      start: "2023-02-08",
      end: "2023-03-26",
    },
  },
  {
    name: "NekoMiko",
    other_names: ["神社里的猫巫女"],
    use_time: "5h47min",
    score: {
      story: 3.2,
      visual: 9.8,
      program: 4,
    },
    duration: {
      start: "2023-02-03",
      end: "2023-02-06",
    },
  },
  {
    name: "仰望夜空的星辰",
    other_names: ["見上げてごらん、夜空の星を"],
    use_time: "<39h40min>",
    order: 1,
    score: {
      story: 8.9,
      visual: 5.7,
      program: 4.5,
    },
    duration: {
      start: "2022-10-18",
      end: "2023-02-02",
    },
  },
  {
    name: "魔女的夜宴",
    other_names: ["サノバウィッチ"],
    use_time: "-",
    score: {
      story: 7.6,
      visual: 7.9,
      program: 9.3,
    },
    duration: {
      start: "2022-02-10",
      end: "2023-01-27",
    },
  },
  {
    name: "Fox Hime",
    other_names: ["狐姬"],
    use_time: "29min",
    order: 1,
    score: {
      story: 0.4,
      visual: 4.6,
      program: 0,
    },
    duration: {
      start: "2023-01-15",
      end: "2023-01-15",
    },
    valid_name: "FoxHime",
  },
  {
    name: "PARQUET",
    all_ages: true,
    use_time: "8h38min",
    score: {
      story: 6.1,
      visual: 9,
      program: 10,
    },
    duration: {
      start: "2023-01-03",
      end: "2023-01-07",
    },
  },
  {
    name: "常轨脱离Creative",
    other_names: ["ハミダシクリエイティブ"],
    use_time: "<45h14min>",
    order: 1,
    score: {
      story: 3,
      visual: 9.7,
      program: 0,
    },
    duration: {
      start: "2022-10-04",
      end: "2022-12-30",
    },
  },
  {
    name: "euphoria",
    intense: true,
    use_time: "23h17min",
    score: {
      story: 9.6,
      visual: 4,
      program: 3.2,
    },
    duration: {
      start: "2022-12-06",
      end: "2022-12-23",
    },
  },
  {
    name: "NEKOPARA Vol.3 ネコたちのアロマティゼ",
    other_names: ["草猫", "巧克力与香子兰", "猫娘乐园", "ネコぱら"],
    valid_name: "NEKOPARAVol3ネコたちのアロマティゼ",
    use_time: "<8h11min>",
    order: 4,
    score: {
      story: 3.7,
      visual: 9,
      program: 6,
    },
    duration: {
      start: "2022-08-20",
      end: "2022-11-17",
    },
  },
  {
    name: "冥契的牧神节",
    other_names: ["冥契のルペルカリア"],
    use_time: "29h25min*",
    score: {
      story: 10.5,
      visual: 5,
      program: 2,
    },
    duration: {
      start: "2022-06-26",
      end: "2022-10-02",
    },
  },
  {
    name: "堕落ロイヤル聖処女",
    other_names: ["堕落皇家圣处女"],
    use_time: "2h2min+",
    score: {
      story: 0,
      visual: 3.7,
      program: 0,
    },
    duration: {
      start: "2022-04-27",
      end: "2022-10-01",
    },
  },
  {
    name: "七音学园-旅行部-·箱根篇",
    other_names: ["七ヶ音学園 旅行部"],
    valid_name: "七音学园旅行部箱根篇",
    all_ages: true,
    use_time: "<2h5min>",
    order: 2,
    score: {
      story: 7.5,
      visual: 9.8,
      program: 9,
    },
    duration: {
      start: "2022-09-22",
      end: "2022-09-24",
    },
  },
  {
    name: "七音学园-旅行部-·伊香保篇",
    other_names: ["七ヶ音学園 旅行部"],
    valid_name: "七音学园旅行部伊香保篇",
    all_ages: true,
    use_time: "<2h23min>",
    order: 1,
    score: {
      story: 7.7,
      visual: 9.8,
      program: 9,
    },
    duration: {
      start: "2022-09-18",
      end: "2022-09-18",
    },
  },
  {
    name: "苍之彼方的四重奏",
    other_names: ["蒼の彼方のフォーリズム"],
    use_time: "<39h50min>",
    order: 1,
    score: {
      story: 8.7,
      visual: 6.7,
      program: 8,
    },
    duration: {
      start: "2022-07-25",
      end: "2022-09-18",
    },
  },
  {
    name: "鯨神のティアスティラ",
    other_names: ["鲸神的Tearstilla"],
    use_time: "<25h47min>",
    score: {
      story: 4.2,
      visual: 7.2,
      program: 7.3,
    },
    duration: {
      start: "2022-06-21",
      end: "2022-08-20",
    },
  },
  {
    name: "9-nine-新章",
    use_time: "<4h43min>",
    order: 5,
    score: {
      story: 5,
      visual: 7,
      program: 8,
    },
    duration: {
      start: "2022-07-20",
      end: "2022-07-23",
    },
    valid_name: "9nine新章",
  },
  {
    name: "9-nine-雪色雪花雪余痕",
    other_names: ["9-nine-ゆきいろゆきはなゆきのあと"],
    valid_name: "9nine雪色雪花雪余痕",
    use_time: "<13h54min>",
    order: 4,
    score: {
      story: 10,
      visual: 7,
      program: 9,
    },
    duration: {
      start: "2022-06-08",
      end: "2022-07-05",
    },
  },
  {
    name: "星光咖啡馆与死神之蝶",
    other_names: ["喫茶ステラと死神の蝶"],
    use_time: "-",
    score: {
      story: 5.8,
      visual: 8.5,
      program: 9.5,
    },
    duration: {
      start: "2020-10-15",
      end: "2022-07-05",
    },
  },
  {
    name: "NEKOPARA Vol.2 姉妹ネコのシュクレ",
    other_names: ["草猫", "巧克力与香子兰", "猫娘乐园", "ネコぱら"],
    valid_name: "NEKOPARAVol2姉妹ネコのシュクレ",
    use_time: "-",
    order: 3,
    score: {
      story: 4,
      visual: 9,
      program: 6,
    },
    duration: {
      start: "2022-02-16",
      end: "2022-07-01",
    },
  },
  {
    name: "龍姬混~日子",
    other_names: ["竜姫ぐーたらいふ"],
    valid_name: "龍姬混日子",
    use_time: "-",
    order: 1,
    score: {
      story: 2,
      visual: 9,
      program: 6,
    },
    duration: {
      start: "2022-01-28",
      end: "2022-06-28",
    },
  },
  {
    name: "纸上魔法使",
    other_names: ["紙の上の魔法使い"],
    use_time: ">36h27min",
    score: {
      story: 11,
      visual: 7,
      program: 3,
    },
    duration: {
      start: "2022-03-22",
      end: "2022-06-20",
    },
  },
  {
    name: "9-nine-春色春恋春熙风",
    other_names: ["9-nine-はるいろはるこいはるのかぜ"],
    valid_name: "9nine春色春恋春熙风",
    use_time: "<11h46min>",
    order: 3,
    score: {
      story: 7.3,
      visual: 7,
      program: 8.5,
    },
    duration: {
      start: "2022-04-30",
      end: "2022-06-07",
    },
  },
  {
    name: "9-nine-天色天歌天籁音",
    other_names: ["9-nine-そらいろそらうたそらのおと"],
    valid_name: "9nine天色天歌天籁音",
    use_time: "-",
    order: 2,
    score: {
      story: 7.7,
      visual: 7,
      program: 8.5,
    },
    duration: {
      start: "2022-04-09",
      end: "2022-04-28",
    },
  },
  {
    name: "氤氲之白",
    other_names: ["SMOKY WHITE"],
    all_ages: true,
    use_time: "-",
    order: 1,
    score: {
      story: 1,
      visual: 4,
      program: 1,
    },
    duration: {
      start: "2022-04-19",
      end: "2022-04-19",
    },
  },
  {
    name: "9-nine-九次九日九重色",
    other_names: ["9-nine-ここのつここのかここのいろ"],
    valid_name: "9nine九次九日九重色",
    use_time: "-",
    order: 1,
    score: {
      story: 7.4,
      visual: 7.2,
      program: 8.5,
    },
    duration: {
      start: "2022-04-01",
      end: "2022-04-04",
    },
  },
  {
    name: "星空列车与白的旅行",
    other_names: ["星空鉄道とシロの旅"],
    all_ages: true,
    use_time: "-",
    score: {
      story: 10,
      visual: 9,
      program: 7,
    },
    duration: {
      start: "2022-03-08",
      end: "2022-03-11",
    },
  },
  {
    name: "仰望夜空的星辰 Interstellar Focus",
    other_names: ["見上げてごらん、夜空の星を"],
    valid_name: "仰望夜空的星辰InterstellarFocus",
    use_time: "-",
    order: 3,
    score: {
      story: 3,
      visual: 5.8,
      program: 3,
    },
    duration: {
      start: "2022-01-29",
      end: "2022-02-06",
    },
  },
  {
    name: "ATRI -My Dear Moments-",
    other_names: ["亚托莉 -我挚爱的时光-"],
    use_time: "-",
    score: {
      story: 9.3,
      visual: 9,
      program: 7,
    },
    duration: {
      start: "2022-01-02",
      end: "2022-01-28",
    },
    valid_name: "ATRIMyDearMoments",
  },
  {
    name: "龍姬混~日子2",
    other_names: ["竜姫ぐーたらいふ"],
    valid_name: "龍姬混日子2",
    use_time: "-",
    order: 3,
    score: {
      story: 2,
      visual: 10,
      program: 5,
    },
    duration: {
      start: "2021-12-23",
      end: "2022-01-27",
    },
  },
  {
    name: "NEKOPARA Vol.1 ソレイユ開店しました！",
    other_names: ["草猫", "巧克力与香子兰", "猫娘乐园", "ネコぱら"],
    valid_name: "NEKOPARAVol1ソレイユ開店しました",
    use_time: "-",
    order: 2,
    score: {
      story: 4,
      visual: 9,
      program: 6,
    },
    duration: {
      start: "2021-11-26",
      end: "2021-12-20",
    },
  },
  {
    name: "猫神大人与七颗星星",
    other_names: ["ネコ神さまと、ななつぼし"],
    use_time: "-",
    score: {
      story: 7.9,
      visual: 9.7,
    },
    duration: {
      start: "2021-11-16",
      end: "2021-11-23",
    },
  },
  {
    name: "CURE GIRL",
    use_time: "-",
    score: {
      story: 1,
      visual: 3.5,
    },
    duration: {
      start: "2021-10-10",
      end: "2021-11-08",
    },
    valid_name: "CUREGIRL",
  },
  {
    name: "NEKOPARA Vol.0 水無月ネコたちの日常！",
    other_names: ["草猫", "巧克力与香子兰", "猫娘乐园", "ネコぱら"],
    valid_name: "NEKOPARAVol0水無月ネコたちの日常",
    all_ages: true,
    use_time: "-",
    order: 1,
    score: {
      story: 3,
      visual: 9,
      program: 5,
    },
    duration: {
      start: "2021-08-14",
      end: "2021-08-15",
    },
  },
  {
    name: "真爱の百合は赤く染まる",
    other_names: ["真爱的百合被染成红色", "真爱百合"],
    intense: true,
    use_time: "-",
    score: {
      visual: 3,
    },
    duration: {
      end: "2020-10-21",
    },
  },
  {
    name: "青空下的加缪",
    other_names: ["青い空のカミュ"],
    use_time: "-",
    score: {
      story: 0,
      visual: 4.8,
    },
    duration: {
      end: "2020-10-20",
    },
  },
  {
    name: "Fox Hime Zero",
    other_names: ["狐姬"],
    valid_name: "FoxHimeZero",
    use_time: "-",
    order: 2,
    score: {
      story: 5,
      visual: 9,
    },
    duration: {
      start: "2020-08-12",
      end: "2020-08-17",
    },
  },
  {
    name: "汚部屋の姫",
    not_strict: true,
    use_time: "12min",
    score: {
      story: 4.8,
      visual: 1.3,
    },
  },
  {
    name: "バカな妹を利口にするのは俺の××だけな件について",
    other_names: ["笨蛋妹"],
    valid_name: "バカな妹を利口にするのは俺のだけな件について",
    use_time: "10min",
    score: {
      story: 0,
      visual: 1,
      program: 3,
    },
  },
  {
    name: "命に代えてもお守りします!",
    not_strict: true,
    use_time: "55min",
    score: {
      story: 2.5,
      visual: 6.6,
      program: 3.4,
    },
    valid_name: "命に代えてもお守りします",
  },
  {
    name: "借金地獄の俺が言いなり家出JKを拾った",
    not_strict: true,
    use_time: "1h36min",
    score: {
      story: 4,
      visual: 4.3,
      program: 0,
    },
  },
  {
    name: "兰斯06",
    other_names: ["ランス06 ゼス崩壊"],
    not_strict: true,
    use_time: "12h49min",
    order: 6,
    score: {
      story: 6,
      visual: 4.8,
      program: 4.5,
    },
  },
  {
    name: "主播女孩重度依赖",
    other_names: ["NEEDY GIRL OVERDOSE"],
    all_ages: true,
    not_strict: true,
    use_time: "24min",
    playing_status: PlayingStatus.STOPPED,
    duration: {
      start: "2024-12-09",
      end: "2024-12-09",
    },
    score: {
      program: 0,
    },
  },
  {
    name: "妹安利日记",
    other_names: ["ヲーターメイド妹"],
    use_time: "14min",
    playing_status: PlayingStatus.STOPPED,
    duration: {
      start: "2023-11-11",
      end: "2023-11-11",
    },
    score: {
      story: 0,
      visual: 0,
      program: 0,
    },
  },
  {
    name: "ちぇ～んじ！ ～あの娘になってクンクンペロペロ～",
    valid_name: "ちぇんじんじあの娘になってクンクンペロペロ",
    namaniku: true,
    use_time: "6h15min",
    playing_status: PlayingStatus.STOPPED,
    duration: {
      start: "2022-08-26",
    },
    score: {
      story: 1,
      visual: 1.5,
      program: 4,
    },
  },
  {
    name: "Girl Fantasy",
    valid_name: "GirlFantasy",
    use_time: "19min",
    playing_status: PlayingStatus.STOPPED,
    duration: {
      start: "2023-02-16",
      end: "2023-02-16",
    },
    score: {
      story: 0.1,
      visual: 1,
      program: 0,
    },
  },
  {
    name: "小白兔电商",
    not_strict: true,
    all_ages: true,
    playing_status: PlayingStatus.STOPPED,
  },
  {
    name: "AliceInCradle",
    not_strict: true,
    playing_status: PlayingStatus.STOPPED,
    duration: {
      start: "2023-12-09",
    },
  },
  {
    name: "心跳文学部",
    other_names: ["DDLC", "Doki Doki Literature Club!"],
    playing_status: PlayingStatus.STOPPED,
    namaniku: true,
    duration: {
      start: "2021-11-11",
    },
    score: {
      visual: 1.5,
    },
  },
];

export default original_list;
