<template>
  <ExpandableListItem
    :expandable="expandable"
    :extra_tr_class="item.tags?.not_network ? [] : ['network']"
  >
    <template #list-content>
      <td>
        <!-- 推荐图标 -->
        <span v-if="item.recommend" class="recommend-icon" title="推荐">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="currentColor"
            />
          </svg>
        </span>

        <!-- 名字部分 -->
        <span v-if="!item.url">{{ name_and_author }}</span>
        <a v-else :href="item.url" target="_blank">{{ name_and_author }}</a>

        <span v-if="item.order || item.tags || item.h_level || item.nth_time">
          <span>&thinsp;</span>
          <OrderBadge :order="item.order" v-if="item.order" />
          <OrderBadge
            :order="item.nth_time"
            :text="`${numberToChinese(item.nth_time)}刷`"
            v-if="item.nth_time"
          />
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
import { HLevel } from "../definition/book_type";
import { numberToChinese } from "../utils/NumberToChinese";
import ExpandableListItem from "./ExpandableListItem.vue";

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
  return (props.item.duration.start ?? "?") + " ~\n" + (props.item.duration.end ?? "?");
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
.recommend-icon {
  display: inline-block;
  width: 1.1em;
  height: 1.1em;
  margin-left: 6px;
  vertical-align: -0.15em;
  color: #f59e0b; /* 琥珀金 */
  cursor: help;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
}

/* 内部 svg 占满 wrapper，并挂载过渡动画 */
.recommend-icon svg {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 鼠标悬停时触发内部 svg 的小动效 */
.recommend-icon:hover svg {
  transform: scale(1.25) rotate(5deg);
}
</style>
