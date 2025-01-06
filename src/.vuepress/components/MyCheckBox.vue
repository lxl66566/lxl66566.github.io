<!-- 这是一个自定义的 checkbox 选择框组件。
使用方法：

const isChecked = ref(false);
<MyCheckBox label="Accept Terms" v-model="isChecked" :hint="ads" />

-->

<template>
  <div class="checkbox-container" :class="{ checked: checked }" @click="toggle" :data-hint="hint">
    <span class="label">{{ label }}</span>
    <span>&nbsp;</span>
    <input type="checkbox" class="hidden-checkbox" v-model="checked" />
    <div class="hint" v-if="hint">{{ hint }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

// Props
const props = defineProps<{
  label: string;
  modelValue: boolean;
  hint?: string;
}>();

// Emits
const emit = defineEmits(["update:modelValue"]);

// Local state for the checkbox
const checked = ref(props.modelValue);

// Sync local state with `modelValue`
watch(
  () => checked.value,
  (newVal) => emit("update:modelValue", newVal),
);

// Initialize local state
watch(
  () => props.modelValue,
  (newVal) => {
    checked.value = newVal;
  },
  { immediate: true },
);

// Toggle state when the container is clicked
const toggle = () => {
  checked.value = !checked.value;
};
</script>

<style scoped lang="scss">
.checkbox-container {
  position: relative;
  display: inline-block;
  // display: flex;
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 2px solid var(--text-color);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s;

  .hint {
    visibility: hidden;
    width: 50vh;
    background-color: rgb(27, 27, 27);
    color: #d5d5d5;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 100;
    bottom: 125%;
    left: 25%;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
  }

  &:hover {
    border-color: var(--theme-color);
  }

  &.checked {
    border-color: var(--theme-color);
  }

  &:hover .hint {
    visibility: visible;
    opacity: 1;
  }
}

.label {
  margin-right: 8px;
  /* 给文字和 checkbox 留间距 */
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  accent-color: var(--theme-color);
  /* 设置 checkbox 选中时的颜色 */
  cursor: pointer;
  margin: 0;
  /* 确保布局没有额外的间距 */
}
</style>
