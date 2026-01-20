<template>
  <div class="container" ref="containerRef">
    <div class="column" v-for="(column, index) in columns" :key="index">
      <fieldset class="box" v-for="(box, boxIndex) in column.boxes" :key="boxIndex">
        <legend v-if="box.field">{{ box.field }}</legend>
        <ul>
          <li class="links" v-for="(link, linkIndex) in box.links">
            <RouterJumper :key="linkIndex" :to="link.url" :text="link.text" />
          </li>
        </ul>
      </fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import type { ArticleCellBoxType } from "../definition/types";
import RouterJumper from "./RouterJumper.vue";

const props = withDefaults(
  defineProps<{
    boxData: ArticleCellBoxType[];
    columnWidth: number;
  }>(),
  {
    columnWidth: 200,
  },
);

/**
 * height 表示里面所有 boxes 的链接总数；每次新增 box 会新增在 height 最小的 column 上
 */
const columns = ref<{ boxes: ArticleCellBoxType[]; height: number }[]>([]);
const containerRef = ref<HTMLDivElement | null>(null);

const textWidths = props.boxData.map(
  (box) => Math.max(...box.links.map((link) => link.text.length * 16)), // 假设每个字符宽度约为 8px
);
const maxColumnWidth = Math.max(props.columnWidth, ...textWidths);
// const maxColumnWidth = props.columnWidth;
console.log("maxColumnWidth", maxColumnWidth);

const updateColumns = () => {
  if (!containerRef.value) return;

  const availableWidth = containerRef.value.clientWidth - 3;
  const columnCount = Math.max(
    Math.min(Math.floor(availableWidth / maxColumnWidth), props.boxData.length),
    1,
  );
  containerRef.value.style.flexWrap = columnCount > 1 ? "nowrap" : "wrap";
  columns.value = Array.from({ length: columnCount }, () => ({
    boxes: [],
    height: 0,
  }));

  props.boxData.forEach((box) => {
    const targetColumn = columns.value.reduce(
      (minColumn, currentColumn, index) => {
        return currentColumn.height < columns.value[minColumn].height
          ? index
          : minColumn;
      },
      0,
    );

    columns.value[targetColumn].boxes.push(box);
    columns.value[targetColumn].height += box.links.length;
  });
};

onMounted(() => {
  updateColumns();
  window.addEventListener("resize", updateColumns);
});

watch(() => props.boxData, updateColumns);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  max-width: 100%; // 确保占用最大宽度
  height: auto;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1; // 平均分配宽度
  max-width: 100%;
}

.box {
  margin: 5px;
  border: 2px solid var(--vp-c-accent);
  border-radius: 5px;

  a {
    text-decoration: none;
    color: var(--vp-c-accent);
  }
}

.links {
  white-space: nowrap;
}

fieldset {
  legend {
    color: var(--vp-c-accent);
    font-size: 1.3rem;
  }
}

li {
  white-space: normal;
  /* 允许换行 */
}
</style>
