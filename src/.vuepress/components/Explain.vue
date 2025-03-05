<!-- 这是一个 tooltip 组件，可以让鼠标悬停在你的某个节点上时显示提示信息。 -->
<template>
  <span class="explain" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
    <slot></slot>
    <div v-if="showTooltip" class="tooltip" :class="{ 'tooltip-top': props.position === 'top' }">
      {{ props.explanation }}
    </div>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  explanation: string;
  position?: "top" | "bottom";
}

const props = withDefaults(defineProps<Props>(), {
  position: "top",
});

const showTooltip = ref(false);
</script>

<style scoped>
.explain {
  position: relative;
  border-bottom: 1px dashed #666;
  cursor: help;
}

.tooltip {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  background: #333;
  color: #bbb;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
}

.tooltip::before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
}

.tooltip {
  bottom: -30px;
}

.tooltip::before {
  top: -12px;
  border-bottom-color: #333;
}

.tooltip-top {
  bottom: auto;
  top: -30px;
}

.tooltip-top::before {
  top: auto;
  bottom: -12px;
  border-bottom-color: transparent;
  border-top-color: #333;
}
</style>
