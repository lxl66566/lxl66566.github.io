<template>
  <div>
    ——<time :datetime="date">{{ date }}</time>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

// 将输入日期字符串格式化为 "YYYY-MM-DD"
const date = props.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
</script>

<style scoped>
div {
  text-align: right;
  font-style: italic;
}
</style>
