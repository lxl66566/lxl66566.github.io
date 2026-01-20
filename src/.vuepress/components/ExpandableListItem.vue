<!-- 这是一个可展开 list 项目的组件。list 里本身的 <td> 和展开后的内容都通过插槽插入该组件，
list 中的插槽名称为 list-content，展开后的内容插槽名称为 expanded-content。
使用方法：

<ExpandableListItem :expandable="..." :extra_tr_class="...">
  <template #list-content>
    <td></td><td></td><td></td>... 这里是列表本体
  </template>
  <template #expanded-content>
    <slot name="gal-list-item-content"></slot>
  </template>
</ExpandableListItem>
-->
<template>
  <tr
    @click="toggleExpand"
    class="list-item"
    :class="[
      ...(props.extra_tr_class || []),
      {
        expanded: isExpanded, // 在外部使用的属性
        expandable: props.expandable,
      },
    ]"
    ref="trRef"
  >
    <slot name="list-content"></slot>
  </tr>
  <transition name="expand">
    <tr v-if="isExpanded" class="expanded-content" :style="{ height: expandedHeight + 'px' }">
      <td
        colspan="99"
        :style="{ maxWidth: calculatedMaxWidth, overflow: 'visable', boxSizing: 'border-box' }"
      >
        <div ref="expandContentRef">
          <slot name="expanded-content"></slot>
        </div>
      </td>
    </tr>
  </transition>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import debounce from "../utils/debounce";

const props = defineProps<{
  /**
   * 要添加到点击部分的 tr 里的 class
   */
  extra_tr_class?: string[];
  /**
   * 是否允许展开
   */
  expandable: boolean;
}>();

// 宽度限制
const trRef = ref<HTMLTableElement | null>(null);
const calculatedMaxWidth = ref("none"); // 存储计算出的 max-width

// region 展开的逻辑
const isExpanded = ref(false);
const expandedHeight = ref(0);
const expandContentRef = ref<HTMLDivElement | null>(null);

const toggleExpand = async () => {
  if (!props.expandable) {
    return;
  }
  isExpanded.value = !isExpanded.value;

  await nextTick(); // 等待 DOM 更新

  if (isExpanded.value && expandContentRef.value) {
    expandedHeight.value = expandContentRef.value.offsetHeight;
  } else {
    expandedHeight.value = 0;
  }
};

const handleResize = debounce(() => {
  // 计算宽度
  if (trRef.value) {
    const tableWidth = trRef.value.offsetWidth;
    // console.log(tableWidth);
    calculatedMaxWidth.value = `${tableWidth}px`;
  }
}, 500);

onMounted(() => {
  window.addEventListener("resize", handleResize);
  nextTick(() => {
    if (isExpanded.value) {
      expandedHeight.value = expandContentRef.value?.offsetHeight || 0;
    }
    handleResize();
  });
});
</script>

<style lang="scss" scoped>
.list-item {
  & > td {
    text-align: center;
    vertical-align: middle;
  }
}

.expandable {
  cursor: pointer;
}

.expandable:hover {
  outline: solid 1px var(--vp-c-accent);
}

.expanded-content {
  max-width: var(--content-width);
}

// 展开动画
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
