import { GalItemInputType, PlayingStatus } from "../definition/gal_type.js";

const original_list: GalItemInputType[] = [
  {
    name: "eden* PLUS＋MOSAIC",
    valid_name: "edenPlusMosaic",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2024-12-23",
    },
  },
  {
    name: "奇异恩典 -What color is your attribute?-",
    valid_name: "奇异恩典Whatcolorisyourattribute",
    use_time: "-4min",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2024-12-20",
    },
  },
  {
    name: "青鸟",
    use_time: "-1min",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2024-11-17",
    },
  },
  {
    name: "戦巫＜センナギ＞ ―穢れた契りと神ころも―",
    valid_name: "戦巫センナギ穢れた契りと神ころも",
    namaniku: true,
    use_time: "-3min",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2024-10-31",
    },
  },
  {
    name: "サクラノ刻 -櫻の森の下を歩む-",
    valid_name: "サクラノ刻櫻の森の下を歩む",
    namaniku: true,
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2024-10-11",
    },
  },
  {
    name: "五彩斑斓的世界",
    use_time: "-1min",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2024-07-20",
    },
  },
  {
    name: "無限煉姦～恥辱にまみれし不死姫の輪舞～",
    valid_name: "無限煉姦恥辱にまみれし不死姫の輪舞",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2024-01-24",
    },
  },

  {
    name: "アンレス テルミナリア",
    valid_name: "アンレステルミナリア",
    namaniku: true,
    use_time: "+3h",
    playing_status: PlayingStatus.PLAYING,
    duration: {
      start: "2023-05-11",
    },
    score: {
      story: 4.3,
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
    name: "千恋万花",
    playing_status: PlayingStatus.PAUSED,
    duration: {
      start: "2021-06-21",
    },
    score: {
      story: 6.8,
      visual: 8.5,
      program: 9.1,
    },
  },
  {
    name: "少女领域",
    playing_status: PlayingStatus.PAUSED,
    duration: {
      start: "2020-10-29",
    },
    score: {
      story: 5,
      visual: 8.7,
      program: 8,
    },
  },
  {
    name: "FLIP＊FLOP ~INNOCENCE OVERCLOCK~",
    valid_name: "FLIPFLOPINNOCENCEOVERCLOCK",
    order: 1,
    use_time: "5h55min",
    score: {
      story: 2.4,
      visual: 10,
      program: 6.5,
    },
    duration: {
      start: "2024-12-12",
      end: "2024-12-18",
    },
  },
  {
    name: "流景之海的艾佩理雅",
    use_time: "26h35min",
    score: {
      story: 9.8,
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
    use_time: "45h53min",
    score: {
      story: 9.1,
      visual: 5,
      program: 7,
    },
    duration: {
      start: "2024-09-18",
      end: "2024-11-03",
    },
  },
  {
    name: "苍之彼方的四重奏 EXTRA1",
    use_time: "4h39min",
    order: 2,
    score: {
      story: 1.2,
      visual: 6.1,
      program: 8,
    },
    duration: {
      start: "2024-09-15",
      end: "2024-10-31",
    },
    valid_name: "苍之彼方的四重奏EXTRA1",
  },
  {
    name: "流る星 -a Wish Star-",
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
    use_time: "12h4min",
    score: {
      story: 6.8,
      visual: 5.1,
      program: 7,
    },
    duration: {
      start: "2024-08-31",
      end: "2024-09-14",
    },
  },
  {
    name: "LOOPERS",
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
    name: "月之少女、河中天使、成神之刻",
    valid_name: "月之少女河中天使成神之刻",
    use_time: "3h3min",
    score: {
      story: 5.1,
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
    valid_name: "死に逝く君館に芽吹く憎悪",
    intense: true,
    use_time: "7h9min",
    order: 1,
    score: {
      story: 3,
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
    valid_name: "抜きゲーみたいな島に住んでる貧乳はどうすりゃいいですか2",
    use_time: "30h20min",
    order: 2,
    score: {
      story: 5.1,
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
    valid_name: "拾われ愛して奉仕したい亜人娘とのイチャエロ生活",
  },
  {
    name: "樱之诗",
    use_time: "50h",
    score: {
      story: 9.8,
      visual: 8.3,
      program: 3,
    },
    duration: {
      start: "2024-02-25",
      end: "2024-04-21",
    },
  },
  {
    name: "枯れない世界と終わる花",
    use_time: "9h44min",
    score: {
      story: 6,
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
    use_time: "18h26min",
    score: {
      story: 6.5,
      visual: 5.5,
      program: 9.9,
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
      story: 2.6,
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
    use_time: "25h28min",
    score: {
      story: 9.1,
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
    valid_name: "樱色之云绯色之恋",
    use_time: "27h22min",
    score: {
      story: 8.5,
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
    use_time: "67h58min",
    order: 1,
    score: {
      story: 5,
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
    use_time: "10h16min",
    score: {
      story: 9.8,
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
    use_time: "18h9min",
    score: {
      story: 9.2,
      visual: 7,
      program: 2,
    },
    duration: {
      start: "2023-10-03",
      end: "2023-10-25",
    },
  },
  {
    name: "兰斯5D",
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
    valid_name: "真愿朦幻馆在的洋馆里追寻明天的羔羊们",
    use_time: "28h2min",
    score: {
      story: 5,
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
    valid_name: "抜きゲーみたいな島に住んでる貧乳はどうすりゃいいですか1",
    use_time: "39h53min",
    order: 1,
    score: {
      story: 8,
      visual: 5,
      program: 0,
    },
    duration: {
      start: "2023-04-11",
      end: "2023-06-12",
    },
  },
  {
    name: "Melia's Witch Test",
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
    valid_name: "MeliasWitchTest",
  },
  {
    name: "ご主人様、セイラに夢みたいないちゃラブご奉仕させていただけますか",
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
    valid_name: "NEKOPARAvol4ネコとパティシエのノエル",
  },
  {
    name: "melancholianna",
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
    all_ages: true,
    use_time: "8h15min",
    score: {
      story: 9.2,
      visual: 8.3,
      program: 9.1,
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
      program: 3.5,
    },
    duration: {
      start: "2023-01-07",
      end: "2023-04-08",
    },
  },
  {
    name: "竜姫ぐーたらいふ3",
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
    valid_name: "竜姫ぐーたらいふLOVEPLUS",
  },
  {
    name: "水葬銀貨のイストリア",
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
    use_time: "-",
    score: {
      story: 7,
      visual: 7.5,
      program: 9.3,
    },
    duration: {
      start: "2022-02-10",
      end: "2023-01-27",
    },
  },
  {
    name: "Fox Hime",
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
      story: 9.7,
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
    valid_name: "NEKOPARAVol3ネコたちのアロマティゼ",
  },
  {
    name: "冥契的牧神节",
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
    use_time: "<39h50min>",
    order: 1,
    score: {
      story: 8.8,
      visual: 6.5,
      program: 8,
    },
    duration: {
      start: "2022-07-25",
      end: "2022-09-18",
    },
  },
  {
    name: "鯨神のティアスティラ",
    use_time: "<25h47min>",
    score: {
      story: 4.2,
      visual: 7.2,
      program: 9.3,
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
      visual: 6.6,
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
    use_time: "<13h54min>",
    order: 4,
    score: {
      story: 10,
      visual: 6,
      program: 9,
    },
    duration: {
      start: "2022-06-08",
      end: "2022-07-05",
    },
    valid_name: "9nine雪色雪花雪余痕",
  },
  {
    name: "星光咖啡馆与死神之蝶",
    use_time: "-",
    score: {
      story: 5.8,
      visual: 8.5,
      program: 9.9,
    },
    duration: {
      start: "2020-10-15",
      end: "2022-07-05",
    },
  },
  {
    name: "NEKOPARA Vol.2 姉妹ネコのシュクレ",
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
    valid_name: "NEKOPARAVol2姉妹ネコのシュクレ",
  },
  {
    name: "龍姬混~日子",
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
    valid_name: "龍姬混日子",
  },
  {
    name: "纸上魔法使",
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
    valid_name: "9nine春色春恋春熙风",
    use_time: "<11h46min>",
    order: 3,
    score: {
      story: 7,
      visual: 6,
      program: 8.5,
    },
    duration: {
      start: "2022-04-30",
      end: "2022-06-07",
    },
  },
  {
    name: "9-nine-天色天歌天籁音",
    valid_name: "9nine天色天歌天籁音",
    use_time: "-",
    order: 2,
    score: {
      story: 7.5,
      visual: 6,
      program: 8.5,
    },
    duration: {
      start: "2022-04-09",
      end: "2022-04-28",
    },
  },
  {
    name: "氤氲之白",
    all_ages: true,
    use_time: "-",
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
    valid_name: "9nine九次九日九重色",
    use_time: "-",
    order: 1,
    score: {
      story: 7,
      visual: 7,
      program: 8.5,
    },
    duration: {
      start: "2022-04-01",
      end: "2022-04-04",
    },
  },
  {
    name: "星空列车与白的旅行",
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
    use_time: "-",
    order: 3,
    score: {
      story: 3,
      visual: 5,
      program: 3,
    },
    duration: {
      start: "2022-01-29",
      end: "2022-02-06",
    },
    valid_name: "仰望夜空的星辰InterstellarFocus",
  },
  {
    name: "ATRI -My Dear Moments-",
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
    valid_name: "龍姬混日子2",
  },
  {
    name: "NEKOPARA Vol.1 ソレイユ開店しました！",
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
    valid_name: "NEKOPARAVol1ソレイユ開店しました",
  },
  {
    name: "猫神大人与七颗星星",
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
    valid_name: "NEKOPARAVol0水無月ネコたちの日常",
  },
  {
    name: "真爱の百合は赤く染まる",
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
    use_time: "-",
    score: {
      story: 0,
      visual: 5,
    },
    duration: {
      end: "2020-10-20",
    },
  },
  {
    name: "Fox Hime Zero",
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
    valid_name: "FoxHimeZero",
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
    use_time: "10min",
    score: {
      story: 0,
      visual: 1,
      program: 3,
    },
    valid_name: "バカな妹を利口にするのは俺のだけな件について",
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
    all_ages: true,
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
    name: "DDLC",
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
