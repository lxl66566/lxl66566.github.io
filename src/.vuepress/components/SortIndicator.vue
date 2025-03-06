<!-- 使用示例：
<template>
  <div>
    <sort-indicator v-model="sortOrder" text="排序" />
    <p>当前排序状态：{{ sortOrder }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SortIndicator from './SortIndicator.vue'

const sortOrder = ref<'none' | 'asc' | 'desc'>('none')
</script> 
-->

<template>
  <div class="sort-indicator" @click="toggleSort">
    <span class="sort-text">{{ text }}</span>
    <span class="sort-icons">
      <span class="triangle up" :class="{ active: sortState === 'asc' }"></span>
      <span class="triangle down" :class="{ active: sortState === 'desc' }"></span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

// 定义 props
const props = defineProps<{
  modelValue: 'none' | 'asc' | 'desc' // 组件的状态（未排序、正序、倒序）
  text: string // 显示的文字
}>()

// 定义 emits
const emit = defineEmits(['update:modelValue'])

// 内部状态，同步 props 的 modelValue
const sortState = ref(props.modelValue)

// 监听外部的 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  sortState.value = newValue
})

// 点击切换排序状态
const toggleSort = () => {
  let newState: 'none' | 'asc' | 'desc'
  switch (sortState.value) {
    case 'none':
      newState = 'desc'
      break
    case 'desc':
      newState = 'asc'
      break
    case 'asc':
      newState = 'none'
      break
  }
  sortState.value = newState
  emit('update:modelValue', newState) // 触发双向绑定的更新
}
</script>

<style lang="scss" scoped>
.sort-indicator {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.sort-text {
  margin-right: 4px;
}

.sort-icons {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 12px;
  /* 确保三角垂直居中 */
}

.triangle {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin: 1px 0;
  /* 调整上下间距使三角垂直居中 */
  transition: border-color 0.3s ease;
}

/* 上三角（正序） */
.triangle.up {
  border-bottom: 4px solid #999;

  &.active {
    border-bottom-color: var(--theme-color);
  }
}

/* 下三角（倒序） */
.triangle.down {
  border-top: 4px solid #999;

  &.active {
    border-top-color: var(--theme-color);
  }
}
</style>