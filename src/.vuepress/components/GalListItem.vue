<template>
  <ExpandableListItem
    :expandable="props.expandable"
    :extra_tr_class="props.item.tag?.not_strict ? ['not-strict'] : []"
  >
    <template #list-content>
      <td>
        <h6 :id="props.item.name" class="fake-span">
          <span v-if="!props.item.url">{{ props.item.name }}</span>
          <a v-else :href="props.item.url" target="_blank">{{ props.item.name }}</a>
        </h6>

        <span
          v-if="props.item.order || props.item.nth_time || props.item.namaniku || props.item.tag"
        >
          <span>&thinsp;</span>
          <OrderBadge :order="props.item.order" v-if="props.item.order" />
          <OrderBadge
            :order="item.nth_time"
            :text="`${numberToChinese(item.nth_time)}刷`"
            v-if="item.nth_time"
          />
          <Badge type="tip" text="生肉" v-if="props.item.namaniku" />
          <Badge type="tip" text="无H" v-if="props.item.tag?.all_ages" />
          <Badge type="warning" text="惊悚" v-if="props.item.tag?.thrill" />
          <Badge type="warning" text="血腥" v-if="props.item.tag?.blood" />
          <Badge type="danger" text="猎奇重口" v-if="props.item.tag?.bizarre" />
        </span>
      </td>
      <!-- 时长 -->
      <td>
        {{ props.item.use_time ?? "" }}
        <span v-if="props.item.playing_status">
          <Badge
            :type="status_badge_type_map(props.item.playing_status)"
            :text="props.item.playing_status"
          />
        </span>
      </td>
      <!-- 游玩区间 -->
      <td>
        {{ duration_string }}
      </td>
      <!-- 评分 -->
      <td
        :class="{
          'high-score': isHighScore(props.item.score?.story),
          'low-score': isLowScore(props.item.score?.story),
        }"
      >
        {{ props.item.score?.story ?? "-" }}
      </td>
      <td
        :class="{
          'high-score': isHighScore(props.item.score?.visual),
          'low-score': isLowScore(props.item.score?.visual),
        }"
      >
        {{ props.item.score?.visual ?? "-" }}
      </td>
      <td
        :class="{
          'high-score': isHighScore(props.item.score?.program),
          'low-score': isLowScore(props.item.score?.program),
        }"
      >
        {{ props.item.score?.program ?? "-" }}
      </td>
      <td
        :class="{
          'high-score': isHighScore(props.item.score?.thrill),
          'low-score': isLowScore(props.item.score?.thrill),
        }"
      >
        {{ props.item.score?.thrill ?? "-" }}
      </td>
    </template>
    <template #expanded-content>
      <slot name="gal-list-item-content"></slot>
    </template>
  </ExpandableListItem>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { GalItemInputType, PlayingStatus } from "../definition/index.js";
import ExpandableListItem from "./ExpandableListItem.vue";
import "../utils/FormatDate";
import { numberToChinese } from "../utils/NumberToChinese.js";

const props = defineProps<{
  /**
   * 游戏信息
   */
  item: GalItemInputType;
  /**
   * 是否可以展开，也就是 markdown 里有没有给具名插槽喂 template
   */
  expandable: boolean;
}>();

// 判断是否是高分
function isHighScore(score: number | undefined) {
  return typeof score === "number" && score >= 10;
}
// 判断是否是低分
function isLowScore(score: number | undefined) {
  return typeof score === "number" && score <= 0;
}

const status_badge_type_map = (s: PlayingStatus) => {
  switch (s) {
    case PlayingStatus.PLAYING:
      return "tip";
    case PlayingStatus.PAUSED:
      return "warning";
    case PlayingStatus.STOPPED:
      return "danger";
  }
};

const duration_string = computed(() => {
  if (props.item.duration === undefined) {
    return "?";
  }
  if (props.item.duration.start === props.item.duration.end && props.item.duration.start) {
    return props.item.duration.start;
  }
  return (props.item.duration.start ?? "?") + " ~ " + (props.item.duration.end ?? "?");
});
</script>

<style lang="scss" scoped>
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

:slotted(img) {
  max-width: 100% !important;
}

/* 重置 VuePress 对 h6 的默认样式 */
h6.fake-span {
  /* 1. 恢复为行内元素特性 (span 默认是 inline) */
  display: inline;

  /* 2. 重置字体相关属性，使其继承父级元素的文本样式 */
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;

  /* 3. 清除 VuePress 默认的 margin 和 padding */
  margin: 0;
  padding: 0;
  border: none;
}

/* 隐藏可能被 Markdown-it 自动注入的锚点符号 '#' (如果有的话)
h6.fake-span :deep(.header-anchor) {
  display: none !important;
} */
</style>
