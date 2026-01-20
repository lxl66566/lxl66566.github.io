<template>
  <div>
    <ExpandableHint hint-text="点击表格项目可以展开详细内容哦！">
      <table>
        <thead>
          <tr>
            <th v-for='h in "公司 岗位 渠道 投递时间 状态".split(" ")'>{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <ExpandableListItem
            v-for="item in props.data"
            :expandable="useSlots()[item.name] != undefined"
            :extra_tr_class="item.offer ? ['offer'] : []"
          >
            <template #list-content>
              <td>{{ item.name }}</td>
              <td>{{ item.job }}</td>
              <td>{{ item.by }}</td>
              <td>
                <Date :date="item.time" />
              </td>
              <td>{{ `${item.result}${item.offer ? " + offer" : ""}` }}</td>
            </template>
            <template #expanded-content>
              <slot :name="item.name"></slot>
            </template>
          </ExpandableListItem>
        </tbody>
      </table>
    </ExpandableHint>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
import { JobItemInputType } from "../definition";
import Date from "./Date.vue";
import ExpandableHint from "./ExpandableHint.vue";
import ExpandableListItem from "./ExpandableListItem.vue";

const props = defineProps<{
  data: JobItemInputType[];
}>();
</script>

<style scoped lang="scss">
td {
  text-align: center;
  vertical-align: middle;
}

.offer {
  td {
    color: green;
  }
}

table {
  overflow: visible !important;
}
</style>
