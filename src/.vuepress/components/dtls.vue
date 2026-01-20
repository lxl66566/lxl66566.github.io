<template>
  <details>
    <summary>{{ props.alt }}</summary>
    <slot></slot>
  </details>
</template>

<script lang="ts" setup>
const props = defineProps({
  alt: {
    type: String,
    required: false,
    default: "点击展开",
  },
});
</script>
