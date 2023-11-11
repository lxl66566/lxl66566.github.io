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
          <td v-if="!row.otherlink">
            <nhentai :id="row.id" :bak="row.bak" />
          </td>
          <td v-if="row.otherlink">
            <a :href="row.otherlink">{{ row.id }}</a>
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
  // next: 4.22
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