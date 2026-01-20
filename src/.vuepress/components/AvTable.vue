<template>
  <div>番号总数：{{ datalen }}</div>
  <h2>最高</h2>
  <div>
    <SortableTable :rows="data1" />
  </div>
  <h2>普通</h2>
  <div>
    <SortableTable :rows="data2" />
  </div>
</template>

<script lang="ts" setup>
import avData from "../data/av.js";
import { TwoScoreCompare } from "../definition";
import { partitionInPlace } from "../utils/PartitionArray";
import SortableTable from "./SortableTable.vue";

// aScore: 颜值分  bScore: 演技分
const data = avData.sort((x, y) => -TwoScoreCompare(x, y)); // 因为 partitionInPlace 会 reverse 一次，这里的 sort 也需要反转
// 同分则颜值分优先

const datalen = data.length;
// 最高判定：aScore + bScore >= 18 || aScore >= 10 || bScore >= 10
const [data1, data2] = partitionInPlace(
  data,
  item => item.aScore + item.bScore >= 18 || item.aScore >= 10 || item.bScore >= 10,
);
</script>
