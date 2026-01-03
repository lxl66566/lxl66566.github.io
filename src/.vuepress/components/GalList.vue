<template>
  <div style="width: 100%; box-sizing: border-box">
    <div class="before-info">条目数：{{ items_num }}</div>
    <div style="display: flex; gap: 1.5rem; width: 100%; flex-wrap: wrap">
      <input type="text" v-model="searchText" placeholder="搜索游戏原名/译名/俗名...（部分匹配）" class="search-input" />
      <MyCheckBox class="mycheckbox" label="仅显示严格定义的 galgame" v-model="show_strict"
        hint="非严格定义的 galgame 指非视觉小说类，不以选择支作为主要玩法的 galgame。" />
    </div>
    <div style="overflow-x: auto; min-width: 0">
      <ExpandableHint hint-text="点击表格项目可以展开详细内容哦！">
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
              <th>
                <SortIndicator text="感染力" v-model="sortOrder_thrill" />
              </th>
            </tr>
          </thead>
          <tbody :class="{ 'show-strict': show_strict }">
            <GalListItem v-for="item in filteredResults" :key="item.name + item.order + item.nth_time" :item="item"
              :expandable="useSlots()[get_valid_name(item)] != undefined">
              <template #gal-list-item-content>
                <slot :name="get_valid_name(item)"></slot>
              </template>
            </GalListItem>
          </tbody>
        </table>
      </ExpandableHint>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots, computed, watch } from "vue";
import MyCheckBox from "./MyCheckBox.vue";
import original_list from "../data/galgame_list.js";
import SortIndicator from "./SortIndicator.vue";
import "../utils/FormatDate.js";
import GalListItem from "./GalListItem.vue";
import { DateDurationCompare, GalItemInputType } from "../definition";
import Fuse, { IFuseOptions } from "fuse.js";
import debounce from "./utils/debounce";
import ExpandableHint from "./ExpandableHint.vue";

const get_valid_name = (item: GalItemInputType): string => item.valid_name ?? item.name;
const show_strict = ref(false);
const searchText = ref("");

// 排序组件状态
const sortOrder_story = ref<"none" | "asc" | "desc">("none");
const sortOrder_visual = ref<"none" | "asc" | "desc">("none");
const sortOrder_program = ref<"none" | "asc" | "desc">("none");
const sortOrder_thrill = ref<"none" | "asc" | "desc">("none");

// 全局排序状态，记录当前排序的列和方向
const currentSort = ref<{ column: "story" | "visual" | "program" | "thrill"; direction: "asc" | "desc" | "none" } | null>(null);

// 监听排序状态变化，确保其他排序被重置为 'none'，并更新 currentSort
const watchSortOrders = () => {
  watch(
    [sortOrder_story, sortOrder_visual, sortOrder_program, sortOrder_thrill],
    ([story, visual, program, thrill], [prevStory, prevVisual, prevProgram, prevThrill]) => {
      // 确定哪个列发生了变化
      if (story !== prevStory && story !== "none") {
        currentSort.value = { column: "story", direction: story };
        sortOrder_visual.value = "none";
        sortOrder_program.value = "none";
        sortOrder_thrill.value = "none";
      } else if (visual !== prevVisual && visual !== "none") {
        currentSort.value = { column: "visual", direction: visual };
        sortOrder_story.value = "none";
        sortOrder_program.value = "none";
        sortOrder_thrill.value = "none";
      } else if (program !== prevProgram && program !== "none") {
        currentSort.value = { column: "program", direction: program };
        sortOrder_story.value = "none";
        sortOrder_visual.value = "none";
        sortOrder_thrill.value = "none";
      } else if (thrill !== prevThrill && thrill !== "none") {
        currentSort.value = { column: "thrill", direction: thrill };
        sortOrder_story.value = "none";
        sortOrder_visual.value = "none";
        sortOrder_program.value = "none";
      } else if (story === "none" && visual === "none" && program === "none" && thrill === "none") {
        currentSort.value = null; // 默认无排序
      }
    },
  );
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
// 经过默认排序后的数据，不应该被改变，会在每次还原时被使用
const default_list = defaultSort([...original_list]);

const sortedList = computed(() => {
  // 如果没有激活的排序并且有默认排序函数，使用默认排序
  if (currentSort.value === null || currentSort.value.direction === "none") {
    return default_list;
  }
  return [...default_list].sort((x, y) => {
    const scoreKey = currentSort.value!.column;
    const xScore = x.score?.[scoreKey];
    const yScore = y.score?.[scoreKey];
    // 处理 undefined 值
    if (xScore == null && yScore == null) return 0;
    if (xScore == null) return 1; // undefined 值放到末尾
    if (yScore == null) return -1;
    return currentSort.value?.direction === "asc" ? xScore - yScore : yScore - xScore;
  });
});

// 搜索
// 更多配置请参考 Fuse.js 文档: https://fusejs.io/api/options.html
const fuseOptions: IFuseOptions<GalItemInputType> = {
  keys: ["name", "other_names"],
  includeScore: true, // 可以用于调试或设置更精确的阈值
  threshold: 0.4, // 匹配阈值，0.0 表示完全匹配，1.0 表示任意匹配。可以调整此值以获得期望的模糊度。
  ignoreLocation: true, // 忽略匹配位置，使得在字符串中任何位置的匹配都被认为是有效的
  useExtendedSearch: true, // 启用更强大的搜索模式，例如 `!gmae` (不包含 gmae), `^game` (以 game 开头), `game$` (以 game 结尾)
  minMatchCharLength: 1, // 最小匹配字符长度
};
let fuseInstance: Fuse<GalItemInputType>;

const query = ref("");
const filteredResults = computed(() => {
  return query.value.trim() ? fuseInstance.search(query.value).map((result) => result.item) : sortedList.value;
});

const debouncedSearch = debounce(() => {
  query.value = searchText.value.trim();
}, 400);

watch(
  sortedList,
  (newItems) => {
    if (fuseInstance) {
      fuseInstance.setCollection(newItems);
    } else {
      fuseInstance = new Fuse(newItems, fuseOptions);
    }
    // 重新执行一次搜索
    debouncedSearch();
  },
  { immediate: true },
);

// 监听搜索文本的变化
watch(searchText, () => {
  debouncedSearch();
});

const items_num = computed(() => (show_strict.value ? filteredResults.value.filter((item) => !item.tag?.not_strict).length : filteredResults.value.length));
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

.before-info {
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  font-size: 16px;
  border: 2px solid var(--vp-c-text);
  border-radius: 12px;
  box-sizing: border-box;
  min-width: 1rem;
}

.search-input:focus {
  border-color: var(--vp-c-accent) !important;
}
</style>
