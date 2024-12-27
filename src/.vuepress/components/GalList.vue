<template>
  <MyCheckBox label="仅显示严格定义的 galgame" v-model="show_strict" hint="非严格定义的 galgame 指非视觉小说类 galgame，拥有除了选择支以外的其他玩法" />
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="h in headers">{{ h }}</th>
        </tr>
      </thead>
      <tbody :class="{ 'show-strict': show_strict }">
        <GalListItem v-for="item in original_list" :item="item"
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
import { ref, useSlots } from "vue";
import MyCheckBox from "./MyCheckBox.vue";
import original_list from "../data/galgamelist.js";
import "../utils/FormatDate.js";
import GalListItem from "./GalListItem.vue";
import { GalItemInputType } from "../definition";

const get_valid_name = (item: GalItemInputType): string => item.valid_name ?? item.name

// /**
//  * 按照结束时间排倒序
//  */
// function sort_items(a: GalItemType, b: GalItemType) {
//   function compare_date_or_undefined(a: Date | undefined, b: Date | undefined) {
//     if (a && b) {
//       return b.getTime() - a.getTime();
//     }
//     if (a) {
//       return -1;
//     }
//     if (b) {
//       return 1;
//     }
//     return undefined;
//   }
//   return compare_date_or_undefined(a.duration?.end, b.duration?.end)
//     || compare_date_or_undefined(a.duration?.start, b.duration?.start) || 0;
// }

const show_strict = ref(false);
const headers = "游戏名 时长 游玩区间 剧情 画风 程序".split(" ");
// const galgame_list: ComputedRef<GalItemType[]> = computed(() => {
//   /// 将 GalItemType 转换为 GalItemInputType（对 duration 字段进行转换）
//   const list: GalItemType[] = original_list.map((item) => {
//     const { duration, ...rest } = item;
//     if (!duration) {
//       return rest;
//     }
//     return {
//       ...rest,
//       duration: {
//         start: duration.start ? new Date(duration.start) : undefined,
//         end: duration.end ? new Date(duration.end) : undefined,
//       },
//     };
//   });
//   /// 根据 show_strict 是否选中，过滤并排序
//   return (show_strict.value ? list.filter((item) => !item.not_strict) : list).sort(sort_items);
// });
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

td {
  text-align: center;
  vertical-align: middle;
}
</style>
