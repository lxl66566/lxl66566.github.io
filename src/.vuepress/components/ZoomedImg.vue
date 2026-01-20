<template>
  <figure>
    <img
      :alt="alt"
      :src="src"
      loading="lazy"
      :style="{ maxWidth: `calc(${parseFloat(scale) / 100} * var(--content-width))` }"
    />
    <figcaption v-if="alt">{{ alt }}</figcaption>
  </figure>
</template>

<script lang="ts" setup>
const props = defineProps({
  alt: {
    type: String,
    required: false,
  },
  src: {
    type: String,
    required: true,
  },
  scale: {
    type: String,
    default: "60%",
  },
});
</script>

<style lang="scss" scoped>
figure {
  max-width: max-content;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
