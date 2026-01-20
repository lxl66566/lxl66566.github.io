<template>
  <MyCheckBox label="R18" v-model="show_r18" />
  <div>
    <ExpandableHint hint-text="点击表格项目可以展开详细内容哦！（部分）">
      <table>
        <thead>
          <tr>
            <th v-for="h in headers">{{ h }}</th>
          </tr>
        </thead>
        <tbody :class="{ 'not-show-r18': !show_r18 }">
          <ExpandableListItem
            v-for="item in original_list"
            :expandable="useSlots()[get_valid_name(item)] != undefined"
            :extra_tr_class="item.r18 ? ['r18'] : []"
          >
            <template #list-content>
              <td>
                <span>{{ item.name }}</span>
                <span v-if="item.order || item.r18 || item.extra || item.watch_times">
                  <span>&thinsp;</span>
                  <OrderBadge :order="item.order" v-if="item.order" />
                  <OrderBadge
                    :order="item.watch_times"
                    :text="`${numberToChinese(item.watch_times)}刷`"
                    v-if="item.watch_times"
                  />
                  <Badge type="warning" text="里" v-if="item.r18" />
                  <Badge type="tip" text="番外" v-if="item.extra" />
                </span>
              </td>
              <td>
                {{ duration_string(item) }}
              </td>
            </template>
            <template #expanded-content>
              <slot :name="get_valid_name(item)"></slot>
            </template>
          </ExpandableListItem>
        </tbody>
      </table>
    </ExpandableHint>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from "vue";
import original_list from "../data/anime_list.js";
import { AnimeItemInputType } from "../definition";
import { numberToChinese } from "../utils/NumberToChinese";
import ExpandableHint from "./ExpandableHint.vue";
import ExpandableListItem from "./ExpandableListItem.vue";
import MyCheckBox from "./MyCheckBox.vue";

const get_valid_name = (item): string => item.valid_name ?? item.name;

const show_r18 = ref(true);
const headers = "番名 观看区间".split(" ");
const duration_string = (item: AnimeItemInputType) => {
  if (item.duration === undefined) {
    return "?";
  }
  if (item.duration.start === item.duration.end && item.duration.start) {
    return item.duration.start;
  }
  return (item.duration.start ?? "?") + " ~ " + (item.duration.end ?? "?");
};
</script>

<style scoped lang="scss">
// 只显示严格定义的 galgame，样式穿透
// not-show-r18 是本组件的 class，而 not-r18 是孙组件 class
.not-show-r18 :deep(.r18) {
  display: none;
}

td {
  text-align: center;
  vertical-align: middle;
}

table {
  overflow: visible !important;
}
</style>
