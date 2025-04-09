<template>
  <MyCheckBox label="仅显示严格定义的 galgame" v-model="show_strict" hint="非严格定义的 galgame 指非视觉小说类，不以选择支作为主要玩法的 galgame。" />
  <div>
    <table>
      <thead>
        <tr>
          <th>游戏名</th>
          <th>时长</th>
          <th>游玩区间</th>
          <th>
            <SortIndicator text="剧情" v-model="sortOrder_story" />
          </th>
          <th>
            <SortIndicator text="画风" v-model="sortOrder_visual" />
          </th>
          <th>
            <SortIndicator text="程序" v-model="sortOrder_program" />
          </th>
        </tr>
      </thead>
      <tbody :class="{ 'show-strict': show_strict }">
        <GalListItem v-for="item in sortedList" :key="item.name + item.order" :item="item"
          :expandable="useSlots()[get_valid_name(item)] != undefined">
          <template #gal-list-item-content>
            <slot :name="get_valid_name(item)"></slot>
          </template>
        </GalListItem>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots, computed, watch, onMounted, nextTick } from "vue";
import MyCheckBox from "./MyCheckBox.vue";
import original_list from "../data/galgame_list.js";
import SortIndicator from "./SortIndicator.vue";
import "../utils/FormatDate.js";
import GalListItem from "./GalListItem.vue";
import { DateDurationCompare, GalItemInputType } from "../definition";

const get_valid_name = (item: GalItemInputType): string => item.valid_name ?? item.name;
const show_strict = ref(false);

// 三个排序组件状态
const sortOrder_story = ref<"none" | "asc" | "desc">("none");
const sortOrder_visual = ref<"none" | "asc" | "desc">("none");
const sortOrder_program = ref<"none" | "asc" | "desc">("none");

// 全局排序状态，记录当前排序的列和方向
const currentSort = ref<{ column: "story" | "visual" | "program"; direction: "asc" | "desc" | "none" } | null>(null);

// 监听排序状态变化，确保其他排序被重置为 'none'，并更新 currentSort
const watchSortOrders = () => {
  watch([sortOrder_story, sortOrder_visual, sortOrder_program], ([story, visual, program], [prevStory, prevVisual, prevProgram]) => {
    // 确定哪个列发生了变化
    if (story !== prevStory && story !== 'none') {
      currentSort.value = { column: "story", direction: story };
      sortOrder_visual.value = "none";
      sortOrder_program.value = "none";
    } else if (visual !== prevVisual && visual !== 'none') {
      currentSort.value = { column: "visual", direction: visual };
      sortOrder_story.value = "none";
      sortOrder_program.value = "none";
    } else if (program !== prevProgram && program !== 'none') {
      currentSort.value = { column: "program", direction: program };
      sortOrder_story.value = "none";
      sortOrder_visual.value = "none";
    } else if (story === 'none' && visual === 'none' && program === 'none') {
      currentSort.value = null; // 默认无排序
    }
  });
};
watchSortOrders();

// 默认排序函数
const defaultSort = (inputList: GalItemInputType[]): GalItemInputType[] => {
  // 1. 按照 PlayingStatus 分组
  const grouped = inputList.reduce((acc, item) => {
    const key = item.playing_status ?? "null";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, GalItemInputType[]>);

  // 2. 组间按照 "游玩中", "中断", "null", "已停止" 排序，组内按照 duration 降序排序
  const sortedGroups = ["游玩中", "中断", "null", "已停止"].map((key) => {
    grouped[key]?.sort((x: GalItemInputType, y: GalItemInputType) => {
      if (x.duration && y.duration) {
        return -DateDurationCompare(x.duration, y.duration);
      }
      if (y.duration) {
        return 1;
      }
      if (x.duration) {
        return -1;
      }
      return 0;
    });
    return grouped[key] ?? [];
  });
  return sortedGroups.flatMap((group) => group);
};

const sortedList = computed(() => {
  // 如果没有激活的排序并且有默认排序函数，使用默认排序
  if (currentSort.value === null || currentSort.value.direction === "none") {
    return defaultSort([...original_list]);
  }
  return [...original_list].sort((a, b) => {
    const scoreKey = currentSort.value!.column;
    const aScore = a.score?.[scoreKey];
    const bScore = b.score?.[scoreKey];
    // 处理 undefined 值
    if (aScore == null && bScore == null) return 0;
    if (aScore == null) return 1; // undefined 值放到末尾
    if (bScore == null) return -1;
    return currentSort.value?.direction === "asc" ? aScore - bScore : bScore - aScore;
  });
});
</script>

<style scoped lang="scss">
// 只显示严格定义的 galgame，样式穿透
// show-strict 是本组件的 class，而 not-strict 是孙组件 class
.show-strict :deep(.not-strict) {
  display: none;
}

.high-score {
  color: green;
  font-weight: bolder;
}

.low-score {
  color: red;
}

table {
  width: 100%;
  max-width: 100%;
  table-layout: fixed;
  overflow: visible !important;
}

td {
  text-align: center;
  vertical-align: middle;
}
</style>
