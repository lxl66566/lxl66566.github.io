<template>
  <MyCheckBox label="显示网络小说" v-model="show_network" />
  <div>
    <table>
      <thead>
        <tr>
          <th>书名与作者</th>
          <th>阅读区间</th>
          <th>时长</th>
        </tr>
      </thead>
      <tbody :class="{ 'not-show-network': !show_network }">
        <BookListItem v-for="item in defaultSort(original_list)" :key="item.name + item.order + item.nth_time"
          :item="item" :expandable="useSlots()[get_valid_name(item)] != undefined">
          <template #book-list-item-content>
            <slot :name="get_valid_name(item)"></slot>
          </template>
        </BookListItem>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from "vue";
import MyCheckBox from "./MyCheckBox.vue";
import original_list from "../data/book_list.js";
import "../utils/FormatDate.js";
import BookListItem from "./BookListItem.vue";
import { BookItemInputType, BookDuration } from "../definition";

const get_valid_name = (item: BookItemInputType): string => item.valid_name ?? item.name;
const show_network = ref(true);

const pattern = new RegExp(`^[<>=\\?]+|[<>=\\?]+$`, "g");

const BookDurationCompare = (a: BookDuration, b: BookDuration): number => {
  if (typeof a === "string" && typeof b === "string") {
    return a.replace(pattern, "").localeCompare(b.replace(pattern, ""));
  }
  if (typeof a === "string") {
    return -1;
  }
  if (typeof b === "string") {
    return 1;
  }
  if (a.end && b.end) {
    return a.end.localeCompare(b.end);
  }
  if (a.end) {
    return 1;
  }
  if (b.end) {
    return -1;
  }
  // 如果都没有 end，则按照 start 排序
  if (a.start && b.start) {
    return a.start.localeCompare(b.start);
  }
  if (a.start) {
    return 1;
  }
  if (b.start) {
    return -1;
  }
  return 0;
};

// 默认排序函数
const defaultSort = (inputList: BookItemInputType[]): BookItemInputType[] => {
  // 1. 按照 PlayingStatus 分组
  const grouped = inputList.reduce((acc, item) => {
    const key = item.reading_status?.kind ?? "null";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, BookItemInputType[]>);

  // 2. 组间按照 "在读", "等待连载", "中断", "null", "已停更", "已放弃" 排序，组内按照 duration 降序排序
  const sortedGroups = ["在读", "等待连载", "中断", "null", "已停更", "已放弃"].map((key) => {
    grouped[key]?.sort((x: BookItemInputType, y: BookItemInputType) => {
      if (x.duration && y.duration) {
        return -BookDurationCompare(x.duration, y.duration);
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
</script>

<style scoped lang="scss">
// 只显示网络小说的 css，样式穿透
// show-network 是本组件的 class，而 not-network 是孙组件 class
.not-show-network :deep(.network) {
  display: none;
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
