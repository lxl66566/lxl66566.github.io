<template>
  <details>
    <summary>{{ alt }}</summary>
    <slot></slot>
  </details>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      required: false,
      default: "点击展开",
    },
  },
};
</script>
