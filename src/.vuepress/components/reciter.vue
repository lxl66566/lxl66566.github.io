<template>
  <div>
    <h2>绝对值_x 的背词器</h2>
    <fieldset>
      <legend>语言</legend>
      <RadioButtonGroup v-model="language" :options="languageOptions" />
    </fieldset>
    <fieldset>
      <legend>网址</legend>
      <div v-if="language == 'english'">
        <RadioButtonGroup v-model="englishWebsite" :options="englishOptions" />
      </div>
      <div v-else>
        <RadioButtonGroup v-model="japaneseWebsite" :options="japaneseOptions" />
      </div>
    </fieldset>
    <div class="pd">
      <span>个数：</span>
      <input type="range" id="slider" v-model="selectNum" min="1" max="20" step="1" />
      <span>{{ selectNum }}</span>
    </div>
    <div class="pd">
      <input type="checkbox" value="newsletter" v-model="opendirectly" />
      <span>是否直接打开网页（若勾选，请开启“弹出窗口和重定向”权限）</span>
    </div>
    <div class="pd">
      <button @click="clickRecite">背！</button>
    </div>
    <fieldset class="pd">
      <span v-for="answ in answer">
        <a :href="answ.url" target="_blank">{{ answ.word }}</a>&emsp;</span>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import RadioButtonGroup from "./RadioButtonGroup.vue";

/**
 * 从 https://cdn.jsdelivr.net/gh/lxl66566/wordsreciter@notebook/notebook.json 拿到的 json 的类型
 */
type NoteBookType = {
  english: { default: string[] };
  japanese: { default: string[] };
};

/**
 * 答案列表的元素类型
 */
type AnswerItemType = { word: string; url: string };

/**
 * 从列表中随机取一个元素
 * @param list 列表
 */
function get_random<T>(list: Array<T>): T {
  console.log(list);
  return list[Math.floor(Math.random() * list.length)] as T;
}

const language = ref<"english" | "japanese">("english");
const languageOptions = [
  { label: "English", value: "english" },
  { label: "日本語", value: "japanese" },
];
const englishWebsite = ref(
  "https://dictionary.cambridge.org/dictionary/english/{}",
);
const englishOptions = [
  {
    label: "Cambridge Dictionary",
    value: "https://dictionary.cambridge.org/dictionary/english/{}",
  },
  {
    label: "Oxford Learner's Dictionaries",
    value: "https://www.oxfordlearnersdictionaries.com/definition/english/{}",
  },
  {
    label: "Oxford Advanced American Dictionary",
    value: "https://www.oxfordlearnersdictionaries.com/definition/american_english/{}",
  },
  {
    label: "Merriam Webster",
    value: "https://www.merriam-webster.com/dictionary/{}",
  },
  { label: "百度翻译", value: "https://fanyi.baidu.com/#en/zh/{}" },
  {
    label: "Collins Dictionary",
    value: "https://www.collinsdictionary.com/dictionary/english/{}",
  },
];
const japaneseWebsite = ref("https://www.weblio.jp/content/{}");
const japaneseOptions = [
  { label: "Weblio 辞書国語辞典", value: "https://www.weblio.jp/content/{}" },
  { label: "goo 辞書", value: "https://dictionary.goo.ne.jp/srch/jn/{}/m6u/" },
  {
    label: "広辞苑無料検索",
    value: "https://sakura-paris.org/dict/広辞苑/prefix/{}/",
  },
];
const selectNum = ref(3);
const notebook = ref<NoteBookType>({
  english: {
    default: [],
  },
  japanese: {
    default: [],
  },
});
const answer = ref<Array<AnswerItemType>>([]);
const opendirectly = ref(false);

onMounted(() => {
  fetch(
    "https://cdn.jsdelivr.net/gh/lxl66566/wordsreciter@notebook/notebook.json",
  )
    .then((res) => res.json())
    .then((json) => {
      notebook.value = json;
    });
});

function clickRecite() {
  console.log("背！");
  for (let i = 0; i < selectNum.value; ++i) {
    console.log(notebook, language.value);
    const word = get_random<string>(notebook.value[language.value].default);
    const url = (language.value === "english"
      ? englishWebsite.value
      : japaneseWebsite.value).replaceAll("{}", word);
    answer.value.push({
      word,
      url,
    });
    if (opendirectly.value) window.open(url, "_blank");
  }
}
</script>

<style scoped>
.pd {
  padding: 0.3rem;
}
</style>
