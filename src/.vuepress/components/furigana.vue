<template>
  <ruby v-if="f">
    <slot></slot>
    <rp>(</rp>
    <rt>{{ f }}</rt>
    <rp>)</rp>
  </ruby>
  <span v-else>
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  f?: string;
}>();
</script>

<style scoped lang="scss"></style>
