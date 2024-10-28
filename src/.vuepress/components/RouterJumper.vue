<!-- 可以跳转站内页面也可以跳转站外网址的组件 -->
<template>
  <a v-if="props.to.startsWith('http://') || props.to.startsWith('https://')" :href="to" target="_blank">{{ text }}</a>
  <RouterLink v-else :key="key" :to="to">{{ text }}
  </RouterLink>
</template>

<script lang="ts" setup>

const props = defineProps<{
  key?: number,
  to: string,
  text: string,
}>();
</script>