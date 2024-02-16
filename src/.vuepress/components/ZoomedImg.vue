<template>
  <figure :style="{ maxWidth: scale }">
    <img :alt="alt" :src="src" loading="lazy" />
    <figcaption v-if="alt">{{ alt }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
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
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
