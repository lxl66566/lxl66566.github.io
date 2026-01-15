<template>
  <div>
    <div>本子总数：{{ data.length }}</div>
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
        <tr v-for="row in data" :key="row.id">
          <td>
            <span v-if="!row.otherlink && row.id">
              <nhentai :id="row.id" />
            </span>
            <span v-else>
              <a :href="row.otherlink" target="_blank">{{ row.id }}</a>
            </span>
            <span v-if="row.bak"> | <a :href="row.bak" target="_blank">bak</a></span>
            <OrderBadge v-if="row.order" :order=row.order />
          </td>
          <td>{{ row.aScore }}</td>
          <td>{{ row.bScore }}</td>
          <td>
            <dtlslong v-if="row.info">{{ row.info }}</dtlslong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import nhentai from "./nhentai.vue";
import dtlslong from "./dtlslong.vue";
import { TwoScoreCompare, ComicItemType } from "../definition/index.js";
import comicData from "../data/comic.js";

const data = comicData.sort((x, y) => TwoScoreCompare(x, y));

// 查重使用
// const duplicates = [...new Set(
//   data
//     .filter(item => item.id)
//     // @ts-ignore
//     .filter(item => /^\d{6}$/.test(item.id))
//     .map(item => item.id)
//     .filter((id, index, arr) => arr.indexOf(id) !== index)
// )];
// console.log("重复的六位数字ID:", duplicates);
</script>