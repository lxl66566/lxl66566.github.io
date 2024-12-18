<!-- 可以跳转站内页面也可以跳转站外网址的组件 -->
<template>
  <a v-if="props.to.startsWith('http://') || props.to.startsWith('https://')" :href="to" target="_blank"
    class="router-jumper-text">{{ text }}</a>
  <RouterLink v-else :key="key" :to="to" class="router-jumper-text">{{ text }}
  </RouterLink>
</template>

<script lang="ts" setup>

const props = defineProps<{
  key?: number,
  to: string,
  text: string,
}>();
</script>

<style scoped>
.router-jumper-text {
  display: inline-block;
  white-space: normal;
  /* word-wrap: break-word;
  word-break: break-word; */
}
</style>