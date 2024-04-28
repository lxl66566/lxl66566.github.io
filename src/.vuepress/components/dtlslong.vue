<template>
  <details v-if="need">
    <summary>{{ alt }}</summary>
    <span>{{ text }}</span>
  </details>
  <span v-else>{{ text }}</span>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      required: false,
      default: "点击展开",
    },
    text: {
      type: String,
      required: true,
    },
    fold: {
      type: String,
      required: false,
      default: 20,
    },
  },
  computed: {
    need() {
      return this.text.length > +this.fold;
    },
  },
};
</script>
