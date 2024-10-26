<template>
  <details v-if="needed">
    <summary>{{ alt }}</summary>
    <span>{{ text }}</span>
  </details>
  <span v-else>{{ text }}</span>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
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
    type: Number,
    required: false,
    default: 20,
  },
});

const needed = computed(() => props.text.length > +props.fold);
</script>
