<template>
  <ExpandableListItem :expandable="props.expandable" :extra_tr_class="props.item.not_strict ? ['not-strict'] : []">
    <template #list-content>
      <td>
        <span v-if="!props.item.url">{{ props.item.name }}</span>
        <a v-else :href="props.item.url" target="_blank">{{ props.item.name }}</a>

        <span v-if="props.item.order || props.item.all_ages || props.item.namaniku || props.item.intense">
          <span>&thinsp;</span>
          <OrderBadge :order="props.item.order" v-if="props.item.order" />
          <Badge type="tip" text="全年龄" v-if="props.item.all_ages" />
          <Badge type="tip" text="生肉" v-if="props.item.namaniku" />
          <Badge type="danger" text="重口" v-if="props.item.intense" />
        </span>
      </td>
      <!-- 时长 -->
      <td>{{ use_time_string }}</td>
      <!-- 游玩区间 -->
      <td>
        {{ duration_string }}
      </td>
      <!-- 评分 -->
      <td
        :class="{ 'high-score': isHighScore(props.item.score?.story), 'low-score': isLowScore(props.item.score?.story) }">
        {{ props.item.score?.story ?? "-" }}
      </td>
      <td
        :class="{ 'high-score': isHighScore(props.item.score?.visual), 'low-score': isLowScore(props.item.score?.visual) }">
        {{ props.item.score?.visual ?? "-" }}
      </td>
      <td
        :class="{ 'high-score': isHighScore(props.item.score?.program), 'low-score': isLowScore(props.item.score?.program) }">
        {{ props.item.score?.program ?? "-" }}
      </td>
    </template>
    <template #expanded-content>
      <slot name="gal-list-item-content"></slot>
    </template>
  </ExpandableListItem>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, computed } from "vue";
import { GalItemInputType } from "../definition";
import ExpandableListItem from "./ExpandableListItem.vue";
import "../utils/FormatDate";

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

/**
 * 游玩时长字符串拼接，可能出现类似的几种情况：
 *
 * `14min`
 * `14min,游玩中`
 * `14min,中止`
 * `已停止`
 */
const use_time_string = computed(() => {
  let tmp: string = "";
  if (props.item.use_time) {
    tmp = props.item.use_time;
  }
  if (props.item.playing_status) {
    tmp = tmp ? tmp + "," + props.item.playing_status : props.item.playing_status;
  }
  return tmp;
});

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
</style>
