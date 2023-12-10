<template>
  <details>
    <summary>{{ alt ?? "点击展开" }}</summary>
    <slot></slot>
  </details>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      required: false
    }
  }
};
</script>
