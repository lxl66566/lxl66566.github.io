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
  <tr @click="toggleExpand" class="list-item" :class="[...(props.extra_tr_class || []), {
    'expanded': isExpanded, // 在外部使用的属性
    'expandable': props.expandable,
  }]">
    <slot name="list-content"></slot>
  </tr>
  <transition name="expand">
    <tr v-if="isExpanded" class="expanded-content" :style="{ height: expandedHeight + 'px' }">
      <td colspan="99">
        <div ref="expandContentRef" class="expand-content-inner">
          <slot name="expanded-content"></slot>
        </div>
      </td>
    </tr>
  </transition>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from "vue";

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

onMounted(() => {
  if (isExpanded.value) {
    nextTick(() => {
      expandedHeight.value = expandContentRef.value?.offsetHeight || 0;
    });
  }
});
</script>

<style lang="scss" scoped>
.list-item {
  &>td {
    text-align: center;
    vertical-align: middle;
  }
}

.expandable {
  cursor: pointer;
}

.expandable:hover {
  outline: solid 1px var(--theme-color);
}

.expanded-content {
  max-width: var(--content-width);
}

.expand-content-inner {
  max-width: inherit;
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
