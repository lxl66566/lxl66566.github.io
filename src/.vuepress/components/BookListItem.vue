<template>
  <ExpandableListItem :expandable="expandable" :extra_tr_class="item.tags?.not_network ? [] : ['network']">
    <template #list-content>
      <td>
        <span v-if="!item.url">{{ name_and_author }}</span>
        <a v-else :href="item.url" target="_blank">{{ name_and_author }}</a>

        <span v-if="item.order || item.tags || item.h_level || item.nth_time">
          <span>&thinsp;</span>
          <OrderBadge :order="item.order" v-if="item.order" />
          <OrderBadge :order="item.nth_time" :text="`${numberToChinese(item.nth_time)}刷`" v-if="item.nth_time" />
          <Badge type="tip" text="无H" v-if="item.h_level === HLevel.NONE" />
          <Badge type="warning" text="黄文" v-if="item.h_level === HLevel.HIGH" />
          <Badge type="info" text="日轻" v-if="item.tags?.japanese" />
          <Badge type="tip" text="生肉" v-if="item.tags?.namaniku" />
          <Badge type="danger" text="学习" v-if="item.tags?.study" />
        </span>
      </td>
      <!-- 阅读区间 -->
      <td>
        {{ duration_string }}
      </td>
      <!-- 时长 -->
      <td>{{ use_time_string }}</td>
    </template>
    <template #expanded-content>
      <slot name="book-list-item-content"></slot>
    </template>
  </ExpandableListItem>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { BookItemInputType } from "../definition";
import ExpandableListItem from "./ExpandableListItem.vue";
import { HLevel } from "../definition/book_type";
import { numberToChinese } from "../utils/NumberToChinese";

const props = defineProps<{
  /**
   * 游戏信息
   */
  item: BookItemInputType;
  /**
   * 是否可以展开，也就是 markdown 里有没有给具名插槽喂 template
   */
  expandable: boolean;
}>();

const name_and_author = computed(() => {
  return props.item.name + (props.item.author ? ` - ${props.item.author}` : "");
});

/**
 * 阅读时长字符串拼接，可能出现类似的几种情况：
 *
 * `14min`
 * `14min,在读`
 * `14min,中止`
 * `已停止`
 */
const use_time_string = computed(() => {
  let tmp: string = props.item.use_time || "";
  if (props.item.reading_status) {
    tmp = `${tmp},${props.item.reading_status.kind}`;
    if (props.item.reading_status.extra) {
      tmp = `${tmp},${props.item.reading_status.extra}`;
    }
  }
  return tmp.replace(/^[,]+|[,]+$/g, "");
});

const duration_string = computed(() => {
  if (props.item.duration === undefined) {
    return "?";
  }
  if (typeof props.item.duration === "string") {
    return props.item.duration;
  }
  if (props.item.duration.start === props.item.duration.end && props.item.duration.start) {
    return props.item.duration.start;
  }
  return (props.item.duration.start ?? "?") + "~\n" + (props.item.duration.end ?? "?");
});
</script>

<style lang="scss" scoped>
td {
  text-align: center;
  vertical-align: middle;
}

:slotted(img) {
  max-width: 100% !important;
}
</style>
