<template>
  <div :class="containerClasses" @click="toggleExpand">
    <div ref="containerRef" :class="contentWrapperClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";

// 是否已展开
const isExpanded = ref(false);
// 内容是否过长，需要折叠
const isFoldable = ref(false);
// 内容容器的 DOM 引用
const containerRef = ref<HTMLDivElement | null>(null);
// ResizeObserver 实例
let resizeObserver: ResizeObserver | null = null;

/**
 * 检查内容是否溢出（超过两行）
 */
const checkFoldability = () => {
  // 【关键修复】
  // 仅在组件处于折叠状态时才进行检测。
  // 如果已经展开，则不应重新计算，否则 isFoldable 会被错误地重置为 false。
  if (isExpanded.value) {
    return;
  }

  if (containerRef.value) {
    const element = containerRef.value;
    // 在折叠状态下，比较总高度和可见高度
    isFoldable.value = element.scrollHeight > element.clientHeight;
  }
};

/**
 * 切换展开/折叠状态
 */
const toggleExpand = () => {
  if (isFoldable.value) {
    isExpanded.value = !isExpanded.value;
  }
};

// onMounted：进行初次检查并设置 ResizeObserver
onMounted(() => {
  if (containerRef.value) {
    // 创建一个观察器，每当容器尺寸变化时，就重新检查是否需要折叠
    resizeObserver = new ResizeObserver(() => {
      // ResizeObserver 触发时，也应该遵循只在折叠时检查的原则
      checkFoldability();
    });
    // 开始观察容器元素
    resizeObserver.observe(containerRef.value);
  }
});

// onUpdated：当 slot 内容动态改变时，也需要重新检查
onUpdated(() => {
  checkFoldability();
});

// onBeforeUnmount：在组件销毁前，停止观察，防止内存泄漏
onBeforeUnmount(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value);
    resizeObserver = null;
  }
});

// 动态计算根元素的 class
const containerClasses = computed(() => ({
  "expandable-text": true,
  "is-foldable": isFoldable.value,
  "is-expanded": isExpanded.value,
}));

// 动态计算内容包裹器的 class
const contentWrapperClasses = computed(() => ({
  "content-wrapper": true,
  // 只有在未展开时，才应用折叠样式
  "is-collapsed": !isExpanded.value,
}));
</script>

<style scoped>
/* 根元素样式 */
.expandable-text {
  position: relative;
}

/* 当内容可折叠时，显示手型光标 */
.expandable-text.is-foldable {
  cursor: pointer;
}

/* 默认就是折叠样式，这是我们能进行溢出检测的基础 */
.content-wrapper.is-collapsed {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 只有当 JS 确认了内容确实溢出时，才显示渐变遮罩 */
.expandable-text.is-foldable:not(.is-expanded)::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 2em;
  height: 1.5em;
  background: linear-gradient(to right, transparent, var(--background-color, white));
  pointer-events: none;
}
</style>
