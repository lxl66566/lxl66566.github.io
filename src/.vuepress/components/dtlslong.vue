<template>
  <details v-if="need">
    <summary>{{ alt }}</summary>
    <span>{{ text }}</span>
  </details>
  <span v-if="!need">{{ text }}</span>
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
    noshort: {
      type: String,
      required: false,
      default: 0,
    },
  },
  computed: {
    need() {
      return this.text.length > +this.noshort;
    },
  },
};
</script>
