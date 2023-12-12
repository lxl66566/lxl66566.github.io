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
  { id: "(ex)", aScore: 4, bScore: 7.2, info: "", otherlink: "https://exhentai.org/g/2480501/a346125f42/", bak: "https://telegra.ph/大伴ヤキ-虎の春-COMIC-快楽天-2023年4月号-中国翻訳-DL版-08-01" },
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