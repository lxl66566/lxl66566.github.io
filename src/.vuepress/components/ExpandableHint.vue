<template>
  <div class="hint-container">
    <div class="speech-bubble">
      <!-- 属性的默认值依然保留，但文本可以由父组件传入 -->
      {{ hintText }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  hintText: {
    type: String,
    required: true,
    default: '这是一个可以操作的区域哦！'
  }
});
</script>

<style scoped>
.hint-container {
  position: relative;
  /* 我们可以稍微增加一点上边距，为带边框的气泡提供更舒适的空间 */
  margin-top: 65px;
}

.speech-bubble {
  position: absolute;
  top: -55px;
  /* 向上移动以适应新的边距 */
  left: 20px;

  background-color: var(--vp-c-accent-soft);

  border: 1px solid var(--vp-c-accent);
  color: var(--vp-c-accent);

  /* 其他样式 */
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  /* 让文字稍微加粗，更清晰 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  white-space: nowrap;
}

/* 步骤1: 创建三角形的 "边框" */
.speech-bubble::before {
  content: '';
  position: absolute;
  bottom: -12px;
  /* 位置要比填充三角形更靠外 1px */
  left: 29px;
  /* 同样，水平偏移 1px */

  /* 三角形的大小要比填充三角形大 1px */
  border-width: 11px 11px 0;
  border-style: solid;

  /* 颜色使用主题色，与气泡的边框一致 */
  border-color: var(--vp-c-accent) transparent transparent transparent;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 30px;

  border-width: 10px 10px 0;
  border-style: solid;

  border-color: var(--vp-c-bg-soft, #f8f8f8) transparent transparent transparent;
}
</style>