<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>nh-id</th>
          <th>画风</th>
          <th>剧情</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in sortedRows" :key="row.id">
          <td>
            <span v-if="!row.otherlink">
              <nhentai :id="row.id" />
            </span>
            <span v-if="row.otherlink">
              <a :href="row.otherlink" target="_blank">{{ row.id }}</a>
            </span>
            <span v-if="row.bak"> | <a :href="row.bak">bak</a></span>
            <OrderBadge v-if="row.order" :order="row.order" />
          </td>
          <td>{{ row.aScore }}</td>
          <td>{{ row.bScore }}</td>
          <td>
            <span v-if="row.info?.length < 20">{{ row.info }}</span>
            <details v-if="row.info?.length >= 20">
              <summary>点击展开</summary>
              {{ row.info }}
            </details>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import nhentai from "./nhentai.vue";
const data = [
  { id: "429153", aScore: 9.4, bScore: 4, info: "今日から悪い子。続" },
  { id: "466069", aScore: 9.6, bScore: 4, info: "今日から悪い子。", bak: "https://telegra.ph/田屋沼屋-たぬま-今日から悪い子-中国翻訳-無修正-DL版-08-01" },
  { id: "344642", aScore: 5, bScore: 7, info: "#调教", bak: "https://telegra.ph/caburibbon-caburi-sssMONO-Chinese-脸肿汉化组-12-22" },
  { id: "436994", aScore: 9.5, bScore: 5.7, info: "#纯爱" },
  { id: "302512", aScore: 6.7, bScore: 2, info: "#百合" },
  { id: "468339", aScore: 1, bScore: 8.3, info: "#凌辱" },
  { id: "350500", aScore: 8, bScore: 2, info: "#原神", bak: "https://telegra.ph/Wasabi-Mochi-Momosawa-Keqing-chan-ga-Buka-o-Shigoki-Makuru-Hon-Genshin-Impact-Chinese-山樱汉化-12-29" },
  { id: "282052", aScore: 9, bScore: 7.9, info: "#悬疑", bak: "https://telegra.ph/C96-Tayanumaya-Tanuma-Muon-no-Gyoukou-Chinese-CE家族社-01-31" },
  { id: "417168", aScore: 8, bScore: 1.3 },
  { id: "439708", aScore: 6, bScore: 0.8 },
  { id: "443482", aScore: 1.7, bScore: 9, info: "#捆绑" },
  { id: "357261", aScore: 0.3, bScore: 6, info: "#凌辱" },
  { id: "384598", aScore: 4.8, bScore: 8, info: "#后入", bak: "https://telegra.ph/Jikken-Shimasho-04-08" },
  { id: "368622", aScore: 5.6, bScore: 5, info: "#爸爸活", bak: "https://telegra.ph/Kamikadou-Ginyou-Haru-Papakatsu-hajimemashita-1joshidaisei-hen１Chinese-路人漢化-03-14" },
  { id: "389301", aScore: 4.1, bScore: 3.2, info: "#全彩", bak: "https://telegra.ph/Christmas-Festa-3-Unagiyasan-Hanamiya-Natsuka-emukano-Chinese-兔司姬漢化組-12-08" },
  { id: "436943", aScore: 4.9, bScore: 8.1, info: "#合集 #明日方舟" },
  { id: "444199", aScore: 5.7, bScore: 3.1, info: "#BA", bak: "https://telegra.ph/Morelia-Standard-Shuruban-Mutsuki-to-Futari-de--與睦月的二人時光-Blue-Archive-Chinese-homolive漢化組-2023-01-05-03-18" },
  { id: "434419", aScore: 3.4, bScore: 3.6 },
  { id: "451160", aScore: 5.5, bScore: 2 },
  { id: "415522", aScore: 9.9, bScore: 8.9, info: "#毛玉" },
  { id: "253872", aScore: 3.8, bScore: 6.8, info: "#强迫", order: 4, bak: "https://telegra.ph/C92-カナリヤバいカナリヤ-まゃ吾郎-アルマがアレコレされるのを眺める本4-神羅万象-中国翻訳-10-19" },
  { id: "248121", aScore: 9, bScore: 6, info: "#猫娘", order: 1, bak: "https://telegra.ph/234ド-イチリ-ボクの理想の異世界生活-中国語-DL版-10-19" },
  { id: "254892", aScore: 5.3, bScore: 7.4, bak: "https://telegra.ph/ぬんぬ-それいけパン工場-COMIC-BAVEL-2018年7月号-中国翻訳-DL版-10-19" },
  { id: "477905", aScore: 6, bScore: 4.3, info: "#兄妹", order: 5, bak: "https://telegra.ph/C101-NANACAN-ななかまい-妹調教日記and-more5-中国翻訳-10-16-2" },
  { id: "(ex)", aScore: 9.7, bScore: 1.5, info: "#合集 #蔚蓝档案 #全彩", otherlink: "https://exhentai.org/g/2709897/647222d154/", bak: "https://telegra.ph/殿宮-蔚藍檔案相关翻译合集-10-18-2" },
  { id: "447025", aScore: 8.4, bScore: 6, info: "#蔚蓝档案", bak: "https://telegra.ph/C101-662KB-拾次-うへぇーしょうがないなぁ-ブルーアーカイブ-中国翻訳-08-01" },
  { id: "477903", aScore: 9, bScore: 5.7 },
  { id: "303996", aScore: 8, bScore: 4.1 },
  { id: "477481", aScore: 3.7, bScore: 6.5, bak: "https://telegra.ph/Sakura-Suishou-Yozakura-Souki-Yua-Nightmare-Digital-12-06" },
  { id: "(ex)", aScore: 8.1, bScore: 5.2, info: "#毛玉", otherlink: "https://exhentai.org/g/2496083/1f34d5f4ac/", bak: "https://telegra.ph/毛玉牛乳-玉之けだま-全部君のせいだIII-中国翻訳-無修正-DL版-08-01" },
  { id: "305526", aScore: 8.9, bScore: 4.3 },
  { id: "483079", aScore: 9.6, bScore: 6.5, info: "#兽耳 #纯爱", bak: "https://telegra.ph/コミティア143-林檎のなる木-木瀬樹-麦の恩返し--学生編--中国翻訳-08-01" },
  { id: "(ex)", aScore: 3.7, bScore: 7.2, info: "#寸止", otherlink: "https://exhentai.org/g/2480501/a346125f42/", bak: "https://telegra.ph/大伴ヤキ-虎の春-COMIC-快楽天-2023年4月号-中国翻訳-DL版-08-01" },
  { id: "(ex)", aScore: 7.8, bScore: 7.6, info: "#兄妹 #睡x", otherlink: "https://exhentai.org/g/2763933/9fa25f0ef2/", bak: "https://telegra.ph/Rev3-もんちゃんrev3-寝てる時は素直-中国翻訳-DL版-12-11" },
  { id: "392293", aScore: 6.9, bScore: 7, info: "#日常崩坏", bak: "https://telegra.ph/Oomori-Tokui-Taishitsu-Bishoujo-Maniacs-夜空下的萝莉x真不可视汉化组-11-16" },
  { id: "256374", aScore: 7.2, bScore: 7.9, info: "#碧蓝航线", bak: "https://telegra.ph/COMIC114-PiyoPit-ぴよ寺むちゃ-イったらケッコンエイジャックス-アズールレーン-中国翻訳-08-03" },
  { id: "324634", aScore: 8.2, bScore: 3, info: "#猫娘", bak: "https://telegra.ph/日本ケモ耳推奨委員会-よろず-けもみみ-きゅんきゅん-中国翻訳-DL版-進行中-08-03" },
  { id: "471937", aScore: 3.4, bScore: 6.8, bak: "https://telegra.ph/天気輪-甘露アメ-イチャらぶセックスで100回イかないと出られない部屋-中国翻訳-DL版-09-06" },
  { id: "(ex)", aScore: 5.5, bScore: 3.5, info: "#户外 #纯爱", otherlink: "https://exhentai.org/g/2658913/5fde2e3101/", bak: "https://telegra.ph/東横サーフライダー-ふみー-ぼくたちとあるなつの日-中国翻訳-DL版-08-30" },
  { id: "482029", aScore: 6.3, bScore: 4, info: "#蔚蓝档案", bak: "https://telegra.ph/せんせーのアーカイブ10-七尾重工-ななお-ヒフミがいい匂いの本-ブルーアーカイブ-中国翻訳-11-18" },
  { id: "483110", aScore: 7.5, bScore: 2.8, info: "#蔚蓝档案", bak: "https://telegra.ph/ほるもんカレー-鳶村-杏山カズサ-進捗4-ブルーアーカイブ-中国翻訳-DL版-11-26" },
  { id: "468634", aScore: 3.2, bScore: 5.2, info: "#loli", bak: "https://telegra.ph/やみなべ-トライデント-123話-国語算数理科セックス-Chinese-甜族星人x草莓人山楂屋漢化-08-17" },
  { id: "462114", aScore: 8.4, bScore: 9.6, info: "#触手 #史莱姆", bak: "https://telegra.ph/tete-a-tete-夕凪ショウ-ひみつのともだち-中国翻訳-DL版---Page-1-09-18" },
  { id: "479763", aScore: 8.8, bScore: 6.1, info: "#露出 #制服", bak: "https://telegra.ph/caburibbon-caburi-SSSDI2-中国翻訳-DL版-10-30" },
  { id: "483252", aScore: 3.5, bScore: 5.6, info: "#loli #兄妹", bak: "https://telegra.ph/ふみー-にゃんにゃんぱにっく-中国翻訳-無修正-DL版-11-26-3" },
  { id: "486039", aScore: 4.2, bScore: 2.1, info: "#兄妹", bak: "https://telegra.ph/starry-calm-鈴凪りか-お兄ちゃんは妹を躾けたい-中国翻訳-12-09" },
  { id: "465141", aScore: 4.3, bScore: 5.1, info: "#蔚蓝档案" },
  { id: "440308", aScore: 5.5, bScore: 4.1, info: "#蔚蓝档案" },
  { id: "479895", aScore: 7.8, bScore: 6, info: "#蔚蓝档案" },
  { id: "443893", aScore: 8.2, bScore: 9.5, info: "#触手 #魔法少女" },
  { id: "other", aScore: 8.8, bScore: 7.5, info: "#兄妹", otherlink: "https://www.wnacg.com/photos-index-aid-182273.html" },
  { id: "not found", aScore: 3.6, bScore: 8, info: "#强制", otherlink: "https://telegra.ph/Aomushi-Papakatsu-COMIC-Shitsurakuten-2022-06-Chinese-大鸟可不敢乱转汉化-Digital-05-27" },
  { id: "(ex)", aScore: 9.8, bScore: 3.2, info: "#泳衣 #loli", otherlink: "https://exhentai.org/g/2778492/3866aca117/", bak: "https://telegra.ph/C102-CANVASGARDEN-宮坂みゆ-あついひはすくみずで-中国翻訳-12-26" },
  { id: "(ex)", aScore: 6.8, bScore: 7.1, info: "#百合 #媚药", otherlink: "https://exhentai.org/g/2775184/d9fb0c8ea1/", bak: "https://telegra.ph/桜ゆう-桜ゆう-返り討ち百合セクス2-中国翻訳-12-24" },
  { id: "418196", aScore: 4.3, bScore: 4, info: "幼女先輩", bak: "https://telegra.ph/Grand-lemon-Tonari-Youjo-Senpai-20-omorashi-hen-Chinese-柠檬茶汉化组-Digital-04-21" },
  { id: "(ex)", aScore: 8.9, bScore: 9, info: "#女仆 #强迫 #巨乳 #全彩", otherlink: "https://exhentai.org/g/2769498/16481904c1/", bak: "https://telegra.ph/富士やま-籠絡令嬢メイド堕ち-12-17-3" },
  { id: "487758", aScore: 6.2, bScore: 8, info: "#loli #强迫 #合集 #长篇", bak: "https://telegra.ph/半里バード-わからせラブ-中国翻訳-DL版-08-01" },
  { id: "488338", aScore: 2.9, bScore: 6, info: "#蔚蓝档案" },
  { id: "441652", aScore: 7.8, bScore: 3.4, info: "#女仆 #纯爱", bak: "https://telegra.ph/半可通少女榎本尚吸血鬼様とちいさなメイドのみだりな吸血-08-01" },
  { id: "442431", aScore: 7.6, bScore: 2, info: "#蔚蓝档案", order: 2, bak: "https://telegra.ph/NNL-メリサン-びゅるるアーカイブ2-ブルーアーカイブ-中国翻訳-DL版-08-01" },
  { id: "(ex)", aScore: 3.5, bScore: 5, info: "#蔚蓝档案", otherlink: "https://exhentai.org/g/2783575/06a45e0ee6/", bak: "https://telegra.ph/らーめんらいす-らじー-発情セイアですまない-ブルーアーカイブ-中国翻訳-DL版-12-31" },
  { id: "408727", aScore: 9.7, bScore: 8.2, info: "#玉之けだま", bak: "https://telegra.ph/玉之けだま-僕は小さな淫魔のしもべ-中国翻訳-無修正-DL版-12-31" },
  { id: "482101", aScore: 2.7, bScore: 7, info: "#东方", bak: "https://telegra.ph/世捨人な漫画描き-ともきとものり-濡れる守矢神社-東方Project-中国翻訳-DL版-11-18" },
  { id: "282887", aScore: 4.9, bScore: 6.9, info: "#催眠 #全彩 #loli", order: 1, bak: "https://telegra.ph/C96-caburibbon-caburi-sss-スマート催眠セックス-中国翻訳-08-02" },
  { id: "(ex)", aScore: 5.1, bScore: 5.3, info: "#催眠 #全彩 #loli", order: 2, otherlink: "https://exhentai.org/g/1571279/d20d30ed97/", bak: "https://telegra.ph/caburibbon-caburi-sssh-中国翻訳-DL版-08-02" },
  { id: "440151", aScore: 6.5, bScore: 6.2, info: "#原神", bak: "https://telegra.ph/saluky-派蒙啊加速时间吧-原神-中国語-08-01" },
  { id: "446532", aScore: 9, bScore: 7.6, info: "#蔚蓝档案 #全彩", bak: "https://telegra.ph/FF40-山含-色色運動大會-ブルーアーカイブ-08-01" },
  { id: "480146", aScore: 8, bScore: 9.3, info: "47 页开始 #逆转" },
  { id: "(ex)", aScore: 9.1, bScore: 7.3, info: "距離感バグの兎 #蔚蓝档案", otherlink: "https://exhentai.org/g/2782239/fb3c804f2d/", bak: "https://telegra.ph/一味三昧-13-距離感バグの兎-ブルーアーカイブ-中国翻訳-DL版-01-01" },
  { id: "277557", aScore: 6.3, bScore: 3, info: "#偶像大师", bak: "https://telegra.ph/My-Best-Friends-12-Horizontal-World-またのんき-ももかよいつま-アイドルマスター-シンデレラガールズ-中国翻訳-01-03" },
  { id: "489361", aScore: 6.7, bScore: 5.2, info: "#蔚蓝档案", bak: "https://telegra.ph/Horizontal-World-またのんき-伊ダ落-ブルーアーカイブ-中国翻訳-DL版-12-31" },
  { id: "488568", aScore: 6.9, bScore: 1, info: "#蔚蓝档案", bak: "https://telegra.ph/梅雨入り柿の種-柿丘-Error-XXXX-is-not-defined-ブルーアーカイブ-中国翻訳-DL版-01-04" },
  { id: "(ex)", aScore: 6, bScore: 6.7, info: "#制服", otherlink: "https://exhentai.org/g/2790930/b02a0fb008/", bak: "https://telegra.ph/みくろぺえじ-黒本君-JCわからせ性教育-中国翻訳-DL版-01-06" },
  { id: "(ex)", aScore: 5.5, bScore: 4, info: "#蔚蓝档案", order: 2, otherlink: "https://exhentai.org/g/2790306/8db403ff37/", bak: "https://telegra.ph/C103-餃子ベビー-笑笑餃子-全身マッサージしようキサキ会長2-ブルーアーカイブ-中国翻訳-01-06" },
  { id: "(ex)", aScore: 3.4, bScore: 6.1, info: "#女仆", order: 3, otherlink: "https://exhentai.org/g/2281625/892988db9a/", bak: "https://nhentai.net/search/?q=ギャルゆいなちゃんとえっち3" },
  { id: "392122", aScore: 6, bScore: 7.1, info: "#触手" },
  { id: "490137", aScore: 7.5, bScore: 7, info: "#蔚蓝档案", bak: "https://telegra.ph/とうざいなんぼく-西ヤスアキ-この暖かさを知ってしまった-ブルーアーカイブ-中国翻訳-DL版-01-09" },
  { id: "489246", aScore: 3.3, bScore: 7.5, info: "メイド教育", order: 6, bak: "https://telegra.ph/きょくちょ局-きょくちょ-メイド教育6没落貴族瑠璃川椿-中国翻訳-种植园汉化-01-02" },
  { id: "476283", aScore: 4, bScore: 5, info: "#纯爱" },
  { id: "490166", aScore: 6.8, bScore: 4.2, info: "#魔法使" },
  // next: 4.22 - 11.11
].sort((a, b) => {
  const aScore = a.aScore + a.bScore;
  const bScore = b.aScore + b.bScore;
  return bScore - aScore || b.aScore - a.aScore;
});
export default {
  name: "ComicTable",
  components: { nhentai },
  computed: {
    sortedRows() {
      return data;
    },
  },
};
</script>